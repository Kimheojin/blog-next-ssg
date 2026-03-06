'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className="fixed bottom-6 right-6 w-11 h-11" />;
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className="fixed bottom-6 right-6 p-3 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-lg hover:scale-110 active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary z-50"
      aria-label="Toggle theme"
    >
      {isDark ? (
        /* 다크 모드일 때: 라이트 모드로 전환하기 위한 '해' 아이콘 */
        <Sun className="w-5 h-5 text-yellow-400 fill-yellow-400" />
      ) : (
        /* 라이트 모드일 때: 다크 모드로 전환하기 위한 '달' 아이콘 (흰색 강조) */
        <Moon className="w-5 h-5 text-neutral-800 fill-neutral-100" />
      )}
    </button>
  );
}
