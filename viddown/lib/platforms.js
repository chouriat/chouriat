'use strict';
/** Supported platforms and URL helpers. */

const PLATFORMS = [
  { id: 'tiktok', name: 'TikTok', hosts: ['tiktok.com', 'vm.tiktok.com', 'vt.tiktok.com'] },
  { id: 'instagram', name: 'Instagram', hosts: ['instagram.com', 'instagr.am'] },
  { id: 'facebook', name: 'Facebook', hosts: ['facebook.com', 'fb.watch', 'fb.com'] },
  { id: 'x', name: 'X (Twitter)', hosts: ['x.com', 'twitter.com'] },
];

/** Pull the first http(s) URL out of whatever the user pasted (share text often wraps it). */
function normalizeUrl(input) {
  if (typeof input !== 'string') return null;
  const match = input.trim().slice(0, 2048).match(/https?:\/\/[^\s"'<>]+/i);
  let candidate = match ? match[0] : input.trim();
  if (!/^https?:\/\//i.test(candidate)) candidate = `https://${candidate}`;
  try {
    const u = new URL(candidate);
    if (!['http:', 'https:'].includes(u.protocol)) return null;
    if (u.username || u.password || u.port) return null;
    u.protocol = 'https:';
    return u.toString();
  } catch {
    return null;
  }
}

function detectPlatform(url) {
  let host;
  try {
    host = new URL(url).hostname.toLowerCase();
  } catch {
    return null;
  }
  return (
    PLATFORMS.find((p) => p.hosts.some((h) => host === h || host.endsWith(`.${h}`))) || null
  );
}

module.exports = { PLATFORMS, normalizeUrl, detectPlatform };
