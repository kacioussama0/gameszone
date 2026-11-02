import { Meilisearch } from 'meilisearch'

// Search index client. Host and key come from MEILISEARCH_HOST / MEILISEARCH_API_KEY only.
export const useMeilisearch = () => {
    const cfg = useRuntimeConfig()
    if (!cfg.meilisearchHost || !cfg.meilisearchApiKey) {
        throw createError({ statusCode: 500, statusMessage: 'MEILISEARCH_HOST / MEILISEARCH_API_KEY not set' })
    }
    return new Meilisearch({ host: String(cfg.meilisearchHost), apiKey: String(cfg.meilisearchApiKey) })
}
