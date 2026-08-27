import { notFound } from "next/navigation";
import Link from "next/link";
import { articles } from "@/lib/blogData";
import { ArrowLeft, Clock, Calendar, User } from "lucide-react";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <article className="py-16 sm:py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <Link href="/blog" className="inline-flex items-center gap-2 text-xs font-bold text-amber-600 hover:text-amber-700 transition">
          <ArrowLeft className="w-4 h-4" /> Back to all articles
        </Link>

        <div className="space-y-4">
          <span className="text-xs font-mono font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded">
            {article.category}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 border-b border-slate-200 pb-6">
            <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {article.author}</span>
            <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {article.publishedAt}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {article.readTime}</span>
          </div>
        </div>

        <div className="space-y-6 text-slate-700 leading-relaxed text-base pt-4">
          {article.content.map((p, idx) => (
            <p key={idx}>{p}</p>
          ))}
        </div>

        <div className="pt-10 border-t border-slate-200 mt-12">
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-slate-900 text-sm">Did you find this analysis helpful?</h4>
              <p className="text-xs text-slate-600 mt-0.5">Explore our trading concepts framework for more quantitative guides.</p>
            </div>
            <Link href="/concepts" className="px-4 py-2 rounded-xl text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 transition whitespace-nowrap">
              Explore Concepts
            </Link>
          </div>
        </div>

      </div>
    </article>
  );
}
