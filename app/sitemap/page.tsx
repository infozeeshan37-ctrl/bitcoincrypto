import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { articles } from "@/lib/blogData";
import { coinPredictions } from "@/lib/coinPredictionsData";
import { conceptGuides } from "@/lib/conceptsData";
import { authors } from "@/lib/authorsData";
import { courseChapters } from "@/lib/courseData";
import {
  Compass,
  Cpu,
  Brain,
  BookOpen,
  GraduationCap,
  Sparkles,
  Users,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Layers,
  Activity,
  Flame,
  Calculator,
  Search,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Complete HTML Sitemap & Platform Directory | BitcoinCrypto.tech",
  description:
    "Comprehensive HTML directory of all 220+ pages on BitcoinCrypto.tech: 10 interactive crypto trading tools, 48 coin AI price predictions, 16 macro research papers, 100 masterclass lessons, and regulatory trust disclosures.",
  alternates: {
    canonical: "https://www.bitcoincrypto.tech/sitemap",
  },
  openGraph: {
    title: "Complete HTML Sitemap & Platform Directory | BitcoinCrypto.tech",
    description:
      "Explore all 220+ pages on BitcoinCrypto.tech: algorithmic tools, 5-minute price predictions, macro papers, 100-lesson crypto course, and compliance policies.",
    url: "https://www.bitcoincrypto.tech/sitemap",
    type: "website",
    siteName: "BitcoinCrypto.tech",
  },
  twitter: {
    card: "summary_large_image",
    title: "Complete HTML Sitemap & Platform Directory | BitcoinCrypto.tech",
    description: "Explore all 220+ pages, tools, predictions, and research papers on BitcoinCrypto.tech.",
  },
};

const DEDICATED_TOOLS = [
  { slug: "trading-bot", name: "AI Trading Signals & Copilot Terminal", desc: "Tri-pillar algorithmic Long/Short trade signals with dynamic TP/SL levels." },
  { slug: "chart-terminal", name: "Live Advanced Chart Terminal", desc: "Multi-timeframe TradingView candlestick charts with technical indicators." },
  { slug: "dca-simulator", name: "Dynamic DCA Simulator & Backtest", desc: "Mathematical dollar-cost-averaging harmonic mean modeling and portfolio projections." },
  { slug: "position-sizer", name: "Risk Management & Position Sizer", desc: "Exact capital risk, liquidation price safety distance, and leverage calculator." },
  { slug: "crypto-converter", name: "Real-Time Spot Crypto Converter", desc: "Institutional sub-second price conversions across 50+ digital assets and fiat." },
  { slug: "liquidation-heatmap", name: "CoinGlass Liquidation Heatmap", desc: "Multi-exchange liquidation clusters, resting leverage pools, and short squeeze screener." },
  { slug: "fear-greed-index", name: "Crypto Fear & Greed Sentiment Index", desc: "Aggregated market sentiment scoring, volatility metrics, and social momentum." },
  { slug: "profit-calculator", name: "Cryptocurrency Profit & Loss Calculator", desc: "Simulate spot and perpetual futures PnL, funding cost deductions, and net yield." },
  { slug: "funding-rate-screener", name: "Perpetual Funding Rate Screener", desc: "Cross-exchange 8-hour funding rate comparisons and delta-neutral cash-and-carry basis arbitrage." },
  { slug: "whale-tracker", name: "Institutional Whale Orders & Block Radar", desc: "Real-time limit walls, large block orders ($500k+), and resting depth visualizer." },
];

const STATIC_HUB_PAGES = [
  { href: "/", label: "Homepage / Trading Suite", desc: "Live algorithmic trading bot, scanner, and market intelligence suite." },
  { href: "/predictions", label: "AI Price Predictions Arena", desc: "5-minute epoch and multi-horizon price prediction engine." },
  { href: "/markets", label: "Spot Coin Rankings & Volume", desc: "Real-time market cap rankings, 24h volume, and Bitcoin dominance." },
  { href: "/coinglass", label: "CoinGlass Liquidation Radar", desc: "Spectrogram heatmaps and perpetual futures open interest." },
  { href: "/orderbook", label: "L2 Order Book Depth", desc: "Level-2 central limit order book depth and CVD absorption." },
  { href: "/whale-orders", label: "Whale Orders & Limit Walls", desc: "Live institutional block orders and resting depth bands." },
  { href: "/cpi", label: "US CPI Macroeconomic Calendar", desc: "Inflation releases, Fed interest rate cuts, and macroeconomic outlook." },
  { href: "/tools", label: "Tools Hub & Directory", desc: "Complete suite of 10 free institutional digital asset tools." },
  { href: "/news", label: "Live Crypto News Wire", desc: "Real-time news wire covering ETF flows, Fed policy, and macro developments." },
  { href: "/concepts", label: "Quantitative Concepts Hub", desc: "12 foundational quantitative trading and market structure guides." },
  { href: "/learn", label: "Crypto Learn Masterclass Hub", desc: "10-chapter, 100-article curriculum from cryptography to risk management." },
  { href: "/learn/technical", label: "Technical Analysis Track", desc: "Dedicated learning path for market structure, order flow, and charts." },
  { href: "/learn/fundamental", label: "Fundamental Analysis Track", desc: "Dedicated learning path for on-chain valuation, tokenomics, and macro." },
  { href: "/blog", label: "Macro Research Desk", desc: "16 institutional research whitepapers on liquidity and sovereign debt." },
  { href: "/authors", label: "Author Directory & Researchers", desc: "Verified credentials, biographies, and publications of our quantitative team." },
];

