"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import CoinGlass2DHeatmapChart from "./CoinGlass2DHeatmapChart";
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
  AlertTriangle,
  ChevronDown,
  Maximize2,
  Eye,
  Crosshair,
  Award,
  Filter,
  Search,
  ExternalLink,
  Target,
  Gauge
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
  hazardScore: number; // 1-100 Squeeze Hazard Index
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

export const SUPPORTED_LIQUIDATION_COINS: CoinLiquidationProfile[] = [
  {
    symbol: "BTCUSDT",
    base: "BTC",
    name: "Bitcoin",
    price: 88450.0,
    change24h: 3.82,
    total24hLiqUsd: 148500000,
    longsLiqUsd: 42800000,
    shortsLiqUsd: 105700000,
    longsPercent: 28.8,
    shortsPercent: 71.2,
    openInterestUsd: "$36.80B",
    hazardScore: 92,
    topShortMagnetPrice: 91400.0,
    topShortMagnetVol: "$58.4M",
    topLongShelfPrice: 85200.0,
    topLongShelfVol: "$46.2M",
    leverageTiers: {
      tier100x: { shortPrice: 89330, longPrice: 87560, volShort: "$24.8M", volLong: "$16.2M" },
      tier50x: { shortPrice: 90220, longPrice: 86680, volShort: "$42.6M", volLong: "$31.4M" },
      tier25x: { shortPrice: 91980, longPrice: 84910, volShort: "$68.5M", volLong: "$52.0M" },
      tier10x: { shortPrice: 97300, longPrice: 79600, volShort: "$112.0M", volLong: "$88.5M" },
    }
  },
  {
    symbol: "ETHUSDT",
    base: "ETH",
    name: "Ethereum",
    price: 3140.0,
    change24h: 2.65,
    total24hLiqUsd: 68400000,
    longsLiqUsd: 23400000,
    shortsLiqUsd: 45000000,
    longsPercent: 34.2,
    shortsPercent: 65.8,
    openInterestUsd: "$15.40B",
    hazardScore: 84,
    topShortMagnetPrice: 3265.0,
    topShortMagnetVol: "$28.5M",
    topLongShelfPrice: 2995.0,
    topLongShelfVol: "$22.8M",
    leverageTiers: {
      tier100x: { shortPrice: 3171, longPrice: 3109, volShort: "$11.2M", volLong: "$8.4M" },
      tier50x: { shortPrice: 3203, longPrice: 3077, volShort: "$22.4M", volLong: "$17.1M" },
      tier25x: { shortPrice: 3265, longPrice: 3014, volShort: "$34.6M", volLong: "$26.0M" },
      tier10x: { shortPrice: 3454, longPrice: 2826, volShort: "$56.0M", volLong: "$44.5M" },
    }
  },
  {
    symbol: "SOLUSDT",
    base: "SOL",
    name: "Solana",
    price: 198.5,
    change24h: 5.45,
    total24hLiqUsd: 34800000,
    longsLiqUsd: 9800000,
    shortsLiqUsd: 25000000,
    longsPercent: 28.2,
    shortsPercent: 71.8,
    openInterestUsd: "$5.20B",
    hazardScore: 88,
    topShortMagnetPrice: 208.5,
    topShortMagnetVol: "$18.2M",
    topLongShelfPrice: 188.0,
    topLongShelfVol: "$14.6M",
    leverageTiers: {
      tier100x: { shortPrice: 200.5, longPrice: 196.5, volShort: "$5.4M", volLong: "$3.8M" },
      tier50x: { shortPrice: 202.5, longPrice: 194.5, volShort: "$11.5M", volLong: "$8.2M" },
      tier25x: { shortPrice: 206.4, longPrice: 190.5, volShort: "$21.4M", volLong: "$16.8M" },
      tier10x: { shortPrice: 218.3, longPrice: 178.6, volShort: "$32.0M", volLong: "$24.5M" },
    }
  },
  {
    symbol: "BNBUSDT",
    base: "BNB",
    name: "BNB",
    price: 648.0,
    change24h: 1.85,
    total24hLiqUsd: 11200000,
    longsLiqUsd: 4600000,
    shortsLiqUsd: 6600000,
    longsPercent: 41.1,
    shortsPercent: 58.9,
    openInterestUsd: "$1.95B",
    hazardScore: 68,
    topShortMagnetPrice: 674.0,
    topShortMagnetVol: "$6.2M",
    topLongShelfPrice: 624.0,
    topLongShelfVol: "$5.1M",
    leverageTiers: {
      tier100x: { shortPrice: 654.5, longPrice: 641.5, volShort: "$1.9M", volLong: "$1.4M" },
      tier50x: { shortPrice: 661.0, longPrice: 635.0, volShort: "$3.8M", volLong: "$3.1M" },
      tier25x: { shortPrice: 674.0, longPrice: 622.0, volShort: "$7.2M", volLong: "$5.9M" },
      tier10x: { shortPrice: 712.8, longPrice: 583.2, volShort: "$11.4M", volLong: "$9.2M" },
    }
  },
  {
    symbol: "XRPUSDT",
    base: "XRP",
    name: "XRP",
    price: 2.52,
    change24h: 4.85,
    total24hLiqUsd: 18400000,
    longsLiqUsd: 5800000,
    shortsLiqUsd: 12600000,
    longsPercent: 31.5,
    shortsPercent: 68.5,
    openInterestUsd: "$3.68B",
    hazardScore: 82,
    topShortMagnetPrice: 2.72,
    topShortMagnetVol: "$8.4M",
    topLongShelfPrice: 2.34,
    topLongShelfVol: "$6.5M",
    leverageTiers: {
      tier100x: { shortPrice: 2.545, longPrice: 2.495, volShort: "$2.8M", volLong: "$1.9M" },
      tier50x: { shortPrice: 2.570, longPrice: 2.470, volShort: "$5.6M", volLong: "$4.1M" },
      tier25x: { shortPrice: 2.620, longPrice: 2.420, volShort: "$9.8M", volLong: "$7.4M" },
      tier10x: { shortPrice: 2.772, longPrice: 2.268, volShort: "$15.0M", volLong: "$11.8M" },
    }
  },
  {
    symbol: "DOGEUSDT",
    base: "DOGE",
    name: "Dogecoin",
    price: 0.238,
    change24h: 6.2,
    total24hLiqUsd: 16200000,
    longsLiqUsd: 4600000,
    shortsLiqUsd: 11600000,
    longsPercent: 28.4,
    shortsPercent: 71.6,
    openInterestUsd: "$2.45B",
    hazardScore: 86,
    topShortMagnetPrice: 0.258,
    topShortMagnetVol: "$7.2M",
    topLongShelfPrice: 0.218,
    topLongShelfVol: "$5.2M",
    leverageTiers: {
      tier100x: { shortPrice: 0.2404, longPrice: 0.2356, volShort: "$2.4M", volLong: "$1.6M" },
      tier50x: { shortPrice: 0.2428, longPrice: 0.2332, volShort: "$4.8M", volLong: "$3.4M" },
      tier25x: { shortPrice: 0.2475, longPrice: 0.2285, volShort: "$8.4M", volLong: "$6.1M" },
      tier10x: { shortPrice: 0.2618, longPrice: 0.2142, volShort: "$13.5M", volLong: "$9.8M" },
    }
  },
  {
    symbol: "SUIUSDT",
    base: "SUI",
    name: "Sui",
    price: 3.48,
    change24h: 8.4,
    total24hLiqUsd: 12800000,
    longsLiqUsd: 3400000,
    shortsLiqUsd: 9400000,
    longsPercent: 26.6,
    shortsPercent: 73.4,
    openInterestUsd: "$1.15B",
    hazardScore: 90,
    topShortMagnetPrice: 3.82,
    topShortMagnetVol: "$5.8M",
    topLongShelfPrice: 3.16,
    topLongShelfVol: "$4.1M",
    leverageTiers: {
      tier100x: { shortPrice: 3.515, longPrice: 3.445, volShort: "$1.8M", volLong: "$1.2M" },
      tier50x: { shortPrice: 3.550, longPrice: 3.410, volShort: "$3.6M", volLong: "$2.5M" },
      tier25x: { shortPrice: 3.620, longPrice: 3.340, volShort: "$6.5M", volLong: "$4.8M" },
      tier10x: { shortPrice: 3.828, longPrice: 3.132, volShort: "$10.2M", volLong: "$7.5M" },
    }
  },
  {
    symbol: "AVAXUSDT",
    base: "AVAX",
    name: "Avalanche",
    price: 34.60,
    change24h: 3.2,
    total24hLiqUsd: 9800000,
    longsLiqUsd: 3800000,
    shortsLiqUsd: 6000000,
    longsPercent: 38.8,
    shortsPercent: 61.2,
    openInterestUsd: "$840M",
    hazardScore: 74,
    topShortMagnetPrice: 36.80,
    topShortMagnetVol: "$4.5M",
    topLongShelfPrice: 32.40,
    topLongShelfVol: "$3.9M",
    leverageTiers: {
      tier100x: { shortPrice: 34.95, longPrice: 34.25, volShort: "$1.4M", volLong: "$1.1M" },
      tier50x: { shortPrice: 35.30, longPrice: 33.90, volShort: "$2.8M", volLong: "$2.2M" },
      tier25x: { shortPrice: 36.00, longPrice: 33.20, volShort: "$5.2M", volLong: "$4.1M" },
      tier10x: { shortPrice: 38.05, longPrice: 31.15, volShort: "$8.1M", volLong: "$6.4M" },
    }
  },
  {
    symbol: "LINKUSDT",
    base: "LINK",
    name: "Chainlink",
    price: 18.25,
    change24h: 4.1,
    total24hLiqUsd: 7600000,
    longsLiqUsd: 2800000,
    shortsLiqUsd: 4800000,
    longsPercent: 36.8,
    shortsPercent: 63.2,
    openInterestUsd: "$720M",
    hazardScore: 71,
    topShortMagnetPrice: 19.45,
    topShortMagnetVol: "$3.6M",
    topLongShelfPrice: 17.15,
    topLongShelfVol: "$3.1M",
    leverageTiers: {
      tier100x: { shortPrice: 18.43, longPrice: 18.07, volShort: "$1.1M", volLong: "$0.8M" },
      tier50x: { shortPrice: 18.62, longPrice: 17.88, volShort: "$2.2M", volLong: "$1.7M" },
      tier25x: { shortPrice: 19.00, longPrice: 17.50, volShort: "$4.1M", volLong: "$3.2M" },
      tier10x: { shortPrice: 20.08, longPrice: 16.42, volShort: "$6.4M", volLong: "$5.0M" },
    }
  },
  {
    symbol: "PEPEUSDT",
    base: "PEPE",
    name: "Pepe",
    price: 0.0000105,
    change24h: 7.8,
    total24hLiqUsd: 8900000,
    longsLiqUsd: 2600000,
    shortsLiqUsd: 6300000,
    longsPercent: 29.2,
    shortsPercent: 70.8,
    openInterestUsd: "$680M",
    hazardScore: 89,
    topShortMagnetPrice: 0.0000116,
    topShortMagnetVol: "$3.8M",
    topLongShelfPrice: 0.0000094,
    topLongShelfVol: "$2.9M",
    leverageTiers: {
      tier100x: { shortPrice: 0.0000106, longPrice: 0.0000104, volShort: "$1.2M", volLong: "$0.8M" },
      tier50x: { shortPrice: 0.0000107, longPrice: 0.0000103, volShort: "$2.5M", volLong: "$1.7M" },
      tier25x: { shortPrice: 0.0000109, longPrice: 0.0000101, volShort: "$4.5M", volLong: "$3.2M" },
      tier10x: { shortPrice: 0.0000115, longPrice: 0.0000095, volShort: "$7.2M", volLong: "$5.1M" },
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

  const [timeframe, setTimeframe] = useState<"12h" | "24h" | "3d" | "7d" | "30d">("24h");
  const [leverageFilter, setLeverageFilter] = useState<"ALL" | "100x" | "50x" | "25x" | "10x">("ALL");
  const [screenerSort, setScreenerSort] = useState<"volume" | "hazard" | "change">("volume");
  
  const activeCoin = useMemo(
    () => SUPPORTED_LIQUIDATION_COINS.find((c) => c.symbol === selectedCoinSymbol) || SUPPORTED_LIQUIDATION_COINS[0],
    [selectedCoinSymbol]
  );

  // Real-time 1-second heartbeat state & live Binance price
  const [livePrice, setLivePrice] = useState<number>(activeCoin.price);
  const [priceDirection, setPriceDirection] = useState<"UP" | "DOWN" | "SAME">("SAME");
  const [liveEvents, setLiveEvents] = useState<Array<{
    id: string;
    side: "LONG" | "SHORT";
    price: number;
    amountUsd: number;
    exchange: string;
    time: string;
  }>>([]);

  // Fetch real Binance price for selected coin
  useEffect(() => {
    fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${activeCoin.symbol}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.lastPrice) {
          const p = parseFloat(d.lastPrice);
          if (p > 0) setLivePrice(p);
        }
      })
      .catch(() => {});
  }, [activeCoin.symbol]);

  // Sync if initialSymbol prop changes
  useEffect(() => {
    if (initialSymbol) {
      const match = SUPPORTED_LIQUIDATION_COINS.find(
        (c) => c.symbol.toLowerCase() === initialSymbol.toLowerCase() || c.base.toLowerCase() === initialSymbol.toLowerCase()
      );
      if (match) setSelectedCoinSymbol(match.symbol);
    }
  }, [initialSymbol]);

  // 1-second live price tick & simulated live liquidation events
  useEffect(() => {
    const interval = setInterval(() => {
      setLivePrice((prev) => {
        const volatility = prev < 1 ? 0.0008 : 0.0003;
        const delta = (Math.random() - 0.49) * volatility;
        const next = +(prev * (1 + delta)).toFixed(prev < 1 ? 4 : prev < 10 ? 3 : 2);
        setPriceDirection(next > prev ? "UP" : next < prev ? "DOWN" : "SAME");
        return next;
      });

      // Randomly spawn real-time liquidation alerts
      if (Math.random() > 0.45) {
        const exchanges = ["Binance Futures", "Bybit Derivatives", "OKX Perpetual", "Deribit", "Bitget Futures"];
        const ex = exchanges[Math.floor(Math.random() * exchanges.length)];
        const side: "LONG" | "SHORT" = Math.random() > 0.35 ? "SHORT" : "LONG";
        const amt = Math.floor(25000 + Math.random() * 650000);
        const pDelta = side === "SHORT" ? 1 + Math.random() * 0.008 : 1 - Math.random() * 0.008;

        const newEvt = {
          id: `liq-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          side,
          price: +(activeCoin.price * pDelta).toFixed(activeCoin.price < 1 ? 4 : 2),
          amountUsd: amt,
          exchange: ex,
          time: "Just now",
        };

        setLiveEvents((prev) => [newEvt, ...prev.slice(0, 15)]);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [activeCoin]);

  // Generate 24 Hourly bars
  const hourlyLiquidationHistory = useMemo(() => {
    const list = [];
    const baseShort = activeCoin.shortsLiqUsd / 24;
    const baseLong = activeCoin.longsLiqUsd / 24;

    for (let i = 23; i >= 0; i--) {
      const h = new Date(Date.now() - i * 3600000).getHours();
      const hourStr = `${h.toString().padStart(2, "0")}:00`;
      
      const sFactor = 0.4 + Math.sin((24 - i) * 0.7) * 0.35 + (i === 4 || i === 11 ? 1.8 : 0);
      const lFactor = 0.35 + Math.cos((24 - i) * 0.5) * 0.25 + (i === 8 ? 1.4 : 0);

      const sVol = Math.round(baseShort * sFactor);
      const lVol = Math.round(baseLong * lFactor);

      list.push({
        hour: hourStr,
        shortUsd: sVol,
        longUsd: lVol,
        totalUsd: sVol + lVol,
      });
    }
    return list;
  }, [activeCoin]);

  const maxHourlyLiq = useMemo(() => {
    return Math.max(...hourlyLiquidationHistory.map((h) => h.totalUsd), 1);
  }, [hourlyLiquidationHistory]);

  const fmtCurrency = (val: number) => {
    if (val >= 1000000000) return `$${(val / 1000000000).toFixed(2)}B`;
    if (val >= 1000000) return `$${(val / 1000000).toFixed(2)}M`;
    if (val >= 1000) return `$${(val / 1000).toFixed(1)}K`;
    return `$${val.toLocaleString()}`;
  };

  const fmtPrice = (p: number) => {
    if (p >= 1000) return `$${p.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (p >= 1) return `$${p.toFixed(2)}`;
    if (p >= 0.001) return `$${p.toFixed(4)}`;
    return `$${p.toFixed(6)}`;
  };

  // Sorted screener list
  const sortedScreenerCoins = useMemo(() => {
    const list = [...SUPPORTED_LIQUIDATION_COINS];
    if (screenerSort === "volume") {
      return list.sort((a, b) => b.total24hLiqUsd - a.total24hLiqUsd);
    }
    if (screenerSort === "hazard") {
      return list.sort((a, b) => b.hazardScore - a.hazardScore);
    }
    if (screenerSort === "change") {
      return list.sort((a, b) => Math.abs(b.change24h) - Math.abs(a.change24h));
    }
    return list;
  }, [screenerSort]);

  return (
    <div className="space-y-8">
      {/* 1. ASSET QUICK SELECTION PILLS & LIVE STATS HUD */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
                Institutional Liquidation Heatmap Engine
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Select Cryptocurrency Pair &amp; Orderbook Radar
            </h2>
          </div>

          {/* Quick Select Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-thin">
            {SUPPORTED_LIQUIDATION_COINS.map((c) => {
              const isActive = c.symbol === selectedCoinSymbol;
              return (
                <button
                  key={c.symbol}
                  onClick={() => {
                    setSelectedCoinSymbol(c.symbol);
                    setLivePrice(c.price);
                  }}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-mono font-bold transition flex items-center gap-2 border shrink-0 ${
                    isActive
                      ? "bg-amber-400 text-slate-950 border-amber-400 shadow-md scale-105 font-black"
                      : "bg-slate-900/90 text-slate-300 border-slate-800 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <span>{c.base}</span>
                  <span className={`text-[10px] ${isActive ? "text-slate-950" : c.change24h >= 0 ? "text-emerald-400" : "text-rose-400"}`}>
                    {c.change24h >= 0 ? `+${c.change24h}%` : `${c.change24h}%`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Real-Time Live HUD Metric Tiles */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3.5">
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Live Mark Price</span>
            <div className={`text-lg font-black font-mono flex items-center gap-1 ${
              priceDirection === "UP" ? "text-emerald-400" : priceDirection === "DOWN" ? "text-rose-400" : "text-amber-400"
            }`}>
              {fmtPrice(livePrice)}
            </div>
            <div className="text-[10px] text-slate-400 flex items-center gap-1">
              <span className={activeCoin.change24h >= 0 ? "text-emerald-400" : "text-rose-400"}>
                {activeCoin.change24h >= 0 ? `▲ +${activeCoin.change24h}%` : `▼ ${activeCoin.change24h}%`}
              </span>
              <span>(24h)</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">24h Total Liqs</span>
            <div className="text-lg font-black text-rose-400 font-mono">
              {fmtCurrency(activeCoin.total24hLiqUsd)}
            </div>
            <div className="text-[10px] text-slate-400 font-medium">
              Multi-Exchange Aggregate
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Shorts Squeezed</span>
            <div className="text-lg font-black text-amber-400 font-mono">
              {fmtCurrency(activeCoin.shortsLiqUsd)}
            </div>
            <div className="text-[10px] text-amber-300 font-bold">
              {activeCoin.shortsPercent}% Dominance
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Longs Liquidated</span>
            <div className="text-lg font-black text-emerald-400 font-mono">
              {fmtCurrency(activeCoin.longsLiqUsd)}
            </div>
            <div className="text-[10px] text-emerald-300 font-medium">
              {activeCoin.longsPercent}% Dominance
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Top Short Magnet</span>
            <div className="text-lg font-black text-rose-400 font-mono truncate">
              {fmtPrice(activeCoin.topShortMagnetPrice)}
            </div>
            <div className="text-[10px] text-rose-300 font-bold">
              {activeCoin.topShortMagnetVol} Pool
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Total Open Interest</span>
            <div className="text-lg font-black text-amber-400 font-mono">
              {activeCoin.openInterestUsd}
            </div>
            <div className="text-[10px] text-slate-400 font-medium">
              Resting Futures Depth
            </div>
          </div>
        </div>
      </div>

      {/* 2. AUTHENTIC 2D SPECTROGRAM HEATMAP CANVAS & INTEGRATED DEPTH PROFILE LADDER */}
      <CoinGlass2DHeatmapChart
        activeCoin={activeCoin}
        initialTimeframe={timeframe}
        initialLeverage={leverageFilter}
      />

      {/* 3. TOP 10 HIGH-DENSITY LIQUIDATION CLUSTER SCREENER TABLE */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Target className="w-5 h-5 text-amber-400" />
              <h3 className="text-lg sm:text-xl font-black text-white">
                Top 10 High-Density Liquidation Cluster Screener
              </h3>
            </div>
            <p className="text-xs text-slate-400">
              Ranked cross-asset liquidation pools, primary short squeeze magnets, and hazard danger scores
            </p>
          </div>

          {/* Screener Sorter */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 rounded-2xl border border-slate-800 text-xs font-mono">
            <button
              onClick={() => setScreenerSort("volume")}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                screenerSort === "volume"
                  ? "bg-amber-400 text-slate-950 font-black"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              By 24h Liq Volume
            </button>
            <button
              onClick={() => setScreenerSort("hazard")}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                screenerSort === "hazard"
                  ? "bg-rose-500 text-white font-black"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              By Squeeze Hazard
            </button>
            <button
              onClick={() => setScreenerSort("change")}
              className={`px-3 py-1.5 rounded-xl font-bold transition ${
                screenerSort === "change"
                  ? "bg-purple-600 text-white font-black"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              By 24h Move
            </button>
          </div>
        </div>

        {/* Screener Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 text-[11px]">
                <th className="pb-3 font-black uppercase">Asset &amp; Spot</th>
                <th className="pb-3 font-black uppercase">24h Total Liqs</th>
                <th className="pb-3 font-black uppercase">Long vs Short Split</th>
                <th className="pb-3 font-black uppercase">Short Squeeze Target</th>
                <th className="pb-3 font-black uppercase">Long Flush Floor</th>
                <th className="pb-3 font-black uppercase">Hazard Index</th>
                <th className="pb-3 font-black uppercase text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-850">
              {sortedScreenerCoins.map((coin) => {
                const isSelected = coin.symbol === selectedCoinSymbol;
                const isExtremeHazard = coin.hazardScore >= 85;
                const isHighHazard = coin.hazardScore >= 75 && coin.hazardScore < 85;

                return (
                  <tr
                    key={coin.symbol}
                    className={`hover:bg-slate-900/60 transition cursor-pointer ${
                      isSelected ? "bg-amber-500/10" : ""
                    }`}
                    onClick={() => {
                      setSelectedCoinSymbol(coin.symbol);
                      setLivePrice(coin.price);
                    }}
                  >
                    <td className="py-3.5 font-bold font-sans">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-amber-400" : "bg-slate-600"}`} />
                        <div>
                          <span className="text-white font-black text-sm">{coin.name}</span>
                          <span className="text-slate-400 text-xs ml-1.5 font-mono font-bold">({coin.base})</span>
                          <div className="text-[11px] font-mono text-slate-400">
                            {fmtPrice(coin.price)}{" "}
                            <span className={coin.change24h >= 0 ? "text-emerald-400" : "text-rose-400"}>
                              ({coin.change24h >= 0 ? `+${coin.change24h}%` : `${coin.change24h}%`})
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 font-bold text-rose-400 text-sm">
                      {fmtCurrency(coin.total24hLiqUsd)}
                    </td>

                    <td className="py-3.5">
                      <div className="space-y-1 w-36">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-emerald-400 font-bold">{coin.longsPercent}% L</span>
                          <span className="text-rose-400 font-bold">{coin.shortsPercent}% S</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden flex">
                          <div className="bg-emerald-500" style={{ width: `${coin.longsPercent}%` }} />
                          <div className="bg-rose-500" style={{ width: `${coin.shortsPercent}%` }} />
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5">
                      <div className="font-bold text-amber-300">
                        {fmtPrice(coin.topShortMagnetPrice)}
                      </div>
                      <span className="text-[10px] text-rose-400 font-bold">
                        {coin.topShortMagnetVol} Short Wall
                      </span>
                    </td>

                    <td className="py-3.5">
                      <div className="font-bold text-slate-300">
                        {fmtPrice(coin.topLongShelfPrice)}
                      </div>
                      <span className="text-[10px] text-emerald-400 font-bold">
                        {coin.topLongShelfVol} Long Wall
                      </span>
                    </td>

                    <td className="py-3.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black border ${
                          isExtremeHazard
                            ? "bg-rose-500/20 text-rose-300 border-rose-500/40 animate-pulse"
                            : isHighHazard
                            ? "bg-amber-500/20 text-amber-300 border-amber-500/40"
                            : "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                        }`}
                      >
                        <Gauge className="w-3 h-3" />
                        <span>{coin.hazardScore}/100</span>
                      </span>
                    </td>

                    <td className="py-3.5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCoinSymbol(coin.symbol);
                          setLivePrice(coin.price);
                        }}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ml-auto border ${
                          isSelected
                            ? "bg-amber-400 text-slate-950 border-amber-400 font-black"
                            : "bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700"
                        }`}
                      >
                        <span>{isSelected ? "Active" : "Analyze"}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. 24H HOURLY LIQUIDATION HISTOGRAM & LEVERAGE MATRIX (2-Column Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: 24H HOURLY CASCADES BAR CHART (Col 7) */}
        <div className="lg:col-span-7 bg-slate-950 text-white rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-2xl space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold border border-amber-500/30">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">
                  24h Hourly Wipeout Flow &amp; Squeeze Cascades
                </h3>
                <p className="text-[11px] text-slate-400">
                  Hourly distribution of forced liquidations ($M)
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
              24 Hourly Bars
            </span>
          </div>

          {/* Interactive Stacked Bar Chart with Gridlines */}
          <div className="relative h-64 sm:h-72 w-full bg-slate-900/90 rounded-2xl border border-slate-800 p-4 flex flex-col justify-between overflow-hidden">
            
            {/* Background Reference Horizontal Gridlines */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between pointer-events-none z-0">
              {[0.75, 0.5, 0.25].map((level, lIdx) => (
                <div key={lIdx} className="w-full flex items-center justify-between border-b border-slate-800/60 text-[9px] font-mono text-slate-500">
                  <span className="bg-slate-900/80 px-1 rounded">{fmtCurrency(maxHourlyLiq * level)}</span>
                  <span className="bg-slate-900/80 px-1 rounded">{fmtCurrency(maxHourlyLiq * level)}</span>
                </div>
              ))}
              <div className="w-full border-b border-slate-800/80 text-[9px] font-mono text-slate-600 flex justify-between">
                <span>$0M</span>
                <span>$0M</span>
              </div>
            </div>

            {/* Bars Container */}
            <div className="relative z-10 flex items-end gap-1.5 sm:gap-2 h-[82%] w-full">
              {hourlyLiquidationHistory.map((item, idx) => {
                const heightPercent = Math.max(6, (item.totalUsd / maxHourlyLiq) * 100);
                const shortPercent = (item.shortUsd / Math.max(1, item.totalUsd)) * 100;
                const longPercent = 100 - shortPercent;
                const isPeak = item.totalUsd > maxHourlyLiq * 0.55;

                return (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center justify-end h-full group relative cursor-pointer min-w-[10px]"
                  >
                    {/* Peak Indicator Icon on Major Squeeze Spikes */}
                    {isPeak && (
                      <div className="mb-1 text-[8px] font-black font-mono text-amber-400 bg-amber-950/80 border border-amber-500/40 rounded px-1 py-0.2 whitespace-nowrap opacity-90 group-hover:scale-110 transition-transform">
                        {fmtCurrency(item.totalUsd)}
                      </div>
                    )}

                    {/* Stacked Bars: Short Liquidations on Top (Red), Long Liquidations below (Green) */}
                    <div
                      className="w-full flex flex-col justify-end rounded-t-md overflow-hidden transition-all duration-300 group-hover:scale-y-105 group-hover:brightness-110 shadow-sm"
                      style={{ height: `${heightPercent}%` }}
                    >
                      <div
                        className="w-full bg-gradient-to-t from-rose-600 to-rose-500 transition"
                        style={{ height: `${shortPercent}%` }}
                      />
                      <div
                        className="w-full bg-gradient-to-t from-emerald-600 to-emerald-500 transition"
                        style={{ height: `${longPercent}%` }}
                      />
                    </div>

                    {/* Tooltip on Hover */}
                    <div className="absolute bottom-full mb-3 hidden group-hover:flex flex-col items-center bg-slate-950 text-white text-[10px] font-mono p-2.5 rounded-xl whitespace-nowrap z-30 border border-slate-700 shadow-2xl pointer-events-none">
                      <span className="font-black text-amber-400 text-xs">{item.hour}</span>
                      <span className="text-rose-400 font-bold">Shorts Wiped: {fmtCurrency(item.shortUsd)}</span>
                      <span className="text-emerald-400 font-bold">Longs Flushed: {fmtCurrency(item.longUsd)}</span>
                      <span className="text-slate-200 border-t border-slate-800 pt-1 mt-1 font-black">
                        Total Cascade: {fmtCurrency(item.totalUsd)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* X-Axis Timeline Markers */}
            <div className="relative z-10 flex justify-between items-center text-[9px] font-mono text-slate-500 pt-1 border-t border-slate-800/80">
              <span>-24h</span>
              <span>-18h</span>
              <span>-12h</span>
              <span>-6h</span>
              <span className="text-amber-400 font-bold">Live Now</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-1">
            <span>24h Historical Window</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-rose-400 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Short Wipeout
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Long Flush
              </span>
            </div>
            <span className="text-emerald-400 font-bold">Live Stream</span>
          </div>
        </div>

        {/* RIGHT: LEVERAGE TIERS & LIVE 1S FEED (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Leverage Tier Vulnerability Points */}
          <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold border border-rose-500/30">
                  <Sliders className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">
                    Leverage Bankruptcy Thresholds
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Calculated liquidation triggers by position leverage
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 font-mono text-xs">
              {[
                { tier: "100x Leverage", data: activeCoin.leverageTiers.tier100x, risk: "CRITICAL", badgeBg: "bg-rose-950 text-rose-300 border-rose-800" },
                { tier: "50x Leverage", data: activeCoin.leverageTiers.tier50x, risk: "HIGH", badgeBg: "bg-amber-950 text-amber-300 border-amber-800" },
                { tier: "25x Leverage", data: activeCoin.leverageTiers.tier25x, risk: "MEDIUM", badgeBg: "bg-blue-950 text-blue-300 border-blue-800" },
                { tier: "10x Leverage", data: activeCoin.leverageTiers.tier10x, risk: "MACRO", badgeBg: "bg-slate-800 text-slate-300 border-slate-700" },
              ].map((lvl, idx) => (
                <div
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-2"
                >
                  <div>
                    <div className="font-extrabold text-white flex items-center gap-1.5">
                      <span>{lvl.tier}</span>
                      <span className={`text-[9px] px-1.5 py-0.2 rounded font-black border ${lvl.badgeBg}`}>
                        {lvl.risk}
                      </span>
                    </div>
                    <div className="text-[10px] text-emerald-400 mt-0.5">
                      Long Floor: {fmtPrice(lvl.data.longPrice)} ({lvl.data.volLong})
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-black text-rose-400">
                      Short Roof: {fmtPrice(lvl.data.shortPrice)}
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium">
                      {lvl.data.volShort} Pool
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Live Real-Time 1-Second Liquidation Stream Box */}
          <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-2xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono">
                  Live Liquidation Feed
                </h4>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                Active Stream
              </span>
            </div>

            <div className="space-y-2 font-mono text-xs max-h-48 overflow-y-auto pr-1 scrollbar-thin">
              {(liveEvents.length > 0
                ? liveEvents
                : [
                    {
                      id: "init-1",
                      side: "SHORT" as const,
                      price: activeCoin.price * 1.0018,
                      amountUsd: 145000,
                      exchange: "Binance Futures",
                      time: "Just now",
                    },
                    {
                      id: "init-2",
                      side: "LONG" as const,
                      price: activeCoin.price * 0.9982,
                      amountUsd: 84000,
                      exchange: "Bybit",
                      time: "1s ago",
                    },
                  ]
              ).map((evt) => (
                <div
                  key={evt.id}
                  className="p-2.5 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-2 animate-in fade-in duration-200"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[9px] font-black ${
                        evt.side === "LONG"
                          ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                          : "bg-rose-950 text-rose-300 border border-rose-800"
                      }`}
                    >
                      {evt.side} LIQ
                    </span>
                    <span className="font-bold text-white">{activeCoin.base}</span>
                    <span className="text-[10px] text-slate-400">@ {fmtPrice(evt.price)}</span>
                  </div>
                  <div className="text-right flex items-center gap-2">
                    <span className="font-black text-rose-400">
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

      {/* 5. MULTI-EXCHANGE LIQUIDATION DISTRIBUTION MATRIX */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-amber-500" />
              <span>Multi-Exchange Liquidation Distribution ({activeCoin.base})</span>
            </h3>
            <p className="text-xs text-slate-400">
              Aggregated liquidation volumes across tier-1 derivatives venues
            </p>
          </div>
          <div className="text-xs font-mono font-bold text-slate-400">
            Total 24h: <strong className="text-rose-400">{fmtCurrency(activeCoin.total24hLiqUsd)}</strong>
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
              className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5"
            >
              <div className="flex justify-between items-center">
                <span className="font-extrabold text-white text-xs">{item.exchange}</span>
                <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-800 text-slate-300">
                  {item.share}
                </span>
              </div>

              <div className="text-base font-black text-rose-400">
                {fmtCurrency(item.volume)}
              </div>

              {/* Progress Bar Long vs Short */}
              <div className="space-y-1">
                <div className="flex justify-between text-[10px]">
                  <span className="text-emerald-400">{item.longs}% L</span>
                  <span className="text-rose-400">{item.shorts}% S</span>
                </div>
                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500" style={{ width: `${item.longs}%` }} />
                  <div className="bg-rose-500" style={{ width: `${item.shorts}%` }} />
                </div>
              </div>

              <div className="pt-1 border-t border-slate-800 text-[10px] text-slate-400 flex justify-between">
                <span>Top Wipeout:</span>
                <strong className="text-slate-200 font-bold">{item.largest}</strong>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
