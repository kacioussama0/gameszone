// Account pages: signed-in customers only
export default defineNuxtRouteMiddleware((to) => {
    const { account } = useAccount()
    if (!account.value) return navigateTo({ path: '/account/login', query: { redirect: to.fullPath } })
})
