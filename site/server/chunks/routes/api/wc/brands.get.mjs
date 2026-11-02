import { d as defineEventHandler, b as getQuery, m as wpUrl, l as wooAuth } from '../../../nitro/nitro.mjs';
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

const brands_get = defineEventHandler(async (event) => {
  getQuery(event);
  const response = await $fetch.raw(
    `${wpUrl()}/wp-json/wc/v3/products/brands`,
    {
      query: {
        per_page: 100,
        order: "asc",
        display: "both"
      },
      headers: {
        Authorization: wooAuth()
      }
    }
  );
  return response._data;
});

export { brands_get as default };
//# sourceMappingURL=brands.get.mjs.map
