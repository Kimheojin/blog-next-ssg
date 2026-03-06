import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ScrollToTop } from "@/components/ScrollToTop";

export const metadata: Metadata = {
  title: "허진 블로그",
  description: "개발 블로그",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body className="font-sans" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">
            <header className="w-full max-w-3xl mx-auto px-6 py-12 flex justify-between items-center">
              <a href="/" className="text-xl font-bold tracking-tight hover:opacity-70 transition-opacity">
                허진 블로그
              </a>
              <nav className="flex space-x-6">
                <a href="/" className="text-sm font-medium text-muted hover:text-heading transition-colors">Home</a>
                <a href="/category" className="text-sm font-medium text-muted hover:text-heading transition-colors">Category</a>
                <a href="/about" className="text-sm font-medium text-muted hover:text-heading transition-colors">About</a>
              </nav>
            </header>
            
            <main className="flex-grow w-full">
              {children}
            </main>

            <footer className="w-full max-w-3xl mx-auto px-6 py-16 mt-20 border-t border-[var(--border)]">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  © 2026 
                </p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">
                  Powered by Next.js
                </p>
              </div>
            </footer>
          </div>
          <ThemeToggle />
          <ScrollToTop />
        </ThemeProvider>
      </body>
    </html>
  );
}
