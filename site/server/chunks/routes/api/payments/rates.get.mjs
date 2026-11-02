import { d as defineEventHandler, I as getDzdRates } from '../../../nitro/nitro.mjs';
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

const rates_get = defineEventHandler(() => getDzdRates());

export { rates_get as default };
//# sourceMappingURL=rates.get.mjs.map
