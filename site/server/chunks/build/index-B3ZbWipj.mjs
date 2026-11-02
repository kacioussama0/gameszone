import { H as Header3 } from './Header3-s4pCF4HI.mjs';
import { d as _export_sfc, f as useRoute, a as useI18n, v as useShopFilters, x as useShopCategories, y as decodeName, N as NEW_ARRIVALS_DAYS, n as useSiteUrl, b as useHead, z as useSeoMeta, A as useNuxtData, _ as __nuxt_component_2$1, B as SORT_OPTIONS, c as __nuxt_component_1$1 } from './server.mjs';
import { _ as __nuxt_component_0 } from './ProductCard-a2L0chnn.mjs';
import { _ as __nuxt_component_1 } from './ProductCardSkeleton-Bbf-Kb4X.mjs';
import { defineComponent, computed, ref, watch, unref, withCtx, createTextVNode, toDisplayString, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:crypto';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'meilisearch';
import 'node:url';
import 'ipx';
import 'vue-router';
import '@algolia/cache-in-memory';
import '@algolia/requester-fetch';
import '@vue/shared';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const SHOW_FILTERS = false;
const delta = 2;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { t } = useI18n();
    const { query, sort, update, setPrice, activeCount, page: currentPage } = useShopFilters();
    const { byId, childrenOf } = useShopCategories();
    const currentCategory = computed(() => byId(query.value.category));
    const parentCategory = computed(
      () => {
        var _a;
        return ((_a = currentCategory.value) == null ? void 0 : _a.parent) ? byId(currentCategory.value.parent) : null;
      }
    );
    const subCategories = computed(() => {
      const current = currentCategory.value;
      if (!current) return [];
      const children = childrenOf(current.id);
      return children.length ? children : current.parent ? childrenOf(current.parent) : [];
    });
    const chipsParent = computed(() => {
      const current = currentCategory.value;
      if (!current) return null;
      return childrenOf(current.id).length ? current : parentCategory.value;
    });
    const groupProduct = ref(null);
    const isGroupView = computed(() => !!query.value.group);
    const showFilters = computed(() => SHOW_FILTERS);
    const loadGroup = async () => {
      var _a, _b;
      if (!query.value.group) return groupProduct.value = null;
      if (String((_a = groupProduct.value) == null ? void 0 : _a.id) === query.value.group) return;
      const res = await $fetch("/api/wc/products", { query: { include: query.value.group, per_page: 1 } });
      groupProduct.value = ((_b = res.products) == null ? void 0 : _b[0]) || null;
    };
    computed(() => !currentCategory.value && !query.value.search && !activeCount.value && !isGroupView.value);
    const pageTitle = computed(() => {
      const q = query.value;
      if (isGroupView.value && groupProduct.value) return decodeName(groupProduct.value.name);
      if (q.search) return t("shop.results", { query: q.search });
      if (currentCategory.value) return decodeName(currentCategory.value.name).toLowerCase();
      if (q.onSale) return t("home.promotions");
      if (q.newArrivals) return t("shop.filters.newArrivals", { days: NEW_ARRIVALS_DAYS });
      if (q.tag || q.brand || q.include) return t("shop.filters.collection");
      return t("common.shop");
    });
    const categoryLink = (id) => {
      const next = { ...route.query, category: id ? String(id) : void 0 };
      delete next.page;
      return { path: "/shop", query: next };
    };
    const { absolute } = useSiteUrl();
    const isIndexable = computed(() => {
      const ignored = ["category", "page"];
      return Object.keys(route.query).every((key) => ignored.includes(key) || !route.query[key]);
    });
    const canonicalUrl = computed(() => {
      const params = new URLSearchParams();
      if (query.value.category) params.set("category", query.value.category);
      if (currentPage.value > 1) params.set("page", String(currentPage.value));
      const qs = params.toString();
      return absolute(`/shop${qs ? `?${qs}` : ""}`);
    });
    const seoTitle = computed(() => pageTitle.value.replace(/^./, (c) => c.toUpperCase()));
    const seoDescription = computed(
      () => currentCategory.value ? t("seo.categoryDescription", { name: decodeName(currentCategory.value.name).toLowerCase() }) : t("seo.description")
    );
    useHead({
      link: [{ rel: "canonical", href: canonicalUrl, key: "canonical" }],
      meta: [{ name: "robots", content: () => isIndexable.value ? "index, follow" : "noindex, follow" }]
    });
    const categoryImage = computed(() => {
      var _a, _b;
      return ((_b = (_a = currentCategory.value) == null ? void 0 : _a.image) == null ? void 0 : _b.src) || absolute("/banner.jpg");
    });
    useSeoMeta({
      title: seoTitle,
      description: seoDescription,
      ogImage: categoryImage,
      ogImageAlt: seoTitle,
      twitterImage: categoryImage,
      ogTitle: () => `${seoTitle.value} | GamesZone`,
      ogDescription: seoDescription,
      ogUrl: canonicalUrl,
      twitterTitle: seoTitle,
      twitterDescription: seoDescription
    });
    const perPage = computed(() => query.value.search ? 48 : 12);
    const total = ref(0);
    const totalPages = ref(0);
    const loading = ref(true);
    const allProducts = ref([]);
    const start = computed(
      () => total.value ? (currentPage.value - 1) * perPage.value + 1 : 0
    );
    const end = computed(() => {
      if (!total.value) return 0;
      const realEnd = (currentPage.value - 1) * perPage.value + allProducts.value.length;
      return Math.min(realEnd, total.value);
    });
    const paginationItems = computed(() => {
      const pages = [];
      if (totalPages.value <= 1) return pages;
      if (totalPages.value <= 7) {
        return Array.from({ length: totalPages.value }, (_, i) => i + 1);
      }
      const left = Math.max(2, currentPage.value - delta);
      const right = Math.min(totalPages.value - 1, currentPage.value + delta);
      pages.push(1);
      if (left > 2) pages.push("...");
      for (let i = left; i <= right; i++) pages.push(i);
      if (right < totalPages.value - 1) pages.push("...");
      pages.push(totalPages.value);
      return pages;
    });
    let searchIds = [];
    const loadSearchIds = async () => {
      searchIds = [];
      if (!query.value.search) return;
      const res = await $fetch("/api/search", {
        query: { q: query.value.search }
      });
      searchIds = (res.hits || []).map((hit) => hit.id);
    };
    const fetchProducts = async () => {
      var _a;
      try {
        loading.value = true;
        const { orderby, order, category, tag, brand, include, minPrice, maxPrice, inStock, onSale, newArrivals, search, group } = query.value;
        await loadGroup();
        const groupIds = ((_a = groupProduct.value) == null ? void 0 : _a.grouped_products) || [];
        const after = newArrivals ? new Date(Date.now() - NEW_ARRIVALS_DAYS * 864e5).toISOString().slice(0, 10) + "T00:00:00" : void 0;
        if (search && !searchIds.length || group && !groupIds.length) {
          allProducts.value = [];
          total.value = 0;
          totalPages.value = 0;
          return;
        }
        const res = await $fetch("/api/wc/products", {
          query: {
            per_page: perPage.value,
            page: currentPage.value,
            orderby,
            order,
            ...group ? { include: groupIds.join(",") } : {
              category,
              tag,
              brand,
              include: search ? searchIds.join(",") : include,
              min_price: minPrice,
              max_price: maxPrice,
              stock_status: inStock ? "instock" : void 0,
              on_sale: onSale ? "true" : void 0,
              after
            }
          }
        });
        total.value = res.total;
        totalPages.value = res.totalPages;
        allProducts.value = res.products.map((product) => {
          var _a2, _b, _c, _d, _e, _f;
          return {
            id: product.id,
            name: product.name,
            type: product.type,
            grouped_products: product.grouped_products,
            slug: product.slug,
            thumbnail: ((_b = (_a2 = product.images) == null ? void 0 : _a2[0]) == null ? void 0 : _b.thumbnail) || ((_d = (_c = product.images) == null ? void 0 : _c[0]) == null ? void 0 : _d.src) || "",
            image: (_e = product.images) == null ? void 0 : _e[0],
            price: product.price,
            on_sale: product.on_sale,
            categories: product.categories,
            is_epay: product.is_epay,
            is_prepay: product.is_prepay,
            variations: product.variations,
            regular_price: product.regular_price,
            stock: product.stock_status,
            occasion: (_f = product.categories) == null ? void 0 : _f.some((c) => c.slug === "occasion")
          };
        });
        allProducts.value = allProducts.value.sort((a, b) => a.stock.localeCompare(b.stock)).filter((product) => product.type !== "grouped");
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        loading.value = false;
      }
    };
    watch(() => route.fullPath, async (to, from) => {
      if (route.path !== "/shop") return;
      filtersOpen.value = false;
      if (new URL(to, "http://x").searchParams.get("search") !== new URL(from, "http://x").searchParams.get("search")) {
        await loadSearchIds();
      }
      await fetchProducts();
    });
    const filtersOpen = ref(false);
    watch(filtersOpen, (open) => {
      (void 0).body.style.overflow = open ? "hidden" : "";
    });
    const { data: categories } = useNuxtData("wc-categories");
    const activeChips = computed(() => {
      var _a;
      const q = query.value;
      const chips = [];
      const currency = t("common.currency");
      if (q.category) {
        const category = (_a = categories.value) == null ? void 0 : _a.find((c) => String(c.id) === q.category);
        const name = category == null ? void 0 : category.name.replace(/&amp;/g, "&").toLowerCase();
        chips.push({ key: "category", label: name || t("shop.categories"), remove: () => update({ category: void 0 }) });
      }
      if (q.tag || q.brand || q.include) {
        chips.push({ key: "collection", label: t("shop.filters.collection"), remove: () => update({ tag: void 0, brand: void 0, include: void 0 }) });
      }
      if (q.minPrice || q.maxPrice) {
        const min = q.minPrice ? Number(q.minPrice).toLocaleString("fr-FR") : "0";
        const max = q.maxPrice ? Number(q.maxPrice).toLocaleString("fr-FR") : "\u221E";
        chips.push({ key: "price", label: `${min} \u2013 ${max} ${currency}`, remove: () => setPrice() });
      }
      if (q.inStock) {
        chips.push({ key: "stock", label: t("shop.filters.inStock"), remove: () => update({ stock_status: void 0 }) });
      }
      if (q.onSale) {
        chips.push({ key: "sale", label: t("shop.filters.onSale"), remove: () => update({ on_sale: void 0 }) });
      }
      if (q.newArrivals) {
        chips.push({ key: "new", label: t("shop.filters.newArrivals", { days: NEW_ARRIVALS_DAYS }), remove: () => update({ new: void 0 }) });
      }
      return chips;
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_Header3 = Header3;
      const _component_NuxtLink = __nuxt_component_2$1;
      const _component_ProductCard = __nuxt_component_0;
      const _component_ProductCardSkeleton = __nuxt_component_1;
      const _component_AstroBot = __nuxt_component_1$1;
      _push(`<!--[--><header class="site-header mo-left header style-2" data-v-846ec472>`);
      _push(ssrRenderComponent(_component_Header3, null, null, _parent));
      _push(`</header><div class="page-content bg-light" data-v-846ec472><section class="content-inner-3 pt-3 z-index-unset" data-v-846ec472><div class="container" data-v-846ec472><div class="shop-head" data-v-846ec472><div class="head-row flex justify-content-center align-items-center" data-v-846ec472><h1 class="shop-title my-5" style="${ssrRenderStyle({ "font-size": "4rem" })}" data-v-846ec472>${ssrInterpolate(unref(pageTitle))}</h1></div>`);
      if (unref(subCategories).length) {
        _push(`<div class="subcats" role="list" data-v-846ec472>`);
        if (unref(chipsParent)) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: categoryLink(unref(chipsParent).id),
            class: ["subcat", { active: ((_a = unref(currentCategory)) == null ? void 0 : _a.id) === unref(chipsParent).id }],
            role: "listitem"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(_ctx.$t("shop.allIn"))}`);
              } else {
                return [
                  createTextVNode(toDisplayString(_ctx.$t("shop.allIn")), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(unref(subCategories), (sub) => {
          var _a2;
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: sub.id,
            to: categoryLink(sub.id),
            class: ["subcat", { active: ((_a2 = unref(currentCategory)) == null ? void 0 : _a2.id) === sub.id }],
            role: "listitem"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span class="text-capitalize" data-v-846ec472${_scopeId}>${ssrInterpolate(unref(decodeName)(sub.name).toLowerCase())}</span><span class="subcat-count" data-v-846ec472${_scopeId}>${ssrInterpolate(sub.count)}</span>`);
              } else {
                return [
                  createVNode("span", { class: "text-capitalize" }, toDisplayString(unref(decodeName)(sub.name).toLowerCase()), 1),
                  createVNode("span", { class: "subcat-count" }, toDisplayString(sub.count), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="row gx-4 gy-0" data-v-846ec472>`);
      {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass([{ "col-xl-9": unref(showFilters) }, "col-12"])}" data-v-846ec472>`);
      if (!unref(isGroupView)) {
        _push(`<div class="shop-toolbar" data-v-846ec472>`);
        if (unref(showFilters)) {
          _push(`<button type="button" class="btn filter-toggle d-xl-none" data-v-846ec472><i class="flaticon-filter" data-v-846ec472></i> ${ssrInterpolate(_ctx.$t("shop.filter"))} `);
          if (unref(activeCount)) {
            _push(`<span class="count" data-v-846ec472>${ssrInterpolate(unref(activeCount))}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<label class="sort-select" data-v-846ec472><span class="d-none d-sm-inline" data-v-846ec472>${ssrInterpolate(_ctx.$t("shop.sort.label"))}</span><select class="form-select"${ssrRenderAttr("value", unref(sort))} data-v-846ec472><!--[-->`);
        ssrRenderList(unref(SORT_OPTIONS), (option) => {
          _push(`<option${ssrRenderAttr("value", option.value)} data-v-846ec472>${ssrInterpolate(_ctx.$t(option.label))}</option>`);
        });
        _push(`<!--]--></select></label></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(activeChips).length && !unref(isGroupView)) {
        _push(`<div class="active-filters" data-v-846ec472><!--[-->`);
        ssrRenderList(unref(activeChips), (chip) => {
          _push(`<button type="button" class="active-chip"${ssrRenderAttr("aria-label", _ctx.$t("shop.filters.remove", { name: chip.label }))} data-v-846ec472>${ssrInterpolate(chip.label)} <i class="fa-solid fa-xmark" data-v-846ec472></i></button>`);
        });
        _push(`<!--]--><button type="button" class="clear-all" data-v-846ec472>${ssrInterpolate(_ctx.$t("shop.filters.clearAll"))}</button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(loading) || unref(allProducts).length) {
        _push(`<div id="shop-results" class="row g-3 g-md-4" data-v-846ec472>`);
        if (!unref(loading)) {
          _push(`<!--[-->`);
          ssrRenderList(unref(allProducts), (product) => {
            _push(`<div class="${ssrRenderClass([{ "col-xl-3": !unref(showFilters) }, "col-12"])}" data-v-846ec472>`);
            _push(ssrRenderComponent(_component_ProductCard, {
              product,
              "show-stock": true
            }, null, _parent));
            _push(`</div>`);
          });
          _push(`<!--]-->`);
        } else {
          _push(`<!--[-->`);
          ssrRenderList(8, (i) => {
            _push(`<div class="${ssrRenderClass([{ "col-xl-2": !unref(showFilters) }, "col-6 col-md-4 col-lg-3"])}" data-v-846ec472>`);
            _push(ssrRenderComponent(_component_ProductCardSkeleton, null, null, _parent));
            _push(`</div>`);
          });
          _push(`<!--]-->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="card empty-state" data-v-846ec472><div class="card-body text-center py-5" data-v-846ec472>`);
        _push(ssrRenderComponent(_component_AstroBot, {
          mood: "search",
          size: 140,
          class: "mb-3"
        }, null, _parent));
        _push(`<h4 data-v-846ec472>${ssrInterpolate(_ctx.$t("shop.noProducts"))}</h4><p class="text-muted mb-4" data-v-846ec472>${ssrInterpolate(unref(activeCount) ? _ctx.$t("shop.filters.noResultsHint") : _ctx.$t("shop.noProductsHint"))}</p>`);
        if (unref(activeCount)) {
          _push(`<button type="button" class="btn btn-outline-primary rounded-pill me-2 mb-2" data-v-846ec472>${ssrInterpolate(_ctx.$t("shop.filters.clearAll"))}</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/shop",
          class: "btn btn-primary new-gradient rounded-pill mb-2"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("common.seeAllProducts"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("common.seeAllProducts")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div>`);
      }
      if (!unref(loading) && unref(allProducts).length) {
        _push(`<p class="range-text" data-v-846ec472>${ssrInterpolate(_ctx.$t("shop.showing", { start: unref(start), end: unref(end), total: unref(total) }))}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (!unref(loading) && unref(paginationItems).length) {
        _push(`<nav class="shop-pagination"${ssrRenderAttr("aria-label", _ctx.$t("shop.pagination"))} data-v-846ec472><button type="button" class="page-btn page-arrow"${ssrIncludeBooleanAttr(unref(currentPage) <= 1) ? " disabled" : ""}${ssrRenderAttr("aria-label", _ctx.$t("shop.prevPage"))} data-v-846ec472><i class="fa-solid fa-chevron-left" data-v-846ec472></i></button><ul class="page-list" data-v-846ec472><!--[-->`);
        ssrRenderList(unref(paginationItems), (p, idx) => {
          _push(`<li data-v-846ec472>`);
          if (p === "...") {
            _push(`<span class="page-gap" aria-hidden="true" data-v-846ec472>\u2026</span>`);
          } else {
            _push(`<button type="button" class="${ssrRenderClass([{ active: p === unref(currentPage) }, "page-btn"])}"${ssrRenderAttr("aria-current", p === unref(currentPage) ? "page" : void 0)}${ssrRenderAttr("aria-label", _ctx.$t("shop.goToPage", { page: p }))} data-v-846ec472>${ssrInterpolate(p)}</button>`);
          }
          _push(`</li>`);
        });
        _push(`<!--]--></ul><span class="page-status" data-v-846ec472>${ssrInterpolate(_ctx.$t("shop.pageOf", { page: unref(currentPage), total: unref(totalPages) }))}</span><button type="button" class="page-btn page-arrow"${ssrIncludeBooleanAttr(unref(currentPage) >= unref(totalPages)) ? " disabled" : ""}${ssrRenderAttr("aria-label", _ctx.$t("shop.nextPage"))} data-v-846ec472><i class="fa-solid fa-chevron-right" data-v-846ec472></i></button></nav>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></section></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/shop/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-846ec472"]]);

export { index as default };
//# sourceMappingURL=index-B3ZbWipj.mjs.map
