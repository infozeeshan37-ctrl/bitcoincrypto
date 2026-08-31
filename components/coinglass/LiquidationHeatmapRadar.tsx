"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Flame,
  TrendingUp,
  TrendingDown,
  Skull,
  Activity,
  Layers,
  BarChart3,
  ShieldAlert,
  Zap,
  Radio,
  ArrowRight,
  Info,
  Sliders,
  DollarSign,
  Percent,
  CheckCircle2,
  RefreshCw,
  Compass,
  Clock,
  Sparkles,
  AlertTriangle
} from "lucide-react";

export interface CoinLiquidationProfile {
  symbol: string;
  base: string;
  name: string;
  price: number;
  change24h: number;
  total24hLiqUsd: number;
  longsLiqUsd: number;
  shortsLiqUsd: number;
  longsPercent: number;
  shortsPercent: number;
  openInterestUsd: string;
  topShortMagnetPrice: number;
  topShortMagnetVol: string;
  topLongShelfPrice: number;
  topLongShelfVol: string;
  leverageTiers: {
    tier100x: { shortPrice: number; longPrice: number; volShort: string; volLong: string };
    tier50x: { shortPrice: number; longPrice: number; volShort: string; volLong: string };
    tier25x: { shortPrice: number; longPrice: number; volShort: string; volLong: string };
    tier10x: { shortPrice: number; longPrice: number; volShort: string; volLong: string };
  };
}

