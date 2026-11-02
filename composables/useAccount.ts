export type Account = {
    id: number
    email: string
    first_name: string
    last_name: string
    phone: string
}

// Signed-in customer, shared by the header, checkout and account pages.
// Loaded once per visit by plugins/account.ts (the session lives in an httpOnly cookie).
export const useAccount = () => {
    const account = useState<Account | null>('account', () => null)
    const loaded = useState('account:loaded', () => false)

    const refresh = async () => {
        // forwards the browser's cookie when this runs during server rendering
        const fetcher = useRequestFetch()
        try {
            const res: any = await fetcher('/api/auth/session')
            account.value = res?.account || null
        } catch {
            account.value = null
        }
        loaded.value = true
    }

    const login = async (body: { email: string, password: string }) => {
        const res: any = await $fetch('/api/auth/login', { method: 'POST', body })
        account.value = res.account
    }

    // credential: the ID token from Google's button, checked by WordPress
    const loginWithGoogle = async (credential: string) => {
        const res: any = await $fetch('/api/auth/google', { method: 'POST', body: { credential } })
        account.value = res.account
    }

    const register = async (body: Record<string, string>) => {
        const res: any = await $fetch('/api/auth/register', { method: 'POST', body })
        account.value = res.account
    }

    const logout = async () => {
        await $fetch('/api/auth/logout', { method: 'POST' })
        account.value = null
        await navigateTo('/')
    }

    const initials = computed(() =>
        ((account.value?.first_name?.[0] || '') + (account.value?.last_name?.[0] || '')).toUpperCase()
        || account.value?.email?.[0]?.toUpperCase() || '')

    return { account, loaded, isLoggedIn: computed(() => !!account.value), initials, refresh, login, loginWithGoogle, register, logout }
}
