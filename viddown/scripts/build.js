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
// Shown as <lastmod> in the sitemap. Bump it when page text changes.
const CONTENT_UPDATED = '2026-11-13';
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
// Languages
// ---------------------------------------------------------------------------
// English is the default and lives at the root. Every other language lives
// under /<code>/ and translates the main pages (see src/content/i18n/).
const EN = {
  code: 'en',
  name: 'English',
  locale: 'en_US',
  dir: 'ltr',
  ui: {
    skip: 'Skip to content',
    home: 'vid-down home',
    menu: 'Menu',
    theme: 'Switch light or dark theme',
    videoLink: 'Video link',
    paste: 'Paste',
    get: 'Get video',
    chooseNetwork: 'Choose a network',
    more: (n) => `+ ${n} more`,
    hints: ['No watermark', 'HD MP4 &amp; MP3', 'No account needed'],
    savedDemo: 'Saved to your device',
    howKicker: 'How it works',
    whyKicker: 'Why vid-down',
    guideKicker: 'Guide',
    faqKicker: 'FAQ',
    faqTitle: 'Questions, answered',
    netKicker: (n) => `One tool, ${n} networks`,
    netTitle: 'Pick where your clip lives',
    openDl: 'Open downloader →',
    ad: 'Advertisement',
    footTagline: 'Save clips from your favourite networks in a couple of taps. Free, fast and with no sign-up.',
    footDownloaders: 'Downloaders',
    footMore: 'More networks',
    footAll: (n) => `All ${n} networks →`,
    about: 'About',
    faq: 'FAQ',
    contact: 'Contact',
    guidePage: 'iPhone &amp; Android guide',
    footLegal: 'Legal',
    terms: 'Terms of use',
    privacy: 'Privacy &amp; cookies',
    copyright: 'Copyright / DMCA',
    rights: (y) => `© ${y} vid-down. Not affiliated with any of the networks named on this site.`,
    permission: 'Download only content you own or have permission to use.',
    language: 'Language',
    nav: {
      '/tiktok-downloader': 'TikTok',
      '/instagram-downloader': 'Instagram',
      '/facebook-downloader': 'Facebook',
      '/twitter-video-downloader': 'X / Twitter',
      '/tiktok-mp3': 'TikTok MP3',
    },
    // Extra English-only pages listed in the footer so they are linked from every page.
    footExtra: [
      ['/instagram-reels-downloader', 'Instagram Reels'],
      ['/facebook-reels-downloader', 'Facebook Reels'],
      ['/twitter-gif-downloader', 'X / Twitter GIFs'],
    ],
  },
};
const LANGS = ['de', 'fr', 'es', 'ar'].map((c) => require(`../src/content/i18n/${c}`));
const ALL_LANGS = [EN, ...LANGS];
// English paths that exist in every language.
const TRANSLATED = Object.keys(LANGS[0].pages);
for (const L of LANGS) {
  const missing = TRANSLATED.filter((p) => !L.pages[p]);
  if (missing.length) throw new Error(`[build] ${L.code} is missing translations for ${missing.join(', ')}`);
}
/** URL path of an English page in a given language. */
const lp = (L, p) => (L.code === 'en' ? p : p === '/' ? `/${L.code}/` : `/${L.code}${p}`);
const toolByPath = Object.fromEntries(content.tools.map((t) => [t.path, t]));

// ---------------------------------------------------------------------------
// Partials
// ---------------------------------------------------------------------------
function ad(name, L, { hidden = false } = {}) {
  const id = name === 'result' ? ' id="result-ad"' : '';
  const hide = hidden ? ' hidden' : '';
  const slot = ADS.slots[name];
  const label = L.ui.ad;
  if (ADS.client && slot && !/^0+$/.test(slot)) {
    // The result unit is pushed by app.js once it becomes visible.
    const push = name === 'result' ? '' : '<script>(adsbygoogle = window.adsbygoogle || []).push({});</script>';
    return `<aside class="ad wrap"${id}${hide} aria-label="${label}"><span class="ad-label">${label}</span>
<ins class="adsbygoogle" style="display:block" data-ad-client="${ADS.client}" data-ad-slot="${esc(slot)}" data-ad-format="auto" data-full-width-responsive="true"></ins>${push}</aside>`;
  }
  // Publisher ID set but no slot ID yet: show nothing (the head script still
  // verifies the site and lets Auto ads run) instead of a public placeholder.
  if (ADS.client) return '';
  return `<aside class="ad wrap"${id}${hide} aria-label="Advertisement placeholder"><span class="ad-label">${label}</span>
<div class="ad-placeholder">Ad space · "${name}" slot · set ADSENSE_CLIENT and ADSENSE_SLOT_${name.toUpperCase()} in .env</div></aside>`;
}

