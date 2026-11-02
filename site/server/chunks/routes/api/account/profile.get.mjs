import { d as defineEventHandler, r as requireAccount, w as wooFetch } from '../../../nitro/nitro.mjs';
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

const profile_get = defineEventHandler(async (event) => {
  var _a;
  const account = await requireAccount(event);
  const customer = await wooFetch(`/customers/${account.id}`);
  return {
    first_name: customer.first_name || "",
    last_name: customer.last_name || "",
    email: customer.email || "",
    phone: ((_a = customer.billing) == null ? void 0 : _a.phone) || "",
    date_created: customer.date_created
  };
});

export { profile_get as default };
//# sourceMappingURL=profile.get.mjs.map
