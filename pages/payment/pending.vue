<script setup lang="ts">
import Header3 from "~/components/Header3.vue";

// After a manual payment: the order exists "on hold" until the receipt is checked
const route = useRoute()
const { t } = useI18n()
const { isLoggedIn } = useAccount()

const clean = (value: unknown) => String(value ?? '').replace(/[^\w-]/g, '')
const orderNumber = computed(() => clean(route.query.order))
const method = computed(() => findManualMethod(clean(route.query.method)))

useHead({
  title: () => t('payment.pendingTitle'),
  meta: [{ name: 'robots', content: 'noindex' }],
})

const helpLink = computed(() => whatsappLink(t('success.whatsappMessage', { id: orderNumber.value || '-' })))
</script>

<template>
  <header class="site-header mo-left header style-2">
    <Header3 />
  </header>

  <div class="page-content">
    <div class="content-inner pending-page">
      <div class="container">
        <section class="pending-card">
          <AstroBot mood="happy" :size="110" />
          <p class="eyebrow">{{ $t('payment.pendingEyebrow') }}</p>
          <h1>{{ $t('payment.pendingTitle') }}</h1>
          <p class="lead">
            {{ $t('payment.pendingText', { method: method?.title || '' }) }}
          </p>

          <span v-if="orderNumber" class="order-pill">
            {{ $t('payment.orderNo') }} <strong dir="ltr">#{{ orderNumber }}</strong>
          </span>

          <ol class="steps">
            <li class="done"><span class="dot"><i class="fa-solid fa-check"></i></span>{{ $t('payment.pendingStep1') }}</li>
            <li class="current"><span class="dot"><i class="fa-solid fa-magnifying-glass"></i></span>{{ $t('payment.pendingStep2') }}</li>
            <li><span class="dot"><i class="fa-regular fa-envelope"></i></span>{{ $t('payment.pendingStep3') }}</li>
          </ol>

          <div class="actions">
            <NuxtLink v-if="isLoggedIn" to="/account/orders" class="btn btn-primary">{{ $t('account.orders') }}</NuxtLink>
            <NuxtLink to="/shop" class="btn btn-outline-primary">{{ $t('cart.continueShopping') }}</NuxtLink>
            <a :href="helpLink" target="_blank" rel="noopener" class="btn btn-success">
              <i class="fa-brands fa-whatsapp"></i> {{ $t('success.whatsapp') }}
            </a>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pending-page {
  background: var(--gs-surface);
}

.pending-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 620px;
  margin-inline: auto;
  padding: 36px 28px;
  border-radius: 24px;
  background: var(--gs-bg-1);
  text-align: center;
}

.eyebrow {
  margin: 12px 0 4px;
  color: var(--gs-warning);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: .06em;
  text-transform: uppercase;
}

.pending-card h1 {
  margin: 0;
  font-size: clamp(24px, 3vw, 32px);
}

.lead {
  margin: 10px 0 18px;
  color: var(--gs-text-2);
  font-size: 15px;
  line-height: 1.6;
}

.order-pill {
  padding: 8px 16px;
  border-radius: 999px;
  background: var(--gs-surface);
  color: var(--gs-text-2);
  font-size: 14px;
}

.order-pill strong {
  color: var(--gs-ink);
}

.steps {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  margin: 24px 0;
  padding: 0;
  list-style: none;
  text-align: start;
}

.steps li {
  display: flex;
  align-items: center;
  gap: 12px;
  color: var(--gs-muted);
  font-size: 14.5px;
}

.steps .dot {
  flex: none;
  display: grid;
  place-items: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--gs-surface);
  font-size: 13px;
}

.steps li.done,
.steps li.current {
  color: var(--gs-ink);
  font-weight: 600;
}

.steps li.done .dot {
  background: var(--gs-success);
  color: var(--gs-on-dark);
}

.steps li.current .dot {
  background: var(--gs-gradient);
  color: var(--gs-on-brand);
}

.actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}
</style>
