'use strict';
const test = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

const LOG = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'vd-test-')), 'calls.log');
process.env.YTDLP_PATH = path.join(__dirname, 'fixtures', 'fake-yt-dlp.js');
process.env.FAKE_LOG = LOG;
process.env.YTDLP_PROXY = 'http://proxy.invalid:1';
process.env.YTDLP_PROXY_PLATFORMS = 'tiktok';
process.env.TOKEN_SECRET = 'test-secret';
process.env.NO_PROXY = [process.env.NO_PROXY, '127.0.0.1'].filter(Boolean).join(',');

const app = require('../server');

let base;
let server;
test.before(async () => {
  server = app.listen(0, '127.0.0.1');
  await new Promise((r) => server.once('listening', r));
  base = `http://127.0.0.1:${server.address().port}`;
});
test.after(() => server.close());

const calls = () => fs.readFileSync(LOG, 'utf8').trim().split('\n').map((l) => JSON.parse(l));

async function downloadOnce(url) {
  fs.writeFileSync(LOG, '');
  const r = await fetch(`${base}/api/resolve`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ url }) });
  const body = await r.json();
  assert.strictEqual(r.status, 200, JSON.stringify(body));
  const d = await fetch(base + body.items[0].options[0].href);
  return { status: d.status, text: await d.text(), calls: calls() };
}

test('proxied platform: lookup uses the proxy, download goes direct', async () => {
  delete process.env.FAKE_DIRECT_FAILS;
  const { status, text, calls: c } = await downloadOnce('https://www.tiktok.com/@a/video/123');
  assert.strictEqual(status, 200);
  assert.strictEqual(text, 'video-bytes');
  assert.ok(c[0].includes('-J') && c[0].includes('--proxy'));
  assert.strictEqual(c.length, 2);
  assert.ok(c[1].includes('--load-info-json'));
  assert.ok(!c[1].includes('--proxy'));
});

test('falls back to the proxy when the direct download fails', async () => {
  process.env.FAKE_DIRECT_FAILS = '1';
  const { status, calls: c } = await downloadOnce('https://www.tiktok.com/@a/video/123');
  assert.strictEqual(status, 200);
  assert.strictEqual(c.length, 3);
  assert.ok(c[1].includes('--load-info-json'));
  assert.ok(c[2].includes('--proxy') && !c[2].includes('--load-info-json'));
  delete process.env.FAKE_DIRECT_FAILS;
});

test('non-proxied platform keeps the single direct download', async () => {
  const { status, calls: c } = await downloadOnce('https://www.instagram.com/reel/XYZ/');
  assert.strictEqual(status, 200);
  assert.strictEqual(c.length, 2);
  assert.ok(!c[1].includes('--load-info-json') && !c[1].includes('--proxy'));
});
