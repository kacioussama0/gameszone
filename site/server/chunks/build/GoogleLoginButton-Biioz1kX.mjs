import { d as _export_sfc, c as __nuxt_component_1$1, D as useRuntimeConfig } from './server.mjs';
import { defineComponent, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderSlot, ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { H as Header3 } from './Header3-s4pCF4HI.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AuthShell",
  __ssrInlineRender: true,
  props: {
    title: {},
    subtitle: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AstroBot = __nuxt_component_1$1;
      _push(`<!--[--><header class="site-header mo-left header style-2" data-v-1dba3d94>`);
      _push(ssrRenderComponent(Header3, null, null, _parent));
      _push(`</header><div class="page-content auth-page gz-pattern" data-v-1dba3d94><div class="container" data-v-1dba3d94><section class="auth-card" data-v-1dba3d94><div class="auth-head" data-v-1dba3d94>`);
      _push(ssrRenderComponent(_component_AstroBot, {
        mood: "happy",
        size: 76
      }, null, _parent));
      _push(`<h1 data-v-1dba3d94>${ssrInterpolate(__props.title)}</h1>`);
      if (__props.subtitle) {
        _push(`<p data-v-1dba3d94>${ssrInterpolate(__props.subtitle)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</section>`);
      ssrRenderSlot(_ctx.$slots, "after", {}, null, _push, _parent);
      _push(`</div></div><!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AuthShell.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-1dba3d94"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "GoogleLoginButton",
  __ssrInlineRender: true,
  props: {
    redirect: {}
  },
  setup(__props) {
    const props = __props;
    const enabled = !!useRuntimeConfig().public.googleLogin;
    const href = computed(() => `/api/auth/google?redirect=${encodeURIComponent(props.redirect)}`);
    return (_ctx, _push, _parent, _attrs) => {
      if (enabled) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "google-login" }, _attrs))} data-v-4c173bd7><a${ssrRenderAttr("href", unref(href))} class="google-btn" rel="nofollow" data-v-4c173bd7><svg viewBox="0 0 48 48" width="20" height="20" aria-hidden="true" data-v-4c173bd7><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" data-v-4c173bd7></path><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" data-v-4c173bd7></path><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" data-v-4c173bd7></path><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" data-v-4c173bd7></path></svg> ${ssrInterpolate(_ctx.$t("account.googleContinue"))}</a><p class="or" data-v-4c173bd7><span data-v-4c173bd7>${ssrInterpolate(_ctx.$t("account.or"))}</span></p></div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/GoogleLoginButton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4c173bd7"]]);

export { __nuxt_component_0 as _, __nuxt_component_1 as a };
//# sourceMappingURL=GoogleLoginButton-Biioz1kX.mjs.map
