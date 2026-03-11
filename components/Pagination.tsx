'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
}

export function Pagination({ totalItems, itemsPerPage, currentPage }: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1) return null;

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`, { scroll: true });
  };

  const buttonBaseClass = "px-4 py-2 text-sm font-bold rounded-xl transition-all border-2 border-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:!text-black dark:hover:!text-white disabled:opacity-30 disabled:cursor-not-allowed text-neutral-400 dark:text-neutral-600";

  return (
    <nav className="flex justify-center items-center space-x-2 mt-16">
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={buttonBaseClass}
      >
        이전
      </button>
      
      <div className="flex items-center space-x-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            style={
              currentPage === page 
                ? { borderColor: 'var(--heading, black)', color: 'var(--heading, black)' } 
                : {}
            }
            className={`w-10 h-10 text-sm font-black rounded-xl transition-all border-2 ${
              currentPage === page
                ? 'z-10'
                : 'border-transparent text-neutral-400 dark:text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:!text-black dark:hover:!text-white'
            }`}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={totalPages === 0 || currentPage === totalPages}
        className={buttonBaseClass}
      >
        다음
      </button>
    </nav>
  );
}
