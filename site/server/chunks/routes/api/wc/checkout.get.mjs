import { d as defineEventHandler, L as getHeader, p as getCookie, B as storeApiUrl, n as setCookie } from '../../../nitro/nitro.mjs';
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

const checkout_get = defineEventHandler(async (event) => {
  const cookie = getHeader(event, "cookie") || "";
  const cartToken = getCookie(event, "wc_cart_token") || "";
  const nonce = getCookie(event, "wc_cart_nonce") || "";
  const res = await $fetch.raw(storeApiUrl("/v1/checkout"), {
    method: "GET",
    headers: {
      cookie,
      ...cartToken ? { "Cart-Token": cartToken } : {},
      ...nonce ? { "Nonce": nonce } : {}
    },
    credentials: "include"
  });
  const newToken = res.headers.get("cart-token");
  const newNonce = res.headers.get("nonce");
  if (newToken) setCookie(event, "wc_cart_token", newToken, { path: "/" });
  if (newNonce) setCookie(event, "wc_cart_nonce", newNonce, { path: "/" });
  return res._data;
});

export { checkout_get as default };
//# sourceMappingURL=checkout.get.mjs.map
