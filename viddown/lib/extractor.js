'use strict';
/** Turns a post URL into a list of downloadable items using `yt-dlp -J`. */
const { execFile } = require('child_process');

const YTDLP = process.env.YTDLP_PATH || 'yt-dlp';
const TIMEOUT_MS = Number(process.env.RESOLVE_TIMEOUT_MS || 30000);

// TikTok exposes a watermarked "download" rendition next to clean ones; this
// filter keeps only the clean renditions, falling back if none exist.
const NO_WM = '[format_note!*=watermark]';

function formatSelectors(platformId) {
  const wm = platformId === 'tiktok' ? NO_WM : '';
  return {
    hd: `bv*${wm}[vcodec^=avc]+ba/bv*${wm}[vcodec^=h264]+ba/b${wm}[vcodec^=h264]/b${wm}[vcodec^=avc]/bv*${wm}+ba/b${wm}/b`,
    sd: `bv*${wm}[height<=540][vcodec^=avc]+ba/b${wm}[height<=540][vcodec^=h264]/b${wm}[height<=540]/wv*${wm}+ba/w${wm}/w`,
    audio: `ba/b`,
  };
}

/**
 * Cookie and proxy flags for yt-dlp. A residential proxy is billed per GB, so
 * YTDLP_PROXY_PLATFORMS (comma-separated platform ids, e.g. "tiktok,facebook")
 * limits it to the platforms that block the server. Unset or empty means all.
 */
function proxyApplies(platformId) {
  if (!process.env.YTDLP_PROXY) return false;
  const only = (process.env.YTDLP_PROXY_PLATFORMS || '')
    .split(',')
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return !only.length || only.includes(platformId);
}

function authArgs(platformId, { proxy = true } = {}) {
  const args = [];
  if (process.env.YTDLP_COOKIES) args.push('--cookies', process.env.YTDLP_COOKIES);
  if (proxy && proxyApplies(platformId)) args.push('--proxy', process.env.YTDLP_PROXY);
  return args;
}

function runJson(url, platformId) {
  const args = ['-J', '--no-warnings', '--socket-timeout', '15', '--playlist-end', '20'];
  args.push(...authArgs(platformId));
  args.push('--', url);
  return new Promise((resolve, reject) => {
    execFile(YTDLP, args, { timeout: TIMEOUT_MS, maxBuffer: 64 * 1024 * 1024 }, (err, stdout, stderr) => {
      if (err) {
        const e = new Error((stderr || err.message).trim().split('\n').pop());
        if (err.code === 'ENOENT') {
          e.message = `yt-dlp was not found (looked for "${YTDLP}"). Install it or set YTDLP_PATH.`;
          e.userCode = 'setup';
          e.userMessage = 'The server is not set up yet: its video tool (yt-dlp) is missing. Please contact the site owner.';
          return reject(e);
        }
        if (err.killed) {
          e.message = `yt-dlp timed out after ${TIMEOUT_MS} ms`;
          e.userCode = 'timeout';
          e.userMessage = 'This is taking too long. Please try again in a moment.';
          return reject(e);
        }
        if (/private|login|log in|cookies|authenticat/i.test(stderr)) {
          e.userCode = 'private';
          e.userMessage = 'This post is private or requires a login, so it cannot be downloaded.';
        } else if (/unsupported url/i.test(stderr)) {
          e.userCode = 'not_video';
          e.userMessage = "This link doesn't point to a video. Open the post and copy its link.";
        } else if (/no video/i.test(stderr)) {
          e.userCode = 'no_video';
          e.userMessage = 'We could not find a video in this post.';
        }
        return reject(e);
      }
      try {
        resolve(JSON.parse(stdout));
      } catch (e) {
        reject(e);
      }
    });
  });
}

