'use strict';
/**
 * viddown — server
 * Express app that serves the static site (public/) and a small JSON API that
 * resolves a social media link into downloadable media using yt-dlp.
 */
require('dotenv').config();
const path = require('path');
const crypto = require('crypto');
const fs = require('fs');
const os = require('os');
const { spawn, spawnSync } = require('child_process');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const { detectPlatform, normalizeUrl, platformNames } = require('./lib/platforms');
const { resolveMedia } = require('./lib/extractor');

const PORT = Number(process.env.PORT || 3000);
const YTDLP = process.env.YTDLP_PATH || 'yt-dlp';
const SECRET = process.env.TOKEN_SECRET || crypto.randomBytes(32).toString('hex');
const TOKEN_TTL_MS = 30 * 60 * 1000; // download links are valid for 30 minutes

if (!process.env.TOKEN_SECRET) {
  console.warn('[viddown] TOKEN_SECRET is not set; using a random one (links reset on restart).');
}

// Optional blocklist.txt: one URL fragment per line (used for copyright takedowns).
let blocklist = [];
try {
  blocklist = fs.readFileSync(path.join(__dirname, 'blocklist.txt'), 'utf8').split('\n').map((l) => l.trim().toLowerCase()).filter((l) => l && !l.startsWith('#'));
} catch {}
const isBlocked = (url) => blocklist.some((b) => url.toLowerCase().includes(b));

const app = express();
app.set('trust proxy', Number(process.env.TRUST_PROXY || 1));
app.disable('x-powered-by');

// ---------------------------------------------------------------------------
// Security headers. The CSP allows Google AdSense, Google Fonts and Funding
// Choices (Google's consent message), and nothing else.
// ---------------------------------------------------------------------------
const google = [
  'https://pagead2.googlesyndication.com',
  'https://*.googlesyndication.com',
  'https://*.doubleclick.net',
  'https://*.google.com',
  'https://*.gstatic.com',
  'https://*.googleadservices.com',
  'https://adservice.google.com',
  'https://fundingchoicesmessages.google.com',
  'https://*.adtrafficquality.google',
];
app.use(
  helmet({
    contentSecurityPolicy: {
      useDefaults: true,
      directives: {
        'default-src': ["'self'"],
        'script-src': ["'self'", "'unsafe-inline'", ...google],
        'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        'font-src': ["'self'", 'https://fonts.gstatic.com', 'data:'],
        'img-src': ["'self'", 'data:', 'https:'],
        'media-src': ["'self'", 'blob:'],
        'connect-src': ["'self'", ...google],
        'frame-src': ["'self'", ...google],
        'object-src': ["'none'"],
        'upgrade-insecure-requests': process.env.NODE_ENV === 'production' ? [] : null,
      },
    },
    crossOriginEmbedderPolicy: false,
    crossOriginResourcePolicy: { policy: 'same-site' },
  })
);
app.use(compression());
app.use(express.json({ limit: '4kb' }));

// ---------------------------------------------------------------------------
// Signed tokens: the browser never asks us to fetch an arbitrary URL. It can
// only redeem tokens we issued after resolving a supported link.
// ---------------------------------------------------------------------------
function sign(payload) {
  const body = Buffer.from(JSON.stringify({ ...payload, exp: Date.now() + TOKEN_TTL_MS })).toString('base64url');
  const mac = crypto.createHmac('sha256', SECRET).update(body).digest('base64url');
  return `${body}.${mac}`;
}
function verify(token) {
  if (typeof token !== 'string' || token.length > 4096) return null;
  const [body, mac] = token.split('.');
  if (!body || !mac) return null;
  const expected = crypto.createHmac('sha256', SECRET).update(body).digest('base64url');
  const a = Buffer.from(mac);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const data = JSON.parse(Buffer.from(body, 'base64url').toString());
    return data.exp > Date.now() ? data : null;
  } catch {
    return null;
  }
}

// ---------------------------------------------------------------------------
// API
// ---------------------------------------------------------------------------
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: Number(process.env.RATE_LIMIT_PER_MIN || 20),
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { error: 'Too many requests. Please wait a minute and try again.' },
});
const downloadLimiter = rateLimit({
  windowMs: 60 * 1000,
  limit: Number(process.env.DOWNLOAD_LIMIT_PER_MIN || 15),
  standardHeaders: 'draft-7',
  legacyHeaders: false,
});

app.post('/api/resolve', apiLimiter, async (req, res) => {
  const raw = (req.body && req.body.url) || '';
  const url = normalizeUrl(raw);
  if (!url) return res.status(400).json({ error: 'Please paste a valid link.' });
  const platform = detectPlatform(url);
  if (!platform) {
    return res.status(400).json({ error: `That link is not supported yet. Try ${platformNames()}.` });
  }
  if (isBlocked(url)) return res.status(451).json({ error: 'This content is unavailable at the request of the rights holder.' });
  try {
    const media = await resolveMedia(url, platform);
    const items = media.items.map((item) => ({
      title: item.title,
      thumbnail: item.thumbnail ? `/api/thumb?t=${encodeURIComponent(sign({ u: item.thumbnail }))}` : null,
      duration: item.duration,
      options: item.options.map((o) => ({
        label: o.label,
        detail: o.detail,
        kind: o.kind,
        ext: o.ext,
        href: `/api/download?t=${encodeURIComponent(
          sign({ src: item.source, f: o.format, kind: o.kind, ext: o.ext, name: item.filename, idx: item.index })
        )}`,
      })),
    }));
    res.json({ platform: platform.id, platformName: platform.name, author: media.author, items });
  } catch (err) {
    console.error('[resolve]', platform.id, err.message);
    res.status(422).json({ error: err.userMessage || "We couldn't fetch this post. It may be private, deleted or region-locked." });
  }
});

