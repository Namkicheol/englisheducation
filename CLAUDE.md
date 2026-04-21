# 영어교육론 개념 마스터

임용고시 대비 영어교육론 OX 퀴즈 + 개념 정리 웹 애플리케이션. 순수 HTML/CSS/JS (백엔드 없음).

## 파일 구조

| 파일 | 역할 | 상태 |
|------|------|------|
| `listen.html` | Ch.7 Teaching Listening OX 퀴즈 | ✅ 완료 |
| `listen_study.html` | Ch.7 Teaching Listening 개념 정리 | ✅ 완료 |
| `sla.html` | Ch.1 SLA Theory OX 퀴즈 | ✅ 완료 |
| `sla_study.html` | Ch.1 SLA Theory 개념 정리 | ✅ 완료 |
| `linguistic.html` | Ch.2 Linguistic Aspects OX 퀴즈 | ✅ 완료 |
| `linguistic_study.html` | Ch.2 Linguistic Aspects 개념 정리 | ✅ 완료 |
| `reading.html` | Ch.6 Teaching Reading OX 퀴즈 | ✅ 완료 |
| `reading_study.html` | Ch.6 Teaching Reading 개념 정리 | ✅ 완료 |
| `learner.html` | Ch.3 Learner Variables OX 퀴즈 | ✅ 완료 |
| `learner_study.html` | Ch.3 Learner Variables 개념 정리 | ✅ 완료 |
| `index.html` | 전체 챕터 인덱스 랜딩 페이지 | ✅ 완료 |
| `sounds.js` | 정답/오답 효과음 (Web Audio API) | ✅ 공용 |
| `score-popup.js` | 결과 팝업 + 컨페티 + 최고기록 | ✅ 공용 |
| `refs/` | 키워드·매핑·서브노트·기출 참고 자료 | - |

### 제작 예정 파일명 규칙 (챕터당 2개)
| 챕터 | 퀴즈 | 개념정리 |
|------|------|---------|
| Ch.4 Discourse | `discourse.html` | `discourse_study.html` |
| Ch.5 Methodology | `methodology.html` | `methodology_study.html` |
| Ch.8 Speaking | `speaking.html` | `speaking_study.html` |
| Ch.9 Writing | `writing.html` | `writing_study.html` |
| Ch.10 Grammar | `grammar.html` | `grammar_study.html` |
| Ch.11 Vocabulary | `vocab.html` | `vocab_study.html` |
| Ch.12 CALL·Material | `call.html` | `call_study.html` |
| Ch.13 Assessment | `assessment.html` | `assessment_study.html` |

---

## 디자인 시스템 (listen.html / listen_study.html 기준)

### 공통
- 폰트 3종: `Noto Sans KR` + `JetBrains Mono` + `Caveat` (손글씨)
- Google Fonts: `Noto+Sans+KR:wght@400;500;700;900 | JetBrains+Mono:wght@400;600 | Caveat:wght@600`
- 강조 primary: `#2e7d52`

### OX 퀴즈 페이지
- 배경: `background:#f5f4ee; background-image:repeating-linear-gradient(transparent,transparent 27px,#ddddd0 28px)` (노트북 줄)
- 헤더: `NO. XX —` 박스 배지 + `border-top:2px solid #1a1a1a` 실선
- 타이틀: **영어교육론 개념 마스터** / 손글씨: **Concept Master** (Caveat)

### 개념 정리 페이지
- 배경: `background:#f4f3ed; background-image:repeating-linear-gradient(transparent,transparent 27px,#d5d8cf 28px)` (노트북 줄)
- 헤더: `STUDY NOTE` 다크 스티커 (`background:#1a3326; color:#e8f5e9`)
- 타이틀 강조색: `#00695c` (틸) / 구분선: `border-top:2px dashed #888`
- 안내 팁: `header-tip` 클래스 (틸 배경 박스)

---

## 키워드 스타일 클래스

