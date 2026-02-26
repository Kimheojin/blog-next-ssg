import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";

// 빌드 시점에 생성할 카테고리 경로들을 정의합니다
export async function generateStaticParams() {
  const posts = getSortedPostsData();
  const categories = Array.from(new Set(posts.map(post => post.category)));
  return categories.map((category) => ({
    category,
  }));
}

export default async function CategoryDetailPage({ params }: { params: { category: string } }) {
  const { category } = await params;
  const allPosts = getSortedPostsData();
  
  // 현재 카테고리에 해당하는 포스트만 필터링
  const filteredPosts = allPosts.filter(post => post.category === category);

  return (
    <div className="max-w-3xl mx-auto px-6 space-y-12">
      <header className="flex items-baseline space-x-4">
        <h1 className="text-3xl font-bold uppercase tracking-tight">{category}</h1>
        <span className="text-lg text-neutral-400 font-mono">({filteredPosts.length})</span>
      </header>

      <div className="grid gap-6">
        {filteredPosts.map(({ slug, date, title }) => (
          <Link 
            href={`/posts/${slug.join('/')}`} 
            key={slug.join('/')}
            className="group block p-8 border rounded-2xl hover:border-black dark:hover:border-white transition-all bg-neutral-50/50 dark:bg-neutral-900/50"
          >
            <div className="flex justify-end mb-3">
              <span className="text-xs text-neutral-400 font-mono">{date}</span>
            </div>
            <h3 className="text-xl font-bold group-hover:translate-x-1 transition-transform">
              {title}
            </h3>
            <p className="mt-4 text-sm text-neutral-500 flex items-center">
              Read article <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
            </p>
          </Link>
        ))}
      </div>

      <footer className="pt-8">
        <Link href="/category" className="text-sm font-bold text-neutral-400 hover:text-black dark:hover:text-white transition-colors">
          &larr; Back to all categories
        </Link>
      </footer>
    </div>
  );
}
