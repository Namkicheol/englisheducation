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
  if (!window.location || !document.querySelectorAll) return;
  var here = new URL(window.location.href);
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
      && ((url.origin === 'https://etwiki.net' && /^\/(?:(?:index|concept)\.html)?$/.test(url.pathname))
      || (url.origin === 'https://namkicheol.github.io' && /^\/testmaster\/(?:(?:index|concept)\.html)?$/.test(url.pathname)));
  }
  function read(key) {
    try { var shared = window.localStorage.getItem(key); if (shared) return JSON.parse(shared); } catch (_) {}
    try { return JSON.parse(window.sessionStorage.getItem(key)); } catch (_) { return null; }
  }
  function write(key, value) {
    try {
      var storage = window.localStorage;
      var records = [];
      for (var i = 0; i < storage.length; i++) {
        var existingKey = storage.key(i);
        if (existingKey && existingKey.indexOf('etwiki.study-note-view.v1:') === 0) {
          try { records.push({key: existingKey, time: JSON.parse(storage.getItem(existingKey)).time || 0}); }
          catch (_) { records.push({key: existingKey, time: 0}); }
        }
      }
      records.sort(function (a, b) { return b.time - a.time; });
      records.forEach(function (record, index) {
        if (index >= 79 || Date.now() - record.time >= 86400000) storage.removeItem(record.key);
      });
      storage.setItem(key, JSON.stringify(value)); return;
    } catch (_) {}
    try { window.sessionStorage.setItem(key, JSON.stringify(value)); } catch (_) {}
  }
  var source = noteUrl(here.href);
  var returnUrl = noteUrl(here.searchParams.get(param));
  var storageKey = 'etwiki.study-note-view.v1:' + here.pathname;
  var initialToken = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  var initialSaved = false;
  function controls() { return Array.from(document.querySelectorAll('details, .sec, .section')); }
  function sectionParts(node) {
    var header = node.querySelector && node.querySelector('.sec-header, [aria-controls]');
    var id = header && header.getAttribute('aria-controls');
    return {header: header, body: id && document.getElementById(id)};
  }
  function isOpen(node) {
    if (node.tagName === 'DETAILS') return node.open;
    var parts = sectionParts(node);
    return parts.body ? !parts.body.hidden : node.classList.contains('open');
  }
  function save(token) {
    write(storageKey + ':' + token, {token: token, url: here.origin + here.pathname,
      y: window.scrollY, time: Date.now(),
      open: controls().map(isOpen)});
  }
  if (source) {
    var restoreToken = here.searchParams.get(tokenParam);
    var saved = restoreToken && read(storageKey + ':' + restoreToken);
    if (restoreToken && saved && saved.token === restoreToken && saved.url === here.origin + here.pathname
        && Array.isArray(saved.open) && Number.isFinite(saved.time)
        && Date.now() - saved.time >= 0 && Date.now() - saved.time < 86400000) {
      function restoreControls() { controls().forEach(function (node, i) {
        if (typeof saved.open[i] !== 'boolean') return;
        if (node.tagName === 'DETAILS') node.open = saved.open[i];
        else {
          node.classList.toggle('open', saved.open[i]);
          var parts = sectionParts(node);
          if (parts.header) parts.header.setAttribute('aria-expanded', String(saved.open[i]));
          if (parts.body) parts.body.hidden = !saved.open[i];
        }
      }); }
      restoreControls();
      var cleanUrl = new URL(window.location.href);
      cleanUrl.searchParams.delete(tokenParam);
      try { window.history.replaceState(window.history.state, '', cleanUrl.href); } catch (_) {}
      var cancelled = false;
      ['touchstart', 'wheel', 'pointerdown', 'keydown'].forEach(function (type) {
        window.addEventListener(type, function () { cancelled = true; }, {once: true, passive: true});
      });
      function restore() { if (!cancelled) { restoreControls(); window.scrollTo(0, Math.max(0, Number(saved.y) || 0)); } }
      requestAnimationFrame(restore);
      document.addEventListener('DOMContentLoaded', function () { requestAnimationFrame(restore); }, {once: true});
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
    nav.className = 'study-note-return';
    var button = document.createElement('a');
    button.href = returnUrl.href;
    button.textContent = '← 공부하던 노트로';
    button.className = 'study-note-return-link';
    nav.appendChild(button);
    document.body.insertBefore(nav, document.body.firstChild);
  }
  function decorate(anchor, clicked) {
    if (!anchor || anchor.hasAttribute('download') || anchor.closest('#study-note-return')) return;
    var url;
    try { url = new URL(anchor.getAttribute('href'), window.location.href); } catch (_) { return; }
    if (!isDestination(url)) return;
    if (source) {
      var token = clicked ? Date.now().toString(36) + Math.random().toString(36).slice(2, 8) : initialToken;
      var origin = new URL(here);
      origin.searchParams.delete(param);
      origin.searchParams.set(tokenParam, token);
      if (clicked || !initialSaved) { save(token); initialSaved = true; }
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
    ['pointerdown', 'contextmenu'].forEach(function (type) {
      document.addEventListener(type, function (event) {
        decorate(event.target.closest && event.target.closest('a[href]'), true);
      }, true);
    });
  }
})();