| 클래스 | 의미 | 스타일 |
|--------|------|--------|
| `.kw1` | ★ 기본개념 | `background:rgba(46,125,82,.15); color:#1b5e3a; border:1px solid rgba(46,125,82,.25)` |
| `.kw2` | 부키워드 | `color:#00796b; border-bottom:2px solid rgba(0,121,107,.45)` |
| `.kw3` | ★★ 빈출 | `background:rgba(230,119,0,.13); color:#bf6000; border:1px solid rgba(230,119,0,.3)` |
| `.kw4` | ★★★ 최빈출 | `background:rgba(183,28,28,.11); color:#b71c1c; border:1px solid rgba(183,28,28,.25)` |

kw1~kw4: 문제 본문 + 핵심정정 + 상세설명 + Source + 비교카드 전체 적용.

---

## OX 퀴즈 페이지 규칙

### 헤더 HTML
```html
<div class="header-topbar">
  <span class="header-no">NO. XX — 챕터명</span>
  <span class="header-label">Past-Exam Notebook</span>
</div>
<h1 class="header-title"><span class="title-hl">영어교육론</span> 개념 마스터</h1>
<div class="header-script">Concept Master</div>
<p class="header-sub">영어교육론 · 챕터명 · 임용고시 대비</p>
```

### 문항 데이터 구조 (Q 배열)
```js
{
  src: string,      // 출처/토픽
  cat: string,      // 카테고리
  text: string,     // 문항 영어 문장 (kw1~kw4 HTML 태그 포함)
  ans: boolean,     // 정답 (true=O, false=X)
  correct: string,  // 핵심 정정 (한국어, kw 태그 포함)
  why: string,      // 상세 해설 (한국어)
  source: string,   // 원문 인용 ("서브노트" 글자 없이 개념 원문만)
  compare: array    // 비교 정리 (선택)
}
```

### 해설 표시 순서
1. 핵심 정정 (`correct`)
2. 상세 설명 (`why`)
3. 📌 Source 원문 (`source`)
4. 📊 비교 정리 (`compare`) — 선택

### 문항 출제 원칙
- **영어 문장**으로 출제 (한국어 금지)
- 약어 사용 금지 → 풀네임 (예: Bottom-up Processing, Top-down Processing)

### localStorage 진행 저장
- `SAVE_KEY`: `ox_{챕터}_v1` (예: `ox_listen_v1`, `ox_sla_v1`, `ox_linguistic_v1`)
- `answers[]`: 문항별 `{picked: bool, correct: bool}` 저장
- 재방문 시 이어서 풀기 배너 표시
- "처음부터" 버튼(빨간): `freshStart()` → localStorage 초기화

### 문항 네비게이션 도트 (`#nav`)
- `.nd` 미풀이 / `.nd.ok` 정답 / `.nd.ng` 오답 / `.nd.cur` 현재
- `jumpTo(i)`: 푼 문항 클릭 시 복습 모드 표시

### 효과음 (sounds.js)
- `window.playOk()` / `window.playNg()` / `window.playResult(sc)` 전역 노출
- pick() 함수 안에서 직접 호출:
```js
const ok = val === q.ans;
answers[cur] = {picked: val, correct: ok};
if(ok){ if(typeof playOk==='function') playOk(); }
else  { if(typeof playNg==='function') playNg(); }
```
- ⚠️ 아이폰 무음 버튼(하드웨어) 켜져 있으면 소리 안 남 — 코드로 해결 불가

### 결과 팝업 (score-popup.js)
- 퀴즈 완료 시 `showScorePopup(s, TOTAL)` 호출 (render 함수 내 cur>=TOTAL 처리)
- 점수별 이모지·타이틀·컨페티 자동 적용
- localStorage에 최고 기록 저장 + 신기록 배지 표시
```js
document.getElementById('rs').textContent=`${TOTAL}문제 중 ${s}문제 정답 (${Math.round(p*100)}%)`;
setTimeout(function(){window.showScorePopup&&window.showScorePopup(s,TOTAL);},400);
```

### 스크립트 삽입 순서 (필수 — 퀴즈 메인 JS 바로 앞)
```html
<script src="./score-popup.js"></script>
<script src="./sounds.js"></script>
<script>
const SAVE_KEY='ox_XXX_v1';
...퀴즈 JS...
</script>
```
> ⚠️ score-popup.js + sounds.js 가 퀴즈 JS보다 **먼저** 로드되어야 함. `</body>` 앞 배치 금지.

---

