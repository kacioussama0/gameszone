<script setup lang="ts">
// Payment method choice for checkout and the product "buy now" form.
// Online = CIB / Edahabia on Slick-Pay; the others are transfers proven by a receipt.
const props = defineProps<{
  total: number
  // i18n key of an error to show under the receipt field
  proofError?: string
  disabled?: boolean
}>()

const method = defineModel<string>({ default: ONLINE_METHOD_ID })
const proof = defineModel<File | null>('proof', { default: null })

const { t } = useI18n()

const manual = computed(() => findManualMethod(method.value))

const formatPrice = (value: number) => `${Number(value).toLocaleString('fr-FR')} ${t('common.currency')}`

/* ---------- EUR / USD methods: amount converted at today's parallel rate ---------- */
const { rate, label: foreignAmount, pending: ratesPending } = useForeignAmount(method, () => props.total)

/* ---------- copy account details ---------- */
const copied = ref('')
const copy = async (value: string) => {
  try {
    await navigator.clipboard.writeText(value)
    copied.value = value
    setTimeout(() => copied.value === value && (copied.value = ''), 1800)
  } catch {}
}

/* ---------- receipt ---------- */
const localError = ref('')
const fileInput = ref<HTMLInputElement | null>(null)
const isDragging = ref(false)

const ACCEPTED = PROOF_ACCEPT.split(',')

const pick = (file?: File | null) => {
  localError.value = ''
  if (!file) return
  if (!ACCEPTED.includes(file.type)) {
    localError.value = 'payment.proofType'
    return
  }
  if (file.size > PROOF_MAX_BYTES) {
    localError.value = 'payment.proofSize'
    return
  }
  proof.value = file
}

const onDrop = (e: DragEvent) => {
  isDragging.value = false
  pick(e.dataTransfer?.files?.[0])
}

const clearProof = () => {
  proof.value = null
  if (fileInput.value) fileInput.value.value = ''
}

const sizeLabel = (bytes: number) => bytes > 1024 * 1024
    ? `${(bytes / 1024 / 1024).toFixed(1)} Mo`
    : `${Math.max(1, Math.round(bytes / 1024))} Ko`

// A receipt belongs to one method: drop it when switching
watch(method, () => clearProof())

const shownError = computed(() => localError.value || props.proofError || '')
</script>

