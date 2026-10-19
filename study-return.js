(function () {
  'use strict';

  function allowedReturnUrl(value) {
    if (!value) return null;
    try {
      var url = new URL(value, window.location.href);
      if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
      if (url.username || url.password) return null;
      if (url.origin === window.location.origin) return url.href;
      if (url.protocol !== 'https:') return null;
      if (url.origin === 'https://etwiki.net') return url.href;
      if (url.origin === 'https://namkicheol.github.io'
          && /^\/(?:englisheducation|linguistics|phonetics-phonology)(?:\/|$)/.test(url.pathname)) return url.href;
      return null;
    } catch (_) {
      return null;
    }
  }

  function validReturnCardId(value) {
    return typeof value === 'string'
      && /^[a-z][a-z0-9-]*_[0-9]{4}_[A-Za-z0-9]+(?:_[A-Za-z0-9]+)*$/.test(value);
  }

  function initializeReturnLink() {
    var link = document.getElementById('back-btn');
    if (!link) return;

    var params = new URLSearchParams(window.location.search);
    var explicitReturn = allowedReturnUrl(params.get('returnTo'));
    var returnCardId = null;
    ['return', 'rid', 'id'].some(function (key) {
      var candidate = params.get(key);
      if (validReturnCardId(candidate)) {
        returnCardId = candidate;
        return true;
      }
      return false;
    });
    var referrer = allowedReturnUrl(document.referrer);
    var cardReturn = returnCardId
      ? 'https://etwiki.net/index.html?id=' + encodeURIComponent(returnCardId)
      : null;
    var destination = explicitReturn || cardReturn || referrer || new URL('./index.html', window.location.href).href;
    var label = explicitReturn && params.get('returnLabel');
    var legacyLabel = referrer && params.get('from');

    link.href = destination;
    link.textContent = label ? '← ' + label + '로 돌아가기'
      : explicitReturn ? '← 이전 페이지로 돌아가기'
      : cardReturn ? '← 기출 WIKI로 돌아가기'
      : legacyLabel ? '← ' + legacyLabel + '로 돌아가기'
      : referrer ? '← 이전 페이지로 돌아가기'
      : '← 영어교육론 허브로 돌아가기';
    link.setAttribute('aria-label', link.textContent.replace(/^←\s*/, ''));
    link.title = link.getAttribute('aria-label');
  }

  function revealHashTarget() {
    var hash = window.location.hash;
    if (!hash || hash === '#') return;
    var id;
    try {
      id = decodeURIComponent(hash.slice(1));
    } catch (_) {
      return;
    }
    // IDs are not CSS selectors: punctuation and encoded Unicode are valid.
    var target = document.getElementById(id);
    if (!target) return;

    for (var element = target; element; element = element.parentElement) {
      if (element.classList.contains('sec')) element.classList.add('open');
      if (element.tagName === 'DETAILS') element.open = true;
    }
    // Reveal only the target's path; nested answers remain learner-controlled.
    target.scrollIntoView({ block: 'start' });
  }

  function initializeStudyPage() {
    initializeReturnLink();
    revealHashTarget();
  }

  window.addEventListener('hashchange', revealHashTarget);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeStudyPage, { once: true });
  } else {
    initializeStudyPage();
  }
})();

/* Independent study-disclosure component; return navigation above is unchanged. */
(function () {
  'use strict';
  if (!/(?:_study|_concepts)\.html$/.test(window.location.pathname)
      || document.getElementById('ew-study-details-script')) return;
  var current = document.currentScript;
  if (!current || !current.src) return;
  var script = document.createElement('script');
  script.id = 'ew-study-details-script';
  script.src = new URL('study-details.js', current.src).href;
  document.head.appendChild(script);
})();

