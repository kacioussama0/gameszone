import { d as defineEventHandler, f as readBody, L as getHeader, B as storeApiUrl } from '../../../../nitro/nitro.mjs';
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

const add_post = defineEventHandler(async (event) => {
  var _a;
  const body = await readBody(event);
  const cookie = getHeader(event, "cookie") || "";
  return await $fetch(storeApiUrl("/v1/cart/add-item"), {
    method: "POST",
    headers: { "content-type": "application/json", cookie },
    body: { id: body.id, quantity: (_a = body.quantity) != null ? _a : 1 }
  });
});

export { add_post as default };
//# sourceMappingURL=add.post.mjs.map
