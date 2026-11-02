import { z } from 'zod'

const schema = z.object({
    email: z.string().trim().toLowerCase().email(),
    password: z.string().min(1).max(200),
})

export default defineEventHandler(async (event) => {
    const parsed = schema.safeParse(await readBody(event))
    if (!parsed.success) throw createError({ statusCode: 400, statusMessage: 'Invalid email or password' })
    const { email, password } = parsed.data

    const key = `${getRequestIP(event, { xForwardedFor: true }) || 'ip?'}:${email}`
    assertNotThrottled(key)

    if (!(await checkPassword(email, password))) {
        recordFailure(key)
        throw createError({ statusCode: 401, statusMessage: 'Invalid email or password' })
    }
    clearFailures(key)

    // role=all: also finds WordPress users that aren't plain "customers" (e.g. shop staff)
    const customers = await wooFetch<any[]>('/customers', { query: { email, role: 'all' } })
    const customer = customers?.[0]
    if (!customer) throw createError({ statusCode: 401, statusMessage: 'Invalid email or password' })

    const account = toAccount(customer)
    await setAccount(event, account)
    return { account }
})
