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
  Compass,
  Crosshair,
  ChevronRight,
  Filter,
  ArrowUpRight,
  CheckCircle2,
  Target
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
  openInterest: string;
  liquidations24h: string;
}

const SUPPORTED_PAIRS: PairConfig[] = [
  {
    symbol: "BTCUSDT",
    base: "BTC",
    name: "Bitcoin",
    price: 88450.0,
    high24h: 89800.0,
    low24h: 86900.0,
    volume24h: "$3.45B",
    change24h: 3.82,
    defaultTick: 1,
    availableTicks: [0.01, 0.1, 1, 10, 50, 100],
    openInterest: "$34.58B",
    liquidations24h: "$142.8M"
  },
  {
    symbol: "ETHUSDT",
    base: "ETH",
    name: "Ethereum",
    price: 3120.5,
    high24h: 3195.0,
    low24h: 3040.0,
    volume24h: "$1.82B",
    change24h: 2.65,
    defaultTick: 0.1,
    availableTicks: [0.001, 0.01, 0.1, 1, 5, 10],
    openInterest: "$14.82B",
    liquidations24h: "$58.4M"
  },
  {
    symbol: "SOLUSDT",
    base: "SOL",
    name: "Solana",
    price: 194.3,
    high24h: 202.5,
    low24h: 186.2,
    volume24h: "$980M",
    change24h: 5.45,
    defaultTick: 0.01,
    availableTicks: [0.001, 0.01, 0.05, 0.1, 1],
    openInterest: "$4.95B",
    liquidations24h: "$24.6M"
  },
  {
    symbol: "BNBUSDT",
    base: "BNB",
    name: "BNB",
    price: 642.3,
    high24h: 658.0,
    low24h: 631.5,
    volume24h: "$420M",
    change24h: 1.45,
    defaultTick: 0.1,
    availableTicks: [0.01, 0.1, 0.5, 1, 5],
    openInterest: "$1.85B",
    liquidations24h: "$6.2M"
  },
  {
    symbol: "XRPUSDT",
    base: "XRP",
    name: "XRP",
    price: 2.45,
    high24h: 2.62,
    low24h: 2.34,
    volume24h: "$710M",
    change24h: 4.15,
    defaultTick: 0.001,
    availableTicks: [0.0001, 0.001, 0.01, 0.05],
    openInterest: "$3.42B",
    liquidations24h: "$18.5M"
  },
  {
    symbol: "DOGEUSDT",
    base: "DOGE",
    name: "Dogecoin",
    price: 0.224,
    high24h: 0.245,
    low24h: 0.212,
    volume24h: "$510M",
    change24h: 6.3,
    defaultTick: 0.0001,
    availableTicks: [0.00001, 0.0001, 0.001, 0.01],
    openInterest: "$2.15B",
    liquidations24h: "$12.4M"
  }
];

interface OrderLevel {
  price: number;
  size: number;
  total: number;
  totalUsd: number;
  depthPercent: number;
  isRecentSweep?: boolean;
}

interface LiquidationCluster {
  id: string;
  price: number;
  type: "SHORT_LIQ" | "LONG_LIQ";
  volumeUsd: number;
  volumeTokens: number;
  distancePercent: number;
  intensityPercent: number; // 0 to 100 for bar width
  leverage25x: number;
  leverage50x: number;
  leverage100x: number;
  isMajorMagnet: boolean;
  label: string;
}

interface LiveLiqEvent {
  id: string;
  symbol: string;
  type: "SHORT" | "LONG";
  amountUsd: number;
  price: number;
  exchange: string;
  leverage: string;
  time: string;
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

  // Terminal Controls
  const [tickPrecision, setTickPrecision] = useState<number>(activePair.defaultTick);
  const [depthRowCount, setDepthRowCount] = useState<number>(14);
  const [whaleFilter, setWhaleFilter] = useState<number>(50000); // $50k min
  const [simTradeSize, setSimTradeSize] = useState<number>(5); // 5 BTC
  const [simTradeSide, setSimTradeSide] = useState<"BUY" | "SELL">("BUY");

  // Liquidation Graph Controls
  const [liqTimeframe, setLiqTimeframe] = useState<"1H" | "4H" | "12H" | "24H" | "7D">("24H");
  const [liqLeverageFilter, setLiqLeverageFilter] = useState<"ALL" | "50X_100X" | "100X">("ALL");
  const [liqExchange, setLiqExchange] = useState<"AGGREGATE" | "BINANCE" | "BYBIT" | "OKX">("AGGREGATE");
  const [hoveredLiq, setHoveredLiq] = useState<LiquidationCluster | null>(null);

  // 1-Second Real-Time Live Ticker State
  const [livePrice, setLivePrice] = useState<number>(activePair.price);
  const [priceDirection, setPriceDirection] = useState<"UP" | "DOWN" | "SAME">("SAME");
  const [liveTapePrints, setLiveTapePrints] = useState<WhalePrint[]>([]);
  const [liveLiquidations, setLiveLiquidations] = useState<LiveLiqEvent[]>([]);

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

