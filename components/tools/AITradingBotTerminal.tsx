"use client";

import { useState, useEffect } from "react";
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
  Lock,
  ChevronRight,
  Info
} from "lucide-react";

export interface CoinSignal {
  id: string;
  name: string;
  symbol: string;
  tvSymbol: string;
  price: number;
  change24h: number;
  volume24h: string;
  rsi: number;
  macd: string;
  fundingRate: string;
  signal: "STRONG BUY" | "BUY" | "NEUTRAL" | "SHORT" | "STRONG SHORT";
  confidence: number;
  timeframe: "15M" | "1H" | "4H" | "1D";
  entryZone: string;
  entryPrice: number;
  stopLoss: string;
  stopLossPrice: number;
  tp1: string;
  tp1Price: number;
  tp2: string;
  tp2Price: number;
  tp3: string;
  tp3Price: number;
  rrRatio: string;
  bestTime: string;
  rationale: string;
  strategy: string;
  indicators: {
    emaTrend: "Bullish (Above 200 EMA)" | "Bearish (Below 200 EMA)" | "Neutral";
    volumeDelta: "High Buying Pressure (+34%)" | "High Selling Pressure (-28%)" | "Balanced";
    liquidityCluster: string;
    marketPhase: "Markup / Expansion" | "Accumulation" | "Distribution" | "Markdown";
  };
}

