const toProductCard = (product) => {
  var _a, _b, _c;
  return {
    id: product.id,
    name: product.name,
    categories: product.categories,
    slug: product.slug,
    thumbnail: ((_b = (_a = product.images) == null ? void 0 : _a[0]) == null ? void 0 : _b.thumbnail) || "",
    image: (_c = product.images) == null ? void 0 : _c[0],
    type: product.type,
    grouped_products: product.grouped_products,
    variations: product.variations,
    is_epay: product.is_epay,
    is_prepay: product.is_prepay,
    price: product.price,
    on_sale: product.on_sale,
    regular_price: product.regular_price,
    stock: product.stock_status,
    occasion: (product.categories || []).some((category) => category.slug == "occasion")
  };
};

export { toProductCard as t };
//# sourceMappingURL=useProductCard-BVznlLYM.mjs.map
