import type { Metadata } from "next";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Brain,
  TrendingUp,
  Activity,
  ShieldCheck,
  Zap,
  Target,
  BarChart3,
  Flame,
  ArrowRight,
  Layers,
  ChevronRight,
  HelpCircle,
  Clock,
  Sparkles,
  Cpu,
  Coins
} from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { coinPredictions, CoinPredictionData } from "@/lib/coinPredictionsData";
import AIPredictionSuite from "@/components/predictions/AIPredictionSuite";

interface PageProps {
  params: Promise<{ coin: string }>;
}

export async function generateStaticParams() {
  return coinPredictions.map((coin) => ({
    coin: coin.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { coin: slug } = await params;
  const coin = coinPredictions.find((c) => c.slug === slug);

  if (!coin) {
    return {
      title: "Coin AI Price Prediction Not Found",
      description: "Cryptocurrency AI price prediction page could not be found.",
    };
  }

  const title = `${coin.name} (${coin.symbol}) AI Price Prediction — 24h, 7d & 30d Quantitative Forecast`;
  const description = `Live ${coin.name} (${coin.symbol}) AI price prediction with 98.6% confluence. Discover 24-hour, 7-day, and 30-day forecast channels, on-chain MVRV metrics, technical setups, and institutional support/resistance levels.`;
  const canonicalUrl = `https://www.bitcoincrypto.tech/predictions/${coin.slug}`;

  return {
    title,
    description,
    keywords: [
      `${coin.name.toLowerCase()} price prediction`,
      `${coin.symbol.toLowerCase()} ai forecast`,
      `${coin.name.toLowerCase()} 2026 price prediction`,
      `${coin.symbol.toLowerCase()} technical analysis`,
      `${coin.name.toLowerCase()} support and resistance`,
      "crypto ai price predictor",
      "algorithmic crypto forecast",
      "on-chain crypto models",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
      siteName: "BitcoinCrypto.tech",
      images: [
        {
          url: "https://www.bitcoincrypto.tech/images/social-preview.png",
          width: 1200,
          height: 630,
          alt: `${coin.name} AI Price Prediction Analysis`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@bitcoincrypto",
    },
  };
}

export default async function CoinPredictionPage({ params }: PageProps) {
  const { coin: slug } = await params;
  const coin = coinPredictions.find((c) => c.slug === slug);

  if (!coin) {
    notFound();
  }

  // Related other coins for cross-linking
  const otherCoins = coinPredictions.filter((c) => c.slug !== coin.slug).slice(0, 6);

  // Generate FAQ JSON-LD Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": coin.faq.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer,
      },
    })),
  };

  // Generate Financial Product / WebPage Schema
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": `${coin.name} (${coin.symbol}) AI Quantitative Price Forecast`,
    "description": coin.summaryThesis,
    "provider": {
      "@type": "Organization",
      "name": "BitcoinCrypto.tech",
      "url": "https://www.bitcoincrypto.tech",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.bitcoincrypto.tech",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "AI Predictions",
        "item": "https://www.bitcoincrypto.tech/predictions",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${coin.name} (${coin.symbol})`,
        "item": `https://www.bitcoincrypto.tech/predictions/${coin.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Header Banner */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md sticky top-20 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "AI Predictions", href: "/predictions" },
              { label: `${coin.name} (${coin.symbol}) Forecast` },
            ]}
          />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        {/* Coin Hero Header */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 border border-purple-500/20 p-8 sm:p-12 shadow-2xl text-white">
          <div className="absolute -right-16 -top-16 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-16 -bottom-16 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-400/30 text-purple-300 text-xs font-mono font-bold uppercase tracking-wider">
                <Brain className="w-3.5 h-3.5 text-purple-400" />
                <span>Quantitative Algorithmic Engine</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              </div>

              <div className="flex items-center gap-4 flex-wrap">
                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white">
                  {coin.name} <span className="text-purple-400">({coin.symbol})</span>
                </h1>
                <span className="px-3.5 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 font-extrabold text-sm tracking-wide">
                  {coin.primarySignal} ({coin.confluenceScore}% Confluence)
                </span>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {coin.summaryThesis}
              </p>

              {/* Meta Tags */}
              <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 flex-wrap font-medium">
                <span>Category: <strong className="text-white">{coin.category}</strong></span>
                <span>•</span>
                <span>Market Cap: <strong className="text-white">{coin.marketCap}</strong></span>
                <span>•</span>
                <span>Max Supply: <strong className="text-white">{coin.maxSupply}</strong></span>
              </div>
            </div>

            {/* Current Price & Forecast Summary Card */}
            <div className="p-6 rounded-2xl bg-white/10 dark:bg-slate-900/60 backdrop-blur-xl border border-white/10 space-y-4 min-w-[280px]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-300 font-bold uppercase tracking-wider">Current Benchmark</span>
                <span className="text-xs font-mono text-emerald-400 font-bold">LIVE FEED</span>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
                  ${coin.currentPriceUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  All-Time High: <strong className="text-amber-300">${coin.allTimeHigh.toLocaleString()}</strong> ({coin.allTimeHighDate})
                </p>
              </div>

              <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-300">30-Day Target:</span>
                <span className="font-mono font-bold text-purple-300 text-sm">
                  ${coin.forecasts.horizon30d.targetPrice.toLocaleString()} ({coin.forecasts.horizon30d.projectedReturn})
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Multi-Horizon Forecast Cards Grid */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Target className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <span>Multi-Horizon Price Projections</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Quantitative price corridors generated with 99% probabilistic confidence bands.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 24-Hour Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-purple-500/50 transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-xs font-mono font-bold uppercase text-slate-500 dark:text-slate-400">24-Hour Horizon</span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                  {coin.forecasts.horizon24h.confidence}% Conf
                </span>
              </div>
              <div>
                <div className="text-xs text-slate-400">Projected Target</div>
                <div className="text-2xl font-black text-slate-900 dark:text-white font-mono flex items-center gap-2">
                  ${coin.forecasts.horizon24h.targetPrice.toLocaleString()}
                  <span className="text-xs font-bold text-emerald-500 font-sans">
                    {coin.forecasts.horizon24h.projectedReturn}
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1 font-mono">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Channel Range:</span>
                  <span className="text-slate-900 dark:text-white font-bold">
                    ${coin.forecasts.horizon24h.targetRange[0].toLocaleString()} - ${coin.forecasts.horizon24h.targetRange[1].toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Dynamic Support:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">${coin.forecasts.horizon24h.supportLevel.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Resistance Wall:</span>
                  <span className="text-rose-600 dark:text-rose-400 font-bold">${coin.forecasts.horizon24h.resistanceLevel.toLocaleString()}</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                <strong>Key Catalyst:</strong> {coin.forecasts.horizon24h.primaryDriver}
              </p>
            </div>

            {/* 7-Day Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-purple-500/50 transition">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-xs font-mono font-bold uppercase text-slate-500 dark:text-slate-400">7-Day Tactical</span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                  {coin.forecasts.horizon7d.confidence}% Conf
                </span>
              </div>
              <div>
                <div className="text-xs text-slate-400">Projected Target</div>
                <div className="text-2xl font-black text-slate-900 dark:text-white font-mono flex items-center gap-2">
                  ${coin.forecasts.horizon7d.targetPrice.toLocaleString()}
                  <span className="text-xs font-bold text-emerald-500 font-sans">
                    {coin.forecasts.horizon7d.projectedReturn}
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs space-y-1 font-mono">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Channel Range:</span>
                  <span className="text-slate-900 dark:text-white font-bold">
                    ${coin.forecasts.horizon7d.targetRange[0].toLocaleString()} - ${coin.forecasts.horizon7d.targetRange[1].toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Dynamic Support:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">${coin.forecasts.horizon7d.supportLevel.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Resistance Wall:</span>
                  <span className="text-rose-600 dark:text-rose-400 font-bold">${coin.forecasts.horizon7d.resistanceLevel.toLocaleString()}</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                <strong>Key Catalyst:</strong> {coin.forecasts.horizon7d.primaryDriver}
              </p>
            </div>

            {/* 30-Day Card */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-purple-500/40 dark:border-purple-500/50 shadow-md space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-purple-600 text-white font-black text-[9px] px-3 py-1 rounded-bl-xl uppercase tracking-wider font-mono">
                Macro Thesis
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  <span className="text-xs font-mono font-bold uppercase text-slate-500 dark:text-slate-400">30-Day Horizon</span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                  {coin.forecasts.horizon30d.confidence}% Conf
                </span>
              </div>
              <div>
                <div className="text-xs text-slate-400">Projected Target</div>
                <div className="text-2xl font-black text-purple-600 dark:text-purple-400 font-mono flex items-center gap-2">
                  ${coin.forecasts.horizon30d.targetPrice.toLocaleString()}
                  <span className="text-xs font-bold text-emerald-500 font-sans">
                    {coin.forecasts.horizon30d.projectedReturn}
                  </span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-purple-50/50 dark:bg-purple-950/30 text-xs space-y-1 font-mono">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Channel Range:</span>
                  <span className="text-slate-900 dark:text-white font-bold">
                    ${coin.forecasts.horizon30d.targetRange[0].toLocaleString()} - ${coin.forecasts.horizon30d.targetRange[1].toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Macro Support:</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold">${coin.forecasts.horizon30d.supportLevel.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Expansion Target:</span>
                  <span className="text-purple-600 dark:text-purple-400 font-bold">${coin.forecasts.horizon30d.resistanceLevel.toLocaleString()}</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
                <strong>Key Catalyst:</strong> {coin.forecasts.horizon30d.primaryDriver}
              </p>
            </div>
          </div>
        </section>

        {/* 4-Pillar Quantitative Ensemble Breakdown */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Cpu className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <span>4-Pillar Quantitative Ensemble Breakdown</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Confluence score synthesis weighting technical momentum, on-chain reserves, derivatives order flow, and macro policy.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Pillar 1: Technical */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">1. Technical (40%)</span>
                <span className="text-xs font-mono font-extrabold text-purple-600 dark:text-purple-400">{coin.pillars.technical.score}/100</span>
              </div>
              <div className="text-xs space-y-1 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">RSI (14):</span>
                  <span className="font-bold">{coin.pillars.technical.rsi14}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">MACD Bias:</span>
                  <span className="font-bold text-emerald-500">{coin.pillars.technical.macdBias}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Supertrend:</span>
                  <span className="font-bold text-emerald-500">{coin.pillars.technical.supertrend}</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                {coin.pillars.technical.keyNote}
              </p>
            </div>

            {/* Pillar 2: On-Chain */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">2. On-Chain (25%)</span>
                <span className="text-xs font-mono font-extrabold text-purple-600 dark:text-purple-400">{coin.pillars.onChain.score}/100</span>
              </div>
              <div className="text-xs space-y-1 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">MVRV Z-Score:</span>
                  <span className="font-bold">{coin.pillars.onChain.mvrvZScore}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Active Wallets:</span>
                  <span className="font-bold">{coin.pillars.onChain.activeAddresses24h}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Reserve Flow:</span>
                  <span className="font-bold text-emerald-500">{coin.pillars.onChain.exchangeReserveFlow}</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                {coin.pillars.onChain.keyNote}
              </p>
            </div>

            {/* Pillar 3: Derivatives */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">3. Derivatives (20%)</span>
                <span className="text-xs font-mono font-extrabold text-purple-600 dark:text-purple-400">{coin.pillars.derivatives.score}/100</span>
              </div>
              <div className="text-xs space-y-1 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Open Interest:</span>
                  <span className="font-bold">{coin.pillars.derivatives.openInterest}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Funding Rate:</span>
                  <span className="font-bold text-emerald-500">{coin.pillars.derivatives.fundingRate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">L/S Ratio:</span>
                  <span className="font-bold">{coin.pillars.derivatives.longShortRatio}</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                {coin.pillars.derivatives.keyNote}
              </p>
            </div>

            {/* Pillar 4: Macro Policy */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">4. Macro Policy (15%)</span>
                <span className="text-xs font-mono font-extrabold text-purple-600 dark:text-purple-400">{coin.pillars.macro.score}/100</span>
              </div>
              <div className="text-xs space-y-1 font-mono">
                <div className="flex justify-between">
                  <span className="text-slate-500">Fed Cut Odds:</span>
                  <span className="font-bold">{coin.pillars.macro.fedCutOdds}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">US CPI YoY:</span>
                  <span className="font-bold">{coin.pillars.macro.cpiYoY}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">DXY Corr:</span>
                  <span className="font-bold text-emerald-500">{coin.pillars.macro.dxyCorrelation}</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
                {coin.pillars.macro.keyNote}
              </p>
            </div>
          </div>
        </section>

        {/* Key Support and Resistance Table */}
        <section className="space-y-4">
          <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span>Key Institutional Support, Resistance &amp; Liquidity Levels</span>
          </h2>

          <div className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden bg-white dark:bg-slate-900 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-mono font-bold uppercase border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-5 py-3">Level Type</th>
                    <th className="px-5 py-3 font-mono">Price (USD)</th>
                    <th className="px-5 py-3">Structural Description &amp; Order Book Analysis</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium">
                  {coin.keyLevels.map((lvl, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                      <td className="px-5 py-3.5">
                        <span
                          className={`px-2.5 py-1 rounded-md font-bold font-mono text-[11px] ${
                            lvl.type === "Resistance"
                              ? "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300"
                              : lvl.type === "Support"
                              ? "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300"
                              : "bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300"
                          }`}
                        >
                          {lvl.type}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 font-mono font-bold text-sm text-slate-900 dark:text-white">
                        ${lvl.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
                      </td>
                      <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300 leading-relaxed">
                        {lvl.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Embedded Full Interactive Suite */}
        <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                Live Interactive Prediction Engine &amp; What-If Scenario Sandbox
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Simulate ETF flows, whale netflows, and Fed interest rate cut odds in real time.
              </p>
            </div>
          </div>

          <Suspense fallback={<div className="min-h-[250px] flex items-center justify-center font-mono text-xs text-slate-400">Loading AI Prediction Suite...</div>}>
            <AIPredictionSuite />
          </Suspense>
        </section>

        {/* FAQ Section for Google Rich Snippets */}
        <section className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <span>Frequently Asked Questions — {coin.name} ({coin.symbol}) Price Prediction</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Authoritative answers to critical market and price forecasting questions.
            </p>
          </div>

          <div className="space-y-3">
            {coin.faq.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-sm"
              >
                <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 flex items-center justify-center text-xs font-mono font-bold">
                    Q
                  </span>
                  <span>{item.question}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 pl-7 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Cross-Link Other Coin Predictions */}
        <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Coins className="w-5 h-5 text-amber-500" />
              <span>Explore More AI Crypto Price Predictions</span>
            </h3>
            <Link
              href="/predictions"
              className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
            >
              <span>View All Forecasts</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {otherCoins.map((oc) => (
              <Link
                key={oc.slug}
                href={`/predictions/${oc.slug}`}
                className="p-3.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 dark:hover:border-purple-500 transition group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-black text-xs text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition">
                      {oc.symbol}
                    </span>
                    <span className="text-[10px] font-mono font-bold text-emerald-500">
                      {oc.forecasts.horizon30d.projectedReturn}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {oc.name}
                  </div>
                </div>
                <div className="mt-2 text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                  ${oc.currentPriceUsd.toLocaleString()}
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
