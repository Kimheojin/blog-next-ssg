import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkRehype from "remark-rehype";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkBreaks from "remark-breaks";
import rehypeKatex from "rehype-katex";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import GithubSlugger from "github-slugger";

export interface Heading {
  level: number;
  text: string;
  id: string;
}

export interface MarkdownPageData {
  title: string;
  date: string;
  description: string;
  contentHtml?: string;
  headings?: Heading[];
}

export const TOC_MIN_HEADING_LEVEL = 2;
export const TOC_MAX_HEADING_LEVEL = 4;

export function getExcerpt(content: string, maxLength = 160) {
  const plainText = content
    .replace(/[#*`_~]/g, "")
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
    .replace(/\n+/g, " ")
    .trim();

  if (plainText.length <= maxLength) return plainText;
  return `${plainText.substring(0, maxLength).trim()}...`;
}

export function getAllMarkdownFilePaths(dirPath: string, arrayOfFiles: string[] = []) {
  if (!fs.existsSync(dirPath)) return [];
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllMarkdownFilePaths(filePath, arrayOfFiles);
    } else if (file.endsWith(".md")) {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

export function extractHeadings(content: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  const contentWithoutCodeBlocks = content.replace(/```[\s\S]*?```/g, "");
  const lines = contentWithoutCodeBlocks.split(/\r?\n/);

  lines.forEach((line) => {
    const match = line.match(/^#{2,6} /);
    if (match) {
      const level = match[0].trim().length;
      if (level < TOC_MIN_HEADING_LEVEL || level > TOC_MAX_HEADING_LEVEL) {
        return;
      }

      const text = line.replace(/^#+ /, "").replace(/#+$/, "").trim();
      const id = slugger.slug(text);

      if (text) {
        headings.push({ level, text, id });
      }
    }
  });

  return headings;
}

export async function processMarkdown(content: string): Promise<string> {
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkBreaks)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeKatex)
    .use(rehypePrettyCode, {
      theme: "one-dark-pro",
      keepBackground: false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onVisitLine(node: any) {
        if (node.children.length === 0) {
          node.children = [{ type: "text", value: " " }];
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onVisitHighlightedLine(node: any) {
        node.properties.className.push("highlighted");
      },
    })
    .use(rehypeStringify)
    .process(content);

  return processedContent.toString();
}

export async function getMarkdownPageData(fileName: string): Promise<MarkdownPageData> {
  const fullPath = path.join(process.cwd(), fileName);
  if (!fs.existsSync(fullPath)) {
    return { title: "Not Found", date: "", description: "", contentHtml: "", headings: [] };
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);
  const headings = extractHeadings(content);
  const contentHtml = await processMarkdown(content);

  return {
    title: data.title || "",
    date: data.date || "",
    description: data.description || getExcerpt(content),
    contentHtml,
    headings,
  };
}
