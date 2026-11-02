import { d as _export_sfc, u as useLocalCart, a as useI18n, b as useHead, _ as __nuxt_component_2$1, P as PAY_METHODS, c as __nuxt_component_1 } from './server.mjs';
import { H as Header3, _ as __nuxt_component_4$1 } from './Header3-s4pCF4HI.mjs';
import { defineComponent, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cart",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      cart: cart2,
      totalPrice,
      itemsCount
    } = useLocalCart();
    const { t } = useI18n();
    useHead({
      title: () => t("seo.cart"),
      meta: [
        {
          name: "description",
          content: () => t("seo.shortDescription")
        },
        { name: "robots", content: "noindex, follow" }
      ]
    });
    const formatPrice = (value) => `${Number(value).toLocaleString("fr-FR")} ${t("common.currency")}`;
    const productLink = (item) => item.slug ? `/shop/product/${item.slug}` : "/shop";
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_2$1;
      const _component_ProductThumb = __nuxt_component_4$1;
      const _component_AstroBot = __nuxt_component_1;
      _push(`<!--[--><header class="site-header mo-left header style-2" data-v-738509c1>`);
      _push(ssrRenderComponent(Header3, null, null, _parent));
      _push(`</header><div class="page-content bg-light" data-v-738509c1><section class="${ssrRenderClass([{ "has-items": unref(cart2).length }, "container cart-page"])}" data-v-738509c1><div class="page-head" data-v-738509c1><h1 class="gz-page-title" data-v-738509c1>${ssrInterpolate(_ctx.$t("cart.title"))}</h1>`);
      if (unref(cart2).length) {
        _push(`<span class="page-count" data-v-738509c1>${ssrInterpolate(_ctx.$t("cart.itemsCount", { count: unref(itemsCount) }, unref(itemsCount)))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(cart2).length) {
        _push(`<div class="cart-layout" data-v-738509c1><ul class="cart-items" data-v-738509c1><!--[-->`);
        ssrRenderList(unref(cart2), (item) => {
          var _a;
          _push(`<li class="cart-item" data-v-738509c1>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: productLink(item),
            class: "item-media"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_ProductThumb, {
                  src: item.image,
                  alt: item.name,
                  size: 120
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_ProductThumb, {
                    src: item.image,
                    alt: item.name,
                    size: 120
                  }, null, 8, ["src", "alt"])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<div class="item-info" data-v-738509c1>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: productLink(item),
            class: "item-name"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          if ((_a = item.variation) == null ? void 0 : _a.length) {
            _push(`<div class="item-options" data-v-738509c1><!--[-->`);
            ssrRenderList(item.variation, (v) => {
              _push(`<span data-v-738509c1>${ssrInterpolate(v.value)}</span>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<span class="item-unit" data-v-738509c1>${ssrInterpolate(formatPrice(item.price))}</span><button type="button" class="remove-link"${ssrRenderAttr("aria-label", _ctx.$t("cart.remove", { name: item.name }))} data-v-738509c1><i class="fa-regular fa-trash-can" aria-hidden="true" data-v-738509c1></i> ${ssrInterpolate(_ctx.$t("cart.removeShort"))}</button></div><div class="item-actions" data-v-738509c1><strong class="item-total" data-v-738509c1>${ssrInterpolate(formatPrice(Number(item.price) * item.quantity))}</strong><div class="qty" role="group"${ssrRenderAttr("aria-label", _ctx.$t("common.quantity"))} data-v-738509c1><button type="button"${ssrRenderAttr("aria-label", _ctx.$t("product.decrease"))} data-v-738509c1><i class="${ssrRenderClass(item.quantity > 1 ? "fa-solid fa-minus" : "fa-regular fa-trash-can")}" data-v-738509c1></i></button><span data-v-738509c1>${ssrInterpolate(item.quantity)}</span><button type="button"${ssrRenderAttr("aria-label", _ctx.$t("product.increase"))} data-v-738509c1><i class="fa-solid fa-plus" data-v-738509c1></i></button></div></div></li>`);
        });
        _push(`<!--]--></ul><aside class="cart-summary" data-v-738509c1><h2 data-v-738509c1>${ssrInterpolate(_ctx.$t("cart.summary"))}</h2><div class="summary-row" data-v-738509c1><span data-v-738509c1>${ssrInterpolate(_ctx.$t("common.subtotal"))} (${ssrInterpolate(unref(itemsCount))})</span><span data-v-738509c1>${ssrInterpolate(formatPrice(unref(totalPrice)))}</span></div><div class="summary-row" data-v-738509c1><span data-v-738509c1>${ssrInterpolate(_ctx.$t("checkout.deliveryLabel"))}</span><span class="free" data-v-738509c1>${ssrInterpolate(_ctx.$t("checkout.deliveryEmail"))}</span></div><div class="summary-total" data-v-738509c1><span data-v-738509c1>${ssrInterpolate(_ctx.$t("common.total"))}</span><strong data-v-738509c1>${ssrInterpolate(formatPrice(unref(totalPrice)))}</strong></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/checkout",
          class: "btn btn-primary btn-lg btn-block checkout-btn"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="fa-solid fa-lock" aria-hidden="true" data-v-738509c1${_scopeId}></i> ${ssrInterpolate(_ctx.$t("cart.checkout"))}`);
            } else {
              return [
                createVNode("i", {
                  class: "fa-solid fa-lock",
                  "aria-hidden": "true"
                }),
                createTextVNode(" " + toDisplayString(_ctx.$t("cart.checkout")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/shop",
          class: "continue-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("cart.continueShopping"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("cart.continueShopping")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<div class="pay-methods" data-v-738509c1><p data-v-738509c1>${ssrInterpolate(_ctx.$t("cart.paymentAccepted"))}</p><ul data-v-738509c1><!--[-->`);
        ssrRenderList("PAY_METHODS" in _ctx ? _ctx.PAY_METHODS : unref(PAY_METHODS), (m) => {
          _push(`<li data-v-738509c1><i class="${ssrRenderClass(m.icon)}" aria-hidden="true" data-v-738509c1></i>${ssrInterpolate(m.title)}</li>`);
        });
        _push(`<!--]--></ul></div><p class="email-note" data-v-738509c1><i class="fa-regular fa-envelope" aria-hidden="true" data-v-738509c1></i> ${ssrInterpolate(_ctx.$t("cart.shippingNotice"))}</p><ul class="trust" data-v-738509c1><li data-v-738509c1><i class="iconly-Curved-ShieldDone" data-v-738509c1></i>${ssrInterpolate(_ctx.$t("cart.warranty"))}</li><li data-v-738509c1><i class="iconly-Curved-User" data-v-738509c1></i>${ssrInterpolate(_ctx.$t("cart.support"))}</li></ul></aside></div>`);
      } else {
        _push(`<div class="cart-empty" data-v-738509c1>`);
        _push(ssrRenderComponent(_component_AstroBot, {
          mood: "sad",
          size: 150
        }, null, _parent));
        _push(`<h2 data-v-738509c1>${ssrInterpolate(_ctx.$t("cart.empty"))}</h2><p data-v-738509c1>${ssrInterpolate(_ctx.$t("cart.emptyPageText"))}</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/shop",
          class: "btn btn-primary btn-lg"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("cart.startShopping"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("cart.startShopping")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</section>`);
      if (unref(cart2).length) {
        _push(`<div class="cart-bar" data-v-738509c1><div class="bar-total" data-v-738509c1><span data-v-738509c1>${ssrInterpolate(_ctx.$t("common.total"))}</span><strong data-v-738509c1>${ssrInterpolate(formatPrice(unref(totalPrice)))}</strong></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/checkout",
          class: "btn btn-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("cart.checkout"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("cart.checkout")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const cart = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-738509c1"]]);

export { cart as default };
//# sourceMappingURL=cart-BmbfjLVy.mjs.map
