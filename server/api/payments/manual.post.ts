import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { CURRENCY_SYMBOLS, findManualMethod, PROOF_MAX_BYTES, toForeignAmount } from '../../../utils/payment-methods'

// Manual payment (BaridiMob, CCP, Binance, RedotPay, IBAN): the customer has already
// sent the money and uploads the receipt. We store the receipt in WordPress,
// then create the order "on hold" for the shop to check.

const payloadSchema = z.object({
    method: z.string(),
    billing: z.object({
        first_name: z.string().trim().min(2).max(50),
        last_name: z.string().trim().min(2).max(50),
        phone: z.string().regex(/^(05|06|07)[0-9]{8}$/),
        email: z.string().trim().email(),
    }),
    items: z.array(z.object({
        product_id: z.coerce.number().int().positive(),
        quantity: z.coerce.number().int().min(1).max(50),
        variation_id: z.coerce.number().int().positive().nullish(),
        meta: z.array(z.object({ key: z.string().max(100), value: z.string().max(100) })).max(10).optional(),
    })).min(1).max(50),
    note: z.string().max(500).optional(),
})

// Trust the file's first bytes, not its name or declared type
const sniff = (data: Buffer): { ext: string, type: string } | null => {
    if (data.subarray(0, 4).toString('latin1') === '%PDF') return { ext: 'pdf', type: 'application/pdf' }
    if (data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff) return { ext: 'jpg', type: 'image/jpeg' }
    if (data.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return { ext: 'png', type: 'image/png' }
    if (data.subarray(0, 4).toString('latin1') === 'RIFF' && data.subarray(8, 12).toString('latin1') === 'WEBP') return { ext: 'webp', type: 'image/webp' }
    return null
}

// Upload to the WordPress media library under a random name, then make it private
const uploadProof = async (data: Buffer, file: { ext: string, type: string }) => {
    const cfg = useRuntimeConfig()
    if (!cfg.wpAppUser || !cfg.wpAppPassword) {
        throw createError({ statusCode: 503, statusMessage: 'Receipt upload not configured (WP_APP_USER / WP_APP_PASSWORD)' })
    }
    const auth = `Basic ${Buffer.from(`${cfg.wpAppUser}:${String(cfg.wpAppPassword).replace(/\s+/g, '')}`).toString('base64')}`
    const filename = `receipt-${randomUUID()}.${file.ext}`

    const media = await $fetch<any>(`${wpUrl()}/wp-json/wp/v2/media`, {
        method: 'POST',
        headers: {
            Authorization: auth,
            'Content-Type': file.type,
            'Content-Disposition': `attachment; filename="${filename}"`,
        },
        body: data,
        timeout: 30000,
    })

    // Hidden from the public media listing (the random name keeps the file URL unguessable)
    try {
        await $fetch(`${wpUrl()}/wp-json/wp/v2/media/${media.id}`, {
            method: 'POST',
            headers: { Authorization: auth },
            body: { status: 'private', title: 'Payment receipt' },
            timeout: 15000,
        })
    } catch {}

    return { id: Number(media.id), url: String(media.source_url || '') }
}

export default defineEventHandler(async (event) => {
    // No guest checkout: checked before the receipt is read or uploaded
    const account = await requireAccount(event)

    assertNotThrottled(`manual-pay:${getRequestIP(event, { xForwardedFor: true }) || 'ip?'}`)

    // Refuse oversized uploads before reading them into memory (receipt + a little form data)
    const declared = Number(getRequestHeader(event, 'content-length') || 0)
    if (!declared || declared > PROOF_MAX_BYTES + 256 * 1024) {
        throw createError({ statusCode: 413, statusMessage: 'Receipt too large (5 MB max)' })
    }

    const form = await readMultipartFormData(event)
    const payloadPart = form?.find(p => p.name === 'payload')
    const filePart = form?.find(p => p.name === 'proof')
    if (!payloadPart || !filePart?.data?.length) {
        throw createError({ statusCode: 400, statusMessage: 'Order details and receipt are required' })
    }

    let payload: z.infer<typeof payloadSchema>
    try {
        payload = payloadSchema.parse(JSON.parse(payloadPart.data.toString('utf8')))
    } catch {
        throw createError({ statusCode: 400, statusMessage: 'Invalid order details' })
    }

    const method = findManualMethod(payload.method)
    if (!method) throw createError({ statusCode: 400, statusMessage: 'Unknown payment method' })

    if (filePart.data.length > PROOF_MAX_BYTES) {
        throw createError({ statusCode: 413, statusMessage: 'Receipt too large (5 MB max)' })
    }
    const fileType = sniff(filePart.data)
    if (!fileType) throw createError({ statusCode: 415, statusMessage: 'Receipt must be an image or a PDF' })

    // Each attempt counts toward the throttle, successful or not
    recordFailure(`manual-pay:${getRequestIP(event, { xForwardedFor: true }) || 'ip?'}`)

    const proof = await uploadProof(filePart.data, fileType).catch((e: any) => {
        if (e?.statusCode === 503) throw e
        // WordPress's own reason (wrong app password, upload limit, timeout...) for the server log
        console.error('[manual-pay] receipt upload failed:', e?.status, e?.message, JSON.stringify(e?.data)?.slice(0, 500))
        throw createError({ statusCode: 502, statusMessage: 'Receipt upload failed' })
    })

    let order: any
    try {
        order = await wooFetch('/orders', {
            method: 'POST',
            body: {
                customer_id: account.id,
                payment_method: `gz_${method.id}`,
                payment_method_title: method.title,
                set_paid: false,
                status: 'on-hold',
                billing: { ...payload.billing, country: 'DZ' },
                customer_note: payload.note || '',
                line_items: payload.items.map(item => ({
                    product_id: item.product_id,
                    quantity: item.quantity,
                    variation_id: item.variation_id || undefined,
                    meta_data: item.meta,
                })),
                meta_data: [
                    { key: '_gz_payment_method', value: method.id },
                    { key: '_gz_payment_proof', value: proof.url },
                    { key: '_gz_payment_proof_id', value: String(proof.id) },
                ],
            },
        })
    } catch {
        throw createError({ statusCode: 502, statusMessage: 'Order could not be created' })
    }

    // EUR / USD methods: the amount the customer was asked to send, at today's rate
    let foreign = ''
    if (method.currency) {
        const rate = (await getDzdRates())[method.currency]
        const amount = toForeignAmount(Number(order.total), rate)
        foreign = ` = ${amount} ${CURRENCY_SYMBOLS[method.currency]} (taux ${rate} DA)`
    }

    // For the shop: what to check, and where the receipt is
    try {
        await wooFetch(`/orders/${order.id}/notes`, {
            method: 'POST',
            body: {
                note: `Paiement manuel : ${method.title} — ${order.total} DA${foreign} à vérifier.\nReçu : ${proof.url}`,
                customer_note: false,
            },
        })
    } catch {}

    return { orderId: order.id, number: order.number, total: Number(order.total), method: method.id }
})
