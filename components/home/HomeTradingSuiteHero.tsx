"use client";

import { useState, useEffect } from "react";
import {
  BarChart2,
  Calculator,
  Sliders,
  RefreshCw,
  Sparkles,
  Layers,
  Gauge,
  ArrowUpRight,
  Newspaper,
  Flame,
  Fish,
  Landmark,
  Cpu
} from "lucide-react";
import Link from "next/link";
import TradingViewAdvancedChart from "@/components/tools/TradingViewAdvancedChart";
import TechnicalAnalysisPanel from "@/components/tools/TechnicalAnalysisPanel";
import ChartTerminalDetails from "@/components/tools/details/ChartTerminalDetails";
import DCASimulatorDetails from "@/components/tools/details/DCASimulatorDetails";
import CPIMacroAIPredictor from "@/components/macro/CPIMacroAIPredictor";
import CoinGlassLiquidationTool from "@/components/tools/details/CoinGlassLiquidationTool";

type HeroTab = "cpi" | "terminal" | "liquidation" | "dca" | "sizer" | "converter";

export default function HomeTradingSuiteHero() {
  const [activeTab, setActiveTab] = useState<HeroTab>("cpi");

  // Tab change handler that updates the browser URL bar synchronously
  const handleTabChange = (tab: HeroTab) => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("tab", tab);
      window.history.pushState({}, "", `${url.pathname}?${url.searchParams.toString()}`);
    }
  };

  // Sync active tab on mount and on browser back/forward navigation
  useEffect(() => {
    if (typeof window !== "undefined") {
      const syncTabFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        const tab = params.get("tab")?.toLowerCase();
        if (tab === "terminal" || tab === "chart") {
          setActiveTab("terminal");
        } else if (tab === "dca") {
          setActiveTab("dca");
        } else if (tab === "sizer" || tab === "position") {
          setActiveTab("sizer");
        } else if (tab === "converter") {
          setActiveTab("converter");
        } else if (tab === "liquidation" || tab === "liquidations" || tab === "coinglass") {
          setActiveTab("liquidation");
        } else {
          setActiveTab("cpi");
        }
      };

      syncTabFromUrl();
      window.addEventListener("popstate", syncTabFromUrl);
      return () => window.removeEventListener("popstate", syncTabFromUrl);
    }
  }, []);

  // 1. Chart Terminal State
  const [chartSymbol, setChartSymbol] = useState("BINANCE:BTCUSDT");
  const [customChartInput, setCustomChartInput] = useState("");
  const [chartTerminalMode, setChartTerminalMode] = useState<"chart" | "analysis" | "split">("chart");
  const [terminalTicker, setTerminalTicker] = useState<{ price: number; high24h: number; low24h: number; change24h: number }>({
    price: 88450,
    high24h: 91200,
    low24h: 86500,
    change24h: 3.82
  });

  // 2. DCA Simulator State
  const [monthlyInvest, setMonthlyInvest] = useState(250);
  const [dcaYears, setDcaYears] = useState(3);
  const [projectedGrowth, setProjectedGrowth] = useState(35);

  // 3. Position Sizer State
  const [accountSize, setAccountSize] = useState(10000);
  const [riskPercent, setRiskPercent] = useState(1.5);
  const [entryPrice, setEntryPrice] = useState(88000);
  const [stopLoss, setStopLoss] = useState(85500);
  const [takeProfit, setTakeProfit] = useState(94000);

  // 4. Spot Converter State
  const [convertAmount, setConvertAmount] = useState(1);
  const [fromAsset, setFromAsset] = useState<"BTC" | "ETH" | "SOL" | "USDT">("BTC");
  const [toAsset, setToAsset] = useState<"USD" | "EUR" | "GBP" | "BTC" | "ETH">("USD");

  const rates: Record<string, number> = {
    BTC: 88450,
    ETH: 3120,
    SOL: 184,
    USDT: 1.0,
    USD: 1.0,
    EUR: 1.08,
    GBP: 1.28
  };

  // Fetch chart ticker
  useEffect(() => {
    const rawSymbol = chartSymbol.replace("BINANCE:", "");
    fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${rawSymbol}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.lastPrice) {
          setTerminalTicker({
            price: parseFloat(data.lastPrice) || 1,
            high24h: parseFloat(data.highPrice) || parseFloat(data.lastPrice) * 1.04,
            low24h: parseFloat(data.lowPrice) || parseFloat(data.lastPrice) * 0.96,
            change24h: parseFloat(data.priceChangePercent) || 0
          });
        }
      })
      .catch(() => {});
  }, [chartSymbol]);

  // DCA Calculations
  const totalMonths = dcaYears * 12;
  const totalInvested = monthlyInvest * totalMonths;
  const monthlyRate = projectedGrowth / 100 / 12;
  const estimatedPortfolioValue = monthlyInvest * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
  const totalProfit = estimatedPortfolioValue - totalInvested;
  const profitPercentage = ((totalProfit / totalInvested) * 100).toFixed(1);

  // Position Sizer Calculations
  const sizerRiskDollar = (accountSize * riskPercent) / 100;
  const sizerPriceDistance = Math.abs(entryPrice - stopLoss);
  const sizerPositionUnits = sizerPriceDistance > 0 ? sizerRiskDollar / sizerPriceDistance : 0;
  const sizerPositionValue = sizerPositionUnits * entryPrice;
  const sizerProfitDistance = Math.abs(takeProfit - entryPrice);
  const sizerTotalPotentialProfit = sizerPositionUnits * sizerProfitDistance;
  const sizerRRRatio = sizerPriceDistance > 0 ? (sizerProfitDistance / sizerPriceDistance).toFixed(2) : "0.00";

  // Converter Calculations
  const fromValueInUSD = convertAmount * (rates[fromAsset] || 1);
  const convertedResult = toAsset === "USD" ? fromValueInUSD : fromValueInUSD / (rates[toAsset] || 1);

  return (
    <section className="relative pt-6 pb-10 sm:pt-8 sm:pb-12 bg-gradient-to-b from-slate-100 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900/70 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">

        {/* 1. COMPACT & PROFESSIONAL HERO HEADER */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500/10 dark:bg-amber-400/10 border border-amber-500/20 dark:border-amber-400/30 text-amber-700 dark:text-amber-300 shadow-xs">
            <Cpu className="w-3.5 h-3.5 text-amber-500" />
            <span>AlphaMacro AI • US CPI Future Predictor &amp; Global Macro Intelligence</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            US CPI Future AI Predictor &amp;{" "}
            <span className="bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
              Macro Intelligence Bot
            </span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Predict upcoming US inflation prints, examine multi-pillar technicals, fundamentals, BOJ Yen carry trade risks, and model real-time crypto price reactions.
          </p>
        </div>

        {/* 2. CENTERED TAB NAVIGATION BAR (LINKED TO DEDICATED TOOL PAGES & URLS) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm max-w-4xl mx-auto">
          <button
            onClick={() => handleTabChange("cpi")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition cursor-pointer ${
              activeTab === "cpi"
                ? "bg-amber-400 text-slate-950 shadow-md font-black ring-2 ring-amber-400/30"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 font-bold"
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-950 dark:text-amber-300" />
            <span>US CPI Future AI Predictor</span>
          </button>

          <button
            onClick={() => handleTabChange("terminal")}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeTab === "terminal"
                ? "bg-amber-400 text-slate-950 shadow-md font-black ring-2 ring-amber-400/30"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
            title="Open Live Chart Terminal"
          >
            <BarChart2 className="w-4 h-4" />
            <span>Chart Terminal</span>
          </button>

          <button
            onClick={() => handleTabChange("liquidation")}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeTab === "liquidation"
                ? "bg-amber-400 text-slate-950 shadow-md font-black ring-2 ring-amber-400/30"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
            title="Open CoinGlass Liquidation Radar"
          >
            <Flame className="w-4 h-4 text-rose-500" />
            <span>CoinGlass Liquidation</span>
          </button>

          <button
            onClick={() => handleTabChange("dca")}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeTab === "dca"
                ? "bg-amber-400 text-slate-950 shadow-md font-black ring-2 ring-amber-400/30"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
            title="Open DCA Simulator"
          >
            <Calculator className="w-4 h-4" />
            <span>DCA Simulator</span>
          </button>

          <button
            onClick={() => handleTabChange("sizer")}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeTab === "sizer"
                ? "bg-amber-400 text-slate-950 shadow-md font-black ring-2 ring-amber-400/30"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
            title="Open Position Sizer"
          >
            <Sliders className="w-4 h-4" />
            <span>Position Sizer</span>
          </button>

          <button
            onClick={() => handleTabChange("converter")}
            className={`flex items-center gap-1.5 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition cursor-pointer ${
              activeTab === "converter"
                ? "bg-amber-400 text-slate-950 shadow-md font-black ring-2 ring-amber-400/30"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
            title="Open Spot Converter"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Spot Converter</span>
          </button>

          <Link
            href="/whale-orders"
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 border border-indigo-200 dark:border-indigo-800 transition group shadow-xs"
            title="Open Whale Orders & Institutional Liquidity Radar"
          >
            <Fish className="w-4 h-4 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
            <span className="font-black">Whale Orders</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-indigo-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          <Link
            href="/news"
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition group"
            title="Open 24/7 Macro News Wire & US CPI Tracker"
          >
            <Newspaper className="w-4 h-4 text-amber-500 group-hover:rotate-6 transition-transform" />
            <span>Latest News &amp; Macro Radar</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-500 transition-colors" />
          </Link>
        </div>

        {/* 3. ACTIVE SUITE CARD: TAB 1 (US CPI FUTURE AI PREDICTOR & INFLATION INTELLIGENCE) */}
        {activeTab === "cpi" && (
          <CPIMacroAIPredictor />
        )}

        {/* 4. TAB 2: LIVE CHART TERMINAL */}
        {activeTab === "terminal" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Popular Pairs:</span>
                {[
                  { label: "BTC/USDT", symbol: "BINANCE:BTCUSDT" },
                  { label: "ETH/USDT", symbol: "BINANCE:ETHUSDT" },
                  { label: "SOL/USDT", symbol: "BINANCE:SOLUSDT" },
                  { label: "BNB/USDT", symbol: "BINANCE:BNBUSDT" },
                  { label: "XRP/USDT", symbol: "BINANCE:XRPUSDT" },
                  { label: "SUI/USDT", symbol: "BINANCE:SUIUSDT" },
                  { label: "PEPE/USDT", symbol: "BINANCE:PEPEUSDT" },
                  { label: "DOGE/USDT", symbol: "BINANCE:DOGEUSDT" }
                ].map((pair) => (
                  <button
                    key={pair.symbol}
                    onClick={() => setChartSymbol(pair.symbol)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      chartSymbol === pair.symbol
                        ? "bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 font-black"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    {pair.label}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const clean = customChartInput.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
                  if (!clean) return;
                  const full = clean.endsWith("USDT") ? clean : `${clean}USDT`;
                  setChartSymbol(`BINANCE:${full}`);
                  setCustomChartInput("");
                }}
                className="flex gap-2 w-full sm:w-auto"
              >
                <input
                  type="text"
                  placeholder="Load any pair (e.g. NEAR, WIF)..."
                  value={customChartInput}
                  onChange={(e) => setCustomChartInput(e.target.value)}
                  className="px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 w-44 placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-amber-400 text-slate-950 text-xs font-bold rounded-xl hover:bg-amber-300 transition"
                >
                  Load
                </button>
              </form>
            </div>
            {/* View Mode Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 sm:px-4 sm:py-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Terminal Mode:</span>
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  <button
                    onClick={() => setChartTerminalMode("chart")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      chartTerminalMode === "chart"
                        ? "bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 shadow-sm font-extrabold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <BarChart2 className="w-3.5 h-3.5" />
                    <span>Advanced Chart</span>
                  </button>
                  <button
                    onClick={() => setChartTerminalMode("analysis")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      chartTerminalMode === "analysis"
                        ? "bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 shadow-sm font-extrabold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <Gauge className="w-3.5 h-3.5" />
                    <span>TA Gauge &amp; Pivots</span>
                  </button>
                  <button
                    onClick={() => setChartTerminalMode("split")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      chartTerminalMode === "split"
                        ? "bg-amber-400 text-slate-950 shadow-sm font-extrabold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Split Dual View</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-slate-500 dark:text-slate-400">Current Price:</span>
                <strong className="text-slate-900 dark:text-white">
                  ${terminalTicker.price >= 1000 ? terminalTicker.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : terminalTicker.price}
                </strong>
                <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${terminalTicker.change24h >= 0 ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300" : "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300"}`}>
                  {terminalTicker.change24h >= 0 ? "+" : ""}{terminalTicker.change24h.toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Advanced Chart */}
            {(chartTerminalMode === "chart" || chartTerminalMode === "split") && (
              <TradingViewAdvancedChart
                symbol={chartSymbol}
                defaultInterval="D"
                height={620}
                showIndicatorBar={true}
                showTimeframeBar={true}
                showStyleBar={true}
              />
            )}

            {/* TA Panel */}
            {(chartTerminalMode === "analysis" || chartTerminalMode === "split") && (
              <TechnicalAnalysisPanel
                symbol={chartSymbol}
                price={terminalTicker.price}
                high24h={terminalTicker.high24h}
                low24h={terminalTicker.low24h}
                change24h={terminalTicker.change24h}
                defaultInterval="1D"
              />
            )}

            {/* In-depth Institutional Terminal & Indicators Guide */}
            <ChartTerminalDetails />
          </div>
        )}

        {/* 5. TAB 3: DCA SIMULATOR */}
        {activeTab === "dca" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Dollar-Cost Averaging Simulator</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Model periodic accumulation math and compound growth across cryptocurrency market cycles.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>Monthly Contribution</span>
                    <span className="text-amber-600 dark:text-amber-400 font-bold">${monthlyInvest.toLocaleString()} / mo</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="3000"
                    step="25"
                    value={monthlyInvest}
                    onChange={(e) => setMonthlyInvest(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>Time Horizon (Years)</span>
                    <span className="text-amber-600 dark:text-amber-400 font-bold">{dcaYears} Years ({totalMonths} Months)</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((yr) => (
                      <button
                        key={yr}
                        onClick={() => setDcaYears(yr)}
                        className={`py-2 rounded-xl text-xs font-bold transition ${
                          dcaYears === yr
                            ? "bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 shadow-sm font-black"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                        }`}
                      >
                        {yr} {yr === 1 ? "Year" : "Years"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>Expected Annualized Rate of Return</span>
                    <span className="text-amber-600 dark:text-amber-400 font-bold">{projectedGrowth}% APR</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    step="5"
                    value={projectedGrowth}
                    onChange={(e) => setProjectedGrowth(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
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

            {/* In-depth DCA Mathematics & Strategy Guide */}
            <DCASimulatorDetails />
          </div>
        )}

        {/* 6. TAB 4: POSITION SIZER */}
        {activeTab === "sizer" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Risk &amp; Position Sizing Calculator</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Calculate exact trade lot sizes and prevent account ruin before submitting orders.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Account Balance ($)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">$</span>
                      <input
                        type="number"
                        value={accountSize}
                        onChange={(e) => setAccountSize(Number(e.target.value))}
                        className="w-full pl-7 pr-3 py-2 text-sm font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Account Risk (%)</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        value={riskPercent}
                        onChange={(e) => setRiskPercent(Number(e.target.value))}
                        className="w-full pl-3 pr-7 py-2 text-sm font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Entry Price ($)</label>
                  <input
                    type="number"
                    value={entryPrice}
                    onChange={(e) => setEntryPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-rose-600 dark:text-rose-400">Stop Loss Invalidation ($)</label>
                    <input
                      type="number"
                      value={stopLoss}
                      onChange={(e) => setStopLoss(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm font-bold text-slate-900 dark:text-white bg-rose-50/50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Take Profit Target ($)</label>
                    <input
                      type="number"
                      value={takeProfit}
                      onChange={(e) => setTakeProfit(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm font-bold text-slate-900 dark:text-white bg-emerald-50/50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                      Calculated Position Matrix
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      R:R Ratio 1 : {sizerRRRatio}
                    </span>
                  </div>

                  <div className="p-6 rounded-2xl bg-amber-50/50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-center space-y-1">
                    <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">Recommended Position Size</div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                      {sizerPositionUnits.toFixed(4)} BTC
                    </div>
                    <div className="text-xs text-amber-700 dark:text-amber-300 font-bold">
                      ≈ ${Math.round(sizerPositionValue).toLocaleString()} Total Position Value
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
                      <div className="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase">Max Risk at SL</div>
                      <div className="text-2xl font-extrabold text-rose-700 dark:text-rose-300 mt-1">
                        -${sizerRiskDollar.toFixed(2)}
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                      <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">Potential Profit</div>
                      <div className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300 mt-1">
                        +${sizerTotalPotentialProfit.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 7. TAB 5: SPOT CONVERTER */}
        {activeTab === "converter" && (
          <div className="space-y-8">
            <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg space-y-8">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Real-Time Cryptocurrency Spot Converter</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Instant multi-currency exchange calculations powered by real-time institutional liquidity pricing.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-5 space-y-2">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">You Send / Input</label>
                  <div className="flex rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-800">
                    <input
                      type="number"
                      min="0"
                      value={convertAmount}
                      onChange={(e) => setConvertAmount(Math.max(0, Number(e.target.value)))}
                      className="w-full px-4 py-3 bg-transparent text-lg font-bold text-slate-900 dark:text-white focus:outline-none"
                    />
                    <select
                      value={fromAsset}
                      onChange={(e) => setFromAsset(e.target.value as any)}
                      className="bg-white dark:bg-slate-800 px-3 py-3 font-bold text-sm text-slate-800 dark:text-slate-200 border-l border-slate-200 dark:border-slate-700 focus:outline-none"
                    >
                      <option value="BTC">BTC</option>
                      <option value="ETH">ETH</option>
                      <option value="SOL">SOL</option>
                      <option value="USDT">USDT</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2 flex justify-center pt-4 sm:pt-6">
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
                    ⇄
                  </div>
                </div>

                <div className="sm:col-span-5 space-y-2">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">You Receive / Value</label>
                  <div className="flex rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-800">
                    <div className="w-full px-4 py-3 text-lg font-bold text-amber-600 dark:text-amber-400 truncate">
                      {convertedResult.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                    </div>
                    <select
                      value={toAsset}
                      onChange={(e) => setToAsset(e.target.value as any)}
                      className="bg-white dark:bg-slate-800 px-3 py-3 font-bold text-sm text-slate-800 dark:text-slate-200 border-l border-slate-200 dark:border-slate-700 focus:outline-none"
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
          </div>
        )}

        {/* 8. TAB 6: US CPI AI PREDICTOR & INFLATION INTELLIGENCE */}
        {activeTab === "cpi" && (
          <CPIMacroAIPredictor />
        )}

        {/* 9. TAB 7: COINGLASS LIQUIDATION INTELLIGENCE SUITE */}
        {activeTab === "liquidation" && (
          <CoinGlassLiquidationTool />
        )}

      </div>
    </section>
  );
}
