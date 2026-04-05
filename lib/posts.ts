import fs from "fs";
import path from "path";
import matter from "gray-matter";
import {
  getAllMarkdownFilePaths,
  getExcerpt,
  getMarkdownPageData,
  Heading,
} from "@/lib/markdown";

const postsDirectory = path.join(process.cwd(), "public/posts");

export interface PostData {
  slug: string[];
  title: string;
  date: string;
  category: string;
  description: string;
  contentHtml?: string;
  headings?: Heading[];
}

// 모든 포스트 목록을 가져와서 날짜순으로 정렬
export function getSortedPostsData(): PostData[] {
  const filePaths = getAllMarkdownFilePaths(postsDirectory);

  const allPostsData = filePaths.map((filePath) => {
    const relativePath = path.relative(postsDirectory, filePath);
    const slug = relativePath.replace(/\.md$/, "").split(path.sep);
    const category = slug.length > 1 ? slug[0] : "uncategorized";

    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug,
      category,
      title: data.title || "Untitled",
      date: data.date || "2026-01-01",
      description: data.description || getExcerpt(content),
    };
  });

  return allPostsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getMarkdownFileData(fileName: string): Promise<PostData> {
  const pageData = await getMarkdownPageData(fileName);

  return {
    slug: [],
    category: "",
    ...pageData,
  };
}

export async function getPostData(slug: string[]): Promise<PostData> {
  const fullPath = path.join(postsDirectory, ...slug) + ".md";
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const pageData = await getMarkdownPageData(path.join("public/posts", ...slug) + ".md");

  return {
    slug,
    category: slug.length > 1 ? slug[0] : "uncategorized",
    title: data.title || "Untitled",
    date: data.date || "2026-01-01",
    description: data.description || getExcerpt(content),
    contentHtml: pageData.contentHtml,
    headings: pageData.headings,
  };
}
