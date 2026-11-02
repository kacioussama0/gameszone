import { d as defineEventHandler, g as getOwnOrder, P as PAYABLE_STATUSES, c as createError, w as wooFetch, a as createInvoice } from '../../../../../nitro/nitro.mjs';
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

const pay_post = defineEventHandler(async (event) => {
  var _a;
  const order = await getOwnOrder(event);
  if (!PAYABLE_STATUSES.includes(order.status)) {
    throw createError({ statusCode: 409, statusMessage: "Order is not awaiting payment" });
  }
  if (order.status === "failed") {
    await wooFetch(`/orders/${order.id}`, { method: "PUT", body: { status: "pending" } });
  }
  try {
    const invoice = await createInvoice({
      orderId: order.id,
      amount: Number(order.total),
      billing: order.billing,
      items: order.line_items.map((i) => ({
        name: i.name,
        quantity: Number(i.quantity),
        price: Number(i.price)
      }))
    });
    if (!(invoice == null ? void 0 : invoice.url)) throw new Error("No payment link");
    return { orderId: order.id, url: invoice.url };
  } catch (e) {
    throw createError({ statusCode: 502, statusMessage: ((_a = e == null ? void 0 : e.data) == null ? void 0 : _a.message) || "Payment link failed" });
  }
});

export { pay_post as default };
//# sourceMappingURL=pay.post.mjs.map