## 개념 정리 페이지 규칙

### 헤더 HTML
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

### 필수 구성 요소
- **TOC** (`.toc`): 클릭 시 해당 섹션 이동
- **섹션 카드** (`.sec`): ▼ 클릭 접기·펼치기, 기본 첫 섹션 open
- **기출 포인트** (`.exam`): TOC 바로 아래 배치, 주황 배경
- **키워드 범례** (`.legend`): kw1~kw4 설명

### 섹션 토글 JS
```js
function toggle(id){ document.getElementById(id).classList.toggle('open'); }
function openSec(id){ const s=document.getElementById(id); s.classList.add('open'); s.scrollIntoView({behavior:'smooth',block:'start'}); }
```

### 콘텐츠 표현 패턴 (Ch.3 Learner Variables 적용 검증)

#### ① 헷갈 키텀 N대 비교 카드 (★★★ 함정 대비)
한 섹션에서 자주 혼동되는 키텀쌍을 `grid col2` 4셀로 정리. 14번 헷갈 키텀 md 기반.
```html
<div class="concept">
  <div class="c-title">🔑 헷갈리는 키텀 3대 비교 (★★★ 함정 단골)</div>
  <div class="grid col2">
    <div class="grid-item">
      <div class="gi-title">① <span class='kw4'>A</span> vs <span class='kw4'>B</span></div>
      <div class="gi-body"><span><strong>A</strong>: 정의 + 예시</span><span><strong>B</strong>: 정의 + 예시</span><span>🔍 구분 포인트</span></div>
    </div>
    <!-- ②, ③, ④ 반복 -->
  </div>
</div>
```
- Code-switching vs Foreignizing / Approximation vs Circumlocution 등
- `🔍` 이모지 + "구분 포인트" 문구로 핵심 차이 시각화

#### ② N대 전략 한눈 비교 카드
여러 전략/유형을 한 카드에서 비교. 4셀 그리드에서 **마지막 셀은 "구분 포인트"로 요약**.
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
- Metacognitive / Cognitive / Socioaffective 3분할에 적용 성공

#### ③ 용어 구분 카드 (Motivation vs Orientation 타입)
교재·기출에서 자주 혼용되는 상위·하위 용어 관계를 명시.
```html
<div class="concept">
  <div class="c-title">🔑 [용어A] vs [용어B] 용어 구분 (★★★ 헷갈 키텀)</div>
  <p class="note"><strong>저자 공식 구분</strong>: ...</p>
  <div class="grid col2">
    <div class="grid-item">
      <div class="gi-title"><span class='kw4'>용어A</span> (번역)</div>
      <div class="gi-body"><span>정의</span><span>하위: <span class='kw1'>X/Y</span></span></div>
    </div>
    <!-- 용어B -->
  </div>
  <p class="note">⚠️ 주의: "혼용 표현"도 통용되지만 엄밀히는 [정확 표현]이 정확.</p>
</div>
```

#### ④ Dual-Nature (양면성) 표현 패턴
High/Low, Strong/Weak 같은 연속체에서 각 극점의 **장점(✅) + 단점(❌)** 모두 제시.
```html
<div class="gi-body">
  <span>✅ <strong>장점</strong>: ...</span>
  <span>❌ <strong>단점</strong>: ...</span>
  <span><em>e.g. 예시</em></span>
</div>
```
- Ambiguity Tolerance, Risk-taking 등에 적용
- 하단에 `💡 Optimum level 필요` 문구로 균형 강조

#### ⑥ SVG 다이어그램 패턴

순서형 관계·이분 대조·3단계 발전을 시각화할 때 SVG를 사용한다. 항상 `width:100%`로 반응형 처리.

**컬러 팔레트 (SVG 전용)**

| 역할 | fill | stroke |
|------|------|--------|
| 일반 박스 (kw1) | `rgba(46,125,82,.1)` | `rgba(46,125,82,.4)` |
| 중간 단계 (kw2) | `rgba(0,121,107,.08)` | `rgba(0,121,107,.35)` |
| 최종 결과 (kw4) | `rgba(183,28,28,.08)` | `rgba(183,28,28,.35)` |
| 화살표 `→` / `⇄` | fill `#26a69a` | — |
| 등호 `=` | fill `#b71c1c` | — |

