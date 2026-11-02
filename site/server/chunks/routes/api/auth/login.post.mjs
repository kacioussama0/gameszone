import { d as defineEventHandler, f as readBody, c as createError, y as getRequestIP, h as assertNotThrottled, i as checkPassword, j as recordFailure, k as clearFailures, w as wooFetch, t as toAccount, s as setAccount } from '../../../nitro/nitro.mjs';
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
  email: z.string().trim().toLowerCase().email(),
  password: z.string().min(1).max(200)
});
const login_post = defineEventHandler(async (event) => {
  const parsed = schema.safeParse(await readBody(event));
  if (!parsed.success) throw createError({ statusCode: 400, statusMessage: "Invalid email or password" });
  const { email, password } = parsed.data;
  const key = `${getRequestIP(event, { xForwardedFor: true }) || "ip?"}:${email}`;
  assertNotThrottled(key);
  if (!await checkPassword(email, password)) {
    recordFailure(key);
    throw createError({ statusCode: 401, statusMessage: "Invalid email or password" });
  }
  clearFailures(key);
  const customers = await wooFetch("/customers", { query: { email, role: "all" } });
  const customer = customers == null ? void 0 : customers[0];
  if (!customer) throw createError({ statusCode: 401, statusMessage: "Invalid email or password" });
  const account = toAccount(customer);
  await setAccount(event, account);
  return { account };
});

export { login_post as default };
//# sourceMappingURL=login.post.mjs.map
