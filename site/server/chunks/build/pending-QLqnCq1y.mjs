import { d as _export_sfc, f as useRoute, a as useI18n, h as useAccount, p as findManualMethod, b as useHead, w as whatsappLink, c as __nuxt_component_1, _ as __nuxt_component_2$1 } from './server.mjs';
import { defineComponent, computed, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "pending",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { t } = useI18n();
    const { isLoggedIn } = useAccount();
    const clean = (value) => String(value != null ? value : "").replace(/[^\w-]/g, "");
    const orderNumber = computed(() => clean(route.query.order));
    const method = computed(() => findManualMethod(clean(route.query.method)));
    useHead({
      title: () => t("payment.pendingTitle"),
      meta: [{ name: "robots", content: "noindex" }]
    });
    const helpLink = computed(() => whatsappLink(t("success.whatsappMessage", { id: orderNumber.value || "-" })));
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_AstroBot = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_2$1;
      _push(`<!--[--><header class="site-header mo-left header style-2" data-v-a524e9e7>`);
      _push(ssrRenderComponent(Header3, null, null, _parent));
      _push(`</header><div class="page-content" data-v-a524e9e7><div class="content-inner pending-page" data-v-a524e9e7><div class="container" data-v-a524e9e7><section class="pending-card" data-v-a524e9e7>`);
      _push(ssrRenderComponent(_component_AstroBot, {
        mood: "happy",
        size: 110
      }, null, _parent));
      _push(`<p class="eyebrow" data-v-a524e9e7>${ssrInterpolate(_ctx.$t("payment.pendingEyebrow"))}</p><h1 data-v-a524e9e7>${ssrInterpolate(_ctx.$t("payment.pendingTitle"))}</h1><p class="lead" data-v-a524e9e7>${ssrInterpolate(_ctx.$t("payment.pendingText", { method: ((_a = unref(method)) == null ? void 0 : _a.title) || "" }))}</p>`);
      if (unref(orderNumber)) {
        _push(`<span class="order-pill" data-v-a524e9e7>${ssrInterpolate(_ctx.$t("payment.orderNo"))} <strong dir="ltr" data-v-a524e9e7>#${ssrInterpolate(unref(orderNumber))}</strong></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<ol class="steps" data-v-a524e9e7><li class="done" data-v-a524e9e7><span class="dot" data-v-a524e9e7><i class="fa-solid fa-check" data-v-a524e9e7></i></span>${ssrInterpolate(_ctx.$t("payment.pendingStep1"))}</li><li class="current" data-v-a524e9e7><span class="dot" data-v-a524e9e7><i class="fa-solid fa-magnifying-glass" data-v-a524e9e7></i></span>${ssrInterpolate(_ctx.$t("payment.pendingStep2"))}</li><li data-v-a524e9e7><span class="dot" data-v-a524e9e7><i class="fa-regular fa-envelope" data-v-a524e9e7></i></span>${ssrInterpolate(_ctx.$t("payment.pendingStep3"))}</li></ol><div class="actions" data-v-a524e9e7>`);
      if (unref(isLoggedIn)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/account/orders",
          class: "btn btn-primary"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("account.orders"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("account.orders")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/shop",
        class: "btn btn-outline-primary"
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
      _push(`<a${ssrRenderAttr("href", unref(helpLink))} target="_blank" rel="noopener" class="btn btn-success" data-v-a524e9e7><i class="fa-brands fa-whatsapp" data-v-a524e9e7></i> ${ssrInterpolate(_ctx.$t("success.whatsapp"))}</a></div></section></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/payment/pending.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const pending = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a524e9e7"]]);

export { pending as default };
//# sourceMappingURL=pending-QLqnCq1y.mjs.map
