'use strict';
/**
 * Supported networks and URL helpers.
 * This list is the single source of truth: the build step also hands it to the
 * browser script, so adding a network here is enough for both sides.
 */

const PLATFORMS = [
  { id: 'tiktok', name: 'TikTok', hosts: ['tiktok.com'] },
  { id: 'instagram', name: 'Instagram', hosts: ['instagram.com', 'instagr.am'] },
  { id: 'facebook', name: 'Facebook', hosts: ['facebook.com', 'fb.watch', 'fb.com'] },
  { id: 'x', name: 'X (Twitter)', hosts: ['x.com', 'twitter.com'] },
  // Pinterest uses many country domains (pinterest.de, pinterest.co.uk, ...).
  { id: 'pinterest', name: 'Pinterest', hosts: ['pin.it'], pattern: '(^|\\.)pinterest\\.[a-z]{2,3}(\\.[a-z]{2})?$' },
  { id: 'reddit', name: 'Reddit', hosts: ['reddit.com', 'redd.it'] },
  { id: 'snapchat', name: 'Snapchat', hosts: ['snapchat.com'] },
  { id: 'linkedin', name: 'LinkedIn', hosts: ['linkedin.com'] },
  { id: 'dailymotion', name: 'Dailymotion', hosts: ['dailymotion.com', 'dai.ly'] },
  { id: 'twitch', name: 'Twitch', hosts: ['twitch.tv'] },
  { id: 'bluesky', name: 'Bluesky', hosts: ['bsky.app'] },
  { id: 'tumblr', name: 'Tumblr', hosts: ['tumblr.com'] },
  { id: 'vimeo', name: 'Vimeo', hosts: ['vimeo.com'] },
  { id: 'vk', name: 'VK', hosts: ['vk.com', 'vk.ru', 'vkvideo.ru'] },
  { id: 'okru', name: 'OK.ru', hosts: ['ok.ru', 'odnoklassniki.ru'] },
  { id: 'rumble', name: 'Rumble', hosts: ['rumble.com'] },
  { id: 'bilibili', name: 'Bilibili', hosts: ['bilibili.com', 'bilibili.tv', 'b23.tv'] },
  { id: 'telegram', name: 'Telegram', hosts: ['t.me', 'telegram.me'] },
  { id: 'soundcloud', name: 'SoundCloud', hosts: ['soundcloud.com'] },
  { id: 'imgur', name: 'Imgur', hosts: ['imgur.com'] },
  { id: '9gag', name: '9GAG', hosts: ['9gag.com'] },
  { id: 'streamable', name: 'Streamable', hosts: ['streamable.com'] },
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

function hostMatches(platform, host) {
  if (platform.hosts.some((h) => host === h || host.endsWith(`.${h}`))) return true;
  return platform.pattern ? new RegExp(platform.pattern).test(host) : false;
}

function detectPlatform(url) {
  let host;
  try {
    host = new URL(url).hostname.toLowerCase();
  } catch {
    return null;
  }
  return PLATFORMS.find((p) => hostMatches(p, host)) || null;
}

/** Human list for messages: "TikTok, Instagram, ... or Tumblr". */
function platformNames() {
  const names = PLATFORMS.map((p) => p.name);
  return `${names.slice(0, -1).join(', ')} or ${names[names.length - 1]}`;
}

module.exports = { PLATFORMS, normalizeUrl, detectPlatform, platformNames };
