<script setup lang="ts">

import Header3 from "~/components/Header3.vue";
import cities from '../assets/cities.json'
import { z } from "zod"

const { $aa } = useNuxtApp()
const { t } = useI18n()

const isLoading = ref(false);
const submitError = ref(false)

const checkoutSchema = z.object({
  first_name: z.string()
      .trim()
      .min(2, "form.errors.firstNameRequired")
      .max(50),

  last_name: z.string()
      .trim()
      .min(2, "form.errors.lastNameRequired")
      .max(50),

  phone: z.string()
      .regex(/^(05|06|07)[0-9]{8}$/, "form.errors.phoneInvalid"),

  wilaya: z.string().min(2, "form.errors.wilayaRequired"),

  commune: z.string()
      .min(2, "form.errors.communeRequired"),

  terms: z.boolean().refine(val => val === true, {
    message: "form.errors.termsRequired"
  }),

  note: z.string().max(500).optional()
})

const errors = ref<any>({})
const wilayaName = ref<string>("")

useHead({
  title: () => t('seo.checkout'),
  meta: [
    { name: 'description', content: () => t('seo.description') },
    { name: 'robots', content: 'noindex, follow' },
  ],
})

const { cart, loadCart, keyOf, clearCart } = useLocalCart()

const items = computed(() => cart.value)

const itemsCount = computed(() =>
    cart.value.reduce((sum, item) => sum + item.quantity, 0)
)

const formatPrice = (value: number | string) =>
    `${Number(value).toLocaleString('fr-FR')} ${t('common.currency')}`

const selectedMethod = ref<any>(null)

const subTotal = computed(() =>
    items.value.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)
)

const shippingCost = computed(() => Number(selectedMethod.value?.cost || 0))

const totalPriceCompute = computed(() => subTotal.value + shippingCost.value)

const zone = ref<{ methods?: any[] }>({})
const isLoadingCommunes = ref(false)
const isLoadingCost = ref(false)

const form = reactive({
  first_name: '',
  last_name: '',
  phone: '',
  wilaya: '',
  commune: '',
  note: '',
  acceptedTerms: false,
})

// Keep only digits so "05 50 77 99 73" is accepted as typed
watch(() => form.phone, (value) => {
  const digits = value.replace(/\D/g, '').slice(0, 10)
  if (digits !== value) form.phone = digits
})

const validateCheckout = () => {
  const result = checkoutSchema.safeParse({
    first_name: form.first_name,
    last_name: form.last_name,
    phone: form.phone,
    wilaya: form.wilaya,
    commune: form.commune,
    terms: form.acceptedTerms,
    note: form.note
  })

  errors.value = {}
  if (result.success) return true

  result.error.issues.forEach(issue => {
    const key = issue.path[0]
    if (!errors.value[key]) errors.value[key] = issue.message
  })

  // Bring the first invalid field into view
  nextTick(() => {
    const first = document.querySelector('.checkout-page [aria-invalid="true"]') as HTMLElement | null
    first?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    first?.focus({ preventScroll: true })
  })

  return false
}

// Re-validate a field once it has been flagged, so errors clear as the user fixes them
watch(form, () => {
  if (Object.keys(errors.value).length) {
    const result = checkoutSchema.safeParse({ ...form, terms: form.acceptedTerms })
    const stillInvalid = new Set(result.success ? [] : result.error.issues.map(i => i.path[0]))
    for (const key of Object.keys(errors.value)) {
      if (!stillInvalid.has(key)) delete errors.value[key]
    }
  }
})

