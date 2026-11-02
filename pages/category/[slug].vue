<script setup lang="ts">
// Main category landing page (from the home categories slider): its sub-categories
// as cards, then a row of products for each one. A category without sub-categories
// just lists its own products.

import Header3 from "~/components/Header3.vue";
import type { MenuCategory } from "~/server/api/menu.get";

const slug = String(useRoute().params.slug)
const { t } = useI18n()

// Same request and key as the header menu and the slider: already cached
const { data: menuData } = await useFetch<MenuCategory[]>('/api/menu', { key: 'header-menu' })

// Find the category at any depth, with its parent for the breadcrumb
const findCategory = (list: MenuCategory[], parent: MenuCategory | null = null): { category: MenuCategory, parent: MenuCategory | null } | null => {
  for (const c of list) {
    if (c.slug === slug) return { category: c, parent }
    const found = findCategory(c.children, c)
    if (found) return found
  }
  return null
}

const found = findCategory(menuData.value || [])
if (!found) {
  throw createError({ statusCode: 404, statusMessage: 'Category not found', fatal: true })
}

const category = found.category
const parent = found.parent

// Products shown per row; "See all" opens the full shop listing
const PER_SECTION = 8

// One row per sub-category, then the category's products that are in none of them
// (or a single row for the category itself when it has no sub-categories)
type Section = { key: string, id: number, slug: string, name: string, others?: boolean }

// Every category below this one (sub-categories and theirs)
const descendantIds = (c: MenuCategory): number[] => c.children.flatMap(child => [child.id, ...descendantIds(child)])
const subtreeIds = descendantIds(category)

const sections: Section[] = category.children.length
    ? [
        ...category.children.map(c => ({ key: String(c.id), id: c.id, slug: c.slug, name: c.name })),
        { key: 'others', id: category.id, slug: 'others', name: t('categoryPage.others', { name: category.name }), others: true },
      ]
    : [{ key: String(category.id), id: category.id, slug: category.slug, name: category.name }]

// Fetched with room to spare: products already shown in an earlier row are dropped
const loadSection = (s: Section) =>
  $fetch<{ products: any[] }>('/api/wc/products', {
    query: { category: s.id, per_page: s.others ? 40 : PER_SECTION * 2 },
  }).then(res => res.products.map(toProductCard)).catch(() => [] as any[])

const { data: products, pending } = useLazyAsyncData(`category-page-${category.id}`, async () => {
  const results = await Promise.all(sections.map(loadSection))

  // Each product shows once: in its first sub-category row, and in "others"
  // only when it belongs to none of the sub-categories
  const shown = new Set<number>()
  return Object.fromEntries(sections.map((s, i) => {
    const row = results[i]
        .filter(p => !shown.has(p.id))
        .filter(p => !s.others || !(p.categories || []).some((c: any) => subtreeIds.includes(c.id)))
        .slice(0, PER_SECTION)
    row.forEach(p => shown.add(p.id))
    return [s.key, row]
  }))
}, { default: () => ({} as Record<string, any[]>) })

// Empty rows are dropped once loaded (the "others" row isn't shown as a skeleton)
const visibleSections = computed(() =>
    pending.value ? sections.filter(s => !s.others) : sections.filter(s => products.value[s.key]?.length)
)

const shopLink = (id: number) => ({ path: '/shop', query: { category: String(id) } })

/* ---------- SEO ---------- */
const { absolute } = useSiteUrl()
const canonical = absolute(`/category/${category.slug}`)
const description = t('seo.categoryDescription', { name: category.name.toLowerCase() })
// Share previews are in English for everyone (see app.vue)
const shareDescription = t('seo.categoryDescription', { name: category.name.toLowerCase() }, { locale: 'en' })
const image = category.image || absolute(SHARE_BANNER.path)

useHead({ link: [{ rel: 'canonical', href: canonical, key: 'canonical' }] })

useSeoMeta({
  title: category.name,
  description,
  ogTitle: `${category.name} | GamesZone`,
  twitterTitle: `${category.name} | GamesZone`,
  ogDescription: shareDescription,
  twitterDescription: shareDescription,
  ogUrl: canonical,
  ogImage: image,
  ogImageSecureUrl: image,
  // the banner's size and type come from app.vue: drop them for a category picture
  ogImageType: category.image ? null : SHARE_BANNER.type,
  ogImageWidth: category.image ? null : SHARE_BANNER.width,
  ogImageHeight: category.image ? null : SHARE_BANNER.height,
  ogImageAlt: category.name,
  twitterImage: image,
  twitterImageAlt: category.name,
})
</script>

