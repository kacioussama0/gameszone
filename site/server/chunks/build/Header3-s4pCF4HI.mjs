import { d as _export_sfc, f as useRoute, g as useRouter, a as useI18n, u as useLocalCart, h as useAccount, i as useTheme, _ as __nuxt_component_2$1, j as _imports_0, k as __nuxt_component_1$1, C as CONTACT, w as whatsappLink, S as SOCIALS, l as PLATFORMS, c as __nuxt_component_1, e as useFetch, P as PAY_METHODS } from './server.mjs';
import { defineComponent, ref, watch, computed, unref, withCtx, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, mergeProps, withAsyncContext, useSSRContext } from 'vue';
import { ssrRenderClass, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle, ssrRenderAttrs } from 'vue/server-renderer';

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "ProductThumb",
  __ssrInlineRender: true,
  props: {
    src: {},
    alt: { default: "" },
    size: {},
    loading: { default: "lazy" }
  },
  setup(__props) {
    const props = __props;
    const failed = ref(false);
    watch(() => props.src, () => failed.value = false);
    const img = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AstroBot = __nuxt_component_1;
      if (__props.src && !unref(failed)) {
        _push(`<img${ssrRenderAttrs(mergeProps({
          ref_key: "img",
          ref: img,
          src: __props.src,
          alt: __props.alt,
          width: __props.size,
          height: __props.size,
          loading: __props.loading
        }, _attrs))} data-v-5c75f7c2>`);
      } else {
        _push(`<span${ssrRenderAttrs(mergeProps({
          class: "thumb-mascot",
          style: { width: `${__props.size}px`, height: `${__props.size}px` },
          role: "img",
          "aria-label": __props.alt || void 0
        }, _attrs))} data-v-5c75f7c2>`);
        _push(ssrRenderComponent(_component_AstroBot, {
          head: "",
          mood: "happy",
          size: Math.round(__props.size * 0.78)
        }, null, _parent));
        _push(`</span>`);
      }
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ProductThumb.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_4$1 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-5c75f7c2"]]);
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "Canvas",
  __ssrInlineRender: true,
  setup(__props) {
    const { cart, totalPrice, itemsCount } = useLocalCart();
    const { t } = useI18n();
    const formatPrice = (value) => `${Number(value).toLocaleString("fr-FR")} ${t("common.currency")}`;
    const productLink = (item) => item.slug ? `/shop/product/${item.slug}` : "/cart";
    const drawer = ref(null);
    const closeDrawer = () => {
      var _a, _b;
      const el = drawer.value;
      if (el) (_b = (_a = (void 0).bootstrap) == null ? void 0 : _a.Offcanvas.getInstance(el)) == null ? void 0 : _b.hide();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_2$1;
      const _component_ProductThumb = __nuxt_component_4$1;
      const _component_AstroBot = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "drawer",
        ref: drawer,
        class: "offcanvas offcanvas-end cart-drawer",
        "data-bs-scroll": "false",
        tabindex: "-1",
        id: "offcanvasRight",
        "aria-labelledby": "cart-drawer-title"
      }, _attrs))} data-v-1a511eaf><div class="drawer-header" data-v-1a511eaf><div class="drawer-heading" data-v-1a511eaf><h2 class="drawer-title" id="cart-drawer-title" data-v-1a511eaf>${ssrInterpolate(_ctx.$t("header.myCart"))}</h2>`);
      if (unref(itemsCount)) {
        _push(`<span class="drawer-count" data-v-1a511eaf>${ssrInterpolate(_ctx.$t("cart.itemsCount", { count: unref(itemsCount) }, unref(itemsCount)))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><button type="button" class="close-btn" data-bs-dismiss="offcanvas"${ssrRenderAttr("aria-label", _ctx.$t("common.close"))} data-v-1a511eaf><i class="fa-solid fa-xmark" data-v-1a511eaf></i></button></div>`);
      if (unref(cart).length) {
        _push(`<!--[--><ul${ssrRenderAttrs({
          name: "drawer-item",
          class: "drawer-items"
        })} data-v-1a511eaf>`);
        ssrRenderList(unref(cart), (item) => {
          var _a;
          _push(`<li class="drawer-item" data-v-1a511eaf>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: productLink(item),
            class: "item-media",
            onClick: closeDrawer
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_ProductThumb, {
                  src: item.image,
                  alt: item.name,
                  size: 84
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_ProductThumb, {
                    src: item.image,
                    alt: item.name,
                    size: 84
                  }, null, 8, ["src", "alt"])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`<div class="item-body" data-v-1a511eaf>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: productLink(item),
            class: "item-name",
            onClick: closeDrawer
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          if ((_a = item.variation) == null ? void 0 : _a.length) {
            _push(`<div class="item-options" data-v-1a511eaf><!--[-->`);
            ssrRenderList(item.variation, (v) => {
              _push(`<span data-v-1a511eaf>${ssrInterpolate(v.value)}</span>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<strong class="item-total" data-v-1a511eaf>${ssrInterpolate(formatPrice(Number(item.price) * item.quantity))}</strong><div class="item-row" data-v-1a511eaf><div class="qty" role="group"${ssrRenderAttr("aria-label", _ctx.$t("common.quantity"))} data-v-1a511eaf><button type="button"${ssrRenderAttr("aria-label", _ctx.$t("product.decrease"))} data-v-1a511eaf><i class="${ssrRenderClass(item.quantity > 1 ? "fa-solid fa-minus" : "fa-regular fa-trash-can")}" data-v-1a511eaf></i></button><span data-v-1a511eaf>${ssrInterpolate(item.quantity)}</span><button type="button"${ssrRenderAttr("aria-label", _ctx.$t("product.increase"))} data-v-1a511eaf><i class="fa-solid fa-plus" data-v-1a511eaf></i></button></div><button type="button" class="remove-link"${ssrRenderAttr("aria-label", _ctx.$t("cart.remove", { name: item.name }))} data-v-1a511eaf>${ssrInterpolate(_ctx.$t("cart.removeShort"))}</button></div></div></li>`);
        });
        _push(`</ul><div class="drawer-footer" data-v-1a511eaf><div class="summary-row" data-v-1a511eaf><span data-v-1a511eaf>${ssrInterpolate(_ctx.$t("common.subtotal"))}</span><span data-v-1a511eaf>${ssrInterpolate(formatPrice(unref(totalPrice)))}</span></div><div class="summary-row" data-v-1a511eaf><span data-v-1a511eaf>${ssrInterpolate(_ctx.$t("checkout.deliveryLabel"))}</span><span class="free" data-v-1a511eaf>${ssrInterpolate(_ctx.$t("checkout.deliveryEmail"))}</span></div><div class="summary-total" data-v-1a511eaf><span data-v-1a511eaf>${ssrInterpolate(_ctx.$t("common.total"))}</span><strong data-v-1a511eaf>${ssrInterpolate(formatPrice(unref(totalPrice)))}</strong></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/checkout",
          class: "btn btn-primary btn-lg btn-block checkout-btn",
          onClick: closeDrawer
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="fa-solid fa-lock" aria-hidden="true" data-v-1a511eaf${_scopeId}></i> ${ssrInterpolate(_ctx.$t("cart.checkout"))}`);
            } else {
              return [
                createVNode("i", {
                  class: "fa-solid fa-lock",
                  "aria-hidden": "true"
                }),
                createTextVNode(" " + toDisplayString(_ctx.$t("cart.checkout")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/cart",
          class: "view-cart",
          onClick: closeDrawer
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("cart.viewCart"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("cart.viewCart")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<ul class="pay-methods"${ssrRenderAttr("aria-label", _ctx.$t("cart.paymentAccepted"))} data-v-1a511eaf><!--[-->`);
        ssrRenderList("PAY_METHODS" in _ctx ? _ctx.PAY_METHODS : unref(PAY_METHODS), (m) => {
          _push(`<li${ssrRenderAttr("title", m.title)} data-v-1a511eaf><i class="${ssrRenderClass(m.icon)}" aria-hidden="true" data-v-1a511eaf></i>${ssrInterpolate(m.title)}</li>`);
        });
        _push(`<!--]--></ul><p class="email-note" data-v-1a511eaf><i class="fa-regular fa-envelope" aria-hidden="true" data-v-1a511eaf></i> ${ssrInterpolate(_ctx.$t("cart.shippingNotice"))}</p></div><!--]-->`);
      } else {
        _push(`<div class="drawer-empty" data-v-1a511eaf>`);
        _push(ssrRenderComponent(_component_AstroBot, {
          mood: "sad",
          size: 120
        }, null, _parent));
        _push(`<h3 data-v-1a511eaf>${ssrInterpolate(_ctx.$t("cart.empty"))}</h3><p data-v-1a511eaf>${ssrInterpolate(_ctx.$t("cart.emptyCanvasText"))}</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/shop",
          class: "btn btn-primary btn-lg",
          onClick: closeDrawer
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("cart.continueShopping"))}`);
            } else {
              return [
                createTextVNode(toDisplayString(_ctx.$t("cart.continueShopping")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Canvas.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-1a511eaf"]]);
const MAX_CATEGORIES = 5;
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "Menu",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/menu",
      { key: "header-menu" },
      "$pxW5wUpiIi"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const categories = computed(() => (data.value || []).slice(0, MAX_CATEGORIES));
    const linkTo = (category, main = false) => main || category.children.length ? `/category/${category.slug}` : `/shop?category=${category.id}`;
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_2$1;
      _push(`<ul${ssrRenderAttrs(mergeProps({ class: "nav navbar-nav gz-menu" }, _attrs))} data-v-b1176558><!--[-->`);
      ssrRenderList(unref(categories), (category) => {
        _push(`<li class="${ssrRenderClass(category.children.length ? "has-mega-menu sub-menu-down" : "is-leaf")}" data-v-b1176558>`);
        if (category.children.length) {
          _push(`<!--[--><a${ssrRenderAttr("href", linkTo(category, true))} aria-haspopup="true" data-v-b1176558>${ssrInterpolate(category.name)}</a><div class="mega-menu" data-v-b1176558><div class="mega-head" data-v-b1176558><span class="mega-title" data-v-b1176558>${ssrInterpolate(category.name)}</span>`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: linkTo(category, true),
            class: "mega-all"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(_ctx.$t("common.seeAll"))} <i class="fa-solid fa-arrow-right flip-rtl" aria-hidden="true" data-v-b1176558${_scopeId}></i>`);
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
            _: 2
          }, _parent));
          _push(`</div><ul class="mega-links" data-v-b1176558><!--[-->`);
          ssrRenderList(category.children, (child) => {
            _push(`<li data-v-b1176558>`);
            _push(ssrRenderComponent(_component_NuxtLink, {
              to: linkTo(child)
            }, {
              default: withCtx((_, _push2, _parent2, _scopeId) => {
                if (_push2) {
                  _push2(`${ssrInterpolate(child.name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(child.name), 1)
                  ];
                }
              }),
              _: 2
            }, _parent));
            if (child.children.length) {
              _push(`<ul class="mega-sub" data-v-b1176558><!--[-->`);
              ssrRenderList(child.children, (grandchild) => {
                _push(`<li data-v-b1176558>`);
                _push(ssrRenderComponent(_component_NuxtLink, {
                  to: linkTo(grandchild)
                }, {
                  default: withCtx((_, _push2, _parent2, _scopeId) => {
                    if (_push2) {
                      _push2(`${ssrInterpolate(grandchild.name)}`);
                    } else {
                      return [
                        createTextVNode(toDisplayString(grandchild.name), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent));
                _push(`</li>`);
              });
              _push(`<!--]--></ul>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</li>`);
          });
          _push(`<!--]--></ul></div><!--]-->`);
        } else {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: linkTo(category, true)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(category.name)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(category.name), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        }
        _push(`</li>`);
      });
      _push(`<!--]--></ul>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("elements/Menu.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Menu = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-b1176558"]]);
const MAX_RESULTS = 6;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "Header3",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    useRouter();
    const { t } = useI18n();
    const { itemsCount } = useLocalCart();
    const { account, isLoggedIn, initials } = useAccount();
    const { isDark } = useTheme();
    const isMenu = ref(false);
    const closeMenu = () => isMenu.value = false;
    watch(isMenu, (open) => {
      (void 0).body.style.overflow = open ? "hidden" : "";
    });
    ref(null);
    ref(null);
    const term = ref("");
    const results = ref([]);
    const isLoading = ref(false);
    const isOpen = ref(false);
    const activeIndex = ref(-1);
    const recentSearches = ref([]);
    let debounce = null;
    let requestId = 0;
    const trimmed = computed(() => term.value.trim());
    watch(term, (value) => {
      activeIndex.value = -1;
      if (debounce) clearTimeout(debounce);
      const q = value.trim();
      if (q.length < 2) {
        results.value = [];
        isLoading.value = false;
        return;
      }
      isLoading.value = true;
      debounce = setTimeout(async () => {
        const id = ++requestId;
        try {
          const res = await $fetch("/api/search", { query: { q } });
          if (id !== requestId) return;
          results.value = (res.hits || []).slice(0, MAX_RESULTS);
        } catch (err) {
          console.error(err);
          if (id === requestId) results.value = [];
        } finally {
          if (id === requestId) isLoading.value = false;
        }
      }, 300);
    });
    const closeSearch = () => {
      isOpen.value = false;
      activeIndex.value = -1;
    };
    const isPhone = () => false;
    computed(() => isOpen.value && isPhone());
    watch(isOpen, (open) => {
      return;
    });
    ref(null);
    const searchBar = ref(false);
    const escapeHtml = (text) => text.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
    function highlight(text, query) {
      const safe = escapeHtml(text || "");
      const q = escapeHtml(query).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      return q ? safe.replace(new RegExp(`(${q})`, "gi"), "<mark>$1</mark>") : safe;
    }
    const formatPrice = (value) => `${Number(value).toLocaleString("fr-FR")} ${t("common.currency")}`;
    const isScrolled = ref(false);
    watch(() => route.fullPath, () => {
      closeMenu();
      closeSearch();
      searchBar.value = false;
      if (route.path === "/shop" && route.query.search) term.value = String(route.query.search);
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_NuxtLink = __nuxt_component_2$1;
      const _component_LanguageSwitcher = __nuxt_component_1$1;
      const _component_ProductThumb = __nuxt_component_4$1;
      const _component_AstroBot = __nuxt_component_1;
      const _component_Canvas = __nuxt_component_4;
      _push(`<!--[--><div class="${ssrRenderClass([{ "is-scrolled": unref(isScrolled) }, "gs-header"])}" data-v-660efc88><div class="gs-main" data-v-660efc88><div class="${ssrRenderClass([{ open: unref(isMenu) }, "drawer-backdrop d-lg-none"])}" data-v-660efc88></div><div class="container gs-main-inner" data-v-660efc88><button type="button" class="icon-btn menu-btn d-lg-none"${ssrRenderAttr("aria-label", _ctx.$t("header.menu"))}${ssrRenderAttr("aria-expanded", unref(isMenu))} data-v-660efc88><i class="fa-solid fa-bars" data-v-660efc88></i></button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "gs-logo",
        "aria-label": "GamesZone"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="" width="37" height="40" data-v-660efc88${_scopeId}><span class="logo-word" aria-hidden="true" data-v-660efc88${_scopeId}>Games<b data-v-660efc88${_scopeId}>Zone</b></span>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: "",
                width: "37",
                height: "40"
              }),
              createVNode("span", {
                class: "logo-word",
                "aria-hidden": "true"
              }, [
                createTextVNode("Games"),
                createVNode("b", null, "Zone")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<nav class="${ssrRenderClass([{ show: unref(isMenu) }, "header-nav navbar-collapse gs-nav"])}"${ssrRenderAttr("aria-label", _ctx.$t("header.menu"))} data-v-660efc88><div class="drawer-head d-lg-none" data-v-660efc88>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "drawer-logo",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="GamesZone" width="37" height="40" data-v-660efc88${_scopeId}>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: "GamesZone",
                width: "37",
                height: "40"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button type="button" class="icon-btn"${ssrRenderAttr("aria-label", _ctx.$t("common.close"))} data-v-660efc88><i class="fa-solid fa-xmark" data-v-660efc88></i></button></div><div class="drawer-quick d-lg-none" data-v-660efc88>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/shop?on_sale=true",
        class: "quick-chip",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fa-solid fa-percent" data-v-660efc88${_scopeId}></i>${ssrInterpolate(_ctx.$t("home.promotions"))}`);
          } else {
            return [
              createVNode("i", { class: "fa-solid fa-percent" }),
              createTextVNode(toDisplayString(_ctx.$t("home.promotions")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/shop?new=1",
        class: "quick-chip",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fa-solid fa-star" data-v-660efc88${_scopeId}></i>${ssrInterpolate(_ctx.$t("home.ctaNew"))}`);
          } else {
            return [
              createVNode("i", { class: "fa-solid fa-star" }),
              createTextVNode(toDisplayString(_ctx.$t("home.ctaNew")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/shop",
        class: "quick-chip",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="fa-solid fa-store" data-v-660efc88${_scopeId}></i>${ssrInterpolate(_ctx.$t("common.seeAllProducts"))}`);
          } else {
            return [
              createVNode("i", { class: "fa-solid fa-store" }),
              createTextVNode(toDisplayString(_ctx.$t("common.seeAllProducts")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><p class="drawer-label d-lg-none" data-v-660efc88>${ssrInterpolate(_ctx.$t("header.categories"))}</p>`);
      _push(ssrRenderComponent(Menu, null, null, _parent));
      _push(`<div class="drawer-foot d-lg-none" data-v-660efc88><div class="drawer-row" data-v-660efc88>`);
      _push(ssrRenderComponent(_component_LanguageSwitcher, { class: "drawer-lang" }, null, _parent));
      _push(`<button type="button" class="drawer-cart" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" data-v-660efc88><i class="iconly-Curved-Buy" data-v-660efc88></i> ${ssrInterpolate(_ctx.$t("bottomNav.cart"))} `);
      if (unref(itemsCount) > 0) {
        _push(`<span class="drawer-cart-count" data-v-660efc88>${ssrInterpolate(unref(itemsCount))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</button></div><button type="button" class="drawer-link drawer-theme"${ssrRenderAttr("aria-pressed", unref(isDark))} data-v-660efc88><i class="${ssrRenderClass(unref(isDark) ? "fa-regular fa-sun" : "fa-regular fa-moon")}" aria-hidden="true" data-v-660efc88></i><span data-v-660efc88>${ssrInterpolate(unref(isDark) ? _ctx.$t("header.lightMode") : _ctx.$t("header.darkMode"))}</span></button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(isLoggedIn) ? "/account" : "/account/login",
        class: "drawer-link",
        onClick: closeMenu
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<i class="iconly-Curved-User" data-v-660efc88${_scopeId}></i><span data-v-660efc88${_scopeId}>${ssrInterpolate(unref(isLoggedIn) ? _ctx.$t("account.myAccount") : `${_ctx.$t("account.login")} / ${_ctx.$t("account.createAccount")}`)}</span>`);
          } else {
            return [
              createVNode("i", { class: "iconly-Curved-User" }),
              createVNode("span", null, toDisplayString(unref(isLoggedIn) ? _ctx.$t("account.myAccount") : `${_ctx.$t("account.login")} / ${_ctx.$t("account.createAccount")}`), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a${ssrRenderAttr("href", `tel:${("CONTACT" in _ctx ? _ctx.CONTACT : unref(CONTACT)).tel}`)} class="drawer-link" data-v-660efc88><i class="iconly-Curved-Call" data-v-660efc88></i><span data-v-660efc88>${ssrInterpolate(_ctx.$t("header.help"))} <b dir="ltr" data-v-660efc88>${ssrInterpolate(("CONTACT" in _ctx ? _ctx.CONTACT : unref(CONTACT)).phone)}</b></span></a><a${ssrRenderAttr("href", ("whatsappLink" in _ctx ? _ctx.whatsappLink : unref(whatsappLink))())} target="_blank" rel="noopener" class="drawer-link" data-v-660efc88><i class="fa-brands fa-whatsapp" data-v-660efc88></i><span data-v-660efc88>${ssrInterpolate(_ctx.$t("footer.whatsapp"))}</span></a><div class="drawer-socials" data-v-660efc88><!--[-->`);
      ssrRenderList("SOCIALS" in _ctx ? _ctx.SOCIALS : unref(SOCIALS), (social) => {
        _push(`<a${ssrRenderAttr("href", social.url)} target="_blank" rel="noopener"${ssrRenderAttr("aria-label", social.name)} data-v-660efc88><i class="${ssrRenderClass([social.icon, "fab"])}" data-v-660efc88></i></a>`);
      });
      _push(`<!--]--></div></div></nav><div class="gs-actions" data-v-660efc88><button type="button" class="${ssrRenderClass([{ active: unref(searchBar) }, "action round"])}"${ssrRenderAttr("aria-label", _ctx.$t("header.searchLabel"))}${ssrRenderAttr("aria-expanded", unref(searchBar))} data-v-660efc88><i class="${ssrRenderClass(unref(searchBar) ? "fa-solid fa-xmark" : "iconly-Curved-Search")}" data-v-660efc88></i></button>`);
      _push(ssrRenderComponent(_component_LanguageSwitcher, { class: "action-lang" }, null, _parent));
      _push(`<button type="button" class="action round theme-action d-none d-sm-flex"${ssrRenderAttr("aria-label", unref(isDark) ? _ctx.$t("header.lightMode") : _ctx.$t("header.darkMode"))}${ssrRenderAttr("title", unref(isDark) ? _ctx.$t("header.lightMode") : _ctx.$t("header.darkMode"))}${ssrRenderAttr("aria-pressed", unref(isDark))} data-v-660efc88><i class="${ssrRenderClass(unref(isDark) ? "fa-regular fa-sun" : "fa-regular fa-moon")}" aria-hidden="true" data-v-660efc88></i></button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: unref(isLoggedIn) ? "/account" : "/account/login",
        class: "action round account-action",
        "aria-label": unref(isLoggedIn) ? _ctx.$t("account.myAccount") : _ctx.$t("account.login"),
        title: unref(isLoggedIn) ? `${(_a = unref(account)) == null ? void 0 : _a.first_name} ${(_b = unref(account)) == null ? void 0 : _b.last_name}` : _ctx.$t("account.login")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(isLoggedIn)) {
              _push2(`<span class="avatar" aria-hidden="true" data-v-660efc88${_scopeId}>${ssrInterpolate(unref(initials))}</span>`);
            } else {
              _push2(`<i class="iconly-Curved-User" data-v-660efc88${_scopeId}></i>`);
            }
          } else {
            return [
              unref(isLoggedIn) ? (openBlock(), createBlock("span", {
                key: 0,
                class: "avatar",
                "aria-hidden": "true"
              }, toDisplayString(unref(initials)), 1)) : (openBlock(), createBlock("i", {
                key: 1,
                class: "iconly-Curved-User"
              }))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button type="button" class="action round cart-action" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight"${ssrRenderAttr("aria-label", _ctx.$t("bottomNav.cart"))} data-v-660efc88><span class="cart-icon" data-v-660efc88><i class="iconly-Curved-Buy" data-v-660efc88></i>`);
      if (unref(itemsCount) > 0) {
        _push(`<span class="cart-badge" data-v-660efc88>${ssrInterpolate(unref(itemsCount) > 99 ? "99+" : unref(itemsCount))}</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</span></button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/shop",
        class: "btn btn-primary btn-sm shop-btn d-none d-lg-inline-flex"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("header.shop"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("header.shop")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="${ssrRenderClass([{ open: unref(searchBar) }, "gs-searchbar"])}" data-v-660efc88><div class="container" data-v-660efc88><div class="${ssrRenderClass([{ "sheet-open": unref(isOpen) }, "gs-search"])}" data-v-660efc88><div class="sheet-bar" data-v-660efc88><button type="button" class="sheet-back"${ssrRenderAttr("aria-label", _ctx.$t("common.close"))} data-v-660efc88><i class="fa-solid fa-arrow-left flip-rtl" data-v-660efc88></i></button><form role="search" class="${ssrRenderClass([{ focused: unref(isOpen) }, "search-field"])}" data-v-660efc88><i class="iconly-Light-Search search-icon" aria-hidden="true" data-v-660efc88></i><input${ssrRenderAttr("value", unref(term))} type="search" name="search" autocomplete="off" enterkeyhint="search"${ssrRenderAttr("placeholder", _ctx.$t("header.searchPlaceholder"))}${ssrRenderAttr("aria-label", _ctx.$t("header.searchLabel"))} aria-controls="gs-search-panel"${ssrRenderAttr("aria-expanded", unref(isOpen))}${ssrRenderAttr("aria-activedescendant", unref(activeIndex) >= 0 ? `gs-hit-${unref(activeIndex)}` : void 0)} data-v-660efc88>`);
      if (unref(isLoading)) {
        _push(`<span class="spinner-border spinner-border-sm search-spinner" aria-hidden="true" data-v-660efc88></span>`);
      } else if (unref(term)) {
        _push(`<button type="button" class="clear-btn"${ssrRenderAttr("aria-label", _ctx.$t("header.clear"))} data-v-660efc88><i class="fa-solid fa-xmark" data-v-660efc88></i></button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit" class="submit-btn" data-v-660efc88>${ssrInterpolate(_ctx.$t("header.searchButton"))}</button></form></div><div id="gs-search-panel" class="search-panel" role="listbox" style="${ssrRenderStyle(unref(isOpen) ? null : { display: "none" })}" data-v-660efc88>`);
      if (unref(trimmed).length < 2) {
        _push(`<!--[-->`);
        if (unref(recentSearches).length) {
          _push(`<div class="panel-section" data-v-660efc88><div class="panel-head" data-v-660efc88><span data-v-660efc88>${ssrInterpolate(_ctx.$t("header.recent"))}</span><button type="button" class="link-btn" data-v-660efc88>${ssrInterpolate(_ctx.$t("header.clear"))}</button></div><div class="chip-row" data-v-660efc88><!--[-->`);
          ssrRenderList(unref(recentSearches), (s) => {
            _push(`<button type="button" class="chip" data-v-660efc88><i class="fa-solid fa-clock-rotate-left" data-v-660efc88></i>${ssrInterpolate(s)}</button>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="panel-section" data-v-660efc88><div class="panel-head" data-v-660efc88><span data-v-660efc88>${ssrInterpolate(_ctx.$t("header.trending"))}</span></div><div class="chip-row" data-v-660efc88><!--[-->`);
        ssrRenderList(unref(PLATFORMS), (platform) => {
          _push(ssrRenderComponent(_component_NuxtLink, {
            key: platform.id,
            to: `/shop?category=${platform.id}`,
            class: "chip",
            onClick: closeSearch
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<i class="${ssrRenderClass(platform.icon)}" data-v-660efc88${_scopeId}></i>${ssrInterpolate(platform.label)}`);
              } else {
                return [
                  createVNode("i", {
                    class: platform.icon
                  }, null, 2),
                  createTextVNode(toDisplayString(platform.label), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]-->`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/shop?on_sale=true",
          class: "chip",
          onClick: closeSearch
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<i class="fa-solid fa-percent" data-v-660efc88${_scopeId}></i>${ssrInterpolate(_ctx.$t("home.promotions"))}`);
            } else {
              return [
                createVNode("i", { class: "fa-solid fa-percent" }),
                createTextVNode(toDisplayString(_ctx.$t("home.promotions")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></div><!--]-->`);
      } else {
        _push(`<!--[-->`);
        if (unref(results).length) {
          _push(`<ul class="hit-list" data-v-660efc88><!--[-->`);
          ssrRenderList(unref(results), (hit, index) => {
            var _a2;
            _push(`<li${ssrRenderAttr("id", `gs-hit-${index}`)} role="option"${ssrRenderAttr("aria-selected", index === unref(activeIndex))} class="${ssrRenderClass([{ active: index === unref(activeIndex) }, "hit"])}" data-v-660efc88>`);
            _push(ssrRenderComponent(_component_ProductThumb, {
              src: hit.image,
              alt: hit.name,
              size: 56
            }, null, _parent));
            _push(`<span class="hit-name" data-v-660efc88>${(_a2 = highlight(hit.name, unref(trimmed))) != null ? _a2 : ""}</span>`);
            if (hit.price) {
              _push(`<span class="hit-price" data-v-660efc88>${ssrInterpolate(formatPrice(hit.price))}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</li>`);
          });
          _push(`<!--]--></ul>`);
        } else if (!unref(isLoading)) {
          _push(`<div class="no-results" data-v-660efc88>`);
          _push(ssrRenderComponent(_component_AstroBot, {
            mood: "search",
            size: 70
          }, null, _parent));
          _push(`<span data-v-660efc88>${ssrInterpolate(_ctx.$t("header.noResults"))}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<button type="button" class="see-all" data-v-660efc88>${ssrInterpolate(_ctx.$t("header.seeAll", { query: unref(trimmed) }))} <i class="fa-solid fa-arrow-right" data-v-660efc88></i></button><!--]-->`);
      }
      _push(`</div></div></div></div></div>`);
      _push(ssrRenderComponent(_component_Canvas, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Header3.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Header3 = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-660efc88"]]);

export { Header3 as H, __nuxt_component_4$1 as _ };
//# sourceMappingURL=Header3-s4pCF4HI.mjs.map
