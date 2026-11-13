// Who runs the site, for the Datenschutzerklärung. Set these in the server's
// environment (build time). Until they are set, the page says the details follow.
export const SITE_OPERATOR = (process.env.NEXT_PUBLIC_SITE_OPERATOR ?? "").replace(/\\n/g, "\n").trim();
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? "";
