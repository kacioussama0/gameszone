<script setup lang="ts">
import { z } from "zod"

definePageMeta({ middleware: 'account' })

const { t } = useI18n()
const { account } = useAccount()

useHead({
  title: () => t('account.settings'),
  meta: [{ name: 'robots', content: 'noindex' }],
})

/* ---------- profile ---------- */
const profileSchema = z.object({
  first_name: z.string().trim().min(2, 'form.errors.firstNameRequired').max(50),
  last_name: z.string().trim().min(2, 'form.errors.lastNameRequired').max(50),
  phone: z.string().regex(/^(05|06|07)[0-9]{8}$/, 'form.errors.phoneInvalid'),
})

const profile = reactive({
  first_name: account.value?.first_name || '',
  last_name: account.value?.last_name || '',
  phone: account.value?.phone || '',
})
const profileErrors = ref<Record<string, string>>({})
const profileState = ref<'' | 'saving' | 'saved' | 'error'>('')

watch(() => profile.phone, (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  if (digits !== value) profile.phone = digits
})

const saveProfile = async () => {
  const result = profileSchema.safeParse(profile)
  profileErrors.value = {}
  if (!result.success) {
    result.error.issues.forEach(issue => {
      const key = String(issue.path[0])
      if (!profileErrors.value[key]) profileErrors.value[key] = issue.message
    })
    return
  }

  profileState.value = 'saving'
  try {
    const res: any = await $fetch('/api/account/profile', { method: 'PUT', body: result.data })
    account.value = res.account
    profileState.value = 'saved'
  } catch {
    profileState.value = 'error'
  }
}

/* ---------- password ---------- */
const passwords = reactive({ current: '', next: '' })
const passwordErrors = ref<Record<string, string>>({})
const passwordState = ref<'' | 'saving' | 'saved' | 'error'>('')
const showPasswords = ref(false)

const savePassword = async () => {
  passwordErrors.value = {}
  if (!passwords.current) passwordErrors.value.current = 'account.errors.passwordRequired'
  if (passwords.next.length < 8) passwordErrors.value.next = 'account.errors.passwordShort'
  if (Object.keys(passwordErrors.value).length) return

  passwordState.value = 'saving'
  try {
    await $fetch('/api/account/password', {
      method: 'PUT',
      body: { current_password: passwords.current, new_password: passwords.next },
    })
    passwords.current = ''
    passwords.next = ''
    passwordState.value = 'saved'
  } catch (e: any) {
    const status = e?.response?.status
    if (status === 403) {
      passwordErrors.value.current = 'account.errors.wrongPassword'
      passwordState.value = ''
    } else {
      passwordState.value = 'error'
    }
  }
}
</script>

