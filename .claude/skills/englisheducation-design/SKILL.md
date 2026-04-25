---
name: englisheducation-design
description: englisheducation 디자인 시스템. 폰트(Noto Sans KR·JetBrains Mono·Caveat), OX 퀴즈 페이지 배경·헤더, 개념정리 페이지 배경·헤더, kw1~kw4 키워드 스타일 클래스. UI 작업·새 챕터 디자인 적용 시 호출.
---

# 디자인 시스템

## 공통

- 폰트 3종: `Noto Sans KR` + `JetBrains Mono` + `Caveat` (손글씨)
- Google Fonts: `Noto+Sans+KR:wght@400;500;700;900 | JetBrains+Mono:wght@400;600 | Caveat:wght@600`
- 강조 primary: `#2e7d52`

## OX 퀴즈 페이지

- 배경: `background:#f5f4ee; background-image:repeating-linear-gradient(transparent,transparent 27px,#ddddd0 28px)` (노트북 줄)
- 헤더: `NO. XX —` 박스 배지 + `border-top:2px solid #1a1a1a` 실선
- 타이틀: **영어교육론 개념 마스터** / 손글씨: **Concept Master** (Caveat)

## 개념 정리 페이지

- 배경: `background:#f4f3ed; background-image:repeating-linear-gradient(transparent,transparent 27px,#d5d8cf 28px)` (노트북 줄)
- 헤더: `STUDY NOTE` 다크 스티커 (`background:#1a3326; color:#e8f5e9`)
- 타이틀 강조색: `#00695c` (틸) / 구분선: `border-top:2px dashed #888`
- 안내 팁: `header-tip` 클래스 (틸 배경 박스)

---

# 키워드 스타일 클래스 (kw1~kw4)

| 클래스 | 의미 | 스타일 |
|--------|------|--------|
| `.kw1` | ★ 기본개념 | `background:rgba(46,125,82,.15); color:#1b5e3a; border:1px solid rgba(46,125,82,.25)` |
| `.kw2` | 부키워드 | `color:#00796b; border-bottom:2px solid rgba(0,121,107,.45)` |
| `.kw3` | ★★ 빈출 | `background:rgba(230,119,0,.13); color:#bf6000; border:1px solid rgba(230,119,0,.3)` |
| `.kw4` | ★★★ 최빈출 | `background:rgba(183,28,28,.11); color:#b71c1c; border:1px solid rgba(183,28,28,.25)` |

kw1~kw4: 문제 본문 + 핵심정정 + 상세설명 + Source + 비교카드 전체 적용.