<template>
  <header class="site-header mo-left header style-2">
    <Header3 />
  </header>

  <div class="page-content bg-light">
    <div class="container home-wide">

      <!-- Where am I -->
      <nav :aria-label="$t('breadcrumb.label')" class="gs-breadcrumb">
        <ol>
          <li>
            <NuxtLink to="/">
              <i class="iconly-Curved-Home" aria-hidden="true"></i>
              <span>{{ $t('common.home') }}</span>
            </NuxtLink>
          </li>
          <li v-if="parent"><NuxtLink :to="`/category/${parent.slug}`">{{ parent.name }}</NuxtLink></li>
          <li aria-current="page"><span>{{ category.name }}</span></li>
        </ol>
      </nav>

      <div class="cat-hero">
        <img v-if="category.image" :src="category.image" :alt="category.name" class="cat-hero-img" width="88" height="88" />
        <h1 class="cat-hero-title">{{ category.name }}</h1>
      </div>

      <!-- Sub-categories: jump to their row -->
      <div v-if="category.children.length" class="subcat-grid" role="list">
        <a
            v-for="sub in category.children"
            :key="sub.id"
            :href="`#sub-${sub.slug}`"
            class="subcat-card"
            role="listitem"
        >
          <img v-if="sub.image" :src="sub.image" :alt="sub.name" width="56" height="56" />
          <span v-else class="subcat-letter" aria-hidden="true">{{ sub.name.charAt(0) }}</span>
          <b>{{ sub.name }}</b>
        </a>
      </div>

      <!-- One product row per sub-category -->
      <section
          v-for="section in visibleSections"
          :id="`sub-${section.slug}`"
          :key="section.key"
          class="cat-section"
      >
        <div class="cat-section-head">
          <h2>{{ section.name }}</h2>
          <NuxtLink :to="shopLink(section.id)" class="see-all">
            {{ $t('common.seeAll') }}
            <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </NuxtLink>
        </div>

        <div class="row g-3 g-md-4">
          <template v-if="pending">
            <div v-for="i in 4" :key="i" class="col-12 col-md-6 col-xl-3">
              <ProductCardSkeleton />
            </div>
          </template>
          <div v-else v-for="product in products[section.key]" :key="product.id" class="col-12 col-md-6 col-xl-3">
            <ProductCard :product="product" :show-stock="true" />
          </div>
        </div>
      </section>

      <div v-if="!pending && !visibleSections.length" class="cat-empty">
        <AstroBot mood="search" :size="140" class="mb-3" />
        <h4>{{ $t('shop.noProducts') }}</h4>
        <NuxtLink to="/shop" class="btn btn-primary rounded-pill mt-2">{{ $t('common.seeAllProducts') }}</NuxtLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cat-hero {
  display: flex;
  align-items: center;
  gap: 18px;
  margin: 18px 0 26px;
}

.cat-hero-img {
  width: 88px;
  height: 88px;
  border-radius: 22px;
  object-fit: cover;
}

.cat-hero-title {
  margin: 0;
  font-size: clamp(30px, 5vw, 52px);
  line-height: 1.1;
}

/* ---------- sub-categories ---------- */
.subcat-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
  margin-bottom: 12px;
}

.subcat-card {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
  border: 1.5px solid var(--gs-border);
  border-radius: 16px;
  background: var(--gs-bg-1);
  color: var(--gs-ink);
  text-decoration: none;
  transition: border-color .15s ease, transform .15s ease;
}

.subcat-card:hover,
.subcat-card:focus-visible {
  border-color: var(--gs-green);
  transform: translateY(-2px);
}

.subcat-card img,
.subcat-letter {
  flex: none;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  object-fit: cover;
}

.subcat-letter {
  display: grid;
  place-items: center;
  background: var(--gs-gradient);
  color: var(--gs-on-brand);
  font-size: 18px;
  font-weight: 800;
  text-transform: uppercase;
}

.subcat-card b {
  font-size: 14.5px;
  line-height: 1.25;
}

/* ---------- product rows ---------- */
.cat-section {
  padding: 28px 0 8px;
  scroll-margin-top: 90px;
}

.cat-section-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.cat-section-head h2 {
  margin: 0;
  font-size: clamp(20px, 2.4vw, 26px);
}

.see-all {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: var(--gs-primary);
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
}

/* Arrow points forward in Arabic too */
:global([dir="rtl"] .see-all i) {
  transform: scaleX(-1);
}

.cat-empty {
  padding: 48px 0;
  text-align: center;
}

@media (max-width: 575.98px) {
  .cat-hero-img {
    width: 64px;
    height: 64px;
    border-radius: 16px;
  }

  .subcat-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>
