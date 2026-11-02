import { d as defineEventHandler, r as requireAccount, h as assertNotThrottled, y as getRequestIP, E as getRequestHeader, F as PROOF_MAX_BYTES, c as createError, G as readMultipartFormData, H as findManualMethod, j as recordFailure, w as wooFetch, I as getDzdRates, J as toForeignAmount, K as CURRENCY_SYMBOLS, v as useRuntimeConfig, m as wpUrl } from '../../../nitro/nitro.mjs';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'meilisearch';
import 'node:url';
import 'ipx';

const payloadSchema = z.object({
  method: z.string(),
  billing: z.object({
    first_name: z.string().trim().min(2).max(50),
    last_name: z.string().trim().min(2).max(50),
    phone: z.string().regex(/^(05|06|07)[0-9]{8}$/),
    email: z.string().trim().email()
  }),
  items: z.array(z.object({
    product_id: z.coerce.number().int().positive(),
    quantity: z.coerce.number().int().min(1).max(50),
    variation_id: z.coerce.number().int().positive().nullish(),
    meta: z.array(z.object({ key: z.string().max(100), value: z.string().max(100) })).max(10).optional()
  })).min(1).max(50),
  note: z.string().max(500).optional()
});
const sniff = (data) => {
  if (data.subarray(0, 4).toString("latin1") === "%PDF") return { ext: "pdf", type: "application/pdf" };
  if (data[0] === 255 && data[1] === 216 && data[2] === 255) return { ext: "jpg", type: "image/jpeg" };
  if (data.subarray(0, 8).equals(Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]))) return { ext: "png", type: "image/png" };
  if (data.subarray(0, 4).toString("latin1") === "RIFF" && data.subarray(8, 12).toString("latin1") === "WEBP") return { ext: "webp", type: "image/webp" };
  return null;
};
const uploadProof = async (data, file) => {
  const cfg = useRuntimeConfig();
  if (!cfg.wpAppUser || !cfg.wpAppPassword) {
    throw createError({ statusCode: 503, statusMessage: "Receipt upload not configured (WP_APP_USER / WP_APP_PASSWORD)" });
  }
  const auth = `Basic ${Buffer.from(`${cfg.wpAppUser}:${String(cfg.wpAppPassword).replace(/\s+/g, "")}`).toString("base64")}`;
  const filename = `receipt-${randomUUID()}.${file.ext}`;
  const media = await $fetch(`${wpUrl()}/wp-json/wp/v2/media`, {
    method: "POST",
    headers: {
      Authorization: auth,
      "Content-Type": file.type,
      "Content-Disposition": `attachment; filename="${filename}"`
    },
    body: data,
    timeout: 3e4
  });
  try {
    await $fetch(`${wpUrl()}/wp-json/wp/v2/media/${media.id}`, {
      method: "POST",
      headers: { Authorization: auth },
      body: { status: "private", title: "Payment receipt" },
      timeout: 15e3
    });
  } catch {
  }
  return { id: Number(media.id), url: String(media.source_url || "") };
};
const manual_post = defineEventHandler(async (event) => {
  var _a;
  const account = await requireAccount(event);
  assertNotThrottled(`manual-pay:${getRequestIP(event, { xForwardedFor: true }) || "ip?"}`);
  const declared = Number(getRequestHeader(event, "content-length") || 0);
  if (!declared || declared > PROOF_MAX_BYTES + 256 * 1024) {
    throw createError({ statusCode: 413, statusMessage: "Receipt too large (5 MB max)" });
  }
  const form = await readMultipartFormData(event);
  const payloadPart = form == null ? void 0 : form.find((p) => p.name === "payload");
  const filePart = form == null ? void 0 : form.find((p) => p.name === "proof");
  if (!payloadPart || !((_a = filePart == null ? void 0 : filePart.data) == null ? void 0 : _a.length)) {
    throw createError({ statusCode: 400, statusMessage: "Order details and receipt are required" });
  }
  let payload;
  try {
    payload = payloadSchema.parse(JSON.parse(payloadPart.data.toString("utf8")));
  } catch {
    throw createError({ statusCode: 400, statusMessage: "Invalid order details" });
  }
  const method = findManualMethod(payload.method);
  if (!method) throw createError({ statusCode: 400, statusMessage: "Unknown payment method" });
  if (filePart.data.length > PROOF_MAX_BYTES) {
    throw createError({ statusCode: 413, statusMessage: "Receipt too large (5 MB max)" });
  }
  const fileType = sniff(filePart.data);
  if (!fileType) throw createError({ statusCode: 415, statusMessage: "Receipt must be an image or a PDF" });
  recordFailure(`manual-pay:${getRequestIP(event, { xForwardedFor: true }) || "ip?"}`);
  const proof = await uploadProof(filePart.data, fileType).catch((e) => {
    var _a2;
    if ((e == null ? void 0 : e.statusCode) === 503) throw e;
    console.error("[manual-pay] receipt upload failed:", e == null ? void 0 : e.status, e == null ? void 0 : e.message, (_a2 = JSON.stringify(e == null ? void 0 : e.data)) == null ? void 0 : _a2.slice(0, 500));
    throw createError({ statusCode: 502, statusMessage: "Receipt upload failed" });
  });
  let order;
  try {
    order = await wooFetch("/orders", {
      method: "POST",
      body: {
        customer_id: account.id,
        payment_method: `gz_${method.id}`,
        payment_method_title: method.title,
        set_paid: false,
        status: "on-hold",
        billing: { ...payload.billing, country: "DZ" },
        customer_note: payload.note || "",
        line_items: payload.items.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
          variation_id: item.variation_id || void 0,
          meta_data: item.meta
        })),
        meta_data: [
          { key: "_gz_payment_method", value: method.id },
          { key: "_gz_payment_proof", value: proof.url },
          { key: "_gz_payment_proof_id", value: String(proof.id) }
        ]
      }
    });
  } catch {
    throw createError({ statusCode: 502, statusMessage: "Order could not be created" });
  }
  let foreign = "";
  if (method.currency) {
    const rate = (await getDzdRates())[method.currency];
    const amount = toForeignAmount(Number(order.total), rate);
    foreign = ` = ${amount} ${CURRENCY_SYMBOLS[method.currency]} (taux ${rate} DA)`;
  }
  try {
    await wooFetch(`/orders/${order.id}/notes`, {
      method: "POST",
      body: {
        note: `Paiement manuel : ${method.title} \u2014 ${order.total} DA${foreign} \xE0 v\xE9rifier.
Re\xE7u : ${proof.url}`,
        customer_note: false
      }
    });
  } catch {
  }
  return { orderId: order.id, number: order.number, total: Number(order.total), method: method.id };
});

export { manual_post as default };
//# sourceMappingURL=manual.post.mjs.map