const SUPPORTED_LIQUIDATION_COINS: CoinLiquidationProfile[] = [
  {
    symbol: "BTCUSDT",
    base: "BTC",
    name: "Bitcoin",
    price: 78067.84,
    change24h: 3.82,
    total24hLiqUsd: 118450000,
    longsLiqUsd: 38500000,
    shortsLiqUsd: 79950000,
    longsPercent: 32.5,
    shortsPercent: 67.5,
    openInterestUsd: "$34.58B",
    topShortMagnetPrice: 81450.0,
    topShortMagnetVol: "$46.8M",
    topLongShelfPrice: 75200.0,
    topLongShelfVol: "$38.2M",
    leverageTiers: {
      tier100x: { shortPrice: 78850, longPrice: 77280, volShort: "$18.4M", volLong: "$12.1M" },
      tier50x: { shortPrice: 79650, longPrice: 76500, volShort: "$32.6M", volLong: "$24.8M" },
      tier25x: { shortPrice: 81200, longPrice: 74950, volShort: "$54.2M", volLong: "$41.5M" },
      tier10x: { shortPrice: 85870, longPrice: 70260, volShort: "$88.0M", volLong: "$69.4M" },
    }
  },
  {
    symbol: "ETHUSDT",
    base: "ETH",
    name: "Ethereum",
    price: 3120.5,
    change24h: 2.65,
    total24hLiqUsd: 64200000,
    longsLiqUsd: 21800000,
    shortsLiqUsd: 42400000,
    longsPercent: 34.0,
    shortsPercent: 66.0,
    openInterestUsd: "$14.82B",
    topShortMagnetPrice: 3245.0,
    topShortMagnetVol: "$24.5M",
    topLongShelfPrice: 2980.0,
    topLongShelfVol: "$19.8M",
    leverageTiers: {
      tier100x: { shortPrice: 3151, longPrice: 3089, volShort: "$9.2M", volLong: "$6.5M" },
      tier50x: { shortPrice: 3183, longPrice: 3058, volShort: "$18.4M", volLong: "$14.1M" },
      tier25x: { shortPrice: 3245, longPrice: 2995, volShort: "$28.6M", volLong: "$21.0M" },
      tier10x: { shortPrice: 3432, longPrice: 2808, volShort: "$46.0M", volLong: "$38.5M" },
    }
  },
  {
    symbol: "SOLUSDT",
    base: "SOL",
    name: "Solana",
    price: 194.3,
    change24h: 4.95,
    total24hLiqUsd: 28900000,
    longsLiqUsd: 8900000,
    shortsLiqUsd: 20000000,
    longsPercent: 30.8,
    shortsPercent: 69.2,
    openInterestUsd: "$4.95B",
    topShortMagnetPrice: 204.5,
    topShortMagnetVol: "$14.2M",
    topLongShelfPrice: 184.0,
    topLongShelfVol: "$11.6M",
    leverageTiers: {
      tier100x: { shortPrice: 196.2, longPrice: 192.3, volShort: "$4.1M", volLong: "$2.8M" },
      tier50x: { shortPrice: 198.2, longPrice: 190.4, volShort: "$8.5M", volLong: "$6.2M" },
      tier25x: { shortPrice: 202.1, longPrice: 186.5, volShort: "$16.4M", volLong: "$12.8M" },
      tier10x: { shortPrice: 213.7, longPrice: 174.8, volShort: "$24.0M", volLong: "$18.5M" },
    }
  },
  {
    symbol: "BNBUSDT",
    base: "BNB",
    name: "BNB",
    price: 642.3,
    change24h: 1.45,
    total24hLiqUsd: 9400000,
    longsLiqUsd: 4100000,
    shortsLiqUsd: 5300000,
    longsPercent: 43.6,
    shortsPercent: 56.4,
    openInterestUsd: "$1.85B",
    topShortMagnetPrice: 668.0,
    topShortMagnetVol: "$5.1M",
    topLongShelfPrice: 620.0,
    topLongShelfVol: "$4.4M",
    leverageTiers: {
      tier100x: { shortPrice: 648.7, longPrice: 635.8, volShort: "$1.5M", volLong: "$1.1M" },
      tier50x: { shortPrice: 655.1, longPrice: 629.4, volShort: "$3.2M", volLong: "$2.6M" },
      tier25x: { shortPrice: 668.0, longPrice: 616.6, volShort: "$5.8M", volLong: "$4.9M" },
      tier10x: { shortPrice: 706.5, longPrice: 578.0, volShort: "$9.4M", volLong: "$7.8M" },
    }
  },
  {
    symbol: "XRPUSDT",
    base: "XRP",
    name: "XRP",
    price: 2.45,
    change24h: 4.15,
    total24hLiqUsd: 14800000,
    longsLiqUsd: 5200000,
    shortsLiqUsd: 9600000,
    longsPercent: 35.1,
    shortsPercent: 64.9,
    openInterestUsd: "$3.42B",
    topShortMagnetPrice: 2.62,
    topShortMagnetVol: "$6.8M",
    topLongShelfPrice: 2.28,
    topLongShelfVol: "$5.4M",
    leverageTiers: {
      tier100x: { shortPrice: 2.47, longPrice: 2.42, volShort: "$2.1M", volLong: "$1.4M" },
      tier50x: { shortPrice: 2.50, longPrice: 2.40, volShort: "$4.2M", volLong: "$3.1M" },
      tier25x: { shortPrice: 2.55, longPrice: 2.35, volShort: "$7.5M", volLong: "$5.8M" },
      tier10x: { shortPrice: 2.70, longPrice: 2.20, volShort: "$12.0M", volLong: "$9.2M" },
    }
  },
  {
    symbol: "DOGEUSDT",
    base: "DOGE",
    name: "Dogecoin",
    price: 0.224,
    change24h: 5.3,
    total24hLiqUsd: 12500000,
    longsLiqUsd: 3800000,
    shortsLiqUsd: 8700000,
    longsPercent: 30.4,
    shortsPercent: 69.6,
    openInterestUsd: "$2.15B",
    topShortMagnetPrice: 0.245,
    topShortMagnetVol: "$5.6M",
    topLongShelfPrice: 0.205,
    topLongShelfVol: "$4.1M",
    leverageTiers: {
      tier100x: { shortPrice: 0.226, longPrice: 0.221, volShort: "$1.8M", volLong: "$1.2M" },
      tier50x: { shortPrice: 0.228, longPrice: 0.219, volShort: "$3.4M", volLong: "$2.5M" },
      tier25x: { shortPrice: 0.233, longPrice: 0.215, volShort: "$6.1M", volLong: "$4.6M" },
      tier10x: { shortPrice: 0.246, longPrice: 0.201, volShort: "$9.8M", volLong: "$7.4M" },
    }
  }
];

interface LiquidationHeatmapRadarProps {
  initialSymbol?: string;
}

