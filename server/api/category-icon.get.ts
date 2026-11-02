import sharp from 'sharp'

// Category icon as a CSS mask (components/CategoryLogo.vue paints it with the brand gradient).
// A mask only uses transparency, so a logo uploaded on a solid background (JPG, flat PNG)
// would show as a full rectangle: here that background is turned transparent, and empty
// margins are trimmed so wide logos fill the ring.

const SIZE = 160

export default defineEventHandler(async (event) => {
    const src = String(getQuery(event).src || '')

    // Only images from the WordPress site, never arbitrary URLs
    let url: URL
    try {
        url = new URL(src)
    } catch {
        throw createError({ statusCode: 400, statusMessage: 'Invalid image' })
    }
    if (url.protocol !== 'https:' && url.protocol !== 'http:' || url.host !== new URL(wpUrl()).host) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid image' })
    }

    let input: Buffer
    try {
        input = Buffer.from(await $fetch<ArrayBuffer>(url.href, { responseType: 'arrayBuffer', timeout: 15000 }))
    } catch {
        throw createError({ statusCode: 404, statusMessage: 'Image not found' })
    }

    // Corners are read before trimming: they're the background, if there is one
    const { data, info } = await sharp(input)
        .resize(SIZE * 2, SIZE * 2, { fit: 'inside' })
        .ensureAlpha()
        .raw()
        .toBuffer({ resolveWithObject: true })
        .catch(() => {
            throw createError({ statusCode: 415, statusMessage: 'Unsupported image' })
        })

    const { width, height } = info
    const corners = [0, width - 1, (height - 1) * width, height * width - 1].map(i => i * 4)
    const opaque = corners.every(i => data[i + 3] > 200)

    if (opaque) {
        // Background at each pixel = the four corner colours blended by position,
        // so gradient backgrounds go too, not only plain ones
        const [tl, tr, bl, br] = corners
        const dist = (i: number) => {
            const p = i / 4
            const fx = (p % width) / Math.max(1, width - 1)
            const fy = Math.floor(p / width) / Math.max(1, height - 1)
            let sum = 0
            for (let c = 0; c < 3; c++) {
                const top = data[tl + c] * (1 - fx) + data[tr + c] * fx
                const bottom = data[bl + c] * (1 - fx) + data[br + c] * fx
                sum += (data[i + c] - (top * (1 - fy) + bottom * fy)) ** 2
            }
            return Math.sqrt(sum)
        }

        let max = 0
        for (let i = 0; i < data.length; i += 4) max = Math.max(max, dist(i))

        // Near-background noise (JPEG artefacts) drops out, the logo becomes solid,
        // anti-aliased edges stay soft
        for (let i = 0; i < data.length; i += 4) {
            const a = max ? Math.min(1, Math.max(0, (dist(i) - max * .3) / (max * .4))) : 0
            data[i + 3] = Math.round(a * data[i + 3])
        }
    }

    // Only the shape matters: white on transparent
    for (let i = 0; i < data.length; i += 4) {
        data[i] = data[i + 1] = data[i + 2] = 255
    }

    // Trim the now transparent margins so wide logos fill the ring
    const trimmed = await sharp(data, { raw: { width, height, channels: 4 } })
        .png()
        .toBuffer()
        .then(buf => sharp(buf).trim({ background: '#ffffff00', threshold: 10 }).toBuffer())
        .catch(() => sharp(data, { raw: { width, height, channels: 4 } }).png().toBuffer())
    const png = await sharp(trimmed).resize(SIZE, SIZE, { fit: 'inside' }).png().toBuffer()

    setHeader(event, 'Content-Type', 'image/png')
    setHeader(event, 'Cache-Control', 'public, max-age=86400')
    return png
})
