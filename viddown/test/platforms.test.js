'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { normalizeUrl, detectPlatform } = require('../lib/platforms');
const { formatSelectors } = require('../lib/extractor');

test('extracts a link from share text', () => {
  assert.strictEqual(normalizeUrl('Look at this https://vm.tiktok.com/ZMabc/ wow'), 'https://vm.tiktok.com/ZMabc/');
  assert.strictEqual(normalizeUrl('x.com/user/status/1'), 'https://x.com/user/status/1');
});

test('rejects junk and credentialed URLs', () => {
  assert.strictEqual(normalizeUrl(''), null);
  assert.strictEqual(normalizeUrl(42), null);
  assert.strictEqual(normalizeUrl('https://user:pw@tiktok.com/x'), null);
  assert.strictEqual(normalizeUrl('https://tiktok.com:8080/x'), null);
});

test('detects supported platforms only', () => {
  const id = (u) => (detectPlatform(u) || {}).id;
  assert.strictEqual(id('https://www.tiktok.com/@a/video/1'), 'tiktok');
  assert.strictEqual(id('https://www.instagram.com/reel/abc/'), 'instagram');
  assert.strictEqual(id('https://fb.watch/abc/'), 'facebook');
  assert.strictEqual(id('https://m.facebook.com/watch?v=1'), 'facebook');
  assert.strictEqual(id('https://twitter.com/a/status/1'), 'x');
  assert.strictEqual(id('https://x.com/a/status/1'), 'x');
  assert.strictEqual(id('https://nottiktok.com/x'), undefined);
  assert.strictEqual(id('https://tiktok.com.evil.io/x'), undefined);
  assert.strictEqual(id('https://localhost/x'), undefined);
});

test('TikTok selectors skip the watermarked rendition', () => {
  assert.ok(formatSelectors('tiktok').hd.includes('[format_note!*=watermark]'));
  assert.ok(!formatSelectors('x').hd.includes('watermark'));
});
