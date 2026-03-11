'use client';

import Link from "next/link";
import { useSearchParams } from 'next/navigation';
import { Pagination } from "./Pagination";
import { Suspense } from 'react';

interface Post {
  slug: string[];
  date: string;
  title: string;
  category: string;
}

interface PaginatedPostListProps {
  posts: Post[];
  itemsPerPage?: number;
}

function PostListContent({ posts, itemsPerPage = 7 }: PaginatedPostListProps) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  // 현재 페이지에 해당하는 데이터 슬라이싱
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = posts.slice(indexOfFirstItem, indexOfLastItem);

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
        totalItems={posts.length} 
        itemsPerPage={itemsPerPage} 
        currentPage={currentPage} 
      />
    </>
  );
}

export function PaginatedPostList(props: PaginatedPostListProps) {
  return (
    <Suspense fallback={<div className="text-muted">Loading posts...</div>}>
      <PostListContent {...props} />
    </Suspense>
  );
}
