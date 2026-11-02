export default defineEventHandler(async (event) => {
    const account = await requireAccount(event)
    const customer = await wooFetch(`/customers/${account.id}`)

    return {
        first_name: customer.first_name || '',
        last_name: customer.last_name || '',
        email: customer.email || '',
        phone: customer.billing?.phone || '',
        date_created: customer.date_created,
    }
})
