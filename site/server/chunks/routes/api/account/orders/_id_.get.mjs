import { d as defineEventHandler, g as getOwnOrder, w as wooFetch, P as PAYABLE_STATUSES } from '../../../../nitro/nitro.mjs';
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

const _id__get = defineEventHandler(async (event) => {
  var _a, _b;
  const order = await getOwnOrder(event);
  let notes = [];
  try {
    notes = await wooFetch(`/orders/${order.id}/notes`, { query: { type: "customer" } });
  } catch {
  }
  const slugs = /* @__PURE__ */ new Map();
  const productIds = [...new Set((order.line_items || []).map((i) => Number(i.product_id)).filter(Boolean))];
  if (productIds.length) {
    try {
      const products = await wooFetch("/products", {
        query: { include: productIds.join(","), per_page: productIds.length, _fields: "id,slug" }
      });
      products.forEach((p) => slugs.set(Number(p.id), p.slug));
    } catch {
    }
  }
  return {
    id: order.id,
    number: order.number,
    status: order.status,
    date: order.date_created,
    datePaid: order.date_paid,
    paymentMethod: order.payment_method_title,
    total: Number(order.total),
    subtotal: (order.line_items || []).reduce((sum, i) => sum + Number(i.subtotal), 0),
    discount: Number(order.discount_total) || 0,
    customerNote: order.customer_note || "",
    email: ((_a = order.billing) == null ? void 0 : _a.email) || "",
    phone: ((_b = order.billing) == null ? void 0 : _b.phone) || "",
    payable: PAYABLE_STATUSES.includes(order.status),
    items: (order.line_items || []).map((i) => {
      var _a2;
      return {
        id: i.id,
        slug: slugs.get(Number(i.product_id)) || "",
        name: i.name,
        quantity: Number(i.quantity),
        total: Number(i.total),
        image: ((_a2 = i.image) == null ? void 0 : _a2.src) || "",
        // visible options such as "Region: France"; WooCommerce hides internal keys with "_"
        options: (i.meta_data || []).filter((m) => {
          var _a3;
          return !String(m.key).startsWith("_") && typeof ((_a3 = m.display_value) != null ? _a3 : m.value) !== "object";
        }).map((m) => {
          var _a3;
          return { label: String(m.display_key || m.key), value: String((_a3 = m.display_value) != null ? _a3 : m.value) };
        })
      };
    }),
    notes: notes.map((n) => ({ date: n.date_created, text: n.note }))
  };
});

export { _id__get as default };
//# sourceMappingURL=_id_.get.mjs.map
