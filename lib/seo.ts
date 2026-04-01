import { PostData } from "@/lib/posts";

const SITE_URL = "https://heojin1109.github.io";
const SITE_NAME = "허진 블로그";
const AUTHOR_NAME = "허진";

interface BlogPostingJsonLd {
  "@context": "https://schema.org";
  "@type": "BlogPosting";
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  url: string;
  mainEntityOfPage: string;
  articleSection: string;
  inLanguage: "ko-KR";
  author: {
    "@type": "Person";
    name: string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
  };
}

export function getPostUrl(slug: string[]): string {
  return `${SITE_URL}/posts/${slug.join("/")}`;
}

export function createBlogPostingJsonLd(post: PostData): BlogPostingJsonLd {
  const url = getPostUrl(post.slug);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    url,
    mainEntityOfPage: url,
    articleSection: post.category,
    inLanguage: "ko-KR",
    author: {
      "@type": "Person",
      name: AUTHOR_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
    },
  };
}

export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
