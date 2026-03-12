import Link from 'next/link';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  basePath: string; // 예: "", "/category/tech"
}

export function Pagination({ totalPages, currentPage, basePath }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPagePath = (page: number) => {
    if (page === 1) return basePath === '' ? '/' : basePath;
    return `${basePath}/page/${page}`;
  };

  const buttonBaseClass = "px-4 py-2 text-sm font-bold rounded-xl transition-all border-2 border-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:!text-black dark:hover:!text-white disabled:opacity-30 disabled:pointer-events-none text-neutral-400 dark:text-neutral-600";

  // 페이지 번호 생성 로직 (Truncation)
  const getPages = () => {
    const pages: (number | string)[] = [];
    const range = 1; // 현재 페이지 주변에 보여줄 페이지 수

    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 || 
        i === totalPages || 
        (i >= currentPage - range && i <= currentPage + range)
      ) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== '...') {
        pages.push('...');
      }
    }
    return pages;
  };

  return (
    <nav className="flex justify-center items-center space-x-2 mt-16">
      <Link
        href={getPagePath(currentPage - 1)}
        className={`${buttonBaseClass} ${currentPage === 1 ? 'opacity-30 pointer-events-none' : ''}`}
        aria-disabled={currentPage === 1}
      >
        이전
      </Link>
      
      <div className="flex items-center space-x-1">
        {getPages().map((page, index) => (
          typeof page === 'number' ? (
            <Link
              key={index}
              href={getPagePath(page)}
              style={
                currentPage === page 
                  ? { borderColor: 'var(--heading, black)', color: 'var(--heading, black)' } 
                  : {}
              }
              className={`w-10 h-10 flex items-center justify-center text-sm font-black rounded-xl transition-all border-2 ${
                currentPage === page
                  ? 'z-10'
                  : 'border-transparent text-neutral-400 dark:text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:!text-black dark:hover:!text-white'
              }`}
            >
              {page}
            </Link>
          ) : (
            <span key={index} className="px-2 text-neutral-400 dark:text-neutral-600 font-bold">
              {page}
            </span>
          )
        ))}
      </div>

      <Link
        href={getPagePath(currentPage + 1)}
        className={`${buttonBaseClass} ${currentPage === totalPages ? 'opacity-30 pointer-events-none' : ''}`}
        aria-disabled={currentPage === totalPages}
      >
        다음
      </Link>
    </nav>
  );
}
