import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { allArticles, courseChapters, getArticleBySlug } from "@/lib/courseData";
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  Lightbulb, 
  ExternalLink, 
  ArrowRight, 
  ArrowLeft, 
  ShieldCheck, 
  Layers, 
  Cpu, 
  Share2, 
  Award 
} from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import AdBanner from "@/components/ads/AdBanner";
import ToolCitationWidget from "@/components/common/ToolCitationWidget";

export async function generateStaticParams() {
  return allArticles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    return {
      title: "Lesson Not Found | BitcoinCrypto.tech",
    };
  }

  const cleanDescription = article.content[0] 
    ? `${article.content[0].slice(0, 155)}...` 
    : `Master ${article.title} with our quantitative digital asset curriculum.`;

  return {
    title: `${article.title} | Crypto Masterclass | BitcoinCrypto.tech`,
    description: cleanDescription,
    keywords: [
      ...article.keyConcepts,
      article.chapterTitle,
      "crypto masterclass",
      "bitcoin education",
      "quantitative crypto analysis",
    ],
    alternates: {
      canonical: `/learn/${article.slug}`,
    },
    openGraph: {
      title: `${article.title} - Chapter ${article.chapterNumber}`,
      description: cleanDescription,
      url: `https://www.bitcoincrypto.tech/learn/${article.slug}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${article.title} | Crypto Learn`,
      description: cleanDescription,
    },
  };
}

