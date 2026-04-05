import { getMarkdownPageData } from "@/lib/markdown";
import ContentWithTocLayout from "@/components/ContentWithTocLayout";

export default async function AboutPage() {
  const aboutData = await getMarkdownPageData("public/about.md");

  return (
    <ContentWithTocLayout headings={aboutData.headings}>
      <div>
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">{aboutData.title}</h1>
          <time className="text-sm text-muted-foreground">Last updated: {aboutData.date}</time>
        </header>

        <div
          className="prose dark:prose-invert max-w-none prose-headings:scroll-mt-32"
          dangerouslySetInnerHTML={{ __html: aboutData.contentHtml || "" }}
        />
      </div>
    </ContentWithTocLayout>
  );
}
