import { getPostData, getSortedPostsData } from "@/lib/posts";
import Link from "next/link";
import { Metadata } from "next";
import ZoomImageHandler from "@/components/ZoomImageHandler";
import { createBlogPostingJsonLd, serializeJsonLd } from "@/lib/seo";

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostData(slug);
  const path = `/posts/${slug.join('/')}`;
  
  return {
    title: `${post.title} | 허진 블로그`,
    description: post.description,
    alternates: {
      canonical: path,
    },
  };
}

export default async function PostPage({ params }: { params: { slug: string[] } }) {
  const { slug } = await params;
  const postData = await getPostData(slug);
  const hasHeadings = postData.headings && postData.headings.length > 0;
  const jsonLd = createBlogPostingJsonLd(postData);

  return (
    <div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
      />
      <article className="w-full min-w-0">
        <header className="mb-12">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6">
            <Link href="/" className="hover:text-heading transition-colors">Home</Link>
            <span>/</span>
            <Link href={`/category/${postData.category}`} className="hover:text-heading transition-colors">
              {postData.category}
            </Link>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight leading-[1.1]">
            {postData.title}
          </h1>
          <time className="text-sm text-muted-foreground font-mono italic">{postData.date}</time>
        </header>

        <div 
          className="prose dark:prose-invert max-w-none 
            prose-headings:scroll-mt-32 
            prose-headings:font-bold
            prose-a:no-underline prose-a:text-blue-500 hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }} 
        />
        <ZoomImageHandler />

        <footer className="mt-24 pt-10 border-t border-[var(--border)] flex justify-between items-center">
          <Link href={`/category/${postData.category}`} className="text-base font-bold text-muted-foreground hover:text-heading transition-colors flex items-center group">
            <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span> {postData.category} 목록
          </Link>
          <Link href="/" className="text-base font-bold text-muted-foreground hover:text-heading transition-colors flex items-center group">
            전체 글 보기 <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </footer>
      </article>

      {/* TOC: 1280px(xl) 이상에서만 본문 우측에 표시 */}
      {hasHeadings && (
        <aside className="hidden xl:block absolute left-full top-0 h-full">
          <div className="sticky top-24 ml-12 w-64">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground mb-6">
              On this page
            </h2>
            <nav className="flex flex-col space-y-4">
              {postData.headings?.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className={`text-[13px] transition-all duration-200 hover:translate-x-1 leading-snug hover:text-heading ${
                    heading.level === 3 
                      ? "pl-4 text-muted-foreground dark:text-muted-foreground/50 font-normal" 
                      : "text-muted dark:text-muted/50 font-bold"
                  }`}
                >
                  {heading.text}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      )}
    </div>
  );
}
