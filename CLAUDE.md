# 영어교육론 개념 마스터

임용고시 대비 영어교육론 OX 퀴즈 + 개념 정리 웹 애플리케이션. 순수 HTML/CSS/JS (백엔드 없음).

---

## 스킬 가이드

| 상황 | 호출할 스킬 |
|------|------------|
| 디자인 시스템, 색상, kw1~kw4 키워드 스타일 | `englisheducation-design` |
| OX 퀴즈 페이지 제작 (문항 구조·localStorage·효과음) | `englisheducation-quiz` |
| 개념 정리 페이지 제작 (TOC·섹션·SVG 다이어그램) | `englisheducation-study` |
| 챕터 완료 후 커밋·배포·블로그 자료 | `englisheducation-deploy` |
| 이미지 생성 (Pencil MCP) | `blog-image-pencil` |

---

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

---

## 개발 핵심 규칙

- 백엔드 없음 — 순수 클라이언트사이드
- 새 챕터 추가 시: `listen.html` / `listen_study.html` 기준으로 복사·수정
- CSS 변수 사용 금지, 클래스 스타일로 처리
- 수정 항목: `SAVE_KEY`, `TOTAL`, 헤더 텍스트(NO. XX, 챕터명), `Q[]` 배열
- **sounds.js + score-popup.js 반드시 포함, 퀴즈 JS보다 먼저 로드**
- **⚠️ "루이스" 글자 사용 금지** — `5판`·`기출`·`해설` 등으로만 표기
- **새 챕터 완료 시 `index.html`도 함께 업데이트**
