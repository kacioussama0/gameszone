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

const tags_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const response = await $fetch.raw(
    `${wpUrl()}/wp-json/wc/v3/products/tags`,
    {
      query: {
        per_page: 100,
        ...query,
        order: "asc"
      },
      headers: {
        Authorization: wooAuth()
      }
    }
  );
  return response._data;
});

export { tags_get as default };
//# sourceMappingURL=tags.get.mjs.map
