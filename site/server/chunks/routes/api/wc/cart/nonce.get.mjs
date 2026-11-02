import { d as defineEventHandler, L as getHeader, B as storeApiUrl, C as setHeader } from '../../../../nitro/nitro.mjs';
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

const nonce_get = defineEventHandler(async (event) => {
  var _a, _b;
  const cookie = getHeader(event, "cookie") || "";
  const res = await $fetch.raw(storeApiUrl("/cart"), {
    method: "GET",
    headers: { cookie },
    credentials: "include"
  });
  const setCookie = (_b = (_a = res.headers).getSetCookie) == null ? void 0 : _b.call(_a);
  if (setCookie == null ? void 0 : setCookie.length) setHeader(event, "set-cookie", setCookie);
  const nonce = res.headers.get("x-wc-store-api-nonce") || res.headers.get("X-WC-Store-API-Nonce") || null;
  return { nonce };
});

export { nonce_get as default };
//# sourceMappingURL=nonce.get.mjs.map
