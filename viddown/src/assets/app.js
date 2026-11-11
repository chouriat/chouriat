/* viddown — client */
(() => {
  'use strict';
  const $ = (s, el = document) => el.querySelector(s);

  // ---- Theme toggle (remembered per browser) ----
  const root = document.documentElement;
  const themeBtn = $('#theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const dark = root.dataset.theme
        ? root.dataset.theme === 'dark'
        : matchMedia('(prefers-color-scheme: dark)').matches;
      root.dataset.theme = dark ? 'light' : 'dark';
      try { localStorage.setItem('vd-theme', root.dataset.theme); } catch {}
    });
  }

  // ---- Mobile menu ----
  const menuBtn = $('#menu-btn');
  const links = $('#nav-links');
  if (menuBtn && links) {
    menuBtn.addEventListener('click', () => {
      const open = links.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', String(open));
    });
  }

  // ---- Downloader ----
  const form = $('#grab');
  if (!form) return;
  const input = $('#url');
  const submit = $('#go');
  const pasteBtn = $('#paste');
  const results = $('#results');
  const tabs = document.querySelectorAll('.tab[data-platform]');
  const resultAd = $('#result-ad');

  const PATTERNS = {
    tiktok: /(^|\.)tiktok\.com$/,
    instagram: /(^|\.)(instagram\.com|instagr\.am)$/,
    facebook: /(^|\.)(facebook\.com|fb\.watch|fb\.com)$/,
    x: /(^|\.)(x\.com|twitter\.com)$/,
  };
  function detect(value) {
    const m = String(value).match(/https?:\/\/[^\s]+/i);
    try {
      const host = new URL(m ? m[0] : `https://${value.trim()}`).hostname.toLowerCase();
      return Object.keys(PATTERNS).find((k) => PATTERNS[k].test(host)) || null;
    } catch { return null; }
  }
  function highlight() {
    const p = detect(input.value);
    if (!p) return;
    tabs.forEach((t) => t.classList.toggle('active', t.dataset.platform === p));
  }
  input.addEventListener('input', highlight);

  if (pasteBtn) {
    if (!navigator.clipboard || !navigator.clipboard.readText) pasteBtn.hidden = true;
    pasteBtn.addEventListener('click', async () => {
      try {
        const text = await navigator.clipboard.readText();
        if (text) {
          input.value = text.trim();
          highlight();
          form.requestSubmit();
        }
      } catch {
        input.focus();
      }
    });
  }

  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmtDur = (s) => {
    if (!s) return '';
    s = Math.round(s);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  };
  const icon = {
    alert: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><path d="M12 7v6M12 17h.01"/></svg>',
    user: '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>',
  };

  function setBusy(busy) {
    submit.disabled = busy;
    submit.innerHTML = busy ? '<span class="spinner" aria-hidden="true"></span> Fetching…' : submit.dataset.label;
  }
  submit.dataset.label = submit.innerHTML;

  function showError(msg) {
    results.innerHTML = `<div class="alert" role="alert">${icon.alert}<div>${esc(msg)}</div></div>`;
  }

  function render(data) {
    const cards = data.items.map((item, i) => {
      const opts = item.options
        .map((o, j) => `<a class="opt${j === 0 ? ' primary' : ''}" href="${esc(o.href)}" download data-kind="${esc(o.kind)}">${esc(o.label)}<small>${esc(o.detail)}</small></a>`)
        .join('');
      return `<article class="result">
        <div class="thumb" ${item.thumbnail ? `style="background-image:url('${esc(item.thumbnail)}')"` : ''} role="img" aria-label="Video thumbnail">
          ${item.duration ? `<span class="dur">${fmtDur(item.duration)}</span>` : ''}
        </div>
        <div class="meta">
          <div class="author">${icon.user} ${esc(data.author || data.platformName)}${data.items.length > 1 ? ` · ${i + 1}/${data.items.length}` : ''}</div>
          <div class="title">${esc(item.title)}</div>
          <div class="options">${opts}</div>
        </div>
      </article>`;
    });
    results.innerHTML = `${cards.join('')}
      <div class="result-actions"><span>Links stay valid for 30 minutes.</span><button type="button" class="link-btn" id="again">← Download another video</button></div>`;
    $('#again').addEventListener('click', () => {
      results.innerHTML = '';
      input.value = '';
      input.focus();
    });
  }

  // Give feedback while the server prepares the file (the browser download starts after).
  results.addEventListener('click', (e) => {
    const a = e.target.closest('.opt');
    if (!a) return;
    const small = a.querySelector('small');
    const old = small.textContent;
    a.classList.add('busy');
    small.textContent = 'Preparing file…';
    setTimeout(() => { a.classList.remove('busy'); small.textContent = old; }, 6000);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const url = input.value.trim();
    if (!url) { input.focus(); return; }
    if (!detect(url)) {
      showError('Paste a link from TikTok, Instagram, Facebook or X. Tip: use the Share button in the app and choose "Copy link".');
      return;
    }
    setBusy(true);
    results.innerHTML = '<div class="skeleton" aria-hidden="true"></div>';
    try {
      const res = await fetch('/api/resolve', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong. Please try again.');
      render(data);
      if (resultAd) {
        resultAd.hidden = false;
        if (!resultAd.dataset.loaded && resultAd.querySelector('ins.adsbygoogle')) {
          resultAd.dataset.loaded = '1';
          try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch {}
        }
      }
    } catch (err) {
      showError(err.message || 'Network error. Check your connection and try again.');
    } finally {
      setBusy(false);
    }
  });

  // Support links shared to the site, e.g. /?url=https://...
  const shared = new URLSearchParams(location.search).get('url');
  if (shared) { input.value = shared; highlight(); form.requestSubmit(); }
})();
