---
name: englisheducation-study
description: englisheducation 개념 정리 페이지 제작 규칙. 헤더 HTML, TOC·섹션 카드·기출포인트·키워드 범례, 섹션 토글 JS, 콘텐츠 표현 패턴(헷갈 키텀 비교 카드·N대 전략 비교·용어 구분·양면성·기출분석 박스), SVG 다이어그램 패턴(A·B·C). 개념정리 페이지 만들 때 호출.
---

# 개념 정리 페이지 규칙

## 헤더 HTML

```html
<div class="header-topbar">
  <span class="header-sticker">STUDY NOTE</span>
  <span class="header-chapter">Ch.XX · 챕터명</span>
</div>
<h1 class="header-title"><span class="title-hl">개념 정리</span> 노트</h1>
<div class="header-script">Concept Notes · 챕터명</div>
<p class="header-sub">서브노트 순서 기반 · 기출 포인트 · 비교 도식</p>
<div class="header-divider"></div>
<p class="header-tip">📌 목차 버튼 클릭 → 해당 섹션으로 이동 &nbsp;·&nbsp; ▼ 섹션 제목 클릭 → 열고 닫기</p>
```

## 필수 구성 요소

- **TOC** (`.toc`): 클릭 시 해당 섹션 이동
- **섹션 카드** (`.sec`): ▼ 클릭 접기·펼치기, 기본 첫 섹션 open
- **기출 포인트** (`.exam`): TOC 바로 아래 배치, 주황 배경
- **키워드 범례** (`.legend`): kw1~kw4 설명

## 섹션 토글 JS

```js
function toggle(id){ document.getElementById(id).classList.toggle('open'); }
function openSec(id){ const s=document.getElementById(id); s.classList.add('open'); s.scrollIntoView({behavior:'smooth',block:'start'}); }
```

---

# 콘텐츠 표현 패턴

## ① 헷갈 키텀 N대 비교 카드 (★★★ 함정 대비)

```html
<div class="concept">
  <div class="c-title">🔑 헷갈리는 키텀 3대 비교 (★★★ 함정 단골)</div>
  <div class="grid col2">
    <div class="grid-item">
      <div class="gi-title">① <span class='kw4'>A</span> vs <span class='kw4'>B</span></div>
      <div class="gi-body"><span><strong>A</strong>: 정의 + 예시</span><span><strong>B</strong>: 정의 + 예시</span><span>🔍 구분 포인트</span></div>
    </div>
    <!-- ②, ③ 반복 -->
  </div>
</div>
```

## ② N대 전략 한눈 비교 카드

마지막 셀은 "구분 포인트"로 요약.

```html
<div class="grid col2">
  <div class="grid-item"><div class="gi-title">전략1</div>...</div>
  <div class="grid-item"><div class="gi-title">전략2</div>...</div>
  <div class="grid-item"><div class="gi-title">전략3</div>...</div>
  <div class="grid-item">
    <div class="gi-title">🎯 구분 포인트</div>
    <div class="gi-body"><span><strong>전략1</strong>: 한 줄 요약</span>...</div>
  </div>
</div>
```

## ③ 용어 구분 카드 (Motivation vs Orientation 타입)

```html
<div class="concept">
  <div class="c-title">🔑 [용어A] vs [용어B] 용어 구분 (★★★ 헷갈 키텀)</div>
  <p class="note"><strong>저자 공식 구분</strong>: ...</p>
  <div class="grid col2">
    <div class="grid-item">
      <div class="gi-title"><span class='kw4'>용어A</span> (번역)</div>
      <div class="gi-body"><span>정의</span><span>하위: <span class='kw1'>X/Y</span></span></div>
    </div>
  </div>
  <p class="note">⚠️ 주의: "혼용 표현"도 통용되지만 엄밀히는 [정확 표현]이 정확.</p>
</div>
```

## ④ Dual-Nature (양면성) 표현 패턴

High/Low, Strong/Weak 같은 연속체에서 각 극점의 장·단점 모두 제시.

```html
<div class="gi-body">
  <span>✅ <strong>장점</strong>: ...</span>
  <span>❌ <strong>단점</strong>: ...</span>
  <span><em>e.g. 예시</em></span>
</div>
```

하단에 `💡 Optimum level 필요` 문구로 균형 강조.

## ⑤ 상단 기출분석 포인트 박스

```html
<div class="exam" style="margin-bottom:20px">
  <div class="exam-label">📝 기출분석 포인트 (Ch.N 챕터명)</div>
  <p>① <span class='kw4'>핵심개념1</span> — 출제 유형 + 예시</p>
</div>
```

---

# SVG 다이어그램 패턴

**컬러 팔레트**

| 역할 | fill | stroke |
|------|------|--------|
| 일반 박스 (kw1) | `rgba(46,125,82,.1)` | `rgba(46,125,82,.4)` |
| 중간 단계 (kw2) | `rgba(0,121,107,.08)` | `rgba(0,121,107,.35)` |
| 최종 결과 (kw4) | `rgba(183,28,28,.08)` | `rgba(183,28,28,.35)` |
| 화살표 `→` / `⇄` | fill `#26a69a` | — |
| 등호 `=` | fill `#b71c1c` | — |

## 패턴 A — 4단계 순서형 플로우 (X→Y→Z=결과)

