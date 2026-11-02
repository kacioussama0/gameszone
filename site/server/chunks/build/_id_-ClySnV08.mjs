import { _ as __nuxt_component_0 } from './AccountShell-DVS341nL.mjs';
import { d as _export_sfc, a as useI18n, f as useRoute, e as useFetch, b as useHead, _ as __nuxt_component_2$1, c as __nuxt_component_1, w as whatsappLink } from './server.mjs';
import { _ as __nuxt_component_3, D as DATE_LOCALES } from './locales-B8vbQ24P.mjs';
import { _ as __nuxt_component_4$1 } from './Header3-s4pCF4HI.mjs';
import { defineComponent, computed, withAsyncContext, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, createCommentVNode, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
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
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { t, locale } = useI18n();
    const route = useRoute();
    const id = computed(() => String(route.params.id).replace(/\D/g, ""));
    const { data: order, pending, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      () => `/api/account/orders/${id.value}`,
      {
        key: `account-order-${id.value}`
      },
      "$yiRtzTMxv8"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    useHead({
      title: () => order.value ? t("account.orderNo", { number: order.value.number }) : t("account.orders"),
      meta: [{ name: "robots", content: "noindex" }]
    });
    const formatPrice = (value) => `${Number(value).toLocaleString("fr-FR")} ${t("common.currency")}`;
    const formatDate = (value, withTime = false) => {
      var _a;
      return new Date(value).toLocaleString((_a = DATE_LOCALES[locale.value]) != null ? _a : "fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
        ...withTime ? { hour: "2-digit", minute: "2-digit" } : {}
      });
    };
    const plain = (html) => html.replace(/<br\s*\/?>/gi, "\n").replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").trim();
    const isPaying = ref(false);
    const payError = ref(false);
    const pay = async () => {
      if (!order.value || isPaying.value) return;
      isPaying.value = true;
      payError.value = false;
      try {
        const res = await $fetch(`/api/account/orders/${order.value.id}/pay`, { method: "POST" });
        try {
          const first = order.value.items[0];
          sessionStorage.setItem("lastEpay", JSON.stringify({
            orderId: order.value.id,
            fromAccount: true,
            name: order.value.items.length > 1 ? t("payment.cartItems", { count: order.value.items.length }) : first == null ? void 0 : first.name,
            image: first == null ? void 0 : first.image,
            option: "",
            amount: order.value.total
          }));
        } catch {
        }
        (void 0).location.href = res.url;
      } catch {
        payError.value = true;
        isPaying.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AccountShell = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_2$1;
      const _component_AstroBot = __nuxt_component_1;
      const _component_OrderStatus = __nuxt_component_3;
      const _component_ProductThumb = __nuxt_component_4$1;
      _push(ssrRenderComponent(_component_AccountShell, mergeProps({
        title: unref(order) ? _ctx.$t("account.orderNo", { number: unref(order).number }) : _ctx.$t("account.orders")
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/account/orders",
              class: "back"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<i class="fa-solid fa-arrow-left flip-rtl" aria-hidden="true" data-v-600bd142${_scopeId2}></i> ${ssrInterpolate(_ctx.$t("account.backToOrders"))}`);
                } else {
                  return [
                    createVNode("i", {
                      class: "fa-solid fa-arrow-left flip-rtl",
                      "aria-hidden": "true"
                    }),
                    createTextVNode(" " + toDisplayString(_ctx.$t("account.backToOrders")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (unref(pending)) {
              _push2(`<div class="placeholder-glow" data-v-600bd142${_scopeId}><span class="placeholder col-12 rounded-4 mb-3" style="${ssrRenderStyle({ "height": "90px" })}" data-v-600bd142${_scopeId}></span><span class="placeholder col-12 rounded-4" style="${ssrRenderStyle({ "height": "260px" })}" data-v-600bd142${_scopeId}></span></div>`);
            } else if (unref(error) || !unref(order)) {
              _push2(`<div class="panel empty" data-v-600bd142${_scopeId}>`);
              _push2(ssrRenderComponent(_component_AstroBot, {
                mood: "sad",
                size: 100
              }, null, _parent2, _scopeId));
              _push2(`<p data-v-600bd142${_scopeId}>${ssrInterpolate(_ctx.$t("account.orderNotFound"))}</p></div>`);
            } else {
              _push2(`<!--[--><section class="${ssrRenderClass([{ "is-payable": unref(order).payable }, "panel status-panel"])}" data-v-600bd142${_scopeId}><div data-v-600bd142${_scopeId}>`);
              _push2(ssrRenderComponent(_component_OrderStatus, {
                status: unref(order).status
              }, null, _parent2, _scopeId));
              _push2(`<p class="status-text" data-v-600bd142${_scopeId}>${ssrInterpolate(_ctx.$te(`account.statusText.${unref(order).status}`) ? _ctx.$t(`account.statusText.${unref(order).status}`) : "")}</p><small class="muted" data-v-600bd142${_scopeId}>${ssrInterpolate(_ctx.$t("account.placedOn", { date: formatDate(unref(order).date, true) }))}</small></div>`);
              if (unref(order).payable) {
                _push2(`<div class="pay-box" data-v-600bd142${_scopeId}><button type="button" class="btn btn-primary btn-lg"${ssrIncludeBooleanAttr(unref(isPaying)) ? " disabled" : ""} data-v-600bd142${_scopeId}>`);
                if (unref(isPaying)) {
                  _push2(`<span class="spinner-border spinner-border-sm" aria-hidden="true" data-v-600bd142${_scopeId}></span>`);
                } else {
                  _push2(`<i class="fa-solid fa-lock" data-v-600bd142${_scopeId}></i>`);
                }
                _push2(` ${ssrInterpolate(unref(isPaying) ? _ctx.$t("product.redirecting") : _ctx.$t("product.payAmount", { amount: formatPrice(unref(order).total) }))}</button>`);
                if (unref(payError)) {
                  _push2(`<p class="pay-error" role="alert" data-v-600bd142${_scopeId}>${ssrInterpolate(_ctx.$t("product.payError"))}</p>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</section><div class="detail-grid" data-v-600bd142${_scopeId}><section class="panel" data-v-600bd142${_scopeId}><h2 class="panel-title" data-v-600bd142${_scopeId}>${ssrInterpolate(_ctx.$t("account.items"))}</h2><ul class="items" data-v-600bd142${_scopeId}><!--[-->`);
              ssrRenderList(unref(order).items, (item) => {
                _push2(`<li data-v-600bd142${_scopeId}>`);
                if (item.slug) {
                  _push2(ssrRenderComponent(_component_NuxtLink, {
                    to: `/shop/product/${item.slug}`,
                    class: "item-img"
                  }, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(_component_ProductThumb, {
                          src: item.image,
                          alt: item.name,
                          size: 64
                        }, null, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode(_component_ProductThumb, {
                            src: item.image,
                            alt: item.name,
                            size: 64
                          }, null, 8, ["src", "alt"])
                        ];
                      }
                    }),
                    _: 2
                  }, _parent2, _scopeId));
                } else {
                  _push2(`<span class="item-img" data-v-600bd142${_scopeId}>`);
                  _push2(ssrRenderComponent(_component_ProductThumb, {
                    src: item.image,
                    alt: item.name,
                    size: 64
                  }, null, _parent2, _scopeId));
                  _push2(`</span>`);
                }
                _push2(`<span class="item-info" data-v-600bd142${_scopeId}><b data-v-600bd142${_scopeId}>${ssrInterpolate(item.name)}</b><!--[-->`);
                ssrRenderList(item.options, (opt) => {
                  _push2(`<small data-v-600bd142${_scopeId}>${ssrInterpolate(opt.label)} : ${ssrInterpolate(opt.value)}</small>`);
                });
                _push2(`<!--]--><small data-v-600bd142${_scopeId}>\xD7 ${ssrInterpolate(item.quantity)}</small></span><strong class="item-total" data-v-600bd142${_scopeId}>${ssrInterpolate(formatPrice(item.total))}</strong></li>`);
              });
              _push2(`<!--]--></ul><div class="sum-row" data-v-600bd142${_scopeId}><span data-v-600bd142${_scopeId}>${ssrInterpolate(_ctx.$t("common.subtotal"))}</span><span data-v-600bd142${_scopeId}>${ssrInterpolate(formatPrice(unref(order).subtotal))}</span></div>`);
              if (unref(order).discount) {
                _push2(`<div class="sum-row" data-v-600bd142${_scopeId}><span data-v-600bd142${_scopeId}>${ssrInterpolate(_ctx.$t("account.discount"))}</span><span data-v-600bd142${_scopeId}>-${ssrInterpolate(formatPrice(unref(order).discount))}</span></div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<div class="sum-row" data-v-600bd142${_scopeId}><span data-v-600bd142${_scopeId}>${ssrInterpolate(_ctx.$t("checkout.deliveryLabel"))}</span><span data-v-600bd142${_scopeId}>${ssrInterpolate(_ctx.$t("checkout.deliveryEmail"))}</span></div><div class="sum-total" data-v-600bd142${_scopeId}><span data-v-600bd142${_scopeId}>${ssrInterpolate(_ctx.$t("common.total"))}</span><strong data-v-600bd142${_scopeId}>${ssrInterpolate(formatPrice(unref(order).total))}</strong></div></section><aside class="side-col" data-v-600bd142${_scopeId}><section class="panel" data-v-600bd142${_scopeId}><h2 class="panel-title" data-v-600bd142${_scopeId}>${ssrInterpolate(_ctx.$t("account.deliveryInfo"))}</h2><p class="info-line" data-v-600bd142${_scopeId}><i class="iconly-Curved-Message" aria-hidden="true" data-v-600bd142${_scopeId}></i><span dir="ltr" data-v-600bd142${_scopeId}>${ssrInterpolate(unref(order).email)}</span></p>`);
              if (unref(order).phone) {
                _push2(`<p class="info-line" data-v-600bd142${_scopeId}><i class="iconly-Curved-Call" aria-hidden="true" data-v-600bd142${_scopeId}></i><span dir="ltr" data-v-600bd142${_scopeId}>${ssrInterpolate(unref(order).phone)}</span></p>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(order).paymentMethod) {
                _push2(`<p class="info-line" data-v-600bd142${_scopeId}><i class="iconly-Curved-Wallet" aria-hidden="true" data-v-600bd142${_scopeId}></i><span data-v-600bd142${_scopeId}>${ssrInterpolate(unref(order).paymentMethod)}</span></p>`);
              } else {
                _push2(`<!---->`);
              }
              if (unref(order).datePaid) {
                _push2(`<p class="info-line" data-v-600bd142${_scopeId}><i class="iconly-Curved-TickSquare" aria-hidden="true" data-v-600bd142${_scopeId}></i><span data-v-600bd142${_scopeId}>${ssrInterpolate(_ctx.$t("account.paidOn", { date: formatDate(unref(order).datePaid, true) }))}</span></p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<p class="hint" data-v-600bd142${_scopeId}>${ssrInterpolate(_ctx.$t("payment.stayReachableText"))}</p></section>`);
              if (unref(order).notes.length || unref(order).customerNote) {
                _push2(`<section class="panel" data-v-600bd142${_scopeId}><h2 class="panel-title" data-v-600bd142${_scopeId}>${ssrInterpolate(_ctx.$t("account.messages"))}</h2>`);
                if (unref(order).customerNote) {
                  _push2(`<div class="note mine" data-v-600bd142${_scopeId}><small data-v-600bd142${_scopeId}>${ssrInterpolate(_ctx.$t("account.yourNote"))}</small><p data-v-600bd142${_scopeId}>${ssrInterpolate(unref(order).customerNote)}</p></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`<!--[-->`);
                ssrRenderList(unref(order).notes, (note, i) => {
                  _push2(`<div class="note" data-v-600bd142${_scopeId}><small data-v-600bd142${_scopeId}>${ssrInterpolate(formatDate(note.date, true))}</small><p data-v-600bd142${_scopeId}>${ssrInterpolate(plain(note.text))}</p></div>`);
                });
                _push2(`<!--]--></section>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`<a${ssrRenderAttr("href", ("whatsappLink" in _ctx ? _ctx.whatsappLink : unref(whatsappLink))(_ctx.$t("success.whatsappMessage", { id: unref(order).number })))} target="_blank" rel="noopener" class="btn btn-success btn-block" data-v-600bd142${_scopeId}><i class="fa-brands fa-whatsapp" data-v-600bd142${_scopeId}></i> ${ssrInterpolate(_ctx.$t("account.helpWithOrder"))}</a></aside></div><!--]-->`);
            }
          } else {
            return [
              createVNode(_component_NuxtLink, {
                to: "/account/orders",
                class: "back"
              }, {
                default: withCtx(() => [
                  createVNode("i", {
                    class: "fa-solid fa-arrow-left flip-rtl",
                    "aria-hidden": "true"
                  }),
                  createTextVNode(" " + toDisplayString(_ctx.$t("account.backToOrders")), 1)
                ]),
                _: 1
              }),
              unref(pending) ? (openBlock(), createBlock("div", {
                key: 0,
                class: "placeholder-glow"
              }, [
                createVNode("span", {
                  class: "placeholder col-12 rounded-4 mb-3",
                  style: { "height": "90px" }
                }),
                createVNode("span", {
                  class: "placeholder col-12 rounded-4",
                  style: { "height": "260px" }
                })
              ])) : unref(error) || !unref(order) ? (openBlock(), createBlock("div", {
                key: 1,
                class: "panel empty"
              }, [
                createVNode(_component_AstroBot, {
                  mood: "sad",
                  size: 100
                }),
                createVNode("p", null, toDisplayString(_ctx.$t("account.orderNotFound")), 1)
              ])) : (openBlock(), createBlock(Fragment, { key: 2 }, [
                createVNode("section", {
                  class: ["panel status-panel", { "is-payable": unref(order).payable }]
                }, [
                  createVNode("div", null, [
                    createVNode(_component_OrderStatus, {
                      status: unref(order).status
                    }, null, 8, ["status"]),
                    createVNode("p", { class: "status-text" }, toDisplayString(_ctx.$te(`account.statusText.${unref(order).status}`) ? _ctx.$t(`account.statusText.${unref(order).status}`) : ""), 1),
                    createVNode("small", { class: "muted" }, toDisplayString(_ctx.$t("account.placedOn", { date: formatDate(unref(order).date, true) })), 1)
                  ]),
                  unref(order).payable ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "pay-box"
                  }, [
                    createVNode("button", {
                      type: "button",
                      class: "btn btn-primary btn-lg",
                      disabled: unref(isPaying),
                      onClick: pay
                    }, [
                      unref(isPaying) ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: "spinner-border spinner-border-sm",
                        "aria-hidden": "true"
                      })) : (openBlock(), createBlock("i", {
                        key: 1,
                        class: "fa-solid fa-lock"
                      })),
                      createTextVNode(" " + toDisplayString(unref(isPaying) ? _ctx.$t("product.redirecting") : _ctx.$t("product.payAmount", { amount: formatPrice(unref(order).total) })), 1)
                    ], 8, ["disabled"]),
                    unref(payError) ? (openBlock(), createBlock("p", {
                      key: 0,
                      class: "pay-error",
                      role: "alert"
                    }, toDisplayString(_ctx.$t("product.payError")), 1)) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true)
                ], 2),
                createVNode("div", { class: "detail-grid" }, [
                  createVNode("section", { class: "panel" }, [
                    createVNode("h2", { class: "panel-title" }, toDisplayString(_ctx.$t("account.items")), 1),
                    createVNode("ul", { class: "items" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(order).items, (item) => {
                        return openBlock(), createBlock("li", {
                          key: item.id
                        }, [
                          item.slug ? (openBlock(), createBlock(_component_NuxtLink, {
                            key: 0,
                            to: `/shop/product/${item.slug}`,
                            class: "item-img"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_ProductThumb, {
                                src: item.image,
                                alt: item.name,
                                size: 64
                              }, null, 8, ["src", "alt"])
                            ]),
                            _: 2
                          }, 1032, ["to"])) : (openBlock(), createBlock("span", {
                            key: 1,
                            class: "item-img"
                          }, [
                            createVNode(_component_ProductThumb, {
                              src: item.image,
                              alt: item.name,
                              size: 64
                            }, null, 8, ["src", "alt"])
                          ])),
                          createVNode("span", { class: "item-info" }, [
                            createVNode("b", null, toDisplayString(item.name), 1),
                            (openBlock(true), createBlock(Fragment, null, renderList(item.options, (opt) => {
                              return openBlock(), createBlock("small", {
                                key: opt.label
                              }, toDisplayString(opt.label) + " : " + toDisplayString(opt.value), 1);
                            }), 128)),
                            createVNode("small", null, "\xD7 " + toDisplayString(item.quantity), 1)
                          ]),
                          createVNode("strong", { class: "item-total" }, toDisplayString(formatPrice(item.total)), 1)
                        ]);
                      }), 128))
                    ]),
                    createVNode("div", { class: "sum-row" }, [
                      createVNode("span", null, toDisplayString(_ctx.$t("common.subtotal")), 1),
                      createVNode("span", null, toDisplayString(formatPrice(unref(order).subtotal)), 1)
                    ]),
                    unref(order).discount ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "sum-row"
                    }, [
                      createVNode("span", null, toDisplayString(_ctx.$t("account.discount")), 1),
                      createVNode("span", null, "-" + toDisplayString(formatPrice(unref(order).discount)), 1)
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "sum-row" }, [
                      createVNode("span", null, toDisplayString(_ctx.$t("checkout.deliveryLabel")), 1),
                      createVNode("span", null, toDisplayString(_ctx.$t("checkout.deliveryEmail")), 1)
                    ]),
                    createVNode("div", { class: "sum-total" }, [
                      createVNode("span", null, toDisplayString(_ctx.$t("common.total")), 1),
                      createVNode("strong", null, toDisplayString(formatPrice(unref(order).total)), 1)
                    ])
                  ]),
                  createVNode("aside", { class: "side-col" }, [
                    createVNode("section", { class: "panel" }, [
                      createVNode("h2", { class: "panel-title" }, toDisplayString(_ctx.$t("account.deliveryInfo")), 1),
                      createVNode("p", { class: "info-line" }, [
                        createVNode("i", {
                          class: "iconly-Curved-Message",
                          "aria-hidden": "true"
                        }),
                        createVNode("span", { dir: "ltr" }, toDisplayString(unref(order).email), 1)
                      ]),
                      unref(order).phone ? (openBlock(), createBlock("p", {
                        key: 0,
                        class: "info-line"
                      }, [
                        createVNode("i", {
                          class: "iconly-Curved-Call",
                          "aria-hidden": "true"
                        }),
                        createVNode("span", { dir: "ltr" }, toDisplayString(unref(order).phone), 1)
                      ])) : createCommentVNode("", true),
                      unref(order).paymentMethod ? (openBlock(), createBlock("p", {
                        key: 1,
                        class: "info-line"
                      }, [
                        createVNode("i", {
                          class: "iconly-Curved-Wallet",
                          "aria-hidden": "true"
                        }),
                        createVNode("span", null, toDisplayString(unref(order).paymentMethod), 1)
                      ])) : createCommentVNode("", true),
                      unref(order).datePaid ? (openBlock(), createBlock("p", {
                        key: 2,
                        class: "info-line"
                      }, [
                        createVNode("i", {
                          class: "iconly-Curved-TickSquare",
                          "aria-hidden": "true"
                        }),
                        createVNode("span", null, toDisplayString(_ctx.$t("account.paidOn", { date: formatDate(unref(order).datePaid, true) })), 1)
                      ])) : createCommentVNode("", true),
                      createVNode("p", { class: "hint" }, toDisplayString(_ctx.$t("payment.stayReachableText")), 1)
                    ]),
                    unref(order).notes.length || unref(order).customerNote ? (openBlock(), createBlock("section", {
                      key: 0,
                      class: "panel"
                    }, [
                      createVNode("h2", { class: "panel-title" }, toDisplayString(_ctx.$t("account.messages")), 1),
                      unref(order).customerNote ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "note mine"
                      }, [
                        createVNode("small", null, toDisplayString(_ctx.$t("account.yourNote")), 1),
                        createVNode("p", null, toDisplayString(unref(order).customerNote), 1)
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(order).notes, (note, i) => {
                        return openBlock(), createBlock("div", {
                          key: i,
                          class: "note"
                        }, [
                          createVNode("small", null, toDisplayString(formatDate(note.date, true)), 1),
                          createVNode("p", null, toDisplayString(plain(note.text)), 1)
                        ]);
                      }), 128))
                    ])) : createCommentVNode("", true),
                    createVNode("a", {
                      href: ("whatsappLink" in _ctx ? _ctx.whatsappLink : unref(whatsappLink))(_ctx.$t("success.whatsappMessage", { id: unref(order).number })),
                      target: "_blank",
                      rel: "noopener",
                      class: "btn btn-success btn-block"
                    }, [
                      createVNode("i", { class: "fa-brands fa-whatsapp" }),
                      createTextVNode(" " + toDisplayString(_ctx.$t("account.helpWithOrder")), 1)
                    ], 8, ["href"])
                  ])
                ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/orders/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-600bd142"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-ClySnV08.mjs.map
