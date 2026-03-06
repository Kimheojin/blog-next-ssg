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
    <div className="max-w-3xl mx-auto px-6 space-y-12">
      <header>
        <h1 className="text-3xl font-bold mb-4 tracking-tight">Categories</h1>
        <p className="text-muted">관심 있는 주제를 선택해 주세요.</p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categoryNames.map((category) => (
          <Link 
            key={category}
            href={`/category/${category}`}
            className="group p-8 rounded-2xl transition-all flex justify-between items-center card-base"
          >
            <span className="text-lg font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
              {category}
            </span>
            <span className="text-sm font-mono text-muted-foreground opacity-50">
              {categoryCounts[category]}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
