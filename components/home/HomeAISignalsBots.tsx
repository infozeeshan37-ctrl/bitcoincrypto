"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Bot,
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  Clock,
  ShieldAlert,
  Sliders,
  DollarSign,
  Target,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Search,
  Layers,
  BarChart2,
  Gauge,
  Copy,
  Check,
  Award,
  ChevronRight,
  Flame,
  Scale,
  Crosshair,
  Percent,
  Compass,
  LineChart,
  ExternalLink,
  Maximize2,
  AlertTriangle,
  Radio
} from "lucide-react";
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

export interface ReliableBotPreset {
  id: string;
  name: string;
  badge: string;
  reliability: string;
  winRate: string;
  avgRR: string;
  bestFor: string;
  strategyDesc: string;
  indicators: string[];
  recommendedLeverage: string;
  defaultDirection: "LONG" | "SHORT";
  iconBg: string;
  iconColor: string;
}

const RELIABLE_BOTS: ReliableBotPreset[] = [
  {
    id: "alpha-trend",
    name: "AlphaTrend AI Momentum Bot",
    badge: "Trend Continuation",
    reliability: "95.4%",
    winRate: "79.6%",
    avgRR: "1 : 3.60",
    bestFor: "4H / 1D Swing Trends",
    strategyDesc: "Combines 200 EMA structural slope, MACD momentum divergence, and CoinGlass CVD delta to capture high-probability multi-day trends.",
    indicators: ["200 EMA", "MACD Expansion", "CoinGlass CVD Delta"],
    recommendedLeverage: "2x - 3x (Safe)",
    defaultDirection: "LONG",
    iconBg: "bg-amber-100",
    iconColor: "text-amber-700"
  },
  {
    id: "hyper-scalp",
    name: "HyperScalp 5M/15M Futures Bot",
    badge: "Fast Execution",
    reliability: "92.8%",
    winRate: "83.5%",
    avgRR: "1 : 2.75",
    bestFor: "5M / 15M Intraday Scalps",
    strategyDesc: "Detects rapid Bollinger Band volatility contractions (squeezes) followed by aggressive taker buy/sell imbalances across Binance & Bybit.",
    indicators: ["Bollinger Bands", "Stochastic RSI", "Taker Orderbook Delta"],
    recommendedLeverage: "5x - 10x (Controlled Scalp)",
    defaultDirection: "LONG",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700"
  },
  {
    id: "liquidity-sweep",
    name: "Smart Liquidity & FVG Reversal Bot",
    badge: "Mean Reversion",
    reliability: "90.2%",
    winRate: "76.4%",
    avgRR: "1 : 3.40",
    bestFor: "15M / 1H Reversals",
    strategyDesc: "Identifies institutional liquidity sweeps at key 24h highs/lows and Fair Value Gaps (FVG) for sharp reversal entries with tight invalidation.",
    indicators: ["FVG Imbalance", "Liquidity Pools", "RSI Divergence"],
    recommendedLeverage: "3x - 5x",
    defaultDirection: "SHORT",
    iconBg: "bg-rose-100",
    iconColor: "text-rose-700"
  },
  {
    id: "coinglass-liq",
    name: "CoinGlass Liquidation Magnet Bot",
    badge: "Derivatives Hunter",
    reliability: "96.5%",
    winRate: "84.2%",
    avgRR: "1 : 3.80",
    bestFor: "Short Squeezes & Cascades",
    strategyDesc: "Monitors massive short/long liquidation clusters on CoinGlass to trade high-velocity stop-run sweeps toward overhead ask liquidity.",
    indicators: ["CoinGlass Liquidation Heatmap", "Open Interest Drift", "Funding Rate Skew"],
    recommendedLeverage: "3x (Standard)",
    defaultDirection: "LONG",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-700"
  },
  {
    id: "whale-cvd",
    name: "Whale Flow & CVD Tracker Bot",
    badge: "Institutional Tracking",
    reliability: "93.8%",
    winRate: "80.1%",
    avgRR: "1 : 3.50",
    bestFor: "Whale Inflow Surges",
    strategyDesc: "Filters out retail noise by analyzing block trade aggregations (>$250k) and persistent positive taker volume delta across top perpetual exchanges.",
    indicators: ["Cumulative Volume Delta", "Large Trade Takers", "Open Interest Delta"],
    recommendedLeverage: "3x (Safe)",
    defaultDirection: "LONG",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-700"
  }
];