function safeName(s) {
  return (
    String(s || 'video')
      .replace(/[^\p{L}\p{N} _-]+/gu, '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 60) || 'video'
  );
}

function bestHeight(info) {
  const hs = (info.formats || []).map((f) => f.height || 0).filter(Boolean);
  return hs.length ? Math.max(...hs) : info.height || null;
}

function itemFrom(info, platform, sourceUrl, index) {
  const sel = formatSelectors(platform.id);
  const height = bestHeight(info);
  const title = (info.description || info.title || `${platform.name} post`).replace(/\s+/g, ' ').trim();
  const base = `vid-down_${platform.id}_${safeName(info.id || info.title)}`;
  const formats = info.formats || [];
  const hasVideo = formats.some((f) => f.vcodec && f.vcodec !== 'none') || (!formats.length && info.vcodec && info.vcodec !== 'none');
  const hasAudio = formats.some((f) => f.acodec && f.acodec !== 'none') || (info.acodec && info.acodec !== 'none');

  if (!hasVideo && !hasAudio) {
    return null; // photo posts are not supported
  }
  const mp3 = { label: 'MP3', detail: hasVideo ? 'Audio only' : '192 kbps audio', kind: 'audio', ext: 'mp3', format: sel.audio };
  // Audio-only sources (music and podcast pages) get a single MP3 button.
  const options = hasVideo
    ? [
        {
          label: 'MP4 HD',
          detail: [height ? `${height}p` : 'Best quality', platform.id === 'tiktok' ? 'no watermark' : null].filter(Boolean).join(' · '),
          kind: 'video',
          ext: 'mp4',
          format: sel.hd,
        },
        { label: 'MP4 SD', detail: 'Smaller file', kind: 'video', ext: 'mp4', format: sel.sd },
        mp3,
      ]
    : [mp3];
  return {
    index,
    source: sourceUrl,
    info, // raw yt-dlp metadata, cached so the download can skip the proxy
    title: title.length > 140 ? `${title.slice(0, 137)}…` : title,
    thumbnail: info.thumbnail || (info.thumbnails && info.thumbnails.length ? info.thumbnails[info.thumbnails.length - 1].url : null),
    duration: info.duration || null,
    filename: index ? `${base}_${index}` : base,
    options,
  };
}

// Residential proxies rotate through home connections, and one of them
// occasionally drops mid-request. Those failures are worth a retry.
const TRANSIENT = /SSL|EOF|timed out|Connection (reset|aborted|refused)|ProxyError|Tunnel connection failed|Unable to download webpage|HTTP Error 5\d\d/i;
const RESOLVE_ATTEMPTS = Math.max(1, Number(process.env.RESOLVE_ATTEMPTS || 3));

function isTransient(err) {
  return !err.userMessage && TRANSIENT.test(err.message || '');
}

async function runJsonWithRetry(url, platformId) {
  for (let attempt = 1; ; attempt++) {
    try {
      return await runJson(url, platformId);
    } catch (err) {
      if (attempt >= RESOLVE_ATTEMPTS || !isTransient(err)) throw err;
      console.warn(`[resolve] retry ${attempt}/${RESOLVE_ATTEMPTS - 1} after: ${err.message}`);
    }
  }
}

async function resolveMedia(url, platform) {
  const info = await runJsonWithRetry(url, platform.id);
  const author = info.uploader || info.channel || info.creator || info.uploader_id || null;
  let items;
  if (Array.isArray(info.entries) && info.entries.length) {
    // Carousel / multi-video post: download each entry from the same post URL.
    items = info.entries
      .filter(Boolean)
      .map((e, i) => itemFrom(e, platform, info.webpage_url || url, i + 1))
      .filter(Boolean);
  } else {
    items = [itemFrom(info, platform, info.webpage_url || url, 0)].filter(Boolean);
  }
  if (!items.length) {
    const e = new Error('no downloadable media');
    e.userCode = 'no_video';
    e.userMessage = 'We could not find a video in this post.';
    throw e;
  }
  return { author, items };
}

module.exports = { resolveMedia, formatSelectors, authArgs, proxyApplies, isTransient };
