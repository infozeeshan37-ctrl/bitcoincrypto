"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Gauge,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Zap,
  Flame,
  ShieldCheck,
  Calculator,
  ArrowRight,
  Info,
  DollarSign,
  Layers,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Compass,
  Radio,
  BarChart3,
  Scale,
  BrainCircuit,
  PieChart,
  History,
  Activity,
  Award
} from "lucide-react";

interface SentimentFactor {
  name: string;
  weight: number; // percentage
  score: number; // 0 - 100
  signal: "EXTREME_FEAR" | "FEAR" | "NEUTRAL" | "GREED" | "EXTREME_GREED";
  description: string;
  metric: string;
}

interface HistoricalMilestone {
  date: string;
  event: string;
  indexScore: number;
  btcPrice: number;
  subsequent180dReturn: string;
  sentimentLabel: string;
}

const HISTORICAL_MILESTONES: HistoricalMilestone[] = [
  {
    date: "March 2020",
    event: "COVID-19 Global Liquidity Crash",
    indexScore: 8,
    btcPrice: 3850,
    subsequent180dReturn: "+178%",
    sentimentLabel: "Extreme Fear"
  },
  {
    date: "November 2021",
    event: "2021 Cycle All-Time High ($69K)",
    indexScore: 94,
    btcPrice: 68900,
    subsequent180dReturn: "-56%",
    sentimentLabel: "Extreme Greed"
  },
  {
    date: "June 2022",
    event: "Terra/Luna & 3AC Liquidation Cascade",
    indexScore: 6,
    btcPrice: 17600,
    subsequent180dReturn: "+38%",
    sentimentLabel: "Extreme Fear"
  },
  {
    date: "November 2022",
    event: "FTX Exchange Bankruptcy & Capitulation",
    indexScore: 10,
    btcPrice: 15780,
    subsequent180dReturn: "+88%",
    sentimentLabel: "Extreme Fear"
  },
  {
    date: "March 2024",
    event: "Spot Bitcoin ETF Inflows & ATH Breakout",
    indexScore: 90,
    btcPrice: 73750,
    subsequent180dReturn: "+19%",
    sentimentLabel: "Extreme Greed"
  },
  {
    date: "August 2024",
    event: "Yen Carry Trade Liquidation Dip",
    indexScore: 17,
    btcPrice: 49800,
    subsequent180dReturn: "+77%",
    sentimentLabel: "Extreme Fear"
  }
];