const FONTS = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600..800&family=DM+Sans:wght@400;500;600;700&display=swap';
const FONTS_AR = 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600..800&family=DM+Sans:wght@400;500;600;700&family=Noto+Sans+Arabic:wght@400;600;700;800&display=swap';

function layout(page, body) {
  const L = page.lang;
  const ui = L.ui;
  const url = `${SITE}${page.path}`;
  const adsHead = ADS.client
    ? `<meta name="google-adsense-account" content="${ADS.client}">\n<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS.client}" crossorigin="anonymous"></script>`
    : '<!-- Google AdSense: set ADSENSE_CLIENT in .env and rebuild to load ads -->';
  const ld = page.jsonld ? page.jsonld.map((j) => `<script type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`).join('\n') : '';
  const alts = page.alternates || [];
  const hreflang = alts.length
    ? alts.map((a) => `<link rel="alternate" hreflang="${a.code}" href="${SITE}${a.path}">`).join('\n') +
      `\n<link rel="alternate" hreflang="x-default" href="${SITE}${alts[0].path}">`
    : '';
  const ogAlt = alts.filter((a) => a.code !== L.code).map((a) => `<meta property="og:locale:alternate" content="${a.locale}">`).join('\n');
  const fonts = L.code === 'ar' ? FONTS_AR : FONTS;
  // Navigation: English pages link to English, translated pages stay in their language.
  const nav = Object.entries(ui.nav).map(([p, label]) => [lp(L, p), label]);
  // Language switcher: same page in each language when it exists, else that language's home page.
  const langLinks = ALL_LANGS.map((X) => {
    const target = alts.find((a) => a.code === X.code);
    const href = target ? target.path : lp(X, '/');
    return `<li><a href="${href}" hreflang="${X.code}" lang="${X.code}"${X.code === L.code ? ' aria-current="true"' : ''}>${X.name}</a></li>`;
  }).join('');
  const client = L.client ? `<script>window.VD_T=${JSON.stringify(L.client).replace(/</g, '\\u003c')};</script>\n` : '';
  return `<!doctype html>
<html lang="${L.code}" dir="${L.dir}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
${page.noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`}
${hreflang}
<meta name="theme-color" content="#ff5b3a">
<meta property="og:type" content="website">
<meta property="og:site_name" content="vid-down">
<meta property="og:locale" content="${L.locale}">
${ogAlt}
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${SITE}/og.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(page.title)}">
<meta name="twitter:description" content="${esc(page.description)}">
<meta name="twitter:image" content="${SITE}/og.png">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/icon-192.png">
<link rel="manifest" href="/site.webmanifest">
<script>try{var t=localStorage.getItem('vd-theme');if(t)document.documentElement.dataset.theme=t}catch(e){}</script>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="/assets/styles.css?v=${BUILD_ID}">
<script>(function(){var l=document.createElement('link');l.rel='stylesheet';l.href='${fonts}';document.head.appendChild(l)})()</script>
<noscript><link rel="stylesheet" href="${fonts}"></noscript>
${adsHead}
${ld}
</head>
<body>
<a class="skip" href="#main">${ui.skip}</a>
<header class="site-header">
  <nav class="wrap nav" aria-label="Main">
    <a class="brand" href="${lp(L, '/')}" aria-label="${ui.home}">${LOGO}<span>vid<b>-down</b></span></a>
    <button class="icon-btn menu-btn" id="menu-btn" aria-label="${ui.menu}" aria-expanded="false" aria-controls="nav-links">${I.menu}</button>
    <ul class="nav-links" id="nav-links">
      ${nav.map(([href, label]) => `<li><a href="${href}"${href === page.path ? ' aria-current="page"' : ''}>${label}</a></li>`).join('')}
    </ul>
    <button class="icon-btn" id="theme-toggle" aria-label="${ui.theme}">${I.moon}</button>
  </nav>
