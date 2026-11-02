import { d as _export_sfc, a as useI18n, u as useLocalCart, c as __nuxt_component_1, _ as __nuxt_component_2$1 } from './server.mjs';
import { defineComponent, ref, computed, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderStyle, ssrRenderComponent, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';

const IMAGE_SIZES = "(max-width: 767.98px) 100vw, (max-width: 1199.98px) 50vw, 420px";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "ProductCard",
  __ssrInlineRender: true,
  props: {
    product: {},
    showStock: { type: Boolean }
  },
  setup(__props) {
    const { t } = useI18n();
    const props = __props;
    useLocalCart();
    const justAdded = ref(false);
    const imageFailed = ref(false);
    const imageSrc = computed(() => {
      var _a, _b, _c;
      return ((_b = (_a = props.product) == null ? void 0 : _a.image) == null ? void 0 : _b.src) || ((_c = props.product) == null ? void 0 : _c.thumbnail) || "";
    });
    watch(imageSrc, () => imageFailed.value = false);
    const hasImage = computed(() => !!imageSrc.value && !imageFailed.value);
    ref(null);
    const formatPrice = (value) => `${Number(value).toLocaleString("fr-FR")} ${t("common.currency")}`;
    const variantPrices = computed(
      () => {
        var _a;
        return (((_a = props.product) == null ? void 0 : _a.variations) || []).map((v) => Number(v.price)).filter((n) => n > 0);
      }
    );
    const hasPriceRange = computed(
      () => variantPrices.value.length > 1 && Math.min(...variantPrices.value) !== Math.max(...variantPrices.value)
    );
    const discount = computed(() => {
      var _a, _b, _c;
      const regular = Number((_a = props.product) == null ? void 0 : _a.regular_price);
      const price = Number((_b = props.product) == null ? void 0 : _b.price);
      if (!((_c = props.product) == null ? void 0 : _c.on_sale) || !regular || !price) return 0;
      return Math.floor((regular - price) / regular * 100);
    });
    const isOutOfStock = computed(() => {
      var _a;
      return ((_a = props.product) == null ? void 0 : _a.stock) && props.product.stock !== "instock";
    });
    const isGrouped = computed(() => {
      var _a, _b, _c;
      return ((_a = props.product) == null ? void 0 : _a.type) == "grouped" && ((_c = (_b = props.product) == null ? void 0 : _b.grouped_products) == null ? void 0 : _c.length);
    });
    const productLink = computed(() => {
      const product = props.product;
      return isGrouped.value ? { path: "/shop", query: { group: String(product.id) } } : `/shop/product/${product == null ? void 0 : product.slug}`;
    });
    const action = computed(() => {
      const product = props.product;
      if (isOutOfStock.value) return null;
      if (isGrouped.value) return { kind: "link", icon: "fa-solid fa-layer-group", label: t("shop.filters.collection") };
      if (product.type == "variable") return { kind: "link", icon: "fa-solid fa-sliders", label: t("product.chooseOptions") };
      return { kind: "cart", icon: "fa fa-cart-plus", label: t("common.addToCart") };
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e;
      const _component_AstroBot = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_2$1;
      if (__props.product) {
        _push(`<article${ssrRenderAttrs(mergeProps({
          class: ["product-card", { "is-oos": unref(isOutOfStock) }]
        }, _attrs))} data-v-c1704f6d><div class="product-media" data-v-c1704f6d>`);
        if (unref(hasImage)) {
          _push(`<img${ssrRenderAttr("src", unref(imageSrc))}${ssrRenderAttr("srcset", ((_a = __props.product.image) == null ? void 0 : _a.srcset) || void 0)}${ssrRenderAttr("sizes", ((_b = __props.product.image) == null ? void 0 : _b.srcset) ? IMAGE_SIZES : void 0)}${ssrRenderAttr("alt", ((_c = __props.product.image) == null ? void 0 : _c.alt) || __props.product.name)} width="600" height="600" class="product-img" style="${ssrRenderStyle({ "object-position": "center center" })}" loading="lazy" decoding="async" data-v-c1704f6d>`);
        } else {
          _push(`<div class="product-img product-img-mascot" role="img"${ssrRenderAttr("aria-label", __props.product.name)} data-v-c1704f6d>`);
          _push(ssrRenderComponent(_component_AstroBot, {
            mood: "happy",
            size: 96
          }, null, _parent));
          _push(`</div>`);
        }
        if (unref(isOutOfStock)) {
          _push(`<span class="oos-ribbon" data-v-c1704f6d>${ssrInterpolate(_ctx.$t("product.outOfStock"))}</span>`);
        } else {
          _push(`<!---->`);
        }
        if (((_d = unref(action)) == null ? void 0 : _d.kind) === "link") {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: unref(productLink),
            class: "card-action",
            "aria-label": unref(action).label,
            title: unref(action).label
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<i class="${ssrRenderClass(unref(action).icon)}" aria-hidden="true" data-v-c1704f6d${_scopeId}></i>`);
              } else {
                return [
                  createVNode("i", {
                    class: unref(action).icon,
                    "aria-hidden": "true"
                  }, null, 2)
                ];
              }
            }),
            _: 1
          }, _parent));
        } else if (((_e = unref(action)) == null ? void 0 : _e.kind) === "cart") {
          _push(`<button type="button" class="${ssrRenderClass([{ "is-added": unref(justAdded) }, "card-action"])}"${ssrRenderAttr("aria-label", unref(justAdded) ? _ctx.$t("product.added") : unref(action).label)}${ssrRenderAttr("title", unref(justAdded) ? _ctx.$t("product.added") : unref(action).label)} data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" data-v-c1704f6d><i class="${ssrRenderClass(unref(justAdded) ? "fa-solid fa-check" : unref(action).icon)}" aria-hidden="true" data-v-c1704f6d></i></button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="product-body" data-v-c1704f6d><h3 class="product-title" data-v-c1704f6d>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(productLink),
          class: "stretched-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(__props.product.name)}`);
            } else {
              return [
                createTextVNode(toDisplayString(__props.product.name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</h3><div class="product-price" data-v-c1704f6d>`);
        if (unref(discount) > 0 && !unref(hasPriceRange)) {
          _push(`<span class="discount" dir="ltr" data-v-c1704f6d>-${ssrInterpolate(unref(discount))}%</span>`);
        } else {
          _push(`<!---->`);
        }
        if (__props.product.on_sale && !unref(hasPriceRange)) {
          _push(`<!--[--><span class="price" data-v-c1704f6d>${ssrInterpolate(formatPrice(__props.product.price))}</span><del class="price-old" data-v-c1704f6d>${ssrInterpolate(formatPrice(__props.product.regular_price))}</del><!--]-->`);
        } else if (unref(hasPriceRange)) {
          _push(`<!--[--><span class="price-from" data-v-c1704f6d>${ssrInterpolate(_ctx.$t("product.from"))}</span><span class="price" data-v-c1704f6d>${ssrInterpolate(formatPrice(Math.min(...unref(variantPrices))))}</span><!--]-->`);
        } else if (Number(__props.product.price) > 0) {
          _push(`<span class="price" data-v-c1704f6d>${ssrInterpolate(formatPrice(__props.product.price))}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
        if (__props.showStock && !unref(isOutOfStock)) {
          _push(`<div class="product-stock in-stock" data-v-c1704f6d><span class="dot" data-v-c1704f6d></span> ${ssrInterpolate(_ctx.$t("common.available"))}</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></article>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c1704f6d"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=ProductCard-a2L0chnn.mjs.map
