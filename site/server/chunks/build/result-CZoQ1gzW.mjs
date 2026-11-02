import { d as _export_sfc, f as useRoute, a as useI18n, u as useLocalCart, b as useHead, w as whatsappLink, c as __nuxt_component_1, _ as __nuxt_component_2$1, C as CONTACT } from './server.mjs';
import { defineComponent, computed, ref, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrRenderStyle, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "result",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const { t } = useI18n();
    useLocalCart();
    const clean = (value) => String(value != null ? value : "").replace(/[^\w-]/g, "");
    const orderId = computed(() => clean(route.query.order_id));
    const invoiceId = computed(() => clean(route.query.invoice_id));
    const isFailed = computed(() => {
      var _a;
      const value = String((_a = route.query.error) != null ? _a : "").trim().toLowerCase();
      return value !== "" && value !== "0" && value !== "false";
    });
    const reason = computed(() => {
      var _a;
      const value = String((_a = route.query.message) != null ? _a : "").trim();
      return value && value !== "0" ? value.slice(0, 200) : "";
    });
    useHead({
      title: () => isFailed.value ? t("payment.failed") : t("payment.confirmed"),
      meta: [{ name: "robots", content: "noindex" }]
    });
    const formatPrice = (value) => `${Number(value).toLocaleString("fr-FR")} ${t("common.currency")}`;
    const attempt = ref(null);
    const retryLink = computed(() => {
      var _a, _b, _c;
      return ((_a = attempt.value) == null ? void 0 : _a.fromAccount) ? `/account/orders/${attempt.value.orderId}` : ((_b = attempt.value) == null ? void 0 : _b.fromCart) ? "/checkout" : ((_c = attempt.value) == null ? void 0 : _c.slug) ? `/shop/product/${attempt.value.slug}` : "/shop";
    });
    const copied = ref(false);
    const whatsappUrl = computed(() => {
      const key = isFailed.value ? "payment.whatsappFailed" : "payment.whatsappSuccess";
      return whatsappLink(t(key, { id: orderId.value || "-" }));
    });
    const steps = computed(() => [
      { icon: "fa-solid fa-check", title: "payment.tl1Title", text: "payment.tl1Text", state: "done" },
      { icon: "fa-regular fa-envelope", title: "payment.tl2Title", text: "payment.whatsappIntroShort", state: "current" },
      { icon: "fa-solid fa-key", title: "payment.tl3Title", text: "payment.tl3Text", state: "" }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AstroBot = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_2$1;
      _push(`<!--[--><header class="site-header mo-left header style-2" data-v-e31c1faa>`);
      _push(ssrRenderComponent(Header3, null, null, _parent));
      _push(`</header><div class="page-content bg-light" data-v-e31c1faa><div class="content-inner result-page" data-v-e31c1faa><div class="container" data-v-e31c1faa><section class="${ssrRenderClass([unref(isFailed) ? "is-failed" : "is-success", "hero-card"])}" data-v-e31c1faa>`);
      if (!unref(isFailed)) {
        _push(`<div class="confetti" aria-hidden="true" data-v-e31c1faa><!--[-->`);
        ssrRenderList(18, (n) => {
          _push(`<i style="${ssrRenderStyle({ "--i": n })}" data-v-e31c1faa></i>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="astro-wrap" data-v-e31c1faa>`);
      _push(ssrRenderComponent(_component_AstroBot, {
        mood: unref(isFailed) ? "cry" : "happy",
        size: 130
      }, null, _parent));
      _push(`<span class="status-badge" aria-hidden="true" data-v-e31c1faa><i class="${ssrRenderClass(unref(isFailed) ? "fa-solid fa-xmark" : "fa-solid fa-check")}" data-v-e31c1faa></i></span></div><p class="eyebrow" data-v-e31c1faa>${ssrInterpolate(unref(isFailed) ? _ctx.$t("payment.failed") : _ctx.$t("payment.confirmed"))}</p><h1 data-v-e31c1faa>${ssrInterpolate(unref(isFailed) ? _ctx.$t("payment.notConfirmed") : _ctx.$t("payment.thanksTitle"))}</h1><p class="lead" data-v-e31c1faa>${ssrInterpolate(unref(isFailed) ? _ctx.$t("payment.notFinalized") : _ctx.$t("payment.preparing"))}</p><div class="refs" data-v-e31c1faa>`);
      if (unref(orderId)) {
        _push(`<button type="button" class="ref-pill"${ssrRenderAttr("aria-label", _ctx.$t("success.copyOrder"))} data-v-e31c1faa><span data-v-e31c1faa>${ssrInterpolate(_ctx.$t("payment.orderNo"))}</span><strong dir="ltr" data-v-e31c1faa>#${ssrInterpolate(unref(orderId))}</strong><i class="${ssrRenderClass(unref(copied) ? "fa-solid fa-check" : "fa-regular fa-copy")}" data-v-e31c1faa></i></button>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(invoiceId)) {
        _push(`<span class="ref-small" data-v-e31c1faa>${ssrInterpolate(_ctx.$t("payment.invoiceNo"))} <span dir="ltr" data-v-e31c1faa>#${ssrInterpolate(unref(invoiceId))}</span></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><span class="copied" role="status" data-v-e31c1faa>${ssrInterpolate(unref(copied) ? _ctx.$t("success.copied") : "")}</span>`);
      if (unref(isFailed) && unref(reason)) {
        _push(`<div class="reason" data-v-e31c1faa><i class="fa-solid fa-circle-info" aria-hidden="true" data-v-e31c1faa></i><span data-v-e31c1faa><b data-v-e31c1faa>${ssrInterpolate(_ctx.$t("payment.reasonLabel"))}</b> ${ssrInterpolate(unref(reason))}</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section>`);
      if (!unref(isFailed)) {
        _push(`<!--[--><section class="callout" role="note" data-v-e31c1faa><span class="callout-icon" data-v-e31c1faa><i class="fa-regular fa-envelope" data-v-e31c1faa></i></span><div data-v-e31c1faa><h2 data-v-e31c1faa>${ssrInterpolate(_ctx.$t("success.stayReachableTitle"))}</h2><p data-v-e31c1faa>${ssrInterpolate(_ctx.$t("payment.stayReachableText"))}</p></div></section><div class="result-grid" data-v-e31c1faa><section class="${ssrRenderClass([{ "span-all": !unref(attempt) }, "panel"])}" data-v-e31c1faa><h2 class="panel-title" data-v-e31c1faa>${ssrInterpolate(_ctx.$t("success.nextTitle"))}</h2><ol class="timeline" data-v-e31c1faa><!--[-->`);
        ssrRenderList(unref(steps), (step) => {
          _push(`<li class="${ssrRenderClass(step.state)}" data-v-e31c1faa><span class="dot" data-v-e31c1faa><i class="${ssrRenderClass(step.icon)}" data-v-e31c1faa></i></span><div data-v-e31c1faa><h3 data-v-e31c1faa>${ssrInterpolate(_ctx.$t(step.title))}</h3><p data-v-e31c1faa>${ssrInterpolate(_ctx.$t(step.text))}</p></div></li>`);
        });
        _push(`<!--]--></ol></section>`);
        if (unref(attempt)) {
          _push(`<section class="panel" data-v-e31c1faa><h2 class="panel-title" data-v-e31c1faa>${ssrInterpolate(_ctx.$t("payment.recapTitle"))}</h2><div class="recap-product" data-v-e31c1faa>`);
          if (unref(attempt).image) {
            _push(`<img${ssrRenderAttr("src", unref(attempt).image)}${ssrRenderAttr("alt", unref(attempt).name)} width="64" height="64" data-v-e31c1faa>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<span data-v-e31c1faa><b data-v-e31c1faa>${ssrInterpolate(unref(attempt).name)}</b>`);
          if (unref(attempt).option) {
            _push(`<small data-v-e31c1faa>${ssrInterpolate(unref(attempt).option)}</small>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</span></div><div class="recap-total" data-v-e31c1faa><span data-v-e31c1faa>${ssrInterpolate(_ctx.$t("payment.paid"))}</span><strong data-v-e31c1faa>${ssrInterpolate(formatPrice(unref(attempt).amount))}</strong></div></section>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><!--]-->`);
      } else {
        _push(`<div class="result-grid" data-v-e31c1faa><section class="panel" data-v-e31c1faa><h2 class="panel-title" data-v-e31c1faa>${ssrInterpolate(_ctx.$t("payment.checksTitle"))}</h2><ul class="checklist" data-v-e31c1faa><li data-v-e31c1faa><i class="fa-regular fa-credit-card" data-v-e31c1faa></i>${ssrInterpolate(_ctx.$t("payment.checkCard"))}</li><li data-v-e31c1faa><i class="fa-solid fa-wallet" data-v-e31c1faa></i>${ssrInterpolate(_ctx.$t("payment.checkBalance"))}</li><li data-v-e31c1faa><i class="fa-solid fa-rotate-right" data-v-e31c1faa></i>${ssrInterpolate(_ctx.$t("payment.checkRetry"))}</li></ul></section><section class="panel retry-panel" data-v-e31c1faa><h2 class="panel-title" data-v-e31c1faa>${ssrInterpolate(_ctx.$t("payment.retryTitle"))}</h2>`);
        if (unref(attempt)) {
          _push(`<div class="recap-product" data-v-e31c1faa>`);
          if (unref(attempt).image) {
            _push(`<img${ssrRenderAttr("src", unref(attempt).image)}${ssrRenderAttr("alt", unref(attempt).name)} width="64" height="64" data-v-e31c1faa>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<span data-v-e31c1faa><b data-v-e31c1faa>${ssrInterpolate(unref(attempt).name)}</b>`);
          if (unref(attempt).option) {
            _push(`<small data-v-e31c1faa>${ssrInterpolate(unref(attempt).option)}</small>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<small class="fw-bold" data-v-e31c1faa>${ssrInterpolate(formatPrice(unref(attempt).amount))}</small></span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: unref(retryLink),
          class: "btn btn-primary btn-lg btn-block"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="fa-solid fa-rotate-right" data-v-e31c1faa${_scopeId}></i> ${ssrInterpolate(_ctx.$t("payment.retry"))}`);
            } else {
              return [
                createVNode("i", { class: "fa-solid fa-rotate-right" }),
                createTextVNode(" " + toDisplayString(_ctx.$t("payment.retry")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</section></div>`);
      }
      _push(`<section class="panel help-panel" data-v-e31c1faa><div data-v-e31c1faa><h2 class="panel-title" data-v-e31c1faa>${ssrInterpolate(_ctx.$t("payment.support"))}</h2><p class="help-text" data-v-e31c1faa>${ssrInterpolate(unref(isFailed) ? _ctx.$t("payment.helpFailed") : _ctx.$t("payment.needHelp"))}</p></div><div class="help-actions" data-v-e31c1faa><a${ssrRenderAttr("href", unref(whatsappUrl))} target="_blank" rel="noopener" class="btn btn-success" data-v-e31c1faa><i class="fa-brands fa-whatsapp" data-v-e31c1faa></i> ${ssrInterpolate(_ctx.$t("success.whatsapp"))}</a><a${ssrRenderAttr("href", `tel:${("CONTACT" in _ctx ? _ctx.CONTACT : unref(CONTACT)).tel}`)} class="btn btn-outline-primary" data-v-e31c1faa><i class="fa-solid fa-phone" data-v-e31c1faa></i> <span dir="ltr" data-v-e31c1faa>${ssrInterpolate(("CONTACT" in _ctx ? _ctx.CONTACT : unref(CONTACT)).phone)}</span></a></div></section><div class="final-actions" data-v-e31c1faa>`);
      if (!unref(isFailed)) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/shop",
          class: "btn btn-primary btn-lg"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="iconly-Curved-Game" data-v-e31c1faa${_scopeId}></i> ${ssrInterpolate(_ctx.$t("common.backShop"))}`);
            } else {
              return [
                createVNode("i", { class: "iconly-Curved-Game" }),
                createTextVNode(" " + toDisplayString(_ctx.$t("common.backShop")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "btn btn-outline-primary btn-lg"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("common.backHome"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("common.backHome")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/payment/result.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const result = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e31c1faa"]]);

export { result as default };
//# sourceMappingURL=result-CZoQ1gzW.mjs.map
