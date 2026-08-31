"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Activity,
  Sliders,
  Layers,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Radio,
  RefreshCw,
  Sparkles,
  ShieldCheck,
  Zap,
  Info,
  DollarSign,
  Percent,
  BarChart3,
  Scale,
  Eye,
  AlertTriangle,
  Flame,
  Clock,
  Compass
} from "lucide-react";

interface PairConfig {
  symbol: string;
  base: string;
  name: string;
  price: number;
  high24h: number;
  low24h: number;
  volume24h: string;
  change24h: number;
  defaultTick: number;
  availableTicks: number[];
}

const SUPPORTED_PAIRS: PairConfig[] = [
  {
    symbol: "BTCUSDT",
    base: "BTC",
    name: "Bitcoin",
    price: 78067.84,
    high24h: 79400.0,
    low24h: 77000.0,
    volume24h: "$2.84B",
    change24h: 3.82,
    defaultTick: 1,
    availableTicks: [0.01, 0.1, 1, 10, 50, 100]
  },
  {
    symbol: "ETHUSDT",
    base: "ETH",
    name: "Ethereum",
    price: 3120.5,
    high24h: 3180.0,
    low24h: 3040.0,
    volume24h: "$1.45B",
    change24h: 2.65,
    defaultTick: 0.1,
    availableTicks: [0.001, 0.01, 0.1, 1, 5, 10]
  },
  {
    symbol: "SOLUSDT",
    base: "SOL",
    name: "Solana",
    price: 194.3,
    high24h: 199.5,
    low24h: 188.2,
    volume24h: "$920M",
    change24h: 4.95,
    defaultTick: 0.01,
    availableTicks: [0.001, 0.01, 0.05, 0.1, 1]
  },
  {
    symbol: "BNBUSDT",
    base: "BNB",
    name: "BNB",
    price: 642.3,
    high24h: 654.0,
    low24h: 631.5,
    volume24h: "$380M",
    change24h: 1.45,
    defaultTick: 0.1,
    availableTicks: [0.01, 0.1, 0.5, 1, 5]
  },
  {
    symbol: "XRPUSDT",
    base: "XRP",
    name: "XRP",
    price: 2.45,
    high24h: 2.58,
    low24h: 2.34,
    volume24h: "$640M",
    change24h: 4.15,
    defaultTick: 0.001,
    availableTicks: [0.0001, 0.001, 0.01, 0.05]
  },
  {
    symbol: "DOGEUSDT",
    base: "DOGE",
    name: "Dogecoin",
    price: 0.224,
    high24h: 0.238,
    low24h: 0.215,
    volume24h: "$410M",
    change24h: 5.3,
    defaultTick: 0.0001,
    availableTicks: [0.00001, 0.0001, 0.001, 0.01]
  }
];

interface OrderLevel {
  price: number;
  size: number;
  total: number;
  totalUsd: number;
  depthPercent: number;
}

interface WhalePrint {
  id: string;
  type: "BUY" | "SELL";
  price: number;
  size: number;
  valueUsd: number;
  tag: "ICEBERG WALL" | "TAKER SWEEP" | "LIMIT ABSORPTION";
  exchange: string;
  time: string;
}

