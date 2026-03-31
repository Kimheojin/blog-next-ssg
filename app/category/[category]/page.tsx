import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";
import { PaginatedPostList } from "@/components/PaginatedPostList";
import { notFound } from "next/navigation";

const ITEMS_PER_PAGE = 7;

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  const categories = Array.from(new Set(posts.map(post => post.category)));
  return categories.map((category) => ({
    category,
  }));
}

export default async function CategoryDetailPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const allPosts = getSortedPostsData();
  const filteredPosts = allPosts.filter(post => post.category === category);

  if (filteredPosts.length === 0) {
    notFound();
  }

  const totalItems = filteredPosts.length;
  const currentPage = 1;

  const currentItems = filteredPosts.slice(0, ITEMS_PER_PAGE);

  return (
    <div className="space-y-12">
      <header className="flex items-baseline space-x-4">
        <h1 className="text-3xl font-bold uppercase tracking-tight">{category}</h1>
        <span className="text-lg text-muted-foreground font-mono">({totalItems})</span>
      </header>

      <PaginatedPostList 
        currentItems={currentItems}
        totalItems={totalItems}
        itemsPerPage={ITEMS_PER_PAGE}
        currentPage={currentPage}
        basePath={`/category/${category}`}
      />

      <footer className="pt-8 border-t border-[var(--border)] mt-12">
        <Link href="/category" className="text-base font-bold text-muted-foreground hover:text-heading transition-colors flex items-center group">
          <span className="mr-2 transition-transform group-hover:-translate-x-1">←</span> 카테고리 목록 보기
        </Link>
      </footer>
    </div>
  );
}