const submitOrder = async () => {

  submitError.value = false
  if (!validateCheckout()) return;
  if (!selectedMethod.value) return;

  isLoading.value = true

  try {
    const order: any = await $fetch("/api/wc/order", {
      method: "POST",
      body: {
        payment_method: "cod",
        payment_method_title: "Paiement à la livraison",

        items: items.value.map((i: any) => ({
          meta: i.meta,
          product_id: i.id,
          quantity: i.quantity,
          variation_id: i.variation_id || null
        })),

        billing: {
          first_name: form.first_name.trim(),
          last_name: form.last_name.trim(),
          phone: form.phone,
          city: form.commune,
          state: `DZ-${form.wilaya}`,
          country: "DZ",
          address_1: wilayaName.value,
        },

        shipping: {
          first_name: form.first_name.trim(),
          last_name: form.last_name.trim(),
          city: form.commune,
          state: `DZ-${form.wilaya}`,
          country: "DZ",
          address_1: wilayaName.value,
        },

        shipping_method: {
          method_id: "flat_rate",
          method_title: selectedMethod.value.name,
          total: selectedMethod.value.cost
        },

        note: form.note,
      }
    })

    const orderId = order?.id
    if (!orderId) throw new Error('No order id')

    const objectIDs = items.value.map(i => String(i.id))

    const qid = localStorage.getItem('algolia:lastQueryID')
    const qidAt = Number(localStorage.getItem('algolia:lastQueryIDAt') || 0)
    const TTL_MS = 30 * 60 * 1000
    const isFresh = qid && qidAt && (Date.now() - qidAt) < TTL_MS

    if (isFresh) {
      $aa('convertedObjectIDsAfterSearch', {
        eventName: 'Order Placed (COD)',
        index: 'products',
        objectIDs,
        queryID: qid,
      })
    } else {
      $aa('convertedObjectIDs', {
        eventName: 'Order Placed (COD)',
        index: 'products',
        objectIDs,
      })
    }

    // After checkout, forget the search queryID
    localStorage.removeItem('algolia:lastQueryID')
    localStorage.removeItem('algolia:lastQueryIDAt')

    // Small recap for the success page (the cart is about to be emptied)
    try {
      sessionStorage.setItem('lastOrder', JSON.stringify({
        id: orderId,
        items: items.value.map((i: any) => ({
          name: i.name,
          image: i.image,
          quantity: i.quantity,
          price: i.price,
          options: (i.variation || []).map((v: any) => v.value),
        })),
        subtotal: subTotal.value,
        shipping: shippingCost.value,
        shippingLabel: selectedMethod.value?.label,
        total: totalPriceCompute.value,
        commune: form.commune,
        wilaya: wilayaName.value,
      }))
    } catch {}

    clearCart()
    navigateTo('/success?orderId=' + orderId)

  } catch (error) {
    console.error(error)
    submitError.value = true
  } finally {
    isLoading.value = false
  }
}

const wilayaOptions = ref<any[]>([])
const communeOptions = ref<any[]>([])

async function getCommune(wilayaCode: string) {

  form.commune = ''
  selectedMethod.value = null
  zone.value = {}
  communeOptions.value = []

  const wilaya: any = cities.find((w: any) => w.wilaya_code == wilayaCode)
  wilayaName.value = wilaya ? `${wilaya.wilaya_name_ascii} | ${wilaya.wilaya_name}` : ''

  isLoadingCommunes.value = true
  try {
    const wilayaCommunes: any = await $fetch('/api/ecotrack/commune');
    communeOptions.value = Object.values(wilayaCommunes).filter((commune: any) => commune.wilaya_id == wilayaCode)
  } finally {
    isLoadingCommunes.value = false
  }
}

async function getCost() {

  selectedMethod.value = null
  isLoadingCost.value = true

  try {
    const cost: any = await $fetch('/api/ecotrack/cost?wilaya_id=' + form.wilaya);

    const methods: any[] = [
      {
        method_id: "flat_rate",
        name: "A Domicile - توصيل للمنزل",
        label: "checkout.shipHome",
        hint: "checkout.shipHomeHint",
        icon: "iconly-Curved-Home",
        cost: cost[0].tarif
      },
    ]

    const commune = communeOptions.value.find((c: any) => c.nom == form.commune)

    if (commune?.has_stop_desk) {
      methods.push({
        method_id: "flat_rate",
        name: "Au Bureau - توصيل للمكتب",
        label: "checkout.shipDesk",
        hint: "checkout.shipDeskHint",
        icon: "iconly-Curved-Work",
        cost: cost[0].tarif_stopdesk
      })
    }

    if (form.wilaya == '16') {
      methods.push({
        method_id: "flat_rate",
        name: "Retrait Magasin - الاستلام من المتجر",
        label: "checkout.shipStore",
        hint: "checkout.shipStoreHint",
        icon: "iconly-Curved-Bag",
        cost: 0
      })
    }

    zone.value = { methods }
    selectedMethod.value = methods[0]
  } finally {
    isLoadingCost.value = false
  }
}

