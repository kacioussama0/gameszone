import { _ as __nuxt_component_0, a as __nuxt_component_1 } from './GoogleLoginButton-Biioz1kX.mjs';
import { d as _export_sfc, a as useI18n, f as useRoute, h as useAccount, b as useHead, _ as __nuxt_component_2$1, E as navigateTo } from './server.mjs';
import { defineComponent, reactive, ref, computed, watch, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, withModifiers, withDirectives, vModelText, openBlock, createBlock, createCommentVNode, vModelDynamic, vModelCheckbox, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderDynamicModel, ssrRenderClass, ssrLooseContain } from 'vue/server-renderer';
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
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const { t } = useI18n();
    const route = useRoute();
    const { register: register2 } = useAccount();
    useHead({
      title: () => t("account.registerTitle"),
      meta: [{ name: "robots", content: "noindex, follow" }]
    });
    const schema = z.object({
      first_name: z.string().trim().min(2, "form.errors.firstNameRequired").max(50),
      last_name: z.string().trim().min(2, "form.errors.lastNameRequired").max(50),
      email: z.string().trim().email("form.errors.emailInvalid"),
      phone: z.string().regex(/^(05|06|07)[0-9]{8}$/, "form.errors.phoneInvalid"),
      password: z.string().min(8, "account.errors.passwordShort"),
      terms: z.boolean().refine((v) => v, "form.errors.termsRequired")
    });
    const form = reactive({ first_name: "", last_name: "", email: "", phone: "", password: "", terms: false });
    const errors = ref({});
    const submitError = ref("");
    const isLoading = ref(false);
    const showPassword = ref(false);
    const redirectTo = computed(() => safeRedirect(route.query.redirect));
    const fromCheckout = computed(() => redirectTo.value.startsWith("/checkout"));
    watch(() => form.phone, (value) => {
      const digits = value.replace(/\D/g, "").slice(0, 10);
      if (digits !== value) form.phone = digits;
    });
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
        await register2({
          first_name: form.first_name.trim(),
          last_name: form.last_name.trim(),
          email: form.email.trim(),
          phone: form.phone,
          password: form.password
        });
        await navigateTo(redirectTo.value);
      } catch (e) {
        const status = (_a = e == null ? void 0 : e.response) == null ? void 0 : _a.status;
        if (status === 409) errors.value.email = "account.errors.emailTaken";
        else submitError.value = status === 429 ? "account.errors.tooMany" : "account.errors.registerFailed";
      } finally {
        isLoading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AuthShell = __nuxt_component_0;
      const _component_GoogleLoginButton = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_2$1;
      _push(ssrRenderComponent(_component_AuthShell, mergeProps({
        title: _ctx.$t("account.registerTitle"),
        subtitle: unref(fromCheckout) ? _ctx.$t("account.checkoutNotice") : _ctx.$t("account.registerSubtitle")
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_GoogleLoginButton, { redirect: unref(redirectTo) }, null, _parent2, _scopeId));
            _push2(`<form class="gz-form auth-form" novalidate data-v-5c9941cf${_scopeId}><div class="row g-3" data-v-5c9941cf${_scopeId}><div class="col-sm-6" data-v-5c9941cf${_scopeId}><label class="field-label" for="reg-first" data-v-5c9941cf${_scopeId}>${ssrInterpolate(_ctx.$t("form.firstName"))}</label><input id="reg-first"${ssrRenderAttr("value", unref(form).first_name)} class="form-control" autocomplete="given-name"${ssrRenderAttr("aria-invalid", !!unref(errors).first_name)}${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} data-v-5c9941cf${_scopeId}>`);
            if (unref(errors).first_name) {
              _push2(`<p class="field-error" data-v-5c9941cf${_scopeId}>${ssrInterpolate(_ctx.$t(unref(errors).first_name))}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="col-sm-6" data-v-5c9941cf${_scopeId}><label class="field-label" for="reg-last" data-v-5c9941cf${_scopeId}>${ssrInterpolate(_ctx.$t("form.lastName"))}</label><input id="reg-last"${ssrRenderAttr("value", unref(form).last_name)} class="form-control" autocomplete="family-name"${ssrRenderAttr("aria-invalid", !!unref(errors).last_name)}${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} data-v-5c9941cf${_scopeId}>`);
            if (unref(errors).last_name) {
              _push2(`<p class="field-error" data-v-5c9941cf${_scopeId}>${ssrInterpolate(_ctx.$t(unref(errors).last_name))}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div data-v-5c9941cf${_scopeId}><label class="field-label" for="reg-email" data-v-5c9941cf${_scopeId}>${ssrInterpolate(_ctx.$t("form.email"))}</label><div class="input-icon" data-v-5c9941cf${_scopeId}><i class="iconly-Curved-Message" aria-hidden="true" data-v-5c9941cf${_scopeId}></i><input id="reg-email"${ssrRenderAttr("value", unref(form).email)} type="email" inputmode="email" autocomplete="email" dir="ltr" class="form-control"${ssrRenderAttr("aria-invalid", !!unref(errors).email)} aria-describedby="reg-email-hint"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} data-v-5c9941cf${_scopeId}></div>`);
            if (unref(errors).email) {
              _push2(`<p class="field-error" data-v-5c9941cf${_scopeId}>${ssrInterpolate(_ctx.$t(unref(errors).email))} `);
              if (unref(errors).email === "account.errors.emailTaken") {
                _push2(ssrRenderComponent(_component_NuxtLink, { to: "/account/login" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(_ctx.$t("account.login"))}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(_ctx.$t("account.login")), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</p>`);
            } else {
              _push2(`<p id="reg-email-hint" class="field-hint" data-v-5c9941cf${_scopeId}>${ssrInterpolate(_ctx.$t("checkout.emailHint"))}</p>`);
            }
            _push2(`</div><div data-v-5c9941cf${_scopeId}><label class="field-label" for="reg-phone" data-v-5c9941cf${_scopeId}>${ssrInterpolate(_ctx.$t("form.phone"))}</label><div class="input-icon" data-v-5c9941cf${_scopeId}><i class="iconly-Curved-Call" aria-hidden="true" data-v-5c9941cf${_scopeId}></i><input id="reg-phone"${ssrRenderAttr("value", unref(form).phone)} type="tel" inputmode="numeric" autocomplete="tel-national" maxlength="10" placeholder="05XXXXXXXX" dir="ltr" class="form-control"${ssrRenderAttr("aria-invalid", !!unref(errors).phone)}${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} data-v-5c9941cf${_scopeId}></div>`);
            if (unref(errors).phone) {
              _push2(`<p class="field-error" data-v-5c9941cf${_scopeId}>${ssrInterpolate(_ctx.$t(unref(errors).phone))}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-5c9941cf${_scopeId}><label class="field-label" for="reg-password" data-v-5c9941cf${_scopeId}>${ssrInterpolate(_ctx.$t("account.password"))}</label><div class="input-icon" data-v-5c9941cf${_scopeId}><i class="iconly-Curved-Lock" aria-hidden="true" data-v-5c9941cf${_scopeId}></i><input id="reg-password"${ssrRenderDynamicModel(unref(showPassword) ? "text" : "password", unref(form).password, null)}${ssrRenderAttr("type", unref(showPassword) ? "text" : "password")} autocomplete="new-password" class="form-control"${ssrRenderAttr("aria-invalid", !!unref(errors).password)} aria-describedby="reg-password-hint"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} data-v-5c9941cf${_scopeId}><button type="button" class="eye-btn"${ssrRenderAttr("aria-label", _ctx.$t(unref(showPassword) ? "account.hidePassword" : "account.showPassword"))}${ssrRenderAttr("aria-pressed", unref(showPassword))} data-v-5c9941cf${_scopeId}><i class="${ssrRenderClass(unref(showPassword) ? "fa-regular fa-eye-slash" : "fa-regular fa-eye")}" data-v-5c9941cf${_scopeId}></i></button></div>`);
            if (unref(errors).password) {
              _push2(`<p class="field-error" data-v-5c9941cf${_scopeId}>${ssrInterpolate(_ctx.$t(unref(errors).password))}</p>`);
            } else {
              _push2(`<p id="reg-password-hint" class="field-hint" data-v-5c9941cf${_scopeId}>${ssrInterpolate(_ctx.$t("account.passwordHint"))}</p>`);
            }
            _push2(`</div><label class="terms" data-v-5c9941cf${_scopeId}><input type="checkbox" class="form-check-input"${ssrIncludeBooleanAttr(Array.isArray(unref(form).terms) ? ssrLooseContain(unref(form).terms, null) : unref(form).terms) ? " checked" : ""}${ssrRenderAttr("aria-invalid", !!unref(errors).terms)} data-v-5c9941cf${_scopeId}><span data-v-5c9941cf${_scopeId}>${ssrInterpolate(_ctx.$t("checkout.terms"))}</span></label>`);
            if (unref(errors).terms) {
              _push2(`<p class="field-error mt-n2" data-v-5c9941cf${_scopeId}>${ssrInterpolate(_ctx.$t(unref(errors).terms))}</p>`);
            } else {
              _push2(`<!---->`);
            }
            if (unref(submitError)) {
              _push2(`<div class="alert alert-danger rounded-3 small mb-0" role="alert" data-v-5c9941cf${_scopeId}>${ssrInterpolate(_ctx.$t(unref(submitError)))}</div>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<button type="submit" class="btn btn-primary btn-lg btn-block"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} data-v-5c9941cf${_scopeId}>`);
            if (unref(isLoading)) {
              _push2(`<span class="spinner-border spinner-border-sm" aria-hidden="true" data-v-5c9941cf${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(unref(isLoading) ? _ctx.$t("common.wait") : _ctx.$t("account.createAccount"))}</button></form><p class="switch" data-v-5c9941cf${_scopeId}>${ssrInterpolate(_ctx.$t("account.haveAccount"))} `);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: { path: "/account/login", query: unref(route).query.redirect ? { redirect: unref(redirectTo) } : {} }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("account.login"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("account.login")), 1)
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
                createVNode("div", { class: "row g-3" }, [
                  createVNode("div", { class: "col-sm-6" }, [
                    createVNode("label", {
                      class: "field-label",
                      for: "reg-first"
                    }, toDisplayString(_ctx.$t("form.firstName")), 1),
                    withDirectives(createVNode("input", {
                      id: "reg-first",
                      "onUpdate:modelValue": ($event) => unref(form).first_name = $event,
                      class: "form-control",
                      autocomplete: "given-name",
                      "aria-invalid": !!unref(errors).first_name,
                      disabled: unref(isLoading)
                    }, null, 8, ["onUpdate:modelValue", "aria-invalid", "disabled"]), [
                      [vModelText, unref(form).first_name]
                    ]),
                    unref(errors).first_name ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "field-error"
                    }, toDisplayString(_ctx.$t(unref(errors).first_name)), 1)) : createCommentVNode("", true)
                  ]),
                  createVNode("div", { class: "col-sm-6" }, [
                    createVNode("label", {
                      class: "field-label",
                      for: "reg-last"
                    }, toDisplayString(_ctx.$t("form.lastName")), 1),
                    withDirectives(createVNode("input", {
                      id: "reg-last",
                      "onUpdate:modelValue": ($event) => unref(form).last_name = $event,
                      class: "form-control",
                      autocomplete: "family-name",
                      "aria-invalid": !!unref(errors).last_name,
                      disabled: unref(isLoading)
                    }, null, 8, ["onUpdate:modelValue", "aria-invalid", "disabled"]), [
                      [vModelText, unref(form).last_name]
                    ]),
                    unref(errors).last_name ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "field-error"
                    }, toDisplayString(_ctx.$t(unref(errors).last_name)), 1)) : createCommentVNode("", true)
                  ])
                ]),
                createVNode("div", null, [
                  createVNode("label", {
                    class: "field-label",
                    for: "reg-email"
                  }, toDisplayString(_ctx.$t("form.email")), 1),
                  createVNode("div", { class: "input-icon" }, [
                    createVNode("i", {
                      class: "iconly-Curved-Message",
                      "aria-hidden": "true"
                    }),
                    withDirectives(createVNode("input", {
                      id: "reg-email",
                      "onUpdate:modelValue": ($event) => unref(form).email = $event,
                      type: "email",
                      inputmode: "email",
                      autocomplete: "email",
                      dir: "ltr",
                      class: "form-control",
                      "aria-invalid": !!unref(errors).email,
                      "aria-describedby": "reg-email-hint",
                      disabled: unref(isLoading)
                    }, null, 8, ["onUpdate:modelValue", "aria-invalid", "disabled"]), [
                      [vModelText, unref(form).email]
                    ])
                  ]),
                  unref(errors).email ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "field-error"
                  }, [
                    createTextVNode(toDisplayString(_ctx.$t(unref(errors).email)) + " ", 1),
                    unref(errors).email === "account.errors.emailTaken" ? (openBlock(), createBlock(_component_NuxtLink, {
                      key: 0,
                      to: "/account/login"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.$t("account.login")), 1)
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ])) : (openBlock(), createBlock("p", {
                    key: 1,
                    id: "reg-email-hint",
                    class: "field-hint"
                  }, toDisplayString(_ctx.$t("checkout.emailHint")), 1))
                ]),
                createVNode("div", null, [
                  createVNode("label", {
                    class: "field-label",
                    for: "reg-phone"
                  }, toDisplayString(_ctx.$t("form.phone")), 1),
                  createVNode("div", { class: "input-icon" }, [
                    createVNode("i", {
                      class: "iconly-Curved-Call",
                      "aria-hidden": "true"
                    }),
                    withDirectives(createVNode("input", {
                      id: "reg-phone",
                      "onUpdate:modelValue": ($event) => unref(form).phone = $event,
                      type: "tel",
                      inputmode: "numeric",
                      autocomplete: "tel-national",
                      maxlength: "10",
                      placeholder: "05XXXXXXXX",
                      dir: "ltr",
                      class: "form-control",
                      "aria-invalid": !!unref(errors).phone,
                      disabled: unref(isLoading)
                    }, null, 8, ["onUpdate:modelValue", "aria-invalid", "disabled"]), [
                      [vModelText, unref(form).phone]
                    ])
                  ]),
                  unref(errors).phone ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "field-error"
                  }, toDisplayString(_ctx.$t(unref(errors).phone)), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", null, [
                  createVNode("label", {
                    class: "field-label",
                    for: "reg-password"
                  }, toDisplayString(_ctx.$t("account.password")), 1),
                  createVNode("div", { class: "input-icon" }, [
                    createVNode("i", {
                      class: "iconly-Curved-Lock",
                      "aria-hidden": "true"
                    }),
                    withDirectives(createVNode("input", {
                      id: "reg-password",
                      "onUpdate:modelValue": ($event) => unref(form).password = $event,
                      type: unref(showPassword) ? "text" : "password",
                      autocomplete: "new-password",
                      class: "form-control",
                      "aria-invalid": !!unref(errors).password,
                      "aria-describedby": "reg-password-hint",
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
                  }, toDisplayString(_ctx.$t(unref(errors).password)), 1)) : (openBlock(), createBlock("p", {
                    key: 1,
                    id: "reg-password-hint",
                    class: "field-hint"
                  }, toDisplayString(_ctx.$t("account.passwordHint")), 1))
                ]),
                createVNode("label", { class: "terms" }, [
                  withDirectives(createVNode("input", {
                    type: "checkbox",
                    class: "form-check-input",
                    "onUpdate:modelValue": ($event) => unref(form).terms = $event,
                    "aria-invalid": !!unref(errors).terms
                  }, null, 8, ["onUpdate:modelValue", "aria-invalid"]), [
                    [vModelCheckbox, unref(form).terms]
                  ]),
                  createVNode("span", null, toDisplayString(_ctx.$t("checkout.terms")), 1)
                ]),
                unref(errors).terms ? (openBlock(), createBlock("p", {
                  key: 0,
                  class: "field-error mt-n2"
                }, toDisplayString(_ctx.$t(unref(errors).terms)), 1)) : createCommentVNode("", true),
                unref(submitError) ? (openBlock(), createBlock("div", {
                  key: 1,
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
                  createTextVNode(" " + toDisplayString(unref(isLoading) ? _ctx.$t("common.wait") : _ctx.$t("account.createAccount")), 1)
                ], 8, ["disabled"])
              ], 32),
              createVNode("p", { class: "switch" }, [
                createTextVNode(toDisplayString(_ctx.$t("account.haveAccount")) + " ", 1),
                createVNode(_component_NuxtLink, {
                  to: { path: "/account/login", query: unref(route).query.redirect ? { redirect: unref(redirectTo) } : {} }
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("account.login")), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const register = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5c9941cf"]]);

export { register as default };
//# sourceMappingURL=register-D4T7PU60.mjs.map