const initialSignals: CoinSignal[] = [
  {
    id: "btc",
    name: "Bitcoin",
    symbol: "BTC/USDT",
    tvSymbol: "BINANCE:BTCUSDT",
    price: 66450,
    change24h: 3.85,
    volume24h: "$34.2B",
    rsi: 42.5,
    macd: "Bullish Crossover",
    fundingRate: "-0.0042%",
    signal: "STRONG BUY",
    confidence: 94,
    timeframe: "4H",
    entryZone: "$66,100 - $66,500",
    entryPrice: 66300,
    stopLoss: "$64,800 (-2.26%)",
    stopLossPrice: 64800,
    tp1: "$68,200 (+2.86%)",
    tp1Price: 68200,
    tp2: "$70,500 (+6.33%)",
    tp2Price: 70500,
    tp3: "$74,200 (+11.91%)",
    tp3Price: 74200,
    rrRatio: "1 : 3.85",
    bestTime: "NY Session Open (13:30 - 16:30 UTC)",
    rationale: "4H Bullish Order Block retest confirmed with negative funding squeeze and rising spot ETF net inflows.",
    strategy: "Swing Momentum Long",
    indicators: {
      emaTrend: "Bullish (Above 200 EMA)",
      volumeDelta: "High Buying Pressure (+34%)",
      liquidityCluster: "$68,500 Short Liquidation Pool",
      marketPhase: "Markup / Expansion"
    }
  },
  {
    id: "eth",
    name: "Ethereum",
    symbol: "ETH/USDT",
    tvSymbol: "BINANCE:ETHUSDT",
    price: 3520,
    change24h: 4.12,
    volume24h: "$18.6B",
    rsi: 48.0,
    macd: "Histogram Expanding Green",
    fundingRate: "+0.0025%",
    signal: "BUY",
    confidence: 86,
    timeframe: "1H",
    entryZone: "$3,490 - $3,530",
    entryPrice: 3510,
    stopLoss: "$3,420 (-2.56%)",
    stopLossPrice: 3420,
    tp1: "$3,640 (+3.70%)",
    tp1Price: 3640,
    tp2: "$3,780 (+7.69%)",
    tp2Price: 3780,
    tp3: "$3,950 (+12.53%)",
    tp3Price: 3950,
    rrRatio: "1 : 3.20",
    bestTime: "London / NY Overlap (12:00 - 16:00 UTC)",
    rationale: "Key support confluence at $3,480 with Layer-2 gas burn surge and positive staking accumulation delta.",
    strategy: "Intraday Breakout Long",
    indicators: {
      emaTrend: "Bullish (Above 200 EMA)",
      volumeDelta: "High Buying Pressure (+34%)",
      liquidityCluster: "$3,650 Dense Resistance Pool",
      marketPhase: "Accumulation"
    }
  },
  {
    id: "sol",
    name: "Solana",
    symbol: "SOL/USDT",
    tvSymbol: "BINANCE:SOLUSDT",
    price: 168.4,
    change24h: 7.64,
    volume24h: "$9.4B",
    rsi: 61.2,
    macd: "Strong Bullish Momentum",
    fundingRate: "+0.0110%",
    signal: "STRONG BUY",
    confidence: 91,
    timeframe: "4H",
    entryZone: "$165.00 - $169.00",
    entryPrice: 167.0,
    stopLoss: "$158.50 (-5.08%)",
    stopLossPrice: 158.5,
    tp1: "$178.00 (+6.58%)",
    tp1Price: 178.0,
    tp2: "$192.00 (+14.97%)",
    tp2Price: 192.0,
    tp3: "$210.00 (+25.74%)",
    tp3Price: 210.0,
    rrRatio: "1 : 3.65",
    bestTime: "Asian / London Handover (07:00 - 10:00 UTC)",
    rationale: "Ascending triangle breakout on 4H chart with high on-chain DEX velocity and perpetual open interest surge.",
    strategy: "Trend Continuation Long",
    indicators: {
      emaTrend: "Bullish (Above 200 EMA)",
      volumeDelta: "High Buying Pressure (+34%)",
      liquidityCluster: "$180.00 Overhead Liquidity",
      marketPhase: "Markup / Expansion"
    }
  },
  {
    id: "bnb",
    name: "BNB",
    symbol: "BNB/USDT",
    tvSymbol: "BINANCE:BNBUSDT",
    price: 585.2,
    change24h: 1.15,
    volume24h: "$1.8B",
    rsi: 54.0,
    macd: "Neutral Consolidation",
    fundingRate: "+0.0050%",
    signal: "NEUTRAL",
    confidence: 72,
    timeframe: "1D",
    entryZone: "$575.00 - $590.00",
    entryPrice: 582.0,
    stopLoss: "$560.00 (-3.78%)",
    stopLossPrice: 560.0,
    tp1: "$610.00 (+4.81%)",
    tp1Price: 610.0,
    tp2: "$635.00 (+9.10%)",
    tp2Price: 635.0,
    tp3: "$660.00 (+13.40%)",
    tp3Price: 660.0,
    rrRatio: "1 : 2.45",
    bestTime: "Consolidation Range - Wait for Breakout",
    rationale: "Trading within high-timeframe VPOC value area. Wait for clean range break above $595 or sweep of $575.",
    strategy: "Range Mean Reversion",
    indicators: {
      emaTrend: "Neutral",
      volumeDelta: "Balanced",
      liquidityCluster: "$600 Equal Highs Cluster",
      marketPhase: "Accumulation"
    }
  },
  {
    id: "xrp",
    name: "XRP",
    symbol: "XRP/USDT",
    tvSymbol: "BINANCE:XRPUSDT",
    price: 0.584,
    change24h: -1.82,
    volume24h: "$2.1B",
    rsi: 68.5,
    macd: "Bearish Divergence on 1H",
    fundingRate: "+0.0180%",
    signal: "SHORT",
    confidence: 84,
    timeframe: "1H",
    entryZone: "$0.588 - $0.595",
    entryPrice: 0.590,
    stopLoss: "$0.608 (+3.05%)",
    stopLossPrice: 0.608,
    tp1: "$0.565 (-4.23%)",
    tp1Price: 0.565,
    tp2: "$0.542 (-8.13%)",
    tp2Price: 0.542,
    tp3: "$0.515 (-12.71%)",
    tp3Price: 0.515,
    rrRatio: "1 : 3.25",
    bestTime: "NY Afternoon Close (18:00 - 21:00 UTC)",
    rationale: "Failure to hold local breakout level, 1H RSI bearish divergence, high positive retail funding creating long squeeze vulnerability.",
    strategy: "Mean Reversion Short",
    indicators: {
      emaTrend: "Bearish (Below 200 EMA)",
      volumeDelta: "High Selling Pressure (-28%)",
      liquidityCluster: "$0.550 Resting Long Stop Pool",
      marketPhase: "Distribution"
    }
  },
  {
    id: "sui",
    name: "Sui",
    symbol: "SUI/USDT",
    tvSymbol: "BINANCE:SUIUSDT",
    price: 2.14,
    change24h: 12.4,
    volume24h: "$1.4B",
    rsi: 58.4,
    macd: "Bullish Super-Trend",
    fundingRate: "+0.0080%",
    signal: "STRONG BUY",
    confidence: 93,
    timeframe: "15M",
    entryZone: "$2.08 - $2.15",
    entryPrice: 2.12,
    stopLoss: "$1.98 (-6.60%)",
    stopLossPrice: 1.98,
    tp1: "$2.32 (+9.43%)",
    tp1Price: 2.32,
    tp2: "$2.55 (+20.28%)",
    tp2Price: 2.55,
    tp3: "$2.85 (+34.43%)",
    tp3Price: 2.85,
    rrRatio: "1 : 4.10",
    bestTime: "NY Session Morning (14:00 - 17:00 UTC)",
    rationale: "High institutional volume expansion breaking local multi-week resistance with ascending volume delta.",
    strategy: "High Momentum Scalp",
    indicators: {
      emaTrend: "Bullish (Above 200 EMA)",
      volumeDelta: "High Buying Pressure (+34%)",
      liquidityCluster: "$2.40 Open Sky Discovery",
      marketPhase: "Markup / Expansion"
    }
  },
  {
    id: "near",
    name: "NEAR Protocol",
    symbol: "NEAR/USDT",
    tvSymbol: "BINANCE:NEARUSDT",
    price: 5.42,
    change24h: 5.15,
    volume24h: "$820M",
    rsi: 46.2,
    macd: "Bullish MACD Cross",
    fundingRate: "+0.0035%",
    signal: "BUY",
    confidence: 87,
    timeframe: "4H",
    entryZone: "$5.30 - $5.45",
    entryPrice: 5.38,
    stopLoss: "$5.12 (-4.83%)",
    stopLossPrice: 5.12,
    tp1: "$5.85 (+8.73%)",
    tp1Price: 5.85,
    tp2: "$6.25 (+16.17%)",
    tp2Price: 6.25,
    tp3: "$6.80 (+26.39%)",
    tp3Price: 6.80,
    rrRatio: "1 : 3.45",
    bestTime: "London Morning (08:30 - 11:30 UTC)",
    rationale: "Bullish bounce off 50 EMA on 4H timeframe with strong AI ecosystem volume catalyst.",
    strategy: "Swing Trend Long",
    indicators: {
      emaTrend: "Bullish (Above 200 EMA)",
      volumeDelta: "High Buying Pressure (+34%)",
      liquidityCluster: "$6.00 Round Number Resistance",
      marketPhase: "Accumulation"
    }
  },
  {
    id: "link",
    name: "Chainlink",
    symbol: "LINK/USDT",
    tvSymbol: "BINANCE:LINKUSDT",
    price: 12.85,
    change24h: 2.30,
    volume24h: "$640M",
    rsi: 51.0,
    macd: "Neutral to Bullish",
    fundingRate: "+0.0010%",
    signal: "BUY",
    confidence: 83,
    timeframe: "1D",
    entryZone: "$12.50 - $12.90",
    entryPrice: 12.75,
    stopLoss: "$12.10 (-5.09%)",
    stopLossPrice: 12.10,
    tp1: "$13.90 (+9.01%)",
    tp1Price: 13.90,
    tp2: "$15.20 (+19.21%)",
    tp2Price: 15.20,
    tp3: "$17.00 (+33.33%)",
    tp3Price: 17.00,
    rrRatio: "1 : 3.75",
    bestTime: "High-Timeframe Position Play (Hold 3-7 Days)",
    rationale: "Long-term accumulation cylinder with CCIP cross-chain volume milestones expanding.",
    strategy: "Macro Swing Long",
    indicators: {
      emaTrend: "Bullish (Above 200 EMA)",
      volumeDelta: "Balanced",
      liquidityCluster: "$14.50 Liquidity Pool",
      marketPhase: "Accumulation"
    }
  },
  {
    id: "avax",
    name: "Avalanche",
    symbol: "AVAX/USDT",
    tvSymbol: "BINANCE:AVAXUSDT",
    price: 28.60,
    change24h: -2.45,
    volume24h: "$510M",
    rsi: 66.0,
    macd: "Bearish Momentum",
    fundingRate: "+0.0140%",
    signal: "SHORT",
    confidence: 82,
    timeframe: "1H",
    entryZone: "$28.80 - $29.20",
    entryPrice: 29.00,
    stopLoss: "$30.15 (+3.96%)",
    stopLossPrice: 30.15,
    tp1: "$27.20 (-6.20%)",
    tp1Price: 27.20,
    tp2: "$25.80 (-11.03%)",
    tp2Price: 25.80,
    tp3: "$24.00 (-17.24%)",
    tp3Price: 24.00,
    rrRatio: "1 : 3.10",
    bestTime: "NY Morning Session (14:30 - 17:00 UTC)",
    rationale: "Double top rejection at $29.50 with bearish volume absorption and high positive funding rate.",
    strategy: "Rejection Short",
    indicators: {
      emaTrend: "Bearish (Below 200 EMA)",
      volumeDelta: "High Selling Pressure (-28%)",
      liquidityCluster: "$26.00 Long Stop Liquidation",
      marketPhase: "Distribution"
    }
  },
  {
    id: "doge",
    name: "Dogecoin",
    symbol: "DOGE/USDT",
    tvSymbol: "BINANCE:DOGEUSDT",
    price: 0.118,
    change24h: 3.10,
    volume24h: "$1.1B",
    rsi: 52.8,
    macd: "Consolidation",
    fundingRate: "+0.0065%",
    signal: "NEUTRAL",
    confidence: 75,
    timeframe: "1H",
    entryZone: "$0.114 - $0.119",
    entryPrice: 0.116,
    stopLoss: "$0.109 (-6.03%)",
    stopLossPrice: 0.109,
    tp1: "$0.128 (+10.34%)",
    tp1Price: 0.128,
    tp2: "$0.139 (+19.82%)",
    tp2Price: 0.139,
    tp3: "$0.155 (+33.62%)",
    tp3Price: 0.155,
    rrRatio: "1 : 2.80",
    bestTime: "Weekend Volatility Windows",
    rationale: "Range bound between $0.112 and $0.124. Awaiting directional volume breakout confirmation.",
    strategy: "Range Trading",
    indicators: {
      emaTrend: "Neutral",
      volumeDelta: "Balanced",
      liquidityCluster: "$0.130 Liquidity Sweep",
      marketPhase: "Accumulation"
    }
  }
];

