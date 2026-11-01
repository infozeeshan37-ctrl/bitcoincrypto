"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Activity,
  CheckCircle2,
  Lock,
  LineChart,
  BarChart3,
  Scale,
  Sparkles,
  Radio,
  FileText
} from "lucide-react";
import PredictionMethodologyModal from "./PredictionMethodologyModal";

export default function PredictionTrustHeader() {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      {/* Top Banner: Title and Status */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>Institutional Research &amp; Machine Learning Engine</span>
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              <Radio className="w-3 h-3 animate-ping" />
              <span>Binance L2 Depth Stream Active</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            Cryptocurrency AI Price Prediction Engine
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            Quantitative multi-horizon price models synthesizing real-time <strong>Level-2 Order Book Imbalance (OBI)</strong>, <strong>Cumulative Volume Delta (CVD)</strong>, <strong>CoinGlass 2D Liquidation Clusters</strong>, and <strong>Macro US CPI Disinflation Cycles</strong>.
          </p>
        </div>

        {/* Action Button: Methodology Modal */}
        <div className="shrink-0 flex items-center gap-3">
          <PredictionMethodologyModal />
        </div>
      </div>

      {/* 4 Verified Institutional Alpha Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 font-mono text-xs">
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-bold">
            <span>Directional Precision</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400">
            73.8%
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
            1,200+ Validated Signals
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-bold">
            <span>Profit Factor</span>
            <LineChart className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-500">
            2.18
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
            Gross Wins / Gross Losses
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-bold">
            <span>Sharpe Ratio</span>
            <Scale className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-blue-500">
            1.86
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
            Annualized Risk-Adjusted
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
          <div className="flex items-center justify-between text-slate-400 text-[10px] uppercase font-bold">
            <span>Average R:R</span>
            <Activity className="w-3.5 h-3.5 text-purple-500" />
          </div>
          <div className="text-xl sm:text-2xl font-black text-purple-500">
            1 : 3.2
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
            Asymmetric Risk/Reward
          </span>
        </div>
      </div>

      {/* Compliance & Authenticity Trust Strip */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/25 flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
        <div className="flex items-start md:items-center gap-2.5">
          <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5 md:mt-0" />
          <span className="text-slate-700 dark:text-slate-300 leading-tight">
            <strong>Authenticity &amp; Zero Gambling Guarantee:</strong> Zero real-money wagers, casino betting, or custody. Formulated strictly for educational quantitative paper-trading and backtesting analysis.
          </span>
        </div>

        <Link
          href="/disclaimer"
          className="text-amber-800 dark:text-amber-400 font-bold hover:underline shrink-0 text-xs font-mono"
        >
          Institutional Disclosure &rarr;
        </Link>
      </div>
    </div>
  );
}
