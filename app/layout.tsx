import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My SSG Blog",
  description: "Next.js로 만든 정적 블로그",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans`}
      >
        <div className="flex flex-col min-h-screen">
          <header className="w-full max-w-3xl mx-auto px-6 py-12 flex justify-between items-center">
            <a href="/" className="text-xl font-bold tracking-tight hover:opacity-70 transition-opacity">
              SSG Blog
            </a>
            <nav className="flex space-x-6">
              <a href="/" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">Home</a>
              <a href="/category" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">Category</a>
              <a href="/about" className="text-sm font-medium text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100">About</a>
            </nav>
          </header>
          
          <main className="flex-grow w-full">
            {children}
          </main>

          <footer className="w-full max-w-3xl mx-auto px-6 py-16 mt-20 border-t border-neutral-100 dark:border-neutral-900">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-neutral-400">
                © 2026 My SSG Blog.
              </p>
              <p className="text-xs text-neutral-400 uppercase tracking-widest">
                Powered by Next.js
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
