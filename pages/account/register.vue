<script setup lang="ts">
import { z } from "zod"

definePageMeta({ middleware: 'guest' })

const { t } = useI18n()
const route = useRoute()
const { register } = useAccount()

useHead({
  title: () => t('account.registerTitle'),
  meta: [{ name: 'robots', content: 'noindex, follow' }],
})

const schema = z.object({
  first_name: z.string().trim().min(2, 'form.errors.firstNameRequired').max(50),
  last_name: z.string().trim().min(2, 'form.errors.lastNameRequired').max(50),
  email: z.string().trim().email('form.errors.emailInvalid'),
  phone: z.string().regex(/^(05|06|07)[0-9]{8}$/, 'form.errors.phoneInvalid'),
  password: z.string().min(8, 'account.errors.passwordShort'),
  terms: z.boolean().refine(v => v, 'form.errors.termsRequired'),
})

const form = reactive({ first_name: '', last_name: '', email: '', phone: '', password: '', terms: false })
const errors = ref<Record<string, string>>({})
const submitError = ref('')
const isLoading = ref(false)
const showPassword = ref(false)

/* ---------- password generator ---------- */
// No look-alikes (0/O, 1/l/I) so the password can be read back and typed elsewhere
const PASSWORD_SETS = ['ABCDEFGHJKLMNPQRSTUVWXYZ', 'abcdefghijkmnopqrstuvwxyz', '23456789', '!@#$%&*?-_+=']
const PASSWORD_LENGTH = 16

// Unbiased random index from the browser's cryptographic generator
const randomIndex = (max: number) => {
  const limit = Math.floor(0x100000000 / max) * max
  const value = new Uint32Array(1)
  do crypto.getRandomValues(value)
  while (value[0] >= limit)
  return value[0] % max
}

// One character of each kind, the rest from all of them, then shuffled
const generatePassword = () => {
  const all = PASSWORD_SETS.join('')
  const chars = PASSWORD_SETS.map(set => set[randomIndex(set.length)])
  while (chars.length < PASSWORD_LENGTH) chars.push(all[randomIndex(all.length)])
  for (let i = chars.length - 1; i > 0; i--) {
    const j = randomIndex(i + 1)
    ;[chars[i], chars[j]] = [chars[j], chars[i]]
  }
  return chars.join('')
}

// The last generated password: the hint and Copy button show while the field still holds it
const generated = ref('')
const passwordGenerated = computed(() => !!generated.value && form.password === generated.value)
const passwordCopied = ref(false)
let copiedTimer: ReturnType<typeof setTimeout> | undefined

// Fills the field and shows it, so the shopper can see and copy what they got
const fillGeneratedPassword = () => {
  generated.value = generatePassword()
  form.password = generated.value
  showPassword.value = true
  passwordCopied.value = false
  delete errors.value.password
}

const copyPassword = async () => {
  try {
    await navigator.clipboard.writeText(form.password)
    passwordCopied.value = true
    clearTimeout(copiedTimer)
    copiedTimer = setTimeout(() => (passwordCopied.value = false), 2000)
  } catch {
    // Clipboard blocked: the password is visible in the field, so it can still be copied by hand
    document.getElementById('reg-password')?.focus()
    ;(document.getElementById('reg-password') as HTMLInputElement | null)?.select()
  }
}

onBeforeUnmount(() => clearTimeout(copiedTimer))

const redirectTo = computed(() => safeRedirect(route.query.redirect))
// Sent here by the checkout (no guest orders): say why
const fromCheckout = computed(() => redirectTo.value.startsWith('/checkout'))

