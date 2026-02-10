# SSG Next.js 블로그 프로젝트

이 프로젝트는 Next.js의 SSG(Static Site Generation) 기능을 활용한 정적 블로그입니다.

## 🚀 시작하기

### 1. 개발 서버 실행
```bash
npm run dev
```

### 2. 정적 사이트 빌드 (SSG)
Next.js 프로젝트를 정적 사이트로 빌드하려면 `next.config.ts`에 `output: 'export'` 설정이 필요합니다.

```bash
npm run build
```
빌드가 완료되면 `out` 폴더에 정적 HTML/CSS/JS 파일이 생성됩니다.

## 💡 SSG 빌드 팁

### 1. 정적 배포 설정 (Static Export)
`next.config.ts` 파일을 다음과 같이 수정하여 정적 내보내기를 활성화할 수 있습니다:
```typescript
const nextConfig = {
  output: 'export', // 정적 사이트 생성을 활성화
  images: {
    unoptimized: true, // 정적 호스팅(GitHub Pages 등)에서는 이미지 최적화 비활성화 필요
  },
};
```

### 2. 경로 최적화
- `generateStaticParams`를 사용하여 동적 경로(예: `[slug]`)를 빌드 타임에 미리 생성하세요.
- 모든 링크는 `next/link`를 사용하여 클라이언트 사이드 탐색을 최적화하세요.

### 3. SEO 설정
- 각 페이지마다 `Metadata` API를 활용하여 `title`, `description`을 설정하면 검색 엔진 최적화에 유리합니다.

### 4. 배포
- 생성된 `out` 폴더의 내용을 GitHub Pages, Vercel(Static), Netlify 등에 업로드하여 무료로 호스팅할 수 있습니다.
