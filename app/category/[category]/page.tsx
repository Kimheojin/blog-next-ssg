import { getSortedPostsData } from "@/lib/posts";
import Link from "next/link";

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  const categories = Array.from(new Set(posts.map(post => post.category)));
  return categories.map((category) => ({
    category,
  }));
}

export default async function CategoryDetailPage({ params }: { params: { category: string } }) {
  const { category } = await params;
  const allPosts = getSortedPostsData();
  
  const filteredPosts = allPosts.filter(post => post.category === category);

  return (
    <div className="max-w-3xl mx-auto px-6 space-y-12">
      <header className="flex items-baseline space-x-4">
        <h1 className="text-3xl font-bold uppercase tracking-tight">{category}</h1>
        <span className="text-lg text-muted-foreground font-mono">({filteredPosts.length})</span>
      </header>

      <div className="grid gap-6">
        {filteredPosts.map(({ slug, date, title }) => (
          <Link 
            href={`/posts/${slug.join('/')}`} 
            key={slug.join('/')}
            className="group block p-8 rounded-2xl transition-all card-base"
          >
            <div className="flex justify-end mb-3">
              <span className="text-xs text-muted-foreground font-mono">{date}</span>
            </div>
            <h3 className="text-xl font-bold group-hover:translate-x-1 transition-transform">
              {title}
            </h3>
            <p className="mt-4 text-sm text-muted flex items-center">
              Read article <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
            </p>
          </Link>
        ))}
      </div>

      <footer className="pt-8">
        <Link href="/category" className="text-sm font-bold text-muted-foreground hover:text-heading transition-colors">
          &larr; Back to all categories
        </Link>
      </footer>
    </div>
  );
}