**패턴 A — 4단계 순서형 플로우 (X→Y→Z=결과)**

박스 3개 + 최종 결과 박스 1개. McLaughlin Automatization, Bialystok Proceduralization 등에 적용.
```html
<svg viewBox="0 0 700 90" style="width:100%;margin-top:12px;font-family:'JetBrains Mono',monospace" xmlns="http://www.w3.org/2000/svg">
  <!-- Box1 (일반) -->
  <rect x="4" y="10" width="148" height="70" rx="8" fill="rgba(46,125,82,.1)" stroke="rgba(46,125,82,.4)" stroke-width="1.5"/>
  <text x="78" y="38" text-anchor="middle" fill="#1b5e3a" font-size="12" font-weight="bold">단계A</text>
  <text x="78" y="55" text-anchor="middle" fill="#3a6b51" font-size="10">부제1</text>
  <text x="78" y="70" text-anchor="middle" fill="#3a6b51" font-size="10">부제2</text>
  <text x="163" y="52" text-anchor="middle" fill="#26a69a" font-size="20">→</text>
  <!-- Box2 (중간) -->
  <rect x="176" y="10" width="148" height="70" rx="8" fill="rgba(0,121,107,.08)" stroke="rgba(0,121,107,.35)" stroke-width="1.5"/>
  <text x="250" y="43" text-anchor="middle" fill="#00695c" font-size="12" font-weight="bold">중간단계</text>
  <text x="250" y="60" text-anchor="middle" fill="#00796b" font-size="10">설명</text>
  <text x="336" y="52" text-anchor="middle" fill="#26a69a" font-size="20">→</text>
  <!-- Box3 (일반) -->
  <rect x="348" y="10" width="148" height="70" rx="8" fill="rgba(46,125,82,.1)" stroke="rgba(46,125,82,.4)" stroke-width="1.5"/>
  <text x="422" y="38" text-anchor="middle" fill="#1b5e3a" font-size="12" font-weight="bold">단계B</text>
  <text x="422" y="55" text-anchor="middle" fill="#3a6b51" font-size="10">부제1</text>
  <text x="422" y="70" text-anchor="middle" fill="#3a6b51" font-size="10">부제2</text>
  <text x="508" y="52" text-anchor="middle" fill="#b71c1c" font-size="20">=</text>
  <!-- Box4 (결과·red) -->
  <rect x="519" y="10" width="177" height="70" rx="8" fill="rgba(183,28,28,.08)" stroke="rgba(183,28,28,.35)" stroke-width="1.5"/>
  <text x="607" y="43" text-anchor="middle" fill="#b71c1c" font-size="12" font-weight="bold">결과 용어</text>
  <text x="607" y="60" text-anchor="middle" fill="#b71c1c" font-size="10">부제</text>
</svg>
```

**패턴 B — 3단계 발전 플로우 (A→B→C)**

박스 3개. Regulation(Object→Other→Self), Error Correction 단계 등에 적용.
```html
<svg viewBox="0 0 700 100" style="width:100%;margin-top:12px;font-family:'JetBrains Mono',monospace" xmlns="http://www.w3.org/2000/svg">
  <!-- Box1 -->
  <rect x="4" y="10" width="208" height="80" rx="8" fill="rgba(46,125,82,.1)" stroke="rgba(46,125,82,.4)" stroke-width="1.5"/>
  <text x="108" y="38" text-anchor="middle" fill="#1b5e3a" font-size="12" font-weight="bold">단계1</text>
  <text x="108" y="56" text-anchor="middle" fill="#3a6b51" font-size="10">부제1</text>
  <text x="108" y="72" text-anchor="middle" fill="#3a6b51" font-size="10">부제2</text>
  <text x="222" y="55" text-anchor="middle" fill="#26a69a" font-size="22">→</text>
  <!-- Box2 -->
  <rect x="236" y="10" width="208" height="80" rx="8" fill="rgba(46,125,82,.1)" stroke="rgba(46,125,82,.4)" stroke-width="1.5"/>
  <text x="340" y="38" text-anchor="middle" fill="#1b5e3a" font-size="12" font-weight="bold">단계2</text>
  <text x="340" y="56" text-anchor="middle" fill="#3a6b51" font-size="10">부제1</text>
  <text x="340" y="72" text-anchor="middle" fill="#3a6b51" font-size="10">부제2</text>
  <text x="454" y="55" text-anchor="middle" fill="#26a69a" font-size="22">→</text>
  <!-- Box3 (최종·red) -->
  <rect x="466" y="10" width="230" height="80" rx="8" fill="rgba(183,28,28,.08)" stroke="rgba(183,28,28,.35)" stroke-width="1.5"/>
  <text x="581" y="38" text-anchor="middle" fill="#b71c1c" font-size="12" font-weight="bold">최종 단계</text>
  <text x="581" y="56" text-anchor="middle" fill="#b71c1c" font-size="10">부제1</text>
  <text x="581" y="72" text-anchor="middle" fill="#b71c1c" font-size="10">부제2</text>
</svg>
```

