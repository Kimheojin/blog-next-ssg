import Link from "next/link";
import { Pagination } from "./Pagination";

interface Post {
  slug: string[];
  date: string;
  title: string;
  category: string;
}

interface PaginatedPostListProps {
  currentItems: Post[];
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  basePath: string;
}

export function PaginatedPostList({ 
  currentItems, 
  totalItems, 
  itemsPerPage, 
  currentPage, 
  basePath 
}: PaginatedPostListProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <>
      <div className="grid gap-6">
        {currentItems.map(({ slug, date, title, category }) => (
          <Link 
            href={`/posts/${slug.join('/')}`} 
            key={slug.join('/')}
            className="group block p-6 rounded-2xl card-base transition-all"
          >
            <div className="flex justify-between items-start mb-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                {category}
              </span>
              <span className="text-xs text-muted-foreground font-mono">{date}</span>
            </div>
            <h3 className="text-xl font-bold group-hover:translate-x-1 transition-transform">
              {title}
            </h3>
          </Link>
        ))}
      </div>

      <Pagination 
        totalPages={totalPages}
        currentPage={currentPage}
        basePath={basePath}
      />
    </>
  );
}
