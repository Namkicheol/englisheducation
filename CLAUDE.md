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

---

## 블로그 글 작성

전역 블로그 지침 `~/Library/CloudStorage/OneDrive-학장중학교/blog write.md` 의 **"임용고시 (영어학·영교론)"** 섹션과 그 하위 **"📚 임용 블로그 글쓰기 규칙"** 을 따른다.

본 레포 유형: **A형 (서브노트형)** — 블로그 작성 대상.

핵심:
- 블로그 글은 `.md` 파일로 작성
- **본문 = 서브노트 핵심 + 4섹션 보강** (① 개념 정의 [필수] + ②③④ 중 최소 2개)
  - ② 기출 맥락 / ③ 키텀 비교 / ④ 수험 활용 팁
  - **합격자 노트(`refs/`)에 팁 있으면 ④ 무조건 포함**
- **한글 설명 시 용어는 영어 원문 그대로** (예: `Input Hypothesis`를 "입력 가설"로 번역 X). 학자명·이론명·기술 용어는 모두 영어 유지
- **본문에 출처 인용 표기 불필요** (`— PLLT 6th, Ch.10` 같은 표기 X)
- **키워드 하이라이트 필수** (5색): 이론명·가설명·기술 용어 → 파랑 `#3182ce` / 학자명 → 보라 `#805ad5` / 함정·주의 → 빨강 `#c53030` / 장점·긍정 → 청록 `#319795` / 현직쌤 팁 → 주황 `#dd6b20`
- **기출 연도 빨간색 인라인** (`#c53030`)
- 핵심 개념은 **영어 원문 한 문단 + 한글 설명 한 문단** 교차 (개념정리 페이지 수록 개념 + 알파)
- **신규 글 썸네일은 Pencil MCP** (`blog-image-pencil` 스킬)로 생성. 기존 글은 그대로 유지
- **SVG 사용 금지** (블로그 한정. 웹앱 페이지의 SVG 다이어그램은 별개)

### 영교론 블로그 고유 규칙

**사이트 구조 → 블로그 매핑**
- 사이트는 챕터당 2개: `*_study.html` (개념정리) + `*.html` (OX 20문항)
- **블로그 글 단위: 챕터당 1편 통합** (4섹션 본문 + iframe 임베드)

**iframe / 링크 배치 — iframe 미사용 원칙**
- ❌ **개념정리(`*_study.html`) iframe 임베드 금지** — 4섹션 본문에 이미 개념을 풀어 썼으므로 iframe은 중복
- ❌ **OX(`*.html`) iframe 임베드 금지** — 이미 별도 obangti.tistory.com 글로 발행됨
- ✅ **본문 끝에 OX 링크 버튼**만 추가 — `obangti.tistory.com/<post-id>` 형식 (예: `obangti.tistory.com/37`)
- 링크 버튼 템플릿:
  ```html
  <p align="center">
  <a href="https://obangti.tistory.com/<post-id>" target="_blank" style="display:inline-block;padding:14px 28px;background:#3182ce;color:#fff;text-decoration:none;border-radius:8px;font-weight:bold;font-size:15px;">📝 [챕터명] OX 20문항 풀러 가기 →</a>
  </p>
  ```

**📝 OX 블로그 글 구조** (별도 발행 — 해설 중심 3섹션)
- ① 짧은 도입 (1-2줄)
- ② 본문 = **20문항 × 자세한 해설** (90%): 문항/답(✅❌)/영어 원문 인용 1-2문장/한글 풀이/⚠️ 함정/빨간 연도/5색 하이라이트
- ③ 개념정리 글로 돌아가기 링크 버튼 (사이클 형성)
- 분량: 5,000~10,000자 (문항당 250-500자)
- 자세한 규칙은 `blog write.md` "📝 OX·실전·응용 블로그 글 구조" 참조

**4섹션 보강 포인트 (영교론 특화)**
- ② **기출 맥락**: 영교론 기출 답안 형식 분석에 강함. `refs/밍우_영교론 영역별 기출분석본.md` + `refs/keywords.md` 우선 활용
- ③ **키텀 비교**: `refs/14. 영교론 헷갈리는 키텀 비교 정리.md` 적극 사용 (Krashen vs Long, top-down vs bottom-up, accuracy vs fluency 등)
- ④ **수험 팁 필수 포함**: 영교론 기출은 답안 작성 패턴(`X does/shows Y in that ...` 등)이 정해져 있음. 합격자 노트의 영교론 답안 팁이 풍부하므로 **무조건 ④ 포함**
