import { z } from 'zod'

const schema = z.object({
    current_password: z.string().min(1).max(200),
    new_password: z.string().min(8).max(200),
})

export default defineEventHandler(async (event) => {
    const account = await requireAccount(event)
    const parsed = schema.safeParse(await readBody(event))
    if (!parsed.success) throw createError({ statusCode: 400, statusMessage: 'Invalid password' })

    const key = `password:${account.id}`
    assertNotThrottled(key)

    if (!(await checkPassword(account.email, parsed.data.current_password))) {
        recordFailure(key)
        throw createError({ statusCode: 403, statusMessage: 'Current password is incorrect' })
    }
    clearFailures(key)

    await wooFetch(`/customers/${account.id}`, {
        method: 'PUT',
        body: { password: parsed.data.new_password },
    })
    return { ok: true }
})