app.get('/api/download', downloadLimiter, async (req, res) => {
  const data = verify(req.query.t);
  if (!data) return res.status(410).send('This download link has expired. Please go back and paste the link again.');

  const dir = await fs.promises.mkdtemp(path.join(os.tmpdir(), 'viddown-'));
  const cleanup = () => fs.promises.rm(dir, { recursive: true, force: true }).catch(() => {});
  const args = ['--no-warnings', '--quiet', '--no-progress', '--socket-timeout', '15', '--max-filesize', process.env.MAX_FILESIZE || '700M', '-f', data.f, '-o', path.join(dir, 'media.%(ext)s')];
  args.push(...(data.idx ? ['--playlist-items', String(data.idx)] : ['--no-playlist']));
  if (data.kind === 'audio') args.push('-x', '--audio-format', 'mp3', '--audio-quality', '192K');
  else args.push('--merge-output-format', 'mp4', '--remux-video', 'mp4');
  if (process.env.YTDLP_COOKIES) args.push('--cookies', process.env.YTDLP_COOKIES);
  if (process.env.YTDLP_PROXY) args.push('--proxy', process.env.YTDLP_PROXY);
  args.push('--', data.src);

  const child = spawn(YTDLP, args, { stdio: ['ignore', 'ignore', 'pipe'] });
  let stderr = '';
  child.stderr.on('data', (d) => (stderr = (stderr + d).slice(-4000)));
  child.on('error', (err) => {
    console.error('[download] could not start yt-dlp:', err.message);
    aborted = true;
    clearTimeout(timer);
    cleanup();
    if (!res.headersSent) res.status(503).send('The server is not set up yet: its video tool (yt-dlp) is missing.');
  });
  const timer = setTimeout(() => child.kill('SIGKILL'), Number(process.env.DOWNLOAD_TIMEOUT_MS || 180000));
  let aborted = false;
  req.on('close', () => {
    if (!res.writableEnded) {
      aborted = true;
      child.kill('SIGKILL');
    }
  });

  child.on('close', async (code) => {
    clearTimeout(timer);
    if (aborted) return cleanup();
    const files = (await fs.promises.readdir(dir).catch(() => [])).filter((f) => f.startsWith('media.') && !f.endsWith('.part'));
    if (code !== 0 || !files.length) {
      console.error('[download] failed', code, stderr.trim().split('\n').pop());
      cleanup();
      return res.status(502).send('Download failed. The post may have been removed. Please try again.');
    }
    const file = path.join(dir, files[0]);
    const ext = path.extname(file).slice(1) || data.ext;
    const filename = `${data.name || 'viddown'}.${ext}`;
    res.download(file, filename, { headers: { 'Cache-Control': 'no-store' } }, () => cleanup());
  });
});

// Thumbnail proxy: many platforms block hot-linked thumbnails, so we relay
// them. Only URLs we signed ourselves (from yt-dlp's metadata) are accepted.
app.get('/api/thumb', apiLimiter, async (req, res) => {
  const data = verify(req.query.t);
  if (!data || !/^https:\/\//i.test(data.u)) return res.status(404).end();
  try {
    const r = await fetch(data.u, { redirect: 'follow', signal: AbortSignal.timeout(8000) });
    const type = r.headers.get('content-type') || '';
    if (!r.ok || !type.startsWith('image/')) return res.status(404).end();
    const buf = Buffer.from(await r.arrayBuffer());
    if (buf.length > 5 * 1024 * 1024) return res.status(413).end();
    res.setHeader('Content-Type', type);
    res.setHeader('Cache-Control', 'public, max-age=3600');
    res.end(buf);
  } catch {
    res.status(404).end();
  }
});

app.get('/healthz', (_req, res) => res.json({ ok: true }));

// ---------------------------------------------------------------------------
// Static site (built by scripts/build.js into public/)
// ---------------------------------------------------------------------------
app.use(
  express.static(path.join(__dirname, 'public'), {
    extensions: ['html'],
    maxAge: process.env.NODE_ENV === 'production' ? '1h' : 0,
    setHeaders(res, file) {
      if (/\.(css|js|svg|png|woff2)$/.test(file)) res.setHeader('Cache-Control', 'public, max-age=604800');
    },
  })
);
app.use((req, res) => res.status(404).sendFile(path.join(__dirname, 'public', '404.html')));

// Fail loudly at startup if the tools the downloader depends on are missing.
function checkTools() {
  const tools = [
    [YTDLP, ['--version'], 'yt-dlp', 'macOS: brew install yt-dlp · Linux: pipx install yt-dlp · or set YTDLP_PATH'],
    ['ffmpeg', ['-version'], 'ffmpeg', 'macOS: brew install ffmpeg · Debian/Ubuntu: apt install ffmpeg'],
  ];
  for (const [bin, args, name, hint] of tools) {
    const r = spawnSync(bin, args, { encoding: 'utf8', timeout: 15000 });
    if (r.error) {
      console.error(`\n[viddown] MISSING TOOL: ${name} was not found ("${bin}"). Downloads will fail until it is installed.\n          ${hint}\n`);
    } else {
      console.log(`[viddown] ${name} ${String(r.stdout).split('\n')[0].replace(/^ffmpeg version /, '').split(' ')[0]} found`);
    }
  }
}

if (require.main === module) {
  checkTools();
  app.listen(PORT, () => console.log(`[viddown] listening on http://localhost:${PORT}`));
}
module.exports = app;
