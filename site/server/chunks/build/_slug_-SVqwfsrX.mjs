import { d as _export_sfc, f as useRoute, a as useI18n, e as useFetch, F as createError, G as useLazyAsyncData, n as useSiteUrl, b as useHead, z as useSeoMeta, _ as __nuxt_component_2$1, c as __nuxt_component_1$1 } from './server.mjs';
import { _ as __nuxt_component_1 } from './ProductCardSkeleton-Bbf-Kb4X.mjs';
import { _ as __nuxt_component_0 } from './ProductCard-a2L0chnn.mjs';
import { defineComponent, withAsyncContext, computed, withCtx, createVNode, toDisplayString, unref, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { H as Header3 } from './Header3-s4pCF4HI.mjs';
import { t as toProductCard } from './useProductCard-BVznlLYM.mjs';
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

const PER_SECTION = 8;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[slug]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const slug = String(useRoute().params.slug);
    const { t } = useI18n();
    const { data: menuData } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/menu",
      { key: "header-menu" },
      "$E5lseS4ePs"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const findCategory = (list, parent2 = null) => {
      for (const c of list) {
        if (c.slug === slug) return { category: c, parent: parent2 };
        const found2 = findCategory(c.children, c);
        if (found2) return found2;
      }
      return null;
    };
    const found = findCategory(menuData.value || []);
    if (!found) {
      throw createError({ statusCode: 404, statusMessage: "Category not found", fatal: true });
    }
    const category = found.category;
    const parent = found.parent;
    const descendantIds = (c) => c.children.flatMap((child) => [child.id, ...descendantIds(child)]);
    const subtreeIds = descendantIds(category);
    const sections = category.children.length ? [
      ...category.children.map((c) => ({ key: String(c.id), id: c.id, slug: c.slug, name: c.name })),
      { key: "others", id: category.id, slug: "others", name: t("categoryPage.others", { name: category.name }), others: true }
    ] : [{ key: String(category.id), id: category.id, slug: category.slug, name: category.name }];
    const loadSection = (s) => $fetch("/api/wc/products", {
      query: { category: s.id, per_page: s.others ? 40 : PER_SECTION * 2 }
    }).then((res) => res.products.map(toProductCard)).catch(() => []);
    const { data: products, pending } = useLazyAsyncData(`category-page-${category.id}`, async () => {
      const results = await Promise.all(sections.map(loadSection));
      const shown = /* @__PURE__ */ new Set();
      return Object.fromEntries(sections.map((s, i) => {
        const row = results[i].filter((p) => !shown.has(p.id)).filter((p) => !s.others || !(p.categories || []).some((c) => subtreeIds.includes(c.id))).slice(0, PER_SECTION);
        row.forEach((p) => shown.add(p.id));
        return [s.key, row];
      }));
    }, { default: () => ({}) });
    const visibleSections = computed(
      () => pending.value ? sections.filter((s) => !s.others) : sections.filter((s) => {
        var _a;
        return (_a = products.value[s.key]) == null ? void 0 : _a.length;
      })
    );
    const shopLink = (id) => ({ path: "/shop", query: { category: String(id) } });
    const { absolute } = useSiteUrl();
    const canonical = absolute(`/category/${category.slug}`);
    const description = t("seo.categoryDescription", { name: category.name.toLowerCase() });
    const image = category.image || absolute("/banner.jpg");
    useHead({ link: [{ rel: "canonical", href: canonical, key: "canonical" }] });
    useSeoMeta({
      title: category.name,
      description,
      ogTitle: `${category.name} | GamesZone`,
      ogDescription: description,
      ogUrl: canonical,
      ogImage: image,
      twitterImage: image
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_2$1;
      const _component_ProductCardSkeleton = __nuxt_component_1;
      const _component_ProductCard = __nuxt_component_0;
      const _component_AstroBot = __nuxt_component_1$1;
      _push(`<!--[--><header class="site-header mo-left header style-2" data-v-d595274d>`);
      _push(ssrRenderComponent(Header3, null, null, _parent));
      _push(`</header><div class="page-content bg-light" data-v-d595274d><div class="container home-wide" data-v-d595274d><nav${ssrRenderAttr("aria-label", _ctx.$t("breadcrumb.label"))} class="gs-breadcrumb" data-v-d595274d><ol data-v-d595274d><li data-v-d595274d>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconly-Curved-Home" aria-hidden="true" data-v-d595274d${_scopeId}></i><span data-v-d595274d${_scopeId}>${ssrInterpolate(_ctx.$t("common.home"))}</span>`);
          } else {
            return [
              createVNode("i", {
                class: "iconly-Curved-Home",
                "aria-hidden": "true"
              }),
              createVNode("span", null, toDisplayString(_ctx.$t("common.home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li>`);
      if (unref(parent)) {
        _push(`<li data-v-d595274d>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/category/${unref(parent).slug}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(unref(parent).name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(unref(parent).name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<li aria-current="page" data-v-d595274d><span data-v-d595274d>${ssrInterpolate(unref(category).name)}</span></li></ol></nav><div class="cat-hero" data-v-d595274d>`);
      if (unref(category).image) {
        _push(`<img${ssrRenderAttr("src", unref(category).image)}${ssrRenderAttr("alt", unref(category).name)} class="cat-hero-img" width="88" height="88" data-v-d595274d>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<h1 class="cat-hero-title" data-v-d595274d>${ssrInterpolate(unref(category).name)}</h1></div>`);
      if (unref(category).children.length) {
        _push(`<div class="subcat-grid" role="list" data-v-d595274d><!--[-->`);
        ssrRenderList(unref(category).children, (sub) => {
          _push(`<a${ssrRenderAttr("href", `#sub-${sub.slug}`)} class="subcat-card" role="listitem" data-v-d595274d>`);
          if (sub.image) {
            _push(`<img${ssrRenderAttr("src", sub.image)}${ssrRenderAttr("alt", sub.name)} width="56" height="56" data-v-d595274d>`);
          } else {
            _push(`<span class="subcat-letter" aria-hidden="true" data-v-d595274d>${ssrInterpolate(sub.name.charAt(0))}</span>`);
          }
          _push(`<b data-v-d595274d>${ssrInterpolate(sub.name)}</b></a>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(visibleSections), (section) => {
        _push(`<section${ssrRenderAttr("id", `sub-${section.slug}`)} class="cat-section" data-v-d595274d><div class="cat-section-head" data-v-d595274d><h2 data-v-d595274d>${ssrInterpolate(section.name)}</h2>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: shopLink(section.id),
          class: "see-all"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("common.seeAll"))} <i class="fa-solid fa-arrow-right" aria-hidden="true" data-v-d595274d${_scopeId}></i>`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("common.seeAll")) + " ", 1),
                createVNode("i", {
                  class: "fa-solid fa-arrow-right",
                  "aria-hidden": "true"
                })
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</div><div class="row g-3 g-md-4" data-v-d595274d>`);
        if (unref(pending)) {
          _push(`<!--[-->`);
          ssrRenderList(4, (i) => {
            _push(`<div class="col-12 col-md-6 col-xl-3" data-v-d595274d>`);
            _push(ssrRenderComponent(_component_ProductCardSkeleton, null, null, _parent));
            _push(`</div>`);
          });
          _push(`<!--]-->`);
        } else {
          _push(`<!--[-->`);
          ssrRenderList(unref(products)[section.key], (product) => {
            _push(`<div class="col-12 col-md-6 col-xl-3" data-v-d595274d>`);
            _push(ssrRenderComponent(_component_ProductCard, {
              product,
              "show-stock": true
            }, null, _parent));
            _push(`</div>`);
          });
          _push(`<!--]-->`);
        }
        _push(`</div></section>`);
      });
      _push(`<!--]-->`);
      if (!unref(pending) && !unref(visibleSections).length) {
        _push(`<div class="cat-empty" data-v-d595274d>`);
        _push(ssrRenderComponent(_component_AstroBot, {
          mood: "search",
          size: 140,
          class: "mb-3"
        }, null, _parent));
        _push(`<h4 data-v-d595274d>${ssrInterpolate(_ctx.$t("shop.noProducts"))}</h4>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/shop",
          class: "btn btn-primary rounded-pill mt-2"
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
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/category/[slug].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _slug_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d595274d"]]);

export { _slug_ as default };
//# sourceMappingURL=_slug_-SVqwfsrX.mjs.map
