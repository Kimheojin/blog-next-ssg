import { getSortedPostsData } from "@/lib/posts";
import { PaginatedPostList } from "@/components/PaginatedPostList";
import { notFound } from "next/navigation";

const ITEMS_PER_PAGE = 7;

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);

  // 2페이지부터 끝까지 경로 생성 (1페이지는 "/"에서 담당)
  const paths = [];
  for (let i = 2; i <= totalPages; i++) {
    paths.push({ page: i.toString() });
  }
  return paths;
}

export default async function HomePageWithPagination({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const currentPage = parseInt(page);
  const allPostsData = getSortedPostsData();
  const totalItems = allPostsData.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // 1페이지인 경우 "/"로 리다이렉트하거나 에러 처리 (선택)
  if (currentPage === 1 || currentPage > totalPages || isNaN(currentPage)) {
    return notFound();
  }

  const currentItems = allPostsData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-bold mb-8 tracking-tight">Recent Posts</h2>
        <PaginatedPostList 
          currentItems={currentItems}
          totalItems={totalItems}
          itemsPerPage={ITEMS_PER_PAGE}
          currentPage={currentPage}
          basePath=""
        />
      </section>
    </div>
  );
}
