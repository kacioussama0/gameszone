<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper/modules";

// Home page row for one WooCommerce category: title, arrows, "see all" and a
// slider of its products (5 per view on desktop, 2 on phones, like the other product sliders).
// With `orderby` instead of a category id it lists the whole shop in that order
// (e.g. best sellers: orderby "popularity").
const props = withDefaults(defineProps<{
  category: { id: number | string, name: string }
  orderby?: string
  // render on the server (first rows); the rest load in the browser
  eager?: boolean
  // green background (every other row on the home page)
  green?: boolean
  count?: number
}>(), {
  eager: false,
  green: false,
  count: 10,
})

const { data, status } = useLazyFetch<any>('/api/wc/products', {
  key: `home-category-${props.category.id}`,
  query: {
    per_page: props.count,
    page: 1,
    status: 'publish',
    stock_status: 'instock',
    ...(props.orderby ? { orderby: props.orderby, order: 'desc' } : { category: props.category.id }),
  },
  server: props.eager,
})

const products = computed(() => (data.value?.products || []).map(toProductCard))

// Hide the row once we know the category has nothing in stock (or the request failed)
const isEmpty = computed(() => (status.value === 'success' || status.value === 'error') && !products.value.length)

const link = computed(() => props.orderby ? `/shop?orderby=${props.orderby}` : `/shop?category=${props.category.id}`)

// Each row drives its own arrows
const prevClass = `cs-prev-${props.category.id}`
const nextClass = `cs-next-${props.category.id}`
</script>

<template>
  <section v-if="!isEmpty" class="gz-cat-row" :class="{ 'is-green': green }">
    <div class="container home-wide">
      <div class="section-head mb-4">
        <h2 class="section-title">
          <NuxtLink :to="link">{{ category.name }}</NuxtLink>
        </h2>
        <div class="head-actions">
          <NuxtLink :to="link" class="see-all">
            {{ $t('common.seeAll') }} <i class="fa-solid fa-chevron-right flip-rtl" aria-hidden="true"></i>
          </NuxtLink>
          <div v-if="products.length" class="slider-nav">
            <button type="button" class="nav-btn" :class="prevClass" :aria-label="$t('shop.prevPage')">
              <i class="fa-solid fa-chevron-left flip-rtl"></i>
            </button>
            <button type="button" class="nav-btn" :class="nextClass" :aria-label="$t('shop.nextPage')">
              <i class="fa-solid fa-chevron-right flip-rtl"></i>
            </button>
          </div>
        </div>
      </div>

      <Swiper
          v-if="products.length"
          class="product-swiper"
          :modules="[Navigation]"
          :speed="400"
          :watch-overflow="true"
          breakpoints-base="container"
          :breakpoints="{
            0: { slidesPerView: 2, spaceBetween: 12, slidesPerGroup: 2 },
            560: { slidesPerView: 3, spaceBetween: 16, slidesPerGroup: 3 },
            860: { slidesPerView: 4, spaceBetween: 20, slidesPerGroup: 4 },
            1120: { slidesPerView: 5, spaceBetween: 24, slidesPerGroup: 5 }
          }"
          :navigation="{
            prevEl: `.${prevClass}`,
            nextEl: `.${nextClass}`,
            disabledClass: 'is-disabled',
          }"
      >
        <SwiperSlide v-for="product in products" :key="product.id">
          <ProductCard :product="product" :show-stock="false" />
        </SwiperSlide>
      </Swiper>

      <!-- Loading: a row of placeholders the size of the slider -->
      <ul v-else class="skeleton-row" aria-hidden="true">
        <li v-for="n in 5" :key="n"><ProductCardSkeleton /></li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.gz-cat-row {
  padding-block: 28px;
  background: var(--gs-bg-1);
}

/* alternate rows: a soft lime-to-green wash with fine green edges */
.gz-cat-row.is-green {
  background:
      linear-gradient(120deg,
        color-mix(in srgb, var(--gs-lime) 5%, var(--gs-bg-1)) 0%,
        color-mix(in srgb, var(--gs-green) 4%, var(--gs-bg-1)) 50%,
        color-mix(in srgb, var(--gs-green) 7%, var(--gs-bg-1)) 100%);
  border-block: 1px solid color-mix(in srgb, var(--gs-green) 12%, transparent);
}

/* product tiles read better white on green than grey */
.gz-cat-row.is-green :deep(.product-media) {
  //background: var(--gs-bg-1);
}

/* on green, the pill gets a white fill like the arrows */
.is-green .see-all {
  border-color: transparent;
  background: var(--gs-bg-1);
}

.section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 18px;
}

/* Bigger heading with a short brand-gradient bar in front */
.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0;
  min-width: 0;
  font-family: var(--gs-font-heading);
  font-size: clamp(24px, 3vw, 34px);
  font-weight: 800;
  line-height: 1.1;
  letter-spacing: -.01em;
}

.section-title::before {
  content: "";
  flex: none;
  width: 6px;
  height: 1em;
  border-radius: 6px;
  background: var(--gs-gradient);
}

.section-title a {
  color: var(--gs-ink);
}

.section-title a:hover {
  color: var(--gs-primary);
}

.head-actions {
  flex: none;
  display: flex;
  align-items: center;
  gap: 12px;
}

.see-all {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 14px;
  border: 1px solid var(--gs-border);
  border-radius: 999px;
  color: var(--gs-ink);
  font-size: 13.5px;
  font-weight: 700;
  transition: border-color .15s ease, color .15s ease;
}

.see-all:hover {
  border-color: var(--gs-primary);
  color: var(--gs-primary);
}

/* same round arrows as the categories slider */
.slider-nav {
  display: flex;
  gap: 8px;
}

.nav-btn {
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  border: 1px solid var(--gs-border);
  border-radius: 50%;
  background: var(--gs-bg-1);
  color: var(--gs-ink);
  transition: background-color .15s ease, border-color .15s ease;
}

.nav-btn:hover:not(.is-disabled) {
  border-color: transparent;
  background: var(--gs-gradient);
  color: var(--gs-on-brand);
}

.nav-btn.is-disabled {
  opacity: .35;
  cursor: default;
}

/* Swiper hides arrows it doesn't need (fewer products than fit) */
.nav-btn.swiper-button-lock {
  display: none;
}

:global([dir="rtl"] .gz-cat-row .flip-rtl) {
  transform: scaleX(-1);
}

.skeleton-row {
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 24px;
  margin: 0;
  padding: 0;
  list-style: none;
}

@media (max-width: 1199.98px) {
  .skeleton-row {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .skeleton-row li:nth-child(5) {
    display: none;
  }
}

@media (max-width: 991.98px) {
  .skeleton-row {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 16px;
  }

  .skeleton-row li:nth-child(4) {
    display: none;
  }
}

/* Phones: swipe instead of arrows */
@media (max-width: 575.98px) {
  .gz-cat-row {
    padding-block: 20px;
  }

  .slider-nav {
    display: none;
  }

  .skeleton-row {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }

  .skeleton-row li:nth-child(3) {
    display: none;
  }
}
</style>