</header>
<main id="main">
${body}
</main>
${ad('footer', L)}
<footer class="site-footer">
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <a class="brand" href="${lp(L, '/')}">${LOGO}<span>vid<b>-down</b></span></a>
        <p style="margin-top:12px;max-width:320px">${ui.footTagline}</p>
      </div>
      <div><h4>${ui.footDownloaders}</h4><ul>${nav.concat(ui.footExtra || []).map(([h, l]) => `<li><a href="${h}">${l}</a></li>`).join('')}</ul></div>
      <div><h4>${ui.footMore}</h4><ul>${content.tools.filter((t) => t.platform && !PRIMARY.includes(t.platform) && t.card).slice(0, 7).map((t) => `<li><a href="${t.path}">${P[t.platform].name}</a></li>`).join('')}<li><a href="${lp(L, '/')}#networks">${ui.footAll(Object.keys(P).length)}</a></li></ul></div>
      <div><h4>vid-down</h4><ul><li><a href="/about">${ui.about}</a></li><li><a href="/faq">${ui.faq}</a></li><li><a href="/how-to-save-videos-iphone-android">${ui.guidePage}</a></li><li><a href="/contact">${ui.contact}</a></li></ul></div>
      <div><h4>${ui.footLegal}</h4><ul><li><a href="/terms">${ui.terms}</a></li><li><a href="/privacy">${ui.privacy}</a></li><li><a href="/copyright">${ui.copyright}</a></li></ul></div>
      <div><h4>${ui.language}</h4><ul class="langs">${langLinks}</ul></div>
    </div>
    <div class="disclaimer">
      <span>${ui.rights(YEAR)}</span>
      <span>${ui.permission}</span>
    </div>
  </div>
</footer>
${client}<script>window.VD_PLATFORMS=${JSON.stringify(PLATFORMS.map(({ id, hosts, pattern }) => ({ id, hosts, pattern })))};</script>
<script src="/assets/app.js?v=${BUILD_ID}" defer></script>
</body>
</html>
`;
}

function downloader(tool, L) {
  const ui = L.ui;
  const active = tool.platform;
  const shown = PRIMARY.includes(active) || !active ? PRIMARY : [...PRIMARY, active];
  const tabs =
    shown
      .map((k) => {
        const base = content.platformPath[k];
        const href = TRANSLATED.includes(base) ? lp(L, base) : base;
        return `<a class="tab${k === active ? ' active' : ''}" data-platform="${k}" href="${href}">${P[k].glyph}${P[k].name}</a>`;
      })
      .join('') + `<a class="tab tab-more" href="#networks">${ui.more(Object.keys(P).length - shown.length)}</a>`;
  return `<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <span class="eyebrow">${I.sparkle} ${esc(tool.eyebrow)}</span>
      <h1>${tool.h1}</h1>
      <p class="lede">${esc(tool.lede)}</p>
      <nav class="tabs" aria-label="${ui.chooseNetwork}">${tabs}</nav>
      <form class="grab" id="grab" action="${lp(L, '/')}" method="get" novalidate>
        <label class="grab-field">
          <span class="sr-only">${ui.videoLink}</span>
          ${I.link}
          <input id="url" name="url" type="url" inputmode="url" autocomplete="off" spellcheck="false" dir="ltr" placeholder="${esc(tool.placeholder)}" required>
        </label>
        <button class="btn btn-ghost" type="button" id="paste">${I.paste} ${ui.paste}</button>
        <button class="btn btn-primary" type="submit" id="go">${I.down} ${ui.get}</button>
      </form>
      <div class="hint">${ui.hints.map((h) => `<span>${I.check} ${h}</span>`).join('')}</div>
      <div class="results" id="results" aria-live="polite"></div>
    </div>
    <div class="stack" aria-hidden="true">
      <div class="clip c1"><div class="play">${I.play}</div><b>@studio.moves</b><div class="bar"><i></i></div></div>
      <div class="clip c2"><div class="play">${I.play}</div><b>@late.night.eats</b><div class="bar"><i style="width:38%"></i></div></div>
      <div class="saved"><span class="tick">${I.check}</span><div>${ui.savedDemo}<small>1080p · MP4 · 12.4 MB</small></div></div>
    </div>
  </div>
</section>
${ad('result', L, { hidden: true })}
${ad('hero', L)}`;
}

function steps(tool, L) {
  return `<section><div class="wrap">
  <div class="section-head"><span class="kicker">${L.ui.howKicker}</span><h2>${esc(tool.stepsTitle)}</h2><p>${esc(tool.stepsLede)}</p></div>
  <ol class="steps">${tool.steps.map(([h, p]) => `<li><h3>${esc(h)}</h3><p>${esc(p)}</p></li>`).join('')}</ol>