/* Note-to-exam/dictionary return context and reading-position restoration. */
(function () {
  'use strict';
  var here = new URL(location.href);
  var param = 'studyNoteReturn';
  var tokenParam = 'studyNoteRestore';
  function noteUrl(value) {
    try {
      var url = new URL(value);
      if (url.protocol !== 'https:' || url.username || url.password) return null;
      if (url.origin !== 'https://etwiki.net' && url.origin !== 'https://namkicheol.github.io') return null;
      if (!/^\/(?:englisheducation|linguistics|phonetics-phonology|transformational-grammar)\/[^/]+(?:_study|_concepts)\.html$/.test(url.pathname)) return null;
      return url;
    } catch (_) { return null; }
  }
  function isDestination(url) {
    return url.protocol === 'https:' && !url.username && !url.password
      && ((url.origin === 'https://etwiki.net' && /^\/(?:index|concept)\.html$/.test(url.pathname))
      || (url.origin === 'https://namkicheol.github.io' && /^\/testmaster\/(?:index|concept)\.html$/.test(url.pathname)));
  }
  function read(key) { try { return JSON.parse(sessionStorage.getItem(key)); } catch (_) { return null; } }
  function write(key, value) { try { sessionStorage.setItem(key, JSON.stringify(value)); } catch (_) {} }
  var source = noteUrl(here.href);
  var returnUrl = noteUrl(here.searchParams.get(param));
  var storageKey = 'etwiki.study-note-view.v1:' + here.pathname;
  function controls() { return Array.from(document.querySelectorAll('details, .sec')); }
  function save(token) {
    write(storageKey + ':' + token, {token: token, url: here.origin + here.pathname,
      y: window.scrollY, time: Date.now(),
      open: controls().map(function (node) { return node.tagName === 'DETAILS' ? node.open : node.classList.contains('open'); })});
  }
  if (source) {
    var restoreToken = here.searchParams.get(tokenParam);
    var saved = restoreToken && read(storageKey + ':' + restoreToken);
    if (restoreToken && saved && saved.token === restoreToken && saved.url === here.origin + here.pathname
        && Array.isArray(saved.open) && Number.isFinite(saved.time)
        && Date.now() - saved.time >= 0 && Date.now() - saved.time < 86400000) {
      controls().forEach(function (node, i) {
        if (typeof saved.open[i] !== 'boolean') return;
        if (node.tagName === 'DETAILS') node.open = saved.open[i];
        else node.classList.toggle('open', saved.open[i]);
      });
      var cancelled = false;
      ['touchstart', 'wheel', 'pointerdown', 'keydown'].forEach(function (type) {
        window.addEventListener(type, function () { cancelled = true; }, {once: true, passive: true});
      });
      function restore() { if (!cancelled) window.scrollTo(0, Math.max(0, Number(saved.y) || 0)); }
      requestAnimationFrame(restore);
      window.addEventListener('load', function () { requestAnimationFrame(restore); }, {once: true});
      // Run after the legacy hash reveal handler so it cannot overwrite the reading position.
      window.addEventListener('pageshow', function () { requestAnimationFrame(restore); }, {once: true});
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(restore);
    }
  }
  if (!source && returnUrl && isDestination(here) && !document.getElementById('study-note-return')) {
    var nav = document.createElement('nav');
    nav.id = 'study-note-return';
    nav.setAttribute('aria-label', '공부하던 노트로 돌아가기');
    nav.style.cssText = 'position:sticky;top:0;z-index:10000;padding:8px 12px;background:#fff;border-bottom:1px solid #d5dde6;';
    var button = document.createElement('a');
    button.href = returnUrl.href;
    button.textContent = '← 공부하던 노트로';
    button.style.cssText = 'display:inline-flex;align-items:center;min-height:44px;padding:0 14px;border:1px solid #9bb9ca;border-radius:12px;background:#edf5fa;color:#17496b;font:700 15px/1.4 sans-serif;text-decoration:none;';
    nav.appendChild(button);
    document.body.insertBefore(nav, document.body.firstChild);
  }
  function decorate(anchor, clicked) {
    if (!anchor || anchor.hasAttribute('download') || anchor.closest('#study-note-return')) return;
    var url;
    try { url = new URL(anchor.getAttribute('href'), location.href); } catch (_) { return; }
    if (!isDestination(url)) return;
    if (source) {
      var token = clicked ? Date.now().toString(36) + Math.random().toString(36).slice(2, 8) : 'preview';
      var origin = new URL(here);
      origin.searchParams.delete(param);
      origin.searchParams.set(tokenParam, token);
      if (clicked) save(token);
      url.searchParams.set(param, origin.href);
      anchor.removeAttribute('target');
    } else if (returnUrl) url.searchParams.set(param, returnUrl.href);
    else return;
    anchor.href = url.href;
  }
  if (source || returnUrl) {
    document.querySelectorAll('a[href]').forEach(function (a) { decorate(a, false); });
    document.addEventListener('click', function (event) {
      if (event.defaultPrevented) return;
      decorate(event.target.closest && event.target.closest('a[href]'), true);
    }, true);
    document.addEventListener('auxclick', function (event) {
      decorate(event.target.closest && event.target.closest('a[href]'), true);
    }, true);
  }
})();
