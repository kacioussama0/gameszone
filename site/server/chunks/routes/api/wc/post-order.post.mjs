import { d as defineEventHandler, r as requireAccount, f as readBody, w as wooFetch } from '../../../nitro/nitro.mjs';
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

const postOrder_post = defineEventHandler(async (event) => {
  const account = await requireAccount(event);
  const body = await readBody(event);
  return await wooFetch("/orders", { method: "POST", body: { ...body, customer_id: account.id } });
});

export { postOrder_post as default };
//# sourceMappingURL=post-order.post.mjs.map
