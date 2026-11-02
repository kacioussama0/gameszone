<script setup lang="ts">
definePageMeta({ middleware: 'account' })

const { t, locale } = useI18n()
const route = useRoute()

const id = computed(() => String(route.params.id).replace(/\D/g, ''))

const { data: order, pending, error } = await useFetch<any>(() => `/api/account/orders/${id.value}`, {
  key: `account-order-${id.value}`,
})

useHead({
  title: () => order.value ? t('account.orderNo', { number: order.value.number }) : t('account.orders'),
  meta: [{ name: 'robots', content: 'noindex' }],
})

const formatPrice = (value: number | string) =>
    `${Number(value).toLocaleString('fr-FR')} ${t('common.currency')}`

const formatDate = (value: string, withTime = false) =>
    new Date(value).toLocaleString(DATE_LOCALES[locale.value] ?? 'fr-FR', {
      day: 'numeric', month: 'long', year: 'numeric',
      ...(withTime ? { hour: '2-digit', minute: '2-digit' } : {}),
    })

// Shop notes can contain simple HTML: show them as plain text
const plain = (html: string) => html.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim()

/* ---------- pay an unpaid order ---------- */
const isPaying = ref(false)
const payError = ref(false)

const pay = async () => {
  if (!order.value || isPaying.value) return
  isPaying.value = true
  payError.value = false
  try {
    const res: any = await $fetch(`/api/account/orders/${order.value.id}/pay`, { method: 'POST' })

    // Recap for the payment result page ("try again" comes back here)
    try {
      const first = order.value.items[0]
      sessionStorage.setItem('lastEpay', JSON.stringify({
        orderId: order.value.id,
        fromAccount: true,
        name: order.value.items.length > 1 ? t('payment.cartItems', { count: order.value.items.length }) : first?.name,
        image: first?.image,
        option: '',
        amount: order.value.total,
      }))
    } catch {}

    window.location.href = res.url
  } catch {
    payError.value = true
    isPaying.value = false
  }
}
</script>

<template>
  <AccountShell :title="order ? $t('account.orderNo', { number: order.number }) : $t('account.orders')">
    <NuxtLink to="/account/orders" class="back">
      <i class="fa-solid fa-arrow-left flip-rtl" aria-hidden="true"></i> {{ $t('account.backToOrders') }}
    </NuxtLink>

    <div v-if="pending" class="placeholder-glow">
      <span class="placeholder col-12 rounded-4 mb-3" style="height: 90px"></span>
      <span class="placeholder col-12 rounded-4" style="height: 260px"></span>
    </div>

    <div v-else-if="error || !order" class="panel empty">
      <AstroBot mood="sad" :size="100" />
      <p>{{ $t('account.orderNotFound') }}</p>
    </div>

    <template v-else>
      <!-- Status -->
      <section class="panel status-panel" :class="{ 'is-payable': order.payable }">
        <div>
          <OrderStatus :status="order.status" />
          <p class="status-text">{{ $te(`account.statusText.${order.status}`) ? $t(`account.statusText.${order.status}`) : '' }}</p>
          <small class="muted">{{ $t('account.placedOn', { date: formatDate(order.date, true) }) }}</small>
        </div>
        <div v-if="order.payable" class="pay-box">
          <button type="button" class="btn btn-primary btn-lg" :disabled="isPaying" @click="pay">
            <span v-if="isPaying" class="spinner-border spinner-border-sm" aria-hidden="true"></span>
            <i v-else class="fa-solid fa-lock"></i>
            {{ isPaying ? $t('product.redirecting') : $t('product.payAmount', { amount: formatPrice(order.total) }) }}
          </button>
          <p v-if="payError" class="pay-error" role="alert">{{ $t('product.payError') }}</p>
        </div>
      </section>

      <div class="detail-grid">
        <!-- Items -->
        <section class="panel">
          <h2 class="panel-title">{{ $t('account.items') }}</h2>
          <ul class="items">
            <li v-for="item in order.items" :key="item.id">
              <NuxtLink v-if="item.slug" :to="`/shop/product/${item.slug}`" class="item-img">
                <ProductThumb :src="item.image" :alt="item.name" :size="64" />
              </NuxtLink>
              <span v-else class="item-img">
                <ProductThumb :src="item.image" :alt="item.name" :size="64" />
              </span>
              <span class="item-info">
                <b>{{ item.name }}</b>
                <small v-for="opt in item.options" :key="opt.label">{{ opt.label }} : {{ opt.value }}</small>
                <small>× {{ item.quantity }}</small>
              </span>
              <strong class="item-total">{{ formatPrice(item.total) }}</strong>
            </li>
          </ul>

          <div class="sum-row"><span>{{ $t('common.subtotal') }}</span><span>{{ formatPrice(order.subtotal) }}</span></div>
          <div v-if="order.discount" class="sum-row"><span>{{ $t('account.discount') }}</span><span>-{{ formatPrice(order.discount) }}</span></div>
          <div class="sum-row"><span>{{ $t('checkout.deliveryLabel') }}</span><span>{{ $t('checkout.deliveryEmail') }}</span></div>
          <div class="sum-total"><span>{{ $t('common.total') }}</span><strong>{{ formatPrice(order.total) }}</strong></div>
        </section>

        <!-- Delivery & payment -->
        <aside class="side-col">
          <section class="panel">
            <h2 class="panel-title">{{ $t('account.deliveryInfo') }}</h2>
            <p class="info-line"><i class="iconly-Curved-Message" aria-hidden="true"></i><span dir="ltr">{{ order.email }}</span></p>
            <p class="info-line" v-if="order.phone"><i class="iconly-Curved-Call" aria-hidden="true"></i><span dir="ltr">{{ order.phone }}</span></p>
            <p class="info-line" v-if="order.paymentMethod"><i class="iconly-Curved-Wallet" aria-hidden="true"></i><span>{{ order.paymentMethod }}</span></p>
            <p class="info-line" v-if="order.datePaid"><i class="iconly-Curved-TickSquare" aria-hidden="true"></i><span>{{ $t('account.paidOn', { date: formatDate(order.datePaid, true) }) }}</span></p>
            <p class="hint">{{ $t('payment.stayReachableText') }}</p>
          </section>

          <section class="panel" v-if="order.notes.length || order.customerNote">
            <h2 class="panel-title">{{ $t('account.messages') }}</h2>
            <div v-if="order.customerNote" class="note mine">
              <small>{{ $t('account.yourNote') }}</small>
              <p>{{ order.customerNote }}</p>
            </div>
            <div v-for="(note, i) in order.notes" :key="i" class="note">
              <small>{{ formatDate(note.date, true) }}</small>
              <p>{{ plain(note.text) }}</p>
            </div>
          </section>

          <a :href="whatsappLink($t('success.whatsappMessage', { id: order.number }))"
             target="_blank" rel="noopener" class="btn btn-success btn-block">
            <i class="fa-brands fa-whatsapp"></i> {{ $t('account.helpWithOrder') }}
          </a>
        </aside>
      </div>
    </template>
  </AccountShell>
