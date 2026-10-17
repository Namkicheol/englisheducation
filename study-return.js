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