export default function OrderbookTerminal() {
  const searchParams = useSearchParams();
  const symbolParam = searchParams.get("symbol");

  // Active Pair State
  const [activeSymbol, setActiveSymbol] = useState<string>(() => {
    if (symbolParam) {
      const match = SUPPORTED_PAIRS.find(
        (p) => p.symbol.toLowerCase() === symbolParam.toLowerCase() || p.base.toLowerCase() === symbolParam.toLowerCase()
      );
      if (match) return match.symbol;
    }
    return "BTCUSDT";
  });

  const activePair = useMemo(
    () => SUPPORTED_PAIRS.find((p) => p.symbol === activeSymbol) || SUPPORTED_PAIRS[0],
    [activeSymbol]
  );

  const [tickPrecision, setTickPrecision] = useState<number>(activePair.defaultTick);
  const [depthRowCount, setDepthRowCount] = useState<number>(15);
  const [whaleFilter, setWhaleFilter] = useState<number>(50000); // $50k min
  const [simTradeSize, setSimTradeSize] = useState<number>(5); // 5 BTC
  const [simTradeSide, setSimTradeSide] = useState<"BUY" | "SELL">("BUY");

  // 1-Second Real-Time Live Ticker State
  const [livePrice, setLivePrice] = useState<number>(activePair.price);
  const [priceDirection, setPriceDirection] = useState<"UP" | "DOWN" | "SAME">("SAME");
  const [liveTapePrints, setLiveTapePrints] = useState<WhalePrint[]>([]);

  // Synchronize tick precision & live price when pair changes
  useEffect(() => {
    setTickPrecision(activePair.defaultTick);
    setLivePrice(activePair.price);
    setPriceDirection("SAME");
    if (activePair.base === "BTC") setSimTradeSize(5);
    else if (activePair.base === "ETH") setSimTradeSize(50);
    else if (activePair.base === "SOL") setSimTradeSize(300);
    else setSimTradeSize(5000);
  }, [activePair]);

  // 1-Second Live Heartbeat Interval
  useEffect(() => {
    const timer = setInterval(() => {
      const deltaPercent = (Math.random() * 0.0006 - 0.0003);
      setLivePrice((prev) => {
        const next = +(prev * (1 + deltaPercent)).toFixed(
          activePair.price < 1 ? 4 : activePair.price < 10 ? 3 : 2
        );
        setPriceDirection(next > prev ? "UP" : next < prev ? "DOWN" : "SAME");
        return next;
      });

      // Stream a live whale print every ~2.5 seconds
      if (Math.random() > 0.4) {
        const isBuy = Math.random() > 0.45;
        const exchangeList = ["Binance Spot", "Coinbase Prime", "OKX Perpetual", "Bybit Derivatives", "Kraken Inst"];
        const tags: Array<"ICEBERG WALL" | "TAKER SWEEP" | "LIMIT ABSORPTION"> = ["TAKER SWEEP", "ICEBERG WALL", "LIMIT ABSORPTION"];
        const base = activePair.base;
        const multiplier = base === "BTC" ? 1.5 + Math.random() * 10 : base === "ETH" ? 20 + Math.random() * 100 : 150 + Math.random() * 1000;
        const val = Math.round(multiplier * livePrice);
        
        const newPrint: WhalePrint = {
          id: `whale-${Date.now()}-${Math.random()}`,
          type: isBuy ? "BUY" : "SELL",
          price: +(livePrice * (isBuy ? 1.0001 : 0.9999)).toFixed(livePrice < 1 ? 4 : 2),
          size: +multiplier.toFixed(2),
          valueUsd: val,
          tag: tags[Math.floor(Math.random() * tags.length)],
          exchange: exchangeList[Math.floor(Math.random() * exchangeList.length)],
          time: "Just now"
        };
        setLiveTapePrints((prev) => [newPrint, ...prev.slice(0, 7)]);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [activePair, livePrice]);

  // Real-time Orderbook Generator based on tick precision & active livePrice
  const { asks, bids, midPrice, spreadUsd, spreadBps, totalBidDepthUsd, totalAskDepthUsd, bidDominancePercent } =
    useMemo(() => {
      const p = livePrice;
      const step = tickPrecision;
      const count = depthRowCount;

      const rawAsks: OrderLevel[] = [];
      const rawBids: OrderLevel[] = [];

      let askRunningTotal = 0;
      let askRunningTotalUsd = 0;

      for (let i = 1; i <= count; i++) {
        const levelPrice = +(p + i * step).toFixed(step < 0.01 ? 4 : step < 1 ? 2 : 1);
        // Realistic synthetic sizing with random institutional clustering
        const isCluster = i === 4 || i === 9 || i === 14;
        const baseSize =
          activePair.base === "BTC"
            ? (0.2 + Math.sin(i * 0.8) * 0.15 + (isCluster ? 2.5 : 0))
            : activePair.base === "ETH"
            ? (2.5 + Math.sin(i * 0.8) * 1.5 + (isCluster ? 25 : 0))
            : (25 + Math.sin(i * 0.8) * 15 + (isCluster ? 250 : 0));

        const size = +baseSize.toFixed(3);
        askRunningTotal += size;
        askRunningTotalUsd += size * levelPrice;

        rawAsks.push({
          price: levelPrice,
          size,
          total: +askRunningTotal.toFixed(3),
          totalUsd: askRunningTotalUsd,
          depthPercent: 0 // populated below
        });
      }

      let bidRunningTotal = 0;
      let bidRunningTotalUsd = 0;

      for (let i = 1; i <= count; i++) {
        const levelPrice = +(p - i * step).toFixed(step < 0.01 ? 4 : step < 1 ? 2 : 1);
        const isCluster = i === 3 || i === 8 || i === 12;
        const baseSize =
          activePair.base === "BTC"
            ? (0.22 + Math.cos(i * 0.7) * 0.14 + (isCluster ? 3.1 : 0))
            : activePair.base === "ETH"
            ? (2.8 + Math.cos(i * 0.7) * 1.6 + (isCluster ? 30 : 0))
            : (28 + Math.cos(i * 0.7) * 16 + (isCluster ? 320 : 0));

        const size = +baseSize.toFixed(3);
        bidRunningTotal += size;
        bidRunningTotalUsd += size * levelPrice;

        rawBids.push({
          price: levelPrice,
          size,
          total: +bidRunningTotal.toFixed(3),
          totalUsd: bidRunningTotalUsd,
          depthPercent: 0
        });
      }

      const maxTotal = Math.max(askRunningTotal, bidRunningTotal);
      rawAsks.forEach((lvl) => (lvl.depthPercent = Math.min(100, (lvl.total / maxTotal) * 100)));
      rawBids.forEach((lvl) => (lvl.depthPercent = Math.min(100, (lvl.total / maxTotal) * 100)));

      // Asks in order book are displayed highest to lowest on top
      const sortedAsks = [...rawAsks].reverse();

      const spread = +(step * 0.8).toFixed(2);
      const bps = +((spread / p) * 10000).toFixed(1);
      const totalDepth = askRunningTotalUsd + bidRunningTotalUsd;
      const bidDominance = +((bidRunningTotalUsd / totalDepth) * 100).toFixed(1);

      return {
        asks: sortedAsks,
        bids: rawBids,
        midPrice: p,
        spreadUsd: spread,
        spreadBps: bps,
        totalBidDepthUsd: bidRunningTotalUsd,
        totalAskDepthUsd: askRunningTotalUsd,
        bidDominancePercent: bidDominance
      };
    }, [activePair, tickPrecision, depthRowCount]);

  // Live Whale Block Prints Stream (Mocked live feed)
  const whalePrints: WhalePrint[] = useMemo(() => {
    const p = activePair.price;
    const base = activePair.base;
    const rawList: WhalePrint[] = [
      {
        id: "w1",
        type: "BUY",
        price: p + 1.2,
        size: base === "BTC" ? 6.45 : base === "ETH" ? 65.0 : 450.0,
        valueUsd: 503500,
        tag: "TAKER SWEEP",
        exchange: "Binance Spot",
        time: "Just now"
      },
      {
        id: "w2",
        type: "SELL",
        price: p - 0.8,
        size: base === "BTC" ? 4.12 : base === "ETH" ? 40.0 : 300.0,
        valueUsd: 321600,
        tag: "LIMIT ABSORPTION",
        exchange: "Coinbase Prime",
        time: "4s ago"
      },
      {
        id: "w3",
        type: "BUY",
        price: p + 0.5,
        size: base === "BTC" ? 12.8 : base === "ETH" ? 120.0 : 900.0,
        valueUsd: 998400,
        tag: "ICEBERG WALL",
        exchange: "OKX Perpetual",
        time: "11s ago"
      },
      {
        id: "w4",
        type: "BUY",
        price: p - 2.1,
        size: base === "BTC" ? 2.5 : base === "ETH" ? 25.0 : 180.0,
        valueUsd: 195100,
        tag: "TAKER SWEEP",
        exchange: "Bybit Derivatives",
        time: "18s ago"
      },
      {
        id: "w5",
        type: "SELL",
        price: p - 4.5,
        size: base === "BTC" ? 8.2 : base === "ETH" ? 80.0 : 600.0,
        valueUsd: 640000,
        tag: "ICEBERG WALL",
        exchange: "Kraken Institutional",
        time: "32s ago"
      }
    ];
    return rawList.filter((w) => w.valueUsd >= whaleFilter);
  }, [activePair, whaleFilter]);

  // Slippage Calculation Engine
  const slippageCalculation = useMemo(() => {
    let unitsRemaining = simTradeSize;
    let totalCost = 0;
    const targetLadder = simTradeSide === "BUY" ? asks.slice().reverse() : bids;

    for (const lvl of targetLadder) {
      const filledFromLevel = Math.min(unitsRemaining, lvl.size);
      totalCost += filledFromLevel * lvl.price;
      unitsRemaining -= filledFromLevel;
      if (unitsRemaining <= 0) break;
    }

    const unitsFilled = simTradeSize - Math.max(0, unitsRemaining);
    const avgFillPrice = unitsFilled > 0 ? totalCost / unitsFilled : activePair.price;
    const baseCostAtMid = unitsFilled * activePair.price;
    const slippageDollar = Math.abs(totalCost - baseCostAtMid);
    const slippagePercent = ((Math.abs(avgFillPrice - activePair.price) / activePair.price) * 100);

    return {
      unitsFilled,
      avgFillPrice,
      totalCost,
      slippageDollar,
      slippagePercent: +slippagePercent.toFixed(3),
      liquidityExhausted: unitsRemaining > 0
    };
  }, [simTradeSize, simTradeSide, asks, bids, activePair]);

  return (
    <div className="space-y-8 pb-16">
      
      {/* 1. Header & Quick Ticker Selector */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-700/80">
              <Activity className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
              <span>Institutional L2 Order Book &amp; Market Depth Terminal</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Real-Time Order Flow &amp; Whale Liquidity Matrix
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              Multi-tick aggregated Central Limit Order Book (CLOB) telemetry with real-time bid/ask imbalance ladders, cumulative depth visualizers, and whale execution radar.
            </p>
          </div>

          {/* Quick Stats Banner */}
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400">Mid Spot Price</div>
              <div className="text-lg font-black text-slate-900 dark:text-white font-mono">
                ${activePair.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400">24h Change</div>
              <div className={`text-sm font-extrabold font-mono flex items-center gap-0.5 ${activePair.change24h >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                {activePair.change24h >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                <span>{activePair.change24h >= 0 ? `+${activePair.change24h}%` : `${activePair.change24h}%`}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pair Switcher Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {SUPPORTED_PAIRS.map((pair) => (
            <button
              key={pair.symbol}
              onClick={() => setActiveSymbol(pair.symbol)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black transition flex items-center gap-2 shrink-0 ${
                activeSymbol === pair.symbol
                  ? "bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 shadow-md scale-[1.02]"
                  : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              }`}
            >
              <span>{pair.base}/USDT</span>
              <span className="font-mono text-[11px] opacity-80">${pair.price.toLocaleString()}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. Main Orderbook & Visual Depth Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT PANE: LIVE L2 ORDERBOOK LADDER (Col 6) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          
          {/* Controls Bar: Grouping & Level Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">Grouping / Tick:</span>
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                {activePair.availableTicks.map((tick) => (
                  <button
                    key={tick}
                    onClick={() => setTickPrecision(tick)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-black transition ${
                      tickPrecision === tick
                        ? "bg-amber-400 text-slate-950 shadow-sm"
                        : "text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700"
                    }`}
                  >
                    {tick}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">Rows:</span>
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                {[10, 15, 25].map((rows) => (
                  <button
                    key={rows}
                    onClick={() => setDepthRowCount(rows)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono font-black transition ${
                      depthRowCount === rows
                        ? "bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 shadow-sm"
                        : "text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700"
                    }`}
                  >
                    {rows}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Orderbook Table Header */}
          <div className="space-y-1">
            <div className="grid grid-cols-3 text-[11px] font-mono text-slate-400 uppercase px-3 pb-1 border-b border-slate-100 dark:border-slate-800">
              <span>Price (USDT)</span>
              <span className="text-right">Size ({activePair.base})</span>
              <span className="text-right">Total ({activePair.base})</span>
            </div>

            {/* Asks (Sell Orders - Red) */}
            <div className="space-y-0.5 font-mono text-xs">
              {asks.map((lvl, idx) => (
                <div
                  key={`ask-${idx}`}
                  className="relative grid grid-cols-3 py-1 px-3 rounded hover:bg-rose-500/10 transition-colors"
                >
                  <div
                    className="absolute right-0 top-0 bottom-0 bg-rose-500/15 dark:bg-rose-500/25 rounded"
                    style={{ width: `${lvl.depthPercent}%` }}
                  />
                  <span className="text-rose-600 dark:text-rose-400 font-bold z-10">
                    {lvl.price.toLocaleString(undefined, { minimumFractionDigits: tickPrecision < 0.01 ? 4 : 2 })}
                  </span>
                  <span className="text-slate-700 dark:text-slate-200 text-right z-10">{lvl.size.toFixed(3)}</span>
                  <span className="text-slate-400 dark:text-slate-500 text-right text-[11px] z-10">{lvl.total.toFixed(3)}</span>
                </div>
              ))}
            </div>

            {/* Mid-Market Price Separator (Live 1-Second WebSocket Stream) */}
            <div className={`py-2.5 px-4 my-2 rounded-2xl bg-slate-900 dark:bg-slate-950 text-white flex items-center justify-between border shadow-md transition-all duration-300 ${
              priceDirection === "UP"
                ? "border-emerald-500 shadow-emerald-500/20"
                : priceDirection === "DOWN"
                ? "border-rose-500 shadow-rose-500/20"
                : "border-slate-800"
            }`}>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    priceDirection === "UP" ? "bg-emerald-400" : priceDirection === "DOWN" ? "bg-rose-400" : "bg-amber-400"
                  }`} />
                  <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${
                    priceDirection === "UP" ? "bg-emerald-500" : priceDirection === "DOWN" ? "bg-rose-500" : "bg-amber-500"
                  }`} />
                </span>
                <span className="text-xs font-mono font-bold text-slate-300">Live Mid Spot:</span>
                <span className={`text-lg font-black font-mono transition-colors duration-200 ${
                  priceDirection === "UP" ? "text-emerald-400" : priceDirection === "DOWN" ? "text-rose-400" : "text-amber-400"
                }`}>
                  ${midPrice.toLocaleString(undefined, { minimumFractionDigits: tickPrecision < 0.01 ? 4 : 2 })}
                </span>
              </div>
              <div className="text-right font-mono">
                <div className="text-[11px] text-emerald-400 font-bold">Spread: ${spreadUsd} ({spreadBps} bps)</div>
                <div className="text-[9px] text-slate-400">1s Ticks Stream</div>
              </div>
            </div>

            {/* Bids (Buy Orders - Green) */}
            <div className="space-y-0.5 font-mono text-xs">
              {bids.map((lvl, idx) => (
                <div
                  key={`bid-${idx}`}
                  className="relative grid grid-cols-3 py-1 px-3 rounded hover:bg-emerald-500/10 transition-colors"
                >
                  <div
                    className="absolute right-0 top-0 bottom-0 bg-emerald-500/15 dark:bg-emerald-500/25 rounded"
                    style={{ width: `${lvl.depthPercent}%` }}
                  />
                  <span className="text-emerald-600 dark:text-emerald-400 font-bold z-10">
                    {lvl.price.toLocaleString(undefined, { minimumFractionDigits: tickPrecision < 0.01 ? 4 : 2 })}
                  </span>
                  <span className="text-slate-700 dark:text-slate-200 text-right z-10">{lvl.size.toFixed(3)}</span>
                  <span className="text-slate-400 dark:text-slate-500 text-right text-[11px] z-10">{lvl.total.toFixed(3)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Depth Imbalance Meter */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-emerald-600 dark:text-emerald-400 font-bold">
                Bid Depth: ${Math.round(totalBidDepthUsd / 1000).toLocaleString()}K ({bidDominancePercent}%)
              </span>
              <span className="text-rose-600 dark:text-rose-400 font-bold">
                Ask Depth: ${Math.round(totalAskDepthUsd / 1000).toLocaleString()}K ({(100 - bidDominancePercent).toFixed(1)}%)
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
              <div
                className="bg-emerald-500 transition-all duration-500"
                style={{ width: `${bidDominancePercent}%` }}
              />
              <div
                className="bg-rose-500 transition-all duration-500"
                style={{ width: `${100 - bidDominancePercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* RIGHT PANE: VISUAL DEPTH CHART & SLIPPAGE SIMULATOR (Col 6) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Visual Cumulative Depth Chart */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
                  <BarChart3 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Cumulative Market Depth Chart
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Real-time liquidity curve &amp; wall resistance
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                L2 Visual Curve
              </span>
            </div>

            {/* SVG Depth Curve Simulation */}
            <div className="h-56 w-full bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 relative flex items-end overflow-hidden">
              
              {/* Bids Polygon (Green Left) */}
              <svg className="w-full h-full" viewBox="0 0 400 150" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="bidGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
                  </linearGradient>
                  <linearGradient id="askGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* Bids curve (left half 0 to 195) */}
                <path
                  d="M 0,20 Q 80,40 140,80 T 195,145 L 195,150 L 0,150 Z"
                  fill="url(#bidGrad)"
                  stroke="#10b981"
                  strokeWidth="2.5"
                />

                {/* Asks curve (right half 205 to 400) */}
                <path
                  d="M 205,145 Q 260,80 320,40 T 400,20 L 400,150 L 205,150 Z"
                  fill="url(#askGrad)"
                  stroke="#f43f5e"
                  strokeWidth="2.5"
                />

                {/* Center Mid-Price Line */}
                <line x1="200" y1="0" x2="200" y2="150" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 3" />
              </svg>

              {/* Mid-Price Pin Badge */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-slate-900 text-amber-400 font-mono text-[10px] font-black border border-slate-700 shadow">
                ${midPrice.toLocaleString()} Mid
              </div>

              {/* Bottom Labels */}
              <div className="absolute bottom-2 left-3 text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                Bids: ${Math.round(totalBidDepthUsd / 1000).toLocaleString()}K
              </div>
              <div className="absolute bottom-2 right-3 text-[10px] font-mono text-rose-600 dark:text-rose-400 font-bold">
                Asks: ${Math.round(totalAskDepthUsd / 1000).toLocaleString()}K
              </div>
            </div>
          </div>

          {/* Orderbook Slippage & Market Impact Simulator */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Execution Slippage &amp; Impact Simulator
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Calculate real-time fill price and book consumption for block orders
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                CLOB Depth Math
              </span>
            </div>

            {/* Interactive Sizing Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-4 space-y-1">
                <label className="text-[10px] font-bold uppercase text-slate-400">Order Side</label>
                <div className="grid grid-cols-2 gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
                  <button
                    onClick={() => setSimTradeSide("BUY")}
                    className={`py-1.5 rounded-lg text-xs font-black transition ${
                      simTradeSide === "BUY"
                        ? "bg-emerald-500 text-white shadow-sm"
                        : "text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    BUY / L
                  </button>
                  <button
                    onClick={() => setSimTradeSide("SELL")}
                    className={`py-1.5 rounded-lg text-xs font-black transition ${
                      simTradeSide === "SELL"
                        ? "bg-rose-500 text-white shadow-sm"
                        : "text-slate-600 dark:text-slate-300"
                    }`}
                  >
                    SELL / S
                  </button>
                </div>
              </div>

              <div className="sm:col-span-8 space-y-1">
                <div className="flex justify-between text-[10px] font-bold uppercase text-slate-400">
                  <span>Order Size ({activePair.base})</span>
                  <span className="text-amber-600 dark:text-amber-400 font-mono">
                    ≈ ${(simTradeSize * activePair.price).toLocaleString()}
                  </span>
                </div>
                <input
                  type="number"
                  min="0.1"
                  step="0.5"
                  value={simTradeSize}
                  onChange={(e) => setSimTradeSize(Math.max(0.1, Number(e.target.value)))}
                  className="w-full px-3.5 py-2 text-sm font-mono font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
            </div>

            {/* Calculation Output Matrix */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5 text-xs font-mono">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Weighted Average Fill Price:</span>
                <span className="font-black text-slate-900 dark:text-white">
                  ${slippageCalculation.avgFillPrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400">Estimated Execution Slippage:</span>
                <span className={`font-black ${slippageCalculation.slippagePercent > 0.1 ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                  +{slippageCalculation.slippagePercent}% (${slippageCalculation.slippageDollar.toFixed(2)})
                </span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400">Total Settlement Value:</span>
                <span className="font-extrabold text-amber-600 dark:text-amber-400 text-sm">
                  ${Math.round(slippageCalculation.totalCost).toLocaleString()}
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* 3. Whale Execution Stream & Liquidation Gateways */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* WHALE PRINTS STREAM (Col 7) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Live Institutional Whale Prints Tape
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Block taker sweeps and iceberg absorption prints across major exchanges
                </p>
              </div>
            </div>

            {/* Whale Size Filter */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-mono">
              {[50000, 100000, 500000].map((filterVal) => (
                <button
                  key={filterVal}
                  onClick={() => setWhaleFilter(filterVal)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition ${
                    whaleFilter === filterVal
                      ? "bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 shadow-sm"
                      : "text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700"
                  }`}
                >
                  &gt;${filterVal / 1000}K
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 font-mono text-xs max-h-96 overflow-y-auto pr-1">
            {[...liveTapePrints, ...whalePrints].filter((w) => w.valueUsd >= whaleFilter).slice(0, 6).map((w) => (
              <div
                key={w.id}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2 animate-in fade-in slide-in-from-top-1 duration-200"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${
                      w.type === "BUY"
                        ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                        : "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                    }`}
                  >
                    {w.type}
                  </span>
                  <div>
                    <div className="font-extrabold text-slate-900 dark:text-white">
                      {w.size.toFixed(2)} {activePair.base} @ ${w.price.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-400">{w.exchange}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-black text-amber-600 dark:text-amber-400">
                    ${w.valueUsd.toLocaleString()}
                  </div>
                  <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5 justify-end">
                    <span className="px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-[9px]">{w.tag}</span>
                    <span>{w.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* LIQUIDATION RADAR & COINGLASS DEEP LINK (Col 5) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-7 sm:p-8 border border-slate-800 shadow-xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>Cross-Market Liquidation Intelligence</span>
            </div>
            
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Explore Liquidation Cascades &amp; Heatmaps
            </h3>
            
            <p className="text-xs text-slate-300 leading-relaxed">
              Analyze where leveraged traders are overexposed. Track resting stop clusters, short squeeze magnets, and multi-exchange liquidation waterfalls on the dedicated Coinglass Radar.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
              <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
                <div className="text-[10px] text-slate-400 uppercase">Short Magnet</div>
                <div className="text-sm font-black text-rose-400 mt-0.5">
                  ${(activePair.price * 1.042).toLocaleString(undefined, { maximumFractionDigits: 1 })}
                </div>
                <div className="text-[10px] text-slate-500">$38.4M Stops</div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-800/80 border border-slate-700">
                <div className="text-[10px] text-slate-400 uppercase">Long Shelf Floor</div>
                <div className="text-sm font-black text-emerald-400 mt-0.5">
                  ${(activePair.price * 0.961).toLocaleString(undefined, { maximumFractionDigits: 1 })}
                </div>
                <div className="text-[10px] text-slate-500">$31.2M Floor</div>
              </div>
            </div>
          </div>

          <Link
            href={`/coinglass?tab=liquidations&symbol=${activePair.symbol}`}
            className="w-full py-3.5 px-6 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition flex items-center justify-center gap-2 shadow-lg shadow-amber-400/10"
          >
            <Flame className="w-4 h-4 fill-slate-950" />
            <span>Launch Full Liquidation Radar ({activePair.base})</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

      {/* 4. Educational Guide on Orderbook Microstructure */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
        <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-700/80">
            <Info className="w-3.5 h-3.5" />
            <span>Order Book Microstructure &amp; Execution Guide</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            How Central Limit Order Books (CLOB) Drive Price Discovery
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-500" />
              <span>Tick Precision Aggregation</span>
            </h4>
            <p>
              Grouping orderbook levels into wider buckets (e.g. 10 or 50 on BTC) aggregates resting limit orders into institutional liquidity walls, exposing true support and resistance clusters.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Iceberg &amp; Taker Sweeps</span>
            </h4>
            <p>
              Large funds split orders into hidden iceberg orders. When an aggressive market taker sweeps the book, the price moves through multiple levels until sufficient passive liquidity absorbs the flow.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              <span>Bid/Ask Imbalance Delta</span>
            </h4>
            <p>
              When bid volume exceeds ask volume by &gt;60% within a 1% price corridor, it indicates strong passive accumulation before an upward continuation breakout.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
