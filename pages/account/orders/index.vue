<script setup lang="ts">
definePageMeta({ middleware: 'account' })

const { t, locale } = useI18n()
const route = useRoute()

useHead({
  title: () => t('account.orders'),
  meta: [{ name: 'robots', content: 'noindex' }],
})

const page = computed(() => Math.max(1, Number(route.query.page) || 1))

const { data, pending, error, refresh } = await useFetch<any>('/api/account/orders', {
  query: { page },
  key: 'account-orders',
})

const formatPrice = (value: number | string) =>
    `${Number(value).toLocaleString('fr-FR')} ${t('common.currency')}`

const formatDate = (value: string) =>
    new Date(value).toLocaleDateString(DATE_LOCALES[locale.value] ?? 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })

const goTo = (n: number) => navigateTo({ query: { ...route.query, page: n > 1 ? n : undefined } })
</script>

<template>
  <AccountShell :title="$t('account.orders')">
    <div v-if="pending" class="placeholder-glow">
      <span v-for="n in 4" :key="n" class="placeholder col-12 rounded-4 mb-3" style="height: 132px"></span>
    </div>

    <div v-else-if="error" class="panel empty">
      <p>{{ $t('account.errors.loadFailed') }}</p>
      <button type="button" class="btn btn-outline-primary btn-sm" @click="refresh()">{{ $t('payment.retry') }}</button>
    </div>

    <div v-else-if="!data?.orders?.length" class="panel empty">
      <AstroBot mood="search" :size="100" />
      <p>{{ $t('account.noOrders') }}</p>
      <NuxtLink to="/shop" class="btn btn-primary">{{ $t('cart.continueShopping') }}</NuxtLink>
    </div>

    <template v-else>
      <ul class="order-cards">
        <li v-for="order in data.orders" :key="order.id" class="order-card">
          <div class="card-top">
            <span>
              <b>{{ $t('account.orderNo', { number: order.number }) }}</b>
              <small>{{ formatDate(order.date) }}</small>
            </span>
            <OrderStatus :status="order.status" />
          </div>

          <div class="card-items">
            <span class="thumbs" aria-hidden="true">
              <ProductThumb v-for="(item, i) in order.items.slice(0, 3)" :key="i" :src="item.image" :size="56" />
              <span v-if="order.items.length > 3" class="thumbs-more">+{{ order.items.length - 3 }}</span>
            </span>
            <span class="names">
              {{ order.items.map((i: any) => i.name).join(' · ') }}
            </span>
          </div>

          <div class="card-foot">
            <span class="total">
              <small>{{ $t('account.itemsCount', { count: order.itemsCount }, order.itemsCount) }}</small>
              <strong>{{ formatPrice(order.total) }}</strong>
            </span>
            <span class="actions">
              <NuxtLink v-if="order.payable" :to="`/account/orders/${order.id}`" class="btn btn-primary btn-sm">
                <i class="fa-solid fa-lock"></i> {{ $t('account.payNow') }}
              </NuxtLink>
              <NuxtLink :to="`/account/orders/${order.id}`" class="btn btn-outline-primary btn-sm">
                {{ $t('account.details') }}
              </NuxtLink>
            </span>
          </div>
        </li>
      </ul>

      <nav v-if="data.totalPages > 1" class="pager" :aria-label="$t('account.pagination')">
        <button type="button" class="btn btn-outline-primary btn-sm" :disabled="page <= 1" @click="goTo(page - 1)">
          <i class="fa-solid fa-arrow-left flip-rtl"></i>
        </button>
        <span>{{ page }} / {{ data.totalPages }}</span>
        <button type="button" class="btn btn-outline-primary btn-sm" :disabled="page >= data.totalPages" @click="goTo(page + 1)">
          <i class="fa-solid fa-arrow-right flip-rtl"></i>
        </button>
      </nav>
    </template>
  </AccountShell>
</template>

<style scoped>
.panel {
  padding: 20px;
  border-radius: 20px;
  background: var(--gs-bg-1);
  border: 1px solid var(--gs-surface);
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: var(--gs-muted);
  text-align: center;
}

.empty p {
  margin: 0;
}

.order-cards {
  display: flex;
  flex-direction: column;
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.order-card {
  padding: 18px;
  border-radius: 20px;
  background: var(--gs-bg-1);
  border: 1px solid var(--gs-surface);
}

.card-top {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.card-top > span {
  display: flex;
  flex-direction: column;
}

.card-top small {
  color: var(--gs-muted);
  font-size: 13px;
}

.card-items {
  display: flex;
  align-items: center;
  gap: 14px;
  margin: 14px 0;
  padding: 12px;
  border-radius: 14px;
  background: var(--gs-surface);
}

.thumbs {
  flex: none;
  display: flex;
}

/* Square tiles filled edge to edge, like the product cards; never squeezed by the row */
.thumbs img,
.thumbs :deep(.thumb-mascot) {
  flex: none;
  display: block;
  width: 56px;
  height: 56px;
  object-fit: cover;
  border-radius: 12px;
  border: 2px solid var(--gs-bg-1);
  background: var(--gs-surface);
}

.thumbs > * + * {
  margin-inline-start: -20px;
}

/* "+2" when an order has more items than shown */
.thumbs-more {
  flex: none;
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 12px;
  border: 2px solid var(--gs-bg-1);
  background: var(--gs-bg-1);
  color: var(--gs-muted);
  font-size: 13px;
  font-weight: 600;
}

.names {
  min-width: 0;
  color: var(--gs-text-2);
  font-size: 14px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-foot {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.total {
  display: flex;
  flex-direction: column;
}

.total small {
  color: var(--gs-muted);
  font-size: 12.5px;
}

.total strong {
  font-size: 18px;
}

.actions {
  display: flex;
  gap: 8px;
}

.pager {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  margin-top: 20px;
  font-weight: 700;
}

:global([dir="rtl"] .account-page .flip-rtl) {
  transform: scaleX(-1);
}
</style>
