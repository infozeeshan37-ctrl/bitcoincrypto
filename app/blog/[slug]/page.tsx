import { articles } from "@/lib/blogData";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Clock, ArrowLeft, User, Share2, Sparkles, CheckCircle2, Bookmark } from "lucide-react";

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
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

  const related = articles.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <article className="py-12 sm:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-amber-600 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Research Desk
        </Link>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-lg">
              {article.category}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {article.readTime}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600">{article.publishedAt}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.2]">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
            {article.excerpt}
          </p>

          {/* Author Badge */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
            <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-bold flex items-center justify-center text-sm">
              {article.author.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">{article.author}</div>
              <div className="text-xs text-amber-700 font-medium">{article.authorRole}</div>
            </div>
          </div>
        </div>

        {/* Key Takeaways Box */}
        {article.keyTakeaways && (
          <div className="bg-amber-50/70 border border-amber-200 rounded-3xl p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-900 uppercase">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Key Analytical Takeaways</span>
            </div>
            <div className="space-y-2">
              {article.keyTakeaways.map((takeaway, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Article Body Content */}
        <div className="space-y-8 text-sm sm:text-base text-slate-700 leading-relaxed">
          {article.content.map((sec, sIdx) => (
            <div key={sIdx} className="space-y-4">
              {sec.heading && (
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 pt-4">
                  {sec.heading}
                </h2>
              )}
              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-slate-700 leading-relaxed">
                  {p}
                </p>
              ))}
              {sec.callout && (
                <div className="my-6 p-6 rounded-2xl bg-slate-900 text-white space-y-2 border border-slate-800">
                  <div className="text-xs font-mono font-bold text-amber-400 uppercase">
                    {sec.callout.title}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {sec.callout.text}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tag Pills */}
        <div className="pt-8 border-t border-slate-200 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Articles Footer */}
        <div className="pt-10 border-t border-slate-200 space-y-6">
          <h3 className="text-xl font-bold text-slate-900">Recommended Research Papers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {related.map((rel) => (
              <div key={rel.slug} className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 group">
                <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">
                  {rel.category}
                </span>
                <h4 className="text-base font-bold text-slate-900 group-hover:text-amber-700 transition">
                  <Link href={`/blog/${rel.slug}`}>
                    {rel.title}
                  </Link>
                </h4>
                <p className="text-xs text-slate-500 line-clamp-2">{rel.excerpt}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </article>
  );
}
