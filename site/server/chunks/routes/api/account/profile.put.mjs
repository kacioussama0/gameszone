import { d as defineEventHandler, r as requireAccount, f as readBody, c as createError, w as wooFetch, t as toAccount, s as setAccount } from '../../../nitro/nitro.mjs';
import { z } from 'zod';
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

const schema = z.object({
  first_name: z.string().trim().min(2).max(50),
  last_name: z.string().trim().min(2).max(50),
  phone: z.string().regex(/^(05|06|07)[0-9]{8}$/)
});
const profile_put = defineEventHandler(async (event) => {
  const account = await requireAccount(event);
  const parsed = schema.safeParse(await readBody(event));
  if (!parsed.success) throw createError({ statusCode: 400, statusMessage: "Invalid profile details" });
  const { first_name, last_name, phone } = parsed.data;
  const customer = await wooFetch(`/customers/${account.id}`, {
    method: "PUT",
    body: { first_name, last_name, billing: { first_name, last_name, phone } }
  });
  const updated = toAccount(customer);
  await setAccount(event, updated);
  return { account: updated };
});

export { profile_put as default };
//# sourceMappingURL=profile.put.mjs.map