const COMPLIANCE_PAGES = [
  { href: "/privacy", label: "Privacy Policy & Cookie Disclosure", desc: "Google AdSense, DART cookies, GDPR, CCPA, and data protection terms." },
  { href: "/terms", label: "Terms of Service", desc: "Platform terms, non-commercial use, and educational guidelines." },
  { href: "/disclaimer", label: "Financial & Risk Disclaimer", desc: "Strict educational research notice, paper trading disclosure, zero investment advice." },
  { href: "/cookie-policy", label: "Cookie Policy", desc: "Detailed breakdown of essential, analytics, and third-party advertising cookies." },
  { href: "/editorial-policy", label: "Editorial Policy & Methodology", desc: "Fact-checking protocols, data sourcing standards, and E-E-A-T integrity guidelines." },
  { href: "/about", label: "About Us & Architecture", desc: "Platform mission, team credentials, AI engine architecture, and contact info." },
  { href: "/contact", label: "Contact Us & Support Desk", desc: "Direct inquiry form, editorial email, response commitment, and office details." },
];

export default function HtmlSitemapPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemPage",
    "name": "Complete HTML Sitemap & Platform Directory",
    "description": "Comprehensive HTML index of all 220+ pages on BitcoinCrypto.tech.",
    "url": "https://www.bitcoincrypto.tech/sitemap",
    "isPartOf": {
      "@type": "WebSite",
      "name": "BitcoinCrypto.tech",
      "url": "https://www.bitcoincrypto.tech",
    },
    "breadcrumb": {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.bitcoincrypto.tech" },
        { "@type": "ListItem", "position": 2, "name": "HTML Sitemap", "item": "https://www.bitcoincrypto.tech/sitemap" },
      ],
    },
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-10 sm:py-16 transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "HTML Sitemap", href: "/sitemap" },
          ]}
        />

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            <span>Complete Platform Index &amp; HTML Sitemap</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
            Platform Directory &amp; All 220+ Pages
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
            Welcome to the official, search-engine-accessible directory of <strong>BitcoinCrypto.tech</strong>. Below you will find every published educational lesson, institutional research paper, quantitative price prediction model, interactive terminal, and compliance policy.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>220+ Live URLs Indexed</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Zero Broken Links</span>
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>XML Sitemap: <Link href="/sitemap.xml" className="text-amber-400 hover:underline">/sitemap.xml</Link></span>
            </span>
          </div>
        </div>

        {/* Quick Jump Navigation */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2 text-xs font-bold">
          <span className="text-slate-400 uppercase tracking-wider text-[11px] mr-2">Jump to:</span>
          {[
            { href: "#core-hubs", label: "Core Hubs" },
            { href: "#tools", label: "Interactive Tools (10)" },
            { href: "#predictions", label: "AI Predictions (48)" },
            { href: "#macro-research", label: "Research Desk (16)" },
            { href: "#course-lessons", label: "Masterclass Lessons (100)" },
            { href: "#concepts", label: "Market Concepts (12)" },
            { href: "#authors", label: "Authors (5)" },
            { href: "#legal-trust", label: "Legal & Trust" },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-400 hover:text-slate-950 dark:hover:bg-amber-400 dark:hover:text-slate-950 transition text-slate-700 dark:text-slate-300"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* 1. Core Landing Pages & Hubs */}
        <section id="core-hubs" className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <Compass className="w-5 h-5 text-amber-500" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              1. Core Platform Hubs &amp; Live Dashboards
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {STATIC_HUB_PAGES.map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400/60 dark:hover:border-amber-400/60 transition group shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-amber-500 transition">
                    {page.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2">
                  {page.desc}
                </p>
                <span className="text-[10px] font-mono text-slate-400 block mt-2">
                  {page.href}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 2. Dedicated Interactive Tools */}
        <section id="tools" className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <Cpu className="w-5 h-5 text-blue-500" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              2. Interactive Quantitative Tools &amp; Terminals (10 Tools)
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEDICATED_TOOLS.map((tool) => (
              <Link
                key={tool.slug}
                href={`/tools/${tool.slug}`}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400/60 dark:hover:border-blue-400/60 transition group shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-500 transition">
                    {tool.name}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 group-hover:translate-x-0.5 transition" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2">
                  {tool.desc}
                </p>
                <span className="text-[10px] font-mono text-slate-400 block mt-2">
                  /tools/{tool.slug}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 3. AI Price Predictions (48 Coins) */}
        <section id="predictions" className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                3. Quantitative AI Price Prediction Models ({coinPredictions.length} Assets)
              </h2>
            </div>
            <Link href="/predictions" className="text-xs font-bold text-purple-500 hover:underline">
              View All Predictions &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {coinPredictions.map((coin) => (
              <Link
                key={coin.slug}
                href={`/predictions/${coin.slug}`}
                className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-400/60 transition group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-slate-900 dark:text-white group-hover:text-purple-400 transition">
                      {coin.symbol}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-500">
                      ${coin.currentPriceUsd > 1 ? coin.currentPriceUsd.toLocaleString() : coin.currentPriceUsd.toFixed(4)}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 truncate block mt-0.5">
                    {coin.name}
                  </span>
                </div>
                <span className="text-[9px] font-mono text-purple-500 mt-2 block">
                  /predictions/{coin.slug}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 4. Institutional Macro Research Desk (16 Articles) */}
        <section id="macro-research" className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-500" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                4. Institutional Macro Research Desk ({articles.length} In-Depth Papers)
              </h2>
            </div>
            <Link href="/blog" className="text-xs font-bold text-emerald-500 hover:underline">
              View Research Desk &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles.map((art) => (
              <Link
                key={art.slug}
                href={`/blog/${art.slug}`}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-400/60 transition group shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span className="text-emerald-500 font-bold">{art.category}</span>
                    <span>{art.readTime}</span>
                  </div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-emerald-500 transition line-clamp-2 leading-snug">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2">
                    {art.excerpt}
                  </p>
                </div>
                <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>By {art.author.split("&")[0].trim()}</span>
                  <span className="text-emerald-500 group-hover:translate-x-0.5 transition">&rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* 5. Complete 100-Article Crypto Learn Masterclass */}
        <section id="course-lessons" className="space-y-6">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-amber-500" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                5. Complete 100-Article Masterclass (10 Chapters)
              </h2>
            </div>
            <Link href="/learn" className="text-xs font-bold text-amber-500 hover:underline">
              View Masterclass Hub &rarr;
            </Link>
          </div>

          <div className="space-y-6">
            {courseChapters.map((chapter) => (
              <div
                key={chapter.id}
                className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-500">
                      Chapter {chapter.chapterNumber} • {chapter.badge}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {chapter.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-slate-400 shrink-0">
                    {chapter.lessons.length} Lessons • {chapter.level}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {chapter.lessons.map((lesson) => (
                    <Link
                      key={lesson.slug}
                      href={`/learn/${lesson.slug}`}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-50 dark:hover:bg-amber-950/40 border border-slate-200/80 dark:border-slate-700/80 hover:border-amber-400/60 transition group flex items-center justify-between gap-2"
                    >
                      <div className="truncate">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-500 transition truncate block">
                          {lesson.title}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {lesson.duration}
                        </span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-500 shrink-0 transition" />
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 6. Quantitative Market Structure Concepts (12 Guides) */}
        <section id="concepts" className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-indigo-500" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                6. Quantitative Market Structure Concepts ({conceptGuides.length} Guides)
              </h2>
            </div>
            <Link href="/concepts" className="text-xs font-bold text-indigo-500 hover:underline">
              View All Concepts &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {conceptGuides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/concepts/${guide.slug}`}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-400/60 transition group shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-indigo-500 transition">
                    {guide.title}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2">
                  {guide.summary}
                </p>
                <span className="text-[10px] font-mono text-slate-400 block mt-2">
                  /concepts/{guide.slug}
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* 7. Editorial Authors & Quantitative Researchers */}
        <section id="authors" className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-amber-500" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                7. Verified Authors &amp; Quantitative Researchers ({authors.length} Profiles)
              </h2>
            </div>
            <Link href="/authors" className="text-xs font-bold text-amber-500 hover:underline">
              View Author Directory &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {authors.map((author) => (
              <Link
                key={author.slug}
                href={`/authors/${author.slug}`}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400/60 transition group shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-amber-500 transition">
                    {author.name}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition" />
                </div>
                <span className="text-[11px] text-amber-600 dark:text-amber-400 font-semibold block mt-0.5">
                  {author.role}
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2">
                  {author.bio}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* 8. Legal, Regulatory & Trust Disclosures */}
        <section id="legal-trust" className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
            <ShieldCheck className="w-5 h-5 text-rose-500" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              8. Legal, Regulatory &amp; Trust Compliance (AdSense Compliant)
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMPLIANCE_PAGES.map((policy) => (
              <Link
                key={policy.href}
                href={policy.href}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-400/60 transition group shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-rose-500 transition">
                    {policy.label}
                  </span>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-rose-500 group-hover:translate-x-0.5 transition" />
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2">
                  {policy.desc}
                </p>
                <span className="text-[10px] font-mono text-slate-400 block mt-2">
                  {policy.href}
                </span>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