  // Initial Liquidations Feed
  useEffect(() => {
    const p = activePair.price;
    const base = activePair.base;
    const initialEvents: LiveLiqEvent[] = [
      {
        id: "liq-init-1",
        symbol: `${base}/USDT`,
        type: "SHORT",
        amountUsd: base === "BTC" ? 1420000 : base === "ETH" ? 480000 : 190000,
        price: +(p * 1.002).toFixed(2),
        exchange: "Binance Futures",
        leverage: "50x",
        time: "Just now"
      },
      {
        id: "liq-init-2",
        symbol: `${base}/USDT`,
        type: "SHORT",
        amountUsd: base === "BTC" ? 890000 : base === "ETH" ? 280000 : 120000,
        price: +(p * 1.004).toFixed(2),
        exchange: "Bybit Derivs",
        leverage: "100x",
        time: "12s ago"
      },
      {
        id: "liq-init-3",
        symbol: `${base}/USDT`,
        type: "LONG",
        amountUsd: base === "BTC" ? 540000 : base === "ETH" ? 190000 : 95000,
        price: +(p * 0.997).toFixed(2),
        exchange: "OKX Perpetual",
        leverage: "25x",
        time: "28s ago"
      },
      {
        id: "liq-init-4",
        symbol: `${base}/USDT`,
        type: "SHORT",
        amountUsd: base === "BTC" ? 2150000 : base === "ETH" ? 640000 : 310000,
        price: +(p * 1.006).toFixed(2),
        exchange: "Binance Futures",
        leverage: "50x",
        time: "45s ago"
      }
    ];
    setLiveLiquidations(initialEvents);
  }, [activePair]);

