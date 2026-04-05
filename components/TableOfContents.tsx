import { Heading } from "@/lib/markdown";

interface TableOfContentsProps {
  headings?: Heading[];
}

const headingLevelStyles: Record<number, string> = {
  2: "text-muted font-bold",
  3: "pl-4 text-muted-foreground font-medium",
  4: "pl-8 text-muted-foreground/80 font-normal",
};

function getHeadingClassName(level: number) {
  return headingLevelStyles[level] ?? headingLevelStyles[4];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  if (!headings?.length) {
    return null;
  }

  return (
    <aside className="w-64">
      <div className="flex max-h-[calc(100vh-8rem)] flex-col">
        <h2 className="mb-6 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground opacity-50">
          On this page
        </h2>
        <nav className="flex flex-col space-y-4 overflow-y-auto pr-3">
          {headings.map((heading) => (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              className={`block text-[13px] leading-snug transition-all duration-200 hover:translate-x-1 hover:text-heading ${getHeadingClassName(heading.level)}`}
            >
              {heading.text}
            </a>
          ))}
        </nav>
      </div>
    </aside>
  );
}
