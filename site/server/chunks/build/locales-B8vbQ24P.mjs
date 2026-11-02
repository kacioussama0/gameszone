import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { d as _export_sfc } from './server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "OrderStatus",
  __ssrInlineRender: true,
  props: {
    status: {}
  },
  setup(__props) {
    const props = __props;
    const TONES = {
      pending: "warn",
      "on-hold": "warn",
      failed: "danger",
      cancelled: "muted",
      refunded: "muted",
      processing: "info",
      completed: "success"
    };
    const tone = computed(() => TONES[props.status] || "muted");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<span${ssrRenderAttrs(mergeProps({
        class: ["order-status", `is-${unref(tone)}`]
      }, _attrs))} data-v-2d794a36><span class="dot" aria-hidden="true" data-v-2d794a36></span> ${ssrInterpolate(_ctx.$te(`account.status.${__props.status}`) ? _ctx.$t(`account.status.${__props.status}`) : __props.status)}</span>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/OrderStatus.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-2d794a36"]]);
const DATE_LOCALES = {
  fr: "fr-FR",
  ar: "ar-DZ",
  en: "en-GB"
};

export { DATE_LOCALES as D, __nuxt_component_3 as _ };
//# sourceMappingURL=locales-B8vbQ24P.mjs.map
