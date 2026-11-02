import { d as defineEventHandler, c as createError, l as wooAuth, m as wpUrl, v as useRuntimeConfig } from '../../../nitro/nitro.mjs';
import algoliasearch from 'algoliasearch';
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

const sync_get = defineEventHandler(async () => {
  const cfg = useRuntimeConfig();
  if (!cfg.algoliaAppId || !cfg.algoliaAdminKey) {
    throw createError({ statusCode: 500, statusMessage: "ALGOLIA_APPLICATION_ID / ALGOLIA_ADMIN_API_KEY not set" });
  }
  const client = algoliasearch(String(cfg.algoliaAppId), String(cfg.algoliaAdminKey));
  const index = client.initIndex("products");
  const auth = wooAuth();
  const perPage = 100;
  let page = 1;
  let total = 0;
  while (true) {
    const products = await $fetch(
      `${wpUrl()}/wp-json/wc/v3/products?status=publish&per_page=${perPage}&page=${page}`,
      { headers: { Authorization: auth } }
    );
    if (!products.length) break;
    const records = products.map((p) => {
      var _a, _b, _c, _d, _e, _f;
      return {
        objectID: p.id,
        name: p.name,
        slug: p.slug,
        sku: p.sku || null,
        created_at: p.date_created,
        created_at_ts: new Date(p.date_created).getTime(),
        price: Number(p.price || 0),
        regular_price: Number(p.regular_price || 0),
        sale_price: Number(p.sale_price || 0),
        on_sale: p.on_sale || false,
        image: ((_b = (_a = p.images) == null ? void 0 : _a[0]) == null ? void 0 : _b.thumbnail) ? p.images[0].thumbnail : null,
        in_stock: p.stock_status === "instock",
        stock_status: p.stock_status,
        categories: (p.categories || []).map((c) => c.name),
        category_ids: (p.categories || []).map((c) => c.id),
        tags: (p.tags || []).map((t) => t.name),
        brand: ((_c = p.brands) == null ? void 0 : _c.length) ? p.brands[0].name : ((_f = (_e = (_d = p.attributes) == null ? void 0 : _d.find((a) => a.name.toLowerCase() === "brand")) == null ? void 0 : _e.options) == null ? void 0 : _f[0]) || null,
        total_sales: p.total_sales || 0,
        rating: p.average_rating ? Number(p.average_rating) : 0,
        attributes: (p.attributes || []).reduce((acc, attr) => {
          acc[attr.name.toLowerCase()] = attr.options;
          return acc;
        }, {}),
        status: p.status,
        permalink: p.permalink
      };
    });
    await index.saveObjects(records);
    total += records.length;
    page++;
  }
  return { ok: true, indexed: total };
});

export { sync_get as default };
//# sourceMappingURL=sync.get.mjs.map
