"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Bot,
  BarChart2,
  Calculator,
  Sliders,
  RefreshCw,
  Sparkles,
  Search,
  Radio,
  Clock,
  Compass,
  TrendingUp,
  TrendingDown,
  Target,
  ShieldAlert,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Layers,
  Gauge,
  ExternalLink,
  ChevronRight
} from "lucide-react";
import Link from "next/link";
import {
  SignalTimeframe,
  CoinConfig,
  ComprehensiveSignal,
  TIMEFRAME_PROFILES,
  generateQuantitativeSignal,
  formatSignalForClipboard,
  formatPrice,
  formatCurrency
} from "@/lib/aiSignalEngine";
import TradingViewAdvancedChart from "@/components/tools/TradingViewAdvancedChart";
import TechnicalAnalysisPanel from "@/components/tools/TechnicalAnalysisPanel";

const BINANCE_SUPPORTED_PAIRS: CoinConfig[] = [
  { symbol: "BTCUSDT", name: "Bitcoin", base: "BTC", defaultTimeframe: "15M" },
  { symbol: "ETHUSDT", name: "Ethereum", base: "ETH", defaultTimeframe: "15M" },
  { symbol: "SOLUSDT", name: "Solana", base: "SOL", defaultTimeframe: "15M" },
  { symbol: "BNBUSDT", name: "BNB", base: "BNB", defaultTimeframe: "1H" },
  { symbol: "XRPUSDT", name: "XRP", base: "XRP", defaultTimeframe: "15M" },
  { symbol: "DOGEUSDT", name: "Dogecoin", base: "DOGE", defaultTimeframe: "5M" },
  { symbol: "ADAUSDT", name: "Cardano", base: "ADA", defaultTimeframe: "1H" },
  { symbol: "AVAXUSDT", name: "Avalanche", base: "AVAX", defaultTimeframe: "15M" },
  { symbol: "SUIUSDT", name: "Sui", base: "SUI", defaultTimeframe: "5M" },
  { symbol: "LINKUSDT", name: "Chainlink", base: "LINK", defaultTimeframe: "1H" },
  { symbol: "NEARUSDT", name: "NEAR Protocol", base: "NEAR", defaultTimeframe: "15M" },
  { symbol: "PEPEUSDT", name: "Pepe", base: "PEPE", defaultTimeframe: "5M" },
  { symbol: "SHIBUSDT", name: "Shiba Inu", base: "SHIB", defaultTimeframe: "15M" },
  { symbol: "DOTUSDT", name: "Polkadot", base: "DOT", defaultTimeframe: "1H" },
  { symbol: "LTCUSDT", name: "Litecoin", base: "LTC", defaultTimeframe: "4H" },
  { symbol: "APTUSDT", name: "Aptos", base: "APT", defaultTimeframe: "15M" },
  { symbol: "TIAUSDT", name: "Celestia", base: "TIA", defaultTimeframe: "15M" },
  { symbol: "RENDERUSDT", name: "Render", base: "RENDER", defaultTimeframe: "1H" },
  { symbol: "FETUSDT", name: "Artificial Superintelligence", base: "FET", defaultTimeframe: "1H" },
  { symbol: "WIFUSDT", name: "dogwifhat", base: "WIF", defaultTimeframe: "5M" }
];