onMounted(() => {

  // The cart lives in the browser: decide here, not during server rendering
  loadCart()
  if (!cart.value.length) {
    navigateTo('/cart')
    return
  }

  const wilayas = cities.map((wilaya: any) => ({
    title: `${String(wilaya.wilaya_code).padStart(2, '0')} - ${wilaya.wilaya_name_ascii} | ${wilaya.wilaya_name}`,
    value: String(wilaya.wilaya_code).padStart(2, '0'),
  }))

  wilayaOptions.value = wilayas.filter(
      (w, index, self) => index === self.findIndex(x => x.value === w.value)
  )
})

const steps = ['checkout.stepCart', 'checkout.stepDelivery', 'checkout.stepConfirm']
</script>

<template>

  <header class="site-header mo-left header style-2">
    <Header3 />
  </header>

  <div class="page-content bg-light">
    <div class="content-inner checkout-page">
      <div class="container">

        <!-- Title + progress -->
        <div class="checkout-head">
          <div class="page-title">
            <img src="~/assets/checkout-astro.png" alt="" width="48" height="64" />
            <h1>{{ $t('checkout.title') }}</h1>
          </div>

          <ol class="steps">
            <li v-for="(step, index) in steps" :key="step" :class="{ done: index === 0, current: index === 1 }">
              <span class="step-dot">
                <i v-if="index === 0" class="fa-solid fa-check"></i>
                <template v-else>{{ index + 1 }}</template>
              </span>
              <span class="step-label">{{ $t(step) }}</span>
            </li>
          </ol>
        </div>

        <form class="checkout-layout" novalidate @submit.prevent="submitOrder">

          <!-- Form -->
          <div class="checkout-main">

            <!-- Contact -->
            <section class="card-block">
              <h2 class="block-title"><span class="block-num">1</span>{{ $t('checkout.contact') }}</h2>

              <div class="row g-3">
                <div class="col-sm-6">
                  <label class="field-label" for="co-first-name">{{ $t('form.firstName') }} <span class="req">*</span></label>
                  <input id="co-first-name" v-model="form.first_name" class="form-control" autocomplete="given-name"
                         :aria-invalid="!!errors.first_name" :disabled="isLoading" />
                  <p v-if="errors.first_name" class="field-error">{{ $t(errors.first_name) }}</p>
                </div>
                <div class="col-sm-6">
                  <label class="field-label" for="co-last-name">{{ $t('form.lastName') }} <span class="req">*</span></label>
                  <input id="co-last-name" v-model="form.last_name" class="form-control" autocomplete="family-name"
                         :aria-invalid="!!errors.last_name" :disabled="isLoading" />
                  <p v-if="errors.last_name" class="field-error">{{ $t(errors.last_name) }}</p>
                </div>
                <div class="col-12">
                  <label class="field-label" for="co-phone">{{ $t('form.phone') }} <span class="req">*</span></label>
                  <div class="input-icon">
                    <i class="iconly-Curved-Call" aria-hidden="true"></i>
                    <input id="co-phone" v-model="form.phone" type="tel" inputmode="numeric" autocomplete="tel-national"
                           maxlength="10" placeholder="05XXXXXXXX" dir="ltr" class="form-control"
                           :aria-invalid="!!errors.phone" aria-describedby="co-phone-hint" :disabled="isLoading" />
                  </div>
                  <p v-if="errors.phone" class="field-error">{{ $t(errors.phone) }}</p>
                  <p v-else id="co-phone-hint" class="field-hint">{{ $t('checkout.phoneHint') }}</p>
                </div>
              </div>
            </section>

            <!-- Delivery -->
            <section class="card-block">
              <h2 class="block-title"><span class="block-num">2</span>{{ $t('checkout.delivery') }}</h2>

              <div class="row g-3">
                <div class="col-sm-6">
                  <label class="field-label" for="co-wilaya">{{ $t('form.wilaya') }} <span class="req">*</span></label>
                  <select id="co-wilaya" class="form-select" v-model="form.wilaya" @change="getCommune(form.wilaya)"
                          :aria-invalid="!!errors.wilaya" :disabled="isLoading">
                    <option value="" disabled>{{ $t('form.selectWilaya') }}</option>
                    <option v-for="w in wilayaOptions" :key="w.value" :value="w.value">{{ w.title }}</option>
                  </select>
                  <p v-if="errors.wilaya" class="field-error">{{ $t(errors.wilaya) }}</p>
                </div>

                <div class="col-sm-6">
                  <label class="field-label" for="co-commune">{{ $t('form.commune') }} <span class="req">*</span></label>
                  <select id="co-commune" class="form-select" v-model="form.commune" @change="getCost"
                          :aria-invalid="!!errors.commune" :disabled="isLoading || !form.wilaya || isLoadingCommunes">
                    <option value="" disabled>
                      {{ isLoadingCommunes ? $t('common.loading') : (form.wilaya ? $t('form.selectCommune') : $t('checkout.wilayaFirst')) }}
                    </option>
                    <option v-for="c in communeOptions" :key="c.nom" :value="c.nom">{{ c.nom }}</option>
                  </select>
                  <p v-if="errors.commune" class="field-error">{{ $t(errors.commune) }}</p>
                </div>
              </div>

              <!-- Shipping methods -->
              <div class="ship-methods" v-if="isLoadingCost || zone.methods?.length">
                <h3 class="sub-title">{{ $t('checkout.shippingMethod') }}</h3>

                <div v-if="isLoadingCost" class="placeholder-glow">
                  <span class="placeholder col-12 rounded-3" style="height: 64px"></span>
                </div>

                <label
                    v-else
                    v-for="(method, index) in zone.methods"
                    :key="method.label"
                    class="ship-option"
                    :class="{ active: selectedMethod?.label === method.label }"
                >
                  <input type="radio" name="shipping-method" :value="method" v-model="selectedMethod" class="visually-hidden" />
                  <i :class="method.icon" class="ship-icon" aria-hidden="true"></i>
                  <span class="ship-text">
                    <b>{{ $t(method.label) }}</b>
                    <small>{{ $t(method.hint) }}</small>
                  </span>
                  <span class="ship-cost">{{ Number(method.cost) ? formatPrice(method.cost) : $t('checkout.free') }}</span>
                </label>
              </div>
            </section>

            <!-- Note -->
            <section class="card-block">
              <h2 class="block-title"><span class="block-num">3</span>{{ $t('checkout.additionalInfo') }}</h2>
              <label class="field-label" for="co-note">{{ $t('form.noteLabel') }}</label>
              <textarea id="co-note" v-model="form.note" :disabled="isLoading" :placeholder="$t('form.notePlaceholder')"
                        class="form-control" rows="3" maxlength="500"></textarea>
            </section>
          </div>

          <!-- Summary -->
          <aside class="checkout-summary">
            <h2 class="block-title">{{ $t('checkout.yourOrder') }} <span class="muted">({{ itemsCount }})</span></h2>

            <ul class="summary-items">
              <li v-for="item in items" :key="keyOf(item)">
                <span class="thumb">
                  <img :src="item.image" :alt="item.name" width="56" height="56" />
                  <span class="qty-badge">{{ item.quantity }}</span>
                </span>
                <span class="summary-name">
                  {{ item.name }}
                  <small v-if="item.variation?.length">{{ item.variation.map((v: any) => v.value).join(' · ') }}</small>
                </span>
                <span class="summary-price">{{ formatPrice(Number(item.price) * item.quantity) }}</span>
              </li>
            </ul>

            <div class="summary-row">
              <span>{{ $t('common.subtotal') }}</span>
              <span>{{ formatPrice(subTotal) }}</span>
            </div>
            <div class="summary-row">
              <span>{{ $t('checkout.shippingMethod') }}</span>
              <span v-if="selectedMethod">{{ Number(selectedMethod.cost) ? formatPrice(selectedMethod.cost) : $t('checkout.free') }}</span>
              <span v-else class="muted">{{ $t('checkout.chooseCommune') }}</span>
            </div>
            <div class="summary-total">
              <span>{{ $t('common.total') }}</span>
              <strong>{{ formatPrice(totalPriceCompute) }}</strong>
            </div>

            <!-- Payment -->
            <div class="pay-option">
              <i class="fa-solid fa-money-bill-wave" aria-hidden="true"></i>
              <span>
                <b>{{ $t('checkout.cod') }}</b>
                <small>{{ $t('cart.codNotice') }}</small>
              </span>
              <i class="fa-solid fa-circle-check check" aria-hidden="true"></i>
            </div>

            <label class="terms" :class="{ invalid: errors.terms }">
              <input type="checkbox" class="form-check-input" v-model="form.acceptedTerms" :aria-invalid="!!errors.terms" />
              <span>{{ $t('checkout.terms') }}</span>
            </label>
            <p v-if="errors.terms" class="field-error">{{ $t(errors.terms) }}</p>

            <div v-if="submitError" class="alert alert-danger rounded-3 small mb-3" role="alert">
              {{ $t('checkout.submitError') }}
            </div>

            <button type="submit" class="btn btn-primary btn-lg btn-block" :disabled="isLoading || !selectedMethod">
              <span v-if="isLoading" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
              <i v-else class="fa-solid fa-lock"></i>
              {{ isLoading ? $t('common.wait') : $t('checkout.placeOrder', { total: formatPrice(totalPriceCompute) }) }}
            </button>
            <p v-if="!selectedMethod" class="field-hint text-center mt-2">{{ $t('checkout.chooseCommune') }}</p>

            <p class="privacy">{{ $t('checkout.privacy') }}</p>
          </aside>
        </form>

      </div>
    </div>

    <!-- Reviews -->
    <ReviewsWidget />
  </div>
