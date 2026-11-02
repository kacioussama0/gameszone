// Brands for the home page logo strip, from WooCommerce (Products > Brands).
// Only brands with a logo image and at least one product are returned, so the
// strip stays empty (and hidden) until logos are added in WordPress.
// Uses the public Store API: no keys needed.

type StoreBrand = {
    id: number
    name: string
    slug: string
    count: number
    image?: { src?: string, thumbnail?: string, alt?: string } | null
}

// WooCommerce returns names HTML-encoded ("Logitech &amp; Co")
const decode = (text: string) => text
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')

export default defineEventHandler(async () => {
    const all: StoreBrand[] = []
    for (let page = 1; page <= 10; page++) {
        const batch = await $fetch<StoreBrand[]>(storeApiUrl('/v1/products/brands'), {
            query: { per_page: 100, page },
            timeout: 15000,
        })
        all.push(...batch)
        if (batch.length < 100) break
    }

    return all
        .filter(b => b.count > 0 && b.image?.src)
        .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
        .map(b => ({
            id: b.id,
            name: decode(b.name),
            logo: b.image!.thumbnail || b.image!.src!,
        }))
})
