import { d as defineEventHandler, b as getQuery, D as ecotrackFetch } from '../../../nitro/nitro.mjs';
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

const cost_get = defineEventHandler(async (event) => {
  let query = getQuery(event);
  const response = await ecotrackFetch("/api/v1/get/fees");
  let costs = response.livraison;
  if (query.wilaya_id) costs = costs.filter((cost) => cost.wilaya_id == query.wilaya_id);
  return costs.map((wilaya) => {
    const cost = {
      "wilaya_id": wilaya.wilaya_id,
      "tarif": Number(wilaya.tarif) + 100,
      "tarif_stopdesk": Number(wilaya.tarif_stopdesk) + 100
    };
    if (wilaya.wilaya_id == 16) {
      cost.tarif_shop = wilaya.wilaya_id == 16 ? 0 : "";
    }
    return cost;
  });
});

export { cost_get as default };
//# sourceMappingURL=cost.get.mjs.map