</template>

<style scoped>
.back {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin: -6px 0 16px;
  color: var(--gs-primary);
  font-size: 14px;
  font-weight: 700;
}

:global([dir="rtl"] .account-page .flip-rtl) {
  transform: scaleX(-1);
}

.panel {
  padding: 20px;
  border-radius: 20px;
  background: var(--gs-bg-1);
  border: 1px solid var(--gs-surface);
}

.panel-title {
  margin: 0 0 14px;
  font-size: 17px;
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: var(--gs-muted);
  text-align: center;
}

.status-panel {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.status-panel.is-payable {
  border-color: var(--gs-warning);
  background: linear-gradient(0deg, var(--gs-warning-soft), var(--gs-bg-1));
}

.status-text {
  margin: 8px 0 2px;
  font-weight: 600;
}

.muted {
  color: var(--gs-muted);
}

.pay-error {
  margin: 8px 0 0;
  color: var(--gs-danger);
  font-size: 13px;
}

.detail-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 16px;
  align-items: start;
}

.side-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.items {
  margin: 0 0 12px;
  padding: 0;
  list-style: none;
}

.items li {
  display: grid;
  grid-template-columns: 64px minmax(0, 1fr) auto;
  align-items: center;
  gap: 14px;
  padding: 10px 0;
}

.items li + li {
  border-top: 1px solid var(--gs-surface);
}

/* Square tile filled edge to edge, like the product cards */
.item-img {
  flex: none;
  display: block;
}

.item-img img,
.item-img :deep(.thumb-mascot) {
  display: block;
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 12px;
  background: var(--gs-surface);
}

.item-info {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.item-info b {
  font-size: 14.5px;
  font-weight: 600;
}

.item-info small {
  color: var(--gs-muted);
  font-size: 12.5px;
}

.item-total {
  white-space: nowrap;
}

.sum-row {
  display: flex;
  justify-content: space-between;
  padding: 6px 0;
  color: var(--gs-text-2);
  font-size: 14px;
}

.sum-total {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-top: 8px;
  padding-top: 12px;
  border-top: 1px solid var(--gs-border);
  font-size: 15px;
  font-weight: 700;
}

.sum-total strong {
  font-size: 20px;
}

.info-line {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 0 10px;
  font-size: 14px;
  word-break: break-word;
}

.info-line i {
  color: var(--gs-primary);
  font-size: 18px;
}

.hint {
  margin: 4px 0 0;
  color: var(--gs-muted);
  font-size: 12.5px;
}

.note {
  padding: 10px 12px;
  border-radius: 12px;
  background: var(--gs-surface);
}

.note + .note {
  margin-top: 8px;
}

.note.mine {
  background: var(--gs-bg-1);
  border: 1px dashed var(--gs-border);
}

.note small {
  color: var(--gs-muted);
  font-size: 12px;
}

.note p {
  margin: 4px 0 0;
  font-size: 14px;
  white-space: pre-line;
  word-break: break-word;
}

@media (max-width: 991.98px) {
  .detail-grid {
    grid-template-columns: minmax(0, 1fr);
  }

  .pay-box,
  .pay-box .btn {
    width: 100%;
  }
}
</style>
