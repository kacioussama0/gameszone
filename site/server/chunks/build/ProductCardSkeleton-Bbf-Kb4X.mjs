import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs } from 'vue/server-renderer';
import { d as _export_sfc } from './server.mjs';

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "product-card-skeleton placeholder-glow",
    "aria-hidden": "true"
  }, _attrs))} data-v-bca95d00><span class="placeholder skeleton-media" data-v-bca95d00></span><div class="skeleton-body" data-v-bca95d00><span class="placeholder col-3 placeholder-xs" data-v-bca95d00></span><span class="placeholder col-12" data-v-bca95d00></span><span class="placeholder col-8" data-v-bca95d00></span><span class="placeholder col-5 mt-1" data-v-bca95d00></span></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductCardSkeleton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-bca95d00"]]);

export { __nuxt_component_1 as _ };
//# sourceMappingURL=ProductCardSkeleton-Bbf-Kb4X.mjs.map
