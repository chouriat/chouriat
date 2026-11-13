'use strict';
const test = require('node:test');
const assert = require('node:assert');
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'public');
execFileSync(process.execPath, [path.join(ROOT, 'scripts/build.js')], { cwd: ROOT, env: { ...process.env, SITE_URL: 'https://vid-down.com', ADSENSE_CLIENT: 'ca-pub-1234567890123456' } });
const read = (f) => fs.readFileSync(path.join(OUT, f), 'utf8');

test('every language has its home page with the right lang and direction', () => {
  for (const [code, dir] of [['de', 'ltr'], ['fr', 'ltr'], ['es', 'ltr'], ['ar', 'rtl']]) {
    const html = read(`${code}/index.html`);
    assert.match(html, new RegExp(`<html lang="${code}" dir="${dir}">`));
    assert.match(html, new RegExp(`<link rel="canonical" href="https://vid-down.com/${code}/">`));
  }
});

test('hreflang links are reciprocal and include x-default', () => {
  const langs = ['en', 'de', 'fr', 'es', 'ar'];
  for (const file of ['tiktok-downloader.html', 'de/tiktok-downloader.html', 'ar/tiktok-downloader.html']) {
    const html = read(file);
    for (const l of langs) {
      const href = l === 'en' ? 'https://vid-down.com/tiktok-downloader' : `https://vid-down.com/${l}/tiktok-downloader`;
      assert.ok(html.includes(`hreflang="${l}" href="${href}"`), `${file} missing ${l}`);
    }
    assert.ok(html.includes('hreflang="x-default" href="https://vid-down.com/tiktok-downloader"'));
  }
});

test('sitemap lists every indexable page, including translations', () => {
  const xml = read('sitemap.xml');
  for (const loc of ['https://vid-down.com/', 'https://vid-down.com/ar/', 'https://vid-down.com/fr/tiktok-mp3', 'https://vid-down.com/instagram-reels-downloader', 'https://vid-down.com/how-to-save-videos-iphone-android']) {
    assert.ok(xml.includes(`<loc>${loc}</loc>`), loc);
  }
  assert.ok(!xml.includes('/404'));
  assert.match(read('robots.txt'), /Sitemap: https:\/\/vid-down\.com\/sitemap\.xml/);
});

test('AdSense tag and ads.txt are on every language', () => {
  for (const f of ['index.html', 'de/index.html', 'ar/tiktok-downloader.html']) {
    assert.ok(read(f).includes('adsbygoogle.js?client=ca-pub-1234567890123456'), f);
    assert.ok(read(f).includes('<meta name="google-adsense-account" content="ca-pub-1234567890123456">'), f);
  }
  assert.strictEqual(read('ads.txt'), 'google.com, pub-1234567890123456, DIRECT, f08c47fec0942fa0\n');
});

test('404 page is noindex', () => {
  assert.match(read('404.html'), /<meta name="robots" content="noindex">/);
});