**패턴 C — 이분 대조 (A ⇄ B)**

박스 2개 + `⇄`. Bottom-up vs Top-down, Implicit vs Explicit 등에 적용. listen_study.html / linguistic_study.html 기준.
```html
<svg viewBox="0 0 680 120" style="width:100%;margin-top:16px;font-family:'JetBrains Mono',monospace" xmlns="http://www.w3.org/2000/svg">
  <rect x="10" y="20" width="280" height="80" rx="10" fill="rgba(46,125,82,.1)" stroke="rgba(46,125,82,.4)" stroke-width="1.5"/>
  <text x="150" y="52" text-anchor="middle" fill="#1b5e3a" font-size="13" font-weight="bold">개념A</text>
  <text x="150" y="70" text-anchor="middle" fill="#3a6b51" font-size="11">특징1</text>
  <text x="150" y="86" text-anchor="middle" fill="#3a6b51" font-size="11">특징2</text>
  <text x="340" y="66" text-anchor="middle" fill="#26a69a" font-size="28">⇄</text>
  <rect x="370" y="20" width="300" height="80" rx="10" fill="rgba(183,28,28,.07)" stroke="rgba(183,28,28,.25)" stroke-width="1.5"/>
  <text x="520" y="52" text-anchor="middle" fill="#b71c1c" font-size="13" font-weight="bold">개념B</text>
  <text x="520" y="70" text-anchor="middle" fill="#6b4400" font-size="11">특징1</text>
  <text x="520" y="86" text-anchor="middle" fill="#6b4400" font-size="11">특징2</text>
</svg>
```

> SVG 사용 기준: ① 2개 이상 단계의 **방향성 있는 흐름** ② **A vs B 이분 대조** (div grid로 불충분할 때) ③ **스펙트럼/연속체** 표현. 단순 목록은 기존 `.grid` + `.grid-item` 유지.

#### ⑤ 상단 기출분석 포인트 박스
TOC 바로 아래 `.exam`에 해당 챕터 핵심 기출 8~10개 bullet. kw3~kw4 키워드 기반.
```html
<div class="exam" style="margin-bottom:20px">
  <div class="exam-label">📝 기출분석 포인트 (Ch.N 챕터명)</div>
  <p>① <span class='kw4'>핵심개념1</span> — 출제 유형 + 예시</p>
  <!-- ② ~ ⑧ -->
</div>
```

---

## 참고 자료 (refs/ 폴더)

### 우선순위 1순위 — 항상 먼저 참조
| 파일 | 내용 |
|------|------|
| `subnote_all.md` | 서브노트 Ch.1~13 전체 (kimme) |
| `keywords.md` | 기출 키워드 정리 |
| `mapping.md` | 맵핑 빌드업 (루이스 기반) |

### 우선순위 2순위
| 파일 | 내용 |
|------|------|
| `루이스기출 5판.md` | 기출 목록·해설 (1.5MB) |
| `송은우 키텀 마스터 OCR2024.md` | 송은우 키텀 (398KB) |
| `밍우_영교론 영역별 기출분석본.md` | 기출분석본 (320KB) |
| `영교론 기출 키텀(루이스).md` | 루이스 기출 키텀 (26KB) |

