import { _ as __nuxt_component_0 } from './AccountShell-DVS341nL.mjs';
import { defineComponent, reactive, ref, watch, mergeProps, withCtx, unref, createVNode, toDisplayString, withModifiers, withDirectives, vModelText, openBlock, createBlock, createCommentVNode, createTextVNode, Fragment, vModelDynamic, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderDynamicModel } from 'vue/server-renderer';
import { z } from 'zod';
import { d as _export_sfc, a as useI18n, h as useAccount, b as useHead } from './server.mjs';
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
  __name: "settings",
  __ssrInlineRender: true,
  setup(__props) {
    var _a, _b, _c;
    const { t } = useI18n();
    const { account } = useAccount();
    useHead({
      title: () => t("account.settings"),
      meta: [{ name: "robots", content: "noindex" }]
    });
    const profileSchema = z.object({
      first_name: z.string().trim().min(2, "form.errors.firstNameRequired").max(50),
      last_name: z.string().trim().min(2, "form.errors.lastNameRequired").max(50),
      phone: z.string().regex(/^(05|06|07)[0-9]{8}$/, "form.errors.phoneInvalid")
    });
    const profile = reactive({
      first_name: ((_a = account.value) == null ? void 0 : _a.first_name) || "",
      last_name: ((_b = account.value) == null ? void 0 : _b.last_name) || "",
      phone: ((_c = account.value) == null ? void 0 : _c.phone) || ""
    });
    const profileErrors = ref({});
    const profileState = ref("");
    watch(() => profile.phone, (value) => {
      const digits = value.replace(/\D/g, "").slice(0, 10);
      if (digits !== value) profile.phone = digits;
    });
    const saveProfile = async () => {
      const result = profileSchema.safeParse(profile);
      profileErrors.value = {};
      if (!result.success) {
        result.error.issues.forEach((issue) => {
          const key = String(issue.path[0]);
          if (!profileErrors.value[key]) profileErrors.value[key] = issue.message;
        });
        return;
      }
      profileState.value = "saving";
      try {
        const res = await $fetch("/api/account/profile", { method: "PUT", body: result.data });
        account.value = res.account;
        profileState.value = "saved";
      } catch {
        profileState.value = "error";
      }
    };
    const passwords = reactive({ current: "", next: "" });
    const passwordErrors = ref({});
    const passwordState = ref("");
    const showPasswords = ref(false);
    const savePassword = async () => {
      var _a2;
      passwordErrors.value = {};
      if (!passwords.current) passwordErrors.value.current = "account.errors.passwordRequired";
      if (passwords.next.length < 8) passwordErrors.value.next = "account.errors.passwordShort";
      if (Object.keys(passwordErrors.value).length) return;
      passwordState.value = "saving";
      try {
        await $fetch("/api/account/password", {
          method: "PUT",
          body: { current_password: passwords.current, new_password: passwords.next }
        });
        passwords.current = "";
        passwords.next = "";
        passwordState.value = "saved";
      } catch (e) {
        const status = (_a2 = e == null ? void 0 : e.response) == null ? void 0 : _a2.status;
        if (status === 403) {
          passwordErrors.value.current = "account.errors.wrongPassword";
          passwordState.value = "";
        } else {
          passwordState.value = "error";
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AccountShell = __nuxt_component_0;
      _push(ssrRenderComponent(_component_AccountShell, mergeProps({
        title: _ctx.$t("account.settings")
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a2, _b2;
          if (_push2) {
            _push2(`<div class="settings-grid" data-v-87cce95f${_scopeId}><section class="panel" data-v-87cce95f${_scopeId}><h2 class="panel-title" data-v-87cce95f${_scopeId}>${ssrInterpolate(_ctx.$t("account.profile"))}</h2><form class="gz-form stack" novalidate data-v-87cce95f${_scopeId}><div class="row g-3" data-v-87cce95f${_scopeId}><div class="col-sm-6" data-v-87cce95f${_scopeId}><label class="field-label" for="set-first" data-v-87cce95f${_scopeId}>${ssrInterpolate(_ctx.$t("form.firstName"))}</label><input id="set-first"${ssrRenderAttr("value", unref(profile).first_name)} class="form-control" autocomplete="given-name"${ssrRenderAttr("aria-invalid", !!unref(profileErrors).first_name)} data-v-87cce95f${_scopeId}>`);
            if (unref(profileErrors).first_name) {
              _push2(`<p class="field-error" data-v-87cce95f${_scopeId}>${ssrInterpolate(_ctx.$t(unref(profileErrors).first_name))}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="col-sm-6" data-v-87cce95f${_scopeId}><label class="field-label" for="set-last" data-v-87cce95f${_scopeId}>${ssrInterpolate(_ctx.$t("form.lastName"))}</label><input id="set-last"${ssrRenderAttr("value", unref(profile).last_name)} class="form-control" autocomplete="family-name"${ssrRenderAttr("aria-invalid", !!unref(profileErrors).last_name)} data-v-87cce95f${_scopeId}>`);
            if (unref(profileErrors).last_name) {
              _push2(`<p class="field-error" data-v-87cce95f${_scopeId}>${ssrInterpolate(_ctx.$t(unref(profileErrors).last_name))}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></div><div data-v-87cce95f${_scopeId}><label class="field-label" for="set-email" data-v-87cce95f${_scopeId}>${ssrInterpolate(_ctx.$t("form.email"))}</label><div class="input-icon" data-v-87cce95f${_scopeId}><i class="iconly-Curved-Message" aria-hidden="true" data-v-87cce95f${_scopeId}></i><input id="set-email"${ssrRenderAttr("value", (_a2 = unref(account)) == null ? void 0 : _a2.email)} type="email" dir="ltr" class="form-control" readonly aria-describedby="set-email-hint" data-v-87cce95f${_scopeId}></div><p id="set-email-hint" class="field-hint" data-v-87cce95f${_scopeId}>${ssrInterpolate(_ctx.$t("account.emailLocked"))}</p></div><div data-v-87cce95f${_scopeId}><label class="field-label" for="set-phone" data-v-87cce95f${_scopeId}>${ssrInterpolate(_ctx.$t("form.phone"))}</label><div class="input-icon" data-v-87cce95f${_scopeId}><i class="iconly-Curved-Call" aria-hidden="true" data-v-87cce95f${_scopeId}></i><input id="set-phone"${ssrRenderAttr("value", unref(profile).phone)} type="tel" inputmode="numeric" autocomplete="tel-national" maxlength="10" dir="ltr" class="form-control"${ssrRenderAttr("aria-invalid", !!unref(profileErrors).phone)} data-v-87cce95f${_scopeId}></div>`);
            if (unref(profileErrors).phone) {
              _push2(`<p class="field-error" data-v-87cce95f${_scopeId}>${ssrInterpolate(_ctx.$t(unref(profileErrors).phone))}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="form-foot" data-v-87cce95f${_scopeId}><button type="submit" class="btn btn-primary"${ssrIncludeBooleanAttr(unref(profileState) === "saving") ? " disabled" : ""} data-v-87cce95f${_scopeId}>`);
            if (unref(profileState) === "saving") {
              _push2(`<span class="spinner-border spinner-border-sm" aria-hidden="true" data-v-87cce95f${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(_ctx.$t("account.save"))}</button><span role="status" class="${ssrRenderClass([unref(profileState), "state"])}" data-v-87cce95f${_scopeId}>`);
            if (unref(profileState) === "saved") {
              _push2(`<!--[--><i class="fa-solid fa-check" data-v-87cce95f${_scopeId}></i> ${ssrInterpolate(_ctx.$t("account.saved"))}<!--]-->`);
            } else if (unref(profileState) === "error") {
              _push2(`<!--[-->${ssrInterpolate(_ctx.$t("account.errors.saveFailed"))}<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</span></div></form></section><section class="panel" data-v-87cce95f${_scopeId}><h2 class="panel-title" data-v-87cce95f${_scopeId}>${ssrInterpolate(_ctx.$t("account.changePassword"))}</h2><form class="gz-form stack" novalidate data-v-87cce95f${_scopeId}><div data-v-87cce95f${_scopeId}><label class="field-label" for="set-current" data-v-87cce95f${_scopeId}>${ssrInterpolate(_ctx.$t("account.currentPassword"))}</label><div class="input-icon" data-v-87cce95f${_scopeId}><i class="iconly-Curved-Lock" aria-hidden="true" data-v-87cce95f${_scopeId}></i><input id="set-current"${ssrRenderDynamicModel(unref(showPasswords) ? "text" : "password", unref(passwords).current, null)}${ssrRenderAttr("type", unref(showPasswords) ? "text" : "password")} autocomplete="current-password" class="form-control"${ssrRenderAttr("aria-invalid", !!unref(passwordErrors).current)} data-v-87cce95f${_scopeId}></div>`);
            if (unref(passwordErrors).current) {
              _push2(`<p class="field-error" data-v-87cce95f${_scopeId}>${ssrInterpolate(_ctx.$t(unref(passwordErrors).current))}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div data-v-87cce95f${_scopeId}><label class="field-label" for="set-next" data-v-87cce95f${_scopeId}>${ssrInterpolate(_ctx.$t("account.newPassword"))}</label><div class="input-icon" data-v-87cce95f${_scopeId}><i class="iconly-Curved-Lock" aria-hidden="true" data-v-87cce95f${_scopeId}></i><input id="set-next"${ssrRenderDynamicModel(unref(showPasswords) ? "text" : "password", unref(passwords).next, null)}${ssrRenderAttr("type", unref(showPasswords) ? "text" : "password")} autocomplete="new-password" class="form-control"${ssrRenderAttr("aria-invalid", !!unref(passwordErrors).next)} data-v-87cce95f${_scopeId}><button type="button" class="eye-btn"${ssrRenderAttr("aria-label", _ctx.$t(unref(showPasswords) ? "account.hidePassword" : "account.showPassword"))}${ssrRenderAttr("aria-pressed", unref(showPasswords))} data-v-87cce95f${_scopeId}><i class="${ssrRenderClass(unref(showPasswords) ? "fa-regular fa-eye-slash" : "fa-regular fa-eye")}" data-v-87cce95f${_scopeId}></i></button></div>`);
            if (unref(passwordErrors).next) {
              _push2(`<p class="field-error" data-v-87cce95f${_scopeId}>${ssrInterpolate(_ctx.$t(unref(passwordErrors).next))}</p>`);
            } else {
              _push2(`<p class="field-hint" data-v-87cce95f${_scopeId}>${ssrInterpolate(_ctx.$t("account.passwordHint"))}</p>`);
            }
            _push2(`</div><div class="form-foot" data-v-87cce95f${_scopeId}><button type="submit" class="btn btn-outline-primary"${ssrIncludeBooleanAttr(unref(passwordState) === "saving") ? " disabled" : ""} data-v-87cce95f${_scopeId}>`);
            if (unref(passwordState) === "saving") {
              _push2(`<span class="spinner-border spinner-border-sm" aria-hidden="true" data-v-87cce95f${_scopeId}></span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(` ${ssrInterpolate(_ctx.$t("account.updatePassword"))}</button><span role="status" class="${ssrRenderClass([unref(passwordState), "state"])}" data-v-87cce95f${_scopeId}>`);
            if (unref(passwordState) === "saved") {
              _push2(`<!--[--><i class="fa-solid fa-check" data-v-87cce95f${_scopeId}></i> ${ssrInterpolate(_ctx.$t("account.passwordUpdated"))}<!--]-->`);
            } else if (unref(passwordState) === "error") {
              _push2(`<!--[-->${ssrInterpolate(_ctx.$t("account.errors.saveFailed"))}<!--]-->`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</span></div></form></section></div>`);
          } else {
            return [
              createVNode("div", { class: "settings-grid" }, [
                createVNode("section", { class: "panel" }, [
                  createVNode("h2", { class: "panel-title" }, toDisplayString(_ctx.$t("account.profile")), 1),
                  createVNode("form", {
                    class: "gz-form stack",
                    novalidate: "",
                    onSubmit: withModifiers(saveProfile, ["prevent"])
                  }, [
                    createVNode("div", { class: "row g-3" }, [
                      createVNode("div", { class: "col-sm-6" }, [
                        createVNode("label", {
                          class: "field-label",
                          for: "set-first"
                        }, toDisplayString(_ctx.$t("form.firstName")), 1),
                        withDirectives(createVNode("input", {
                          id: "set-first",
                          "onUpdate:modelValue": ($event) => unref(profile).first_name = $event,
                          class: "form-control",
                          autocomplete: "given-name",
                          "aria-invalid": !!unref(profileErrors).first_name
                        }, null, 8, ["onUpdate:modelValue", "aria-invalid"]), [
                          [vModelText, unref(profile).first_name]
                        ]),
                        unref(profileErrors).first_name ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "field-error"
                        }, toDisplayString(_ctx.$t(unref(profileErrors).first_name)), 1)) : createCommentVNode("", true)
                      ]),
                      createVNode("div", { class: "col-sm-6" }, [
                        createVNode("label", {
                          class: "field-label",
                          for: "set-last"
                        }, toDisplayString(_ctx.$t("form.lastName")), 1),
                        withDirectives(createVNode("input", {
                          id: "set-last",
                          "onUpdate:modelValue": ($event) => unref(profile).last_name = $event,
                          class: "form-control",
                          autocomplete: "family-name",
                          "aria-invalid": !!unref(profileErrors).last_name
                        }, null, 8, ["onUpdate:modelValue", "aria-invalid"]), [
                          [vModelText, unref(profile).last_name]
                        ]),
                        unref(profileErrors).last_name ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "field-error"
                        }, toDisplayString(_ctx.$t(unref(profileErrors).last_name)), 1)) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode("div", null, [
                      createVNode("label", {
                        class: "field-label",
                        for: "set-email"
                      }, toDisplayString(_ctx.$t("form.email")), 1),
                      createVNode("div", { class: "input-icon" }, [
                        createVNode("i", {
                          class: "iconly-Curved-Message",
                          "aria-hidden": "true"
                        }),
                        createVNode("input", {
                          id: "set-email",
                          value: (_b2 = unref(account)) == null ? void 0 : _b2.email,
                          type: "email",
                          dir: "ltr",
                          class: "form-control",
                          readonly: "",
                          "aria-describedby": "set-email-hint"
                        }, null, 8, ["value"])
                      ]),
                      createVNode("p", {
                        id: "set-email-hint",
                        class: "field-hint"
                      }, toDisplayString(_ctx.$t("account.emailLocked")), 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", {
                        class: "field-label",
                        for: "set-phone"
                      }, toDisplayString(_ctx.$t("form.phone")), 1),
                      createVNode("div", { class: "input-icon" }, [
                        createVNode("i", {
                          class: "iconly-Curved-Call",
                          "aria-hidden": "true"
                        }),
                        withDirectives(createVNode("input", {
                          id: "set-phone",
                          "onUpdate:modelValue": ($event) => unref(profile).phone = $event,
                          type: "tel",
                          inputmode: "numeric",
                          autocomplete: "tel-national",
                          maxlength: "10",
                          dir: "ltr",
                          class: "form-control",
                          "aria-invalid": !!unref(profileErrors).phone
                        }, null, 8, ["onUpdate:modelValue", "aria-invalid"]), [
                          [vModelText, unref(profile).phone]
                        ])
                      ]),
                      unref(profileErrors).phone ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "field-error"
                      }, toDisplayString(_ctx.$t(unref(profileErrors).phone)), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", { class: "form-foot" }, [
                      createVNode("button", {
                        type: "submit",
                        class: "btn btn-primary",
                        disabled: unref(profileState) === "saving"
                      }, [
                        unref(profileState) === "saving" ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "spinner-border spinner-border-sm",
                          "aria-hidden": "true"
                        })) : createCommentVNode("", true),
                        createTextVNode(" " + toDisplayString(_ctx.$t("account.save")), 1)
                      ], 8, ["disabled"]),
                      createVNode("span", {
                        role: "status",
                        class: ["state", unref(profileState)]
                      }, [
                        unref(profileState) === "saved" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                          createVNode("i", { class: "fa-solid fa-check" }),
                          createTextVNode(" " + toDisplayString(_ctx.$t("account.saved")), 1)
                        ], 64)) : unref(profileState) === "error" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                          createTextVNode(toDisplayString(_ctx.$t("account.errors.saveFailed")), 1)
                        ], 64)) : createCommentVNode("", true)
                      ], 2)
                    ])
                  ], 32)
                ]),
                createVNode("section", { class: "panel" }, [
                  createVNode("h2", { class: "panel-title" }, toDisplayString(_ctx.$t("account.changePassword")), 1),
                  createVNode("form", {
                    class: "gz-form stack",
                    novalidate: "",
                    onSubmit: withModifiers(savePassword, ["prevent"])
                  }, [
                    createVNode("div", null, [
                      createVNode("label", {
                        class: "field-label",
                        for: "set-current"
                      }, toDisplayString(_ctx.$t("account.currentPassword")), 1),
                      createVNode("div", { class: "input-icon" }, [
                        createVNode("i", {
                          class: "iconly-Curved-Lock",
                          "aria-hidden": "true"
                        }),
                        withDirectives(createVNode("input", {
                          id: "set-current",
                          "onUpdate:modelValue": ($event) => unref(passwords).current = $event,
                          type: unref(showPasswords) ? "text" : "password",
                          autocomplete: "current-password",
                          class: "form-control",
                          "aria-invalid": !!unref(passwordErrors).current
                        }, null, 8, ["onUpdate:modelValue", "type", "aria-invalid"]), [
                          [vModelDynamic, unref(passwords).current]
                        ])
                      ]),
                      unref(passwordErrors).current ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "field-error"
                      }, toDisplayString(_ctx.$t(unref(passwordErrors).current)), 1)) : createCommentVNode("", true)
                    ]),
                    createVNode("div", null, [
                      createVNode("label", {
                        class: "field-label",
                        for: "set-next"
                      }, toDisplayString(_ctx.$t("account.newPassword")), 1),
                      createVNode("div", { class: "input-icon" }, [
                        createVNode("i", {
                          class: "iconly-Curved-Lock",
                          "aria-hidden": "true"
                        }),
                        withDirectives(createVNode("input", {
                          id: "set-next",
                          "onUpdate:modelValue": ($event) => unref(passwords).next = $event,
                          type: unref(showPasswords) ? "text" : "password",
                          autocomplete: "new-password",
                          class: "form-control",
                          "aria-invalid": !!unref(passwordErrors).next
                        }, null, 8, ["onUpdate:modelValue", "type", "aria-invalid"]), [
                          [vModelDynamic, unref(passwords).next]
                        ]),
                        createVNode("button", {
                          type: "button",
                          class: "eye-btn",
                          "aria-label": _ctx.$t(unref(showPasswords) ? "account.hidePassword" : "account.showPassword"),
                          "aria-pressed": unref(showPasswords),
                          onClick: ($event) => showPasswords.value = !unref(showPasswords)
                        }, [
                          createVNode("i", {
                            class: unref(showPasswords) ? "fa-regular fa-eye-slash" : "fa-regular fa-eye"
                          }, null, 2)
                        ], 8, ["aria-label", "aria-pressed", "onClick"])
                      ]),
                      unref(passwordErrors).next ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "field-error"
                      }, toDisplayString(_ctx.$t(unref(passwordErrors).next)), 1)) : (openBlock(), createBlock("p", {
                        key: 1,
                        class: "field-hint"
                      }, toDisplayString(_ctx.$t("account.passwordHint")), 1))
                    ]),
                    createVNode("div", { class: "form-foot" }, [
                      createVNode("button", {
                        type: "submit",
                        class: "btn btn-outline-primary",
                        disabled: unref(passwordState) === "saving"
                      }, [
                        unref(passwordState) === "saving" ? (openBlock(), createBlock("span", {
                          key: 0,
                          class: "spinner-border spinner-border-sm",
                          "aria-hidden": "true"
                        })) : createCommentVNode("", true),
                        createTextVNode(" " + toDisplayString(_ctx.$t("account.updatePassword")), 1)
                      ], 8, ["disabled"]),
                      createVNode("span", {
                        role: "status",
                        class: ["state", unref(passwordState)]
                      }, [
                        unref(passwordState) === "saved" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                          createVNode("i", { class: "fa-solid fa-check" }),
                          createTextVNode(" " + toDisplayString(_ctx.$t("account.passwordUpdated")), 1)
                        ], 64)) : unref(passwordState) === "error" ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                          createTextVNode(toDisplayString(_ctx.$t("account.errors.saveFailed")), 1)
                        ], 64)) : createCommentVNode("", true)
                      ], 2)
                    ])
                  ], 32)
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const settings = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-87cce95f"]]);

export { settings as default };
//# sourceMappingURL=settings-vtZLMQhr.mjs.map
