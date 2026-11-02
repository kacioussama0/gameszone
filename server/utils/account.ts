import type { H3Event } from 'h3'

// What the encrypted session cookie holds: enough to show "Hi, Amine" and
// prefill checkout without calling WooCommerce on every page.
export type Account = {
    id: number
    email: string
    first_name: string
    last_name: string
    phone: string
}

const sessionConfig = () => {
    const password = String(useRuntimeConfig().sessionSecret || '')
    if (password.length < 32) {
        throw createError({ statusCode: 500, statusMessage: 'NUXT_SESSION_SECRET must be set (32+ characters)' })
    }
    return {
        name: 'gz_session',
        password,
        maxAge: 60 * 60 * 24 * 30,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax' as const,
            path: '/',
        },
    }
}

const session = (event: H3Event) => useSession<{ account?: Account }>(event, sessionConfig())

// Without a configured secret nobody can be signed in (and so nobody can check out)
export const getAccount = async (event: H3Event) => {
    if (String(useRuntimeConfig().sessionSecret || '').length < 32) return null
    return (await session(event)).data.account || null
}

export const requireAccount = async (event: H3Event) => {
    const account = await getAccount(event)
    if (!account) throw createError({ statusCode: 401, statusMessage: 'Not signed in' })
    return account
}

export const setAccount = async (event: H3Event, account: Account) => {
    await (await session(event)).update({ account })
}

export const clearAccount = async (event: H3Event) => {
    await (await session(event)).clear()
}

// WooCommerce customer -> session shape
export const toAccount = (customer: any): Account => ({
    id: Number(customer.id),
    email: String(customer.email || ''),
    first_name: String(customer.first_name || customer.billing?.first_name || ''),
    last_name: String(customer.last_name || customer.billing?.last_name || ''),
    phone: String(customer.billing?.phone || ''),
})

// Checks an email + password with WordPress through the JWT Authentication
// plugin (it only issues a token for valid credentials; the token itself isn't kept).
export const checkPassword = async (email: string, password: string) => {
    try {
        await $fetch(`${wpUrl()}/wp-json/jwt-auth/v1/token`, {
            method: 'POST',
            body: { username: email, password },
            timeout: 15000,
        })
        return true
    } catch (e: any) {
        const status = e?.response?.status
        if (status === 403 || status === 401) return false
        // 404 = plugin missing, anything else = WordPress unreachable
        throw createError({ statusCode: 503, statusMessage: 'Login service unavailable' })
    }
}

/* ---------- small in-memory brake on password guessing ---------- */
const attempts = new Map<string, { count: number, until: number }>()
const WINDOW_MS = 15 * 60 * 1000
const MAX_ATTEMPTS = 8

export const assertNotThrottled = (key: string) => {
    const entry = attempts.get(key)
    if (entry && entry.until > Date.now() && entry.count >= MAX_ATTEMPTS) {
        throw createError({ statusCode: 429, statusMessage: 'Too many attempts' })
    }
}

export const recordFailure = (key: string) => {
    const now = Date.now()
    const entry = attempts.get(key)
    if (!entry || entry.until < now) attempts.set(key, { count: 1, until: now + WINDOW_MS })
    else entry.count++
}

export const clearFailures = (key: string) => attempts.delete(key)

// Order statuses a customer can still pay for
export const PAYABLE_STATUSES = ['pending', 'failed']

// Loads one order of the signed-in customer (404 for anyone else's order)
export const getOwnOrder = async (event: H3Event) => {
    const account = await requireAccount(event)
    const id = Number(getRouterParam(event, 'id'))
    if (!Number.isInteger(id) || id <= 0) throw createError({ statusCode: 404, statusMessage: 'Order not found' })

    let order: any
    try {
        order = await wooFetch(`/orders/${id}`)
    } catch {
        throw createError({ statusCode: 404, statusMessage: 'Order not found' })
    }
    if (Number(order.customer_id) !== account.id) {
        throw createError({ statusCode: 404, statusMessage: 'Order not found' })
    }
    return order
}
