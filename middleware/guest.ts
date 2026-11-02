// Login / register: already signed-in customers go straight on
export default defineNuxtRouteMiddleware((to) => {
    const { account } = useAccount()
    if (account.value) return navigateTo(safeRedirect(to.query.redirect))
})
