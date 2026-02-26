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
              className="group block p-8 border rounded-2xl hover:border-black dark:hover:border-white transition-all bg-neutral-50/50 dark:bg-neutral-900/50"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-neutral-400">
                  {category}
                </span>
                <span className="text-xs text-neutral-400 font-mono">{date}</span>
              </div>
              <h3 className="text-xl font-bold group-hover:translate-x-1 transition-transform">
                {title}
              </h3>
              <p className="mt-4 text-sm text-neutral-500 flex items-center">
                Read article <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
