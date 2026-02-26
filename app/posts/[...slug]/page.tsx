import { getPostData, getSortedPostsData } from "@/lib/posts";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params }: { params: { slug: string[] } }) {
  const { slug } = await params;
  const postData = await getPostData(slug);
  const hasHeadings = postData.headings && postData.headings.length > 0;

  return (
    <div className="max-w-3xl mx-auto px-6 relative">
      <article className="w-full min-w-0">
        <header className="mb-12">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-neutral-400 mb-6">
            <Link href="/" className="hover:text-black dark:hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href={`/category/${postData.category}`} className="hover:text-black dark:hover:text-white transition-colors">
              {postData.category}
            </Link>
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-6 tracking-tight leading-[1.1]">
            {postData.title}
          </h1>
          <time className="text-sm text-neutral-400 font-mono italic">{postData.date}</time>
        </header>

        <div 
          className="prose dark:prose-invert max-w-none 
            prose-headings:scroll-mt-32 
            prose-headings:font-bold
            prose-a:no-underline prose-a:text-blue-500 hover:prose-a:underline
            prose-img:rounded-2xl prose-img:shadow-xl"
          dangerouslySetInnerHTML={{ __html: postData.contentHtml || '' }} 
        />

        <footer className="mt-24 pt-10 border-t border-neutral-100 dark:border-neutral-900">
          <Link href="/" className="text-sm font-bold text-neutral-400 hover:text-black dark:hover:text-white transition-colors flex items-center">
            <span className="mr-2">←</span> Back to Overview
          </Link>
        </footer>
      </article>

      {/* TOC: 1280px(xl) 이상에서만 본문 우측에 표시 */}
      {hasHeadings && (
        <aside className="hidden xl:block absolute left-full top-0 h-full">
          <div className="sticky top-24 ml-12 w-64">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-300 dark:text-neutral-700 mb-6">
              On this page
            </h2>
            <nav className="flex flex-col space-y-4">
              {postData.headings?.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className={`text-[13px] transition-all duration-200 hover:translate-x-1 leading-snug ${
                    heading.level === 3 
                      ? "pl-4 text-neutral-400 font-normal hover:text-black dark:hover:text-white" 
                      : "text-neutral-500 font-bold hover:text-black dark:hover:text-white"
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