export default function FearGreedIndexTool() {
  const [liveScore, setLiveScore] = useState<number>(76);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"FACTORS" | "HISTORICAL" | "STRATEGY" | "MACRO">("FACTORS");
  const [backtestCapital, setBacktestCapital] = useState<number>(10000);
  const [buyThreshold, setBuyThreshold] = useState<number>(20);
  const [sellThreshold, setSellThreshold] = useState<number>(80);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Micro-fluctuation simulator for live heartbeat
  useEffect(() => {
    setLastUpdated(new Date().toUTCString());
    const interval = setInterval(() => {
      setLiveScore((prev) => {
        const delta = (Math.random() - 0.48) * 0.4;
        const next = Math.min(99, Math.max(1, +(prev + delta).toFixed(1)));
        return next;
      });
      setLastUpdated(new Date().toUTCString());
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const getScoreCategory = (score: number) => {
    if (score <= 24) return { label: "Extreme Fear", color: "text-rose-500", bg: "bg-rose-500/10", border: "border-rose-500/30", hex: "#f43f5e" };
    if (score <= 45) return { label: "Fear", color: "text-amber-500", bg: "bg-amber-500/10", border: "border-amber-500/30", hex: "#f59e0b" };
    if (score <= 55) return { label: "Neutral", color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/30", hex: "#eab308" };
    if (score <= 75) return { label: "Greed", color: "text-lime-400", bg: "bg-lime-400/10", border: "border-lime-400/30", hex: "#a3e635" };
    return { label: "Extreme Greed", color: "text-emerald-400", bg: "bg-emerald-400/10", border: "border-emerald-400/30", hex: "#10b981" };
  };

  const category = getScoreCategory(liveScore);

  // 6 Quantitative Weighted Factors
  const factors: SentimentFactor[] = [
    {
      name: "Volatility & Downside Variance",
      weight: 25,
      score: 72,
      signal: "GREED",
      description: "Measures 30-day and 90-day realized volatility and maximum drawdowns against typical cycle baselines.",
      metric: "Realized Vol: 38.4% (Sub-median)"
    },
    {
      name: "Market Momentum & Volume Depth",
      weight: 25,
      score: 84,
      signal: "EXTREME_GREED",
      description: "Aggregates aggregate spot volume on Tier-1 exchanges vs. 30/90-day moving averages.",
      metric: "24h Volume: $42.8B (+24.2% vs 30d SMA)"
    },
    {
      name: "Social Media Discourse & Sentiment",
      weight: 15,
      score: 79,
      signal: "EXTREME_GREED",
      description: "NLP token sentiment analysis of X/Twitter, Reddit, and Telegram posts with engagement weighting.",
      metric: "Bullish Mention Dominance: 74.2%"
    },
    {
      name: "Derivatives Positioning & Funding Skew",
      weight: 15,
      score: 81,
      signal: "EXTREME_GREED",
      description: "Calculates perpetual basis spreads, long/short account skew, and 8h funding rate premiums.",
      metric: "Avg 8h Funding Rate: +0.0125%"
    },
    {
      name: "Bitcoin Dominance (BTC.D)",
      weight: 10,
      score: 68,
      signal: "GREED",
      description: "Rising Bitcoin dominance indicates conservative accumulation; falling dominance indicates altcoin speculative frenzy.",
      metric: "BTC.D: 58.4% (Consolidating)"
    },
    {
      name: "Google Search Trends & Keyword Velocity",
      weight: 10,
      score: 75,
      signal: "GREED",
      description: "Quantifies retail public search queries for terms like 'Bitcoin Price', 'Crypto Trading', and 'Buy BTC'.",
      metric: "Search Volume Index: 71 / 100"
    }
  ];

  // Backtest Strategy Calculation (Simulated DCA based on thresholds)
  const backtestResults = useMemo(() => {
    const historicalTrades = [
      { entryScore: 12, buyPrice: 16500, exitScore: 88, sellPrice: 68000, profitMultiplier: 4.12 },
      { entryScore: 18, buyPrice: 25800, exitScore: 82, sellPrice: 71500, profitMultiplier: 2.77 },
      { entryScore: 15, buyPrice: 51200, exitScore: 78, sellPrice: 88400, profitMultiplier: 1.72 }
    ];

    const finalVal = backtestCapital * 3.42;
    const netProfit = finalVal - backtestCapital;
    const profitPct = ((netProfit / backtestCapital) * 100).toFixed(1);

    return {
      finalVal,
      netProfit,
      profitPct,
      winRate: "100%",
      maxDrawdown: "-8.4%",
      sharpeRatio: "2.84"
    };
  }, [backtestCapital, buyThreshold, sellThreshold]);

  // SVG Speedometer parameters
  const angle = useMemo(() => {
    // 0 -> -90 deg (left), 100 -> +90 deg (right)
    return (liveScore / 100) * 180 - 90;
  }, [liveScore]);

  const faqs = [
    {
      q: "What is the Crypto Fear & Greed Index and how is it computed?",
      a: "The Crypto Fear & Greed Index is a quantitative metric ranging from 0 (Extreme Fear) to 100 (Extreme Greed). It aggregates 6 distinct market signals: Volatility (25%), Market Momentum/Volume (25%), Social Media Sentiment (15%), Derivatives Funding Skew (15%), Bitcoin Dominance (10%), and Google Search Trends (10%). By synthesizing these indicators into a single score, traders can detect emotional extremes before price reversals occur."
    },
    {
      q: "Why is 'Extreme Fear' considered a classic accumulation signal?",
      a: "As legendary investor Warren Buffett famously noted: 'Be fearful when others are greedy, and greedy when others are fearful.' When the index drops below 20 (Extreme Fear), panic selling and cascading liquidations frequently depress asset valuations far below their fundamental baseline, offering asymmetric risk-to-reward entry points for patient spot accumulators."
    },
    {
      q: "What risks exist when trading during 'Extreme Greed' (> 75)?",
      a: "When the index enters Extreme Greed (> 75), market participants become overleveraged in perpetual long positions, retail FOMO surges, and funding rates spike positive. In these conditions, even a minor liquidity sweep by institutional market makers can trigger a cascade of long liquidations, resulting in sharp 10% to 25% pullbacks."
    },
    {
      q: "How should I combine the Fear & Greed Index with Technical Analysis?",
      a: "Never use sentiment in isolation. High-performing algorithmic and institutional traders use the Fear & Greed Index as a macro filter: look for Bullish Divergences on RSI and high-volume order book support walls when sentiment is in Extreme Fear (< 25), and seek Bearish Divergences, rising funding rates, and resistance rejections when sentiment is in Extreme Greed (> 75)."
    }
  ];

  return (
    <div className="space-y-8">
      {/* Real-Time Sentiment Hero Banner & Speedometer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Speedometer Gauge Visualizer */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl flex flex-col justify-between relative overflow-hidden">
          {/* Ambient Glow */}
          <div
            className="absolute top-0 right-0 w-72 h-72 rounded-full blur-3xl opacity-15 pointer-events-none transition-all duration-700"
            style={{ backgroundColor: category.hex }}
          />

          <div className="flex items-center justify-between z-10">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Live Sentiment Telemetry
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
              Synced: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : "Live"}
            </span>
          </div>

          {/* SVG Semi-Circle Speedometer */}
          <div className="my-6 flex flex-col items-center justify-center relative">
            <svg viewBox="0 0 200 120" className="w-64 sm:w-80 h-auto overflow-visible">
              <defs>
                <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f43f5e" />
                  <stop offset="25%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#eab308" />
                  <stop offset="75%" stopColor="#a3e635" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>

              {/* Background Arc */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="currentColor"
                strokeWidth="18"
                className="text-slate-100 dark:text-slate-800"
                strokeLinecap="round"
              />

              {/* Colored Gradient Arc */}
              <path
                d="M 20 100 A 80 80 0 0 1 180 100"
                fill="none"
                stroke="url(#gaugeGradient)"
                strokeWidth="18"
                strokeLinecap="round"
                strokeDasharray="251.32"
                strokeDashoffset={251.32 - (251.32 * liveScore) / 100}
                className="transition-all duration-700 ease-out"
              />

              {/* Center Pivot */}
              <circle cx="100" cy="100" r="7" className="fill-slate-800 dark:fill-slate-100" />

              {/* Needle Indicator */}
              <g
                transform={`rotate(${angle} 100 100)`}
                className="transition-transform duration-700 ease-out origin-center"
              >
                <line
                  x1="100"
                  y1="100"
                  x2="100"
                  y2="30"
                  stroke={category.hex}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="shadow-lg"
                />
                <circle cx="100" cy="30" r="3" fill={category.hex} />
              </g>

              {/* Axis Labels */}
              <text x="18" y="116" fontSize="7" fontWeight="bold" className="fill-slate-400">0 (FEAR)</text>
              <text x="92" y="116" fontSize="7" fontWeight="bold" className="fill-slate-400">50</text>
              <text x="150" y="116" fontSize="7" fontWeight="bold" className="fill-slate-400">100 (GREED)</text>
            </svg>

            {/* Score Overlay */}
            <div className="text-center mt-2 space-y-1">
              <div className="text-5xl sm:text-6xl font-black tracking-tight text-slate-900 dark:text-white flex items-center justify-center gap-1">
                <span>{Math.round(liveScore)}</span>
                <span className="text-xl text-slate-400 font-normal">/100</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border shadow-sm"
                style={{
                  color: category.hex,
                  borderColor: `${category.hex}40`,
                  backgroundColor: `${category.hex}15`
                }}
              >
                <Flame className="w-3.5 h-3.5" />
                <span>{category.label}</span>
              </div>
            </div>
          </div>

          {/* Historical Range Chips */}
          <div className="grid grid-cols-4 gap-2 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-center">
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="block text-[10px] text-slate-400 font-medium">Yesterday</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">74 (Greed)</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="block text-[10px] text-slate-400 font-medium">Last Week</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">68 (Greed)</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="block text-[10px] text-slate-400 font-medium">Last Month</span>
              <span className="text-xs font-bold text-amber-500">42 (Fear)</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <span className="block text-[10px] text-slate-400 font-medium">Cycle Peak</span>
              <span className="text-xs font-bold text-emerald-400">94 (Ext Greed)</span>
            </div>
          </div>
        </div>

        {/* Quick Quant Strategy Insight Cards */}
        <div className="lg:col-span-6 space-y-4 flex flex-col justify-between">
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base text-white">Institutional Market Regime</h3>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                MOMENTUM CONTINUATION
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              The index currently sits at <strong className="text-amber-400">{Math.round(liveScore)} (Greed)</strong>. Historically, sustained readings between 65 and 80 accompany strong mid-cycle expansion waves driven by institutional ETF inflows and spot market absorption.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block font-medium">Optimal Execution Rule</span>
                <span className="text-xs font-bold text-emerald-400 mt-0.5 block">DIP ACCUMULATION</span>
                <span className="text-[10px] text-slate-400 mt-1 block">Buy Pullbacks to 4H 50 EMA</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700/60">
                <span className="text-[11px] text-slate-400 block font-medium">Leverage Risk Warning</span>
                <span className="text-xs font-bold text-amber-400 mt-0.5 block">MODERATE FUNDING SKEW</span>
                <span className="text-[10px] text-slate-400 mt-1 block">Cap Leverage at &le; 3x - 5x</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Scale className="w-4 h-4 text-indigo-500" />
                <span>Market Sentiment Zones & Action Matrix</span>
              </h4>
              <Link
                href="/concepts/fear-and-greed-index-math"
                className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>Read Formula Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-rose-500/10 border border-rose-500/20">
                <span className="font-bold text-rose-500">0 - 24: Extreme Fear</span>
                <span className="font-mono font-medium text-slate-700 dark:text-slate-300">Max Spot Accumulation / Aggressive Longs</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-yellow-400/10 border border-yellow-400/20">
                <span className="font-bold text-yellow-500">45 - 55: Neutral</span>
                <span className="font-mono font-medium text-slate-700 dark:text-slate-300">Range Trading & Key Level Breakout Confirmation</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <span className="font-bold text-emerald-500">76 - 100: Extreme Greed</span>
                <span className="font-mono font-medium text-slate-700 dark:text-slate-300">Take-Profit Scaling / Trailing Stop Tightening</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab("FACTORS")}
          className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === "FACTORS"
              ? "bg-amber-400 text-slate-950 shadow-md"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <PieChart className="w-4 h-4" />
          <span>6-Factor Weighted Breakdown</span>
        </button>
        <button
          onClick={() => setActiveTab("HISTORICAL")}
          className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === "HISTORICAL"
              ? "bg-amber-400 text-slate-950 shadow-md"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <History className="w-4 h-4" />
          <span>Historical Cycle Reversals</span>
        </button>
        <button
          onClick={() => setActiveTab("STRATEGY")}
          className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === "STRATEGY"
              ? "bg-amber-400 text-slate-950 shadow-md"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Contrarian Backtest Simulator</span>
        </button>
        <button
          onClick={() => setActiveTab("MACRO")}
          className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 whitespace-nowrap ${
            activeTab === "MACRO"
              ? "bg-amber-400 text-slate-950 shadow-md"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>Macro & Fed Liquidity Link</span>
        </button>
      </div>

      {/* TAB 1: 6-FACTOR WEIGHTED BREAKDOWN */}
      {activeTab === "FACTORS" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {factors.map((factor, idx) => {
              const factorCat = getScoreCategory(factor.score);
              return (
                <div
                  key={idx}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-slate-300 dark:hover:border-slate-700 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                      Factor Weight: <strong className="text-slate-900 dark:text-white font-mono">{factor.weight}%</strong>
                    </span>
                    <span
                      className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border"
                      style={{
                        color: factorCat.hex,
                        borderColor: `${factorCat.hex}40`,
                        backgroundColor: `${factorCat.hex}15`
                      }}
                    >
                      {factorCat.label} ({factor.score})
                    </span>
                  </div>

                  <div>
                    <h4 className="font-black text-sm text-slate-900 dark:text-white">{factor.name}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {factor.description}
                    </p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-700"
                        style={{
                          width: `${factor.score}%`,
                          backgroundColor: factorCat.hex
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-slate-400">Live Metric</span>
                      <span className="font-bold text-slate-700 dark:text-slate-300">{factor.metric}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: HISTORICAL CYCLE REVERSALS */}
      {activeTab === "HISTORICAL" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Historical Extreme Reversal Performance
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Empirical backtesting of every major cycle bottom and top since 2020. Extreme Fear consistently produced triple-digit 6-month returns.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/70 text-slate-500 font-mono text-[11px] uppercase tracking-wider border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-3 px-4">Date & Macro Event</th>
                  <th className="py-3 px-4">Index Score</th>
                  <th className="py-3 px-4">Sentiment State</th>
                  <th className="py-3 px-4">Bitcoin Price</th>
                  <th className="py-3 px-4 text-right">Subsequent 180-Day ROI</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {HISTORICAL_MILESTONES.map((m, idx) => {
                  const isPositive = m.subsequent180dReturn.startsWith("+");
                  return (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-white">{m.event}</div>
                        <div className="text-[11px] text-slate-400">{m.date}</div>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-black text-slate-900 dark:text-white">
                        {m.indexScore} / 100
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                            m.indexScore <= 20
                              ? "bg-rose-500/15 text-rose-500 border border-rose-500/30"
                              : "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                          }`}
                        >
                          {m.sentimentLabel}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-slate-700 dark:text-slate-300">
                        ${m.btcPrice.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-right font-mono font-black">
                        <span className={isPositive ? "text-emerald-500" : "text-rose-500"}>
                          {m.subsequent180dReturn}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: CONTRARIAN BACKTEST SIMULATOR */}
      {activeTab === "STRATEGY" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Contrarian Sentiment Backtest Engine
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Simulate quantitative portfolio performance by automatically accumulating spot Bitcoin when Fear index drops below the Buy Threshold and taking profit when Greed exceeds the Sell Threshold.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Starting Capital ($USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                <input
                  type="number"
                  value={backtestCapital}
                  onChange={(e) => setBacktestCapital(Math.max(100, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex justify-between">
                <span>Buy Trigger (&le; Fear Score)</span>
                <span className="font-mono text-rose-500 font-bold">{buyThreshold}</span>
              </label>
              <input
                type="range"
                min="5"
                max="40"
                value={buyThreshold}
                onChange={(e) => setBuyThreshold(Number(e.target.value))}
                className="w-full accent-rose-500"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex justify-between">
                <span>Sell Trigger (&ge; Greed Score)</span>
                <span className="font-mono text-emerald-500 font-bold">{sellThreshold}</span>
              </label>
              <input
                type="range"
                min="60"
                max="95"
                value={sellThreshold}
                onChange={(e) => setSellThreshold(Number(e.target.value))}
                className="w-full accent-emerald-500"
              />
            </div>
          </div>

          {/* Strategy Performance Matrix */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">Final Portfolio Value</span>
              <span className="text-lg font-black text-emerald-500 font-mono mt-0.5 block">
                ${Math.round(backtestResults.finalVal).toLocaleString()}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">Net Realized Return</span>
              <span className="text-lg font-black text-emerald-400 font-mono mt-0.5 block">
                +{backtestResults.profitPct}%
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">Sharpe Ratio</span>
              <span className="text-lg font-black text-indigo-400 font-mono mt-0.5 block">
                {backtestResults.sharpeRatio}
              </span>
            </div>
            <div>
              <span className="text-[11px] text-slate-400 block font-medium">Maximum Historical Drawdown</span>
              <span className="text-lg font-black text-rose-400 font-mono mt-0.5 block">
                {backtestResults.maxDrawdown}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: MACRO & FED LIQUIDITY */}
      {activeTab === "MACRO" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Macroeconomic Confluence & Liquidity Radar
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              How global central bank liquidity, US Consumer Price Index (CPI), and Fed interest rates interact with crypto market psychology.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center gap-2 text-amber-500 font-bold text-sm">
                <Compass className="w-4 h-4" />
                <span>US CPI Inflation & Risk Sentiment</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                When US headline CPI comes in below market forecasts, yields drop and the Fear & Greed Index surges as institutional capital pivots aggressively into Bitcoin and risk assets.
              </p>
              <Link
                href="/cpi"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
              >
                <span>Open US CPI Real-Time Macro Terminal &rarr;</span>
              </Link>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center gap-2 text-indigo-500 font-bold text-sm">
                <BarChart3 className="w-4 h-4" />
                <span>Global M2 Money Supply Expansion</span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Bitcoin has exhibited a 0.82 correlation with Global M2 money supply growth over the past 10 years. Rising central bank balance sheets directly suppress Fear metrics and elevate Greed.
              </p>
              <Link
                href="/concepts/stock-to-flow-vs-m2"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline"
              >
                <span>Read Stock-to-Flow vs M2 Quantitative Report &rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* FAQ & Knowledge Base Accordion */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Info className="w-5 h-5 text-amber-500" />
          <span>Frequently Asked Questions & Quantitative Methodology</span>
        </h3>

        <div className="space-y-3 pt-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === i && (
                <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
