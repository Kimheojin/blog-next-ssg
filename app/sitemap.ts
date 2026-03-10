import { MetadataRoute } from 'next';
import { getSortedPostsData } from '@/lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://heojin1109.github.io';
  const posts = getSortedPostsData();

  // 모든 블로그 포스트 URL 생성
  const postUrls = posts.map((post) => ({
    url: `${baseUrl}/posts/${post.slug.join('/')}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // 정적 페이지들
  const routes = ['', '/about', '/category'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  return [...routes, ...postUrls];
}
