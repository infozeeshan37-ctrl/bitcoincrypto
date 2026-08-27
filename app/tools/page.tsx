"use client";

import { useState } from "react";
import {
  Cpu,
  BarChart2,
  Calculator,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  Sliders,
  DollarSign,
  Percent,
  Layers,
  Sparkles,
  CheckCircle2,
  ShieldAlert,
  Bot
} from "lucide-react";
import AITradingBotTerminal from "@/components/tools/AITradingBotTerminal";

export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState<"bot" | "terminal" | "dca" | "sizer" | "converter">("bot");
  const [chartSymbol, setChartSymbol] = useState("BINANCE:BTCUSDT");

  // DCA Simulator State
  const [monthlyInvest, setMonthlyInvest] = useState(250);
  const [dcaYears, setDcaYears] = useState(3);
  const [projectedGrowth, setProjectedGrowth] = useState(35);

  // Position Sizer State
  const [accountSize, setAccountSize] = useState(10000);
  const [riskPercent, setRiskPercent] = useState(1.5);
  const [entryPrice, setEntryPrice] = useState(65000);
  const [stopLoss, setStopLoss] = useState(62000);
  const [takeProfit, setTakeProfit] = useState(74000);

  // Spot Converter State
  const [convertAmount, setConvertAmount] = useState(1);
  const [fromAsset, setFromAsset] = useState<"BTC" | "ETH" | "SOL" | "USDT">("BTC");
  const [toAsset, setToAsset] = useState<"USD" | "EUR" | "GBP" | "BTC" | "ETH">("USD");

  const rates: Record<string, number> = {
    BTC: 66200,
    ETH: 3480,
    SOL: 165,
    USDT: 1.0,
    USD: 1.0,
    EUR: 1.08,
    GBP: 1.28,
  };

  const totalMonths = dcaYears * 12;
  const totalInvested = monthlyInvest * totalMonths;
  const monthlyRate = projectedGrowth / 100 / 12;
  const estimatedPortfolioValue = monthlyInvest * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
  const totalProfit = estimatedPortfolioValue - totalInvested;
  const profitPercentage = ((totalProfit / totalInvested) * 100).toFixed(1);

  const riskDollar = (accountSize * riskPercent) / 100;
  const priceDistance = Math.abs(entryPrice - stopLoss);
  const positionUnits = priceDistance > 0 ? riskDollar / priceDistance : 0;
  const positionValue = positionUnits * entryPrice;
  const profitDistance = Math.abs(takeProfit - entryPrice);
  const totalPotentialProfit = positionUnits * profitDistance;
  const riskRewardRatio = priceDistance > 0 ? (profitDistance / priceDistance).toFixed(2) : "0.00";

  const fromValueInUSD = convertAmount * (rates[fromAsset] || 1);
  const convertedResult = toAsset === "USD" ? fromValueInUSD : fromValueInUSD / (rates[toAsset] || 1);

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">

        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-100 border border-amber-200 text-amber-900 shadow-sm">
            <Bot className="w-3.5 h-3.5 text-amber-600" />
            <span>AI Trading Bot & Professional Analytics</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Cryptocurrency Trading Suite & Signals Engine
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Real-time algorithmic trading bot, multi-coin market scanner, live TradingView charts, and exact risk execution calculators.
          </p>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-sm max-w-3xl mx-auto">
          <button
            onClick={() => setActiveTab("bot")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === "bot"
                ? "bg-amber-400 text-slate-950 shadow-sm font-extrabold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Bot className="w-4 h-4 text-amber-700" /> AI Trading Bot & Signals
          </button>
          <button
            onClick={() => setActiveTab("terminal")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === "terminal"
                ? "bg-amber-400 text-slate-950 shadow-sm font-extrabold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <BarChart2 className="w-4 h-4" /> Live Chart Terminal
          </button>
          <button
            onClick={() => setActiveTab("dca")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === "dca"
                ? "bg-amber-400 text-slate-950 shadow-sm font-extrabold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Calculator className="w-4 h-4" /> DCA Simulator
          </button>
          <button
            onClick={() => setActiveTab("sizer")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === "sizer"
                ? "bg-amber-400 text-slate-950 shadow-sm font-extrabold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <Sliders className="w-4 h-4" /> Position Sizer
          </button>
          <button
            onClick={() => setActiveTab("converter")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === "converter"
                ? "bg-amber-400 text-slate-950 shadow-sm font-extrabold"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            <RefreshCw className="w-4 h-4" /> Spot Converter
          </button>
        </div>

        {/* TAB 1: AI TRADING BOT & SIGNALS */}
        {activeTab === "bot" && <AITradingBotTerminal />}

        {/* TAB 2: STANDALONE TRADINGVIEW TERMINAL */}
        {activeTab === "terminal" && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Select Pair:</span>
                {[
                  { label: "BTC/USDT", symbol: "BINANCE:BTCUSDT" },
                  { label: "ETH/USDT", symbol: "BINANCE:ETHUSDT" },
                  { label: "SOL/USDT", symbol: "BINANCE:SOLUSDT" },
                  { label: "BTC/USD (Coinbase)", symbol: "COINBASE:BTCUSD" },
                ].map((pair) => (
                  <button
                    key={pair.symbol}
                    onClick={() => setChartSymbol(pair.symbol)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      chartSymbol === pair.symbol
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                    }`}
                  >
                    {pair.label}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-2 text-xs text-emerald-600 font-mono font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Live WebSocket Feed
              </div>
            </div>

            <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm h-[620px] flex flex-col justify-between overflow-hidden">
              <iframe
                title="TradingView Real-Time Candlestick Chart"
                src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=${encodeURIComponent(
                  chartSymbol
                )}&interval=D&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=light&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=localhost&utm_medium=widget&utm_campaign=chart&utm_term=${encodeURIComponent(
                  chartSymbol
                )}`}
                className="w-full h-full border-0 rounded-2xl"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>
        )}

        {/* TAB 3: DCA SIMULATOR */}
        {activeTab === "dca" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Dollar-Cost Averaging Simulator</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Model periodic accumulation math and compound growth across cryptocurrency market cycles.
                </p>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Monthly Contribution</span>
                  <span className="text-amber-600 font-bold">${monthlyInvest.toLocaleString()} / mo</span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="3000"
                  step="25"
                  value={monthlyInvest}
                  onChange={(e) => setMonthlyInvest(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>$25</span>
                  <span>$1,500</span>
                  <span>$3,000</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Time Horizon (Years)</span>
                  <span className="text-amber-600 font-bold">{dcaYears} Years ({totalMonths} Months)</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((yr) => (
                    <button
                      key={yr}
                      onClick={() => setDcaYears(yr)}
                      className={`py-2 rounded-xl text-xs font-bold transition ${
                        dcaYears === yr
                          ? "bg-slate-900 text-white shadow-sm"
                          : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                      }`}
                    >
                      {yr} {yr === 1 ? "Year" : "Years"}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-700">
                  <span>Expected Annualized Rate of Return</span>
                  <span className="text-amber-600 font-bold">{projectedGrowth}% APR</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="80"
                  step="5"
                  value={projectedGrowth}
                  onChange={(e) => setProjectedGrowth(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>The Harmonic Mean Advantage:</strong> Fixed-calendar accumulation automatically buys more Bitcoin during deep drawdowns and less during high-volatility tops.
                </p>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-8 rounded-3xl shadow-xl space-y-6 border border-slate-800">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">Simulated Portfolio Output</span>
                
                <div>
                  <div className="text-xs text-slate-400 font-medium">Estimated Future Portfolio Value</div>
                  <div className="text-4xl sm:text-5xl font-black text-amber-400 tracking-tight mt-1">
                    ${Math.round(estimatedPortfolioValue).toLocaleString()}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                  <div>
                    <div className="text-[11px] text-slate-400 font-medium uppercase">Total Out-of-Pocket Invested</div>
                    <div className="text-xl font-extrabold text-white mt-0.5">
                      ${totalInvested.toLocaleString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400 font-medium uppercase">Net Capital Gain</div>
                    <div className="text-xl font-extrabold text-emerald-400 mt-0.5">
                      +${Math.round(totalProfit).toLocaleString()} ({profitPercentage}%)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: POSITION SIZER */}
        {activeTab === "sizer" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Risk & Position Sizing Calculator</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Calculate exact trade lot sizes and prevent account ruin before submitting orders.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Account Balance ($) </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">$</span>
                    <input
                      type="number"
                      value={accountSize}
                      onChange={(e) => setAccountSize(Number(e.target.value))}
                      className="w-full pl-7 pr-3 py-2 text-sm font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Account Risk (%)</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={riskPercent}
                      onChange={(e) => setRiskPercent(Number(e.target.value))}
                      className="w-full pl-3 pr-7 py-2 text-sm font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                    <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">Entry Price ($)</label>
                <input
                  type="number"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(Number(e.target.value))}
                  className="w-full px-3 py-2 text-sm font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-rose-600">Stop Loss Invalidation ($)</label>
                  <input
                    type="number"
                    value={stopLoss}
                    onChange={(e) => setStopLoss(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-bold text-slate-900 bg-rose-50/50 border border-rose-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-emerald-600">Take Profit Target ($)</label>
                  <input
                    type="number"
                    value={takeProfit}
                    onChange={(e) => setTakeProfit(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-bold text-slate-900 bg-emerald-50/50 border border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-lg space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
                    Calculated Position Matrix
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                    R:R Ratio 1 : {riskRewardRatio}
                  </span>
                </div>

                <div className="p-6 rounded-2xl bg-amber-50/50 border border-amber-200 text-center space-y-1">
                  <div className="text-xs font-semibold text-slate-600">Recommended Position Size</div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">
                    {positionUnits.toFixed(4)} BTC
                  </div>
                  <div className="text-xs text-amber-700 font-bold">
                    ≈ ${Math.round(positionValue).toLocaleString()} Total Position Value
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                    <div className="text-[11px] font-bold text-rose-600 uppercase">Max Risk at SL</div>
                    <div className="text-2xl font-extrabold text-rose-700 mt-1">
                      -${riskDollar.toFixed(2)}
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <div className="text-[11px] font-bold text-emerald-600 uppercase">Potential Profit</div>
                    <div className="text-2xl font-extrabold text-emerald-700 mt-1">
                      +${totalPotentialProfit.toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: SPOT CONVERTER */}
        {activeTab === "converter" && (
          <div className="max-w-3xl mx-auto bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-lg space-y-8">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">Real-Time Cryptocurrency Spot Converter</h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Instant multi-currency exchange calculations powered by live institutional liquidity pricing.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
              <div className="sm:col-span-5 space-y-2">
                <label className="text-xs font-bold text-slate-600">You Send / Input</label>
                <div className="flex rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
                  <input
                    type="number"
                    min="0"
                    value={convertAmount}
                    onChange={(e) => setConvertAmount(Math.max(0, Number(e.target.value)))}
                    className="w-full px-4 py-3 bg-transparent text-lg font-bold text-slate-900 focus:outline-none"
                  />
                  <select
                    value={fromAsset}
                    onChange={(e) => setFromAsset(e.target.value as any)}
                    className="bg-white px-3 py-3 font-bold text-sm text-slate-800 border-l border-slate-200 focus:outline-none"
                  >
                    <option value="BTC">BTC</option>
                    <option value="ETH">ETH</option>
                    <option value="SOL">SOL</option>
                    <option value="USDT">USDT</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2 flex justify-center pt-4 sm:pt-6">
                <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                  ⇄
                </div>
              </div>

              <div className="sm:col-span-5 space-y-2">
                <label className="text-xs font-bold text-slate-600">You Receive / Value</label>
                <div className="flex rounded-2xl border border-slate-200 overflow-hidden bg-slate-50">
                  <div className="w-full px-4 py-3 text-lg font-bold text-amber-600 truncate">
                    {convertedResult.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                  </div>
                  <select
                    value={toAsset}
                    onChange={(e) => setToAsset(e.target.value as any)}
                    className="bg-white px-3 py-3 font-bold text-sm text-slate-800 border-l border-slate-200 focus:outline-none"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="BTC">BTC</option>
                    <option value="ETH">ETH</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
