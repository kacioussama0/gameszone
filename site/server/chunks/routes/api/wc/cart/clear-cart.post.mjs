import { d as defineEventHandler, E as getRequestHeader, c as createError, B as storeApiUrl } from '../../../../nitro/nitro.mjs';
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

const clearCart_post = defineEventHandler(async (event) => {
  const cartToken = getRequestHeader(event, "cart-token") || "";
  const nonce = getRequestHeader(event, "x-wc-store-api-nonce") || "";
  if (!nonce) {
    throw createError({ statusCode: 401, statusMessage: "Missing X-WC-Store-API-Nonce" });
  }
  return await $fetch(storeApiUrl("/v1/cart/items"), {
    method: "DELETE",
    headers: {
      "X-WC-Store-API-Nonce": nonce,
      ...cartToken ? { "Cart-Token": cartToken } : {},
      "Content-Type": "application/json"
    }
  });
});

export { clearCart_post as default };
//# sourceMappingURL=clear-cart.post.mjs.map
