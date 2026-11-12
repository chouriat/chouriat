// Google AdSense publisher ID, e.g. "ca-pub-1234567890123456".
// Ads stay off until NEXT_PUBLIC_ADSENSE_CLIENT_ID is set.
const raw = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID?.trim() ?? "";

export const ADSENSE_CLIENT_ID = /^ca-pub-\d{10,20}$/.test(raw) ? raw : "";

export const isAdSenseEnabled = ADSENSE_CLIENT_ID !== "";

/** "ca-pub-123" -> "pub-123", the form ads.txt expects. */
export const ADSENSE_PUBLISHER_ID = ADSENSE_CLIENT_ID.replace(/^ca-/, "");