### 우선순위 3순위 — 정T 시리즈
| 파일 | 내용 |
|------|------|
| `1. 정T_영교론 챕터별 단권화(한글 설명).md` | 단권화 |
| `2. 정T_영교론 챕터별 키텀 맵핑(한글 설명).md` | 키텀 맵핑 |
| `4. 정T_루이스 기출 Chap.1-10 키텀.md` | 루이스 키텀 |
| `5. 정T_TBP glossary 최종_1.md` | TBP 용어집 |
| `6. 정T_PLLT glossary 최종.md` | PLLT 용어집 |
| `14. 영교론 헷갈리는 키텀 비교 정리.md` | 헷갈리는 키텀 비교 |

### 우선순위 4순위 — 원서 전체
| 파일 | 내용 |
|------|------|
| `TEACHING by PRINCIPLES.md` | TBP 원서 (1.5MB) |
| `PLLT6th.md` | PLLT 6판 원서 (1MB) |
| `Build up 영교론 Ⅰ.md` | 빌드업 1권 (773KB) |
| `Build up 영교론 Ⅱ.md` | 빌드업 2권 (591KB) |
| `밍우 영교론 분석.md` | 밍우 분석 |

---

## 개발 규칙

- 백엔드 없음 — 순수 클라이언트사이드
- 새 챕터 추가 시: `listen.html` / `listen_study.html` 기준으로 복사·수정
- CSS 변수 사용 금지, 클래스 스타일로 처리
- 수정 항목: `SAVE_KEY`, `TOTAL`, 헤더 텍스트(NO. XX, 챕터명), `Q[]` 배열
- **sounds.js + score-popup.js 반드시 포함, 퀴즈 JS보다 먼저 로드**
- **⚠️ "루이스" 글자 사용 금지** — 소스 인용·해설 어디에도 "루이스" 단어 넣지 말 것. `5판`·`기출`·`해설` 등으로만 표기.
- **새 챕터 완료 시 `index.html`도 함께 업데이트** (완료 챕터 카드 추가 + 통계 숫자 갱신)

---

## 챕터 작업 완료 시 자동 처리 워크플로우 ✅

**챕터 1개 완료 = 반드시 아래 5단계 모두 자동 실행**

