import { I as defineNuxtRouteMiddleware, h as useAccount, E as navigateTo } from './server.mjs';
import { s as safeRedirect } from './redirect-Dg53C-C6.mjs';
import 'vue';
import '../nitro/nitro.mjs';
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
import 'vue-router';
import '@algolia/cache-in-memory';
import '@algolia/requester-fetch';
import 'vue/server-renderer';
import '@vue/shared';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';

const guest = defineNuxtRouteMiddleware((to) => {
  const { account } = useAccount();
  if (account.value) return navigateTo(safeRedirect(to.query.redirect));
});

export { guest as default };
//# sourceMappingURL=guest-CuiJZa-G.mjs.map
