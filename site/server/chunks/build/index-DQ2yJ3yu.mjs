import { d as _export_sfc, a as useI18n, n as useSiteUrl, o as useJsonLd, C as CONTACT, S as SOCIALS, b as useHead, e as useFetch, m as useLazyFetch, _ as __nuxt_component_2$1, M as MANUAL_METHODS } from './server.mjs';
import { defineComponent, withAsyncContext, computed, ref, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, createCommentVNode, Fragment, renderList, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate, ssrRenderClass, ssrRenderAttrs, ssrRenderStyle } from 'vue/server-renderer';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { _ as __nuxt_component_0 } from './ProductCard-a2L0chnn.mjs';
import { _ as __nuxt_component_1$1 } from './ProductCardSkeleton-Bbf-Kb4X.mjs';
import { t as toProductCard } from './useProductCard-BVznlLYM.mjs';
import { H as Header3 } from './Header3-s4pCF4HI.mjs';
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

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CategoriesSlider",
  __ssrInlineRender: true,
  setup(__props) {
    const { data: menuData } = useFetch(
      "/api/menu",
      { key: "header-menu" },
      "$BsNs6W4cX-"
      /* nuxt-injected */
    );
    const categories = computed(() => (menuData.value || []).map((c) => ({
      id: c.id,
      name: c.name,
      image: c.image,
      link: `/category/${c.slug}`
    })));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_2$1;
      if (unref(categories).length) {
        _push(`<section${ssrRenderAttrs(mergeProps({ class: "categories-section" }, _attrs))} data-v-a11b5c6f><div class="container home-wide" data-v-a11b5c6f>`);
        _push(ssrRenderComponent(unref(Swiper), {
          class: "cat-swiper",
          modules: [unref(Navigation)],
          speed: 400,
          "watch-overflow": true,
          "breakpoints-base": "container",
          breakpoints: {
            0: { slidesPerView: 3.3, spaceBetween: 12 },
            560: { slidesPerView: 4.3, spaceBetween: 16 },
            760: { slidesPerView: 5, spaceBetween: 20, slidesPerGroup: 2 },
            980: { slidesPerView: 6, spaceBetween: 20, slidesPerGroup: 3 },
            1200: { slidesPerView: 7, spaceBetween: 24, slidesPerGroup: 3 },
            1380: { slidesPerView: 8, spaceBetween: 24, slidesPerGroup: 4 }
          },
          navigation: {
            prevEl: ".cat-prev",
            nextEl: ".cat-next",
            disabledClass: "is-disabled"
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(unref(categories), (cat) => {
                _push2(ssrRenderComponent(unref(SwiperSlide), {
                  key: cat.id
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_NuxtLink, {
                        to: cat.link,
                        class: "cat-item"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<img${ssrRenderAttr("src", cat.image)}${ssrRenderAttr("alt", cat.name)} style="${ssrRenderStyle({ "object-fit": "cover" })}" width="100" data-v-a11b5c6f${_scopeId3}><span class="cat-name" data-v-a11b5c6f${_scopeId3}>${ssrInterpolate(cat.name)}</span>`);
                          } else {
                            return [
                              createVNode("img", {
                                src: cat.image,
                                alt: cat.name,
                                style: { "object-fit": "cover" },
                                width: "100"
                              }, null, 8, ["src", "alt"]),
                              createVNode("span", { class: "cat-name" }, toDisplayString(cat.name), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_NuxtLink, {
                          to: cat.link,
                          class: "cat-item"
                        }, {
                          default: withCtx(() => [
                            createVNode("img", {
                              src: cat.image,
                              alt: cat.name,
                              style: { "object-fit": "cover" },
                              width: "100"
                            }, null, 8, ["src", "alt"]),
                            createVNode("span", { class: "cat-name" }, toDisplayString(cat.name), 1)
                          ]),
                          _: 2
                        }, 1032, ["to"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(categories), (cat) => {
                  return openBlock(), createBlock(unref(SwiperSlide), {
                    key: cat.id
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtLink, {
                        to: cat.link,
                        class: "cat-item"
                      }, {
                        default: withCtx(() => [
                          createVNode("img", {
                            src: cat.image,
                            alt: cat.name,
                            style: { "object-fit": "cover" },
                            width: "100"
                          }, null, 8, ["src", "alt"]),
                          createVNode("span", { class: "cat-name" }, toDisplayString(cat.name), 1)
                        ]),
                        _: 2
                      }, 1032, ["to"])
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></section>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CategoriesSlider.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-a11b5c6f"]]);
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CategorySection",
  __ssrInlineRender: true,
  props: {
    category: {},
    orderby: {},
    eager: { type: Boolean, default: false },
    green: { type: Boolean, default: false },
    count: { default: 10 }
  },
  setup(__props) {
    const props = __props;
    const { data, status } = useLazyFetch(
      "/api/wc/products",
      {
        key: `home-category-${props.category.id}`,
        query: {
          per_page: props.count,
          page: 1,
          status: "publish",
          stock_status: "instock",
          ...props.orderby ? { orderby: props.orderby, order: "desc" } : { category: props.category.id }
        },
        server: props.eager
      },
      "$qb9XrsZ7d0"
      /* nuxt-injected */
    );
    const products = computed(() => {
      var _a;
      return (((_a = data.value) == null ? void 0 : _a.products) || []).map(toProductCard);
    });
    const isEmpty = computed(() => (status.value === "success" || status.value === "error") && !products.value.length);
    const link = computed(() => props.orderby ? `/shop?orderby=${props.orderby}` : `/shop?category=${props.category.id}`);
    const prevClass = `cs-prev-${props.category.id}`;
    const nextClass = `cs-next-${props.category.id}`;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_2$1;
      const _component_ProductCard = __nuxt_component_0;
      const _component_ProductCardSkeleton = __nuxt_component_1$1;
      if (!unref(isEmpty)) {
        _push(`<section${ssrRenderAttrs(mergeProps({
          class: ["gz-cat-row", { "is-green": __props.green }]
        }, _attrs))} data-v-2f667c15><div class="container home-wide" data-v-2f667c15><div class="section-head" data-v-2f667c15><h2 class="section-title" data-v-2f667c15>`);
        _push(ssrRenderComponent(_component_NuxtLink, { to: unref(link) }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.category.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(__props.category.name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</h2><div class="head-actions" data-v-2f667c15>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(link),
          class: "see-all"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("common.seeAll"))} <i class="fa-solid fa-chevron-right flip-rtl" aria-hidden="true" data-v-2f667c15${_scopeId}></i>`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("common.seeAll")) + " ", 1),
                createVNode("i", {
                  class: "fa-solid fa-chevron-right flip-rtl",
                  "aria-hidden": "true"
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        if (unref(products).length) {
          _push(`<div class="slider-nav" data-v-2f667c15><button type="button" class="${ssrRenderClass([prevClass, "nav-btn"])}"${ssrRenderAttr("aria-label", _ctx.$t("shop.prevPage"))} data-v-2f667c15><i class="fa-solid fa-chevron-left flip-rtl" data-v-2f667c15></i></button><button type="button" class="${ssrRenderClass([nextClass, "nav-btn"])}"${ssrRenderAttr("aria-label", _ctx.$t("shop.nextPage"))} data-v-2f667c15><i class="fa-solid fa-chevron-right flip-rtl" data-v-2f667c15></i></button></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></div>`);
        if (unref(products).length) {
          _push(ssrRenderComponent(unref(Swiper), {
            class: "product-swiper",
            modules: [unref(Navigation)],
            speed: 400,
            "watch-overflow": true,
            "breakpoints-base": "container",
            breakpoints: {
              0: { slidesPerView: 2, spaceBetween: 12, slidesPerGroup: 2 },
              560: { slidesPerView: 3, spaceBetween: 16, slidesPerGroup: 3 },
              860: { slidesPerView: 4, spaceBetween: 20, slidesPerGroup: 4 },
              1120: { slidesPerView: 4, spaceBetween: 24, slidesPerGroup: 4 }
            },
            navigation: {
              prevEl: `.${prevClass}`,
              nextEl: `.${nextClass}`,
              disabledClass: "is-disabled"
            }
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<!--[-->`);
                ssrRenderList(unref(products), (product) => {
                  _push2(ssrRenderComponent(unref(SwiperSlide), {
                    key: product.id
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(_component_ProductCard, {
                          product,
                          "show-stock": false
                        }, null, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode(_component_ProductCard, {
                            product,
                            "show-stock": false
                          }, null, 8, ["product"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                });
                _push2(`<!--]-->`);
              } else {
                return [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(products), (product) => {
                    return openBlock(), createBlock(unref(SwiperSlide), {
                      key: product.id
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_ProductCard, {
                          product,
                          "show-stock": false
                        }, null, 8, ["product"])
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<ul class="skeleton-row" aria-hidden="true" data-v-2f667c15><!--[-->`);
          ssrRenderList(4, (n) => {
            _push(`<li data-v-2f667c15>`);
            _push(ssrRenderComponent(_component_ProductCardSkeleton, null, null, _parent));
            _push(`</li>`);
          });
          _push(`<!--]--></ul>`);
        }
        _push(`</div></section>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/CategorySection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-2f667c15"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { t } = useI18n();
    const { absolute } = useSiteUrl();
    useJsonLd("home-jsonld", () => ({
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Store",
          "@id": absolute("/#store"),
          name: "GamesZone",
          url: absolute("/"),
          logo: absolute("/web-app-manifest-512x512.png"),
          image: absolute("/banner.jpg"),
          description: t("seo.description"),
          telephone: CONTACT.tel,
          email: CONTACT.email,
          priceRange: "$$",
          address: {
            "@type": "PostalAddress",
            streetAddress: "77 Bis 01 Rue Ouled Sidi Chikh",
            addressLocality: "Mohammadia",
            addressRegion: "Alger",
            addressCountry: "DZ"
          },
          geo: { "@type": "GeoCoordinates", latitude: 36.727715, longitude: 3.154034 },
          sameAs: SOCIALS.map((social) => social.url)
        },
        {
          "@type": "WebSite",
          "@id": absolute("/#website"),
          name: "GamesZone",
          url: absolute("/"),
          inLanguage: ["fr-DZ", "ar-DZ", "en"],
          potentialAction: {
            "@type": "SearchAction",
            target: { "@type": "EntryPoint", urlTemplate: absolute("/shop?search={search_term_string}") },
            "query-input": "required name=search_term_string"
          }
        }
      ]
    }));
    useHead({
      title: () => t("seo.title"),
      meta: [
        { name: "description", content: () => t("seo.description") }
      ]
    });
    const { data: menuData } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/menu",
      { key: "header-menu" },
      "$fnk8ykfjUf"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const homeCategories = computed(() => (menuData.value || []).map((c) => ({ id: c.id, name: c.name })));
    const bestSellers = computed(() => ({ id: "best-sellers", name: t("home.bestSellers") }));
    const newArrivals = { id: 81, name: "New Arrivals" };
    const { data: brandsData } = useLazyFetch(
      "/api/brands",
      { key: "home-brands" },
      "$lcoPFEOmfq"
      /* nuxt-injected */
    );
    const brands = computed(() => brandsData.value || []);
    ref([
      {
        "name": "Life Is Strange Reunion",
        "image": "https://www.micromania.fr/on/demandware.static/-/Sites-Micromania-Library/default/dw3ad32437/Homepage/HitaVenir/tuile-life-is-strange.png",
        "day": "26",
        "month": "Mars"
      },
      {
        "name": "Super Mario Bros  Wonder Switch 2",
        "image": "https://www.micromania.fr/on/demandware.static/-/Sites-Micromania-Library/default/dwe67dea32/Homepage/HitaVenir/mario-wonder-parc-bellabel.png",
        "day": "26",
        "month": "Mars"
      },
      {
        "name": "Starfield PS5",
        "image": "https://www.micromania.fr/on/demandware.static/-/Sites-Micromania-Library/default/dw4d5110e5/Homepage/HitaVenir/Starfield.png",
        "day": "7",
        "month": "Avril"
      },
      {
        "name": "Xenoblade Chronicles X Definitive Edition SWITCH 2",
        "image": "https://www.micromania.fr/on/demandware.static/-/Sites-Micromania-Library/default/dw0cebc789/Homepage/HitaVenir/xenoblade-switch2.png",
        "day": "16",
        "month": "Avril"
      }
    ]);
    ref(false);
    ref(0);
    const { data: carouselData, error: carouselError } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/wc/products",
      {
        key: "home-carousel",
        query: { per_page: 10, page: 1, status: "publish", category: "53", stock_status: "instock" }
      },
      "$HfJDtvzDJD"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    if (carouselError.value) console.warn("[home] carousel not loaded:", carouselError.value.message);
    const excerpt = (product, max = 150) => {
      const html = String(product.short_description || product.description || "");
      const text = html.replace(/<[^>]+>/g, " ").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&").replace(/&#0?39;|&rsquo;/g, "'").replace(/&quot;|&ldquo;|&rdquo;/g, '"').replace(/&#\d+;|&\w+;/g, " ").replace(/\s+/g, " ").trim();
      if (text.length <= max) return text;
      return text.slice(0, text.lastIndexOf(" ", max)).replace(/[,.;:!?-]+$/, "") + "\u2026";
    };
    const carousel = computed(() => {
      var _a;
      return (((_a = carouselData.value) == null ? void 0 : _a.products) || []).filter((product) => {
        var _a2, _b;
        return (_b = (_a2 = product.images) == null ? void 0 : _a2[1]) == null ? void 0 : _b.src;
      }).map((product) => ({
        id: product.id,
        name: product.name,
        slug: product.slug,
        images: product.images,
        type: product.type,
        grouped_products: product.grouped_products || [],
        excerpt: excerpt(product)
      }));
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_2$1;
      const _component_CategoriesSlider = __nuxt_component_1;
      const _component_CategorySection = __nuxt_component_2;
      _push(`<!--[--><header class="site-header mo-left header style-2" data-v-38d944ea>`);
      _push(ssrRenderComponent(Header3, null, null, _parent));
      _push(`</header><div class="page-content bg-light mb-0" data-v-38d944ea><section class="hero-section z-index-unset bg-white" data-v-38d944ea><div class="container home-wide" data-v-38d944ea>`);
      if (unref(carousel).length) {
        _push(ssrRenderComponent(unref(Swiper), {
          class: "swiper portfolio-gallery2 hero-swiper",
          modules: [unref(Navigation), unref(Pagination), unref(Autoplay)],
          loop: true,
          autoplay: {
            delay: 4e3
          },
          pagination: { clickable: true },
          speed: 300,
          navigation: {
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next"
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(unref(carousel), (product, index2) => {
                _push2(ssrRenderComponent(unref(SwiperSlide), {
                  class: "swiper-slide hero-slide position-relative",
                  key: product.id
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    var _a, _b, _c, _d, _e, _f;
                    if (_push3) {
                      _push3(`<div class="portfolio-boxstyle-2 position-relative w-100 rounded-0" data-v-38d944ea${_scopeId2}>`);
                      if (product.type == "grouped") {
                        _push3(ssrRenderComponent(_component_NuxtLink, {
                          to: "/shop?group=" + product.id,
                          class: "stretched-link",
                          "aria-label": product.name
                        }, null, _parent3, _scopeId2));
                      } else {
                        _push3(ssrRenderComponent(_component_NuxtLink, {
                          to: "/shop/product/" + product.slug,
                          class: "stretched-link"
                        }, null, _parent3, _scopeId2));
                      }
                      _push3(`<div class="dz-media w-100 h-100" data-v-38d944ea${_scopeId2}><picture class="hero-picture w-100" data-v-38d944ea${_scopeId2}><source media="(min-width: 700px)"${ssrRenderAttr("srcset", (_a = product.images[1]) == null ? void 0 : _a.src)} data-v-38d944ea${_scopeId2}><img${ssrRenderAttr("src", ((_b = product.images[2]) == null ? void 0 : _b.src) || ((_c = product.images[1]) == null ? void 0 : _c.src))}${ssrRenderAttr("alt", product.name)} class="hero-img"${ssrRenderAttr("loading", index2 === 0 ? "eager" : "lazy")}${ssrRenderAttr("fetchpriority", index2 === 0 ? "high" : "auto")} decoding="async" data-v-38d944ea${_scopeId2}></picture></div><div class="hero-caption" data-v-38d944ea${_scopeId2}><p class="hero-title" data-v-38d944ea${_scopeId2}>${ssrInterpolate(product.name)}</p>`);
                      if (product.excerpt) {
                        _push3(`<p class="hero-desc" data-v-38d944ea${_scopeId2}>${ssrInterpolate(product.excerpt)}</p>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(ssrRenderComponent(_component_NuxtLink, {
                        to: product.type == "grouped" ? "/shop?group=" + product.id : "/shop/product/" + product.slug,
                        class: "btn btn-primary hero-cta",
                        tabindex: "-1"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(_ctx.$t("home.buyNow"))} <i class="fa-solid fa-arrow-right flip-rtl" aria-hidden="true" data-v-38d944ea${_scopeId3}></i>`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(_ctx.$t("home.buyNow")) + " ", 1),
                              createVNode("i", {
                                class: "fa-solid fa-arrow-right flip-rtl",
                                "aria-hidden": "true"
                              })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "portfolio-boxstyle-2 position-relative w-100 rounded-0" }, [
                          product.type == "grouped" ? (openBlock(), createBlock(_component_NuxtLink, {
                            key: 0,
                            to: "/shop?group=" + product.id,
                            class: "stretched-link",
                            "aria-label": product.name
                          }, null, 8, ["to", "aria-label"])) : (openBlock(), createBlock(_component_NuxtLink, {
                            key: 1,
                            to: "/shop/product/" + product.slug,
                            class: "stretched-link"
                          }, null, 8, ["to"])),
                          createVNode("div", { class: "dz-media w-100 h-100" }, [
                            createVNode("picture", { class: "hero-picture w-100" }, [
                              createVNode("source", {
                                media: "(min-width: 700px)",
                                srcset: (_d = product.images[1]) == null ? void 0 : _d.src
                              }, null, 8, ["srcset"]),
                              createVNode("img", {
                                src: ((_e = product.images[2]) == null ? void 0 : _e.src) || ((_f = product.images[1]) == null ? void 0 : _f.src),
                                alt: product.name,
                                class: "hero-img",
                                loading: index2 === 0 ? "eager" : "lazy",
                                fetchpriority: index2 === 0 ? "high" : "auto",
                                decoding: "async"
                              }, null, 8, ["src", "alt", "loading", "fetchpriority"])
                            ])
                          ]),
                          createVNode("div", { class: "hero-caption" }, [
                            createVNode("p", { class: "hero-title" }, toDisplayString(product.name), 1),
                            product.excerpt ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "hero-desc"
                            }, toDisplayString(product.excerpt), 1)) : createCommentVNode("", true),
                            createVNode(_component_NuxtLink, {
                              to: product.type == "grouped" ? "/shop?group=" + product.id : "/shop/product/" + product.slug,
                              class: "btn btn-primary hero-cta",
                              tabindex: "-1"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.$t("home.buyNow")) + " ", 1),
                                createVNode("i", {
                                  class: "fa-solid fa-arrow-right flip-rtl",
                                  "aria-hidden": "true"
                                })
                              ]),
                              _: 1
                            }, 8, ["to"])
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]--><span class="swiper-button-prev slick-arrow" data-v-38d944ea${_scopeId}></span><span class="swiper-button-next slick-arrow" data-v-38d944ea${_scopeId}></span>`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(carousel), (product, index2) => {
                  return openBlock(), createBlock(unref(SwiperSlide), {
                    class: "swiper-slide hero-slide position-relative",
                    key: product.id
                  }, {
                    default: withCtx(() => {
                      var _a, _b, _c;
                      return [
                        createVNode("div", { class: "portfolio-boxstyle-2 position-relative w-100 rounded-0" }, [
                          product.type == "grouped" ? (openBlock(), createBlock(_component_NuxtLink, {
                            key: 0,
                            to: "/shop?group=" + product.id,
                            class: "stretched-link",
                            "aria-label": product.name
                          }, null, 8, ["to", "aria-label"])) : (openBlock(), createBlock(_component_NuxtLink, {
                            key: 1,
                            to: "/shop/product/" + product.slug,
                            class: "stretched-link"
                          }, null, 8, ["to"])),
                          createVNode("div", { class: "dz-media w-100 h-100" }, [
                            createVNode("picture", { class: "hero-picture w-100" }, [
                              createVNode("source", {
                                media: "(min-width: 700px)",
                                srcset: (_a = product.images[1]) == null ? void 0 : _a.src
                              }, null, 8, ["srcset"]),
                              createVNode("img", {
                                src: ((_b = product.images[2]) == null ? void 0 : _b.src) || ((_c = product.images[1]) == null ? void 0 : _c.src),
                                alt: product.name,
                                class: "hero-img",
                                loading: index2 === 0 ? "eager" : "lazy",
                                fetchpriority: index2 === 0 ? "high" : "auto",
                                decoding: "async"
                              }, null, 8, ["src", "alt", "loading", "fetchpriority"])
                            ])
                          ]),
                          createVNode("div", { class: "hero-caption" }, [
                            createVNode("p", { class: "hero-title" }, toDisplayString(product.name), 1),
                            product.excerpt ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "hero-desc"
                            }, toDisplayString(product.excerpt), 1)) : createCommentVNode("", true),
                            createVNode(_component_NuxtLink, {
                              to: product.type == "grouped" ? "/shop?group=" + product.id : "/shop/product/" + product.slug,
                              class: "btn btn-primary hero-cta",
                              tabindex: "-1"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(_ctx.$t("home.buyNow")) + " ", 1),
                                createVNode("i", {
                                  class: "fa-solid fa-arrow-right flip-rtl",
                                  "aria-hidden": "true"
                                })
                              ]),
                              _: 1
                            }, 8, ["to"])
                          ])
                        ])
                      ];
                    }),
                    _: 2
                  }, 1024);
                }), 128)),
                createVNode("span", { class: "swiper-button-prev slick-arrow" }),
                createVNode("span", { class: "swiper-button-next slick-arrow" })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="placeholder-glow hero-placeholder" data-v-38d944ea><span class="placeholder col-12" data-v-38d944ea></span></div>`);
      }
      _push(`</div></section><h1 class="visually-hidden" data-v-38d944ea>${ssrInterpolate(_ctx.$t("seo.title"))}</h1>`);
      _push(ssrRenderComponent(_component_CategoriesSlider, null, null, _parent));
      _push(ssrRenderComponent(_component_CategorySection, {
        category: unref(bestSellers),
        orderby: "popularity",
        eager: true
      }, null, _parent));
      _push(ssrRenderComponent(_component_CategorySection, {
        category: newArrivals,
        eager: true,
        green: true
      }, null, _parent));
      _push(`<!--[-->`);
      ssrRenderList(unref(homeCategories), (category, index2) => {
        _push(ssrRenderComponent(_component_CategorySection, {
          key: category.id,
          category,
          eager: index2 < 2,
          green: index2 % 2 === 1
        }, null, _parent));
      });
      _push(`<!--]--><section class="payments-section" aria-labelledby="home-payments-title" data-v-38d944ea><div class="container home-wide" data-v-38d944ea><div class="payments-head" data-v-38d944ea><h2 id="home-payments-title" class="payments-title" data-v-38d944ea>${ssrInterpolate(_ctx.$t("cart.paymentAccepted"))}</h2><p class="payments-sub" data-v-38d944ea>${ssrInterpolate(_ctx.$t("home.paymentsSub"))}</p></div><div class="payments-grid" data-v-38d944ea><div class="pay-panel pay-online" data-v-38d944ea><span class="pay-badge" data-v-38d944ea>${ssrInterpolate(_ctx.$t("payment.recommended"))}</span><span class="pay-online-icon" aria-hidden="true" data-v-38d944ea><i class="fa-regular fa-credit-card" data-v-38d944ea></i></span><h3 class="pay-panel-title" data-v-38d944ea>${ssrInterpolate(_ctx.$t("payment.onlineTitle"))}</h3><p class="pay-panel-text" data-v-38d944ea><i class="fa-solid fa-bolt" aria-hidden="true" data-v-38d944ea></i>${ssrInterpolate(_ctx.$t("payment.instantConfirm"))}</p></div><div class="pay-panel pay-transfer" data-v-38d944ea><h3 class="pay-panel-title" data-v-38d944ea>${ssrInterpolate(_ctx.$t("payment.orTransfer"))}</h3><p class="pay-panel-text" data-v-38d944ea>${ssrInterpolate(_ctx.$t("payment.manualHint"))}</p><ul class="pay-methods" data-v-38d944ea><!--[-->`);
      ssrRenderList("MANUAL_METHODS" in _ctx ? _ctx.MANUAL_METHODS : unref(MANUAL_METHODS), (m) => {
        _push(`<li class="pay-method" data-v-38d944ea><span class="pay-method-logo" data-v-38d944ea>`);
        if (m.logo) {
          _push(`<img${ssrRenderAttr("src", m.logo)} alt="" loading="lazy" decoding="async" data-v-38d944ea>`);
        } else {
          _push(`<i class="${ssrRenderClass(m.icon)}" aria-hidden="true" data-v-38d944ea></i>`);
        }
        _push(`</span><span class="pay-method-name" data-v-38d944ea>${ssrInterpolate(m.title)}</span></li>`);
      });
      _push(`<!--]--></ul></div></div><ul class="pay-trust" data-v-38d944ea><li data-v-38d944ea><i class="fa-solid fa-lock" aria-hidden="true" data-v-38d944ea></i>${ssrInterpolate(_ctx.$t("cart.secureCheckout"))}</li><li data-v-38d944ea><i class="fa-regular fa-envelope" aria-hidden="true" data-v-38d944ea></i>${ssrInterpolate(_ctx.$t("product.delivery58"))}</li></ul></div></section>`);
      if (unref(brands).length) {
        _push(`<section class="brands-section"${ssrRenderAttr("aria-label", _ctx.$t("home.brandsTitle"))} data-v-38d944ea><div class="container home-wide" data-v-38d944ea><h2 class="brands-title" data-v-38d944ea>${ssrInterpolate(_ctx.$t("home.brandsTitle"))}</h2><div class="brands-marquee" data-v-38d944ea><ul class="brands-track" data-v-38d944ea><!--[-->`);
        ssrRenderList([...unref(brands), ...unref(brands)], (brand, i) => {
          _push(`<li${ssrRenderAttr("aria-hidden", i >= unref(brands).length ? "true" : void 0)} data-v-38d944ea>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/shop?brand=${brand.id}`,
            class: "brand-card",
            tabindex: i >= unref(brands).length ? -1 : void 0,
            title: brand.name
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<img${ssrRenderAttr("src", brand.logo)}${ssrRenderAttr("alt", brand.name)} loading="lazy" decoding="async" data-v-38d944ea${_scopeId}>`);
              } else {
                return [
                  createVNode("img", {
                    src: brand.logo,
                    alt: brand.name,
                    loading: "lazy",
                    decoding: "async"
                  }, null, 8, ["src", "alt"])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</li>`);
        });
        _push(`<!--]--></ul></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section class="follow-section" data-v-38d944ea><div class="container home-wide follow-inner" data-v-38d944ea><h2 class="follow-title" data-v-38d944ea>${ssrInterpolate(_ctx.$t("home.followUs"))}</h2><p class="follow-sub" data-v-38d944ea>${ssrInterpolate(_ctx.$t("home.followSub"))}</p><ul class="follow-icons" data-v-38d944ea><!--[-->`);
      ssrRenderList("SOCIALS" in _ctx ? _ctx.SOCIALS : unref(SOCIALS), (social) => {
        _push(`<li data-v-38d944ea><a${ssrRenderAttr("href", social.url)} target="_blank" rel="noopener"${ssrRenderAttr("aria-label", `${social.name} ${social.handle}`)}${ssrRenderAttr("title", social.handle)} data-v-38d944ea><i class="${ssrRenderClass([social.icon, "fa-brands"])}" aria-hidden="true" data-v-38d944ea></i></a></li>`);
      });
      _push(`<!--]--></ul><p class="follow-contact" data-v-38d944ea><a${ssrRenderAttr("href", `tel:${("CONTACT" in _ctx ? _ctx.CONTACT : unref(CONTACT)).tel}`)} dir="ltr" data-v-38d944ea><i class="fa-solid fa-phone" aria-hidden="true" data-v-38d944ea></i>${ssrInterpolate(("CONTACT" in _ctx ? _ctx.CONTACT : unref(CONTACT)).phone)}</a><a${ssrRenderAttr("href", `mailto:${("CONTACT" in _ctx ? _ctx.CONTACT : unref(CONTACT)).email}`)} dir="ltr" data-v-38d944ea><i class="fa-regular fa-envelope" aria-hidden="true" data-v-38d944ea></i>${ssrInterpolate(("CONTACT" in _ctx ? _ctx.CONTACT : unref(CONTACT)).email)}</a></p></div></section></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-38d944ea"]]);

export { index as default };
//# sourceMappingURL=index-DQ2yJ3yu.mjs.map
