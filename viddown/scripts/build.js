'use strict';
/**
 * Static site generator for vid-down.
 * Reads src/ + .env and writes the finished site into public/.
 *   node scripts/build.js
 */
require('dotenv').config({ quiet: true });
const fs = require('fs');
const path = require('path');
const content = require('../src/content/pages');
const { PLATFORMS } = require('../lib/platforms');

const ROOT = path.join(__dirname, '..');
const OUT = path.join(ROOT, 'public');
const SITE = (process.env.SITE_URL || 'https://vid-down.com').replace(/\/$/, '');
const EMAIL = process.env.CONTACT_EMAIL || 'hello@vid-down.com';
// Accepts "ca-pub-123…", "pub-123…" or just the digits, with stray quotes or
// spaces from copy-pasting, and normalises to "ca-pub-123…".
function adsenseClient(raw) {
  const digits = String(raw || '').replace(/["'\s]/g, '').replace(/^(ca-)?pub-/i, '');
  return /^\d{10,}$/.test(digits) ? `ca-pub-${digits}` : '';
}
const ADS = {
  client: adsenseClient(process.env.ADSENSE_CLIENT),
  slots: {
    hero: process.env.ADSENSE_SLOT_HERO,
    result: process.env.ADSENSE_SLOT_RESULT,
    content: process.env.ADSENSE_SLOT_CONTENT,
    footer: process.env.ADSENSE_SLOT_FOOTER,
  },
};
const YEAR = new Date().getFullYear();
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// ---------------------------------------------------------------------------
// Icons
// ---------------------------------------------------------------------------
const LOGO = `<svg width="34" height="34" viewBox="0 0 40 40" aria-hidden="true"><rect width="40" height="40" rx="11" fill="#ff5b3a"/><path d="M14 10.5v12.2l9.6-6.1z" fill="#fff"/><path d="M27 13v12.5m0 0-4.6-4.6M27 25.5l4.6-4.6" stroke="#ffd23f" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/><rect x="9" y="29" width="22" height="3" rx="1.5" fill="#fff"/></svg>`;
const I = {
  link: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/></svg>',
  paste: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="8" y="3" width="8" height="4" rx="1"/><path d="M16 5h2a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h2"/></svg>',
  down: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v12m0 0-5-5m5 5 5-5M5 20h14"/></svg>',
  check: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12 5 5 9-10"/></svg>',
  moon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  menu: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h16"/></svg>',
  play: '<svg width="22" height="22" viewBox="0 0 24 24" fill="#fff"><path d="M8 5v14l11-7z"/></svg>',
  // Feature icons
  infinity: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M18.2 8.4a5 5 0 1 1 0 7.2L12 12l-6.2-3.6a5 5 0 1 0 0 7.2L12 12z"/></svg>',
  sparkle: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2z"/></svg>',
  music: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/></svg>',
  shield: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="m9 12 2 2 4-4"/></svg>',
  device: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="6" y="2" width="12" height="20" rx="3"/><path d="M11 18h2"/></svg>',
  bolt: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>',
};
// Generic glyphs with each network's brand colour (not the official logos).
const P = {
  tiktok: { name: 'TikTok', color: '#111', glyph: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M14 3v11.5a3.5 3.5 0 1 1-3.5-3.5"/><path d="M14 3c.5 2.8 2.3 4.5 5 4.8"/></svg>' },
  instagram: { name: 'Instagram', color: '#d62976', glyph: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="0.6" fill="currentColor"/></svg>' },
  facebook: { name: 'Facebook', color: '#1877f2', glyph: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M15 3h-2.5A3.5 3.5 0 0 0 9 6.5V21M6 11h8"/></svg>' },
  x: { name: 'X / Twitter', color: '#111', glyph: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M4 4l16 16M20 4 4 20"/></svg>' },  // Secondary networks use a plain letter mark.
  pinterest: { name: 'Pinterest', color: '#bd081c', glyph: mono('P') },
  reddit: { name: 'Reddit', color: '#ff4500', glyph: mono('R') },
  snapchat: { name: 'Snapchat', color: '#c9a600', glyph: mono('S') },
  linkedin: { name: 'LinkedIn', color: '#0a66c2', glyph: mono('in') },
  dailymotion: { name: 'Dailymotion', color: '#0d2c54', glyph: mono('D') },
  twitch: { name: 'Twitch', color: '#7a3fd1', glyph: mono('T') },
  bluesky: { name: 'Bluesky', color: '#0f73d9', glyph: mono('B') },
  tumblr: { name: 'Tumblr', color: '#35465c', glyph: mono('t') },
  vimeo: { name: 'Vimeo', color: '#1295c9', glyph: mono('V') },
  vk: { name: 'VK', color: '#0077ff', glyph: mono('VK') },
  okru: { name: 'OK.ru', color: '#ee8208', glyph: mono('OK') },
  rumble: { name: 'Rumble', color: '#5aa215', glyph: mono('R') },
  bilibili: { name: 'Bilibili', color: '#00a1d6', glyph: mono('B') },
  telegram: { name: 'Telegram', color: '#229ed9', glyph: mono('T') },
  soundcloud: { name: 'SoundCloud', color: '#ff5500', glyph: mono('SC') },
  imgur: { name: 'Imgur', color: '#159f6b', glyph: mono('i') },
  '9gag': { name: '9GAG', color: '#111', glyph: mono('9') },
  streamable: { name: 'Streamable', color: '#0f90fa', glyph: mono('S') },
};
const PRIMARY = ['tiktok', 'instagram', 'facebook', 'x'];
function mono(letter) {
  return `<span class="mono" aria-hidden="true">${letter}</span>`;
}

// ---------------------------------------------------------------------------
// Partials
// ---------------------------------------------------------------------------
function ad(name, { hidden = false } = {}) {
  const id = name === 'result' ? ' id="result-ad"' : '';
  const hide = hidden ? ' hidden' : '';
  const slot = ADS.slots[name];
  if (ADS.client && slot && !/^0+$/.test(slot)) {
    // The result unit is pushed by app.js once it becomes visible.
    const push = name === 'result' ? '' : '<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>';
    return `<aside class="ad wrap"${id}${hide} aria-label="Advertisement"><span class="ad-label">Advertisement</span>
<ins class="adsbygoogle" style="display:block" data-ad-client="${ADS.client}" data-ad-slot="${esc(slot)}" data-ad-format="auto" data-full-width-responsive="true"></ins>${push}</aside>`;
  }
  // Publisher ID set but no slot ID yet: show nothing (the head script still
  // verifies the site and lets Auto ads run) instead of a public placeholder.
  if (ADS.client) return '';
  return `<aside class="ad wrap"${id}${hide} aria-label="Advertisement placeholder"><span class="ad-label">Advertisement</span>
<div class="ad-placeholder">Ad space · "${name}" slot · set ADSENSE_CLIENT and ADSENSE_SLOT_${name.toUpperCase()} in .env</div></aside>`;
}

const NAV = [
  ['/tiktok-downloader', 'TikTok'],
  ['/instagram-downloader', 'Instagram'],
  ['/facebook-downloader', 'Facebook'],
  ['/twitter-video-downloader', 'X / Twitter'],
  ['/tiktok-mp3', 'TikTok MP3'],
];

function layout(page, body) {
  const url = `${SITE}${page.path === '/' ? '/' : page.path}`;
  const adsHead = ADS.client
    ? `<meta name="google-adsense-account" content="${ADS.client}">\n<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS.client}" crossorigin="anonymous"></script>`
    : '<!-- Google AdSense: set ADSENSE_CLIENT in .env and rebuild to load ads -->';
  const ld = page.jsonld ? page.jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n') : '';
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
<link rel="canonical" href="${url}">
<meta name="theme-color" content="#ff5b3a">
<meta property="og:type" content="website">
<meta property="og:site_name" content="vid-down">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/og.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/icon-192.png">
<link rel="manifest" href="/site.webmanifest">
<script>try{var t=localStorage.getItem('vd-theme');if(t)document.documentElement.dataset.theme=t}catch(e){}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600..800&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/styles.css?v=${BUILD_ID}">
${adsHead}
${ld}
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <nav class="wrap nav" aria-label="Main">
    <a class="brand" href="/" aria-label="vid-down home">${LOGO}<span>vid<b>-down</b></span></a>
    <button class="icon-btn menu-btn" id="menu-btn" aria-label="Menu" aria-expanded="false" aria-controls="nav-links">${I.menu}</button>
    <ul class="nav-links" id="nav-links">
      ${NAV.map(([href, label]) => `<li><a href="${href}"${href === page.path ? ' aria-current="page"' : ''}>${label}</a></li>`).join('')}
    </ul>
    <button class="icon-btn" id="theme-toggle" aria-label="Switch light or dark theme">${I.moon}</button>
  </nav>
</header>
<main id="main">
${body}
</main>
${ad('footer')}
<footer class="site-footer">
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <a class="brand" href="/">${LOGO}<span>vid<b>-down</b></span></a>
        <p style="margin-top:12px;max-width:320px">Save clips from your favourite networks in a couple of taps. Free, fast and with no sign-up.</p>
      </div>
      <div><h4>Downloaders</h4><ul>${NAV.map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ul></div>
      <div><h4>More networks</h4><ul>${content.tools.filter((t) => t.platform && !PRIMARY.includes(t.platform)).slice(0, 7).map((t) => `<li><a href="${t.path}">${P[t.platform].name}</a></li>`).join('')}<li><a href="/#networks">All ${Object.keys(P).length} networks →</a></li></ul></div>
      <div><h4>vid-down</h4><ul><li><a href="/about">About</a></li><li><a href="/faq">FAQ</a></li><li><a href="/contact">Contact</a></li></ul></div>
      <div><h4>Legal</h4><ul><li><a href="/terms">Terms of use</a></li><li><a href="/privacy">Privacy &amp; cookies</a></li><li><a href="/copyright">Copyright / DMCA</a></li></ul></div>
    </div>
    <div class="disclaimer">
      <span>© ${YEAR} vid-down. Not affiliated with any of the networks named on this site.</span>
      <span>Download only content you own or have permission to use.</span>
    </div>
  </div>
</footer>
<script>window.VD_PLATFORMS=${JSON.stringify(PLATFORMS.map(({ id, hosts, pattern }) => ({ id, hosts, pattern })))};</script>
<script src="/assets/app.js?v=${BUILD_ID}" defer></script>
</body>
</html>
`;
}

function downloader(tool) {
  const active = tool.platform;
  const shown = PRIMARY.includes(active) || !active ? PRIMARY : [...PRIMARY, active];
  const tabs =
    shown
      .map((k) => `<a class="tab${k === active ? ' active' : ''}" data-platform="${k}" href="${content.platformPath[k]}">${P[k].glyph}${P[k].name}</a>`)
      .join('') + `<a class="tab tab-more" href="#networks">+ ${Object.keys(P).length - shown.length} more</a>`;
  return `<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <span class="eyebrow">${I.sparkle} ${esc(tool.eyebrow)}</span>
      <h1>${tool.h1}</h1>
      <p class="lede">${esc(tool.lede)}</p>
      <nav class="tabs" aria-label="Choose a network">${tabs}</nav>
      <form class="grab" id="grab" action="/" method="get" novalidate>
        <label class="grab-field">
          <span class="sr-only">Video link</span>
          ${I.link}
          <input id="url" name="url" type="url" inputmode="url" autocomplete="off" spellcheck="false" placeholder="${esc(tool.placeholder)}" required>
        </label>
        <button class="btn btn-ghost" type="button" id="paste">${I.paste} Paste</button>
        <button class="btn btn-primary" type="submit" id="go">${I.down} Get video</button>
      </form>
      <div class="hint"><span>${I.check} No watermark</span><span>${I.check} HD MP4 &amp; MP3</span><span>${I.check} No account needed</span></div>
      <div class="results" id="results" aria-live="polite"></div>
    </div>
    <div class="stack" aria-hidden="true">
      <div class="clip c1"><div class="play">${I.play}</div><b>@studio.moves</b><div class="bar"><i></i></div></div>
      <div class="clip c2"><div class="play">${I.play}</div><b>@late.night.eats</b><div class="bar"><i style="width:38%"></i></div></div>
      <div class="saved"><span class="tick">${I.check}</span><div>Saved to your device<small>1080p · MP4 · 12.4 MB</small></div></div>
    </div>
  </div>
</section>
${ad('result', { hidden: true })}
${ad('hero')}`;
}

function steps(tool) {
  return `<section><div class="wrap">
  <div class="section-head"><span class="kicker">How it works</span><h2>${esc(tool.stepsTitle)}</h2><p>${esc(tool.stepsLede)}</p></div>
  <ol class="steps">${tool.steps.map(([h, p]) => `<li><h3>${esc(h)}</h3><p>${esc(p)}</p></li>`).join('')}</ol>
</div></section>`;
}

function features(tool) {
  return `<section><div class="wrap band">
  <div class="section-head"><span class="kicker" style="color:var(--sun)">Why vid-down</span><h2>${esc(tool.featuresTitle)}</h2></div>
  <div class="features">${tool.features.map(([ico, h, p]) => `<div class="feature"><div class="ico">${I[ico]}</div><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('')}</div>
</div></section>`;
}

function platformCards(exclude) {
  const cards = content.tools
    .filter((t) => t.path !== exclude && t.card)
    .map(
      (t) => `<a class="pcard" href="${t.path}"><span class="logo" style="background:${P[t.platform].color}">${P[t.platform].glyph}</span><h3>${esc(t.card.title)}</h3><p>${esc(t.card.text)}</p><span class="go">Open downloader →</span></a>`
    )
    .join('');
  return `<section id="networks"><div class="wrap">
  <div class="section-head"><span class="kicker">One tool, ${Object.keys(P).length} networks</span><h2>Pick where your clip lives</h2></div>
  <div class="platforms">${cards}</div>
</div></section>`;
}

function faq(items, title = 'Questions, answered') {
  return `<section><div class="wrap">
  <div class="section-head"><span class="kicker">FAQ</span><h2>${esc(title)}</h2></div>
  <div class="faq">${items.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${esc(a)}</p></details>`).join('')}</div>
</div></section>`;
}

function faqLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  };
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------
const BUILD_ID = Date.now().toString(36);
const pages = [];

for (const tool of content.tools) {
  const body = [downloader(tool), steps(tool), features(tool), ad('content'), platformCards(tool.path), faq(tool.faq)].join('\n');
  pages.push({
    ...tool,
    jsonld: [
      {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'vid-down',
        url: `${SITE}${tool.path}`,
        applicationCategory: 'MultimediaApplication',
        operatingSystem: 'Any',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      },
      faqLd(tool.faq),
    ],
    html: body,
  });
}

for (const doc of content.docs) {
  const html = doc.html.replace(/\{\{EMAIL\}\}/g, esc(EMAIL)).replace(/\{\{SITE\}\}/g, SITE);
  const extra = doc.path === '/faq' ? faq(content.allFaq, 'Everything people ask us') : '';
  pages.push({ ...doc, jsonld: doc.path === '/faq' ? [faqLd(content.allFaq)] : null, html: `<div class="wrap prose">${html}</div>${extra}` });
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });

for (const page of pages) {
  const file = page.path === '/' ? 'index.html' : `${page.path.slice(1)}.html`;
  fs.writeFileSync(path.join(OUT, file), layout(page, page.html));
}

for (const f of ['styles.css', 'app.js']) fs.copyFileSync(path.join(ROOT, 'src/assets', f), path.join(OUT, 'assets', f));
for (const f of fs.readdirSync(path.join(ROOT, 'src/static'))) fs.copyFileSync(path.join(ROOT, 'src/static', f), path.join(OUT, f));
fs.writeFileSync(path.join(OUT, 'favicon.svg'), LOGO.replace('aria-hidden="true"', 'xmlns="http://www.w3.org/2000/svg"'));

const indexable = pages.filter((p) => !p.noindex);
fs.writeFileSync(
  path.join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable
    .map((p) => `  <url><loc>${SITE}${p.path}</loc><changefreq>weekly</changefreq><priority>${p.path === '/' ? '1.0' : p.tool ? '0.9' : '0.4'}</priority></url>`)
    .join('\n')}\n</urlset>\n`
);
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE}/sitemap.xml\n`);
// ads.txt authorises Google to sell ads on this domain (required by AdSense).
const pub = ADS.client ? ADS.client.replace('ca-', '') : 'pub-XXXXXXXXXXXXXXXX';
fs.writeFileSync(path.join(OUT, 'ads.txt'), `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`);

if (process.env.ADSENSE_CLIENT && !ADS.client) {
  console.warn(`[build] ADSENSE_CLIENT is set but is not a valid publisher ID (expected ca-pub- followed by digits); ads stay off.`);
}
console.log(`[build] ${pages.length} pages → public/ (ads: ${ADS.client ? 'live ' + ADS.client : 'placeholders'})`);
