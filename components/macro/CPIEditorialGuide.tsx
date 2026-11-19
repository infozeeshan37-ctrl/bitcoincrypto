import React from "react";
import Link from "next/link";
import {
  TrendingUp,
  ShieldCheck,
  BarChart2,
  Cpu,
  HelpCircle,
  Zap,
  ArrowRight,
  Globe2,
  Calendar,
  Layers
} from "lucide-react";

export default function CPIEditorialGuide() {
  const faqs = [
    {
      q: "Why does the US CPI inflation release trigger extreme volatility in Bitcoin and crypto markets?",
      a: "The Consumer Price Index (CPI) published monthly by the US Bureau of Labor Statistics (BLS) is the primary inflation gauge monitored by the Federal Reserve. Cryptocurrency valuations—particularly Bitcoin—are exceptionally sensitive to sovereign monetary liquidity and real interest rate expectations. A cooler-than-expected CPI print boosts odds of Federal Reserve interest rate cuts, expanding global fiat liquidity and driving capital into scarce digital assets."
    },
    {
      q: "What is the difference between Headline CPI and Core CPI?",
      a: "Headline CPI tracks price changes across the entire basket of consumer goods and services, including volatile food and energy components. Core CPI strips out food and energy prices to provide a clearer measure of underlying structural inflation. The Federal Reserve places significantly greater weight on Core CPI and Core PCE when determining interest rate trajectories."
    },
    {
      q: "How does the US Dollar Index (DXY) inverse correlation with Bitcoin operate?",
      a: "Historically, Bitcoin maintains a strong inverse correlation with the US Dollar Index (DXY). When hot inflation prints push Treasury yields higher and strengthen the US Dollar against foreign currencies, global dollar liquidity tightens, which traditionally acts as a headwind for risk assets. Conversely, a declining DXY signals global liquidity expansion, which historically accompanies Bitcoin bull runs."
    },
    {
      q: "What is the typical price action behavior on Bitcoin within the first 15 minutes of a CPI release?",
      a: "CPI is released at precisely 8:30 AM Eastern Time (ET). In the first 60 to 180 seconds, automated high-frequency trading (HFT) algorithms and latency arbitrage bots sweep centralized exchange order books in both directions, triggering stop-losses on both long and short traders (a 'whipsaw'). True directional trend discovery typically solidifies between 15 to 45 minutes following the release after human quantitative desks digest the sub-components."
    },
    {
      q: "How does Bitcoin hedge against long-term fiat monetary debasement?",
      a: "Unlike fiat currencies subject to discretionary expansion by central banks, Bitcoin has an immutable algorithmic supply cap of 21,000,000 units with an inelastic issuance schedule that halves every 210,000 blocks (~4 years). As global M2 fiat money supply expands to service sovereign debt, Bitcoin acts as a mathematical store of value and monetary debasement hedge."
    }
  ];

  return (
    <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-12">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-700/80">
          <Calendar className="w-3.5 h-3.5 text-amber-500" />
          <span>Macroeconomic &amp; Monetary Policy Masterclass</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          How US CPI Inflation, Fed Interest Rates &amp; Global Liquidity Move Bitcoin
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-4xl leading-relaxed">
          Cryptocurrency does not trade in a macroeconomic vacuum. Over 70% of multi-month Bitcoin trend movements are governed by macroeconomic monetary policy: US CPI inflation releases, Federal Reserve rate decisions, and the net expansion or contraction of global M2 fiat money supply.
        </p>
      </div>

      {/* 4 Core Macro Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module 1 */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs">
              1
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              The BLS CPI Inflation Mechanics &amp; Shelter Lag
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            The Bureau of Labor Statistics (BLS) Consumer Price Index measures price baskets across transportation, food, energy, medical care, and shelter (Owners’ Equivalent Rent). Shelter accounts for over 35% of the headline index and suffers from a well-documented 6 to 12-month structural reporting lag compared to real-time market rents. Quantitative desks adjust for this lag to forecast whether upcoming CPI prints will surprise to the upside or downside.
          </p>
        </div>

        {/* Module 2 */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-xs">
              2
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Federal Reserve FOMC Interest Rate Transmission
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            The Federal Open Market Committee (FOMC) sets the Federal Funds Rate. When interest rates are high, institutional capital earns 5%+ risk-free on short-term US Treasury bills, reducing the incentive to allocate to risk assets. When the Fed cuts rates or signals quantitative easing, the discount rate falls, inflating asset valuations across digital assets, technology equities, and gold.
          </p>
        </div>

        {/* Module 3 */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-blue-500 text-white font-black flex items-center justify-center text-xs">
              3
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Real Yields &amp; Global M2 Money Supply Expansion
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Real yield equals the nominal 10-year Treasury yield minus expected inflation. When real yields fall into negative territory, capital rapidly migrates into non-yielding hard assets. Concurrently, global M2 money supply across major central banks (Fed, ECB, PBOC, BOJ) serves as the ultimate leading indicator for Bitcoin, with Bitcoin historically tracking global M2 expansion with a 60 to 90-day lag.
          </p>
        </div>

        {/* Module 4 */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-purple-500 text-white font-black flex items-center justify-center text-xs">
              4
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Execution Strategy &amp; Invalidation on Event Days
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Trading during high-impact macro releases carries severe execution hazards. Spreads widen up to 10x, and resting liquidity thins out across all exchanges. Professional quantitative frameworks emphasize de-risking ahead of 8:30 AM ET, observing the post-release Level-2 order book depth consolidation, and awaiting structural confirmation before establishing directional exposure.
          </p>
        </div>
      </div>

      {/* Quantitative Macroeconomic Metrics Grid */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
          <Cpu className="w-4 h-4" />
          <span>Core Macroeconomic Liquidity Formulations</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-slate-400 block font-bold">1. Real Treasury Yield Formulation:</span>
            <div className="text-amber-300 text-sm font-bold bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              Real_Yield = Nominal_10Y_Treasury - 10Y_Breakeven_Inflation
            </div>
            <p className="text-[11px] text-slate-400">
              Inversely correlated with digital asset valuations and speculative asset risk appetite.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-slate-400 block font-bold">2. Fed Net Liquidity Metric:</span>
            <div className="text-emerald-300 text-sm font-bold bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              Fed_Net_Liquidity = Fed_Assets - (TGA_Balance + Reverse_Repo)
            </div>
            <p className="text-[11px] text-slate-400">
              Accurately tracks active dollar liquidity circulating through commercial banking channels.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive FAQ Accordion Style Section */}
      <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-500" />
          <span>Frequently Asked Questions — US CPI, Fed Decisions &amp; Macro Crypto Impact</span>
        </h3>
        <div className="grid grid-cols-1 gap-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-2"
            >
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 font-mono font-bold">Q{idx + 1}:</span>
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Internal Cross-Linking Navigation */}
      <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Connect Macro Factors with Quantitative Predictions
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            See how US CPI and Fed rate expectations are incorporated into multi-horizon price targets.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/predictions"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition flex items-center gap-1 shadow-xs"
          >
            <span>AI Price Predictions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/news"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white transition border border-slate-200 dark:border-slate-700"
          >
            Latest Macro News
          </Link>
        </div>
      </div>
    </section>
  );
}
