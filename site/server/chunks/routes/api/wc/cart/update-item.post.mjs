import { d as defineEventHandler, f as readBody, L as getHeader, p as getCookie, B as storeApiUrl, n as setCookie } from '../../../../nitro/nitro.mjs';
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

const updateItem_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const cookie = getHeader(event, "cookie") || "";
  const cartToken = getCookie(event, "wc_cart_token") || "";
  const nonce = getCookie(event, "wc_cart_nonce") || "";
  const res = await $fetch.raw(
    storeApiUrl("/cart/update-item"),
    {
      method: "POST",
      headers: {
        cookie,
        "content-type": "application/json",
        ...cartToken ? { "Cart-Token": cartToken } : {},
        ...nonce ? { "Nonce": nonce } : {}
      },
      body,
      credentials: "include"
    }
  );
  const newToken = res.headers.get("cart-token");
  const newNonce = res.headers.get("nonce");
  if (newToken)
    setCookie(event, "wc_cart_token", newToken, { path: "/" });
  if (newNonce)
    setCookie(event, "wc_cart_nonce", newNonce, { path: "/" });
  return res._data;
});

export { updateItem_post as default };
//# sourceMappingURL=update-item.post.mjs.map
