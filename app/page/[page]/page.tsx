import { getSortedPostsData } from "@/lib/posts";
import { PaginatedPostList } from "@/components/PaginatedPostList";
import { notFound } from "next/navigation";

const ITEMS_PER_PAGE = 7;

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);

  // 최소 1페이지는 생성하도록 하여 빌드 에러 방지 (항상 존재하는 경로 확보)
  const paths = [];
  for (let i = 1; i <= totalPages; i++) {
    paths.push({ page: i.toString() });
  }
  return paths;
}

export default async function HomePageWithPagination({ params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const currentPage = parseInt(page);
  const allPostsData = getSortedPostsData();
  const totalItems = allPostsData.length;

  if (totalItems === 0) {
    return notFound();
  }

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  // 유효하지 않은 페이지 번호 처리
  if (isNaN(currentPage) || currentPage < 1 || currentPage > totalPages) {
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