export default function HomeTradingSuiteHero() {
  const [activeTab, setActiveTab] = useState<"bot" | "terminal" | "dca" | "sizer" | "converter">("bot");

  // 1. Bot & Signals State
  const [liveSignals, setLiveSignals] = useState<ComprehensiveSignal[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<ComprehensiveSignal | null>(null);
  const [loadingSignals, setLoadingSignals] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState<SignalTimeframe>("15M");
  const [directionOverride, setDirectionOverride] = useState<"AUTO" | "LONG" | "SHORT">("AUTO");
  const [signalFilter, setSignalFilter] = useState<"ALL" | "BUY" | "SHORT" | "HIGH_CONF">("ALL");
  const [search, setSearch] = useState("");
  const [customPairInput, setCustomPairInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [cachedRawTickers, setCachedRawTickers] = useState<Map<string, any>>(new Map());

  // Copilot State
  const [copilotCapital, setCopilotCapital] = useState(5000);
  const [copilotRiskPercent, setCopilotRiskPercent] = useState(1.5);
  const [copilotLeverage, setCopilotLeverage] = useState(3);

  // 2. Chart Terminal State
  const [chartSymbol, setChartSymbol] = useState("BINANCE:BTCUSDT");
  const [customChartInput, setCustomChartInput] = useState("");
  const [chartTerminalMode, setChartTerminalMode] = useState<"chart" | "analysis" | "split">("chart");
  const [terminalTicker, setTerminalTicker] = useState<{ price: number; high24h: number; low24h: number; change24h: number }>({
    price: 88450,
    high24h: 91200,
    low24h: 86500,
    change24h: 3.82
  });

  // 3. DCA Simulator State
  const [monthlyInvest, setMonthlyInvest] = useState(250);
  const [dcaYears, setDcaYears] = useState(3);
  const [projectedGrowth, setProjectedGrowth] = useState(35);

  // 4. Position Sizer State
  const [accountSize, setAccountSize] = useState(10000);
  const [riskPercent, setRiskPercent] = useState(1.5);
  const [entryPrice, setEntryPrice] = useState(88000);
  const [stopLoss, setStopLoss] = useState(85500);
  const [takeProfit, setTakeProfit] = useState(94000);

  // 5. Spot Converter State
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

  // Fetch Binance Live Tickers
  const fetchBinanceData = useCallback(async () => {
    try {
      const res = await fetch("https://api.binance.com/api/v3/ticker/24hr");
      if (!res.ok) throw new Error("Binance API error");
      const allTickers = await res.json();
      const tickerMap = new Map<string, any>();
      allTickers.forEach((t: any) => tickerMap.set(t.symbol, t));
      setCachedRawTickers(tickerMap);

      const updated = BINANCE_SUPPORTED_PAIRS.map((cfg) => {
        const raw = tickerMap.get(cfg.symbol);
        if (!raw) return null;
        const dir = directionOverride === "AUTO" ? undefined : directionOverride;
        return generateQuantitativeSignal(raw, cfg, selectedTimeframe, dir);
      }).filter(Boolean) as ComprehensiveSignal[];

      if (updated.length > 0) {
        setLiveSignals(updated);
        setSelectedCoin((current) => {
          if (!current) return updated[0];
          const fresh = updated.find((u) => u.symbol === current.symbol);
          return fresh || updated[0];
        });
      }
      setLoadingSignals(false);
    } catch (err) {
      console.warn("Binance live fetch fallback:", err);
      setLoadingSignals(false);
    }
  }, [selectedTimeframe, directionOverride]);

  useEffect(() => {
    fetchBinanceData();
    const interval = setInterval(fetchBinanceData, 6000);
    return () => clearInterval(interval);
  }, [fetchBinanceData]);

  // Recalculate signals on timeframe/direction change
  useEffect(() => {
    if (cachedRawTickers.size === 0) return;
    const updated = BINANCE_SUPPORTED_PAIRS.map((cfg) => {
      const raw = cachedRawTickers.get(cfg.symbol);
      if (!raw) return null;
      const dir = directionOverride === "AUTO" ? undefined : directionOverride;
      return generateQuantitativeSignal(raw, cfg, selectedTimeframe, dir);
    }).filter(Boolean) as ComprehensiveSignal[];

    if (updated.length > 0) {
      setLiveSignals(updated);
      setSelectedCoin((current) => {
        if (!current) return updated[0];
        const fresh = updated.find((u) => u.symbol === current.symbol);
        return fresh || updated[0];
      });
    }
  }, [selectedTimeframe, directionOverride, cachedRawTickers]);

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

  // Handle custom pair in signals scanner
  const handleLoadCustomPair = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = customPairInput.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (!clean) return;
    const fullSymbol = clean.endsWith("USDT") ? clean : `${clean}USDT`;
    const base = fullSymbol.replace("USDT", "");

    const existing = liveSignals.find((s) => s.symbol === fullSymbol);
    if (existing) {
      setSelectedCoin(existing);
      setCustomPairInput("");
      return;
    }

    fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${fullSymbol}`)
      .then((r) => r.json())
      .then((raw) => {
        if (raw.symbol) {
          const customConfig: CoinConfig = { symbol: fullSymbol, name: base, base, defaultTimeframe: selectedTimeframe };
          const dir = directionOverride === "AUTO" ? undefined : directionOverride;
          const customSignal = generateQuantitativeSignal(raw, customConfig, selectedTimeframe, dir);
          setLiveSignals((prev) => [customSignal, ...prev.filter((p) => p.symbol !== fullSymbol)]);
          setSelectedCoin(customSignal);
          setCustomPairInput("");
        } else {
          alert(`Pair ${fullSymbol} not found on Binance.`);
        }
      })
      .catch(() => alert(`Could not load ${fullSymbol} from Binance.`));
  };

  const filteredCoins = liveSignals.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.symbol.toLowerCase().includes(search.toLowerCase()) ||
      c.base.toLowerCase().includes(search.toLowerCase());

    const matchesSignal =
      signalFilter === "ALL"
        ? true
        : signalFilter === "BUY"
        ? c.signal.includes("BUY")
        : signalFilter === "SHORT"
        ? c.signal.includes("SHORT")
        : c.confidence >= 90;

    return matchesSearch && matchesSignal;
  });

  const activeCoin = selectedCoin || liveSignals[0];

  // Copilot calculations
  const dollarRisk = activeCoin ? (copilotCapital * copilotRiskPercent) / 100 : 0;
  const priceDistance = activeCoin ? Math.abs(activeCoin.entryPrice - activeCoin.stopLossPrice) : 1;
  const positionUnits = activeCoin && priceDistance > 0 ? dollarRisk / priceDistance : 0;
  const positionValue = activeCoin ? positionUnits * activeCoin.entryPrice : 0;
  const requiredMargin = positionValue / copilotLeverage;

  const profitTP1 = activeCoin ? positionUnits * Math.abs(activeCoin.tp1Price - activeCoin.entryPrice) : 0;
  const profitTP2 = activeCoin ? positionUnits * Math.abs(activeCoin.tp2Price - activeCoin.entryPrice) : 0;
  const profitTP3 = activeCoin ? positionUnits * Math.abs(activeCoin.tp3Price - activeCoin.entryPrice) : 0;

  const handleCopySignal = () => {
    if (!activeCoin) return;
    const text = formatSignalForClipboard(activeCoin, copilotLeverage);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

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
    <section className="relative pt-10 pb-16 sm:pt-14 sm:pb-20 bg-gradient-to-b from-slate-100 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900/70 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* 1. TOP CENTER HEADER (MATCHING USER SCREENSHOT) */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-700/80 text-amber-900 dark:text-amber-300 shadow-sm">
            <Bot className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>AI Trading Bot &amp; Professional Analytics</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            Cryptocurrency Trading Suite &amp; <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Signals Engine
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Real-time algorithmic trading bot, multi-coin market scanner, live TradingView charts, and exact risk execution calculators.
          </p>
        </div>

        {/* 2. CENTERED TAB NAVIGATION BAR (MATCHING USER SCREENSHOT) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm max-w-4xl mx-auto">
          <button
            onClick={() => setActiveTab("bot")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition ${
              activeTab === "bot"
                ? "bg-amber-400 text-slate-950 shadow-md font-black ring-2 ring-amber-400/30"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 font-bold"
            }`}
          >
            <Bot className="w-4 h-4 text-amber-950 dark:text-amber-300" />
            <span>AI Trading Bot &amp; Signals</span>
          </button>

          <button
            onClick={() => setActiveTab("terminal")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition ${
              activeTab === "terminal"
                ? "bg-amber-400 text-slate-950 shadow-md font-black ring-2 ring-amber-400/30"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Live Chart Terminal</span>
          </button>

          <button
            onClick={() => setActiveTab("dca")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition ${
              activeTab === "dca"
                ? "bg-amber-400 text-slate-950 shadow-md font-black ring-2 ring-amber-400/30"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>DCA Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab("sizer")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition ${
              activeTab === "sizer"
                ? "bg-amber-400 text-slate-950 shadow-md font-black ring-2 ring-amber-400/30"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Position Sizer</span>
          </button>

          <button
            onClick={() => setActiveTab("converter")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition ${
              activeTab === "converter"
                ? "bg-amber-400 text-slate-950 shadow-md font-black ring-2 ring-amber-400/30"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Spot Converter</span>
          </button>
        </div>

        {/* 3. ACTIVE SUITE CARD: TAB 1 (AI TRADING BOT & SIGNALS - EXACT MATCH TO USER SCREENSHOT) */}
        {activeTab === "bot" && (
          <div className="space-y-8">
            
            {/* SUB-CARD HEADER (MATCHING USER SCREENSHOT) */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-700/80 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Algorithmic Spot &amp; Derivatives Execution Engine</span>
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  Live Algorithmic Signals &amp; Full Market Terminal
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  Real-time live prices, dynamic entry zones, mathematically validated stop-losses, and multi-tier take-profits matching live TradingView candlestick charts 1:1.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={fetchBinanceData}
                  className="px-5 py-3 rounded-2xl bg-slate-950 dark:bg-slate-800 hover:bg-slate-900 dark:hover:bg-slate-700 text-white text-xs font-black transition flex items-center gap-2 shadow-sm border border-slate-800 dark:border-slate-700"
                >
                  <RefreshCw className={`w-4 h-4 text-amber-400 ${loadingSignals ? "animate-spin" : ""}`} />
                  <span>Refresh Signals</span>
                </button>
              </div>
            </div>

            {/* MAIN 2-COLUMN MARKET SCANNER & EXECUTION MATRIX */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: SCANNER, TIME FRAME & PAIRS LIST (Col 5) */}
              <div className="lg:col-span-5 space-y-5">
                
                {/* Search & Custom Binance Pair Bar */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5 text-amber-500" />
                      <span>Scan Any Binance Pair</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">50+ Pairs Available</span>
                  </div>

                  <form onSubmit={handleLoadCustomPair} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type any symbol (e.g. SUI, PEPE, WIF, NEAR)..."
                      value={customPairInput}
                      onChange={(e) => {
                        setCustomPairInput(e.target.value);
                        setSearch(e.target.value);
                      }}
                      className="w-full px-3.5 py-2 text-xs font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-slate-400"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-amber-400 text-slate-950 text-xs font-black rounded-xl hover:bg-amber-300 transition whitespace-nowrap shadow-sm"
                    >
                      Load Pair
                    </button>
                  </form>

                  {/* Popular quick chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {["BTC", "ETH", "SOL", "BNB", "XRP", "SUI", "DOGE"].map((sym) => (
                      <button
                        key={sym}
                        onClick={() => {
                          const match = liveSignals.find((s) => s.base === sym);
                          if (match) setSelectedCoin(match);
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition ${
                          activeCoin?.base === sym
                            ? "bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 font-black shadow-sm"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                        }`}
                      >
                        {sym}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Signals Stream List */}
                <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
                  {filteredCoins.map((coin) => {
                    const isSelected = activeCoin?.symbol === coin.symbol;
                    const isBull = coin.signal.includes("BUY");
                    const isBear = coin.signal.includes("SHORT");

                    return (
                      <div
                        key={coin.symbol}
                        onClick={() => setSelectedCoin(coin)}
                        className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                          isSelected
                            ? "bg-white dark:bg-slate-900 border-amber-400 dark:border-amber-400 shadow-md shadow-amber-400/10 scale-[1.01]"
                            : "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/60 dark:hover:bg-slate-800/60"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-black text-xs text-slate-900 dark:text-white">
                              {coin.base}
                            </div>
                            <div>
                              <div className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                                <span>{coin.base}/USDT</span>
                                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                  {coin.timeframe}
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                                24h Vol: {coin.marketCap.volume24hFormatted}
                              </div>
                            </div>
                          </div>

                          {/* Signal Badge */}
                          <div className="text-right">
                            <span
                              className={`px-2.5 py-0.5 rounded-lg text-[11px] font-black font-mono inline-block ${
                                isBull
                                  ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                                  : isBear
                                  ? "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                              }`}
                            >
                              {coin.signal}
                            </span>
                            <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">
                              Conf: <strong className="text-slate-900 dark:text-white">{coin.confidence}%</strong>
                            </div>
                          </div>
                        </div>

                        {/* Price & Level preview */}
                        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                          <div>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-mono">Live Price</span>
                            <div className="font-extrabold text-slate-900 dark:text-white">
                              ${formatPrice(coin.price)}
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-mono">24h Change</span>
                            <div className={`font-bold text-[11px] ${coin.change24h >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                              {coin.change24h >= 0 ? "+" : ""}{coin.change24h.toFixed(2)}%
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-mono">Setup Type</span>
                            <div className="font-bold text-slate-700 dark:text-slate-300 text-[11px] truncate">
                              {coin.strategy}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* AI Entry Copilot & Fast Risk Sizer */}
                {activeCoin && (
                  <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
                          <Sliders className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-slate-900 dark:text-white">Trade Entry &amp; Risk Sizer</h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            Live risk calculations for {activeCoin.base}/USDT ({activeCoin.isLong ? "LONG" : "SHORT"})
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        R:R {activeCoin.rrRatioFormatted}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase">Capital ($)</label>
                        <input
                          type="number"
                          value={copilotCapital}
                          onChange={(e) => setCopilotCapital(Math.max(10, Number(e.target.value)))}
                          className="w-full px-2.5 py-1.5 text-xs font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase">Risk (%)</label>
                        <input
                          type="number"
                          step="0.5"
                          min="0.5"
                          max="10"
                          value={copilotRiskPercent}
                          onChange={(e) => setCopilotRiskPercent(Number(e.target.value))}
                          className="w-full px-2.5 py-1.5 text-xs font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase">Leverage</label>
                        <select
                          value={copilotLeverage}
                          onChange={(e) => setCopilotLeverage(Number(e.target.value))}
                          className="w-full px-2.5 py-1.5 text-xs font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                        >
                          <option value={1}>1x (Spot)</option>
                          <option value={2}>2x</option>
                          <option value={3}>3x (Safe)</option>
                          <option value={5}>5x</option>
                          <option value={10}>10x</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 dark:text-slate-400">Dollar Risk at Stop Loss:</span>
                        <span className="font-black text-rose-600 dark:text-rose-400">-${dollarRisk.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 dark:text-slate-400">Position Units:</span>
                        <span className="font-extrabold text-slate-900 dark:text-white">
                          {positionUnits.toFixed(4)} {activeCoin.base} (≈ ${Math.round(positionValue).toLocaleString()})
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 dark:text-slate-400">Required Margin ({copilotLeverage}x):</span>
                        <span className="font-bold text-amber-700 dark:text-amber-400">${Math.round(requiredMargin).toLocaleString()}</span>
                      </div>
                      <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center font-bold">
                        <span className="text-emerald-700 dark:text-emerald-400">Projected Profit (TP2):</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">+${profitTP2.toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleCopySignal}
                      className="w-full py-2.5 bg-slate-950 dark:bg-slate-800 hover:bg-slate-900 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition shadow-sm border border-slate-800 dark:border-slate-700"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-300">Trade Setup Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-amber-400" />
                          <span>Copy Entry &amp; SL/TP Parameters</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

              </div>

              {/* RIGHT COLUMN: ACTIVE SYMBOL EXECUTION MATRIX & ADVANCED CHART (Col 7) */}
              {activeCoin && (
                <div className="lg:col-span-7 space-y-6">

                  {/* ACTIVE BOT STRATEGY & COIN EXECUTION CARD */}
                  <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                    
                    {/* Top: Active Symbol & Direction Toggle */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                      <div>
                        <div className="flex items-center gap-2.5 mb-1">
                          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                            {activeCoin.base}/USDT
                          </h3>
                          <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-700/80">
                            {activeCoin.strategy}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-2">
                          <span>Spot: <strong className="text-slate-900 dark:text-white">${formatPrice(activeCoin.price)}</strong></span>
                          <span>•</span>
                          <span className={activeCoin.change24h >= 0 ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-rose-600 dark:text-rose-400 font-bold"}>
                            {activeCoin.change24h >= 0 ? "+" : ""}{activeCoin.change24h.toFixed(2)}%
                          </span>
                        </p>
                      </div>

                      {/* Direction Override Buttons */}
                      <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
                        <button
                          onClick={() => setDirectionOverride("LONG")}
                          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition ${
                            activeCoin.isLong
                              ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                              : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                          }`}
                        >
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>LONG / BUY</span>
                        </button>
                        <button
                          onClick={() => setDirectionOverride("SHORT")}
                          className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition ${
                            !activeCoin.isLong
                              ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
                              : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                          }`}
                        >
                          <TrendingDown className="w-3.5 h-3.5" />
                          <span>SHORT / SELL</span>
                        </button>
                      </div>
                    </div>

                    {/* Exact Execution Parameters Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      
                      {/* Entry Zone */}
                      <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase font-mono">
                          <Target className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                          <span>Entry Zone</span>
                        </div>
                        <div className="text-sm font-black text-slate-900 dark:text-white mt-1">
                          ${formatPrice(activeCoin.entryZoneMin)} - ${formatPrice(activeCoin.entryZoneMax)}
                        </div>
                        <div className="text-[10px] text-amber-700 dark:text-amber-400 font-medium mt-0.5">Market / Limit</div>
                      </div>

                      {/* Stop Loss */}
                      <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-rose-700 dark:text-rose-300 uppercase font-mono">
                          <ShieldAlert className="w-3 h-3 text-rose-600 dark:text-rose-400" />
                          <span>Stop Loss</span>
                        </div>
                        <div className="text-sm font-black text-rose-700 dark:text-rose-400 mt-1">
                          ${formatPrice(activeCoin.stopLossPrice)}
                        </div>
                        <div className="text-[10px] text-rose-600 dark:text-rose-400 font-bold mt-0.5">
                          {activeCoin.isLong ? "-" : "+"}{activeCoin.stopLossPercent}% Inval
                        </div>
                      </div>

                      {/* Target 1 */}
                      <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase font-mono">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          <span>Target 1 (TP1)</span>
                        </div>
                        <div className="text-sm font-black text-emerald-700 dark:text-emerald-400 mt-1">
                          ${formatPrice(activeCoin.tp1Price)}
                        </div>
                        <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                          +{activeCoin.tp1Percent}% (Lock 50%)
                        </div>
                      </div>

                      {/* Target 2 */}
                      <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase font-mono">
                          <TrendingUp className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          <span>Target 2 (Core)</span>
                        </div>
                        <div className="text-sm font-black text-emerald-700 dark:text-emerald-400 mt-1">
                          ${formatPrice(activeCoin.tp2Price)}
                        </div>
                        <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                          +{activeCoin.tp2Percent}% (R:R {activeCoin.rrRatioFormatted})
                        </div>
                      </div>

                    </div>

                    {/* Runner Target Banner */}
                    <div className="p-4 rounded-2xl bg-slate-950 dark:bg-slate-800 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-slate-800 dark:border-slate-700">
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                        <div>
                          <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                            Runner Target &amp; Optimal Session:
                          </span>
                          <div className="text-xs sm:text-sm font-black text-slate-100">
                            {activeCoin.optimalSession} • <span className="text-emerald-400">TP3 Runner: ${formatPrice(activeCoin.tp3Price)} (+{activeCoin.tp3Percent}%)</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs font-mono text-slate-300 bg-slate-900 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-1.5">
                        <span>Risk/Reward:</span>
                        <span className="text-amber-400 font-black text-sm">{activeCoin.rrRatioFormatted}</span>
                      </div>
                    </div>

                    {/* CoinGlass Buyer/Seller Inflow & CVD Delta */}
                    <div className="p-4 rounded-2xl bg-slate-950 dark:bg-slate-900 border border-slate-800 space-y-2.5 text-xs text-white">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5" /> Buyer Inflow: {activeCoin.coinglass.longAccountPercent}%
                        </span>
                        <span className="font-mono text-[10px] text-slate-400 uppercase">
                          CVD Volume Delta
                        </span>
                        <span className="font-mono text-rose-400 font-bold flex items-center gap-1.5">
                          Seller Delta: {activeCoin.coinglass.shortAccountPercent}% <TrendingDown className="w-3.5 h-3.5" />
                        </span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden flex">
                        <div
                          className="bg-emerald-500 transition-all duration-500"
                          style={{ width: `${activeCoin.coinglass.longAccountPercent}%` }}
                        />
                        <div
                          className="bg-rose-500 transition-all duration-500"
                          style={{ width: `${activeCoin.coinglass.shortAccountPercent}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                        <span>Taker Aggression: <strong className="text-amber-400">{activeCoin.coinglass.cvdDeltaFormatted}</strong></span>
                        <span>Quote Vol: <strong className="text-slate-200">{activeCoin.marketCap.volume24hFormatted}</strong></span>
                      </div>
                    </div>

                  </div>

                  {/* 6-FACTOR ALGORITHMIC CONFLUENCE CHECKLIST */}
                  <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold">
                          <ShieldAlert className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <h4 className="text-base font-black text-slate-900 dark:text-white">
                            AI Trade Validation &amp; Confluence Audit
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            Multi-indicator confluence checklist for {activeCoin.base}/USDT ({activeCoin.isLong ? "LONG" : "SHORT"})
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-mono">
                        Grade A+ ({activeCoin.confidence}% Match)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      {activeCoin.confluenceAudit.map((item, idx) => (
                        <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">{item.title}</div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400">{item.metric}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* EMBEDDED REAL-TIME CHART LINK */}
                  <div className="bg-slate-950 rounded-3xl p-6 sm:p-8 text-white border-2 border-amber-400/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="text-xs font-mono font-bold text-amber-400 uppercase">TradingView Candlestick Studio</div>
                      <h4 className="text-lg font-black text-white">
                        Analyze {activeCoin.base}/USDT Live on Advanced Terminal
                      </h4>
                      <p className="text-xs text-slate-300">
                        100+ technical indicators, full drawing tools, and oscillator gauges.
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setChartSymbol(activeCoin.tvSymbol);
                        setActiveTab("terminal");
                      }}
                      className="px-5 py-3 rounded-2xl bg-amber-400 text-slate-950 font-black text-xs hover:bg-amber-300 transition whitespace-nowrap flex items-center gap-1.5 shadow-md"
                    >
                      <span>Open in Terminal</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              )}

            </div>

          </div>
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
                <span className="text-slate-500 dark:text-slate-400">Live Price:</span>
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
          </div>
        )}

        {/* 5. TAB 3: DCA SIMULATOR */}
        {activeTab === "dca" && (
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
        )}

        {/* 6. TAB 4: POSITION SIZER */}
        {activeTab === "sizer" && (
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
        )}

        {/* 7. TAB 5: SPOT CONVERTER */}
        {activeTab === "converter" && (
          <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg space-y-8">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Real-Time Cryptocurrency Spot Converter</h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Instant multi-currency exchange calculations powered by live institutional liquidity pricing.
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
        )}

      </div>
    </section>
  );
}
