<script setup lang="ts">
import { z } from "zod"

definePageMeta({ middleware: 'guest' })

const { t } = useI18n()
const route = useRoute()
const config = useRuntimeConfig()
const { login } = useAccount()

useHead({
  title: () => t('account.loginTitle'),
  meta: [{ name: 'robots', content: 'noindex, follow' }],
})

const schema = z.object({
  email: z.string().trim().email('form.errors.emailInvalid'),
  password: z.string().min(1, 'account.errors.passwordRequired'),
})

const form = reactive({ email: '', password: '' })
const errors = ref<Record<string, string>>({})
const submitError = ref('')
const isLoading = ref(false)
const showPassword = ref(false)

const redirectTo = computed(() => safeRedirect(route.query.redirect))
// Sent here by the checkout (no guest orders): say why
const fromCheckout = computed(() => redirectTo.value.startsWith('/checkout'))
const lostPasswordUrl = computed(() => `${String(config.public.wpUrl).replace(/\/$/, '')}/wp-login.php?action=lostpassword`)

const submit = async () => {
  submitError.value = ''
  const result = schema.safeParse(form)
  errors.value = {}
  if (!result.success) {
    result.error.issues.forEach(issue => {
      const key = String(issue.path[0])
      if (!errors.value[key]) errors.value[key] = issue.message
    })
    return
  }

  isLoading.value = true
  try {
    await login({ email: form.email.trim(), password: form.password })
    await navigateTo(redirectTo.value)
  } catch (e: any) {
    const status = e?.response?.status
    submitError.value = status === 401 ? 'account.errors.badCredentials'
        : status === 429 ? 'account.errors.tooMany'
        : 'account.errors.unavailable'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <AuthShell :title="$t('account.loginTitle')" :subtitle="fromCheckout ? $t('account.checkoutNotice') : $t('account.loginSubtitle')">
    <GoogleLoginButton :redirect="redirectTo" @error="submitError = $event" />

    <form class="gz-form auth-form" novalidate @submit.prevent="submit">
      <div>
        <label class="field-label" for="login-email">{{ $t('form.email') }}</label>
        <div class="input-icon">
          <i class="iconly-Curved-Message" aria-hidden="true"></i>
          <input id="login-email" v-model="form.email" type="email" inputmode="email" autocomplete="email"
                 dir="ltr" class="form-control" :aria-invalid="!!errors.email" :disabled="isLoading" />
        </div>
        <p v-if="errors.email" class="field-error">{{ $t(errors.email) }}</p>
      </div>

      <div>
        <div class="label-row">
          <label class="field-label" for="login-password">{{ $t('account.password') }}</label>
          <a :href="lostPasswordUrl" class="small-link" target="_blank" rel="noopener">{{ $t('account.forgot') }}</a>
        </div>
        <div class="input-icon">
          <i class="iconly-Curved-Lock" aria-hidden="true"></i>
          <input id="login-password" v-model="form.password" :type="showPassword ? 'text' : 'password'"
                 autocomplete="current-password" class="form-control" :aria-invalid="!!errors.password" :disabled="isLoading" />
          <button type="button" class="eye-btn" :aria-label="$t(showPassword ? 'account.hidePassword' : 'account.showPassword')"
                  :aria-pressed="showPassword" @click="showPassword = !showPassword">
            <i :class="showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'"></i>
          </button>
        </div>
        <p v-if="errors.password" class="field-error">{{ $t(errors.password) }}</p>
      </div>

      <div v-if="submitError" class="alert alert-danger rounded-3 small mb-0" role="alert">{{ $t(submitError) }}</div>

      <button type="submit" class="btn btn-primary btn-lg btn-block" :disabled="isLoading">
        <span v-if="isLoading" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
        {{ isLoading ? $t('common.wait') : $t('account.login') }}
      </button>
    </form>

    <p class="switch">
      {{ $t('account.noAccount') }}
      <NuxtLink :to="{ path: '/account/register', query: route.query.redirect ? { redirect: redirectTo } : {} }">{{ $t('account.createAccount') }}</NuxtLink>
    </p>
  </AuthShell>
</template>

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.label-row {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 10px;
}

.small-link {
  margin-bottom: 6px;
  color: var(--gs-primary);
  font-size: 13px;
  font-weight: 600;
}

.switch {
  margin: 20px 0 0;
  padding-top: 18px;
  border-top: 1px solid var(--gs-surface);
  color: var(--gs-muted);
  font-size: 14px;
  text-align: center;
}

.switch a {
  color: var(--gs-primary);
  font-weight: 700;
}
</style>
