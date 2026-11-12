import Link from "next/link";
import {
  BookOpen,
  GraduationCap,
  ShieldCheck,
  Brain,
  Activity,
  Flame,
  Layers,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
  TrendingUp,
  Cpu,
  Lock,
  Globe2,
  FileText,
} from "lucide-react";

export default function HomeEditorialGuide() {
  const faqs = [
    {
      q: "What is BitcoinCrypto.tech and how does it help cryptocurrency traders and researchers?",
      a: "BitcoinCrypto.tech is an open-access educational cryptocurrency research terminal and market intelligence suite. We integrate real-time multi-exchange WebSocket order book depth, CoinGlass liquidation heatmaps, algorithmic momentum models, and macroeconomic indicators (such as US CPI inflation reports) to provide empirical, transparent market telemetry. All tools and paper-trading environments are 100% free and strictly educational."
    },
    {
      q: "How does the CoinGlass Liquidation Heatmap work?",
      a: "The CoinGlass liquidation heatmap visualizes resting leveraged perpetual futures contracts across major exchanges (Binance, Bybit, OKX). By calculating where high-leverage long and short positions face automated margin liquidation, the heatmap identifies high-density liquidity pools. Large market makers and institutions often drive price toward these clusters to trigger cascading forced liquidations, creating powerful mean-reversion or breakout opportunities."
    },
    {
      q: "What is the DeepQuant Tri-Pillar AI Signal Engine?",
      a: "The DeepQuant engine combines three independent analytical pillars: (1) Technical Momentum (RSI, Bollinger Bands, Moving Average convergences across multi-timeframe candles), (2) Order Book Microstructure (Level-2 bid/ask depth imbalance and Cumulative Volume Delta taker aggression), and (3) Macroeconomic News Sentiment (real-time CPI inflation, Fed interest rate decisions, and institutional ETF net inflows). When all three align, the system generates high-confluence educational setups with dynamic entry, stop loss, and multi-tier take-profit targets."
    },
    {
      q: "Is any real money or betting involved on this website?",
      a: "Absolutely not. BitcoinCrypto.tech operates with zero real-money wagering, deposits, custody, or gambling. Our interactive trading bot terminals, DCA simulators, and paper-trading wallets operate strictly with virtual demo tokens (e.g., $10,000 USDT simulated balance) stored locally in your browser. Nothing on this website constitutes financial or investment advice."
    },
    {
      q: "Where can I read your comprehensive educational curriculum?",
      a: "We publish a complete 10-chapter, 100-article cryptocurrency masterclass accessible at /learn. It covers foundational blockchain architecture, cryptographic hashing, on-chain valuation metrics (MVRV Z-Score, NVT ratio), market structure price action, order flow CVD analysis, derivatives risk management, and decentralized finance protocols."
    }
  ];

  return (
    <section className="bg-slate-50 dark:bg-slate-900/60 border-t border-slate-200 dark:border-slate-800 py-16 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-700/80 text-amber-900 dark:text-amber-300 shadow-sm">
            <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Educational Research &amp; Quantitative Methodology</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Comprehensive Digital Asset Market Intelligence &amp; Quantitative Curriculum
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Unlike speculative social media commentary, <strong>BitcoinCrypto.tech</strong> anchors market analysis in verifiable empirical mathematics, market microstructure, and macroeconomic monetary fundamentals. Explore our institutional research frameworks below.
          </p>
        </div>

        {/* 4 In-Depth Research Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Pillar 1: Market Microstructure & Order Flow */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              1. Central Limit Order Books (CLOB) &amp; Cumulative Volume Delta (CVD)
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Every market move is governed by the interaction between resting passive limit orders and aggressive market taker orders. When retail traders execute market buy orders, they consume liquidity on the ask side of the central limit order book. If the volume of aggressive buying exceeds resting inventory, price ticks higher.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              By analyzing <strong>Cumulative Volume Delta (CVD)</strong> alongside Level-2 order book depth bands, researchers can detect institutional absorption—situations where aggressive market selling fails to push price lower because a massive institutional limit buy wall is absorbing every coin.
            </p>
            <Link
              href="/orderbook"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline pt-1"
            >
              <span>Explore L2 Order Book Terminal</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 2: Liquidation Dynamics & Heatmaps */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              2. Derivatives Liquidation Cascades &amp; Short Squeeze Mechanics
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Cryptocurrency perpetual futures represent over 75% of total digital asset trading volume. When high leverage (20x, 50x, 100x) is employed, minor adverse price fluctuations trigger automated margin calls. The exchange liquidation engine forcefully closes the bankrupt position by issuing market orders into the thin order book.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Our <strong>CoinGlass Liquidation Heatmap</strong> models these liquidation price thresholds across global exchanges. When massive clusters of short liquidations accumulate above resistance, a breakout often triggers a violent short squeeze cascade, propelling Bitcoin rapidly upward as forced buy orders flood the market.
            </p>
            <Link
              href="/coinglass"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 hover:underline pt-1"
            >
              <span>Open CoinGlass Liquidation Heatmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 3: Macroeconomic Policy & Inflation */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              3. Macroeconomic Liquidity Transmission: US CPI &amp; Fed Rate Cuts
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Bitcoin does not trade in isolation from the global monetary system. As a non-sovereign digital monetary network with a mathematically capped supply of 21 million units, Bitcoin serves as the purest liquidity sponge for central bank fiat debasement.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              When US headline <strong>Consumer Price Index (CPI)</strong> cools faster than consensus estimates, market expectations for Federal Reserve interest rate cuts surge. Expansionary monetary policy weakens the US Dollar Index (DXY) and drives sovereign treasury yields lower, accelerating capital rotation into spot Bitcoin ETFs, Ethereum, and digital risk assets.
            </p>
            <Link
              href="/cpi"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline pt-1"
            >
              <span>View US CPI Macro Calendar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Pillar 4: Dollar-Cost-Averaging & Capital Preservation */}
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
              4. Harmonic Mean DCA Math &amp; Risk-Adjusted Position Sizing
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Statistical studies demonstrate that over 90% of retail day traders lose capital due to emotional execution, revenge trading, and lack of mathematical position sizing. <strong>Dollar-Cost Averaging (DCA)</strong> neutralizes short-term emotional volatility by accumulating assets at regular intervals.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Because a fixed dollar amount purchases significantly more units when prices decline, an investor&apos;s effective average purchase price converges to the <strong>harmonic mean</strong> of historical prices, which is strictly lower than the arithmetic mean. Combined with strict 1%–2% portfolio risk rules, mathematical discipline ensures long-term survival.
            </p>
            <Link
              href="/tools/dca-simulator"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:underline pt-1"
            >
              <span>Launch DCA Simulator &amp; Backtester</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

        {/* 100-Article Masterclass Showcase Banner */}
        <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-8 sm:p-12 border border-slate-800 text-white space-y-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                <GraduationCap className="w-3.5 h-3.5 text-amber-400" />
                <span>10 Chapters • 100 Authentic Research Articles • Free PDF Books</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight">
                Master Cryptocurrency Analysis: Complete 100-Article Curriculum
              </h3>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Whether you are exploring cryptographic consensus thermodynamics, calculating MVRV Z-Scores on Bitcoin on-chain nodes, or designing delta-neutral funding rate cash-and-carry basis arbitrage, our 10-chapter masterclass provides exhaustive, human-crafted academic depth.
              </p>
            </div>
            <Link
              href="/learn"
              className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-black font-mono transition-all shadow-lg shadow-amber-400/20 flex items-center gap-2 whitespace-nowrap"
            >
              <span>Explore 100-Article Masterclass</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 pt-4 border-t border-slate-800 text-xs font-mono">
            {[
              "Ch 1: Blockchain Architecture",
              "Ch 2: Bitcoin Economics",
              "Ch 3: Smart Contracts & ETH",
              "Ch 4: On-Chain Valuation Ratios",
              "Ch 5: Technical Market Structure",
              "Ch 6: Order Flow & CVD",
              "Ch 7: Derivatives & Liquidations",
              "Ch 8: DeFi & Liquidity Pools",
              "Ch 9: Macroeconomics & CPI",
              "Ch 10: Risk Management Math",
            ].map((ch, idx) => (
              <div
                key={ch}
                className="p-3 rounded-xl bg-slate-850/80 border border-slate-800 text-slate-300 text-[11px] flex items-center gap-2"
              >
                <span className="w-5 h-5 rounded-full bg-amber-400/20 text-amber-300 font-bold flex items-center justify-center text-[10px] shrink-0">
                  {idx + 1}
                </span>
                <span className="truncate">{ch}</span>
              </div>
            ))}
          </div>
        </div>

        {/* E-E-A-T Editorial Guidelines & Verification Notice */}
        <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              E-E-A-T Editorial Standards, Fact-Checking &amp; Data Transparency
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            In accordance with Google Search Quality Evaluator Guidelines for YMYL (Your Money, Your Life) topics, all research articles and educational guides on BitcoinCrypto.tech undergo rigorous multi-step peer review. Market quotes and historical candlestick data are sourced directly from verified primary exchanges (Binance, Coinbase, Bybit, OKX) and official government statistical bureaus (US Bureau of Labor Statistics, Federal Reserve Board, FRED).
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-slate-500 dark:text-slate-400">
            <Link href="/editorial-policy" className="hover:text-amber-500 transition underline">
              • Editorial &amp; Fact-Checking Policy
            </Link>
            <Link href="/authors" className="hover:text-amber-500 transition underline">
              • Verified Authors Directory
            </Link>
            <Link href="/disclaimer" className="hover:text-amber-500 transition underline">
              • Financial Risk Disclaimer
            </Link>
            <Link href="/privacy" className="hover:text-amber-500 transition underline">
              • Privacy Policy &amp; DART Cookie Disclosure
            </Link>
            <Link href="/sitemap" className="hover:text-amber-500 transition underline font-bold text-amber-500">
              • Complete HTML Sitemap (220+ Pages)
            </Link>
          </div>
        </div>

        {/* Homepage Educational FAQ Accordion */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Frequently Asked Questions (FAQ)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Everything you need to know about our data feeds, educational models, and privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqs.map((faq, index) => (
              <div
                key={faq.q}
                className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-2"
              >
                <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <span>{faq.q}</span>
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pl-6">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
