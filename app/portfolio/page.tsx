import type { Metadata } from "next";
import { getMarkdownPageData } from "@/lib/markdown";
import ContentWithTocLayout from "@/components/ContentWithTocLayout";
import ZoomImageHandler from "@/components/ZoomImageHandler";

export const metadata: Metadata = {
  title: "Portfolio | 허진 블로그",
  description: "허진의 포트폴리오",
  alternates: {
    canonical: "/portfolio",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function PortfolioPage() {
  const portfolioData = await getMarkdownPageData("public/portfolio.md");

  return (
    <ContentWithTocLayout headings={portfolioData.headings}>
      <div>
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">{portfolioData.title}</h1>
          <time className="text-sm text-muted-foreground">Last updated: {portfolioData.date}</time>
        </header>

        <div
          className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-32"
          dangerouslySetInnerHTML={{ __html: portfolioData.contentHtml || "" }}
        />
        <ZoomImageHandler />
      </div>
    </ContentWithTocLayout>
  );
}
