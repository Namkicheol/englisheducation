# 영어교육론 개념 마스터

임용고시 대비 영어교육론 OX 퀴즈 + 개념 정리 웹 애플리케이션. 순수 HTML/CSS/JS (백엔드 없음).

## 파일 구조

| 파일 | 역할 |
|------|------|
| `listen.html` | Ch.7 Teaching Listening OX 퀴즈 (26문항) |
| `sla.html` | Ch.1 SLA Theory OX 퀴즈 (20문항) |
| `listen_study.html` | Ch.7 Teaching Listening 개념 정리 노트 |
| `sla_study.html` | Ch.1 SLA Theory 개념 정리 노트 |
| `refs/` | 키워드·매핑·서브노트 참고 자료 |

## 디자인 시스템

### 공통
- 폰트: `Noto Sans KR` + `JetBrains Mono` + `Caveat`(손글씨)
- 노트북 줄 배경: `repeating-linear-gradient`

### OX 퀴즈 페이지 (listen.html, sla.html)
- 배경: `#f5f4ee` / 줄 색: `#ddddd0`
- 헤더: `NO.XX —` 박스 배지 + 실선 상단 보더
- 강조색: 초록 `#2e7d52`
- 타이틀: `영어교육론 개념 마스터`

### 개념 정리 페이지 (listen_study.html, sla_study.html)
- 배경: `#f4f3ed` / 줄 색: `#d5d8cf`
- 헤더: `STUDY NOTE` 다크 스티커 + 대시 구분선
- 강조색: 틸 `#00695c`
- 타이틀: `개념 정리 노트`

## OX 퀴즈 주요 기능

### localStorage 진행 저장
- `SAVE_KEY`: `ox_listen_v1` / `ox_sla_v1`
- `answers[]`: 문항별 `{picked: bool, correct: bool}` 저장
- 재방문 시 이어서 풀기 배너 표시
- "처음부터" 버튼(빨간색): `freshStart()` → localStorage 초기화

### 문항 네비게이션 도트
- `#nav` 컨테이너에 `renderNav()`로 렌더링
- `.nd` = 미풀이 / `.nd.ok` = 정답 / `.nd.ng` = 오답 / `.nd.cur` = 현재
- `jumpTo(i)`: 이미 푼 문항 클릭 시 해설 포함 복습 모드로 표시

### 상태 관리
```js
let cur = 0;                        // 현재 문항 인덱스
let answers = new Array(TOTAL).fill(null);
function getScore(){ return answers.filter(a=>a&&a.correct).length; }
```

### 퀴즈 흐름
1. `render()` → 문항 표시 (미풀이: 버튼 활성 / 풀이완료: 복습 모드)
2. `pick(val)` → 정답 채점, `answers[cur]` 저장, `renderNav()` 갱신
3. `next()` → `cur++`, `saveProgress()` 호출
4. `cur >= TOTAL` → 점수 카드 표시, `clearProgress()`

## 문항 데이터 구조 (Q 배열)
```js
{
  src: string,      // 출처/토픽
  cat: string,      // 카테고리
  text: string,     // 문항 (HTML 포함)
  ans: boolean,     // 정답 (true=O, false=X)
  correct: string,  // 핵심 정리 설명
  why: string,      // 상세 해설
  source: string,   // 인용 출처
  compare: array    // 비교 정리 (선택)
}
```

## 키워드 스타일 클래스
| 클래스 | 의미 | 색상 |
|--------|------|------|
| `.kw1` | 기본 개념 | 초록 배경 |
| `.kw2` | 부키워드 | 틸 밑줄 |
| `.kw3` | ★★ 빈출 | 주황 배경 |
| `.kw4` | ★★★ 최빈출 | 빨강 배경 |

## 개발 규칙
- 백엔드 없음 — 순수 클라이언트사이드
- 새 챕터 추가 시: HTML 파일 복사 후 `Q[]`, `SAVE_KEY`, `TOTAL`, 헤더 텍스트 수정
- Git 브랜치: `claude/` 접두사 사용, PR 머지 후 main 반영
