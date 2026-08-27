import Link from "next/link";
import { articles } from "@/lib/blogData";
import { BookOpen, Clock, ArrowRight } from "lucide-react";

export default function BlogIndexPage() {
  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <BookOpen className="w-3.5 h-3.5" /> Research Desk & Analysis
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Market Intelligence & Research
          </h1>
          <p className="text-base text-slate-600 max-w-2xl">
            In-depth macroeconomic commentary, on-chain structural breakdowns, and trading strategy frameworks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((art) => (
            <article key={art.slug} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between group hover:border-amber-300 transition">
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

              <div className="pt-4 mt-6 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="text-slate-500">{art.publishedAt}</span>
                <Link href={`/blog/${art.slug}`} className="font-bold text-amber-600 group-hover:text-amber-700 flex items-center gap-1">
                  Read article <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
}
