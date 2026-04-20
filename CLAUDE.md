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
| `sounds.js` | 정답/오답 효과음 (Web Audio API) | ✅ 공용 |
| `score-popup.js` | 결과 팝업 + 컨페티 + 최고기록 | ✅ 공용 |
| `refs/` | 키워드·매핑·서브노트·기출 참고 자료 | - |

### 제작 예정 파일명 규칙 (챕터당 2개)
| 챕터 | 퀴즈 | 개념정리 |
|------|------|---------|
| Ch.3 Learner Variables | `learner.html` | `learner_study.html` |
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

---

## 참고 자료 (refs/ 폴더)

| 파일 | 우선순위 | 내용 |
|------|---------|------|
| `subnote_all.md` | ★★★ 1순위 | 서브노트 Ch.1~13 전체 |
| `keywords.md` | ★★★ 1순위 | 기출 키워드 정리 |
| `mapping.md` | ★★★ 1순위 | 맵핑 빌드업 |
| `루이스기출_5판.md` | ★★ 2순위 | 기출 목록·해설 |

---

## 개발 규칙

- 백엔드 없음 — 순수 클라이언트사이드
- 새 챕터 추가 시: `listen.html` / `listen_study.html` 기준으로 복사·수정
- CSS 변수 사용 금지, 클래스 스타일로 처리
- 수정 항목: `SAVE_KEY`, `TOTAL`, 헤더 텍스트(NO. XX, 챕터명), `Q[]` 배열
- **sounds.js + score-popup.js 반드시 포함, 퀴즈 JS보다 먼저 로드**