> ⚠️ **GitHub Pages 동시성 주의**: Pages workflow는 동시성 정책으로 새 실행이 들어오면 이전 실행을 취소시킴. 연속 커밋·푸시 시 **"Canceling since a higher priority waiting request" 에러로 아무것도 배포 안 됨**. 따라서:
> - **변경사항은 한 커밋으로 묶을 것** (커밋 여러 번 쪼개지 말 것)
> - main 머지·푸시 후 **Pages 배포 완료 전까지 추가 커밋 금지**
> - 빈 커밋으로 재빌드 트리거 금지 (이것도 취소 유발)
> - 배포 실패 시 GitHub Actions(https://github.com/Namkicheol/englisheducation/actions) 직접 확인

### 1단계: 코드 작업 (한 번에 모두 완료)
- `XXX.html` + `XXX_study.html` 작성
- `index.html` 업데이트 (완료 챕터 카드 추가, 통계 숫자 +1)
- 필요 시 CLAUDE.md 업데이트
- **작업 완료 전까지는 커밋하지 말 것** — 모든 변경 한 번에 묶기

### 2단계: 하나의 커밋으로 묶기
```bash
git add XXX.html XXX_study.html index.html [CLAUDE.md]
git commit -m "Add Ch.N [챕터명] + index 업데이트

- XXX.html: OX 퀴즈 20문항
- XXX_study.html: 개념정리 N섹션
- index.html: Ch.N 완료 카드 추가

Co-Authored-By: Claude Opus 4.7 <noreply@anthropic.com>"
```

### 3단계: 브랜치 푸시 + PR 머지 (GitHub MCP 방식)

> ⚠️ **웹 환경 주의**: 로컬에서 별도 작업 후 origin/main에 직접 푸시한 경우, 이 환경의 로컬 main이 origin/main과 diverge될 수 있음. 이 경우 **로컬 git merge 대신 GitHub MCP로 PR 머지**하고, 이후 로컬 main을 reset --hard.

**① feature 브랜치 푸시**
```bash
git push -u origin <current-branch>
```

**② PR을 draft → ready 전환 후 squash 머지 (GitHub MCP)**
```python
# draft 해제
mcp__github__update_pull_request(owner, repo, pullNumber, draft=False)
# squash 머지
mcp__github__merge_pull_request(owner, repo, pullNumber, merge_method="squash",
    commit_title="커밋 제목", commit_message="상세 내용")
```

**③ 로컬 main 동기화**
```bash
git fetch origin && git reset --hard origin/main
```

> 한 번의 흐름으로 처리 — 중간에 추가 커밋 삽입 금지.

### 4단계: Pages 배포 완료 대기 (폴링)
```bash
until [ "$(curl -s -o /dev/null -w '%{http_code}' https://namkicheol.github.io/englisheducation/XXX.html)" = "200" ]; do sleep 20; done
```
- 보통 1~5분 소요. 완료 확인 전까지 **다음 작업 금지**.
- 이 대기 중 추가 커밋하면 워크플로우 취소됨.

### 5단계: 블로그 자료 자동 제공
사용자가 별도 요청하지 않아도 아래 4가지를 함께 출력:
① 블로그 제목 2개 (퀴즈/개념정리)
② 태그
③ iframe 임베드 코드 2개 (퀴즈/개념정리)
④ Gemini 썸네일 명령어 2개 (퀴즈/개념정리)

---

## 블로그 자료 템플릿

### ① 블로그 제목 (2개)
```
중등 임용 영어 | Ch.N [영문 챕터명] OX 퀴즈 20문제 (기출 포함)
중등 임용 영어 | Ch.N [영문 챕터명] 핵심 개념정리 (서브노트 기반)
```

### ② 태그 (공통)
```
임용고시, 중등영어, 영어교육론, ChN, [챕터키워드1], [챕터키워드2], 
[핵심개념1], [핵심개념2], [핵심개념3], 서브노트, 기출분석
```

### ③ iframe 임베드
**퀴즈:**
```html
<iframe src="https://namkicheol.github.io/englisheducation/XXX.html" 
        width="100%" height="900" frameborder="0" 
        style="border:1px solid #ddd; border-radius:12px;"></iframe>
```
**개념정리:**
```html
<iframe src="https://namkicheol.github.io/englisheducation/XXX_study.html" 
        width="100%" height="900" frameborder="0" 
        style="border:1px solid #ddd; border-radius:12px;"></iframe>
```

### ④ Gemini 썸네일 생성 명령어

**퀴즈 썸네일 (1200x675, 16:9):**
```
Create a blog thumbnail image (1200x675, 16:9 ratio) for a Korean teacher qualification exam blog post.

Style:
- Clean flat design, minimal, Korean educational style
- Mint/soft green gradient background (#d4f1e4 → #a8e6cf)
- Large bold red X mark icon on the left side (circular badge style)
- Right side text layout:
  • Top small badge "Ch.N" (dark rounded pill)
  • Title: "[English Chapter Name]" (very large bold English, dark text)
  • Subtitle: "OX 퀴즈 20문제" (Korean, medium, dark green #1b5e3a)
  • Bottom keyword tags: "[keyword1] · [keyword2] · [keyword3] · [keyword4]" (small gray)
- No borders, lots of white space, professional typography
- Font: clean sans-serif (Noto Sans KR + Inter style)
```

**개념정리 썸네일 (1200x675, 16:9):**
```
Create a blog thumbnail image (1200x675, 16:9 ratio) for a Korean teacher qualification exam study notes blog post.

Style:
- Clean flat design, Korean educational style
- Light mint background (#eaf7f0) with subtle notebook line pattern
- Left side: stylized open notebook icon with keywords "[kw1]", "[kw2]", "[kw3]" floating as sticker labels around it (teal #00796b color)
- Right side text layout:
  • Top small badge "Ch.N" (dark rounded pill)
  • Title: "[English Chapter Name]" (very large bold English, dark text)
  • Subtitle: "핵심 개념정리" (Korean, teal #00695c, bold)
  • Bottom keyword tags: "[author1] · [author2] · [concept1] · [concept2]" (small gray)
- Clean professional look, Noto Sans KR + Inter style
```