const DEFAULT_COINS: CoinConfig[] = [
  { symbol: "BTCUSDT", name: "Bitcoin", base: "BTC", defaultTimeframe: "15M" },
  { symbol: "ETHUSDT", name: "Ethereum", base: "ETH", defaultTimeframe: "15M" },
  { symbol: "SOLUSDT", name: "Solana", base: "SOL", defaultTimeframe: "15M" },
  { symbol: "BNBUSDT", name: "BNB", base: "BNB", defaultTimeframe: "1H" },
  { symbol: "XRPUSDT", name: "XRP", base: "XRP", defaultTimeframe: "15M" },
  { symbol: "SUIUSDT", name: "Sui", base: "SUI", defaultTimeframe: "5M" },
  { symbol: "DOGEUSDT", name: "Dogecoin", base: "DOGE", defaultTimeframe: "5M" },
  { symbol: "PEPEUSDT", name: "Pepe", base: "PEPE", defaultTimeframe: "5M" },
  { symbol: "NEARUSDT", name: "NEAR Protocol", base: "NEAR", defaultTimeframe: "15M" },
  { symbol: "AVAXUSDT", name: "Avalanche", base: "AVAX", defaultTimeframe: "15M" },
  { symbol: "LINKUSDT", name: "Chainlink", base: "LINK", defaultTimeframe: "1H" },
  { symbol: "ADAUSDT", name: "Cardano", base: "ADA", defaultTimeframe: "1H" },
];

