import React from "react";
import Link from "next/link";
import {
  Fish,
  ShieldCheck,
  TrendingUp,
  Cpu,
  BarChart3,
  HelpCircle,
  Zap,
  ArrowRight,
  Flame,
  Layers,
  Search
} from "lucide-react";

export default function WhaleOrdersEditorialGuide() {
  const faqs = [
    {
      q: "What defines a cryptocurrency 'Whale' order on BitcoinCrypto.tech?",
      a: "Our institutional radar defines a 'whale order' as any single spot or perpetual futures execution or resting limit block equal to or exceeding $100,000 USD, with Tier-1 mega-whales categorized at $1,000,000+ USD. These threshold transactions represent institutional desks, family offices, liquidity providers, or high-net-worth private funds whose capital allocation directly moves the order book."
    },
    {
      q: "What is an Iceberg Order and how does our radar detect hidden institutional accumulation?",
      a: "An iceberg order is an algorithmic limit order split into a visible tip and a substantially larger hidden reserve. For example, a fund wanting to purchase $10,000,000 of Bitcoin at $92,000 may display only $250,000 on the public order book. As takers sell into that $250,000, the algorithmic execution engine automatically replenishes the order from hidden reserves. Our algorithm detects icebergs by tracking repeated identical fills at a static price tick that exceed the visible book depth."
    },
    {
      q: "What is the difference between on-chain whale wallet alerts and exchange whale orders?",
      a: "On-chain whale alerts track UTXO transfers between private blockchain addresses and exchange deposit/withdrawal wallets (e.g., transfers reported by Whale Alert). While informative, on-chain transfers do not guarantee immediate market impact. In contrast, exchange whale orders track live, confirmed executions and resting limit walls inside the centralized exchange (Binance, Coinbase, Bybit) central limit order books, measuring immediate buying or selling pressure."
    },
    {
      q: "How should paper traders interpret large resting limit buy and sell walls?",
      a: "Large resting limit walls can represent genuine institutional support/resistance or tactical spoofing. A genuine $20M bid wall will withstand repeated market sell hits, absorbing aggressive supply and causing price to bounce. However, if a wall is pulled as soon as price approaches within 0.2%, it indicates spoofing designed to manipulate retail sentiment into buying or selling ahead of the phantom level."
    },
    {
      q: "What is TWAP and VWAP execution used by institutional crypto trading desks?",
      a: "Time-Weighted Average Price (TWAP) and Volume-Weighted Average Price (VWAP) are execution algorithms used by institutional funds to minimize slippage when entering or exiting multi-million dollar crypto positions. TWAP chops an enormous order into uniform slices executed at regular time intervals, while VWAP weights execution according to historical intra-day volume profiles."
    }
  ];

  return (
    <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-12">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-700/80">
          <Fish className="w-3.5 h-3.5 text-amber-500" />
          <span>Institutional Whale Flow &amp; Smart Money Masterclass</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Deconstructing Cryptocurrency Whale Orders, Icebergs &amp; Large Block Trades
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-4xl leading-relaxed">
          Cryptocurrency markets are heavily influenced by institutional capital flows. Retail traders rely on delayed news headlines, but smart money footprint leaves undeniable mathematical traces on the exchange tape through resting limit walls, iceberg fills, and synchronized TWAP sweeps.
        </p>
      </div>

      {/* 4 Core Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module 1 */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-indigo-500 text-white font-black flex items-center justify-center text-xs">
              1
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Institutional Block Trade Identification ($100K to $10M+)
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Market microstructure categorizes executions into retail micro-orders (&lt;$10K), mid-tier orders ($10K-$100K), and institutional block trades ($100K+). When institutional buyers step in, they execute aggressive taker sweeps that clear multiple levels of resting liquidity within a single millisecond. Our whale radar flags these trades with green (bid sweep) and red (ask sweep) telemetry indicators.
          </p>
        </div>

        {/* Module 2 */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs">
              2
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Iceberg Order Detection &amp; Hidden Liquidity
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Institutional traders avoid placing multi-million dollar market orders all at once because doing so creates catastrophic slippage and signals their intent to the broader market. Instead, they deploy algorithmic iceberg orders. Our radar scans the tick-by-tick tape for anomalous volume concentrations at precise price steps to surface hidden limit accumulation before the subsequent trend expansion begins.
          </p>
        </div>

        {/* Module 3 */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-xs">
              3
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Resting Limit Walls: Absorption vs. Rejection
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            When price approaches a resting $50M limit wall, two potential outcomes occur: <em>Rejection</em>, where aggressive market participants fail to overcome the resting liquidity and price pivots sharply in the opposite direction; or <em>Absorption</em>, where relentless taker volume gradually exhausts the wall. Once a colossal wall is absorbed, price frequently accelerates in a violent breakout as short-term traders scramble to reposition.
          </p>
        </div>

        {/* Module 4 */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-rose-500 text-white font-black flex items-center justify-center text-xs">
              4
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Synthesizing Whale Flow with Liquidation Heatmaps
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Whale traders actively exploit resting retail leverage. By analyzing CoinGlass liquidation heatmaps alongside the whale order tape, one can observe institutional traders driving price directly into concentrated retail liquidation clusters. The cascade of forced stop-outs and liquidations provides the massive liquidity exit that whales need to close their massive positions at optimal prices.
          </p>
        </div>
      </div>

      {/* Institutional Execution Mathematics Box */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
          <Cpu className="w-4 h-4" />
          <span>Institutional Algorithmic Execution Benchmarks</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-slate-400 block font-bold">Volume-Weighted Average Price (VWAP):</span>
            <div className="text-amber-300 text-sm font-bold bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              VWAP = Sum(Price_i * Volume_i) / Sum(Volume_i)
            </div>
            <p className="text-[11px] text-slate-400">
              The primary execution benchmark for institutional algorithmic execution algorithms across global desks.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-slate-400 block font-bold">Whale Taker Concentration Metric:</span>
            <div className="text-indigo-300 text-sm font-bold bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              WTC = Volume(&gt;$100K) / Total_Volume_24h
            </div>
            <p className="text-[11px] text-slate-400">
              Measures whether daily market turnover is retail-driven (&lt;35%) or institutional-dominated (&gt;65%).
            </p>
          </div>
        </div>
      </div>

      {/* Interactive FAQ Accordion Style Section */}
      <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-500" />
          <span>Frequently Asked Questions — Whale Tracking &amp; Large Block Trades</span>
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
      <div className="p-6 rounded-2xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Connect Whale Flow with Market Microstructure
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Audit Level-2 order book depth and multi-horizon AI price predictions alongside whale tape activity.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/orderbook"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition flex items-center gap-1 shadow-xs"
          >
            <span>L2 Order Book Terminal</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/predictions"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white transition border border-slate-200 dark:border-slate-700"
          >
            AI Price Predictions
          </Link>
        </div>
      </div>
    </section>
  );
}
