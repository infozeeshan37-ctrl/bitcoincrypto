"use client";

import React, { useState } from "react";
import {
  Calculator,
  TrendingUp,
  Sparkles,
  DollarSign,
  Calendar,
  Layers,
  CheckCircle2,
  ArrowRight,
  Info
} from "lucide-react";
import Link from "next/link";

export default function DCACalculator() {
  const [periodicAmount, setPeriodicAmount] = useState(100);
  const [frequency, setFrequency] = useState<"weekly" | "monthly" | "daily">("weekly");
  const [years, setYears] = useState(3);
  const [targetAsset, setTargetAsset] = useState<"BTC" | "ETH" | "SOL">("BTC");
  const [growthModel, setGrowthModel] = useState<"conservative" | "moderate" | "bullish">("moderate");

  // Approximate baseline asset prices
  const assetPrices = {
    BTC: 92000,
    ETH: 3200,
    SOL: 190,
  };

  // Expected CAGR annualized returns for projections
  const cagrRates = {
    conservative: 0.25, // 25% CAGR
    moderate: 0.50,     // 50% CAGR
    bullish: 0.85,      // 85% CAGR
  };

  // Frequency multipliers (periods per year)
  const periodsPerYear = frequency === "daily" ? 365 : frequency === "weekly" ? 52 : 12;
  const totalPeriods = periodsPerYear * years;
  const totalInvested = periodicAmount * totalPeriods;

  // Compounded future value of annuity formula: FV = PMT * [((1 + r)^n - 1) / r]
  const periodRate = Math.pow(1 + cagrRates[growthModel], 1 / periodsPerYear) - 1;
  const projectedPortfolioValue = periodicAmount * ((Math.pow(1 + periodRate, totalPeriods) - 1) / periodRate);
  const totalProfit = projectedPortfolioValue - totalInvested;
  const totalRoiPercent = ((totalProfit / totalInvested) * 100).toFixed(1);

  // Estimated coins accumulated
  const avgExpectedPrice = assetPrices[targetAsset] * (1 + (cagrRates[growthModel] * years * 0.45));
  const estimatedTokens = totalInvested / avgExpectedPrice;

  const fmtCurrency = (n: number) => {
    return `$${Math.round(n).toLocaleString()}`;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100 dark:border-slate-800">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
              <Calculator className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Interactive Dollar-Cost Averaging (DCA) Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Model periodic asset accumulation, harmonic mean cost reduction, and multi-year compounding.
          </p>
        </div>

        <span className="text-xs font-mono font-bold px-3 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto">
          Harmonic Mean Engine
        </span>
      </div>

      {/* Calculator Form Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Periodic Amount */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Recurring Investment ($)
          </label>
          <div className="relative">
            <DollarSign className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="number"
              min={10}
              step={25}
              value={periodicAmount}
              onChange={(e) => setPeriodicAmount(Math.max(5, Number(e.target.value)))}
              className="w-full pl-8 pr-3 py-2 text-xs font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>
        </div>

        {/* Frequency */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Frequency Interval
          </label>
          <select
            value={frequency}
            onChange={(e) => setFrequency(e.target.value as any)}
            className="w-full px-3 py-2 text-xs font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <option value="daily">Daily (${periodicAmount * 30}/mo)</option>
            <option value="weekly">Weekly (${periodicAmount * 4}/mo)</option>
            <option value="monthly">Monthly (${periodicAmount}/mo)</option>
          </select>
        </div>

        {/* Accumulation Horizon */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Time Horizon
          </label>
          <select
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full px-3 py-2 text-xs font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <option value={1}>1 Year (Short Cycle)</option>
            <option value={2}>2 Years (Mid Cycle)</option>
            <option value={3}>3 Years (Halving Ramp)</option>
            <option value={4}>4 Years (Full Halving Cycle)</option>
            <option value={5}>5 Years (Multi-Cycle)</option>
          </select>
        </div>

        {/* Asset Selection */}
        <div className="space-y-1.5">
          <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400">
            Accumulation Asset
          </label>
          <div className="grid grid-cols-3 gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            {(["BTC", "ETH", "SOL"] as const).map((sym) => (
              <button
                key={sym}
                onClick={() => setTargetAsset(sym)}
                className={`py-1 rounded-lg text-xs font-bold font-mono transition ${
                  targetAsset === sym
                    ? "bg-amber-400 text-slate-950 shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {sym}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Growth Model Scenario Chips */}
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 mr-2">Cycle Model:</span>
        {[
          { id: "conservative", label: "Conservative (25% CAGR)", desc: "Mature macro adoption" },
          { id: "moderate", label: "Moderate (50% CAGR)", desc: "Historical crypto baseline" },
          { id: "bullish", label: "Supercycle (85% CAGR)", desc: "Institutional liquidity surge" },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setGrowthModel(m.id as any)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              growthModel === m.id
                ? "bg-slate-900 dark:bg-slate-700 text-white shadow-sm"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {m.label}
          </button>
        ))}
      </div>

      {/* Results Projection Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
        
        {/* Total Invested */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
          <span className="text-[10px] uppercase font-mono font-bold text-slate-400 dark:text-slate-500">
            Total Fiat Invested
          </span>
          <div className="text-xl font-black text-slate-900 dark:text-white font-mono">
            {fmtCurrency(totalInvested)}
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">
            Over {years} Years ({totalPeriods} orders)
          </span>
        </div>

        {/* Projected Portfolio Value */}
        <div className="p-4 rounded-2xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-400/40 space-y-1">
          <span className="text-[10px] uppercase font-mono font-bold text-amber-700 dark:text-amber-300">
            Projected Value
          </span>
          <div className="text-xl font-black text-amber-600 dark:text-amber-400 font-mono">
            {fmtCurrency(projectedPortfolioValue)}
          </div>
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> +{totalRoiPercent}% Net ROI
          </span>
        </div>

        {/* Total Net Profit */}
        <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 space-y-1">
          <span className="text-[10px] uppercase font-mono font-bold text-emerald-700 dark:text-emerald-300">
            Total Net Gain
          </span>
          <div className="text-xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
            +{fmtCurrency(totalProfit)}
          </div>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-300 font-medium">
            Compound Wealth Created
          </span>
        </div>

        {/* Estimated Accumulated Tokens */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
          <span className="text-[10px] uppercase font-mono font-bold text-slate-400 dark:text-slate-500">
            Tokens Accumulated
          </span>
          <div className="text-xl font-black text-slate-900 dark:text-white font-mono">
            ≈ {estimatedTokens >= 1 ? estimatedTokens.toFixed(3) : estimatedTokens.toFixed(4)} {targetAsset}
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">
            Harmonic average cost basis
          </span>
        </div>

      </div>

      {/* Why DCA Beats Discretionary Trading Note */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2.5">
          <Info className="w-4 h-4 text-amber-500 shrink-0" />
          <p className="text-slate-600 dark:text-slate-300">
            <strong>The DCA Edge:</strong> Fixed dollar allocations automatically purchase more units when prices dip and fewer when prices peak, eliminating timing anxiety.
          </p>
        </div>
        <Link
          href="/blog/the-mathematics-of-dca-in-crypto"
          className="text-amber-600 dark:text-amber-400 font-bold hover:underline shrink-0 flex items-center gap-1"
        >
          <span>Read Quant Proof</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

    </div>
  );
}