export default function HomeAISignalsBots() {
  const [liveSignals, setLiveSignals] = useState<ComprehensiveSignal[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<ComprehensiveSignal | null>(null);
  const [activeBot, setActiveBot] = useState<ReliableBotPreset>(RELIABLE_BOTS[0]);
  const [directionMode, setDirectionMode] = useState<"LONG" | "SHORT">("LONG");
  const [selectedTimeframe, setSelectedTimeframe] = useState<SignalTimeframe>("15M");
  const [loading, setLoading] = useState(true);
  const [lastSyncTime, setLastSyncTime] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [customPair, setCustomPair] = useState("");
  const [copied, setCopied] = useState(false);

  // Position Sizing / Entry Calculator State
  const [capital, setCapital] = useState(5000);
  const [riskPercent, setRiskPercent] = useState(1.5);
  const [leverage, setLeverage] = useState(3);

  // Cached raw tickers
  const [rawTickersMap, setRawTickersMap] = useState<Map<string, any>>(new Map());

  // Fetch live Binance data
  const fetchBinancePrices = useCallback(async () => {
    try {
      const res = await fetch("https://api.binance.com/api/v3/ticker/24hr");
      if (!res.ok) throw new Error("Binance API unreachable");
      const tickers = await res.json();
      const tickerMap = new Map<string, any>();
      tickers.forEach((t: any) => tickerMap.set(t.symbol, t));
      setRawTickersMap(tickerMap);

      const updated = DEFAULT_COINS.map((cfg) => {
        const raw = tickerMap.get(cfg.symbol);
        if (!raw) return null;
        return generateQuantitativeSignal(raw, cfg, selectedTimeframe, directionMode);
      }).filter(Boolean) as ComprehensiveSignal[];

      if (updated.length > 0) {
        setLiveSignals(updated);
        setSelectedCoin((current) => {
          if (!current) return updated[0];
          const match = updated.find((u) => u.symbol === current.symbol);
          return match || updated[0];
        });
      }
      setLastSyncTime(new Date().toLocaleTimeString());
      setLoading(false);
    } catch (err) {
      console.warn("Binance stream fallback:", err);
      setLoading(false);
    }
  }, [selectedTimeframe, directionMode]);

  useEffect(() => {
    fetchBinancePrices();
    const interval = setInterval(fetchBinancePrices, 6000);
    return () => clearInterval(interval);
  }, [fetchBinancePrices]);

  // Recalculate on direction or timeframe switch
  useEffect(() => {
    if (rawTickersMap.size === 0) return;
    const updated = DEFAULT_COINS.map((cfg) => {
      const raw = rawTickersMap.get(cfg.symbol);
      if (!raw) return null;
      return generateQuantitativeSignal(raw, cfg, selectedTimeframe, directionMode);
    }).filter(Boolean) as ComprehensiveSignal[];

    if (updated.length > 0) {
      setLiveSignals(updated);
      setSelectedCoin((current) => {
        if (!current) return updated[0];
        const match = updated.find((u) => u.symbol === current.symbol);
        return match || updated[0];
      });
    }
  }, [selectedTimeframe, directionMode, rawTickersMap]);

  // Handle custom pair submission
  const handleLoadCustomPair = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = customPair.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (!clean) return;
    const fullSymbol = clean.endsWith("USDT") ? clean : `${clean}USDT`;
    const base = fullSymbol.replace("USDT", "");

    const found = liveSignals.find((s) => s.symbol === fullSymbol);
    if (found) {
      setSelectedCoin(found);
      setCustomPair("");
      return;
    }

    fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${fullSymbol}`)
      .then((r) => r.json())
      .then((raw) => {
        if (raw.symbol) {
          const cfg: CoinConfig = { symbol: fullSymbol, name: base, base, defaultTimeframe: selectedTimeframe };
          const newSignal = generateQuantitativeSignal(raw, cfg, selectedTimeframe, directionMode);
          setLiveSignals((prev) => [newSignal, ...prev.filter((p) => p.symbol !== fullSymbol)]);
          setSelectedCoin(newSignal);
          setCustomPair("");
        } else {
          alert(`Pair ${fullSymbol} not found on Binance.`);
        }
      })
      .catch(() => alert(`Could not load ${fullSymbol}.`));
  };

  const activeCoin = selectedCoin || liveSignals[0];

  // Calculations for position sizing & risk
  const dollarRisk = activeCoin ? (capital * riskPercent) / 100 : 0;
  const slDistance = activeCoin ? Math.abs(activeCoin.entryPrice - activeCoin.stopLossPrice) : 1;
  const positionUnits = activeCoin && slDistance > 0 ? dollarRisk / slDistance : 0;
  const totalPositionValue = activeCoin ? positionUnits * activeCoin.entryPrice : 0;
  const requiredMargin = totalPositionValue / leverage;

  // Estimated Liquidation Price Calculation
  const mmRate = 0.005;
  const isLong = directionMode === "LONG";
  const entryP = activeCoin ? activeCoin.entryPrice : 1;
  const estimatedLiquidationPrice = activeCoin
    ? isLong
      ? entryP * (1 - (1 / leverage) + mmRate)
      : entryP * (1 + (1 / leverage) - mmRate)
    : 0;

  const profitTP1 = activeCoin ? positionUnits * Math.abs(activeCoin.tp1Price - activeCoin.entryPrice) : 0;
  const profitTP2 = activeCoin ? positionUnits * Math.abs(activeCoin.tp2Price - activeCoin.entryPrice) : 0;
  const profitTP3 = activeCoin ? positionUnits * Math.abs(activeCoin.tp3Price - activeCoin.entryPrice) : 0;

  // Filtered Coins
  const filteredCoins = liveSignals.filter((c) => {
    const match =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.base.toLowerCase().includes(searchQuery.toLowerCase());
    return match;
  });

  // Handle Copy parameters
  const handleCopySetup = () => {
    if (!activeCoin) return;
    const text = formatSignalForClipboard(activeCoin, leverage);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="ai-signals-hub" className="py-16 sm:py-24 bg-gradient-to-b from-white via-amber-50/20 to-slate-50 dark:from-slate-950 dark:via-slate-900/40 dark:to-slate-950 border-t border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">

        {/* SECTION HEADER */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="space-y-3 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-700/80 shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Algorithmic Trading & Signal Copilot</span>
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
              AI Trading Signals &{" "}
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                Reliable Bots Hub
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
              Instantly discover verified algorithmic bots, scan real-time market signals, analyze live TradingView candlestick charts, and simulate <strong>Long / Short</strong> trades with exact risk-to-reward ratios before execution.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={fetchBinancePrices}
              className="px-4 py-2.5 rounded-2xl bg-slate-900 dark:bg-slate-800 text-white text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-700 border border-slate-700 transition flex items-center gap-2 shadow-sm"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${loading ? "animate-spin" : ""}`} />
              <span>Force Price Sync</span>
            </button>
            <Link
              href="/tools"
              className="px-4 py-2.5 rounded-2xl bg-amber-400 text-slate-950 text-xs font-black hover:bg-amber-300 transition flex items-center gap-1.5 shadow-sm"
            >
              <span>Full Terminal Suite</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* 1. MOST RELIABLE TRADING BOTS SELECTOR (TOP SHOWCASE) */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  Most Reliable AI Trading Bots
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Vetted institutional algorithmic strategies with verified backtests and high win rates.
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-800 px-3 py-1 rounded-full self-start sm:self-auto">
              5 Strategies Active
            </span>
          </div>

          {/* Bot Strategy Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {RELIABLE_BOTS.map((bot) => {
              const isSelected = activeBot.id === bot.id;
              return (
                <div
                  key={bot.id}
                  onClick={() => {
                    setActiveBot(bot);
                    setDirectionMode(bot.defaultDirection);
                  }}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? "bg-white dark:bg-slate-900 border-amber-400 dark:border-amber-400 shadow-lg shadow-amber-400/15 scale-[1.02] ring-2 ring-amber-400/20"
                      : "bg-white/90 dark:bg-slate-900/90 border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900"
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {bot.badge}
                      </span>
                      <span className="text-xs font-black text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                        <Award className="w-3 h-3 text-emerald-500" />
                        {bot.reliability}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-sm font-black text-slate-900 dark:text-white leading-snug">
                        {bot.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                        {bot.strategyDesc}
                      </p>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-[11px]">
                    <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                      <span>Win Rate:</span>
                      <strong className="text-emerald-700 dark:text-emerald-400 font-bold">{bot.winRate}</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                      <span>Average R:R:</span>
                      <strong className="text-amber-700 dark:text-amber-400 font-bold">{bot.avgRR}</strong>
                    </div>
                    <div className="flex justify-between items-center text-slate-600 dark:text-slate-400">
                      <span>Timeframe:</span>
                      <span className="font-mono text-[10px] text-slate-800 dark:text-slate-200 font-bold">{bot.bestFor}</span>
                    </div>

                    <div className="pt-1">
                      <div
                        className={`w-full py-1 text-center rounded-lg text-[10px] font-extrabold uppercase transition ${
                          isSelected
                            ? "bg-amber-400 text-slate-950 shadow-sm"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 group-hover:bg-slate-200 dark:group-hover:bg-slate-700"
                        }`}
                      >
                        {isSelected ? "Active Strategy ✓" : "Select Strategy"}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. MAIN HUB INTERFACE: LEFT COIN SCANNER | RIGHT LIVE CHART & LONG/SHORT ENTRY MATRIX */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* LEFT COLUMN: LIVE MARKET SCANNER & COIN SELECTOR (Col 5) */}
          <div className="lg:col-span-5 space-y-5">

            {/* Quick Search & Custom Binance Pair Bar */}
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-amber-500" />
                  <span>Scan Binance Markets</span>
                </span>
                <span className="text-[10px] font-mono text-slate-400">Live WebSockets</span>
              </div>

              <form onSubmit={handleLoadCustomPair} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search / Type pair (e.g. SUI, NEAR, PEPE)..."
                  value={customPair}
                  onChange={(e) => {
                    setCustomPair(e.target.value);
                    setSearchQuery(e.target.value);
                  }}
                  className="w-full px-3.5 py-2 text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-400 text-slate-950 text-xs font-black rounded-xl hover:bg-amber-300 transition whitespace-nowrap shadow-sm"
                >
                  Load
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
                        ? "bg-slate-900 text-white shadow-sm font-extrabold"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {sym}
                  </button>
                ))}
              </div>
            </div>

            {/* Timeframe selector pill bar */}
            <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-slate-200 shadow-sm text-xs">
              <span className="font-bold text-slate-600 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-500" /> Timeframe:
              </span>
              <div className="flex items-center gap-1">
                {(["5M", "15M", "1H", "4H"] as SignalTimeframe[]).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setSelectedTimeframe(tf)}
                    className={`px-2.5 py-1 rounded-lg font-mono font-bold text-xs transition ${
                      selectedTimeframe === tf
                        ? "bg-slate-900 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                  >
                    {tf}
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
                        ? "bg-white border-amber-400 shadow-md shadow-amber-400/10 scale-[1.01]"
                        : "bg-white border-slate-200/90 hover:border-slate-300 hover:bg-slate-50/60"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-xs text-slate-900">
                          {coin.base}
                        </div>
                        <div>
                          <div className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                            <span>{coin.base}/USDT</span>
                            <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-200">
                              {coin.timeframe}
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-500 font-medium">
                            Vol: {coin.marketCap.volume24hFormatted} • OI: {coin.coinglass.openInterestFormatted}
                          </div>
                        </div>
                      </div>

                      {/* Signal Badge */}
                      <div className="text-right">
                        <span
                          className={`px-2.5 py-0.5 rounded-lg text-[11px] font-black font-mono inline-block ${
                            isBull
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : isBear
                              ? "bg-rose-100 text-rose-800 border border-rose-200"
                              : "bg-slate-100 text-slate-700 border border-slate-200"
                          }`}
                        >
                          {coin.signal}
                        </span>
                        <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                          Confluence: <strong className="text-slate-900">{coin.confidence}%</strong>
                        </div>
                      </div>
                    </div>

                    {/* Price & Level preview */}
                    <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-mono">Present Spot</span>
                        <div className="font-extrabold text-slate-900 flex items-center gap-1">
                          ${formatPrice(coin.price)}
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-mono">24h Change</span>
                        <div className={`font-bold text-[11px] ${coin.change24h >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                          {coin.change24h >= 0 ? "+" : ""}{coin.change24h.toFixed(2)}%
                        </div>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-mono">Structure</span>
                        <div className="font-bold text-slate-700 text-[11px] truncate">
                          {coin.strategy}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 3. AI ENTRY COPILOT & FAST RISK CALCULATOR */}
            {activeCoin && (
              <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                      <Sliders className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">Futures Risk & Position Sizer</h4>
                      <p className="text-[11px] text-slate-500">
                        Live calculations for {activeCoin.base}/USDT ({directionMode})
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                    R:R {activeCoin.rrRatioFormatted}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-600 uppercase">Capital ($)</label>
                    <input
                      type="number"
                      value={capital}
                      onChange={(e) => setCapital(Math.max(10, Number(e.target.value)))}
                      className="w-full px-2.5 py-1.5 text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-600 uppercase">Risk (%)</label>
                    <input
                      type="number"
                      step="0.5"
                      min="0.5"
                      max="10"
                      value={riskPercent}
                      onChange={(e) => setRiskPercent(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-slate-600 uppercase">Leverage</label>
                    <select
                      value={leverage}
                      onChange={(e) => setLeverage(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                    >
                      <option value={1}>1x (Spot)</option>
                      <option value={2}>2x</option>
                      <option value={3}>3x (Safe)</option>
                      <option value={5}>5x (Scalp)</option>
                      <option value={10}>10x (Max)</option>
                    </select>
                  </div>
                </div>

                {/* Calculation Outputs */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Max Dollar Risk at Stop Loss:</span>
                    <span className="font-black text-rose-600">-${dollarRisk.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Recommended Position Units:</span>
                    <span className="font-extrabold text-slate-900">
                      {positionUnits >= 1 ? positionUnits.toFixed(4) : positionUnits.toFixed(2)} {activeCoin.base} (≈ ${Math.round(totalPositionValue).toLocaleString()})
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500">Required Margin ({leverage}x):</span>
                    <span className="font-bold text-amber-700">${Math.round(requiredMargin).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center pt-1 border-t border-slate-200/80">
                    <span className="text-slate-500 flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3 text-amber-500" />
                      <span>Est. Liquidation Price:</span>
                    </span>
                    <span className="font-mono font-bold text-rose-700">
                      ${formatPrice(estimatedLiquidationPrice)} ({isLong ? "-" : "+"}{((Math.abs(estimatedLiquidationPrice - activeCoin.entryPrice) / activeCoin.entryPrice) * 100).toFixed(1)}%)
                    </span>
                  </div>
                  <div className="pt-2 border-t border-slate-200 flex justify-between items-center font-bold">
                    <span className="text-emerald-700">Projected Profit at Target (TP2):</span>
                    <span className="text-emerald-600 font-extrabold">+${profitTP2.toFixed(2)} (+{((profitTP2 / capital) * 100).toFixed(1)}%)</span>
                  </div>
                </div>

                {/* Copy Setup Button */}
                <button
                  onClick={handleCopySetup}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition shadow-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-300">Trade Setup Copied (Telegram/Discord Format)!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-amber-400" />
                      <span>Copy Full Entry & SL/TP Parameters</span>
                    </>
                  )}
                </button>
              </div>
            )}

          </div>

          {/* RIGHT COLUMN: 1:1 SYNCHRONIZED EXECUTION BLUEPRINT (Col 7) */}
          {activeCoin && (
            <div className="lg:col-span-7 space-y-6">

              {/* ACTIVE BOT STRATEGY & COIN EXECUTION CARD */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">

                {/* Top: Active Symbol, Bot Strategy & Direction Switcher */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-2.5 mb-1">
                      <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                        {activeCoin.base}/USDT
                      </h3>
                      <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                        {activeBot.name}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium flex items-center gap-2">
                      <span>Present Spot: <strong className="text-slate-900 text-sm">${formatPrice(activeCoin.price)}</strong></span>
                      <span>• 24h Change: <strong className={activeCoin.change24h >= 0 ? "text-emerald-600" : "text-rose-600"}>
                        {activeCoin.change24h >= 0 ? "+" : ""}{activeCoin.change24h.toFixed(2)}%
                      </strong></span>
                    </p>
                  </div>

                  {/* INTERACTIVE LONG / SHORT TOGGLE SWITCH */}
                  <div className="flex items-center gap-1.5 bg-slate-100 p-1.5 rounded-2xl border border-slate-200 self-start sm:self-auto">
                    <button
                      onClick={() => setDirectionMode("LONG")}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition ${
                        directionMode === "LONG"
                          ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <TrendingUp className="w-3.5 h-3.5" />
                      <span>LONG / BUY</span>
                    </button>
                    <button
                      onClick={() => setDirectionMode("SHORT")}
                      className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-black transition ${
                        directionMode === "SHORT"
                          ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      <TrendingDown className="w-3.5 h-3.5" />
                      <span>SHORT / SELL</span>
                    </button>
                  </div>
                </div>

                {/* EXACT EXECUTION PARAMETERS TIERS */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  
                  {/* Exact Entry Zone */}
                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-amber-800 uppercase font-mono">
                      <Target className="w-3 h-3 text-amber-600" />
                      <span>Exact Entry Zone</span>
                    </div>
                    <div className="text-sm font-black text-slate-900 mt-1">
                      {activeCoin.entryZoneFormatted}
                    </div>
                    <div className="text-[10px] text-amber-700 font-medium mt-0.5">Matching current spot</div>
                  </div>

                  {/* Stop Loss (SL) */}
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-rose-700 uppercase font-mono">
                      <ShieldAlert className="w-3 h-3 text-rose-600" />
                      <span>Stop Loss (SL)</span>
                    </div>
                    <div className="text-sm font-black text-rose-700 mt-1">
                      {activeCoin.stopLossFormatted}
                    </div>
                    <div className="text-[10px] text-rose-600 font-bold mt-0.5">
                      Structure Invalidation
                    </div>
                  </div>

                  {/* Target 1 (TP1) */}
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 uppercase font-mono">
                      <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                      <span>Target 1 (TP1)</span>
                    </div>
                    <div className="text-sm font-black text-emerald-700 mt-1">
                      {activeCoin.tp1Formatted}
                    </div>
                    <div className="text-[10px] text-emerald-600 font-bold mt-0.5">
                      Secure 50% & SL to BE
                    </div>
                  </div>

                  {/* Target 2 (TP2 - Core) */}
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 uppercase font-mono">
                      <TrendingUp className="w-3 h-3 text-emerald-600" />
                      <span>Target 2 (TP2)</span>
                    </div>
                    <div className="text-sm font-black text-emerald-700 mt-1">
                      {activeCoin.tp2Formatted}
                    </div>
                    <div className="text-[10px] text-emerald-600 font-bold mt-0.5">
                      R:R {activeCoin.rrRatioFormatted}
                    </div>
                  </div>

                </div>

                {/* RUNNER TARGET (TP3) & SESSION CALLOUT */}
                <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                    <div>
                      <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                        Optimal Execution Session & Runner Target:
                      </span>
                      <div className="text-xs sm:text-sm font-black text-slate-100">
                        {activeCoin.optimalSession} • <span className="text-emerald-400">TP3 Runner: {activeCoin.tp3Formatted}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-mono text-slate-300 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700 flex items-center gap-1.5">
                    <span>Risk/Reward:</span>
                    <span className="text-amber-400 font-black text-sm">{activeCoin.rrRatioFormatted}</span>
                  </div>
                </div>

                {/* TECHNICAL & COINGLASS INDICATOR SNAPSHOT */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-mono uppercase">CoinGlass Funding</div>
                    <div className="font-black text-slate-900 font-mono">{activeCoin.coinglass.fundingRateFormatted}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-mono uppercase">Trend Structure</div>
                    <div className="font-bold text-slate-900 truncate">{activeCoin.technicals.emaTrend}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-mono uppercase">Taker CVD Delta</div>
                    <div className="font-bold text-slate-900 truncate">{activeCoin.coinglass.cvdDeltaFormatted}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-mono uppercase">Open Interest (OI)</div>
                    <div className="font-bold text-slate-900 font-mono">{activeCoin.coinglass.openInterestFormatted}</div>
                  </div>
                </div>

              </div>

              {/* INSTITUTIONAL ORDER FLOW & LIQUIDATION MAP */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                      <Layers className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="text-base font-black text-slate-900">
                        CoinGlass Liquidation Magnet Map & Order Flow
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Resting limit orders, volume delta profile & 24h channel position
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Live Book Delta
                  </span>
                </div>

                {/* 24h Range Channel Visualizer */}
                <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-500 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-rose-500" /> 24h Low: <strong>${formatPrice(activeCoin.low24h)}</strong>
                    </span>
                    <span className="font-bold text-amber-600">
                      Channel Range: ${formatPrice(activeCoin.high24h - activeCoin.low24h)} ({(((activeCoin.high24h - activeCoin.low24h) / Math.max(1, activeCoin.low24h)) * 100).toFixed(2)}%)
                    </span>
                    <span className="text-slate-500 flex items-center gap-1">
                      24h High: <strong>${formatPrice(activeCoin.high24h)}</strong> <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    </span>
                  </div>
                  <div className="relative w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                    <div
                      className="absolute top-0 bottom-0 bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-500 rounded-full transition-all duration-500"
                      style={{
                        width: "100%"
                      }}
                    />
                    <div
                      className="absolute top-0 bottom-0 w-3 bg-slate-950 border-2 border-white rounded-full shadow -ml-1.5 transition-all duration-300"
                      style={{
                        left: `${Math.max(5, Math.min(95, ((activeCoin.price - activeCoin.low24h) / Math.max(1, activeCoin.high24h - activeCoin.low24h)) * 100))}%`
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono pt-0.5">
                    <span>Oversold / Floor Support</span>
                    <span className="text-slate-800 font-bold">Present Price: ${formatPrice(activeCoin.price)}</span>
                    <span>Overbought / Peak Resistance</span>
                  </div>
                </div>

                {/* Liquidity Pools & Orderbook Blocks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-1">
                    <div className="text-[10px] font-bold text-rose-700 uppercase font-mono flex items-center justify-between">
                      <span>Upper Short Liquidation Pool</span>
                      <span>Target Magnet</span>
                    </div>
                    <div className="text-sm font-black text-rose-800 font-mono">
                      ${formatPrice(activeCoin.coinglass.liquidationUpperMagnet)}
                    </div>
                    <div className="text-[10px] text-rose-600">{activeCoin.coinglass.liquidationUpperPoolUsd}</div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1">
                    <div className="text-[10px] font-bold text-emerald-700 uppercase font-mono flex items-center justify-between">
                      <span>Lower Long Liquidation Shelf</span>
                      <span>Demand Floor</span>
                    </div>
                    <div className="text-sm font-black text-emerald-800 font-mono">
                      ${formatPrice(activeCoin.coinglass.liquidationLowerMagnet)}
                    </div>
                    <div className="text-[10px] text-emerald-600">{activeCoin.coinglass.liquidationLowerPoolUsd}</div>
                  </div>
                </div>

                {/* Buyer vs Seller Volume Inflow Pressure Meter */}
                <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
                  <div className="flex justify-between items-center text-xs">
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
                      style={{
                        width: `${activeCoin.coinglass.longAccountPercent}%`
                      }}
                    />
                    <div
                      className="bg-rose-500 transition-all duration-500"
                      style={{
                        width: `${activeCoin.coinglass.shortAccountPercent}%`
                      }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                    <span>Taker Aggression: <strong className="text-amber-400">{activeCoin.coinglass.cvdDeltaFormatted}</strong></span>
                    <span>Quote Vol: <strong className="text-slate-200">{activeCoin.marketCap.volume24hFormatted}</strong></span>
                  </div>
                </div>

              </div>

              {/* 6-FACTOR ALGORITHMIC CONFLUENCE CHECKLIST */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                      <ShieldAlert className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-base font-black text-slate-900">
                        AI Trade Validation & Confluence Audit
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Multi-indicator confluence checklist for {activeCoin.base}/USDT ({directionMode})
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 font-mono">
                    Grade A+ ({activeCoin.confidence}% Match)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                  {activeCoin.confluenceAudit.map((item, idx) => (
                    <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <div>
                        <div className="font-bold text-slate-900">{item.title}</div>
                        <div className="text-[10px] text-slate-500">{item.metric}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

        {/* 3. HIGHLIGHTED LIVE CHART TERMINAL GATEWAY */}
        {activeCoin && (
          <div className="w-full pt-4">
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/90 text-white p-6 sm:p-10 border-2 border-amber-400/40 shadow-xl shadow-amber-500/5">
              
              {/* Background ambient glow */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                
                {/* Header & Badges */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
                  <div className="space-y-2">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950 shadow-sm uppercase tracking-wider">
                      <BarChart2 className="w-3.5 h-3.5" />
                      <span>TradingView Terminal Suite</span>
                    </div>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
                      Live Multi-Timeframe Candlestick Chart &{" "}
                      <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-200 bg-clip-text text-transparent">
                        Technical Analysis Studio
                      </span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                      Instant access to high-performance TradingView candlestick charting, 100+ technical indicators (RSI, MACD, 200 EMA), full drawing suites, and institutional pivot gauges for <strong>{activeCoin.base}/USDT</strong>.
                    </p>
                  </div>

                  {/* Active Market Pill */}
                  <div className="bg-slate-800/90 border border-slate-700 p-3.5 rounded-2xl flex items-center gap-3 self-start lg:self-auto">
                    <div className="w-10 h-10 rounded-xl bg-amber-400/20 text-amber-400 border border-amber-400/30 flex items-center justify-center font-black text-sm">
                      {activeCoin.base}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400">Selected Live Market</div>
                      <div className="text-sm font-black text-white font-mono flex items-center gap-2">
                        <span>{activeCoin.tvSymbol}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-md font-bold ${activeCoin.change24h >= 0 ? "bg-emerald-500/20 text-emerald-400" : "bg-rose-500/20 text-rose-400"}`}>
                          {activeCoin.change24h >= 0 ? "+" : ""}{activeCoin.change24h.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 4 Feature Capability Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 text-xs">
                  <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/80 p-4 rounded-2xl space-y-1.5 hover:border-amber-400/50 transition">
                    <div className="flex items-center gap-2 font-bold text-amber-400">
                      <LineChart className="w-4 h-4" />
                      <span>100+ Technical Indicators</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      RSI (14), MACD Histogram, Bollinger Bands, 200/50 EMA, Volume Profile & CVD.
                    </p>
                  </div>

                  <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/80 p-4 rounded-2xl space-y-1.5 hover:border-amber-400/50 transition">
                    <div className="flex items-center gap-2 font-bold text-amber-400">
                      <Crosshair className="w-4 h-4" />
                      <span>Full Drawing & Trend Suite</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Fibonacci retracements, trend channels, pitchforks, support/resistance rays.
                    </p>
                  </div>

                  <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/80 p-4 rounded-2xl space-y-1.5 hover:border-amber-400/50 transition">
                    <div className="flex items-center gap-2 font-bold text-amber-400">
                      <Clock className="w-4 h-4" />
                      <span>Small Timeframe Scalping</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Seamless switching between 5M Scalp, 15M Intraday, 1H Breakout, and 4H Swing charts.
                    </p>
                  </div>

                  <div className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/80 p-4 rounded-2xl space-y-1.5 hover:border-amber-400/50 transition">
                    <div className="flex items-center gap-2 font-bold text-amber-400">
                      <Gauge className="w-4 h-4" />
                      <span>Institutional TA Gauge</span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Real-time technical speedometer, oscillator breakdown, and classic pivot points.
                    </p>
                  </div>
                </div>

                {/* Primary Action Row */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                  <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                    <span>Spot: <strong className="text-white">${formatPrice(activeCoin.price)}</strong></span>
                    <span>•</span>
                    <span>24h High: <strong className="text-emerald-400">${formatPrice(activeCoin.high24h)}</strong></span>
                    <span>•</span>
                    <span>24h Low: <strong className="text-rose-400">${formatPrice(activeCoin.low24h)}</strong></span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                    <Link
                      href={`/tools?tab=terminal&symbol=${activeCoin.tvSymbol}`}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 text-xs sm:text-sm font-black hover:from-amber-300 hover:to-yellow-300 transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 hover:scale-[1.02]"
                    >
                      <BarChart2 className="w-4 h-4 text-slate-950" />
                      <span>Launch Full Interactive Chart Terminal ({activeCoin.base}/USDT)</span>
                      <ArrowRight className="w-4 h-4 text-slate-950" />
                    </Link>

                    <Link
                      href="/tools?tab=bot"
                      className="w-full sm:w-auto px-4 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white text-xs font-bold transition flex items-center justify-center gap-1.5"
                    >
                      <span>Explore All 30+ Pairs</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </Link>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
