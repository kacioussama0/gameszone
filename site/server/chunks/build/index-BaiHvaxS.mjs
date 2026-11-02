import { _ as __nuxt_component_0 } from './AccountShell-DVS341nL.mjs';
import { d as _export_sfc, a as useI18n, h as useAccount, b as useHead, e as useFetch, _ as __nuxt_component_2$1, c as __nuxt_component_1 } from './server.mjs';
import { _ as __nuxt_component_4$1 } from './Header3-s4pCF4HI.mjs';
import { _ as __nuxt_component_3, D as DATE_LOCALES } from './locales-B8vbQ24P.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, unref, withCtx, createVNode, toDisplayString, createTextVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
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
    const { account } = useAccount();
    useHead({
      title: () => t("account.overview"),
      meta: [{ name: "robots", content: "noindex" }]
    });
    const { data, pending, error, refresh } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/account/orders",
      {
        query: { page: 1 },
        key: "account-orders-overview"
      },
      "$p84bugX5LG"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const recent = computed(() => {
      var _a;
      return (((_a = data.value) == null ? void 0 : _a.orders) || []).slice(0, 3);
    });
    const awaiting = computed(() => {
      var _a;
      return (((_a = data.value) == null ? void 0 : _a.orders) || []).filter((o) => o.payable).length;
    });
    const formatPrice = (value) => `${Number(value).toLocaleString("fr-FR")} ${t("common.currency")}`;
    const formatDate = (value) => {
      var _a;
      return new Date(value).toLocaleDateString((_a = DATE_LOCALES[locale.value]) != null ? _a : "fr-FR", { day: "numeric", month: "short", year: "numeric" });
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_AccountShell = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_2$1;
      const _component_AstroBot = __nuxt_component_1;
      const _component_ProductThumb = __nuxt_component_4$1;
      const _component_OrderStatus = __nuxt_component_3;
      _push(ssrRenderComponent(_component_AccountShell, mergeProps({
        title: _ctx.$t("account.hello", { name: ((_a = unref(account)) == null ? void 0 : _a.first_name) || "" })
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="stats" data-v-f0043de3${_scopeId}>`);
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/account/orders",
              class: "stat"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b, _c, _d;
                if (_push3) {
                  _push3(`<i class="iconly-Curved-Bag" aria-hidden="true" data-v-f0043de3${_scopeId2}></i><span data-v-f0043de3${_scopeId2}><b data-v-f0043de3${_scopeId2}>${ssrInterpolate(unref(pending) ? "\u2026" : (_b = (_a2 = unref(data)) == null ? void 0 : _a2.total) != null ? _b : 0)}</b><small data-v-f0043de3${_scopeId2}>${ssrInterpolate(_ctx.$t("account.ordersCount"))}</small></span>`);
                } else {
                  return [
                    createVNode("i", {
                      class: "iconly-Curved-Bag",
                      "aria-hidden": "true"
                    }),
                    createVNode("span", null, [
                      createVNode("b", null, toDisplayString(unref(pending) ? "\u2026" : (_d = (_c = unref(data)) == null ? void 0 : _c.total) != null ? _d : 0), 1),
                      createVNode("small", null, toDisplayString(_ctx.$t("account.ordersCount")), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/account/orders",
              class: ["stat", { "is-warn": unref(awaiting) > 0 }]
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="iconly-Curved-Wallet" aria-hidden="true" data-v-f0043de3${_scopeId2}></i><span data-v-f0043de3${_scopeId2}><b data-v-f0043de3${_scopeId2}>${ssrInterpolate(unref(pending) ? "\u2026" : unref(awaiting))}</b><small data-v-f0043de3${_scopeId2}>${ssrInterpolate(_ctx.$t("account.awaitingPayment"))}</small></span>`);
                } else {
                  return [
                    createVNode("i", {
                      class: "iconly-Curved-Wallet",
                      "aria-hidden": "true"
                    }),
                    createVNode("span", null, [
                      createVNode("b", null, toDisplayString(unref(pending) ? "\u2026" : unref(awaiting)), 1),
                      createVNode("small", null, toDisplayString(_ctx.$t("account.awaitingPayment")), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/account/settings",
              class: "stat"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a2, _b;
                if (_push3) {
                  _push3(`<i class="iconly-Curved-Message" aria-hidden="true" data-v-f0043de3${_scopeId2}></i><span data-v-f0043de3${_scopeId2}><b class="stat-email" dir="ltr" data-v-f0043de3${_scopeId2}>${ssrInterpolate((_a2 = unref(account)) == null ? void 0 : _a2.email)}</b><small data-v-f0043de3${_scopeId2}>${ssrInterpolate(_ctx.$t("account.codesSentTo"))}</small></span>`);
                } else {
                  return [
                    createVNode("i", {
                      class: "iconly-Curved-Message",
                      "aria-hidden": "true"
                    }),
                    createVNode("span", null, [
                      createVNode("b", {
                        class: "stat-email",
                        dir: "ltr"
                      }, toDisplayString((_b = unref(account)) == null ? void 0 : _b.email), 1),
                      createVNode("small", null, toDisplayString(_ctx.$t("account.codesSentTo")), 1)
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div><section class="panel" data-v-f0043de3${_scopeId}><div class="panel-head" data-v-f0043de3${_scopeId}><h2 data-v-f0043de3${_scopeId}>${ssrInterpolate(_ctx.$t("account.recentOrders"))}</h2>`);
            if (unref(recent).length) {
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: "/account/orders",
                class: "see-all"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(_ctx.$t("common.seeAll"))} <i class="fa-solid fa-arrow-right flip-rtl" aria-hidden="true" data-v-f0043de3${_scopeId2}></i>`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(_ctx.$t("common.seeAll")) + " ", 1),
                      createVNode("i", {
                        class: "fa-solid fa-arrow-right flip-rtl",
                        "aria-hidden": "true"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
            if (unref(pending)) {
              _push2(`<div class="placeholder-glow" data-v-f0043de3${_scopeId}><!--[-->`);
              ssrRenderList(3, (n) => {
                _push2(`<span class="placeholder col-12 rounded-3 mb-2" style="${ssrRenderStyle({ "height": "72px" })}" data-v-f0043de3${_scopeId}></span>`);
              });
              _push2(`<!--]--></div>`);
            } else if (unref(error)) {
              _push2(`<div class="empty" data-v-f0043de3${_scopeId}><p data-v-f0043de3${_scopeId}>${ssrInterpolate(_ctx.$t("account.errors.loadFailed"))}</p><button type="button" class="btn btn-outline-primary btn-sm" data-v-f0043de3${_scopeId}>${ssrInterpolate(_ctx.$t("payment.retry"))}</button></div>`);
            } else if (!unref(recent).length) {
              _push2(`<div class="empty" data-v-f0043de3${_scopeId}>`);
              _push2(ssrRenderComponent(_component_AstroBot, {
                mood: "search",
                size: 90
              }, null, _parent2, _scopeId));
              _push2(`<p data-v-f0043de3${_scopeId}>${ssrInterpolate(_ctx.$t("account.noOrders"))}</p>`);
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
              _push2(`<ul class="order-rows" data-v-f0043de3${_scopeId}><!--[-->`);
              ssrRenderList(unref(recent), (order) => {
                _push2(`<li data-v-f0043de3${_scopeId}>`);
                _push2(ssrRenderComponent(_component_NuxtLink, {
                  to: `/account/orders/${order.id}`,
                  class: "order-row"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span class="thumbs" aria-hidden="true" data-v-f0043de3${_scopeId2}><!--[-->`);
                      ssrRenderList(order.items.slice(0, 2), (item, i) => {
                        _push3(ssrRenderComponent(_component_ProductThumb, {
                          key: i,
                          src: item.image,
                          size: 44
                        }, null, _parent3, _scopeId2));
                      });
                      _push3(`<!--]--></span><span class="order-main" data-v-f0043de3${_scopeId2}><b data-v-f0043de3${_scopeId2}>${ssrInterpolate(_ctx.$t("account.orderNo", { number: order.number }))}</b><small data-v-f0043de3${_scopeId2}>${ssrInterpolate(formatDate(order.date))} \xB7 ${ssrInterpolate(_ctx.$t("account.itemsCount", { count: order.itemsCount }, order.itemsCount))}</small></span>`);
                      _push3(ssrRenderComponent(_component_OrderStatus, {
                        status: order.status
                      }, null, _parent3, _scopeId2));
                      _push3(`<strong class="order-total" data-v-f0043de3${_scopeId2}>${ssrInterpolate(formatPrice(order.total))}</strong>`);
                    } else {
                      return [
                        createVNode("span", {
                          class: "thumbs",
                          "aria-hidden": "true"
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(order.items.slice(0, 2), (item, i) => {
                            return openBlock(), createBlock(_component_ProductThumb, {
                              key: i,
                              src: item.image,
                              size: 44
                            }, null, 8, ["src"]);
                          }), 128))
                        ]),
                        createVNode("span", { class: "order-main" }, [
                          createVNode("b", null, toDisplayString(_ctx.$t("account.orderNo", { number: order.number })), 1),
                          createVNode("small", null, toDisplayString(formatDate(order.date)) + " \xB7 " + toDisplayString(_ctx.$t("account.itemsCount", { count: order.itemsCount }, order.itemsCount)), 1)
                        ]),
                        createVNode(_component_OrderStatus, {
                          status: order.status
                        }, null, 8, ["status"]),
                        createVNode("strong", { class: "order-total" }, toDisplayString(formatPrice(order.total)), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(`</li>`);
              });
              _push2(`<!--]--></ul>`);
            }
            _push2(`</section>`);
          } else {
            return [
              createVNode("div", { class: "stats" }, [
                createVNode(_component_NuxtLink, {
                  to: "/account/orders",
                  class: "stat"
                }, {
                  default: withCtx(() => {
                    var _a2, _b;
                    return [
                      createVNode("i", {
                        class: "iconly-Curved-Bag",
                        "aria-hidden": "true"
                      }),
                      createVNode("span", null, [
                        createVNode("b", null, toDisplayString(unref(pending) ? "\u2026" : (_b = (_a2 = unref(data)) == null ? void 0 : _a2.total) != null ? _b : 0), 1),
                        createVNode("small", null, toDisplayString(_ctx.$t("account.ordersCount")), 1)
                      ])
                    ];
                  }),
                  _: 1
                }),
                createVNode(_component_NuxtLink, {
                  to: "/account/orders",
                  class: ["stat", { "is-warn": unref(awaiting) > 0 }]
                }, {
                  default: withCtx(() => [
                    createVNode("i", {
                      class: "iconly-Curved-Wallet",
                      "aria-hidden": "true"
                    }),
                    createVNode("span", null, [
                      createVNode("b", null, toDisplayString(unref(pending) ? "\u2026" : unref(awaiting)), 1),
                      createVNode("small", null, toDisplayString(_ctx.$t("account.awaitingPayment")), 1)
                    ])
                  ]),
                  _: 1
                }, 8, ["class"]),
                createVNode(_component_NuxtLink, {
                  to: "/account/settings",
                  class: "stat"
                }, {
                  default: withCtx(() => {
                    var _a2;
                    return [
                      createVNode("i", {
                        class: "iconly-Curved-Message",
                        "aria-hidden": "true"
                      }),
                      createVNode("span", null, [
                        createVNode("b", {
                          class: "stat-email",
                          dir: "ltr"
                        }, toDisplayString((_a2 = unref(account)) == null ? void 0 : _a2.email), 1),
                        createVNode("small", null, toDisplayString(_ctx.$t("account.codesSentTo")), 1)
                      ])
                    ];
                  }),
                  _: 1
                })
              ]),
              createVNode("section", { class: "panel" }, [
                createVNode("div", { class: "panel-head" }, [
                  createVNode("h2", null, toDisplayString(_ctx.$t("account.recentOrders")), 1),
                  unref(recent).length ? (openBlock(), createBlock(_component_NuxtLink, {
                    key: 0,
                    to: "/account/orders",
                    class: "see-all"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(_ctx.$t("common.seeAll")) + " ", 1),
                      createVNode("i", {
                        class: "fa-solid fa-arrow-right flip-rtl",
                        "aria-hidden": "true"
                      })
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                unref(pending) ? (openBlock(), createBlock("div", {
                  key: 0,
                  class: "placeholder-glow"
                }, [
                  (openBlock(), createBlock(Fragment, null, renderList(3, (n) => {
                    return createVNode("span", {
                      key: n,
                      class: "placeholder col-12 rounded-3 mb-2",
                      style: { "height": "72px" }
                    });
                  }), 64))
                ])) : unref(error) ? (openBlock(), createBlock("div", {
                  key: 1,
                  class: "empty"
                }, [
                  createVNode("p", null, toDisplayString(_ctx.$t("account.errors.loadFailed")), 1),
                  createVNode("button", {
                    type: "button",
                    class: "btn btn-outline-primary btn-sm",
                    onClick: ($event) => unref(refresh)()
                  }, toDisplayString(_ctx.$t("payment.retry")), 9, ["onClick"])
                ])) : !unref(recent).length ? (openBlock(), createBlock("div", {
                  key: 2,
                  class: "empty"
                }, [
                  createVNode(_component_AstroBot, {
                    mood: "search",
                    size: 90
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
                ])) : (openBlock(), createBlock("ul", {
                  key: 3,
                  class: "order-rows"
                }, [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(recent), (order) => {
                    return openBlock(), createBlock("li", {
                      key: order.id
                    }, [
                      createVNode(_component_NuxtLink, {
                        to: `/account/orders/${order.id}`,
                        class: "order-row"
                      }, {
                        default: withCtx(() => [
                          createVNode("span", {
                            class: "thumbs",
                            "aria-hidden": "true"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(order.items.slice(0, 2), (item, i) => {
                              return openBlock(), createBlock(_component_ProductThumb, {
                                key: i,
                                src: item.image,
                                size: 44
                              }, null, 8, ["src"]);
                            }), 128))
                          ]),
                          createVNode("span", { class: "order-main" }, [
                            createVNode("b", null, toDisplayString(_ctx.$t("account.orderNo", { number: order.number })), 1),
                            createVNode("small", null, toDisplayString(formatDate(order.date)) + " \xB7 " + toDisplayString(_ctx.$t("account.itemsCount", { count: order.itemsCount }, order.itemsCount)), 1)
                          ]),
                          createVNode(_component_OrderStatus, {
                            status: order.status
                          }, null, 8, ["status"]),
                          createVNode("strong", { class: "order-total" }, toDisplayString(formatPrice(order.total)), 1)
                        ]),
                        _: 2
                      }, 1032, ["to"])
                    ]);
                  }), 128))
                ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-f0043de3"]]);

export { index as default };
//# sourceMappingURL=index-BaiHvaxS.mjs.map
