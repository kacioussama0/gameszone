// Light / dark theme. The inline script in app.vue applies the saved choice (or
// the device setting) before the first paint; this keeps the header toggle in sync.
export type Theme = 'light' | 'dark'

export const THEME_STORAGE_KEY = 'gz-theme'

// Runs in <head> before the page paints, so there's no flash of the wrong theme
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}var d=document.documentElement;d.setAttribute('data-theme',t);d.setAttribute('data-bs-theme',t)}catch(e){}})()`

export const useTheme = () => {
    // Starts as "light" on the server; sync() reads the real value after hydration
    const theme = useState<Theme>('gz-theme', () => 'light')

    const sync = () => {
        if (import.meta.client) {
            theme.value = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light'
        }
    }

    const setTheme = (value: Theme) => {
        theme.value = value
        const root = document.documentElement
        root.setAttribute('data-theme', value)
        root.setAttribute('data-bs-theme', value)
        try {
            localStorage.setItem(THEME_STORAGE_KEY, value)
        } catch {}
    }

    // The new theme grows as a circle from the clicked button (View Transitions API);
    // browsers without it, or with reduced motion, switch instantly
    const toggle = (event?: MouseEvent) => {
        const next: Theme = theme.value === 'dark' ? 'light' : 'dark'
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (!document.startViewTransition || reduced) return setTheme(next)

        const target = event?.currentTarget as HTMLElement | undefined
        const rect = target?.getBoundingClientRect()
        const x = rect ? rect.left + rect.width / 2 : window.innerWidth / 2
        const y = rect ? rect.top + rect.height / 2 : 0
        const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))

        document.startViewTransition(() => setTheme(next)).ready.then(() => {
            document.documentElement.animate(
                { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
                { duration: 550, easing: 'cubic-bezier(.4, 0, .2, 1)', pseudoElement: '::view-transition-new(root)' },
            )
        })
    }

    return { theme, isDark: computed(() => theme.value === 'dark'), sync, toggle, setTheme }
}
