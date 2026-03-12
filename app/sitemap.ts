import { MetadataRoute } from 'next';
import { getSortedPostsData } from '@/lib/posts';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://heojin1109.github.io';
  const posts = getSortedPostsData();
  const categories = Array.from(new Set(posts.map(post => post.category)));

  // 가장 최근 포스트의 날짜 가져오기 (메인 페이지용)
  const latestPostDate = posts.length > 0 ? new Date(posts[0].date) : new Date();

  // 1. 메인 페이지 (가장 높은 우선순위와 최신 글 날짜 부여)
  const mainRoute = {
    url: baseUrl,
    lastModified: latestPostDate,
    priority: 1,
  };

  // 2. 카테고리 메인 및 개별 카테고리 페이지 (URL만 포함)
  const categoryRoutes = [
    { url: `${baseUrl}/category` },
    ...categories.map((category) => ({
      url: `${baseUrl}/category/${category}`,
    })),
  ];

  // 3. 모든 블로그 포스트 상세 페이지
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug.join('/')}`,
    lastModified: new Date(post.date)
  }));

  return [mainRoute, ...categoryRoutes, ...postUrls];
}