</div></section>`;
}

function guide(g, L) {
  if (!g) return '';
  return `<section class="guide"><div class="wrap">
  <div class="section-head"><span class="kicker">${L.ui.guideKicker}</span><h2>${esc(g.title)}</h2></div>
  <div class="guide-body">${g.sections
    .map(([h, ps]) => `<article><h3>${esc(h)}</h3>${ps.map((p) => `<p>${esc(p)}</p>`).join('')}</article>`)
    .join('')}</div>
</div></section>`;
}

function features(tool, L) {
  return `<section><div class="wrap band">
  <div class="section-head"><span class="kicker" style="color:var(--sun)">${L.ui.whyKicker}</span><h2>${esc(tool.featuresTitle)}</h2></div>
  <div class="features">${tool.features.map(([ico, h, p]) => `<div class="feature"><div class="ico">${I[ico]}</div><h3>${esc(h)}</h3><p>${esc(p)}</p></div>`).join('')}</div>
</div></section>`;
}

function platformCards(exclude, L) {
  const ui = L.ui;
  const card = (href, platform, title, text) =>
    `<a class="pcard" href="${href}"><span class="logo" style="background:${P[platform].color}">${P[platform].glyph}</span><h3>${esc(title)}</h3><p>${esc(text)}</p><span class="go">${ui.openDl}</span></a>`;
  let cards;
  let others = '';
  if (L.code === 'en') {
    cards = content.tools.filter((t) => t.path !== exclude && t.card).map((t) => card(t.path, t.platform, t.card.title, t.card.text));
  } else {
    cards = Object.entries(L.cards)
      .filter(([p]) => p !== exclude)
      .map(([p, text]) => card(lp(L, p), toolByPath[p].platform, p === '/tiktok-mp3' ? 'TikTok MP3' : P[toolByPath[p].platform].name, text));
    // Networks without a translation link to their English page.
    others = `<p class="other-nets"><b>${ui.otherNetworks}:</b> ${content.tools
      .filter((t) => t.card && !PRIMARY.includes(t.platform))
      .map((t) => `<a href="${t.path}" hreflang="en" lang="en">${P[t.platform].name}</a>`)
      .join(' · ')}</p>`;
  }
  return `<section id="networks"><div class="wrap">
  <div class="section-head"><span class="kicker">${ui.netKicker(Object.keys(P).length)}</span><h2>${ui.netTitle}</h2></div>
  <div class="platforms">${cards.join('')}</div>${others}
</div></section>`;
}

function faq(items, L, title) {
  return `<section><div class="wrap">
  <div class="section-head"><span class="kicker">${L.ui.faqKicker}</span><h2>${esc(title || L.ui.faqTitle)}</h2></div>
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

function breadcrumbLd(L, page) {
  const home = { '@type': 'ListItem', position: 1, name: 'vid-down', item: `${SITE}${lp(L, '/')}` };
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [home, { '@type': 'ListItem', position: 2, name: page.crumb || page.title.split(/ [—–|-] /)[0], item: `${SITE}${page.path}` }],
  };
}

const WEBSITE_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'vid-down',
  alternateName: 'vid-down.com',
  url: `${SITE}/`,
  inLanguage: ALL_LANGS.map((L) => L.code),
};
const ORG_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'vid-down',
  url: `${SITE}/`,
  logo: `${SITE}/icon-512.png`,
  email: EMAIL,
};

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------
const BUILD_ID = Date.now().toString(36);
const pages = [];

function toolPage(tool, L) {
  const alternates = TRANSLATED.includes(tool.basePath) ? ALL_LANGS.map((X) => ({ code: X.code, locale: X.locale, path: lp(X, tool.basePath) })) : null;
  const body = [downloader(tool, L), steps(tool, L), guide(tool.guide, L), features(tool, L), ad('content', L), platformCards(tool.basePath, L), faq(tool.faq, L)].join('\n');
  const jsonld = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'vid-down',
      url: `${SITE}${tool.path}`,
      description: tool.description,
      inLanguage: L.code,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Any',
      browserRequirements: 'Requires JavaScript',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    },
    faqLd(tool.faq),
  ];
  if (tool.basePath === '/') jsonld.unshift(WEBSITE_LD, ORG_LD);
  else jsonld.push(breadcrumbLd(L, tool));
  pages.push({ ...tool, lang: L, alternates, jsonld, html: body });
}

