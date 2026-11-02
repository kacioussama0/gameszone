<script setup lang="ts">
// "Continue with Google" for the login and register pages, with an "or" divider
// above the email form. Google's own button (Google Identity Services) renders here
// and hands back an ID token; WordPress checks it (server/api/auth/google.post.ts).
const props = defineProps<{ redirect: string }>()
const emit = defineEmits<{ error: [key: string] }>()

const clientId = String(useRuntimeConfig().public.googleClientId || '')
const { locale } = useI18n()
const { loginWithGoogle } = useAccount()

const slot = ref<HTMLElement | null>(null)
// hidden if Google's script can't load (blocked, offline)
const failed = ref(false)
const busy = ref(false)

// One copy of Google's script for the whole visit
let gsiScript: Promise<any> | null = null
const loadGsi = () => gsiScript ??= new Promise((resolve, reject) => {
  if ((window as any).google?.accounts?.id) return resolve((window as any).google)
  const script = document.createElement('script')
  script.src = 'https://accounts.google.com/gsi/client'
  script.async = true
  script.onload = () => resolve((window as any).google)
  script.onerror = () => {
    gsiScript = null
    reject(new Error('Google sign-in script failed to load'))
  }
  document.head.appendChild(script)
})

const onCredential = async ({ credential }: { credential?: string }) => {
  if (!credential || busy.value) return
  busy.value = true
  try {
    await loginWithGoogle(credential)
    await navigateTo(props.redirect)
  } catch (e: any) {
    emit('error', e?.response?.status === 429 ? 'account.errors.tooMany' : 'account.errors.google')
  } finally {
    busy.value = false
  }
}

const render = async () => {
  if (!clientId || !slot.value) return
  try {
    const google = await loadGsi()
    google.accounts.id.initialize({
      client_id: clientId,
      callback: onCredential,
      ux_mode: 'popup',
      cancel_on_tap_outside: true,
    })
    slot.value.replaceChildren()
    google.accounts.id.renderButton(slot.value, {
      type: 'standard',
      theme: 'outline',
      size: 'large',
      shape: 'pill',
      text: 'continue_with',
      logo_alignment: 'center',
      locale: locale.value,
      // Google's button is 200–400px wide
      width: Math.min(400, Math.max(200, Math.round(slot.value.offsetWidth))),
    })
  } catch {
    failed.value = true
  }
}

onMounted(render)
watch(locale, render)
</script>

<template>
  <div v-if="clientId && !failed" class="google-login">
    <div ref="slot" class="google-slot" :class="{ busy }" :aria-busy="busy"></div>

    <p class="or"><span>{{ $t('account.or') }}</span></p>
  </div>
</template>

<style scoped>
/* holds Google's button (an iframe), centered, its height kept while it loads */
.google-slot {
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 44px;
  transition: opacity .15s ease;
}

.google-slot.busy {
  opacity: .5;
  pointer-events: none;
}

.or {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 18px 0;
  color: var(--gs-muted);
  font-size: 13px;
}

.or::before,
.or::after {
  content: "";
  flex: 1;
  height: 1px;
  background: var(--gs-border);
}
</style>
