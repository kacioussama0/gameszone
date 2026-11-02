import { _ as __nuxt_component_0 } from './AccountShell-DVS341nL.mjs';
import { d as _export_sfc, a as useI18n, f as useRoute, b as useHead, e as useFetch, c as __nuxt_component_1, _ as __nuxt_component_2$1, E as navigateTo } from './server.mjs';
import { _ as __nuxt_component_3, D as DATE_LOCALES } from './locales-B8vbQ24P.mjs';
import { _ as __nuxt_component_4$1 } from './Header3-s4pCF4HI.mjs';
import { defineComponent, computed, withAsyncContext, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
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
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { t, locale } = useI18n();
    const route = useRoute();
    useHead({
      title: () => t("account.orders"),
      meta: [{ name: "robots", content: "noindex" }]
    });
    const page = computed(() => Math.max(1, Number(route.query.page) || 1));
    const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/account/orders",
      {
        query: { page },
        key: "account-orders"
      },
      "$B2R9mjWd0r"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const formatPrice = (value) => `${Number(value).toLocaleString("fr-FR")} ${t("common.currency")}`;
    const formatDate = (value) => {
      var _a;
      return new Date(value).toLocaleDateString((_a = DATE_LOCALES[locale.value]) != null ? _a : "fr-FR", { day: "numeric", month: "long", year: "numeric" });
    };
    const goTo = (n) => navigateTo({ query: { ...route.query, page: n > 1 ? n : void 0 } });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AccountShell = __nuxt_component_0;
      const _component_AstroBot = __nuxt_component_1;
      const _component_NuxtLink = __nuxt_component_2$1;
      const _component_OrderStatus = __nuxt_component_3;
      const _component_ProductThumb = __nuxt_component_4$1;
      _push(ssrRenderComponent(_component_AccountShell, mergeProps({
        title: _ctx.$t("account.orders")
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          var _a, _b, _c, _d;
          if (_push2) {
            if (unref(pending)) {
              _push2(`<div class="placeholder-glow" data-v-8564b31f${_scopeId}><!--[-->`);
              ssrRenderList(4, (n) => {
                _push2(`<span class="placeholder col-12 rounded-4 mb-3" style="${ssrRenderStyle({ "height": "132px" })}" data-v-8564b31f${_scopeId}></span>`);
              });
              _push2(`<!--]--></div>`);
            } else if (unref(error)) {
              _push2(`<div class="panel empty" data-v-8564b31f${_scopeId}><p data-v-8564b31f${_scopeId}>${ssrInterpolate(_ctx.$t("account.errors.loadFailed"))}</p><button type="button" class="btn btn-outline-primary btn-sm" data-v-8564b31f${_scopeId}>${ssrInterpolate(_ctx.$t("payment.retry"))}</button></div>`);
            } else if (!((_b = (_a = unref(data)) == null ? void 0 : _a.orders) == null ? void 0 : _b.length)) {
              _push2(`<div class="panel empty" data-v-8564b31f${_scopeId}>`);
              _push2(ssrRenderComponent(_component_AstroBot, {
                mood: "search",
                size: 100
              }, null, _parent2, _scopeId));
              _push2(`<p data-v-8564b31f${_scopeId}>${ssrInterpolate(_ctx.$t("account.noOrders"))}</p>`);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: "/shop",
                class: "btn btn-primary"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.$t("cart.continueShopping"))}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.$t("cart.continueShopping")), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div>`);
            } else {
              _push2(`<!--[--><ul class="order-cards" data-v-8564b31f${_scopeId}><!--[-->`);
              ssrRenderList(unref(data).orders, (order) => {
                _push2(`<li class="order-card" data-v-8564b31f${_scopeId}><div class="card-top" data-v-8564b31f${_scopeId}><span data-v-8564b31f${_scopeId}><b data-v-8564b31f${_scopeId}>${ssrInterpolate(_ctx.$t("account.orderNo", { number: order.number }))}</b><small data-v-8564b31f${_scopeId}>${ssrInterpolate(formatDate(order.date))}</small></span>`);
                _push2(ssrRenderComponent(_component_OrderStatus, {
                  status: order.status
                }, null, _parent2, _scopeId));
                _push2(`</div><div class="card-items" data-v-8564b31f${_scopeId}><span class="thumbs" aria-hidden="true" data-v-8564b31f${_scopeId}><!--[-->`);
                ssrRenderList(order.items, (item, i) => {
                  _push2(ssrRenderComponent(_component_ProductThumb, {
                    key: i,
                    src: item.image,
                    size: 56
                  }, null, _parent2, _scopeId));
                });
                _push2(`<!--]--></span><span class="names" data-v-8564b31f${_scopeId}>${ssrInterpolate(order.items.map((i) => i.name).join(" \xB7 "))}</span></div><div class="card-foot" data-v-8564b31f${_scopeId}><span class="total" data-v-8564b31f${_scopeId}><small data-v-8564b31f${_scopeId}>${ssrInterpolate(_ctx.$t("account.itemsCount", { count: order.itemsCount }, order.itemsCount))}</small><strong data-v-8564b31f${_scopeId}>${ssrInterpolate(formatPrice(order.total))}</strong></span><span class="actions" data-v-8564b31f${_scopeId}>`);
                if (order.payable) {
                  _push2(ssrRenderComponent(_component_NuxtLink, {
                    to: `/account/orders/${order.id}`,
                    class: "btn btn-primary btn-sm"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(`<i class="fa-solid fa-lock" data-v-8564b31f${_scopeId2}></i> ${ssrInterpolate(_ctx.$t("account.payNow"))}`);
                      } else {
                        return [
                          createVNode("i", { class: "fa-solid fa-lock" }),
                          createTextVNode(" " + toDisplayString(_ctx.$t("account.payNow")), 1)
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<!---->`);
                }
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  to: `/account/orders/${order.id}`,
                  class: "btn btn-outline-primary btn-sm"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`${ssrInterpolate(_ctx.$t("account.details"))}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(_ctx.$t("account.details")), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</span></div></li>`);
              });
              _push2(`<!--]--></ul>`);
              if (unref(data).totalPages > 1) {
                _push2(`<nav class="pager"${ssrRenderAttr("aria-label", _ctx.$t("account.pagination"))} data-v-8564b31f${_scopeId}><button type="button" class="btn btn-outline-primary btn-sm"${ssrIncludeBooleanAttr(unref(page) <= 1) ? " disabled" : ""} data-v-8564b31f${_scopeId}><i class="fa-solid fa-arrow-left flip-rtl" data-v-8564b31f${_scopeId}></i></button><span data-v-8564b31f${_scopeId}>${ssrInterpolate(unref(page))} / ${ssrInterpolate(unref(data).totalPages)}</span><button type="button" class="btn btn-outline-primary btn-sm"${ssrIncludeBooleanAttr(unref(page) >= unref(data).totalPages) ? " disabled" : ""} data-v-8564b31f${_scopeId}><i class="fa-solid fa-arrow-right flip-rtl" data-v-8564b31f${_scopeId}></i></button></nav>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<!--]-->`);
            }
          } else {
            return [
              unref(pending) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "placeholder-glow"
              }, [
                (openBlock(), createBlock(Fragment, null, renderList(4, (n) => {
                  return createVNode("span", {
                    key: n,
                    class: "placeholder col-12 rounded-4 mb-3",
                    style: { "height": "132px" }
                  });
                }), 64))
              ])) : unref(error) ? (openBlock(), createBlock("div", {
                key: 1,
                class: "panel empty"
              }, [
                createVNode("p", null, toDisplayString(_ctx.$t("account.errors.loadFailed")), 1),
                createVNode("button", {
                  type: "button",
                  class: "btn btn-outline-primary btn-sm",
                  onClick: ($event) => unref(refresh)()
                }, toDisplayString(_ctx.$t("payment.retry")), 9, ["onClick"])
              ])) : !((_d = (_c = unref(data)) == null ? void 0 : _c.orders) == null ? void 0 : _d.length) ? (openBlock(), createBlock("div", {
                key: 2,
                class: "panel empty"
              }, [
                createVNode(_component_AstroBot, {
                  mood: "search",
                  size: 100
                }),
                createVNode("p", null, toDisplayString(_ctx.$t("account.noOrders")), 1),
                createVNode(_component_NuxtLink, {
                  to: "/shop",
                  class: "btn btn-primary"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(_ctx.$t("cart.continueShopping")), 1)
                  ]),
                  _: 1
                })
              ])) : (openBlock(), createBlock(Fragment, { key: 3 }, [
                createVNode("ul", { class: "order-cards" }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(data).orders, (order) => {
                    return openBlock(), createBlock("li", {
                      key: order.id,
                      class: "order-card"
                    }, [
                      createVNode("div", { class: "card-top" }, [
                        createVNode("span", null, [
                          createVNode("b", null, toDisplayString(_ctx.$t("account.orderNo", { number: order.number })), 1),
                          createVNode("small", null, toDisplayString(formatDate(order.date)), 1)
                        ]),
                        createVNode(_component_OrderStatus, {
                          status: order.status
                        }, null, 8, ["status"])
                      ]),
                      createVNode("div", { class: "card-items" }, [
                        createVNode("span", {
                          class: "thumbs",
                          "aria-hidden": "true"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(order.items, (item, i) => {
                            return openBlock(), createBlock(_component_ProductThumb, {
                              key: i,
                              src: item.image,
                              size: 56
                            }, null, 8, ["src"]);
                          }), 128))
                        ]),
                        createVNode("span", { class: "names" }, toDisplayString(order.items.map((i) => i.name).join(" \xB7 ")), 1)
                      ]),
                      createVNode("div", { class: "card-foot" }, [
                        createVNode("span", { class: "total" }, [
                          createVNode("small", null, toDisplayString(_ctx.$t("account.itemsCount", { count: order.itemsCount }, order.itemsCount)), 1),
                          createVNode("strong", null, toDisplayString(formatPrice(order.total)), 1)
                        ]),
                        createVNode("span", { class: "actions" }, [
                          order.payable ? (openBlock(), createBlock(_component_NuxtLink, {
                            key: 0,
                            to: `/account/orders/${order.id}`,
                            class: "btn btn-primary btn-sm"
                          }, {
                            default: withCtx(() => [
                              createVNode("i", { class: "fa-solid fa-lock" }),
                              createTextVNode(" " + toDisplayString(_ctx.$t("account.payNow")), 1)
                            ]),
                            _: 1
                          }, 8, ["to"])) : createCommentVNode("", true),
                          createVNode(_component_NuxtLink, {
                            to: `/account/orders/${order.id}`,
                            class: "btn btn-outline-primary btn-sm"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(_ctx.$t("account.details")), 1)
                            ]),
                            _: 1
                          }, 8, ["to"])
                        ])
                      ])
                    ]);
                  }), 128))
                ]),
                unref(data).totalPages > 1 ? (openBlock(), createBlock("nav", {
                  key: 0,
                  class: "pager",
                  "aria-label": _ctx.$t("account.pagination")
                }, [
                  createVNode("button", {
                    type: "button",
                    class: "btn btn-outline-primary btn-sm",
                    disabled: unref(page) <= 1,
                    onClick: ($event) => goTo(unref(page) - 1)
                  }, [
                    createVNode("i", { class: "fa-solid fa-arrow-left flip-rtl" })
                  ], 8, ["disabled", "onClick"]),
                  createVNode("span", null, toDisplayString(unref(page)) + " / " + toDisplayString(unref(data).totalPages), 1),
                  createVNode("button", {
                    type: "button",
                    class: "btn btn-outline-primary btn-sm",
                    disabled: unref(page) >= unref(data).totalPages,
                    onClick: ($event) => goTo(unref(page) + 1)
                  }, [
                    createVNode("i", { class: "fa-solid fa-arrow-right flip-rtl" })
                  ], 8, ["disabled", "onClick"])
                ], 8, ["aria-label"])) : createCommentVNode("", true)
              ], 64))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/orders/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-8564b31f"]]);

export { index as default };
//# sourceMappingURL=index-DRjLDfJw.mjs.map
