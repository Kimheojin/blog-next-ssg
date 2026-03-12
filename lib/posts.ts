import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeSlug from 'rehype-slug';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeRaw from 'rehype-raw';
import GithubSlugger from 'github-slugger';

const postsDirectory = path.join(process.cwd(), 'public/posts');

export interface Heading {
  level: number;
  text: string;
  id: string;
}

export interface PostData {
  slug: string[];
  title: string;
  date: string;
  category: string;
  description: string;
  contentHtml?: string;
  headings?: Heading[];
}

// 모든 마크다운 파일 경로를 재귀적으로 가져오는 함수
function getAllFilePaths(dirPath: string, arrayOfFiles: string[] = []) {
  if (!fs.existsSync(dirPath)) return [];
  const files = fs.readdirSync(dirPath);

  files.forEach((file) => {
    const filePath = path.join(dirPath, file);
    if (fs.statSync(filePath).isDirectory()) {
      arrayOfFiles = getAllFilePaths(filePath, arrayOfFiles);
    } else if (file.endsWith('.md')) {
      arrayOfFiles.push(filePath);
    }
  });

  return arrayOfFiles;
}

// 제목(Heading) 추출 공통 함수 (코드 블록 제외 로직 추가)
function extractHeadings(content: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  
  // 코드 블록(``` ... ```)을 제거한 본문 생성
  const contentWithoutCodeBlocks = content.replace(/```[\s\S]*?```/g, '');
  
  const lines = contentWithoutCodeBlocks.split(/\r?\n/);

  lines.forEach(line => {
    // ## 부터 #### 까지 지원 (필요에 따라 조절 가능)
    const match = line.match(/^#{2,4} /);
    if (match) {
      const level = match[0].trim().length;
      // 앞뒤 공백 및 마크다운 기호 제거
      const text = line.replace(/^#+ /, '').replace(/#+$/, '').trim();
      const id = slugger.slug(text);
      
      if (text) {
        headings.push({ level, text, id });
      }
    }
  });

  return headings;
}

// 본문에서 요약문(excerpt)을 추출하는 함수
function getExcerpt(content: string, maxLength = 160) {
  const plainText = content
    .replace(/[#*`_~]/g, '') // 마크다운 기호 제거
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // 링크 텍스트만 추출
    .replace(/\n+/g, ' ') // 줄바꿈을 공백으로
    .trim();
  
  if (plainText.length <= maxLength) return plainText;
  return plainText.substring(0, maxLength).trim() + '...';
}

// 모든 포스트 목록을 가져와서 날짜순으로 정렬
export function getSortedPostsData(): PostData[] {
  const filePaths = getAllFilePaths(postsDirectory);
  
  const allPostsData = filePaths.map((filePath) => {
    const relativePath = path.relative(postsDirectory, filePath);
    const slug = relativePath.replace(/\.md$/, '').split(path.sep);
    const category = slug.length > 1 ? slug[0] : 'uncategorized';

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      category,
      title: data.title || 'Untitled',
      date: data.date || '2026-01-01',
      description: data.description || getExcerpt(content),
    };
  });

  return allPostsData.sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()));
}

// 마크다운 콘텐츠를 HTML로 변환하는 공통 내부 함수
async function processMarkdown(content: string): Promise<string> {
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeKatex)
    .use(rehypePrettyCode, {
      theme: 'one-dark-pro',
      keepBackground: false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onVisitLine(node: any) {
        if (node.children.length === 0) {
          node.children = [{ type: 'text', value: ' ' }];
        }
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onVisitHighlightedLine(node: any) {
        node.properties.className.push('highlighted');
      },
    })
    .use(rehypeStringify)
    .process(content);

  return processedContent.toString();
}

// 개별 마크다운 파일을 읽어서 처리하는 범용 함수
export async function getMarkdownFileData(fileName: string): Promise<PostData> {
  const fullPath = path.join(process.cwd(), fileName);
  if (!fs.existsSync(fullPath)) {
    return { slug: [], category: '', title: 'Not Found', date: '', contentHtml: '', description: '' };
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const headings = extractHeadings(content);
  const contentHtml = await processMarkdown(content);

  return {
    slug: [],
    category: '',
    title: data.title || '',
    date: data.date || '',
    description: data.description || getExcerpt(content),
    contentHtml,
    headings,
  };
}

// 개별 포스트 상세 내용을 가져오는 함수
export async function getPostData(slug: string[]): Promise<PostData> {
  const fullPath = path.join(postsDirectory, ...slug) + '.md';
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const headings = extractHeadings(content);
  const contentHtml = await processMarkdown(content);

  return {
    slug,
    category: slug.length > 1 ? slug[0] : 'uncategorized',
    title: data.title || 'Untitled',
    date: data.date || '2026-01-01',
    description: data.description || getExcerpt(content),
    contentHtml,
    headings,
  };
}
