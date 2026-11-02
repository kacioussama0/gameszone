import { d as defineEventHandler, f as readBody, c as createError, h as assertNotThrottled, y as getRequestIP, w as wooFetch, j as recordFailure, t as toAccount, s as setAccount } from '../../../nitro/nitro.mjs';
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
  email: z.string().trim().toLowerCase().email(),
  phone: z.string().regex(/^(05|06|07)[0-9]{8}$/),
  password: z.string().min(8).max(200)
});
const register_post = defineEventHandler(async (event) => {
  var _a;
  const parsed = schema.safeParse(await readBody(event));
  if (!parsed.success) throw createError({ statusCode: 400, statusMessage: "Invalid registration details" });
  const { first_name, last_name, email, phone, password } = parsed.data;
  assertNotThrottled(`register:${getRequestIP(event, { xForwardedFor: true }) || "ip?"}`);
  let customer;
  try {
    customer = await wooFetch("/customers", {
      method: "POST",
      body: {
        email,
        username: email,
        password,
        first_name,
        last_name,
        billing: { first_name, last_name, email, phone, country: "DZ" }
      }
    });
  } catch (e) {
    recordFailure(`register:${getRequestIP(event, { xForwardedFor: true }) || "ip?"}`);
    const code = String(((_a = e == null ? void 0 : e.data) == null ? void 0 : _a.code) || "");
    if (code.includes("email-exists") || code.includes("username-exists")) {
      throw createError({ statusCode: 409, statusMessage: "Email already registered" });
    }
    throw createError({ statusCode: 502, statusMessage: "Registration failed" });
  }
  const account = toAccount(customer);
  await setAccount(event, account);
  return { account };
});

export { register_post as default };
//# sourceMappingURL=register.post.mjs.map
