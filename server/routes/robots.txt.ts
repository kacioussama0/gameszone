// /robots.txt: built here (not in public/) so the sitemap line follows NUXT_PUBLIC_SITE_URL

export default defineEventHandler((event) => {
    const site = String(useRuntimeConfig().public.siteUrl).replace(/\/$/, '')

    setHeader(event, 'content-type', 'text/plain; charset=utf-8')
    return `User-agent: *
Allow: /

# Private or transactional pages
Disallow: /cart
Disallow: /checkout
Disallow: /payment/
Disallow: /account/
Disallow: /api/

# Searches are endless near-duplicates of the catalogue
Disallow: /shop?search=
Disallow: /*&search=

Sitemap: ${site}/sitemap.xml
`
})
