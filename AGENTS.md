# englisheducation - Codex 작업 환경

이 레포는 임용고시 영어교육론 OX 퀴즈 + 개념정리 정적 웹앱이다. Codex는 이 `AGENTS.md`를 1차 작업 지침으로 삼는다. `CLAUDE.md`는 기존 레거시 규칙을 확인할 때만 보조로 참고한다.

## 기본 작업 순서

1. 작업 전 `git status --short`로 dirty/untracked 범위를 확인한다.
2. 사용자가 챕터 제작을 명시하면 아래 작업지시서를 따른다.

```text
.claude/worktrees/laughing-sutherland-0a1f66/docs/codex_workorder.md
```

3. 기존 챕터의 HTML 구조, OX 데이터 형식, study page 섹션 구조를 먼저 맞춘다.
4. 작업 후 변경 파일만 선별해 검증, commit, push한다. 관련 없는 dirty/untracked 파일은 건드리지 않는다.

## 한국어 용어 규칙

- 한글 설명 자체는 유지한다. 수험생을 위한 풀이, 맥락 설명, 답안 팁을 통째로 영어화하지 않는다.
- 학술 키워드와 개념 용어는 영어 원어가 기본이다.
- 한글 개념어는 합격자 노트, 강사 교재 refs MD, 기출 원문, 또는 `docs/한글용어.md`에 한글로 등장한 경우에만 사용한다.
- refs에 없는 한국어 번역 조어를 만들지 않는다. 예: `정보 간격`, `구인 타당도`, `차별화 교수`, `인지 부하` 등은 `docs/한글용어.md` 기준으로 영어 원어를 쓴다.
- 같은 개념을 한 파일 안에서 한국어/영어로 혼용하지 않는다.
- 작업 완료 전 최소한 아래를 검색한다.

```bash
rg -n "루이스|관상음|전방음|활음|정보 간격|정보 격차|구인 타당도|차별화 교수|인지 부하|진정성 있는 자료|형태 초점 교수" .
```

## 챕터 제작 규칙

- 퀴즈 파일은 기존 `grammar.html` 계열 구조를 따른다.
- study 파일은 기존 `grammar_study.html` 계열 구조를 따른다.
- `sounds.js`와 `score-popup.js` 로드 순서, `TOTAL` 값, `ans` 개수, `openSec()` 대상 ID를 확인한다.
- 문제 수는 챕터 특성에 따라 늘릴 수 있지만, `TOTAL`과 실제 문항 수를 반드시 일치시킨다.
- 기출 연도, 출제 의도, refs 근거는 추정하지 않는다. refs 매칭이 없으면 표기를 생략한다.

## Git 원칙

- `main` 직접 push 금지. 작업 브랜치에서 commit/push하고 PR을 사용한다.
- iCloud-backed repo라 unrelated dirty/untracked 파일이 많을 수 있다. 이번 작업 범위 파일만 stage한다.
- 사용자 변경분은 되돌리지 않는다.
- testmaster 매핑을 갱신할 때도 해당 요청 범위 파일만 선별해서 commit한다.
