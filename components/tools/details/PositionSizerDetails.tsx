"use client";

import React from "react";
import {
  Sliders,
  ShieldAlert,
  TrendingUp,
  TrendingDown,
  Target,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Zap,
  Activity,
  Calculator,
  Percent,
  Scale,
  Lock,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function PositionSizerDetails() {
  const drawdownTable = [
    { loss: "10%", gainNeeded: "11.1%", severity: "Minor Drawdown", status: "Manageable within standard trading cycle" },
    { loss: "20%", gainNeeded: "25.0%", severity: "Moderate Drawdown", status: "Requires 2:1 R:R winning streak to recover" },
    { loss: "30%", gainNeeded: "42.9%", severity: "Significant Loss", status: "Requires disciplined risk reduction" },
    { loss: "50%", gainNeeded: "100.0%", severity: "Severe Capital Halving", status: "Requires doubling account just to breakeven" },
    { loss: "75%", gainNeeded: "300.0%", severity: "Near Fatal Drawdown", status: "Requires quadrupling capital (extremely rare)" },
    { loss: "90%", gainNeeded: "900.0%", severity: "Total Account Ruin", status: "Mathematically irreversible for retail traders" }
  ];

  const riskRules = [
    {
      title: "The 1% - 2% Fixed Fractional Model",
      badge: "Account Survival",
      desc: "Never risk more than 1.0% to 2.0% of total portfolio equity on any single trade setup. This ensures that even an anomalous 10-trade losing streak only results in a minor ~15% drawdown."
    },
    {
      title: "Structural Invalidation vs Arbitrary Stops",
      badge: "Technical Integrity",
      desc: "Stop losses must be placed at the exact technical invalidation price (below swing lows, order blocks, or liquidity sweeps), not at an arbitrary dollar figure. Position size adjusts to the stop distance, never vice versa."
    },
    {
      title: "Positive Mathematical Expectancy (E > 0)",
      badge: "Statistical Edge",
      desc: "Trading profitability is governed by E = (Win Rate × Avg Win) - (Loss Rate × Avg Loss). With a 1:2.5+ R:R ratio, a trader can lose 60% of their trades and still compound substantial net gains."
    },
    {
      title: "De-risking & Breakeven Execution (TP1 Rule)",
      badge: "Capital Protection",
      desc: "When Target 1 (TP1) is achieved, immediately close 50% of the trade to lock in guaranteed profit and move the Stop Loss to the original Entry Price (Breakeven)."
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-10 transition-colors">
      
      {/* 1. Header & Overview */}
      <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-700/80">
          <Sliders className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>Quantitative Risk Sizing Protocol</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          The Mathematics of Position Sizing &amp; Account Preservation
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
          Position sizing is the single most decisive factor determining trader survival and long-term profitability in cryptocurrency markets. Even the most accurate technical strategy will suffer account ruin if position lots are sized arbitrarily without mathematical stop-loss distance formulas.
        </p>
      </div>

      {/* 2. Mathematical Position Sizing Formulation */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-700 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Standard Quantitative Sizing Equations
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Exact equations used by automated execution algorithms and quantitative hedge funds
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto">
            Zero-Ruin Sizing
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">1. Maximum Dollar Risk</span>
            <div className="text-sm font-black text-rose-600 dark:text-rose-400">
              Risk ($) = Capital × Risk %
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
              E.g. $10,000 account × 1.5% = <strong>$150 max loss</strong> at stop loss.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">2. Recommended Lot Units</span>
            <div className="text-sm font-black text-amber-600 dark:text-amber-400">
              Units = Risk ($) / |Entry - SL|
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
              Exact number of crypto tokens to purchase based on invalidation distance.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">3. Risk/Reward Ratio (R:R)</span>
            <div className="text-sm font-black text-emerald-600 dark:text-emerald-400">
              R:R = |TP - Entry| / |Entry - SL|
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
              Must exceed <strong>1 : 2.0</strong> to ensure positive expectancy.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Non-Linear Drawdown Recovery Curve Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-500" />
            <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              The Exponential Math of Account Drawdown Recovery
            </h4>
          </div>
          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">Risk of Ruin Matrix</span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 uppercase font-mono text-[10px] font-bold">
              <tr>
                <th className="p-3.5 text-rose-700 dark:text-rose-400">Account Loss %</th>
                <th className="p-3.5 text-emerald-700 dark:text-emerald-400">Required Gain % to Breakeven</th>
                <th className="p-3.5">Severity Level</th>
                <th className="p-3.5">Mathematical Implication</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800 bg-white dark:bg-slate-900 font-mono">
              {drawdownTable.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                  <td className="p-3.5 font-black text-rose-600 dark:text-rose-400">{row.loss}</td>
                  <td className="p-3.5 font-black text-emerald-600 dark:text-emerald-400">{row.gainNeeded}</td>
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white font-sans">{row.severity}</td>
                  <td className="p-3.5 text-slate-500 dark:text-slate-400 font-sans">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-900 dark:text-rose-300 flex items-start gap-3">
          <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <p>
            <strong>The Asymmetric Danger of Deep Losses:</strong> As your account suffers larger drawdowns, the required recovery gain increases non-linearly. A 50% loss requires a 100% gain just to return to even. Strict adherence to the 1% risk rule ensures you never breach the dangerous 15% drawdown threshold.
          </p>
        </div>
      </div>

      {/* 4. Core Quantitative Risk Management Principles */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-amber-500" />
            <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              Institutional Risk Management Rules
            </h4>
          </div>
          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">Execution Frameworks</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {riskRules.map((rule, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300">
                    {rule.badge}
                  </span>
                </div>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white">{rule.title}</h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{rule.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Expectancy Matrix Callout */}
      <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-3 border border-slate-800">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <h4 className="text-sm font-black text-white">
              Mathematical Expectancy Proof: 40% Win Rate is Highly Profitable
            </h4>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">Quant Insight</span>
        </div>

        <div className="text-xs text-slate-300 leading-relaxed space-y-2">
          <p>
            Consider a sequence of <strong>100 trades</strong> risking $100 per trade with a <strong>1 : 3.0 Risk-to-Reward Ratio</strong> and only a <strong>40% Win Rate</strong>:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1 font-mono text-xs">
            <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
              <span className="text-rose-400 font-bold">60 Losing Trades (-$100):</span>
              <div className="text-lg font-black text-white mt-0.5">-$6,000</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-800 border border-slate-700">
              <span className="text-emerald-400 font-bold">40 Winning Trades (+$300):</span>
              <div className="text-lg font-black text-white mt-0.5">+$12,000</div>
            </div>
            <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-700/80">
              <span className="text-emerald-300 font-bold">Net Total Profit:</span>
              <div className="text-lg font-black text-emerald-400 mt-0.5">+$6,000 Net Gain</div>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 pt-1">
            <strong>Conclusion:</strong> Trader profitability is not determined by win percentage; it is determined by asymmetric Risk-to-Reward ratio execution and disciplined lot sizing.
          </p>
        </div>
      </div>

    </div>
  );
}
