// Category tree for the header menu, built from WooCommerce.
//
// Order: the drag-and-drop order from WordPress (Products > Categories) when the
// admin API is configured; otherwise the public Store API, biggest categories first.

// Helper categories that feed home page sections rather than being shop sections
const HIDDEN_SLUGS = ['par-defaut', 'uncategorized', 'carousel', 'gameshop-hits', 'notre-selection', 'new-arrivals']

type RawCategory = {
    id: number, name: string, slug: string, parent: number, count: number, menu_order?: number
    image?: { src?: string, thumbnail?: string } | null
}

// image: the category picture set in WordPress (Products > Categories), if any
// order: its WordPress drag-and-drop position (menu_order), used as the CSS flex `order`
export type MenuCategory = { id: number, name: string, slug: string, image: string | null, order: number, children: MenuCategory[] }

// WooCommerce returns names HTML-encoded ("ABONNEMENTS &amp; CARTES")
const decode = (text: string) => text
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')

const fetchAll = async (load: (page: number) => Promise<RawCategory[]>) => {
    const all: RawCategory[] = []
    for (let page = 1; page <= 10; page++) {
        const batch = await load(page)
        all.push(...batch)
        if (batch.length < 100) break
    }
    return all
}

const loadCategories = async (): Promise<RawCategory[]> => {
    try {
        return await fetchAll(page => wooFetch<RawCategory[]>('/products/categories', {
            query: { per_page: 100, page, hide_empty: true },
        }))
    } catch {
        // No admin keys on this server (or the call failed): the Store API is public
        return fetchAll(page => $fetch<RawCategory[]>(storeApiUrl('/v1/products/categories'), {
            query: { per_page: 100, page },
            timeout: 15000,
        }))
    }
}

export default defineEventHandler(async () => {
    const categories = (await loadCategories())
        .filter(c => c.count > 0 && !HIDDEN_SLUGS.includes(c.slug))

    const byParent = new Map<number, RawCategory[]>()
    for (const c of categories) {
        byParent.set(c.parent, [...(byParent.get(c.parent) || []), c])
    }

    const sorted = (list: RawCategory[]) => [...list].sort((a, b) =>
        (a.menu_order ?? 0) - (b.menu_order ?? 0) || b.count - a.count || a.name.localeCompare(b.name))

    const build = (parent: number, depth: number): MenuCategory[] =>
        sorted(byParent.get(parent) || []).map(c => ({
            id: c.id,
            name: decode(c.name),
            slug: c.slug,
            image: c.image?.thumbnail || c.image?.src || null,
            order: c.menu_order ?? 0,
            children: depth < 2 ? build(c.id, depth + 1) : [],
        }))

    return build(0, 0)
})
