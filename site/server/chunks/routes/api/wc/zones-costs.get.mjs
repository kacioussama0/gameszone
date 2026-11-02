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

function getWilayaNumber(code) {
  const match = code.match(/-(\d+)$/);
  return match ? match[1] : null;
}
function getBasicAuth() {
  return {
    base: `${wpUrl()}/wp-json/wc/v3`,
    headers: { Authorization: wooAuth() }
  };
}
function extractCost(method) {
  var _a, _b, _c, _d, _e;
  const raw = (_e = (_d = (_b = (_a = method == null ? void 0 : method.settings) == null ? void 0 : _a.cost) == null ? void 0 : _b.value) != null ? _d : (_c = method == null ? void 0 : method.settings) == null ? void 0 : _c.cost) != null ? _e : null;
  if (raw !== null && raw !== void 0 && raw !== "") {
    const n = Number(String(raw).replace(",", "."));
    if (!Number.isNaN(n)) return n;
  }
  if (method.method_id === "free_shipping") return 0;
  if (method.method_id === "local_pickup") return 0;
  return null;
}
const zonesCosts_get = defineEventHandler(async () => {
  const { base, headers } = getBasicAuth();
  const zones = await $fetch(`${base}/shipping/zones`, { headers });
  const out = await Promise.all(
    zones.map(async (z) => {
      const locations = await $fetch(
        `${base}/shipping/zones/${z.id}/locations`,
        { headers }
      );
      const methods = await $fetch(
        `${base}/shipping/zones/${z.id}/methods`,
        { headers }
      );
      const simplifiedMethods = methods.filter((m) => m.enabled).map((m) => ({
        id: m.id,
        type: m.method_id,
        // flat_rate / free_shipping / local_pickup ...
        name: m.title,
        cost: extractCost(m)
      })).filter((m) => m.cost !== null);
      return {
        zone_id: z.id,
        zone_name: z.name,
        region: locations.map((l) => ({
          code: getWilayaNumber(l.code)
        })),
        methods: simplifiedMethods
      };
    })
  );
  return out;
});

export { zonesCosts_get as default };
//# sourceMappingURL=zones-costs.get.mjs.map
