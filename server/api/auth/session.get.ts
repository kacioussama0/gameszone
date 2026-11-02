// Who is signed in, straight from the encrypted cookie (no WooCommerce call)
export default defineEventHandler(async (event) => ({ account: await getAccount(event) }))
