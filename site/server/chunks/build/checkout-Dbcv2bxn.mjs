import { d as _export_sfc, s as useNuxtApp, a as useI18n, O as ONLINE_METHOD_ID, b as useHead, u as useLocalCart, h as useAccount, _ as __nuxt_component_2$1, m as useLazyFetch, p as findManualMethod, t as toForeignAmount, q as CURRENCY_SYMBOLS, M as MANUAL_METHODS, r as PROOF_ACCEPT } from './server.mjs';
import { defineComponent, ref, computed, watch, reactive, withCtx, createVNode, createTextVNode, toDisplayString, unref, isRef, toValue, useModel, mergeProps, mergeModels, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrRenderAttrs, ssrLooseEqual } from 'vue/server-renderer';
import { H as Header3, _ as __nuxt_component_4$1 } from './Header3-s4pCF4HI.mjs';
import { z } from 'zod';
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

const useForeignAmount = (method, total) => {
  const { data: rates, pending } = useLazyFetch(
    "/api/payments/rates",
    { key: "dzd-rates", server: false },
    "$cCrOE4kLZX"
    /* nuxt-injected */
  );
  const currency = computed(() => {
    var _a;
    return (_a = findManualMethod(toValue(method))) == null ? void 0 : _a.currency;
  });
  const rate = computed(() => {
    var _a;
    return currency.value ? (_a = rates.value) == null ? void 0 : _a[currency.value] : void 0;
  });
  const label = computed(() => {
    if (!currency.value || !rate.value) return "";
    const amount = toForeignAmount(toValue(total), rate.value);
    return `${amount.toLocaleString("fr-FR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${CURRENCY_SYMBOLS[currency.value]}`;
  });
  return { currency, rate, label, pending };
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "PaymentMethodPicker",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    total: {},
    proofError: {},
    disabled: { type: Boolean }
  }, {
    "modelValue": { default: ONLINE_METHOD_ID },
    "modelModifiers": {},
    "proof": { default: null },
    "proofModifiers": {}
  }),
  emits: ["update:modelValue", "update:proof"],
  setup(__props) {
    const props = __props;
    const method = useModel(__props, "modelValue");
    const proof = useModel(__props, "proof");
    const { t } = useI18n();
    const manual = computed(() => findManualMethod(method.value));
    const formatPrice = (value) => `${Number(value).toLocaleString("fr-FR")} ${t("common.currency")}`;
    const { rate, label: foreignAmount, pending: ratesPending } = useForeignAmount(method, () => props.total);
    const copied = ref("");
    const localError = ref("");
    const fileInput = ref(null);
    const isDragging = ref(false);
    const clearProof = () => {
      proof.value = null;
      if (fileInput.value) fileInput.value.value = "";
    };
    const sizeLabel = (bytes) => bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} Mo` : `${Math.max(1, Math.round(bytes / 1024))} Ko`;
    watch(method, () => clearProof());
    const shownError = computed(() => localError.value || props.proofError || "");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "pay-picker" }, _attrs))} data-v-623707a3><div class="methods" role="radiogroup"${ssrRenderAttr("aria-label", _ctx.$t("payment.chooseMethod"))} data-v-623707a3><label class="${ssrRenderClass([{ active: method.value === ("ONLINE_METHOD_ID" in _ctx ? _ctx.ONLINE_METHOD_ID : unref(ONLINE_METHOD_ID)) }, "method method-online"])}" data-v-623707a3><input${ssrIncludeBooleanAttr(ssrLooseEqual(method.value, "ONLINE_METHOD_ID" in _ctx ? _ctx.ONLINE_METHOD_ID : unref(ONLINE_METHOD_ID))) ? " checked" : ""} type="radio" name="pay-method"${ssrRenderAttr("value", "ONLINE_METHOD_ID" in _ctx ? _ctx.ONLINE_METHOD_ID : unref(ONLINE_METHOD_ID))} class="visually-hidden"${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""} data-v-623707a3><span class="radio" aria-hidden="true" data-v-623707a3></span><span class="method-text" data-v-623707a3><b data-v-623707a3>${ssrInterpolate(_ctx.$t("payment.onlineTitle"))} <span class="badge-rec" data-v-623707a3>${ssrInterpolate(_ctx.$t("payment.recommended"))}</span></b><small data-v-623707a3>${ssrInterpolate(_ctx.$t("checkout.payOnlineNotice"))}</small></span><i class="fa-regular fa-credit-card method-icon" aria-hidden="true" data-v-623707a3></i></label><p class="group-label" data-v-623707a3>${ssrInterpolate(_ctx.$t("payment.orTransfer"))}</p><div class="manual-grid" data-v-623707a3><!--[-->`);
      ssrRenderList("MANUAL_METHODS" in _ctx ? _ctx.MANUAL_METHODS : unref(MANUAL_METHODS), (m) => {
        _push(`<label class="${ssrRenderClass([{ active: method.value === m.id }, "method method-tile"])}" data-v-623707a3><input${ssrIncludeBooleanAttr(ssrLooseEqual(method.value, m.id)) ? " checked" : ""} type="radio" name="pay-method"${ssrRenderAttr("value", m.id)} class="visually-hidden"${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""} data-v-623707a3><i class="${ssrRenderClass([m.icon, "method-icon"])}" aria-hidden="true" data-v-623707a3></i><b data-v-623707a3>${ssrInterpolate(m.title)}</b></label>`);
      });
      _push(`<!--]--></div></div>`);
      if (unref(manual)) {
        _push(`<div class="manual-box" data-v-623707a3><ol class="manual-steps" data-v-623707a3><li data-v-623707a3><span class="step-num" aria-hidden="true" data-v-623707a3>1</span><div class="step-body" data-v-623707a3><p class="step-title" data-v-623707a3>${ssrInterpolate(_ctx.$t("payment.stepSend"))}</p><p class="manual-amount" data-v-623707a3>${ssrInterpolate(_ctx.$t("payment.sendExactly"))} `);
        if (!unref(manual).currency) {
          _push(`<strong data-v-623707a3>${ssrInterpolate(formatPrice(__props.total))}</strong>`);
        } else if (unref(foreignAmount)) {
          _push(`<strong dir="ltr" data-v-623707a3>${ssrInterpolate(unref(foreignAmount))}</strong>`);
        } else if (unref(ratesPending)) {
          _push(`<strong data-v-623707a3>\u2026</strong>`);
        } else {
          _push(`<!---->`);
        }
        _push(` ${ssrInterpolate(_ctx.$t("payment.toAccount", { method: unref(manual).title }))}</p>`);
        if (unref(manual).currency && unref(rate)) {
          _push(`<p class="manual-rate" data-v-623707a3><i class="fa-solid fa-arrow-right-arrow-left" aria-hidden="true" data-v-623707a3></i> ${ssrInterpolate(_ctx.$t("payment.rateInfo", { total: formatPrice(__props.total), rate: `1 ${("CURRENCY_SYMBOLS" in _ctx ? _ctx.CURRENCY_SYMBOLS : unref(CURRENCY_SYMBOLS))[unref(manual).currency]} = ${unref(rate)} ${_ctx.$t("common.currency")}` }))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<dl class="fields" data-v-623707a3><!--[-->`);
        ssrRenderList(unref(manual).fields, (field) => {
          _push(`<div class="field-row" data-v-623707a3><dt data-v-623707a3>${ssrInterpolate(_ctx.$t(field.label))}</dt><dd data-v-623707a3><span dir="ltr" data-v-623707a3>${ssrInterpolate(field.value)}</span>`);
          if (field.copy) {
            _push(`<button type="button" class="${ssrRenderClass([{ copied: unref(copied) === field.value }, "copy-btn"])}"${ssrRenderAttr("aria-label", _ctx.$t("payment.copy", { label: _ctx.$t(field.label) }))} data-v-623707a3><i class="${ssrRenderClass(unref(copied) === field.value ? "fa-solid fa-check" : "fa-regular fa-copy")}" aria-hidden="true" data-v-623707a3></i></button>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</dd></div>`);
        });
        _push(`<!--]--></dl></div></li><li data-v-623707a3><span class="step-num" aria-hidden="true" data-v-623707a3>2</span><div class="step-body" data-v-623707a3><p class="step-title" data-v-623707a3>${ssrInterpolate(_ctx.$t("payment.stepUpload"))} <span class="req" data-v-623707a3>*</span></p>`);
        if (proof.value) {
          _push(`<div class="proof-file" data-v-623707a3><i class="${ssrRenderClass(proof.value.type === "application/pdf" ? "fa-regular fa-file-pdf" : "fa-regular fa-file-image")}" aria-hidden="true" data-v-623707a3></i><span class="proof-name" data-v-623707a3><b data-v-623707a3>${ssrInterpolate(proof.value.name)}</b><small data-v-623707a3>${ssrInterpolate(sizeLabel(proof.value.size))}</small></span><button type="button" class="remove-btn"${ssrRenderAttr("aria-label", _ctx.$t("payment.proofRemove"))}${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""} data-v-623707a3><i class="fa-solid fa-xmark" aria-hidden="true" data-v-623707a3></i></button></div>`);
        } else {
          _push(`<label class="${ssrRenderClass([{ dragging: unref(isDragging), invalid: !!unref(shownError) }, "dropzone"])}"${ssrRenderAttr("aria-label", _ctx.$t("payment.proofLabel"))} data-v-623707a3><input type="file"${ssrRenderAttr("accept", "PROOF_ACCEPT" in _ctx ? _ctx.PROOF_ACCEPT : unref(PROOF_ACCEPT))} class="visually-hidden"${ssrIncludeBooleanAttr(__props.disabled) ? " disabled" : ""} data-v-623707a3><i class="fa-solid fa-cloud-arrow-up" aria-hidden="true" data-v-623707a3></i><span data-v-623707a3><b data-v-623707a3>${ssrInterpolate(_ctx.$t("payment.proofChoose"))}</b> ${ssrInterpolate(_ctx.$t("payment.proofDrop"))}</span><small data-v-623707a3>${ssrInterpolate(_ctx.$t("payment.proofFormats"))}</small></label>`);
        }
        if (unref(shownError)) {
          _push(`<p class="field-error" role="alert" data-v-623707a3>${ssrInterpolate(_ctx.$t(unref(shownError)))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div></li></ol><p class="manual-note" data-v-623707a3><i class="fa-regular fa-clock" aria-hidden="true" data-v-623707a3></i> ${ssrInterpolate(_ctx.$t("payment.manualNote"))}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PaymentMethodPicker.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-623707a3"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "checkout",
  __ssrInlineRender: true,
  setup(__props) {
    const { $aa } = useNuxtApp();
    const { t } = useI18n();
    const isLoading = ref(false);
    const submitError = ref(false);
    const submitErrorKey = ref("checkout.submitError");
    const payMethod = ref(ONLINE_METHOD_ID);
    const proof = ref(null);
    const proofError = ref("");
    const isManual = computed(() => payMethod.value !== ONLINE_METHOD_ID);
    watch(proof, (file) => {
      if (file) proofError.value = "";
    });
    const checkoutSchema = z.object({
      first_name: z.string().trim().min(2, "form.errors.firstNameRequired").max(50),
      last_name: z.string().trim().min(2, "form.errors.lastNameRequired").max(50),
      phone: z.string().regex(/^(05|06|07)[0-9]{8}$/, "form.errors.phoneInvalid"),
      // Codes are delivered to this address
      email: z.string().trim().email("form.errors.emailInvalid"),
      terms: z.boolean().refine((val) => val === true, {
        message: "form.errors.termsRequired"
      }),
      note: z.string().max(500).optional()
    });
    const errors = ref({});
    useHead({
      title: () => t("seo.checkout"),
      meta: [
        { name: "description", content: () => t("seo.description") },
        { name: "robots", content: "noindex, follow" }
      ]
    });
    const { cart } = useLocalCart();
    const items = computed(() => cart.value);
    const itemsCount = computed(
      () => cart.value.reduce((sum, item) => sum + item.quantity, 0)
    );
    const formatPrice = (value) => `${Number(value).toLocaleString("fr-FR")} ${t("common.currency")}`;
    const subTotal = computed(
      () => items.value.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)
    );
    const totalPriceCompute = computed(() => subTotal.value);
    const { label: foreignTotal } = useForeignAmount(payMethod, totalPriceCompute);
    const isRedirecting = ref(false);
    const form = reactive({
      first_name: "",
      last_name: "",
      phone: "",
      email: "",
      note: "",
      acceptedTerms: false
    });
    watch(() => form.phone, (value) => {
      const digits = value.replace(/\D/g, "").slice(0, 10);
      if (digits !== value) form.phone = digits;
    });
    useAccount();
    watch(form, () => {
      if (Object.keys(errors.value).length) {
        const result = checkoutSchema.safeParse({ ...form, terms: form.acceptedTerms });
        const stillInvalid = new Set(result.success ? [] : result.error.issues.map((i) => i.path[0]));
        for (const key of Object.keys(errors.value)) {
          if (!stillInvalid.has(key)) delete errors.value[key];
        }
      }
    });
    const steps = ["checkout.stepCart", "checkout.stepPayment", "checkout.stepConfirm"];
    const noteOpen = ref(false);
    const summaryOpen = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_2$1;
      const _component_PaymentMethodPicker = __nuxt_component_1;
      const _component_ProductThumb = __nuxt_component_4$1;
      _push(`<!--[--><header class="site-header mo-left header style-2" data-v-4314de2a>`);
      _push(ssrRenderComponent(Header3, null, null, _parent));
      _push(`</header><div class="page-content bg-light" data-v-4314de2a><div class="container checkout-page" data-v-4314de2a><div class="page-head" data-v-4314de2a>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/cart",
        class: "back-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fa-solid fa-chevron-left flip-rtl" aria-hidden="true" data-v-4314de2a${_scopeId}></i> ${ssrInterpolate(_ctx.$t("checkout.backToCart"))}`);
          } else {
            return [
              createVNode("i", {
                class: "fa-solid fa-chevron-left flip-rtl",
                "aria-hidden": "true"
              }),
              createTextVNode(" " + toDisplayString(_ctx.$t("checkout.backToCart")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="head-row" data-v-4314de2a><h1 class="gz-page-title" data-v-4314de2a>${ssrInterpolate(_ctx.$t("checkout.title"))}</h1><ol class="steps" data-v-4314de2a><!--[-->`);
      ssrRenderList(steps, (step, index) => {
        _push(`<li class="${ssrRenderClass({ done: index === 0, current: index === 1 })}" data-v-4314de2a><span class="step-dot" data-v-4314de2a>`);
        if (index === 0) {
          _push(`<i class="fa-solid fa-check" data-v-4314de2a></i>`);
        } else {
          _push(`<!--[-->${ssrInterpolate(index + 1)}<!--]-->`);
        }
        _push(`</span><span class="step-label" data-v-4314de2a>${ssrInterpolate(_ctx.$t(step))}</span></li>`);
      });
      _push(`<!--]--></ol></div></div><button type="button" class="summary-toggle"${ssrRenderAttr("aria-expanded", unref(summaryOpen))} aria-controls="checkout-summary" data-v-4314de2a><i class="iconly-Curved-Buy" aria-hidden="true" data-v-4314de2a></i><span data-v-4314de2a>${ssrInterpolate(unref(summaryOpen) ? _ctx.$t("checkout.hideSummary") : _ctx.$t("checkout.showSummary"))} (${ssrInterpolate(unref(itemsCount))})</span><i class="${ssrRenderClass([{ open: unref(summaryOpen) }, "fa-solid fa-chevron-down chevron"])}" aria-hidden="true" data-v-4314de2a></i><strong data-v-4314de2a>${ssrInterpolate(formatPrice(unref(totalPriceCompute)))}</strong></button><form class="checkout-layout" novalidate data-v-4314de2a><div class="checkout-main" data-v-4314de2a><section class="step-block" data-v-4314de2a><h2 class="block-title" data-v-4314de2a><span class="block-num" data-v-4314de2a>1</span>${ssrInterpolate(_ctx.$t("checkout.contact"))}</h2><div class="row g-3" data-v-4314de2a><div class="col-sm-6" data-v-4314de2a><label class="field-label" for="co-first-name" data-v-4314de2a>${ssrInterpolate(_ctx.$t("form.firstName"))} <span class="req" data-v-4314de2a>*</span></label><input id="co-first-name"${ssrRenderAttr("value", unref(form).first_name)} class="form-control" autocomplete="given-name"${ssrRenderAttr("aria-invalid", !!unref(errors).first_name)}${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} data-v-4314de2a>`);
      if (unref(errors).first_name) {
        _push(`<p class="field-error" data-v-4314de2a>${ssrInterpolate(_ctx.$t(unref(errors).first_name))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-sm-6" data-v-4314de2a><label class="field-label" for="co-last-name" data-v-4314de2a>${ssrInterpolate(_ctx.$t("form.lastName"))} <span class="req" data-v-4314de2a>*</span></label><input id="co-last-name"${ssrRenderAttr("value", unref(form).last_name)} class="form-control" autocomplete="family-name"${ssrRenderAttr("aria-invalid", !!unref(errors).last_name)}${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} data-v-4314de2a>`);
      if (unref(errors).last_name) {
        _push(`<p class="field-error" data-v-4314de2a>${ssrInterpolate(_ctx.$t(unref(errors).last_name))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="col-md-6" data-v-4314de2a><label class="field-label" for="co-phone" data-v-4314de2a>${ssrInterpolate(_ctx.$t("form.phone"))} <span class="req" data-v-4314de2a>*</span></label><div class="input-icon" data-v-4314de2a><i class="iconly-Curved-Call" aria-hidden="true" data-v-4314de2a></i><input id="co-phone"${ssrRenderAttr("value", unref(form).phone)} type="tel" inputmode="numeric" autocomplete="tel-national" maxlength="10" placeholder="05XXXXXXXX" dir="ltr" class="form-control"${ssrRenderAttr("aria-invalid", !!unref(errors).phone)} aria-describedby="co-phone-hint"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} data-v-4314de2a></div>`);
      if (unref(errors).phone) {
        _push(`<p class="field-error" data-v-4314de2a>${ssrInterpolate(_ctx.$t(unref(errors).phone))}</p>`);
      } else {
        _push(`<p id="co-phone-hint" class="field-hint" data-v-4314de2a>${ssrInterpolate(_ctx.$t("checkout.phoneHint"))}</p>`);
      }
      _push(`</div><div class="col-md-6" data-v-4314de2a><label class="field-label" for="co-email" data-v-4314de2a>${ssrInterpolate(_ctx.$t("form.email"))} <span class="req" data-v-4314de2a>*</span></label><div class="input-icon" data-v-4314de2a><i class="iconly-Curved-Message" aria-hidden="true" data-v-4314de2a></i><input id="co-email"${ssrRenderAttr("value", unref(form).email)} type="email" inputmode="email" autocomplete="email" placeholder="exemple@gmail.com" dir="ltr" class="form-control"${ssrRenderAttr("aria-invalid", !!unref(errors).email)} aria-describedby="co-email-hint"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} data-v-4314de2a></div>`);
      if (unref(errors).email) {
        _push(`<p class="field-error" data-v-4314de2a>${ssrInterpolate(_ctx.$t(unref(errors).email))}</p>`);
      } else {
        _push(`<p id="co-email-hint" class="field-hint" data-v-4314de2a>${ssrInterpolate(_ctx.$t("checkout.emailHint"))}</p>`);
      }
      _push(`</div></div>`);
      if (!unref(noteOpen)) {
        _push(`<button type="button" class="add-note" data-v-4314de2a><i class="fa-solid fa-plus" aria-hidden="true" data-v-4314de2a></i> ${ssrInterpolate(_ctx.$t("product.addNote"))}</button>`);
      } else {
        _push(`<div class="note-field" data-v-4314de2a><label class="field-label" for="co-note" data-v-4314de2a>${ssrInterpolate(_ctx.$t("form.noteLabel"))}</label><textarea id="co-note"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""}${ssrRenderAttr("placeholder", _ctx.$t("form.notePlaceholder"))} class="form-control" rows="3" maxlength="500" data-v-4314de2a>${ssrInterpolate(unref(form).note)}</textarea></div>`);
      }
      _push(`</section><section class="step-block" data-v-4314de2a><h2 class="block-title" data-v-4314de2a><span class="block-num" data-v-4314de2a>2</span>${ssrInterpolate(_ctx.$t("payment.chooseMethod"))}</h2>`);
      _push(ssrRenderComponent(_component_PaymentMethodPicker, {
        modelValue: unref(payMethod),
        "onUpdate:modelValue": ($event) => isRef(payMethod) ? payMethod.value = $event : null,
        proof: unref(proof),
        "onUpdate:proof": ($event) => isRef(proof) ? proof.value = $event : null,
        total: unref(totalPriceCompute),
        "proof-error": unref(proofError),
        disabled: unref(isLoading)
      }, null, _parent));
      _push(`</section><section class="place-order" data-v-4314de2a><label class="${ssrRenderClass([{ invalid: unref(errors).terms }, "terms"])}" data-v-4314de2a><input type="checkbox" class="form-check-input"${ssrIncludeBooleanAttr(Array.isArray(unref(form).acceptedTerms) ? ssrLooseContain(unref(form).acceptedTerms, null) : unref(form).acceptedTerms) ? " checked" : ""}${ssrRenderAttr("aria-invalid", !!unref(errors).terms)} data-v-4314de2a><span data-v-4314de2a>${ssrInterpolate(_ctx.$t("checkout.terms"))}</span></label>`);
      if (unref(errors).terms) {
        _push(`<p class="field-error terms-error" data-v-4314de2a>${ssrInterpolate(_ctx.$t(unref(errors).terms))}</p>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(submitError)) {
        _push(`<div class="alert alert-danger rounded-3 small mb-3" role="alert" data-v-4314de2a>${ssrInterpolate(_ctx.$t(unref(submitErrorKey)))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit" class="btn btn-primary btn-lg btn-block submit-btn"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} data-v-4314de2a>`);
      if (unref(isLoading)) {
        _push(`<span class="spinner-border spinner-border-sm" aria-hidden="true" data-v-4314de2a></span>`);
      } else {
        _push(`<i class="fa-solid fa-lock" data-v-4314de2a></i>`);
      }
      if (unref(isRedirecting)) {
        _push(`<!--[-->${ssrInterpolate(_ctx.$t("product.redirecting"))}<!--]-->`);
      } else if (unref(isLoading)) {
        _push(`<!--[-->${ssrInterpolate(_ctx.$t("common.wait"))}<!--]-->`);
      } else if (unref(isManual)) {
        _push(`<!--[-->${ssrInterpolate(_ctx.$t("payment.sendOrder", { total: unref(foreignTotal) || formatPrice(unref(totalPriceCompute)) }))}<!--]-->`);
      } else {
        _push(`<!--[-->${ssrInterpolate(_ctx.$t("checkout.placeOrder", { total: formatPrice(unref(totalPriceCompute)) }))}<!--]-->`);
      }
      _push(`</button><p class="privacy" data-v-4314de2a>${ssrInterpolate(_ctx.$t("checkout.privacy"))}</p></section></div><aside id="checkout-summary" class="${ssrRenderClass([{ open: unref(summaryOpen) }, "checkout-summary"])}" data-v-4314de2a><div class="summary-head" data-v-4314de2a><h2 data-v-4314de2a>${ssrInterpolate(_ctx.$t("checkout.yourOrder"))} <span class="muted" data-v-4314de2a>(${ssrInterpolate(unref(itemsCount))})</span></h2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/cart",
        class: "edit-link"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("checkout.editCart"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("checkout.editCart")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><ul class="summary-items" data-v-4314de2a><!--[-->`);
      ssrRenderList(unref(items), (item) => {
        var _a;
        _push(`<li data-v-4314de2a><span class="thumb" data-v-4314de2a>`);
        _push(ssrRenderComponent(_component_ProductThumb, {
          src: item.image,
          alt: item.name,
          size: 60,
          loading: "eager"
        }, null, _parent));
        _push(`<span class="qty-badge" data-v-4314de2a>${ssrInterpolate(item.quantity)}</span></span><span class="summary-name" data-v-4314de2a>${ssrInterpolate(item.name)} `);
        if ((_a = item.variation) == null ? void 0 : _a.length) {
          _push(`<small data-v-4314de2a>${ssrInterpolate(item.variation.map((v) => v.value).join(" \xB7 "))}</small>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</span><span class="summary-price" data-v-4314de2a>${ssrInterpolate(formatPrice(Number(item.price) * item.quantity))}</span></li>`);
      });
      _push(`<!--]--></ul><div class="summary-row" data-v-4314de2a><span data-v-4314de2a>${ssrInterpolate(_ctx.$t("common.subtotal"))}</span><span data-v-4314de2a>${ssrInterpolate(formatPrice(unref(subTotal)))}</span></div><div class="summary-row" data-v-4314de2a><span data-v-4314de2a>${ssrInterpolate(_ctx.$t("checkout.deliveryLabel"))}</span><span class="free" data-v-4314de2a>${ssrInterpolate(_ctx.$t("checkout.deliveryEmail"))}</span></div><div class="summary-total" data-v-4314de2a><span data-v-4314de2a>${ssrInterpolate(_ctx.$t("common.total"))}</span><strong data-v-4314de2a>${ssrInterpolate(formatPrice(unref(totalPriceCompute)))}</strong></div></aside></form></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/checkout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const checkout = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4314de2a"]]);

export { checkout as default };
//# sourceMappingURL=checkout-Dbcv2bxn.mjs.map
