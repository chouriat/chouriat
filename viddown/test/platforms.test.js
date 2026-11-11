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

test('detects the additional networks', () => {
  const id = (u) => (detectPlatform(u) || {}).id;
  assert.strictEqual(id('https://pin.it/abc'), 'pinterest');
  assert.strictEqual(id('https://www.pinterest.de/pin/123/'), 'pinterest');
  assert.strictEqual(id('https://www.pinterest.co.uk/pin/123/'), 'pinterest');
  assert.strictEqual(id('https://pinterest.evil.example.com/pin/1'), undefined);
  assert.strictEqual(id('https://www.reddit.com/r/a/comments/1/x/'), 'reddit');
  assert.strictEqual(id('https://v.redd.it/abc'), 'reddit');
  assert.strictEqual(id('https://www.snapchat.com/spotlight/abc'), 'snapchat');
  assert.strictEqual(id('https://www.linkedin.com/posts/a_b-1'), 'linkedin');
  assert.strictEqual(id('https://dai.ly/x1'), 'dailymotion');
  assert.strictEqual(id('https://clips.twitch.tv/Abc'), 'twitch');
  assert.strictEqual(id('https://bsky.app/profile/a/post/1'), 'bluesky');
  assert.strictEqual(id('https://www.tumblr.com/a/1'), 'tumblr');
  // Deliberately unsupported
  assert.strictEqual(id('https://www.youtube.com/watch?v=abc'), undefined);
  assert.strictEqual(id('https://youtu.be/abc'), undefined);
});

test('every network has a landing page and a mark', () => {
  const { PLATFORMS } = require('../lib/platforms');
  const { platformPath, tools } = require('../src/content/pages');
  for (const p of PLATFORMS) {
    assert.ok(platformPath[p.id], `no path for ${p.id}`);
    assert.ok(tools.some((t) => t.path === platformPath[p.id]), `no page for ${p.id}`);
  }
});

test('TikTok selectors skip the watermarked rendition', () => {
  assert.ok(formatSelectors('tiktok').hd.includes('[format_note!*=watermark]'));
  assert.ok(!formatSelectors('x').hd.includes('watermark'));
});
