"use client";

import React from "react";
import {
  BarChart2,
  TrendingUp,
  TrendingDown,
  Layers,
  Sparkles,
  Target,
  Clock,
  ShieldCheck,
  Zap,
  Activity,
  CheckCircle2,
  Eye,
  Sliders,
  Compass,
  ArrowRight,
  Info
} from "lucide-react";
import Link from "next/link";

export default function ChartTerminalDetails() {
  const timeframes = [
    {
      range: "1m - 15m",
      title: "Micro Execution & Order Flow",
      badge: "High-Frequency / Scalp",
      desc: "Used for pinpoint entries, identifying micro Fair Value Gaps (FVGs), real-time orderbook absorption, and immediate liquidity sweeps around key levels.",
      useCases: ["Precision Entry Triggers", "Footprint / CVD Delta Confirmation", "Intraday Liquidity Sweeps"]
    },
    {
      range: "1H - 4H",
      title: "Intraday & Swing Structure",
      badge: "Institutional Swings",
      desc: "The primary timeframe for establishing session highs/lows, defining Break of Structure (BOS) vs Change of Character (CHoCH), and mapping key support/resistance zones.",
      useCases: ["Session Highs & Lows (London/NY)", "Dynamic 50 & 200 EMA Trends", "Supply & Demand Order Blocks"]
    },
    {
      range: "1D - 1W",
      title: "Macro Cycle & Trend Direction",
      badge: "Macro Accumulation",
      desc: "Filters out retail market noise to establish the dominant secular trend, multi-month Fibonacci retracements, and institutional accumulation/distribution phases.",
      useCases: ["Halving Cycle Trends", "Macro Fibonacci Golden Pockets", "Long-Term Moving Average Crosses"]
    }
  ];

  const indicators = [
    {
      name: "Relative Strength Index (RSI 14)",
      type: "Momentum Oscillator",
      formula: "100 - [100 / (1 + RS)]",
      desc: "Measures the velocity and magnitude of directional price movements. Standard thresholds sit at 70 (Overbought) and 30 (Oversold).",
      proTip: "Look for Bullish/Bearish Divergences between price higher highs and RSI lower highs for high-probability trend exhaustion signals."
    },
    {
      name: "Moving Average Convergence Divergence (MACD)",
      type: "Trend Following & Momentum",
      formula: "12 EMA - 26 EMA (Signal: 9 EMA)",
      desc: "Reveals shifts in momentum through the convergence and divergence of two exponential moving averages, displayed as a histogram.",
      proTip: "Zero-line crossovers confirm macro trend continuation, while histogram contractions warn of momentum deceleration before price turns."
    },
    {
      name: "Bollinger Bands (BB 20, 2)",
      type: "Volatility Bands",
      formula: "20 SMA ± (2 × σ)",
      desc: "Envelopes price action within standard deviation bands based on a 20-period moving average to gauge market volatility expansions and contractions.",
      proTip: "A 'Bollinger Band Squeeze' (bandwidth contraction) indicates imminent high-volatility expansion; trade in the direction of the subsequent breakout candle."
    },
    {
      name: "200 EMA & 50 EMA Trend Filter",
      type: "Trend Moving Averages",
      formula: "Exponential Weighting of Close Prices",
      desc: "The institutional benchmark for defining bull vs bear regimes. Prices trading above the 200 EMA represent macro bullish market structure.",
      proTip: "Golden Cross (50 EMA crossing above 200 EMA) signals institutional cycle accumulation; Death Cross warns of sustained macro markdowns."
    },
    {
      name: "Volume Profile & Point of Control (VPOC)",
      type: "Volume Distribution",
      formula: "Volume Traded at Exact Price Nodes",
      desc: "Displays the distribution of trading volume across specific price levels rather than time, identifying high-liquidity acceptance zones.",
      proTip: "The VPOC acts as a gravitational price magnet during range rotations. Value Area High (VAH) and Low (VAL) define institutional rejection levels."
    }
  ];

  const pivotMethods = [
    {
      name: "Fibonacci Pivots",
      bestFor: "Trend Retracements & Extensions",
      desc: "Calculates support and resistance using standard Golden Ratios (38.2%, 61.8%, 100%). Ideal for trending crypto markets."
    },
    {
      name: "Camarilla Pivots",
      bestFor: "Intraday Range & Reversals",
      desc: "Uses an 8-level system with tighter intervals. R3/S3 define mean-reversion zones, while R4/S4 signal explosive breakout entries."
    },
    {
      name: "Classic Floor Pivots",
      bestFor: "General Daily Benchmarks",
      desc: "The standard 3-level pivot system derived from previous day High, Low, and Close. Heavily watched by algorithmic market makers."
    },
    {
      name: "Woodie Pivots",
      bestFor: "Momentum & Open Weights",
      desc: "Gives extra weighting to the recent closing price, making pivot levels react faster to sudden late-session price surges."
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-10 transition-colors">
      
      {/* 1. Header & Overview */}
      <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-700/80">
          <BarChart2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>Institutional Technical Analysis Guide</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Live Terminal Architecture &amp; Charting Methodology
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
          The BitcoinCrypto.tech Live Chart Terminal pairs institutional-grade TradingView candlestick data with real-time mathematical pivot calculators, oscillator gauges, and volume profiling. Understand how professional desks combine multi-timeframe structure, indicator confluence, and liquidity profiling.
        </p>
      </div>

      {/* 2. Multi-Timeframe Structure Analysis */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-500" />
            <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              Multi-Timeframe Market Structure Hierarchy
            </h4>
          </div>
          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">Top-Down Analysis</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {timeframes.map((tf, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300">
                    {tf.range}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">{tf.badge}</span>
                </div>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white">{tf.title}</h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{tf.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 space-y-1.5">
                <span className="text-[10px] font-mono font-bold uppercase text-slate-400 dark:text-slate-500">
                  Primary Objectives:
                </span>
                {tf.useCases.map((uc, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-700 dark:text-slate-300 font-medium">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500 shrink-0" />
                    <span>{uc}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Core Technical Indicators Guide */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-amber-500" />
            <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              Institutional Technical Indicators Guide
            </h4>
          </div>
          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">Mathematical Formulations</span>
        </div>

        <div className="space-y-3">
          {indicators.map((ind, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <h5 className="text-sm font-bold text-slate-900 dark:text-white">{ind.name}</h5>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {ind.type}
                  </span>
                </div>
                <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-bold">
                  Formula: {ind.formula}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {ind.desc}
              </p>
              <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/80 flex items-start gap-2 text-[11px] text-amber-900 dark:text-amber-300">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Professional Execution Tip:</strong> {ind.proTip}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Pivot Points & Fibonacci Confluence Matrix */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Target className="w-4 h-4 text-amber-500" />
            <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              Mathematical Pivot Point Systems &amp; Fibonacci Confluence
            </h4>
          </div>
          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">Support &amp; Resistance Models</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pivotMethods.map((pm, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <h5 className="text-xs font-bold text-slate-900 dark:text-white">{pm.name}</h5>
                <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                  {pm.bestFor}
                </span>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {pm.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Fibonacci Golden Pocket Callout */}
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-400/40 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300">
            <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>The 0.618 - 0.650 "Golden Pocket" Confluence Zone</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            In crypto market cycles, deep pullbacks to the 61.8% – 65.0% Fibonacci retracement level consistently represent the highest mathematical risk-to-reward long accumulation zones. When the Golden Pocket aligns with the Central Pivot Point (P) or 200 EMA, algorithmic buy execution triggers aggressively.
          </p>
        </div>
      </div>

      {/* 5. Professional Chart Execution Checklist */}
      <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4 border border-slate-800">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-black text-white">
              Institutional Pre-Trade Execution Checklist
            </h4>
          </div>
          <span className="text-[10px] font-mono text-amber-400 font-bold uppercase">Discipline Protocol</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-start gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Higher-Timeframe Alignment:</strong> Confirm direction with 4H / 1D trend before entering on 5M/15M.</span>
          </div>
          <div className="flex items-start gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Candle Close Confirmation:</strong> Never enter on an active wick; wait for candle close above/below key pivots.</span>
          </div>
          <div className="flex items-start gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Risk-Reward Verification:</strong> Ensure minimum calculated R:R is at least 1:2.5 before order placement.</span>
          </div>
          <div className="flex items-start gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span><strong>Orderbook Delta Validation:</strong> Cross-check CVD volume delta to ensure aggressive takers support your bias.</span>
          </div>
        </div>
      </div>

    </div>
  );
}
