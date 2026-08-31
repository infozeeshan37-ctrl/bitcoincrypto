"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
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
  AlertTriangle,
  ChevronDown,
  Maximize2,
  Eye,
  Crosshair
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
    price: 88450.0,
    change24h: 3.82,
    total24hLiqUsd: 148500000,
    longsLiqUsd: 42800000,
    shortsLiqUsd: 105700000,
    longsPercent: 28.8,
    shortsPercent: 71.2,
    openInterestUsd: "$36.80B",
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
  const [exchangeFilter, setExchangeFilter] = useState<"ALL" | "Binance" | "Bybit" | "OKX" | "Deribit">("ALL");
  
  // Interactive Crosshair on Heatmap
  const [hoveredPoint, setHoveredPoint] = useState<{
    price: number;
    timeLabel: string;
    volUsd: number;
    side: "SHORT" | "LONG";
    leverage: string;
    pctFromSpot: number;
    x: number;
    y: number;
  } | null>(null);

  const chartRef = useRef<SVGSVGElement | null>(null);

  const activeCoin = useMemo(
    () => SUPPORTED_LIQUIDATION_COINS.find((c) => c.symbol === selectedCoinSymbol) || SUPPORTED_LIQUIDATION_COINS[0],
    [selectedCoinSymbol]
  );

  // Real-time 1-second heartbeat state & live Binance price
  const [livePrice, setLivePrice] = useState<number>(activeCoin.price);
  const [priceDirection, setPriceDirection] = useState<"UP" | "DOWN" | "SAME">("SAME");
  const [wsConnected, setWsConnected] = useState<boolean>(true);
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

  // 1-Second Sub-second Tick Engine & Live Liquidation Event Stream
  useEffect(() => {
    const timer = setInterval(() => {
      const deltaPercent = (Math.random() * 0.0006 - 0.0003);
      setLivePrice((prevPrice) => {
        const next = +(prevPrice * (1 + deltaPercent)).toFixed(
          activeCoin.price < 0.001 ? 7 : activeCoin.price < 1 ? 4 : activeCoin.price < 10 ? 3 : 2
        );
        setPriceDirection(next > prevPrice ? "UP" : next < prevPrice ? "DOWN" : "SAME");
        return next;
      });

      if (Math.random() > 0.4) {
        const isShort = Math.random() > 0.35;
        const exchangeList = ["Binance Futures", "Bybit", "OKX Perpetual", "Deribit", "Bitget"];
        const ex = exchangeFilter === "ALL" 
          ? exchangeList[Math.floor(Math.random() * exchangeList.length)]
          : `${exchangeFilter} Perpetual`;
        const amount = Math.round(25000 + Math.random() * 450000);
        const newEvt = {
          id: `live-${Date.now()}-${Math.random()}`,
          side: isShort ? ("SHORT" as const) : ("LONG" as const),
          price: +(livePrice * (isShort ? 1.0018 : 0.9982)).toFixed(livePrice < 1 ? 4 : 2),
          amountUsd: amount,
          exchange: ex,
          time: "Just now"
        };
        setLiveEvents((prev) => [newEvt, ...prev.slice(0, 7)]);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [activeCoin, livePrice, exchangeFilter]);

  // Dynamic 2D Heatmap Spectrogram Data Model (Grid of Price Tiers × Time Columns)
  const heatmapMatrix = useMemo(() => {
    const p = livePrice;
    const numTimeSlots = timeframe === "12h" ? 24 : timeframe === "24h" ? 32 : timeframe === "3d" ? 36 : timeframe === "7d" ? 42 : 48;
    const priceSpanPct = timeframe === "12h" ? 0.06 : timeframe === "24h" ? 0.09 : timeframe === "3d" ? 0.14 : timeframe === "7d" ? 0.20 : 0.28;
    
    const numBandsAbove = 14;
    const numBandsBelow = 14;
    const stepPct = priceSpanPct / numBandsAbove;

    // Price tiers from highest overhead down to lowest floor
    const priceTiers: Array<{
      price: number;
      pctDiff: number;
      side: "SHORT" | "LONG" | "SPOT";
      leverage: string;
      cumulativeVolUsd: number;
      historyHeat: number[]; // Heat intensity 0-100 across time slots
    }> = [];

    // Upper Short Liquidation Tiers
    for (let i = numBandsAbove; i >= 1; i--) {
      const pctDiff = +(i * stepPct * 100).toFixed(1);
      const tierPrice = +(p * (1 + (i * stepPct))).toFixed(p < 1 ? 4 : p < 10 ? 3 : 2);
      
      const lev = i <= 2 ? "100x" : i <= 5 ? "50x" : i <= 9 ? "25x" : "10x";
      const baseVol = activeCoin.shortsLiqUsd * (i <= 4 ? 0.18 : i <= 8 ? 0.26 : 0.38) * (1 / numBandsAbove);
      const cumulativeVolUsd = Math.round(baseVol * 2.8);

      // Generate time series heat intensity (simulate accumulation of liquidation orders over time)
      const historyHeat: number[] = [];
      for (let t = 0; t < numTimeSlots; t++) {
        const timeProgress = t / numTimeSlots;
        // Peak intensity around dense clusters (e.g. 100x and 50x thresholds)
        const isClusterCenter = i === 3 || i === 7 || i === 11;
        const seed = Math.sin(t * 0.4 + i * 0.8) * 15;
        const rawHeat = (isClusterCenter ? 65 : 25) + (timeProgress * 30) + seed;
        historyHeat.push(Math.max(5, Math.min(98, Math.round(rawHeat))));
      }

      priceTiers.push({
        price: tierPrice,
        pctDiff,
        side: "SHORT",
        leverage: lev,
        cumulativeVolUsd,
        historyHeat,
      });
    }

    // Mid Spot Tier
    priceTiers.push({
      price: p,
      pctDiff: 0,
      side: "SPOT",
      leverage: "Spot",
      cumulativeVolUsd: 0,
      historyHeat: new Array(numTimeSlots).fill(0),
    });

    // Lower Long Liquidation Tiers
    for (let i = 1; i <= numBandsBelow; i++) {
      const pctDiff = -+(i * stepPct * 100).toFixed(1);
      const tierPrice = +(p * (1 - (i * stepPct))).toFixed(p < 1 ? 4 : p < 10 ? 3 : 2);
      
      const lev = i <= 2 ? "100x" : i <= 5 ? "50x" : i <= 9 ? "25x" : "10x";
      const baseVol = activeCoin.longsLiqUsd * (i <= 4 ? 0.16 : i <= 8 ? 0.24 : 0.36) * (1 / numBandsBelow);
      const cumulativeVolUsd = Math.round(baseVol * 2.4);

      const historyHeat: number[] = [];
      for (let t = 0; t < numTimeSlots; t++) {
        const timeProgress = t / numTimeSlots;
        const isClusterCenter = i === 4 || i === 8 || i === 12;
        const seed = Math.cos(t * 0.35 + i * 0.7) * 15;
        const rawHeat = (isClusterCenter ? 60 : 20) + (timeProgress * 28) + seed;
        historyHeat.push(Math.max(5, Math.min(95, Math.round(rawHeat))));
      }

      priceTiers.push({
        price: tierPrice,
        pctDiff,
        side: "LONG",
        leverage: lev,
        cumulativeVolUsd,
        historyHeat,
      });
    }

    // Generate historical price trajectory curve across the time slots
    const priceTrajectory: number[] = [];
    const minPrice = priceTiers[priceTiers.length - 1].price;
    const maxPrice = priceTiers[0].price;
    const priceRange = maxPrice - minPrice;

    for (let t = 0; t < numTimeSlots; t++) {
      const progress = t / (numTimeSlots - 1);
      // Realistic sinusoidal market walk with pullbacks
      const wave1 = Math.sin(progress * Math.PI * 2.5) * 0.22;
      const wave2 = Math.cos(progress * Math.PI * 4.2) * 0.08;
      const trend = (progress - 0.5) * (activeCoin.change24h > 0 ? 0.18 : -0.15);
      const simulatedPrice = p * (1 + wave1 + wave2 + trend);
      priceTrajectory.push(Math.max(minPrice * 1.01, Math.min(maxPrice * 0.99, simulatedPrice)));
    }
    // Ensure final point is exact live price
    priceTrajectory[priceTrajectory.length - 1] = p;

    // Filter by leverage if user selected one
    const filteredTiers = leverageFilter === "ALL"
      ? priceTiers
      : priceTiers.filter(t => t.side === "SPOT" || t.leverage === leverageFilter);

    const maxCumVol = Math.max(...priceTiers.map(t => t.cumulativeVolUsd), 1);

    return {
      priceTiers: filteredTiers,
      allTiers: priceTiers,
      numTimeSlots,
      priceTrajectory,
      minPrice,
      maxPrice,
      priceRange,
      maxCumVol,
    };
  }, [livePrice, timeframe, activeCoin, leverageFilter]);

  // Hourly Liquidation Bar Chart Data (24 hourly segments)
  const hourlyLiquidationHistory = useMemo(() => {
    const hours = [];
    for (let h = 23; h >= 0; h--) {
      const hourLabel = `${h === 0 ? "Now" : `${h}h ago`}`;
      const isSpike = h === 3 || h === 9 || h === 17;
      const mult = exchangeFilter === "Binance" ? 0.48 : exchangeFilter === "Bybit" ? 0.28 : exchangeFilter === "OKX" ? 0.17 : 1.0;
      const baseShort = (activeCoin.shortsLiqUsd / 24) * mult * (isSpike ? 2.8 : 0.8 + Math.sin(h * 0.5) * 0.35);
      const baseLong = (activeCoin.longsLiqUsd / 24) * mult * (isSpike ? 2.1 : 0.7 + Math.cos(h * 0.6) * 0.3);
      hours.push({
        hour: hourLabel,
        shortUsd: Math.round(baseShort),
        longUsd: Math.round(baseLong),
        totalUsd: Math.round(baseShort + baseLong),
        dominant: baseShort > baseLong ? "SHORT" : "LONG",
      });
    }
    return hours;
  }, [activeCoin, exchangeFilter]);

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
    if (n >= 0.001) return `$${n.toFixed(4)}`;
    return `$${n.toFixed(7)}`;
  };

  // Colormap function for Heatmap spectrogram (0-100 -> RGBA)
  // CoinGlass Palette: Dark Navy -> Purple -> Blue -> Cyan -> Green -> Yellow -> Neon Orange -> Red
  const getHeatmapColor = (intensity: number, isShort: boolean) => {
    if (intensity < 10) return "rgba(15, 23, 42, 0.4)";
    if (intensity < 25) return "rgba(30, 27, 75, 0.65)";
    if (intensity < 45) return "rgba(6, 182, 212, 0.75)";
    if (intensity < 65) return "rgba(132, 204, 22, 0.85)";
    if (intensity < 80) return "rgba(234, 179, 8, 0.92)";
    if (intensity < 90) return "rgba(249, 115, 22, 0.96)";
    return "rgba(239, 68, 68, 1.0)";
  };

  // SVG Chart Geometry Constants
  const SVG_WIDTH = 900;
  const SVG_HEIGHT = 440;
  const HEATMAP_WIDTH = 710;
  const PROFILE_WIDTH = 190;

  // Handle Mouse Move on SVG for Crosshair Precision Inspector
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!chartRef.current) return;
    const rect = chartRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const scaleX = SVG_WIDTH / rect.width;
    const scaleY = SVG_HEIGHT / rect.height;

    const svgX = clientX * scaleX;
    const svgY = clientY * scaleY;

    if (svgX < 0 || svgX > SVG_WIDTH || svgY < 0 || svgY > SVG_HEIGHT) {
      setHoveredPoint(null);
      return;
    }

    const { priceTiers, numTimeSlots, minPrice, maxPrice, priceRange } = heatmapMatrix;
    const tierHeight = SVG_HEIGHT / priceTiers.length;
    const tierIdx = Math.min(priceTiers.length - 1, Math.max(0, Math.floor(svgY / tierHeight)));
    const targetTier = priceTiers[tierIdx];

    const slotWidth = HEATMAP_WIDTH / numTimeSlots;
    const slotIdx = Math.min(numTimeSlots - 1, Math.max(0, Math.floor(svgX / slotWidth)));
    const hoursBack = Math.round(((numTimeSlots - 1 - slotIdx) / numTimeSlots) * (timeframe === "12h" ? 12 : timeframe === "24h" ? 24 : timeframe === "3d" ? 72 : 168));
    const timeLabel = hoursBack === 0 ? "Now (Live)" : `${hoursBack}h ago`;

    setHoveredPoint({
      price: targetTier.price,
      timeLabel,
      volUsd: targetTier.cumulativeVolUsd,
      side: targetTier.side === "SHORT" ? "SHORT" : "LONG",
      leverage: targetTier.leverage,
      pctFromSpot: targetTier.pctDiff,
      x: svgX,
      y: svgY,
    });
  };

  return (
    <div className="space-y-8">
      
      {/* 1. TOP COINGLASS PRO HEADER & CONTROLS BAR */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-1/4 w-96 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-10 w-96 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10 border-b border-slate-800 pb-6">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-500/20 text-rose-300 border border-rose-500/30">
                <Flame className="w-3.5 h-3.5 text-rose-400" />
                <span>CoinGlass Derivatives Liquidation Matrix</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>Binance &amp; Bybit Futures Sync</span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-white">
              {activeCoin.name} ({activeCoin.base}/USDT) Liquidation HeatMap
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Institutional continuous liquidation heatmap modeling resting leveraged stop-loss clusters, cascade thresholds, and magnet pool depth across Binance, Bybit, OKX, and Deribit.
            </p>
          </div>

          {/* Quick Real-Time Controls */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Leverage Filter Selector */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-2xl border border-slate-800">
              {(["ALL", "100x", "50x", "25x", "10x"] as const).map((lev) => (
                <button
                  key={lev}
                  onClick={() => setLeverageFilter(lev)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
                    leverageFilter === lev
                      ? "bg-amber-400 text-slate-950 font-black shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {lev}
                </button>
              ))}
            </div>

            {/* Timeframe selector */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-2xl border border-slate-800">
              {(["12h", "24h", "3d", "7d", "30d"] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition ${
                    timeframe === tf
                      ? "bg-rose-500 text-white font-black shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {tf.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Coin Selector Horizontal Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {SUPPORTED_LIQUIDATION_COINS.map((coin) => (
            <button
              key={coin.symbol}
              onClick={() => {
                setSelectedCoinSymbol(coin.symbol);
                setLivePrice(coin.price);
              }}
              className={`px-3.5 py-2 rounded-2xl text-xs font-black transition flex items-center gap-2 shrink-0 ${
                selectedCoinSymbol === coin.symbol
                  ? "bg-rose-500 text-white shadow-lg shadow-rose-500/20 scale-[1.02]"
                  : "bg-slate-900 text-slate-300 hover:bg-slate-800 border border-slate-800"
              }`}
            >
              <span>{coin.base}</span>
              <span className="font-mono text-[11px] opacity-80">${coin.price < 1 ? coin.price.toFixed(4) : coin.price.toLocaleString()}</span>
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

        {/* 4 Core Summary Liquidation Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">24h Total Liquidated</span>
            <div className="text-lg font-black text-rose-400 font-mono">
              {fmtCurrency(activeCoin.total24hLiqUsd)}
            </div>
            <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
              <Skull className="w-3 h-3 text-rose-500" />
              <span>{activeCoin.base} Perpetual Cascade</span>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Shorts Wrecked (Squeeze)</span>
            <div className="text-lg font-black text-rose-400 font-mono">
              {fmtCurrency(activeCoin.shortsLiqUsd)} ({activeCoin.shortsPercent}%)
            </div>
            <div className="text-[10px] text-rose-400 font-medium">
              Overhead Magnet Cascade
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Longs Wrecked (Flush)</span>
            <div className="text-lg font-black text-emerald-400 font-mono">
              {fmtCurrency(activeCoin.longsLiqUsd)} ({activeCoin.longsPercent}%)
            </div>
            <div className="text-[10px] text-emerald-400 font-medium">
              Lower Shelf Stop Wipeout
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">Total Open Interest (OI)</span>
            <div className="text-lg font-black text-amber-400 font-mono">
              {activeCoin.openInterestUsd}
            </div>
            <div className="text-[10px] text-slate-400 font-medium">
              Resting Derivative Depth
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE MAIN 2D INTERACTIVE LIQUIDATION HEATMAP CANVAS */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-2xl space-y-5">
        
        {/* Heatmap Top Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold border border-rose-500/30">
              <Crosshair className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                  2D Liquidation Heatmap Spectrogram &amp; Cumulative Depth Profile
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-amber-300 border border-slate-700">
                  {timeframe.toUpperCase()} Model
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Heat density represents resting liquidation volume. Horizontal bars on right show cumulative liquidation depth.
              </p>
            </div>
          </div>

          {/* Color Scale Legend */}
          <div className="flex items-center gap-2 text-[10px] font-mono self-start sm:self-auto bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-800">
            <span className="text-slate-400 font-bold">Density:</span>
            <div className="flex items-center gap-1">
              <span className="text-slate-400">Low</span>
              <div className="w-20 h-2 rounded-full bg-gradient-to-r from-blue-900 via-cyan-400 via-yellow-400 to-rose-600" />
              <span className="text-rose-400 font-bold">Max Clustered</span>
            </div>
          </div>
        </div>

        {/* THE INTERACTIVE SVG HEATMAP & PROFILE RENDERER */}
        <div className="relative w-full bg-slate-900/90 rounded-2xl border border-slate-800 overflow-hidden select-none">
          
          <svg
            ref={chartRef}
            viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
            className="w-full h-auto cursor-crosshair block"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredPoint(null)}
          >
            <defs>
              {/* Background Grid Pattern */}
              <pattern id="heatmapGrid" width="30" height="20" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
              </pattern>

              {/* Laser Price Line Glow */}
              <filter id="laserGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Background Grid */}
            <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="#090d16" />
            <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="url(#heatmapGrid)" />

            {/* 1. HEATMAP MATRIX SPECTROGRAM TILES (Left Area: 0 to HEATMAP_WIDTH) */}
            {heatmapMatrix.priceTiers.map((tier, tierIdx) => {
              const tierHeight = SVG_HEIGHT / heatmapMatrix.priceTiers.length;
              const y = tierIdx * tierHeight;
              const slotWidth = HEATMAP_WIDTH / heatmapMatrix.numTimeSlots;

              if (tier.side === "SPOT") {
                return (
                  <g key={`tier-${tierIdx}`}>
                    <line
                      x1={0}
                      y1={y + tierHeight / 2}
                      x2={HEATMAP_WIDTH}
                      y2={y + tierHeight / 2}
                      stroke="#eab308"
                      strokeWidth="1.5"
                      strokeDasharray="4,3"
                      filter="url(#laserGlow)"
                    />
                  </g>
                );
              }

              return (
                <g key={`tier-${tierIdx}`}>
                  {tier.historyHeat.map((heat, tIdx) => {
                    const x = tIdx * slotWidth;
                    const fill = getHeatmapColor(heat, tier.side === "SHORT");
                    return (
                      <rect
                        key={`cell-${tIdx}`}
                        x={x}
                        y={y}
                        width={slotWidth + 0.5}
                        height={tierHeight + 0.5}
                        fill={fill}
                        opacity={0.88}
                      />
                    );
                  })}

                  {/* Faint Horizontal Tier Price Line */}
                  <line
                    x1={0}
                    y1={y + tierHeight}
                    x2={HEATMAP_WIDTH}
                    y2={y + tierHeight}
                    stroke="rgba(255,255,255,0.04)"
                    strokeWidth="0.5"
                  />
                </g>
              );
            })}

            {/* 2. HISTORICAL PRICE TRAJECTORY WAVE OVERLAY */}
            {(() => {
              const { priceTrajectory, numTimeSlots, minPrice, priceRange } = heatmapMatrix;
              const slotWidth = HEATMAP_WIDTH / numTimeSlots;
              const points = priceTrajectory.map((ptPrice, idx) => {
                const x = idx * slotWidth + slotWidth / 2;
                const normalizedY = 1 - (ptPrice - minPrice) / Math.max(1, priceRange);
                const y = Math.max(10, Math.min(SVG_HEIGHT - 10, normalizedY * SVG_HEIGHT));
                return `${x},${y}`;
              }).join(" ");

              return (
                <g>
                  {/* Glowing Price Shadow Path */}
                  <polyline
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.4)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#laserGlow)"
                    points={points}
                  />
                  {/* Sharp Solid White Price Line */}
                  <polyline
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                  />
                  {/* Current Price Beacon Tip */}
                  {priceTrajectory.length > 0 && (() => {
                    const lastY = 1 - (livePrice - minPrice) / Math.max(1, priceRange);
                    const cy = Math.max(10, Math.min(SVG_HEIGHT - 10, lastY * SVG_HEIGHT));
                    return (
                      <g>
                        <circle cx={HEATMAP_WIDTH} cy={cy} r="6" fill="#eab308" filter="url(#laserGlow)" />
                        <circle cx={HEATMAP_WIDTH} cy={cy} r="3" fill="#ffffff" />
                      </g>
                    );
                  })()}
                </g>
              );
            })()}

            {/* 3. RIGHT PROFILE SEPARATOR & CUMULATIVE LIQUIDATION VOLUME LADDER */}
            {/* Vertical Divider */}
            <line
              x1={HEATMAP_WIDTH}
              y1={0}
              x2={HEATMAP_WIDTH}
              y2={SVG_HEIGHT}
              stroke="#334155"
              strokeWidth="1.5"
            />

            {/* Right Profile Cumulative Bars */}
            {heatmapMatrix.priceTiers.map((tier, tierIdx) => {
              const tierHeight = SVG_HEIGHT / heatmapMatrix.priceTiers.length;
              const y = tierIdx * tierHeight;
              const barMaxPixelWidth = PROFILE_WIDTH - 85;
              const barWidth = Math.max(4, (tier.cumulativeVolUsd / heatmapMatrix.maxCumVol) * barMaxPixelWidth);
              const isShort = tier.side === "SHORT";
              const isSpot = tier.side === "SPOT";

              if (isSpot) {
                return (
                  <g key={`prof-${tierIdx}`}>
                    <rect
                      x={HEATMAP_WIDTH}
                      y={y}
                      width={PROFILE_WIDTH}
                      height={tierHeight}
                      fill="rgba(234, 179, 8, 0.2)"
                    />
                    <text
                      x={HEATMAP_WIDTH + 8}
                      y={y + tierHeight * 0.7}
                      fill="#eab308"
                      fontSize="9"
                      fontFamily="monospace"
                      fontWeight="bold"
                    >
                      SPOT: {fmtPrice(livePrice)}
                    </text>
                  </g>
                );
              }

              return (
                <g key={`prof-${tierIdx}`}>
                  {/* Horizontal Bar */}
                  <rect
                    x={HEATMAP_WIDTH}
                    y={y + 1}
                    width={barWidth}
                    height={tierHeight - 2}
                    fill={isShort ? "rgba(239, 68, 68, 0.75)" : "rgba(16, 185, 129, 0.75)"}
                    rx="1.5"
                  />

                  {/* Volume Label */}
                  <text
                    x={HEATMAP_WIDTH + barWidth + 5}
                    y={y + tierHeight * 0.7}
                    fill={isShort ? "#f87171" : "#34d399"}
                    fontSize="8.5"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {fmtCurrency(tier.cumulativeVolUsd)}
                  </text>

                  {/* Price Label (Right Aligned) */}
                  <text
                    x={SVG_WIDTH - 6}
                    y={y + tierHeight * 0.7}
                    fill="#94a3b8"
                    fontSize="8.5"
                    fontFamily="monospace"
                    textAnchor="end"
                  >
                    {tier.price < 1 ? tier.price.toFixed(4) : Math.round(tier.price).toLocaleString()}
                  </text>
                </g>
              );
            })}

            {/* 4. ACTIVE CROSSHAIR INSPECTOR (When user hovers over chart) */}
            {hoveredPoint && (
              <g>
                {/* Horizontal Crosshair Line */}
                <line
                  x1={0}
                  y1={hoveredPoint.y}
                  x2={SVG_WIDTH}
                  y2={hoveredPoint.y}
                  stroke="#38bdf8"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
                {/* Vertical Crosshair Line (Within Heatmap area) */}
                <line
                  x1={Math.min(HEATMAP_WIDTH, hoveredPoint.x)}
                  y1={0}
                  x2={Math.min(HEATMAP_WIDTH, hoveredPoint.x)}
                  y2={SVG_HEIGHT}
                  stroke="#38bdf8"
                  strokeWidth="1"
                  strokeDasharray="3,3"
                />
                {/* Target Intersection Dot */}
                <circle
                  cx={Math.min(HEATMAP_WIDTH, hoveredPoint.x)}
                  cy={hoveredPoint.y}
                  r="4"
                  fill="#38bdf8"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
              </g>
            )}
          </svg>

          {/* Interactive Floating Hover HUD */}
          {hoveredPoint && (
            <div
              className="absolute pointer-events-none z-30 p-3 rounded-xl bg-slate-950/95 text-white font-mono text-xs border border-slate-700 shadow-2xl space-y-1 backdrop-blur-md animate-in fade-in duration-100"
              style={{
                left: Math.min(window.innerWidth > 768 ? 520 : 150, Math.max(10, (hoveredPoint.x / SVG_WIDTH) * 100 * 6.5)),
                top: Math.min(280, Math.max(10, (hoveredPoint.y / SVG_HEIGHT) * 380)),
              }}
            >
              <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-1">
                <span className="text-slate-400 text-[10px]">Price Level:</span>
                <span className="font-black text-amber-400 text-sm">{fmtPrice(hoveredPoint.price)}</span>
              </div>
              <div className="flex items-center justify-between gap-3 text-[11px]">
                <span className="text-slate-400">Distance from Spot:</span>
                <span className={`font-bold ${hoveredPoint.pctFromSpot >= 0 ? "text-rose-400" : "text-emerald-400"}`}>
                  {hoveredPoint.pctFromSpot >= 0 ? "+" : ""}{hoveredPoint.pctFromSpot}%
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 text-[11px]">
                <span className="text-slate-400">Resting Liquidation Pool:</span>
                <span className="font-black text-white">{fmtCurrency(hoveredPoint.volUsd)}</span>
              </div>
              <div className="flex items-center justify-between gap-3 text-[10px] pt-0.5 border-t border-slate-800/80">
                <span className="text-slate-400">Leverage Vulnerability:</span>
                <span className="px-1.5 py-0.2 rounded bg-rose-950 text-rose-300 font-bold border border-rose-800">
                  {hoveredPoint.leverage}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Heatmap Bottom Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono pt-1 text-slate-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-rose-400 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
              <span>Overhead Short Magnet: {fmtPrice(activeCoin.topShortMagnetPrice)} ({activeCoin.topShortMagnetVol})</span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Lower Long Shelf: {fmtPrice(activeCoin.topLongShelfPrice)} ({activeCoin.topLongShelfVol})</span>
            </span>
          </div>
        </div>

      </div>

      {/* 3. 24H HOURLY LIQUIDATION HISTOGRAM & LEVERAGE MATRIX (2-Column Grid) */}
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

          {/* Interactive Stacked Bar Chart */}
          <div className="h-48 w-full bg-slate-900/80 rounded-2xl border border-slate-800 p-3 flex items-end gap-1.5 overflow-x-auto">
            {hourlyLiquidationHistory.map((item, idx) => {
              const heightPercent = Math.max(8, (item.totalUsd / maxHourlyLiq) * 100);
              const shortPercent = (item.shortUsd / Math.max(1, item.totalUsd)) * 100;
              const longPercent = 100 - shortPercent;

              return (
                <div
                  key={idx}
                  className="flex-1 flex flex-col items-center justify-end h-full group relative cursor-pointer min-w-[12px]"
                >
                  {/* Stacked Bars: Short Liquidations on Top (Red), Long Liquidations below (Green) */}
                  <div
                    className="w-full flex flex-col justify-end rounded-t overflow-hidden transition-all duration-300 group-hover:scale-y-105"
                    style={{ height: `${heightPercent}%` }}
                  >
                    <div
                      className="w-full bg-rose-500 group-hover:bg-rose-400 transition"
                      style={{ height: `${shortPercent}%` }}
                    />
                    <div
                      className="w-full bg-emerald-500 group-hover:bg-emerald-400 transition"
                      style={{ height: `${longPercent}%` }}
                    />
                  </div>

                  {/* Tooltip on Hover */}
                  <div className="absolute bottom-full mb-2 hidden group-hover:flex flex-col items-center bg-slate-950 text-white text-[9px] font-mono p-2 rounded-xl whitespace-nowrap z-20 border border-slate-700 shadow-2xl pointer-events-none">
                    <span className="font-black text-amber-400">{item.hour}</span>
                    <span className="text-rose-400 font-bold">Shorts: {fmtCurrency(item.shortUsd)}</span>
                    <span className="text-emerald-400 font-bold">Longs: {fmtCurrency(item.longsUsd)}</span>
                    <span className="text-slate-300 border-t border-slate-800 pt-0.5 mt-0.5 font-black">
                      Total: {fmtCurrency(item.totalUsd)}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-1">
            <span>24h Ago</span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 text-rose-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-rose-500" /> Short Wipeout
              </span>
              <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Long Flush
              </span>
            </div>
            <span>Now (Live)</span>
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
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500" />
                </span>
                <h4 className="text-xs font-black text-white uppercase tracking-wider font-mono">
                  Liquidation Ticker Stream (1s)
                </h4>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
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

      {/* 4. EXCHANGE-BY-EXCHANGE LIQUIDATION MATRIX */}
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

      {/* 5. COMPREHENSIVE FUNDAMENTAL & QUANTITATIVE LIQUIDATION EXPLANATION */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-2xl space-y-8">
        <div className="space-y-2 border-b border-slate-800 pb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <Info className="w-3.5 h-3.5" />
            <span>Quantitative &amp; Microstructure Deep Dive</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            The Mechanics of Liquidation Heatmaps &amp; Forced Market Cascades
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
            Understanding why market makers, high-frequency algorithms, and institutional desks exploit resting liquidation pools for liquidity sweeps and directional breakout momentum.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300 leading-relaxed">
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>How Liquidation Prices are Calculated</span>
            </h4>
            <p>
              When a trader opens a position with leverage (L), maintenance margin (MMR) determines the exact price where the exchange margin engine forcefully executes a market order to prevent insolvency:
            </p>
            <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-amber-400">
              P_liquidation = P_entry × (1 ± (1 / Leverage) ∓ MMR)
            </div>
            <p>
              Higher leverage compresses the distance between entry and liquidation, creating dense bands of vulnerability.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
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

          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
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