export default function AITradingBotTerminal() {
  const [signals, setSignals] = useState<CoinSignal[]>(initialSignals);
  const [selectedCoin, setSelectedCoin] = useState<CoinSignal>(initialSignals[0]);
  const [signalFilter, setSignalFilter] = useState<"ALL" | "BUY" | "SHORT" | "HIGH_CONF">("ALL");
  const [timeframeFilter, setTimeframeFilter] = useState<"ALL" | "15M" | "1H" | "4H" | "1D">("ALL");
  const [search, setSearch] = useState("");

  // AI Copilot State
  const [copilotCapital, setCopilotCapital] = useState(10000);
  const [copilotRiskPercent, setCopilotRiskPercent] = useState(1.5);
  const [copilotLeverage, setCopilotLeverage] = useState(3);

  // Simulated live pulse updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSignals((prev) =>
        prev.map((coin) => {
          const delta = (Math.random() - 0.48) * (coin.price * 0.001);
          const newPrice = Number((coin.price + delta).toFixed(coin.price < 1 ? 4 : 2));
          return {
            ...coin,
            price: newPrice,
          };
        })
      );
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const filteredCoins = signals.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.symbol.toLowerCase().includes(search.toLowerCase());

    const matchesSignal =
      signalFilter === "ALL"
        ? true
        : signalFilter === "BUY"
        ? c.signal.includes("BUY")
        : signalFilter === "SHORT"
        ? c.signal.includes("SHORT")
        : c.confidence >= 88;

    const matchesTimeframe = timeframeFilter === "ALL" || c.timeframe === timeframeFilter;

    return matchesSearch && matchesSignal && matchesTimeframe;
  });

  const dollarRisk = (copilotCapital * copilotRiskPercent) / 100;
  const priceDistance = Math.abs(selectedCoin.entryPrice - selectedCoin.stopLossPrice);
  const positionUnits = priceDistance > 0 ? dollarRisk / priceDistance : 0;
  const positionValue = positionUnits * selectedCoin.entryPrice;
  const requiredMargin = positionValue / copilotLeverage;

  const profitTP1 = positionUnits * Math.abs(selectedCoin.tp1Price - selectedCoin.entryPrice);
  const profitTP2 = positionUnits * Math.abs(selectedCoin.tp2Price - selectedCoin.entryPrice);
  const profitTP3 = positionUnits * Math.abs(selectedCoin.tp3Price - selectedCoin.entryPrice);

  return (
    <div className="space-y-8">

      {/* Terminal Top Control Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-spin" />
              <span>AI Trading Bot & 24/7 Signals Engine</span>
            </span>
            <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Scanner Active
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Institutional Algorithmic Signals Terminal
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Real-time market microstructure analysis, precise invalidation levels, multi-tier targets, and optimal trading time windows.
          </p>
        </div>

        {/* Global Summary Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-center">
            <span className="text-[10px] font-mono text-slate-400 font-bold uppercase">Active Setups</span>
            <div className="text-lg font-black text-slate-900 mt-0.5">{signals.length} Coins</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-center">
            <span className="text-[10px] font-mono text-emerald-700 font-bold uppercase">Bullish Signals</span>
            <div className="text-lg font-black text-emerald-600 mt-0.5">
              {signals.filter((s) => s.signal.includes("BUY")).length}
            </div>
          </div>
          <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 text-center">
            <span className="text-[10px] font-mono text-rose-700 font-bold uppercase">Short Setups</span>
            <div className="text-lg font-black text-rose-600 mt-0.5">
              {signals.filter((s) => s.signal.includes("SHORT")).length}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Left Scanner & Copilot | Right TradingView & Execution Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: LIVE MARKET SCANNER & SIGNALS FEED */}
        <div className="lg:col-span-5 space-y-6">

          {/* Filter and Search Bar */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm space-y-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search coin (BTC, ETH, SOL, SUI)..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs font-semibold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>

            {/* Signal Type Filters */}
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: "ALL", label: "All Coins" },
                { id: "BUY", label: "🟢 Longs" },
                { id: "SHORT", label: "🔴 Shorts" },
                { id: "HIGH_CONF", label: "⚡ 88%+ Conf." },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSignalFilter(f.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                    signalFilter === f.id
                      ? "bg-slate-900 text-white shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Timeframe Filters */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-[11px] font-bold text-slate-400 uppercase font-mono">Timeframe:</span>
              <div className="flex gap-1">
                {["ALL", "15M", "1H", "4H", "1D"].map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setTimeframeFilter(tf as any)}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold transition ${
                      timeframeFilter === tf
                        ? "bg-amber-400 text-slate-950 font-extrabold"
                        : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Scanner Coin List */}
          <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
            {filteredCoins.map((coin) => {
              const isSelected = selectedCoin.id === coin.id;
              const isBullish = coin.signal.includes("BUY");
              const isShort = coin.signal.includes("SHORT");

              return (
                <div
                  key={coin.id}
                  onClick={() => setSelectedCoin(coin)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white border-amber-400 shadow-md shadow-amber-400/10 scale-[1.01]"
                      : "bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center font-black text-xs text-slate-800">
                        {coin.symbol.split("/")[0]}
                      </div>
                      <div>
                        <div className="text-sm font-extrabold text-slate-900 flex items-center gap-1.5">
                          <span>{coin.symbol}</span>
                          <span className="text-[10px] font-mono font-normal text-slate-400">({coin.timeframe})</span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium">{coin.name}</div>
                      </div>
                    </div>

                    {/* Signal Badge */}
                    <div className="text-right">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold font-mono inline-block ${
                          isBullish
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : isShort
                            ? "bg-rose-100 text-rose-800 border border-rose-200"
                            : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}
                      >
                        {coin.signal}
                      </span>
                      <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                        Conf: <strong className="text-slate-700">{coin.confidence}%</strong>
                      </div>
                    </div>
                  </div>

                  {/* Price & Execution Preview */}
                  <div className="grid grid-cols-3 gap-2 pt-2.5 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono">Live Price</span>
                      <div className="font-extrabold text-slate-900">
                        ${coin.price.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono">Entry Zone</span>
                      <div className="font-bold text-amber-700 text-[11px] truncate">
                        {coin.entryZone}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono">R:R Ratio</span>
                      <div className="font-bold text-slate-900 text-[11px]">
                        {coin.rrRatio}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI COPILOT: POSITION RISK & LEVERAGE CALCULATOR */}
          <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                <Sliders className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">AI Copilot Risk Sizer</h3>
                <p className="text-[11px] text-slate-500">Calculate exact capital sizing for {selectedCoin.symbol}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-600 uppercase">Capital ($)</label>
                <input
                  type="number"
                  value={copilotCapital}
                  onChange={(e) => setCopilotCapital(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-600 uppercase">Risk (%)</label>
                <input
                  type="number"
                  step="0.5"
                  value={copilotRiskPercent}
                  onChange={(e) => setCopilotRiskPercent(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-600 uppercase">Leverage</label>
                <select
                  value={copilotLeverage}
                  onChange={(e) => setCopilotLeverage(Number(e.target.value))}
                  className="w-full px-2.5 py-1.5 text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                >
                  <option value={1}>1x (Spot)</option>
                  <option value={2}>2x</option>
                  <option value={3}>3x (Safe)</option>
                  <option value={5}>5x</option>
                  <option value={10}>10x (Max)</option>
                </select>
              </div>
            </div>

            {/* Calculated Copilot Output */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Max Dollar Risk at Stop Loss:</span>
                <span className="font-black text-rose-600">-${dollarRisk.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Recommended Position Size:</span>
                <span className="font-extrabold text-slate-900">
                  {positionUnits.toFixed(selectedCoin.price < 1 ? 2 : 4)} {selectedCoin.symbol.split("/")[0]} (≈ ${Math.round(positionValue).toLocaleString()})
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Required Margin ({copilotLeverage}x):</span>
                <span className="font-bold text-amber-700">${Math.round(requiredMargin).toLocaleString()}</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between items-center font-bold">
                <span className="text-emerald-700">Estimated Target Gain (TP2):</span>
                <span className="text-emerald-600 font-extrabold">+${profitTP2.toFixed(2)} (+{((profitTP2 / copilotCapital) * 100).toFixed(1)}%)</span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: TRADINGVIEW TERMINAL & DEEP DIVE EXECUTION MATRIX */}
        <div className="lg:col-span-7 space-y-6">

          {/* Selected Coin Header & Live Action Matrix */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
            
            <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                    {selectedCoin.symbol}
                  </h3>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                    {selectedCoin.strategy}
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium">
                  {selectedCoin.name} • 24h Volume: {selectedCoin.volume24h} • 24h Change:{" "}
                  <span className={selectedCoin.change24h >= 0 ? "text-emerald-600 font-bold" : "text-rose-600 font-bold"}>
                    {selectedCoin.change24h >= 0 ? "+" : ""}{selectedCoin.change24h}%
                  </span>
                </p>
              </div>

              {/* Signal Badge & Confidence */}
              <div className="text-right">
                <div
                  className={`px-4 py-1.5 rounded-xl text-sm font-black font-mono shadow-sm inline-block ${
                    selectedCoin.signal.includes("BUY")
                      ? "bg-emerald-500 text-white"
                      : selectedCoin.signal.includes("SHORT")
                      ? "bg-rose-500 text-white"
                      : "bg-slate-800 text-white"
                  }`}
                >
                  {selectedCoin.signal}
                </div>
                <div className="text-xs font-mono text-slate-500 mt-1">
                  Model Confidence: <strong className="text-slate-900">{selectedCoin.confidence}%</strong>
                </div>
              </div>
            </div>

            {/* EXACT EXECUTION PARAMETERS (Entry, Stop Loss, TP1, TP2, TP3) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              
              {/* Entry */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                <div className="flex items-center gap-1 text-[10px] font-bold text-amber-800 uppercase font-mono">
                  <Target className="w-3 h-3 text-amber-600" />
                  <span>Entry Zone</span>
                </div>
                <div className="text-sm sm:text-base font-extrabold text-slate-900 mt-1">
                  {selectedCoin.entryZone}
                </div>
                <div className="text-[10px] text-amber-700 font-medium mt-0.5">Optimal limit entry</div>
              </div>

              {/* Stop Loss */}
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                <div className="flex items-center gap-1 text-[10px] font-bold text-rose-700 uppercase font-mono">
                  <ShieldAlert className="w-3 h-3 text-rose-600" />
                  <span>Stop Loss</span>
                </div>
                <div className="text-sm sm:text-base font-extrabold text-rose-700 mt-1">
                  {selectedCoin.stopLoss}
                </div>
                <div className="text-[10px] text-rose-600 font-medium mt-0.5">Invalidation level</div>
              </div>

              {/* TP 1 */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 uppercase font-mono">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Target TP1</span>
                </div>
                <div className="text-sm sm:text-base font-extrabold text-emerald-700 mt-1">
                  {selectedCoin.tp1}
                </div>
                <div className="text-[10px] text-emerald-600 font-medium mt-0.5">Take 50% & SL to BE</div>
              </div>

              {/* TP 2 / TP 3 */}
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 uppercase font-mono">
                  <TrendingUp className="w-3 h-3 text-emerald-600" />
                  <span>Runner TP3</span>
                </div>
                <div className="text-sm sm:text-base font-extrabold text-emerald-700 mt-1">
                  {selectedCoin.tp3}
                </div>
                <div className="text-[10px] text-emerald-600 font-medium mt-0.5">R:R {selectedCoin.rrRatio}</div>
              </div>

            </div>

            {/* Best Trading Session Window Callout */}
            <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="text-[11px] font-mono text-amber-400 uppercase font-bold">Optimal Execution Window:</span>
                  <div className="text-xs sm:text-sm font-extrabold text-slate-100">{selectedCoin.bestTime}</div>
                </div>
              </div>
              <div className="text-xs font-mono text-slate-400 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
                R:R <span className="text-amber-400 font-bold">{selectedCoin.rrRatio}</span>
              </div>
            </div>

            {/* Algorithmic Rationale & Technical Indicator Matrix */}
            <div className="space-y-3 pt-2">
              <div className="text-xs font-mono font-bold text-slate-500 uppercase">
                Algorithmic Setup Justification
              </div>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                {selectedCoin.rationale}
              </p>

              {/* Indicator Table */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">RSI (14)</div>
                  <div className="font-bold text-slate-900">{selectedCoin.rsi} ({selectedCoin.rsi < 45 ? "Oversold" : selectedCoin.rsi > 65 ? "Overbought" : "Neutral"})</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">MACD</div>
                  <div className="font-bold text-slate-900 truncate">{selectedCoin.macd}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Funding Rate</div>
                  <div className="font-bold text-slate-900">{selectedCoin.fundingRate}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">Market Phase</div>
                  <div className="font-bold text-slate-900">{selectedCoin.indicators.marketPhase}</div>
                </div>
              </div>
            </div>

          </div>

          {/* SYNCHRONIZED REAL-TIME TRADINGVIEW CHART CONTAINER */}
          <div className="bg-white rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-amber-500" />
                <h4 className="text-sm font-bold text-slate-900">
                  Live TradingView Terminal: {selectedCoin.symbol}
                </h4>
              </div>
              <span className="text-[11px] font-mono text-slate-500">
                Resolution: <strong className="text-slate-800">{selectedCoin.timeframe}</strong>
              </span>
            </div>

            <div className="h-[480px] w-full rounded-2xl overflow-hidden border border-slate-100">
              <iframe
                title={`TradingView Real-Time Chart ${selectedCoin.tvSymbol}`}
                src={`https://s.tradingview.com/widgetembed/?frameElementId=tradingview_widget&symbol=${encodeURIComponent(
                  selectedCoin.tvSymbol
                )}&interval=${selectedCoin.timeframe === "15M" ? "15" : selectedCoin.timeframe === "1H" ? "60" : selectedCoin.timeframe === "4H" ? "240" : "D"}&hidesidetoolbar=0&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=light&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=localhost&utm_medium=widget&utm_campaign=chart&utm_term=${encodeURIComponent(
                  selectedCoin.tvSymbol
                )}`}
                className="w-full h-full border-0"
                loading="lazy"
                allowFullScreen
              />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
