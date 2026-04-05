import { getMarkdownPageData } from "@/lib/markdown";

export default async function AboutPage() {
  const aboutData = await getMarkdownPageData("public/about.md");
  const hasHeadings = aboutData.headings && aboutData.headings.length > 0;

  return (
    <div>
      <div className="w-full min-w-0">
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">{aboutData.title}</h1>
          <time className="text-sm text-muted-foreground">Last updated: {aboutData.date}</time>
        </header>

        <div 
          className="prose dark:prose-invert max-w-none
            prose-headings:scroll-mt-28"
          dangerouslySetInnerHTML={{ __html: aboutData.contentHtml || '' }} 
        />
      </div>

      {hasHeadings && (
        <aside className="hidden xl:block absolute left-full top-0 h-full">
          <div className="sticky top-24 ml-12 w-64">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground opacity-50 mb-6">
              On this page
            </h2>
            <nav className="space-y-4">
              {aboutData.headings?.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  className={`block text-[13px] transition-all duration-200 hover:translate-x-1 leading-snug hover:text-heading ${
                    heading.level === 3 
                      ? "pl-4 text-muted-foreground font-normal" 
                      : "text-muted font-bold"
                  }`}
                >
                  {heading.text}
                </a>
              ))}
            </nav>
          </div>
        </aside>
      )}
    </div>
  );
}
