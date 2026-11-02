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

const cart_get = defineEventHandler(async (event) => {
  const cookie = getHeader(event, "cookie") || "";
  const cartToken = getCookie(event, "wc_cart_token") || "";
  const res = await $fetch.raw(storeApiUrl("/cart"), {
    headers: {
      cookie,
      ...cartToken ? { "Cart-Token": cartToken } : {}
    },
    credentials: "include"
  });
  const newToken = res.headers.get("cart-token");
  const newNonce = res.headers.get("nonce");
  if (newToken) setCookie(event, "wc_cart_token", newToken, { path: "/" });
  if (newNonce) setCookie(event, "wc_cart_nonce", newNonce, { path: "/" });
  return res._data;
});

export { cart_get as default };
//# sourceMappingURL=cart.get.mjs.map
