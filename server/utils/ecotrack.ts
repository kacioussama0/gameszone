// Ecotrack delivery API. URL and token come from ECOTRACK_URL / ECOTRACK_TOKEN only.

export const ecotrackFetch = <T = any>(path: string) => {
    const cfg = useRuntimeConfig()
    if (!cfg.ecotrackUrl || !cfg.ecotrackToken) {
        throw createError({ statusCode: 500, statusMessage: 'ECOTRACK_URL / ECOTRACK_TOKEN not set' })
    }

    return $fetch<T>(`${String(cfg.ecotrackUrl).replace(/\/$/, '')}${path}`, {
        headers: { Authorization: `Bearer ${cfg.ecotrackToken}` },
        timeout: 15000,
    })
}
