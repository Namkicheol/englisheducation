# 영어교육론 개념 마스터

임용고시 대비 영어교육론 OX 퀴즈 + 개념 정리 웹 애플리케이션. 순수 HTML/CSS/JS (백엔드 없음).

---

## 🚨 운영 원칙 (최우선)

- **Git 워크플로우(커밋·PR·머지·배포) 전부 Claude가 알아서 처리.** 사용자에게 묻거나 설명하지 않는다.
- **사용자에게 묻는 건 겁나 중요한 것만** — 콘텐츠 방향·삭제·되돌리기 불가한 결정 등. 기술적 세부사항은 묻지 않는다.

---

## 한글 용어 규칙 (필수)

`_study.html` 개념 본문 / OX 퀴즈 `why` / 카드 설명 등 **한글이 등장하는 모든 본문**에서 학술 키워드는 영어 원어로 통일한다(예: `의사소통 드릴` → `communicative drill`, `차별화 교수` → `differentiated instruction`). 한글 설명 블록 자체는 유지.

> 상세 매핑표·예시·위반 트리거는 **`docs/한글용어.md`** 참조. 정책 원본은 전역 `~/.claude/CLAUDE.md` "임용 관련 작업: 한국어 용어 규칙" 및 testmaster `docs/한글용어.md`.

---

## 🔗 testmaster 연동 — concept_link 자동 적용 (필수)

이 레포의 `_study.html` 챕터를 만들거나 변경하면, testmaster의 기출 데이터가 자동으로 그 챕터를 "💎 합격자 노트에서 더 자세히" 링크로 가리키도록 매핑표를 갱신해야 한다.

**이 레포명 (concept_anchors.json key): `englisheducation`**

### 새 챕터 만들 때 절차

1. `_study.html` 안 각 섹션에 `id="..."` anchor 부여 (의미 있는 영문 slug 권장: `situation-analysis`, `needs-analysis` 등)
2. testmaster의 `data/concept_anchors.json` 갱신 — 해당 챕터의 anchor·title·terms 추가:
   ```json
   "englisheducation": {
     "methodology_study.html": [
       { "anchor": "situation-analysis", "title": "Situation Analysis",
         "terms": ["Situation Analysis", "situational analysis", "needs assessment"] }
     ]
   }
   ```
3. testmaster에서 자동 적용 + 검증 실행:
   ```bash
   cd ~/Library/Mobile\ Documents/com~apple~CloudDocs/Developments/testmaster
   python3 scripts/wire_concept_links.py
   ```
4. 출력에서 `깨진링크: 0건` 확인. 깨졌으면 anchor 이름 수정.

### 트리거 (Claude 자동 실행)

다음 상황에서 별도 지시 없이 위 절차를 실행한다:
- 새 `_study.html` 챕터 생성/완성 직후
- 기존 `_study.html`에 섹션 추가/제거/anchor 변경 시
- 사용자가 "기출 연동", "concept_link", "testmaster 적용", "wire" 등 언급 시

### testmaster 위치 (2026-04 iCloud 이전 완료)

`~/Library/Mobile Documents/com~apple~CloudDocs/Developments/testmaster/`
규칙 원본: 위 디렉토리의 `CLAUDE.md` "concept_link 자동 적용" 섹션
GitHub: `https://github.com/Namkicheol/testmaster`

---

## 스킬 가이드

| 상황 | 호출할 스킬 |
|------|------------|
| 디자인 시스템, 색상, kw1~kw4 키워드 스타일 | `englisheducation-design` |
| OX 퀴즈 페이지 제작 (문항 구조·localStorage·효과음) | `englisheducation-quiz` |
| 개념 정리 페이지 제작 (TOC·섹션·SVG 다이어그램) | `englisheducation-study` |
| 챕터 완료 후 커밋·배포·블로그 자료 | `englisheducation-deploy` |
| 이미지 생성 (Gemini) | Gemini 채팅창에서 이미지 프롬프트 직접 입력 |

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

## 🚨 기출 추정 절대 금지 (전 콘텐츠 공통)

블로그·사이트 콘텐츠·해설·OX 어디든 임용 **기출 관련 정보(연도·출제 의도·답안 패턴 등) 추정 금지**. 검증된 refs에서만 인용한다.

**검증 절차** (영교론):
1. **1차**: `refs/keywords.md` — 연도-토픽 매핑 (`(YYYY.X.N)` 형식)
2. **2차**: `refs/밍우_영교론 영역별 기출분석본.md` — 분류별 연도 목록
3. **3차**: `refs/루이스기출 5판.md` — 표·해설로 교차 검증
4. **2022년 이후**: 루이스 5판 범위 밖 → testmaster의 `refs/2025 전공 기출 김재균해설.md`, `refs/2026 기출 권두걸팀 해설서.md` 등 타겟 검색

**원칙**:
- **연도·기출 정보 표기는 OPTIONAL** — 블로그 작성 시 검증 부담스러우면 본문에 박지 않아도 됨. 개념 위주로 작성해도 무방
- **박는 경우에만** refs 검증 필수. 검증 매칭 0건이면 표기 **생략**. "그럴법한" 추정값 박지 말 것
- 추정 = 수험생에게 잘못된 정보 제공 = **치명적 오류**

---

## 블로그 글 작성

전역 블로그 지침 `~/Library/Mobile Documents/com~apple~CloudDocs/Developments/blog writings/blog write.md` 의 **"임용고시 (영어학·영교론)"** 섹션과 그 하위 **"📚 임용 블로그 글쓰기 규칙"** 을 따른다.

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
- **신규 글 썸네일은 Gemini로 생성** — Gemini 채팅창에서 이미지 프롬프트 직접 입력. 기존 글은 그대로 유지
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