export default async function LearnLessonPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const chapter = courseChapters.find((c) => c.id === article.chapterId);
  const currentIndex = allArticles.findIndex((a) => a.slug === article.slug);
  const prevLesson = currentIndex > 0 ? allArticles[currentIndex - 1] : null;
  const nextLesson = currentIndex < allArticles.length - 1 ? allArticles[currentIndex + 1] : null;

  const articleUrl = `https://www.bitcoincrypto.tech/learn/${article.slug}`;

  // Structured Data Schema for Search Quality & AdSense Compliance
  const lessonSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.content[0] || article.title,
    url: articleUrl,
    datePublished: "2026-08-01T00:00:00Z",
    dateModified: "2026-11-01T00:00:00Z",
    articleSection: chapter?.title || "Cryptocurrency Education",
    keywords: article.keyConcepts.join(", "),
    author: {
      "@type": "Organization",
      name: "BitcoinCrypto.tech Quantitative Research Desk",
      url: "https://www.bitcoincrypto.tech/authors/research-desk",
    },
    publisher: {
      "@type": "Organization",
      name: "BitcoinCrypto.tech",
      url: "https://www.bitcoincrypto.tech",
      logo: "https://www.bitcoincrypto.tech/favicon.ico",
    },
    isPartOf: {
      "@type": "Course",
      name: "Crypto Learn: Institutional Cryptocurrency Trading & Valuation Masterclass",
      url: "https://www.bitcoincrypto.tech/learn",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
  };

  return (
    <article className="py-10 sm:py-16 bg-white dark:bg-slate-950 transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(lessonSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Breadcrumb Navigation */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Crypto Learn", href: "/learn" },
            { 
              label: `Ch ${article.chapterNumber}: ${article.chapterBadge}`, 
              href: `/learn#${article.chapterId}` 
            },
            { label: article.title },
          ]}
        />

        {/* Top Back & Track Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs">
          <Link
            href="/learn"
            className="inline-flex items-center gap-1.5 font-bold text-slate-500 dark:text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Masterclass Index
          </Link>

          <div className="flex items-center gap-2">
            <span className="font-mono text-slate-400">
              Lesson {currentIndex + 1} of {allArticles.length}
            </span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="font-mono text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 rounded">
              Chapter {article.chapterNumber}
            </span>
          </div>
        </div>

        {/* Lesson Header */}
        <div className="space-y-5 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
            <span className="font-bold text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2.5 py-1 rounded-lg">
              {article.chapterBadge}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {article.duration} Read
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-600 dark:text-slate-400">
              Level: {article.chapterLevel}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.2]">
            {article.title}
          </h1>

          <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium">
            Part of <strong>Chapter {article.chapterNumber}: {article.chapterTitle}</strong>
          </p>

          {/* Author & Verification Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
            <Link
              href="/authors/research-desk"
              className="flex items-center gap-3 group"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 font-black text-sm flex items-center justify-center border border-amber-500/20 group-hover:scale-105 transition-transform">
                RD
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                  BitcoinCrypto Quantitative Research Desk
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400">
                  Curated &amp; Audited by Zeeshan Ahmed &amp; Elena Rostova
                </div>
              </div>
            </Link>

            <Link
              href="/editorial-policy"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1 rounded-lg border border-emerald-200/50 dark:border-emerald-800/50"
            >
              <ShieldCheck className="w-3.5 h-3.5" /> Fact-Checked &amp; Peer-Reviewed
            </Link>
          </div>
        </div>

        {/* Key Concepts Box */}
        {article.keyConcepts && article.keyConcepts.length > 0 && (
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-amber-600 dark:text-amber-400">
              <CheckCircle2 className="w-4 h-4" /> Core Learning Concepts
            </div>
            <ul className="grid grid-cols-1 gap-2.5">
              {article.keyConcepts.map((concept, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                  <span className="leading-relaxed">{concept}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Main Lesson Body Content */}
        <section className="space-y-6">
          {article.content.map((paragraph, pIdx) => (
            <p
              key={pIdx}
              className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed font-normal"
            >
              {paragraph}
            </p>
          ))}
        </section>

        {/* Mathematical Formula Box (If applicable) */}
        {article.formula && (
          <div className="p-6 rounded-3xl bg-slate-900 text-slate-100 border border-slate-800 space-y-4 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
                <Cpu className="w-4 h-4" /> Quantitative Formula: {article.formula.name}
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                LaTeX Specification
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 font-mono text-sm sm:text-base text-amber-300 overflow-x-auto border border-slate-800/80">
              <code>{article.formula.math}</code>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              <strong className="text-white">Mathematical Explanation:</strong> {article.formula.explanation}
            </p>
          </div>
        )}

        {/* Institutional Pro-Tip */}
        {article.proTip && (
          <div className="p-6 rounded-3xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/80 space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase text-amber-900 dark:text-amber-300">
              <Lightbulb className="w-4 h-4 text-amber-500" /> Institutional Execution Insight
            </div>
            <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed font-medium">
              {article.proTip}
            </p>
          </div>
        )}

        {/* Interactive Tool Integration */}
        {chapter?.linkedTool && (
          <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-500/10 via-blue-500/5 to-transparent border border-blue-200 dark:border-blue-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase font-bold text-blue-600 dark:text-blue-400">
                Interactive Learning Lab
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Apply This Lesson: {chapter.linkedTool.name}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                Simulate real market mechanics and test this lesson with interactive live data.
              </p>
            </div>
            <Link
              href={chapter.linkedTool.href}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white transition shrink-0 shadow-sm"
            >
              {chapter.linkedTool.actionText}
            </Link>
          </div>
        )}

        {/* Primary Research & Academic Sources */}
        {chapter?.references && chapter.references.length > 0 && (
          <div className="space-y-3 pt-6 border-t border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-slate-700 dark:text-slate-300 uppercase">
              <ExternalLink className="w-4 h-4 text-amber-500" />
              <span>Primary Research &amp; Verified Institutional Citations</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {chapter.references.map((ref, rIdx) => (
                <a
                  key={rIdx}
                  href={ref.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 transition flex items-center justify-between text-xs text-slate-700 dark:text-slate-300 font-semibold group"
                >
                  <div>
                    <div className="group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                      {ref.title}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono font-normal">
                      {ref.source} • {ref.type}
                    </div>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-500 shrink-0" />
                </a>
              ))}
            </div>
          </div>
        )}

        {/* AdSense Compliant Banner Slot */}
        <AdBanner format="auto" />

        {/* Citation Hub */}
        <ToolCitationWidget
          toolName={article.title}
          toolUrl={articleUrl}
          description={article.content[0] || article.title}
        />

        {/* Sequential Next / Previous Lesson Navigation */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {prevLesson ? (
            <Link
              href={`/learn/${prevLesson.slug}`}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400/50 dark:hover:border-amber-500/50 transition group space-y-1.5"
            >
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                <span>Previous Lesson</span>
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition line-clamp-1">
                {prevLesson.title}
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                Chapter {prevLesson.chapterNumber} • {prevLesson.duration}
              </div>
            </Link>
          ) : (
            <div className="p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50 text-xs text-slate-400 flex items-center">
              First lesson of the Masterclass
            </div>
          )}

          {nextLesson ? (
            <Link
              href={`/learn/${nextLesson.slug}`}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400/50 dark:hover:border-amber-500/50 transition group space-y-1.5 text-right sm:text-right"
            >
              <div className="flex items-center justify-end gap-1.5 text-xs text-slate-400 font-mono">
                <span>Next Lesson</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
              <div className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition line-clamp-1">
                {nextLesson.title}
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                Chapter {nextLesson.chapterNumber} • {nextLesson.duration}
              </div>
            </Link>
          ) : (
            <div className="p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800/50 text-xs text-slate-400 flex items-center justify-end">
              Masterclass Completed
            </div>
          )}
        </div>

        {/* Chapter Lessons Drawer / Roster */}
        {chapter && (
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  All Lessons in Chapter {chapter.chapterNumber}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {chapter.title} ({chapter.lessons.length} Lessons)
                </p>
              </div>
              <Link
                href="/learn"
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
              >
                Full Syllabus →
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2">
              {chapter.lessons.map((chLesson) => {
                const isCurrent = chLesson.slug === article.slug;
                return (
                  <Link
                    key={chLesson.slug}
                    href={`/learn/${chLesson.slug}`}
                    className={`p-3 rounded-xl border text-xs font-medium transition flex items-center justify-between gap-2 ${
                      isCurrent
                        ? "bg-amber-100 dark:bg-amber-950/60 border-amber-300 dark:border-amber-700/60 text-amber-900 dark:text-amber-200 font-bold"
                        : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-amber-400"
                    }`}
                  >
                    <span className="truncate">{chLesson.title}</span>
                    <span className="text-[10px] font-mono text-slate-400 shrink-0">
                      {chLesson.duration}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </article>
  );
}
