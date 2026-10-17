// Minimal DOM regression checks; real browser scrolling/keyboard QA is separate.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const script = fs.readFileSync('study-return.js', 'utf8');

function boot(hash = '', readyState = 'complete', search = '') {
  const elements = new Map(), scrolls = [], events = {};
  function element(id, tagName = 'DIV', parentElement = null, classes = []) {
    const tokens = new Set(classes), attributes = new Map();
    const el = { id, tagName, parentElement, open: false,
      classList: { contains: key => tokens.has(key), add: key => tokens.add(key),
        remove: key => tokens.delete(key) },
      setAttribute: (key, value) => attributes.set(key, value),
      getAttribute: key => attributes.get(key),
      scrollIntoView: options => scrolls.push({ id, block: options.block }),
      focus() { throw new Error('Hash reveal must not steal focus'); }
    };
    elements.set(id, el);
    return el;
  }
  const root = element('root'), first = element('s1', 'DIV', root, ['sec', 'open']);
  const section = element('s5', 'DIV', root, ['sec']);
  const details = element('feedback-depth', 'DETAILS', section);
  const nested = element('answer', 'DETAILS', details);
  const target = element('answer:예시.1', 'P', nested);
  const sibling = element('s6', 'DIV', root, ['sec']);
  const link = element('back-btn', 'A', root);
  const location = new URL('https://namkicheol.github.io/englisheducation/grammar_study.html' + search + hash);
  const listen = (name, callback) => { (events[name] ||= []).push(callback); };
  vm.runInNewContext(script, { URL, URLSearchParams,
    window: { location, addEventListener: listen },
    document: { readyState, referrer: '', getElementById: id => elements.get(id) || null,
      addEventListener: listen }
  });
  const fire = name => (events[name] || []).forEach(callback => callback());
  return { first, section, details, nested, target, sibling, link, scrolls, events, fire,
    hash(value) { location.hash = value; fire('hashchange'); }
  };
}

for (const readyState of ['loading', 'complete']) {
  const r = boot('#feedback-depth', readyState);
  if (readyState === 'loading') {
    assert.equal(r.details.open, false);
    assert.equal(r.events.DOMContentLoaded.length, 1);
    r.fire('DOMContentLoaded');
  }
  assert(r.section.classList.contains('open'));
  assert(r.details.open);
  assert.equal(r.nested.open, false, 'answers stay closed');
  assert.equal(r.sibling.classList.contains('open'), false);
  assert.deepEqual(r.scrolls, [{ id: 'feedback-depth', block: 'start' }]);
}

for (const hash of ['', '#', '#unknown', '#[', '#%E0%A4%A']) {
  const r = boot(hash);
  assert(r.first.classList.contains('open'));
  assert.equal(r.section.classList.contains('open'), false);
  assert.equal(r.details.open, false);
  assert.equal(r.scrolls.length, 0);
  assert.equal(r.link.href, 'https://namkicheol.github.io/englisheducation/index.html');
}

const nested = boot('#' + encodeURIComponent('answer:예시.1'));
assert(nested.section.classList.contains('open'));
assert(nested.details.open && nested.nested.open);
assert.equal(nested.scrolls[0].id, 'answer:예시.1');

const navigation = boot();
navigation.hash('#feedback-depth');
assert(navigation.details.open);
// Closing a section remains possible; the next explicit navigation reveals it.
navigation.section.classList.remove('open');
navigation.details.open = false;
navigation.hash('#s6');
assert(navigation.sibling.classList.contains('open'));
assert.equal(navigation.details.open, false);
navigation.hash('#feedback-depth'); // Same event path used by browser Back/Forward.
assert(navigation.section.classList.contains('open') && navigation.details.open);
assert.equal(navigation.nested.open, false);
navigation.hash('#unknown');
navigation.hash('');
assert.equal(navigation.scrolls.length, 3);

const bridge = boot('#feedback-depth', 'complete', '?returnTo=linguistic_study.html%23s4');
assert.equal(bridge.link.href, 'https://namkicheol.github.io/englisheducation/linguistic_study.html#s4');
assert(bridge.details.open);
const card = boot('#feedback-depth', 'complete', '?id=education_2022_B11');
assert.equal(card.link.href, 'https://etwiki.net/index.html?id=education_2022_B11');
const unsafe = boot('#feedback-depth', 'complete', '?returnTo=javascript%3Aalert(1)');
assert.equal(unsafe.link.href, 'https://namkicheol.github.io/englisheducation/index.html');

const pages = fs.readdirSync('.').filter(name => name.endsWith('_study.html'));
assert.equal(pages.length, 13);
for (const page of pages) {
  const source = fs.readFileSync(page, 'utf8');
  assert.equal((source.match(/<script src="\.\/study-return\.js"><\/script>/g) || []).length, 1, page);
  assert(!source.includes('location.hash'), page + ': use the shared hash handler');
  for (const match of source.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) {
    new vm.Script(match[1], { filename: page });
  }
}
const linguistic = fs.readFileSync('linguistic_study.html', 'utf8');
const bridgeText = '같은 오류에 대한 feedback 비교와 uptake·repair 판단';
assert(linguistic.includes('href="./grammar_study.html?returnTo=linguistic_study.html%23s4#feedback-depth">' + bridgeText));
assert(linguistic.indexOf(bridgeText) > linguistic.indexOf('Recast 핵심 정리'));
assert(linguistic.indexOf(bridgeText) < linguistic.indexOf('<!-- ⑤ Uptake & Output -->'));
console.log('PASS: initial/hashchange reveal, nested details, safe IDs, closed defaults, return links, and 13 study-page integrations');