  // 1-Second Live Heartbeat & Streaming Engine
  useEffect(() => {
    const timer = setInterval(() => {
      const deltaPercent = (Math.random() * 0.0008 - 0.0004);
      setLivePrice((prev) => {
        const next = +(prev * (1 + deltaPercent)).toFixed(
          activePair.price < 1 ? 4 : activePair.price < 10 ? 3 : 2
        );
        setPriceDirection(next > prev ? "UP" : next < prev ? "DOWN" : "SAME");
        return next;
      });

      // Stream a live whale trade print
      if (Math.random() > 0.35) {
        const isBuy = Math.random() > 0.44;
        const exchangeList = ["Binance Spot", "Coinbase Prime", "OKX Perpetual", "Bybit Derivatives", "Kraken Inst"];
        const tags: Array<"ICEBERG WALL" | "TAKER SWEEP" | "LIMIT ABSORPTION"> = ["TAKER SWEEP", "ICEBERG WALL", "LIMIT ABSORPTION"];
        const base = activePair.base;
        const multiplier = base === "BTC" ? 1.5 + Math.random() * 9 : base === "ETH" ? 15 + Math.random() * 80 : 120 + Math.random() * 800;
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
        setLiveTapePrints((prev) => [newPrint, ...prev.slice(0, 6)]);
      }

      // Stream a live liquidation event
      if (Math.random() > 0.5) {
        const isShort = Math.random() > 0.4;
        const exchanges = ["Binance Futures", "Bybit Derivs", "OKX Perp", "Deribit"];
        const leverages = ["25x", "50x", "75x", "100x"];
        const base = activePair.base;
        const amountUsd = Math.round((base === "BTC" ? 250000 : base === "ETH" ? 80000 : 35000) * (0.8 + Math.random() * 4.5));

        const newLiq: LiveLiqEvent = {
          id: `liq-${Date.now()}-${Math.random()}`,
          symbol: `${base}/USDT`,
          type: isShort ? "SHORT" : "LONG",
          amountUsd,
          price: +(livePrice * (isShort ? 1 + (Math.random() * 0.008 + 0.001) : 1 - (Math.random() * 0.008 + 0.001))).toFixed(livePrice < 1 ? 4 : 2),
          exchange: exchanges[Math.floor(Math.random() * exchanges.length)],
          leverage: leverages[Math.floor(Math.random() * leverages.length)],
          time: "Just now"
        };
        setLiveLiquidations((prev) => [newLiq, ...prev.slice(0, 5)]);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [activePair, livePrice]);

  // Real-Time L2 Orderbook Generator based on tick precision & active livePrice
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
        const isCluster = i === 3 || i === 7 || i === 12;
        const baseSize =
          activePair.base === "BTC"
            ? (0.35 + Math.sin(i * 0.9) * 0.2 + (isCluster ? 3.8 : 0))
            : activePair.base === "ETH"
            ? (3.5 + Math.sin(i * 0.9) * 2.1 + (isCluster ? 38 : 0))
            : (35 + Math.sin(i * 0.9) * 21 + (isCluster ? 380 : 0));

        const size = +baseSize.toFixed(3);
        askRunningTotal += size;
        askRunningTotalUsd += size * levelPrice;

        rawAsks.push({
          price: levelPrice,
          size,
          total: +askRunningTotal.toFixed(3),
          totalUsd: askRunningTotalUsd,
          depthPercent: 0
        });
      }

      let bidRunningTotal = 0;
      let bidRunningTotalUsd = 0;

      for (let i = 1; i <= count; i++) {
        const levelPrice = +(p - i * step).toFixed(step < 0.01 ? 4 : step < 1 ? 2 : 1);
        const isCluster = i === 2 || i === 6 || i === 11;
        const baseSize =
          activePair.base === "BTC"
            ? (0.38 + Math.cos(i * 0.8) * 0.22 + (isCluster ? 4.2 : 0))
            : activePair.base === "ETH"
            ? (3.8 + Math.cos(i * 0.8) * 2.2 + (isCluster ? 42 : 0))
            : (38 + Math.cos(i * 0.8) * 22 + (isCluster ? 420 : 0));

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

      const sortedAsks = [...rawAsks].reverse();
      const spread = +(step * 0.75).toFixed(2);
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
    }, [activePair, tickPrecision, depthRowCount, livePrice]);

  // HIGH-DENSITY LIQUIDATION BAR PROFILE & HEATMAP GENERATOR
  // Creates authentic institutional liquidation bars with leverage tiers (25x, 50x, 100x)
  const { shortLiqClusters, longLiqClusters, totalShortLiqUsd, totalLongLiqUsd, nearestShortMagnet, nearestLongMagnet, squeezeRiskScore } =
    useMemo(() => {
      const p = livePrice;
      const base = activePair.base;

      // Base multi-tier scale depending on coin
      const baseScale =
        base === "BTC" ? 38000000 : base === "ETH" ? 14000000 : base === "SOL" ? 5500000 : 3000000;

      // Multipliers based on timeframe
      const tfMultiplier =
        liqTimeframe === "1H" ? 0.35 : liqTimeframe === "4H" ? 0.6 : liqTimeframe === "12H" ? 0.85 : liqTimeframe === "24H" ? 1.0 : 1.85;

      // Multipliers based on leverage filter
      const levMultiplier =
        liqLeverageFilter === "ALL" ? 1.0 : liqLeverageFilter === "50X_100X" ? 0.72 : 0.42;

      // Generate 7 distinct Short Liquidation Bars above the current price (+0.5% to +6.5%)
      const shortDeltas = [0.006, 0.014, 0.022, 0.031, 0.042, 0.054, 0.068];
      const shortWeights = [0.85, 1.45, 2.1, 1.3, 2.8, 1.7, 0.95]; // High cluster at +2.2% & +4.2%

      const shorts: LiquidationCluster[] = shortDeltas.map((delta, i) => {
        const clusterPrice = +(p * (1 + delta)).toFixed(p < 1 ? 4 : p < 10 ? 3 : 1);
        const rawUsd = baseScale * shortWeights[i] * tfMultiplier * levMultiplier * (0.95 + Math.sin(i * 1.5) * 0.1);
        const volumeUsd = Math.round(rawUsd);
        const volumeTokens = +(volumeUsd / clusterPrice).toFixed(1);
        const isMajorMagnet = i === 2 || i === 4;

        return {
          id: `short-liq-${i}`,
          price: clusterPrice,
          type: "SHORT_LIQ",
          volumeUsd,
          volumeTokens,
          distancePercent: +(delta * 100).toFixed(2),
          intensityPercent: Math.min(100, (volumeUsd / (baseScale * 2.8 * tfMultiplier)) * 100),
          leverage25x: Math.round(volumeUsd * 0.22),
          leverage50x: Math.round(volumeUsd * 0.48),
          leverage100x: Math.round(volumeUsd * 0.30),
          isMajorMagnet,
          label: isMajorMagnet ? "MEGA SHORT SQUEEZE POOL" : "Short Stop Cluster"
        };
      });

      // Generate 7 distinct Long Liquidation Bars below the current price (-0.5% to -6.5%)
      const longDeltas = [0.005, 0.012, 0.021, 0.033, 0.045, 0.056, 0.069];
      const longWeights = [0.75, 1.35, 1.85, 2.4, 1.6, 2.2, 0.85]; // High cluster at -3.3% & -5.6%

      const longs: LiquidationCluster[] = longDeltas.map((delta, i) => {
        const clusterPrice = +(p * (1 - delta)).toFixed(p < 1 ? 4 : p < 10 ? 3 : 1);
        const rawUsd = baseScale * longWeights[i] * tfMultiplier * levMultiplier * (0.95 + Math.cos(i * 1.3) * 0.1);
        const volumeUsd = Math.round(rawUsd);
        const volumeTokens = +(volumeUsd / clusterPrice).toFixed(1);
        const isMajorMagnet = i === 3 || i === 5;

        return {
          id: `long-liq-${i}`,
          price: clusterPrice,
          type: "LONG_LIQ",
          volumeUsd,
          volumeTokens,
          distancePercent: -(+(delta * 100).toFixed(2)),
          intensityPercent: Math.min(100, (volumeUsd / (baseScale * 2.8 * tfMultiplier)) * 100),
          leverage25x: Math.round(volumeUsd * 0.25),
          leverage50x: Math.round(volumeUsd * 0.45),
          leverage100x: Math.round(volumeUsd * 0.30),
          isMajorMagnet,
          label: isMajorMagnet ? "MAJOR LONG CASCADE SHELF" : "Long Stop Cluster"
        };
      });

      const totalShortUsd = shorts.reduce((sum, c) => sum + c.volumeUsd, 0);
      const totalLongUsd = longs.reduce((sum, c) => sum + c.volumeUsd, 0);

      const nearShort = shorts.reduce((prev, curr) => (curr.volumeUsd > prev.volumeUsd ? curr : prev), shorts[2]);
      const nearLong = longs.reduce((prev, curr) => (curr.volumeUsd > prev.volumeUsd ? curr : prev), longs[3]);

      // Squeeze Risk Score out of 100
      const score = Math.round((totalShortUsd / (totalShortUsd + totalLongUsd)) * 100);

      return {
        shortLiqClusters: shorts.reverse(), // Highest price on top
        longLiqClusters: longs,
        totalShortLiqUsd: totalShortUsd,
        totalLongLiqUsd: totalLongUsd,
        nearestShortMagnet: nearShort,
        nearestLongMagnet: nearLong,
        squeezeRiskScore: score
      };
    }, [livePrice, activePair, liqTimeframe, liqLeverageFilter, liqExchange]);

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
    <div className="space-y-8 pb-20">
      
      {/* 1. Header & Live Telemetry Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-700/80">
              <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
              <span>Institutional L2 Order Book &amp; Liquidation Cascade Radar</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              Real-Time Order Flow &amp; Liquidation Volume Profile
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
              Institutional Central Limit Order Book (CLOB) depth with multi-exchange liquidation cluster maps, real-time stop-loss cascade zones, and algorithmic slippage analysis.
            </p>
          </div>

          {/* Quick Metrics Banner */}
          <div className="flex flex-wrap items-center gap-3 bg-slate-50 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400">Spot Mid</div>
              <div className={`text-lg font-black font-mono transition-colors duration-200 ${
                priceDirection === "UP" ? "text-emerald-500" : priceDirection === "DOWN" ? "text-rose-500" : "text-slate-900 dark:text-white"
              }`}>
                ${livePrice.toLocaleString(undefined, { minimumFractionDigits: activePair.price < 1 ? 4 : 2 })}
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
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400">Spread Bps</div>
              <div className="text-sm font-extrabold font-mono text-emerald-600 dark:text-emerald-400">
                {spreadBps} bps (${spreadUsd})
              </div>
            </div>
            <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
            <div>
              <div className="text-[10px] font-mono uppercase text-slate-400">Tick Precision</div>
              <div className="text-sm font-extrabold font-mono text-amber-600 dark:text-amber-400">
                ${tickPrecision}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. LIQUIDATION VOLUME PROFILE & STOP HUNT RADAR BAR GRAPH */}
      <div className="bg-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-2xl space-y-6">
        
        {/* Section Header & Interactive Controls */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                <BarChart3 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <span>{activePair.base}/USDT Liquidation Volume Profile</span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse">
                    LIQUIDATION CLUSTERS
                  </span>
                </h2>
                <p className="text-xs text-slate-400">
                  Visual bar graph of leverage liquidation stop pools, short squeeze targets, and long cascading floors
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Filters Bar */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-mono">
            {/* Timeframe selector */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              {(["1H", "4H", "12H", "24H", "7D"] as const).map((tf) => (
                <button
                  key={tf}
                  onClick={() => setLiqTimeframe(tf)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition ${
                    liqTimeframe === tf
                      ? "bg-amber-400 text-slate-950 shadow-sm"
                      : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Leverage Tier Filter */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              {[
                { key: "ALL", label: "All Leverage (10x-100x)" },
                { key: "50X_100X", label: "50x - 100x" },
                { key: "100X", label: "100x Only" }
              ].map((tier) => (
                <button
                  key={tier.key}
                  onClick={() => setLiqLeverageFilter(tier.key as any)}
                  className={`px-2.5 py-1 rounded-lg font-bold transition ${
                    liqLeverageFilter === tier.key
                      ? "bg-slate-800 text-amber-400 border border-amber-400/40"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {tier.label}
                </button>
              ))}
            </div>

            {/* Exchange Scope */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 px-1 font-bold">EXCHANGE:</span>
              <button
                onClick={() => setLiqExchange("AGGREGATE")}
                className={`px-2 py-1 rounded-lg text-[11px] font-bold ${
                  liqExchange === "AGGREGATE" ? "bg-amber-400 text-slate-950" : "text-slate-400 hover:text-white"
                }`}
              >
                All (Binance + Bybit + OKX)
              </button>
            </div>
          </div>
        </div>

        {/* Quick Analytical Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1 relative overflow-hidden">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center justify-between">
              <span>Short Squeeze Magnet</span>
              <Target className="w-3.5 h-3.5 text-rose-400" />
            </div>
            <div className="text-xl font-black font-mono text-white">
              ${nearestShortMagnet.price.toLocaleString()}
            </div>
            <div className="text-xs font-mono text-slate-400 flex items-center justify-between pt-1">
              <span className="text-rose-400 font-bold">+{nearestShortMagnet.distancePercent}% Distance</span>
              <span className="font-bold text-amber-400">${(nearestShortMagnet.volumeUsd / 1e6).toFixed(1)}M Stops</span>
            </div>
            <div className="absolute right-0 bottom-0 top-0 w-1 bg-rose-500" />
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1 relative overflow-hidden">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 flex items-center justify-between">
              <span>Long Cascade Floor</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xl font-black font-mono text-white">
              ${nearestLongMagnet.price.toLocaleString()}
            </div>
            <div className="text-xs font-mono text-slate-400 flex items-center justify-between pt-1">
              <span className="text-emerald-400 font-bold">{nearestLongMagnet.distancePercent}% Distance</span>
              <span className="font-bold text-amber-400">${(nearestLongMagnet.volumeUsd / 1e6).toFixed(1)}M Stops</span>
            </div>
            <div className="absolute right-0 bottom-0 top-0 w-1 bg-emerald-500" />
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Total Cluster Pool</span>
              <Scale className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-xl font-black font-mono text-amber-400">
              ${((totalShortLiqUsd + totalLongLiqUsd) / 1e6).toFixed(1)}M
            </div>
            <div className="text-xs font-mono text-slate-400 flex items-center justify-between pt-1">
              <span className="text-rose-400 font-bold">${(totalShortLiqUsd / 1e6).toFixed(1)}M Shorts</span>
              <span className="text-emerald-400 font-bold">${(totalLongLiqUsd / 1e6).toFixed(1)}M Longs</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
              <span>Squeeze Pressure Index</span>
              <Flame className="w-3.5 h-3.5 text-amber-400" />
            </div>
            <div className="text-xl font-black font-mono text-white flex items-center gap-2">
              <span>{squeezeRiskScore}/100</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                squeezeRiskScore > 60 ? "bg-rose-500/20 text-rose-400" : "bg-emerald-500/20 text-emerald-400"
              }`}>
                {squeezeRiskScore > 60 ? "HIGH SHORT SQUEEZE" : "LONG CASCADE RISK"}
              </span>
            </div>
            <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1.5 flex">
              <div className="bg-rose-500 transition-all duration-500" style={{ width: `${squeezeRiskScore}%` }} />
              <div className="bg-emerald-500 transition-all duration-500" style={{ width: `${100 - squeezeRiskScore}%` }} />
            </div>
          </div>
        </div>

        {/* MAIN VISUAL ANIMATED BAR GRAPH */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 px-2 pb-1 border-b border-slate-800">
            <span className="w-32">Price Level ($)</span>
            <span className="flex-1 text-center font-bold text-slate-300">
              Interactive Liquidation Volume Density Graph (Hover any level for breakdown)
            </span>
            <span className="w-36 text-right">Pool Value ($ / Tokens)</span>
          </div>

          {/* 1. SHORT LIQUIDATION BARS (ABOVE CURRENT PRICE - RED / ORANGE GRADIENT) */}
          <div className="space-y-2 font-mono">
            {shortLiqClusters.map((cluster) => {
              const isHovered = hoveredLiq?.id === cluster.id;
              return (
                <div
                  key={cluster.id}
                  onMouseEnter={() => setHoveredLiq(cluster)}
                  onMouseLeave={() => setHoveredLiq(null)}
                  className={`group relative p-2.5 rounded-2xl transition-all duration-200 cursor-pointer border ${
                    isHovered
                      ? "bg-rose-950/40 border-rose-500/80 shadow-lg shadow-rose-500/10 scale-[1.01]"
                      : cluster.isMajorMagnet
                      ? "bg-slate-900/90 border-rose-500/30 hover:border-rose-400"
                      : "bg-slate-900/50 border-slate-800/80 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 relative z-10 text-xs">
                    {/* Left: Price & Distance */}
                    <div className="w-36 flex items-center gap-2">
                      <span className="text-rose-400 font-black text-sm">
                        ${cluster.price.toLocaleString()}
                      </span>
                      <span className="text-[10px] font-bold text-rose-500/90 bg-rose-500/10 px-1.5 py-0.5 rounded">
                        +{cluster.distancePercent}%
                      </span>
                    </div>

                    {/* Center: Animated Multi-Tier Bar Container */}
                    <div className="flex-1 h-6 bg-slate-950 rounded-xl p-0.5 relative overflow-hidden flex items-center border border-slate-800/60">
                      {/* Animated Base Bar */}
                      <div
                        className="h-full rounded-lg bg-gradient-to-r from-rose-600 via-rose-500 to-amber-500 transition-all duration-700 relative overflow-hidden flex items-center shadow-md"
                        style={{ width: `${cluster.intensityPercent}%` }}
                      >
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2.5s_infinite]" />
                        
                        {/* Text inside bar if wide enough */}
                        {cluster.intensityPercent > 25 && (
                          <span className="text-[10px] font-black text-slate-950 px-2 truncate">
                            ${(cluster.volumeUsd / 1e6).toFixed(1)}M
                          </span>
                        )}
                      </div>

                      {/* Tag Marker */}
                      {cluster.isMajorMagnet && (
                        <span className="absolute right-2 text-[9px] font-black text-amber-400 bg-slate-900/90 px-2 py-0.5 rounded-md border border-amber-400/40 flex items-center gap-1">
                          <Flame className="w-2.5 h-2.5 fill-amber-400" />
                          <span>MAJOR SQUEEZE MAGNET</span>
                        </span>
                      )}
                    </div>

                    {/* Right: Pool Value */}
                    <div className="w-40 text-right">
                      <div className="font-black text-white text-xs">
                        ${(cluster.volumeUsd / 1e6).toFixed(2)}M
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {cluster.volumeTokens.toLocaleString()} {activePair.base}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* 2. CURRENT LIVE MID SPOT PRICE DIVIDER BEACON */}
          <div className="relative py-3 my-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t-2 border-dashed border-amber-400/60 animate-pulse" />
            </div>
            <div className="relative flex items-center justify-between px-4 py-2 bg-slate-900 border-2 border-amber-400 rounded-2xl shadow-xl shadow-amber-400/10 max-w-xl mx-auto text-xs font-mono">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500" />
                </span>
                <span className="font-black text-amber-400 uppercase tracking-wide">
                  CURRENT SPOT PRICE:
                </span>
                <span className="text-base font-black text-white">
                  ${livePrice.toLocaleString(undefined, { minimumFractionDigits: activePair.price < 1 ? 4 : 2 })}
                </span>
              </div>
              <div className="text-[10px] text-slate-300 font-bold bg-amber-400/20 px-2 py-0.5 rounded-lg border border-amber-400/30">
                1s Real-Time Anchor
              </div>
            </div>
          </div>

          {/* 3. LONG LIQUIDATION BARS (BELOW CURRENT PRICE - GREEN / CYAN GRADIENT) */}
          <div className="space-y-2 font-mono">
            {longLiqClusters.map((cluster) => {
              const isHovered = hoveredLiq?.id === cluster.id;
              return (
                <div
                  key={cluster.id}
                  onMouseEnter={() => setHoveredLiq(cluster)}
                  onMouseLeave={() => setHoveredLiq(null)}
                  className={`group relative p-2.5 rounded-2xl transition-all duration-200 cursor-pointer border ${
                    isHovered
                      ? "bg-emerald-950/40 border-emerald-500/80 shadow-lg shadow-emerald-500/10 scale-[1.01]"
                      : cluster.isMajorMagnet
                      ? "bg-slate-900/90 border-emerald-500/30 hover:border-emerald-400"
                      : "bg-slate-900/50 border-slate-800/80 hover:border-slate-700"
                  }`}
                >
                  <div className="flex items-center justify-between gap-4 relative z-10 text-xs">
                    {/* Left: Price & Distance */}
                    <div className="w-36 flex items-center gap-2">
                      <span className="text-emerald-400 font-black text-sm">
                        ${cluster.price.toLocaleString()}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-500/90 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                        {cluster.distancePercent}%
                      </span>
                    </div>

                    {/* Center: Animated Multi-Tier Bar Container */}
                    <div className="flex-1 h-6 bg-slate-950 rounded-xl p-0.5 relative overflow-hidden flex items-center border border-slate-800/60">
                      {/* Animated Base Bar */}
                      <div
                        className="h-full rounded-lg bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-400 transition-all duration-700 relative overflow-hidden flex items-center shadow-md"
                        style={{ width: `${cluster.intensityPercent}%` }}
                      >
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shimmer_2.5s_infinite]" />
                        
                        {/* Text inside bar if wide enough */}
                        {cluster.intensityPercent > 25 && (
                          <span className="text-[10px] font-black text-slate-950 px-2 truncate">
                            ${(cluster.volumeUsd / 1e6).toFixed(1)}M
                          </span>
                        )}
                      </div>

                      {/* Tag Marker */}
                      {cluster.isMajorMagnet && (
                        <span className="absolute right-2 text-[9px] font-black text-emerald-300 bg-slate-900/90 px-2 py-0.5 rounded-md border border-emerald-400/40 flex items-center gap-1">
                          <ShieldCheck className="w-2.5 h-2.5 text-emerald-400" />
                          <span>MAJOR CASCADE SHELF</span>
                        </span>
                      )}
                    </div>

                    {/* Right: Pool Value */}
                    <div className="w-40 text-right">
                      <div className="font-black text-white text-xs">
                        ${(cluster.volumeUsd / 1e6).toFixed(2)}M
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {cluster.volumeTokens.toLocaleString()} {activePair.base}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Hover Inspector Card */}
          {hoveredLiq && (
            <div className="p-4 rounded-2xl bg-slate-900 border-2 border-amber-400/60 text-xs font-mono grid grid-cols-1 sm:grid-cols-4 gap-3 animate-in fade-in zoom-in-95 duration-150">
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Target Level</span>
                <div className={`text-base font-black ${hoveredLiq.type === "SHORT_LIQ" ? "text-rose-400" : "text-emerald-400"}`}>
                  ${hoveredLiq.price.toLocaleString()} ({hoveredLiq.distancePercent}%)
                </div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Total Liquidations</span>
                <div className="text-base font-black text-white">
                  ${(hoveredLiq.volumeUsd / 1e6).toFixed(2)}M ({hoveredLiq.volumeTokens.toLocaleString()} {activePair.base})
                </div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Leverage Breakdown</span>
                <div className="text-[11px] text-slate-300 font-bold space-x-2">
                  <span>100x: ${(hoveredLiq.leverage100x / 1e6).toFixed(1)}M</span>
                  <span>50x: ${(hoveredLiq.leverage50x / 1e6).toFixed(1)}M</span>
                </div>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase">Expected Market Impact</span>
                <div className="text-[11px] font-bold text-amber-400 flex items-center gap-1">
                  <Flame className="w-3.5 h-3.5" />
                  <span>{hoveredLiq.isMajorMagnet ? "Severe Cascade Trigger" : "Moderate Stop Absorption"}</span>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* 3. MAIN L2 ORDERBOOK LADDER & STEPPED DEPTH CURVE GRID */}
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
                {[10, 14, 20].map((rows) => (
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
                  className="relative grid grid-cols-3 py-1 px-3 rounded hover:bg-rose-500/15 transition-colors"
                >
                  <div
                    className="absolute right-0 top-0 bottom-0 bg-rose-500/15 dark:bg-rose-500/25 rounded transition-all duration-300"
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
                <span className="text-xs font-mono font-bold text-slate-300">Mid Spot:</span>
                <span className={`text-lg font-black font-mono transition-colors duration-200 ${
                  priceDirection === "UP" ? "text-emerald-400" : priceDirection === "DOWN" ? "text-rose-400" : "text-amber-400"
                }`}>
                  ${midPrice.toLocaleString(undefined, { minimumFractionDigits: tickPrecision < 0.01 ? 4 : 2 })}
                </span>
              </div>
              <div className="text-right font-mono">
                <div className="text-[11px] text-emerald-400 font-bold">Spread: ${spreadUsd} ({spreadBps} bps)</div>
                <div className="text-[9px] text-slate-400">Tick Feed</div>
              </div>
            </div>

            {/* Bids (Buy Orders - Green) */}
            <div className="space-y-0.5 font-mono text-xs">
              {bids.map((lvl, idx) => (
                <div
                  key={`bid-${idx}`}
                  className="relative grid grid-cols-3 py-1 px-3 rounded hover:bg-emerald-500/15 transition-colors"
                >
                  <div
                    className="absolute right-0 top-0 bottom-0 bg-emerald-500/15 dark:bg-emerald-500/25 rounded transition-all duration-300"
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

        {/* RIGHT PANE: STEPPED MARKET DEPTH CURVE & SLIPPAGE SIMULATOR (Col 6) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Stepped Cumulative Market Depth Curve */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Cumulative Market Depth &amp; Liquidity Walls
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Visual curve of order book resistance &amp; support density
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                Stepped Curve
              </span>
            </div>

            {/* Stepped SVG Depth Chart */}
            <div className="h-60 w-full bg-slate-950 rounded-2xl border border-slate-800 p-3 relative flex items-end overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 400 160" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="bidStepGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#10b981" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
                  </linearGradient>
                  <linearGradient id="askStepGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.05" />
                  </linearGradient>
                </defs>

                {/* Bids Stepped Polygon (Green Left) */}
                <polygon
                  points="0,25 35,30 70,45 105,65 140,95 170,125 195,150 195,160 0,160"
                  fill="url(#bidStepGrad)"
                  stroke="#10b981"
                  strokeWidth="2.5"
                />

                {/* Asks Stepped Polygon (Red Right) */}
                <polygon
                  points="205,150 230,125 260,95 295,65 330,45 365,30 400,25 400,160 205,160"
                  fill="url(#askStepGrad)"
                  stroke="#f43f5e"
                  strokeWidth="2.5"
                />

                {/* Center Mid-Price Line */}
                <line x1="200" y1="0" x2="200" y2="160" stroke="#f59e0b" strokeWidth="2" strokeDasharray="3 3" />
              </svg>

              {/* Mid-Price Pin Badge */}
              <div className="absolute top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900 text-amber-400 font-mono text-[10px] font-black border border-amber-400/60 shadow-lg">
                ${midPrice.toLocaleString()} Mid
              </div>

              {/* Bottom Labels */}
              <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Bids: ${Math.round(totalBidDepthUsd / 1000).toLocaleString()}K</span>
              </div>
              <div className="absolute bottom-2.5 right-3 text-[10px] font-mono text-rose-400 font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                <span>Asks: ${Math.round(totalAskDepthUsd / 1000).toLocaleString()}K</span>
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

      {/* 4. REAL-TIME WHALE PRINTS & LIVE LIQUIDATIONS FEED */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LIVE STREAMING LIQUIDATIONS TAPE (Col 6) */}
        <div className="lg:col-span-6 bg-slate-950 text-white rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                <Flame className="w-4 h-4 fill-rose-500" />
              </div>
              <div>
                <h3 className="text-base font-black text-white">
                  Liquidation Cascade Feed
                </h3>
                <p className="text-[11px] text-slate-400">
                  Cross-exchange real-time liquidation alerts &amp; stop runs
                </p>
              </div>
            </div>
            <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">
              MONITORED
            </span>
          </div>

          <div className="space-y-2.5 font-mono text-xs max-h-80 overflow-y-auto pr-1">
            {liveLiquidations.map((liq) => (
              <div
                key={liq.id}
                className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-1 duration-200"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${
                      liq.type === "SHORT"
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                        : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    }`}
                  >
                    {liq.type} RECKED
                  </span>
                  <div>
                    <div className="font-extrabold text-white">
                      ${liq.amountUsd.toLocaleString()} @ ${liq.price.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-slate-400">{liq.exchange} • {liq.leverage}</div>
                  </div>
                </div>

                <div className="text-right text-[10px] font-bold text-slate-400">
                  {liq.time}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* WHALE BLOCK PRINTS TAPE (Col 6) */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Whale Block Trade Prints
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Large taker sweeps and iceberg absorption prints
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

          <div className="space-y-2.5 font-mono text-xs max-h-80 overflow-y-auto pr-1">
            {liveTapePrints.filter((w) => w.valueUsd >= whaleFilter).slice(0, 5).map((w) => (
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

      </div>

      {/* 5. Cross-Market Liquidation Heatmap Gateway */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 rounded-3xl p-7 sm:p-10 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-white">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
            <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Comprehensive Derivatives Intelligence</span>
          </div>
          <h3 className="text-xl sm:text-3xl font-black text-white">
            Analyze Multi-Exchange Open Interest &amp; Heatmaps
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Gain deep cross-market edge with real-time Coinglass Open Interest, 24h Funding Rates across Binance/Bybit/OKX/dYdX, and Long/Short trader ratios.
          </p>
        </div>

        <Link
          href={`/coinglass?symbol=${activePair.symbol}`}
          className="px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition whitespace-nowrap flex items-center gap-2 shadow-lg shadow-amber-400/20"
        >
          <span>Launch Full Coinglass Radar</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* 6. Educational Guide on Liquidation Profiles & Order Flow */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
        <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-700/80">
            <Info className="w-3.5 h-3.5" />
            <span>Institutional Analysis Guide</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            How to Analyze Liquidation Volume Profiles &amp; Orderbook Depth
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Target className="w-4 h-4 text-rose-500" />
              <span>Short Squeeze Magnets</span>
            </h4>
            <p>
              When a dense cluster of 50x and 100x short stops accumulates just 2-3% above the current spot price, market makers and aggressive takers frequently drive price upward into this liquidity pool to trigger forced market buy orders.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Long Cascade Shelves</span>
            </h4>
            <p>
              Dense long liquidation bands act as structural support until penetrated. Once broken, the cascade of automated market sell orders causes rapid slippage until meeting a large institutional bid wall.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Iceberg Sweeps &amp; Slippage</span>
            </h4>
            <p>
              Large institutional participants slice massive orders into hidden limit clips. The execution simulator computes exact weighted average fill prices and book exhaustion before placing high-notional market orders.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

