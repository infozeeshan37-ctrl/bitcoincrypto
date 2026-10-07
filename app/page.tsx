import type { Metadata } from "next";
import HomeTradingSuiteHero from "@/components/home/HomeTradingSuiteHero";
import LiveEcosystemOverview from "@/components/home/LiveEcosystemOverview";
import TrustSecurity from "@/components/home/TrustSecurity";
import NewsletterCTA from "@/components/home/NewsletterCTA";
import { HomePageJsonLd } from "@/components/seo/JsonLd";
import Link from "next/link";
import {
  Activity,
  Brain,
  Fish,
  Coins,
  Flame,
  Layers,
  Sparkles,
  BookOpen,
  ShieldCheck,
  Zap,
  TrendingUp,
  Cpu,
  ArrowRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "BitcoinCrypto.tech | #1 AI Crypto Trading Signals, Market Intelligence & Whale Orders",
  description:
    "Official BitcoinCrypto.tech platform - Institutional cryptocurrency market intelligence suite featuring real-time AI trading signals, Binance 5-minute price predictions, Coinglass liquidation heatmaps, L2 order book depth, and institutional whale orders.",
  keywords: [
    "bitcoincrypto.tech",
    "bitcoincrypto",
    "bitcoincrypto tech",
    "bitcoin crypto",
    "bitcoin crypto ai",
    "ai crypto trading bot",
    "crypto market intelligence",
    "whale orders",
    "coinglass liquidation heatmap",
    "bitcoin price prediction",
    "crypto signals btc eth sol",
    "binance 5 minute binary prediction"
  ],
  alternates: {
    canonical: "https://www.bitcoincrypto.tech",
  },
  openGraph: {
    title: "BitcoinCrypto.tech | #1 AI Crypto Trading Signals & Market Intelligence Suite",
    description:
      "Official BitcoinCrypto.tech platform - Institutional cryptocurrency market intelligence suite with real-time AI trading signals, Binance 5-minute price predictions, Coinglass liquidation heatmaps, and whale orders.",
    url: "https://www.bitcoincrypto.tech",
    siteName: "BitcoinCrypto.tech",
    images: [
      {
        url: "https://www.bitcoincrypto.tech/og-image.png",
        width: 1200,
        height: 630,
        alt: "BitcoinCrypto.tech AI Trading Suite & Market Intelligence",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BitcoinCrypto.tech | #1 AI Crypto Trading Signals & Market Intelligence",
    description:
      "Real-time AI trading signals, Binance 5-minute price predictions, Coinglass liquidation heatmaps, and institutional whale orders.",
    creator: "@bitcoincrypto",
    images: ["https://www.bitcoincrypto.tech/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* 1. Official Homepage Schema Graph */}
      <HomePageJsonLd />

      {/* 2. Cryptocurrency Trading Suite & Signals Engine Hero */}
      <HomeTradingSuiteHero />

      {/* 3. Real-Time Crypto Ecosystem & Derivatives Intelligence */}
      <LiveEcosystemOverview />

      {/* 4. Semantic SEO Architecture & Platform Directory (Server-Rendered for Search Crawlers) */}
      <section className="bg-slate-900/40 dark:bg-slate-950/80 border-t border-slate-200/60 dark:border-slate-800/80 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/60">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              <span>Official Platform Hub • BitcoinCrypto.tech</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Institutional Cryptocurrency Market Intelligence &amp; AI Quantitative Suite
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
              <strong>BitcoinCrypto.tech</strong> is an open-access institutional digital asset terminal providing real-time high-frequency WebSocket streams, Tri-Pillar AI trading signals, Binance 5-minute epoch price predictions, aggregated L2 order book depth, Coinglass liquidation squeeze heatmaps, and macroeconomic US CPI volatility forecasting.
            </p>
          </div>

          {/* Core Terminals Directory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Terminal 1: AI Trading Signals */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-400/50 transition">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 flex items-center justify-center mb-4">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Real-Time AI Trading Signals
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Tri-pillar quantitative engine evaluating Technical Momentum, Order Book CVD Imbalance, and Macro News sentiment to generate single-direction, high-confidence Long/Short trade signals with dynamic Entry, Take Profit (TP1/TP2/TP3), and Stop Loss.
              </p>
              <Link href="/tools" className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1">
                Launch AI Signals Bot <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Terminal 2: AI Price Predictions */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-purple-400/50 transition">
              <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 flex items-center justify-center mb-4">
                <Brain className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                5-Minute &amp; Multi-Horizon AI Predictions
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                High-frequency machine learning forecasting Binance 5-minute binary closing epochs along with 24h, 7-day, and 30-day directional targets for Bitcoin (BTC), Ethereum (ETH), Solana (SOL), and 35+ top altcoins.
              </p>
              <Link href="/predictions" className="text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline inline-flex items-center gap-1">
                Explore AI Predictions <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Terminal 3: Whale Orders Terminal */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-indigo-400/50 transition">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 flex items-center justify-center mb-4">
                <Fish className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Institutional Whale Orders &amp; Heatmaps
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Live candlestick terminal tracking institutional limit buy/sell walls, block transactions over $500k, spoofing alerts, resting bid/ask depth bands, and real-time execution slippage simulations.
              </p>
              <Link href="/whale-orders" className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1">
                View Whale Orders Radar <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Terminal 4: Coinglass Derivatives & Liquidations */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-rose-400/50 transition">
              <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 flex items-center justify-center mb-4">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                Coinglass Liquidation &amp; OI Radar
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Multi-exchange aggregate perpetual open interest tracker, 24h hourly liquidation wipeout cascades, short/long squeeze magnetic levels, and funding rate arbitrage heatmaps across Binance, OKX, and Bybit.
              </p>
              <Link href="/coinglass" className="text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline inline-flex items-center gap-1">
                Analyze Liquidations <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Terminal 5: L2 Order Book Depth */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-amber-400/50 transition">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                L2 Central Limit Order Book Depth
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                High-frequency aggregated CLOB visualizer rendering live bid/ask resting inventory, cumulative volume delta (CVD) absorption, and market microstructure imbalance metrics.
              </p>
              <Link href="/orderbook" className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline inline-flex items-center gap-1">
                Open L2 Order Book <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Terminal 6: US CPI & Macro Battles */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-400/50 transition">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                US CPI &amp; Global Macro Battles
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Neural inflation predictor tracking upcoming Bureau of Labor Statistics (BLS) CPI releases, Federal Reserve FOMC interest rate matrices, and real-time geopolitical macroeconomic impact on crypto liquidity.
              </p>
              <Link href="/news" className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline inline-flex items-center gap-1">
                View Macro Radar <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      {/* 5. Institutional Trust & Security Protocol */}
      <TrustSecurity />

      {/* 6. Intelligence Newsletter Subscription */}
      <NewsletterCTA />
    </div>
  );
}
