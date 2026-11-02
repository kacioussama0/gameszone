import { d as _export_sfc, a as useI18n, f as useRoute, n as useSiteUrl, u as useLocalCart, s as useNuxtApp, w as whatsappLink, e as useFetch, F as createError, H as HIDDEN_CATEGORIES, G as useLazyAsyncData, b as useHead, z as useSeoMeta, o as useJsonLd, y as decodeName, _ as __nuxt_component_2$1, c as __nuxt_component_1 } from './server.mjs';
import { defineComponent, ref, computed, watch, withAsyncContext, unref, withCtx, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, Fragment, renderList, mergeProps, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderTeleport, ssrRenderAttrs } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './ProductCard-a2L0chnn.mjs';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Thumbs, Navigation, Pagination, Autoplay } from 'swiper/modules';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "RelatedProduct",
  __ssrInlineRender: true,
  props: {
    products: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProductCard = __nuxt_component_0;
      if (__props.products) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "swiper-btn-center-lr" }, _attrs))}>`);
        _push(ssrRenderComponent(unref(Swiper), {
          class: "swiper swiper-four",
          "slides-per-view": 4,
          "space-between": 30,
          loop: true,
          speed: 1500,
          modules: [unref(Navigation), unref(Autoplay)],
          autoplay: {
            delay: 1500
          },
          navigation: {
            prevEl: ".btn-prev",
            nextEl: ".btn-next"
          },
          breakpoints: {
            0: { slidesPerView: 2, spaceBetween: 15 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            992: { slidesPerView: 4, spaceBetween: 20 },
            1400: { slidesPerView: 4, spaceBetween: 24 }
          }
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(__props.products, (product) => {
                _push2(ssrRenderComponent(unref(SwiperSlide), { class: "swiper-slide" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_ProductCard, { product }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_ProductCard, { product }, null, 8, ["product"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(__props.products, (product) => {
                  return openBlock(), createBlock(unref(SwiperSlide), { class: "swiper-slide" }, {
                    default: withCtx(() => [
                      createVNode(_component_ProductCard, { product }, null, 8, ["product"])
                    ]),
                    _: 2
                  }, 1024);
                }), 256))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="pagination-align"><div class="tranding-button-prev btn-prev"><i class="flaticon flaticon-left-chevron"></i></div><div class="tranding-button-next btn-next"><i class="flaticon flaticon-chevron"></i></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("elements/RelatedProduct.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    var _a, _b;
    let __temp, __restore;
    const { t } = useI18n();
    let product = ref({});
    const qty = ref(1);
    const thumbsSwiper = ref(null);
    const route = useRoute();
    const { absolute } = useSiteUrl();
    const currentUrl = computed(() => absolute(`/shop/product/${route.params.id}`));
    useLocalCart();
    const heroArt = computed(() => {
      var _a2, _b2, _c;
      return ((_c = (_b2 = (_a2 = product.value) == null ? void 0 : _a2.images) == null ? void 0 : _b2[0]) == null ? void 0 : _c.src) || "";
    });
    const selectedOptions = ref({});
    const sameOption = (a, b) => String(a != null ? a : "").trim().toLowerCase() === String(b != null ? b : "").trim().toLowerCase();
    const variationAttributes = computed(
      () => {
        var _a2;
        return ((_a2 = product.value) == null ? void 0 : _a2.type) === "variable" ? (product.value.attributes || []).filter((a) => {
          var _a3;
          return a.variation !== false && ((_a3 = a.options) == null ? void 0 : _a3.length);
        }) : [];
      }
    );
    const matches = (variation, options) => (variation.attributes || []).every((a) => sameOption(options[a.name], a.option));
    const purchasable = (v) => v.stock_status === "instock" && v.price !== "" && v.price != null;
    const findVariation = (options) => {
      var _a2, _b2, _c, _d, _e;
      const variations = ((_a2 = product.value) == null ? void 0 : _a2.variations) || [];
      const specific = variations.filter((v) => {
        var _a3;
        return ((_a3 = v.attributes) == null ? void 0 : _a3.length) && matches(v, options);
      });
      const generic = variations.filter((v) => {
        var _a3;
        return !((_a3 = v.attributes) == null ? void 0 : _a3.length);
      });
      return (_e = (_d = (_c = (_b2 = specific.find(purchasable)) != null ? _b2 : generic.find(purchasable)) != null ? _c : specific[0]) != null ? _d : generic[0]) != null ? _e : null;
    };
    const selectedVariation = computed(
      () => {
        var _a2;
        return ((_a2 = product.value) == null ? void 0 : _a2.type) === "variable" ? findVariation(selectedOptions.value) : null;
      }
    );
    const variationsWith = (attributeName, option) => {
      var _a2;
      return (((_a2 = product.value) == null ? void 0 : _a2.variations) || []).filter(
        (v) => purchasable(v) && (v.attributes || []).every((a) => a.name !== attributeName || sameOption(a.option, option))
      );
    };
    const isOptionAvailable = (attributeName, option) => variationsWith(attributeName, option).length > 0;
    const initSelection = () => {
      var _a2, _b2, _c, _d;
      const options = {};
      const firstInStock = (((_a2 = product.value) == null ? void 0 : _a2.variations) || []).find((v) => {
        var _a3;
        return purchasable(v) && ((_a3 = v.attributes) == null ? void 0 : _a3.length);
      });
      for (const attribute of variationAttributes.value) {
        const fromVariation = (_c = (_b2 = firstInStock == null ? void 0 : firstInStock.attributes) == null ? void 0 : _b2.find((a) => a.name === attribute.name)) == null ? void 0 : _c.option;
        options[attribute.name] = (_d = attribute.options.find((o) => sameOption(o, fromVariation))) != null ? _d : attribute.options[0];
      }
      selectedOptions.value = options;
    };
    const displayPrice = computed(() => {
      var _a2, _b2;
      return Number(((_a2 = selectedVariation.value) == null ? void 0 : _a2.price) || ((_b2 = product.value) == null ? void 0 : _b2.price) || 0);
    });
    const displayRegularPrice = computed(
      () => {
        var _a2;
        return Number(selectedVariation.value ? selectedVariation.value.regular_price : (_a2 = product.value) == null ? void 0 : _a2.regular_price) || 0;
      }
    );
    const isOnSale = computed(() => displayRegularPrice.value > displayPrice.value && displayPrice.value > 0);
    const inStock = computed(
      () => {
        var _a2, _b2;
        return ((_a2 = product.value) == null ? void 0 : _a2.type) === "variable" ? !!selectedVariation.value && purchasable(selectedVariation.value) : ((_b2 = product.value) == null ? void 0 : _b2.stock_status) === "instock";
      }
    );
    const { $aa } = useNuxtApp();
    function getShortDescription(description, maxLength = 240) {
      if (!description) return "";
      const text = description.replace(/<[^>]*>?/gm, "").trim();
      return text.length > maxLength ? text.slice(0, maxLength) + "\u2026" : text;
    }
    const setThumbsSwiper = (swiper) => {
      thumbsSwiper.value = swiper;
    };
    const mainSwiper = ref(null);
    const setMainSwiper = (swiper) => mainSwiper.value = swiper;
    const galleryImages = computed(() => {
      var _a2, _b2;
      const images = ((_a2 = product.value) == null ? void 0 : _a2.images) || [];
      const extra = (((_b2 = product.value) == null ? void 0 : _b2.variations) || []).map((v) => v.image).filter((img) => (img == null ? void 0 : img.src) && !images.some((i) => i.id === img.id || i.src === img.src)).filter((img, index, all) => all.findIndex((o) => o.src === img.src) === index);
      return [...images, ...extra];
    });
    watch(() => {
      var _a2;
      return (_a2 = selectedVariation.value) == null ? void 0 : _a2.image;
    }, (image) => {
      if (!(image == null ? void 0 : image.src) || !mainSwiper.value) return;
      const index = galleryImages.value.findIndex((i) => i.id === image.id || i.src === image.src);
      if (index >= 0) mainSwiper.value.slideTo(index);
    });
    const formatPrice = (value) => `${Number(value).toLocaleString("fr-FR")} ${t("common.currency")}`;
    const discount = computed(
      () => isOnSale.value ? Math.floor((displayRegularPrice.value - displayPrice.value) / displayRegularPrice.value * 100) : 0
    );
    const primaryCategory = computed(() => {
      var _a2, _b2;
      return (_b2 = (_a2 = product.value) == null ? void 0 : _a2.categories) == null ? void 0 : _b2[0];
    });
    const visibleTags = computed(
      () => {
        var _a2;
        return (((_a2 = product.value) == null ? void 0 : _a2.tags) || []).filter((tag) => !/prepay|epay/i.test(tag.name)).slice(0, 10);
      }
    );
    const encodedUrl = computed(() => encodeURIComponent(currentUrl.value));
    const shareText = computed(() => {
      var _a2;
      return encodeURIComponent(shareTitle.value || ((_a2 = product.value) == null ? void 0 : _a2.name) || "");
    });
    const whatsappOrderUrl = computed(() => {
      var _a2;
      const message = t("product.whatsappMessage", { name: ((_a2 = product.value) == null ? void 0 : _a2.name) || "" });
      return whatsappLink(`${message} ${currentUrl.value}`);
    });
    const linkCopied = ref(false);
    const id = String(useRoute().params.id);
    const { data: productRes, error: productError } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/wc/products/",
      {
        key: `product-${id}`,
        params: { slug: id }
      },
      "$Zf5aPq5xOU"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const found = (_b = (_a = productRes.value) == null ? void 0 : _a.products) == null ? void 0 : _b[0];
    if (!found) {
      throw createError({
        statusCode: productError.value ? 500 : 404,
        statusMessage: productError.value ? "Product could not be loaded" : "Product not found",
        fatal: true
      });
    }
    product.value = { ...found, variations: [...found.variations || []].reverse() };
    initSelection();
    const HELPER_CATEGORY_SLUGS = ["uncategorized", "carousel", "new-arrivals", "gameshop-hits", "notre-selection"];
    const upsellIds = found.upsell_ids || [];
    const wooRelatedIds = found.related_ids || [];
    const categoryIds = (found.categories || []).filter((c) => !HIDDEN_CATEGORIES.includes(c.id) && !HELPER_CATEGORY_SLUGS.includes(c.slug)).map((c) => c.id);
    const { data: relatedRes } = useLazyAsyncData(`related-${id}`, async () => {
      var _a2;
      const byIds = (ids) => $fetch("/api/wc/products/", { params: { include: ids.join(","), per_page: ids.length } });
      if (upsellIds.length) return byIds(upsellIds);
      if (categoryIds.length) {
        const sameCategory = await $fetch("/api/wc/products/", {
          params: { category: categoryIds.join(","), exclude: found.id, stock_status: "instock", per_page: 10 }
        });
        if ((_a2 = sameCategory.products) == null ? void 0 : _a2.length) return sameCategory;
      }
      return wooRelatedIds.length ? byIds(wooRelatedIds) : { products: [] };
    });
    const relatedProducts = computed(
      () => {
        var _a2;
        return (((_a2 = relatedRes.value) == null ? void 0 : _a2.products) || []).map((product2) => {
          var _a3, _b2, _c;
          return {
            id: product2.id,
            name: product2.name,
            slug: product2.slug,
            categories: product2.categories,
            thumbnail: ((_b2 = (_a3 = product2.images) == null ? void 0 : _a3[0]) == null ? void 0 : _b2.thumbnail) || "",
            image: (_c = product2.images) == null ? void 0 : _c[0],
            type: product2.type,
            grouped_products: product2.grouped_products,
            variations: product2.variations,
            is_epay: product2.is_epay,
            is_prepay: product2.is_prepay,
            price: product2.price,
            on_sale: product2.on_sale,
            regular_price: product2.regular_price,
            stock: product2.stock_status
          };
        });
      }
    );
    ref(null);
    const descTall = ref(false);
    const descExpanded = ref(false);
    const lightboxIndex = ref(null);
    const openLightbox = (index) => {
      lightboxIndex.value = index;
    };
    watch(lightboxIndex, (index, previous) => {
      return;
    });
    const showStickyCta = ref(false);
    useHead({
      link: [{ rel: "canonical", href: currentUrl, key: "canonical" }]
    });
    const seoTitle = computed(
      () => {
        var _a2;
        return ((_a2 = product.value) == null ? void 0 : _a2.name) || t("seo.productFallback");
      }
    );
    const seoDescription = computed(() => {
      const p = product.value;
      if (!(p == null ? void 0 : p.name)) return t("seo.description");
      const text = getShortDescription(p.short_description || p.description || "", 155).replace(/\s+/g, " ").trim();
      return text || t("seo.productDescription", { name: p.name, price: formatPrice(displayPrice.value) });
    });
    const shareImage = computed(() => {
      var _a2, _b2, _c;
      const src = (_c = (_b2 = (_a2 = product.value) == null ? void 0 : _a2.images) == null ? void 0 : _b2[0]) == null ? void 0 : _c.src;
      if (!src) return { src: absolute("/banner.jpg"), width: 2240, height: 1260 };
      return {
        src: absolute(`/_ipx/s_800x800&fit_contain&b_ffffff&f_jpeg&q_80/${src}`),
        width: 800,
        height: 800
      };
    });
    const seoImage = computed(() => shareImage.value.src);
    const shareTitle = computed(() => {
      const p = product.value;
      if (!(p == null ? void 0 : p.name)) return seoTitle.value;
      const prices = (p.variations || []).map((v) => Number(v.price)).filter((n) => n > 0);
      const hasRange = prices.length > 1 && Math.min(...prices) !== Math.max(...prices);
      const price = hasRange ? Math.min(...prices) : Number(prices[0] || p.price);
      if (!price) return p.name;
      return `${p.name} \u2013 ${hasRange ? `${t("product.from")} ` : ""}${formatPrice(price)}`;
    });
    useSeoMeta({
      title: seoTitle,
      description: seoDescription,
      ogTitle: shareTitle,
      ogDescription: seoDescription,
      ogImage: seoImage,
      ogImageSecureUrl: seoImage,
      ogImageType: () => shareImage.value.width === 800 ? "image/jpeg" : void 0,
      ogImageWidth: () => shareImage.value.width,
      ogImageHeight: () => shareImage.value.height,
      ogImageAlt: () => {
        var _a2;
        return ((_a2 = product.value) == null ? void 0 : _a2.name) || "";
      },
      ogUrl: currentUrl,
      ogType: "product",
      twitterCard: "summary_large_image",
      twitterTitle: shareTitle,
      twitterDescription: seoDescription,
      twitterImage: seoImage,
      twitterImageAlt: () => {
        var _a2;
        return ((_a2 = product.value) == null ? void 0 : _a2.name) || "";
      }
    });
    useHead(() => {
      const p = product.value;
      if (!(p == null ? void 0 : p.name)) return {};
      const prices = (p.variations || []).map((v) => Number(v.price)).filter((n) => n > 0);
      const price = (prices.length ? Math.min(...prices) : Number(p.price)) || 0;
      return {
        meta: [
          price ? { property: "product:price:amount", content: String(price), key: "product-price" } : { key: "product-price" },
          { property: "product:price:currency", content: "DZD", key: "product-currency" },
          { property: "product:availability", content: inStock.value ? "in stock" : "out of stock", key: "product-availability" },
          { property: "product:condition", content: /occasion/i.test(p.name) ? "used" : "new", key: "product-condition" },
          p.sku ? { property: "product:retailer_item_id", content: String(p.sku), key: "product-sku" } : { key: "product-sku" }
        ]
      };
    });
    useJsonLd("product-jsonld", () => {
      var _a2, _b2, _c, _d;
      const p = product.value;
      if (!(p == null ? void 0 : p.name)) return null;
      const prices = (p.variations || []).map((v) => Number(v.price)).filter((n) => n > 0);
      const anyInStock = p.type === "variable" ? (p.variations || []).some((v) => v.stock_status === "instock") : p.stock_status === "instock";
      const availability = `https://schema.org/${anyInStock ? "InStock" : "OutOfStock"}`;
      const offers = prices.length > 1 && Math.min(...prices) !== Math.max(...prices) ? {
        "@type": "AggregateOffer",
        priceCurrency: "DZD",
        lowPrice: Math.min(...prices),
        highPrice: Math.max(...prices),
        offerCount: prices.length,
        availability
      } : {
        "@type": "Offer",
        priceCurrency: "DZD",
        price: Number(prices[0] || p.price) || void 0,
        availability,
        url: currentUrl.value,
        itemCondition: `https://schema.org/${/occasion/i.test(p.name) ? "UsedCondition" : "NewCondition"}`,
        seller: { "@type": "Organization", name: "GamesZone" }
      };
      return {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": "Product",
            name: p.name,
            description: seoDescription.value,
            image: (p.images || []).map((i) => i.src).slice(0, 5),
            sku: p.sku || void 0,
            category: (_b2 = (_a2 = p.categories) == null ? void 0 : _a2[0]) == null ? void 0 : _b2.name,
            url: currentUrl.value,
            offers
          },
          {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: t("common.home"), item: absolute("/") },
              { "@type": "ListItem", position: 2, name: t("common.shop"), item: absolute("/shop") },
              ...((_c = p.categories) == null ? void 0 : _c[0]) ? [{
                "@type": "ListItem",
                position: 3,
                name: decodeName(p.categories[0].name),
                item: absolute(`/shop?category=${p.categories[0].id}`)
              }] : [],
              { "@type": "ListItem", position: ((_d = p.categories) == null ? void 0 : _d[0]) ? 4 : 3, name: p.name, item: currentUrl.value }
            ]
          }
        ]
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a2, _b2, _c, _d;
      const _component_NuxtLink = __nuxt_component_2$1;
      const _component_AstroBot = __nuxt_component_1;
      _push(`<!--[--><header class="site-header mo-left header style-2" data-v-e9f02759>`);
      _push(ssrRenderComponent(Header3, null, null, _parent));
      _push(`</header><div class="page-content bg-light pb-3" data-v-e9f02759><div class="pdp-hero gz-dark" style="${ssrRenderStyle(unref(heroArt) ? { "--pdp-art": `url('${unref(heroArt)}')` } : void 0)}" data-v-e9f02759>`);
      if (unref(product).name) {
        _push(`<div class="container home-wide pdp-crumbs" data-v-e9f02759><nav${ssrRenderAttr("aria-label", _ctx.$t("breadcrumb.label"))} class="gs-breadcrumb" data-v-e9f02759><ol data-v-e9f02759><li data-v-e9f02759>`);
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="iconly-Curved-Home" aria-hidden="true" data-v-e9f02759${_scopeId}></i><span data-v-e9f02759${_scopeId}>${ssrInterpolate(_ctx.$t("common.home"))}</span>`);
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
        _push(`</li><li data-v-e9f02759>`);
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/shop" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("common.shop"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("common.shop")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li>`);
        if ((_a2 = unref(product).categories) == null ? void 0 : _a2.length) {
          _push(`<li data-v-e9f02759>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/shop?category=${unref(product).categories[0].id}`,
            class: "text-capitalize"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(product).categories[0].name.replace(/&/g, "&").toLowerCase())}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(product).categories[0].name.replace(/&/g, "&").toLowerCase()), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</li>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<li aria-current="page" data-v-e9f02759><span data-v-e9f02759>${ssrInterpolate(unref(product).name)}</span></li></ol></nav></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<section class="content-inner pdp-top" data-v-e9f02759><div class="container home-wide" data-v-e9f02759><div class="row gx-4 gx-xl-5 gy-4 mt-0" data-v-e9f02759><div class="col-md-6" data-v-e9f02759><div class="product-gallery sticky-md-top" data-v-e9f02759>`);
      if ((_b2 = unref(product).images) == null ? void 0 : _b2.length) {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(unref(Swiper), {
          class: "gallery-main",
          modules: [unref(Thumbs), unref(Navigation), unref(Pagination)],
          thumbs: { swiper: thumbsSwiper.value },
          navigation: unref(galleryImages).length > 1,
          pagination: unref(galleryImages).length > 1 ? { clickable: true } : false,
          "space-between": 10,
          onSwiper: setMainSwiper
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(unref(galleryImages), (img, ind) => {
                _push2(ssrRenderComponent(unref(SwiperSlide), {
                  key: img.id || ind
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<button type="button" class="gallery-frame"${ssrRenderAttr("aria-label", _ctx.$t("product.zoom"))} data-v-e9f02759${_scopeId2}><img${ssrRenderAttr("src", img.src)}${ssrRenderAttr("srcset", img.srcset || void 0)} sizes="(max-width: 768px) 100vw, 50vw"${ssrRenderAttr("alt", img.alt || unref(product).name)}${ssrRenderAttr("loading", ind === 0 ? "eager" : "lazy")}${ssrRenderAttr("fetchpriority", ind === 0 ? "high" : "auto")} decoding="async" data-v-e9f02759${_scopeId2}></button>`);
                    } else {
                      return [
                        createVNode("button", {
                          type: "button",
                          class: "gallery-frame",
                          "aria-label": _ctx.$t("product.zoom"),
                          onClick: ($event) => openLightbox(ind)
                        }, [
                          createVNode("img", {
                            src: img.src,
                            srcset: img.srcset || void 0,
                            sizes: "(max-width: 768px) 100vw, 50vw",
                            alt: img.alt || unref(product).name,
                            loading: ind === 0 ? "eager" : "lazy",
                            fetchpriority: ind === 0 ? "high" : "auto",
                            decoding: "async"
                          }, null, 8, ["src", "srcset", "alt", "loading", "fetchpriority"])
                        ], 8, ["aria-label", "onClick"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(galleryImages), (img, ind) => {
                  return openBlock(), createBlock(unref(SwiperSlide), {
                    key: img.id || ind
                  }, {
                    default: withCtx(() => [
                      createVNode("button", {
                        type: "button",
                        class: "gallery-frame",
                        "aria-label": _ctx.$t("product.zoom"),
                        onClick: ($event) => openLightbox(ind)
                      }, [
                        createVNode("img", {
                          src: img.src,
                          srcset: img.srcset || void 0,
                          sizes: "(max-width: 768px) 100vw, 50vw",
                          alt: img.alt || unref(product).name,
                          loading: ind === 0 ? "eager" : "lazy",
                          fetchpriority: ind === 0 ? "high" : "auto",
                          decoding: "async"
                        }, null, 8, ["src", "srcset", "alt", "loading", "fetchpriority"])
                      ], 8, ["aria-label", "onClick"])
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
        if (unref(galleryImages).length > 1) {
          _push(ssrRenderComponent(unref(Swiper), {
            class: "gallery-thumbs",
            modules: [unref(Thumbs)],
            "slides-per-view": 5,
            "space-between": 10,
            breakpoints: { 0: { slidesPerView: 4 }, 768: { slidesPerView: 5 } },
            "watch-slides-progress": "",
            onSwiper: setThumbsSwiper
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<!--[-->`);
                ssrRenderList(unref(galleryImages), (img, ind) => {
                  _push2(ssrRenderComponent(unref(SwiperSlide), {
                    key: `thumb-${img.id || ind}`
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<img${ssrRenderAttr("src", img.thumbnail || img.src)}${ssrRenderAttr("alt", `${unref(product).name} ${ind + 1}`)} loading="lazy" decoding="async" data-v-e9f02759${_scopeId2}>`);
                      } else {
                        return [
                          createVNode("img", {
                            src: img.thumbnail || img.src,
                            alt: `${unref(product).name} ${ind + 1}`,
                            loading: "lazy",
                            decoding: "async"
                          }, null, 8, ["src", "alt"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                });
                _push2(`<!--]-->`);
              } else {
                return [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(galleryImages), (img, ind) => {
                    return openBlock(), createBlock(unref(SwiperSlide), {
                      key: `thumb-${img.id || ind}`
                    }, {
                      default: withCtx(() => [
                        createVNode("img", {
                          src: img.thumbnail || img.src,
                          alt: `${unref(product).name} ${ind + 1}`,
                          loading: "lazy",
                          decoding: "async"
                        }, null, 8, ["src", "alt"])
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
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else if (unref(product).name) {
        _push(`<div class="gallery-mascot" role="img"${ssrRenderAttr("aria-label", unref(product).name)} data-v-e9f02759>`);
        _push(ssrRenderComponent(_component_AstroBot, {
          mood: "happy",
          size: 200
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="placeholder-glow" data-v-e9f02759><span class="placeholder gallery-placeholder" data-v-e9f02759></span></div>`);
      }
      _push(`</div></div><div class="col-md-6" data-v-e9f02759><div class="product-summary" data-v-e9f02759>`);
      if (unref(product).name) {
        _push(`<!--[-->`);
        if (unref(primaryCategory)) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: `/shop?category=${unref(primaryCategory).id}`,
            class: "summary-category"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(unref(primaryCategory).name.replace(/&/g, "&").toLowerCase())}`);
              } else {
                return [
                  createTextVNode(toDisplayString(unref(primaryCategory).name.replace(/&/g, "&").toLowerCase()), 1)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<h1 class="summary-title" data-v-e9f02759>${ssrInterpolate(unref(product).name)}</h1><div class="summary-badges" data-v-e9f02759><span class="${ssrRenderClass([unref(inStock) ? "pill-success" : "pill-danger", "pill"])}" data-v-e9f02759><span class="dot" data-v-e9f02759></span> ${ssrInterpolate(unref(inStock) ? _ctx.$t("common.available") : _ctx.$t("common.unavailable"))}</span>`);
        if (unref(isOnSale)) {
          _push(`<span class="pill pill-promo" data-v-e9f02759>${ssrInterpolate(_ctx.$t("product.promo"))}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span class="pill pill-muted" data-v-e9f02759><i class="fa-regular fa-envelope" aria-hidden="true" data-v-e9f02759></i> ${ssrInterpolate(_ctx.$t("product.delivery58"))}</span></div><!--]-->`);
      } else {
        _push(`<div class="placeholder-glow" data-v-e9f02759><span class="placeholder col-4 mb-2" data-v-e9f02759></span><span class="placeholder col-12" data-v-e9f02759></span><span class="placeholder col-8" data-v-e9f02759></span></div>`);
      }
      if (unref(product).name) {
        _push(`<div class="summary-price" data-v-e9f02759>`);
        if (unref(isOnSale)) {
          _push(`<!--[--><span class="price-now is-sale" data-v-e9f02759>${ssrInterpolate(formatPrice(unref(displayPrice)))}</span><del class="price-old" data-v-e9f02759>${ssrInterpolate(formatPrice(unref(displayRegularPrice)))}</del>`);
          if (unref(discount)) {
            _push(`<span class="price-save" dir="ltr" data-v-e9f02759>-${ssrInterpolate(unref(discount))}%</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<!--]-->`);
        } else {
          _push(`<span class="price-now" data-v-e9f02759>${ssrInterpolate(formatPrice(unref(displayPrice)))}</span>`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(product).description) {
        _push(`<p class="summary-excerpt" dir="auto" data-v-e9f02759>${ssrInterpolate(getShortDescription(unref(product).description))} `);
        if (unref(product).description.length > 240) {
          _push(`<a href="#product-description" class="read-more" data-v-e9f02759>${ssrInterpolate(_ctx.$t("product.readMore"))}</a>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(unref(variationAttributes), (attribute) => {
        _push(`<div class="variation-picker" data-v-e9f02759><div class="picker-label" data-v-e9f02759>`);
        if (/[\p{L}\p{N}]/u.test(attribute.name)) {
          _push(`<!--[-->${ssrInterpolate(attribute.name)} :<!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`<b data-v-e9f02759>${ssrInterpolate(selectedOptions.value[attribute.name])}</b></div><div class="option-group" role="radiogroup"${ssrRenderAttr("aria-label", attribute.name)} data-v-e9f02759><!--[-->`);
        ssrRenderList(attribute.options, (option) => {
          _push(`<button type="button" role="radio" class="${ssrRenderClass([{ active: sameOption(selectedOptions.value[attribute.name], option) }, "option-btn"])}"${ssrRenderAttr("aria-checked", sameOption(selectedOptions.value[attribute.name], option))}${ssrIncludeBooleanAttr(!isOptionAvailable(attribute.name, option)) ? " disabled" : ""} data-v-e9f02759>${ssrInterpolate(option)}</button>`);
        });
        _push(`<!--]--></div></div>`);
      });
      _push(`<!--]-->`);
      if (unref(product).name) {
        _push(`<div class="buy-box" id="buy-area" data-v-e9f02759><div class="buy-row" data-v-e9f02759><div class="qty-stepper" data-v-e9f02759><button type="button"${ssrRenderAttr("aria-label", _ctx.$t("product.decrease"))}${ssrIncludeBooleanAttr(!unref(inStock) || qty.value <= 1) ? " disabled" : ""} data-v-e9f02759><i class="fa-solid fa-minus" data-v-e9f02759></i></button><input${ssrRenderAttr("value", qty.value)} type="number" min="1" inputmode="numeric"${ssrRenderAttr("aria-label", _ctx.$t("common.quantity"))}${ssrIncludeBooleanAttr(!unref(inStock)) ? " readonly" : ""} data-v-e9f02759><button type="button"${ssrRenderAttr("aria-label", _ctx.$t("product.increase"))}${ssrIncludeBooleanAttr(!unref(inStock)) ? " disabled" : ""} data-v-e9f02759><i class="fa-solid fa-plus" data-v-e9f02759></i></button></div><button type="button" class="btn btn-primary buy-btn"${ssrIncludeBooleanAttr(!unref(inStock)) ? " disabled" : ""} data-v-e9f02759><i class="fa-solid fa-bolt" aria-hidden="true" data-v-e9f02759></i> ${ssrInterpolate(unref(inStock) ? _ctx.$t("product.buyNow") : _ctx.$t("common.unavailable"))}</button></div><button type="button" class="add-btn" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"${ssrIncludeBooleanAttr(!unref(inStock)) ? " disabled" : ""} data-v-e9f02759><i class="fa fa-cart-plus" aria-hidden="true" data-v-e9f02759></i> ${ssrInterpolate(_ctx.$t("common.addToCart"))}</button><p class="pay-with" data-v-e9f02759><i class="fa-solid fa-lock" aria-hidden="true" data-v-e9f02759></i> ${ssrInterpolate(_ctx.$t("product.payWith"))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(product).name) {
        _push(`<ul class="trust-inline" data-v-e9f02759><li data-v-e9f02759><i class="iconly-Curved-ShieldDone" data-v-e9f02759></i>${ssrInterpolate(_ctx.$t("cart.warranty"))}</li><li data-v-e9f02759><i class="iconly-Curved-User" data-v-e9f02759></i>${ssrInterpolate(_ctx.$t("cart.support"))}</li></ul>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(product).name) {
        _push(`<a${ssrRenderAttr("href", unref(whatsappOrderUrl))} target="_blank" rel="noopener" class="wa-link" data-v-e9f02759><i class="fa-brands fa-whatsapp" data-v-e9f02759></i> ${ssrInterpolate(_ctx.$t("product.askWhatsapp"))}</a>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div></section></div>`);
      if (unref(product).name) {
        _push(`<section class="content-inner-3 pb-0" id="product-description" data-v-e9f02759><div class="container home-wide" data-v-e9f02759><div class="${ssrRenderClass([{ "no-desc": !unref(product).description }, "pdp-info"])}" data-v-e9f02759>`);
        if (unref(product).description) {
          _push(`<div class="desc-card" data-v-e9f02759><h2 class="desc-title" data-v-e9f02759>${ssrInterpolate(_ctx.$t("product.description"))}</h2><div class="${ssrRenderClass([{ collapsed: descTall.value && !descExpanded.value }, "desc-body"])}" data-v-e9f02759><div class="product-description" dir="auto" data-v-e9f02759>${(_c = unref(product).description) != null ? _c : ""}</div></div>`);
          if (descTall.value) {
            _push(`<button type="button" class="desc-toggle"${ssrRenderAttr("aria-expanded", descExpanded.value)} data-v-e9f02759>${ssrInterpolate(descExpanded.value ? _ctx.$t("product.readLess") : _ctx.$t("product.readMore"))} <i class="${ssrRenderClass([descExpanded.value ? "fa-chevron-up" : "fa-chevron-down", "fa-solid"])}" data-v-e9f02759></i></button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<aside class="details-card" data-v-e9f02759><h2 class="desc-title" data-v-e9f02759>${ssrInterpolate(_ctx.$t("product.details"))}</h2><dl class="summary-meta" data-v-e9f02759>`);
        if (unref(product).sku) {
          _push(`<!--[--><dt data-v-e9f02759>${ssrInterpolate(_ctx.$t("product.sku"))}</dt><dd data-v-e9f02759><span class="meta-chip is-static" dir="ltr" data-v-e9f02759>${ssrInterpolate(unref(product).sku)}</span></dd><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if ((_d = unref(product).categories) == null ? void 0 : _d.length) {
          _push(`<!--[--><dt data-v-e9f02759>${ssrInterpolate(_ctx.$t("product.category"))}</dt><dd data-v-e9f02759><!--[-->`);
          ssrRenderList(unref(product).categories, (category) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: category.id,
              to: `/shop?category=${category.id}`,
              class: "meta-chip"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(category.name.replace(/&/g, "&").toLowerCase())}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(category.name.replace(/&/g, "&").toLowerCase()), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></dd><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        if (unref(visibleTags).length) {
          _push(`<!--[--><dt data-v-e9f02759>${ssrInterpolate(_ctx.$t("product.tags"))}</dt><dd data-v-e9f02759><!--[-->`);
          ssrRenderList(unref(visibleTags), (tag) => {
            _push(ssrRenderComponent(_component_NuxtLink, {
              key: tag.id,
              to: `/shop?tag=${tag.id}`,
              class: "meta-chip"
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(tag.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(tag.name), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
          });
          _push(`<!--]--></dd><!--]-->`);
        } else {
          _push(`<!---->`);
        }
        _push(`<dt data-v-e9f02759>${ssrInterpolate(_ctx.$t("product.share"))}</dt><dd class="share" data-v-e9f02759><a${ssrRenderAttr("href", `https://www.facebook.com/sharer/sharer.php?u=${unref(encodedUrl)}`)} target="_blank" rel="noopener" aria-label="Facebook" data-v-e9f02759><i class="fa-brands fa-facebook-f" data-v-e9f02759></i></a><a${ssrRenderAttr("href", `https://wa.me/?text=${unref(shareText)}%20${unref(encodedUrl)}`)} target="_blank" rel="noopener" aria-label="WhatsApp" data-v-e9f02759><i class="fa-brands fa-whatsapp" data-v-e9f02759></i></a><a${ssrRenderAttr("href", `https://twitter.com/intent/tweet?url=${unref(encodedUrl)}&text=${unref(shareText)}`)} target="_blank" rel="noopener" aria-label="Twitter" data-v-e9f02759><i class="fa-brands fa-twitter" data-v-e9f02759></i></a><button type="button"${ssrRenderAttr("aria-label", _ctx.$t("product.copyLink"))} data-v-e9f02759><i class="${ssrRenderClass(linkCopied.value ? "fa-solid fa-check" : "fa-solid fa-link")}" data-v-e9f02759></i></button></dd></dl></aside></div></div></section>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(relatedProducts).length) {
        _push(`<section class="content-inner-1 overflow-hidden" data-v-e9f02759><div class="container home-wide" data-v-e9f02759><div class="related-head" data-v-e9f02759><h2 class="related-title" data-v-e9f02759>`);
        _push(ssrRenderComponent(_component_AstroBot, {
          head: "",
          mood: "heart",
          badge: "fa-gamepad",
          size: 42
        }, null, _parent));
        _push(` ${ssrInterpolate(_ctx.$t("product.related"))}</h2>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(primaryCategory) ? `/shop?category=${unref(primaryCategory).id}` : "/shop",
          class: "see-all"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("common.seeAll"))} <i class="fa-solid fa-chevron-right flip-rtl" data-v-e9f02759${_scopeId}></i>`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("common.seeAll")) + " ", 1),
                createVNode("i", { class: "fa-solid fa-chevron-right flip-rtl" })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_sfc_main$1, { products: unref(relatedProducts) }, null, _parent));
        _push(`</div></section>`);
      } else {
        _push(`<!---->`);
      }
      ssrRenderTeleport(_push, (_push2) => {
        var _a3, _b3;
        if (lightboxIndex.value !== null) {
          _push2(`<div class="lightbox" role="dialog" aria-modal="true"${ssrRenderAttr("aria-label", unref(product).name)} data-v-e9f02759><button type="button" class="lb-close"${ssrRenderAttr("aria-label", _ctx.$t("common.close"))} data-v-e9f02759><i class="fa-solid fa-xmark" data-v-e9f02759></i></button>`);
          if (unref(galleryImages).length > 1) {
            _push2(`<button type="button" class="lb-nav lb-prev"${ssrRenderAttr("aria-label", _ctx.$t("shop.prevPage"))} data-v-e9f02759><i class="fa-solid fa-chevron-left" data-v-e9f02759></i></button>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`<img${ssrRenderAttr("src", (_a3 = unref(galleryImages)[lightboxIndex.value]) == null ? void 0 : _a3.src)}${ssrRenderAttr("alt", ((_b3 = unref(galleryImages)[lightboxIndex.value]) == null ? void 0 : _b3.alt) || unref(product).name)} class="lb-img" data-v-e9f02759>`);
          if (unref(galleryImages).length > 1) {
            _push2(`<button type="button" class="lb-nav lb-next"${ssrRenderAttr("aria-label", _ctx.$t("shop.nextPage"))} data-v-e9f02759><i class="fa-solid fa-chevron-right" data-v-e9f02759></i></button>`);
          } else {
            _push2(`<!---->`);
          }
          if (unref(galleryImages).length > 1) {
            _push2(`<span class="lb-count" dir="ltr" data-v-e9f02759>${ssrInterpolate(lightboxIndex.value + 1)} / ${ssrInterpolate(unref(galleryImages).length)}</span>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      if (showStickyCta.value && unref(product).name && unref(inStock)) {
        _push(`<div class="sticky-cta d-lg-none" data-v-e9f02759><div class="sticky-info" data-v-e9f02759><span class="sticky-name" data-v-e9f02759>${ssrInterpolate(unref(product).name)}</span><strong class="sticky-price" data-v-e9f02759>${ssrInterpolate(formatPrice(unref(displayPrice)))}</strong></div><button type="button" class="sticky-add" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"${ssrRenderAttr("aria-label", _ctx.$t("common.addToCart"))} data-v-e9f02759><i class="fa fa-cart-plus" data-v-e9f02759></i></button><button type="button" class="btn btn-primary" data-v-e9f02759>${ssrInterpolate(_ctx.$t("product.buyNow"))}</button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/shop/product/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e9f02759"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-CDEm-akk.mjs.map