박스 3개 + 최종 결과 박스 1개. McLaughlin Automatization, Bialystok Proceduralization 등에 적용.

```html
<svg viewBox="0 0 700 90" style="width:100%;margin-top:12px;font-family:'JetBrains Mono',monospace" xmlns="http://www.w3.org/2000/svg">
  <rect x="4" y="10" width="148" height="70" rx="8" fill="rgba(46,125,82,.1)" stroke="rgba(46,125,82,.4)" stroke-width="1.5"/>
  <text x="78" y="38" text-anchor="middle" fill="#1b5e3a" font-size="12" font-weight="bold">단계A</text>
  <text x="78" y="55" text-anchor="middle" fill="#3a6b51" font-size="10">부제1</text>
  <text x="78" y="70" text-anchor="middle" fill="#3a6b51" font-size="10">부제2</text>
  <text x="163" y="52" text-anchor="middle" fill="#26a69a" font-size="20">→</text>
  <rect x="176" y="10" width="148" height="70" rx="8" fill="rgba(0,121,107,.08)" stroke="rgba(0,121,107,.35)" stroke-width="1.5"/>
  <text x="250" y="43" text-anchor="middle" fill="#00695c" font-size="12" font-weight="bold">중간단계</text>
  <text x="250" y="60" text-anchor="middle" fill="#00796b" font-size="10">설명</text>
  <text x="336" y="52" text-anchor="middle" fill="#26a69a" font-size="20">→</text>
  <rect x="348" y="10" width="148" height="70" rx="8" fill="rgba(46,125,82,.1)" stroke="rgba(46,125,82,.4)" stroke-width="1.5"/>
  <text x="422" y="38" text-anchor="middle" fill="#1b5e3a" font-size="12" font-weight="bold">단계B</text>
  <text x="422" y="70" text-anchor="middle" fill="#3a6b51" font-size="10">부제2</text>
  <text x="508" y="52" text-anchor="middle" fill="#b71c1c" font-size="20">=</text>
  <rect x="519" y="10" width="177" height="70" rx="8" fill="rgba(183,28,28,.08)" stroke="rgba(183,28,28,.35)" stroke-width="1.5"/>
  <text x="607" y="43" text-anchor="middle" fill="#b71c1c" font-size="12" font-weight="bold">결과 용어</text>
  <text x="607" y="60" text-anchor="middle" fill="#b71c1c" font-size="10">부제</text>
</svg>
```

## 패턴 B — 3단계 발전 플로우 (A→B→C)

박스 3개. Regulation(Object→Other→Self) 등에 적용.

```html
<svg viewBox="0 0 700 100" style="width:100%;margin-top:12px;font-family:'JetBrains Mono',monospace" xmlns="http://www.w3.org/2000/svg">
  <rect x="4" y="10" width="208" height="80" rx="8" fill="rgba(46,125,82,.1)" stroke="rgba(46,125,82,.4)" stroke-width="1.5"/>
  <text x="108" y="38" text-anchor="middle" fill="#1b5e3a" font-size="12" font-weight="bold">단계1</text>
  <text x="108" y="56" text-anchor="middle" fill="#3a6b51" font-size="10">부제1</text>
  <text x="222" y="55" text-anchor="middle" fill="#26a69a" font-size="22">→</text>
  <rect x="236" y="10" width="208" height="80" rx="8" fill="rgba(46,125,82,.1)" stroke="rgba(46,125,82,.4)" stroke-width="1.5"/>
  <text x="340" y="38" text-anchor="middle" fill="#1b5e3a" font-size="12" font-weight="bold">단계2</text>
  <text x="454" y="55" text-anchor="middle" fill="#26a69a" font-size="22">→</text>
  <rect x="466" y="10" width="230" height="80" rx="8" fill="rgba(183,28,28,.08)" stroke="rgba(183,28,28,.35)" stroke-width="1.5"/>
  <text x="581" y="38" text-anchor="middle" fill="#b71c1c" font-size="12" font-weight="bold">최종 단계</text>
</svg>
```

## 패턴 C — 이분 대조 (A ⇄ B)

박스 2개 + `⇄`. Bottom-up vs Top-down, Implicit vs Explicit 등에 적용.

```html
<svg viewBox="0 0 680 120" style="width:100%;margin-top:16px;font-family:'JetBrains Mono',monospace" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="20" width="280" height="80" rx="10" fill="rgba(46,125,82,.1)" stroke="rgba(46,125,82,.4)" stroke-width="1.5"/>
  <text x="150" y="52" text-anchor="middle" fill="#1b5e3a" font-size="13" font-weight="bold">개념A</text>
  <text x="150" y="70" text-anchor="middle" fill="#3a6b51" font-size="11">특징1</text>
  <text x="340" y="66" text-anchor="middle" fill="#26a69a" font-size="28">⇄</text>
  <rect x="370" y="20" width="300" height="80" rx="10" fill="rgba(183,28,28,.07)" stroke="rgba(183,28,28,.25)" stroke-width="1.5"/>
  <text x="520" y="52" text-anchor="middle" fill="#b71c1c" font-size="13" font-weight="bold">개념B</text>
</svg>
```

SVG 사용 기준: ① 2개 이상 단계의 방향성 있는 흐름 ② A vs B 이분 대조 (div grid로 불충분할 때) ③ 스펙트럼/연속체 표현. 단순 목록은 `.grid` + `.grid-item` 유지.
