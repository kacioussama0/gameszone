import { d as defineEventHandler, c as createError, b as getQuery, n as setCookie, o as sendRedirect, p as getCookie, q as deleteCookie, s as setAccount, t as toAccount, v as useRuntimeConfig, x as getRequestURL, w as wooFetch } from '../../../nitro/nitro.mjs';
import { randomBytes, timingSafeEqual } from 'node:crypto';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'meilisearch';
import 'node:url';
import 'ipx';

const safeRedirect = (value, fallback = "/account") => {
  const path = String(value || "");
  return path.startsWith("/") && !path.startsWith("//") && !path.startsWith("/\\") ? path : fallback;
};

const STATE_COOKIE = "gz_google_oauth";
const callbackUrl = (event) => `${getRequestURL(event, { xForwardedHost: true, xForwardedProto: true }).origin}/api/auth/google`;
const sameState = (a, b) => a.length === b.length && timingSafeEqual(Buffer.from(a), Buffer.from(b));
const failed = (event, redirect) => sendRedirect(event, `/account/login?error=google&redirect=${encodeURIComponent(redirect)}`);
const findOrCreateCustomer = async (profile) => {
  const existing = await wooFetch("/customers", { query: { email: profile.email, role: "all" } });
  if (existing == null ? void 0 : existing[0]) return existing[0];
  const [first, ...rest] = String(profile.name || "").trim().split(/\s+/);
  const first_name = String(profile.given_name || first || "").slice(0, 50);
  const last_name = String(profile.family_name || rest.join(" ") || "").slice(0, 50);
  return wooFetch("/customers", {
    method: "POST",
    body: {
      email: profile.email,
      username: profile.email,
      password: randomBytes(24).toString("base64url"),
      first_name,
      last_name,
      billing: { first_name, last_name, email: profile.email, country: "DZ" }
    }
  });
};
const google_get = defineEventHandler(async (event) => {
  var _a;
  const cfg = useRuntimeConfig();
  if (!cfg.googleClientId || !cfg.googleClientSecret) {
    throw createError({ statusCode: 503, statusMessage: "Google login not configured (GOOGLE_CLIENT_ID / GOOGLE_CLIENT_SECRET)" });
  }
  const query = getQuery(event);
  if (!query.code && !query.error) {
    const state = randomBytes(24).toString("base64url");
    const redirect2 = safeRedirect(query.redirect);
    setCookie(event, STATE_COOKIE, JSON.stringify({ state, redirect: redirect2 }), {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/api/auth/google",
      maxAge: 10 * 60
    });
    const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
    url.search = new URLSearchParams({
      client_id: String(cfg.googleClientId),
      redirect_uri: callbackUrl(event),
      response_type: "code",
      scope: "openid email profile",
      state,
      prompt: "select_account"
    }).toString();
    return sendRedirect(event, url.toString());
  }
  let saved = {};
  try {
    saved = JSON.parse(getCookie(event, STATE_COOKIE) || "{}");
  } catch {
  }
  deleteCookie(event, STATE_COOKIE, { path: "/api/auth/google" });
  const redirect = safeRedirect(saved.redirect);
  if (query.error || !saved.state || !sameState(String(query.state || ""), saved.state)) {
    return failed(event, redirect);
  }
  try {
    const token = await $fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      body: new URLSearchParams({
        code: String(query.code),
        client_id: String(cfg.googleClientId),
        client_secret: String(cfg.googleClientSecret),
        redirect_uri: callbackUrl(event),
        grant_type: "authorization_code"
      }),
      timeout: 15e3
    });
    const profile = await $fetch(
      "https://openidconnect.googleapis.com/v1/userinfo",
      { headers: { Authorization: `Bearer ${token.access_token}` }, timeout: 15e3 }
    );
    if (!profile.email || !profile.email_verified) return failed(event, redirect);
    const customer = await findOrCreateCustomer({ ...profile, email: profile.email.toLowerCase() });
    await setAccount(event, toAccount(customer));
    return sendRedirect(event, redirect);
  } catch (e) {
    console.error("[google-login] failed:", e == null ? void 0 : e.status, e == null ? void 0 : e.message, (_a = JSON.stringify(e == null ? void 0 : e.data)) == null ? void 0 : _a.slice(0, 300));
    return failed(event, redirect);
  }
});

export { google_get as default };
//# sourceMappingURL=google.get.mjs.map
