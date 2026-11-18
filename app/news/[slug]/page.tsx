import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getUniqueNewsArticles,
  getNewsArticleBySlug,
  HISTORICAL_NEWS_ARCHIVE,
  HistoricalNewsItem
} from "@/lib/newsArchive";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import AdBanner from "@/components/ads/AdBanner";
import ToolCitationWidget from "@/components/common/ToolCitationWidget";
import AuthoritativeCitations from "@/components/common/AuthoritativeCitations";
import {
  Clock,
  User,
  ShieldCheck,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Lightbulb,
  ExternalLink,
  Flame,
  Layers,
  Coins,
  Share2,
  Calendar
} from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = getUniqueNewsArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsArticleBySlug(slug);

  if (!article) {
    return {
      title: "Crypto News Article Not Found | BitcoinCrypto.tech",
    };
  }

  const cleanDescription = article.summary || article.paragraphs[0]?.slice(0, 160) || "Cryptocurrency market news and macroeconomic analysis.";

  return {
    title: `${article.title} | Crypto News Wire | BitcoinCrypto.tech`,
    description: cleanDescription,
    keywords: [
      article.category.toLowerCase(),
      "crypto news",
      "bitcoin intelligence",
      "macroeconomic crypto update",
      ...article.affectedCoins.map((c) => c.name.toLowerCase()),
      ...article.affectedCoins.map((c) => c.symbol.toLowerCase()),
    ],
    alternates: {
      canonical: `https://www.bitcoincrypto.tech/news/${article.slug}`,
    },
    openGraph: {
      title: `${article.title} | BitcoinCrypto.tech`,
      description: cleanDescription,
      url: `https://www.bitcoincrypto.tech/news/${article.slug}`,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      images: [
        {
          url: article.imageUrl || "https://www.bitcoincrypto.tech/images/social-preview.png",
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: cleanDescription,
      creator: "@bitcoincrypto",
    },
  };
}

function getAuthorSlug(authorName: string): string {
  const name = authorName.toLowerCase();
  if (name.includes("elena") || name.includes("helena")) return "elena-rostova";
  if (name.includes("vance")) return "marcus-vance";
  if (name.includes("zeeshan")) return "zeeshan-ahmed";
  if (name.includes("weiss") || name.includes("chen")) return "dr-sarah-chen";
  return "research-desk";
}

export default async function NewsArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getNewsArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const authorSlug = getAuthorSlug(article.author.name);
  const isBull = article.sentiment === "BULLISH";
  const isBear = article.sentiment === "BEARISH";

  // Get related articles in the same category or overall
  const relatedArticles = getUniqueNewsArticles()
    .filter((a) => a.slug !== article.slug && (a.category === article.category || a.sentiment === article.sentiment))
    .slice(0, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.summary,
    image: [article.imageUrl || "https://www.bitcoincrypto.tech/images/social-preview.png"],
    datePublished: article.publishedAt,
    dateModified: article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
      url: `https://www.bitcoincrypto.tech/authors/${authorSlug}`
    },
    publisher: {
      "@type": "NewsMediaOrganization",
      name: "BitcoinCrypto.tech News Wire",
      url: "https://www.bitcoincrypto.tech",
      logo: {
        "@type": "ImageObject",
        url: "https://www.bitcoincrypto.tech/images/social-preview.png"
      }
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://www.bitcoincrypto.tech/news/${article.slug}`
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 sm:py-12 transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Navigation Breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "News Wire", href: "/news" },
            { label: article.category, href: "/news" },
            { label: article.title }
          ]}
        />

        {/* Back link */}
        <div>
          <Link
            href="/news"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Live News Wire &amp; Macroeconomic Terminal</span>
          </Link>
        </div>

        {/* Educational Compliance Notice */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-slate-800 dark:text-slate-200 text-xs flex items-start gap-3">
          <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Editorial &amp; Non-Financial Notice:</strong> This article is published for educational market intelligence and quantitative research purposes only. <strong>BitcoinCrypto.tech does NOT provide financial, investment, or gambling advice.</strong> Cryptocurrency markets involve high volatility.
          </p>
        </div>

        {/* Article Header Card */}
        <article className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-10 space-y-6">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                {article.category}
              </span>
              <span
                className={`px-3 py-1 rounded-full font-bold ${
                  isBull
                    ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300"
                    : isBear
                    ? "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                }`}
              >
                {article.sentiment} OUTLOOK
              </span>
              <span className="px-2.5 py-1 rounded-full font-bold bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300">
                Impact: {article.marketImpact}
              </span>
            </div>

            <div className="flex items-center gap-3 text-slate-400">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {new Date(article.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          {/* Main H1 Title */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-tight tracking-tight">
            {article.title}
          </h1>

          {/* Author Byline */}
          <div className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-black flex items-center justify-center text-sm shadow-xs">
                {article.author.name.charAt(0)}
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Link href={`/authors/${authorSlug}`} className="hover:text-amber-500 hover:underline">
                    {article.author.name}
                  </Link>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-sm bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                    ✓ Verified Analyst
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {article.author.role} • {article.author.desk}
                </p>
              </div>
            </div>

            <div className="text-right text-xs text-slate-400 hidden sm:block font-mono">
              <span>Source Feed: <strong className="text-slate-900 dark:text-white">{article.source}</strong></span>
            </div>
          </div>

          {/* Featured Image if Available */}
          {article.imageUrl && (
            <div className="rounded-2xl overflow-hidden aspect-video bg-slate-950 border border-slate-200 dark:border-slate-800">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Executive Summary */}
          <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-900/40 space-y-2">
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 flex items-center gap-1.5">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Executive Briefing</span>
            </div>
            <p className="text-sm sm:text-base text-slate-800 dark:text-slate-200 leading-relaxed font-medium">
              {article.summary}
            </p>
          </div>

          {/* Key Takeaways Card */}
          {article.keyTakeaways && article.keyTakeaways.length > 0 && (
            <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Key Analytical Takeaways</span>
              </h2>
              <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                {article.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                    <span className="leading-relaxed">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Institutional Why It Matters */}
          {article.whyItMatters && (
            <div className="p-5 sm:p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 space-y-2">
              <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 flex items-center gap-2">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Why This Matters for Crypto Markets</span>
              </h2>
              <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-100 leading-relaxed font-medium">
                {article.whyItMatters}
              </p>
            </div>
          )}

          {/* In-Depth Article Body Paragraphs */}
          <div className="space-y-5 pt-4 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white pt-2">
              Market Context &amp; Structural Breakdown
            </h2>
            {article.paragraphs.map((p, idx) => (
              <p key={idx} className="leading-relaxed">
                {p}
              </p>
            ))}
          </div>

          {/* Affected Assets / Coins Grid */}
          {article.affectedCoins && article.affectedCoins.length > 0 && (
            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-amber-500" />
                <span>Directly Affected Crypto Assets</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {article.affectedCoins.map((coin, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-white">
                        {coin.name} ({coin.symbol})
                      </div>
                      {coin.expectedRange && (
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                          Range: {coin.expectedRange}
                        </div>
                      )}
                    </div>
                    <span
                      className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md ${
                        coin.impact === "BULLISH"
                          ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300"
                          : coin.impact === "BEARISH"
                          ? "bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {coin.impact}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Primary Source Verification */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span className="text-slate-600 dark:text-slate-300">
                Primary Registry Feed: <strong className="text-slate-900 dark:text-white">{article.source}</strong>
              </span>
            </div>
            {article.sourceUrl && (
              <a
                href={article.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-bold"
              >
                <span>Verify Source Documentation</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </article>

        {/* AdSense Compliant Banner Slot */}
        <AdBanner format="auto" />

        {/* Related News & Market Intelligence */}
        {relatedArticles.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-500" />
              <span>Related Market Intelligence &amp; Breaking Analysis</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/news/${rel.slug}`}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-500 transition shadow-xs flex flex-col justify-between space-y-3 group"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300">
                      {rel.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors line-clamp-2">
                      {rel.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                      {rel.summary}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:underline pt-2 border-t border-slate-100 dark:border-slate-800">
                    <span>Read Article</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Interactive Tool Cross-Linking */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/predictions"
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-400 transition text-center space-y-1.5 shadow-xs"
          >
            <div className="text-xs font-mono font-bold text-purple-600 dark:text-purple-400 uppercase">AI Tool</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">5-Min AI Price Predictions</div>
            <p className="text-[11px] text-slate-500">Next-candle forecast models for 37+ coins</p>
          </Link>

          <Link
            href="/coinglass"
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-400 transition text-center space-y-1.5 shadow-xs"
          >
            <div className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 uppercase">Derivatives</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">CoinGlass Liquidation Map</div>
            <p className="text-[11px] text-slate-500">2D heatmap &amp; short squeeze hazard screener</p>
          </Link>

          <Link
            href="/learn"
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 transition text-center space-y-1.5 shadow-xs"
          >
            <div className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase">Education</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white">100-Article Masterclass</div>
            <p className="text-[11px] text-slate-500">From Bitcoin consensus to advanced order flow</p>
          </Link>
        </div>

        {/* Authoritative Citations & Backlinks */}
        <AuthoritativeCitations
          title="Official Macroeconomic & Cryptocurrency Data Sources"
          description="Every headline, inflation release, and ETF flow metric is cross-referenced with primary regulatory registries, Federal Reserve publications, and direct exchange settlement feeds."
          pageUrl={`https://www.bitcoincrypto.tech/news/${article.slug}`}
          pageTitle={article.title}
        />

        {/* Citation & Embed Tool */}
        <ToolCitationWidget
          toolName={article.title}
          toolUrl={`https://www.bitcoincrypto.tech/news/${article.slug}`}
          description={article.summary}
        />
      </div>
    </main>
  );
}
