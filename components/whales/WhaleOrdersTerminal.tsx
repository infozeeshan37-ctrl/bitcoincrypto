"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Fish,
  TrendingUp,
  TrendingDown,
  Activity,
  Layers,
  Search,
  ExternalLink,
  Flame,
  Clock,
  Sparkles,
  ShieldAlert,
  ArrowRight,
  Filter,
  BarChart2,
  RefreshCw,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Info,
  DollarSign,
  PieChart,
  Eye,
  Sliders,
  Copy,
  Check,
  BookOpen,
  Anchor,
  HelpCircle
} from "lucide-react";
import { WhaleOrder, WhaleLiquidityWall, WhaleSentimentSummary } from "@/app/api/whale-orders/route";
import WhaleOrdersChartTerminal from "./WhaleOrdersChartTerminal";

const SUPPORTED_COINS = [
  { symbol: "BTCUSDT", base: "BTC", name: "Bitcoin", icon: "₿" },
  { symbol: "ETHUSDT", base: "ETH", name: "Ethereum", icon: "Ξ" },
  { symbol: "SOLUSDT", base: "SOL", name: "Solana", icon: "◎" },
  { symbol: "BNBUSDT", base: "BNB", name: "BNB", icon: "✦" },
  { symbol: "XRPUSDT", base: "XRP", name: "XRP", icon: "✕" },
  { symbol: "DOGEUSDT", base: "DOGE", name: "Dogecoin", icon: "Ð" },
  { symbol: "SUIUSDT", base: "SUI", name: "Sui", icon: "💧" },
];

