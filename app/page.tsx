import { getSortedPostsData } from "@/lib/posts";
import { PaginatedPostList } from "@/components/PaginatedPostList";

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="space-y-12">
      <section>
        <h2 className="text-2xl font-bold mb-8 tracking-tight">Recent Posts</h2>
        <PaginatedPostList posts={allPostsData} />
      </section>
    </div>
  );
}
