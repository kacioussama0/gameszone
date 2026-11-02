// Shared by the account pages and the Google login route

// Only same-site paths are accepted as "?redirect=" targets
export const safeRedirect = (value: unknown, fallback = '/account') => {
    const path = String(value || '')
    return path.startsWith('/') && !path.startsWith('//') && !path.startsWith('/\\') ? path : fallback
}