for (const tool of content.tools) toolPage({ ...tool, basePath: tool.path }, EN);

for (const L of LANGS) {
  for (const base of TRANSLATED) {
    const en = toolByPath[base];
    const t = L.pages[base];
    toolPage(
      {
        ...en,
        ...t,
        basePath: base,
        path: lp(L, base),
        features: en.features.map(([ico], i) => [ico, ...L.features[i]]),
        crumb: L.ui.nav[base],
      },
      L
    );
  }
}

for (const doc of content.docs) {
  const html = doc.html.replace(/\{\{EMAIL\}\}/g, esc(EMAIL)).replace(/\{\{SITE\}\}/g, SITE);
  const extra = doc.path === '/faq' ? faq(content.allFaq, EN, 'Everything people ask us') : '';
  const jsonld = doc.path === '/faq' ? [faqLd(content.allFaq)] : doc.noindex ? null : [breadcrumbLd(EN, doc)];
  if (doc.article) {
    jsonld.push({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: doc.title.split(' | ')[0],
      description: doc.description,
      inLanguage: 'en',
      dateModified: CONTENT_UPDATED,
      author: { '@type': 'Organization', name: 'vid-down', url: `${SITE}/` },
      publisher: { '@type': 'Organization', name: 'vid-down', logo: { '@type': 'ImageObject', url: `${SITE}/icon-512.png` } },
      mainEntityOfPage: `${SITE}${doc.path}`,
    });
  }
  pages.push({ ...doc, lang: EN, jsonld, html: `<div class="wrap prose">${html}</div>${extra}` });
}

fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(path.join(OUT, 'assets'), { recursive: true });

for (const page of pages) {
  const file = page.path.endsWith('/') ? `${page.path.slice(1)}index.html` : `${page.path.slice(1)}.html`;
  fs.mkdirSync(path.dirname(path.join(OUT, file)), { recursive: true });
  fs.writeFileSync(path.join(OUT, file), layout(page, page.html));
}

for (const f of ['styles.css', 'app.js']) fs.copyFileSync(path.join(ROOT, 'src/assets', f), path.join(OUT, 'assets', f));
for (const f of fs.readdirSync(path.join(ROOT, 'src/static'))) fs.copyFileSync(path.join(ROOT, 'src/static', f), path.join(OUT, f));
fs.writeFileSync(path.join(OUT, 'favicon.svg'), LOGO.replace('aria-hidden="true"', 'xmlns="http://www.w3.org/2000/svg"'));

// Sitemap with hreflang alternates, so Google links each language version.
const indexable = pages.filter((p) => !p.noindex);
const priority = (p) => (p.basePath === '/' ? '1.0' : p.tool ? (p.lang.code === 'en' ? '0.9' : '0.8') : p.article ? '0.6' : '0.4');
fs.writeFileSync(
  path.join(OUT, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${indexable
  .map((p) => {
    const alt = (p.alternates || [])
      .map((a) => `\n    <xhtml:link rel="alternate" hreflang="${a.code}" href="${SITE}${a.path}"/>`)
      .concat(p.alternates ? [`\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE}${p.alternates[0].path}"/>`] : [])
      .join('');
    return `  <url>\n    <loc>${SITE}${p.path}</loc>\n    <lastmod>${CONTENT_UPDATED}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${priority(p)}</priority>${alt}\n  </url>`;
  })
  .join('\n')}
</urlset>
`
);
fs.writeFileSync(path.join(OUT, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${SITE}/sitemap.xml\n`);
// ads.txt authorises Google to sell ads on this domain (required by AdSense).
const pub = ADS.client ? ADS.client.replace('ca-', '') : 'pub-XXXXXXXXXXXXXXXX';
fs.writeFileSync(path.join(OUT, 'ads.txt'), `google.com, ${pub}, DIRECT, f08c47fec0942fa0\n`);

if (process.env.ADSENSE_CLIENT && !ADS.client) {
  console.warn(`[build] ADSENSE_CLIENT is set but is not a valid publisher ID (expected ca-pub- followed by digits); ads stay off.`);
}
console.log(`[build] ${pages.length} pages → public/ (ads: ${ADS.client ? 'live ' + ADS.client : 'placeholders'})`);