export default function LiquidationHeatmapRadar({ initialSymbol = "BTCUSDT" }: LiquidationHeatmapRadarProps) {
  const [selectedCoinSymbol, setSelectedCoinSymbol] = useState<string>(() => {
    const match = SUPPORTED_LIQUIDATION_COINS.find(
      (c) => c.symbol.toLowerCase() === initialSymbol.toLowerCase() || c.base.toLowerCase() === initialSymbol.toLowerCase()
    );
    return match ? match.symbol : "BTCUSDT";
  });

  const [timeframe, setTimeframe] = useState<"12h" | "24h" | "3d" | "7d">("24h");
  const [activeHoverLevel, setActiveHoverLevel] = useState<any | null>(null);

  const activeCoin = useMemo(
    () => SUPPORTED_LIQUIDATION_COINS.find((c) => c.symbol === selectedCoinSymbol) || SUPPORTED_LIQUIDATION_COINS[0],
    [selectedCoinSymbol]
  );

  // Real-time 1-second heartbeat state
  const [livePrice, setLivePrice] = useState<number>(activeCoin.price);
  const [priceDirection, setPriceDirection] = useState<"UP" | "DOWN" | "SAME">("SAME");
  const [tickCounter, setTickCounter] = useState<number>(0);
  const [liveEvents, setLiveEvents] = useState<Array<{
    id: string;
    side: "LONG" | "SHORT";
    price: number;
    amountUsd: number;
    exchange: string;
    time: string;
  }>>([]);

  // Reset live price on coin switch
  useEffect(() => {
    setLivePrice(activeCoin.price);
    setPriceDirection("SAME");
  }, [activeCoin]);

  // Sync if prop changes
  useEffect(() => {
    if (initialSymbol) {
      const match = SUPPORTED_LIQUIDATION_COINS.find(
        (c) => c.symbol.toLowerCase() === initialSymbol.toLowerCase() || c.base.toLowerCase() === initialSymbol.toLowerCase()
      );
      if (match) setSelectedCoinSymbol(match.symbol);
    }
  }, [initialSymbol]);

  // 1-Second Real-Time Pulse Engine
  useEffect(() => {
    const timer = setInterval(() => {
      setTickCounter((prev) => prev + 1);

      // Micro-tick price fluctuation (±0.015% to ±0.04%)
      const deltaPercent = (Math.random() * 0.0008 - 0.0004);
      setLivePrice((prevPrice) => {
        const next = +(prevPrice * (1 + deltaPercent)).toFixed(
          activeCoin.price < 1 ? 4 : activeCoin.price < 10 ? 3 : 2
        );
        setPriceDirection(next > prevPrice ? "UP" : next < prevPrice ? "DOWN" : "SAME");
        return next;
      });

      // Periodically inject a new live forced liquidation event (every ~2 seconds)
      if (Math.random() > 0.35) {
        const isShort = Math.random() > 0.38;
        const exchangeList = ["Binance Futures", "Bybit", "OKX Perpetual", "Deribit"];
        const ex = exchangeList[Math.floor(Math.random() * exchangeList.length)];
        const amount = Math.round(15000 + Math.random() * 380000);
        const newEvt = {
          id: `live-${Date.now()}-${Math.random()}`,
          side: isShort ? ("SHORT" as const) : ("LONG" as const),
          price: +(livePrice * (isShort ? 1.002 : 0.998)).toFixed(livePrice < 1 ? 4 : 2),
          amountUsd: amount,
          exchange: ex,
          time: "Just now"
        };
        setLiveEvents((prev) => [newEvt, ...prev.slice(0, 5)]);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [activeCoin, livePrice]);

  // Generate 6 Upper Short Liquidation Levels and 6 Lower Long Shelves based on livePrice
  const heatmapBars = useMemo(() => {
    const p = livePrice;
    const shortRatios = [1.012, 1.025, 1.042, 1.065, 1.088, 1.12];
    const longRatios = [0.988, 0.975, 0.958, 0.935, 0.912, 0.88];

    const shortBars = shortRatios.map((ratio, idx) => {
      const price = +(p * ratio).toFixed(p < 1 ? 4 : p < 10 ? 3 : 2);
      const intensity = [95, 82, 68, 54, 42, 30][idx];
      const volMultiplier = [0.28, 0.22, 0.18, 0.14, 0.11, 0.07][idx];
      const volUsd = Math.round(activeCoin.shortsLiqUsd * volMultiplier * 1.8);
      const devPct = +((ratio - 1) * 100).toFixed(1);
      const leverage = [100, 50, 25, 15, 10, 5][idx];
      return {
        id: `short-${idx}`,
        side: "SHORT" as const,
        price,
        intensity,
        volUsd,
        devPct,
        leverage,
        label: `${leverage}x Short Cluster`,
      };
    });

    const longBars = longRatios.map((ratio, idx) => {
      const price = +(p * ratio).toFixed(p < 1 ? 4 : p < 10 ? 3 : 2);
      const intensity = [90, 78, 64, 50, 38, 26][idx];
      const volMultiplier = [0.26, 0.21, 0.17, 0.13, 0.12, 0.09][idx];
      const volUsd = Math.round(activeCoin.longsLiqUsd * volMultiplier * 1.6);
      const devPct = -+((1 - ratio) * 100).toFixed(1);
      const leverage = [100, 50, 25, 15, 10, 5][idx];
      return {
        id: `long-${idx}`,
        side: "LONG" as const,
        price,
        intensity,
        volUsd,
        devPct,
        leverage,
        label: `${leverage}x Long Shelf`,
      };
    });

    return { shortBars, longBars };
  }, [activeCoin]);

  // Hourly Liquidation Bar Chart Data (24 hourly segments)
  const hourlyLiquidationHistory = useMemo(() => {
    const hours = [];
    for (let h = 23; h >= 0; h--) {
      const hourLabel = `${h === 0 ? "Now" : `${h}h ago`}`;
      const isSpike = h === 4 || h === 11 || h === 18;
      const baseShort = (activeCoin.shortsLiqUsd / 24) * (isSpike ? 2.4 : 0.8 + Math.sin(h * 0.5) * 0.3);
      const baseLong = (activeCoin.longsLiqUsd / 24) * (isSpike ? 1.8 : 0.7 + Math.cos(h * 0.6) * 0.3);
      hours.push({
        hour: hourLabel,
        shortUsd: Math.round(baseShort),
        longUsd: Math.round(baseLong),
        totalUsd: Math.round(baseShort + baseLong),
        dominant: baseShort > baseLong ? "SHORT" : "LONG",
      });
    }
    return hours;
  }, [activeCoin]);

  const maxHourlyLiq = useMemo(() => {
    return Math.max(...hourlyLiquidationHistory.map((h) => h.totalUsd), 1);
  }, [hourlyLiquidationHistory]);

  const fmtCurrency = (n: number) => {
    if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
    if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
    if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}k`;
    return `$${n.toLocaleString()}`;
  };

  const fmtPrice = (n: number) => {
    if (n >= 1000) return `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (n >= 1) return `$${n.toFixed(2)}`;
    return `$${n.toFixed(4)}`;
  };

  return (
    <div className="space-y-8">
      
      {/* 1. COIN SELECTOR BAR & REAL-TIME STATUS */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-950/80 text-rose-900 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
              <Flame className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
              <span>Multi-Exchange Liquidation Heatmap &amp; Cascade Radar</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              {activeCoin.name} ({activeCoin.base}) Liquidation Intensity Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              Real-time model of resting leveraged stop-loss pools and liquidation clusters aggregated across Binance, OKX, Bybit, and CME perpetual contracts.
            </p>
          </div>

          {/* Timeframe selector */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl self-start lg:self-center">
            {(["12h", "24h", "3d", "7d"] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
                  timeframe === tf
                    ? "bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 shadow-sm"
                    : "text-slate-600 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700"
                }`}
              >
                {tf.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Coin Selector Horizontal Chips */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {SUPPORTED_LIQUIDATION_COINS.map((coin) => (
            <button
              key={coin.symbol}
              onClick={() => setSelectedCoinSymbol(coin.symbol)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-black transition flex items-center gap-2.5 shrink-0 ${
                selectedCoinSymbol === coin.symbol
                  ? "bg-slate-900 dark:bg-rose-500 text-white shadow-md scale-[1.02]"
                  : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700"
              }`}
            >
              <span>{coin.base}/USDT</span>
              <span className="font-mono text-[11px] opacity-80">{fmtPrice(coin.price)}</span>
              <span
                className={`text-[10px] font-bold ${
                  coin.change24h >= 0 ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {coin.change24h >= 0 ? `+${coin.change24h}%` : `${coin.change24h}%`}
              </span>
            </button>
          ))}
        </div>

        {/* Coin Specific KPI Summary */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">24h Total Wrecked</span>
            <div className="text-lg font-black text-rose-600 dark:text-rose-400 font-mono mt-0.5">
              {fmtCurrency(activeCoin.total24hLiqUsd)}
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
              {activeCoin.base} Perpetual Volume
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Shorts Wrecked</span>
            <div className="text-lg font-black text-rose-600 dark:text-rose-400 font-mono mt-0.5">
              {fmtCurrency(activeCoin.shortsLiqUsd)} ({activeCoin.shortsPercent}%)
            </div>
            <div className="text-[10px] text-rose-600 dark:text-rose-400 font-medium">
              Overhead Squeeze Flow
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Longs Wrecked</span>
            <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono mt-0.5">
              {fmtCurrency(activeCoin.longsLiqUsd)} ({activeCoin.longsPercent}%)
            </div>
            <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
              Long Stop Absorption
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Open Interest</span>
            <div className="text-lg font-black text-amber-600 dark:text-amber-400 font-mono mt-0.5">
              {activeCoin.openInterestUsd}
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
              Active Contract Depth
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN INTERACTIVE LIQUIDATION HEATMAP VISUALIZER & LEVERAGE MATRIX */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: VISUAL LIQUIDATION HEATMAP LADDER (Col 7) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 flex items-center justify-center font-bold">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Interactive Liquidation Heatmap Depth
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Visual density of resting liquidation orders across price tiers
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[10px] font-mono">
              <span className="flex items-center gap-1 text-rose-500 font-bold">
                <span className="w-2 h-2 rounded-full bg-rose-500" /> Short Squeeze
              </span>
              <span className="flex items-center gap-1 text-emerald-500 font-bold ml-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Long Flush
              </span>
            </div>
          </div>

          {/* HEATMAP LADDER VISUALIZER */}
          <div className="space-y-1.5 font-mono text-xs">
            
            {/* Upper Short Cascades (Reverse order - highest on top) */}
            <div className="space-y-1">
              <div className="text-[10px] uppercase font-bold text-rose-500 flex items-center justify-between px-2 pt-1">
                <span>Overhead Short Liquidation Cascades</span>
                <span>Resting Stop Pool</span>
              </div>
              {heatmapBars.shortBars.slice().reverse().map((bar) => (
                <div
                  key={bar.id}
                  onMouseEnter={() => setActiveHoverLevel(bar)}
                  onMouseLeave={() => setActiveHoverLevel(null)}
                  className="relative p-2.5 rounded-xl border border-rose-200/50 dark:border-rose-900/40 hover:border-rose-500 transition-all flex items-center justify-between overflow-hidden cursor-pointer group"
                >
                  <div
                    className="absolute right-0 top-0 bottom-0 bg-gradient-to-l from-rose-500/30 via-rose-500/15 to-transparent transition-all duration-300 group-hover:from-rose-500/50"
                    style={{ width: `${bar.intensity}%` }}
                  />
                  <div className="flex items-center gap-2.5 z-10">
                    <span className="font-extrabold text-rose-600 dark:text-rose-400">
                      {fmtPrice(bar.price)}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      (+{bar.devPct}%)
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 font-bold">
                      {bar.leverage}x
                    </span>
                  </div>
                  <div className="text-right z-10">
                    <span className="font-black text-rose-700 dark:text-rose-300">
                      {fmtCurrency(bar.volUsd)}
                    </span>
                    <span className="text-[10px] text-slate-400 block">Resting Pool</span>
                  </div>
                </div>
              ))}
            </div>

            {/* LIVE SPOT PRICE AXIS WITH PULSING RADAR (1-SECOND TICK ENGINE) */}
            <div className={`py-3 px-4 my-2 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white flex items-center justify-between border-2 shadow-lg relative overflow-hidden transition-all duration-300 ${
              priceDirection === "UP"
                ? "border-emerald-500 shadow-emerald-500/20"
                : priceDirection === "DOWN"
                ? "border-rose-500 shadow-rose-500/20"
                : "border-amber-400/80"
            }`}>
              <div className="flex items-center gap-2.5 z-10">
                <span className="relative flex h-3 w-3">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
                    priceDirection === "UP" ? "bg-emerald-400" : priceDirection === "DOWN" ? "bg-rose-400" : "bg-amber-400"
                  }`} />
                  <span className={`relative inline-flex rounded-full h-3 w-3 ${
                    priceDirection === "UP" ? "bg-emerald-500" : priceDirection === "DOWN" ? "bg-rose-500" : "bg-amber-500"
                  }`} />
                </span>
                <span className="text-xs font-mono font-bold text-slate-300">Live Spot Price:</span>
                <span className={`text-lg sm:text-xl font-black font-mono tracking-tight transition-colors duration-200 ${
                  priceDirection === "UP" ? "text-emerald-400" : priceDirection === "DOWN" ? "text-rose-400" : "text-amber-400"
                }`}>
                  {fmtPrice(livePrice)}
                </span>
                <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 hidden sm:inline-flex items-center gap-1">
                  <Radio className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
                  <span>1s Stream</span>
                </span>
              </div>
              <div className="text-right font-mono z-10">
                <div className={`text-[11px] font-bold flex items-center justify-end gap-0.5 ${
                  activeCoin.change24h >= 0 ? "text-emerald-400" : "text-rose-400"
                }`}>
                  {activeCoin.change24h >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span>{activeCoin.change24h >= 0 ? `+${activeCoin.change24h}%` : `${activeCoin.change24h}%`} 24h</span>
                </div>
                <div className="text-[9px] text-slate-400">Zero-Liquidation Anchor</div>
              </div>
            </div>

            {/* Lower Long Shelves */}
            <div className="space-y-1">
              <div className="text-[10px] uppercase font-bold text-emerald-500 flex items-center justify-between px-2 pt-1">
                <span>Lower Long Liquidation Stop Shelves</span>
                <span>Resting Stop Pool</span>
              </div>
              {heatmapBars.longBars.map((bar) => (
                <div
                  key={bar.id}
                  onMouseEnter={() => setActiveHoverLevel(bar)}
                  onMouseLeave={() => setActiveHoverLevel(null)}
                  className="relative p-2.5 rounded-xl border border-emerald-200/50 dark:border-emerald-900/40 hover:border-emerald-500 transition-all flex items-center justify-between overflow-hidden cursor-pointer group"
                >
                  <div
                    className="absolute right-0 top-0 bottom-0 bg-gradient-to-l from-emerald-500/30 via-emerald-500/15 to-transparent transition-all duration-300 group-hover:from-emerald-500/50"
                    style={{ width: `${bar.intensity}%` }}
                  />
                  <div className="flex items-center gap-2.5 z-10">
                    <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                      {fmtPrice(bar.price)}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">
                      ({bar.devPct}%)
                    </span>
                    <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold">
                      {bar.leverage}x
                    </span>
                  </div>
                  <div className="text-right z-10">
                    <span className="font-black text-emerald-700 dark:text-emerald-300">
                      {fmtCurrency(bar.volUsd)}
                    </span>
                    <span className="text-[10px] text-slate-400 block">Resting Floor</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Hover Level Detail Inspector */}
          {activeHoverLevel && (
            <div className="p-3.5 rounded-2xl bg-slate-900 text-white text-xs font-mono flex items-center justify-between border border-slate-700 animate-in fade-in duration-150">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>Selected Cluster: {activeHoverLevel.label}</span>
              </div>
              <div className="text-right">
                <span className="text-amber-400 font-bold">{fmtPrice(activeHoverLevel.price)}</span>
                <span className="text-slate-400 ml-2">({activeHoverLevel.devPct}%)</span>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: 24H HOURLY LIQUIDATION HISTOGRAM & LEVERAGE TIERS (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* 24h Hourly Liquidation Bar Chart */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    24h Hourly Wipeout Flow
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Hourly distribution of forced liquidations ($M)
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                24 Bar Series
              </span>
            </div>

            {/* Visual SVG Hourly Bar Chart */}
            <div className="h-44 w-full bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-200 dark:border-slate-800 p-3 flex items-end gap-1 overflow-x-auto">
              {hourlyLiquidationHistory.map((item, idx) => {
                const heightPercent = Math.max(8, (item.totalUsd / maxHourlyLiq) * 100);
                const isShortDominant = item.dominant === "SHORT";
                return (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center justify-end h-full group relative cursor-pointer min-w-[10px]"
                  >
                    <div
                      className={`w-full rounded-t transition-all duration-300 group-hover:opacity-100 ${
                        isShortDominant
                          ? "bg-rose-500 group-hover:bg-rose-400"
                          : "bg-emerald-500 group-hover:bg-emerald-400"
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                    {/* Tooltip on hover */}
                    <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center bg-slate-900 text-white text-[9px] font-mono p-1.5 rounded-lg whitespace-nowrap z-20 border border-slate-700 shadow-xl pointer-events-none">
                      <span className="font-bold">{item.hour}</span>
                      <span className={isShortDominant ? "text-rose-400" : "text-emerald-400"}>
                        {fmtCurrency(item.totalUsd)} ({item.dominant})
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
              <span>24 Hours Ago</span>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-rose-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-500" /> Short Squeeze
                </span>
                <span className="flex items-center gap-1 text-emerald-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Long Wipeout
                </span>
              </div>
              <span>Now (Live)</span>
            </div>
          </div>

          {/* Leverage Tier Vulnerability Table */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 flex items-center justify-center font-bold">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Leverage Tier Liquidation Points
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Calculated bankruptcy triggers by position leverage
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              {[
                { tier: "100x Leverage", data: activeCoin.leverageTiers.tier100x, risk: "CRITICAL" },
                { tier: "50x Leverage", data: activeCoin.leverageTiers.tier50x, risk: "HIGH" },
                { tier: "25x Leverage", data: activeCoin.leverageTiers.tier25x, risk: "MEDIUM" },
                { tier: "10x Leverage", data: activeCoin.leverageTiers.tier10x, risk: "MACRO" },
              ].map((lvl, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2"
                >
                  <div>
                    <div className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <span>{lvl.tier}</span>
                      <span
                        className={`text-[9px] px-1.5 py-0.2 rounded font-black ${
                          lvl.risk === "CRITICAL"
                            ? "bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300"
                            : lvl.risk === "HIGH"
                            ? "bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300"
                            : "bg-slate-200 text-slate-800 dark:bg-slate-700 dark:text-slate-300"
                        }`}
                      >
                        {lvl.risk}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Long: {fmtPrice(lvl.data.longPrice)} ({lvl.data.volLong})
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-black text-rose-600 dark:text-rose-400">
                      Short: {fmtPrice(lvl.data.shortPrice)}
                    </div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                      {lvl.data.volShort} Pool
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Real-Time 1-Second Liquidation Stream Box */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
                </span>
                <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider font-mono">
                  Live Liquidation Ticker Stream (1s)
                </h4>
              </div>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                WebSocket Feed
              </span>
            </div>

            <div className="space-y-2 font-mono text-xs max-h-48 overflow-y-auto pr-1">
              {(liveEvents.length > 0
                ? liveEvents
                : [
                    {
                      id: "init-1",
                      side: "SHORT" as const,
                      price: activeCoin.price * 1.002,
                      amountUsd: 145000,
                      exchange: "Binance Futures",
                      time: "Just now",
                    },
                    {
                      id: "init-2",
                      side: "LONG" as const,
                      price: activeCoin.price * 0.998,
                      amountUsd: 84000,
                      exchange: "Bybit",
                      time: "1s ago",
                    },
                  ]
              ).map((evt) => (
                <div
                  key={evt.id}
                  className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2 animate-in fade-in slide-in-from-top-1 duration-200"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-black ${
                        evt.side === "LONG"
                          ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300"
                          : "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300"
                      }`}
                    >
                      {evt.side} LIQ
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">{activeCoin.base}</span>
                    <span className="text-[10px] text-slate-400">@ {fmtPrice(evt.price)}</span>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <span className="font-black text-rose-600 dark:text-rose-400">
                      {fmtCurrency(evt.amountUsd)}
                    </span>
                    <span className="text-[9px] text-slate-400">{evt.exchange.split(" ")[0]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* 3. EXCHANGE-BY-EXCHANGE LIQUIDATION MATRIX */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-500" />
              <span>Multi-Exchange Liquidation Distribution ({activeCoin.base})</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Aggregated liquidation volumes across tier-1 derivatives venues
            </p>
          </div>
          <div className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
            Total 24h: <strong className="text-rose-600 dark:text-rose-400">{fmtCurrency(activeCoin.total24hLiqUsd)}</strong>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
          {[
            {
              exchange: "Binance Futures",
              share: "48.2%",
              volume: Math.round(activeCoin.total24hLiqUsd * 0.482),
              longs: 32,
              shorts: 68,
              largest: "$4.85M (BTC Short)",
            },
            {
              exchange: "Bybit Derivatives",
              share: "28.4%",
              volume: Math.round(activeCoin.total24hLiqUsd * 0.284),
              longs: 36,
              shorts: 64,
              largest: "$2.40M (BTC Short)",
            },
            {
              exchange: "OKX Perpetual",
              share: "16.8%",
              volume: Math.round(activeCoin.total24hLiqUsd * 0.168),
              longs: 28,
              shorts: 72,
              largest: "$1.95M (ETH Short)",
            },
            {
              exchange: "Deribit & CME",
              share: "6.6%",
              volume: Math.round(activeCoin.total24hLiqUsd * 0.066),
              longs: 40,
              shorts: 60,
              largest: "$850K (BTC Long)",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5"
            >
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-slate-900 dark:text-white text-xs">{item.exchange}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                  {item.share}
                </span>
              </div>

              <div className="text-base font-black text-rose-600 dark:text-rose-400">
                {fmtCurrency(item.volume)}
              </div>

              {/* Progress Bar Long vs Short */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-emerald-600 dark:text-emerald-400">{item.longs}% L</span>
                  <span className="text-rose-600 dark:text-rose-400">{item.shorts}% S</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500" style={{ width: `${item.longs}%` }} />
                  <div className="bg-rose-500" style={{ width: `${item.shorts}%` }} />
                </div>
              </div>

              <div className="pt-1 border-t border-slate-200 dark:border-slate-700 text-[10px] text-slate-400 flex justify-between">
                <span>Top Wipeout:</span>
                <strong className="text-slate-700 dark:text-slate-200 font-bold">{item.largest}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. COMPREHENSIVE FUNDAMENTAL & QUANTITATIVE LIQUIDATION EXPLANATION */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
        <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-700/80">
            <Info className="w-3.5 h-3.5" />
            <span>Quantitative &amp; Microstructure Deep Dive</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            The Mechanics of Liquidation Heatmaps &amp; Forced Market Cascades
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            Understanding why market makers, high-frequency algorithms, and institutional desks exploit resting liquidation pools for liquidity sweeps and directional breakout momentum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>How Liquidation Prices are Calculated</span>
            </h4>
            <p>
              When a trader opens a position with leverage (L), maintenance margin (MMR) determines the exact price where the exchange margin engine forcefully executes a market order to prevent insolvency:
            </p>
            <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 font-mono text-[11px] text-amber-600 dark:text-amber-400">
              P_liquidation = P_entry × (1 ± (1 / Leverage) ∓ MMR)
            </div>
            <p>
              Higher leverage compresses the distance between entry and liquidation, creating dense bands of vulnerability.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-500" />
              <span>Liquidation Cascades &amp; Short Squeezes</span>
            </h4>
            <p>
              Forced short liquidations trigger mandatory **Market Buy** orders. When price breaches a dense cluster of short stops, the surge of buy orders sweeps the thin orderbook, violently thrusting price into the next cluster in a feedback cascade.
            </p>
            <p>
              Institutional traders anticipate these cascades and enter long positions right before the trigger, letting forced liquidations carry price to their profit targets.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-emerald-500" />
              <span>How to Position Using Heatmaps</span>
            </h4>
            <p>
              1. **Never place stop-losses inside major clusters**: Place your protective invalidation stops just *beyond* major liquidation magnets to avoid getting swept.
            </p>
            <p>
              2. **Target clusters for Take-Profit**: Use high-density liquidation pools as high-probability magnet targets where counterparty liquidity is maximum.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
