import { d as defineEventHandler, b as getQuery, e as wooFetchRaw } from '../../../nitro/nitro.mjs';
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

const products_get = defineEventHandler(async (event) => {
  const query = getQuery(event);
  const res = await wooFetchRaw("/products", {
    query: {
      ...query,
      status: "publish"
    }
  });
  const products = await Promise.all(
    res._data.map(async (product) => {
      let variations = [];
      if (product.type === "variable") {
        for (let page = 1, pages = 1; page <= pages; page++) {
          const res2 = await wooFetchRaw(`/products/${product.id}/variations`, {
            query: { per_page: 100, page }
          });
          variations.push(...res2._data || []);
          pages = Number(res2.headers.get("x-wp-totalpages")) || 1;
        }
      }
      const tagNames = product.tags.map((tag) => tag.name.trim().toLowerCase());
      const prepayTag = tagNames.find((name) => /^prepay-\d+$/.test(name));
      const prepayAmount = prepayTag ? Number(prepayTag.split("-")[1]) : 0;
      return {
        id: product.id,
        name: product.name,
        slug: product.slug,
        sku: product.sku,
        type: product.type,
        price: product.price,
        description: product.description,
        short_description: product.short_description,
        regular_price: product.regular_price,
        sale_price: product.sale_price,
        on_sale: product.on_sale,
        purchasable: product.purchasable,
        categories: product.categories,
        tags: product.tags,
        images: product.images,
        attributes: product.attributes,
        related_ids: product.related_ids,
        upsell_ids: product.upsell_ids,
        stock_status: product.stock_status,
        grouped_products: product.type == "grouped" ? product.grouped_products : void 0,
        variations: variations.map((v) => {
          var _a;
          return {
            id: v.id,
            price: v.price,
            regular_price: v.regular_price,
            sale_price: v.sale_price,
            stock_status: v.stock_status,
            attributes: v.attributes,
            image: ((_a = v.image) == null ? void 0 : _a.src) ? { id: v.image.id, src: v.image.src, alt: v.image.alt } : null
          };
        }),
        is_epay: tagNames.includes("epay"),
        is_prepay: prepayAmount > 0,
        prepay_amount: prepayAmount
      };
    })
  );
  return {
    products,
    total: Number(res.headers.get("x-wp-total")),
    totalPages: Number(res.headers.get("x-wp-totalpages"))
  };
});

export { products_get as default };
//# sourceMappingURL=products.get.mjs.map
