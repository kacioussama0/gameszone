import { d as defineEventHandler, w as wooFetch, B as storeApiUrl } from '../../nitro/nitro.mjs';
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

const HIDDEN_SLUGS = ["par-defaut", "uncategorized", "carousel", "gameshop-hits", "notre-selection", "new-arrivals"];
const decode = (text) => text.replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n))).replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCharCode(parseInt(n, 16))).replace(/&quot;/g, '"').replace(/&#039;|&apos;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&");
const fetchAll = async (load) => {
  const all = [];
  for (let page = 1; page <= 10; page++) {
    const batch = await load(page);
    all.push(...batch);
    if (batch.length < 100) break;
  }
  return all;
};
const loadCategories = async () => {
  try {
    return await fetchAll((page) => wooFetch("/products/categories", {
      query: { per_page: 100, page, hide_empty: true }
    }));
  } catch {
    return fetchAll((page) => $fetch(storeApiUrl("/v1/products/categories"), {
      query: { per_page: 100, page },
      timeout: 15e3
    }));
  }
};
const menu_get = defineEventHandler(async () => {
  const categories = (await loadCategories()).filter((c) => c.count > 0 && !HIDDEN_SLUGS.includes(c.slug));
  const byParent = /* @__PURE__ */ new Map();
  for (const c of categories) {
    byParent.set(c.parent, [...byParent.get(c.parent) || [], c]);
  }
  const sorted = (list) => [...list].sort((a, b) => {
    var _a, _b;
    return ((_a = a.menu_order) != null ? _a : 0) - ((_b = b.menu_order) != null ? _b : 0) || b.count - a.count || a.name.localeCompare(b.name);
  });
  const build = (parent, depth) => sorted(byParent.get(parent) || []).map((c) => {
    var _a, _b;
    return {
      id: c.id,
      name: decode(c.name),
      slug: c.slug,
      image: ((_a = c.image) == null ? void 0 : _a.thumbnail) || ((_b = c.image) == null ? void 0 : _b.src) || null,
      children: depth < 2 ? build(c.id, depth + 1) : []
    };
  });
  return build(0, 0);
});

export { menu_get as default };
//# sourceMappingURL=menu.get.mjs.map
