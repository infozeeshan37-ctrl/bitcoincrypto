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
      a: "The Kelly Criterion calculates the mathematically optimal fraction of portfolio capital to allocate to maximize long-term geometric compounding. Full Kelly is known to produce high volatility and severe drawdowns; 'Half-Kelly' halves the allocation fraction to achieve 75% of maximum growth with 50% less portfolio variance."
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

      {/* Institutional Quantitative Risk Masterclass */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4 space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-700/80">
            <span>Quantitative Risk Masterclass</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 dark:text-white">
            The Mathematical Science of Capital Preservation &amp; Position Sizing
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            How quantitative hedge funds calculate risk of ruin, dynamic volatility stops, and compounding efficiency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-500" />
              <span>1. The Kelly Criterion Formula</span>
            </h4>
            <p>
              The Kelly Criterion determines the optimal bet fraction to maximize geometric compounding:
            </p>
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-mono text-[11px] text-center font-bold text-slate-900 dark:text-white">
              f* = (p × b - q) / b
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Where <em>p</em> is win probability, <em>b</em> is net payout odds (Reward:Risk ratio), and <em>q = 1 - p</em>. Because full Kelly yields high drawdown volatility, quant desks implement <strong>Half-Kelly (0.5 × f*)</strong> to slash variance by 50% while capturing 75% of peak geometric return.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-purple-500" />
              <span>2. ATR Volatility-Adjusted Stops</span>
            </h4>
            <p>
              Never place stop-losses based on arbitrary percentages. Market noise varies across market regimes.
            </p>
            <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 font-mono text-[11px] text-center font-bold text-slate-900 dark:text-white">
              Stop Distance = k × ATR(14, 1D)
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Using <strong>1.5× to 2.0× daily Average True Range (ATR)</strong> ensures stops sit outside normal statistical intraday fluctuations, preventing premature market-maker stop hunts before directional expansion begins.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>3. Monte Carlo Risk of Ruin</span>
            </h4>
            <p>
              In a series of 1,000 trades with a 55% win rate, a trader will mathematically experience a sequence of <strong>6 to 9 consecutive losses</strong>.
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              • Risking <strong>10% per trade</strong>: 7 losses destroy 52% of equity, requiring a 108% gain just to break even.
              <br />
              • Risking <strong>1.5% per trade</strong>: 7 losses draw down only 10% of equity, requiring an easily achievable 11% recovery.
            </p>
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Info className="w-5 h-5 text-amber-500" />
          <span>Position Sizing &amp; Capital Protection FAQs</span>
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

          {/* Additional In-Depth FAQs */}
          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition">
            <button
              onClick={() => setOpenFaq(openFaq === 99 ? null : 99)}
              className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <span>How does leverage impact my real position size risk?</span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                  openFaq === 99 ? "rotate-180" : ""
                }`}
              />
            </button>
            {openFaq === 99 && (
              <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                Leverage itself does not dictate your risk dollar amount—your stop loss distance and coin quantity do. Leverage simply determines how much initial collateral (margin) you must deposit to hold that position size. Using 10x leverage with a 1% stop loss carries the exact same dollar risk as 1x spot with a 1% stop loss, provided total position notional is equal.
              </div>
            )}
          </div>

          <div className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition">
            <button
              onClick={() => setOpenFaq(openFaq === 100 ? null : 100)}
              className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50"
            >
              <span>What is Slippage and why must it be accounted for in position sizing?</span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                  openFaq === 100 ? "rotate-180" : ""
                }`}
              />
            </button>
            {openFaq === 100 && (
              <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                Slippage occurs when a market order fills through multiple tiers of the Level-2 order book rather than entirely at the best bid or ask. During volatile market conditions or high-impact news events (e.g. US CPI releases), stops can execute beyond predefined invalidation levels. Prudent traders factor a 0.1% to 0.3% slippage buffer into their position sizing models.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
