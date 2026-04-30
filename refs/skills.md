# Skills 참조

## 호출 방법
```
Skill({ skill: "<skill-name>" })
```

---

## 스킬 목록

### `englisheducation-design`
**언제**: 색상·폰트·kw1~kw4 클래스 확인 필요할 때, 새 챕터에 디자인 처음 적용할 때  
**포함**: Noto Sans KR·JetBrains Mono·Caveat 폰트, OX/개념정리 배경·헤더 스타일, kw1~kw4 정의

---

### `englisheducation-quiz`
**언제**: `*.html` OX 퀴즈 페이지 새로 만들 때  
**포함**: 헤더 HTML, Q[] 배열 구조, localStorage 진행 저장, 네비게이션 도트, 효과음(sounds.js), 결과 팝업(score-popup.js), 스크립트 로드 순서

---

### `englisheducation-study`
**언제**: `*_study.html` 개념정리 페이지 새로 만들 때  
**포함**: 헤더 HTML, TOC·섹션 카드·기출포인트·키워드 범례, 섹션 토글 JS, 콘텐츠 패턴(비교 카드·N대 전략·양면성·기출분석 박스), SVG 다이어그램 패턴

---

### `englisheducation-deploy`
**언제**: 챕터 완성 직후 (퀴즈·개념정리 둘 다 완료 시점)  
**포함**: GitHub Pages 동시성 주의사항, 커밋→PR→머지→배포 완료 대기 5단계, 블로그 자료 템플릿(제목/태그/iframe/이미지)  
**주의**: 챕터 완료 시 별도 지시 없어도 반드시 호출

---

### `blog-image-pencil`
**언제**: 블로그 글 작성 중 썸네일·본문 이미지 생성 필요 시  
**포함**: Pencil MCP 이미지 생성 → 확인 → PNG 내보내기 → HTML/마크다운 URL 업데이트 전 과정

---

## 판단 흐름

```
새 챕터 작업?
├── 디자인 확인 필요          → englisheducation-design
├── OX 퀴즈 (*.html)          → englisheducation-quiz
├── 개념정리 (*_study.html)   → englisheducation-study
└── 완성 후 배포              → englisheducation-deploy

블로그 글 작업?
└── 이미지 필요              → blog-image-pencil
```
