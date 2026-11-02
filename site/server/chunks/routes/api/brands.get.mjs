import { d as defineEventHandler, B as storeApiUrl } from '../../nitro/nitro.mjs';
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

const decode = (text) => text.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n))).replace(/&quot;/g, '"').replace(/&#039;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const brands_get = defineEventHandler(async () => {
  const all = [];
  for (let page = 1; page <= 10; page++) {
    const batch = await $fetch(storeApiUrl("/v1/products/brands"), {
      query: { per_page: 100, page },
      timeout: 15e3
    });
    all.push(...batch);
    if (batch.length < 100) break;
  }
  return all.filter((b) => {
    var _a;
    return b.count > 0 && ((_a = b.image) == null ? void 0 : _a.src);
  }).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name)).map((b) => ({
    id: b.id,
    name: decode(b.name),
    logo: b.image.thumbnail || b.image.src
  }));
});

export { brands_get as default };
//# sourceMappingURL=brands.get.mjs.map
