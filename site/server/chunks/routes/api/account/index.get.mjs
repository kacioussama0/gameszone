import { d as defineEventHandler, r as requireAccount, b as getQuery, e as wooFetchRaw, P as PAYABLE_STATUSES } from '../../../nitro/nitro.mjs';
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

const index_get = defineEventHandler(async (event) => {
  const account = await requireAccount(event);
  const page = Math.max(1, Math.min(100, Number(getQuery(event).page) || 1));
  const res = await wooFetchRaw("/orders", {
    query: { customer: account.id, per_page: 10, page, orderby: "date", order: "desc" }
  });
  return {
    page,
    totalPages: Number(res.headers.get("x-wp-totalpages")) || 1,
    total: Number(res.headers.get("x-wp-total")) || 0,
    orders: (res._data || []).map((order) => ({
      id: order.id,
      number: order.number,
      status: order.status,
      date: order.date_created,
      total: Number(order.total),
      itemsCount: (order.line_items || []).reduce((sum, i) => sum + Number(i.quantity), 0),
      items: (order.line_items || []).slice(0, 4).map((i) => {
        var _a;
        return {
          name: i.name,
          image: ((_a = i.image) == null ? void 0 : _a.src) || ""
        };
      }),
      payable: PAYABLE_STATUSES.includes(order.status)
    }))
  };
});

export { index_get as default };
//# sourceMappingURL=index.get.mjs.map
