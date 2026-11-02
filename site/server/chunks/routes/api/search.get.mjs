import { d as defineEventHandler, u as useMeilisearch, b as getQuery } from '../../nitro/nitro.mjs';
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

const search_get = defineEventHandler(async (event) => {
  const client = useMeilisearch();
  const { q } = getQuery(event);
  return await client.index("products").search(String(q), {
    limit: 100,
    sort: [
      "created_at_ts:desc",
      "total_sales:desc"
    ],
    filter: [
      "status = publish"
    ]
  });
});

export { search_get as default };
//# sourceMappingURL=search.get.mjs.map
