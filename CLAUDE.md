# 영어교육론 개념 마스터

임용고시 대비 영어교육론 OX 퀴즈 + 개념 정리 웹 애플리케이션. 순수 HTML/CSS/JS (백엔드 없음).

## 파일 구조

| 파일 | 역할 | 상태 |
|------|------|------|
| `listen.html` | Ch.7 Teaching Listening OX 퀴즈 | ✅ 완료 (구버전 스타일) |
| `listen_study.html` | Ch.7 Teaching Listening 개념 정리 | ✅ 완료 (구버전 스타일) |
| `linguistic.html` | Ch.2 Linguistic Aspects OX 퀴즈 | ✅ 완료 (구버전 스타일) |
| `linguistic_study.html` | Ch.2 Linguistic Aspects 개념 정리 | ✅ 완료 (구버전 스타일) |
| `sla.html` | Ch.1 SLA Theory OX 퀴즈 | ✅ 완료 (구버전 스타일) |
| `sla_study.html` | Ch.1 SLA Theory 개념 정리 | ✅ 완료 (구버전 스타일) |
| `reading.html` | Ch.6 Teaching Reading OX 퀴즈 | ✅ 완료 (신버전 스타일) |
| `reading_study.html` | Ch.6 Teaching Reading 개념 정리 | ✅ 완료 (신버전 스타일) |
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

## 디자인 시스템

> ⚠️ **신버전(reading.html 이후)** 기준. 구버전(listen·sla·linguistic) 수정 시 신버전으로 통일할 것.

### 공통
- 폰트: `Noto Sans KR` (본문), `Segoe UI` (fallback)
- `<html style="background:#f0faf4;color:#1a3326;">` — CSS 변수 사용 금지
- 초록·민트 테마: bg `#f0faf4` / primary `#2e7d52` / secondary `#26a69a`

### 키워드 스타일 클래스
| 클래스 | 의미 | 스타일 |
|--------|------|--------|
| `.kw1` | ★ 기본개념 | `background:rgba(46,125,82,.15); color:#1b5e3a; border-radius:3px; padding:1px 5px; font-weight:700` |
| `.kw2` | 부키워드 | `color:#00796b; border-bottom:2px solid #00796b; font-weight:500` |
| `.kw3` | ★★ 빈출 | `background:rgba(230,119,0,.13); color:#bf6000; border-radius:3px; padding:1px 5px; font-weight:700` |
| `.kw4` | ★★★ 최빈출 | `background:rgba(183,28,28,.11); color:#b71c1c; border-radius:3px; padding:1px 5px; font-weight:700` |

kw1~kw4는 문제 본문 + 핵심정정 + 상세설명 + Source + 비교카드 전체에 적용.

---

## OX 퀴즈 페이지 규칙

### 문항 출제 원칙
- **영어 문장**으로 출제 (한국어 금지)
- 기출 연도 태그 표시
- 약어 사용 금지 → 풀네임 표기 (예: B-U → Bottom-up)

### 해설 표시 순서
1. 🔧 **핵심 정정** — 틀린 이유 한 줄 요약
2. 📖 **상세 설명** — 한국어 상세 해설
3. 📌 **Source** — 개념 원문만 표기 ("서브노트" 글자 없이)
4. 📊 **비교 정리** — 헷갈리는 개념 비교 카드 (선택)

### 문항 데이터 구조 (Q 배열)
```js
{
  src: string,      // 기출 출처 (예: "기출 2009모의.23")
  cat: string,      // 카테고리 (예: "Bottom-up / Top-down")
  text: string,     // 문항 영어 문장 (HTML 포함 가능)
  ans: boolean,     // 정답 (true=O, false=X)
  correct: string,  // 핵심 정정
  why: string,      // 상세 설명 (한국어)
  source: string,   // 원문 인용
  compare: array    // 비교 정리 [{head, body}] (선택)
}
```

### 점수 저장
- localStorage 사용 가능 (SAVE_KEY: `ox_{챕터명}_v1`)
- 재방문 시 이어서 풀기 배너 표시 옵션

---

## 개념 정리 페이지 규칙

- **빨간 안내문** 맨 위 고정
- **TOC** 클릭 시 해당 섹션으로 이동
- **▼ 클릭** 접기·펼치기 (아코디언)
- **기출 분석 포인트** 박스는 TOC 바로 아래 위치
- **키워드 범례** (kw1~kw4) 상단 표시

---

## 참고 자료 (refs/ 폴더)

| 파일 | 우선순위 | 내용 |
|------|---------|------|
| `subnote_all.md` | ★★★ 1순위 | 서브노트 Ch.1~13 전체 |
| `keywords.md` | ★★★ 1순위 | 기출 키워드 정리 |
| `mapping.md` | ★★★ 1순위 | 맵핑 빌드업 |
| `루이스기출 5판.md` | ★★ 2순위 | 기출 목록·해설 |

> 프로젝트 지식에도 동일 파일 + 추가 파일 존재:
> - 2순위: `송은우_키텀_마스터_OCR2024.md` / `영교론_맵핑_new빌드업_루이스_기반_루이스_합_자료.pdf`
> - 3순위: `1__정T_단권화.md` / `2__정T_키텀맵핑.md` / `4__정T_루이스키텀.md` / `5__정T_TBP_glossary.md` / `6__정T_PLLT_glossary.md`
> - 4순위: docx 원문 (Ch별, 직접 접근 불필요)

---

## 개발 규칙

- 백엔드 없음 — 순수 클라이언트사이드
- 새 챕터 추가 시: 신버전 스타일(`reading.html`) 기준으로 복사·수정
- 구버전 파일(listen·sla·linguistic) 수정 필요 시 신버전 스타일로 통일
- CSS 변수 사용 금지, 인라인 또는 클래스 스타일로 처리
