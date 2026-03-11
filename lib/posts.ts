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

// 제목(Heading) 추출 공통 함수
function extractHeadings(content: string): Heading[] {
  const slugger = new GithubSlugger();
  const lines = content.split(/\r?\n/);
  const headings: Heading[] = [];

  lines.forEach(line => {
    const match = line.match(/^#{2,3} /);
    if (match) {
      const level = match[0].trim().length;
      const text = line.replace(/^#+ /, '').trim();
      const id = slugger.slug(text);
      
      if (text) {
        headings.push({ level, text, id });
      }
    }
  });

  return headings;
}

// 모든 포스트 목록을 가져와서 날짜순으로 정렬
export function getSortedPostsData(): PostData[] {
  const filePaths = getAllFilePaths(postsDirectory);
  
  const allPostsData = filePaths.map((filePath) => {
    const relativePath = path.relative(postsDirectory, filePath);
    const slug = relativePath.replace(/\.md$/, '').split(path.sep);
    const category = slug.length > 1 ? slug[0] : 'uncategorized';

    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    return {
      slug,
      category,
      title: data.title || 'Untitled',
      date: data.date || '2026-01-01',
    };
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

// 개별 마크다운 파일을 읽어서 처리하는 범용 함수
export async function getMarkdownFileData(fileName: string): Promise<PostData> {
  const fullPath = path.join(process.cwd(), fileName);
  if (!fs.existsSync(fullPath)) {
    return { slug: [], category: '', title: 'Not Found', date: '', contentHtml: '' };
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  
  const headings = extractHeadings(content);
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkMath) // 수학식 파싱 ($...$, $$...$$)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeKatex) // 수학식 렌더링
    .use(rehypePrettyCode, {
      theme: 'one-dark-pro',
      keepBackground: false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onVisitLine(node: any) {
        // 빈 줄이 있어도 높이를 유지하도록 처리
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
  const contentHtml = processedContent.toString();

  return {
    slug: [],
    category: '',
    title: data.title || '',
    date: data.date || '',
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
  const processedContent = await remark()
    .use(remarkGfm)
    .use(remarkMath) // 수학식 파싱
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSlug)
    .use(rehypeKatex) // 수학식 렌더링
    .use(rehypePrettyCode, {
      theme: 'one-dark-pro',
      keepBackground: false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onVisitLine(node: any) {
        // 빈 줄이 있어도 높이를 유지하도록 처리
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
  const contentHtml = processedContent.toString();

  return {
    slug,
    category: slug.length > 1 ? slug[0] : 'uncategorized',
    title: data.title || 'Untitled',
    date: data.date || '2026-01-01',
    contentHtml,
    headings,
  };
}
