import { d as defineEventHandler, A as getAccount } from '../../../nitro/nitro.mjs';
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

const session_get = defineEventHandler(async (event) => ({ account: await getAccount(event) }));

export { session_get as default };
//# sourceMappingURL=session.get.mjs.map
