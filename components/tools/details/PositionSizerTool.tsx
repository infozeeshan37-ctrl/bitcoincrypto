"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Calculator,
  Sliders,
  AlertTriangle,
  TrendingUp,
  Info,
  ChevronDown,
  ArrowRight,
  Zap,
  Scale,
  DollarSign,
  Percent,
  CheckCircle2
} from "lucide-react";

export default function PositionSizerTool() {
  const [accountBalance, setAccountBalance] = useState<number>(10000);
  const [riskPercentage, setRiskPercentage] = useState<number>(1.5); // 1.5%
  const [entryPrice, setEntryPrice] = useState<number>(88450);
  const [stopLossPrice, setStopLossPrice] = useState<number>(85500);
  const [takeProfitPrice, setTakeProfitPrice] = useState<number>(96000);
  const [winRateEstimate, setWinRateEstimate] = useState<number>(55); // 55%
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Math calculations
  const sizing = useMemo(() => {
    const riskDollarAmount = accountBalance * (riskPercentage / 100);
    const stopDistance = Math.abs(entryPrice - stopLossPrice);
    const stopDistancePct = entryPrice > 0 ? (stopDistance / entryPrice) * 100 : 0;

    const coinQuantity = stopDistance > 0 ? riskDollarAmount / stopDistance : 0;
    const totalNotionalUsd = coinQuantity * entryPrice;

    // Target profit math
    const rewardDistance = Math.abs(takeProfitPrice - entryPrice);
    const rewardDollarAmount = coinQuantity * rewardDistance;
    const riskRewardRatio = stopDistance > 0 ? (rewardDistance / stopDistance).toFixed(2) : "0";

    // Kelly Criterion calculation: Kelly % = W - [(1 - W) / R]
    const w = winRateEstimate / 100;
    const r = Number(riskRewardRatio) || 1;
    const kellyPctRaw = w - (1 - w) / r;
    const kellySuggestedPct = Math.max(0, Math.min(10, +(kellyPctRaw * 100 * 0.5).toFixed(1))); // Half-Kelly for safety

    // Recommended margin vs leverage
    const recommendedSpotMargin = totalNotionalUsd;
    const recommended10xMargin = totalNotionalUsd / 10;

    return {
      riskDollarAmount,
      stopDistance,
      stopDistancePct,
      coinQuantity,
      totalNotionalUsd,
      rewardDollarAmount,
      riskRewardRatio,
      kellySuggestedPct,
      recommendedSpotMargin,
      recommended10xMargin
    };
  }, [accountBalance, riskPercentage, entryPrice, stopLossPrice, takeProfitPrice, winRateEstimate]);

  const faqs = [
    {
      q: "Why is Position Sizing the #1 determinant of long-term trader survival?",
      a: "Even with a 70% win-rate strategy, risking too much capital per trade (e.g., 10%+) guarantees eventual account ruin during an inevitable streak of consecutive losing trades. Professional quantitative funds cap individual trade risk between 0.5% and 2.0% of total portfolio equity."
    },
    {
      q: "What is the Half-Kelly Criterion and how does it prevent blowups?",
      a: "The Kelly Criterion calculates the mathematically optimal fraction of bankroll to wager to maximize geometric growth. Full Kelly is known to produce high volatility and severe drawdowns; 'Half-Kelly' halves the wager fraction to achieve 75% of maximum growth with 50% less portfolio variance."
    },
    {
      q: "How does my Stop-Loss distance dictate my position size?",
      a: "Position Size (in Coins) = Dollars at Risk / Dollar Distance to Stop Loss. If your stop loss is tight (e.g., 1.5%), you can safely command a larger notional position without exceeding your total allowed risk limit. If your stop loss is wide (e.g., 8%), your position size must scale down proportionally."
    }
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Parameters */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="font-black text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-500" />
              <span>Risk & Invalidation Inputs</span>
            </h3>
            <span className="text-xs font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              Risk: ${sizing.riskDollarAmount.toFixed(2)}
            </span>
          </div>

          <div className="space-y-4">
            {/* Account Balance */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Total Account Portfolio Equity ($USD)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                <input
                  type="number"
                  value={accountBalance}
                  onChange={(e) => setAccountBalance(Math.max(10, Number(e.target.value)))}
                  className="w-full pl-7 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            {/* Risk Percentage Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-700 dark:text-slate-300">Risk Allocation Per Trade (%)</span>
                <span className={`font-mono px-2 py-0.5 rounded-md ${
                  riskPercentage > 3 ? "bg-rose-500/20 text-rose-500" : "bg-emerald-500/20 text-emerald-500"
                }`}>
                  {riskPercentage}% (${sizing.riskDollarAmount.toFixed(2)})
                </span>
              </div>
              <input
                type="range"
                min="0.25"
                max="5.0"
                step="0.25"
                value={riskPercentage}
                onChange={(e) => setRiskPercentage(Number(e.target.value))}
                className="w-full accent-amber-400"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0.5% (Conservative)</span>
                <span>1.5% (Optimal)</span>
                <span>3.0% (Aggressive)</span>
                <span>5.0% (High Risk)</span>
              </div>
            </div>

            {/* Price Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Entry Price ($)
                </label>
                <input
                  type="number"
                  step="any"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(Math.max(0.0001, Number(e.target.value)))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-rose-500">
                  Stop Loss Price ($)
                </label>
                <input
                  type="number"
                  step="any"
                  value={stopLossPrice}
                  onChange={(e) => setStopLossPrice(Math.max(0.0001, Number(e.target.value)))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-rose-500/30 font-mono text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-emerald-500">
                  Take Profit Price ($)
                </label>
                <input
                  type="number"
                  step="any"
                  value={takeProfitPrice}
                  onChange={(e) => setTakeProfitPrice(Math.max(0.0001, Number(e.target.value)))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-emerald-500/30 font-mono text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
            </div>

            {/* Win Rate Slider for Kelly */}
            <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <div className="flex justify-between items-center text-xs font-bold">
                <span className="text-slate-700 dark:text-slate-300">Historical Strategy Win Rate (%)</span>
                <span className="font-mono text-amber-500">{winRateEstimate}%</span>
              </div>
              <input
                type="range"
                min="35"
                max="85"
                value={winRateEstimate}
                onChange={(e) => setWinRateEstimate(Number(e.target.value))}
                className="w-full accent-amber-400"
              />
              <span className="text-[10px] text-slate-400 block mt-1">
                Half-Kelly Optimal Sizing: <strong className="text-slate-900 dark:text-white">{sizing.kellySuggestedPct}%</strong> of portfolio.
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Position Size Outputs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-xl space-y-6 relative overflow-hidden">
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Optimal Position Sizing Output
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-3xl sm:text-4xl font-black font-mono text-amber-400 tracking-tight">
                  {sizing.coinQuantity.toFixed(4)} Units
                </span>
                <span className="text-sm font-bold font-mono text-slate-300">
                  (${sizing.totalNotionalUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })} Notional)
                </span>
              </div>
            </div>

            {/* Metrics Matrix */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                <span className="text-slate-400 block text-[10px]">Capital at Risk</span>
                <span className="font-mono font-black text-rose-400 mt-0.5 block">
                  -${sizing.riskDollarAmount.toFixed(2)}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                <span className="text-slate-400 block text-[10px]">Target Profit</span>
                <span className="font-mono font-black text-emerald-400 mt-0.5 block">
                  +${sizing.rewardDollarAmount.toFixed(2)}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                <span className="text-slate-400 block text-[10px]">Risk : Reward</span>
                <span className="font-mono font-black text-amber-400 mt-0.5 block">
                  1 : {sizing.riskRewardRatio}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                <span className="text-slate-400 block text-[10px]">Invalidation Distance</span>
                <span className="font-mono font-bold text-slate-200 mt-0.5 block">
                  {sizing.stopDistancePct.toFixed(2)}%
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                <span className="text-slate-400 block text-[10px]">Spot Margin Needed</span>
                <span className="font-mono font-bold text-slate-200 mt-0.5 block">
                  ${sizing.recommendedSpotMargin.toFixed(0)}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700">
                <span className="text-slate-400 block text-[10px]">10x Margin Needed</span>
                <span className="font-mono font-bold text-slate-200 mt-0.5 block">
                  ${sizing.recommended10xMargin.toFixed(0)}
                </span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Risk Management Rules of Thumb</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span><strong>The 1.5% Hard Cap:</strong> Never risk more than 1.5% of total account balance on a single discretionary trade setup.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span><strong>Minimum 1:2 Risk-Reward:</strong> Ensure your profit target is at least twice the distance of your invalidation stop.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                <span><strong>Dynamic Leverage Adjustment:</strong> Use leverage only as capital efficiency, not to artificially increase your risk dollar exposure.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Info className="w-5 h-5 text-amber-500" />
          <span>Position Sizing FAQs</span>
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
