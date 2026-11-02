import { d as defineEventHandler, D as ecotrackFetch } from '../../../nitro/nitro.mjs';
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

const commune_get = defineEventHandler(async () => {
  return await ecotrackFetch("/api/v1/get/communes");
});

export { commune_get as default };
//# sourceMappingURL=commune.get.mjs.map
