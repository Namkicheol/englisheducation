---
name: englisheducation-quiz
description: englisheducation OX 퀴즈 페이지 제작 규칙. 헤더 HTML, 문항 데이터 구조(Q 배열), 해설 표시 순서, 문항 출제 원칙, localStorage 진행 저장, 네비게이션 도트, 효과음(sounds.js), 결과 팝업(score-popup.js), 스크립트 삽입 순서. 퀴즈 페이지 만들 때 호출.
---

# OX 퀴즈 페이지 규칙

## 헤더 HTML

```html
<div class="header-topbar">
  <span class="header-no">NO. XX — 챕터명</span>
  <span class="header-label">Past-Exam Notebook</span>
</div>
<h1 class="header-title"><span class="title-hl">영어교육론</span> 개념 마스터</h1>
<div class="header-script">Concept Master</div>
<p class="header-sub">영어교육론 · 챕터명 · 임용고시 대비</p>
```

## 문항 데이터 구조 (Q 배열)

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

## 해설 표시 순서

1. 핵심 정정 (`correct`)
2. 상세 설명 (`why`)
3. 📌 Source 원문 (`source`)
4. 📊 비교 정리 (`compare`) — 선택

## 문항 출제 원칙

- **영어 문장**으로 출제 (한국어 금지)
- 약어 사용 금지 → 풀네임 (예: Bottom-up Processing, Top-down Processing)

## localStorage 진행 저장

- `SAVE_KEY`: `ox_{챕터}_v1` (예: `ox_listen_v1`, `ox_sla_v1`)
- `answers[]`: 문항별 `{picked: bool, correct: bool}` 저장
- 재방문 시 이어서 풀기 배너 표시
- "처음부터" 버튼(빨간): `freshStart()` → localStorage 초기화

## 문항 네비게이션 도트 (`#nav`)

- `.nd` 미풀이 / `.nd.ok` 정답 / `.nd.ng` 오답 / `.nd.cur` 현재
- `jumpTo(i)`: 푼 문항 클릭 시 복습 모드 표시

## 효과음 (sounds.js)

- `window.playOk()` / `window.playNg()` / `window.playResult(sc)` 전역 노출
- pick() 함수 안에서 직접 호출:

```js
const ok = val === q.ans;
answers[cur] = {picked: val, correct: ok};
if(ok){ if(typeof playOk==='function') playOk(); }
else  { if(typeof playNg==='function') playNg(); }
```

- ⚠️ 아이폰 무음 버튼(하드웨어) 켜져 있으면 소리 안 남 — 코드로 해결 불가

## 결과 팝업 (score-popup.js)

- 퀴즈 완료 시 `showScorePopup(s, TOTAL)` 호출 (render 함수 내 cur>=TOTAL 처리)
- 점수별 이모지·타이틀·컨페티 자동 적용
- localStorage에 최고 기록 저장 + 신기록 배지 표시

```js
document.getElementById('rs').textContent=`${TOTAL}문제 중 ${s}문제 정답 (${Math.round(p*100)}%)`;
setTimeout(function(){window.showScorePopup&&window.showScorePopup(s,TOTAL);},400);
```

## 스크립트 삽입 순서 (필수)

```html
<script src="./score-popup.js"></script>
<script src="./sounds.js"></script>
<script>
const SAVE_KEY='ox_XXX_v1';
...퀴즈 JS...
</script>
```

> ⚠️ score-popup.js + sounds.js 가 퀴즈 JS보다 **먼저** 로드되어야 함. `</body>` 앞 배치 금지.
