import { z } from 'zod'

// "Continue with Google": the button on the page (Google Identity Services) hands us
// a Google ID token; WordPress verifies it and returns the user, creating it on first
// use (wordpress/mu-plugins/gameszone-google-login.php). We only open the session.

const schema = z.object({
    credential: z.string().min(20).max(4096),
})

export default defineEventHandler(async (event) => {
    const parsed = schema.safeParse(await readBody(event))
    if (!parsed.success) throw createError({ statusCode: 400, statusMessage: 'Invalid Google sign-in' })

    const key = `google:${getRequestIP(event, { xForwardedFor: true }) || 'ip?'}`
    assertNotThrottled(key)

    let customer: any
    try {
        customer = await $fetch(`${wpUrl()}/wp-json/gameszone/v1/google-login`, {
            method: 'POST',
            body: { credential: parsed.data.credential },
            timeout: 20000,
        })
    } catch (e: any) {
        const status = e?.response?.status
        if (status === 401) {
            recordFailure(key)
            throw createError({ statusCode: 401, statusMessage: 'Invalid Google sign-in' })
        }
        // 404 = plugin missing, anything else = WordPress or Google unreachable
        console.error('[google-login] failed:', status, JSON.stringify(e?.data)?.slice(0, 300))
        throw createError({ statusCode: 503, statusMessage: 'Login service unavailable' })
    }
    clearFailures(key)

    const account = toAccount(customer)
    await setAccount(event, account)
    return { account }
})
