'use strict';
/**
 * Short-lived cache of yt-dlp metadata (the JSON from `yt-dlp -J`).
 *
 * The lookup has to go through the paid proxy, but the video files usually
 * come from CDNs that don't block the server. Caching the metadata lets the
 * download step run `yt-dlp --load-info-json` without the proxy, so only the
 * small lookup is billed.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const crypto = require('crypto');

const DIR = path.join(os.tmpdir(), 'vid-down-info');
const TTL_MS = 30 * 60 * 1000; // same lifetime as a download link
const ID_RE = /^[a-f0-9]{32}$/;

fs.mkdirSync(DIR, { recursive: true });

async function put(info) {
  const id = crypto.randomBytes(16).toString('hex');
  await fs.promises.writeFile(path.join(DIR, `${id}.json`), JSON.stringify(info));
  return id;
}

/** Path of a cached entry, or null if it is unknown or expired. */
async function pathFor(id) {
  if (typeof id !== 'string' || !ID_RE.test(id)) return null;
  const file = path.join(DIR, `${id}.json`);
  try {
    const st = await fs.promises.stat(file);
    return Date.now() - st.mtimeMs < TTL_MS ? file : null;
  } catch {
    return null;
  }
}

async function sweep() {
  const names = await fs.promises.readdir(DIR).catch(() => []);
  await Promise.all(
    names.map(async (n) => {
      const file = path.join(DIR, n);
      const st = await fs.promises.stat(file).catch(() => null);
      if (st && Date.now() - st.mtimeMs >= TTL_MS) await fs.promises.rm(file, { force: true }).catch(() => {});
    })
  );
}

setInterval(sweep, 10 * 60 * 1000).unref();

module.exports = { put, pathFor, sweep, DIR, TTL_MS };
