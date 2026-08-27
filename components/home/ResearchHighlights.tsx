import Link from "next/link";
import { articles } from "@/lib/blogData";
import { BookOpen, ArrowRight, Clock } from "lucide-react";

export default function ResearchHighlights() {
  return (
    <section className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
              <BookOpen className="w-3.5 h-3.5" /> Research Desk
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">Featured Market Analysis</h2>
            <p className="text-sm text-slate-600 mt-1">Deep macroeconomic articles and technical research reports.</p>
          </div>
          <Link href="/blog" className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 transition">
            Explore All Research <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article key={art.slug} className="bg-slate-50/60 rounded-2xl p-6 border border-slate-200 hover:border-amber-300 transition flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span className="font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded text-[10px]">
                    {art.category}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {art.readTime}
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition leading-snug">
                  {art.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {art.excerpt}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-slate-200/80 flex items-center justify-between text-xs">
                <span className="text-slate-500">By {art.author}</span>
                <Link href={`/blog/${art.slug}`} className="font-bold text-amber-600 group-hover:text-amber-700 flex items-center gap-1">
                  Read article <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}
