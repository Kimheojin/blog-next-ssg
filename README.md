# SSG 방식 블로그

- Next.js + TS 
- 2026.03.22 버전
- URL : https://heojin1109.github.io/
- 배포 repo : https://github.com/HeoJin1109/HeoJin1109.github.io.git

## 배포 명령어

```bash
# 1. 최신 코드로 정적 파일 생성 (out 폴더 생성)
npm run build

# 2. out 폴더의 내용을 지정된 배포용 repo의 main 브랜치로 푸시
npm run deploy
```



## post 필수 템플릿

- 상단에 추가하기

```
---
title: "Tailwind CSS 활용 꿀팁: 디자인 시스템부터 성능 최적화까지"
date: "2026-02-05"
category: "tech"
description: "Tailwind CSS 활용 꿀팁: 디자인 시스템부터 성능 최적화까지에 관한 포스트입니다."
---
```



### 이미지 관련 참고사항

- 링크를 통해 넣는 경우, 루트 경로가 바뀜

  - public dir 을 루트로 잡고 하기 ( 이 겨웅 VScode 에선 인식을 못함) 

- https://squoosh.app/

  - webp 형식으로 통일

  

## about.md 템플릿

```
---
title: "About Me"
date: "2026-03-13"
description: "About Me에 관한 포스트"
---
```



## 구현 목록 (참고용)

- 다크 모드 - `next-themes`, `lucide-react`
- 마크다운 처리 - `remark`, `rehype` (GFM, Math, Slug 지원)
- 코드 하이라이팅 - `shiki`, `rehype-pretty-code`
- 정적 사이트 생성(SSG) - Next.js (output: 'export')
- 이미지 확대 - `medium-zoom`
- 아이콘 - `lucide-react`
- 스타일링 - `Tailwind CSS (v4)`
- 배포 - `gh-pages` (GitHub Pages)
- SEO - sitemap.ts, robots.ts
- 메타데이터 관리 - `gray-matter` (Frontmatter 파싱)
- 기타 UI - ScrollToTop, Pagination, TOC (목차 자동 생성)
- 카테고리 시스템: 폴더 구조 기반 자동 분류 및 카테고리별 전용 페이지
  (app/category/[category]/page.tsx)
- 수학 공식 렌더링: `remark-math` 및 `rehype-katex`를 통한 LaTeX 수식 지원
- 검색 최적화(SEO): Metadata API를 활용한 동적 제목, 설명, 캐노니컬 URL 생성
- 한글 슬러그 처리: `github-slugger`를 이용한 한글 제목의 URL 안전 변환 및 TOC 앵커 생성
- 폰트: 나눔스퀘어 라운드 (Nanum Square Round) 웹폰트 + D2Coding + Typography
- 레이아웃 요소:
  - 반응형 헤더 (Home, Category, About 네비게이션)
  - 전역 푸터 (Copyright 및 Powered by 표시)
  - not-found.tsx를 통한 커스텀 404 페이지
- 코드블럭 줄 표시 : `rehype-pretty-code`
- 