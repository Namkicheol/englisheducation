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

## 체크리스트 — 새 `_study.html` 챕터 완성 전 확인

- [ ] 모든 `<svg>` → `<div class="stage-wrap">` 안에 있는가
- [ ] `@media(max-width:640px)` 안에 `.sec-title{min-width:0;overflow-wrap:anywhere}` 있는가
- [ ] 섹션 제목 길이가 화면에서 문제 없는지 확인
- [ ] 표(`<table>`)는 `<div class="stage-wrap">` 안에 있는가
