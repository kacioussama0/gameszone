import { z } from 'zod'

// Name and phone only: the email is the login and where codes are sent,
// so it isn't changed from the storefront
const schema = z.object({
    first_name: z.string().trim().min(2).max(50),
    last_name: z.string().trim().min(2).max(50),
    phone: z.string().regex(/^(05|06|07)[0-9]{8}$/),
})

export default defineEventHandler(async (event) => {
    const account = await requireAccount(event)
    const parsed = schema.safeParse(await readBody(event))
    if (!parsed.success) throw createError({ statusCode: 400, statusMessage: 'Invalid profile details' })
    const { first_name, last_name, phone } = parsed.data

    const customer = await wooFetch(`/customers/${account.id}`, {
        method: 'PUT',
        body: { first_name, last_name, billing: { first_name, last_name, phone } },
    })

    const updated = toAccount(customer)
    await setAccount(event, updated)
    return { account: updated }
})
