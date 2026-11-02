// Reads the session once per visit (on the server for the first page), so the
// header and the account guards know who is signed in without a flash
export default defineNuxtPlugin(async () => {
    const { loaded, refresh } = useAccount()
    if (!loaded.value) await refresh()
})
