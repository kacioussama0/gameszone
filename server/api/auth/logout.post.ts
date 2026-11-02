export default defineEventHandler(async (event) => {
    await clearAccount(event)
    return { ok: true }
})
