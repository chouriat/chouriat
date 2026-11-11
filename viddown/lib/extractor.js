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

function runJson(url) {
  const args = ['-J', '--no-warnings', '--socket-timeout', '15', '--playlist-end', '20'];
  if (process.env.YTDLP_COOKIES) args.push('--cookies', process.env.YTDLP_COOKIES);
  args.push('--', url);
  return new Promise((resolve, reject) => {
    execFile(YTDLP, args, { timeout: TIMEOUT_MS, maxBuffer: 64 * 1024 * 1024 }, (err, stdout, stderr) => {
      if (err) {
        const e = new Error((stderr || err.message).trim().split('\n').pop());
        if (/private|login|log in|cookies|authenticat/i.test(stderr)) {
          e.userMessage = 'This post is private or requires a login, so it cannot be downloaded.';
        } else if (/unsupported url/i.test(stderr)) {
          e.userMessage = "This link doesn't point to a video. Open the post and copy its link.";
        } else if (/no video/i.test(stderr)) {
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
  const title = (info.description || info.title || `${platform.name} video`).replace(/\s+/g, ' ').trim();
  const base = `viddown_${platform.id}_${safeName(info.id || info.title)}`;
  const isImage = info.vcodec === 'none' && info.acodec === 'none' && !(info.formats || []).some((f) => f.vcodec && f.vcodec !== 'none');

  if (isImage) {
    return null; // photo posts are not supported in v1
  }
  const options = [
    { label: 'MP4 HD', detail: height ? `${height}p · no watermark` : 'Best quality · no watermark', kind: 'video', ext: 'mp4', format: sel.hd },
    { label: 'MP4 SD', detail: 'Smaller file', kind: 'video', ext: 'mp4', format: sel.sd },
    { label: 'MP3', detail: 'Audio only', kind: 'audio', ext: 'mp3', format: sel.audio },
  ];
  return {
    index,
    source: sourceUrl,
    title: title.length > 140 ? `${title.slice(0, 137)}…` : title,
    thumbnail: info.thumbnail || (info.thumbnails && info.thumbnails.length ? info.thumbnails[info.thumbnails.length - 1].url : null),
    duration: info.duration || null,
    filename: index ? `${base}_${index}` : base,
    options,
  };
}

async function resolveMedia(url, platform) {
  const info = await runJson(url);
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
    e.userMessage = 'We could not find a video in this post.';
    throw e;
  }
  return { author, items };
}

module.exports = { resolveMedia, formatSelectors };
