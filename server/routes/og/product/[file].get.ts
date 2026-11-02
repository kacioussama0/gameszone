import sharp from 'sharp'
import opentype from 'opentype.js'

// Share picture of a product (Facebook, Instagram, Discord, WhatsApp, X):
// GET /og/product/<slug>.jpg -> 1200×630 JPEG, the product photo on the GamesZone
// banner with its name and price. Text is drawn as vector paths from the bundled
// Lufga font, so it looks the same whatever fonts the server has.
// Fixed parts live in server/assets/og (background made from public/og-banner.jpg).

const W = 1200
const H = 630
const PHOTO = { x: 676, y: 85, size: 460, radius: 28 }
const TEXT_X = 70
const TEXT_MAX = 560

const INK = '#0c0f08'
const LIME = '#DDDF1C'
const GREEN = '#6BB542'

type Font = opentype.Font
let assets: Promise<{ bold: Font, medium: Font, background: Buffer, logo: Buffer }> | null = null

const toArrayBuffer = (data: any) => {
    const bytes = data instanceof Uint8Array ? data : new Uint8Array(data)
    return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength)
}

const loadAssets = () => (assets ??= (async () => {
    const storage = useStorage('assets:server')
    const [bold, medium, background, logo] = await Promise.all(
        ['og/LufgaBold.ttf', 'og/LufgaMedium.ttf', 'og/background.jpg', 'og/logo.png']
            .map(key => storage.getItemRaw(key))
    )
    if (!bold || !medium || !background || !logo) throw new Error('og assets missing')
    return {
        bold: opentype.parse(toArrayBuffer(bold)),
        medium: opentype.parse(toArrayBuffer(medium)),
        background: Buffer.from(background as any),
        logo: Buffer.from(logo as any),
    }
})().catch((error) => {
    assets = null
    throw error
}))

// Rendered pictures, newest last (a product changes rarely; the URL carries its price)
const CACHE_MAX = 200
const CACHE_MS = 6 * 3600e3
const cache = new Map<string, { at: number, jpeg: Buffer }>()

