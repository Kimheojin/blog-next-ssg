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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="max-w-3xl mx-auto px-6 py-10">
          <header className="flex justify-between items-center mb-16">
            <a href="/" className="text-xl font-bold">SSG Blog</a>
            <nav className="space-x-6">
              <a href="/" className="text-sm font-medium">Home</a>
              <a href="/about" className="text-sm font-medium">About</a>
            </nav>
          </header>
          
          <main>{children}</main>

          <footer className="mt-20 py-10 border-t text-center opacity-40 text-xs tracking-widest uppercase">
            © 2026 My SSG Blog. Powered by Next.js
          </footer>
        </div>
      </body>
    </html>
  );
}
