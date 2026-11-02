const safeRedirect = (value, fallback = "/account") => {
  const path = String(value || "");
  return path.startsWith("/") && !path.startsWith("//") && !path.startsWith("/\\") ? path : fallback;
};

export { safeRedirect as s };
//# sourceMappingURL=redirect-Dg53C-C6.mjs.map
