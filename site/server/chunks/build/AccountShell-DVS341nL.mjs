import { d as _export_sfc, h as useAccount, f as useRoute, _ as __nuxt_component_2$1 } from './server.mjs';
import { defineComponent, ref, unref, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderSlot } from 'vue/server-renderer';
import { H as Header3 } from './Header3-s4pCF4HI.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AccountShell",
  __ssrInlineRender: true,
  props: {
    title: {}
  },
  setup(__props) {
    const { account, initials } = useAccount();
    const route = useRoute();
    const links = [
      { to: "/account", icon: "iconly-Curved-Home", label: "account.overview", exact: true },
      { to: "/account/orders", icon: "iconly-Curved-Bag", label: "account.orders" },
      { to: "/account/settings", icon: "iconly-Curved-Setting", label: "account.settings" }
    ];
    const isActive = (link) => link.exact ? route.path === link.to : route.path.startsWith(link.to);
    const isLeaving = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_NuxtLink = __nuxt_component_2$1;
      _push(`<!--[--><header class="site-header mo-left header style-2" data-v-5af871c4>`);
      _push(ssrRenderComponent(Header3, null, null, _parent));
      _push(`</header><div class="page-content bg-light" data-v-5af871c4><div class="content-inner account-page" data-v-5af871c4><div class="container account-layout" data-v-5af871c4><aside class="account-side" data-v-5af871c4><div class="who" data-v-5af871c4><span class="avatar" aria-hidden="true" data-v-5af871c4>${ssrInterpolate(unref(initials))}</span><span class="who-text" data-v-5af871c4><b data-v-5af871c4>${ssrInterpolate((_a = unref(account)) == null ? void 0 : _a.first_name)} ${ssrInterpolate((_b = unref(account)) == null ? void 0 : _b.last_name)}</b><small dir="ltr" data-v-5af871c4>${ssrInterpolate((_c = unref(account)) == null ? void 0 : _c.email)}</small></span></div><nav class="side-nav"${ssrRenderAttr("aria-label", _ctx.$t("account.menu"))} data-v-5af871c4><!--[-->`);
      ssrRenderList(links, (link) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: link.to,
          to: link.to,
          class: ["side-link", { active: isActive(link) }],
          "aria-current": isActive(link) ? "page" : void 0
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="${ssrRenderClass(link.icon)}" aria-hidden="true" data-v-5af871c4${_scopeId}></i>${ssrInterpolate(_ctx.$t(link.label))}`);
            } else {
              return [
                createVNode("i", {
                  class: link.icon,
                  "aria-hidden": "true"
                }, null, 2),
                createTextVNode(toDisplayString(_ctx.$t(link.label)), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--><button type="button" class="side-link logout"${ssrIncludeBooleanAttr(unref(isLeaving)) ? " disabled" : ""} data-v-5af871c4><i class="iconly-Curved-Logout" aria-hidden="true" data-v-5af871c4></i>${ssrInterpolate(_ctx.$t("account.logout"))}</button></nav></aside><main class="account-main" data-v-5af871c4><h1 class="account-title" data-v-5af871c4>${ssrInterpolate(__props.title)}</h1>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main></div></div></div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AccountShell.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5af871c4"]]);

export { __nuxt_component_0 as _ };
//# sourceMappingURL=AccountShell-DVS341nL.mjs.map