const decodeEntities = (text: string) => text
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([\da-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&nbsp;/g, ' ')

// "gameszonedz.com", from the configured site address
const siteHost = () => {
    try {
        return new URL(String(useRuntimeConfig().public.siteUrl)).hostname.replace(/^www\./, '')
    } catch {
        return 'GamesZone'
    }
}

// "12 500 DA" with a plain space (the font has no narrow no-break space)
const formatPrice = (value: number) => `${value.toLocaleString('fr-FR').replace(/\s/g, ' ')} DA`

const canDraw = (font: Font, text: string) =>
    [...text].every(char => /\s/.test(char) || font.charToGlyph(char).index > 0)

const path = (font: Font, text: string, x: number, y: number, size: number, fill: string) =>
    `<path fill="${fill}" d="${font.getPath(text, x, y, size).toPathData(2)}"/>`

// Up to `maxLines` lines of `maxWidth`, the last one cut with "…"
const wrap = (font: Font, text: string, size: number, maxWidth: number, maxLines: number) => {
    const width = (s: string) => font.getAdvanceWidth(s, size)
    const lines: string[] = []
    let line = ''
    for (const word of text.split(/\s+/).filter(Boolean)) {
        const next = line ? `${line} ${word}` : word
        if (width(next) <= maxWidth || !line) {
            line = next
            continue
        }
        lines.push(line)
        line = word
    }
    if (line) lines.push(line)
    if (lines.length <= maxLines && lines.every(l => width(l) <= maxWidth)) return { lines, fits: true }

    const kept = lines.slice(0, maxLines)
    let last = kept[kept.length - 1]
    while (last.length > 1 && width(`${last}…`) > maxWidth) last = last.slice(0, -1).trimEnd()
    kept[kept.length - 1] = `${last}…`
    return { lines: kept, fits: false }
}

const render = async (product: any) => {
    const { bold, medium, background, logo } = await loadAssets()

    const name = decodeEntities(String(product.name || '')).trim()
    const price = Number(product.price)
    const regular = Number(product.regular_price)
    const isRange = product.type === 'variable'

    // Name: the largest size that fits in 3 lines (names in a script the font
    // lacks, e.g. Arabic, are left out; the link title still shows them)
    let nameSvg = ''
    let y = 250
    if (name && canDraw(bold, name)) {
        let size = 60
        let block = wrap(bold, name, size, TEXT_MAX, 3)
        while (!block.fits && size > 40) {
            size -= 6
            block = wrap(bold, name, size, TEXT_MAX, 3)
        }
        const lineHeight = Math.round(size * 1.12)
        y = Math.max(200, 330 - ((block.lines.length - 1) * lineHeight) / 2 - 40)
        nameSvg = block.lines.map((line, i) => path(bold, line, TEXT_X, y + i * lineHeight, size, '#ffffff')).join('')
        y += (block.lines.length - 1) * lineHeight
    }

    // Price pill in the brand gradient
    let priceSvg = ''
    if (price > 0) {
        const from = isRange ? 'From ' : ''
        const amount = formatPrice(price)
        const fromWidth = from ? medium.getAdvanceWidth(from, 28) : 0
        const amountWidth = bold.getAdvanceWidth(amount, 38)
        const top = y + 40
        const pillWidth = Math.round(fromWidth + amountWidth + 56)
        priceSvg = `<rect x="${TEXT_X}" y="${top}" width="${pillWidth}" height="72" rx="16" fill="url(#brand)"/>`
            + (from ? path(medium, from, TEXT_X + 28, top + 47, 28, INK) : '')
            + path(bold, amount, TEXT_X + 28 + fromWidth, top + 49, 38, INK)
        if (!isRange && product.on_sale && regular > price) {
            const old = formatPrice(regular)
            const oldX = TEXT_X + pillWidth + 22
            const oldWidth = medium.getAdvanceWidth(old, 28)
            priceSvg += path(medium, old, oldX, top + 47, 28, '#9aa38c')
                + `<rect x="${oldX}" y="${top + 36}" width="${Math.round(oldWidth)}" height="2.5" fill="#9aa38c"/>`
        }
    }

    const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><linearGradient id="brand" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${LIME}"/><stop offset="1" stop-color="${GREEN}"/></linearGradient></defs>
  ${path(bold, 'Games', 134, 104, 34, '#ffffff')}
  ${path(bold, 'Zone', 134 + bold.getAdvanceWidth('Games', 34), 104, 34, LIME)}
  ${nameSvg}
  ${priceSvg}
  ${path(medium, siteHost(), TEXT_X, 566, 24, '#b7c0a8')}
  <rect x="${PHOTO.x - 1}" y="${PHOTO.y - 1}" width="${PHOTO.size + 2}" height="${PHOTO.size + 2}" rx="${PHOTO.radius + 1}" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="2"/>
</svg>`

    const layers: sharp.OverlayOptions[] = []

    // Product photo, square with rounded corners, softly lit from behind
    const src = product.images?.[0]?.src
    if (src) {
        const original = await $fetch<ArrayBuffer>(src, { responseType: 'arrayBuffer', timeout: 10000 })
        const mask = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${PHOTO.size}" height="${PHOTO.size}"><rect width="${PHOTO.size}" height="${PHOTO.size}" rx="${PHOTO.radius}" fill="#fff"/></svg>`)
        const photo = await sharp(Buffer.from(original))
            .resize(PHOTO.size, PHOTO.size, { fit: 'cover', position: 'top' })
            .composite([{ input: mask, blend: 'dest-in' }])
            .png()
            .toBuffer()
        const glow = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><filter id="b"><feGaussianBlur stdDeviation="28"/></filter></defs><rect x="${PHOTO.x + 20}" y="${PHOTO.y + 40}" width="${PHOTO.size - 40}" height="${PHOTO.size - 30}" rx="40" fill="#000" opacity=".6" filter="url(#b)"/></svg>`)
        layers.push({ input: glow, left: 0, top: 0 }, { input: photo, left: PHOTO.x, top: PHOTO.y })
    }

    layers.push(
        { input: await sharp(logo).resize({ height: 54 }).toBuffer(), left: TEXT_X, top: 60 },
        { input: Buffer.from(overlay), left: 0, top: 0 },
    )

    return sharp(background).resize(W, H).composite(layers).jpeg({ quality: 84, mozjpeg: true }).toBuffer()
}

export default defineEventHandler(async (event) => {
    const file = String(getRouterParam(event, 'file') || '')
    const slug = decodeURIComponent(file.replace(/\.jpe?g$/i, ''))
    if (!file.match(/\.jpe?g$/i) || !slug || slug.length > 200 || /[/\\?#]/.test(slug)) {
        throw createError({ statusCode: 404 })
    }

    try {
        const hit = cache.get(slug)
        let jpeg = hit && Date.now() - hit.at < CACHE_MS ? hit.jpeg : null

        if (!jpeg) {
            const [product] = await wooFetch<any[]>('/products', {
                query: { slug, status: 'publish', _fields: 'name,price,regular_price,on_sale,type,images' },
            })
            if (!product) throw createError({ statusCode: 404 })

            jpeg = await render(product)
            cache.delete(slug)
            cache.set(slug, { at: Date.now(), jpeg })
            if (cache.size > CACHE_MAX) cache.delete(cache.keys().next().value!)
        }

        setHeaders(event, {
            'Content-Type': 'image/jpeg',
            'Cache-Control': 'public, max-age=86400, s-maxage=86400',
        })
        return jpeg
    } catch (error) {
        // Never a broken preview: fall back to the site banner
        console.error('[og] product image failed', slug, error)
        return sendRedirect(event, `/og-banner.jpg`, 302)
    }
})