// Keep only digits so "05 50 77 99 73" is accepted as typed
watch(() => form.phone, (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  if (digits !== value) form.phone = digits
})

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
    await register({
      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),
      email: form.email.trim(),
      phone: form.phone,
      password: form.password,
    })
    await navigateTo(redirectTo.value)
  } catch (e: any) {
    const status = e?.response?.status
    if (status === 409) errors.value.email = 'account.errors.emailTaken'
    else submitError.value = status === 429 ? 'account.errors.tooMany' : 'account.errors.registerFailed'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <AuthShell :title="$t('account.registerTitle')" :subtitle="fromCheckout ? $t('account.checkoutNotice') : $t('account.registerSubtitle')">
    <GoogleLoginButton :redirect="redirectTo" @error="submitError = $event" />

    <form class="gz-form auth-form" novalidate @submit.prevent="submit">
      <div class="row g-3">
        <div class="col-sm-6">
          <label class="field-label" for="reg-first">{{ $t('form.firstName') }}</label>
          <input id="reg-first" v-model="form.first_name" class="form-control" autocomplete="given-name"
                 :aria-invalid="!!errors.first_name" :disabled="isLoading" />
          <p v-if="errors.first_name" class="field-error">{{ $t(errors.first_name) }}</p>
        </div>
        <div class="col-sm-6">
          <label class="field-label" for="reg-last">{{ $t('form.lastName') }}</label>
          <input id="reg-last" v-model="form.last_name" class="form-control" autocomplete="family-name"
                 :aria-invalid="!!errors.last_name" :disabled="isLoading" />
          <p v-if="errors.last_name" class="field-error">{{ $t(errors.last_name) }}</p>
        </div>
      </div>

      <div>
        <label class="field-label" for="reg-email">{{ $t('form.email') }}</label>
        <div class="input-icon">
          <i class="iconly-Curved-Message" aria-hidden="true"></i>
          <input id="reg-email" v-model="form.email" type="email" inputmode="email" autocomplete="email"
                 dir="ltr" class="form-control" :aria-invalid="!!errors.email" aria-describedby="reg-email-hint" :disabled="isLoading" />
        </div>
        <p v-if="errors.email" class="field-error">
          {{ $t(errors.email) }}
          <NuxtLink v-if="errors.email === 'account.errors.emailTaken'" to="/account/login">{{ $t('account.login') }}</NuxtLink>
        </p>
        <p v-else id="reg-email-hint" class="field-hint">{{ $t('checkout.emailHint') }}</p>
      </div>

      <div>
        <label class="field-label" for="reg-phone">{{ $t('form.phone') }}</label>
        <div class="input-icon">
          <i class="iconly-Curved-Call" aria-hidden="true"></i>
          <input id="reg-phone" v-model="form.phone" type="tel" inputmode="numeric" autocomplete="tel-national"
                 maxlength="10" placeholder="05XXXXXXXX" dir="ltr" class="form-control"
                 :aria-invalid="!!errors.phone" :disabled="isLoading" />
        </div>
        <p v-if="errors.phone" class="field-error">{{ $t(errors.phone) }}</p>
      </div>

      <div>
        <label class="field-label" for="reg-password">{{ $t('account.password') }}</label>
        <div class="input-icon">
          <i class="iconly-Curved-Lock" aria-hidden="true"></i>
          <input id="reg-password" v-model="form.password" :type="showPassword ? 'text' : 'password'"
                 autocomplete="new-password" class="form-control" :aria-invalid="!!errors.password"
                 aria-describedby="reg-password-hint" :disabled="isLoading" />
          <button type="button" class="eye-btn" :aria-label="$t(showPassword ? 'account.hidePassword' : 'account.showPassword')"
                  :aria-pressed="showPassword" @click="showPassword = !showPassword">
            <i :class="showPassword ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'"></i>
          </button>
        </div>
        <p v-if="errors.password" class="field-error">{{ $t(errors.password) }}</p>
        <p v-else-if="passwordGenerated" id="reg-password-hint" class="field-hint" aria-live="polite">{{ $t('account.passwordGenerated') }}</p>
        <p v-else id="reg-password-hint" class="field-hint">{{ $t('account.passwordHint') }}</p>

        <div class="password-tools">
          <button type="button" class="tool-btn" :disabled="isLoading" @click="fillGeneratedPassword">
            <i class="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i>{{ $t('account.generatePassword') }}
          </button>
          <button v-if="passwordGenerated" type="button" class="tool-btn" :class="{ done: passwordCopied }" @click="copyPassword">
            <i :class="passwordCopied ? 'fa-solid fa-check' : 'fa-regular fa-copy'" aria-hidden="true"></i>
            <span aria-live="polite">{{ passwordCopied ? $t('account.passwordCopied') : $t('account.copyPassword') }}</span>
          </button>
        </div>
      </div>

      <label class="terms">
        <input type="checkbox" class="form-check-input" v-model="form.terms" :aria-invalid="!!errors.terms" />
        <span>{{ $t('checkout.terms') }}</span>
      </label>
      <p v-if="errors.terms" class="field-error mt-n2">{{ $t(errors.terms) }}</p>

      <div v-if="submitError" class="alert alert-danger rounded-3 small mb-0" role="alert">{{ $t(submitError) }}</div>

      <button type="submit" class="btn btn-primary btn-lg btn-block" :disabled="isLoading">
        <span v-if="isLoading" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
        {{ isLoading ? $t('common.wait') : $t('account.createAccount') }}
      </button>
    </form>

    <p class="switch">
      {{ $t('account.haveAccount') }}
      <NuxtLink :to="{ path: '/account/login', query: route.query.redirect ? { redirect: redirectTo } : {} }">{{ $t('account.login') }}</NuxtLink>
    </p>
  </AuthShell>
</template>

<style scoped>
.auth-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.terms {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  color: var(--gs-text-2);
  font-size: 13.5px;
  cursor: pointer;
}

.terms .form-check-input {
  flex: none;
  margin-top: 2px;
}

.field-error a {
  margin-inline-start: 4px;
  color: var(--gs-primary);
  font-weight: 700;
}

/* Generate / copy: small text buttons under the password field */
.password-tools {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 18px;
  margin-top: 8px;
}

.tool-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 0;
  border: 0;
  background: none;
  color: var(--gs-primary);
  font-size: 13px;
  font-weight: 600;
}

.tool-btn:hover:not(:disabled) {
  text-decoration: underline;
  text-underline-offset: 3px;
}

.tool-btn:disabled {
  opacity: .5;
}

.tool-btn.done {
  color: var(--gs-success);
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
