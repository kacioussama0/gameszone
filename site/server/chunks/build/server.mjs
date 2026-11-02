import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { getCurrentScope, onScopeDispose, computed, defineComponent, ref, inject, h, Suspense, getCurrentInstance, toValue, reactive, watch, hasInjectionContext, onServerPrefetch, Fragment, shallowRef, resolveComponent, toRef, isRef, useId, mergeProps, unref, provide, shallowReactive, nextTick, createElementBlock, cloneVNode, defineAsyncComponent, useSSRContext, createApp, createVNode, Text, withCtx, createTextVNode, toDisplayString as toDisplayString$1, onErrorCaptured, resolveDynamicComponent, effectScope, openBlock, createBlock, createCommentVNode, isReadonly, isShallow, isReactive, toRaw } from 'vue';
import { c as createError$1, V as hash, W as sanitizeStatusCode, X as getContext, $ as $fetch$1, Y as baseURL, Z as createHooks, _ as defu, a0 as executeAsync, a1 as getRequestProtocol, a2 as klona, a3 as getRequestHeaders, E as getRequestHeader, a4 as destr, a5 as isEqual$1, n as setCookie, p as getCookie, q as deleteCookie } from '../nitro/nitro.mjs';
import { RouterView, useRoute as useRoute$1, createMemoryHistory, createRouter, START_LOCATION, isNavigationFailure } from 'vue-router';
import { createInMemoryCache } from '@algolia/cache-in-memory';
import { createFetchRequester } from '@algolia/requester-fetch';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrRenderSuspense, ssrRenderVNode } from 'vue/server-renderer';
import { isPlainObject as isPlainObject$1 } from '@vue/shared';
import { debounce } from 'perfect-debounce';
import { u as useHead$1, a as useSeoMeta$1, h as headSymbol } from '../routes/renderer.mjs';
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
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

function parse$1(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = {};
  const opt = options || {};
  const dec = opt.decode || decode$1;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (opt?.filter && !opt?.filter(key)) {
      index = endIdx + 1;
      continue;
    }
    if (void 0 === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function decode$1(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}

if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch$1.create({
    baseURL: baseURL()
  });
}
if (!("global" in globalThis)) {
  globalThis.global = globalThis;
}
const appLayoutTransition = false;
const nuxtLinkDefaults = { "componentName": "NuxtLink" };
const asyncDataDefaults = { "value": null, "errorValue": null, "deep": true };
const fetchDefaults = {};
const appId = "nuxt-app";
function getNuxtAppCtx(id = appId) {
  return getContext(id, {
    asyncContext: false
  });
}
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  let hydratingCount = 0;
  const nuxtApp = {
    _id: options.id || appId || "nuxt-app",
    _scope: effectScope(),
    provide: void 0,
    globalName: "nuxt",
    versions: {
      get nuxt() {
        return "3.21.1";
      },
      get vue() {
        return nuxtApp.vueApp.version;
      }
    },
    payload: shallowReactive({
      ...options.ssrContext?.payload || {},
      data: shallowReactive({}),
      state: reactive({}),
      once: /* @__PURE__ */ new Set(),
      _errors: shallowReactive({})
    }),
    static: {
      data: {}
    },
    runWithContext(fn) {
      if (nuxtApp._scope.active && !getCurrentScope()) {
        return nuxtApp._scope.run(() => callWithNuxt(nuxtApp, fn));
      }
      return callWithNuxt(nuxtApp, fn);
    },
    isHydrating: false,
    deferHydration() {
      if (!nuxtApp.isHydrating) {
        return () => {
        };
      }
      hydratingCount++;
      let called = false;
      return () => {
        if (called) {
          return;
        }
        called = true;
        hydratingCount--;
        if (hydratingCount === 0) {
          nuxtApp.isHydrating = false;
          return nuxtApp.callHook("app:suspense:resolve");
        }
      };
    },
    _asyncDataPromises: {},
    _asyncData: shallowReactive({}),
    _payloadRevivers: {},
    ...options
  };
  {
    nuxtApp.payload.serverRendered = true;
  }
  if (nuxtApp.ssrContext) {
    nuxtApp.payload.path = nuxtApp.ssrContext.url;
    nuxtApp.ssrContext.nuxt = nuxtApp;
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.ssrContext.config = {
      public: nuxtApp.ssrContext.runtimeConfig.public,
      app: nuxtApp.ssrContext.runtimeConfig.app
    };
  }
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  {
    const contextCaller = async function(hooks, args) {
      for (const hook of hooks) {
        await nuxtApp.runWithContext(() => hook(...args));
      }
    };
    nuxtApp.hooks.callHook = (name, ...args) => nuxtApp.hooks.callHookWith(contextCaller, name, ...args);
  }
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  const runtimeConfig = options.ssrContext.runtimeConfig;
  nuxtApp.provide("config", runtimeConfig);
  return nuxtApp;
}
function registerPluginHooks(nuxtApp, plugin2) {
  if (plugin2.hooks) {
    nuxtApp.hooks.addHooks(plugin2.hooks);
  }
}
async function applyPlugin(nuxtApp, plugin2) {
  if (typeof plugin2 === "function") {
    const { provide: provide2 } = await nuxtApp.runWithContext(() => plugin2(nuxtApp)) || {};
    if (provide2 && typeof provide2 === "object") {
      for (const key in provide2) {
        nuxtApp.provide(key, provide2[key]);
      }
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  const resolvedPlugins = /* @__PURE__ */ new Set();
  const unresolvedPlugins = [];
  const parallels = [];
  let error = void 0;
  let promiseDepth = 0;
  async function executePlugin(plugin2) {
    const unresolvedPluginsForThisPlugin = plugin2.dependsOn?.filter((name) => plugins2.some((p) => p._name === name) && !resolvedPlugins.has(name)) ?? [];
    if (unresolvedPluginsForThisPlugin.length > 0) {
      unresolvedPlugins.push([new Set(unresolvedPluginsForThisPlugin), plugin2]);
    } else {
      const promise = applyPlugin(nuxtApp, plugin2).then(async () => {
        if (plugin2._name) {
          resolvedPlugins.add(plugin2._name);
          await Promise.all(unresolvedPlugins.map(async ([dependsOn, unexecutedPlugin]) => {
            if (dependsOn.has(plugin2._name)) {
              dependsOn.delete(plugin2._name);
              if (dependsOn.size === 0) {
                promiseDepth++;
                await executePlugin(unexecutedPlugin);
              }
            }
          }));
        }
      }).catch((e) => {
        if (!plugin2.parallel && !nuxtApp.payload.error) {
          throw e;
        }
        error ||= e;
      });
      if (plugin2.parallel) {
        parallels.push(promise);
      } else {
        await promise;
      }
    }
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    registerPluginHooks(nuxtApp, plugin2);
  }
  for (const plugin2 of plugins2) {
    if (nuxtApp.ssrContext?.islandContext && plugin2.env?.islands === false) {
      continue;
    }
    await executePlugin(plugin2);
  }
  await Promise.all(parallels);
  if (promiseDepth) {
    for (let i = 0; i < promiseDepth; i++) {
      await Promise.all(parallels);
    }
  }
  if (error) {
    throw nuxtApp.payload.error || error;
  }
}
// @__NO_SIDE_EFFECTS__
function defineNuxtPlugin(plugin2) {
  if (typeof plugin2 === "function") {
    return plugin2;
  }
  const _name = plugin2._name || plugin2.name;
  delete plugin2.name;
  return Object.assign(plugin2.setup || (() => {
  }), plugin2, { [NuxtPluginIndicator]: true, _name });
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => setup();
  const nuxtAppCtx = getNuxtAppCtx(nuxt._id);
  {
    return nuxt.vueApp.runWithContext(() => nuxtAppCtx.callAsync(nuxt, fn));
  }
}
function tryUseNuxtApp(id) {
  let nuxtAppInstance;
  if (hasInjectionContext()) {
    nuxtAppInstance = getCurrentInstance()?.appContext.app.$nuxt;
  }
  nuxtAppInstance ||= getNuxtAppCtx(id).tryUse();
  return nuxtAppInstance || null;
}
function useNuxtApp(id) {
  const nuxtAppInstance = tryUseNuxtApp(id);
  if (!nuxtAppInstance) {
    {
      throw new Error("[nuxt] instance unavailable");
    }
  }
  return nuxtAppInstance;
}
// @__NO_SIDE_EFFECTS__
function useRuntimeConfig(_event) {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
const ENC_ENC_SLASH_RE = /%252f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return encode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F").replace(ENC_ENC_SLASH_RE, "%2F").replace(AMPERSAND_RE, "%26").replace(PLUS_RE, "%2B");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function parseQuery(parametersString = "") {
  const object = /* @__PURE__ */ Object.create(null);
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map(
      (_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`
    ).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}
const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex !== -1) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function isEqual(a, b, options = {}) {
  if (!options.trailingSlash) {
    a = withTrailingSlash(a);
    b = withTrailingSlash(b);
  }
  if (!options.leadingSlash) {
    a = withLeadingSlash(a);
    b = withLeadingSlash(b);
  }
  if (!options.encoding) {
    a = decode(a);
    b = decode(b);
  }
  return a === b;
}
const protocolRelative = /* @__PURE__ */ Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash: hash2 } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash: hash2,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash2 = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash: hash2
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash2 = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash2;
}
const LayoutMetaSymbol = /* @__PURE__ */ Symbol("layout-meta");
const PageRouteSymbol = /* @__PURE__ */ Symbol("route");
globalThis._importMeta_.url.replace(/\/app\/.*$/, "/");
const useRouter = () => {
  return useNuxtApp()?.$router;
};
const useRoute = () => {
  if (hasInjectionContext()) {
    return inject(PageRouteSymbol, useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
// @__NO_SIDE_EFFECTS__
function defineNuxtRouteMiddleware(middleware) {
  return middleware;
}
const addRouteMiddleware = (name, middleware, options = {}) => {
  const nuxtApp = useNuxtApp();
  const global2 = options.global || typeof name !== "string";
  const mw = middleware;
  if (!mw) {
    console.warn("[nuxt] No route middleware passed to `addRouteMiddleware`.", name);
    return;
  }
  if (global2) {
    nuxtApp._middleware.global.push(mw);
  } else {
    nuxtApp._middleware.named[name] = mw;
  }
};
const isProcessingMiddleware = () => {
  try {
    if (useNuxtApp()._processingMiddleware) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
};
const URL_QUOTE_RE = /"/g;
const navigateTo = (to, options) => {
  to ||= "/";
  const toPath = typeof to === "string" ? to : "path" in to ? resolveRouteObject$1(to) : useRouter().resolve(to).href;
  const isExternalHost = hasProtocol(toPath, { acceptRelative: true });
  const isExternal = options?.external || isExternalHost;
  if (isExternal) {
    if (!options?.external) {
      throw new Error("Navigating to an external URL is not allowed by default. Use `navigateTo(url, { external: true })`.");
    }
    const { protocol } = new URL(toPath, "http://localhost");
    if (protocol && isScriptProtocol(protocol)) {
      throw new Error(`Cannot navigate to a URL with '${protocol}' protocol.`);
    }
  }
  const inMiddleware = isProcessingMiddleware();
  const router = useRouter();
  const nuxtApp = useNuxtApp();
  {
    if (nuxtApp.ssrContext) {
      const fullPath = typeof to === "string" || isExternal ? toPath : router.resolve(to).fullPath || "/";
      const location2 = isExternal ? toPath : joinURL((/* @__PURE__ */ useRuntimeConfig()).app.baseURL, fullPath);
      const redirect = async function(response) {
        await nuxtApp.callHook("app:redirected");
        const encodedLoc = location2.replace(URL_QUOTE_RE, "%22");
        const encodedHeader = encodeURL(location2, isExternalHost);
        nuxtApp.ssrContext["~renderResponse"] = {
          statusCode: sanitizeStatusCode(options?.redirectCode || 302, 302),
          body: `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`,
          headers: { location: encodedHeader }
        };
        return response;
      };
      if (!isExternal && inMiddleware) {
        router.afterEach((final) => final.fullPath === fullPath ? redirect(false) : void 0);
        return to;
      }
      return redirect(!inMiddleware ? void 0 : (
        /* abort route navigation */
        false
      ));
    }
  }
  if (isExternal) {
    nuxtApp._scope.stop();
    if (options?.replace) {
      (void 0).replace(toPath);
    } else {
      (void 0).href = toPath;
    }
    if (inMiddleware) {
      if (!nuxtApp.isHydrating) {
        return false;
      }
      return new Promise(() => {
      });
    }
    return Promise.resolve();
  }
  const encodedTo = typeof to === "string" ? encodeRoutePath(to) : to;
  return options?.replace ? router.replace(encodedTo) : router.push(encodedTo);
};
function resolveRouteObject$1(to) {
  return withQuery(to.path || "", to.query || {}) + (to.hash || "");
}
function encodeURL(location2, isExternalHost = false) {
  const url = new URL(location2, "http://localhost");
  if (!isExternalHost) {
    return url.pathname + url.search + url.hash;
  }
  if (location2.startsWith("//")) {
    return url.toString().replace(url.protocol, "");
  }
  return url.toString();
}
function encodeRoutePath(url) {
  const parsed = parseURL(url);
  return encodePath(decodePath(parsed.pathname)) + parsed.search + parsed.hash;
}
const NUXT_ERROR_SIGNATURE = "__nuxt_error";
const useError = /* @__NO_SIDE_EFFECTS__ */ () => toRef(useNuxtApp().payload, "error");
const showError = (error) => {
  const nuxtError = createError(error);
  try {
    const error2 = /* @__PURE__ */ useError();
    if (false) ;
    error2.value ||= nuxtError;
  } catch {
    throw nuxtError;
  }
  return nuxtError;
};
const isNuxtError = (error) => !!error && typeof error === "object" && NUXT_ERROR_SIGNATURE in error;
const createError = (error) => {
  if (typeof error !== "string" && error.statusText) {
    error.message ??= error.statusText;
  }
  const nuxtError = createError$1(error);
  Object.defineProperty(nuxtError, NUXT_ERROR_SIGNATURE, {
    value: true,
    configurable: false,
    writable: false
  });
  Object.defineProperty(nuxtError, "status", {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    get: () => nuxtError.statusCode,
    configurable: true
  });
  Object.defineProperty(nuxtError, "statusText", {
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    get: () => nuxtError.statusMessage,
    configurable: true
  });
  return nuxtError;
};
const unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:head",
  enforce: "pre",
  setup(nuxtApp) {
    const head = nuxtApp.ssrContext.head;
    nuxtApp.vueApp.use(head);
  }
});
function toArray$1(value) {
  return Array.isArray(value) ? value : [value];
}
const matcher = (m, p) => {
  return [];
};
const _routeRulesMatcher = (path) => defu({}, ...matcher().map((r) => r.data).reverse());
const routeRulesMatcher$1 = _routeRulesMatcher;
function getRouteRules(arg) {
  const path = typeof arg === "string" ? arg : arg.path;
  try {
    return routeRulesMatcher$1(path);
  } catch (e) {
    console.error("[nuxt] Error matching route rules.", e);
    return {};
  }
}
const _routes = [
  {
    name: "cart",
    path: "/cart",
    component: () => import('./cart-BmbfjLVy.mjs')
  },
  {
    name: "index",
    path: "/",
    component: () => import('./index-DQ2yJ3yu.mjs')
  },
  {
    name: "checkout",
    path: "/checkout",
    meta: { "middleware": "account" },
    component: () => import('./checkout-Dbcv2bxn.mjs')
  },
  {
    name: "shop",
    path: "/shop",
    component: () => import('./index-B3ZbWipj.mjs')
  },
  {
    name: "account",
    path: "/account",
    meta: { "middleware": "account" },
    component: () => import('./index-BaiHvaxS.mjs')
  },
  {
    name: "account-login",
    path: "/account/login",
    meta: { "middleware": "guest" },
    component: () => import('./login-9kohcN5-.mjs')
  },
  {
    name: "payment-result",
    path: "/payment/result",
    component: () => import('./result-CZoQ1gzW.mjs')
  },
  {
    name: "category-slug",
    path: "/category/:slug()",
    component: () => import('./_slug_-SVqwfsrX.mjs')
  },
  {
    name: "payment-pending",
    path: "/payment/pending",
    component: () => import('./pending-QLqnCq1y.mjs')
  },
  {
    name: "account-register",
    path: "/account/register",
    meta: { "middleware": "guest" },
    component: () => import('./register-D4T7PU60.mjs')
  },
  {
    name: "account-settings",
    path: "/account/settings",
    meta: { "middleware": "account" },
    component: () => import('./settings-vtZLMQhr.mjs')
  },
  {
    name: "shop-product-id",
    path: "/shop/product/:id()",
    component: () => import('./_id_-CDEm-akk.mjs')
  },
  {
    name: "account-orders-id",
    path: "/account/orders/:id()",
    meta: { "middleware": "account" },
    component: () => import('./_id_-ClySnV08.mjs')
  },
  {
    name: "account-orders",
    path: "/account/orders",
    meta: { "middleware": "account" },
    component: () => import('./index-DRjLDfJw.mjs')
  }
];
const _wrapInTransition = (props, children) => {
  return { default: () => children.default?.() };
};
const ROUTE_KEY_PARENTHESES_RE = /(:\w+)\([^)]+\)/g;
const ROUTE_KEY_SYMBOLS_RE = /(:\w+)[?+*]/g;
const ROUTE_KEY_NORMAL_RE = /:\w+/g;
function generateRouteKey(route) {
  const source = route?.meta.key ?? route.path.replace(ROUTE_KEY_PARENTHESES_RE, "$1").replace(ROUTE_KEY_SYMBOLS_RE, "$1").replace(ROUTE_KEY_NORMAL_RE, (r) => route.params[r.slice(1)]?.toString() || "");
  return typeof source === "function" ? source(route) : source;
}
function isChangingPage(to, from) {
  if (to === from || from === START_LOCATION) {
    return false;
  }
  if (generateRouteKey(to) !== generateRouteKey(from)) {
    return true;
  }
  const areComponentsSame = to.matched.every(
    (comp, index) => comp.components && comp.components.default === from.matched[index]?.components?.default
  );
  if (areComponentsSame) {
    return false;
  }
  return true;
}
const routerOptions0 = {
  scrollBehavior(to, from, savedPosition) {
    const nuxtApp = useNuxtApp();
    const hashScrollBehaviour = useRouter().options?.scrollBehaviorType ?? "auto";
    if (to.path.replace(/\/$/, "") === from.path.replace(/\/$/, "")) {
      if (from.hash && !to.hash) {
        return { left: 0, top: 0 };
      }
      if (to.hash) {
        return { el: to.hash, top: _getHashElementScrollMarginTop(to.hash), behavior: hashScrollBehaviour };
      }
      return false;
    }
    const routeAllowsScrollToTop = typeof to.meta.scrollToTop === "function" ? to.meta.scrollToTop(to, from) : to.meta.scrollToTop;
    if (routeAllowsScrollToTop === false) {
      return false;
    }
    const hookToWait = nuxtApp._runningTransition ? "page:transition:finish" : "page:loading:end";
    return new Promise((resolve2) => {
      if (from === START_LOCATION) {
        resolve2(_calculatePosition(to, from, savedPosition, hashScrollBehaviour));
        return;
      }
      nuxtApp.hooks.hookOnce(hookToWait, () => {
        requestAnimationFrame(() => resolve2(_calculatePosition(to, from, savedPosition, hashScrollBehaviour)));
      });
    });
  }
};
function _getHashElementScrollMarginTop(selector) {
  try {
    const elem = (void 0).querySelector(selector);
    if (elem) {
      return (Number.parseFloat(getComputedStyle(elem).scrollMarginTop) || 0) + (Number.parseFloat(getComputedStyle((void 0).documentElement).scrollPaddingTop) || 0);
    }
  } catch {
  }
  return 0;
}
function _calculatePosition(to, from, savedPosition, defaultHashScrollBehaviour) {
  if (savedPosition) {
    return savedPosition;
  }
  const isPageNavigation = isChangingPage(to, from);
  if (to.hash) {
    return {
      el: to.hash,
      top: _getHashElementScrollMarginTop(to.hash),
      behavior: isPageNavigation ? defaultHashScrollBehaviour : "instant"
    };
  }
  return {
    left: 0,
    top: 0
  };
}
const configRouterOptions = {
  hashMode: false,
  scrollBehaviorType: "auto"
};
const routerOptions = {
  ...configRouterOptions,
  ...routerOptions0
};
const validate = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  if (!to.meta?.validate) {
    return;
  }
  const result = ([__temp, __restore] = executeAsync(() => Promise.resolve(to.meta.validate(to))), __temp = await __temp, __restore(), __temp);
  if (result === true) {
    return;
  }
  const error = createError({
    fatal: false,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    status: result && (result.status || result.statusCode) || 404,
    // eslint-disable-next-line @typescript-eslint/no-deprecated
    statusText: result && (result.statusText || result.statusMessage) || `Page Not Found: ${to.fullPath}`,
    data: {
      path: to.fullPath
    }
  });
  return error;
});
const manifest_45route_45rule = /* @__PURE__ */ defineNuxtRouteMiddleware((to) => {
  {
    return;
  }
});
const globalMiddleware = [
  validate,
  manifest_45route_45rule
];
const namedMiddleware = {
  account: () => import('./account-DgnXlwwb.mjs'),
  guest: () => import('./guest-CuiJZa-G.mjs')
};
const plugin = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:router",
  enforce: "pre",
  async setup(nuxtApp) {
    let __temp, __restore;
    let routerBase = (/* @__PURE__ */ useRuntimeConfig()).app.baseURL;
    const history = routerOptions.history?.(routerBase) ?? createMemoryHistory(routerBase);
    const routes = routerOptions.routes ? ([__temp, __restore] = executeAsync(() => routerOptions.routes(_routes)), __temp = await __temp, __restore(), __temp) ?? _routes : _routes;
    let startPosition;
    const router = createRouter({
      ...routerOptions,
      scrollBehavior: (to, from, savedPosition) => {
        if (from === START_LOCATION) {
          startPosition = savedPosition;
          return;
        }
        if (routerOptions.scrollBehavior) {
          router.options.scrollBehavior = routerOptions.scrollBehavior;
          if ("scrollRestoration" in (void 0).history) {
            const unsub = router.beforeEach(() => {
              unsub();
              (void 0).history.scrollRestoration = "manual";
            });
          }
          return routerOptions.scrollBehavior(to, START_LOCATION, startPosition || savedPosition);
        }
      },
      history,
      routes
    });
    nuxtApp.vueApp.use(router);
    const previousRoute = shallowRef(router.currentRoute.value);
    router.afterEach((_to, from) => {
      previousRoute.value = from;
    });
    Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
      get: () => previousRoute.value
    });
    const initialURL = nuxtApp.ssrContext.url;
    const _route = shallowRef(router.currentRoute.value);
    const syncCurrentRoute = () => {
      _route.value = router.currentRoute.value;
    };
    router.afterEach((to, from) => {
      if (to.matched.at(-1)?.components?.default === from.matched.at(-1)?.components?.default) {
        syncCurrentRoute();
      }
    });
    const route = { sync: syncCurrentRoute };
    for (const key in _route.value) {
      Object.defineProperty(route, key, {
        get: () => _route.value[key],
        enumerable: true
      });
    }
    nuxtApp._route = shallowReactive(route);
    nuxtApp._middleware ||= {
      global: [],
      named: {}
    };
    const error = /* @__PURE__ */ useError();
    if (!nuxtApp.ssrContext?.islandContext) {
      router.afterEach(async (to, _from, failure) => {
        delete nuxtApp._processingMiddleware;
        if (failure) {
          await nuxtApp.callHook("page:loading:end");
        }
        if (failure?.type === 4) {
          return;
        }
        if (to.redirectedFrom && to.fullPath !== initialURL) {
          await nuxtApp.runWithContext(() => navigateTo(to.fullPath || "/"));
        }
      });
    }
    try {
      if (true) {
        ;
        [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
        ;
      }
      ;
      [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
      ;
    } catch (error2) {
      [__temp, __restore] = executeAsync(() => nuxtApp.runWithContext(() => showError(error2))), await __temp, __restore();
    }
    const resolvedInitialRoute = router.currentRoute.value;
    syncCurrentRoute();
    if (nuxtApp.ssrContext?.islandContext) {
      return { provide: { router } };
    }
    const initialLayout = nuxtApp.payload.state._layout;
    router.beforeEach(async (to, from) => {
      await nuxtApp.callHook("page:loading:start");
      to.meta = reactive(to.meta);
      if (nuxtApp.isHydrating && initialLayout && !isReadonly(to.meta.layout)) {
        to.meta.layout = initialLayout;
      }
      nuxtApp._processingMiddleware = true;
      if (!nuxtApp.ssrContext?.islandContext) {
        const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
        for (const component of to.matched) {
          const componentMiddleware = component.meta.middleware;
          if (!componentMiddleware) {
            continue;
          }
          for (const entry2 of toArray$1(componentMiddleware)) {
            middlewareEntries.add(entry2);
          }
        }
        const routeRules = getRouteRules({ path: to.path });
        if (routeRules.appMiddleware) {
          for (const key in routeRules.appMiddleware) {
            if (routeRules.appMiddleware[key]) {
              middlewareEntries.add(key);
            } else {
              middlewareEntries.delete(key);
            }
          }
        }
        for (const entry2 of middlewareEntries) {
          const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await namedMiddleware[entry2]?.().then((r) => r.default || r) : entry2;
          if (!middleware) {
            throw new Error(`Unknown route middleware: '${entry2}'.`);
          }
          try {
            if (false) ;
            const result = await nuxtApp.runWithContext(() => middleware(to, from));
            if (true) {
              if (result === false || result instanceof Error) {
                const error2 = result || createError({
                  status: 404,
                  statusText: `Page Not Found: ${initialURL}`
                });
                await nuxtApp.runWithContext(() => showError(error2));
                return false;
              }
            }
            if (result === true) {
              continue;
            }
            if (result === false) {
              return result;
            }
            if (result) {
              if (isNuxtError(result) && result.fatal) {
                await nuxtApp.runWithContext(() => showError(result));
              }
              return result;
            }
          } catch (err) {
            const error2 = createError(err);
            if (error2.fatal) {
              await nuxtApp.runWithContext(() => showError(error2));
            }
            return error2;
          }
        }
      }
    });
    router.onError(async () => {
      delete nuxtApp._processingMiddleware;
      await nuxtApp.callHook("page:loading:end");
    });
    router.afterEach((to) => {
      if (to.matched.length === 0 && !error.value) {
        return nuxtApp.runWithContext(() => showError(createError({
          status: 404,
          fatal: false,
          statusText: `Page not found: ${to.fullPath}`,
          data: {
            path: to.fullPath
          }
        })));
      }
    });
    nuxtApp.hooks.hookOnce("app:created", async () => {
      try {
        if ("name" in resolvedInitialRoute) {
          resolvedInitialRoute.name = void 0;
        }
        await router.replace({
          ...resolvedInitialRoute,
          force: true
        });
        router.options.scrollBehavior = routerOptions.scrollBehavior;
      } catch (error2) {
        await nuxtApp.runWithContext(() => showError(error2));
      }
    });
    return { provide: { router } };
  }
});
function injectHead(nuxtApp) {
  const nuxt = nuxtApp || tryUseNuxtApp();
  return nuxt?.ssrContext?.head || nuxt?.runWithContext(() => {
    if (hasInjectionContext()) {
      return inject(headSymbol);
    }
  });
}
function useHead(input, options = {}) {
  const head = injectHead(options.nuxt);
  if (head) {
    return useHead$1(input, { head, ...options });
  }
}
function useSeoMeta(input, options = {}) {
  const head = injectHead(options.nuxt);
  if (head) {
    return useSeoMeta$1(input, { head, ...options });
  }
}
function definePayloadReducer(name, reduce) {
  {
    useNuxtApp().ssrContext["~payloadReducers"][name] = reduce;
  }
}
const reducers = [
  ["NuxtError", (data) => isNuxtError(data) && data.toJSON()],
  ["EmptyShallowRef", (data) => isRef(data) && isShallow(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["EmptyRef", (data) => isRef(data) && !data.value && (typeof data.value === "bigint" ? "0n" : JSON.stringify(data.value) || "_")],
  ["ShallowRef", (data) => isRef(data) && isShallow(data) && data.value],
  ["ShallowReactive", (data) => isReactive(data) && isShallow(data) && toRaw(data)],
  ["Ref", (data) => isRef(data) && data.value],
  ["Reactive", (data) => isReactive(data) && toRaw(data)]
];
const revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:revive-payload:server",
  setup() {
    for (const [reducer, fn] of reducers) {
      definePayloadReducer(reducer, fn);
    }
  }
});
function warn(msg, err) {
  if (typeof console !== "undefined") {
    console.warn(`[intlify] ` + msg);
    if (err) {
      console.warn(err.stack);
    }
  }
}
const makeSymbol = (name, shareable = false) => !shareable ? Symbol(name) : Symbol.for(name);
const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
const friendlyJSONstringify = (json) => JSON.stringify(json).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029").replace(/\u0027/g, "\\u0027");
const isNumber = (val) => typeof val === "number" && isFinite(val);
const isDate = (val) => toTypeString(val) === "[object Date]";
const isRegExp = (val) => toTypeString(val) === "[object RegExp]";
const isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
const assign = Object.assign;
const _create = Object.create;
const create = (obj = null) => _create(obj);
function escapeHtml(rawText) {
  return rawText.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\//g, "&#x2F;").replace(/=/g, "&#x3D;");
}
function escapeAttributeValue(value) {
  return value.replace(/&(?![a-zA-Z0-9#]{2,6};)/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
function sanitizeTranslatedHtml(html) {
  html = html.replace(/(\w+)\s*=\s*"([^"]*)"/g, (_, attrName, attrValue) => `${attrName}="${escapeAttributeValue(attrValue)}"`);
  html = html.replace(/(\w+)\s*=\s*'([^']*)'/g, (_, attrName, attrValue) => `${attrName}='${escapeAttributeValue(attrValue)}'`);
  const eventHandlerPattern = /\s*on\w+\s*=\s*["']?[^"'>]+["']?/gi;
  if (eventHandlerPattern.test(html)) {
    html = html.replace(/(\s+)(on)(\w+\s*=)/gi, "$1&#111;n$3");
  }
  const javascriptUrlPattern = [
    // In href, src, action, formaction attributes
    /(\s+(?:href|src|action|formaction)\s*=\s*["']?)\s*javascript:/gi,
    // In style attributes within url()
    /(style\s*=\s*["'][^"']*url\s*\(\s*)javascript:/gi
  ];
  javascriptUrlPattern.forEach((pattern) => {
    html = html.replace(pattern, "$1javascript&#58;");
  });
  return html;
}
const hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}
const isArray = Array.isArray;
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isBoolean = (val) => typeof val === "boolean";
const isObject = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const toDisplayString = (val) => {
  return val == null ? "" : isArray(val) || isPlainObject(val) && val.toString === objectToString ? JSON.stringify(val, null, 2) : String(val);
};
function join(items, separator = "") {
  return items.reduce((str, item, index) => index === 0 ? str + item : str + separator + item, "");
}
const isNotObjectOrIsArray = (val) => !isObject(val) || isArray(val);
function deepCopy(src, des) {
  if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
    throw new Error("Invalid value");
  }
  const stack = [{ src, des }];
  while (stack.length) {
    const { src: src2, des: des2 } = stack.pop();
    Object.keys(src2).forEach((key) => {
      if (key === "__proto__") {
        return;
      }
      if (isObject(src2[key]) && !isObject(des2[key])) {
        des2[key] = Array.isArray(src2[key]) ? [] : create();
      }
      if (isNotObjectOrIsArray(des2[key]) || isNotObjectOrIsArray(src2[key])) {
        des2[key] = src2[key];
      } else {
        stack.push({ src: src2[key], des: des2[key] });
      }
    });
  }
}
const resource$2 = {
  "lang": {
    "label": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Langue" } },
    "switch": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Changer de langue" } }
  },
  "seo": {
    "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "GamesZone – Jeux, cartes PSN, Steam et produits digitaux en Algérie" } },
    "description": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "GamesZone, votre boutique de produits digitaux en Algérie : jeux, cartes PSN, Steam et bien plus, au meilleur prix." } },
    "shortDescription": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "GamesZone, votre boutique de jeux et cartes digitales (PSN, Steam…) en Algérie." } },
    "cart": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Panier" } },
    "checkout": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Validation de la commande" } },
    "success": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Merci pour votre commande" } },
    "productFallback": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Produit" } },
    "productDescription": { "t": 0, "b": { "t": 2, "i": [{ "t": 4, "k": "name" }, { "t": 3, "v": " au meilleur prix en Algérie : " }, { "t": 4, "k": "price" }, { "t": 3, "v": ". Paiement en ligne sécurisé par CIB/Edahabia, code envoyé par e-mail chez GamesZone." }] } },
    "categoryDescription": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Découvrez nos " }, { "t": 4, "k": "name" }, { "t": 3, "v": " au meilleur prix en Algérie chez GamesZone : paiement en ligne sécurisé et codes envoyés par e-mail." }] } }
  },
  "common": {
    "currency": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "DA" } },
    "seeAll": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Voir tout" } },
    "seeAllProducts": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Voir tous les produits" } },
    "loading": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Chargement..." } },
    "wait": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Patienter ..." } },
    "total": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Total" } },
    "subtotal": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Sous-total" } },
    "price": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Prix" } },
    "quantity": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Quantité" } },
    "product": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Produit" } },
    "addToCart": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Ajouter au Panier" } },
    "available": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Disponible" } },
    "unavailable": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Non disponible" } },
    "important": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Important" } },
    "home": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Accueil" } },
    "shop": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Boutique" } },
    "backHome": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Retour à l’accueil" } },
    "backShop": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Retour à la boutique" } },
    "close": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Fermer" } }
  },
  "header": {
    "searchPlaceholder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Rechercher PS5, FIFA, GTA..." } },
    "recent": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Recherches récentes :" } },
    "noResults": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Aucun résultat 😢" } },
    "menu": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Menu" } },
    "searchLabel": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Rechercher un produit" } },
    "searchButton": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Rechercher" } },
    "clear": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Effacer" } },
    "trending": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Accès rapide" } },
    "seeAll": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Voir tous les résultats pour « " }, { "t": 4, "k": "query" }, { "t": 3, "v": " »" }] } },
    "help": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Besoin d’aide ?" } },
    "myCart": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Mon panier" } },
    "categories": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Catégories" } },
    "stripEmail": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Codes envoyés par e-mail" } },
    "stripPay": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Paiement sécurisé CIB / Edahabia" } },
    "shop": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Boutique" } },
    "darkMode": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Mode sombre" } },
    "lightMode": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Mode clair" } }
  },
  "bottomNav": {
    "home": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Accueil" } },
    "cart": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Panier" } },
    "shop": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Boutique" } },
    "contact": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Contact" } },
    "label": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Navigation principale" } },
    "search": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Rechercher" } },
    "cartCount": { "t": 0, "b": { "t": 2, "i": [{ "t": 4, "k": "n" }, { "t": 3, "v": " article(s) dans le panier" }] } }
  },
  "menu": {
    "games": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Jeux" } },
    "consoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Consoles" } },
    "used": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Occasions" } },
    "accessories": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Accessoires" } },
    "digital": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Digital" } },
    "collector": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Collector" } },
    "retro": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Retro" } },
    "gamesPs5": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Jeux Playstation 5" } },
    "exclusivePs": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Exclusivité Playstation" } },
    "gamesPs4": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Jeux PlayStation 4" } },
    "gamesXboxSeries": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }, { "t": 9 }, { "t": 3 }], "s": "Jeux Xbox Series X|S" } },
    "exclusiveXbox": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Exclusivité Xbox" } },
    "gamesXboxOne": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Jeux Xbox One" } },
    "gamesSwitch": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Jeux Nintendo Switch" } },
    "exclusiveSwitch": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Exclusivité Nintendo Switch" } },
    "gamesSwitch2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Jeux Nintendo Switch 2" } },
    "portableConsole": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Console portable" } },
    "pcHandhelds": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Consoles PC Portables" } },
    "portableEmulation": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Emulation Portable" } },
    "videoGames": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Jeux Vidéo" } },
    "usedPs5Games": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Jeux Occasion PlayStation 5" } },
    "usedPs4Games": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Jeux Occasion PlayStation 4" } },
    "usedXboxSeriesGames": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Jeux Occasion Xbox Series X" } },
    "usedSwitchGames": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Jeux Occasion Switch" } },
    "usedSwitch2Games": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Jeux Occasion Switch 2" } },
    "usedPs5Consoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Consoles PS5 Occasion" } },
    "usedPs4Consoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Consoles PS4 Occasion" } },
    "usedXboxXConsoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Consoles Xbox Series X Occasion" } },
    "usedXboxSConsoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Consoles Xbox Series S Occasion" } },
    "usedSwitchConsoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Consoles Switch Occasion" } },
    "controllers": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Manettes" } },
    "usedPs5Controller": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Manette Occasion PlayStation 5" } },
    "usedPs4Controller": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Manette Occasion PlayStation 4" } },
    "usedXboxController": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Manette Occasion Xbox" } },
    "usedSwitchController": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Manette Occasion Switch" } },
    "consoleAccessories": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Accessoires Consoles" } },
    "controllerBattery": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Batterie Manette" } },
    "chargingStation": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Station de Charges" } },
    "coolingStation": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Station de refroidissement" } },
    "controllerStand": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Support Manette" } },
    "headsets": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Casques" } },
    "ps5Controller": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Manette PlayStation 5" } },
    "ps4Controller": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Manette PlayStation 4" } },
    "xboxController": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Manette Xbox" } },
    "switchController": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Manette Switch" } },
    "pdpController": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Manette PDP" } },
    "utilities": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Utilitaires" } },
    "consoleSkins": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Skin Consoles" } },
    "consoleCases": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pochette Consoles" } },
    "gamingHeadset": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Casque Gaming" } },
    "psHeadset": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Casque PlayStation" } },
    "xboxHeadset": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Casque Xbox" } },
    "prepaidCards": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Cartes Prépayées" } },
    "prepaidPs": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Cartes prépayées PS" } },
    "prepaidXbox": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Cartes prépayées Xbox" } },
    "prepaidSteam": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Cartes prépayées Steam" } },
    "prepaidNintendo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Cartes prépayées Nintendo" } },
    "fullDigital": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "100% Digital" } },
    "digitalGame": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Jeu Digital" } },
    "subscriptions": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Abonnements" } },
    "digitalConsole": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Console Digitale" } },
    "streaming": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Streaming" } },
    "collectors": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Collectors" } },
    "consoleEditions": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Console Editions" } },
    "miniature": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Miniature" } },
    "decoration": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Décoration" } },
    "gamingLamp": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Lampe Gaming" } },
    "controllerHolder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Porte Manette" } },
    "figurines": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Figurines" } },
    "textile": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Textile" } },
    "tshirt": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "T-Shirt" } },
    "backpack": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Sac à dos" } },
    "setupDeco": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Déco Setup" } },
    "mousepad": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Tapis de souris" } },
    "headsetHolder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Porte casque" } },
    "retroConsoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Console Retro" } },
    "retroGames": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Jeux Retro" } },
    "sealedNew": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Neuf sous blister" } },
    "completeBox": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Complet boîte + notice" } },
    "usedRetroGames": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Jeux Rétro Occasion" } },
    "retroAccessories": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Accessoires Rétro" } },
    "originalRetroControllers": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Manettes Rétro d’origine" } },
    "memoryConnectors": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Mémoire & Connectique" } },
    "collectorGoodies": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Collector & Goodies" } },
    "retroCollector": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Rétro Éditions collector" } },
    "retroFigurines": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Figurines Rétro" } }
  },
  "categories": {
    "videoGames": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Jeux Video" } },
    "consoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Consoles" } },
    "consoleAccessories": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Accessoires Consoles" } },
    "used": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Occasions" } },
    "cardsSubs": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Cartes & Abonnement" } },
    "collectors": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Collectors" } },
    "figurines": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Figurines" } },
    "steelbooks": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Steelbooks" } },
    "postersFrames": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Posters & Cadres" } },
    "pcAccessories": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "PC Accessoires" } },
    "goodies": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Goodies" } },
    "miniatures": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Miniatures" } },
    "clothing": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Vêtements" } },
    "usedConsoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Consoles d'occasions" } },
    "retro": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Retro" } }
  },
  "home": {
    "buyNow": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ACHETEZ MAINTENANT" } },
    "topSales": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Top Ventes" } },
    "promotions": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Promotions" } },
    "hits": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "GamesZone Hits" } },
    "digital": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Produits Digitaux" } },
    "selection": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Notre Sélection" } },
    "newConsoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Découvrez nos nouvelles consoles en magasin !" } },
    "newConsolesSub": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Nouvelles consoles en stock !" } },
    "followUs": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Suivez-nous" } },
    "allConsoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Toutes les consoles" } },
    "browseCategories": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Explorer par catégorie" } },
    "ctaNew": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Nouveautés" } },
    "universesTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Tous nos rayons" } },
    "uniGames": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Jeux vidéo" } },
    "uniGamesText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "PS5, PS4, Xbox, Switch" } },
    "uniConsoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Consoles" } },
    "uniConsolesText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Les consoles du moment" } },
    "uniUsed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Occasions" } },
    "uniUsedText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Jeux, consoles et bonnes affaires" } },
    "uniAccessories": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Accessoires" } },
    "uniAccessoriesText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Manettes, casques, chargeurs" } },
    "uniDigital": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Cartes & abonnements" } },
    "uniDigitalText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "PSN, Xbox, Steam, Netflix…" } },
    "uniCollector": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Collector & Goodies" } },
    "uniCollectorText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Collectors, figurines, steelbooks" } },
    "uniPc": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "PC & Laptops" } },
    "uniPcText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "PC gamer et périphériques" } },
    "uniRetro": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Rétro" } },
    "uniRetroText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Consoles et jeux d’époque" } },
    "followSub": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Nouveautés, arrivages et bons plans en avant-première sur nos réseaux" } },
    "follow": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Suivre" } },
    "brandsTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Nos marques" } },
    "paymentsSub": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Payez en ligne par carte ou par virement : votre code arrive par e-mail." } },
    "bestSellers": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Meilleures ventes" } }
  },
  "footer": {
    "about": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Votre boutique de produits digitaux en Algérie : jeux, cartes PSN, Steam et bien plus, payés en ligne et livrés par e-mail." } },
    "rights": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Tous les droits sont réservés." } },
    "shop": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Boutique" } },
    "help": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Aide & contact" } },
    "whatsapp": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Écrivez-nous sur WhatsApp" } },
    "payments": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Moyens de paiement" } },
    "backToTop": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Haut de page" } }
  },
  "cart": {
    "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Panier" } },
    "viewCart": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Voir Mon Panier" } },
    "checkout": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Finaliser Ma Commande" } },
    "empty": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Votre panier est vide" } },
    "emptyCanvasText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Ajoutez des produits à votre panier pour continuer vos achats." } },
    "continueShopping": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Continuer vos achats" } },
    "emptyPageText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Découvrez nos produits et ajoutez vos articles préférés à votre panier." } },
    "startShopping": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Commencer mes achats" } },
    "shippingNotice": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Produits digitaux : votre code est envoyé par e-mail après confirmation du paiement." } },
    "warranty": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Garantie GamesZone" } },
    "express": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Livraison par e-mail" } },
    "support": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Service Client Dynamique" } },
    "certified": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Produits certifiés" } },
    "remove": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Retirer " }, { "t": 4, "k": "name" }] } },
    "shippingAtCheckout": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Frais de livraison calculés à l’étape suivante" } },
    "summary": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Récapitulatif" } },
    "shippingNextStep": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Étape suivante" } },
    "itemsCount": { "t": 0, "b": { "t": 1, "c": [{ "t": 2, "i": [{ "t": 4, "k": "count" }, { "t": 3, "v": " article" }] }, { "t": 2, "i": [{ "t": 4, "k": "count" }, { "t": 3, "v": " article" }] }, { "t": 2, "i": [{ "t": 4, "k": "count" }, { "t": 3, "v": " articles" }] }] } },
    "paymentAccepted": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Moyens de paiement acceptés" } },
    "removeShort": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Retirer" } },
    "secureCheckout": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Paiement sécurisé" } }
  },
  "product": {
    "used": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Occasion" } },
    "digital": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Digital" } },
    "new": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Neuf" } },
    "epay": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "E-Paiement" } },
    "chooseOptions": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Choisir options" } },
    "readMore": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Lire la suite" } },
    "promo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Promo" } },
    "epayTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Paiement électronique EPAY" } },
    "pay": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Payer" } },
    "securePayment": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Paiement sécurisé via :" } },
    "epayNotice": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Après confirmation du paiement, votre code et les instructions d’activation sont envoyés à votre adresse e-mail." } },
    "sku": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "SKU :" } },
    "category": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Catégorie :" } },
    "tags": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Mots clés :" } },
    "share": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Partager :" } },
    "description": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Description" } },
    "related": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Produits associés" } },
    "decrease": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Diminuer la quantité" } },
    "increase": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Augmenter la quantité" } },
    "askWhatsapp": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Commander ou poser une question sur WhatsApp" } },
    "delivery58": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Code envoyé par e-mail" } },
    "copyLink": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Copier le lien" } },
    "whatsappMessage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Bonjour, je suis intéressé(e) par : " }, { "t": 4, "k": "name" }] } },
    "epaySubtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Paiement 100 % sécurisé par carte CIB ou Edahabia" } },
    "epayStep1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Vos coordonnées" } },
    "epayStep2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Paiement sécurisé par carte" } },
    "epayStep3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Réception du code par e-mail" } },
    "phoneHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "En cas de besoin, nous vous contacterons sur ce numéro." } },
    "emailHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Votre code et votre reçu seront envoyés à cette adresse." } },
    "addNote": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Ajouter une note à la commande" } },
    "selectedOption": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Option choisie" } },
    "payNow": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "À payer maintenant" } },
    "payAmount": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Payer " }, { "t": 4, "k": "amount" }] } },
    "redirecting": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Redirection vers le paiement sécurisé…" } },
    "payError": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Le paiement n’a pas pu être lancé. Vérifiez votre connexion et réessayez, ou contactez-nous sur WhatsApp." } },
    "secureCards": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Vous serez redirigé vers une page de paiement sécurisée" } },
    "unavailableTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Indisponible pour le moment" } },
    "unavailableText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Ce produit est en rupture. Contactez-nous sur WhatsApp pour être prévenu de son retour." } },
    "from": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "À partir de" } },
    "outOfStock": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Rupture de stock" } },
    "added": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Ajouté" } },
    "add": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Ajouter" } },
    "view": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Voir le produit" } },
    "zoom": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Agrandir la photo" } },
    "readLess": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Voir moins" } },
    "buyNow": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Acheter maintenant" } },
    "payWith": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Payez par CIB, Edahabia, BaridiMob, CCP, Binance ou RedotPay" } },
    "details": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Détails" } }
  },
  "form": {
    "firstName": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Prénom" } },
    "lastName": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Nom" } },
    "phone": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Téléphone" } },
    "email": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Email" } },
    "wilaya": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Wilaya" } },
    "commune": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Commune" } },
    "noteLabel": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Informations complémentaires sur votre commande (facultatif)" } },
    "notePlaceholder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Note concernant votre commande, si nécessaire" } },
    "selectWilaya": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Veuillez sélectionner votre wilaya" } },
    "selectCommune": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Veuillez sélectionner votre commune" } },
    "errors": {
      "firstNameRequired": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Le prénom est requis" } },
      "lastNameRequired": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Le nom est requis" } },
      "phoneInvalid": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Numéro de téléphone invalide" } },
      "emailInvalid": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Adresse e-mail invalide" } },
      "wilayaRequired": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Veuillez sélectionner votre wilaya" } },
      "communeRequired": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Veuillez sélectionner votre commune" } },
      "termsRequired": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Vous devez accepter les conditions" } }
    }
  },
  "checkout": {
    "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Validation de la commande" } },
    "billing": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Facturation & Expédition" } },
    "additionalInfo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Informations complémentaires" } },
    "yourOrder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Votre commande" } },
    "summary": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Récapitulatif de la commande" } },
    "shippingMethod": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Mode de livraison" } },
    "paymentMethod": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Mode de paiement" } },
    "privacy": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Vos données personnelles seront utilisées pour traiter votre commande et améliorer votre expérience sur notre site, conformément à notre politique de confidentialité." } },
    "terms": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "J’ai lu et j’accepte les conditions générales." } },
    "order": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Commander" } },
    "shipHome": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "À domicile" } },
    "shipDesk": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Au bureau" } },
    "shipStore": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Retrait magasin" } },
    "stepCart": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Panier" } },
    "stepConfirm": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Confirmation" } },
    "contact": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Vos coordonnées" } },
    "delivery": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Adresse de livraison" } },
    "phoneHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "En cas de besoin, nous vous contacterons sur ce numéro." } },
    "wilayaFirst": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Choisissez d’abord la wilaya" } },
    "shipHomeHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Livraison à votre adresse" } },
    "shipDeskHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Retrait au bureau du transporteur" } },
    "shipStoreHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Retrait gratuit à notre magasin (Alger)" } },
    "free": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Gratuit" } },
    "chooseCommune": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Choisissez votre commune" } },
    "placeOrder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Payer · " }, { "t": 4, "k": "total" }] } },
    "submitError": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "La commande n’a pas pu être envoyée. Vérifiez votre connexion et réessayez, ou contactez-nous sur WhatsApp." } },
    "emailHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Vos codes seront envoyés à cette adresse : vérifiez-la bien." } },
    "stepPayment": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Paiement" } },
    "payOnline": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Paiement en ligne" } },
    "payOnlineNotice": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Carte CIB ou Edahabia, sur la page sécurisée de paiement." } },
    "deliveryLabel": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Livraison" } },
    "deliveryEmail": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Par e-mail" } },
    "backToCart": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Retour au panier" } },
    "editCart": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Modifier" } },
    "showSummary": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Voir la commande" } },
    "hideSummary": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Masquer la commande" } }
  },
  "shop": {
    "showing": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Affichage de " }, { "t": 4, "k": "start" }, { "t": 3, "v": " à " }, { "t": 4, "k": "end" }, { "t": 3, "v": " sur " }, { "t": 4, "k": "total" }, { "t": 3, "v": " résultats" }] } },
    "results": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Résultats - " }, { "t": 4, "k": "query" }] } },
    "noProducts": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Aucun produit trouvé" } },
    "noProductsHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Essayez avec d'autres mots-clés ou parcourez nos catégories." } },
    "filter": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Filtrer" } },
    "categories": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Catégories" } },
    "pagination": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pagination des produits" } },
    "sort": {
      "label": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Trier par" } },
      "default": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pertinence" } },
      "popularity": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Popularité" } },
      "newest": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Nouveautés" } },
      "priceAsc": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Prix croissant" } },
      "priceDesc": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Prix décroissant" } },
      "nameAsc": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Nom (A → Z)" } }
    },
    "filters": {
      "availability": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Disponibilité" } },
      "inStock": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "En stock uniquement" } },
      "onSale": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "En promotion" } },
      "min": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Min" } },
      "max": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Max" } },
      "apply": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Appliquer le prix" } },
      "under": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Moins de " }, { "t": 4, "k": "amount" }] } },
      "over": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Plus de " }, { "t": 4, "k": "amount" }] } },
      "allCategories": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Toutes les catégories" } },
      "clearAll": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Tout effacer" } },
      "collection": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Sélection du menu" } },
      "remove": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Retirer le filtre " }, { "t": 4, "k": "name" }] } },
      "showResults": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Voir " }, { "t": 4, "k": "count" }, { "t": 3, "v": " produits" }] } },
      "noResultsHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Aucun produit ne correspond à ces filtres. Essayez d’en retirer quelques-uns." } },
      "platform": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Plateforme (jeux)" } },
      "newArrivals": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Nouveautés (" }, { "t": 4, "k": "days" }, { "t": 3, "v": " derniers jours)" }] } },
      "showMore": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Voir " }, { "t": 4, "k": "count" }, { "t": 3, "v": " de plus" }] } },
      "showLess": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Voir moins" } }
    },
    "prevPage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Page précédente" } },
    "nextPage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Page suivante" } },
    "goToPage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Aller à la page " }, { "t": 4, "k": "page" }] } },
    "pageOf": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Page " }, { "t": 4, "k": "page" }, { "t": 3, "v": " / " }, { "t": 4, "k": "total" }] } },
    "productsCount": { "t": 0, "b": { "t": 1, "c": [{ "t": 2, "i": [{ "t": 4, "k": "count" }, { "t": 3, "v": " produit" }] }, { "t": 2, "i": [{ "t": 4, "k": "count" }, { "t": 3, "v": " produit" }] }, { "t": 2, "i": [{ "t": 4, "k": "count" }, { "t": 3, "v": " produits" }] }] } },
    "allIn": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Tout voir" } }
  },
  "success": {
    "heading": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Jouez Avec GamesZone !" } },
    "thanks": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Merci pour votre commande !" } },
    "received": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Nous avons bien reçu votre demande." } },
    "unreachable": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Si nous ne parvenons pas à vous joindre, la commande pourra être annulée." } },
    "contactSoon": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Notre équipe vous contactera bientôt pour confirmer votre commande." } },
    "prepared": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Votre commande sera préparée et expédiée rapidement." } },
    "codInfo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Le paiement se fait à la livraison (Cash on Delivery)" } },
    "help": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Notre équipe est là pour vous aider 😊" } },
    "whatsapp": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Discuter sur WhatsApp" } },
    "phoneSupport": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Assistance téléphonique" } },
    "copyOrder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Copier le numéro de commande" } },
    "copied": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Numéro copié" } },
    "stayReachableTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Surveillez votre boîte e-mail" } },
    "nextTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Et maintenant ?" } },
    "step1Title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Appel de confirmation" } },
    "step2Title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Préparation & expédition" } },
    "step3Title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Livraison et paiement" } },
    "toPayOnDelivery": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "À payer à la livraison" } },
    "helpText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Une question sur votre commande ? Répondez-nous en citant votre numéro de commande." } },
    "whatsappMessage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Bonjour, je vous contacte au sujet de ma commande n° " }, { "t": 4, "k": "id" }, { "t": 3, "v": "." }] } }
  },
  "payment": {
    "confirmed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Paiement confirmé" } },
    "successText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Votre paiement a été effectué avec succès." } },
    "orderNo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Commande N°" } },
    "thanks": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "🎮 Merci pour votre commande !" } },
    "preparing": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Votre paiement a été confirmé avec succès. Votre code vous est envoyé par e-mail." } },
    "whatsappIntro": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Notre équipe vous contactera directement sur WhatsApp afin de :" } },
    "step1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "✔️ Finaliser la livraison du produit" } },
    "step2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "✔️ Vous accompagner pour l’activation" } },
    "step3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "✔️ Vous expliquer la méthode d’utilisation" } },
    "step4": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "✔️ Assurer le suivi si besoin" } },
    "stayReachable": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "⏳ Merci de rester joignable pour un traitement rapide." } },
    "support": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Support Client" } },
    "whatsapp": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "WhatsApp" } },
    "needHelp": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Besoin d’aide ? Notre support est disponible sur WhatsApp." } },
    "failed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Paiement échoué" } },
    "notConfirmed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Le paiement n’a pas été confirmé" } },
    "notFinalized": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Votre transaction n’a pas pu être finalisée ou a été annulée." } },
    "check1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "• Vérifiez votre carte CIB / EDAHABIA" } },
    "check2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "• Vérifiez votre solde" } },
    "check3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "• Réessayez dans quelques minutes" } },
    "thanksTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Merci pour votre commande !" } },
    "invoiceNo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Facture" } },
    "reasonLabel": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Motif :" } },
    "stayReachableText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Votre code est envoyé à l’adresse e-mail indiquée. Pensez à vérifier vos spams." } },
    "whatsappIntroShort": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Votre code et les instructions d’activation sont envoyés par e-mail." } },
    "tl1Title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Paiement confirmé" } },
    "tl1Text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Votre paiement par carte a bien été reçu." } },
    "tl2Title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Code envoyé par e-mail" } },
    "tl3Title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Activation" } },
    "tl3Text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Utilisez votre code sur PSN, Steam ou la plateforme concernée." } },
    "recapTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Votre achat" } },
    "paid": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Montant payé" } },
    "checksTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Que vérifier ?" } },
    "checkCard": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Votre carte CIB / Edahabia est active et le paiement en ligne autorisé" } },
    "checkBalance": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Votre solde est suffisant" } },
    "checkRetry": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Réessayez dans quelques minutes" } },
    "retryTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Réessayer le paiement" } },
    "retry": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Réessayer le paiement" } },
    "helpFailed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Le problème persiste ? Écrivez-nous avec votre numéro de commande, nous vous aiderons." } },
    "whatsappSuccess": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Bonjour, mon paiement est confirmé pour la commande n° " }, { "t": 4, "k": "id" }, { "t": 3, "v": "." }] } },
    "whatsappFailed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Bonjour, mon paiement n’a pas abouti pour la commande n° " }, { "t": 4, "k": "id" }, { "t": 3, "v": ". Pouvez-vous m’aider ?" }] } },
    "cartItems": { "t": 0, "b": { "t": 2, "i": [{ "t": 4, "k": "count" }, { "t": 3, "v": " articles" }] } },
    "chooseMethod": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Mode de paiement" } },
    "instantConfirm": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "confirmation immédiate" } },
    "manualHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Virement + reçu, vérifié par notre équipe" } },
    "sendExactly": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Envoyez exactement" } },
    "toAccount": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "via " }, { "t": 4, "k": "method" }, { "t": 3, "v": " au compte ci-dessous, puis joignez votre reçu." }] } },
    "copy": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Copier " }, { "t": 4, "k": "label" }] } },
    "fieldRip": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "RIP" } },
    "fieldAccount": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Numéro de compte" } },
    "fieldKey": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Clé" } },
    "fieldHolder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Nom et prénom" } },
    "fieldAddress": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Adresse" } },
    "fieldBinanceId": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Binance ID" } },
    "fieldRedotpayId": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "RedotPay ID" } },
    "fieldIban": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "IBAN" } },
    "rateInfo": { "t": 0, "b": { "t": 2, "i": [{ "t": 4, "k": "total" }, { "t": 3, "v": " convertis au taux du jour : " }, { "t": 4, "k": "rate" }, { "t": 3, "v": "." }] } },
    "proofLabel": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Reçu de paiement (capture ou PDF)" } },
    "proofChoose": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Choisir un fichier" } },
    "proofDrop": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ou glissez-le ici" } },
    "proofFormats": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "JPG, PNG, WEBP ou PDF · 5 Mo max" } },
    "proofRemove": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Retirer le fichier" } },
    "proofType": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Format non accepté : envoyez une image (JPG, PNG, WEBP) ou un PDF." } },
    "proofSize": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Fichier trop lourd (5 Mo maximum)." } },
    "proofRequired": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Ajoutez le reçu de votre paiement pour continuer." } },
    "manualNote": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Votre commande sera confirmée après vérification du reçu par notre équipe. Le code vous est ensuite envoyé par e-mail." } },
    "manualFailed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "La commande n'a pas pu être envoyée. Vérifiez votre connexion et réessayez, ou contactez-nous sur WhatsApp." } },
    "sendOrder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Envoyer la commande · " }, { "t": 4, "k": "total" }] } },
    "pendingEyebrow": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Paiement en vérification" } },
    "pendingTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Commande reçue, merci !" } },
    "pendingText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Nous vérifions votre paiement " }, { "t": 4, "k": "method" }, { "t": 3, "v": ". Dès qu’il est validé, votre code est envoyé à votre adresse e-mail." }] } },
    "pendingStep1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Commande et reçu envoyés" } },
    "pendingStep2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Vérification du paiement par notre équipe" } },
    "pendingStep3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Code envoyé par e-mail" } },
    "onlineTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Carte CIB / Edahabia" } },
    "recommended": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Recommandé" } },
    "orTransfer": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Ou par virement, avec reçu" } },
    "stepSend": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Envoyez le montant" } },
    "stepUpload": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Joignez votre reçu" } }
  },
  "error": {
    "notFound": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Page introuvable" } },
    "generic": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Une erreur est survenue" } },
    "notFoundText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "La page que vous cherchez n’existe pas ou a été déplacée." } },
    "retryLater": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Veuillez réessayer plus tard." } },
    "popular": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Les plus visités" } },
    "retry": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Réessayer" } },
    "goBack": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Page précédente" } },
    "helpText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Toujours bloqué ?" } },
    "code": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Code d’erreur :" } },
    "whatsappMessage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Bonjour, je rencontre une erreur " }, { "t": 4, "k": "code" }, { "t": 3, "v": " sur le site : " }, { "t": 4, "k": "url" }] } }
  },
  "breadcrumb": {
    "label": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Fil d’Ariane" } }
  },
  "loader": {
    "ready": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Prêt à jouer" } }
  },
  "reviews": {
    "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Ce que nos clients disent" } },
    "subtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Avis Google vérifiés" } }
  },
  "account": {
    "menu": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Menu du compte" } },
    "myAccount": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Mon compte" } },
    "overview": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Vue d’ensemble" } },
    "orders": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Mes commandes" } },
    "settings": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Paramètres" } },
    "logout": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Se déconnecter" } },
    "login": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Se connecter" } },
    "createAccount": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Créer un compte" } },
    "loginTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Connexion" } },
    "loginSubtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Retrouvez vos commandes et vos codes." } },
    "registerTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Créer un compte" } },
    "registerSubtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Suivez vos commandes et payez plus vite." } },
    "checkoutNotice": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Connectez-vous ou créez un compte pour finaliser votre commande. Votre panier est conservé." } },
    "password": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Mot de passe" } },
    "forgot": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Mot de passe oublié ?" } },
    "showPassword": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Afficher le mot de passe" } },
    "hidePassword": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Masquer le mot de passe" } },
    "noAccount": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pas encore de compte ?" } },
    "haveAccount": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Déjà un compte ?" } },
    "passwordHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "8 caractères minimum." } },
    "hello": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Bonjour " }, { "t": 4, "k": "name" }] } },
    "ordersCount": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Commandes" } },
    "awaitingPayment": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "En attente de paiement" } },
    "codesSentTo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Vos codes sont envoyés à" } },
    "recentOrders": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Commandes récentes" } },
    "noOrders": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Vous n’avez pas encore de commande." } },
    "orderNo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Commande n° " }, { "t": 4, "k": "number" }] } },
    "itemsCount": { "t": 0, "b": { "t": 1, "c": [{ "t": 2, "i": [{ "t": 4, "k": "count" }, { "t": 3, "v": " article" }] }, { "t": 2, "i": [{ "t": 4, "k": "count" }, { "t": 3, "v": " articles" }] }] } },
    "payNow": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Payer" } },
    "details": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Détails" } },
    "pagination": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pages des commandes" } },
    "backToOrders": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Toutes mes commandes" } },
    "orderNotFound": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Cette commande est introuvable." } },
    "placedOn": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Passée le " }, { "t": 4, "k": "date" }] } },
    "paidOn": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Payée le " }, { "t": 4, "k": "date" }] } },
    "items": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Articles" } },
    "discount": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Réduction" } },
    "deliveryInfo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Livraison et paiement" } },
    "messages": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Messages de la boutique" } },
    "yourNote": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Votre note" } },
    "helpWithOrder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Aide sur cette commande" } },
    "profile": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Mes informations" } },
    "emailLocked": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "L’e-mail sert à la connexion et à l’envoi des codes. Contactez-nous pour le changer." } },
    "save": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Enregistrer" } },
    "saved": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Enregistré" } },
    "changePassword": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Mot de passe" } },
    "currentPassword": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Mot de passe actuel" } },
    "newPassword": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Nouveau mot de passe" } },
    "updatePassword": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Changer le mot de passe" } },
    "passwordUpdated": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Mot de passe modifié" } },
    "status": {
      "pending": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "En attente de paiement" } },
      "failed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Paiement échoué" } },
      "processing": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "En cours" } },
      "on-hold": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Paiement en vérification" } },
      "completed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Livrée" } },
      "cancelled": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Annulée" } },
      "refunded": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Remboursée" } }
    },
    "statusText": {
      "pending": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Le paiement de cette commande n’est pas encore finalisé." } },
      "failed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Le paiement n’a pas abouti. Vous pouvez réessayer." } },
      "processing": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Paiement reçu : votre code est en cours d’envoi par e-mail." } },
      "on-hold": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Votre commande est en cours de vérification." } },
      "completed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Votre code a été envoyé par e-mail." } },
      "cancelled": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Cette commande a été annulée." } },
      "refunded": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Cette commande a été remboursée." } }
    },
    "errors": {
      "passwordRequired": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Veuillez saisir votre mot de passe" } },
      "badCredentials": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "E-mail ou mot de passe incorrect." } },
      "tooMany": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Trop de tentatives. Réessayez dans quelques minutes." } },
      "unavailable": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "La connexion est momentanément indisponible. Réessayez plus tard." } },
      "passwordShort": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Le mot de passe doit contenir au moins 8 caractères" } },
      "emailTaken": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Un compte existe déjà avec cet e-mail." } },
      "registerFailed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Le compte n’a pas pu être créé. Réessayez plus tard." } },
      "loadFailed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Impossible de charger vos commandes." } },
      "wrongPassword": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Mot de passe actuel incorrect" } },
      "saveFailed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "L’enregistrement a échoué. Réessayez." } },
      "google": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "La connexion avec Google n'a pas abouti. Réessayez ou utilisez votre e-mail et mot de passe." } }
    },
    "googleContinue": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Continuer avec Google" } },
    "or": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ou" } }
  },
  "categoryPage": {
    "others": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Autres produits " }, { "t": 4, "k": "name" }] } }
  }
};
const resource$1 = {
  "lang": {
    "label": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "اللغة" } },
    "switch": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تغيير اللغة" } }
  },
  "seo": {
    "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "GamesZone – ألعاب وبطاقات PSN وSteam ومنتجات رقمية في الجزائر" } },
    "description": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "GamesZone متجرك للمنتجات الرقمية في الجزائر: ألعاب، بطاقات PSN وSteam والمزيد بأفضل الأسعار." } },
    "shortDescription": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "GamesZone متجرك للألعاب والبطاقات الرقمية (PSN، Steam…) في الجزائر." } },
    "cart": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "سلة التسوق" } },
    "checkout": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تأكيد الطلب" } },
    "success": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "شكراً لطلبك" } },
    "productFallback": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "منتج" } },
    "productDescription": { "t": 0, "b": { "t": 2, "i": [{ "t": 4, "k": "name" }, { "t": 3, "v": " بأفضل سعر في الجزائر: " }, { "t": 4, "k": "price" }, { "t": 3, "v": ". دفع إلكتروني آمن عبر CIB/الذهبية، والكود يُرسل عبر البريد الإلكتروني مع GamesZone." }] } },
    "categoryDescription": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "اكتشف " }, { "t": 4, "k": "name" }, { "t": 3, "v": " بأفضل الأسعار في الجزائر مع GamesZone: دفع إلكتروني آمن والأكواد تُرسل عبر البريد الإلكتروني." }] } }
  },
  "common": {
    "currency": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "دج" } },
    "seeAll": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "عرض الكل" } },
    "seeAllProducts": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "عرض جميع المنتجات" } },
    "loading": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "جاري التحميل..." } },
    "wait": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "يرجى الانتظار ..." } },
    "total": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "المجموع" } },
    "subtotal": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "المجموع الفرعي" } },
    "price": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "السعر" } },
    "quantity": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الكمية" } },
    "product": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "المنتج" } },
    "addToCart": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أضف إلى السلة" } },
    "available": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "متوفر" } },
    "unavailable": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "غير متوفر" } },
    "important": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "هام" } },
    "home": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الرئيسية" } },
    "shop": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "المتجر" } },
    "backHome": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "العودة إلى الصفحة الرئيسية" } },
    "backShop": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "العودة إلى المتجر" } },
    "close": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "إغلاق" } }
  },
  "header": {
    "searchPlaceholder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ابحث عن PS5، FIFA، GTA..." } },
    "recent": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "عمليات البحث الأخيرة:" } },
    "noResults": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "لا توجد نتائج 😢" } },
    "menu": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "القائمة" } },
    "searchLabel": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ابحث عن منتج" } },
    "searchButton": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "بحث" } },
    "clear": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "مسح" } },
    "trending": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "وصول سريع" } },
    "seeAll": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "عرض كل النتائج لـ «" }, { "t": 4, "k": "query" }, { "t": 3, "v": "»" }] } },
    "help": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تحتاج مساعدة؟" } },
    "myCart": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "سلتي" } },
    "categories": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الأقسام" } },
    "stripEmail": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الأكواد تُرسل عبر البريد الإلكتروني" } },
    "stripPay": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "دفع آمن عبر CIB / الذهبية" } },
    "shop": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "المتجر" } },
    "darkMode": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الوضع الداكن" } },
    "lightMode": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الوضع الفاتح" } }
  },
  "bottomNav": {
    "home": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الرئيسية" } },
    "cart": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "السلة" } },
    "shop": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "المتجر" } },
    "contact": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "اتصل بنا" } },
    "label": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "التنقل الرئيسي" } },
    "search": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "بحث" } },
    "cartCount": { "t": 0, "b": { "t": 2, "i": [{ "t": 4, "k": "n" }, { "t": 3, "v": " منتج في السلة" }] } }
  },
  "menu": {
    "games": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ألعاب" } },
    "consoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أجهزة" } },
    "used": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "مستعمل" } },
    "accessories": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "إكسسوارات" } },
    "digital": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "رقمي" } },
    "collector": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "مقتنيات" } },
    "retro": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ريترو" } },
    "gamesPs5": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ألعاب بلايستيشن 5" } },
    "exclusivePs": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "حصريات بلايستيشن" } },
    "gamesPs4": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ألعاب بلايستيشن 4" } },
    "gamesXboxSeries": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }, { "t": 9 }, { "t": 3 }], "s": "ألعاب Xbox Series X|S" } },
    "exclusiveXbox": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "حصريات Xbox" } },
    "gamesXboxOne": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ألعاب Xbox One" } },
    "gamesSwitch": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ألعاب نينتندو سويتش" } },
    "exclusiveSwitch": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "حصريات نينتندو سويتش" } },
    "gamesSwitch2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ألعاب نينتندو سويتش 2" } },
    "portableConsole": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أجهزة محمولة" } },
    "pcHandhelds": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أجهزة PC محمولة" } },
    "portableEmulation": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أجهزة محاكاة محمولة" } },
    "videoGames": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ألعاب الفيديو" } },
    "usedPs5Games": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ألعاب بلايستيشن 5 مستعملة" } },
    "usedPs4Games": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ألعاب بلايستيشن 4 مستعملة" } },
    "usedXboxSeriesGames": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ألعاب Xbox Series X مستعملة" } },
    "usedSwitchGames": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ألعاب سويتش مستعملة" } },
    "usedSwitch2Games": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ألعاب سويتش 2 مستعملة" } },
    "usedPs5Consoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أجهزة PS5 مستعملة" } },
    "usedPs4Consoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أجهزة PS4 مستعملة" } },
    "usedXboxXConsoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أجهزة Xbox Series X مستعملة" } },
    "usedXboxSConsoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أجهزة Xbox Series S مستعملة" } },
    "usedSwitchConsoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أجهزة سويتش مستعملة" } },
    "controllers": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أذرع التحكم" } },
    "usedPs5Controller": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ذراع تحكم بلايستيشن 5 مستعملة" } },
    "usedPs4Controller": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ذراع تحكم بلايستيشن 4 مستعملة" } },
    "usedXboxController": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ذراع تحكم Xbox مستعملة" } },
    "usedSwitchController": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ذراع تحكم سويتش مستعملة" } },
    "consoleAccessories": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "إكسسوارات الأجهزة" } },
    "controllerBattery": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "بطارية ذراع التحكم" } },
    "chargingStation": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "محطات الشحن" } },
    "coolingStation": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "محطة تبريد" } },
    "controllerStand": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "حامل ذراع التحكم" } },
    "headsets": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "سماعات" } },
    "ps5Controller": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ذراع تحكم بلايستيشن 5" } },
    "ps4Controller": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ذراع تحكم بلايستيشن 4" } },
    "xboxController": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ذراع تحكم Xbox" } },
    "switchController": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ذراع تحكم سويتش" } },
    "pdpController": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ذراع تحكم PDP" } },
    "utilities": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "مستلزمات" } },
    "consoleSkins": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ملصقات الأجهزة" } },
    "consoleCases": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "حقائب الأجهزة" } },
    "gamingHeadset": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "سماعة ألعاب" } },
    "psHeadset": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "سماعة بلايستيشن" } },
    "xboxHeadset": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "سماعة Xbox" } },
    "prepaidCards": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "بطاقات مسبقة الدفع" } },
    "prepaidPs": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "بطاقات PS مسبقة الدفع" } },
    "prepaidXbox": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "بطاقات Xbox مسبقة الدفع" } },
    "prepaidSteam": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "بطاقات Steam مسبقة الدفع" } },
    "prepaidNintendo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "بطاقات نينتندو مسبقة الدفع" } },
    "fullDigital": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "100% رقمي" } },
    "digitalGame": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "لعبة رقمية" } },
    "subscriptions": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "اشتراكات" } },
    "digitalConsole": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أجهزة رقمية" } },
    "streaming": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "البث" } },
    "collectors": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "إصدارات المقتنين" } },
    "consoleEditions": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "إصدارات خاصة للأجهزة" } },
    "miniature": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "مجسمات مصغرة" } },
    "decoration": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ديكور" } },
    "gamingLamp": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "مصباح ألعاب" } },
    "controllerHolder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "حامل ذراع التحكم" } },
    "figurines": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "مجسمات" } },
    "textile": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ملابس" } },
    "tshirt": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "قمصان" } },
    "backpack": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "حقيبة ظهر" } },
    "setupDeco": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ديكور السيت أب" } },
    "mousepad": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "لوحة الماوس" } },
    "headsetHolder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "حامل السماعة" } },
    "retroConsoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أجهزة ريترو" } },
    "retroGames": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ألعاب ريترو" } },
    "sealedNew": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "جديد مغلف" } },
    "completeBox": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "كامل مع العلبة والدليل" } },
    "usedRetroGames": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ألعاب ريترو مستعملة" } },
    "retroAccessories": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "إكسسوارات ريترو" } },
    "originalRetroControllers": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أذرع تحكم ريترو أصلية" } },
    "memoryConnectors": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "بطاقات الذاكرة والتوصيلات" } },
    "collectorGoodies": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "مقتنيات وهدايا" } },
    "retroCollector": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "إصدارات ريترو للمقتنين" } },
    "retroFigurines": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "مجسمات ريترو" } }
  },
  "categories": {
    "videoGames": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ألعاب الفيديو" } },
    "consoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أجهزة" } },
    "consoleAccessories": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "إكسسوارات الأجهزة" } },
    "used": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "مستعمل" } },
    "cardsSubs": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "بطاقات واشتراكات" } },
    "collectors": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "مقتنيات" } },
    "figurines": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "مجسمات" } },
    "steelbooks": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ستيلبوك" } },
    "postersFrames": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ملصقات وإطارات" } },
    "pcAccessories": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "إكسسوارات PC" } },
    "goodies": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "هدايا" } },
    "miniatures": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "مجسمات مصغرة" } },
    "clothing": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ملابس" } },
    "usedConsoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أجهزة مستعملة" } },
    "retro": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ريترو" } }
  },
  "home": {
    "buyNow": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "اشترِ الآن" } },
    "topSales": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الأكثر مبيعاً" } },
    "promotions": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "العروض" } },
    "hits": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الأكثر رواجاً" } },
    "digital": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "المنتجات الرقمية" } },
    "selection": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "اختياراتنا" } },
    "newConsoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "اكتشف أحدث الأجهزة في متجرنا!" } },
    "newConsolesSub": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أجهزة جديدة متوفرة الآن!" } },
    "followUs": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تابعونا" } },
    "allConsoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "جميع الأجهزة" } },
    "browseCategories": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تصفح حسب الفئة" } },
    "ctaNew": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "وصل حديثاً" } },
    "universesTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "جميع أقسام المتجر" } },
    "uniGames": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ألعاب الفيديو" } },
    "uniGamesText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "PS5، PS4، Xbox، Switch" } },
    "uniConsoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الأجهزة" } },
    "uniConsolesText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أحدث أجهزة الألعاب" } },
    "uniUsed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "المستعمل" } },
    "uniUsedText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ألعاب وأجهزة بأسعار مميزة" } },
    "uniAccessories": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الإكسسوارات" } },
    "uniAccessoriesText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أذرع تحكم، سماعات، شواحن" } },
    "uniDigital": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "بطاقات واشتراكات" } },
    "uniDigitalText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "PSN، Xbox، Steam، Netflix…" } },
    "uniCollector": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "المقتنيات والهدايا" } },
    "uniCollectorText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "إصدارات خاصة، مجسمات، ستيلبوك" } },
    "uniPc": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الحواسيب واللابتوب" } },
    "uniPcText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "حواسيب الألعاب والملحقات" } },
    "uniRetro": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ريترو" } },
    "uniRetroText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أجهزة وألعاب كلاسيكية" } },
    "followSub": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الجديد والوصولات والعروض أولاً بأول على حساباتنا" } },
    "follow": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "متابعة" } },
    "brandsTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "علاماتنا التجارية" } },
    "paymentsSub": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ادفع عبر الإنترنت بالبطاقة أو بالتحويل: يصلك الكود عبر البريد الإلكتروني." } },
    "bestSellers": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الأكثر مبيعاً" } }
  },
  "footer": {
    "about": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "متجرك للمنتجات الرقمية في الجزائر: ألعاب، بطاقات PSN وSteam والمزيد، تُدفع إلكترونياً وتُسلَّم عبر البريد الإلكتروني." } },
    "rights": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "جميع الحقوق محفوظة." } },
    "shop": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "المتجر" } },
    "help": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "المساعدة والتواصل" } },
    "whatsapp": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "راسلنا عبر واتساب" } },
    "payments": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "طرق الدفع" } },
    "backToTop": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "العودة إلى الأعلى" } }
  },
  "cart": {
    "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "سلة التسوق" } },
    "viewCart": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "عرض سلتي" } },
    "checkout": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "إتمام الطلب" } },
    "empty": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "سلة التسوق فارغة" } },
    "emptyCanvasText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أضف منتجات إلى سلتك للمتابعة." } },
    "continueShopping": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "متابعة التسوق" } },
    "emptyPageText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ابدأ بإضافة المنتجات التي ترغب في شرائها." } },
    "startShopping": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ابدأ التسوق" } },
    "shippingNotice": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "منتجات رقمية: يُرسل الكود إلى بريدك الإلكتروني بعد تأكيد الدفع." } },
    "warranty": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ضمان GamesZone" } },
    "express": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "التسليم عبر البريد الإلكتروني" } },
    "support": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "خدمة عملاء متميزة" } },
    "certified": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "منتجات أصلية معتمدة" } },
    "remove": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "إزالة " }, { "t": 4, "k": "name" }] } },
    "shippingAtCheckout": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تُحسب رسوم التوصيل في الخطوة التالية" } },
    "summary": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ملخص الطلب" } },
    "shippingNextStep": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "في الخطوة التالية" } },
    "itemsCount": { "t": 0, "b": { "t": 1, "c": [{ "t": 2, "i": [{ "t": 3 }], "s": "لا توجد منتجات" }, { "t": 2, "i": [{ "t": 3 }], "s": "منتج واحد" }, { "t": 2, "i": [{ "t": 4, "k": "count" }, { "t": 3, "v": " منتجات" }] }] } },
    "paymentAccepted": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "طرق الدفع المقبولة" } },
    "removeShort": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "إزالة" } },
    "secureCheckout": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "دفع آمن" } }
  },
  "product": {
    "used": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "مستعمل" } },
    "digital": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "رقمي" } },
    "new": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "جديد" } },
    "epay": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الدفع الإلكتروني" } },
    "chooseOptions": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "اختر الخيارات" } },
    "readMore": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "اقرأ المزيد" } },
    "promo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تخفيض" } },
    "epayTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الدفع الإلكتروني EPAY" } },
    "pay": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ادفع" } },
    "securePayment": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "دفع آمن عبر:" } },
    "epayNotice": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "بعد تأكيد الدفع، يُرسل الكود وتعليمات التفعيل إلى بريدك الإلكتروني." } },
    "sku": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "رمز المنتج:" } },
    "category": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الفئة:" } },
    "tags": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الكلمات المفتاحية:" } },
    "share": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "مشاركة:" } },
    "description": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الوصف" } },
    "related": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "منتجات ذات صلة" } },
    "decrease": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "إنقاص الكمية" } },
    "increase": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "زيادة الكمية" } },
    "askWhatsapp": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "اطلب أو اسأل عبر واتساب" } },
    "delivery58": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الكود يُرسل عبر البريد الإلكتروني" } },
    "copyLink": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "نسخ الرابط" } },
    "whatsappMessage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "مرحباً، أنا مهتم بـ: " }, { "t": 4, "k": "name" }] } },
    "epaySubtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "دفع آمن 100% ببطاقة CIB أو الذهبية" } },
    "epayStep1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "معلوماتك" } },
    "epayStep2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الدفع الآمن بالبطاقة" } },
    "epayStep3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "استلام الكود عبر البريد الإلكتروني" } },
    "phoneHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "سنتواصل معك على هذا الرقم عند الحاجة." } },
    "emailHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "سيُرسل الكود ووصل الدفع إلى هذا البريد." } },
    "addNote": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "إضافة ملاحظة على الطلب" } },
    "selectedOption": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الخيار المحدد" } },
    "payNow": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "المبلغ المطلوب الآن" } },
    "payAmount": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "ادفع " }, { "t": 4, "k": "amount" }] } },
    "redirecting": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "جارٍ التحويل إلى صفحة الدفع الآمنة…" } },
    "payError": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تعذّر بدء عملية الدفع. تحقق من اتصالك وحاول مجدداً، أو تواصل معنا عبر واتساب." } },
    "secureCards": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "سيتم تحويلك إلى صفحة دفع آمنة" } },
    "unavailableTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "غير متوفر حالياً" } },
    "unavailableText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "هذا المنتج نفد من المخزون. تواصل معنا عبر واتساب ليتم إعلامك عند توفره." } },
    "from": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ابتداءً من" } },
    "outOfStock": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "نفد المخزون" } },
    "added": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تمت الإضافة" } },
    "add": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أضف" } },
    "view": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "عرض المنتج" } },
    "zoom": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تكبير الصورة" } },
    "readLess": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "عرض أقل" } },
    "buyNow": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "اشترِ الآن" } },
    "payWith": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ادفع عبر CIB، الذهبية، بريدي موب، CCP، Binance أو RedotPay" } },
    "details": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "التفاصيل" } }
  },
  "form": {
    "firstName": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الإسم" } },
    "lastName": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "اللقب" } },
    "phone": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "رقم الهاتف" } },
    "email": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "البريد الإلكتروني" } },
    "wilaya": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الولاية" } },
    "commune": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "البلدية" } },
    "noteLabel": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "معلومات إضافية حول طلبك (اختياري)" } },
    "notePlaceholder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ملاحظة حول طلبك، إذا لزم الأمر" } },
    "selectWilaya": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "يرجى اختيار الولاية" } },
    "selectCommune": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "يرجى اختيار البلدية" } },
    "errors": {
      "firstNameRequired": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الإسم مطلوب" } },
      "lastNameRequired": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "اللقب مطلوب" } },
      "phoneInvalid": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "رقم الهاتف غير صالح" } },
      "emailInvalid": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "البريد الإلكتروني غير صالح" } },
      "wilayaRequired": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "يرجى اختيار الولاية" } },
      "communeRequired": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "يرجى اختيار البلدية" } },
      "termsRequired": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "يجب الموافقة على الشروط" } }
    }
  },
  "checkout": {
    "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تأكيد الطلب" } },
    "billing": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الفوترة والشحن" } },
    "additionalInfo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "معلومات إضافية" } },
    "yourOrder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "طلبك" } },
    "summary": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ملخص الطلب" } },
    "shippingMethod": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "طريقة التوصيل" } },
    "paymentMethod": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "طريقة الدفع" } },
    "privacy": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "سيتم استخدام بياناتك الشخصية لمعالجة طلبك وتحسين تجربتك على موقعنا، وفقاً لسياسة الخصوصية الخاصة بنا." } },
    "terms": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "لقد قرأت الشروط العامة وأوافق عليها." } },
    "order": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "اطلب الآن" } },
    "shipHome": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "توصيل للمنزل" } },
    "shipDesk": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "توصيل للمكتب" } },
    "shipStore": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الاستلام من المتجر" } },
    "stepCart": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "السلة" } },
    "stepConfirm": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "التأكيد" } },
    "contact": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "معلوماتك" } },
    "delivery": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "عنوان التوصيل" } },
    "phoneHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "سنتواصل معك على هذا الرقم عند الحاجة." } },
    "wilayaFirst": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "اختر الولاية أولاً" } },
    "shipHomeHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "التوصيل إلى عنوانك" } },
    "shipDeskHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الاستلام من مكتب شركة التوصيل" } },
    "shipStoreHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "استلام مجاني من متجرنا (الجزائر العاصمة)" } },
    "free": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "مجاني" } },
    "chooseCommune": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "اختر البلدية" } },
    "placeOrder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "ادفع · " }, { "t": 4, "k": "total" }] } },
    "submitError": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تعذّر إرسال الطلب. تحقق من اتصالك وحاول مجدداً، أو تواصل معنا عبر واتساب." } },
    "emailHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ستُرسل الأكواد إلى هذا البريد: تأكد من صحته." } },
    "stepPayment": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الدفع" } },
    "payOnline": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الدفع الإلكتروني" } },
    "payOnlineNotice": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "بطاقة CIB أو الذهبية، عبر صفحة الدفع الآمنة." } },
    "deliveryLabel": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "التسليم" } },
    "deliveryEmail": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "عبر البريد الإلكتروني" } },
    "backToCart": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "العودة إلى السلة" } },
    "editCart": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تعديل" } },
    "showSummary": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "عرض الطلب" } },
    "hideSummary": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "إخفاء الطلب" } }
  },
  "shop": {
    "showing": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "عرض " }, { "t": 4, "k": "start" }, { "t": 3, "v": " إلى " }, { "t": 4, "k": "end" }, { "t": 3, "v": " من أصل " }, { "t": 4, "k": "total" }, { "t": 3, "v": " نتيجة" }] } },
    "results": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "نتائج البحث - " }, { "t": 4, "k": "query" }] } },
    "noProducts": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "لم يتم العثور على أي منتج" } },
    "noProductsHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "جرّب كلمات مفتاحية أخرى أو تصفح فئاتنا." } },
    "filter": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تصفية" } },
    "categories": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الفئات" } },
    "pagination": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ترقيم صفحات المنتجات" } },
    "sort": {
      "label": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ترتيب حسب" } },
      "default": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الأكثر صلة" } },
      "popularity": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الأكثر شعبية" } },
      "newest": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الأحدث" } },
      "priceAsc": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "السعر: من الأقل إلى الأعلى" } },
      "priceDesc": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "السعر: من الأعلى إلى الأقل" } },
      "nameAsc": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الاسم (أ → ي)" } }
    },
    "filters": {
      "availability": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "التوفر" } },
      "inStock": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "المتوفر فقط" } },
      "onSale": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "العروض فقط" } },
      "min": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الأدنى" } },
      "max": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الأقصى" } },
      "apply": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تطبيق السعر" } },
      "under": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "أقل من " }, { "t": 4, "k": "amount" }] } },
      "over": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "أكثر من " }, { "t": 4, "k": "amount" }] } },
      "allCategories": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "جميع الفئات" } },
      "clearAll": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "مسح الكل" } },
      "collection": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "اختيار من القائمة" } },
      "remove": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "إزالة الفلتر " }, { "t": 4, "k": "name" }] } },
      "showResults": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "عرض " }, { "t": 4, "k": "count" }, { "t": 3, "v": " منتج" }] } },
      "noResultsHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "لا توجد منتجات تطابق هذه الفلاتر. جرّب إزالة بعضها." } },
      "platform": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "المنصة (ألعاب)" } },
      "newArrivals": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "وصل حديثاً (آخر " }, { "t": 4, "k": "days" }, { "t": 3, "v": " يوماً)" }] } },
      "showMore": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "عرض " }, { "t": 4, "k": "count" }, { "t": 3, "v": " أخرى" }] } },
      "showLess": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "عرض أقل" } }
    },
    "prevPage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الصفحة السابقة" } },
    "nextPage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الصفحة التالية" } },
    "goToPage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "الانتقال إلى الصفحة " }, { "t": 4, "k": "page" }] } },
    "pageOf": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "الصفحة " }, { "t": 4, "k": "page" }, { "t": 3, "v": " / " }, { "t": 4, "k": "total" }] } },
    "productsCount": { "t": 0, "b": { "t": 1, "c": [{ "t": 2, "i": [{ "t": 3 }], "s": "لا توجد منتجات" }, { "t": 2, "i": [{ "t": 3 }], "s": "منتج واحد" }, { "t": 2, "i": [{ "t": 4, "k": "count" }, { "t": 3, "v": " منتج" }] }] } },
    "allIn": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "عرض الكل" } }
  },
  "success": {
    "heading": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "العب مع GamesZone!" } },
    "thanks": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "شكراً لطلبك!" } },
    "received": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "لقد استلمنا طلبك بنجاح." } },
    "unreachable": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "في حال عدم الرد على الاتصال، قد يتم إلغاء الطلب." } },
    "contactSoon": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "سيتصل بك فريقنا قريباً لتأكيد طلبك." } },
    "prepared": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "سيتم تحضير طلبك وشحنه بسرعة." } },
    "codInfo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الدفع يتم عند الاستلام" } },
    "help": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "فريقنا هنا لمساعدتك 😊" } },
    "whatsapp": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تحدث معنا عبر واتساب" } },
    "phoneSupport": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الدعم الهاتفي" } },
    "copyOrder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "نسخ رقم الطلب" } },
    "copied": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تم نسخ الرقم" } },
    "stayReachableTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تفقّد بريدك الإلكتروني" } },
    "nextTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ماذا بعد؟" } },
    "step1Title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "مكالمة التأكيد" } },
    "step2Title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "التحضير والشحن" } },
    "step3Title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "التوصيل والدفع" } },
    "toPayOnDelivery": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "المبلغ المستحق عند الاستلام" } },
    "helpText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "لديك سؤال عن طلبك؟ راسلنا مع ذكر رقم الطلب." } },
    "whatsappMessage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "مرحباً، أتواصل معكم بخصوص طلبي رقم " }, { "t": 4, "k": "id" }, { "t": 3, "v": "." }] } }
  },
  "payment": {
    "confirmed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تم تأكيد الدفع" } },
    "successText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تمت عملية الدفع بنجاح." } },
    "orderNo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "رقم الطلب" } },
    "thanks": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "🎮 شكراً لطلبك!" } },
    "preparing": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تم تأكيد عملية الدفع بنجاح، والكود في طريقه إلى بريدك الإلكتروني." } },
    "whatsappIntro": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "سيتواصل معك فريقنا مباشرة عبر واتساب من أجل:" } },
    "step1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "✔️ إتمام تسليم المنتج" } },
    "step2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "✔️ مساعدتك في التفعيل" } },
    "step3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "✔️ شرح طريقة الاستخدام" } },
    "step4": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "✔️ توفير المتابعة عند الحاجة" } },
    "stayReachable": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "⏳ يرجى البقاء متاحاً لتسريع معالجة طلبك." } },
    "support": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "خدمة الزبائن" } },
    "whatsapp": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "واتساب" } },
    "needHelp": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تحتاج مساعدة؟ فريق الدعم متوفر عبر واتساب." } },
    "failed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "فشلت عملية الدفع" } },
    "notConfirmed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "لم يتم تأكيد الدفع" } },
    "notFinalized": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "لم يتم تأكيد عملية الدفع أو تم إلغاؤها." } },
    "check1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "• تحقق من بطاقة الذهبية أو CIB" } },
    "check2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "• تحقق من الرصيد المتوفر" } },
    "check3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "• حاول مرة أخرى بعد قليل" } },
    "thanksTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "شكراً لطلبك!" } },
    "invoiceNo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الفاتورة" } },
    "reasonLabel": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "السبب:" } },
    "stayReachableText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "يُرسل الكود إلى البريد الإلكتروني الذي أدخلته. لا تنسَ التحقق من مجلد الرسائل غير المرغوب فيها." } },
    "whatsappIntroShort": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "يُرسل الكود وتعليمات التفعيل عبر البريد الإلكتروني." } },
    "tl1Title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تم تأكيد الدفع" } },
    "tl1Text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تم استلام دفعتك بالبطاقة بنجاح." } },
    "tl2Title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "إرسال الكود عبر البريد" } },
    "tl3Title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "التفعيل" } },
    "tl3Text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "استخدم الكود على PSN أو Steam أو المنصة المعنية." } },
    "recapTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "مشترياتك" } },
    "paid": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "المبلغ المدفوع" } },
    "checksTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ماذا تتحقق؟" } },
    "checkCard": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أن بطاقتك CIB / الذهبية مفعّلة ومسموح لها بالدفع عبر الإنترنت" } },
    "checkBalance": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أن رصيدك كافٍ" } },
    "checkRetry": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أعد المحاولة بعد بضع دقائق" } },
    "retryTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "إعادة محاولة الدفع" } },
    "retry": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "إعادة محاولة الدفع" } },
    "helpFailed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "المشكلة مستمرة؟ راسلنا مع رقم الطلب وسنساعدك." } },
    "whatsappSuccess": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "مرحباً، تم تأكيد دفعي للطلب رقم " }, { "t": 4, "k": "id" }, { "t": 3, "v": "." }] } },
    "whatsappFailed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "مرحباً، لم تنجح عملية الدفع للطلب رقم " }, { "t": 4, "k": "id" }, { "t": 3, "v": ". هل يمكنكم مساعدتي؟" }] } },
    "cartItems": { "t": 0, "b": { "t": 2, "i": [{ "t": 4, "k": "count" }, { "t": 3, "v": " منتجات" }] } },
    "chooseMethod": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "طريقة الدفع" } },
    "instantConfirm": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تأكيد فوري" } },
    "manualHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تحويل + وصل، يتحقق منه فريقنا" } },
    "sendExactly": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أرسل بالضبط" } },
    "toAccount": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "عبر " }, { "t": 4, "k": "method" }, { "t": 3, "v": " إلى الحساب أدناه، ثم أرفق وصل الدفع." }] } },
    "copy": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "نسخ " }, { "t": 4, "k": "label" }] } },
    "fieldRip": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "RIP" } },
    "fieldAccount": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "رقم الحساب" } },
    "fieldKey": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "المفتاح" } },
    "fieldHolder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الاسم واللقب" } },
    "fieldAddress": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "العنوان" } },
    "fieldBinanceId": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Binance ID" } },
    "fieldRedotpayId": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "RedotPay ID" } },
    "fieldIban": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "IBAN" } },
    "rateInfo": { "t": 0, "b": { "t": 2, "i": [{ "t": 4, "k": "total" }, { "t": 3, "v": " محوّلة بسعر اليوم: " }, { "t": 4, "k": "rate" }, { "t": 3, "v": "." }] } },
    "proofLabel": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "وصل الدفع (صورة أو PDF)" } },
    "proofChoose": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "اختر ملفًا" } },
    "proofDrop": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أو اسحبه هنا" } },
    "proofFormats": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "JPG أو PNG أو WEBP أو PDF · 5 ميغابايت كحد أقصى" } },
    "proofRemove": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "إزالة الملف" } },
    "proofType": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "صيغة غير مقبولة: أرسل صورة (JPG أو PNG أو WEBP) أو ملف PDF." } },
    "proofSize": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الملف كبير جدًا (5 ميغابايت كحد أقصى)." } },
    "proofRequired": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أضف وصل الدفع للمتابعة." } },
    "manualNote": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "يتم تأكيد طلبك بعد أن يتحقق فريقنا من الوصل، ثم يُرسل الكود إلى بريدك الإلكتروني." } },
    "manualFailed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تعذّر إرسال الطلب. تحقق من اتصالك وحاول مجددًا، أو تواصل معنا عبر واتساب." } },
    "sendOrder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "إرسال الطلب · " }, { "t": 4, "k": "total" }] } },
    "pendingEyebrow": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الدفع قيد التحقق" } },
    "pendingTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تم استلام طلبك، شكرًا!" } },
    "pendingText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "نتحقق من دفعتك عبر " }, { "t": 4, "k": "method" }, { "t": 3, "v": ". بمجرد تأكيدها، يُرسل الكود إلى بريدك الإلكتروني." }] } },
    "pendingStep1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تم إرسال الطلب والوصل" } },
    "pendingStep2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تحقق فريقنا من الدفع" } },
    "pendingStep3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "إرسال الكود عبر البريد الإلكتروني" } },
    "onlineTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "بطاقة CIB / الذهبية" } },
    "recommended": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "موصى به" } },
    "orTransfer": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أو عبر تحويل مع وصل" } },
    "stepSend": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أرسل المبلغ" } },
    "stepUpload": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أرفق وصل الدفع" } }
  },
  "error": {
    "notFound": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الصفحة غير موجودة" } },
    "generic": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "حدث خطأ ما" } },
    "notFoundText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الصفحة التي تبحث عنها غير موجودة أو تم نقلها." } },
    "retryLater": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "يرجى المحاولة لاحقاً." } },
    "popular": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الأكثر زيارة" } },
    "retry": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "إعادة المحاولة" } },
    "goBack": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الصفحة السابقة" } },
    "helpText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ما زلت تواجه مشكلة؟" } },
    "code": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "رمز الخطأ:" } },
    "whatsappMessage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "مرحباً، تظهر لي رسالة خطأ " }, { "t": 4, "k": "code" }, { "t": 3, "v": " في الموقع: " }, { "t": 4, "k": "url" }] } }
  },
  "breadcrumb": {
    "label": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "مسار التنقل" } }
  },
  "loader": {
    "ready": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "استعد للعب" } }
  },
  "reviews": {
    "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "آراء زبائننا" } },
    "subtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تقييمات Google موثقة" } }
  },
  "account": {
    "menu": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "قائمة الحساب" } },
    "myAccount": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "حسابي" } },
    "overview": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "نظرة عامة" } },
    "orders": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "طلباتي" } },
    "settings": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الإعدادات" } },
    "logout": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تسجيل الخروج" } },
    "login": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تسجيل الدخول" } },
    "createAccount": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "إنشاء حساب" } },
    "loginTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تسجيل الدخول" } },
    "loginSubtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "اعثر على طلباتك وأكوادك." } },
    "registerTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "إنشاء حساب" } },
    "registerSubtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تابع طلباتك وادفع بشكل أسرع." } },
    "checkoutNotice": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "سجّل الدخول أو أنشئ حسابًا لإتمام طلبك. سلّتك محفوظة." } },
    "password": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "كلمة المرور" } },
    "forgot": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "نسيت كلمة المرور؟" } },
    "showPassword": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "إظهار كلمة المرور" } },
    "hidePassword": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "إخفاء كلمة المرور" } },
    "noAccount": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ليس لديك حساب؟" } },
    "haveAccount": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "لديك حساب؟" } },
    "passwordHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "8 أحرف على الأقل." } },
    "hello": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "مرحباً " }, { "t": 4, "k": "name" }] } },
    "ordersCount": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الطلبات" } },
    "awaitingPayment": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "في انتظار الدفع" } },
    "codesSentTo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تُرسل أكوادك إلى" } },
    "recentOrders": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "آخر الطلبات" } },
    "noOrders": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ليس لديك أي طلب بعد." } },
    "orderNo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "الطلب رقم " }, { "t": 4, "k": "number" }] } },
    "itemsCount": { "t": 0, "b": { "t": 1, "c": [{ "t": 2, "i": [{ "t": 4, "k": "count" }, { "t": 3, "v": " منتج" }] }, { "t": 2, "i": [{ "t": 4, "k": "count" }, { "t": 3, "v": " منتجات" }] }] } },
    "payNow": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ادفع" } },
    "details": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "التفاصيل" } },
    "pagination": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "صفحات الطلبات" } },
    "backToOrders": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "كل طلباتي" } },
    "orderNotFound": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "لم يتم العثور على هذا الطلب." } },
    "placedOn": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "بتاريخ " }, { "t": 4, "k": "date" }] } },
    "paidOn": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "دُفع في " }, { "t": 4, "k": "date" }] } },
    "items": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "المنتجات" } },
    "discount": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تخفيض" } },
    "deliveryInfo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "التسليم والدفع" } },
    "messages": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "رسائل المتجر" } },
    "yourNote": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ملاحظتك" } },
    "helpWithOrder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "مساعدة بخصوص هذا الطلب" } },
    "profile": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "معلوماتي" } },
    "emailLocked": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "البريد الإلكتروني يُستخدم لتسجيل الدخول وإرسال الأكواد. تواصل معنا لتغييره." } },
    "save": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "حفظ" } },
    "saved": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تم الحفظ" } },
    "changePassword": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "كلمة المرور" } },
    "currentPassword": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "كلمة المرور الحالية" } },
    "newPassword": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "كلمة المرور الجديدة" } },
    "updatePassword": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تغيير كلمة المرور" } },
    "passwordUpdated": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تم تغيير كلمة المرور" } },
    "status": {
      "pending": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "في انتظار الدفع" } },
      "failed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "فشل الدفع" } },
      "processing": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "قيد المعالجة" } },
      "on-hold": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "الدفع قيد التحقق" } },
      "completed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تم التسليم" } },
      "cancelled": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "ملغى" } },
      "refunded": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "مسترجع" } }
    },
    "statusText": {
      "pending": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "لم يكتمل دفع هذا الطلب بعد." } },
      "failed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "لم تنجح عملية الدفع. يمكنك المحاولة مجدداً." } },
      "processing": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تم استلام الدفع: الكود في طريقه إلى بريدك الإلكتروني." } },
      "on-hold": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "طلبك قيد المراجعة." } },
      "completed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تم إرسال الكود إلى بريدك الإلكتروني." } },
      "cancelled": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تم إلغاء هذا الطلب." } },
      "refunded": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تم استرجاع مبلغ هذا الطلب." } }
    },
    "errors": {
      "passwordRequired": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "يرجى إدخال كلمة المرور" } },
      "badCredentials": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "البريد الإلكتروني أو كلمة المرور غير صحيحة." } },
      "tooMany": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "محاولات كثيرة. أعد المحاولة بعد بضع دقائق." } },
      "unavailable": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تسجيل الدخول غير متاح حالياً. حاول لاحقاً." } },
      "passwordShort": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل" } },
      "emailTaken": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "يوجد حساب بهذا البريد الإلكتروني." } },
      "registerFailed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تعذّر إنشاء الحساب. حاول لاحقاً." } },
      "loadFailed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تعذّر تحميل طلباتك." } },
      "wrongPassword": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "كلمة المرور الحالية غير صحيحة" } },
      "saveFailed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "فشل الحفظ. حاول مجدداً." } },
      "google": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "تعذّر تسجيل الدخول عبر Google. حاول مرة أخرى أو استخدم بريدك الإلكتروني وكلمة المرور." } }
    },
    "googleContinue": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "المتابعة باستخدام Google" } },
    "or": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "أو" } }
  },
  "categoryPage": {
    "others": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "منتجات " }, { "t": 4, "k": "name" }, { "t": 3, "v": " أخرى" }] } }
  }
};
const resource = {
  "lang": {
    "label": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Language" } },
    "switch": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Change language" } }
  },
  "seo": {
    "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "GamesZone – Games, PSN cards, Steam and digital products in Algeria" } },
    "description": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "GamesZone, your digital products store in Algeria: games, PSN cards, Steam and much more, at the best price." } },
    "shortDescription": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "GamesZone, your store for games and digital cards (PSN, Steam…) in Algeria." } },
    "cart": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Cart" } },
    "checkout": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Checkout" } },
    "success": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Thank you for your order" } },
    "productFallback": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Product" } },
    "productDescription": { "t": 0, "b": { "t": 2, "i": [{ "t": 4, "k": "name" }, { "t": 3, "v": " at the best price in Algeria: " }, { "t": 4, "k": "price" }, { "t": 3, "v": ". Secure online payment with CIB/Edahabia, code sent by email at GamesZone." }] } },
    "categoryDescription": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Discover our " }, { "t": 4, "k": "name" }, { "t": 3, "v": " at the best price in Algeria at GamesZone: secure online payment and codes sent by email." }] } }
  },
  "common": {
    "currency": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "DA" } },
    "seeAll": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "See all" } },
    "seeAllProducts": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "See all products" } },
    "loading": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Loading..." } },
    "wait": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Please wait..." } },
    "total": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Total" } },
    "subtotal": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Subtotal" } },
    "price": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Price" } },
    "quantity": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Quantity" } },
    "product": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Product" } },
    "addToCart": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Add to Cart" } },
    "available": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Available" } },
    "unavailable": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Unavailable" } },
    "important": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Important" } },
    "home": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Home" } },
    "shop": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Shop" } },
    "backHome": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Back to home" } },
    "backShop": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Back to shop" } },
    "close": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Close" } }
  },
  "header": {
    "searchPlaceholder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Search PS5, FIFA, GTA..." } },
    "recent": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Recent searches:" } },
    "noResults": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "No results 😢" } },
    "menu": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Menu" } },
    "searchLabel": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Search for a product" } },
    "searchButton": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Search" } },
    "clear": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Clear" } },
    "trending": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Quick access" } },
    "seeAll": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "See all results for “" }, { "t": 4, "k": "query" }, { "t": 3, "v": "”" }] } },
    "help": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Need help?" } },
    "myCart": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "My cart" } },
    "categories": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Categories" } },
    "stripEmail": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Codes sent by email" } },
    "stripPay": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Secure CIB / Edahabia payment" } },
    "shop": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Shop" } },
    "darkMode": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Dark mode" } },
    "lightMode": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Light mode" } }
  },
  "bottomNav": {
    "home": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Home" } },
    "cart": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Cart" } },
    "shop": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Shop" } },
    "contact": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Contact" } },
    "label": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Main navigation" } },
    "search": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Search" } },
    "cartCount": { "t": 0, "b": { "t": 2, "i": [{ "t": 4, "k": "n" }, { "t": 3, "v": " item(s) in the cart" }] } }
  },
  "menu": {
    "games": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Games" } },
    "consoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Consoles" } },
    "used": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pre-owned" } },
    "accessories": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Accessories" } },
    "digital": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Digital" } },
    "collector": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Collector" } },
    "retro": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Retro" } },
    "gamesPs5": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "PlayStation 5 Games" } },
    "exclusivePs": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "PlayStation Exclusives" } },
    "gamesPs4": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "PlayStation 4 Games" } },
    "gamesXboxSeries": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }, { "t": 9 }, { "t": 3 }], "s": "Xbox Series X|S Games" } },
    "exclusiveXbox": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Xbox Exclusives" } },
    "gamesXboxOne": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Xbox One Games" } },
    "gamesSwitch": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Nintendo Switch Games" } },
    "exclusiveSwitch": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Nintendo Switch Exclusives" } },
    "gamesSwitch2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Nintendo Switch 2 Games" } },
    "portableConsole": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Handheld Consoles" } },
    "pcHandhelds": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "PC Handhelds" } },
    "portableEmulation": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Handheld Emulation" } },
    "videoGames": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Video Games" } },
    "usedPs5Games": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pre-owned PlayStation 5 Games" } },
    "usedPs4Games": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pre-owned PlayStation 4 Games" } },
    "usedXboxSeriesGames": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pre-owned Xbox Series X Games" } },
    "usedSwitchGames": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pre-owned Switch Games" } },
    "usedSwitch2Games": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pre-owned Switch 2 Games" } },
    "usedPs5Consoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pre-owned PS5 Consoles" } },
    "usedPs4Consoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pre-owned PS4 Consoles" } },
    "usedXboxXConsoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pre-owned Xbox Series X Consoles" } },
    "usedXboxSConsoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pre-owned Xbox Series S Consoles" } },
    "usedSwitchConsoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pre-owned Switch Consoles" } },
    "controllers": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Controllers" } },
    "usedPs5Controller": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pre-owned PlayStation 5 Controller" } },
    "usedPs4Controller": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pre-owned PlayStation 4 Controller" } },
    "usedXboxController": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pre-owned Xbox Controller" } },
    "usedSwitchController": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pre-owned Switch Controller" } },
    "consoleAccessories": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Console Accessories" } },
    "controllerBattery": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Controller Batteries" } },
    "chargingStation": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Charging Stations" } },
    "coolingStation": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Cooling Stations" } },
    "controllerStand": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Controller Stands" } },
    "headsets": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Headsets" } },
    "ps5Controller": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "PlayStation 5 Controller" } },
    "ps4Controller": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "PlayStation 4 Controller" } },
    "xboxController": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Xbox Controller" } },
    "switchController": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Switch Controller" } },
    "pdpController": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "PDP Controller" } },
    "utilities": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Utilities" } },
    "consoleSkins": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Console Skins" } },
    "consoleCases": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Console Cases" } },
    "gamingHeadset": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Gaming Headsets" } },
    "psHeadset": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "PlayStation Headsets" } },
    "xboxHeadset": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Xbox Headsets" } },
    "prepaidCards": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Prepaid Cards" } },
    "prepaidPs": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "PS Prepaid Cards" } },
    "prepaidXbox": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Xbox Prepaid Cards" } },
    "prepaidSteam": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Steam Prepaid Cards" } },
    "prepaidNintendo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Nintendo Prepaid Cards" } },
    "fullDigital": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "100% Digital" } },
    "digitalGame": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Digital Games" } },
    "subscriptions": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Subscriptions" } },
    "digitalConsole": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Digital Consoles" } },
    "streaming": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Streaming" } },
    "collectors": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Collectors" } },
    "consoleEditions": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Console Editions" } },
    "miniature": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Miniatures" } },
    "decoration": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Decoration" } },
    "gamingLamp": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Gaming Lamps" } },
    "controllerHolder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Controller Holders" } },
    "figurines": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Figurines" } },
    "textile": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Apparel" } },
    "tshirt": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "T-Shirts" } },
    "backpack": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Backpacks" } },
    "setupDeco": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Setup Decor" } },
    "mousepad": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Mouse Pads" } },
    "headsetHolder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Headset Holders" } },
    "retroConsoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Retro Consoles" } },
    "retroGames": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Retro Games" } },
    "sealedNew": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Brand new, sealed" } },
    "completeBox": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Complete in box" } },
    "usedRetroGames": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pre-owned Retro Games" } },
    "retroAccessories": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Retro Accessories" } },
    "originalRetroControllers": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Original Retro Controllers" } },
    "memoryConnectors": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Memory & Cables" } },
    "collectorGoodies": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Collector & Goodies" } },
    "retroCollector": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Retro Collector's Editions" } },
    "retroFigurines": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Retro Figurines" } }
  },
  "categories": {
    "videoGames": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Video Games" } },
    "consoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Consoles" } },
    "consoleAccessories": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Console Accessories" } },
    "used": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pre-owned" } },
    "cardsSubs": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Cards & Subscriptions" } },
    "collectors": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Collectors" } },
    "figurines": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Figurines" } },
    "steelbooks": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Steelbooks" } },
    "postersFrames": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Posters & Frames" } },
    "pcAccessories": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "PC Accessories" } },
    "goodies": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Goodies" } },
    "miniatures": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Miniatures" } },
    "clothing": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Clothing" } },
    "usedConsoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pre-owned Consoles" } },
    "retro": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Retro" } }
  },
  "home": {
    "buyNow": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "BUY NOW" } },
    "topSales": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Best Sellers" } },
    "promotions": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Deals" } },
    "hits": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "GamesZone Hits" } },
    "digital": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Digital Products" } },
    "selection": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Our Picks" } },
    "newConsoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Discover our new consoles in store!" } },
    "newConsolesSub": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "New consoles in stock!" } },
    "followUs": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Follow us" } },
    "allConsoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "All consoles" } },
    "browseCategories": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Browse by category" } },
    "ctaNew": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "New arrivals" } },
    "universesTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "All our departments" } },
    "uniGames": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Video games" } },
    "uniGamesText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "PS5, PS4, Xbox, Switch" } },
    "uniConsoles": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Consoles" } },
    "uniConsolesText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Today's consoles" } },
    "uniUsed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pre-owned" } },
    "uniUsedText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Games, consoles and great deals" } },
    "uniAccessories": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Accessories" } },
    "uniAccessoriesText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Controllers, headsets, chargers" } },
    "uniDigital": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Cards & subscriptions" } },
    "uniDigitalText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "PSN, Xbox, Steam, Netflix…" } },
    "uniCollector": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Collector & Goodies" } },
    "uniCollectorText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Collectors, figurines, steelbooks" } },
    "uniPc": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "PC & Laptops" } },
    "uniPcText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Gaming PCs and peripherals" } },
    "uniRetro": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Retro" } },
    "uniRetroText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Classic consoles and games" } },
    "followSub": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "New releases, arrivals and deals first on our socials" } },
    "follow": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Follow" } },
    "brandsTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Our brands" } },
    "paymentsSub": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pay online by card or by transfer: your code arrives by email." } },
    "bestSellers": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Best sellers" } }
  },
  "footer": {
    "about": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Your digital products store in Algeria: games, PSN cards, Steam and much more, paid online and delivered by email." } },
    "rights": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "All rights reserved." } },
    "shop": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Shop" } },
    "help": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Help & contact" } },
    "whatsapp": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Message us on WhatsApp" } },
    "payments": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Payment methods" } },
    "backToTop": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Back to top" } }
  },
  "cart": {
    "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Cart" } },
    "viewCart": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "View My Cart" } },
    "checkout": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Complete My Order" } },
    "empty": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Your cart is empty" } },
    "emptyCanvasText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Add products to your cart to keep shopping." } },
    "continueShopping": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Continue shopping" } },
    "emptyPageText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Discover our products and add your favourites to your cart." } },
    "startShopping": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Start shopping" } },
    "shippingNotice": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Digital products: your code is sent by email once the payment is confirmed." } },
    "warranty": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "GamesZone Warranty" } },
    "express": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Delivery by email" } },
    "support": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Responsive Customer Service" } },
    "certified": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Certified products" } },
    "remove": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Remove " }, { "t": 4, "k": "name" }] } },
    "shippingAtCheckout": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Shipping costs calculated at the next step" } },
    "summary": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Summary" } },
    "shippingNextStep": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Next step" } },
    "itemsCount": { "t": 0, "b": { "t": 1, "c": [{ "t": 2, "i": [{ "t": 4, "k": "count" }, { "t": 3, "v": " items" }] }, { "t": 2, "i": [{ "t": 4, "k": "count" }, { "t": 3, "v": " item" }] }, { "t": 2, "i": [{ "t": 4, "k": "count" }, { "t": 3, "v": " items" }] }] } },
    "paymentAccepted": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Accepted payment methods" } },
    "removeShort": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Remove" } },
    "secureCheckout": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Secure payment" } }
  },
  "product": {
    "used": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pre-owned" } },
    "digital": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Digital" } },
    "new": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "New" } },
    "epay": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "E-Payment" } },
    "chooseOptions": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Choose options" } },
    "readMore": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Read more" } },
    "promo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Sale" } },
    "epayTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "EPAY electronic payment" } },
    "pay": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pay" } },
    "securePayment": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Secure payment via:" } },
    "epayNotice": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Once the payment is confirmed, your code and activation instructions are sent to your email address." } },
    "sku": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "SKU:" } },
    "category": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Category:" } },
    "tags": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Tags:" } },
    "share": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Share:" } },
    "description": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Description" } },
    "related": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Related products" } },
    "decrease": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Decrease quantity" } },
    "increase": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Increase quantity" } },
    "askWhatsapp": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Order or ask a question on WhatsApp" } },
    "delivery58": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Code sent by email" } },
    "copyLink": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Copy link" } },
    "whatsappMessage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Hello, I'm interested in: " }, { "t": 4, "k": "name" }] } },
    "epaySubtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "100% secure payment with CIB or Edahabia card" } },
    "epayStep1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Your details" } },
    "epayStep2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Secure card payment" } },
    "epayStep3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Code delivered by email" } },
    "phoneHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "We'll contact you on this number if needed." } },
    "emailHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Your code and receipt will be sent to this address." } },
    "addNote": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Add a note to the order" } },
    "selectedOption": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Selected option" } },
    "payNow": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "To pay now" } },
    "payAmount": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Pay " }, { "t": 4, "k": "amount" }] } },
    "redirecting": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Redirecting to secure payment…" } },
    "payError": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "The payment couldn't be started. Check your connection and try again, or contact us on WhatsApp." } },
    "secureCards": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "You'll be redirected to a secure payment page" } },
    "unavailableTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Currently unavailable" } },
    "unavailableText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "This product is out of stock. Contact us on WhatsApp to be notified when it's back." } },
    "from": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "From" } },
    "outOfStock": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Out of stock" } },
    "added": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Added" } },
    "add": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Add" } },
    "view": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "View product" } },
    "zoom": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Enlarge photo" } },
    "readLess": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Show less" } },
    "buyNow": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Buy now" } },
    "payWith": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pay with CIB, Edahabia, BaridiMob, CCP, Binance or RedotPay" } },
    "details": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Details" } }
  },
  "form": {
    "firstName": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "First name" } },
    "lastName": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Last name" } },
    "phone": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Phone" } },
    "email": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Email" } },
    "wilaya": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Wilaya" } },
    "commune": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Commune" } },
    "noteLabel": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Additional information about your order (optional)" } },
    "notePlaceholder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Notes about your order, if needed" } },
    "selectWilaya": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Please select your wilaya" } },
    "selectCommune": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Please select your commune" } },
    "errors": {
      "firstNameRequired": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "First name is required" } },
      "lastNameRequired": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Last name is required" } },
      "phoneInvalid": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Invalid phone number" } },
      "emailInvalid": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Invalid email address" } },
      "wilayaRequired": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Please select your wilaya" } },
      "communeRequired": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Please select your commune" } },
      "termsRequired": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "You must accept the terms" } }
    }
  },
  "checkout": {
    "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Checkout" } },
    "billing": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Billing & Shipping" } },
    "additionalInfo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Additional information" } },
    "yourOrder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Your order" } },
    "summary": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Order summary" } },
    "shippingMethod": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Shipping method" } },
    "paymentMethod": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Payment method" } },
    "privacy": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Your personal data will be used to process your order and improve your experience on our website, in accordance with our privacy policy." } },
    "terms": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "I have read and accept the terms and conditions." } },
    "order": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Place order" } },
    "shipHome": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Home delivery" } },
    "shipDesk": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pickup point" } },
    "shipStore": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Store pickup" } },
    "stepCart": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Cart" } },
    "stepConfirm": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Confirmation" } },
    "contact": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Your details" } },
    "delivery": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Delivery address" } },
    "phoneHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "We'll contact you on this number if needed." } },
    "wilayaFirst": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Choose the wilaya first" } },
    "shipHomeHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Delivered to your address" } },
    "shipDeskHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pickup at the carrier's office" } },
    "shipStoreHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Free pickup at our store (Algiers)" } },
    "free": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Free" } },
    "chooseCommune": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Choose your commune" } },
    "placeOrder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Pay · " }, { "t": 4, "k": "total" }] } },
    "submitError": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "The order couldn't be sent. Check your connection and try again, or contact us on WhatsApp." } },
    "emailHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Your codes will be sent to this address: double-check it." } },
    "stepPayment": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Payment" } },
    "payOnline": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Online payment" } },
    "payOnlineNotice": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "CIB or Edahabia card, on the secure payment page." } },
    "deliveryLabel": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Delivery" } },
    "deliveryEmail": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "By email" } },
    "backToCart": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Back to cart" } },
    "editCart": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Edit" } },
    "showSummary": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Show order" } },
    "hideSummary": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Hide order" } }
  },
  "shop": {
    "showing": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Showing " }, { "t": 4, "k": "start" }, { "t": 3, "v": "–" }, { "t": 4, "k": "end" }, { "t": 3, "v": " of " }, { "t": 4, "k": "total" }, { "t": 3, "v": " results" }] } },
    "results": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Results - " }, { "t": 4, "k": "query" }] } },
    "noProducts": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "No products found" } },
    "noProductsHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Try other keywords or browse our categories." } },
    "filter": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Filter" } },
    "categories": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Categories" } },
    "pagination": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Product pagination" } },
    "sort": {
      "label": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Sort by" } },
      "default": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Relevance" } },
      "popularity": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Popularity" } },
      "newest": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Newest" } },
      "priceAsc": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Price: low to high" } },
      "priceDesc": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Price: high to low" } },
      "nameAsc": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Name (A → Z)" } }
    },
    "filters": {
      "availability": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Availability" } },
      "inStock": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "In stock only" } },
      "onSale": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "On sale" } },
      "min": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Min" } },
      "max": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Max" } },
      "apply": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Apply price" } },
      "under": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Under " }, { "t": 4, "k": "amount" }] } },
      "over": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Over " }, { "t": 4, "k": "amount" }] } },
      "allCategories": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "All categories" } },
      "clearAll": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Clear all" } },
      "collection": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Menu selection" } },
      "remove": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Remove filter " }, { "t": 4, "k": "name" }] } },
      "showResults": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Show " }, { "t": 4, "k": "count" }, { "t": 3, "v": " products" }] } },
      "noResultsHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "No products match these filters. Try removing a few." } },
      "platform": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Platform (games)" } },
      "newArrivals": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "New arrivals (last " }, { "t": 4, "k": "days" }, { "t": 3, "v": " days)" }] } },
      "showMore": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Show " }, { "t": 4, "k": "count" }, { "t": 3, "v": " more" }] } },
      "showLess": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Show less" } }
    },
    "prevPage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Previous page" } },
    "nextPage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Next page" } },
    "goToPage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Go to page " }, { "t": 4, "k": "page" }] } },
    "pageOf": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Page " }, { "t": 4, "k": "page" }, { "t": 3, "v": " / " }, { "t": 4, "k": "total" }] } },
    "productsCount": { "t": 0, "b": { "t": 1, "c": [{ "t": 2, "i": [{ "t": 4, "k": "count" }, { "t": 3, "v": " products" }] }, { "t": 2, "i": [{ "t": 4, "k": "count" }, { "t": 3, "v": " product" }] }, { "t": 2, "i": [{ "t": 4, "k": "count" }, { "t": 3, "v": " products" }] }] } },
    "allIn": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "See all" } }
  },
  "success": {
    "heading": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Play With GamesZone!" } },
    "thanks": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Thank you for your order!" } },
    "received": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "We've received your request." } },
    "unreachable": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "If we can't reach you, the order may be cancelled." } },
    "contactSoon": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Our team will contact you soon to confirm your order." } },
    "prepared": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Your order will be prepared and shipped quickly." } },
    "codInfo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Payment is made on delivery (Cash on Delivery)" } },
    "help": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Our team is here to help 😊" } },
    "whatsapp": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Chat on WhatsApp" } },
    "phoneSupport": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Phone support" } },
    "copyOrder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Copy order number" } },
    "copied": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Number copied" } },
    "stayReachableTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Keep an eye on your inbox" } },
    "nextTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "What's next?" } },
    "step1Title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Confirmation call" } },
    "step2Title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Preparation & shipping" } },
    "step3Title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Delivery and payment" } },
    "toPayOnDelivery": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "To pay on delivery" } },
    "helpText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "A question about your order? Reply to us with your order number." } },
    "whatsappMessage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Hello, I'm contacting you about my order no. " }, { "t": 4, "k": "id" }, { "t": 3, "v": "." }] } }
  },
  "payment": {
    "confirmed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Payment confirmed" } },
    "successText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Your payment was successful." } },
    "orderNo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Order No." } },
    "thanks": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "🎮 Thank you for your order!" } },
    "preparing": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Your payment has been confirmed. Your code is being sent to you by email." } },
    "whatsappIntro": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Our team will contact you directly on WhatsApp to:" } },
    "step1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "✔️ Complete the product delivery" } },
    "step2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "✔️ Help you with activation" } },
    "step3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "✔️ Explain how to use it" } },
    "step4": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "✔️ Follow up if needed" } },
    "stayReachable": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "⏳ Please stay reachable for fast processing." } },
    "support": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Customer Support" } },
    "whatsapp": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "WhatsApp" } },
    "needHelp": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Need help? Our support team is available on WhatsApp." } },
    "failed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Payment failed" } },
    "notConfirmed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "The payment was not confirmed" } },
    "notFinalized": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Your transaction couldn't be completed or was cancelled." } },
    "check1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "• Check your CIB / EDAHABIA card" } },
    "check2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "• Check your balance" } },
    "check3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "• Try again in a few minutes" } },
    "thanksTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Thank you for your order!" } },
    "invoiceNo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Invoice" } },
    "reasonLabel": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Reason:" } },
    "stayReachableText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Your code is sent to the email address you provided. Remember to check your spam folder." } },
    "whatsappIntroShort": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Your code and activation instructions are sent by email." } },
    "tl1Title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Payment confirmed" } },
    "tl1Text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Your card payment has been received." } },
    "tl2Title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Code sent by email" } },
    "tl3Title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Activation" } },
    "tl3Text": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Redeem your code on PSN, Steam or the relevant platform." } },
    "recapTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Your purchase" } },
    "paid": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Amount paid" } },
    "checksTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "What to check?" } },
    "checkCard": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Your CIB / Edahabia card is active and online payments are enabled" } },
    "checkBalance": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Your balance is sufficient" } },
    "checkRetry": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Try again in a few minutes" } },
    "retryTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Retry payment" } },
    "retry": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Retry payment" } },
    "helpFailed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Still having trouble? Message us with your order number and we'll help you." } },
    "whatsappSuccess": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Hello, my payment is confirmed for order no. " }, { "t": 4, "k": "id" }, { "t": 3, "v": "." }] } },
    "whatsappFailed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Hello, my payment didn't go through for order no. " }, { "t": 4, "k": "id" }, { "t": 3, "v": ". Can you help me?" }] } },
    "cartItems": { "t": 0, "b": { "t": 2, "i": [{ "t": 4, "k": "count" }, { "t": 3, "v": " items" }] } },
    "chooseMethod": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Payment method" } },
    "instantConfirm": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "instant confirmation" } },
    "manualHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Transfer + receipt, verified by our team" } },
    "sendExactly": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Send exactly" } },
    "toAccount": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "via " }, { "t": 4, "k": "method" }, { "t": 3, "v": " to the account below, then attach your receipt." }] } },
    "copy": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Copy " }, { "t": 4, "k": "label" }] } },
    "fieldRip": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "RIP" } },
    "fieldAccount": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Account number" } },
    "fieldKey": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Key" } },
    "fieldHolder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Full name" } },
    "fieldAddress": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Address" } },
    "fieldBinanceId": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Binance ID" } },
    "fieldRedotpayId": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "RedotPay ID" } },
    "fieldIban": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "IBAN" } },
    "rateInfo": { "t": 0, "b": { "t": 2, "i": [{ "t": 4, "k": "total" }, { "t": 3, "v": " converted at today's rate: " }, { "t": 4, "k": "rate" }, { "t": 3, "v": "." }] } },
    "proofLabel": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Payment receipt (screenshot or PDF)" } },
    "proofChoose": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Choose a file" } },
    "proofDrop": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "or drop it here" } },
    "proofFormats": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "JPG, PNG, WEBP or PDF · 5 MB max" } },
    "proofRemove": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Remove file" } },
    "proofType": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Unsupported format: upload an image (JPG, PNG, WEBP) or a PDF." } },
    "proofSize": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "File too large (5 MB maximum)." } },
    "proofRequired": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Add your payment receipt to continue." } },
    "manualNote": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Your order will be confirmed once our team has verified the receipt. Your code is then sent to you by email." } },
    "manualFailed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "The order couldn't be sent. Check your connection and try again, or contact us on WhatsApp." } },
    "sendOrder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Send order · " }, { "t": 4, "k": "total" }] } },
    "pendingEyebrow": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Payment under review" } },
    "pendingTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Order received, thank you!" } },
    "pendingText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "We're verifying your " }, { "t": 4, "k": "method" }, { "t": 3, "v": " payment. As soon as it's approved, your code is sent to your email address." }] } },
    "pendingStep1": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Order and receipt sent" } },
    "pendingStep2": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Payment verified by our team" } },
    "pendingStep3": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Code sent by email" } },
    "onlineTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "CIB / Edahabia card" } },
    "recommended": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Recommended" } },
    "orTransfer": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Or by transfer, with receipt" } },
    "stepSend": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Send the amount" } },
    "stepUpload": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Attach your receipt" } }
  },
  "error": {
    "notFound": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Page not found" } },
    "generic": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Something went wrong" } },
    "notFoundText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "The page you're looking for doesn't exist or has been moved." } },
    "retryLater": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Please try again later." } },
    "popular": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Most visited" } },
    "retry": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Try again" } },
    "goBack": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Previous page" } },
    "helpText": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Still stuck?" } },
    "code": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Error code:" } },
    "whatsappMessage": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Hello, I'm getting a " }, { "t": 4, "k": "code" }, { "t": 3, "v": " error on the website: " }, { "t": 4, "k": "url" }] } }
  },
  "breadcrumb": {
    "label": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Breadcrumb" } }
  },
  "loader": {
    "ready": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Ready to play" } }
  },
  "reviews": {
    "title": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "What our customers say" } },
    "subtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Verified Google reviews" } }
  },
  "account": {
    "menu": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Account menu" } },
    "myAccount": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "My account" } },
    "overview": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Overview" } },
    "orders": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "My orders" } },
    "settings": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Settings" } },
    "logout": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Log out" } },
    "login": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Log in" } },
    "createAccount": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Create an account" } },
    "loginTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Log in" } },
    "loginSubtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Find your orders and your codes." } },
    "registerTitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Create an account" } },
    "registerSubtitle": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Track your orders and pay faster." } },
    "checkoutNotice": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Log in or create an account to complete your order. Your cart is saved." } },
    "password": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Password" } },
    "forgot": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Forgot password?" } },
    "showPassword": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Show password" } },
    "hidePassword": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Hide password" } },
    "noAccount": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Don't have an account yet?" } },
    "haveAccount": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Already have an account?" } },
    "passwordHint": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "At least 8 characters." } },
    "hello": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Hello " }, { "t": 4, "k": "name" }] } },
    "ordersCount": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Orders" } },
    "awaitingPayment": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Awaiting payment" } },
    "codesSentTo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Your codes are sent to" } },
    "recentOrders": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Recent orders" } },
    "noOrders": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "You don't have any orders yet." } },
    "orderNo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Order no. " }, { "t": 4, "k": "number" }] } },
    "itemsCount": { "t": 0, "b": { "t": 1, "c": [{ "t": 2, "i": [{ "t": 4, "k": "count" }, { "t": 3, "v": " item" }] }, { "t": 2, "i": [{ "t": 4, "k": "count" }, { "t": 3, "v": " items" }] }] } },
    "payNow": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Pay" } },
    "details": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Details" } },
    "pagination": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Order pages" } },
    "backToOrders": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "All my orders" } },
    "orderNotFound": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "This order couldn't be found." } },
    "placedOn": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Placed on " }, { "t": 4, "k": "date" }] } },
    "paidOn": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Paid on " }, { "t": 4, "k": "date" }] } },
    "items": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Items" } },
    "discount": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Discount" } },
    "deliveryInfo": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Delivery and payment" } },
    "messages": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Messages from the store" } },
    "yourNote": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Your note" } },
    "helpWithOrder": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Help with this order" } },
    "profile": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "My details" } },
    "emailLocked": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Your email is used to log in and to receive your codes. Contact us to change it." } },
    "save": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Save" } },
    "saved": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Saved" } },
    "changePassword": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Password" } },
    "currentPassword": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Current password" } },
    "newPassword": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "New password" } },
    "updatePassword": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Change password" } },
    "passwordUpdated": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Password changed" } },
    "status": {
      "pending": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Awaiting payment" } },
      "failed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Payment failed" } },
      "processing": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Processing" } },
      "on-hold": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Payment under review" } },
      "completed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Delivered" } },
      "cancelled": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Cancelled" } },
      "refunded": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Refunded" } }
    },
    "statusText": {
      "pending": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "The payment for this order hasn't been completed yet." } },
      "failed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "The payment didn't go through. You can try again." } },
      "processing": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Payment received: your code is being sent by email." } },
      "on-hold": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Your order is being reviewed." } },
      "completed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Your code has been sent by email." } },
      "cancelled": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "This order has been cancelled." } },
      "refunded": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "This order has been refunded." } }
    },
    "errors": {
      "passwordRequired": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Please enter your password" } },
      "badCredentials": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Incorrect email or password." } },
      "tooMany": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Too many attempts. Try again in a few minutes." } },
      "unavailable": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Login is temporarily unavailable. Try again later." } },
      "passwordShort": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "The password must be at least 8 characters long" } },
      "emailTaken": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "An account already exists with this email." } },
      "registerFailed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "The account couldn't be created. Try again later." } },
      "loadFailed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Couldn't load your orders." } },
      "wrongPassword": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Incorrect current password" } },
      "saveFailed": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Saving failed. Try again." } },
      "google": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Google sign-in didn't work. Try again or use your email and password." } }
    },
    "googleContinue": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "Continue with Google" } },
    "or": { "t": 0, "b": { "t": 2, "i": [{ "t": 3 }], "s": "or" } }
  },
  "categoryPage": {
    "others": { "t": 0, "b": { "t": 2, "i": [{ "t": 3, "v": "Other " }, { "t": 4, "k": "name" }, { "t": 3, "v": " products" }] } }
  }
};
const localeCodes = [
  "fr",
  "ar",
  "en"
];
const localeLoaders = {
  fr: [
    {
      key: "locale_fr_46json_37103486",
      load: () => Promise.resolve(resource$2),
      cache: true
    }
  ],
  ar: [
    {
      key: "locale_ar_46json_32e20e2b",
      load: () => Promise.resolve(resource$1),
      cache: true
    }
  ],
  en: [
    {
      key: "locale_en_46json_ead4ddc9",
      load: () => Promise.resolve(resource),
      cache: true
    }
  ]
};
const vueI18nConfigs = [];
const normalizedLocales = [
  {
    code: "fr",
    language: "fr-DZ",
    name: "Français",
    dir: "ltr",
    files: [
      {
        path: "/Users/test/Projects/gameszone/i18n/locales/fr.json",
        cache: void 0
      }
    ]
  },
  {
    code: "ar",
    language: "ar-DZ",
    name: "العربية",
    dir: "rtl",
    files: [
      {
        path: "/Users/test/Projects/gameszone/i18n/locales/ar.json",
        cache: void 0
      }
    ]
  },
  {
    code: "en",
    language: "en",
    name: "English",
    dir: "ltr",
    files: [
      {
        path: "/Users/test/Projects/gameszone/i18n/locales/en.json",
        cache: void 0
      }
    ]
  }
];
const NUXT_I18N_MODULE_ID = "@nuxtjs/i18n";
const parallelPlugin = false;
const DEFAULT_COOKIE_KEY = "i18n_redirected";
const DEFAULT_DYNAMIC_PARAMS_KEY = "nuxtI18nInternal";
const SWITCH_LOCALE_PATH_LINK_IDENTIFIER = "nuxt-i18n-slp";
defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});
const clientOnlySymbol = /* @__PURE__ */ Symbol.for("nuxt:client-only");
defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  ...false,
  setup(props, { slots, attrs }) {
    const mounted = shallowRef(false);
    const vm = getCurrentInstance();
    if (vm) {
      vm._nuxtClientOnly = true;
    }
    provide(clientOnlySymbol, true);
    return () => {
      if (mounted.value) {
        const vnodes = slots.default?.();
        if (vnodes && vnodes.length === 1) {
          return [cloneVNode(vnodes[0], attrs)];
        }
        return vnodes;
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return h(slot);
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const isDefer = (dedupe) => dedupe === "defer" || dedupe === false;
function useAsyncData(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (_isAutoKeyNeeded(args[0], args[1])) {
    args.unshift(autoKey);
  }
  let [_key, _handler, options = {}] = args;
  const key = computed(() => toValue(_key));
  if (typeof key.value !== "string") {
    throw new TypeError("[nuxt] [useAsyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [useAsyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  options.server ??= true;
  options.default ??= getDefault;
  options.getCachedData ??= getDefaultCachedData;
  options.lazy ??= false;
  options.immediate ??= true;
  options.deep ??= asyncDataDefaults.deep;
  options.dedupe ??= "cancel";
  options._functionName || "useAsyncData";
  nuxtApp._asyncData[key.value];
  function createInitialFetch() {
    const initialFetchOptions = { cause: "initial", dedupe: options.dedupe };
    if (!nuxtApp._asyncData[key.value]?._init) {
      initialFetchOptions.cachedData = options.getCachedData(key.value, nuxtApp, { cause: "initial" });
      nuxtApp._asyncData[key.value] = createAsyncData(nuxtApp, key.value, _handler, options, initialFetchOptions.cachedData);
    }
    return () => nuxtApp._asyncData[key.value].execute(initialFetchOptions);
  }
  const initialFetch = createInitialFetch();
  const asyncData = nuxtApp._asyncData[key.value];
  asyncData._deps++;
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncReturn = {
    data: writableComputedRef(() => nuxtApp._asyncData[key.value]?.data),
    pending: writableComputedRef(() => nuxtApp._asyncData[key.value]?.pending),
    status: writableComputedRef(() => nuxtApp._asyncData[key.value]?.status),
    error: writableComputedRef(() => nuxtApp._asyncData[key.value]?.error),
    refresh: (...args2) => {
      if (!nuxtApp._asyncData[key.value]?._init) {
        const initialFetch2 = createInitialFetch();
        return initialFetch2();
      }
      return nuxtApp._asyncData[key.value].execute(...args2);
    },
    execute: (...args2) => asyncReturn.refresh(...args2),
    clear: () => {
      const entry2 = nuxtApp._asyncData[key.value];
      if (entry2?._abortController) {
        try {
          entry2._abortController.abort(new DOMException("AsyncData aborted by user.", "AbortError"));
        } finally {
          entry2._abortController = void 0;
        }
      }
      clearNuxtDataByKey(nuxtApp, key.value);
    }
  };
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key.value]).then(() => asyncReturn);
  Object.assign(asyncDataPromise, asyncReturn);
  return asyncDataPromise;
}
function writableComputedRef(getter) {
  return computed({
    get() {
      return getter()?.value;
    },
    set(value) {
      const ref2 = getter();
      if (ref2) {
        ref2.value = value;
      }
    }
  });
}
function useLazyAsyncData(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (_isAutoKeyNeeded(args[0], args[1])) {
    args.unshift(autoKey);
  }
  const [key, handler, options = {}] = args;
  return useAsyncData(key, handler, { ...options, lazy: true }, null);
}
function _isAutoKeyNeeded(keyOrFetcher, fetcher) {
  if (typeof keyOrFetcher === "string") {
    return false;
  }
  if (typeof keyOrFetcher === "object" && keyOrFetcher !== null) {
    return false;
  }
  if (typeof keyOrFetcher === "function" && typeof fetcher === "function") {
    return false;
  }
  return true;
}
function useNuxtData(key) {
  const nuxtApp = useNuxtApp();
  if (!(key in nuxtApp.payload.data)) {
    nuxtApp.payload.data[key] = asyncDataDefaults.value;
  }
  if (nuxtApp._asyncData[key]) {
    const data = nuxtApp._asyncData[key];
    data._deps++;
    if (getCurrentScope()) {
      onScopeDispose(() => {
        data._deps--;
        if (data._deps === 0) {
          data?._off();
        }
      });
    }
  }
  return {
    data: computed({
      get() {
        return nuxtApp._asyncData[key]?.data.value ?? nuxtApp.payload.data[key];
      },
      set(value) {
        if (nuxtApp._asyncData[key]) {
          nuxtApp._asyncData[key].data.value = value;
        } else {
          nuxtApp.payload.data[key] = value;
        }
      }
    })
  };
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = asyncDataDefaults.errorValue;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = void 0;
    nuxtApp._asyncData[key].error.value = asyncDataDefaults.errorValue;
    {
      nuxtApp._asyncData[key].pending.value = false;
    }
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function createAsyncData(nuxtApp, key, _handler, options, initialCachedData) {
  nuxtApp.payload._errors[key] ??= asyncDataDefaults.errorValue;
  const hasCustomGetCachedData = options.getCachedData !== getDefaultCachedData;
  const handler = _handler ;
  const _ref = options.deep ? ref : shallowRef;
  const hasCachedData = initialCachedData != null;
  const unsubRefreshAsyncData = nuxtApp.hook("app:data:refresh", async (keys) => {
    if (!keys || keys.includes(key)) {
      await asyncData.execute({ cause: "refresh:hook" });
    }
  });
  const asyncData = {
    data: _ref(hasCachedData ? initialCachedData : options.default()),
    pending: shallowRef(!hasCachedData),
    error: toRef(nuxtApp.payload._errors, key),
    status: shallowRef("idle"),
    execute: (...args) => {
      const [_opts, newValue = void 0] = args;
      const opts = _opts && newValue === void 0 && typeof _opts === "object" ? _opts : {};
      if (nuxtApp._asyncDataPromises[key]) {
        if (isDefer(opts.dedupe ?? options.dedupe)) {
          return nuxtApp._asyncDataPromises[key];
        }
      }
      if (opts.cause === "initial" || nuxtApp.isHydrating) {
        const cachedData = "cachedData" in opts ? opts.cachedData : options.getCachedData(key, nuxtApp, { cause: opts.cause ?? "refresh:manual" });
        if (cachedData != null) {
          nuxtApp.payload.data[key] = asyncData.data.value = cachedData;
          asyncData.error.value = asyncDataDefaults.errorValue;
          asyncData.status.value = "success";
          return Promise.resolve(cachedData);
        }
      }
      {
        asyncData.pending.value = true;
      }
      if (asyncData._abortController) {
        asyncData._abortController.abort(new DOMException("AsyncData request cancelled by deduplication", "AbortError"));
      }
      asyncData._abortController = new AbortController();
      asyncData.status.value = "pending";
      const cleanupController = new AbortController();
      const promise = new Promise(
        (resolve2, reject) => {
          try {
            const timeout = opts.timeout ?? options.timeout;
            const mergedSignal = mergeAbortSignals([asyncData._abortController?.signal, opts?.signal], cleanupController.signal, timeout);
            if (mergedSignal.aborted) {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
              return;
            }
            mergedSignal.addEventListener("abort", () => {
              const reason = mergedSignal.reason;
              reject(reason instanceof Error ? reason : new DOMException(String(reason ?? "Aborted"), "AbortError"));
            }, { once: true, signal: cleanupController.signal });
            return Promise.resolve(handler(nuxtApp, { signal: mergedSignal })).then(resolve2, reject);
          } catch (err) {
            reject(err);
          }
        }
      ).then(async (_result) => {
        let result = _result;
        if (options.transform) {
          result = await options.transform(_result);
        }
        if (options.pick) {
          result = pick(result, options.pick);
        }
        nuxtApp.payload.data[key] = result;
        asyncData.data.value = result;
        asyncData.error.value = asyncDataDefaults.errorValue;
        asyncData.status.value = "success";
      }).catch((error) => {
        if (nuxtApp._asyncDataPromises[key] && nuxtApp._asyncDataPromises[key] !== promise) {
          return nuxtApp._asyncDataPromises[key];
        }
        if (asyncData._abortController?.signal.aborted) {
          return nuxtApp._asyncDataPromises[key];
        }
        if (typeof DOMException !== "undefined" && error instanceof DOMException && error.name === "AbortError") {
          asyncData.status.value = "idle";
          return nuxtApp._asyncDataPromises[key];
        }
        asyncData.error.value = createError(error);
        asyncData.data.value = unref(options.default());
        asyncData.status.value = "error";
      }).finally(() => {
        {
          asyncData.pending.value = false;
        }
        cleanupController.abort();
        delete nuxtApp._asyncDataPromises[key];
      });
      nuxtApp._asyncDataPromises[key] = promise;
      return nuxtApp._asyncDataPromises[key];
    },
    _execute: debounce((...args) => asyncData.execute(...args), 0, { leading: true }),
    _default: options.default,
    _deps: 0,
    _init: true,
    _hash: void 0,
    _off: () => {
      unsubRefreshAsyncData();
      if (nuxtApp._asyncData[key]?._init) {
        nuxtApp._asyncData[key]._init = false;
      }
      if (!hasCustomGetCachedData) {
        nextTick(() => {
          if (!nuxtApp._asyncData[key]?._init) {
            clearNuxtDataByKey(nuxtApp, key);
            asyncData.execute = () => Promise.resolve();
            asyncData.data.value = asyncDataDefaults.value;
          }
        });
      }
    }
  };
  return asyncData;
}
const getDefault = () => asyncDataDefaults.value;
const getDefaultCachedData = (key, nuxtApp, ctx) => {
  if (nuxtApp.isHydrating) {
    return nuxtApp.payload.data[key];
  }
  if (ctx.cause !== "refresh:manual" && ctx.cause !== "refresh:hook") {
    return nuxtApp.static.data[key];
  }
};
function mergeAbortSignals(signals, cleanupSignal, timeout) {
  const list = signals.filter((s) => !!s);
  if (typeof timeout === "number" && timeout >= 0) {
    const timeoutSignal = AbortSignal.timeout?.(timeout);
    if (timeoutSignal) {
      list.push(timeoutSignal);
    }
  }
  if (AbortSignal.any) {
    return AbortSignal.any(list);
  }
  const controller = new AbortController();
  for (const sig of list) {
    if (sig.aborted) {
      const reason = sig.reason ?? new DOMException("Aborted", "AbortError");
      try {
        controller.abort(reason);
      } catch {
        controller.abort();
      }
      return controller.signal;
    }
  }
  const onAbort = () => {
    const abortedSignal = list.find((s) => s.aborted);
    const reason = abortedSignal?.reason ?? new DOMException("Aborted", "AbortError");
    try {
      controller.abort(reason);
    } catch {
      controller.abort();
    }
  };
  for (const sig of list) {
    sig.addEventListener?.("abort", onAbort, { once: true, signal: cleanupSignal });
  }
  return controller.signal;
}
const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
function useRequestEvent(nuxtApp) {
  nuxtApp ||= useNuxtApp();
  return nuxtApp.ssrContext?.event;
}
function useRequestHeaders(include) {
  const event = useRequestEvent();
  const _headers = event ? getRequestHeaders(event) : {};
  if (!include || !event) {
    return _headers;
  }
  const headers = /* @__PURE__ */ Object.create(null);
  for (const _key of include) {
    const key = _key.toLowerCase();
    const header = _headers[key];
    if (header) {
      headers[key] = header;
    }
  }
  return headers;
}
function useRequestHeader(header) {
  const event = useRequestEvent();
  return event ? getRequestHeader(event, header) : void 0;
}
function useRequestFetch() {
  return useRequestEvent()?.$fetch || globalThis.$fetch;
}
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _request = computed(() => toValue(request));
  const key = computed(() => toValue(opts.key) || "$f" + hash([autoKey, typeof _request.value === "string" ? _request.value : "", ...generateOptionSegments(opts)]));
  if (!opts.baseURL && typeof _request.value === "string" && (_request.value[0] === "/" && _request.value[1] === "/")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform: transform2,
    pick: pick2,
    watch: watchSources,
    immediate,
    getCachedData,
    deep,
    dedupe,
    timeout,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchDefaults,
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform: transform2,
    pick: pick2,
    immediate,
    getCachedData,
    deep,
    dedupe,
    timeout,
    watch: watchSources === false ? [] : [...watchSources || [], _fetchOptions]
  };
  if (!immediate) {
    let setImmediate = function() {
      _asyncDataOptions.immediate = true;
    };
    watch(key, setImmediate, { flush: "sync", once: true });
    watch([...watchSources || [], _fetchOptions], setImmediate, { flush: "sync", once: true });
  }
  const asyncData = useAsyncData(watchSources === false ? key.value : key, (_, { signal }) => {
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch) {
      const isLocalFetch = typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(opts.baseURL) || toValue(opts.baseURL)[0] === "/");
      if (isLocalFetch) {
        _$fetch = useRequestFetch();
      }
    }
    return _$fetch(_request.value, { signal, ..._fetchOptions });
  }, _asyncDataOptions);
  return asyncData;
}
function useLazyFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  return useFetch(
    request,
    {
      ...opts,
      lazy: true
    },
    // @ts-expect-error we pass an extra argument with the resolved auto-key to prevent another from being injected
    autoKey
  );
}
function generateOptionSegments(opts) {
  const segments = [
    toValue(opts.method)?.toUpperCase() || "GET",
    toValue(opts.baseURL)
  ];
  for (const _obj of [opts.query || opts.params]) {
    const obj = toValue(_obj);
    if (!obj) {
      continue;
    }
    const unwrapped = {};
    for (const [key, value] of Object.entries(obj)) {
      unwrapped[toValue(key)] = toValue(value);
    }
    segments.push(unwrapped);
  }
  if (opts.body) {
    const value = toValue(opts.body);
    if (!value) {
      segments.push(hash(value));
    } else if (value instanceof ArrayBuffer) {
      segments.push(hash(Object.fromEntries([...new Uint8Array(value).entries()].map(([k, v]) => [k, v.toString()]))));
    } else if (value instanceof FormData) {
      const obj = {};
      for (const entry2 of value.entries()) {
        const [key, val] = entry2;
        obj[key] = val instanceof File ? val.name : val;
      }
      segments.push(hash(obj));
    } else if (isPlainObject$1(value)) {
      segments.push(hash(reactive(value)));
    } else {
      try {
        segments.push(hash(value));
      } catch {
        console.warn("[useFetch] Failed to hash body", value);
      }
    }
  }
  return segments;
}
const CookieDefaults = {
  path: "/",
  watch: true,
  decode: (val) => {
    const decoded = decodeURIComponent(val);
    const parsed = destr(decoded);
    if (typeof parsed === "number" && (!Number.isFinite(parsed) || String(parsed) !== decoded)) {
      return decoded;
    }
    return parsed;
  },
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  const opts = { ...CookieDefaults, ..._opts };
  opts.filter ??= (key) => key === name;
  const cookies = readRawCookies(opts) || {};
  let delay;
  if (opts.maxAge !== void 0) {
    delay = opts.maxAge * 1e3;
  } else if (opts.expires) {
    delay = opts.expires.getTime() - Date.now();
  }
  const hasExpired = delay !== void 0 && delay <= 0;
  const cookieValue = klona(hasExpired ? void 0 : cookies[name] ?? opts.default?.());
  const cookie = ref(cookieValue);
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (opts.readonly || isEqual$1(cookie.value, cookies[name])) {
        return;
      }
      nuxtApp._cookies ||= {};
      if (name in nuxtApp._cookies) {
        if (isEqual$1(cookie.value, nuxtApp._cookies[name])) {
          return;
        }
      }
      nuxtApp._cookies[name] = cookie.value;
      writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:error", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  {
    return parse$1(getRequestHeader(useRequestEvent(), "cookie") || "", opts);
  }
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    if (value !== null && value !== void 0) {
      return setCookie(event, name, value, opts);
    }
    if (getCookie(event, name) !== void 0) {
      return deleteCookie(event, name, opts);
    }
  }
}
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
// @__NO_SIDE_EFFECTS__
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  function isHashLinkWithoutHashMode(link) {
    return typeof link === "string" && link.startsWith("#");
  }
  function resolveTrailingSlashBehavior(to, resolve2, trailingSlash) {
    const effectiveTrailingSlash = trailingSlash ?? options.trailingSlash;
    if (!to || effectiveTrailingSlash !== "append" && effectiveTrailingSlash !== "remove") {
      return to;
    }
    if (typeof to === "string") {
      return applyTrailingSlashBehavior(to, effectiveTrailingSlash);
    }
    const path = "path" in to && to.path !== void 0 ? to.path : resolve2(to).path;
    const resolvedPath = {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: applyTrailingSlashBehavior(path, effectiveTrailingSlash)
    };
    return resolvedPath;
  }
  function useNuxtLink(props) {
    const router = useRouter();
    const config = /* @__PURE__ */ useRuntimeConfig();
    const hasTarget = computed(() => !!props.target && props.target !== "_self");
    const isAbsoluteUrl = computed(() => {
      const path = props.to || props.href || "";
      return typeof path === "string" && hasProtocol(path, { acceptRelative: true });
    });
    const builtinRouterLink = resolveComponent("RouterLink");
    const useBuiltinLink = builtinRouterLink && typeof builtinRouterLink !== "string" ? builtinRouterLink.useLink : void 0;
    const isExternal = computed(() => {
      if (props.external) {
        return true;
      }
      const path = props.to || props.href || "";
      if (typeof path === "object") {
        return false;
      }
      return path === "" || isAbsoluteUrl.value;
    });
    const to = computed(() => {
      const path = props.to || props.href || "";
      if (isExternal.value) {
        return path;
      }
      return resolveTrailingSlashBehavior(path, router.resolve, props.trailingSlash);
    });
    const link = isExternal.value ? void 0 : useBuiltinLink?.({ ...props, to });
    const href = computed(() => {
      const effectiveTrailingSlash = props.trailingSlash ?? options.trailingSlash;
      if (!to.value || isAbsoluteUrl.value || isHashLinkWithoutHashMode(to.value)) {
        return to.value;
      }
      if (isExternal.value) {
        const path = typeof to.value === "object" && "path" in to.value ? resolveRouteObject$1(to.value) : to.value;
        const href2 = typeof path === "object" ? router.resolve(path).href : path;
        return applyTrailingSlashBehavior(href2, effectiveTrailingSlash);
      }
      if (typeof to.value === "object") {
        return router.resolve(to.value)?.href ?? null;
      }
      return applyTrailingSlashBehavior(joinURL(config.app.baseURL, to.value), effectiveTrailingSlash);
    });
    return {
      to,
      hasTarget,
      isAbsoluteUrl,
      isExternal,
      //
      href,
      isActive: link?.isActive ?? computed(() => to.value === router.currentRoute.value.path),
      isExactActive: link?.isExactActive ?? computed(() => to.value === router.currentRoute.value.path),
      route: link?.route ?? computed(() => router.resolve(to.value)),
      async navigate(_e) {
        await navigateTo(href.value, { replace: props.replace, external: isExternal.value || hasTarget.value });
      }
    };
  }
  return defineComponent({
    name: componentName,
    props: {
      // Routing
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      // Attributes
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Prefetching
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      prefetchOn: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Styling
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      // Vue Router's `<RouterLink>` additional props
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      // Edge cases handling
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Slot API
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Behavior
      trailingSlash: {
        type: String,
        default: void 0,
        required: false
      }
    },
    useLink: useNuxtLink,
    setup(props, { slots }) {
      const router = useRouter();
      const { to, href, navigate: navigate2, isExternal, hasTarget, isAbsoluteUrl } = useNuxtLink(props);
      shallowRef(false);
      const el = void 0;
      const elRef = void 0;
      async function prefetch(nuxtApp = useNuxtApp()) {
        {
          return;
        }
      }
      return () => {
        if (!isExternal.value && !hasTarget.value && !isHashLinkWithoutHashMode(to.value)) {
          const routerLinkProps = {
            ref: elRef,
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          };
          if (!props.custom) {
            routerLinkProps.rel = props.rel || void 0;
          }
          return h(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const target = props.target || null;
        const rel = firstNonUndefined(
          // converts `""` to `null` to prevent the attribute from being added as empty (`rel=""`)
          props.noRel ? "" : props.rel,
          options.externalRelAttribute,
          /*
          * A fallback rel of `noopener noreferrer` is applied for external links or links that open in a new tab.
          * This solves a reverse tabnapping security flaw in browsers pre-2021 as well as improving privacy.
          */
          isAbsoluteUrl.value || hasTarget.value ? "noopener noreferrer" : ""
        ) || null;
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href: href.value,
            navigate: navigate2,
            prefetch,
            get route() {
              if (!href.value) {
                return void 0;
              }
              const url = new URL(href.value, "http://localhost");
              return {
                path: url.pathname,
                fullPath: url.pathname,
                get query() {
                  return parseQuery(url.search);
                },
                hash: url.hash,
                params: {},
                name: void 0,
                matched: [],
                redirectedFrom: void 0,
                meta: {},
                href: href.value
              };
            },
            rel,
            target,
            isExternal: isExternal.value || hasTarget.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", {
          ref: el,
          href: href.value || null,
          // converts `""` to `null` to prevent the attribute from being added as empty (`href=""`)
          rel,
          target,
          onClick: async (event) => {
            if (isExternal.value || hasTarget.value) {
              return;
            }
            event.preventDefault();
            try {
              const encodedHref = encodeRoutePath(href.value);
              return await (props.replace ? router.replace(encodedHref) : router.push(encodedHref));
            } finally {
            }
          }
        }, slots.default?.());
      };
    }
  });
}
const __nuxt_component_2$1 = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function applyTrailingSlashBehavior(to, trailingSlash) {
  const normalizeFn = trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
  const hasProtocolDifferentFromHttp = hasProtocol(to) && !to.startsWith("http");
  if (hasProtocolDifferentFromHttp) {
    return to;
  }
  return normalizeFn(to, true);
}
function getRouteName(routeName) {
  if (isString(routeName)) return routeName;
  if (routeName != null) return routeName.toString();
  return "(null)";
}
function getLocaleRouteName(routeName, locale, opts) {
  const { defaultLocale, strategy, routesNameSeparator, defaultLocaleRouteNameSuffix, differentDomains } = opts;
  const localizedRoutes = strategy !== "no_prefix" || differentDomains;
  const name = getRouteName(routeName) + (localizedRoutes ? routesNameSeparator + locale : "");
  if (locale === defaultLocale && strategy === "prefix_and_default") {
    return name + routesNameSeparator + defaultLocaleRouteNameSuffix;
  }
  return name;
}
function matchBrowserLocale(locales, browserLocales) {
  const matchedLocales = [];
  for (const [index, browserCode] of browserLocales.entries()) {
    const matchedLocale = locales.find((l) => l.language?.toLowerCase() === browserCode.toLowerCase());
    if (matchedLocale) {
      matchedLocales.push({ code: matchedLocale.code, score: 1 - index / browserLocales.length });
      break;
    }
  }
  for (const [index, browserCode] of browserLocales.entries()) {
    const languageCode = browserCode.split("-")[0].toLowerCase();
    const matchedLocale = locales.find((l) => l.language?.split("-")[0].toLowerCase() === languageCode);
    if (matchedLocale) {
      matchedLocales.push({ code: matchedLocale.code, score: 0.999 - index / browserLocales.length });
      break;
    }
  }
  return matchedLocales;
}
function compareBrowserLocale(a, b) {
  if (a.score === b.score) {
    return b.code.length - a.code.length;
  }
  return b.score - a.score;
}
function findBrowserLocale(locales, browserLocales) {
  const normalizedLocales2 = locales.map((l) => ({ code: l.code, language: l.language || l.code }));
  const matchedLocales = matchBrowserLocale(normalizedLocales2, browserLocales);
  if (matchedLocales.length === 0) {
    return "";
  }
  if (matchedLocales.length > 1) {
    matchedLocales.sort(compareBrowserLocale);
  }
  return matchedLocales[0].code;
}
function getLocalesRegex(localeCodes2) {
  return new RegExp(`^/(${localeCodes2.join("|")})(?:/|$)`, "i");
}
const localesPattern = `(${localeCodes.join("|")})`;
const regexpPath = getLocalesRegex(localeCodes);
function createLocaleFromRouteGetter() {
  const { routesNameSeparator, defaultLocaleRouteNameSuffix } = (/* @__PURE__ */ useRuntimeConfig()).public.i18n;
  const defaultSuffixPattern = `(?:${routesNameSeparator}${defaultLocaleRouteNameSuffix})?`;
  const regexpName = new RegExp(`${routesNameSeparator}${localesPattern}${defaultSuffixPattern}$`, "i");
  return (route) => {
    if (isString(route)) {
      return route.match(regexpPath)?.[1] ?? "";
    }
    if (route.name) {
      return getRouteName(route.name).match(regexpName)?.[1] ?? "";
    }
    if (route.path) {
      return route.path.match(regexpPath)?.[1] ?? "";
    }
    return "";
  };
}
function isI18nInstance(i18n) {
  return i18n != null && "global" in i18n && "mode" in i18n;
}
function isComposer(target) {
  return target != null && !("__composer" in target) && "locale" in target && isRef(target.locale);
}
function isVueI18n(target) {
  return target != null && "__composer" in target;
}
function getI18nTarget(i18n) {
  return isI18nInstance(i18n) ? i18n.global : i18n;
}
function getComposer$3(i18n) {
  const target = getI18nTarget(i18n);
  if (isComposer(target)) return target;
  if (isVueI18n(target)) return target.__composer;
  return target;
}
function getHost() {
  const header = useRequestHeaders(["x-forwarded-host", "host"]);
  return header["x-forwarded-host"] || header["host"] || "";
}
function getLocaleDomain(locales, strategy, route) {
  const host = getHost();
  if (!host) {
    return host;
  }
  const routePath = isString(route) ? route : route.path;
  const matchingLocales = locales.filter((locale) => {
    if (locale.domain) {
      return (hasProtocol(locale.domain) ? locale.domain.replace(/(http|https):\/\//, "") : locale.domain) === host;
    }
    return isArray(locale?.domains) ? locale.domains.includes(host) : false;
  });
  if (matchingLocales.length === 0) {
    return "";
  }
  if (matchingLocales.length === 1) {
    return matchingLocales[0]?.code ?? "";
  }
  if (strategy === "no_prefix") {
    console.warn(
      formatMessage(
        "Multiple matching domains found! This is not supported for no_prefix strategy in combination with differentDomains!"
      )
    );
    return matchingLocales[0]?.code ?? "";
  }
  if (route && routePath) {
    const matched = routePath.match(getLocalesRegex(matchingLocales.map((l) => l.code)))?.at(1);
    if (matched) {
      const matchingLocale2 = matchingLocales.find((l) => l.code === matched);
      return matchingLocale2?.code ?? "";
    }
  }
  const matchingLocale = matchingLocales.find((l) => l.defaultForDomains?.includes(host) ?? l.domainDefault);
  return matchingLocale?.code ?? "";
}
function getDomainFromLocale(localeCode) {
  const nuxt = useNuxtApp();
  const host = getHost();
  const { domainLocales } = (/* @__PURE__ */ useRuntimeConfig()).public.i18n;
  const lang = normalizedLocales.find((locale) => locale.code === localeCode);
  const domain = domainLocales?.[localeCode]?.domain || lang?.domain || lang?.domains?.find((v) => v === host);
  if (!domain) {
    console.warn(formatMessage("Could not find domain name for locale " + localeCode));
    return;
  }
  if (hasProtocol(domain, { strict: true })) {
    return domain;
  }
  const protocol = getRequestProtocol(useRequestEvent(nuxt)) + ":";
  return protocol + "//" + domain;
}
function setupMultiDomainLocales(runtimeI18n, defaultLocaleDomain) {
  const { multiDomainLocales, strategy, routesNameSeparator, defaultLocaleRouteNameSuffix } = runtimeI18n;
  if (!multiDomainLocales) return;
  if (!(strategy === "prefix_except_default" || strategy === "prefix_and_default")) return;
  const router = useRouter();
  const defaultRouteSuffix = [routesNameSeparator, defaultLocaleRouteNameSuffix].join("");
  for (const route of router.getRoutes()) {
    const routeName = getRouteName(route.name);
    if (routeName.endsWith(defaultRouteSuffix)) {
      router.removeRoute(routeName);
      continue;
    }
    const routeNameLocale = routeName.split(routesNameSeparator)[1];
    if (routeNameLocale === defaultLocaleDomain) {
      router.addRoute({
        ...route,
        path: route.path === `/${routeNameLocale}` ? "/" : route.path.replace(`/${routeNameLocale}`, "")
      });
    }
  }
}
function getDefaultLocaleForDomain(runtimeI18n) {
  const { locales, domainLocales, defaultLocale, multiDomainLocales } = runtimeI18n;
  const host = getHost();
  if (!multiDomainLocales) {
    const foundLocale = normalizedLocales.find((l) => {
      const localeCode = isString(l) ? l : l.code;
      const lang = normalizedLocales.find((locale) => locale.code === localeCode);
      const domain = domainLocales?.[localeCode]?.domain ?? lang?.domain;
      return domain === host;
    });
    return foundLocale?.code ?? defaultLocale ?? "";
  }
  if (locales.some((l) => !isString(l) && l.defaultForDomains != null)) {
    const findDefaultLocale = locales.find(
      (l) => !isString(l) && !!l.defaultForDomains?.includes(host)
    );
    return findDefaultLocale?.code ?? "";
  }
  return defaultLocale || "";
}
const cacheMessages = /* @__PURE__ */ new Map();
async function loadVueI18nOptions(vueI18nConfigs2, nuxt) {
  const vueI18nOptions = { messages: {} };
  for (const configFile of vueI18nConfigs2) {
    const { default: resolver } = await configFile();
    const resolved = isFunction(resolver) ? await nuxt.runWithContext(() => resolver()) : resolver;
    deepCopy(resolved, vueI18nOptions);
  }
  return vueI18nOptions;
}
function makeFallbackLocaleCodes(fallback, locales) {
  if (fallback === false) return [];
  if (isArray(fallback)) return fallback;
  let fallbackLocales = [];
  if (isString(fallback)) {
    if (locales.every((locale) => locale !== fallback)) {
      fallbackLocales.push(fallback);
    }
    return fallbackLocales;
  }
  const targets = [...locales, "default"];
  for (const locale of targets) {
    if (locale in fallback == false) continue;
    fallbackLocales = [...fallbackLocales, ...fallback[locale].filter(Boolean)];
  }
  return fallbackLocales;
}
const isModule = (val) => toTypeString(val) === "[object Module]";
async function loadMessage(locale, { key, load }, nuxt) {
  let message = null;
  try {
    const getter = await load().then((x) => isModule(x) ? x.default : x);
    if (isFunction(getter)) {
      message = await nuxt.runWithContext(() => getter(locale));
    } else {
      message = getter;
      if (message != null && cacheMessages && true) {
        cacheMessages.set(key, message);
      }
    }
  } catch (e) {
    console.error("Failed locale loading: " + e.message);
  }
  return message;
}
async function loadLocale(locale, localeLoaders2, setter, nuxt) {
  const loaders = localeLoaders2[locale];
  if (loaders == null) {
    return;
  }
  const targetMessage = {};
  for (const loader of loaders) {
    let message = null;
    if (cacheMessages && cacheMessages.has(loader.key) && loader.cache) {
      message = cacheMessages.get(loader.key);
    } else {
      message = await nuxt.runWithContext(() => loadMessage(locale, loader, nuxt));
    }
    if (message != null) {
      deepCopy(message, targetMessage);
    }
  }
  setter(locale, targetMessage);
}
function getRouteBaseName(common, route) {
  const _route = unref(route);
  const routeName = isObject(_route) ? _route?.name : _route;
  if (_route == null || !routeName) {
    return;
  }
  return getRouteName(routeName).split(common.runtimeConfig.public.i18n.routesNameSeparator)[0];
}
function localePath(common, route, locale) {
  if (isString(route) && hasProtocol(route, { acceptRelative: true })) {
    return route;
  }
  const localizedRoute = resolveRoute(common, route, locale);
  return localizedRoute == null ? "" : localizedRoute.redirectedFrom?.fullPath || localizedRoute.fullPath;
}
function localeRoute(common, route, locale) {
  return resolveRoute(common, route, locale) ?? void 0;
}
function normalizeRawLocation(route) {
  if (!isString(route)) {
    return assign({}, route);
  }
  if (route[0] === "/") {
    const { pathname: path, search, hash: hash2 } = parsePath(route);
    return { path, query: parseQuery(search), hash: hash2 };
  }
  return { name: route };
}
const isRouteLocationPathRaw = (val) => !!val.path && !val.name;
function resolveRouteObject(common, route, locale) {
  const runtimeI18n = common.runtimeConfig.public.i18n;
  if (isRouteLocationPathRaw(route)) {
    const resolved = resolve(common, route, locale);
    const resolvedName = getRouteBaseName(common, resolved);
    if (resolvedName) {
      resolved.name = getLocaleRouteName(resolvedName, locale, runtimeI18n);
      return resolved;
    }
    if (!runtimeI18n.differentDomains && prefixable(locale, runtimeI18n.defaultLocale, runtimeI18n.strategy)) {
      route.path = "/" + locale + route.path;
    }
    route.path = (runtimeI18n.trailingSlash ? withTrailingSlash : withoutTrailingSlash)(route.path, true);
    return route;
  }
  route.name ||= getRouteBaseName(common, common.router.currentRoute.value);
  const localizedName = getLocaleRouteName(route.name, locale, runtimeI18n);
  if (common.router.hasRoute(localizedName)) {
    route.name = localizedName;
  }
  return route;
}
function resolveRoute(common, route, locale) {
  try {
    const _locale = locale || unref(getI18nTarget(common.i18n).locale);
    const normalized = normalizeRawLocation(route);
    const resolved = common.router.resolve(resolveRouteObject(common, normalized, _locale));
    if (resolved.name) {
      return resolved;
    }
    return common.router.resolve(route);
  } catch (e) {
    if (isNavigationFailure(
      e,
      1
      /* No match */
    )) {
      return null;
    }
  }
}
function getLocalizableMetaFromDynamicParams(common, route) {
  if (common.runtimeConfig.public.i18n.experimental.switchLocalePathLinkSSR) {
    return unref(common.metaState.value);
  }
  const meta = route.meta || {};
  return unref(meta)?.[DEFAULT_DYNAMIC_PARAMS_KEY] || {};
}
function switchLocalePath(common, locale, _route) {
  const route = _route ?? common.router.currentRoute.value;
  const name = getRouteBaseName(common, route);
  if (!name) {
    return "";
  }
  const resolvedParams = getLocalizableMetaFromDynamicParams(common, route)[locale];
  const routeCopy = {
    name,
    params: assign({}, route.params, resolvedParams),
    fullPath: route.fullPath,
    query: route.query,
    hash: route.hash,
    path: route.path,
    meta: route.meta
    // matched: route.matched,
    // redirectedFrom: route.redirectedFrom
  };
  const path = localePath(common, routeCopy, locale);
  if (common.runtimeConfig.public.i18n.differentDomains) {
    const domain = getDomainFromLocale(locale);
    return domain && joinURL(domain, path) || path;
  }
  return path;
}
function resolve(common, route, locale) {
  if (common.runtimeConfig.public.i18n.strategy === "no_prefix") {
    return route;
  }
  if (common.runtimeConfig.public.i18n.strategy !== "prefix") {
    return common.router.resolve(route);
  }
  const restPath = route.path.slice(1);
  const targetPath = route.path[0] + locale + (restPath && "/" + restPath);
  const _route = common.router.options.routes.find((r) => r.path === targetPath);
  if (_route == null) {
    return route;
  }
  return common.router.resolve(assign({}, route, _route, { path: targetPath }));
}
function formatMessage(message) {
  return `[${NUXT_I18N_MODULE_ID}]: ${message}`;
}
function initCommonComposableOptions(i18n) {
  return {
    i18n: i18n ?? useNuxtApp().$i18n,
    router: useRouter(),
    runtimeConfig: /* @__PURE__ */ useRuntimeConfig(),
    metaState: useState("nuxt-i18n-meta", () => ({}))
  };
}
async function loadAndSetLocale(nuxtApp, newLocale, initial = false) {
  const { differentDomains, skipSettingLocaleOnNavigate } = nuxtApp.$config.public.i18n;
  const opts = runtimeDetectBrowserLanguage(nuxtApp.$config.public.i18n);
  const oldLocale = unref(nuxtApp.$i18n.locale);
  const localeCodes2 = unref(nuxtApp.$i18n.localeCodes);
  function syncCookie(locale = oldLocale) {
    if (opts === false || !opts.useCookie) return;
    if (skipSettingLocaleOnNavigate) return;
    nuxtApp.$i18n.setLocaleCookie(locale);
  }
  const localeOverride = await nuxtApp.$i18n.onBeforeLanguageSwitch(oldLocale, newLocale, initial, nuxtApp);
  if (localeOverride && localeCodes2.includes(localeOverride)) {
    if (oldLocale === localeOverride) {
      syncCookie();
      return false;
    }
    newLocale = localeOverride;
  }
  if (!newLocale) {
    syncCookie();
    return false;
  }
  if (!initial && differentDomains) {
    syncCookie();
    return false;
  }
  if (oldLocale === newLocale) {
    syncCookie();
    return false;
  }
  const i18nFallbackLocales = unref(nuxtApp.$i18n.fallbackLocale);
  const setter = nuxtApp.$i18n.mergeLocaleMessage.bind(nuxtApp.$i18n);
  if (i18nFallbackLocales) {
    const fallbackLocales = makeFallbackLocaleCodes(i18nFallbackLocales, [newLocale]);
    await Promise.all(fallbackLocales.map((locale) => loadLocale(locale, localeLoaders, setter, nuxtApp)));
  }
  await loadLocale(newLocale, localeLoaders, setter, nuxtApp);
  if (skipSettingLocaleOnNavigate) {
    return false;
  }
  syncCookie(newLocale);
  nuxtApp._vueI18n.__setLocale(newLocale);
  await nuxtApp.$i18n.onLanguageSwitched(oldLocale, newLocale);
  return true;
}
function detectLocale(nuxtApp, route, routeLocale, currentLocale, localeCookie) {
  const { strategy, defaultLocale, differentDomains, multiDomainLocales } = nuxtApp.$config.public.i18n;
  const _detectBrowserLanguage = runtimeDetectBrowserLanguage();
  const detectedBrowser = detectBrowserLanguage(nuxtApp, route, localeCookie, currentLocale);
  if (detectedBrowser.locale && detectedBrowser.from != null && localeCodes.includes(detectedBrowser.locale)) {
    return detectedBrowser.locale;
  }
  let detected = "";
  if (differentDomains || multiDomainLocales) {
    detected ||= getLocaleDomain(normalizedLocales, strategy, route);
  } else if (strategy !== "no_prefix") {
    detected ||= routeLocale;
  }
  const cookieLocale = (localeCodes.includes(detectedBrowser.locale) || localeCookie && localeCodes.includes(localeCookie)) && _detectBrowserLanguage && _detectBrowserLanguage.useCookie && localeCookie;
  detected ||= cookieLocale || currentLocale || defaultLocale || "";
  return detected;
}
function detectRedirect({ to, nuxtApp, from, locale, routeLocale }, inMiddleware = false) {
  if (routeLocale === locale || nuxtApp.$i18n.strategy === "no_prefix") {
    return "";
  }
  const common = initCommonComposableOptions();
  let redirectPath = switchLocalePath(common, locale, to);
  if (inMiddleware && !redirectPath) {
    redirectPath = localePath(common, to.fullPath, locale);
  }
  if (isEqual(redirectPath, to.fullPath) || from && isEqual(redirectPath, from.fullPath)) {
    return "";
  }
  return redirectPath;
}
const useRedirectState = () => useState(NUXT_I18N_MODULE_ID + ":redirect", () => "");
async function navigate({ nuxt, locale, route, redirectPath }, enableNavigate = false) {
  const { rootRedirect, differentDomains, multiDomainLocales, skipSettingLocaleOnNavigate, locales, strategy } = nuxt.$config.public.i18n;
  if (route.path === "/" && rootRedirect) {
    let redirectCode = 302;
    if (isString(rootRedirect)) {
      redirectPath = "/" + rootRedirect;
    } else {
      redirectPath = "/" + rootRedirect.path;
      redirectCode = rootRedirect.statusCode;
    }
    redirectPath = nuxt.$localePath(redirectPath, locale);
    return navigateTo(redirectPath, { redirectCode });
  }
  if (multiDomainLocales && strategy === "prefix_except_default") {
    const host = getHost();
    const currentDomain = locales.find((locale2) => {
      if (isString(locale2)) return;
      return locale2.defaultForDomains?.find((domain) => domain === host);
    });
    const defaultLocaleForDomain = !isString(currentDomain) ? currentDomain?.code : void 0;
    if (route.path.startsWith(`/${defaultLocaleForDomain}`)) {
      return navigateTo(route.path.replace(`/${defaultLocaleForDomain}`, ""));
    }
    if (!route.path.startsWith(`/${locale}`) && locale !== defaultLocaleForDomain) {
      const oldLocale = nuxt._vueI18n.__localeFromRoute(route.path);
      if (oldLocale !== "") {
        return navigateTo(`/${locale + route.path.replace(`/${oldLocale}`, "")}`);
      }
      return navigateTo(`/${locale + (route.path === "/" ? "" : route.path)}`);
    }
    if (redirectPath && route.path !== redirectPath) {
      return navigateTo(redirectPath);
    }
    return;
  }
  if (differentDomains) {
    const state = useRedirectState();
    if (state.value && state.value !== redirectPath) {
      {
        state.value = redirectPath;
      }
    }
  } else if (redirectPath) {
    return navigateTo(redirectPath);
  }
}
function prefixable(currentLocale, defaultLocale, strategy) {
  return (
    // strategy has no prefixes
    strategy !== "no_prefix" && // strategy should not prefix default locale
    !(currentLocale === defaultLocale && (strategy === "prefix_and_default" || strategy === "prefix_except_default"))
  );
}
function extendBaseUrl(ctx) {
  const { baseUrl, defaultLocale, differentDomains } = ctx.$config.public.i18n;
  if (isFunction(baseUrl)) {
    return () => {
      const baseUrlResult = baseUrl(ctx);
      return baseUrlResult;
    };
  }
  const localeCode = isFunction(defaultLocale) ? defaultLocale() : defaultLocale;
  return () => {
    if (differentDomains && localeCode) {
      const domain = getDomainFromLocale(localeCode);
      if (domain) {
        return domain;
      }
    }
    return baseUrl ?? "";
  };
}
function toArray(value) {
  return isArray(value) ? value : [value];
}
function wrapComposable(fn, common = initCommonComposableOptions()) {
  return (...args) => fn(common, ...args);
}
function parseAcceptLanguage(input = "") {
  return input.split(",").map((tag) => tag.split(";")[0]);
}
function getBrowserLocale() {
  const browserLocales = parseAcceptLanguage(useRequestHeader("accept-language"));
  return findBrowserLocale(normalizedLocales, browserLocales) || void 0;
}
function createI18nCookie() {
  const detect = runtimeDetectBrowserLanguage();
  const cookieKey = detect && detect.cookieKey || DEFAULT_COOKIE_KEY;
  const date = /* @__PURE__ */ new Date();
  const cookieOptions = {
    path: "/",
    readonly: false,
    expires: new Date(date.setDate(date.getDate() + 365)),
    sameSite: detect && detect.cookieCrossOrigin ? "none" : "lax",
    domain: detect && detect.cookieDomain || void 0,
    secure: detect && detect.cookieCrossOrigin || detect && detect.cookieSecure
  };
  return useCookie(cookieKey, cookieOptions);
}
function getLocaleCookie(cookieRef, detect, defaultLocale) {
  if (detect === false || !detect.useCookie) {
    return;
  }
  const localeCode = cookieRef.value ?? void 0;
  if (localeCode == null) {
    return;
  }
  if (localeCodes.includes(localeCode)) {
    return localeCode;
  }
  if (defaultLocale) {
    cookieRef.value = defaultLocale;
    return defaultLocale;
  }
  cookieRef.value = void 0;
}
function detectBrowserLanguage(nuxtApp, route, localeCookie, locale = "") {
  const _detect = runtimeDetectBrowserLanguage();
  if (!_detect) {
    return { locale: "", error: "disabled" };
  }
  const strategy = nuxtApp.$i18n.strategy;
  const firstAccess = nuxtApp._vueI18n.__firstAccess;
  if (!firstAccess) {
    return { locale: strategy === "no_prefix" ? locale : "", error: "first_access_only" };
  }
  if (strategy !== "no_prefix") {
    const path = isString(route) ? route : route.path;
    if (_detect.redirectOn === "root" && path !== "/") {
      return { locale: "", error: "not_redirect_on_root" };
    }
    if (_detect.redirectOn === "no prefix" && !_detect.alwaysRedirect && path.match(regexpPath)) {
      return { locale: "", error: "not_redirect_on_no_prefix" };
    }
  }
  const cookieMatch = _detect.useCookie && localeCookie || void 0;
  if (cookieMatch) {
    return { locale: cookieMatch, from: "cookie" };
  }
  const browserMatch = nuxtApp.$i18n.getBrowserLocale();
  if (browserMatch) {
    return { locale: browserMatch, from: "navigator_or_header" };
  }
  return { locale: _detect.fallbackLocale || "", from: "fallback" };
}
function runtimeDetectBrowserLanguage(opts = (/* @__PURE__ */ useRuntimeConfig()).public.i18n) {
  if (opts?.detectBrowserLanguage === false) return false;
  return opts?.detectBrowserLanguage;
}
function createHeadContext(options) {
  const nuxtApp = useNuxtApp();
  const locale = unref(nuxtApp.$i18n.locale);
  const locales = unref(nuxtApp.$i18n.locales).map((x) => isString(x) ? { code: x } : x);
  const currentLocale = locales.find((l) => l.code === locale) || { code: locale };
  const baseUrl = joinURL(unref(getComposer$3(nuxtApp.$i18n).baseUrl), nuxtApp.$config.app.baseURL);
  const runtimeI18n = nuxtApp.$config.public.i18n;
  if (!baseUrl) {
    console.warn("I18n `baseUrl` is required to generate valid SEO tag links.");
  }
  return {
    dir: options.dir,
    lang: options.lang,
    key: options.key,
    seo: options.seo,
    locale,
    locales,
    currentDir: currentLocale.dir || runtimeI18n.defaultDirection,
    currentLocale,
    currentLanguage: currentLocale.language,
    baseUrl,
    runtimeI18n
  };
}
function localeHead(common, { dir = true, lang = true, seo = true, key = "hid" }) {
  return _localeHead(common, { dir, lang, seo, key });
}
function _useLocaleHead(common, options) {
  const metaObject = ref(_localeHead(common, options));
  return metaObject;
}
function _localeHead(common, options) {
  const metaObject = {
    htmlAttrs: {},
    link: [],
    meta: []
  };
  const ctx = createHeadContext(options);
  if (ctx.baseUrl == null) {
    return metaObject;
  }
  if (ctx.dir) {
    metaObject.htmlAttrs.dir = ctx.currentDir;
  }
  if (ctx.lang && ctx.currentLanguage) {
    metaObject.htmlAttrs.lang = ctx.currentLanguage;
  }
  if (ctx.seo) {
    metaObject.link = metaObject.link.concat(
      getHreflangLinks(common, ctx),
      getCanonicalLink(common, ctx)
    );
    metaObject.meta = metaObject.meta.concat(
      getOgUrl(common, ctx),
      getCurrentOgLocale(ctx),
      getAlternateOgLocales(ctx)
    );
  }
  return metaObject;
}
function getHreflangLinks(common, ctx) {
  const { defaultLocale, strategy, differentDomains } = ctx.runtimeI18n;
  const links = [];
  if (strategy === "no_prefix" && !differentDomains) return links;
  const localeMap = /* @__PURE__ */ new Map();
  for (const locale of ctx.locales) {
    if (!locale.language) {
      console.warn("Locale `language` ISO code is required to generate alternate link");
      continue;
    }
    const [language, region] = locale.language.split("-");
    if (language && region && (locale.isCatchallLocale || !localeMap.has(language))) {
      localeMap.set(language, locale);
    }
    localeMap.set(locale.language, locale);
  }
  const strictCanonicals = ctx.runtimeI18n.experimental.alternateLinkCanonicalQueries === true;
  const routeWithoutQuery = strictCanonicals ? common.router.resolve({ query: {} }) : void 0;
  if (!ctx.runtimeI18n.experimental.switchLocalePathLinkSSR && strictCanonicals) {
    routeWithoutQuery.meta = common.router.currentRoute.value.meta;
  }
  for (const [language, mapLocale] of localeMap.entries()) {
    const localePath2 = switchLocalePath(common, mapLocale.code, routeWithoutQuery);
    if (!localePath2) continue;
    const fullPath = differentDomains && mapLocale.domain ? localePath2 : joinURL(ctx.baseUrl, localePath2);
    const href = withQuery(fullPath, strictCanonicals ? getCanonicalQueryParams(common, ctx) : {});
    links.push({ [ctx.key]: `i18n-alt-${language}`, rel: "alternate", href, hreflang: language });
    if (defaultLocale && defaultLocale === mapLocale.code) {
      links.unshift({ [ctx.key]: "i18n-xd", rel: "alternate", href, hreflang: "x-default" });
    }
  }
  return links;
}
function getCanonicalUrl(common, ctx) {
  const route = common.router.currentRoute.value;
  const currentRoute = localeRoute(
    common,
    assign({}, route, { path: void 0, name: getRouteBaseName(common, route) })
  );
  if (!currentRoute) return "";
  return withQuery(joinURL(ctx.baseUrl, currentRoute.path), getCanonicalQueryParams(common, ctx));
}
function getCanonicalLink(common, ctx) {
  const href = getCanonicalUrl(common, ctx);
  if (!href) return [];
  return [{ [ctx.key]: "i18n-can", rel: "canonical", href }];
}
function getCanonicalQueryParams(common, ctx) {
  const route = common.router.currentRoute.value;
  const currentRoute = localeRoute(
    common,
    assign({}, route, { path: void 0, name: getRouteBaseName(common, route) })
  );
  const canonicalQueries = isObject(ctx.seo) && ctx.seo?.canonicalQueries || [];
  const currentRouteQuery = currentRoute?.query || {};
  const params = {};
  for (const param of canonicalQueries.filter((x) => x in currentRouteQuery)) {
    params[param] ??= [];
    for (const val of toArray(currentRouteQuery[param])) {
      params[param].push(val || "");
    }
  }
  return params;
}
function getOgUrl(common, ctx) {
  const href = getCanonicalUrl(common, ctx);
  if (!href) return [];
  return [{ [ctx.key]: "i18n-og-url", property: "og:url", content: href }];
}
function getCurrentOgLocale(ctx) {
  if (!ctx.currentLanguage) return [];
  return [{ [ctx.key]: "i18n-og", property: "og:locale", content: hyphenToUnderscore(ctx.currentLanguage) }];
}
function getAlternateOgLocales(ctx) {
  const alternateLocales = ctx.locales.filter((locale) => locale.language && locale.language !== ctx.currentLanguage);
  return alternateLocales.map((locale) => ({
    [ctx.key]: `i18n-og-alt-${locale.language}`,
    property: "og:locale:alternate",
    content: hyphenToUnderscore(locale.language)
  }));
}
function hyphenToUnderscore(val = "") {
  return val.replace(/-/g, "_");
}
function createPosition(line, column, offset) {
  return { line, column, offset };
}
function createLocation(start, end, source) {
  const loc = { start, end };
  return loc;
}
const CompileErrorCodes = {
  // tokenizer error codes
  EXPECTED_TOKEN: 1,
  INVALID_TOKEN_IN_PLACEHOLDER: 2,
  UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER: 3,
  UNKNOWN_ESCAPE_SEQUENCE: 4,
  INVALID_UNICODE_ESCAPE_SEQUENCE: 5,
  UNBALANCED_CLOSING_BRACE: 6,
  UNTERMINATED_CLOSING_BRACE: 7,
  EMPTY_PLACEHOLDER: 8,
  NOT_ALLOW_NEST_PLACEHOLDER: 9,
  INVALID_LINKED_FORMAT: 10,
  // parser error codes
  MUST_HAVE_MESSAGES_IN_PLURAL: 11,
  UNEXPECTED_EMPTY_LINKED_MODIFIER: 12,
  UNEXPECTED_EMPTY_LINKED_KEY: 13,
  UNEXPECTED_LEXICAL_ANALYSIS: 14};
const COMPILE_ERROR_CODES_EXTEND_POINT = 17;
function createCompileError(code, loc, options = {}) {
  const { domain, messages, args } = options;
  const msg = code;
  const error = new SyntaxError(String(msg));
  error.code = code;
  if (loc) {
    error.location = loc;
  }
  error.domain = domain;
  return error;
}
function defaultOnError(error) {
  throw error;
}
const CHAR_SP = " ";
const CHAR_CR = "\r";
const CHAR_LF = "\n";
const CHAR_LS = String.fromCharCode(8232);
const CHAR_PS = String.fromCharCode(8233);
function createScanner(str) {
  const _buf = str;
  let _index = 0;
  let _line = 1;
  let _column = 1;
  let _peekOffset = 0;
  const isCRLF = (index2) => _buf[index2] === CHAR_CR && _buf[index2 + 1] === CHAR_LF;
  const isLF = (index2) => _buf[index2] === CHAR_LF;
  const isPS = (index2) => _buf[index2] === CHAR_PS;
  const isLS = (index2) => _buf[index2] === CHAR_LS;
  const isLineEnd = (index2) => isCRLF(index2) || isLF(index2) || isPS(index2) || isLS(index2);
  const index = () => _index;
  const line = () => _line;
  const column = () => _column;
  const peekOffset = () => _peekOffset;
  const charAt = (offset) => isCRLF(offset) || isPS(offset) || isLS(offset) ? CHAR_LF : _buf[offset];
  const currentChar = () => charAt(_index);
  const currentPeek = () => charAt(_index + _peekOffset);
  function next() {
    _peekOffset = 0;
    if (isLineEnd(_index)) {
      _line++;
      _column = 0;
    }
    if (isCRLF(_index)) {
      _index++;
    }
    _index++;
    _column++;
    return _buf[_index];
  }
  function peek() {
    if (isCRLF(_index + _peekOffset)) {
      _peekOffset++;
    }
    _peekOffset++;
    return _buf[_index + _peekOffset];
  }
  function reset() {
    _index = 0;
    _line = 1;
    _column = 1;
    _peekOffset = 0;
  }
  function resetPeek(offset = 0) {
    _peekOffset = offset;
  }
  function skipToPeek() {
    const target = _index + _peekOffset;
    while (target !== _index) {
      next();
    }
    _peekOffset = 0;
  }
  return {
    index,
    line,
    column,
    peekOffset,
    charAt,
    currentChar,
    currentPeek,
    next,
    peek,
    reset,
    resetPeek,
    skipToPeek
  };
}
const EOF = void 0;
const DOT = ".";
const LITERAL_DELIMITER = "'";
const ERROR_DOMAIN$3 = "tokenizer";
function createTokenizer(source, options = {}) {
  const location = options.location !== false;
  const _scnr = createScanner(source);
  const currentOffset = () => _scnr.index();
  const currentPosition = () => createPosition(_scnr.line(), _scnr.column(), _scnr.index());
  const _initLoc = currentPosition();
  const _initOffset = currentOffset();
  const _context = {
    currentType: 13,
    offset: _initOffset,
    startLoc: _initLoc,
    endLoc: _initLoc,
    lastType: 13,
    lastOffset: _initOffset,
    lastStartLoc: _initLoc,
    lastEndLoc: _initLoc,
    braceNest: 0,
    inLinked: false,
    text: ""
  };
  const context = () => _context;
  const { onError } = options;
  function emitError(code, pos, offset, ...args) {
    const ctx = context();
    pos.column += offset;
    pos.offset += offset;
    if (onError) {
      const loc = location ? createLocation(ctx.startLoc, pos) : null;
      const err = createCompileError(code, loc, {
        domain: ERROR_DOMAIN$3,
        args
      });
      onError(err);
    }
  }
  function getToken(context2, type, value) {
    context2.endLoc = currentPosition();
    context2.currentType = type;
    const token = { type };
    if (location) {
      token.loc = createLocation(context2.startLoc, context2.endLoc);
    }
    if (value != null) {
      token.value = value;
    }
    return token;
  }
  const getEndToken = (context2) => getToken(
    context2,
    13
    /* TokenTypes.EOF */
  );
  function eat(scnr, ch) {
    if (scnr.currentChar() === ch) {
      scnr.next();
      return ch;
    } else {
      emitError(CompileErrorCodes.EXPECTED_TOKEN, currentPosition(), 0, ch);
      return "";
    }
  }
  function peekSpaces(scnr) {
    let buf = "";
    while (scnr.currentPeek() === CHAR_SP || scnr.currentPeek() === CHAR_LF) {
      buf += scnr.currentPeek();
      scnr.peek();
    }
    return buf;
  }
  function skipSpaces(scnr) {
    const buf = peekSpaces(scnr);
    scnr.skipToPeek();
    return buf;
  }
  function isIdentifierStart(ch) {
    if (ch === EOF) {
      return false;
    }
    const cc = ch.charCodeAt(0);
    return cc >= 97 && cc <= 122 || // a-z
    cc >= 65 && cc <= 90 || // A-Z
    cc === 95;
  }
  function isNumberStart(ch) {
    if (ch === EOF) {
      return false;
    }
    const cc = ch.charCodeAt(0);
    return cc >= 48 && cc <= 57;
  }
  function isNamedIdentifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ret = isIdentifierStart(scnr.currentPeek());
    scnr.resetPeek();
    return ret;
  }
  function isListIdentifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ch = scnr.currentPeek() === "-" ? scnr.peek() : scnr.currentPeek();
    const ret = isNumberStart(ch);
    scnr.resetPeek();
    return ret;
  }
  function isLiteralStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 2) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === LITERAL_DELIMITER;
    scnr.resetPeek();
    return ret;
  }
  function isLinkedDotStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 7) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === ".";
    scnr.resetPeek();
    return ret;
  }
  function isLinkedModifierStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 8) {
      return false;
    }
    peekSpaces(scnr);
    const ret = isIdentifierStart(scnr.currentPeek());
    scnr.resetPeek();
    return ret;
  }
  function isLinkedDelimiterStart(scnr, context2) {
    const { currentType } = context2;
    if (!(currentType === 7 || currentType === 11)) {
      return false;
    }
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === ":";
    scnr.resetPeek();
    return ret;
  }
  function isLinkedReferStart(scnr, context2) {
    const { currentType } = context2;
    if (currentType !== 9) {
      return false;
    }
    const fn = () => {
      const ch = scnr.currentPeek();
      if (ch === "{") {
        return isIdentifierStart(scnr.peek());
      } else if (ch === "@" || ch === "|" || ch === ":" || ch === "." || ch === CHAR_SP || !ch) {
        return false;
      } else if (ch === CHAR_LF) {
        scnr.peek();
        return fn();
      } else {
        return isTextStart(scnr, false);
      }
    };
    const ret = fn();
    scnr.resetPeek();
    return ret;
  }
  function isPluralStart(scnr) {
    peekSpaces(scnr);
    const ret = scnr.currentPeek() === "|";
    scnr.resetPeek();
    return ret;
  }
  function isTextStart(scnr, reset = true) {
    const fn = (hasSpace = false, prev = "") => {
      const ch = scnr.currentPeek();
      if (ch === "{") {
        return hasSpace;
      } else if (ch === "@" || !ch) {
        return hasSpace;
      } else if (ch === "|") {
        return !(prev === CHAR_SP || prev === CHAR_LF);
      } else if (ch === CHAR_SP) {
        scnr.peek();
        return fn(true, CHAR_SP);
      } else if (ch === CHAR_LF) {
        scnr.peek();
        return fn(true, CHAR_LF);
      } else {
        return true;
      }
    };
    const ret = fn();
    reset && scnr.resetPeek();
    return ret;
  }
  function takeChar(scnr, fn) {
    const ch = scnr.currentChar();
    if (ch === EOF) {
      return EOF;
    }
    if (fn(ch)) {
      scnr.next();
      return ch;
    }
    return null;
  }
  function isIdentifier(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 97 && cc <= 122 || // a-z
    cc >= 65 && cc <= 90 || // A-Z
    cc >= 48 && cc <= 57 || // 0-9
    cc === 95 || // _
    cc === 36;
  }
  function takeIdentifierChar(scnr) {
    return takeChar(scnr, isIdentifier);
  }
  function isNamedIdentifier(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 97 && cc <= 122 || // a-z
    cc >= 65 && cc <= 90 || // A-Z
    cc >= 48 && cc <= 57 || // 0-9
    cc === 95 || // _
    cc === 36 || // $
    cc === 45;
  }
  function takeNamedIdentifierChar(scnr) {
    return takeChar(scnr, isNamedIdentifier);
  }
  function isDigit(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 48 && cc <= 57;
  }
  function takeDigit(scnr) {
    return takeChar(scnr, isDigit);
  }
  function isHexDigit(ch) {
    const cc = ch.charCodeAt(0);
    return cc >= 48 && cc <= 57 || // 0-9
    cc >= 65 && cc <= 70 || // A-F
    cc >= 97 && cc <= 102;
  }
  function takeHexDigit(scnr) {
    return takeChar(scnr, isHexDigit);
  }
  function getDigits(scnr) {
    let ch = "";
    let num = "";
    while (ch = takeDigit(scnr)) {
      num += ch;
    }
    return num;
  }
  function readText(scnr) {
    let buf = "";
    while (true) {
      const ch = scnr.currentChar();
      if (ch === "{" || ch === "}" || ch === "@" || ch === "|" || !ch) {
        break;
      } else if (ch === CHAR_SP || ch === CHAR_LF) {
        if (isTextStart(scnr)) {
          buf += ch;
          scnr.next();
        } else if (isPluralStart(scnr)) {
          break;
        } else {
          buf += ch;
          scnr.next();
        }
      } else {
        buf += ch;
        scnr.next();
      }
    }
    return buf;
  }
  function readNamedIdentifier(scnr) {
    skipSpaces(scnr);
    let ch = "";
    let name = "";
    while (ch = takeNamedIdentifierChar(scnr)) {
      name += ch;
    }
    if (scnr.currentChar() === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
    }
    return name;
  }
  function readListIdentifier(scnr) {
    skipSpaces(scnr);
    let value = "";
    if (scnr.currentChar() === "-") {
      scnr.next();
      value += `-${getDigits(scnr)}`;
    } else {
      value += getDigits(scnr);
    }
    if (scnr.currentChar() === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
    }
    return value;
  }
  function isLiteral2(ch) {
    return ch !== LITERAL_DELIMITER && ch !== CHAR_LF;
  }
  function readLiteral(scnr) {
    skipSpaces(scnr);
    eat(scnr, `'`);
    let ch = "";
    let literal = "";
    while (ch = takeChar(scnr, isLiteral2)) {
      if (ch === "\\") {
        literal += readEscapeSequence(scnr);
      } else {
        literal += ch;
      }
    }
    const current = scnr.currentChar();
    if (current === CHAR_LF || current === EOF) {
      emitError(CompileErrorCodes.UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER, currentPosition(), 0);
      if (current === CHAR_LF) {
        scnr.next();
        eat(scnr, `'`);
      }
      return literal;
    }
    eat(scnr, `'`);
    return literal;
  }
  function readEscapeSequence(scnr) {
    const ch = scnr.currentChar();
    switch (ch) {
      case "\\":
      case `'`:
        scnr.next();
        return `\\${ch}`;
      case "u":
        return readUnicodeEscapeSequence(scnr, ch, 4);
      case "U":
        return readUnicodeEscapeSequence(scnr, ch, 6);
      default:
        emitError(CompileErrorCodes.UNKNOWN_ESCAPE_SEQUENCE, currentPosition(), 0, ch);
        return "";
    }
  }
  function readUnicodeEscapeSequence(scnr, unicode, digits) {
    eat(scnr, unicode);
    let sequence = "";
    for (let i = 0; i < digits; i++) {
      const ch = takeHexDigit(scnr);
      if (!ch) {
        emitError(CompileErrorCodes.INVALID_UNICODE_ESCAPE_SEQUENCE, currentPosition(), 0, `\\${unicode}${sequence}${scnr.currentChar()}`);
        break;
      }
      sequence += ch;
    }
    return `\\${unicode}${sequence}`;
  }
  function isInvalidIdentifier(ch) {
    return ch !== "{" && ch !== "}" && ch !== CHAR_SP && ch !== CHAR_LF;
  }
  function readInvalidIdentifier(scnr) {
    skipSpaces(scnr);
    let ch = "";
    let identifiers = "";
    while (ch = takeChar(scnr, isInvalidIdentifier)) {
      identifiers += ch;
    }
    return identifiers;
  }
  function readLinkedModifier(scnr) {
    let ch = "";
    let name = "";
    while (ch = takeIdentifierChar(scnr)) {
      name += ch;
    }
    return name;
  }
  function readLinkedRefer(scnr) {
    const fn = (buf) => {
      const ch = scnr.currentChar();
      if (ch === "{" || ch === "@" || ch === "|" || ch === "(" || ch === ")" || !ch) {
        return buf;
      } else if (ch === CHAR_SP) {
        return buf;
      } else if (ch === CHAR_LF || ch === DOT) {
        buf += ch;
        scnr.next();
        return fn(buf);
      } else {
        buf += ch;
        scnr.next();
        return fn(buf);
      }
    };
    return fn("");
  }
  function readPlural(scnr) {
    skipSpaces(scnr);
    const plural = eat(
      scnr,
      "|"
      /* TokenChars.Pipe */
    );
    skipSpaces(scnr);
    return plural;
  }
  function readTokenInPlaceholder(scnr, context2) {
    let token = null;
    const ch = scnr.currentChar();
    switch (ch) {
      case "{":
        if (context2.braceNest >= 1) {
          emitError(CompileErrorCodes.NOT_ALLOW_NEST_PLACEHOLDER, currentPosition(), 0);
        }
        scnr.next();
        token = getToken(
          context2,
          2,
          "{"
          /* TokenChars.BraceLeft */
        );
        skipSpaces(scnr);
        context2.braceNest++;
        return token;
      case "}":
        if (context2.braceNest > 0 && context2.currentType === 2) {
          emitError(CompileErrorCodes.EMPTY_PLACEHOLDER, currentPosition(), 0);
        }
        scnr.next();
        token = getToken(
          context2,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
        context2.braceNest--;
        context2.braceNest > 0 && skipSpaces(scnr);
        if (context2.inLinked && context2.braceNest === 0) {
          context2.inLinked = false;
        }
        return token;
      case "@":
        if (context2.braceNest > 0) {
          emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
        }
        token = readTokenInLinked(scnr, context2) || getEndToken(context2);
        context2.braceNest = 0;
        return token;
      default: {
        let validNamedIdentifier = true;
        let validListIdentifier = true;
        let validLiteral = true;
        if (isPluralStart(scnr)) {
          if (context2.braceNest > 0) {
            emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
          }
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        if (context2.braceNest > 0 && (context2.currentType === 4 || context2.currentType === 5 || context2.currentType === 6)) {
          emitError(CompileErrorCodes.UNTERMINATED_CLOSING_BRACE, currentPosition(), 0);
          context2.braceNest = 0;
          return readToken(scnr, context2);
        }
        if (validNamedIdentifier = isNamedIdentifierStart(scnr, context2)) {
          token = getToken(context2, 4, readNamedIdentifier(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (validListIdentifier = isListIdentifierStart(scnr, context2)) {
          token = getToken(context2, 5, readListIdentifier(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (validLiteral = isLiteralStart(scnr, context2)) {
          token = getToken(context2, 6, readLiteral(scnr));
          skipSpaces(scnr);
          return token;
        }
        if (!validNamedIdentifier && !validListIdentifier && !validLiteral) {
          token = getToken(context2, 12, readInvalidIdentifier(scnr));
          emitError(CompileErrorCodes.INVALID_TOKEN_IN_PLACEHOLDER, currentPosition(), 0, token.value);
          skipSpaces(scnr);
          return token;
        }
        break;
      }
    }
    return token;
  }
  function readTokenInLinked(scnr, context2) {
    const { currentType } = context2;
    let token = null;
    const ch = scnr.currentChar();
    if ((currentType === 7 || currentType === 8 || currentType === 11 || currentType === 9) && (ch === CHAR_LF || ch === CHAR_SP)) {
      emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
    }
    switch (ch) {
      case "@":
        scnr.next();
        token = getToken(
          context2,
          7,
          "@"
          /* TokenChars.LinkedAlias */
        );
        context2.inLinked = true;
        return token;
      case ".":
        skipSpaces(scnr);
        scnr.next();
        return getToken(
          context2,
          8,
          "."
          /* TokenChars.LinkedDot */
        );
      case ":":
        skipSpaces(scnr);
        scnr.next();
        return getToken(
          context2,
          9,
          ":"
          /* TokenChars.LinkedDelimiter */
        );
      default:
        if (isPluralStart(scnr)) {
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        if (isLinkedDotStart(scnr, context2) || isLinkedDelimiterStart(scnr, context2)) {
          skipSpaces(scnr);
          return readTokenInLinked(scnr, context2);
        }
        if (isLinkedModifierStart(scnr, context2)) {
          skipSpaces(scnr);
          return getToken(context2, 11, readLinkedModifier(scnr));
        }
        if (isLinkedReferStart(scnr, context2)) {
          skipSpaces(scnr);
          if (ch === "{") {
            return readTokenInPlaceholder(scnr, context2) || token;
          } else {
            return getToken(context2, 10, readLinkedRefer(scnr));
          }
        }
        if (currentType === 7) {
          emitError(CompileErrorCodes.INVALID_LINKED_FORMAT, currentPosition(), 0);
        }
        context2.braceNest = 0;
        context2.inLinked = false;
        return readToken(scnr, context2);
    }
  }
  function readToken(scnr, context2) {
    let token = {
      type: 13
      /* TokenTypes.EOF */
    };
    if (context2.braceNest > 0) {
      return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
    }
    if (context2.inLinked) {
      return readTokenInLinked(scnr, context2) || getEndToken(context2);
    }
    const ch = scnr.currentChar();
    switch (ch) {
      case "{":
        return readTokenInPlaceholder(scnr, context2) || getEndToken(context2);
      case "}":
        emitError(CompileErrorCodes.UNBALANCED_CLOSING_BRACE, currentPosition(), 0);
        scnr.next();
        return getToken(
          context2,
          3,
          "}"
          /* TokenChars.BraceRight */
        );
      case "@":
        return readTokenInLinked(scnr, context2) || getEndToken(context2);
      default: {
        if (isPluralStart(scnr)) {
          token = getToken(context2, 1, readPlural(scnr));
          context2.braceNest = 0;
          context2.inLinked = false;
          return token;
        }
        if (isTextStart(scnr)) {
          return getToken(context2, 0, readText(scnr));
        }
        break;
      }
    }
    return token;
  }
  function nextToken() {
    const { currentType, offset, startLoc, endLoc } = _context;
    _context.lastType = currentType;
    _context.lastOffset = offset;
    _context.lastStartLoc = startLoc;
    _context.lastEndLoc = endLoc;
    _context.offset = currentOffset();
    _context.startLoc = currentPosition();
    if (_scnr.currentChar() === EOF) {
      return getToken(
        _context,
        13
        /* TokenTypes.EOF */
      );
    }
    return readToken(_scnr, _context);
  }
  return {
    nextToken,
    currentOffset,
    currentPosition,
    context
  };
}
const ERROR_DOMAIN$2 = "parser";
const KNOWN_ESCAPES = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
function fromEscapeSequence(match, codePoint4, codePoint6) {
  switch (match) {
    case `\\\\`:
      return `\\`;
    // eslint-disable-next-line no-useless-escape
    case `\\'`:
      return `'`;
    default: {
      const codePoint = parseInt(codePoint4 || codePoint6, 16);
      if (codePoint <= 55295 || codePoint >= 57344) {
        return String.fromCodePoint(codePoint);
      }
      return "�";
    }
  }
}
function createParser(options = {}) {
  const location = options.location !== false;
  const { onError } = options;
  function emitError(tokenzer, code, start, offset, ...args) {
    const end = tokenzer.currentPosition();
    end.offset += offset;
    end.column += offset;
    if (onError) {
      const loc = location ? createLocation(start, end) : null;
      const err = createCompileError(code, loc, {
        domain: ERROR_DOMAIN$2,
        args
      });
      onError(err);
    }
  }
  function startNode(type, offset, loc) {
    const node = { type };
    if (location) {
      node.start = offset;
      node.end = offset;
      node.loc = { start: loc, end: loc };
    }
    return node;
  }
  function endNode(node, offset, pos, type) {
    if (location) {
      node.end = offset;
      if (node.loc) {
        node.loc.end = pos;
      }
    }
  }
  function parseText(tokenizer, value) {
    const context = tokenizer.context();
    const node = startNode(3, context.offset, context.startLoc);
    node.value = value;
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseList(tokenizer, index) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(5, offset, loc);
    node.index = parseInt(index, 10);
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseNamed(tokenizer, key) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(4, offset, loc);
    node.key = key;
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLiteral(tokenizer, value) {
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(9, offset, loc);
    node.value = value.replace(KNOWN_ESCAPES, fromEscapeSequence);
    tokenizer.nextToken();
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLinkedModifier(tokenizer) {
    const token = tokenizer.nextToken();
    const context = tokenizer.context();
    const { lastOffset: offset, lastStartLoc: loc } = context;
    const node = startNode(8, offset, loc);
    if (token.type !== 11) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_MODIFIER, context.lastStartLoc, 0);
      node.value = "";
      endNode(node, offset, loc);
      return {
        nextConsumeToken: token,
        node
      };
    }
    if (token.value == null) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
    }
    node.value = token.value || "";
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return {
      node
    };
  }
  function parseLinkedKey(tokenizer, value) {
    const context = tokenizer.context();
    const node = startNode(7, context.offset, context.startLoc);
    node.value = value;
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseLinked(tokenizer) {
    const context = tokenizer.context();
    const linkedNode = startNode(6, context.offset, context.startLoc);
    let token = tokenizer.nextToken();
    if (token.type === 8) {
      const parsed = parseLinkedModifier(tokenizer);
      linkedNode.modifier = parsed.node;
      token = parsed.nextConsumeToken || tokenizer.nextToken();
    }
    if (token.type !== 9) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
    }
    token = tokenizer.nextToken();
    if (token.type === 2) {
      token = tokenizer.nextToken();
    }
    switch (token.type) {
      case 10:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseLinkedKey(tokenizer, token.value || "");
        break;
      case 4:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseNamed(tokenizer, token.value || "");
        break;
      case 5:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseList(tokenizer, token.value || "");
        break;
      case 6:
        if (token.value == null) {
          emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
        }
        linkedNode.key = parseLiteral(tokenizer, token.value || "");
        break;
      default: {
        emitError(tokenizer, CompileErrorCodes.UNEXPECTED_EMPTY_LINKED_KEY, context.lastStartLoc, 0);
        const nextContext = tokenizer.context();
        const emptyLinkedKeyNode = startNode(7, nextContext.offset, nextContext.startLoc);
        emptyLinkedKeyNode.value = "";
        endNode(emptyLinkedKeyNode, nextContext.offset, nextContext.startLoc);
        linkedNode.key = emptyLinkedKeyNode;
        endNode(linkedNode, nextContext.offset, nextContext.startLoc);
        return {
          nextConsumeToken: token,
          node: linkedNode
        };
      }
    }
    endNode(linkedNode, tokenizer.currentOffset(), tokenizer.currentPosition());
    return {
      node: linkedNode
    };
  }
  function parseMessage(tokenizer) {
    const context = tokenizer.context();
    const startOffset = context.currentType === 1 ? tokenizer.currentOffset() : context.offset;
    const startLoc = context.currentType === 1 ? context.endLoc : context.startLoc;
    const node = startNode(2, startOffset, startLoc);
    node.items = [];
    let nextToken = null;
    do {
      const token = nextToken || tokenizer.nextToken();
      nextToken = null;
      switch (token.type) {
        case 0:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseText(tokenizer, token.value || ""));
          break;
        case 5:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseList(tokenizer, token.value || ""));
          break;
        case 4:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseNamed(tokenizer, token.value || ""));
          break;
        case 6:
          if (token.value == null) {
            emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.items.push(parseLiteral(tokenizer, token.value || ""));
          break;
        case 7: {
          const parsed = parseLinked(tokenizer);
          node.items.push(parsed.node);
          nextToken = parsed.nextConsumeToken || null;
          break;
        }
      }
    } while (context.currentType !== 13 && context.currentType !== 1);
    const endOffset = context.currentType === 1 ? context.lastOffset : tokenizer.currentOffset();
    const endLoc = context.currentType === 1 ? context.lastEndLoc : tokenizer.currentPosition();
    endNode(node, endOffset, endLoc);
    return node;
  }
  function parsePlural(tokenizer, offset, loc, msgNode) {
    const context = tokenizer.context();
    let hasEmptyMessage = msgNode.items.length === 0;
    const node = startNode(1, offset, loc);
    node.cases = [];
    node.cases.push(msgNode);
    do {
      const msg = parseMessage(tokenizer);
      if (!hasEmptyMessage) {
        hasEmptyMessage = msg.items.length === 0;
      }
      node.cases.push(msg);
    } while (context.currentType !== 13);
    if (hasEmptyMessage) {
      emitError(tokenizer, CompileErrorCodes.MUST_HAVE_MESSAGES_IN_PLURAL, loc, 0);
    }
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  function parseResource(tokenizer) {
    const context = tokenizer.context();
    const { offset, startLoc } = context;
    const msgNode = parseMessage(tokenizer);
    if (context.currentType === 13) {
      return msgNode;
    } else {
      return parsePlural(tokenizer, offset, startLoc, msgNode);
    }
  }
  function parse2(source) {
    const tokenizer = createTokenizer(source, assign({}, options));
    const context = tokenizer.context();
    const node = startNode(0, context.offset, context.startLoc);
    if (location && node.loc) {
      node.loc.source = source;
    }
    node.body = parseResource(tokenizer);
    if (options.onCacheKey) {
      node.cacheKey = options.onCacheKey(source);
    }
    if (context.currentType !== 13) {
      emitError(tokenizer, CompileErrorCodes.UNEXPECTED_LEXICAL_ANALYSIS, context.lastStartLoc, 0, source[context.offset] || "");
    }
    endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
    return node;
  }
  return { parse: parse2 };
}
function getTokenCaption(token) {
  if (token.type === 13) {
    return "EOF";
  }
  const name = (token.value || "").replace(/\r?\n/gu, "\\n");
  return name.length > 10 ? name.slice(0, 9) + "…" : name;
}
function createTransformer(ast, options = {}) {
  const _context = {
    ast,
    helpers: /* @__PURE__ */ new Set()
  };
  const context = () => _context;
  const helper = (name) => {
    _context.helpers.add(name);
    return name;
  };
  return { context, helper };
}
function traverseNodes(nodes, transformer) {
  for (let i = 0; i < nodes.length; i++) {
    traverseNode(nodes[i], transformer);
  }
}
function traverseNode(node, transformer) {
  switch (node.type) {
    case 1:
      traverseNodes(node.cases, transformer);
      transformer.helper(
        "plural"
        /* HelperNameMap.PLURAL */
      );
      break;
    case 2:
      traverseNodes(node.items, transformer);
      break;
    case 6: {
      const linked = node;
      traverseNode(linked.key, transformer);
      transformer.helper(
        "linked"
        /* HelperNameMap.LINKED */
      );
      transformer.helper(
        "type"
        /* HelperNameMap.TYPE */
      );
      break;
    }
    case 5:
      transformer.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      );
      transformer.helper(
        "list"
        /* HelperNameMap.LIST */
      );
      break;
    case 4:
      transformer.helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      );
      transformer.helper(
        "named"
        /* HelperNameMap.NAMED */
      );
      break;
  }
}
function transform(ast, options = {}) {
  const transformer = createTransformer(ast);
  transformer.helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  );
  ast.body && traverseNode(ast.body, transformer);
  const context = transformer.context();
  ast.helpers = Array.from(context.helpers);
}
function optimize(ast) {
  const body = ast.body;
  if (body.type === 2) {
    optimizeMessageNode(body);
  } else {
    body.cases.forEach((c) => optimizeMessageNode(c));
  }
  return ast;
}
function optimizeMessageNode(message) {
  if (message.items.length === 1) {
    const item = message.items[0];
    if (item.type === 3 || item.type === 9) {
      message.static = item.value;
      delete item.value;
    }
  } else {
    const values = [];
    for (let i = 0; i < message.items.length; i++) {
      const item = message.items[i];
      if (!(item.type === 3 || item.type === 9)) {
        break;
      }
      if (item.value == null) {
        break;
      }
      values.push(item.value);
    }
    if (values.length === message.items.length) {
      message.static = join(values);
      for (let i = 0; i < message.items.length; i++) {
        const item = message.items[i];
        if (item.type === 3 || item.type === 9) {
          delete item.value;
        }
      }
    }
  }
}
function minify(node) {
  node.t = node.type;
  switch (node.type) {
    case 0: {
      const resource2 = node;
      minify(resource2.body);
      resource2.b = resource2.body;
      delete resource2.body;
      break;
    }
    case 1: {
      const plural = node;
      const cases = plural.cases;
      for (let i = 0; i < cases.length; i++) {
        minify(cases[i]);
      }
      plural.c = cases;
      delete plural.cases;
      break;
    }
    case 2: {
      const message = node;
      const items = message.items;
      for (let i = 0; i < items.length; i++) {
        minify(items[i]);
      }
      message.i = items;
      delete message.items;
      if (message.static) {
        message.s = message.static;
        delete message.static;
      }
      break;
    }
    case 3:
    case 9:
    case 8:
    case 7: {
      const valueNode = node;
      if (valueNode.value) {
        valueNode.v = valueNode.value;
        delete valueNode.value;
      }
      break;
    }
    case 6: {
      const linked = node;
      minify(linked.key);
      linked.k = linked.key;
      delete linked.key;
      if (linked.modifier) {
        minify(linked.modifier);
        linked.m = linked.modifier;
        delete linked.modifier;
      }
      break;
    }
    case 5: {
      const list = node;
      list.i = list.index;
      delete list.index;
      break;
    }
    case 4: {
      const named = node;
      named.k = named.key;
      delete named.key;
      break;
    }
  }
  delete node.type;
}
function createCodeGenerator(ast, options) {
  const { filename, breakLineCode, needIndent: _needIndent } = options;
  const location = options.location !== false;
  const _context = {
    filename,
    code: "",
    column: 1,
    line: 1,
    offset: 0,
    map: void 0,
    breakLineCode,
    needIndent: _needIndent,
    indentLevel: 0
  };
  if (location && ast.loc) {
    _context.source = ast.loc.source;
  }
  const context = () => _context;
  function push(code, node) {
    _context.code += code;
  }
  function _newline(n, withBreakLine = true) {
    const _breakLineCode = withBreakLine ? breakLineCode : "";
    push(_needIndent ? _breakLineCode + `  `.repeat(n) : _breakLineCode);
  }
  function indent(withNewLine = true) {
    const level = ++_context.indentLevel;
    withNewLine && _newline(level);
  }
  function deindent(withNewLine = true) {
    const level = --_context.indentLevel;
    withNewLine && _newline(level);
  }
  function newline() {
    _newline(_context.indentLevel);
  }
  const helper = (key) => `_${key}`;
  const needIndent = () => _context.needIndent;
  return {
    context,
    push,
    indent,
    deindent,
    newline,
    helper,
    needIndent
  };
}
function generateLinkedNode(generator, node) {
  const { helper } = generator;
  generator.push(`${helper(
    "linked"
    /* HelperNameMap.LINKED */
  )}(`);
  generateNode(generator, node.key);
  if (node.modifier) {
    generator.push(`, `);
    generateNode(generator, node.modifier);
    generator.push(`, _type`);
  } else {
    generator.push(`, undefined, _type`);
  }
  generator.push(`)`);
}
function generateMessageNode(generator, node) {
  const { helper, needIndent } = generator;
  generator.push(`${helper(
    "normalize"
    /* HelperNameMap.NORMALIZE */
  )}([`);
  generator.indent(needIndent());
  const length = node.items.length;
  for (let i = 0; i < length; i++) {
    generateNode(generator, node.items[i]);
    if (i === length - 1) {
      break;
    }
    generator.push(", ");
  }
  generator.deindent(needIndent());
  generator.push("])");
}
function generatePluralNode(generator, node) {
  const { helper, needIndent } = generator;
  if (node.cases.length > 1) {
    generator.push(`${helper(
      "plural"
      /* HelperNameMap.PLURAL */
    )}([`);
    generator.indent(needIndent());
    const length = node.cases.length;
    for (let i = 0; i < length; i++) {
      generateNode(generator, node.cases[i]);
      if (i === length - 1) {
        break;
      }
      generator.push(", ");
    }
    generator.deindent(needIndent());
    generator.push(`])`);
  }
}
function generateResource(generator, node) {
  if (node.body) {
    generateNode(generator, node.body);
  } else {
    generator.push("null");
  }
}
function generateNode(generator, node) {
  const { helper } = generator;
  switch (node.type) {
    case 0:
      generateResource(generator, node);
      break;
    case 1:
      generatePluralNode(generator, node);
      break;
    case 2:
      generateMessageNode(generator, node);
      break;
    case 6:
      generateLinkedNode(generator, node);
      break;
    case 8:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 7:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 5:
      generator.push(`${helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${helper(
        "list"
        /* HelperNameMap.LIST */
      )}(${node.index}))`, node);
      break;
    case 4:
      generator.push(`${helper(
        "interpolate"
        /* HelperNameMap.INTERPOLATE */
      )}(${helper(
        "named"
        /* HelperNameMap.NAMED */
      )}(${JSON.stringify(node.key)}))`, node);
      break;
    case 9:
      generator.push(JSON.stringify(node.value), node);
      break;
    case 3:
      generator.push(JSON.stringify(node.value), node);
      break;
  }
}
const generate = (ast, options = {}) => {
  const mode = isString(options.mode) ? options.mode : "normal";
  const filename = isString(options.filename) ? options.filename : "message.intl";
  !!options.sourceMap;
  const breakLineCode = options.breakLineCode != null ? options.breakLineCode : mode === "arrow" ? ";" : "\n";
  const needIndent = options.needIndent ? options.needIndent : mode !== "arrow";
  const helpers = ast.helpers || [];
  const generator = createCodeGenerator(ast, {
    filename,
    breakLineCode,
    needIndent
  });
  generator.push(mode === "normal" ? `function __msg__ (ctx) {` : `(ctx) => {`);
  generator.indent(needIndent);
  if (helpers.length > 0) {
    generator.push(`const { ${join(helpers.map((s) => `${s}: _${s}`), ", ")} } = ctx`);
    generator.newline();
  }
  generator.push(`return `);
  generateNode(generator, ast);
  generator.deindent(needIndent);
  generator.push(`}`);
  delete ast.helpers;
  const { code, map } = generator.context();
  return {
    ast,
    code,
    map: map ? map.toJSON() : void 0
    // eslint-disable-line @typescript-eslint/no-explicit-any
  };
};
function baseCompile$1(source, options = {}) {
  const assignedOptions = assign({}, options);
  const jit = !!assignedOptions.jit;
  const enalbeMinify = !!assignedOptions.minify;
  const enambeOptimize = assignedOptions.optimize == null ? true : assignedOptions.optimize;
  const parser = createParser(assignedOptions);
  const ast = parser.parse(source);
  if (!jit) {
    transform(ast, assignedOptions);
    return generate(ast, assignedOptions);
  } else {
    enambeOptimize && optimize(ast);
    enalbeMinify && minify(ast);
    return { ast, code: "" };
  }
}
function isMessageAST(val) {
  return isObject(val) && resolveType(val) === 0 && (hasOwn(val, "b") || hasOwn(val, "body"));
}
const PROPS_BODY = ["b", "body"];
function resolveBody(node) {
  return resolveProps(node, PROPS_BODY);
}
const PROPS_CASES = ["c", "cases"];
function resolveCases(node) {
  return resolveProps(node, PROPS_CASES, []);
}
const PROPS_STATIC = ["s", "static"];
function resolveStatic(node) {
  return resolveProps(node, PROPS_STATIC);
}
const PROPS_ITEMS = ["i", "items"];
function resolveItems(node) {
  return resolveProps(node, PROPS_ITEMS, []);
}
const PROPS_TYPE = ["t", "type"];
function resolveType(node) {
  return resolveProps(node, PROPS_TYPE);
}
const PROPS_VALUE = ["v", "value"];
function resolveValue$1(node, type) {
  const resolved = resolveProps(node, PROPS_VALUE);
  if (resolved != null) {
    return resolved;
  } else {
    throw createUnhandleNodeError(type);
  }
}
const PROPS_MODIFIER = ["m", "modifier"];
function resolveLinkedModifier(node) {
  return resolveProps(node, PROPS_MODIFIER);
}
const PROPS_KEY = ["k", "key"];
function resolveLinkedKey(node) {
  const resolved = resolveProps(node, PROPS_KEY);
  if (resolved) {
    return resolved;
  } else {
    throw createUnhandleNodeError(
      6
      /* NodeTypes.Linked */
    );
  }
}
function resolveProps(node, props, defaultValue) {
  for (let i = 0; i < props.length; i++) {
    const prop = props[i];
    if (hasOwn(node, prop) && node[prop] != null) {
      return node[prop];
    }
  }
  return defaultValue;
}
const AST_NODE_PROPS_KEYS = [
  ...PROPS_BODY,
  ...PROPS_CASES,
  ...PROPS_STATIC,
  ...PROPS_ITEMS,
  ...PROPS_KEY,
  ...PROPS_MODIFIER,
  ...PROPS_VALUE,
  ...PROPS_TYPE
];
function createUnhandleNodeError(type) {
  return new Error(`unhandled node type: ${type}`);
}
function format(ast) {
  const msg = (ctx) => formatParts(ctx, ast);
  return msg;
}
function formatParts(ctx, ast) {
  const body = resolveBody(ast);
  if (body == null) {
    throw createUnhandleNodeError(
      0
      /* NodeTypes.Resource */
    );
  }
  const type = resolveType(body);
  if (type === 1) {
    const plural = body;
    const cases = resolveCases(plural);
    return ctx.plural(cases.reduce((messages, c) => [
      ...messages,
      formatMessageParts(ctx, c)
    ], []));
  } else {
    return formatMessageParts(ctx, body);
  }
}
function formatMessageParts(ctx, node) {
  const static_ = resolveStatic(node);
  if (static_ != null) {
    return ctx.type === "text" ? static_ : ctx.normalize([static_]);
  } else {
    const messages = resolveItems(node).reduce((acm, c) => [...acm, formatMessagePart(ctx, c)], []);
    return ctx.normalize(messages);
  }
}
function formatMessagePart(ctx, node) {
  const type = resolveType(node);
  switch (type) {
    case 3: {
      return resolveValue$1(node, type);
    }
    case 9: {
      return resolveValue$1(node, type);
    }
    case 4: {
      const named = node;
      if (hasOwn(named, "k") && named.k) {
        return ctx.interpolate(ctx.named(named.k));
      }
      if (hasOwn(named, "key") && named.key) {
        return ctx.interpolate(ctx.named(named.key));
      }
      throw createUnhandleNodeError(type);
    }
    case 5: {
      const list = node;
      if (hasOwn(list, "i") && isNumber(list.i)) {
        return ctx.interpolate(ctx.list(list.i));
      }
      if (hasOwn(list, "index") && isNumber(list.index)) {
        return ctx.interpolate(ctx.list(list.index));
      }
      throw createUnhandleNodeError(type);
    }
    case 6: {
      const linked = node;
      const modifier = resolveLinkedModifier(linked);
      const key = resolveLinkedKey(linked);
      return ctx.linked(formatMessagePart(ctx, key), modifier ? formatMessagePart(ctx, modifier) : void 0, ctx.type);
    }
    case 7: {
      return resolveValue$1(node, type);
    }
    case 8: {
      return resolveValue$1(node, type);
    }
    default:
      throw new Error(`unhandled node on format message part: ${type}`);
  }
}
const defaultOnCacheKey = (message) => message;
let compileCache = create();
function baseCompile(message, options = {}) {
  let detectError = false;
  const onError = options.onError || defaultOnError;
  options.onError = (err) => {
    detectError = true;
    onError(err);
  };
  return { ...baseCompile$1(message, options), detectError };
}
// @__NO_SIDE_EFFECTS__
function compile(message, context) {
  if (isString(message)) {
    isBoolean(context.warnHtmlMessage) ? context.warnHtmlMessage : true;
    const onCacheKey = context.onCacheKey || defaultOnCacheKey;
    const cacheKey = onCacheKey(message);
    const cached = compileCache[cacheKey];
    if (cached) {
      return cached;
    }
    const { ast, detectError } = baseCompile(message, {
      ...context,
      location: "production" !== "production",
      jit: true
    });
    const msg = format(ast);
    return !detectError ? compileCache[cacheKey] = msg : msg;
  } else {
    const cacheKey = message.cacheKey;
    if (cacheKey) {
      const cached = compileCache[cacheKey];
      if (cached) {
        return cached;
      }
      return compileCache[cacheKey] = format(message);
    } else {
      return format(message);
    }
  }
}
const CoreErrorCodes = {
  INVALID_ARGUMENT: COMPILE_ERROR_CODES_EXTEND_POINT,
  // 17
  INVALID_DATE_ARGUMENT: 18,
  INVALID_ISO_DATE_ARGUMENT: 19,
  NOT_SUPPORT_LOCALE_PROMISE_VALUE: 21,
  NOT_SUPPORT_LOCALE_ASYNC_FUNCTION: 22,
  NOT_SUPPORT_LOCALE_TYPE: 23
};
const CORE_ERROR_CODES_EXTEND_POINT = 24;
function createCoreError(code) {
  return createCompileError(code, null, void 0);
}
function getLocale(context, options) {
  return options.locale != null ? resolveLocale(options.locale) : resolveLocale(context.locale);
}
let _resolveLocale;
function resolveLocale(locale) {
  if (isString(locale)) {
    return locale;
  } else {
    if (isFunction(locale)) {
      if (locale.resolvedOnce && _resolveLocale != null) {
        return _resolveLocale;
      } else if (locale.constructor.name === "Function") {
        const resolve2 = locale();
        if (isPromise(resolve2)) {
          throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_PROMISE_VALUE);
        }
        return _resolveLocale = resolve2;
      } else {
        throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_ASYNC_FUNCTION);
      }
    } else {
      throw createCoreError(CoreErrorCodes.NOT_SUPPORT_LOCALE_TYPE);
    }
  }
}
function fallbackWithSimple(ctx, fallback, start) {
  return [.../* @__PURE__ */ new Set([
    start,
    ...isArray(fallback) ? fallback : isObject(fallback) ? Object.keys(fallback) : isString(fallback) ? [fallback] : [start]
  ])];
}
function fallbackWithLocaleChain(ctx, fallback, start) {
  const startLocale = isString(start) ? start : DEFAULT_LOCALE;
  const context = ctx;
  if (!context.__localeChainCache) {
    context.__localeChainCache = /* @__PURE__ */ new Map();
  }
  let chain = context.__localeChainCache.get(startLocale);
  if (!chain) {
    chain = [];
    let block = [start];
    while (isArray(block)) {
      block = appendBlockToChain(chain, block, fallback);
    }
    const defaults = isArray(fallback) || !isPlainObject(fallback) ? fallback : fallback["default"] ? fallback["default"] : null;
    block = isString(defaults) ? [defaults] : defaults;
    if (isArray(block)) {
      appendBlockToChain(chain, block, false);
    }
    context.__localeChainCache.set(startLocale, chain);
  }
  return chain;
}
function appendBlockToChain(chain, block, blocks) {
  let follow = true;
  for (let i = 0; i < block.length && isBoolean(follow); i++) {
    const locale = block[i];
    if (isString(locale)) {
      follow = appendLocaleToChain(chain, block[i], blocks);
    }
  }
  return follow;
}
function appendLocaleToChain(chain, locale, blocks) {
  let follow;
  const tokens = locale.split("-");
  do {
    const target = tokens.join("-");
    follow = appendItemToChain(chain, target, blocks);
    tokens.splice(-1, 1);
  } while (tokens.length && follow === true);
  return follow;
}
function appendItemToChain(chain, target, blocks) {
  let follow = false;
  if (!chain.includes(target)) {
    follow = true;
    if (target) {
      follow = target[target.length - 1] !== "!";
      const locale = target.replace(/!/g, "");
      chain.push(locale);
      if ((isArray(blocks) || isPlainObject(blocks)) && blocks[locale]) {
        follow = blocks[locale];
      }
    }
  }
  return follow;
}
const pathStateMachine = [];
pathStateMachine[
  0
  /* States.BEFORE_PATH */
] = {
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    0
    /* States.BEFORE_PATH */
  ],
  [
    "i"
    /* PathCharTypes.IDENT */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4
    /* States.IN_SUB_PATH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: [
    7
    /* States.AFTER_PATH */
  ]
};
pathStateMachine[
  1
  /* States.IN_PATH */
] = {
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    1
    /* States.IN_PATH */
  ],
  [
    "."
    /* PathCharTypes.DOT */
  ]: [
    2
    /* States.BEFORE_IDENT */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4
    /* States.IN_SUB_PATH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: [
    7
    /* States.AFTER_PATH */
  ]
};
pathStateMachine[
  2
  /* States.BEFORE_IDENT */
] = {
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    2
    /* States.BEFORE_IDENT */
  ],
  [
    "i"
    /* PathCharTypes.IDENT */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "0"
    /* PathCharTypes.ZERO */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ]
};
pathStateMachine[
  3
  /* States.IN_IDENT */
] = {
  [
    "i"
    /* PathCharTypes.IDENT */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "0"
    /* PathCharTypes.ZERO */
  ]: [
    3,
    0
    /* Actions.APPEND */
  ],
  [
    "w"
    /* PathCharTypes.WORKSPACE */
  ]: [
    1,
    1
    /* Actions.PUSH */
  ],
  [
    "."
    /* PathCharTypes.DOT */
  ]: [
    2,
    1
    /* Actions.PUSH */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4,
    1
    /* Actions.PUSH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: [
    7,
    1
    /* Actions.PUSH */
  ]
};
pathStateMachine[
  4
  /* States.IN_SUB_PATH */
] = {
  [
    "'"
    /* PathCharTypes.SINGLE_QUOTE */
  ]: [
    5,
    0
    /* Actions.APPEND */
  ],
  [
    '"'
    /* PathCharTypes.DOUBLE_QUOTE */
  ]: [
    6,
    0
    /* Actions.APPEND */
  ],
  [
    "["
    /* PathCharTypes.LEFT_BRACKET */
  ]: [
    4,
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ],
  [
    "]"
    /* PathCharTypes.RIGHT_BRACKET */
  ]: [
    1,
    3
    /* Actions.PUSH_SUB_PATH */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* PathCharTypes.ELSE */
  ]: [
    4,
    0
    /* Actions.APPEND */
  ]
};
pathStateMachine[
  5
  /* States.IN_SINGLE_QUOTE */
] = {
  [
    "'"
    /* PathCharTypes.SINGLE_QUOTE */
  ]: [
    4,
    0
    /* Actions.APPEND */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* PathCharTypes.ELSE */
  ]: [
    5,
    0
    /* Actions.APPEND */
  ]
};
pathStateMachine[
  6
  /* States.IN_DOUBLE_QUOTE */
] = {
  [
    '"'
    /* PathCharTypes.DOUBLE_QUOTE */
  ]: [
    4,
    0
    /* Actions.APPEND */
  ],
  [
    "o"
    /* PathCharTypes.END_OF_FAIL */
  ]: 8,
  [
    "l"
    /* PathCharTypes.ELSE */
  ]: [
    6,
    0
    /* Actions.APPEND */
  ]
};
const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral(exp) {
  return literalValueRE.test(exp);
}
function stripQuotes(str) {
  const a = str.charCodeAt(0);
  const b = str.charCodeAt(str.length - 1);
  return a === b && (a === 34 || a === 39) ? str.slice(1, -1) : str;
}
function getPathCharType(ch) {
  if (ch === void 0 || ch === null) {
    return "o";
  }
  const code = ch.charCodeAt(0);
  switch (code) {
    case 91:
    // [
    case 93:
    // ]
    case 46:
    // .
    case 34:
    // "
    case 39:
      return ch;
    case 95:
    // _
    case 36:
    // $
    case 45:
      return "i";
    case 9:
    // Tab (HT)
    case 10:
    // Newline (LF)
    case 13:
    // Return (CR)
    case 160:
    // No-break space (NBSP)
    case 65279:
    // Byte Order Mark (BOM)
    case 8232:
    // Line Separator (LS)
    case 8233:
      return "w";
  }
  return "i";
}
function formatSubPath(path) {
  const trimmed = path.trim();
  if (path.charAt(0) === "0" && isNaN(parseInt(path))) {
    return false;
  }
  return isLiteral(trimmed) ? stripQuotes(trimmed) : "*" + trimmed;
}
function parse(path) {
  const keys = [];
  let index = -1;
  let mode = 0;
  let subPathDepth = 0;
  let c;
  let key;
  let newChar;
  let type;
  let transition;
  let action;
  let typeMap;
  const actions = [];
  actions[
    0
    /* Actions.APPEND */
  ] = () => {
    if (key === void 0) {
      key = newChar;
    } else {
      key += newChar;
    }
  };
  actions[
    1
    /* Actions.PUSH */
  ] = () => {
    if (key !== void 0) {
      keys.push(key);
      key = void 0;
    }
  };
  actions[
    2
    /* Actions.INC_SUB_PATH_DEPTH */
  ] = () => {
    actions[
      0
      /* Actions.APPEND */
    ]();
    subPathDepth++;
  };
  actions[
    3
    /* Actions.PUSH_SUB_PATH */
  ] = () => {
    if (subPathDepth > 0) {
      subPathDepth--;
      mode = 4;
      actions[
        0
        /* Actions.APPEND */
      ]();
    } else {
      subPathDepth = 0;
      if (key === void 0) {
        return false;
      }
      key = formatSubPath(key);
      if (key === false) {
        return false;
      } else {
        actions[
          1
          /* Actions.PUSH */
        ]();
      }
    }
  };
  function maybeUnescapeQuote() {
    const nextChar = path[index + 1];
    if (mode === 5 && nextChar === "'" || mode === 6 && nextChar === '"') {
      index++;
      newChar = "\\" + nextChar;
      actions[
        0
        /* Actions.APPEND */
      ]();
      return true;
    }
  }
  while (mode !== null) {
    index++;
    c = path[index];
    if (c === "\\" && maybeUnescapeQuote()) {
      continue;
    }
    type = getPathCharType(c);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type] || typeMap[
      "l"
      /* PathCharTypes.ELSE */
    ] || 8;
    if (transition === 8) {
      return;
    }
    mode = transition[0];
    if (transition[1] !== void 0) {
      action = actions[transition[1]];
      if (action) {
        newChar = c;
        if (action() === false) {
          return;
        }
      }
    }
    if (mode === 7) {
      return keys;
    }
  }
}
const cache = /* @__PURE__ */ new Map();
function resolveWithKeyValue(obj, path) {
  return isObject(obj) ? obj[path] : null;
}
function resolveValue(obj, path) {
  if (!isObject(obj)) {
    return null;
  }
  let hit = cache.get(path);
  if (!hit) {
    hit = parse(path);
    if (hit) {
      cache.set(path, hit);
    }
  }
  if (!hit) {
    return null;
  }
  const len = hit.length;
  let last = obj;
  let i = 0;
  while (i < len) {
    const key = hit[i];
    if (AST_NODE_PROPS_KEYS.includes(key) && isMessageAST(last)) {
      return null;
    }
    const val = last[key];
    if (val === void 0) {
      return null;
    }
    if (isFunction(last)) {
      return null;
    }
    last = val;
    i++;
  }
  return last;
}
const VERSION$1 = "10.0.8";
const NOT_REOSLVED = -1;
const DEFAULT_LOCALE = "en-US";
const MISSING_RESOLVE_VALUE = "";
const capitalize = (str) => `${str.charAt(0).toLocaleUpperCase()}${str.substr(1)}`;
function getDefaultLinkedModifiers() {
  return {
    upper: (val, type) => {
      return type === "text" && isString(val) ? val.toUpperCase() : type === "vnode" && isObject(val) && "__v_isVNode" in val ? val.children.toUpperCase() : val;
    },
    lower: (val, type) => {
      return type === "text" && isString(val) ? val.toLowerCase() : type === "vnode" && isObject(val) && "__v_isVNode" in val ? val.children.toLowerCase() : val;
    },
    capitalize: (val, type) => {
      return type === "text" && isString(val) ? capitalize(val) : type === "vnode" && isObject(val) && "__v_isVNode" in val ? capitalize(val.children) : val;
    }
  };
}
let _compiler;
function registerMessageCompiler(compiler) {
  _compiler = compiler;
}
let _resolver;
function registerMessageResolver(resolver) {
  _resolver = resolver;
}
let _fallbacker;
function registerLocaleFallbacker(fallbacker) {
  _fallbacker = fallbacker;
}
const setAdditionalMeta = /* @__NO_SIDE_EFFECTS__ */ (meta) => {
};
let _fallbackContext = null;
const setFallbackContext = (context) => {
  _fallbackContext = context;
};
const getFallbackContext = () => _fallbackContext;
let _cid = 0;
function createCoreContext(options = {}) {
  const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
  const version = isString(options.version) ? options.version : VERSION$1;
  const locale = isString(options.locale) || isFunction(options.locale) ? options.locale : DEFAULT_LOCALE;
  const _locale = isFunction(locale) ? DEFAULT_LOCALE : locale;
  const fallbackLocale = isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || isString(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale;
  const messages = isPlainObject(options.messages) ? options.messages : createResources(_locale);
  const datetimeFormats = isPlainObject(options.datetimeFormats) ? options.datetimeFormats : createResources(_locale);
  const numberFormats = isPlainObject(options.numberFormats) ? options.numberFormats : createResources(_locale);
  const modifiers = assign(create(), options.modifiers, getDefaultLinkedModifiers());
  const pluralRules = options.pluralRules || create();
  const missing = isFunction(options.missing) ? options.missing : null;
  const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  const fallbackFormat = !!options.fallbackFormat;
  const unresolving = !!options.unresolving;
  const postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  const processor = isPlainObject(options.processor) ? options.processor : null;
  const warnHtmlMessage = isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  const escapeParameter = !!options.escapeParameter;
  const messageCompiler = isFunction(options.messageCompiler) ? options.messageCompiler : _compiler;
  const messageResolver = isFunction(options.messageResolver) ? options.messageResolver : _resolver || resolveWithKeyValue;
  const localeFallbacker = isFunction(options.localeFallbacker) ? options.localeFallbacker : _fallbacker || fallbackWithSimple;
  const fallbackContext = isObject(options.fallbackContext) ? options.fallbackContext : void 0;
  const internalOptions = options;
  const __datetimeFormatters = isObject(internalOptions.__datetimeFormatters) ? internalOptions.__datetimeFormatters : /* @__PURE__ */ new Map();
  const __numberFormatters = isObject(internalOptions.__numberFormatters) ? internalOptions.__numberFormatters : /* @__PURE__ */ new Map();
  const __meta = isObject(internalOptions.__meta) ? internalOptions.__meta : {};
  _cid++;
  const context = {
    version,
    cid: _cid,
    locale,
    fallbackLocale,
    messages,
    modifiers,
    pluralRules,
    missing,
    missingWarn,
    fallbackWarn,
    fallbackFormat,
    unresolving,
    postTranslation,
    processor,
    warnHtmlMessage,
    escapeParameter,
    messageCompiler,
    messageResolver,
    localeFallbacker,
    fallbackContext,
    onWarn,
    __meta
  };
  {
    context.datetimeFormats = datetimeFormats;
    context.numberFormats = numberFormats;
    context.__datetimeFormatters = __datetimeFormatters;
    context.__numberFormatters = __numberFormatters;
  }
  return context;
}
const createResources = (locale) => ({ [locale]: create() });
function handleMissing(context, key, locale, missingWarn, type) {
  const { missing, onWarn } = context;
  if (missing !== null) {
    const ret = missing(context, locale, key, type);
    return isString(ret) ? ret : key;
  } else {
    return key;
  }
}
function updateFallbackLocale(ctx, locale, fallback) {
  const context = ctx;
  context.__localeChainCache = /* @__PURE__ */ new Map();
  ctx.localeFallbacker(ctx, fallback, locale);
}
function isAlmostSameLocale(locale, compareLocale) {
  if (locale === compareLocale)
    return false;
  return locale.split("-")[0] === compareLocale.split("-")[0];
}
function isImplicitFallback(targetLocale, locales) {
  const index = locales.indexOf(targetLocale);
  if (index === -1) {
    return false;
  }
  for (let i = index + 1; i < locales.length; i++) {
    if (isAlmostSameLocale(targetLocale, locales[i])) {
      return true;
    }
  }
  return false;
}
function datetime(context, ...args) {
  const { datetimeFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __datetimeFormatters } = context;
  const [key, value, options, overrides] = parseDateTimeArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = getLocale(context, options);
  const locales = localeFallbacker(
    context,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    fallbackLocale,
    locale
  );
  if (!isString(key) || key === "") {
    return new Intl.DateTimeFormat(locale, overrides).format(value);
  }
  let datetimeFormat = {};
  let targetLocale;
  let format2 = null;
  const type = "datetime format";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = locales[i];
    datetimeFormat = datetimeFormats[targetLocale] || {};
    format2 = datetimeFormat[key];
    if (isPlainObject(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
  }
  if (!isPlainObject(format2) || !isString(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __datetimeFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.DateTimeFormat(targetLocale, assign({}, format2, overrides));
    __datetimeFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
const DATETIME_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "weekday",
  "era",
  "year",
  "month",
  "day",
  "hour",
  "minute",
  "second",
  "timeZoneName",
  "formatMatcher",
  "hour12",
  "timeZone",
  "dateStyle",
  "timeStyle",
  "calendar",
  "dayPeriod",
  "numberingSystem",
  "hourCycle",
  "fractionalSecondDigits"
];
function parseDateTimeArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = create();
  let overrides = create();
  let value;
  if (isString(arg1)) {
    const matches = arg1.match(/(\d{4}-\d{2}-\d{2})(T|\s)?(.*)/);
    if (!matches) {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
    const dateTime = matches[3] ? matches[3].trim().startsWith("T") ? `${matches[1].trim()}${matches[3].trim()}` : `${matches[1].trim()}T${matches[3].trim()}` : matches[1].trim();
    value = new Date(dateTime);
    try {
      value.toISOString();
    } catch {
      throw createCoreError(CoreErrorCodes.INVALID_ISO_DATE_ARGUMENT);
    }
  } else if (isDate(arg1)) {
    if (isNaN(arg1.getTime())) {
      throw createCoreError(CoreErrorCodes.INVALID_DATE_ARGUMENT);
    }
    value = arg1;
  } else if (isNumber(arg1)) {
    value = arg1;
  } else {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  if (isString(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    Object.keys(arg2).forEach((key) => {
      if (DATETIME_FORMAT_OPTIONS_KEYS.includes(key)) {
        overrides[key] = arg2[key];
      } else {
        options[key] = arg2[key];
      }
    });
  }
  if (isString(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearDateTimeFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key in format2) {
    const id = `${locale}__${key}`;
    if (!context.__datetimeFormatters.has(id)) {
      continue;
    }
    context.__datetimeFormatters.delete(id);
  }
}
function number(context, ...args) {
  const { numberFormats, unresolving, fallbackLocale, onWarn, localeFallbacker } = context;
  const { __numberFormatters } = context;
  const [key, value, options, overrides] = parseNumberArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const part = !!options.part;
  const locale = getLocale(context, options);
  const locales = localeFallbacker(
    context,
    // eslint-disable-line @typescript-eslint/no-explicit-any
    fallbackLocale,
    locale
  );
  if (!isString(key) || key === "") {
    return new Intl.NumberFormat(locale, overrides).format(value);
  }
  let numberFormat = {};
  let targetLocale;
  let format2 = null;
  const type = "number format";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = locales[i];
    numberFormat = numberFormats[targetLocale] || {};
    format2 = numberFormat[key];
    if (isPlainObject(format2))
      break;
    handleMissing(context, key, targetLocale, missingWarn, type);
  }
  if (!isPlainObject(format2) || !isString(targetLocale)) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let id = `${targetLocale}__${key}`;
  if (!isEmptyObject(overrides)) {
    id = `${id}__${JSON.stringify(overrides)}`;
  }
  let formatter = __numberFormatters.get(id);
  if (!formatter) {
    formatter = new Intl.NumberFormat(targetLocale, assign({}, format2, overrides));
    __numberFormatters.set(id, formatter);
  }
  return !part ? formatter.format(value) : formatter.formatToParts(value);
}
const NUMBER_FORMAT_OPTIONS_KEYS = [
  "localeMatcher",
  "style",
  "currency",
  "currencyDisplay",
  "currencySign",
  "useGrouping",
  "minimumIntegerDigits",
  "minimumFractionDigits",
  "maximumFractionDigits",
  "minimumSignificantDigits",
  "maximumSignificantDigits",
  "compactDisplay",
  "notation",
  "signDisplay",
  "unit",
  "unitDisplay",
  "roundingMode",
  "roundingPriority",
  "roundingIncrement",
  "trailingZeroDisplay"
];
function parseNumberArgs(...args) {
  const [arg1, arg2, arg3, arg4] = args;
  const options = create();
  let overrides = create();
  if (!isNumber(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const value = arg1;
  if (isString(arg2)) {
    options.key = arg2;
  } else if (isPlainObject(arg2)) {
    Object.keys(arg2).forEach((key) => {
      if (NUMBER_FORMAT_OPTIONS_KEYS.includes(key)) {
        overrides[key] = arg2[key];
      } else {
        options[key] = arg2[key];
      }
    });
  }
  if (isString(arg3)) {
    options.locale = arg3;
  } else if (isPlainObject(arg3)) {
    overrides = arg3;
  }
  if (isPlainObject(arg4)) {
    overrides = arg4;
  }
  return [options.key || "", value, options, overrides];
}
function clearNumberFormat(ctx, locale, format2) {
  const context = ctx;
  for (const key in format2) {
    const id = `${locale}__${key}`;
    if (!context.__numberFormatters.has(id)) {
      continue;
    }
    context.__numberFormatters.delete(id);
  }
}
const DEFAULT_MODIFIER = (str) => str;
const DEFAULT_MESSAGE = (ctx) => "";
const DEFAULT_MESSAGE_DATA_TYPE = "text";
const DEFAULT_NORMALIZE = (values) => values.length === 0 ? "" : join(values);
const DEFAULT_INTERPOLATE = toDisplayString;
function pluralDefault(choice, choicesLength) {
  choice = Math.abs(choice);
  if (choicesLength === 2) {
    return choice ? choice > 1 ? 1 : 0 : 1;
  }
  return choice ? Math.min(choice, 2) : 0;
}
function getPluralIndex(options) {
  const index = isNumber(options.pluralIndex) ? options.pluralIndex : -1;
  return options.named && (isNumber(options.named.count) || isNumber(options.named.n)) ? isNumber(options.named.count) ? options.named.count : isNumber(options.named.n) ? options.named.n : index : index;
}
function normalizeNamed(pluralIndex, props) {
  if (!props.count) {
    props.count = pluralIndex;
  }
  if (!props.n) {
    props.n = pluralIndex;
  }
}
function createMessageContext(options = {}) {
  const locale = options.locale;
  const pluralIndex = getPluralIndex(options);
  const pluralRule = isObject(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? options.pluralRules[locale] : pluralDefault;
  const orgPluralRule = isObject(options.pluralRules) && isString(locale) && isFunction(options.pluralRules[locale]) ? pluralDefault : void 0;
  const plural = (messages) => {
    return messages[pluralRule(pluralIndex, messages.length, orgPluralRule)];
  };
  const _list = options.list || [];
  const list = (index) => _list[index];
  const _named = options.named || create();
  isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
  const named = (key) => _named[key];
  function message(key, useLinked) {
    const msg = isFunction(options.messages) ? options.messages(key, !!useLinked) : isObject(options.messages) ? options.messages[key] : false;
    return !msg ? options.parent ? options.parent.message(key) : DEFAULT_MESSAGE : msg;
  }
  const _modifier = (name) => options.modifiers ? options.modifiers[name] : DEFAULT_MODIFIER;
  const normalize = isPlainObject(options.processor) && isFunction(options.processor.normalize) ? options.processor.normalize : DEFAULT_NORMALIZE;
  const interpolate = isPlainObject(options.processor) && isFunction(options.processor.interpolate) ? options.processor.interpolate : DEFAULT_INTERPOLATE;
  const type = isPlainObject(options.processor) && isString(options.processor.type) ? options.processor.type : DEFAULT_MESSAGE_DATA_TYPE;
  const linked = (key, ...args) => {
    const [arg1, arg2] = args;
    let type2 = "text";
    let modifier = "";
    if (args.length === 1) {
      if (isObject(arg1)) {
        modifier = arg1.modifier || modifier;
        type2 = arg1.type || type2;
      } else if (isString(arg1)) {
        modifier = arg1 || modifier;
      }
    } else if (args.length === 2) {
      if (isString(arg1)) {
        modifier = arg1 || modifier;
      }
      if (isString(arg2)) {
        type2 = arg2 || type2;
      }
    }
    const ret = message(key, true)(ctx);
    const msg = (
      // The message in vnode resolved with linked are returned as an array by processor.nomalize
      type2 === "vnode" && isArray(ret) && modifier ? ret[0] : ret
    );
    return modifier ? _modifier(modifier)(msg, type2) : msg;
  };
  const ctx = {
    [
      "list"
      /* HelperNameMap.LIST */
    ]: list,
    [
      "named"
      /* HelperNameMap.NAMED */
    ]: named,
    [
      "plural"
      /* HelperNameMap.PLURAL */
    ]: plural,
    [
      "linked"
      /* HelperNameMap.LINKED */
    ]: linked,
    [
      "message"
      /* HelperNameMap.MESSAGE */
    ]: message,
    [
      "type"
      /* HelperNameMap.TYPE */
    ]: type,
    [
      "interpolate"
      /* HelperNameMap.INTERPOLATE */
    ]: interpolate,
    [
      "normalize"
      /* HelperNameMap.NORMALIZE */
    ]: normalize,
    [
      "values"
      /* HelperNameMap.VALUES */
    ]: assign(create(), _list, _named)
  };
  return ctx;
}
const NOOP_MESSAGE_FUNCTION = () => "";
const isMessageFunction = (val) => isFunction(val);
function translate(context, ...args) {
  const { fallbackFormat, postTranslation, unresolving, messageCompiler, fallbackLocale, messages } = context;
  const [key, options] = parseTranslateArgs(...args);
  const missingWarn = isBoolean(options.missingWarn) ? options.missingWarn : context.missingWarn;
  const fallbackWarn = isBoolean(options.fallbackWarn) ? options.fallbackWarn : context.fallbackWarn;
  const escapeParameter = isBoolean(options.escapeParameter) ? options.escapeParameter : context.escapeParameter;
  const resolvedMessage = !!options.resolvedMessage;
  const defaultMsgOrKey = isString(options.default) || isBoolean(options.default) ? !isBoolean(options.default) ? options.default : !messageCompiler ? () => key : key : fallbackFormat ? !messageCompiler ? () => key : key : null;
  const enableDefaultMsg = fallbackFormat || defaultMsgOrKey != null && (isString(defaultMsgOrKey) || isFunction(defaultMsgOrKey));
  const locale = getLocale(context, options);
  escapeParameter && escapeParams(options);
  let [formatScope, targetLocale, message] = !resolvedMessage ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) : [
    key,
    locale,
    messages[locale] || create()
  ];
  let format2 = formatScope;
  let cacheBaseKey = key;
  if (!resolvedMessage && !(isString(format2) || isMessageAST(format2) || isMessageFunction(format2))) {
    if (enableDefaultMsg) {
      format2 = defaultMsgOrKey;
      cacheBaseKey = format2;
    }
  }
  if (!resolvedMessage && (!(isString(format2) || isMessageAST(format2) || isMessageFunction(format2)) || !isString(targetLocale))) {
    return unresolving ? NOT_REOSLVED : key;
  }
  let occurred = false;
  const onError = () => {
    occurred = true;
  };
  const msg = !isMessageFunction(format2) ? compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError) : format2;
  if (occurred) {
    return format2;
  }
  const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
  const msgContext = createMessageContext(ctxOptions);
  const messaged = evaluateMessage(context, msg, msgContext);
  let ret = postTranslation ? postTranslation(messaged, key) : messaged;
  if (escapeParameter && isString(ret)) {
    ret = sanitizeTranslatedHtml(ret);
  }
  return ret;
}
function escapeParams(options) {
  if (isArray(options.list)) {
    options.list = options.list.map((item) => isString(item) ? escapeHtml(item) : item);
  } else if (isObject(options.named)) {
    Object.keys(options.named).forEach((key) => {
      if (isString(options.named[key])) {
        options.named[key] = escapeHtml(options.named[key]);
      }
    });
  }
}
function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
  const { messages, onWarn, messageResolver: resolveValue2, localeFallbacker } = context;
  const locales = localeFallbacker(context, fallbackLocale, locale);
  let message = create();
  let targetLocale;
  let format2 = null;
  const type = "translate";
  for (let i = 0; i < locales.length; i++) {
    targetLocale = locales[i];
    message = messages[targetLocale] || create();
    if ((format2 = resolveValue2(message, key)) === null) {
      format2 = message[key];
    }
    if (isString(format2) || isMessageAST(format2) || isMessageFunction(format2)) {
      break;
    }
    if (!isImplicitFallback(targetLocale, locales)) {
      const missingRet = handleMissing(
        context,
        // eslint-disable-line @typescript-eslint/no-explicit-any
        key,
        targetLocale,
        missingWarn,
        type
      );
      if (missingRet !== key) {
        format2 = missingRet;
      }
    }
  }
  return [format2, targetLocale, message];
}
function compileMessageFormat(context, key, targetLocale, format2, cacheBaseKey, onError) {
  const { messageCompiler, warnHtmlMessage } = context;
  if (isMessageFunction(format2)) {
    const msg2 = format2;
    msg2.locale = msg2.locale || targetLocale;
    msg2.key = msg2.key || key;
    return msg2;
  }
  if (messageCompiler == null) {
    const msg2 = (() => format2);
    msg2.locale = targetLocale;
    msg2.key = key;
    return msg2;
  }
  const msg = messageCompiler(format2, getCompileContext(context, targetLocale, cacheBaseKey, format2, warnHtmlMessage, onError));
  msg.locale = targetLocale;
  msg.key = key;
  msg.source = format2;
  return msg;
}
function evaluateMessage(context, msg, msgCtx) {
  const messaged = msg(msgCtx);
  return messaged;
}
function parseTranslateArgs(...args) {
  const [arg1, arg2, arg3] = args;
  const options = create();
  if (!isString(arg1) && !isNumber(arg1) && !isMessageFunction(arg1) && !isMessageAST(arg1)) {
    throw createCoreError(CoreErrorCodes.INVALID_ARGUMENT);
  }
  const key = isNumber(arg1) ? String(arg1) : isMessageFunction(arg1) ? arg1 : arg1;
  if (isNumber(arg2)) {
    options.plural = arg2;
  } else if (isString(arg2)) {
    options.default = arg2;
  } else if (isPlainObject(arg2) && !isEmptyObject(arg2)) {
    options.named = arg2;
  } else if (isArray(arg2)) {
    options.list = arg2;
  }
  if (isNumber(arg3)) {
    options.plural = arg3;
  } else if (isString(arg3)) {
    options.default = arg3;
  } else if (isPlainObject(arg3)) {
    assign(options, arg3);
  }
  return [key, options];
}
function getCompileContext(context, locale, key, source, warnHtmlMessage, onError) {
  return {
    locale,
    key,
    warnHtmlMessage,
    onError: (err) => {
      onError && onError(err);
      {
        throw err;
      }
    },
    onCacheKey: (source2) => generateFormatCacheKey(locale, key, source2)
  };
}
function getMessageContextOptions(context, locale, message, options) {
  const { modifiers, pluralRules, messageResolver: resolveValue2, fallbackLocale, fallbackWarn, missingWarn, fallbackContext } = context;
  const resolveMessage = (key, useLinked) => {
    let val = resolveValue2(message, key);
    if (val == null && (fallbackContext || useLinked)) {
      const [, , message2] = resolveMessageFormat(
        fallbackContext || context,
        // NOTE: if has fallbackContext, fallback to root, else if use linked, fallback to local context
        key,
        locale,
        fallbackLocale,
        fallbackWarn,
        missingWarn
      );
      val = resolveValue2(message2, key);
    }
    if (isString(val) || isMessageAST(val)) {
      let occurred = false;
      const onError = () => {
        occurred = true;
      };
      const msg = compileMessageFormat(context, key, locale, val, key, onError);
      return !occurred ? msg : NOOP_MESSAGE_FUNCTION;
    } else if (isMessageFunction(val)) {
      return val;
    } else {
      return NOOP_MESSAGE_FUNCTION;
    }
  };
  const ctxOptions = {
    locale,
    modifiers,
    pluralRules,
    messages: resolveMessage
  };
  if (context.processor) {
    ctxOptions.processor = context.processor;
  }
  if (options.list) {
    ctxOptions.list = options.list;
  }
  if (options.named) {
    ctxOptions.named = options.named;
  }
  if (isNumber(options.plural)) {
    ctxOptions.pluralIndex = options.plural;
  }
  return ctxOptions;
}
const VERSION = "10.0.8";
const I18nErrorCodes = {
  // composer module errors
  UNEXPECTED_RETURN_TYPE: CORE_ERROR_CODES_EXTEND_POINT,
  // 24
  // legacy module errors
  INVALID_ARGUMENT: 25,
  // i18n module errors
  MUST_BE_CALL_SETUP_TOP: 26,
  NOT_INSTALLED: 27,
  // directive module errors
  REQUIRED_VALUE: 28,
  INVALID_VALUE: 29,
  NOT_INSTALLED_WITH_PROVIDE: 31,
  // unexpected error
  UNEXPECTED_ERROR: 32};
function createI18nError(code, ...args) {
  return createCompileError(code, null, void 0);
}
const TranslateVNodeSymbol = /* @__PURE__ */ makeSymbol("__translateVNode");
const DatetimePartsSymbol = /* @__PURE__ */ makeSymbol("__datetimeParts");
const NumberPartsSymbol = /* @__PURE__ */ makeSymbol("__numberParts");
const SetPluralRulesSymbol = makeSymbol("__setPluralRules");
const InejctWithOptionSymbol = /* @__PURE__ */ makeSymbol("__injectWithOption");
const DisposeSymbol = /* @__PURE__ */ makeSymbol("__dispose");
function handleFlatJson(obj) {
  if (!isObject(obj)) {
    return obj;
  }
  if (isMessageAST(obj)) {
    return obj;
  }
  for (const key in obj) {
    if (!hasOwn(obj, key)) {
      continue;
    }
    if (!key.includes(".")) {
      if (isObject(obj[key])) {
        handleFlatJson(obj[key]);
      }
    } else {
      const subKeys = key.split(".");
      const lastIndex = subKeys.length - 1;
      let currentObj = obj;
      let hasStringValue = false;
      for (let i = 0; i < lastIndex; i++) {
        if (subKeys[i] === "__proto__") {
          throw new Error(`unsafe key: ${subKeys[i]}`);
        }
        if (!(subKeys[i] in currentObj)) {
          currentObj[subKeys[i]] = create();
        }
        if (!isObject(currentObj[subKeys[i]])) {
          hasStringValue = true;
          break;
        }
        currentObj = currentObj[subKeys[i]];
      }
      if (!hasStringValue) {
        if (!isMessageAST(currentObj)) {
          currentObj[subKeys[lastIndex]] = obj[key];
          delete obj[key];
        } else {
          if (!AST_NODE_PROPS_KEYS.includes(subKeys[lastIndex])) {
            delete obj[key];
          }
        }
      }
      if (!isMessageAST(currentObj)) {
        const target = currentObj[subKeys[lastIndex]];
        if (isObject(target)) {
          handleFlatJson(target);
        }
      }
    }
  }
  return obj;
}
function getLocaleMessages(locale, options) {
  const { messages, __i18n, messageResolver, flatJson } = options;
  const ret = isPlainObject(messages) ? messages : isArray(__i18n) ? create() : { [locale]: create() };
  if (isArray(__i18n)) {
    __i18n.forEach((custom) => {
      if ("locale" in custom && "resource" in custom) {
        const { locale: locale2, resource: resource2 } = custom;
        if (locale2) {
          ret[locale2] = ret[locale2] || create();
          deepCopy(resource2, ret[locale2]);
        } else {
          deepCopy(resource2, ret);
        }
      } else {
        isString(custom) && deepCopy(JSON.parse(custom), ret);
      }
    });
  }
  if (messageResolver == null && flatJson) {
    for (const key in ret) {
      if (hasOwn(ret, key)) {
        handleFlatJson(ret[key]);
      }
    }
  }
  return ret;
}
function getComponentOptions(instance) {
  return instance.type;
}
function adjustI18nResources(gl, options, componentOptions) {
  let messages = isObject(options.messages) ? options.messages : create();
  if ("__i18nGlobal" in componentOptions) {
    messages = getLocaleMessages(gl.locale.value, {
      messages,
      __i18n: componentOptions.__i18nGlobal
    });
  }
  const locales = Object.keys(messages);
  if (locales.length) {
    locales.forEach((locale) => {
      gl.mergeLocaleMessage(locale, messages[locale]);
    });
  }
  {
    if (isObject(options.datetimeFormats)) {
      const locales2 = Object.keys(options.datetimeFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          gl.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
        });
      }
    }
    if (isObject(options.numberFormats)) {
      const locales2 = Object.keys(options.numberFormats);
      if (locales2.length) {
        locales2.forEach((locale) => {
          gl.mergeNumberFormat(locale, options.numberFormats[locale]);
        });
      }
    }
  }
}
function createTextNode(key) {
  return createVNode(Text, null, key, 0);
}
const DEVTOOLS_META = "__INTLIFY_META__";
const NOOP_RETURN_ARRAY = () => [];
const NOOP_RETURN_FALSE = () => false;
let composerID = 0;
function defineCoreMissingHandler(missing) {
  return ((ctx, locale, key, type) => {
    return missing(locale, key, getCurrentInstance() || void 0, type);
  });
}
const getMetaInfo = /* @__NO_SIDE_EFFECTS__ */ () => {
  const instance = getCurrentInstance();
  let meta = null;
  return instance && (meta = getComponentOptions(instance)[DEVTOOLS_META]) ? { [DEVTOOLS_META]: meta } : null;
};
function createComposer(options = {}) {
  const { __root, __injectWithOption } = options;
  const _isGlobal = __root === void 0;
  const flatJson = options.flatJson;
  const _ref = shallowRef;
  let _inheritLocale = isBoolean(options.inheritLocale) ? options.inheritLocale : true;
  const _locale = _ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.locale.value : isString(options.locale) ? options.locale : DEFAULT_LOCALE
  );
  const _fallbackLocale = _ref(
    // prettier-ignore
    __root && _inheritLocale ? __root.fallbackLocale.value : isString(options.fallbackLocale) || isArray(options.fallbackLocale) || isPlainObject(options.fallbackLocale) || options.fallbackLocale === false ? options.fallbackLocale : _locale.value
  );
  const _messages = _ref(getLocaleMessages(_locale.value, options));
  const _datetimeFormats = _ref(isPlainObject(options.datetimeFormats) ? options.datetimeFormats : { [_locale.value]: {} });
  const _numberFormats = _ref(isPlainObject(options.numberFormats) ? options.numberFormats : { [_locale.value]: {} });
  let _missingWarn = __root ? __root.missingWarn : isBoolean(options.missingWarn) || isRegExp(options.missingWarn) ? options.missingWarn : true;
  let _fallbackWarn = __root ? __root.fallbackWarn : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn) ? options.fallbackWarn : true;
  let _fallbackRoot = __root ? __root.fallbackRoot : isBoolean(options.fallbackRoot) ? options.fallbackRoot : true;
  let _fallbackFormat = !!options.fallbackFormat;
  let _missing = isFunction(options.missing) ? options.missing : null;
  let _runtimeMissing = isFunction(options.missing) ? defineCoreMissingHandler(options.missing) : null;
  let _postTranslation = isFunction(options.postTranslation) ? options.postTranslation : null;
  let _warnHtmlMessage = __root ? __root.warnHtmlMessage : isBoolean(options.warnHtmlMessage) ? options.warnHtmlMessage : true;
  let _escapeParameter = !!options.escapeParameter;
  const _modifiers = __root ? __root.modifiers : isPlainObject(options.modifiers) ? options.modifiers : {};
  let _pluralRules = options.pluralRules || __root && __root.pluralRules;
  let _context;
  const getCoreContext = () => {
    _isGlobal && setFallbackContext(null);
    const ctxOptions = {
      version: VERSION,
      locale: _locale.value,
      fallbackLocale: _fallbackLocale.value,
      messages: _messages.value,
      modifiers: _modifiers,
      pluralRules: _pluralRules,
      missing: _runtimeMissing === null ? void 0 : _runtimeMissing,
      missingWarn: _missingWarn,
      fallbackWarn: _fallbackWarn,
      fallbackFormat: _fallbackFormat,
      unresolving: true,
      postTranslation: _postTranslation === null ? void 0 : _postTranslation,
      warnHtmlMessage: _warnHtmlMessage,
      escapeParameter: _escapeParameter,
      messageResolver: options.messageResolver,
      messageCompiler: options.messageCompiler,
      __meta: { framework: "vue" }
    };
    {
      ctxOptions.datetimeFormats = _datetimeFormats.value;
      ctxOptions.numberFormats = _numberFormats.value;
      ctxOptions.__datetimeFormatters = isPlainObject(_context) ? _context.__datetimeFormatters : void 0;
      ctxOptions.__numberFormatters = isPlainObject(_context) ? _context.__numberFormatters : void 0;
    }
    const ctx = createCoreContext(ctxOptions);
    _isGlobal && setFallbackContext(ctx);
    return ctx;
  };
  _context = getCoreContext();
  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
  function trackReactivityValues() {
    return [
      _locale.value,
      _fallbackLocale.value,
      _messages.value,
      _datetimeFormats.value,
      _numberFormats.value
    ];
  }
  const locale = computed({
    get: () => _locale.value,
    set: (val) => {
      _locale.value = val;
      _context.locale = _locale.value;
    }
  });
  const fallbackLocale = computed({
    get: () => _fallbackLocale.value,
    set: (val) => {
      _fallbackLocale.value = val;
      _context.fallbackLocale = _fallbackLocale.value;
      updateFallbackLocale(_context, _locale.value, val);
    }
  });
  const messages = computed(() => _messages.value);
  const datetimeFormats = /* @__PURE__ */ computed(() => _datetimeFormats.value);
  const numberFormats = /* @__PURE__ */ computed(() => _numberFormats.value);
  function getPostTranslationHandler() {
    return isFunction(_postTranslation) ? _postTranslation : null;
  }
  function setPostTranslationHandler(handler) {
    _postTranslation = handler;
    _context.postTranslation = handler;
  }
  function getMissingHandler() {
    return _missing;
  }
  function setMissingHandler(handler) {
    if (handler !== null) {
      _runtimeMissing = defineCoreMissingHandler(handler);
    }
    _missing = handler;
    _context.missing = _runtimeMissing;
  }
  const wrapWithDeps = (fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) => {
    trackReactivityValues();
    let ret;
    try {
      if ("production" !== "production" || false) ;
      if (!_isGlobal) {
        _context.fallbackContext = __root ? getFallbackContext() : void 0;
      }
      ret = fn(_context);
    } finally {
      if (!_isGlobal) {
        _context.fallbackContext = void 0;
      }
    }
    if (warnType !== "translate exists" && // for not `te` (e.g `t`)
    isNumber(ret) && ret === NOT_REOSLVED || warnType === "translate exists" && !ret) {
      const [key, arg2] = argumentParser();
      return __root && _fallbackRoot ? fallbackSuccess(__root) : fallbackFail(key);
    } else if (successCondition(ret)) {
      return ret;
    } else {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_RETURN_TYPE);
    }
  };
  function t(...args) {
    return wrapWithDeps((context) => Reflect.apply(translate, null, [context, ...args]), () => parseTranslateArgs(...args), "translate", (root) => Reflect.apply(root.t, root, [...args]), (key) => key, (val) => isString(val));
  }
  function rt(...args) {
    const [arg1, arg2, arg3] = args;
    if (arg3 && !isObject(arg3)) {
      throw createI18nError(I18nErrorCodes.INVALID_ARGUMENT);
    }
    return t(...[arg1, arg2, assign({ resolvedMessage: true }, arg3 || {})]);
  }
  function d(...args) {
    return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => Reflect.apply(root.d, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
  }
  function n(...args) {
    return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => Reflect.apply(root.n, root, [...args]), () => MISSING_RESOLVE_VALUE, (val) => isString(val));
  }
  function normalize(values) {
    return values.map((val) => isString(val) || isNumber(val) || isBoolean(val) ? createTextNode(String(val)) : val);
  }
  const interpolate = (val) => val;
  const processor = {
    normalize,
    interpolate,
    type: "vnode"
  };
  function translateVNode(...args) {
    return wrapWithDeps((context) => {
      let ret;
      const _context2 = context;
      try {
        _context2.processor = processor;
        ret = Reflect.apply(translate, null, [_context2, ...args]);
      } finally {
        _context2.processor = null;
      }
      return ret;
    }, () => parseTranslateArgs(...args), "translate", (root) => root[TranslateVNodeSymbol](...args), (key) => [createTextNode(key)], (val) => isArray(val));
  }
  function numberParts(...args) {
    return wrapWithDeps((context) => Reflect.apply(number, null, [context, ...args]), () => parseNumberArgs(...args), "number format", (root) => root[NumberPartsSymbol](...args), NOOP_RETURN_ARRAY, (val) => isString(val) || isArray(val));
  }
  function datetimeParts(...args) {
    return wrapWithDeps((context) => Reflect.apply(datetime, null, [context, ...args]), () => parseDateTimeArgs(...args), "datetime format", (root) => root[DatetimePartsSymbol](...args), NOOP_RETURN_ARRAY, (val) => isString(val) || isArray(val));
  }
  function setPluralRules(rules) {
    _pluralRules = rules;
    _context.pluralRules = _pluralRules;
  }
  function te(key, locale2) {
    return wrapWithDeps(() => {
      if (!key) {
        return false;
      }
      const targetLocale = isString(locale2) ? locale2 : _locale.value;
      const message = getLocaleMessage(targetLocale);
      const resolved = _context.messageResolver(message, key);
      return isMessageAST(resolved) || isMessageFunction(resolved) || isString(resolved);
    }, () => [key], "translate exists", (root) => {
      return Reflect.apply(root.te, root, [key, locale2]);
    }, NOOP_RETURN_FALSE, (val) => isBoolean(val));
  }
  function resolveMessages(key) {
    let messages2 = null;
    const locales = fallbackWithLocaleChain(_context, _fallbackLocale.value, _locale.value);
    for (let i = 0; i < locales.length; i++) {
      const targetLocaleMessages = _messages.value[locales[i]] || {};
      const messageValue = _context.messageResolver(targetLocaleMessages, key);
      if (messageValue != null) {
        messages2 = messageValue;
        break;
      }
    }
    return messages2;
  }
  function tm(key) {
    const messages2 = resolveMessages(key);
    return messages2 != null ? messages2 : __root ? __root.tm(key) || {} : {};
  }
  function getLocaleMessage(locale2) {
    return _messages.value[locale2] || {};
  }
  function setLocaleMessage(locale2, message) {
    if (flatJson) {
      const _message = { [locale2]: message };
      for (const key in _message) {
        if (hasOwn(_message, key)) {
          handleFlatJson(_message[key]);
        }
      }
      message = _message[locale2];
    }
    _messages.value[locale2] = message;
    _context.messages = _messages.value;
  }
  function mergeLocaleMessage(locale2, message) {
    _messages.value[locale2] = _messages.value[locale2] || {};
    const _message = { [locale2]: message };
    if (flatJson) {
      for (const key in _message) {
        if (hasOwn(_message, key)) {
          handleFlatJson(_message[key]);
        }
      }
    }
    message = _message[locale2];
    deepCopy(message, _messages.value[locale2]);
    _context.messages = _messages.value;
  }
  function getDateTimeFormat(locale2) {
    return _datetimeFormats.value[locale2] || {};
  }
  function setDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = format2;
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function mergeDateTimeFormat(locale2, format2) {
    _datetimeFormats.value[locale2] = assign(_datetimeFormats.value[locale2] || {}, format2);
    _context.datetimeFormats = _datetimeFormats.value;
    clearDateTimeFormat(_context, locale2, format2);
  }
  function getNumberFormat(locale2) {
    return _numberFormats.value[locale2] || {};
  }
  function setNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = format2;
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  function mergeNumberFormat(locale2, format2) {
    _numberFormats.value[locale2] = assign(_numberFormats.value[locale2] || {}, format2);
    _context.numberFormats = _numberFormats.value;
    clearNumberFormat(_context, locale2, format2);
  }
  composerID++;
  const composer = {
    id: composerID,
    locale,
    fallbackLocale,
    get inheritLocale() {
      return _inheritLocale;
    },
    set inheritLocale(val) {
      _inheritLocale = val;
      if (val && __root) {
        _locale.value = __root.locale.value;
        _fallbackLocale.value = __root.fallbackLocale.value;
        updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      }
    },
    get availableLocales() {
      return Object.keys(_messages.value).sort();
    },
    messages,
    get modifiers() {
      return _modifiers;
    },
    get pluralRules() {
      return _pluralRules || {};
    },
    get isGlobal() {
      return _isGlobal;
    },
    get missingWarn() {
      return _missingWarn;
    },
    set missingWarn(val) {
      _missingWarn = val;
      _context.missingWarn = _missingWarn;
    },
    get fallbackWarn() {
      return _fallbackWarn;
    },
    set fallbackWarn(val) {
      _fallbackWarn = val;
      _context.fallbackWarn = _fallbackWarn;
    },
    get fallbackRoot() {
      return _fallbackRoot;
    },
    set fallbackRoot(val) {
      _fallbackRoot = val;
    },
    get fallbackFormat() {
      return _fallbackFormat;
    },
    set fallbackFormat(val) {
      _fallbackFormat = val;
      _context.fallbackFormat = _fallbackFormat;
    },
    get warnHtmlMessage() {
      return _warnHtmlMessage;
    },
    set warnHtmlMessage(val) {
      _warnHtmlMessage = val;
      _context.warnHtmlMessage = val;
    },
    get escapeParameter() {
      return _escapeParameter;
    },
    set escapeParameter(val) {
      _escapeParameter = val;
      _context.escapeParameter = val;
    },
    t,
    getLocaleMessage,
    setLocaleMessage,
    mergeLocaleMessage,
    getPostTranslationHandler,
    setPostTranslationHandler,
    getMissingHandler,
    setMissingHandler,
    [SetPluralRulesSymbol]: setPluralRules
  };
  {
    composer.datetimeFormats = datetimeFormats;
    composer.numberFormats = numberFormats;
    composer.rt = rt;
    composer.te = te;
    composer.tm = tm;
    composer.d = d;
    composer.n = n;
    composer.getDateTimeFormat = getDateTimeFormat;
    composer.setDateTimeFormat = setDateTimeFormat;
    composer.mergeDateTimeFormat = mergeDateTimeFormat;
    composer.getNumberFormat = getNumberFormat;
    composer.setNumberFormat = setNumberFormat;
    composer.mergeNumberFormat = mergeNumberFormat;
    composer[InejctWithOptionSymbol] = __injectWithOption;
    composer[TranslateVNodeSymbol] = translateVNode;
    composer[DatetimePartsSymbol] = datetimeParts;
    composer[NumberPartsSymbol] = numberParts;
  }
  return composer;
}
const baseFormatProps = {
  tag: {
    type: [String, Object]
  },
  locale: {
    type: String
  },
  scope: {
    type: String,
    // NOTE: avoid https://github.com/microsoft/rushstack/issues/1050
    validator: (val) => val === "parent" || val === "global",
    default: "parent"
    /* ComponentI18nScope */
  },
  i18n: {
    type: Object
  }
};
function getInterpolateArg({ slots }, keys) {
  if (keys.length === 1 && keys[0] === "default") {
    const ret = slots.default ? slots.default() : [];
    return ret.reduce((slot, current) => {
      return [
        ...slot,
        // prettier-ignore
        ...current.type === Fragment ? current.children : [current]
      ];
    }, []);
  } else {
    return keys.reduce((arg, key) => {
      const slot = slots[key];
      if (slot) {
        arg[key] = slot();
      }
      return arg;
    }, create());
  }
}
function getFragmentableTag() {
  return Fragment;
}
const TranslationImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-t",
  props: assign({
    keypath: {
      type: String,
      required: true
    },
    plural: {
      type: [Number, String],
      validator: (val) => isNumber(val) || !isNaN(val)
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const { slots, attrs } = context;
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return () => {
      const keys = Object.keys(slots).filter((key) => key !== "_");
      const options = create();
      if (props.locale) {
        options.locale = props.locale;
      }
      if (props.plural !== void 0) {
        options.plural = isString(props.plural) ? +props.plural : props.plural;
      }
      const arg = getInterpolateArg(context, keys);
      const children = i18n[TranslateVNodeSymbol](props.keypath, arg, options);
      const assignedAttrs = assign(create(), attrs);
      const tag = isString(props.tag) || isObject(props.tag) ? props.tag : getFragmentableTag();
      return h(tag, assignedAttrs, children);
    };
  }
});
const Translation = TranslationImpl;
function isVNode(target) {
  return isArray(target) && !isString(target[0]);
}
function renderFormatter(props, context, slotKeys, partFormatter) {
  const { slots, attrs } = context;
  return () => {
    const options = { part: true };
    let overrides = create();
    if (props.locale) {
      options.locale = props.locale;
    }
    if (isString(props.format)) {
      options.key = props.format;
    } else if (isObject(props.format)) {
      if (isString(props.format.key)) {
        options.key = props.format.key;
      }
      overrides = Object.keys(props.format).reduce((options2, prop) => {
        return slotKeys.includes(prop) ? assign(create(), options2, { [prop]: props.format[prop] }) : options2;
      }, create());
    }
    const parts = partFormatter(...[props.value, options, overrides]);
    let children = [options.key];
    if (isArray(parts)) {
      children = parts.map((part, index) => {
        const slot = slots[part.type];
        const node = slot ? slot({ [part.type]: part.value, index, parts }) : [part.value];
        if (isVNode(node)) {
          node[0].key = `${part.type}-${index}`;
        }
        return node;
      });
    } else if (isString(parts)) {
      children = [parts];
    }
    const assignedAttrs = assign(create(), attrs);
    const tag = isString(props.tag) || isObject(props.tag) ? props.tag : getFragmentableTag();
    return h(tag, assignedAttrs, children);
  };
}
const NumberFormatImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-n",
  props: assign({
    value: {
      type: Number,
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return renderFormatter(props, context, NUMBER_FORMAT_OPTIONS_KEYS, (...args) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n[NumberPartsSymbol](...args)
    ));
  }
});
const NumberFormat = NumberFormatImpl;
const DatetimeFormatImpl = /* @__PURE__ */ defineComponent({
  /* eslint-disable */
  name: "i18n-d",
  props: assign({
    value: {
      type: [Number, Date],
      required: true
    },
    format: {
      type: [String, Object]
    }
  }, baseFormatProps),
  /* eslint-enable */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setup(props, context) {
    const i18n = props.i18n || useI18n({
      useScope: props.scope,
      __useComponent: true
    });
    return renderFormatter(props, context, DATETIME_FORMAT_OPTIONS_KEYS, (...args) => (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      i18n[DatetimePartsSymbol](...args)
    ));
  }
});
const DatetimeFormat = DatetimeFormatImpl;
function getComposer$1(i18n, instance) {
  const i18nInternal = i18n;
  if (i18n.mode === "composition") {
    return i18nInternal.__getInstance(instance) || i18n.global;
  } else {
    const vueI18n = i18nInternal.__getInstance(instance);
    return vueI18n != null ? vueI18n.__composer : i18n.global.__composer;
  }
}
function vTDirective(i18n) {
  const _process = (binding) => {
    const { instance, value } = binding;
    if (!instance || !instance.$) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const composer = getComposer$1(i18n, instance.$);
    const parsedValue = parseValue(value);
    return [
      Reflect.apply(composer.t, composer, [...makeParams(parsedValue)]),
      composer
    ];
  };
  const register = (el, binding) => {
    const [textContent, composer] = _process(binding);
    el.__composer = composer;
    el.textContent = textContent;
  };
  const unregister = (el) => {
    if (el.__composer) {
      el.__composer = void 0;
      delete el.__composer;
    }
  };
  const update = (el, { value }) => {
    if (el.__composer) {
      const composer = el.__composer;
      const parsedValue = parseValue(value);
      el.textContent = Reflect.apply(composer.t, composer, [
        ...makeParams(parsedValue)
      ]);
    }
  };
  const getSSRProps = (binding) => {
    const [textContent] = _process(binding);
    return { textContent };
  };
  return {
    created: register,
    unmounted: unregister,
    beforeUpdate: update,
    getSSRProps
  };
}
function parseValue(value) {
  if (isString(value)) {
    return { path: value };
  } else if (isPlainObject(value)) {
    if (!("path" in value)) {
      throw createI18nError(I18nErrorCodes.REQUIRED_VALUE, "path");
    }
    return value;
  } else {
    throw createI18nError(I18nErrorCodes.INVALID_VALUE);
  }
}
function makeParams(value) {
  const { path, locale, args, choice, plural } = value;
  const options = {};
  const named = args || {};
  if (isString(locale)) {
    options.locale = locale;
  }
  if (isNumber(choice)) {
    options.plural = choice;
  }
  if (isNumber(plural)) {
    options.plural = plural;
  }
  return [path, named, options];
}
function apply(app, i18n, ...options) {
  const pluginOptions = isPlainObject(options[0]) ? options[0] : {};
  const globalInstall = isBoolean(pluginOptions.globalInstall) ? pluginOptions.globalInstall : true;
  if (globalInstall) {
    [Translation.name, "I18nT"].forEach((name) => app.component(name, Translation));
    [NumberFormat.name, "I18nN"].forEach((name) => app.component(name, NumberFormat));
    [DatetimeFormat.name, "I18nD"].forEach((name) => app.component(name, DatetimeFormat));
  }
  {
    app.directive("t", vTDirective(i18n));
  }
}
const I18nInjectionKey = /* @__PURE__ */ makeSymbol("global-vue-i18n");
function createI18n(options = {}, VueI18nLegacy) {
  const __globalInjection = isBoolean(options.globalInjection) ? options.globalInjection : true;
  const __instances = /* @__PURE__ */ new Map();
  const [globalScope, __global] = createGlobal(options);
  const symbol = /* @__PURE__ */ makeSymbol("");
  function __getInstance(component) {
    return __instances.get(component) || null;
  }
  function __setInstance(component, instance) {
    __instances.set(component, instance);
  }
  function __deleteInstance(component) {
    __instances.delete(component);
  }
  const i18n = {
    // mode
    get mode() {
      return "composition";
    },
    // install plugin
    async install(app, ...options2) {
      app.__VUE_I18N_SYMBOL__ = symbol;
      app.provide(app.__VUE_I18N_SYMBOL__, i18n);
      if (isPlainObject(options2[0])) {
        const opts = options2[0];
        i18n.__composerExtend = opts.__composerExtend;
        i18n.__vueI18nExtend = opts.__vueI18nExtend;
      }
      let globalReleaseHandler = null;
      if (__globalInjection) {
        globalReleaseHandler = injectGlobalFields(app, i18n.global);
      }
      {
        apply(app, i18n, ...options2);
      }
      const unmountApp = app.unmount;
      app.unmount = () => {
        globalReleaseHandler && globalReleaseHandler();
        i18n.dispose();
        unmountApp();
      };
    },
    // global accessor
    get global() {
      return __global;
    },
    dispose() {
      globalScope.stop();
    },
    // @internal
    __instances,
    // @internal
    __getInstance,
    // @internal
    __setInstance,
    // @internal
    __deleteInstance
  };
  return i18n;
}
function useI18n(options = {}) {
  const instance = getCurrentInstance();
  if (instance == null) {
    throw createI18nError(I18nErrorCodes.MUST_BE_CALL_SETUP_TOP);
  }
  if (!instance.isCE && instance.appContext.app != null && !instance.appContext.app.__VUE_I18N_SYMBOL__) {
    throw createI18nError(I18nErrorCodes.NOT_INSTALLED);
  }
  const i18n = getI18nInstance(instance);
  const gl = getGlobalComposer(i18n);
  const componentOptions = getComponentOptions(instance);
  const scope = getScope(options, componentOptions);
  if (scope === "global") {
    adjustI18nResources(gl, options, componentOptions);
    return gl;
  }
  if (scope === "parent") {
    let composer2 = getComposer(i18n, instance, options.__useComponent);
    if (composer2 == null) {
      composer2 = gl;
    }
    return composer2;
  }
  const i18nInternal = i18n;
  let composer = i18nInternal.__getInstance(instance);
  if (composer == null) {
    const composerOptions = assign({}, options);
    if ("__i18n" in componentOptions) {
      composerOptions.__i18n = componentOptions.__i18n;
    }
    if (gl) {
      composerOptions.__root = gl;
    }
    composer = createComposer(composerOptions);
    if (i18nInternal.__composerExtend) {
      composer[DisposeSymbol] = i18nInternal.__composerExtend(composer);
    }
    i18nInternal.__setInstance(instance, composer);
  }
  return composer;
}
function createGlobal(options, legacyMode, VueI18nLegacy) {
  const scope = effectScope();
  const obj = scope.run(() => createComposer(options));
  if (obj == null) {
    throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
  }
  return [scope, obj];
}
function getI18nInstance(instance) {
  const i18n = inject(!instance.isCE ? instance.appContext.app.__VUE_I18N_SYMBOL__ : I18nInjectionKey);
  if (!i18n) {
    throw createI18nError(!instance.isCE ? I18nErrorCodes.UNEXPECTED_ERROR : I18nErrorCodes.NOT_INSTALLED_WITH_PROVIDE);
  }
  return i18n;
}
function getScope(options, componentOptions) {
  return isEmptyObject(options) ? "__i18n" in componentOptions ? "local" : "global" : !options.useScope ? "local" : options.useScope;
}
function getGlobalComposer(i18n) {
  return i18n.mode === "composition" ? i18n.global : i18n.global.__composer;
}
function getComposer(i18n, target, useComponent = false) {
  let composer = null;
  const root = target.root;
  let current = getParentComponentInstance(target, useComponent);
  while (current != null) {
    const i18nInternal = i18n;
    if (i18n.mode === "composition") {
      composer = i18nInternal.__getInstance(current);
    }
    if (composer != null) {
      break;
    }
    if (root === current) {
      break;
    }
    current = current.parent;
  }
  return composer;
}
function getParentComponentInstance(target, useComponent = false) {
  if (target == null) {
    return null;
  }
  return !useComponent ? target.parent : target.vnode.ctx || target.parent;
}
const globalExportProps = [
  "locale",
  "fallbackLocale",
  "availableLocales"
];
const globalExportMethods = ["t", "rt", "d", "n", "tm", "te"];
function injectGlobalFields(app, composer) {
  const i18n = /* @__PURE__ */ Object.create(null);
  globalExportProps.forEach((prop) => {
    const desc = Object.getOwnPropertyDescriptor(composer, prop);
    if (!desc) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    const wrap = isRef(desc.value) ? {
      get() {
        return desc.value.value;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      set(val) {
        desc.value.value = val;
      }
    } : {
      get() {
        return desc.get && desc.get();
      }
    };
    Object.defineProperty(i18n, prop, wrap);
  });
  app.config.globalProperties.$i18n = i18n;
  globalExportMethods.forEach((method) => {
    const desc = Object.getOwnPropertyDescriptor(composer, method);
    if (!desc || !desc.value) {
      throw createI18nError(I18nErrorCodes.UNEXPECTED_ERROR);
    }
    Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
  });
  const dispose = () => {
    delete app.config.globalProperties.$i18n;
    globalExportMethods.forEach((method) => {
      delete app.config.globalProperties[`$${method}`];
    });
  };
  return dispose;
}
registerMessageCompiler(compile);
registerMessageResolver(resolveValue);
registerLocaleFallbacker(fallbackWithLocaleChain);
function useLocaleHead({
  dir = true,
  lang = true,
  seo = true,
  key = "hid"
} = {}) {
  return wrapComposable(_useLocaleHead)({ dir, lang, seo, key });
}
function useRouteBaseName() {
  return wrapComposable(getRouteBaseName);
}
function useLocalePath() {
  return wrapComposable(localePath);
}
function useLocaleRoute() {
  return wrapComposable(localeRoute);
}
function useLocaleLocation() {
  return wrapComposable(localeRoute);
}
function useSwitchLocalePath() {
  return wrapComposable(switchLocalePath);
}
const switch_locale_path_ssr_NflG9_QeVcJ1jVig0vCfxB_cZhpEMQ9U2ujRUiYbbVw = /* @__PURE__ */ defineNuxtPlugin({
  name: "i18n:plugin:switch-locale-path-ssr",
  dependsOn: ["i18n:plugin"],
  setup(_nuxt) {
    const nuxt = useNuxtApp(_nuxt._id);
    if (nuxt.$config.public.i18n.experimental.switchLocalePathLinkSSR !== true) return;
    const switchLocalePath2 = useSwitchLocalePath();
    const switchLocalePathLinkWrapperExpr = new RegExp(
      [
        `<!--${SWITCH_LOCALE_PATH_LINK_IDENTIFIER}-\\[(\\w+)\\]-->`,
        `.+?`,
        `<!--/${SWITCH_LOCALE_PATH_LINK_IDENTIFIER}-->`
      ].join(""),
      "g"
    );
    nuxt.hook("app:rendered", (ctx) => {
      if (ctx.renderResult?.html == null) return;
      ctx.renderResult.html = ctx.renderResult.html.replaceAll(
        switchLocalePathLinkWrapperExpr,
        (match, p1) => match.replace(/href="([^"]+)"/, `href="${encodeURI(switchLocalePath2(p1 ?? ""))}"`)
      );
    });
  }
});
const route_locale_detect__HPHJq3Jg7gwhwgKEI8tQavopSAjmrCSPXl9HgL2h9U = /* @__PURE__ */ defineNuxtPlugin({
  name: "i18n:plugin:route-locale-detect",
  dependsOn: ["i18n:plugin"],
  async setup(_nuxt) {
    let __temp, __restore;
    const nuxt = useNuxtApp(_nuxt._id);
    const currentRoute = nuxt.$router.currentRoute;
    async function handleRouteDetect(to) {
      let detected = detectLocale(
        nuxt,
        to,
        nuxt._vueI18n.__localeFromRoute(to),
        unref(nuxt.$i18n.locale),
        nuxt.$i18n.getLocaleCookie()
      );
      if (nuxt._vueI18n.__firstAccess) {
        nuxt._vueI18n.__setLocale(detected);
        const fallbackLocales = makeFallbackLocaleCodes(unref(nuxt._vueI18n.global.fallbackLocale), [detected]);
        await Promise.all(fallbackLocales.map((x) => nuxt.$i18n.loadLocaleMessages(x)));
        await nuxt.$i18n.loadLocaleMessages(detected);
      }
      const modified = await nuxt.runWithContext(() => loadAndSetLocale(nuxt, detected, nuxt._vueI18n.__firstAccess));
      if (modified) {
        detected = unref(nuxt.$i18n.locale);
      }
      return detected;
    }
    [__temp, __restore] = executeAsync(() => handleRouteDetect(currentRoute.value)), await __temp, __restore();
    const localeChangeMiddleware = /* @__PURE__ */ defineNuxtRouteMiddleware(async (to, from) => {
      let __temp2, __restore2;
      const locale = ([__temp2, __restore2] = executeAsync(() => nuxt.runWithContext(() => handleRouteDetect(to))), __temp2 = await __temp2, __restore2(), __temp2);
      const redirectPath = ([__temp2, __restore2] = executeAsync(() => nuxt.runWithContext(
        () => detectRedirect({ to, nuxtApp: nuxt, from, locale, routeLocale: nuxt._vueI18n.__localeFromRoute(to) }, true)
      )), __temp2 = await __temp2, __restore2(), __temp2);
      nuxt._vueI18n.__firstAccess = false;
      return [__temp2, __restore2] = executeAsync(() => nuxt.runWithContext(() => navigate({ nuxt, redirectPath, locale, route: to }))), __temp2 = await __temp2, __restore2(), __temp2;
    });
    addRouteMiddleware("locale-changing", localeChangeMiddleware, { global: true });
  }
});
function extendI18n(i18n, { extendComposer, extendComposerInstance }) {
  const scope = effectScope();
  const installI18n = i18n.install.bind(i18n);
  i18n.install = (app, ...options) => {
    const pluginOptions = assign({}, options[0]);
    pluginOptions.__composerExtend = (c) => {
      extendComposerInstance(c, getComposer$3(i18n));
      return () => {
      };
    };
    if (i18n.mode === "legacy") {
      pluginOptions.__vueI18nExtend = (vueI18n) => {
        extendComposerInstance(vueI18n, getComposer$3(vueI18n));
        return () => {
        };
      };
    }
    Reflect.apply(installI18n, i18n, [app, pluginOptions]);
    const globalComposer = getComposer$3(i18n);
    scope.run(() => {
      extendComposer(globalComposer);
      if (i18n.mode === "legacy" && isVueI18n(i18n.global)) {
        extendComposerInstance(i18n.global, getComposer$3(i18n.global));
      }
    });
    if (i18n.mode === "composition" && app.config.globalProperties.$i18n != null) {
      extendComposerInstance(app.config.globalProperties.$i18n, globalComposer);
    }
    if (app.unmount) {
      const unmountApp = app.unmount.bind(app);
      app.unmount = () => {
        scope.stop();
        unmountApp();
      };
    }
  };
}
const i18n_EI7LsD1KYQADczz5hrChviGQCdVM8yUkvFEZLJpmnvM = /* @__PURE__ */ defineNuxtPlugin({
  name: "i18n:plugin",
  parallel: parallelPlugin,
  async setup(_nuxt) {
    let __temp, __restore;
    const nuxt = useNuxtApp(_nuxt._id);
    Object.defineProperty(_nuxt.versions, "nuxtI18n", { get: () => "9.5.6" });
    const _runtimeI18n = nuxt.$config.public.i18n;
    const defaultLocaleDomain = getDefaultLocaleForDomain(_runtimeI18n);
    setupMultiDomainLocales(_runtimeI18n, defaultLocaleDomain);
    nuxt.$config.public.i18n.defaultLocale = defaultLocaleDomain;
    const runtimeI18n = {
      ..._runtimeI18n,
      defaultLocale: defaultLocaleDomain,
      baseUrl: extendBaseUrl(nuxt)
    };
    const vueI18nOptions = ([__temp, __restore] = executeAsync(() => loadVueI18nOptions(vueI18nConfigs, useNuxtApp())), __temp = await __temp, __restore(), __temp);
    vueI18nOptions.messages ||= {};
    vueI18nOptions.fallbackLocale ??= false;
    if (defaultLocaleDomain) {
      vueI18nOptions.locale = defaultLocaleDomain;
    }
    for (const l of localeCodes) {
      vueI18nOptions.messages[l] ??= {};
    }
    const i18n = createI18n(vueI18nOptions);
    nuxt._vueI18n = i18n;
    i18n.__localeFromRoute = createLocaleFromRouteGetter();
    i18n.__firstAccess = true;
    i18n.__setLocale = (locale) => {
      const i = getI18nTarget(i18n);
      if (isRef(i.locale)) {
        i.locale.value = locale;
      } else {
        i.locale = locale;
      }
    };
    const localeCookie = createI18nCookie();
    const detectBrowserOptions = runtimeDetectBrowserLanguage();
    extendI18n(i18n, {
      extendComposer(composer) {
        const _locales = ref(runtimeI18n.locales);
        composer.locales = computed(() => _locales.value);
        const _localeCodes = ref(localeCodes);
        composer.localeCodes = computed(() => _localeCodes.value);
        const _baseUrl = ref(runtimeI18n.baseUrl());
        composer.baseUrl = computed(() => _baseUrl.value);
        composer.strategy = runtimeI18n.strategy;
        composer.localeProperties = computed(
          () => normalizedLocales.find((l) => l.code === composer.locale.value) || { code: composer.locale.value }
        );
        composer.setLocale = async (locale) => {
          await loadAndSetLocale(nuxt, locale, i18n.__firstAccess);
          if (composer.strategy === "no_prefix" || false) {
            await composer.loadLocaleMessages(locale);
            i18n.__setLocale(locale);
            return;
          }
          const route = nuxt.$router.currentRoute.value;
          const redirectPath = await nuxt.runWithContext(
            () => detectRedirect({ to: route, nuxtApp: nuxt, locale, routeLocale: i18n.__localeFromRoute(route) })
          );
          await nuxt.runWithContext(() => navigate({ nuxt, redirectPath, locale, route }, true));
        };
        composer.loadLocaleMessages = async (locale) => await loadLocale(locale, localeLoaders, composer.mergeLocaleMessage.bind(composer), nuxt);
        composer.differentDomains = runtimeI18n.differentDomains;
        composer.defaultLocale = runtimeI18n.defaultLocale;
        composer.getBrowserLocale = () => getBrowserLocale();
        composer.getLocaleCookie = () => getLocaleCookie(localeCookie, detectBrowserOptions, composer.defaultLocale);
        composer.setLocaleCookie = (locale) => {
          if (!detectBrowserOptions || !detectBrowserOptions.useCookie) return;
          localeCookie.value = locale;
        };
        composer.onBeforeLanguageSwitch = (oldLocale, newLocale, initialSetup, context) => nuxt.callHook("i18n:beforeLocaleSwitch", {
          oldLocale,
          newLocale,
          initialSetup,
          context
        });
        composer.onLanguageSwitched = (oldLocale, newLocale) => nuxt.callHook("i18n:localeSwitched", { oldLocale, newLocale });
        composer.finalizePendingLocaleChange = async () => {
          if (!i18n.__pendingLocale) return;
          i18n.__setLocale(i18n.__pendingLocale);
          i18n.__resolvePendingLocalePromise?.();
          i18n.__pendingLocale = void 0;
        };
        composer.waitForPendingLocaleChange = async () => {
          if (i18n.__pendingLocale && i18n.__pendingLocalePromise) {
            await i18n.__pendingLocalePromise;
          }
        };
      },
      extendComposerInstance(instance, c) {
        const props = [
          ["locales", () => c.locales],
          ["localeCodes", () => c.localeCodes],
          ["baseUrl", () => c.baseUrl],
          ["strategy", () => c.strategy],
          ["localeProperties", () => c.localeProperties],
          ["setLocale", () => async (locale) => Reflect.apply(c.setLocale, c, [locale])],
          ["loadLocaleMessages", () => async (locale) => Reflect.apply(c.loadLocaleMessages, c, [locale])],
          ["differentDomains", () => c.differentDomains],
          ["defaultLocale", () => c.defaultLocale],
          ["getBrowserLocale", () => () => Reflect.apply(c.getBrowserLocale, c, [])],
          ["getLocaleCookie", () => () => Reflect.apply(c.getLocaleCookie, c, [])],
          ["setLocaleCookie", () => (locale) => Reflect.apply(c.setLocaleCookie, c, [locale])],
          [
            "onBeforeLanguageSwitch",
            () => (oldLocale, newLocale, initialSetup, context) => Reflect.apply(c.onBeforeLanguageSwitch, c, [oldLocale, newLocale, initialSetup, context])
          ],
          [
            "onLanguageSwitched",
            () => (oldLocale, newLocale) => Reflect.apply(c.onLanguageSwitched, c, [oldLocale, newLocale])
          ],
          ["finalizePendingLocaleChange", () => () => Reflect.apply(c.finalizePendingLocaleChange, c, [])],
          ["waitForPendingLocaleChange", () => () => Reflect.apply(c.waitForPendingLocaleChange, c, [])]
        ];
        for (const [key, get] of props) {
          Object.defineProperty(instance, key, { get });
        }
      }
    });
    nuxt.vueApp.use(i18n);
    Object.defineProperty(nuxt, "$i18n", { get: () => getI18nTarget(i18n) });
    return {
      provide: {
        /**
         * TODO: remove type assertions while type narrowing based on generated types
         */
        localeHead: wrapComposable(localeHead),
        localePath: useLocalePath(),
        localeRoute: useLocaleRoute(),
        getRouteBaseName: useRouteBaseName(),
        switchLocalePath: useSwitchLocalePath(),
        // TODO: remove in v10
        resolveRoute: wrapComposable(resolveRoute),
        // TODO: remove in v10
        localeLocation: useLocaleLocation()
      }
    };
  }
});
const components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4 = /* @__PURE__ */ defineNuxtPlugin({
  name: "nuxt:global-components"
});
const plugin_75c5JB2dypWkszlGRvY60nSlGsfjcTznvhVler6Mq2M = /* @__PURE__ */ defineNuxtPlugin(async (nuxtApp) => {
  let __temp, __restore;
  const { applicationId, apiKey, lite, recommend, cache: cache2 } = (/* @__PURE__ */ useRuntimeConfig()).public.algolia;
  const algoliasearch = lite ? ([__temp, __restore] = executeAsync(() => import('../_/algoliasearch-lite.esm.browser.mjs').then((lib) => lib.default || lib)), __temp = await __temp, __restore(), __temp) : ([__temp, __restore] = executeAsync(() => import('../_/algoliasearch.esm.browser.mjs').then((lib) => lib.default || lib)), __temp = await __temp, __restore(), __temp);
  const algoliaSearchClient = cache2 ? algoliasearch(applicationId, apiKey, { responsesCache: createInMemoryCache(), requestsCache: createInMemoryCache({ serializable: false }), requester: createFetchRequester() }) : algoliasearch(applicationId, apiKey, { requester: createFetchRequester() });
  nuxtApp.provide("algolia", algoliaSearchClient);
  if (recommend) {
    const algoliaRecommend = ([__temp, __restore] = executeAsync(() => import('../_/recommend.esm.browser.mjs').then((lib) => lib.default || lib)), __temp = await __temp, __restore(), __temp);
    nuxtApp.provide("algoliaRecommend", algoliaRecommend(applicationId, apiKey));
  }
});
const useAccount = () => {
  const account = useState("account", () => null);
  const loaded = useState("account:loaded", () => false);
  const refresh = async () => {
    const fetcher = useRequestFetch();
    try {
      const res = await fetcher("/api/auth/session");
      account.value = res?.account || null;
    } catch {
      account.value = null;
    }
    loaded.value = true;
  };
  const login = async (body) => {
    const res = await $fetch("/api/auth/login", { method: "POST", body });
    account.value = res.account;
  };
  const register = async (body) => {
    const res = await $fetch("/api/auth/register", { method: "POST", body });
    account.value = res.account;
  };
  const logout = async () => {
    await $fetch("/api/auth/logout", { method: "POST" });
    account.value = null;
    await navigateTo("/");
  };
  const initials = computed(() => ((account.value?.first_name?.[0] || "") + (account.value?.last_name?.[0] || "")).toUpperCase() || account.value?.email?.[0]?.toUpperCase() || "");
  return { account, loaded, isLoggedIn: computed(() => !!account.value), initials, refresh, login, register, logout };
};
const account_GQ9pbSg2xwOWEDYtlOJa5VYjE__OBzQtg_fK7hCLXCw = /* @__PURE__ */ defineNuxtPlugin(async () => {
  let __temp, __restore;
  const { loaded, refresh } = useAccount();
  if (!loaded.value) [__temp, __restore] = executeAsync(() => refresh()), __temp = await __temp, __restore();
});
const ssg_detect_IpHCGcQQ_IR5Rl99qyukWoMA9fJGfuTYyoksTzy81cs = /* @__PURE__ */ defineNuxtPlugin({
  name: "i18n:plugin:ssg-detect",
  dependsOn: ["i18n:plugin", "i18n:plugin:route-locale-detect"],
  enforce: "post",
  setup(_nuxt) {
    useNuxtApp(_nuxt._id);
    return;
  }
});
const plugins = [
  unhead_k2P3m_ZDyjlr2mMYnoDPwavjsDN8hBlk9cFai0bbopU,
  plugin,
  revive_payload_server_MVtmlZaQpj6ApFmshWfUWl5PehCebzaBf2NuRMiIbms,
  switch_locale_path_ssr_NflG9_QeVcJ1jVig0vCfxB_cZhpEMQ9U2ujRUiYbbVw,
  route_locale_detect__HPHJq3Jg7gwhwgKEI8tQavopSAjmrCSPXl9HgL2h9U,
  i18n_EI7LsD1KYQADczz5hrChviGQCdVM8yUkvFEZLJpmnvM,
  components_plugin_z4hgvsiddfKkfXTP6M8M4zG5Cb7sGnDhcryKVM45Di4,
  plugin_75c5JB2dypWkszlGRvY60nSlGsfjcTznvhVler6Mq2M,
  account_GQ9pbSg2xwOWEDYtlOJa5VYjE__OBzQtg_fK7hCLXCw,
  ssg_detect_IpHCGcQQ_IR5Rl99qyukWoMA9fJGfuTYyoksTzy81cs
];
const _imports_0 = "" + __buildAssetsURL("logo-gameszone.Cjigth4s.svg");
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$8 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: "app-loader",
    role: "status",
    "aria-live": "polite"
  }, _attrs))} data-v-4c94355b><img${ssrRenderAttr("src", _imports_0)} alt="" class="logo" width="72" height="78" data-v-4c94355b><span class="progress" aria-hidden="true" data-v-4c94355b><span class="bar" data-v-4c94355b></span></span><span class="visually-hidden" data-v-4c94355b>${ssrInterpolate(_ctx.$t("loader.ready"))}</span></div>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AppLoader.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-4c94355b"]]);
function defaultEstimatedProgress(duration, elapsed) {
  const completionPercentage = elapsed / duration * 100;
  return 2 / Math.PI * 100 * Math.atan(completionPercentage / 50);
}
function createLoadingIndicator(opts = {}) {
  const { duration = 2e3, throttle = 200, hideDelay = 500, resetDelay = 400 } = opts;
  opts.estimatedProgress || defaultEstimatedProgress;
  const nuxtApp = useNuxtApp();
  const progress = shallowRef(0);
  const isLoading = shallowRef(false);
  const error = shallowRef(false);
  const start = (opts2 = {}) => {
    error.value = false;
    set(0, opts2);
  };
  function set(at = 0, opts2 = {}) {
    if (nuxtApp.isHydrating) {
      return;
    }
    if (at >= 100) {
      return finish({ force: opts2.force });
    }
    progress.value = at < 0 ? 0 : at;
    opts2.force ? 0 : throttle;
    {
      isLoading.value = true;
    }
  }
  function finish(opts2 = {}) {
    progress.value = 100;
    if (opts2.error) {
      error.value = true;
    }
    if (opts2.force) {
      progress.value = 0;
      isLoading.value = false;
    }
  }
  function clear() {
  }
  let _cleanup = () => {
  };
  return {
    _cleanup,
    progress: computed(() => progress.value),
    isLoading: computed(() => isLoading.value),
    error: computed(() => error.value),
    start,
    set,
    finish,
    clear
  };
}
function useLoadingIndicator(opts = {}) {
  const nuxtApp = useNuxtApp();
  const indicator = nuxtApp._loadingIndicator ||= createLoadingIndicator(opts);
  return indicator;
}
const __nuxt_component_1$3 = defineComponent({
  name: "NuxtLoadingIndicator",
  props: {
    throttle: {
      type: Number,
      default: 200
    },
    duration: {
      type: Number,
      default: 2e3
    },
    hideDelay: {
      type: Number,
      default: 500
    },
    resetDelay: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 3
    },
    color: {
      type: [String, Boolean],
      default: "repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)"
    },
    errorColor: {
      type: String,
      default: "repeating-linear-gradient(to right,#f87171 0%,#ef4444 100%)"
    },
    estimatedProgress: {
      type: Function,
      required: false
    }
  },
  setup(props, { slots, expose }) {
    const { progress, isLoading, error, start, finish, clear } = useLoadingIndicator({
      duration: props.duration,
      throttle: props.throttle,
      hideDelay: props.hideDelay,
      resetDelay: props.resetDelay,
      estimatedProgress: props.estimatedProgress
    });
    expose({
      progress,
      isLoading,
      error,
      start,
      finish,
      clear
    });
    return () => h("div", {
      class: "nuxt-loading-indicator",
      style: {
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        pointerEvents: "none",
        width: "auto",
        height: `${props.height}px`,
        opacity: isLoading.value ? 1 : 0,
        background: error.value ? props.errorColor : props.color || void 0,
        backgroundSize: `${progress.value > 0 ? 100 / progress.value * 100 : 0}% auto`,
        transform: `scaleX(${progress.value}%)`,
        transformOrigin: "left",
        transition: "transform 0.1s, height 0.4s, opacity 0.4s",
        zIndex: 999999
      }
    }, slots);
  }
});
const layouts = {
  utility: defineAsyncComponent(() => import('./utility-IhRsMocA.mjs').then((m) => m.default || m))
};
const routeRulesMatcher = _routeRulesMatcher;
const LayoutLoader = defineComponent({
  name: "LayoutLoader",
  inheritAttrs: false,
  props: {
    name: String,
    layoutProps: Object
  },
  setup(props, context) {
    return () => h(layouts[props.name], props.layoutProps, context.slots);
  }
});
const nuxtLayoutProps = {
  name: {
    type: [String, Boolean, Object],
    default: null
  },
  fallback: {
    type: [String, Object],
    default: null
  }
};
const __nuxt_component_2 = defineComponent({
  name: "NuxtLayout",
  inheritAttrs: false,
  props: nuxtLayoutProps,
  setup(props, context) {
    const nuxtApp = useNuxtApp();
    const injectedRoute = inject(PageRouteSymbol);
    const shouldUseEagerRoute = !injectedRoute || injectedRoute === useRoute();
    const route = shouldUseEagerRoute ? useRoute$1() : injectedRoute;
    const layout = computed(() => {
      let layout2 = unref(props.name) ?? route?.meta.layout ?? routeRulesMatcher(route?.path).appLayout ?? "default";
      if (layout2 && !(layout2 in layouts)) {
        if (props.fallback) {
          layout2 = unref(props.fallback);
        }
      }
      return layout2;
    });
    const layoutRef = shallowRef();
    context.expose({ layoutRef });
    const done = nuxtApp.deferHydration();
    let lastLayout;
    return () => {
      const hasLayout = layout.value && layout.value in layouts;
      const transitionProps = route?.meta.layoutTransition ?? appLayoutTransition;
      const previouslyRenderedLayout = lastLayout;
      lastLayout = layout.value;
      return _wrapInTransition(hasLayout && transitionProps, {
        default: () => h(Suspense, { suspensible: true, onResolve: () => {
          nextTick(done);
        } }, {
          default: () => h(
            LayoutProvider,
            {
              layoutProps: mergeProps(context.attrs, route.meta.layoutProps ?? {}, { ref: layoutRef }),
              key: layout.value || void 0,
              name: layout.value,
              shouldProvide: !props.name,
              isRenderingNewLayout: (name) => {
                return name !== previouslyRenderedLayout && name === layout.value;
              },
              hasTransition: !!transitionProps
            },
            context.slots
          )
        })
      }).default();
    };
  }
});
const LayoutProvider = defineComponent({
  name: "NuxtLayoutProvider",
  inheritAttrs: false,
  props: {
    name: {
      type: [String, Boolean]
    },
    layoutProps: {
      type: Object
    },
    hasTransition: {
      type: Boolean
    },
    shouldProvide: {
      type: Boolean
    },
    isRenderingNewLayout: {
      type: Function,
      required: true
    }
  },
  setup(props, context) {
    const name = props.name;
    if (props.shouldProvide) {
      provide(LayoutMetaSymbol, {
        // When name=false, always return true so NuxtPage doesn't skip rendering
        isCurrent: (route) => name === false || name === (route.meta.layout ?? routeRulesMatcher(route.path).appLayout ?? "default")
      });
    }
    const injectedRoute = inject(PageRouteSymbol);
    const isNotWithinNuxtPage = injectedRoute && injectedRoute === useRoute();
    if (isNotWithinNuxtPage) {
      const vueRouterRoute = useRoute$1();
      const reactiveChildRoute = {};
      for (const _key in vueRouterRoute) {
        const key = _key;
        Object.defineProperty(reactiveChildRoute, key, {
          enumerable: true,
          get: () => {
            return props.isRenderingNewLayout(props.name) ? vueRouterRoute[key] : injectedRoute[key];
          }
        });
      }
      provide(PageRouteSymbol, shallowReactive(reactiveChildRoute));
    }
    return () => {
      if (!name || typeof name === "string" && !(name in layouts)) {
        return context.slots.default?.();
      }
      return h(
        LayoutLoader,
        { key: name, layoutProps: props.layoutProps, name },
        context.slots
      );
    };
  }
});
const defineRouteProvider = (name = "RouteProvider") => defineComponent({
  name,
  props: {
    route: {
      type: Object,
      required: true
    },
    vnode: Object,
    vnodeRef: Object,
    renderKey: String,
    trackRootNodes: Boolean
  },
  setup(props) {
    const previousKey = props.renderKey;
    const previousRoute = props.route;
    const route = {};
    for (const key in props.route) {
      Object.defineProperty(route, key, {
        get: () => previousKey === props.renderKey ? props.route[key] : previousRoute[key],
        enumerable: true
      });
    }
    provide(PageRouteSymbol, shallowReactive(route));
    return () => {
      if (!props.vnode) {
        return props.vnode;
      }
      return h(props.vnode, { ref: props.vnodeRef });
    };
  }
});
const RouteProvider = defineRouteProvider();
const __nuxt_component_0 = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs, slots, expose }) {
    const nuxtApp = useNuxtApp();
    const pageRef = ref();
    inject(PageRouteSymbol, null);
    expose({ pageRef });
    inject(LayoutMetaSymbol, null);
    nuxtApp.deferHydration();
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          return h(Suspense, { suspensible: true }, {
            default() {
              return h(RouteProvider, {
                vnode: slots.default ? normalizeSlot(slots.default, routeProps) : routeProps.Component,
                route: routeProps.route,
                vnodeRef: pageRef
              });
            }
          });
        }
      });
    };
  }
});
function normalizeSlot(slot, data) {
  const slotContent = slot(data);
  return slotContent.length === 1 ? h(slotContent[0]) : h(Fragment, void 0, slotContent);
}
const ONLINE_METHOD_ID = "online";
const CURRENCY_SYMBOLS = { EUR: "€", USD: "$" };
const toForeignAmount = (totalDzd, rate) => Math.ceil(totalDzd / rate * 100) / 100;
const MANUAL_METHODS = [
  {
    id: "baridimob",
    title: "BaridiMob",
    icon: "fa-solid fa-mobile-screen-button",
    logo: "/images/payments/algerie-poste.svg",
    fields: [
      { label: "payment.fieldRip", value: "00799999004110763497", copy: true }
    ]
  },
  {
    id: "ccp",
    title: "CCP",
    icon: "fa-solid fa-building-columns",
    logo: "/images/payments/algerie-poste.svg",
    fields: [
      { label: "payment.fieldAccount", value: "41107634", copy: true },
      { label: "payment.fieldKey", value: "79", copy: true },
      { label: "payment.fieldHolder", value: "AHMANE MOHAMED" },
      { label: "payment.fieldAddress", value: "Alger Centre" }
    ]
  },
  {
    id: "binance",
    title: "Binance Pay",
    icon: "fa-brands fa-bitcoin",
    logo: "/images/payments/binance.svg",
    currency: "USD",
    fields: [
      { label: "payment.fieldBinanceId", value: "140131310", copy: true }
    ]
  },
  {
    id: "redotpay",
    title: "RedotPay",
    icon: "fa-solid fa-wallet",
    logo: "/images/payments/redotpay.png",
    currency: "USD",
    fields: [
      { label: "payment.fieldRedotpayId", value: "1618386065", copy: true }
    ]
  },
  {
    id: "iban",
    title: "IBAN (EUR)",
    icon: "fa-solid fa-euro-sign",
    currency: "EUR",
    fields: [
      { label: "payment.fieldHolder", value: "AYMEN AMARI" },
      { label: "payment.fieldIban", value: "BE54 9672 9434 0297", copy: true }
    ]
  }
];
const PAY_METHODS = [
  { title: "CIB / Edahabia", icon: "fa-regular fa-credit-card", instant: true },
  ...MANUAL_METHODS.map((m) => ({ title: m.title, icon: m.icon, logo: m.logo }))
];
const findManualMethod = (id) => MANUAL_METHODS.find((m) => m.id === id);
const PROOF_ACCEPT = "image/jpeg,image/png,image/webp,application/pdf";
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "PaymentLogos",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<ul${ssrRenderAttrs(mergeProps({
        class: "pay-logos",
        "aria-label": _ctx.$t("footer.payments")
      }, _attrs))} data-v-f1fb8fc6><!--[-->`);
      ssrRenderList("PAY_METHODS" in _ctx ? _ctx.PAY_METHODS : unref(PAY_METHODS), (m) => {
        _push(`<li class="pay-logo" data-v-f1fb8fc6>`);
        if (m.logo) {
          _push(`<img${ssrRenderAttr("src", m.logo)} alt="" loading="lazy" decoding="async" data-v-f1fb8fc6>`);
        } else {
          _push(`<i class="${ssrRenderClass(m.icon)}" aria-hidden="true" data-v-f1fb8fc6></i>`);
        }
        _push(`<span data-v-f1fb8fc6>${ssrInterpolate(m.title)}</span></li>`);
      });
      _push(`<!--]--></ul>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PaymentLogos.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_1$2 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-f1fb8fc6"]]);
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "LanguageSwitcher",
  __ssrInlineRender: true,
  setup(__props) {
    const { locale, locales, setLocale, t } = useI18n();
    const current = computed(() => locales.value.find((l) => l.code === locale.value));
    const uid = useId();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<label${ssrRenderAttrs(mergeProps({
        class: "lang-switch",
        lang: unref(current).code,
        title: unref(t)("lang.switch")
      }, _attrs))} data-v-68c46383>`);
      if (unref(current).code === "ar") {
        _push(`<svg class="flag" viewBox="0 0 900 600" aria-hidden="true" data-v-68c46383><rect width="450" height="600" style="${ssrRenderStyle({ "fill": "#006233" })}" data-v-68c46383></rect><rect x="450" width="450" height="600" style="${ssrRenderStyle({ "fill": "#fff" })}" data-v-68c46383></rect><path style="${ssrRenderStyle({ "fill": "#d21034" })}" d="M579.904 225a150 150 0 1 0 0 150 120 120 0 1 1 0-150M585.675 300 450 255.917l83.852 115.412V228.671L450 344.083z" data-v-68c46383></path></svg>`);
      } else if (unref(current).code === "en") {
        _push(`<svg class="flag" viewBox="0 0 60 30" preserveAspectRatio="xMidYMid slice" aria-hidden="true" data-v-68c46383><clipPath${ssrRenderAttr("id", `${unref(uid)}-t`)} data-v-68c46383><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" data-v-68c46383></path></clipPath><rect width="60" height="30" style="${ssrRenderStyle({ "fill": "#012169" })}" data-v-68c46383></rect><path d="M0 0l60 30m0-30L0 30" style="${ssrRenderStyle({ "fill": "none", "stroke": "#fff", "stroke-width": "6" })}" data-v-68c46383></path><path d="M0 0l60 30m0-30L0 30"${ssrRenderAttr("clip-path", `url(#${unref(uid)}-t)`)} style="${ssrRenderStyle({ "fill": "none", "stroke": "#c8102e", "stroke-width": "4" })}" data-v-68c46383></path><path d="M30 0v30M0 15h60" style="${ssrRenderStyle({ "fill": "none", "stroke": "#fff", "stroke-width": "10" })}" data-v-68c46383></path><path d="M30 0v30M0 15h60" style="${ssrRenderStyle({ "fill": "none", "stroke": "#c8102e", "stroke-width": "6" })}" data-v-68c46383></path></svg>`);
      } else {
        _push(`<svg class="flag" viewBox="0 0 3 2" aria-hidden="true" data-v-68c46383><rect width="1" height="2" style="${ssrRenderStyle({ "fill": "#0055a4" })}" data-v-68c46383></rect><rect x="1" width="1" height="2" style="${ssrRenderStyle({ "fill": "#fff" })}" data-v-68c46383></rect><rect x="2" width="1" height="2" style="${ssrRenderStyle({ "fill": "#ef4135" })}" data-v-68c46383></rect></svg>`);
      }
      _push(`<span aria-hidden="true" data-v-68c46383>${ssrInterpolate(unref(current).name)}</span><i class="fa-solid fa-chevron-down caret" aria-hidden="true" data-v-68c46383></i><select${ssrRenderAttr("value", unref(locale))}${ssrRenderAttr("aria-label", unref(t)("lang.switch"))} data-v-68c46383><!--[-->`);
      ssrRenderList(unref(locales), (l) => {
        _push(`<option${ssrRenderAttr("value", l.code)}${ssrRenderAttr("lang", l.code)} data-v-68c46383>${ssrInterpolate(l.name)}</option>`);
      });
      _push(`<!--]--></select></label>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LanguageSwitcher.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-68c46383"]]);
const CONTACT = {
  phone: "0562 77 47 67",
  // as displayed
  tel: "+213562774767",
  // for tel: links
  whatsapp: "213562774767",
  // for wa.me links
  email: "gzonedz@gmail.com"
};
const SOCIALS = [
  { name: "Instagram", handle: "@gameszoone", url: "https://www.instagram.com/gameszoone", icon: "fa-instagram" },
  { name: "Facebook", handle: "GamesZone", url: "https://www.facebook.com/profile.php?id=61556425287532", icon: "fa-facebook-f" },
  { name: "TikTok", handle: "@gmaszoone", url: "https://www.tiktok.com/@gmaszoone", icon: "fa-tiktok" }
];
const whatsappLink = (message) => `https://wa.me/${CONTACT.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "Footer",
  __ssrInlineRender: true,
  setup(__props) {
    const shopLinks = [
      { label: "menu.games", to: "/shop?category=815" },
      { label: "menu.consoles", to: "/shop?category=821" },
      { label: "menu.used", to: "/shop?category=854" },
      { label: "menu.accessories", to: "/shop?category=829" },
      { label: "menu.digital", to: "/shop?category=844" },
      { label: "menu.retro", to: "/shop?category=2714" }
    ];
    const promises = [
      { icon: "fa-regular fa-envelope", label: "header.stripEmail" },
      { icon: "fa-solid fa-lock", label: "header.stripPay" },
      { icon: "fa-solid fa-shield-halved", label: "cart.certified" }
    ];
    const { isLoggedIn } = useAccount();
    const year = (/* @__PURE__ */ new Date()).getFullYear();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_2$1;
      const _component_PaymentLogos = __nuxt_component_1$2;
      const _component_LanguageSwitcher = __nuxt_component_1$1;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "gs-footer" }, _attrs))} data-v-b52e5106><div class="footer-promises" data-v-b52e5106><ul class="container promises-list" data-v-b52e5106><!--[-->`);
      ssrRenderList(promises, (p) => {
        _push(`<li data-v-b52e5106><span class="promise-icon" aria-hidden="true" data-v-b52e5106><i class="${ssrRenderClass(p.icon)}" data-v-b52e5106></i></span> ${ssrInterpolate(_ctx.$t(p.label))}</li>`);
      });
      _push(`<!--]--><li data-v-b52e5106><a${ssrRenderAttr("href", ("whatsappLink" in _ctx ? _ctx.whatsappLink : unref(whatsappLink))())} target="_blank" rel="noopener" class="promise-link" data-v-b52e5106><span class="promise-icon" aria-hidden="true" data-v-b52e5106><i class="fa-brands fa-whatsapp" data-v-b52e5106></i></span> ${ssrInterpolate(_ctx.$t("footer.whatsapp"))}</a></li></ul></div><div class="container" data-v-b52e5106><div class="footer-main" data-v-b52e5106><section class="footer-brand" data-v-b52e5106>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: "footer-logo",
        "aria-label": "GamesZone"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<img${ssrRenderAttr("src", _imports_0)} alt="" width="37" height="40" data-v-b52e5106${_scopeId}><span aria-hidden="true" data-v-b52e5106${_scopeId}>Games<b data-v-b52e5106${_scopeId}>Zone</b></span>`);
          } else {
            return [
              createVNode("img", {
                src: _imports_0,
                alt: "",
                width: "37",
                height: "40"
              }),
              createVNode("span", { "aria-hidden": "true" }, [
                createTextVNode("Games"),
                createVNode("b", null, "Zone")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<p class="footer-about" data-v-b52e5106>${ssrInterpolate(_ctx.$t("footer.about"))}</p><ul class="footer-socials" data-v-b52e5106><!--[-->`);
      ssrRenderList("SOCIALS" in _ctx ? _ctx.SOCIALS : unref(SOCIALS), (social) => {
        _push(`<li data-v-b52e5106><a${ssrRenderAttr("href", social.url)} target="_blank" rel="noopener"${ssrRenderAttr("aria-label", social.name)}${ssrRenderAttr("title", social.handle)} data-v-b52e5106><i class="${ssrRenderClass([social.icon, "fa-brands"])}" aria-hidden="true" data-v-b52e5106></i></a></li>`);
      });
      _push(`<!--]--></ul></section><nav class="footer-col"${ssrRenderAttr("aria-label", _ctx.$t("footer.shop"))} data-v-b52e5106><h2 class="footer-title" data-v-b52e5106>${ssrInterpolate(_ctx.$t("footer.shop"))}</h2><ul data-v-b52e5106><!--[-->`);
      ssrRenderList(shopLinks, (link) => {
        _push(`<li data-v-b52e5106>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: link.to
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t(link.label))}`);
            } else {
              return [
                createTextVNode(toDisplayString$1(_ctx.$t(link.label)), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
        _push(`</li>`);
      });
      _push(`<!--]--><li data-v-b52e5106>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/shop?on_sale=true",
        class: "link-hot"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("home.promotions"))}`);
          } else {
            return [
              createTextVNode(toDisplayString$1(_ctx.$t("home.promotions")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></nav><nav class="footer-col"${ssrRenderAttr("aria-label", _ctx.$t("account.myAccount"))} data-v-b52e5106><h2 class="footer-title" data-v-b52e5106>${ssrInterpolate(_ctx.$t("account.myAccount"))}</h2><ul data-v-b52e5106>`);
      if (unref(isLoggedIn)) {
        _push(`<!--[--><li data-v-b52e5106>`);
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/account" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("account.overview"))}`);
            } else {
              return [
                createTextVNode(toDisplayString$1(_ctx.$t("account.overview")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li data-v-b52e5106>`);
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/account/orders" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("account.orders"))}`);
            } else {
              return [
                createTextVNode(toDisplayString$1(_ctx.$t("account.orders")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li data-v-b52e5106>`);
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/account/settings" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("account.settings"))}`);
            } else {
              return [
                createTextVNode(toDisplayString$1(_ctx.$t("account.settings")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><!--]-->`);
      } else {
        _push(`<!--[--><li data-v-b52e5106>`);
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/account/login" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("account.login"))}`);
            } else {
              return [
                createTextVNode(toDisplayString$1(_ctx.$t("account.login")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><li data-v-b52e5106>`);
        _push(ssrRenderComponent(_component_NuxtLink, { to: "/account/register" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`${ssrInterpolate(_ctx.$t("account.createAccount"))}`);
            } else {
              return [
                createTextVNode(toDisplayString$1(_ctx.$t("account.createAccount")), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</li><!--]-->`);
      }
      _push(`<li data-v-b52e5106>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/cart" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("bottomNav.cart"))}`);
          } else {
            return [
              createTextVNode(toDisplayString$1(_ctx.$t("bottomNav.cart")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</li></ul></nav><section class="footer-col footer-contact" data-v-b52e5106><h2 class="footer-title" data-v-b52e5106>${ssrInterpolate(_ctx.$t("footer.help"))}</h2><ul data-v-b52e5106><li data-v-b52e5106><a${ssrRenderAttr("href", `tel:${("CONTACT" in _ctx ? _ctx.CONTACT : unref(CONTACT)).tel}`)} dir="ltr" data-v-b52e5106><i class="fa-solid fa-phone" aria-hidden="true" data-v-b52e5106></i>${ssrInterpolate(("CONTACT" in _ctx ? _ctx.CONTACT : unref(CONTACT)).phone)}</a></li><li data-v-b52e5106><a${ssrRenderAttr("href", `mailto:${("CONTACT" in _ctx ? _ctx.CONTACT : unref(CONTACT)).email}`)} dir="ltr" data-v-b52e5106><i class="fa-regular fa-envelope" aria-hidden="true" data-v-b52e5106></i>${ssrInterpolate(("CONTACT" in _ctx ? _ctx.CONTACT : unref(CONTACT)).email)}</a></li></ul><a${ssrRenderAttr("href", ("whatsappLink" in _ctx ? _ctx.whatsappLink : unref(whatsappLink))())} target="_blank" rel="noopener" class="whatsapp-btn" data-v-b52e5106><i class="fa-brands fa-whatsapp" aria-hidden="true" data-v-b52e5106></i>${ssrInterpolate(_ctx.$t("footer.whatsapp"))}</a></section></div><div class="footer-pay" data-v-b52e5106><span class="footer-title" data-v-b52e5106>${ssrInterpolate(_ctx.$t("footer.payments"))}</span>`);
      _push(ssrRenderComponent(_component_PaymentLogos, null, null, _parent));
      _push(`</div><div class="footer-bottom" data-v-b52e5106><p class="copyright" data-v-b52e5106>© ${ssrInterpolate(unref(year))} GamesZone. ${ssrInterpolate(_ctx.$t("footer.rights"))}</p><div class="bottom-actions" data-v-b52e5106>`);
      _push(ssrRenderComponent(_component_LanguageSwitcher, { class: "footer-lang" }, null, _parent));
      _push(`<button type="button" class="to-top"${ssrRenderAttr("aria-label", _ctx.$t("footer.backToTop"))}${ssrRenderAttr("title", _ctx.$t("footer.backToTop"))} data-v-b52e5106><i class="fa-solid fa-arrow-up" aria-hidden="true" data-v-b52e5106></i></button></div></div></div></footer>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Footer.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-b52e5106"]]);
const _sfc_main$4 = {
  __name: "MobileBottomNav",
  __ssrInlineRender: true,
  props: {
    itemsCount: {
      type: Number,
      default: 0
    }
  },
  setup(__props) {
    const route = useRoute();
    const props = __props;
    const isHome = computed(() => route.path === "/");
    const isShop = computed(() => route.path.startsWith("/shop"));
    const isCart = computed(() => route.path.startsWith("/cart"));
    const bump = ref(false);
    watch(() => props.itemsCount, (now, before) => {
      if (now > before) bump.value = true;
    });
    const scrollHidden = ref(false);
    const typing = ref(false);
    const hidden = computed(() => scrollHidden.value || typing.value);
    watch(hidden, (value) => (void 0).documentElement.classList.toggle("bottom-nav-hidden", value));
    watch(() => route.path, () => scrollHidden.value = false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_2$1;
      _push(`<nav${ssrRenderAttrs(mergeProps({
        class: ["mobile-bottom-nav d-lg-none", { "is-hidden": unref(hidden) }],
        "aria-label": _ctx.$t("bottomNav.label")
      }, _attrs))} data-v-6b04241f>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/",
        class: ["nav-item", { "is-active": unref(isHome) }],
        "aria-current": unref(isHome) ? "page" : void 0
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="icon-wrapper" data-v-6b04241f${_scopeId}><i class="${ssrRenderClass(unref(isHome) ? "iconly-Bold-Home" : "iconly-Curved-Home")}" data-v-6b04241f${_scopeId}></i></span><span class="label" data-v-6b04241f${_scopeId}>${ssrInterpolate(_ctx.$t("bottomNav.home"))}</span>`);
          } else {
            return [
              createVNode("span", { class: "icon-wrapper" }, [
                createVNode("i", {
                  class: unref(isHome) ? "iconly-Bold-Home" : "iconly-Curved-Home"
                }, null, 2)
              ]),
              createVNode("span", { class: "label" }, toDisplayString$1(_ctx.$t("bottomNav.home")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/shop",
        class: ["nav-item", { "is-active": unref(isShop) }],
        "aria-current": unref(isShop) ? "page" : void 0
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="icon-wrapper" data-v-6b04241f${_scopeId}><i class="${ssrRenderClass(unref(isShop) ? "iconly-Bold-Game" : "iconly-Curved-Game")}" data-v-6b04241f${_scopeId}></i></span><span class="label" data-v-6b04241f${_scopeId}>${ssrInterpolate(_ctx.$t("bottomNav.shop"))}</span>`);
          } else {
            return [
              createVNode("span", { class: "icon-wrapper" }, [
                createVNode("i", {
                  class: unref(isShop) ? "iconly-Bold-Game" : "iconly-Curved-Game"
                }, null, 2)
              ]),
              createVNode("span", { class: "label" }, toDisplayString$1(_ctx.$t("bottomNav.shop")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<button type="button" class="nav-item nav-search" data-v-6b04241f><span class="search-fab" data-v-6b04241f><i class="iconly-Curved-Search" data-v-6b04241f></i></span><span class="label" data-v-6b04241f>${ssrInterpolate(_ctx.$t("bottomNav.search"))}</span></button>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/cart",
        class: ["nav-item", { "is-active": unref(isCart) }],
        "aria-current": unref(isCart) ? "page" : void 0
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="icon-wrapper" data-v-6b04241f${_scopeId}><i class="${ssrRenderClass(unref(isCart) ? "iconly-Bold-Bag" : "iconly-Curved-Bag")}" data-v-6b04241f${_scopeId}></i>`);
            if (__props.itemsCount > 0) {
              _push2(`<span class="${ssrRenderClass([{ bump: unref(bump) }, "badge"])}"${ssrRenderAttr("aria-label", _ctx.$t("bottomNav.cartCount", { n: __props.itemsCount }))} data-v-6b04241f${_scopeId}>${ssrInterpolate(__props.itemsCount > 99 ? "99+" : __props.itemsCount)}</span>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</span><span class="label" data-v-6b04241f${_scopeId}>${ssrInterpolate(_ctx.$t("bottomNav.cart"))}</span>`);
          } else {
            return [
              createVNode("span", { class: "icon-wrapper" }, [
                createVNode("i", {
                  class: unref(isCart) ? "iconly-Bold-Bag" : "iconly-Curved-Bag"
                }, null, 2),
                __props.itemsCount > 0 ? (openBlock(), createBlock("span", {
                  key: __props.itemsCount,
                  class: ["badge", { bump: unref(bump) }],
                  "aria-label": _ctx.$t("bottomNav.cartCount", { n: __props.itemsCount })
                }, toDisplayString$1(__props.itemsCount > 99 ? "99+" : __props.itemsCount), 11, ["aria-label"])) : createCommentVNode("", true)
              ]),
              createVNode("span", { class: "label" }, toDisplayString$1(_ctx.$t("bottomNav.cart")), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<a${ssrRenderAttr("href", `tel:${("CONTACT" in _ctx ? _ctx.CONTACT : unref(CONTACT)).tel}`)} class="nav-item" data-v-6b04241f><span class="icon-wrapper" data-v-6b04241f><i class="iconly-Curved-Call" data-v-6b04241f></i></span><span class="label" data-v-6b04241f>${ssrInterpolate(_ctx.$t("bottomNav.contact"))}</span></a></nav>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MobileBottomNav.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-6b04241f"]]);
const useLocalCart = () => {
  const cart = useState("local_cart", () => []);
  const loadCart = () => {
    return;
  };
  const keyOf = (item) => String(item.key ?? item.id);
  const addItem = (product, quantity = 1, selection = null) => {
    const variation = selection?.variation;
    const key = variation ? `${product.id}:${variation.id}:${selection.options.map((o) => o.value).join("|")}` : String(product.id);
    const item = cart.value.find((i) => keyOf(i) === key);
    if (item) {
      item.quantity += quantity;
    } else {
      cart.value.push({
        key,
        id: product.id,
        variation_id: variation?.id ?? null,
        type: variation ? "variation" : product.type,
        variation: selection?.options,
        meta: selection?.meta,
        name: product.name,
        slug: product.slug,
        price: variation?.price || product.price,
        image: variation?.image?.src || product.images?.[0]?.thumbnail || product.thumbnail,
        quantity
      });
    }
  };
  const removeItem = (key) => {
    cart.value = cart.value.filter((i) => keyOf(i) !== String(key));
  };
  const updateItem = (key, quantity) => {
    if (quantity <= 0) return removeItem(key);
    const item = cart.value.find((i) => keyOf(i) === String(key));
    if (item) item.quantity = quantity;
  };
  const clearCart = () => {
    cart.value = [];
  };
  const itemsCount = computed(
    () => cart.value.reduce((sum, item) => sum + item.quantity, 0)
  );
  const totalPrice = computed(
    () => cart.value.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0)
  );
  return {
    cart,
    keyOf,
    loadCart,
    addItem,
    removeItem,
    updateItem,
    clearCart,
    itemsCount,
    totalPrice
  };
};
const THEME_STORAGE_KEY = "gz-theme";
const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light'}var d=document.documentElement;d.setAttribute('data-theme',t);d.setAttribute('data-bs-theme',t)}catch(e){}})()`;
const useTheme = () => {
  const theme = useState("gz-theme", () => "light");
  const sync = () => {
  };
  const setTheme = (value) => {
    theme.value = value;
    const root = (void 0).documentElement;
    root.setAttribute("data-theme", value);
    root.setAttribute("data-bs-theme", value);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, value);
    } catch {
    }
  };
  const toggle = (event) => {
    const next = theme.value === "dark" ? "light" : "dark";
    const reduced = (void 0).matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!(void 0).startViewTransition || reduced) return setTheme(next);
    const target = event?.currentTarget;
    const rect = target?.getBoundingClientRect();
    const x = rect ? rect.left + rect.width / 2 : (void 0).innerWidth / 2;
    const y = rect ? rect.top + rect.height / 2 : 0;
    const radius = Math.hypot(Math.max(x, (void 0).innerWidth - x), Math.max(y, (void 0).innerHeight - y));
    (void 0).startViewTransition(() => setTheme(next)).ready.then(() => {
      (void 0).documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 550, easing: "cubic-bezier(.4, 0, .2, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  };
  return { theme, isDark: computed(() => theme.value === "dark"), sync, toggle, setTheme };
};
const useSiteUrl = () => {
  const config = /* @__PURE__ */ useRuntimeConfig();
  const base = String(config.public.siteUrl || "https://gameshopdz.com").replace(/\/$/, "");
  const absolute = (path = "/") => `${base}${path.startsWith("/") ? path : `/${path}`}`;
  return { base, absolute };
};
const useJsonLd = (key, data) => {
  useHead(() => {
    const value = data();
    if (!value) return {};
    return {
      script: [{
        key,
        type: "application/ld+json",
        innerHTML: JSON.stringify(value).replace(/</g, "\\u003c")
      }]
    };
  });
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    const loading = ref(true);
    const { itemsCount } = useLocalCart();
    const { t, locale } = useI18n();
    watch(locale, async (code) => {
      await nextTick();
      const dir = code === "ar" ? "rtl" : "ltr";
      (void 0).querySelectorAll(".swiper").forEach((el) => {
        el.swiper?.changeLanguageDirection?.(dir);
      });
    });
    const i18nHead = useLocaleHead();
    useHead({
      // Every page title ends with the brand: "Playstation 5 | GamesZone".
      // Titles that already name it (the home page) are left as they are.
      titleTemplate: (title) => !title ? "GamesZone" : /gameszone/i.test(title) ? title : `${title} | GamesZone`,
      htmlAttrs: {
        lang: () => i18nHead.value.htmlAttrs.lang,
        dir: () => i18nHead.value.htmlAttrs.dir
      },
      // Light/dark theme applied before the first paint (see composables/useTheme.ts)
      script: [{ key: "gz-theme-init", innerHTML: THEME_INIT_SCRIPT, tagPosition: "head" }],
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1, maximum-scale=1"
        }
      ]
    });
    const { start, finish } = useLoadingIndicator();
    const router = useRouter();
    router.beforeEach(() => {
      start({ force: true });
    });
    router.afterEach(() => {
      finish();
    });
    const route = useRoute();
    const { absolute } = useSiteUrl();
    const canonical = computed(() => absolute(route.path));
    useHead({
      link: [{ rel: "canonical", href: canonical, key: "canonical" }]
    });
    useSeoMeta({
      title: () => t("seo.title"),
      description: () => t("seo.description"),
      ogTitle: () => t("seo.title"),
      ogDescription: () => t("seo.description"),
      ogImage: absolute("/banner.jpg"),
      ogImageWidth: 2240,
      ogImageHeight: 1260,
      ogImageAlt: "GamesZone",
      ogUrl: canonical,
      ogSiteName: "GamesZone",
      ogLocale: () => ({ ar: "ar_DZ", en: "en_US" })[locale.value] ?? "fr_DZ",
      ogType: "website",
      twitterTitle: () => t("seo.title"),
      twitterDescription: () => t("seo.description"),
      twitterImage: absolute("/banner.jpg"),
      twitterCard: "summary_large_image"
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppLoader = __nuxt_component_0$1;
      const _component_NuxtLoadingIndicator = __nuxt_component_1$3;
      const _component_NuxtLayout = __nuxt_component_2;
      const _component_NuxtPage = __nuxt_component_0;
      const _component_Footer = __nuxt_component_4;
      const _component_MobileBottomNav = __nuxt_component_5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "page-wraper" }, _attrs))}>`);
      if (unref(loading)) {
        _push(ssrRenderComponent(_component_AppLoader, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_NuxtLoadingIndicator, {
        color: "#FFFFFF",
        "error-color": "#FF0000",
        height: 3,
        throttle: 0,
        duration: 2e3
      }, null, _parent));
      _push(ssrRenderComponent(_component_NuxtLayout, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtPage, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_Footer, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_MobileBottomNav, { itemsCount: unref(itemsCount) }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtPage),
              createVNode(_component_Footer),
              createVNode(_component_MobileBottomNav, { itemsCount: unref(itemsCount) }, null, 8, ["itemsCount"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const astro = "" + __buildAssetsURL("mascot.RanJL4YH.png");
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AstroBot",
  __ssrInlineRender: true,
  props: {
    mood: { default: "idle" },
    size: { default: 180 },
    head: { type: Boolean, default: false },
    badge: {}
  },
  setup(__props) {
    const uid = String(useId()).replace(/[^a-zA-Z0-9_-]/g, "");
    const softId = `astro-soft-${uid}`;
    const glowId = `astro-glow-${uid}`;
    const visorId = `astro-visor-${uid}`;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["astro", [`is-${__props.mood}`, { "is-head": __props.head }]],
        style: { width: `${__props.size}px`, "--astro-size": `${__props.size}px` },
        role: __props.head ? void 0 : "img",
        "aria-hidden": __props.head ? "true" : void 0,
        "aria-label": __props.head ? void 0 : `GamesZone robot (${__props.mood})`
      }, _attrs))} data-v-19d01cda><div class="astro-clip" data-v-19d01cda><div class="astro-canvas" data-v-19d01cda><img${ssrRenderAttr("src", unref(astro))} alt="" width="600" height="800" class="astro-body" data-v-19d01cda><svg class="astro-face" viewBox="0 0 300 400" aria-hidden="true" data-v-19d01cda><defs data-v-19d01cda><filter${ssrRenderAttr("id", softId)} x="-20%" y="-20%" width="140%" height="140%" data-v-19d01cda><feGaussianBlur stdDeviation="5" data-v-19d01cda></feGaussianBlur></filter><linearGradient${ssrRenderAttr("id", visorId)} x1="0" y1="0" x2="1" y2="1" data-v-19d01cda><stop offset="0" stop-color="#1d5a3b" data-v-19d01cda></stop><stop offset="1" stop-color="#05403a" data-v-19d01cda></stop></linearGradient><filter${ssrRenderAttr("id", glowId)} x="-50%" y="-50%" width="200%" height="200%" data-v-19d01cda><feGaussianBlur stdDeviation="3" result="b" data-v-19d01cda></feGaussianBlur><feMerge data-v-19d01cda><feMergeNode in="b" data-v-19d01cda></feMergeNode><feMergeNode in="SourceGraphic" data-v-19d01cda></feMergeNode></feMerge></filter></defs><rect x="117" y="102" width="106" height="58" rx="24"${ssrRenderAttr("fill", `url(#${visorId})`)}${ssrRenderAttr("filter", `url(#${softId})`)} data-v-19d01cda></rect><svg x="6" y="-33.2" width="360" height="480" viewBox="0 0 300 400" overflow="visible" data-v-19d01cda><g class="eyes"${ssrRenderAttr("filter", `url(#${glowId})`)} fill="#DDDF1C" stroke="#DDDF1C" stroke-linecap="round" data-v-19d01cda>`);
      if (__props.mood === "idle") {
        _push(`<g class="blink" data-v-19d01cda><circle cx="110" cy="136" r="15" stroke="none" data-v-19d01cda></circle><circle cx="158" cy="136" r="15" stroke="none" data-v-19d01cda></circle></g>`);
      } else if (__props.mood === "happy") {
        _push(`<!--[--><path d="M96 142 Q110 120 124 142" fill="none" stroke-width="7" data-v-19d01cda></path><path d="M144 142 Q158 120 172 142" fill="none" stroke-width="7" data-v-19d01cda></path><!--]-->`);
      } else if (__props.mood === "sad") {
        _push(`<!--[--><path d="M96 140 L124 130 L124 140 A14 14 0 0 1 96 140 Z" stroke="none" data-v-19d01cda></path><path d="M144 130 L172 140 A14 14 0 0 1 144 140 Z" stroke="none" data-v-19d01cda></path><!--]-->`);
      } else if (__props.mood === "cry") {
        _push(`<!--[--><path d="M96 130 Q110 146 124 130" fill="none" stroke-width="7" data-v-19d01cda></path><path d="M144 130 Q158 146 172 130" fill="none" stroke-width="7" data-v-19d01cda></path><g stroke="none" data-v-19d01cda><path class="tear t1" d="M104 150 q4 7 0 11 q-4 -4 0 -11 Z" data-v-19d01cda></path><path class="tear t2" d="M164 150 q4 7 0 11 q-4 -4 0 -11 Z" data-v-19d01cda></path><path class="tear t3" d="M116 150 q4 7 0 11 q-4 -4 0 -11 Z" data-v-19d01cda></path></g><!--]-->`);
      } else if (__props.mood === "star") {
        _push(`<g class="twinkle" stroke="none" data-v-19d01cda><path d="M110 120 l4.7 9.6 10.6 1.5 -7.7 7.5 1.8 10.5 -9.4 -5 -9.4 5 1.8 -10.5 -7.7 -7.5 10.6 -1.5z" data-v-19d01cda></path><path d="M158 120 l4.7 9.6 10.6 1.5 -7.7 7.5 1.8 10.5 -9.4 -5 -9.4 5 1.8 -10.5 -7.7 -7.5 10.6 -1.5z" data-v-19d01cda></path></g>`);
      } else if (__props.mood === "heart") {
        _push(`<g class="beat" stroke="none" fill="#ff5fa2" data-v-19d01cda><path d="M110 150 l-13 -12.5 a7.5 7.5 0 0 1 13 -8 a7.5 7.5 0 0 1 13 8z" data-v-19d01cda></path><path d="M158 150 l-13 -12.5 a7.5 7.5 0 0 1 13 -8 a7.5 7.5 0 0 1 13 8z" data-v-19d01cda></path></g>`);
      } else if (__props.mood === "wink") {
        _push(`<!--[--><circle cx="110" cy="136" r="15" stroke="none" data-v-19d01cda></circle><path d="M144 140 Q158 122 172 140" fill="none" stroke-width="7" data-v-19d01cda></path><!--]-->`);
      } else if (__props.mood === "pixel") {
        _push(`<g class="flicker" stroke="none" data-v-19d01cda><rect x="98" y="124" width="10" height="10" data-v-19d01cda></rect><rect x="110" y="124" width="10" height="10" data-v-19d01cda></rect><rect x="98" y="136" width="10" height="10" data-v-19d01cda></rect><rect x="110" y="136" width="10" height="10" opacity=".55" data-v-19d01cda></rect><rect x="146" y="124" width="10" height="10" data-v-19d01cda></rect><rect x="158" y="124" width="10" height="10" opacity=".55" data-v-19d01cda></rect><rect x="146" y="136" width="10" height="10" data-v-19d01cda></rect><rect x="158" y="136" width="10" height="10" data-v-19d01cda></rect></g>`);
      } else if (__props.mood === "search") {
        _push(`<g class="look" data-v-19d01cda><circle cx="104" cy="136" r="13" stroke="none" data-v-19d01cda></circle><circle cx="152" cy="136" r="13" stroke="none" data-v-19d01cda></circle></g>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</g></svg></svg></div></div>`);
      if (__props.mood === "search" && !__props.head) {
        _push(`<span class="bubble" aria-hidden="true" data-v-19d01cda>?</span>`);
      } else {
        _push(`<!---->`);
      }
      if (__props.badge) {
        _push(`<span class="badge-icon" aria-hidden="true" data-v-19d01cda><i class="${ssrRenderClass([__props.badge, "fa-solid"])}" data-v-19d01cda></i></span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/AstroBot.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-19d01cda"]]);
const SORT_OPTIONS = [
  { value: "", orderby: void 0, order: void 0, label: "shop.sort.default" },
  { value: "popularity", orderby: "popularity", order: void 0, label: "shop.sort.popularity" },
  { value: "date", orderby: "date", order: "desc", label: "shop.sort.newest" },
  { value: "price-asc", orderby: "price", order: "asc", label: "shop.sort.priceAsc" },
  { value: "price-desc", orderby: "price", order: "desc", label: "shop.sort.priceDesc" },
  { value: "title-asc", orderby: "title", order: "asc", label: "shop.sort.nameAsc" }
];
const PLATFORMS = [
  { id: 817, label: "PS5", icon: "fa-brands fa-playstation" },
  { id: 816, label: "PS4", icon: "fa-brands fa-playstation" },
  { id: 818, label: "Xbox Series", icon: "fa-brands fa-xbox" },
  { id: 819, label: "Xbox One", icon: "fa-brands fa-xbox" },
  { id: 820, label: "Switch", icon: "fa-solid fa-gamepad" },
  { id: 2951, label: "Switch 2", icon: "fa-solid fa-gamepad" }
];
const NEW_ARRIVALS_DAYS = 30;
const FILTER_KEYS = ["category", "tag", "brand", "search", "include", "min_price", "max_price", "stock_status", "on_sale", "new"];
const asString = (value) => (Array.isArray(value) ? value[0] : value) || void 0;
const useShopFilters = () => {
  const route = useRoute();
  const router = useRouter();
  const query = computed(() => ({
    category: asString(route.query.category),
    tag: asString(route.query.tag),
    brand: asString(route.query.brand),
    search: asString(route.query.search),
    include: asString(route.query.include),
    group: asString(route.query.group),
    orderby: asString(route.query.orderby),
    order: asString(route.query.order),
    minPrice: asString(route.query.min_price),
    maxPrice: asString(route.query.max_price),
    inStock: route.query.stock_status === "instock",
    onSale: !!asString(route.query.on_sale),
    newArrivals: !!asString(route.query.new)
  }));
  const sort = computed(() => {
    const { orderby, order } = query.value;
    const match = SORT_OPTIONS.find(
      (o) => o.orderby === orderby && (o.order === void 0 || o.order === (order || "desc"))
    );
    return match?.value ?? "";
  });
  const update = (patch) => {
    const next = { ...route.query };
    delete next.page;
    for (const [key, value] of Object.entries(patch)) {
      if (value === void 0 || value === "" || value === false) delete next[key];
      else next[key] = String(value);
    }
    return router.push({ path: "/shop", query: next });
  };
  const setSort = (value) => {
    const option = SORT_OPTIONS.find((o) => o.value === value) ?? SORT_OPTIONS[0];
    return update({ orderby: option.orderby, order: option.order });
  };
  const setPrice = (min, max) => update({ min_price: min || void 0, max_price: max || void 0 });
  const activeCount = computed(
    () => FILTER_KEYS.filter((key) => key !== "search" && route.query[key]).length
  );
  const clearAll = () => {
    const { search, orderby, order } = query.value;
    return router.push({ path: "/shop", query: { search, orderby, order } });
  };
  const page = computed(() => Math.max(1, Number(asString(route.query.page)) || 1));
  const setPage = (value) => router.push({ path: "/shop", query: { ...route.query, page: value > 1 ? String(value) : void 0 } });
  return { query, sort, update, setSort, setPrice, activeCount, clearAll, page, setPage };
};
const HIDDEN_CATEGORIES = [29, 3039, 2216];
const decodeName = (name) => String(name || "").replace(/&amp;/g, "&").replace(/&#039;/g, "'").replace(/&quot;/g, '"');
const useShopCategories = () => {
  const { data } = useFetch(
    "/api/wc/categories",
    {
      key: "wc-categories",
      default: () => []
    },
    "$5-Szl-jgAs"
    /* nuxt-injected */
  );
  const visible = computed(
    () => (data.value || []).filter((c) => !HIDDEN_CATEGORIES.includes(c.id))
  );
  const byId = (id) => visible.value.find((c) => String(c.id) === String(id));
  const childrenOf = (id) => visible.value.filter((c) => c.parent === id && c.count > 0);
  return { categories: visible, byId, childrenOf };
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "error",
  __ssrInlineRender: true,
  props: {
    error: Object
  },
  setup(__props) {
    const props = __props;
    const { t } = useI18n();
    const is404 = computed(() => Number(props.error?.statusCode) === 404);
    const statusCode = computed(() => props.error?.statusCode || 500);
    const i18nHead = useLocaleHead();
    useHead({
      title: () => is404.value ? t("error.notFound") : t("error.generic"),
      htmlAttrs: {
        lang: () => i18nHead.value.htmlAttrs.lang,
        dir: () => i18nHead.value.htmlAttrs.dir
      },
      meta: [{ name: "robots", content: "noindex" }]
    });
    const term = ref("");
    const canGoBack = ref(false);
    const whatsappUrl = computed(() => {
      const url = "";
      return whatsappLink(t("error.whatsappMessage", { code: statusCode.value, url }));
    });
    const quickLinks = [
      { label: "menu.games", to: "/shop?category=815", icon: "iconly-Curved-Game" },
      { label: "menu.consoles", to: "/shop?category=821", icon: "iconly-Curved-Bag" },
      { label: "menu.digital", to: "/shop?category=844", icon: "iconly-Curved-Wallet" },
      { label: "home.promotions", to: "/shop?on_sale=true", icon: "iconly-Curved-Discount" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_LanguageSwitcher = __nuxt_component_1$1;
      const _component_AstroBot = __nuxt_component_1;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "error-page" }, _attrs))} data-v-5a0000ec><header class="error-top" data-v-5a0000ec><a href="/" class="error-logo" aria-label="GamesZone" data-v-5a0000ec><img${ssrRenderAttr("src", _imports_0)} alt="GamesZone" width="41" height="45" data-v-5a0000ec></a>`);
      _push(ssrRenderComponent(_component_LanguageSwitcher, null, null, _parent));
      _push(`</header><section class="error-card" data-v-5a0000ec><div class="visual" data-v-5a0000ec>`);
      if (unref(is404)) {
        _push(`<span class="big-code" aria-hidden="true" data-v-5a0000ec>4<span class="zero" data-v-5a0000ec>`);
        _push(ssrRenderComponent(_component_AstroBot, {
          mood: "cry",
          size: 92,
          head: ""
        }, null, _parent));
        _push(`</span>4</span>`);
      } else {
        _push(ssrRenderComponent(_component_AstroBot, {
          mood: "sad",
          size: 140
        }, null, _parent));
      }
      _push(`</div><h1 data-v-5a0000ec>${ssrInterpolate(unref(is404) ? _ctx.$t("error.notFound") : _ctx.$t("error.generic"))}</h1><p class="lead" data-v-5a0000ec>${ssrInterpolate(unref(is404) ? _ctx.$t("error.notFoundText") : _ctx.$t("error.retryLater"))}</p>`);
      if (unref(is404)) {
        _push(`<!--[--><form class="error-search" role="search" data-v-5a0000ec><i class="iconly-Light-Search" aria-hidden="true" data-v-5a0000ec></i><input${ssrRenderAttr("value", unref(term))} type="search" enterkeyhint="search"${ssrRenderAttr("placeholder", _ctx.$t("header.searchPlaceholder"))}${ssrRenderAttr("aria-label", _ctx.$t("header.searchLabel"))} data-v-5a0000ec><button type="submit" class="btn btn-primary" data-v-5a0000ec>${ssrInterpolate(_ctx.$t("header.searchButton"))}</button></form><p class="quick-title" data-v-5a0000ec>${ssrInterpolate(_ctx.$t("error.popular"))}</p><div class="quick-links" data-v-5a0000ec><!--[-->`);
        ssrRenderList(quickLinks, (link) => {
          _push(`<a${ssrRenderAttr("href", link.to)} class="quick-link" data-v-5a0000ec><i class="${ssrRenderClass(link.icon)}" aria-hidden="true" data-v-5a0000ec></i>${ssrInterpolate(_ctx.$t(link.label))}</a>`);
        });
        _push(`<!--]--><!--[-->`);
        ssrRenderList(unref(PLATFORMS).slice(0, 1), (platform) => {
          _push(`<a${ssrRenderAttr("href", `/shop?category=${platform.id}`)} class="quick-link" data-v-5a0000ec><i class="${ssrRenderClass(platform.icon)}" aria-hidden="true" data-v-5a0000ec></i>${ssrInterpolate(platform.label)}</a>`);
        });
        _push(`<!--]--></div><!--]-->`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="actions" data-v-5a0000ec>`);
      if (!unref(is404)) {
        _push(`<button type="button" class="btn btn-primary btn-lg" data-v-5a0000ec><i class="fa-solid fa-rotate-right" data-v-5a0000ec></i> ${ssrInterpolate(_ctx.$t("error.retry"))}</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<a href="/" class="${ssrRenderClass([unref(is404) ? "btn-primary" : "btn-outline-primary", "btn btn-lg"])}" data-v-5a0000ec><i class="iconly-Curved-Home" data-v-5a0000ec></i> ${ssrInterpolate(_ctx.$t("common.backHome"))}</a>`);
      if (unref(canGoBack)) {
        _push(`<button type="button" class="btn btn-outline-primary btn-lg" data-v-5a0000ec><i class="fa-solid fa-arrow-left flip-rtl" data-v-5a0000ec></i> ${ssrInterpolate(_ctx.$t("error.goBack"))}</button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><p class="help" data-v-5a0000ec>${ssrInterpolate(_ctx.$t("error.helpText"))} <a${ssrRenderAttr("href", unref(whatsappUrl))} target="_blank" rel="noopener" data-v-5a0000ec><i class="fa-brands fa-whatsapp" data-v-5a0000ec></i> ${ssrInterpolate(_ctx.$t("success.whatsapp"))}</a></p>`);
      if (!unref(is404)) {
        _push(`<p class="code" data-v-5a0000ec>${ssrInterpolate(_ctx.$t("error.code"))} <span dir="ltr" data-v-5a0000ec>${ssrInterpolate(unref(statusCode))}</span></p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</section></main>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("error.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ErrorComponent = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-5a0000ec"]]);
const _sfc_main = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const IslandRenderer = () => null;
    const nuxtApp = useNuxtApp();
    nuxtApp.deferHydration();
    nuxtApp.ssrContext.url;
    const SingleRenderer = false;
    provide(PageRouteSymbol, useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = /* @__PURE__ */ useError();
    const abortRender = error.value && !nuxtApp.ssrContext.error;
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        const p = nuxtApp.runWithContext(() => showError(err));
        onServerPrefetch(() => p);
        return false;
      }
    });
    const islandContext = nuxtApp.ssrContext.islandContext;
    return (_ctx, _push, _parent, _attrs) => {
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(abortRender)) {
            _push(`<div></div>`);
          } else if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else if (unref(islandContext)) {
            _push(ssrRenderComponent(unref(IslandRenderer), { context: unref(islandContext) }, null, _parent));
          } else if (unref(SingleRenderer)) {
            ssrRenderVNode(_push, createVNode(resolveDynamicComponent(unref(SingleRenderer)), null, null), _parent);
          } else {
            _push(ssrRenderComponent(unref(_sfc_main$3), null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
let entry;
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (error) {
      await nuxt.hooks.callHook("app:error", error);
      nuxt.payload.error ||= createError(error);
    }
    if (ssrContext && (ssrContext["~renderResponse"] || ssrContext._renderResponse)) {
      throw new Error("skipping render");
    }
    return vueApp;
  };
}
const entry_default = ((ssrContext) => entry(ssrContext));

export { useNuxtData as A, SORT_OPTIONS as B, CONTACT as C, useRuntimeConfig as D, navigateTo as E, createError as F, useLazyAsyncData as G, HIDDEN_CATEGORIES as H, defineNuxtRouteMiddleware as I, __nuxt_component_0 as J, MANUAL_METHODS as M, NEW_ARRIVALS_DAYS as N, ONLINE_METHOD_ID as O, PAY_METHODS as P, SOCIALS as S, __nuxt_component_2$1 as _, useI18n as a, useHead as b, __nuxt_component_1 as c, _export_sfc as d, entry_default as default, useFetch as e, useRoute as f, useRouter as g, useAccount as h, useTheme as i, _imports_0 as j, __nuxt_component_1$1 as k, PLATFORMS as l, useLazyFetch as m, useSiteUrl as n, useJsonLd as o, findManualMethod as p, CURRENCY_SYMBOLS as q, PROOF_ACCEPT as r, useNuxtApp as s, toForeignAmount as t, useLocalCart as u, useShopFilters as v, whatsappLink as w, useShopCategories as x, decodeName as y, useSeoMeta as z };
//# sourceMappingURL=server.mjs.map
