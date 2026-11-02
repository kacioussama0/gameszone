import { d as defineEventHandler, r as requireAccount, f as readBody, m as wpUrl, l as wooAuth, c as createError, a as createInvoice } from '../../../nitro/nitro.mjs';
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
  var _a, _b;
  const account = await requireAccount(event);
  const body = await readBody(event);
  const base = `${wpUrl()}/wp-json/wc/v3`;
  const auth = wooAuth();
  if (!((_a = body == null ? void 0 : body.items) == null ? void 0 : _a.length)) {
    throw createError({ statusCode: 400, statusMessage: "items required" });
  }
  if (!(body == null ? void 0 : body.billing)) {
    throw createError({ statusCode: 400, statusMessage: "billing required" });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(body.billing.email || "").trim())) {
    throw createError({ statusCode: 400, statusMessage: "valid billing email required" });
  }
  const orderPayload = {
    customer_id: account.id,
    payment_method: "satim_custom",
    payment_method_title: "CIB/EDAHABIA",
    set_paid: false,
    status: "pending",
    billing: body.billing,
    line_items: body.items.map((i) => {
      var _a2, _b2;
      return {
        product_id: Number(i.product_id),
        quantity: Number((_b2 = (_a2 = i.quantity) != null ? _a2 : i.qty) != null ? _b2 : 1),
        variation_id: i.variation_id ? Number(i.variation_id) : void 0,
        // options a variation leaves open ("any size"), e.g. [{ key: "Taille", value: "XL" }]
        meta_data: Array.isArray(i.meta) ? i.meta.slice(0, 10).map((m) => ({ key: String(m.key).slice(0, 100), value: String(m.value).slice(0, 100) })) : void 0
      };
    }),
    note: body.note
  };
  try {
    const order = await $fetch(`${base}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: auth
      },
      body: orderPayload
    });
    if (orderPayload.note && orderPayload.note.trim() !== "") {
      await $fetch(`${base}/orders/${order.id}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: auth
        },
        body: {
          note: orderPayload.note,
          customer_note: true
        }
      });
    }
    const invoiceItems = order.line_items.map((i) => ({
      name: i.name,
      quantity: Number(i.quantity),
      price: Number(i.price)
    }));
    const amount = Number(order.total);
    const invoice = await createInvoice({
      orderId: order.id,
      amount,
      billing: orderPayload.billing,
      items: invoiceItems
    });
    return {
      orderId: order.id,
      order,
      invoice
    };
  } catch (e) {
    throw createError({
      statusCode: 502,
      statusMessage: ((_b = e == null ? void 0 : e.data) == null ? void 0 : _b.message) || (e == null ? void 0 : e.message) || "WooCommerce order failed"
    });
  }
});

export { pay_post as default };
//# sourceMappingURL=pay.post.mjs.map
