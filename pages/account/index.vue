<script setup lang="ts">
definePageMeta({ middleware: 'account' })

const { t, locale } = useI18n()
const { account } = useAccount()

useHead({
  title: () => t('account.overview'),
  meta: [{ name: 'robots', content: 'noindex' }],
})

const { data, pending, error, refresh } = await useFetch<any>('/api/account/orders', {
  query: { page: 1 },
  key: 'account-orders-overview',
})

const recent = computed(() => (data.value?.orders || []).slice(0, 3))
const awaiting = computed(() => (data.value?.orders || []).filter((o: any) => o.payable).length)

const formatPrice = (value: number | string) =>
    `${Number(value).toLocaleString('fr-FR')} ${t('common.currency')}`

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString(DATE_LOCALES[locale.value] ?? 'fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })
</script>

<template>
  <AccountShell :title="$t('account.hello', { name: account?.first_name || '' })">
    <!-- Quick figures -->
    <div class="stats">
      <NuxtLink to="/account/orders" class="stat">
        <i class="iconly-Curved-Bag" aria-hidden="true"></i>
        <span>
          <b>{{ pending ? '…' : data?.total ?? 0 }}</b>
          <small>{{ $t('account.ordersCount') }}</small>
        </span>
      </NuxtLink>
      <NuxtLink to="/account/orders" class="stat" :class="{ 'is-warn': awaiting > 0 }">
        <i class="iconly-Curved-Wallet" aria-hidden="true"></i>
        <span>
          <b>{{ pending ? '…' : awaiting }}</b>
          <small>{{ $t('account.awaitingPayment') }}</small>
        </span>
      </NuxtLink>
      <NuxtLink to="/account/settings" class="stat">
        <i class="iconly-Curved-Message" aria-hidden="true"></i>
        <span>
          <b class="stat-email" dir="ltr">{{ account?.email }}</b>
          <small>{{ $t('account.codesSentTo') }}</small>
        </span>
      </NuxtLink>
    </div>

    <!-- Recent orders -->
    <section class="panel">
      <div class="panel-head">
        <h2>{{ $t('account.recentOrders') }}</h2>
        <NuxtLink v-if="recent.length" to="/account/orders" class="see-all">
          {{ $t('common.seeAll') }} <i class="fa-solid fa-arrow-right flip-rtl" aria-hidden="true"></i>
        </NuxtLink>
      </div>

      <div v-if="pending" class="placeholder-glow">
        <span v-for="n in 3" :key="n" class="placeholder col-12 rounded-3 mb-2" style="height: 72px"></span>
      </div>

      <div v-else-if="error" class="empty">
        <p>{{ $t('account.errors.loadFailed') }}</p>
        <button type="button" class="btn btn-outline-primary btn-sm" @click="refresh()">{{ $t('payment.retry') }}</button>
      </div>

      <div v-else-if="!recent.length" class="empty">
        <AstroBot mood="search" :size="90" />
        <p>{{ $t('account.noOrders') }}</p>
        <NuxtLink to="/shop" class="btn btn-primary">{{ $t('cart.continueShopping') }}</NuxtLink>
      </div>

      <ul v-else class="order-rows">
        <li v-for="order in recent" :key="order.id">
          <NuxtLink :to="`/account/orders/${order.id}`" class="order-row">
            <span class="thumbs" aria-hidden="true">
              <ProductThumb v-for="(item, i) in order.items.slice(0, 2)" :key="i" :src="item.image" :size="44" />
            </span>
            <span class="order-main">
              <b>{{ $t('account.orderNo', { number: order.number }) }}</b>
              <small>{{ formatDate(order.date) }} · {{ $t('account.itemsCount', { count: order.itemsCount }, order.itemsCount) }}</small>
            </span>
            <OrderStatus :status="order.status" />
            <strong class="order-total">{{ formatPrice(order.total) }}</strong>
          </NuxtLink>
        </li>
      </ul>
    </section>
  </AccountShell>
</template>

<style scoped>
.stats {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
  margin-bottom: 18px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  padding: 16px;
  border-radius: 18px;
  background: var(--gs-bg-1);
  border: 1px solid var(--gs-surface);
  color: var(--gs-ink);
  transition: border-color .15s ease;
}

.stat:hover {
  border-color: var(--gs-green);
  color: var(--gs-ink);
}

.stat > i {
  flex: none;
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 14px;
  background: var(--gs-surface);
  color: var(--gs-primary);
  font-size: 20px;
}

.stat.is-warn > i {
  background: var(--gs-warning-soft);
  color: var(--gs-warning);
}

.stat span {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.stat b {
  font-size: 20px;
  line-height: 1.2;
}

.stat .stat-email {
  overflow: hidden;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.stat small {
  color: var(--gs-muted);
  font-size: 12.5px;
}

.panel {
  padding: 20px;
  border-radius: 20px;
  background: var(--gs-bg-1);
  border: 1px solid var(--gs-surface);
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.panel-head h2 {
  margin: 0;
  font-size: 18px;
}

.see-all {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: var(--gs-primary);
  font-size: 14px;
  font-weight: 700;
}

:global([dir="rtl"] .account-page .flip-rtl) {
  transform: scaleX(-1);
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 18px 0 8px;
  color: var(--gs-muted);
  text-align: center;
}

.empty p {
  margin: 0;
}

.order-rows {
  margin: 0;
  padding: 0;
  list-style: none;
}

.order-rows li + li {
  border-top: 1px solid var(--gs-surface);
}

.order-row {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 14px;
  padding: 12px 6px;
  border-radius: 12px;
  color: var(--gs-ink);
}

.order-row:hover {
  background: var(--gs-surface);
  color: var(--gs-ink);
}

.thumbs {
  display: flex;
}

/* Square tiles filled edge to edge, like the product cards; never squeezed by the row */
.thumbs img,
.thumbs :deep(.thumb-mascot) {
  flex: none;
  display: block;
  width: 44px;
  height: 44px;
  object-fit: cover;
  border-radius: 10px;
  border: 2px solid var(--gs-bg-1);
  background: var(--gs-surface);
}

.thumbs > * + * {
  margin-inline-start: -16px;
}

.order-main {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.order-main small {
  color: var(--gs-muted);
  font-size: 12.5px;
}

.order-total {
  white-space: nowrap;
}

@media (max-width: 767.98px) {
  .stats {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .stats .stat:last-child {
    grid-column: 1 / -1;
  }

  .order-row {
    grid-template-columns: auto minmax(0, 1fr) auto;
    row-gap: 6px;
  }

  .order-row :deep(.order-status) {
    grid-column: 2;
    justify-self: start;
  }

  .order-total {
    grid-column: 3;
    grid-row: 1;
  }
}
</style>
