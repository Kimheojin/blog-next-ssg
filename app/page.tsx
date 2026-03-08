import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";

export default function Home() {
  const allPostsData = getSortedPostsData();

  return (
    <div className="max-w-3xl mx-auto px-6 space-y-12">
      <section>
        <h2 className="text-2xl font-bold mb-8 tracking-tight">Recent Articles</h2>
        <div className="grid gap-6">
          {allPostsData.map(({ slug, date, title, category }) => (
            <Link 
              href={`/posts/${slug.join('/')}`} 
              key={slug.join('/')}
              className="group block p-6 rounded-2xl card-base"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">
                  {category}
                </span>
                <span className="text-xs text-muted-foreground font-mono">{date}</span>
              </div>
              <h3 className="text-xl font-bold group-hover:translate-x-1 transition-transform">
                {title}
              </h3>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