<template>
  <AccountShell :title="$t('account.settings')">
    <div class="settings-grid">
      <!-- Profile -->
      <section class="panel">
        <h2 class="panel-title">{{ $t('account.profile') }}</h2>
        <form class="gz-form stack" novalidate @submit.prevent="saveProfile">
          <div class="row g-3">
            <div class="col-sm-6">
              <label class="field-label" for="set-first">{{ $t('form.firstName') }}</label>
              <input id="set-first" v-model="profile.first_name" class="form-control" autocomplete="given-name"
                     :aria-invalid="!!profileErrors.first_name" />
              <p v-if="profileErrors.first_name" class="field-error">{{ $t(profileErrors.first_name) }}</p>
            </div>
            <div class="col-sm-6">
              <label class="field-label" for="set-last">{{ $t('form.lastName') }}</label>
              <input id="set-last" v-model="profile.last_name" class="form-control" autocomplete="family-name"
                     :aria-invalid="!!profileErrors.last_name" />
              <p v-if="profileErrors.last_name" class="field-error">{{ $t(profileErrors.last_name) }}</p>
            </div>
          </div>

          <div>
            <label class="field-label" for="set-email">{{ $t('form.email') }}</label>
            <div class="input-icon">
              <i class="iconly-Curved-Message" aria-hidden="true"></i>
              <input id="set-email" :value="account?.email" type="email" dir="ltr" class="form-control" readonly
                     aria-describedby="set-email-hint" />
            </div>
            <p id="set-email-hint" class="field-hint">{{ $t('account.emailLocked') }}</p>
          </div>

          <div>
            <label class="field-label" for="set-phone">{{ $t('form.phone') }}</label>
            <div class="input-icon">
              <i class="iconly-Curved-Call" aria-hidden="true"></i>
              <input id="set-phone" v-model="profile.phone" type="tel" inputmode="numeric" autocomplete="tel-national"
                     maxlength="10" dir="ltr" class="form-control" :aria-invalid="!!profileErrors.phone" />
            </div>
            <p v-if="profileErrors.phone" class="field-error">{{ $t(profileErrors.phone) }}</p>
          </div>

          <div class="form-foot">
            <button type="submit" class="btn btn-primary" :disabled="profileState === 'saving'">
              <span v-if="profileState === 'saving'" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
              {{ $t('account.save') }}
            </button>
            <span role="status" class="state" :class="profileState">
              <template v-if="profileState === 'saved'"><i class="fa-solid fa-check"></i> {{ $t('account.saved') }}</template>
              <template v-else-if="profileState === 'error'">{{ $t('account.errors.saveFailed') }}</template>
            </span>
          </div>
        </form>
      </section>

      <!-- Password -->
      <section class="panel">
        <h2 class="panel-title">{{ $t('account.changePassword') }}</h2>
        <form class="gz-form stack" novalidate @submit.prevent="savePassword">
          <div>
            <label class="field-label" for="set-current">{{ $t('account.currentPassword') }}</label>
            <div class="input-icon">
              <i class="iconly-Curved-Lock" aria-hidden="true"></i>
              <input id="set-current" v-model="passwords.current" :type="showPasswords ? 'text' : 'password'"
                     autocomplete="current-password" class="form-control" :aria-invalid="!!passwordErrors.current" />
            </div>
            <p v-if="passwordErrors.current" class="field-error">{{ $t(passwordErrors.current) }}</p>
          </div>

          <div>
            <label class="field-label" for="set-next">{{ $t('account.newPassword') }}</label>
            <div class="input-icon">
              <i class="iconly-Curved-Lock" aria-hidden="true"></i>
              <input id="set-next" v-model="passwords.next" :type="showPasswords ? 'text' : 'password'"
                     autocomplete="new-password" class="form-control" :aria-invalid="!!passwordErrors.next" />
              <button type="button" class="eye-btn" :aria-label="$t(showPasswords ? 'account.hidePassword' : 'account.showPassword')"
                      :aria-pressed="showPasswords" @click="showPasswords = !showPasswords">
                <i :class="showPasswords ? 'fa-regular fa-eye-slash' : 'fa-regular fa-eye'"></i>
              </button>
            </div>
            <p v-if="passwordErrors.next" class="field-error">{{ $t(passwordErrors.next) }}</p>
            <p v-else class="field-hint">{{ $t('account.passwordHint') }}</p>
          </div>

          <div class="form-foot">
            <button type="submit" class="btn btn-outline-primary" :disabled="passwordState === 'saving'">
              <span v-if="passwordState === 'saving'" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
              {{ $t('account.updatePassword') }}
            </button>
            <span role="status" class="state" :class="passwordState">
              <template v-if="passwordState === 'saved'"><i class="fa-solid fa-check"></i> {{ $t('account.passwordUpdated') }}</template>
              <template v-else-if="passwordState === 'error'">{{ $t('account.errors.saveFailed') }}</template>
            </span>
          </div>
        </form>
      </section>
    </div>
  </AccountShell>
</template>

<style scoped>
.settings-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  align-items: start;
}

.panel {
  padding: 22px;
  border-radius: 20px;
  background: var(--gs-bg-1);
  border: 1px solid var(--gs-surface);
}

.panel-title {
  margin: 0 0 16px;
  font-size: 17px;
}

.stack {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-control[readonly] {
  background: var(--gs-surface);
  color: var(--gs-muted);
}

.form-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.state {
  font-size: 13.5px;
  font-weight: 600;
}

.state.saved {
  color: var(--gs-success);
}

.state.error {
  color: var(--gs-danger);
}

@media (max-width: 1199.98px) {
  .settings-grid {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
