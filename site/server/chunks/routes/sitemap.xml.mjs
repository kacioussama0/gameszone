import { d as defineEventHandler, C as setHeader, v as useRuntimeConfig, e as wooFetchRaw } from '../nitro/nitro.mjs';
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

const HIDDEN_CATEGORIES = [29, 3039, 2216];
const escapeXml = (value) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const sitemap_xml = defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const site = String(config.public.siteUrl).replace(/\/$/, "");
  const fetchAll = async (path, query) => {
    const get = (page) => wooFetchRaw(path, {
      query: { ...query, per_page: 100, page }
    });
    const first = await get(1);
    const items = [...first._data];
    const totalPages = Math.min(Number(first.headers.get("x-wp-totalpages") || 1), 100);
    const rest = Array.from({ length: totalPages - 1 }, (_, i) => i + 2);
    for (let i = 0; i < rest.length; i += 6) {
      const pages = await Promise.all(rest.slice(i, i + 6).map(get));
      pages.forEach((res) => items.push(...res._data));
    }
    return items;
  };
  const [categories, products] = await Promise.all([
    fetchAll("/products/categories", { _fields: "id,count" }),
    fetchAll("/products", { status: "publish", _fields: "slug,date_modified" })
  ]);
  const urls = [
    { loc: `${site}/`, priority: "1.0" },
    { loc: `${site}/shop`, priority: "0.9" },
    ...categories.filter((c) => c.count > 0 && !HIDDEN_CATEGORIES.includes(c.id)).map((c) => ({ loc: `${site}/shop?category=${c.id}`, priority: "0.8" })),
    ...products.map((p) => ({
      loc: `${site}/shop/product/${encodeURIComponent(p.slug)}`,
      lastmod: p.date_modified ? String(p.date_modified).slice(0, 10) : void 0,
      priority: "0.7"
    }))
  ];
  const body = urls.map(
    (u) => `  <url><loc>${escapeXml(u.loc)}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ""}<priority>${u.priority}</priority></url>`
  ).join("\n");
  setHeader(event, "content-type", "application/xml; charset=utf-8");
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;
});

export { sitemap_xml as default };
//# sourceMappingURL=sitemap.xml.mjs.map
