---
name: englisheducation-deploy
description: englisheducation 챕터 완료 시 자동 처리 워크플로우. GitHub Pages 동시성 주의사항, 커밋·PR 머지·배포 완료 대기 5단계, 블로그 자료 템플릿(제목/태그/iframe/이미지). 챕터 작업 완료 후 반드시 호출.
---

# 챕터 작업 완료 시 자동 처리 워크플로우

**챕터 1개 완료 = 반드시 아래 5단계 모두 자동 실행**

> ⚠️ **GitHub Pages 동시성 주의**: Pages workflow는 새 실행이 들어오면 이전 실행을 취소시킴. 연속 커밋·푸시 시 배포 실패.
> - **변경사항은 한 커밋으로 묶을 것** (커밋 여러 번 쪼개지 말 것)
> - main 머지·푸시 후 **Pages 배포 완료 전까지 추가 커밋 금지**
> - 배포 실패 시 GitHub Actions(https://github.com/Namkicheol/englisheducation/actions) 직접 확인

## 1단계: 코드 작업 (한 번에 모두 완료)

- `XXX.html` + `XXX_study.html` 작성
- `index.html` 업데이트 (완료 챕터 카드 추가, 통계 숫자 +1)
- **작업 완료 전까지는 커밋하지 말 것** — 모든 변경 한 번에 묶기

## 2단계: 하나의 커밋으로 묶기

```bash
git add XXX.html XXX_study.html index.html [CLAUDE.md]
git commit -m "Add Ch.N [챕터명] + index 업데이트

- XXX.html: OX 퀴즈 20문항
- XXX_study.html: 개념정리 N섹션
- index.html: Ch.N 완료 카드 추가

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

## 3단계: 브랜치 푸시 + PR 머지

> ⚠️ 로컬에서 별도 작업 후 origin/main과 diverge된 경우, GitHub MCP로 PR 머지 후 로컬 main reset --hard.

**① feature 브랜치 푸시**
```bash
git push -u origin <current-branch>
```

**② PR squash 머지 (GitHub MCP)**
```python
mcp__github__update_pull_request(owner, repo, pullNumber, draft=False)
mcp__github__merge_pull_request(owner, repo, pullNumber, merge_method="squash",
    commit_title="커밋 제목", commit_message="상세 내용")
```

**③ 로컬 main 동기화**
```bash
git fetch origin && git reset --hard origin/main
```

## 4단계: Pages 배포 완료 대기 (폴링)

```bash
until [ "$(curl -s -o /dev/null -w '%{http_code}' https://namkicheol.github.io/englisheducation/XXX.html)" = "200" ]; do sleep 20; done
```

보통 1~5분 소요. 완료 확인 전까지 **다음 작업 금지**. 대기 중 추가 커밋하면 워크플로우 취소됨.

## 5단계: 블로그 자료 자동 제공

사용자가 별도 요청하지 않아도 아래 4가지를 함께 출력:
① 블로그 제목 2개 (퀴즈/개념정리)
② 태그
③ iframe 임베드 코드 2개 (퀴즈/개념정리)
④ Pencil MCP 이미지 (blog-image-pencil 스킬 사용)

---

# 블로그 자료 템플릿

## 블로그 제목 (2개)

```
중등 임용 영어 | Ch.N [영문 챕터명] OX 퀴즈 20문제 (기출 포함)
중등 임용 영어 | Ch.N [영문 챕터명] 핵심 개념정리 (서브노트 기반)
```

## 태그 (공통)

```
임용고시, 중등영어, 영어교육론, ChN, [챕터키워드1], [챕터키워드2],
[핵심개념1], [핵심개념2], [핵심개념3], 서브노트, 기출분석
```

## iframe 임베드

**퀴즈:**
```html
<iframe src="https://namkicheol.github.io/englisheducation/XXX.html" 
        width="100%" height="900" frameborder="0" 
        style="border:1px solid #ddd; border-radius:12px;"></iframe>
```

**개념정리:**
```html
<iframe src="https://namkicheol.github.io/englisheducation/XXX_study.html" 
        width="100%" height="900" frameborder="0" 
        style="border:1px solid #ddd; border-radius:12px;"></iframe>
```

## 이미지

**blog-image-pencil 스킬** 사용 — Pencil MCP로 3장 AI 생성.
