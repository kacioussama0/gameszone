import { d as defineEventHandler, u as useMeilisearch } from '../../../nitro/nitro.mjs';
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

const settings_get = defineEventHandler(async () => {
  const client = useMeilisearch();
  const index = client.index("products");
  const task = await index.updateSettings({
    searchableAttributes: [
      "name",
      "slug",
      "sku",
      "categories",
      "tags",
      "brand"
    ],
    filterableAttributes: [
      "in_stock",
      "stock_status",
      "on_sale",
      "categories",
      "tags",
      "brand",
      "price",
      "status"
    ],
    sortableAttributes: [
      "price",
      "created_at_ts",
      "total_sales",
      "rating"
    ],
    rankingRules: [
      "words",
      "typo",
      "proximity",
      "attribute",
      "sort",
      "exactness",
      "in_stock:desc",
      "total_sales:desc"
    ]
  });
  return { ok: true, task };
});

export { settings_get as default };
//# sourceMappingURL=settings.get.mjs.map
