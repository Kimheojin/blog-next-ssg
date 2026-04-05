import type { ReactNode } from "react";
import TableOfContents from "@/components/TableOfContents";
import type { Heading } from "@/lib/markdown";

interface ContentWithTocLayoutProps {
  children: ReactNode;
  headings?: Heading[];
}

export default function ContentWithTocLayout({
  children,
  headings,
}: ContentWithTocLayoutProps) {
  const hasHeadings = Boolean(headings?.length);
  const layoutClassName = hasHeadings
    ? "xl:grid xl:w-[calc(100%+19rem)] xl:grid-cols-[minmax(0,1fr)_16rem] xl:items-start xl:gap-12"
    : "";
  const tocPositionStyle = {
    right: "max(1.5rem, calc((100vw - 56rem) / 2 - 19rem))",
  } as const;

  return (
    <div className={layoutClassName}>
      <div className="w-full min-w-0">{children}</div>
      {hasHeadings && (
        <div className="hidden xl:block xl:w-64">
          <div className="xl:fixed xl:top-24 xl:w-64" style={tocPositionStyle}>
            <TableOfContents headings={headings} />
          </div>
        </div>
      )}
    </div>
  );
}