</template>

<style scoped>
.checkout-head {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.page-title {
  display: flex;
  align-items: center;
  gap: 12px;
}

.page-title img {
  width: 44px;
  height: auto;
}

.page-title h1 {
  margin: 0;
  font-size: clamp(24px, 3vw, 32px);
}

/* ---------- steps ---------- */
.steps {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.steps li {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #9aa1b5;
  font-size: 13px;
  font-weight: 600;
}

.steps li + li::before {
  content: "";
  width: 28px;
  height: 2px;
  margin-inline-end: 4px;
  border-radius: 2px;
  background: #dfe3ee;
}

.step-dot {
  display: grid;
  place-items: center;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: #e8ebf3;
  color: #6b7390;
  font-size: 12px;
}

.steps li.done .step-dot {
  background: #198754;
  color: #fff;
}

.steps li.current {
  color: var(--gs-ink, #0F1E4A);
}

.steps li.current .step-dot {
  background: var(--gs-gradient);
  color: #fff;
}

/* ---------- layout ---------- */
.checkout-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 400px;
  gap: 28px;
  align-items: start;
}

.checkout-main {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.card-block,
.checkout-summary {
  padding: 22px;
  border-radius: 20px;
  background: #fff;
  border: 1px solid #eef1f7;
}

.checkout-summary {
  position: sticky;
  top: 140px;
}

.block-title {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 18px;
  font-size: 18px;
}

.block-num {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--gs-gradient);
  color: #fff;
  font-size: 13px;
}

.muted {
  color: #6b7390;
  font-weight: 500;
}

/* ---------- fields ---------- */
.field-label {
  display: block;
  margin-bottom: 6px;
  color: var(--gs-ink, #0F1E4A);
  font-size: 14px;
  font-weight: 600;
}

.req {
  color: #dc3545;
}

.form-control,
.form-select {
  height: 48px;
  border-radius: 12px;
  border-color: #dfe3ee;
  font-size: 15px;
}

textarea.form-control {
  height: auto;
}

.form-control:focus,
.form-select:focus {
  border-color: var(--gs-primary, #0A63D8);
  box-shadow: 0 0 0 3px rgba(10, 99, 216, .15);
}

[aria-invalid="true"] {
  border-color: #dc3545 !important;
  background-color: #fffafa;
}

.field-error {
  margin: 6px 0 0;
  color: #dc3545;
  font-size: 13px;
  font-weight: 500;
}

.field-hint {
  margin: 6px 0 0;
  color: #6b7390;
  font-size: 12.5px;
}

.input-icon {
  position: relative;
}

.input-icon i {
  position: absolute;
  top: 50%;
  left: 14px;
  transform: translateY(-50%);
  color: #9aa1b5;
  font-size: 18px;
}

/* the phone field is LTR in both languages */
.input-icon .form-control {
  padding-left: 42px;
}

:global([dir="rtl"] .checkout-page .form-select) {
  padding-left: 2.25rem;
  padding-right: .75rem;
  background-position: left .75rem center;
}

/* ---------- shipping ---------- */
.ship-methods {
  margin-top: 20px;
}

.sub-title {
  margin-bottom: 10px;
  font-size: 15px;
}

.ship-option {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border: 1.5px solid #dfe3ee;
  border-radius: 14px;
  cursor: pointer;
  transition: border-color .15s ease, background .15s ease;
}

.ship-option + .ship-option {
  margin-top: 10px;
}

.ship-option:hover {
  border-color: var(--gs-primary, #0A63D8);
}

.ship-option.active {
  border-color: var(--gs-primary, #0A63D8);
  background: rgba(10, 99, 216, .05);
  box-shadow: 0 0 0 1px var(--gs-primary, #0A63D8);
}

.ship-option:focus-within {
  box-shadow: 0 0 0 3px rgba(10, 99, 216, .2);
}

.ship-icon {
  font-size: 22px;
  color: var(--gs-primary, #0A63D8);
}

.ship-text {
  display: flex;
  flex: 1;
  flex-direction: column;
  line-height: 1.35;
}

.ship-text small {
  color: #6b7390;
}

.ship-cost {
  font-weight: 800;
  white-space: nowrap;
}

/* ---------- summary ---------- */
.summary-items {
  margin: 0 0 14px;
  padding: 0 0 14px;
  list-style: none;
  border-bottom: 1px solid #eef1f7;
  max-height: 320px;
  overflow-y: auto;
}

.summary-items li {
  display: grid;
  grid-template-columns: 56px 1fr auto;
  align-items: center;
  gap: 12px;
}

.summary-items li + li {
  margin-top: 12px;
}

.thumb {
  position: relative;
}

.thumb img {
  width: 56px;
  height: 56px;
  object-fit: contain;
  border-radius: 12px;
  border: 1px solid #eef1f7;
  background: #fff;
}

.qty-badge {
  position: absolute;
  top: -6px;
  inset-inline-end: -6px;
  display: grid;
  place-items: center;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border-radius: 999px;
  background: var(--gs-ink, #0F1E4A);
  color: #fff;
  font-size: 11px;
  font-weight: 700;
}

.summary-name {
  display: flex;
  flex-direction: column;
  min-width: 0;
  font-size: 13.5px;
  font-weight: 600;
  line-height: 1.35;
}

.summary-name small {
  color: #6b7390;
  font-weight: 500;
}

.summary-price {
  font-weight: 700;
  white-space: nowrap;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  padding: 5px 0;
  font-size: 14px;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin: 10px 0 18px;
  padding-top: 14px;
  border-top: 1px dashed #dfe3ee;
}

.summary-total strong {
  font-size: 26px;
}

.pay-option {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px;
  border: 1.5px solid var(--gs-primary, #0A63D8);
  border-radius: 14px;
  background: rgba(10, 99, 216, .05);
}

.pay-option > i:first-child {
  margin-top: 2px;
  color: #198754;
  font-size: 20px;
}

.pay-option span {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 2px;
}

.pay-option small {
  color: #6b7390;
  line-height: 1.45;
}

.pay-option .check {
  color: var(--gs-primary, #0A63D8);
}

.terms {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin: 16px 0 14px;
  font-size: 14px;
  cursor: pointer;
}

.terms .form-check-input {
  flex: none;
  margin: 2px 0 0;
  width: 18px;
  height: 18px;
}

.privacy {
  margin: 14px 0 0;
  color: #9aa1b5;
  font-size: 12px;
  line-height: 1.5;
}

/* ---------- responsive ---------- */
@media (max-width: 991.98px) {
  .checkout-layout {
    grid-template-columns: 1fr;
  }

  .checkout-summary {
    position: static;
  }
}

@media (max-width: 575.98px) {
  .card-block,
  .checkout-summary {
    padding: 16px;
    border-radius: 16px;
  }

  .step-label {
    display: none;
  }

  .steps li.current .step-label {
    display: inline;
  }
}
</style>