<template>
  <div class="pay-picker">
    <div class="methods" role="radiogroup" :aria-label="$t('payment.chooseMethod')">
      <!-- Online card payment: the recommended way, confirmed instantly -->
      <label class="method method-online" :class="{ active: method === ONLINE_METHOD_ID }">
        <input v-model="method" type="radio" name="pay-method" :value="ONLINE_METHOD_ID" class="visually-hidden" :disabled="disabled" />
        <span class="radio" aria-hidden="true"></span>
        <span class="method-text">
          <b>{{ $t('payment.onlineTitle') }} <span class="badge-rec">{{ $t('payment.recommended') }}</span></b>
          <small>{{ $t('checkout.payOnlineNotice') }}</small>
        </span>
        <i class="fa-regular fa-credit-card method-icon" aria-hidden="true"></i>
      </label>

      <!-- Manual transfers -->
      <p class="group-label">{{ $t('payment.orTransfer') }}</p>
      <div class="manual-grid">
        <label v-for="m in MANUAL_METHODS" :key="m.id" class="method method-tile" :class="{ active: method === m.id }">
          <input v-model="method" type="radio" name="pay-method" :value="m.id" class="visually-hidden" :disabled="disabled" />
          <i :class="m.icon" class="method-icon" aria-hidden="true"></i>
          <b>{{ m.title }}</b>
        </label>
      </div>
    </div>

    <!-- Instructions + receipt for a manual method -->
    <div v-if="manual" class="manual-box">
      <ol class="manual-steps">
        <li>
          <span class="step-num" aria-hidden="true">1</span>
          <div class="step-body">
            <p class="step-title">{{ $t('payment.stepSend') }}</p>
            <p class="manual-amount">
              {{ $t('payment.sendExactly') }}
              <strong v-if="!manual.currency">{{ formatPrice(total) }}</strong>
              <strong v-else-if="foreignAmount" dir="ltr">{{ foreignAmount }}</strong>
              <strong v-else-if="ratesPending">…</strong>
              {{ $t('payment.toAccount', { method: manual.title }) }}
            </p>
            <p v-if="manual.currency && rate" class="manual-rate">
              <i class="fa-solid fa-arrow-right-arrow-left" aria-hidden="true"></i>
              {{ $t('payment.rateInfo', { total: formatPrice(total), rate: `1 ${CURRENCY_SYMBOLS[manual.currency]} = ${rate} ${$t('common.currency')}` }) }}
            </p>

            <dl class="fields">
              <div v-for="field in manual.fields" :key="field.label" class="field-row">
                <dt>{{ $t(field.label) }}</dt>
                <dd>
                  <span dir="ltr">{{ field.value }}</span>
                  <button
                      v-if="field.copy"
                      type="button"
                      class="copy-btn"
                      :class="{ copied: copied === field.value }"
                      :aria-label="$t('payment.copy', { label: $t(field.label) })"
                      @click="copy(field.value)"
                  >
                    <i :class="copied === field.value ? 'fa-solid fa-check' : 'fa-regular fa-copy'" aria-hidden="true"></i>
                  </button>
                </dd>
              </div>
            </dl>
          </div>
        </li>

        <li>
          <span class="step-num" aria-hidden="true">2</span>
          <div class="step-body">
            <p class="step-title">{{ $t('payment.stepUpload') }} <span class="req">*</span></p>

            <div v-if="proof" class="proof-file">
              <i :class="proof.type === 'application/pdf' ? 'fa-regular fa-file-pdf' : 'fa-regular fa-file-image'" aria-hidden="true"></i>
              <span class="proof-name">
                <b>{{ proof.name }}</b>
                <small>{{ sizeLabel(proof.size) }}</small>
              </span>
              <button type="button" class="remove-btn" :aria-label="$t('payment.proofRemove')" :disabled="disabled" @click="clearProof">
                <i class="fa-solid fa-xmark" aria-hidden="true"></i>
              </button>
            </div>

            <label
                v-else
                class="dropzone"
                :class="{ dragging: isDragging, invalid: !!shownError }"
                :aria-label="$t('payment.proofLabel')"
                @dragover.prevent="isDragging = true"
                @dragleave="isDragging = false"
                @drop.prevent="onDrop"
            >
              <input
                  ref="fileInput"
                  type="file"
                  :accept="PROOF_ACCEPT"
                  class="visually-hidden"
                  :disabled="disabled"
                  @change="pick(($event.target as HTMLInputElement).files?.[0])"
              />
              <i class="fa-solid fa-cloud-arrow-up" aria-hidden="true"></i>
              <span><b>{{ $t('payment.proofChoose') }}</b> {{ $t('payment.proofDrop') }}</span>
              <small>{{ $t('payment.proofFormats') }}</small>
            </label>

            <p v-if="shownError" class="field-error" role="alert">{{ $t(shownError) }}</p>
          </div>
        </li>
      </ol>

      <p class="manual-note">
        <i class="fa-regular fa-clock" aria-hidden="true"></i>
        {{ $t('payment.manualNote') }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.methods {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.method {
  position: relative;
  border: 1.5px solid var(--gs-border);
  border-radius: 16px;
  background: var(--gs-bg-1);
  cursor: pointer;
  transition: border-color .15s ease, background-color .15s ease, box-shadow .15s ease;
}

.method:hover {
  border-color: color-mix(in srgb, var(--gs-green) 55%, var(--gs-border));
}

.method.active {
  border-color: var(--gs-green);
  background: color-mix(in srgb, var(--gs-green) 7%, var(--gs-bg-1));
  box-shadow: 0 0 0 1px var(--gs-green);
}

.method:focus-within {
  box-shadow: var(--gs-focus);
}

/* ---------- online card ---------- */
.method-online {
  display: grid;
  grid-template-columns: 22px minmax(0, 1fr) auto;
  align-items: center;
  gap: 14px;
  padding: 16px;
}

.radio {
  width: 22px;
  height: 22px;
  border: 2px solid var(--gs-border);
  border-radius: 50%;
  transition: border .15s ease;
}

.method.active .radio {
  border: 7px solid var(--gs-green);
}

.method-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.method-text b {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  color: var(--gs-ink);
  font-size: 15px;
}

.method-text small {
  color: var(--gs-muted);
  font-size: 12.5px;
  line-height: 1.45;
}

.badge-rec {
  padding: 2px 8px;
  border-radius: 999px;
  background: var(--gs-gradient);
  color: var(--gs-on-brand);
  font-size: 11px;
  font-weight: 700;
}

.method-icon {
  color: var(--gs-primary);
  font-size: 20px;
}

/* ---------- transfers ---------- */
.group-label {
  margin: 8px 0 0;
  color: var(--gs-muted);
  font-size: 13px;
  font-weight: 600;
}

.manual-grid {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 10px;
}

.method-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  min-height: 84px;
  padding: 12px 8px;
  text-align: center;
}

.method-tile b {
  color: var(--gs-ink);
  font-size: 13.5px;
  line-height: 1.2;
}

.method-tile .method-icon {
  display: grid;
  place-items: center;
  width: 38px;
  height: 38px;
  border-radius: 12px;
  background: var(--gs-surface);
  font-size: 17px;
}

.method-tile.active .method-icon {
  background: var(--gs-gradient);
  color: var(--gs-on-brand);
}

/* ---------- manual instructions ---------- */
.manual-box {
  margin-top: 14px;
  padding: 18px;
  border-radius: 16px;
  background: var(--gs-surface);
}

.manual-steps {
  display: flex;
  flex-direction: column;
  gap: 18px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.manual-steps li {
  display: grid;
  grid-template-columns: 28px minmax(0, 1fr);
  gap: 12px;
}

.step-num {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--gs-ink);
  color: var(--gs-bg-1);
  font-size: 13px;
  font-weight: 700;
}

.step-body {
  min-width: 0;
}

.step-title {
  margin: 3px 0 8px;
  color: var(--gs-ink);
  font-size: 14.5px;
  font-weight: 700;
}

.manual-amount {
  margin: 0 0 12px;
  color: var(--gs-text-2);
  font-size: 14px;
  line-height: 1.5;
}

.manual-amount strong {
  color: var(--gs-ink);
  white-space: nowrap;
}

.manual-rate {
  display: flex;
  gap: 8px;
  margin: -6px 0 12px;
  color: var(--gs-muted);
  font-size: 12.5px;
  line-height: 1.45;
}

.manual-rate i {
  margin-top: 3px;
}

.fields {
  margin: 0;
  border-radius: 12px;
  background: var(--gs-bg-1);
}

.field-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
}