export default function WhaleOrdersTerminal() {
  const [selectedSymbol, setSelectedSymbol] = useState("BTCUSDT");
  const [whaleOrders, setWhaleOrders] = useState<WhaleOrder[]>([]);
  const [liquidityWalls, setLiquidityWalls] = useState<WhaleLiquidityWall[]>([]);
  const [sentiment, setSentiment] = useState<WhaleSentimentSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  
  // Filter controls
  const [thresholdFilter, setThresholdFilter] = useState<number>(100000); // 100K, 500K, 1M, 5M
  const [sideFilter, setSideFilter] = useState<"ALL" | "BUY" | "SELL">("ALL");
  const [exchangeFilter, setExchangeFilter] = useState<string>("ALL");
  const [copiedTrade, setCopiedTrade] = useState<string | null>(null);

  const fetchWhaleData = useCallback(async (sym: string) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/whale-orders?symbol=${sym}`);
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setWhaleOrders(json.data.whaleOrders || []);
          setLiquidityWalls(json.data.liquidityWalls || []);
          setSentiment(json.data.sentiment || null);
          setLastUpdated(new Date().toLocaleTimeString());
        }
      }
      setLoading(false);
    } catch (e) {
      console.warn("Whale data fetch warning:", e);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWhaleData(selectedSymbol);
    const interval = setInterval(() => {
      fetchWhaleData(selectedSymbol);
    }, 6000); // 6s live polling
    return () => clearInterval(interval);
  }, [selectedSymbol, fetchWhaleData]);

  // Filter whale orders based on threshold, side, and exchange
  const filteredOrders = whaleOrders.filter((o) => {
    const matchThreshold = o.usdValue >= thresholdFilter;
    const matchSide = sideFilter === "ALL" || o.side === sideFilter;
    const matchEx = exchangeFilter === "ALL" || o.exchange === exchangeFilter;
    return matchThreshold && matchSide && matchEx;
  });

  const formatUsd = (n: number) => {
    if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
    if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
    if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
    return `$${n.toLocaleString()}`;
  };

  const handleCopyTrade = (order: WhaleOrder) => {
    const text = `🐋 Whale Order Detected: ${order.side} ${formatUsd(order.usdValue)} ${order.base} @ $${order.price.toLocaleString()} on ${order.exchange} (${order.orderType})`;
    navigator.clipboard.writeText(text);
    setCopiedTrade(order.id);
    setTimeout(() => setCopiedTrade(null), 2000);
  };

  const activeCoin = SUPPORTED_COINS.find((c) => c.symbol === selectedSymbol) || SUPPORTED_COINS[0];

  return (
    <div className="space-y-10 pb-20">
      
      {/* 1. PROFESSIONAL REAL-TIME WHALE ORDERS & LARGE TRADES GRAPH (STARTING COMPONENT MATCHING REFERENCE PHOTO) */}
      <section id="whale-chart-terminal">
        <WhaleOrdersChartTerminal />
      </section>

      {/* 2. HERO BANNER WITH LIVE WHALE HUD */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 border border-indigo-900/40 shadow-xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  <Fish className="w-4 h-4 text-indigo-400" />
                  Institutional Whale Orderflow &amp; Block Tape
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                Whale Orders &amp; <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-indigo-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                  Institutional Liquidity Radar
                </span>
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm max-w-3xl mt-2 leading-relaxed">
                Track where crypto whales and institutional desks are placing multi-million dollar limit walls, aggressive taker sweeps, iceberg orders, and dark pool executions across major global exchanges in real time.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => fetchWhaleData(selectedSymbol)}
                className="px-4 py-2.5 rounded-2xl bg-slate-900 border border-slate-700 hover:bg-slate-800 text-white text-xs font-bold transition flex items-center gap-2 shadow-sm"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                <span>Refresh Radar</span>
              </button>
              <Link
                href="/orderbook"
                className="px-5 py-2.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition flex items-center gap-1.5 shadow-md hover:scale-105"
              >
                <span>L2 Order Book</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Real-Time Whale HUD Metrics */}
          {sentiment && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4 border-t border-slate-800 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                  <Activity className="w-3 h-3 text-indigo-400" /> Whale Net Bias
                </span>
                <div className="text-sm sm:text-base font-black text-emerald-400 font-mono truncate">
                  {sentiment.whaleNetBias}
                </div>
                <span className="text-[10px] text-emerald-300 font-mono">
                  {sentiment.whaleBuyPercent}% Buy vs {sentiment.whaleSellPercent}% Sell
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                  <BarChart2 className="w-3 h-3 text-blue-400" /> 24h Whale Volume
                </span>
                <div className="text-lg font-black text-white font-mono">
                  {formatUsd(sentiment.totalWhaleVolume24hUsd)}
                </div>
                <span className="text-[10px] text-indigo-300 font-mono">
                  CVD Delta: {sentiment.whaleCvdDeltaUsd >= 0 ? "+" : ""}{formatUsd(sentiment.whaleCvdDeltaUsd)}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-400" /> Largest Single Order
                </span>
                <div className="text-lg font-black text-amber-400 font-mono">
                  {formatUsd(sentiment.largestSingleOrderUsd)}
                </div>
                <span className="text-[10px] text-slate-400 truncate block">
                  {sentiment.largestOrderDetails || "Institutional Block"}
                </span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                  <Layers className="w-3 h-3 text-emerald-400" /> Resting Wall Depth
                </span>
                <div className="text-base font-black text-white font-mono">
                  {sentiment.wallRatio}
                </div>
                <span className="text-[10px] text-slate-400">
                  Bids: {formatUsd(sentiment.activeBidWallsUsd)} • Asks: {formatUsd(sentiment.activeAskWallsUsd)}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 2. SYMBOL SELECTOR & LIVE PRICE BAR */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 no-scrollbar">
          <span className="text-xs font-bold text-slate-400 uppercase font-mono mr-1 shrink-0">
            Whale Markets:
          </span>
          {SUPPORTED_COINS.map((coin) => {
            const isSelected = selectedSymbol === coin.symbol;
            return (
              <button
                key={coin.symbol}
                onClick={() => setSelectedSymbol(coin.symbol)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-black transition flex items-center gap-2 shrink-0 ${
                  isSelected
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-md scale-105"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                <span className="text-amber-500 font-bold">{coin.icon}</span>
                <span>{coin.base}/USDT</span>
              </button>
            );
          })}
        </div>

        {sentiment && (
          <div className="flex items-center gap-4 border-t sm:border-t-0 sm:border-l border-slate-200 dark:border-slate-800 pt-3 sm:pt-0 sm:pl-4">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-mono font-bold">Spot Price</div>
              <div className="text-base sm:text-lg font-black text-slate-900 dark:text-white font-mono">
                ${sentiment.currentPrice >= 1 ? sentiment.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 }) : sentiment.currentPrice.toFixed(4)}
              </div>
            </div>
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-mono font-bold">24h Change</div>
              <div className={`text-xs sm:text-sm font-black font-mono ${sentiment.change24h >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                {sentiment.change24h >= 0 ? "+" : ""}{sentiment.change24h.toFixed(2)}%
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 3. MAIN 2-COLUMN SECTION: COINGLASS-STYLE WHALE HEATMAP LADDER & LIVE LARGE ORDER FEED */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: COINGLASS-STYLE WHALE LIQUIDITY HEATMAP & WALL LADDER (Col 7) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-black">
                    <Layers className="w-4 h-4" />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    Whale Liquidity Heatmap &amp; Resting Limit Walls
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Active limit bid &amp; ask walls deployed by market makers and institutional trading desks on {activeCoin.base}/USDT.
                </p>
              </div>

              <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 self-start sm:self-auto">
                Depth Ladder
              </span>
            </div>

            {/* Liquidity Wall Visualizer Ladder */}
            <div className="space-y-4">
              
              {/* Resistance Ask Walls (Above Price) */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
                  <TrendingDown className="w-4 h-4" />
                  <span>Resistance Ask Walls (Sell Clusters Above Market)</span>
                </span>

                <div className="space-y-1.5">
                  {liquidityWalls
                    .filter((w) => w.side === "ASK_RESISTANCE")
                    .reverse()
                    .map((wall, idx) => {
                      const maxWall = 80000000;
                      const barWidth = Math.min(100, Math.max(15, Math.round((wall.totalUsd / maxWall) * 100)));
                      return (
                        <div
                          key={`ask-${idx}`}
                          className="p-3 rounded-2xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 relative overflow-hidden space-y-1"
                        >
                          {/* Background depth fill */}
                          <div
                            className="absolute top-0 bottom-0 left-0 bg-rose-500/15 dark:bg-rose-500/20 rounded-2xl transition-all duration-500"
                            style={{ width: `${barWidth}%` }}
                          />

                          <div className="relative z-10 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <strong className="font-mono font-black text-slate-900 dark:text-white">
                                ${wall.priceLevel >= 1 ? wall.priceLevel.toLocaleString() : wall.priceLevel.toFixed(4)}
                              </strong>
                              <span className="text-[10px] text-rose-600 dark:text-rose-400 font-mono font-bold">
                                +{wall.distancePercent}%
                              </span>
                            </div>

                            <div className="flex items-center gap-2 font-mono">
                              <span className="font-black text-rose-700 dark:text-rose-400">
                                {formatUsd(wall.totalUsd)}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                ({wall.totalQuantity.toLocaleString()} {activeCoin.base})
                              </span>
                            </div>
                          </div>

                          <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
                            <span>{wall.clusterNote}</span>
                            <span className="font-mono font-bold">{wall.ordersCount} resting blocks</span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* CURRENT SPOT PRICE DIVIDER */}
              {sentiment && (
                <div className="p-3.5 rounded-2xl bg-slate-950 text-white flex items-center justify-between border-2 border-amber-400 shadow-md">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-xs font-black uppercase tracking-wider text-amber-400">
                      CURRENT SPOT BENCHMARK
                    </span>
                  </div>
                  <div className="text-base sm:text-lg font-black font-mono text-white">
                    ${sentiment.currentPrice >= 1 ? sentiment.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2 }) : sentiment.currentPrice.toFixed(4)}
                  </div>
                </div>
              )}

              {/* Support Bid Walls (Below Price) */}
              <div className="space-y-2">
                <span className="text-xs font-black uppercase text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  <span>Support Bid Walls (Buy Clusters Below Market)</span>
                </span>

                <div className="space-y-1.5">
                  {liquidityWalls
                    .filter((w) => w.side === "BID_SUPPORT")
                    .map((wall, idx) => {
                      const maxWall = 80000000;
                      const barWidth = Math.min(100, Math.max(15, Math.round((wall.totalUsd / maxWall) * 100)));
                      return (
                        <div
                          key={`bid-${idx}`}
                          className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/40 relative overflow-hidden space-y-1"
                        >
                          {/* Background depth fill */}
                          <div
                            className="absolute top-0 bottom-0 left-0 bg-emerald-500/15 dark:bg-emerald-500/20 rounded-2xl transition-all duration-500"
                            style={{ width: `${barWidth}%` }}
                          />

                          <div className="relative z-10 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2">
                              <strong className="font-mono font-black text-slate-900 dark:text-white">
                                ${wall.priceLevel >= 1 ? wall.priceLevel.toLocaleString() : wall.priceLevel.toFixed(4)}
                              </strong>
                              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono font-bold">
                                -{wall.distancePercent}%
                              </span>
                            </div>

                            <div className="flex items-center gap-2 font-mono">
                              <span className="font-black text-emerald-700 dark:text-emerald-400">
                                {formatUsd(wall.totalUsd)}
                              </span>
                              <span className="text-[10px] text-slate-400">
                                ({wall.totalQuantity.toLocaleString()} {activeCoin.base})
                              </span>
                            </div>
                          </div>

                          <div className="relative z-10 flex items-center justify-between text-[10px] text-slate-500 dark:text-slate-400">
                            <span>{wall.clusterNote}</span>
                            <span className="font-mono font-bold">{wall.ordersCount} resting blocks</span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

            </div>

            {/* Heatmap Insights Box */}
            <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-indigo-950 dark:text-indigo-200">
                <Info className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>CoinGlass Liquidity Interpretation Guide:</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                Thick green bid clusters represent institutional accumulation magnets where automated market makers step in to absorb selloffs. High red ask walls indicate major resistance shelves where whales take profit or hedge basis positions.
              </p>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: REAL-TIME STREAMING WHALE TAPE & CONTROLS (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center font-black">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Whale Block Trade Tape
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Real-time executions &gt; $100K USD
                  </p>
                </div>
              </div>

              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                Active
              </span>
            </div>

            {/* Filter Pills */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 font-bold">
                <span>Minimum Order Size:</span>
                <span className="font-mono text-amber-600 dark:text-amber-400">{formatUsd(thresholdFilter)}+</span>
              </div>
              
              <div className="grid grid-cols-4 gap-1.5">
                {[100000, 500000, 1000000, 5000000].map((thr) => (
                  <button
                    key={thr}
                    onClick={() => setThresholdFilter(thr)}
                    className={`py-1.5 rounded-xl text-[11px] font-bold transition font-mono ${
                      thresholdFilter === thr
                        ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-sm font-black"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                    }`}
                  >
                    {thr >= 1e6 ? `$${thr / 1e6}M+` : `$${thr / 1e3}K+`}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-3 gap-1.5 pt-1">
                {(["ALL", "BUY", "SELL"] as const).map((side) => (
                  <button
                    key={side}
                    onClick={() => setSideFilter(side)}
                    className={`py-1.5 rounded-xl text-xs font-bold transition ${
                      sideFilter === side
                        ? side === "BUY"
                          ? "bg-emerald-500 text-white font-black"
                          : side === "SELL"
                          ? "bg-rose-500 text-white font-black"
                          : "bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    {side === "ALL" ? "All Sides" : side === "BUY" ? "🟢 Buy Whales" : "🔴 Sell Whales"}
                  </button>
                ))}
              </div>
            </div>

            {/* Streaming Whale Orders Feed */}
            <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
              {filteredOrders.map((order) => {
                const isBuy = order.side === "BUY";
                return (
                  <div
                    key={order.id}
                    className={`p-3.5 rounded-2xl border transition-all space-y-2 ${
                      isBuy
                        ? "bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/80 dark:border-emerald-900/50"
                        : "bg-rose-50/50 dark:bg-rose-950/20 border-rose-200/80 dark:border-rose-900/50"
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-2 py-0.5 rounded-md font-mono text-[10px] font-black ${
                            isBuy ? "bg-emerald-500 text-white" : "bg-rose-500 text-white"
                          }`}
                        >
                          {order.side}
                        </span>
                        <span className="font-mono font-black text-slate-900 dark:text-white text-sm">
                          {formatUsd(order.usdValue)}
                        </span>
                      </div>

                      <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {order.timeFormatted}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-mono text-slate-600 dark:text-slate-300">
                      <span>Price: <strong className="text-slate-900 dark:text-white">${order.price >= 1 ? order.price.toLocaleString() : order.price.toFixed(4)}</strong></span>
                      <span>Qty: <strong className="text-slate-900 dark:text-white">{order.quantity.toLocaleString()} {order.base}</strong></span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60">
                      <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                        <span>{order.exchange}</span>
                        <span>•</span>
                        <span className="text-indigo-600 dark:text-indigo-400 font-medium">{order.orderType}</span>
                      </div>

                      <button
                        onClick={() => handleCopyTrade(order)}
                        className="text-slate-400 hover:text-slate-700 dark:hover:text-white flex items-center gap-1 font-mono transition"
                        title="Copy trade details"
                      >
                        {copiedTrade === order.id ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedTrade === order.id ? "Copied" : "Copy"}</span>
                      </button>
                    </div>
                  </div>
                );
              })}

              {filteredOrders.length === 0 && (
                <div className="p-8 text-center text-xs text-slate-500 font-mono">
                  No whale orders matching the active filter criteria. Try lowering the threshold filter.
                </div>
              )}
            </div>

          </div>

        </div>

      </div>

      {/* 4. COMPREHENSIVE IN-DEPTH PLAIN-ENGLISH EDUCATIONAL GUIDE (COINGLASS MASTERCLASS) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
        
        <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-2 mb-1">
            <div className="w-9 h-9 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                CoinGlass Whale Order Masterclass: How to Trade with Institutional Whales
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                A complete, plain-English educational handbook on understanding whale blocks, iceberg algorithms, and liquidity manipulation.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
          
          {/* Module 1 */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">1</span>
              <span>What are Whale Orders &amp; Dark Pool Blocks?</span>
            </h3>
            <p className="text-[11px] leading-relaxed">
              Whales are institutional entities, hedge funds, sovereign wealth funds, and early miners holding thousands of Bitcoin or tens of millions of dollars in capital. Because their orders are so massive, they cannot simply click &quot;Buy Market&quot; without causing immense slippage. Instead, they use <strong>Iceberg Algorithms</strong> and <strong>TWAP (Time-Weighted Average Price)</strong> executions to break single $20M+ trades into hundreds of smaller slices across Binance, Coinbase Prime, and CME.
            </p>
          </div>

          {/* Module 2 */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">2</span>
              <span>How to Read Whale Limit Walls &amp; Heatmaps</span>
            </h3>
            <p className="text-[11px] leading-relaxed">
              When you look at our Whale Liquidity Heatmap, thick green clusters represent <strong>Resting Bid Walls</strong>. When price drops into a heavy bid wall, market makers absorb the selling, creating a bounce floor. Conversely, thick red ask clusters above price show where whales intend to distribute or lock in profit, creating natural resistance ceilings.
            </p>
          </div>

          {/* Module 3 */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">3</span>
              <span>Whale Accumulation vs Distribution (Wyckoff Rules)</span>
            </h3>
            <p className="text-[11px] leading-relaxed">
              During <strong>Accumulation</strong>, whales suppress the price within a tight range, silently buying all retail panic sales without triggering a price spike. Once retail traders give up and sell, the whale triggers an aggressive sweep breakout. During <strong>Distribution</strong>, whales create bullish hype on social media while quietly executing multi-million dollar sell limits into the incoming retail buyers.
            </p>
          </div>

          {/* Module 4 */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xs">4</span>
              <span>How Retail Traders Can Trade Alongside Whales</span>
            </h3>
            <p className="text-[11px] leading-relaxed">
              Smart retail traders never trade against whale order flow. Instead:
              <br />• <strong>Entry Strategy:</strong> Place limit bids right in front of major whale resting support walls.
              <br />• <strong>Stop-Loss Defense:</strong> Place structural stop-losses safely behind the whale liquidity floor.
              <br />• <strong>Take-Profit Target:</strong> Exit 50% of your position right before the first major whale ask resistance wall.
            </p>
          </div>

        </div>

        {/* Outbound Primary Terminal Links */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <ShieldAlert className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Institutional market data aggregated across global spot, derivatives, and on-chain whale clusters.</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://www.coinglass.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition flex items-center gap-1.5 shadow-sm"
            >
              <span>CoinGlass Terminal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://mempool.space"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black transition flex items-center gap-1.5 shadow-sm"
            >
              <span>Mempool Whale Blocks</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
