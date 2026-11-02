import { _ as __nuxt_component_0, a as __nuxt_component_1 } from './GoogleLoginButton-Biioz1kX.mjs';
import { d as _export_sfc, a as useI18n, f as useRoute, h as useAccount, b as useHead, _ as __nuxt_component_2$1, D as useRuntimeConfig, E as navigateTo } from './server.mjs';
import { defineComponent, reactive, ref, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, withModifiers, withDirectives, vModelText, openBlock, createBlock, createCommentVNode, vModelDynamic, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderDynamicModel, ssrRenderClass } from 'vue/server-renderer';
import { z } from 'zod';
import { s as safeRedirect } from './redirect-Dg53C-C6.mjs';
import './Header3-s4pCF4HI.mjs';
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const route = useRoute();
    const config = useRuntimeConfig();
    const { login: login2 } = useAccount();
    useHead({
      title: () => t("account.loginTitle"),
      meta: [{ name: "robots", content: "noindex, follow" }]
    });
    const schema = z.object({
      email: z.string().trim().email("form.errors.emailInvalid"),
      password: z.string().min(1, "account.errors.passwordRequired")
    });
    const form = reactive({ email: "", password: "" });
    const errors = ref({});
    const submitError = ref(route.query.error === "google" ? "account.errors.google" : "");
    const isLoading = ref(false);
    const showPassword = ref(false);
    const redirectTo = computed(() => safeRedirect(route.query.redirect));
    const fromCheckout = computed(() => redirectTo.value.startsWith("/checkout"));
    const lostPasswordUrl = computed(() => `${String(config.public.wpUrl).replace(/\/$/, "")}/wp-login.php?action=lostpassword`);
    const submit = async () => {
      var _a;
      submitError.value = "";
      const result = schema.safeParse(form);
      errors.value = {};
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          const key = String(issue.path[0]);
          if (!errors.value[key]) errors.value[key] = issue.message;
        });
        return;
      }
      isLoading.value = true;
      try {
        await login2({ email: form.email.trim(), password: form.password });
        await navigateTo(redirectTo.value);
      } catch (e) {
        const status = (_a = e == null ? void 0 : e.response) == null ? void 0 : _a.status;
        submitError.value = status === 401 ? "account.errors.badCredentials" : status === 429 ? "account.errors.tooMany" : "account.errors.unavailable";
      } finally {
        isLoading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AuthShell = __nuxt_component_0;
      const _component_GoogleLoginButton = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_2$1;
      _push(ssrRenderComponent(_component_AuthShell, mergeProps({
        title: _ctx.$t("account.loginTitle"),
        subtitle: unref(fromCheckout) ? _ctx.$t("account.checkoutNotice") : _ctx.$t("account.loginSubtitle")
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_GoogleLoginButton, { redirect: unref(redirectTo) }, null, _parent2, _scopeId));
            _push2(`<form class="gz-form auth-form" novalidate data-v-e4951342${_scopeId}><div data-v-e4951342${_scopeId}><label class="field-label" for="login-email" data-v-e4951342${_scopeId}>${ssrInterpolate(_ctx.$t("form.email"))}</label><div class="input-icon" data-v-e4951342${_scopeId}><i class="iconly-Curved-Message" aria-hidden="true" data-v-e4951342${_scopeId}></i><input id="login-email"${ssrRenderAttr("value", unref(form).email)} type="email" inputmode="email" autocomplete="email" dir="ltr" class="form-control"${ssrRenderAttr("aria-invalid", !!unref(errors).email)}${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} data-v-e4951342${_scopeId}></div>`);
            if (unref(errors).email) {
              _push2(`<p class="field-error" data-v-e4951342${_scopeId}>${ssrInterpolate(_ctx.$t(unref(errors).email))}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-e4951342${_scopeId}><div class="label-row" data-v-e4951342${_scopeId}><label class="field-label" for="login-password" data-v-e4951342${_scopeId}>${ssrInterpolate(_ctx.$t("account.password"))}</label><a${ssrRenderAttr("href", unref(lostPasswordUrl))} class="small-link" target="_blank" rel="noopener" data-v-e4951342${_scopeId}>${ssrInterpolate(_ctx.$t("account.forgot"))}</a></div><div class="input-icon" data-v-e4951342${_scopeId}><i class="iconly-Curved-Lock" aria-hidden="true" data-v-e4951342${_scopeId}></i><input id="login-password"${ssrRenderDynamicModel(unref(showPassword) ? "text" : "password", unref(form).password, null)}${ssrRenderAttr("type", unref(showPassword) ? "text" : "password")} autocomplete="current-password" class="form-control"${ssrRenderAttr("aria-invalid", !!unref(errors).password)}${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} data-v-e4951342${_scopeId}><button type="button" class="eye-btn"${ssrRenderAttr("aria-label", _ctx.$t(unref(showPassword) ? "account.hidePassword" : "account.showPassword"))}${ssrRenderAttr("aria-pressed", unref(showPassword))} data-v-e4951342${_scopeId}><i class="${ssrRenderClass(unref(showPassword) ? "fa-regular fa-eye-slash" : "fa-regular fa-eye")}" data-v-e4951342${_scopeId}></i></button></div>`);
            if (unref(errors).password) {
              _push2(`<p class="field-error" data-v-e4951342${_scopeId}>${ssrInterpolate(_ctx.$t(unref(errors).password))}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (unref(submitError)) {
              _push2(`<div class="alert alert-danger rounded-3 small mb-0" role="alert" data-v-e4951342${_scopeId}>${ssrInterpolate(_ctx.$t(unref(submitError)))}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button type="submit" class="btn btn-primary btn-lg btn-block"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} data-v-e4951342${_scopeId}>`);
            if (unref(isLoading)) {
              _push2(`<span class="spinner-border spinner-border-sm" aria-hidden="true" data-v-e4951342${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(unref(isLoading) ? _ctx.$t("common.wait") : _ctx.$t("account.login"))}</button></form><p class="switch" data-v-e4951342${_scopeId}>${ssrInterpolate(_ctx.$t("account.noAccount"))} `);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: { path: "/account/register", query: unref(route).query.redirect ? { redirect: unref(redirectTo) } : {} }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("account.createAccount"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("account.createAccount")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</p>`);
          } else {
            return [
              createVNode(_component_GoogleLoginButton, { redirect: unref(redirectTo) }, null, 8, ["redirect"]),
              createVNode("form", {
                class: "gz-form auth-form",
                novalidate: "",
                onSubmit: withModifiers(submit, ["prevent"])
              }, [
                createVNode("div", null, [
                  createVNode("label", {
                    class: "field-label",
                    for: "login-email"
                  }, toDisplayString(_ctx.$t("form.email")), 1),
                  createVNode("div", { class: "input-icon" }, [
                    createVNode("i", {
                      class: "iconly-Curved-Message",
                      "aria-hidden": "true"
                    }),
                    withDirectives(createVNode("input", {
                      id: "login-email",
                      "onUpdate:modelValue": ($event) => unref(form).email = $event,
                      type: "email",
                      inputmode: "email",
                      autocomplete: "email",
                      dir: "ltr",
                      class: "form-control",
                      "aria-invalid": !!unref(errors).email,
                      disabled: unref(isLoading)
                    }, null, 8, ["onUpdate:modelValue", "aria-invalid", "disabled"]), [
                      [vModelText, unref(form).email]
                    ])
                  ]),
                  unref(errors).email ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "field-error"
                  }, toDisplayString(_ctx.$t(unref(errors).email)), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", null, [
                  createVNode("div", { class: "label-row" }, [
                    createVNode("label", {
                      class: "field-label",
                      for: "login-password"
                    }, toDisplayString(_ctx.$t("account.password")), 1),
                    createVNode("a", {
                      href: unref(lostPasswordUrl),
                      class: "small-link",
                      target: "_blank",
                      rel: "noopener"
                    }, toDisplayString(_ctx.$t("account.forgot")), 9, ["href"])
                  ]),
                  createVNode("div", { class: "input-icon" }, [
                    createVNode("i", {
                      class: "iconly-Curved-Lock",
                      "aria-hidden": "true"
                    }),
                    withDirectives(createVNode("input", {
                      id: "login-password",
                      "onUpdate:modelValue": ($event) => unref(form).password = $event,
                      type: unref(showPassword) ? "text" : "password",
                      autocomplete: "current-password",
                      class: "form-control",
                      "aria-invalid": !!unref(errors).password,
                      disabled: unref(isLoading)
                    }, null, 8, ["onUpdate:modelValue", "type", "aria-invalid", "disabled"]), [
                      [vModelDynamic, unref(form).password]
                    ]),
                    createVNode("button", {
                      type: "button",
                      class: "eye-btn",
                      "aria-label": _ctx.$t(unref(showPassword) ? "account.hidePassword" : "account.showPassword"),
                      "aria-pressed": unref(showPassword),
                      onClick: ($event) => showPassword.value = !unref(showPassword)
                    }, [
                      createVNode("i", {
                        class: unref(showPassword) ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"
                      }, null, 2)
                    ], 8, ["aria-label", "aria-pressed", "onClick"])
                  ]),
                  unref(errors).password ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "field-error"
                  }, toDisplayString(_ctx.$t(unref(errors).password)), 1)) : createCommentVNode("", true)
                ]),
                unref(submitError) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "alert alert-danger rounded-3 small mb-0",
                  role: "alert"
                }, toDisplayString(_ctx.$t(unref(submitError))), 1)) : createCommentVNode("", true),
                createVNode("button", {
                  type: "submit",
                  class: "btn btn-primary btn-lg btn-block",
                  disabled: unref(isLoading)
                }, [
                  unref(isLoading) ? (openBlock(), createBlock("span", {
                    key: 0,
                    class: "spinner-border spinner-border-sm",
                    "aria-hidden": "true"
                  })) : createCommentVNode("", true),
                  createTextVNode(" " + toDisplayString(unref(isLoading) ? _ctx.$t("common.wait") : _ctx.$t("account.login")), 1)
                ], 8, ["disabled"])
              ], 32),
              createVNode("p", { class: "switch" }, [
                createTextVNode(toDisplayString(_ctx.$t("account.noAccount")) + " ", 1),
                createVNode(_component_NuxtLink, {
                  to: { path: "/account/register", query: unref(route).query.redirect ? { redirect: unref(redirectTo) } : {} }
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("account.createAccount")), 1)
                  ]),
                  _: 1
                }, 8, ["to"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const login = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e4951342"]]);

export { login as default };
//# sourceMappingURL=login-9kohcN5-.mjs.map