.field-row + .field-row {
  border-top: 1px solid var(--gs-border);
}

.field-row dt {
  color: var(--gs-muted);
  font-size: 13px;
  font-weight: 500;
}

.field-row dd {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  color: var(--gs-ink);
  font-size: 14.5px;
  font-weight: 700;
  font-variant-numeric: tabular-nums;
  text-align: end;
  word-break: break-all;
}

.copy-btn,
.remove-btn {
  flex: none;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 10px;
  background: var(--gs-surface);
  color: var(--gs-muted);
  transition: background .15s ease, color .15s ease;
}

.copy-btn:hover,
.remove-btn:hover {
  color: var(--gs-primary);
}

.copy-btn.copied {
  background: var(--gs-success-soft);
  color: var(--gs-success);
}

.req {
  color: var(--gs-danger);
}

.dropzone {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 20px 12px;
  border: 1.5px dashed var(--gs-border);
  border-radius: 12px;
  background: var(--gs-bg-1);
  color: var(--gs-text-2);
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  transition: border-color .15s ease, background-color .15s ease;
}

.dropzone i {
  color: var(--gs-primary);
  font-size: 24px;
}

.dropzone b {
  color: var(--gs-primary);
}

.dropzone small {
  color: var(--gs-muted);
  font-size: 12px;
}

.dropzone:hover,
.dropzone.dragging,
.dropzone:focus-within {
  border-color: var(--gs-green);
  background: color-mix(in srgb, var(--gs-green) 6%, var(--gs-bg-1));
}

.dropzone.invalid {
  border-color: var(--gs-danger);
}

.proof-file {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 12px;
  border: 1.5px solid var(--gs-green);
  border-radius: 12px;
  background: var(--gs-bg-1);
}

.proof-file > i {
  color: var(--gs-primary);
  font-size: 22px;
}

.proof-name {
  display: flex;
  flex: 1;
  flex-direction: column;
  min-width: 0;
}

.proof-name b {
  overflow: hidden;
  color: var(--gs-ink);
  font-size: 13.5px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.proof-name small {
  color: var(--gs-muted);
  font-size: 12px;
}

.field-error {
  margin: 6px 0 0;
  color: var(--gs-danger);
  font-size: 13px;
  font-weight: 500;
}

.manual-note {
  display: flex;
  gap: 8px;
  margin: 16px 0 0;
  padding-top: 14px;
  border-top: 1px solid var(--gs-border);
  color: var(--gs-muted);
  font-size: 12.5px;
  line-height: 1.5;
}

.manual-note i {
  margin-top: 2px;
}

@media (max-width: 767.98px) {
  .manual-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 575.98px) {
  .manual-box {
    padding: 14px;
  }
}
</style>
