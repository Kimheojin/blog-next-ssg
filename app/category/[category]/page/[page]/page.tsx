import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";
import { PaginatedPostList } from "@/components/PaginatedPostList";
import { notFound } from "next/navigation";

const ITEMS_PER_PAGE = 7;

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  const categories = Array.from(new Set(posts.map(post => post.category)));
  
  const paths = [];
  
  for (const category of categories) {
    const filteredPosts = posts.filter(post => post.category === category);
    const totalPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);
    
    // 2페이지부터 끝까지 경로 생성 (1페이지는 "/category/[category]"에서 담당)
    for (let i = 2; i <= totalPages; i++) {
      paths.push({ 
        category, 
        page: i.toString() 
      });
    }
  }
  
  return paths;
}

export default async function CategoryPaginationPage({ params }: { params: Promise<{ category: string, page: string }> }) {
  const { category, page } = await params;
  const currentPage = parseInt(page);
  const allPosts = getSortedPostsData();
  const filteredPosts = allPosts.filter(post => post.category === category);
  const totalItems = filteredPosts.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // 1페이지인 경우 "/category/[category]"로 리다이렉트하거나 에러 처리 (선택)
  if (currentPage === 1 || currentPage > totalPages || isNaN(currentPage)) {
    return notFound();
  }

  const currentItems = filteredPosts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
