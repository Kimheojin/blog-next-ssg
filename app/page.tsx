import { getSortedPostsData } from "@/lib/posts";
import { PaginatedPostList } from "@/components/PaginatedPostList";

const ITEMS_PER_PAGE = 7;

export default function Home() {
  const allPostsData = getSortedPostsData();
  const totalItems = allPostsData.length;
  const currentPage = 1;
  
  const currentItems = allPostsData.slice(0, ITEMS_PER_PAGE);

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
