// WooCommerce REST access shared by the server routes.
// URL and keys come from the runtime config only (WP_URL / WC_CONSUMER_KEY / WC_CONSUMER_SECRET).

export const wpUrl = () => {
    const url = useRuntimeConfig().wpUrl
    if (!url) throw createError({ statusCode: 500, statusMessage: 'WP_URL not set' })
    return String(url).replace(/\/$/, '')
}

// Public Store API (cart, checkout, brands): no keys needed
export const storeApiUrl = (path: string) => `${wpUrl()}/wp-json/wc/store${path}`

export const wooAuth = () => {
    const cfg = useRuntimeConfig()
    const ck = cfg.wcConsumerKey
    const cs = cfg.wcConsumerSecret
    if (!ck || !cs) throw createError({ statusCode: 500, statusMessage: 'WC_CONSUMER_KEY / WC_CONSUMER_SECRET not set' })
    return `Basic ${Buffer.from(`${ck}:${cs}`).toString('base64')}`
}

type WooOptions = {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    query?: Record<string, any>
    body?: Record<string, any>
}

export const wooFetch = <T = any>(path: string, options: WooOptions = {}) =>
    $fetch<T>(`${wpUrl()}/wp-json/wc/v3${path}`, {
        ...options,
        headers: { Authorization: wooAuth() },
        timeout: 15000,
    })

// Same, with the response headers (WooCommerce puts totals in X-WP-Total / X-WP-TotalPages)
export const wooFetchRaw = <T = any>(path: string, options: WooOptions = {}) =>
    $fetch.raw<T>(`${wpUrl()}/wp-json/wc/v3${path}`, {
        ...options,
        headers: { Authorization: wooAuth() },
        timeout: 15000,
    })
