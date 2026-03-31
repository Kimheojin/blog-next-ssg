import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";

export default function CategoryPage() {
  const allPosts = getSortedPostsData();
  
  // 중복 제거된 카테고리 목록과 개수 추출
  const categoryCounts = allPosts.reduce((acc, post) => {
    acc[post.category] = (acc[post.category] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const categoryNames = Object.keys(categoryCounts).sort();

  return (
    <div className="space-y-12">
      <header>
        <h1 className="text-3xl font-bold mb-4 tracking-tight">Categories</h1>
        <p className="text-muted">관심 있는 주제를 선택해 주세요.</p>
      </header>

      {categoryNames.length === 0 ? (
        <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] px-6 py-10 text-center">
          <p className="text-lg font-bold text-heading">작성글이 없습니다.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {categoryNames.map((category) => (
            <Link 
              key={category}
              href={`/category/${category}`}
              className="group p-6 rounded-2xl flex justify-between items-center card-base"
            >
              <span className="text-lg font-bold uppercase tracking-wider text-heading">
                {category}
              </span>
              <span className="inline-flex items-center justify-center px-3 py-1 text-xs font-mono font-bold bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 rounded-lg">
                {String(categoryCounts[category]).padStart(2, '0')}
              </span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
