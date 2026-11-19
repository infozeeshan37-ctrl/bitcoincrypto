import React from "react";
import Link from "next/link";
import {
  Layers,
  Activity,
  BarChart2,
  ShieldCheck,
  TrendingUp,
  Cpu,
  BookOpen,
  ArrowRight,
  HelpCircle,
  Zap,
  Target
} from "lucide-react";

export default function OrderbookEditorialGuide() {
  const faqs = [
    {
      q: "What is the difference between Level-1 (L1), Level-2 (L2), and Level-3 (L3) market depth?",
      a: "Level-1 data displays only the current best bid (highest buying price) and best ask (lowest selling price) along with their immediate quantities. Level-2 (L2) market data—rendered in our terminal—reveals the full central limit order book (CLOB) queue, detailing aggregated resting limit orders across multiple price tiers above and below the current mark price. Level-3 (L3) provides deterministic order-by-order attribution, identifying individual queue positioning typically reserved for proprietary colocation trading desks."
    },
    {
      q: "How is Cumulative Volume Delta (CVD) calculated and why is it crucial for traders?",
      a: "Cumulative Volume Delta (CVD) measures the continuous net difference between aggressive market buy orders and aggressive market sell orders: CVD = Sum(Market Buy Volume - Market Sell Volume). While standard volume bars reveal total activity, CVD isolates taker aggression. If price is ascending while CVD is flat or descending, it signals aggressive absorption by limit sellers—a prime indicator of an impending reversal or exhaustion."
    },
    {
      q: "What constitutes order book spoofing and how can quantitative analysts detect it?",
      a: "Spoofing is an illegal market manipulation tactic where a large market participant places massive non-bona-fide limit buy or sell walls to create an illusion of heavy supply or demand, only to cancel them milliseconds before execution. Analysts detect spoofing by tracking resting order duration, cancellations-to-fill ratios, and rapid repositioning when price nears the wall."
    },
    {
      q: "How does bid/ask order book imbalance (OBI) forecast short-term price momentum?",
      a: "Order Book Imbalance (OBI) measures the proportional asymmetry between resting bid liquidity (Qbids) and resting ask liquidity (Qasks) within a defined depth band (e.g., top 1% to 2% of the mid-price): OBI = (Qbids - Qasks) / (Qbids + Qasks). High positive OBI indicates that buyers are heavily queueing bids, forcing aggressive market sellers to consume deep liquidity to drive price downward, creating positive short-term price pressure."
    },
    {
      q: "What is execution slippage and how can paper traders minimize it in volatile crypto markets?",
      a: "Execution slippage occurs when a market order is filled at an average price worse than the expected best bid or ask because the order size exceeds the resting liquidity available at the top of the book. Slippage can be minimized by using limit orders, scaling entries across multiple algorithmic TWAP intervals, or trading high-liquidity pairs where resting depth exceeds order volume by at least 10:1."
    }
  ];

  return (
    <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-12">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-700/80">
          <Layers className="w-3.5 h-3.5 text-amber-500" />
          <span>Institutional Market Microstructure Masterclass</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          How to Read Central Limit Order Books (CLOB) &amp; Cumulative Volume Delta (CVD)
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-400 max-w-4xl leading-relaxed">
          Order book depth is the raw engine of price discovery. While lagging technical indicators merely chart historical closing ticks, Level-2 order book depth and real-time taker volume delta reveal the true resting supply, demand imbalances, and institutional absorption that drive future price action.
        </p>
      </div>

      {/* 4 Core Microstructure Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module 1 */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-amber-500 text-slate-950 font-black flex items-center justify-center text-xs">
              1
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Maker Liquidity vs. Taker Aggression
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Market participants operate in two distinct modes: <strong>Makers</strong> supply liquidity by placing resting passive limit orders on the book, receiving lower exchange fee tiers. <strong>Takers</strong> demand immediate execution by firing market orders that instantly consume the best resting bids or asks. Price does not move simply because people are buying; price moves because aggressive market takers exhaust the resting maker limit liquidity at a given price tick.
          </p>
        </div>

        {/* Module 2 */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-blue-500 text-white font-black flex items-center justify-center text-xs">
              2
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Cumulative Volume Delta (CVD) Divergences
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            CVD is one of the most powerful institutional confirmation tools. When Bitcoin hits a new local high but CVD prints a lower high, it indicates <em>absorption</em>: retail buyers are aggressively placing market buy orders into massive institutional passive limit sell walls. Conversely, when price makes a lower low but CVD forms a higher low, aggressive sellers are being quietly absorbed by institutional limit buyers—often heralding an aggressive short squeeze.
          </p>
        </div>

        {/* Module 3 */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-emerald-500 text-slate-950 font-black flex items-center justify-center text-xs">
              3
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Bid/Ask Imbalance &amp; Liquidity Walls
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Resting limit walls act as both support/resistance barriers and liquidity magnets. A $25M bid wall sitting 1.5% below current price provides immediate price cushioning; however, if market makers pull that liquidity before arrival, price will rapidly cascade into the liquidity vacuum. Our depth terminal scans the top 50 bid and ask price levels in real time to display genuine resting volume versus transient orders.
          </p>
        </div>

        {/* Module 4 */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="flex items-center gap-2.5">
            <span className="w-7 h-7 rounded-lg bg-purple-500 text-white font-black flex items-center justify-center text-xs">
              4
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Slippage, Spread &amp; Market Impact Physics
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            The bid-ask spread represents the cost of immediacy. In low-liquidity altcoins, executing a $100,000 market buy might sweep through 8 distinct price tiers, incurring 1.8% to 3.5% in slippage. By consulting our live order book depth chart before simulating or executing trades, market participants can calculate expected market impact and calibrate optimal lot sizing.
          </p>
        </div>
      </div>

      {/* Quantitative Mathematical Formulas Section */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-950 text-white border border-slate-800 space-y-4">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
          <Cpu className="w-4 h-4" />
          <span>Core Microstructure Mathematical Formulas</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-mono">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-slate-400 block font-bold">1. Order Book Imbalance Ratio (OBI):</span>
            <div className="text-amber-300 text-sm font-bold bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              OBI = (Bids_depth - Asks_depth) / (Bids_depth + Asks_depth)
            </div>
            <p className="text-[11px] text-slate-400">
              Output bounded between -1.0 (100% sell pressure) and +1.0 (100% buy pressure) across the top 2% depth corridor.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
            <span className="text-slate-400 block font-bold">2. Cumulative Volume Delta (CVD):</span>
            <div className="text-emerald-300 text-sm font-bold bg-slate-950 p-2.5 rounded-lg border border-slate-800">
              CVD_t = CVD_(t-1) + (V_buy - V_sell)
            </div>
            <p className="text-[11px] text-slate-400">
              Calculated on each sub-second WebSocket trade execution based on taker aggressor trade flags.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive FAQ Accordion Style Section */}
      <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-amber-500" />
          <span>Frequently Asked Questions — Order Book Depth &amp; CVD Flow</span>
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
      <div className="p-6 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Expand Your Market Microstructure Knowledge
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Combine order book depth with institutional whale orders and CoinGlass liquidation heatmaps.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/whale-orders"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition flex items-center gap-1 shadow-xs"
          >
            <span>Whale Orders Radar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/coinglass"
            className="px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white transition border border-slate-200 dark:border-slate-700"
          >
            Liquidation Heatmap
          </Link>
        </div>
      </div>
    </section>
  );
}
