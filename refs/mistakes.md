# 실수 기록 & 수정 방법

새 챕터 작업 시 반복하지 않기 위한 기록.

---

## 2026-04-30 · speaking_study.html 모바일 우측 짤림

### 문제 1 — SVG 다이어그램이 stage-wrap 없이 직접 배치됨

**증상**: 모바일에서 Rehearsal⇄Impromptu, 4/3/2 Technique 비교 다이어그램 우측이 잘림.

**원인**: SVG를 `<div class="stage-wrap">` 없이 sec-body 직하에 바로 삽입. `@media(max-width:640px)`에서 `svg{min-width:480px}`가 적용되므로 스크롤 컨테이너가 없으면 화면 밖으로 삐져나감.

**수정**:
```html
<!-- 잘못된 방식 -->
<svg viewBox="0 0 680 120" style="width:100%">...</svg>

<!-- 올바른 방식 -->
<div class="stage-wrap">
  <svg viewBox="0 0 680 120" style="width:100%">...</svg>
</div>
```

**규칙**: **모든 SVG 다이어그램은 반드시 `<div class="stage-wrap">`으로 감쌀 것.**

---

### 문제 2 — 긴 sec-title이 모바일에서 우측으로 밀려 잘림

**증상**: "⑨ Pronunciation 기법 (Segmental·Suprasegmental·Fluency)" 제목이 `.sec-header` flex 컨테이너 밖으로 overflow되어 잘림.

**원인**: `.sec-header`가 `display:flex`인데 `.sec-title`에 `min-width:0`이나 `overflow-wrap`이 없어서, flex item이 내용 너비 이하로 줄어들지 않음.

**수정**: `@media(max-width:640px)`에 아래 추가:
```css
.sec-title { min-width: 0; overflow-wrap: anywhere; }
```

**규칙**: 섹션 제목이 길 경우(괄호 포함 30자 이상 목표) 위 CSS가 미디어 쿼리에 있는지 확인할 것. 현재 모든 `_study.html`에 이미 포함됨(2026-04-30 적용).

---

## 2026-05-01 · kw 태그 하이픈 줄바꿈 + 테이블 글자 너무 작음 (전체 _study.html)

### 문제 3 — kw1~kw4 태그 안 하이픈에서 줄바꿈 발생

**증상**: `Self-revelation`, `top-down` 등 하이픈 포함 키워드가 모바일에서 "Self-" / "revelation" 두 줄로 쪼개짐.

**원인**: `.kw1~.kw4` 클래스에 `white-space:nowrap` 없음.

**수정**: 각 kw 클래스에 `white-space:nowrap` 추가:
```css
.kw1 { ...; white-space:nowrap }
.kw2 { ...; white-space:nowrap }
.kw3 { ...; white-space:nowrap }
.kw4 { ...; white-space:nowrap }
```

**규칙**: **새 챕터 템플릿에 kw1~kw4 정의 시 반드시 `white-space:nowrap` 포함.** 현재 전체 적용 완료(2026-05-01).

---

### 문제 4 — 모바일 표 글자 너무 작음

**증상**: 모바일에서 `th/td` 13px으로 수정했는데도 여전히 작게 보임.

**수정**: `@media(max-width:640px)` 안 테이블 사이즈를 13px → 14px로 상향:
```css
th { font-size: 14px; padding: 8px 10px }
td { font-size: 14px; padding: 8px 10px }
table { font-size: 14px }
```

**규칙**: 모바일 표 글자는 최소 14px. 현재 전체 적용 완료(2026-05-01).

---

## 2026-05-01 · kw vs kw 레이아웃 패턴 (판단 가능 항목)

### 문제 5 — `kw vs kw` 패턴이 모바일에서 어색하게 줄바꿈

**증상**: `<p class="note"><span class='kw4'>A (long)</span> vs <span class='kw4'>B (long)</span></p>` 형태에서 "B"의 첫 단어만 줄바꿈돼 "A vs B / (long)" 같이 어색하게 표시됨.

**판단 기준**: kw 태그 2개가 `vs` / `⇄` / `↔`로 이어지고 합산 길이가 20자 이상이면 레이아웃 분리 필요.

**수정 A — 짧은 vs 비교** (flex wrap):
```html
<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding-left:6px;margin-bottom:8px">
  <span class='kw4'>A</span>
  <span style="color:#888;font-weight:700;font-family:'JetBrains Mono',monospace;font-size:12px">vs</span>
  <span class='kw4'>B</span>
</div>
```

**수정 B — kw 태그 안에 여러 단어 목록** (`Bottom-up · segmental · minimal pair · accuracy` 같은 경우):
```html
<!-- kw 태그는 단일 핵심어만. 나머지는 태그 밖으로 -->
<div class="grid col2" style="margin-top:6px">
  <div class="grid-item"><span class='kw4'>Bottom-up</span> · segmental · minimal pair · accuracy</div>
  <div class="grid-item"><span class='kw4'>Top-down</span> · suprasegmental · backward buildup · fluency</div>
</div>
```

**규칙**:
- kw 태그는 **단일 핵심 용어 하나**만. 목록(·로 구분)은 태그 밖으로.
- `kw vs kw` 패턴이 보이면 flex 또는 grid로 자동 판단해서 처리.

---

## 체크리스트 — 새 `_study.html` 챕터 완성 전 확인

- [ ] 모든 `<svg>` → `<div class="stage-wrap">` 안에 있는가
- [ ] 모든 `<table>` → `<div class="stage-wrap">` 안에 있는가
- [ ] `.kw1~.kw4` 정의에 `white-space:nowrap` 있는가
- [ ] `@media(max-width:640px)` 안에 `.sec-title{min-width:0;overflow-wrap:anywhere}` 있는가
- [ ] `@media(max-width:640px)` 안 `th/td/table` → 14px 이상인가
- [ ] `kw vs kw` / `kw ⇄ kw` 패턴 → flex 또는 grid로 처리했는가
- [ ] kw 태그 안에 `·`로 이어진 목록 없는가 (핵심어 하나만 넣을 것)
- [ ] 섹션 제목이 특히 긴 경우(30자+) 모바일에서 잘리지 않는지 확인
## 체크리스트 — 새 `_study.html` 챕터 완성 전 확인

- [ ] 모든 `<svg>` → `<div class="stage-wrap">` 안에 있는가
- [ ] `@media(max-width:640px)` 안에 `.sec-title{min-width:0;overflow-wrap:anywhere}` 있는가
- [ ] 섹션 제목 길이가 화면에서 문제 없는지 확인
- [ ] 표(`<table>`)는 `<div class="stage-wrap">` 안에 있는가
