import { d as defineEventHandler, w as wooFetch } from '../../../nitro/nitro.mjs';
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

const categories_get = defineEventHandler(async () => {
  return await wooFetch("/products", {
    query: {
      per_page: 100,
      order: "asc",
      display: "both"
    }
  });
});

export { categories_get as default };
//# sourceMappingURL=categories.get.mjs.map
