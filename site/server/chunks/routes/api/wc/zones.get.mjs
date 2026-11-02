import { d as defineEventHandler, l as wooAuth, m as wpUrl } from '../../../nitro/nitro.mjs';
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

const zones_get = defineEventHandler(async () => {
  const auth = wooAuth();
  const base = `${wpUrl()}/wp-json/wc/v3`;
  const zones = await $fetch(
    `${base}/shipping/zones`,
    { headers: { Authorization: auth } }
  );
  zones.map((zone) => {
    return {
      id: zone.id,
      name: zone.name
    };
  });
  return zones;
});

export { zones_get as default };
//# sourceMappingURL=zones.get.mjs.map
