// Slick-Pay (CIB / Edahabia) invoices.
// Config comes from SLICKPAY_URL / SLICKPAY_TOKEN / SLICKPAY_WEBHOOK_URL / NUXT_PUBLIC_SITE_URL only.

type InvoiceInput = {
    orderId: number | string
    amount: number
    billing: { first_name?: string, last_name?: string, email?: string, phone?: string }
    items: { name: string, quantity: number, price: number }[]
}

export const createInvoice = ({ orderId, amount, billing, items }: InvoiceInput) => {
    const cfg = useRuntimeConfig()
    if (!cfg.slickpayUrl || !cfg.slickpayToken || !cfg.slickpayWebhookUrl) {
        throw createError({ statusCode: 500, statusMessage: 'SLICKPAY_URL / SLICKPAY_TOKEN / SLICKPAY_WEBHOOK_URL not set' })
    }
    const site = String(cfg.public.siteUrl).replace(/\/$/, '')

    return $fetch<any>(`${String(cfg.slickpayUrl).replace(/\/$/, '')}/users/invoices`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${cfg.slickpayToken}`,
        },
        body: {
            amount,
            firstname: billing.first_name,
            lastname: billing.last_name,
            email: billing.email,
            phone: billing.phone,
            address: 'Algerie',
            items,
            url: `${site}/payment/result`,
            webhook_url: cfg.slickpayWebhookUrl,
            webhook_signature: `gameshopdz_${orderId}`,
            webhook_meta_data: [{ key: 'order_id', value: String(orderId) }],
        },
        timeout: 15000,
    })
}
