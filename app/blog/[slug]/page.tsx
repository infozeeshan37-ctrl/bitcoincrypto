import { articles } from "@/lib/blogData";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Clock, ArrowLeft, User, Share2, Sparkles, CheckCircle2, Bookmark } from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { ArticleJsonLd } from "@/components/seo/JsonLd";

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return {
      title: "Article Not Found | BitcoinCrypto.tech",
    };
  }

  return {
    title: `${article.title} | Research Desk`,
    description: article.excerpt,
    authors: [{ name: article.author }],
    keywords: [...article.tags, "bitcoin research", "crypto analytics", article.category],
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://www.bitcoincrypto.tech/blog/${article.slug}`,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
    },
  };
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
    <article className="py-10 sm:py-16 bg-white dark:bg-slate-950 transition-colors">
      <ArticleJsonLd article={article} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <Breadcrumbs
          items={[
            { label: "Research Desk", href: "/blog" },
            { label: article.title },
          ]}
        />

        {/* Back Link */}
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Research Desk
        </Link>

        {/* Article Header */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2.5 py-1 rounded-lg">
              {article.category}
            </span>
            <span className="text-slate-400 dark:text-slate-600">•</span>
            <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {article.readTime}
            </span>
            <span className="text-slate-400 dark:text-slate-600">•</span>
            <span className="text-slate-600 dark:text-slate-400">{article.publishedAt}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.2]">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            {article.excerpt}
          </p>

          {/* Author Badge */}
          <div className="flex items-center gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-bold flex items-center justify-center text-sm border border-amber-300/40">
              {article.author.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900 dark:text-white">{article.author}</div>
              <div className="text-xs text-amber-700 dark:text-amber-400 font-medium">{article.authorRole}</div>
            </div>
          </div>
        </div>

        {/* Key Takeaways Box */}
        {article.keyTakeaways && (
          <div className="bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/80 rounded-3xl p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-900 dark:text-amber-300 uppercase">
              <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              <span>Key Analytical Takeaways</span>
            </div>
            <div className="space-y-2">
              {article.keyTakeaways.map((takeaway, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Article Body Content */}
        <div className="space-y-8 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          {article.content.map((sec, sIdx) => (
            <div key={sIdx} className="space-y-4">
              {sec.heading && (
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white pt-4">
                  {sec.heading}
                </h2>
              )}
              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx} className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {p}
                </p>
              ))}
              {sec.callout && (
                <div className="my-6 p-6 rounded-2xl bg-slate-900 dark:bg-slate-900/90 text-white space-y-2 border border-slate-800">
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
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Related Articles Footer */}
        <div className="pt-10 border-t border-slate-200 dark:border-slate-800 space-y-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">Recommended Research Papers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {related.map((rel) => (
              <div key={rel.slug} className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 group">
                <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 rounded">
                  {rel.category}
                </span>
                <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                  <Link href={`/blog/${rel.slug}`}>
                    {rel.title}
                  </Link>
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{rel.excerpt}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </article>
  );
}
