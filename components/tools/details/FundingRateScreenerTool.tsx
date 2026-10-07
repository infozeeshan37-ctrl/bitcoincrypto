"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import Link from "next/link";
import {
  Percent,
  Clock,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Zap,
  Flame,
  ShieldCheck,
  Calculator,
  ArrowRight,
  Info,
  DollarSign,
  Layers,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Compass,
  Radio,
  BarChart3,
  Scale,
  Sliders,
  Maximize2,
  Minimize2,
  HelpCircle,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  BookOpen,
  LineChart,
  Cpu,
  Target,
  Gauge
} from "lucide-react";

interface FundingCoin {
  symbol: string;
  base: string;
  name: string;
  price: number;
  change24h: number;
  rateBinance: number; // 8h rate in % e.g. 0.0105
  rateBybit: number;
  rateOKX: number;
  rateDYDX: number;
  rateDeribit: number;
  rateBitget: number;
  openInterestUsd: number;
  predictedNextRate: number;
  sentiment: "EXTREME_BULL" | "MODERATE_BULL" | "NEUTRAL" | "SHORT_SQUEEZE_DISCOUNT";
  squeezeProbability: number; // 0 - 100%
  historicalData: {
    time: string;
    price: number;
    rate: number;
    cumulativeYield: number;
  }[];
}

const INITIAL_FUNDING_COINS: FundingCoin[] = [
  {
    symbol: "BTCUSDT",
    base: "BTC",
    name: "Bitcoin",
    price: 88450.0,
    change24h: 3.12,
    rateBinance: 0.0092,
    rateBybit: 0.0088,
    rateOKX: 0.0095,
    rateDYDX: 0.0080,
    rateDeribit: 0.0078,
    rateBitget: 0.0090,
    openInterestUsd: 34500000000,
    predictedNextRate: 0.0098,
    sentiment: "MODERATE_BULL",
    squeezeProbability: 24,
    historicalData: [
      { time: "Day -14", price: 82100, rate: 0.0045, cumulativeYield: 0.04 },
      { time: "Day -12", price: 83400, rate: 0.0062, cumulativeYield: 0.12 },
      { time: "Day -10", price: 84200, rate: 0.0078, cumulativeYield: 0.22 },
      { time: "Day -8", price: 83900, rate: 0.0055, cumulativeYield: 0.29 },
      { time: "Day -6", price: 85600, rate: 0.0085, cumulativeYield: 0.40 },
      { time: "Day -4", price: 87100, rate: 0.0110, cumulativeYield: 0.54 },
      { time: "Day -2", price: 86800, rate: 0.0088, cumulativeYield: 0.65 },
      { time: "Today", price: 88450, rate: 0.0092, cumulativeYield: 0.77 }
    ]
  },
  {
    symbol: "ETHUSDT",
    base: "ETH",
    name: "Ethereum",
    price: 3120.5,
    change24h: 2.45,
    rateBinance: 0.0084,
    rateBybit: 0.0081,
    rateOKX: 0.0089,
    rateDYDX: 0.0075,
    rateDeribit: 0.0072,
    rateBitget: 0.0083,
    openInterestUsd: 14800000000,
    predictedNextRate: 0.0088,
    sentiment: "MODERATE_BULL",
    squeezeProbability: 32,
    historicalData: [
      { time: "Day -14", price: 2950, rate: 0.0035, cumulativeYield: 0.03 },
      { time: "Day -12", price: 3010, rate: 0.0052, cumulativeYield: 0.10 },
      { time: "Day -10", price: 3080, rate: 0.0068, cumulativeYield: 0.18 },
      { time: "Day -8", price: 3040, rate: 0.0049, cumulativeYield: 0.25 },
      { time: "Day -6", price: 3100, rate: 0.0075, cumulativeYield: 0.35 },
      { time: "Day -4", price: 3160, rate: 0.0095, cumulativeYield: 0.48 },
      { time: "Day -2", price: 3090, rate: 0.0078, cumulativeYield: 0.58 },
      { time: "Today", price: 3120, rate: 0.0084, cumulativeYield: 0.69 }
    ]
  },
  {
    symbol: "SOLUSDT",
    base: "SOL",
    name: "Solana",
    price: 194.3,
    change24h: 5.68,
    rateBinance: 0.0162,
    rateBybit: 0.0155,
    rateOKX: 0.0168,
    rateDYDX: 0.0145,
    rateDeribit: 0.0140,
    rateBitget: 0.0160,
    openInterestUsd: 4950000000,
    predictedNextRate: 0.0175,
    sentiment: "EXTREME_BULL",
    squeezeProbability: 18,
    historicalData: [
      { time: "Day -14", price: 168, rate: 0.0070, cumulativeYield: 0.07 },
      { time: "Day -12", price: 174, rate: 0.0095, cumulativeYield: 0.19 },
      { time: "Day -10", price: 182, rate: 0.0125, cumulativeYield: 0.36 },
      { time: "Day -8", price: 178, rate: 0.0100, cumulativeYield: 0.49 },
      { time: "Day -6", price: 186, rate: 0.0140, cumulativeYield: 0.68 },
      { time: "Day -4", price: 192, rate: 0.0180, cumulativeYield: 0.92 },
      { time: "Day -2", price: 189, rate: 0.0150, cumulativeYield: 1.12 },
      { time: "Today", price: 194.3, rate: 0.0162, cumulativeYield: 1.34 }
    ]
  },
  {
    symbol: "PEPEUSDT",
    base: "PEPE",
    name: "Pepe",
    price: 0.0000185,
    change24h: 9.85,
    rateBinance: 0.0245,
    rateBybit: 0.0230,
    rateOKX: 0.0260,
    rateDYDX: 0.0210,
    rateDeribit: 0.0195,
    rateBitget: 0.0240,
    openInterestUsd: 850000000,
    predictedNextRate: 0.0280,
    sentiment: "EXTREME_BULL",
    squeezeProbability: 12,
    historicalData: [
      { time: "Day -14", price: 0.0000130, rate: 0.0110, cumulativeYield: 0.12 },
      { time: "Day -12", price: 0.0000142, rate: 0.0150, cumulativeYield: 0.31 },
      { time: "Day -10", price: 0.0000160, rate: 0.0210, cumulativeYield: 0.58 },
      { time: "Day -8", price: 0.0000155, rate: 0.0180, cumulativeYield: 0.82 },
      { time: "Day -6", price: 0.0000170, rate: 0.0220, cumulativeYield: 1.11 },
      { time: "Day -4", price: 0.0000188, rate: 0.0270, cumulativeYield: 1.48 },
      { time: "Day -2", price: 0.0000179, rate: 0.0230, cumulativeYield: 1.79 },
      { time: "Today", price: 0.0000185, rate: 0.0245, cumulativeYield: 2.12 }
    ]
  },
  {
    symbol: "XRPUSDT",
    base: "XRP",
    name: "XRP",
    price: 2.45,
    change24h: -1.20,
    rateBinance: -0.0045,
    rateBybit: -0.0050,
    rateOKX: -0.0040,
    rateDYDX: -0.0055,
    rateDeribit: -0.0060,
    rateBitget: -0.0042,
    openInterestUsd: 3420000000,
    predictedNextRate: -0.0065,
    sentiment: "SHORT_SQUEEZE_DISCOUNT",
    squeezeProbability: 88,
    historicalData: [
      { time: "Day -14", price: 2.65, rate: 0.0080, cumulativeYield: 0.08 },
      { time: "Day -12", price: 2.58, rate: 0.0040, cumulativeYield: 0.13 },
      { time: "Day -10", price: 2.52, rate: 0.0010, cumulativeYield: 0.14 },
      { time: "Day -8", price: 2.48, rate: -0.0020, cumulativeYield: 0.12 },
      { time: "Day -6", price: 2.42, rate: -0.0045, cumulativeYield: 0.06 },
      { time: "Day -4", price: 2.39, rate: -0.0070, cumulativeYield: -0.03 },
      { time: "Day -2", price: 2.43, rate: -0.0050, cumulativeYield: -0.10 },
      { time: "Today", price: 2.45, rate: -0.0045, cumulativeYield: -0.16 }
    ]
  },
  {
    symbol: "DOGEUSDT",
    base: "DOGE",
    name: "Dogecoin",
    price: 0.224,
    change24h: 4.15,
    rateBinance: 0.0135,
    rateBybit: 0.0128,
    rateOKX: 0.0140,
    rateDYDX: 0.0120,
    rateDeribit: 0.0115,
    rateBitget: 0.0132,
    openInterestUsd: 2150000000,
    predictedNextRate: 0.0142,
    sentiment: "EXTREME_BULL",
    squeezeProbability: 22,
    historicalData: [
      { time: "Day -14", price: 0.185, rate: 0.0065, cumulativeYield: 0.07 },
      { time: "Day -12", price: 0.198, rate: 0.0090, cumulativeYield: 0.18 },
      { time: "Day -10", price: 0.210, rate: 0.0120, cumulativeYield: 0.34 },
      { time: "Day -8", price: 0.205, rate: 0.0095, cumulativeYield: 0.47 },
      { time: "Day -6", price: 0.215, rate: 0.0130, cumulativeYield: 0.64 },
      { time: "Day -4", price: 0.228, rate: 0.0160, cumulativeYield: 0.86 },
      { time: "Day -2", price: 0.219, rate: 0.0125, cumulativeYield: 1.03 },
      { time: "Today", price: 0.224, rate: 0.0135, cumulativeYield: 1.21 }
    ]
  },
  {
    symbol: "SUIUSDT",
    base: "SUI",
    name: "Sui",
    price: 3.42,
    change24h: 8.40,
    rateBinance: 0.0185,
    rateBybit: 0.0178,
    rateOKX: 0.0192,
    rateDYDX: 0.0165,
    rateDeribit: 0.0155,
    rateBitget: 0.0180,
    openInterestUsd: 1250000000,
    predictedNextRate: 0.0210,
    sentiment: "EXTREME_BULL",
    squeezeProbability: 15,
    historicalData: [
      { time: "Day -14", price: 2.75, rate: 0.0080, cumulativeYield: 0.08 },
      { time: "Day -12", price: 2.90, rate: 0.0115, cumulativeYield: 0.23 },
      { time: "Day -10", price: 3.10, rate: 0.0150, cumulativeYield: 0.43 },
      { time: "Day -8", price: 3.05, rate: 0.0125, cumulativeYield: 0.60 },
      { time: "Day -6", price: 3.22, rate: 0.0170, cumulativeYield: 0.83 },
      { time: "Day -4", price: 3.38, rate: 0.0210, cumulativeYield: 1.11 },
      { time: "Day -2", price: 3.30, rate: 0.0165, cumulativeYield: 1.33 },
      { time: "Today", price: 3.42, rate: 0.0185, cumulativeYield: 1.58 }
    ]
  },
  {
    symbol: "BNBUSDT",
    base: "BNB",
    name: "BNB",
    price: 642.3,
    change24h: 1.05,
    rateBinance: 0.0065,
    rateBybit: 0.0062,
    rateOKX: 0.0068,
    rateDYDX: 0.0058,
    rateDeribit: 0.0055,
    rateBitget: 0.0064,
    openInterestUsd: 1850000000,
    predictedNextRate: 0.0070,
    sentiment: "NEUTRAL",
    squeezeProbability: 38,
    historicalData: [
      { time: "Day -14", price: 610, rate: 0.0040, cumulativeYield: 0.04 },
      { time: "Day -12", price: 620, rate: 0.0050, cumulativeYield: 0.10 },
      { time: "Day -10", price: 635, rate: 0.0065, cumulativeYield: 0.19 },
      { time: "Day -8", price: 628, rate: 0.0055, cumulativeYield: 0.26 },
      { time: "Day -6", price: 638, rate: 0.0070, cumulativeYield: 0.35 },
      { time: "Day -4", price: 645, rate: 0.0080, cumulativeYield: 0.46 },
      { time: "Day -2", price: 640, rate: 0.0060, cumulativeYield: 0.54 },
      { time: "Today", price: 642.3, rate: 0.0065, cumulativeYield: 0.63 }
    ]
  },
  {
    symbol: "ADAUSDT",
    base: "ADA",
    name: "Cardano",
    price: 0.88,
    change24h: -2.30,
    rateBinance: -0.0028,
    rateBybit: -0.0032,
    rateOKX: -0.0025,
    rateDYDX: -0.0035,
    rateDeribit: -0.0040,
    rateBitget: -0.0029,
    openInterestUsd: 920000000,
    predictedNextRate: -0.0040,
    sentiment: "SHORT_SQUEEZE_DISCOUNT",
    squeezeProbability: 76,
    historicalData: [
      { time: "Day -14", price: 0.96, rate: 0.0060, cumulativeYield: 0.06 },
      { time: "Day -12", price: 0.93, rate: 0.0030, cumulativeYield: 0.10 },
      { time: "Day -10", price: 0.91, rate: 0.0010, cumulativeYield: 0.11 },
      { time: "Day -8", price: 0.89, rate: -0.0015, cumulativeYield: 0.09 },
      { time: "Day -6", price: 0.87, rate: -0.0030, cumulativeYield: 0.05 },
      { time: "Day -4", price: 0.86, rate: -0.0045, cumulativeYield: -0.01 },
      { time: "Day -2", price: 0.89, rate: -0.0020, cumulativeYield: -0.04 },
      { time: "Today", price: 0.88, rate: -0.0028, cumulativeYield: -0.08 }
    ]
  },
  {
    symbol: "AVAXUSDT",
    base: "AVAX",
    name: "Avalanche",
    price: 38.5,
    change24h: 3.80,
    rateBinance: 0.0095,
    rateBybit: 0.0091,
    rateOKX: 0.0098,
    rateDYDX: 0.0085,
    rateDeribit: 0.0080,
    rateBitget: 0.0093,
    openInterestUsd: 780000000,
    predictedNextRate: 0.0102,
    sentiment: "MODERATE_BULL",
    squeezeProbability: 28,
    historicalData: [
      { time: "Day -14", price: 33.5, rate: 0.0050, cumulativeYield: 0.05 },
      { time: "Day -12", price: 35.0, rate: 0.0070, cumulativeYield: 0.14 },
      { time: "Day -10", price: 36.8, rate: 0.0095, cumulativeYield: 0.27 },
      { time: "Day -8", price: 36.0, rate: 0.0075, cumulativeYield: 0.37 },
      { time: "Day -6", price: 37.2, rate: 0.0105, cumulativeYield: 0.51 },
      { time: "Day -4", price: 38.9, rate: 0.0130, cumulativeYield: 0.68 },
      { time: "Day -2", price: 37.8, rate: 0.0090, cumulativeYield: 0.80 },
      { time: "Today", price: 38.5, rate: 0.0095, cumulativeYield: 0.93 }
    ]
  },
  {
    symbol: "LINKUSDT",
    base: "LINK",
    name: "Chainlink",
    price: 18.2,
    change24h: 2.10,
    rateBinance: 0.0082,
    rateBybit: 0.0079,
    rateOKX: 0.0086,
    rateDYDX: 0.0072,
    rateDeribit: 0.0070,
    rateBitget: 0.0080,
    openInterestUsd: 640000000,
    predictedNextRate: 0.0088,
    sentiment: "MODERATE_BULL",
    squeezeProbability: 35,
    historicalData: [
      { time: "Day -14", price: 16.2, rate: 0.0040, cumulativeYield: 0.04 },
      { time: "Day -12", price: 16.9, rate: 0.0060, cumulativeYield: 0.12 },
      { time: "Day -10", price: 17.5, rate: 0.0080, cumulativeYield: 0.23 },
      { time: "Day -8", price: 17.1, rate: 0.0065, cumulativeYield: 0.32 },
      { time: "Day -6", price: 17.8, rate: 0.0090, cumulativeYield: 0.44 },
      { time: "Day -4", price: 18.5, rate: 0.0110, cumulativeYield: 0.59 },
      { time: "Day -2", price: 18.0, rate: 0.0075, cumulativeYield: 0.69 },
      { time: "Today", price: 18.2, rate: 0.0082, cumulativeYield: 0.80 }
    ]
  },
  {
    symbol: "KASUSDT",
    base: "KAS",
    name: "Kaspa",
    price: 0.165,
    change24h: 6.20,
    rateBinance: 0.0145,
    rateBybit: 0.0138,
    rateOKX: 0.0150,
    rateDYDX: 0.0125,
    rateDeribit: 0.0120,
    rateBitget: 0.0140,
    openInterestUsd: 210000000,
    predictedNextRate: 0.0160,
    sentiment: "EXTREME_BULL",
    squeezeProbability: 20,
    historicalData: [
      { time: "Day -14", price: 0.142, rate: 0.0070, cumulativeYield: 0.07 },
      { time: "Day -12", price: 0.148, rate: 0.0095, cumulativeYield: 0.20 },
      { time: "Day -10", price: 0.156, rate: 0.0125, cumulativeYield: 0.37 },
      { time: "Day -8", price: 0.152, rate: 0.0100, cumulativeYield: 0.50 },
      { time: "Day -6", price: 0.160, rate: 0.0140, cumulativeYield: 0.69 },
      { time: "Day -4", price: 0.168, rate: 0.0180, cumulativeYield: 0.93 },
      { time: "Day -2", price: 0.162, rate: 0.0130, cumulativeYield: 1.10 },
      { time: "Today", price: 0.165, rate: 0.0145, cumulativeYield: 1.29 }
    ]
  }
];

export default function FundingRateScreenerTool() {
  const [fundingData, setFundingData] = useState<FundingCoin[]>(INITIAL_FUNDING_COINS);
  const [activeTab, setActiveTab] = useState<"SCREENER" | "CHARTS" | "ARBITRAGE" | "SQUEEZE" | "MASTERCLASS">("SCREENER");
  const [selectedCoin, setSelectedCoin] = useState<FundingCoin>(INITIAL_FUNDING_COINS[0]);
  const [filterMode, setFilterMode] = useState<"ALL" | "POSITIVE" | "NEGATIVE" | "EXTREME" | "ARBITRAGE_SPREAD">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortField, setSortField] = useState<"rate" | "apy" | "oi" | "price" | "change">("rate");
  const [sortAsc, setSortAsc] = useState(false);

  // Timeframe for Historical Interactive Graph
  const [chartTimeframe, setChartTimeframe] = useState<"24H" | "7D" | "30D" | "90D" | "1Y">("30D");
  const [hoveredPoint, setHoveredPoint] = useState<{
    time: string;
    price: number;
    rate: number;
    cumulativeYield: number;
    x: number;
    y: number;
  } | null>(null);

  // Arbitrage Calculator State
  const [arbitrageCapital, setArbitrageCapital] = useState<number>(25000);
  const [leverageTier, setLeverageTier] = useState<number>(1);
  const [makerFeePct, setMakerFeePct] = useState<number>(0.02); // 0.02% maker
  const [rebalanceThreshold, setRebalanceThreshold] = useState<number>(5); // 5% price drift
  const [compoundingFreq, setCompoundingFreq] = useState<"8H" | "DAILY" | "WEEKLY">("8H");

  // Live 8-Hour Settlement Countdown (00:00, 08:00, 16:00 UTC)
  const [countdownStr, setCountdownStr] = useState<string>("03:14:22");
  const [secondsToSettlement, setSecondsToSettlement] = useState<number>(11662);
  const [liveTickCount, setLiveTickCount] = useState<number>(0);
  const [lastSyncTime, setLastSyncTime] = useState<string>("");

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const utcHours = now.getUTCHours();
      const nextEpochHour = Math.ceil((utcHours + 0.0001) / 8) * 8;
      const targetTime = new Date(now);
      targetTime.setUTCHours(nextEpochHour, 0, 0, 0);
      if (nextEpochHour === 24) {
        targetTime.setUTCDate(targetTime.getUTCDate() + 1);
        targetTime.setUTCHours(0, 0, 0, 0);
      }

      const diffSec = Math.max(0, Math.floor((targetTime.getTime() - now.getTime()) / 1000));
      setSecondsToSettlement(diffSec);

      const h = Math.floor(diffSec / 3600);
      const m = Math.floor((diffSec % 3600) / 60);
      const s = diffSec % 60;
      setCountdownStr(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Live WebSocket Micro-Fluctuation Engine (Real-time Ticker Simulation)
  useEffect(() => {
    const jitterInterval = setInterval(() => {
      setFundingData((prev) =>
        prev.map((item) => {
          const delta = (Math.random() - 0.5) * 0.0003;
          const newBinance = parseFloat(Math.max(-0.06, Math.min(0.08, item.rateBinance + delta)).toFixed(4));
          const priceJitter = item.price * (1 + (Math.random() - 0.495) * 0.001);
          return {
            ...item,
            price: parseFloat(priceJitter.toFixed(item.price < 1 ? 5 : 2)),
            rateBinance: newBinance,
            rateBybit: parseFloat((newBinance - 0.0003 + Math.random() * 0.0006).toFixed(4)),
            rateOKX: parseFloat((newBinance + 0.0004 + Math.random() * 0.0005).toFixed(4)),
            rateDYDX: parseFloat((newBinance - 0.0005 + Math.random() * 0.0004).toFixed(4)),
            rateDeribit: parseFloat((newBinance - 0.0006 + Math.random() * 0.0004).toFixed(4)),
            rateBitget: parseFloat((newBinance + 0.0002 + Math.random() * 0.0005).toFixed(4)),
          };
        })
      );
      setLiveTickCount((c) => c + 1);
      setLastSyncTime(new Date().toLocaleTimeString());
    }, 2800);

    return () => clearInterval(jitterInterval);
  }, []);

  // Synchronize selected coin with live updates
  useEffect(() => {
    const updated = fundingData.find((c) => c.symbol === selectedCoin.symbol);
    if (updated) {
      setSelectedCoin(updated);
    }
  }, [fundingData, selectedCoin.symbol]);

  // Filter and Sort coins
  const filteredCoins = useMemo(() => {
    return fundingData
      .filter((coin) => {
        const matchesSearch =
          coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          coin.base.toLowerCase().includes(searchQuery.toLowerCase()) ||
          coin.symbol.toLowerCase().includes(searchQuery.toLowerCase());

        if (!matchesSearch) return false;

        if (filterMode === "POSITIVE") return coin.rateBinance > 0.005;
        if (filterMode === "NEGATIVE") return coin.rateBinance < 0;
        if (filterMode === "EXTREME") return Math.abs(coin.rateBinance) >= 0.015;
        if (filterMode === "ARBITRAGE_SPREAD") {
          const maxRate = Math.max(coin.rateBinance, coin.rateBybit, coin.rateOKX, coin.rateDYDX);
          const minRate = Math.min(coin.rateBinance, coin.rateBybit, coin.rateOKX, coin.rateDYDX);
          return maxRate - minRate >= 0.002;
        }
        return true;
      })
      .sort((a, b) => {
        let valA = 0;
        let valB = 0;
        if (sortField === "rate") {
          valA = a.rateBinance;
          valB = b.rateBinance;
        } else if (sortField === "apy") {
          valA = a.rateBinance * 3 * 365;
          valB = b.rateBinance * 3 * 365;
        } else if (sortField === "oi") {
          valA = a.openInterestUsd;
          valB = b.openInterestUsd;
        } else if (sortField === "price") {
          valA = a.price;
          valB = b.price;
        } else if (sortField === "change") {
          valA = a.change24h;
          valB = b.change24h;
        }
        return sortAsc ? valA - valB : valB - valA;
      });
  }, [fundingData, searchQuery, filterMode, sortField, sortAsc]);

  // Arbitrage Mathematical Computations
  const avgRate8h = (selectedCoin.rateBinance + selectedCoin.rateBybit + selectedCoin.rateOKX) / 3;
  const dailyRate = avgRate8h * 3;
  const rawAnnualizedApy = dailyRate * 365;
  // Compounded APY = (1 + r)^1095 - 1
  const compoundedApy = (Math.pow(1 + avgRate8h / 100, 1095) - 1) * 100;

  // Trading Fee calculations
  const totalTradingCapital = arbitrageCapital * leverageTier;
  const entryFeeTotal = (totalTradingCapital * (makerFeePct / 100)) * 2; // Spot buy + Perp short
  const grossDailyYieldUsd = totalTradingCapital * (dailyRate / 100);
  const netDailyYieldUsd = Math.max(0, grossDailyYieldUsd);
  const netMonthlyYieldUsd = grossDailyYieldUsd * 30 - entryFeeTotal * 0.1;
  const netYearlyYieldUsd = grossDailyYieldUsd * 365 - entryFeeTotal;

  // Squeeze and Risk lists
  const shortSqueezeCandidates = useMemo(() => {
    return [...fundingData]
      .filter((c) => c.rateBinance < 0 || c.squeezeProbability > 50)
      .sort((a, b) => b.squeezeProbability - a.squeezeProbability);
  }, [fundingData]);

  const overheatedLongRisks = useMemo(() => {
    return [...fundingData]
      .filter((c) => c.rateBinance >= 0.015)
      .sort((a, b) => b.rateBinance - a.rateBinance);
  }, [fundingData]);

  // FAQ Content
  const faqs = [
    {
      q: "What are crypto perpetual funding rates and why do they exist?",
      a: "Unlike traditional calendar futures contracts which expire on a set date (e.g., quarterly settlement), crypto perpetual contracts (Perps) never expire. To ensure the perpetual contract price stays pegged to the underlying spot index price, exchanges execute an automatic peer-to-peer cash transfer known as the Funding Rate every 8 hours (00:00, 08:00, 16:00 UTC). When perps trade at a premium to spot, longs pay shorts (positive rate). When perps trade at a discount, shorts pay longs (negative rate)."
    },
    {
      q: "How does the Delta-Neutral Cash-and-Carry Basis Arbitrage strategy generate risk-free yield?",
      a: "In a positive funding environment, an institutional trader buys $50,000 worth of spot Bitcoin and simultaneously opens a $50,000 1x short perpetual futures contract on Binance or OKX. Because the long spot position (+1 delta) perfectly offsets the short futures position (-1 delta), the total portfolio market delta is exactly 0. The trader is 100% immune to Bitcoin price crashes or rallies, while passively collecting the 8-hour funding fee payments. This generates annualized yields between 12% and 35%+ with zero directional drawdown risk."
    },
    {
      q: "What does an extreme positive or negative funding rate indicate for market direction?",
      a: "Funding rates act as a high-fidelity barometer of market leverage and psychological sentiment:\n• Extreme Positive (> +0.03% / 8h, or > 32% APY): Indicates over-leveraged bullish euphoria. Retail longs are paying exorbitant premiums, creating prime conditions for a long liquidation cascade or 'long flush'.\n• Extreme Negative (< -0.015% / 8h): Indicates aggressive retail panic shorting. When shorts pay longs, market makers often orchestrate a violent 'short squeeze' to liquidate overleveraged bears."
    },
    {
      q: "How are perpetual funding rates mathematically calculated across major exchanges?",
      a: "Most major tier-1 exchanges (Binance, Bybit, OKX, Deribit) utilize a two-part formula:\n1. Interest Rate Component (Fixed baseline at ~0.01% per 8h or 0.03% daily).\n2. Premium Index (P), derived from the TWAP (Time-Weighted Average Price) difference between the Impact Bid/Ask and the underlying Spot Index Price:\nFunding Rate = Clamp(Premium Index + Clamp(Interest Rate - Premium Index, -0.05%, +0.05%), Min_Clamp, Max_Clamp).\nThis formula prevents flash spikes while ensuring perpetual prices closely track real spot liquidity."
    },
    {
      q: "What is Cross-Exchange Funding Rate Spread Arbitrage?",
      a: "Cross-exchange spread arbitrage exploits discrepancies between different exchanges for the same asset. For example, if Bybit has a funding rate of +0.025% on SOL while OKX has +0.008%, a trader can Short SOL on Bybit (collecting +0.025%) and Long SOL on OKX (paying only 0.008%), netting a risk-free +0.017% spread per 8-hour epoch (~18.6% annualized APY) without holding any underlying spot collateral."
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* 1. TOP HERO COMMAND DECK */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white rounded-3xl p-6 sm:p-8 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                  <Percent className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  CoinGlass Perpetual Funding Rate Screener &amp; Radar
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <Radio className="w-3 h-3 text-emerald-400 animate-ping" />
                  Live 8-Hour Settlement Engine Active
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono text-slate-400 bg-slate-900/80 border border-slate-700">
                  <RefreshCw className="w-3 h-3 animate-spin text-cyan-400" />
                  Tick #{liveTickCount} • {lastSyncTime || "Syncing"}
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
                Live Perpetual Funding Rates &amp; <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-cyan-400 via-emerald-300 to-amber-300 bg-clip-text text-transparent">
                  Basis Spread Arbitrage Terminal
                </span>
              </h1>

              <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
                Scan real-time 8-hour funding rates across Binance, Bybit, OKX, dYdX, Deribit, and Bitget. Analyze multi-cycle historical rate charts, calculate delta-neutral cash-and-carry basis yields, and front-run impending short squeeze cascades.
              </p>
            </div>

            {/* Countdown & Settlement Clock */}
            <div className="p-5 rounded-2xl bg-slate-900/95 border border-cyan-500/40 space-y-3 shrink-0 lg:w-84 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between text-xs text-slate-300 font-mono font-bold">
                <span className="flex items-center gap-1.5 text-cyan-400">
                  <Clock className="w-4 h-4" /> Next Funding Settlement
                </span>
                <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800/60">
                  00:00 / 08:00 / 16:00 UTC
                </span>
              </div>

              <div className="text-3xl sm:text-4xl font-black text-cyan-400 font-mono tracking-tight flex items-baseline gap-2">
                <span>{countdownStr}</span>
                <span className="text-xs text-slate-400 font-normal">Remaining</span>
              </div>

              <div className="space-y-1">
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-400 transition-all duration-1000 shadow-xs shadow-cyan-400/80"
                    style={{ width: `${((28800 - secondsToSettlement) / 28800) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>Epoch Start</span>
                  <span className="text-cyan-300 font-bold">{(((28800 - secondsToSettlement) / 28800) * 100).toFixed(1)}% elapsed</span>
                  <span>Settlement</span>
                </div>
              </div>

              <div className="text-[10px] text-slate-400 font-mono text-center pt-1 border-t border-slate-800">
                Settling across 14,200+ active crypto perpetual contracts
              </div>
            </div>
          </div>

          {/* Quick Metrics KPI Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 shadow-inner">
              <div className="text-slate-400 text-[10px] uppercase tracking-wider">Market Weighted Avg</div>
              <div className="text-base font-black text-emerald-400 flex items-center gap-1 mt-0.5">
                <TrendingUp className="w-4 h-4" />
                +0.0108% / 8h
              </div>
              <div className="text-[10px] text-slate-400 font-bold">~11.82% Annualized APY</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 shadow-inner">
              <div className="text-slate-400 text-[10px] uppercase tracking-wider">Top Bullish Overheat</div>
              <div className="text-base font-black text-amber-400 flex items-center gap-1 mt-0.5">
                <Flame className="w-4 h-4 text-amber-400" />
                PEPE (+0.0245%)
              </div>
              <div className="text-[10px] text-amber-300 font-bold">Longs Overleveraged (26.8% APY)</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 shadow-inner">
              <div className="text-slate-400 text-[10px] uppercase tracking-wider">Prime Short Squeeze Target</div>
              <div className="text-base font-black text-purple-400 flex items-center gap-1 mt-0.5">
                <Zap className="w-4 h-4 text-purple-400" />
                XRP (-0.0045%)
              </div>
              <div className="text-[10px] text-purple-300 font-bold">88% Short Squeeze Probability</div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 shadow-inner">
              <div className="text-slate-400 text-[10px] uppercase tracking-wider">Total Derivatives OI</div>
              <div className="text-base font-black text-white flex items-center gap-1 mt-0.5">
                <Activity className="w-4 h-4 text-cyan-400" />
                $68.45 Billion
              </div>
              <div className="text-[10px] text-emerald-400 font-bold">+3.4% 24h Expansion</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. TAB CONTROLS NAVIGATION */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800">
        {[
          { id: "SCREENER", label: "Live Screener & Matrix", icon: BarChart3, badge: "LIVE" },
          { id: "CHARTS", label: "Historical Dual-Axis Charts", icon: LineChart, badge: "PRO" },
          { id: "ARBITRAGE", label: "Delta-Neutral Basis Calculator", icon: Calculator, badge: "ZERO-RISK" },
          { id: "SQUEEZE", label: "Short Squeeze & Cascade Radar", icon: Zap, badge: "ALERTS" },
          { id: "MASTERCLASS", label: "Quantitative Playbook & Math", icon: BookOpen, badge: "GUIDE" }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-mono text-xs font-bold transition-all shrink-0 ${
                isActive
                  ? "bg-cyan-500 text-slate-950 font-black shadow-lg shadow-cyan-500/25 scale-[1.02]"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-slate-950" : "text-cyan-500"}`} />
              <span>{tab.label}</span>
              <span className={`text-[9px] font-black px-1.5 py-0.2 rounded-md ${
                isActive
                  ? "bg-slate-950 text-cyan-300"
                  : "bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20"
              }`}>
                {tab.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* 3. TAB 1: LIVE SCREENER & MATRIX */}
      {activeTab === "SCREENER" && (
        <div className="space-y-6">
          {/* Controls & Filter Deck */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              {/* Search input */}
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by coin name or symbol (e.g. BTC, ETH, SOL, PEPE)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-xs focus:outline-none focus:border-cyan-500 transition"
                />
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {[
                  { id: "ALL", label: "All Pairs (12+)" },
                  { id: "POSITIVE", label: "Longs Pay (>0)" },
                  { id: "NEGATIVE", label: "Shorts Pay (<0)" },
                  { id: "EXTREME", label: "Extreme Anomaly" },
                  { id: "ARBITRAGE_SPREAD", label: "Spread Arbitrage (Δ>0.002%)" }
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setFilterMode(f.id as any)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition whitespace-nowrap ${
                      filterMode === f.id
                        ? "bg-slate-900 dark:bg-cyan-500 text-white dark:text-slate-950 font-black shadow-sm"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Helper Banner */}
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400 px-1 pt-1 border-t border-slate-100 dark:border-slate-800">
              <span className="flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5 text-cyan-500" />
                Click any coin row to load full historical dual-axis graphs &amp; arbitrage models.
              </span>
              <span className="text-cyan-600 dark:text-cyan-400 font-bold">
                Showing {filteredCoins.length} filtered assets
              </span>
            </div>
          </div>

          {/* Screener Table */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px] tracking-wider">
                    <th className="pb-3 cursor-pointer hover:text-cyan-400" onClick={() => { setSortField("price"); setSortAsc(!sortAsc); }}>
                      Asset / Perp Pair
                    </th>
                    <th className="pb-3 text-right cursor-pointer hover:text-cyan-400" onClick={() => { setSortField("price"); setSortAsc(!sortAsc); }}>
                      Mark Price
                    </th>
                    <th className="pb-3 text-right cursor-pointer hover:text-cyan-400" onClick={() => { setSortField("change"); setSortAsc(!sortAsc); }}>
                      24h Chg
                    </th>
                    <th className="pb-3 text-center cursor-pointer hover:text-cyan-400" onClick={() => { setSortField("rate"); setSortAsc(!sortAsc); }}>
                      Binance (8h)
                    </th>
                    <th className="pb-3 text-center">Bybit</th>
                    <th className="pb-3 text-center">OKX</th>
                    <th className="pb-3 text-center">dYdX</th>
                    <th className="pb-3 text-center">Deribit</th>
                    <th className="pb-3 text-center">Bitget</th>
                    <th className="pb-3 text-right cursor-pointer hover:text-cyan-400" onClick={() => { setSortField("apy"); setSortAsc(!sortAsc); }}>
                      Annualized APY
                    </th>
                    <th className="pb-3 text-right cursor-pointer hover:text-cyan-400" onClick={() => { setSortField("oi"); setSortAsc(!sortAsc); }}>
                      Open Interest (USD)
                    </th>
                    <th className="pb-3 text-right">Sentiment Bias</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                  {filteredCoins.map((coin) => {
                    const apy = (coin.rateBinance * 3 * 365).toFixed(1);
                    const isPositive = coin.rateBinance > 0;
                    const isSelected = selectedCoin.symbol === coin.symbol;

                    return (
                      <tr
                        key={coin.symbol}
                        onClick={() => setSelectedCoin(coin)}
                        className={`cursor-pointer transition duration-150 ${
                          isSelected
                            ? "bg-cyan-500/10 dark:bg-cyan-500/15 font-bold"
                            : "hover:bg-slate-50 dark:hover:bg-slate-850/60"
                        }`}
                      >
                        <td className="py-3.5">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-black text-slate-900 dark:text-white shadow-xs">
                              {coin.base}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                <span>{coin.name}</span>
                                {isSelected && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                                )}
                              </div>
                              <span className="text-[10px] text-slate-400">{coin.symbol}</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 text-right font-black text-slate-900 dark:text-white">
                          ${coin.price >= 1 ? coin.price.toLocaleString(undefined, { minimumFractionDigits: 2 }) : coin.price.toFixed(5)}
                        </td>

                        <td className={`py-3.5 text-right font-bold ${coin.change24h >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                          {coin.change24h >= 0 ? `+${coin.change24h.toFixed(2)}%` : `${coin.change24h.toFixed(2)}%`}
                        </td>

                        {/* Exchange Rates */}
                        <td className={`py-3.5 text-center font-black ${isPositive ? "text-emerald-500 bg-emerald-500/5" : "text-purple-400 bg-purple-500/5"} rounded-lg`}>
                          {isPositive ? `+${coin.rateBinance.toFixed(4)}%` : `${coin.rateBinance.toFixed(4)}%`}
                        </td>

                        <td className={`py-3.5 text-center font-bold ${coin.rateBybit > 0 ? "text-emerald-500" : "text-purple-400"}`}>
                          {coin.rateBybit > 0 ? `+${coin.rateBybit.toFixed(4)}%` : `${coin.rateBybit.toFixed(4)}%`}
                        </td>

                        <td className={`py-3.5 text-center font-bold ${coin.rateOKX > 0 ? "text-emerald-500" : "text-purple-400"}`}>
                          {coin.rateOKX > 0 ? `+${coin.rateOKX.toFixed(4)}%` : `${coin.rateOKX.toFixed(4)}%`}
                        </td>

                        <td className={`py-3.5 text-center font-bold ${coin.rateDYDX > 0 ? "text-emerald-500" : "text-purple-400"}`}>
                          {coin.rateDYDX > 0 ? `+${coin.rateDYDX.toFixed(4)}%` : `${coin.rateDYDX.toFixed(4)}%`}
                        </td>

                        <td className={`py-3.5 text-center font-bold ${coin.rateDeribit > 0 ? "text-emerald-500" : "text-purple-400"}`}>
                          {coin.rateDeribit > 0 ? `+${coin.rateDeribit.toFixed(4)}%` : `${coin.rateDeribit.toFixed(4)}%`}
                        </td>

                        <td className={`py-3.5 text-center font-bold ${coin.rateBitget > 0 ? "text-emerald-500" : "text-purple-400"}`}>
                          {coin.rateBitget > 0 ? `+${coin.rateBitget.toFixed(4)}%` : `${coin.rateBitget.toFixed(4)}%`}
                        </td>

                        {/* Annualized APY */}
                        <td className="py-3.5 text-right font-black text-cyan-600 dark:text-cyan-400">
                          {apy}%
                        </td>

                        {/* Open Interest */}
                        <td className="py-3.5 text-right text-slate-700 dark:text-slate-300 font-bold">
                          ${(coin.openInterestUsd / 1000000).toFixed(1)}M
                        </td>

                        {/* Sentiment */}
                        <td className="py-3.5 text-right">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-black ${
                              coin.sentiment === "EXTREME_BULL"
                                ? "bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300"
                                : coin.sentiment === "SHORT_SQUEEZE_DISCOUNT"
                                ? "bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 border border-purple-300"
                                : "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300"
                            }`}
                          >
                            {coin.sentiment === "EXTREME_BULL"
                              ? "🔥 Overheated Long"
                              : coin.sentiment === "SHORT_SQUEEZE_DISCOUNT"
                              ? "⚡ Squeeze Setup"
                              : "🟢 Normal Bull"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 4. TAB 2: HISTORICAL DUAL-AXIS CHARTS & HEATMAP */}
      {activeTab === "CHARTS" && (
        <div className="space-y-6">
          {/* Chart Header & Coin Selector */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <LineChart className="w-5 h-5 text-cyan-500" />
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">
                    {selectedCoin.name} ({selectedCoin.symbol}) Historical Funding Rate vs. Price Dual-Axis Chart
                  </h2>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Multi-epoch 8-hour rate tracking overlaid against perpetual mark price action
                </p>
              </div>

              {/* Timeframe selector */}
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-950 p-1 rounded-2xl border border-slate-200 dark:border-slate-800">
                {(["24H", "7D", "30D", "90D", "1Y"] as const).map((tf) => (
                  <button
                    key={tf}
                    onClick={() => setChartTimeframe(tf)}
                    className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition ${
                      chartTimeframe === tf
                        ? "bg-cyan-500 text-slate-950 font-black shadow-sm"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {tf}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive SVG Realistic Dual-Axis Canvas */}
            <div className="relative bg-slate-950 rounded-2xl p-4 sm:p-6 border border-cyan-500/20 overflow-hidden select-none">
              {/* Legend & Summary */}
              <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-300 pb-4 border-b border-slate-800/80">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-amber-400 shadow-xs shadow-amber-400/80" />
                    <span>Perpetual Mark Price ($)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-emerald-400" />
                    <span>Positive Funding (Longs Pay)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-purple-400" />
                    <span>Negative Funding (Shorts Pay)</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[10px] text-slate-400">Current 8h Rate: </span>
                  <span className={`font-black ${selectedCoin.rateBinance >= 0 ? "text-emerald-400" : "text-purple-400"}`}>
                    {selectedCoin.rateBinance >= 0 ? `+${selectedCoin.rateBinance.toFixed(4)}%` : `${selectedCoin.rateBinance.toFixed(4)}%`}
                  </span>
                </div>
              </div>

              {/* Realistic SVG Rendering */}
              <div className="relative h-72 sm:h-96 w-full pt-4">
                <svg
                  className="w-full h-full overflow-visible"
                  viewBox="0 0 800 300"
                  preserveAspectRatio="none"
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  <defs>
                    <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.0" />
                    </linearGradient>
                    <linearGradient id="fundingGreen" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10B981" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#059669" stopOpacity="0.4" />
                    </linearGradient>
                    <linearGradient id="fundingRed" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor="#A855F7" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#7E22CE" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>

                  {/* Grid Lines */}
                  <line x1="0" y1="50" x2="800" y2="50" stroke="#1E293B" strokeDasharray="3 3" />
                  <line x1="0" y1="110" x2="800" y2="110" stroke="#1E293B" strokeDasharray="3 3" />
                  <line x1="0" y1="170" x2="800" y2="170" stroke="#1E293B" strokeDasharray="3 3" />
                  <line x1="0" y1="230" x2="800" y2="230" stroke="#334155" strokeWidth="1.5" /> {/* 0% Baseline */}
                  <line x1="0" y1="280" x2="800" y2="280" stroke="#1E293B" strokeDasharray="3 3" />

                  {/* Threshold Zones */}
                  <rect x="0" y="30" width="800" height="40" fill="#F59E0B" fillOpacity="0.05" />
                  <text x="790" y="45" fill="#F59E0B" fontSize="9" textAnchor="end" fontFamily="monospace">
                    Overheated Squeeze Warning Zone (&gt; +0.02%)
                  </text>

                  <rect x="0" y="240" width="800" height="40" fill="#A855F7" fillOpacity="0.05" />
                  <text x="790" y="270" fill="#A855F7" fontSize="9" textAnchor="end" fontFamily="monospace">
                    Short Squeeze Discount Zone (&lt; 0.00%)
                  </text>

                  {/* Funding Rate Bars (Bottom Half) */}
                  {selectedCoin.historicalData.map((pt, i) => {
                    const totalPoints = selectedCoin.historicalData.length;
                    const x = 50 + (i * (700 / (totalPoints - 1)));
                    const barWidth = 32;
                    const isPositive = pt.rate >= 0;
                    const height = Math.min(65, Math.abs(pt.rate) * 2600);
                    const y = isPositive ? 230 - height : 230;

                    return (
                      <g key={`bar-${i}`}>
                        <rect
                          x={x - barWidth / 2}
                          y={y}
                          width={barWidth}
                          height={height}
                          rx={3}
                          fill={isPositive ? "url(#fundingGreen)" : "url(#fundingRed)"}
                          className="transition-all duration-300 hover:brightness-125 cursor-pointer"
                          onMouseEnter={() =>
                            setHoveredPoint({
                              time: pt.time,
                              price: pt.price,
                              rate: pt.rate,
                              cumulativeYield: pt.cumulativeYield,
                              x,
                              y: isPositive ? 230 - height : 230 + height
                            })
                          }
                        />
                        <text
                          x={x}
                          y={isPositive ? y - 6 : y + height + 12}
                          fill={isPositive ? "#34D399" : "#C084FC"}
                          fontSize="8.5"
                          textAnchor="middle"
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          {isPositive ? `+${(pt.rate * 100).toFixed(2)}%` : `${(pt.rate * 100).toFixed(2)}%`}
                        </text>
                      </g>
                    );
                  })}

                  {/* Price Curve & Area (Top Half) */}
                  {(() => {
                    const pts = selectedCoin.historicalData;
                    const minP = Math.min(...pts.map((p) => p.price)) * 0.96;
                    const maxP = Math.max(...pts.map((p) => p.price)) * 1.04;

                    const coords = pts.map((p, i) => {
                      const x = 50 + (i * (700 / (pts.length - 1)));
                      const y = 140 - ((p.price - minP) / (maxP - minP)) * 90;
                      return { x, y, pt: p };
                    });

                    const pathD = coords.reduce((acc, curr, idx) => {
                      return idx === 0 ? `M ${curr.x} ${curr.y}` : `${acc} L ${curr.x} ${curr.y}`;
                    }, "");

                    const areaD = `${pathD} L ${coords[coords.length - 1].x} 160 L ${coords[0].x} 160 Z`;

                    return (
                      <g>
                        <path d={areaD} fill="url(#priceGradient)" />
                        <path d={pathD} fill="none" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                        {coords.map((c, idx) => (
                          <circle
                            key={`dot-${idx}`}
                            cx={c.x}
                            cy={c.y}
                            r={4.5}
                            fill="#F59E0B"
                            stroke="#0F172A"
                            strokeWidth="2"
                            className="cursor-pointer hover:scale-150 transition-transform"
                            onMouseEnter={() =>
                              setHoveredPoint({
                                time: c.pt.time,
                                price: c.pt.price,
                                rate: c.pt.rate,
                                cumulativeYield: c.pt.cumulativeYield,
                                x: c.x,
                                y: c.y
                              })
                            }
                          />
                        ))}
                      </g>
                    );
                  })()}

                  {/* Time Labels */}
                  {selectedCoin.historicalData.map((pt, i) => {
                    const totalPoints = selectedCoin.historicalData.length;
                    const x = 50 + (i * (700 / (totalPoints - 1)));
                    return (
                      <text key={`label-${i}`} x={x} y={295} fill="#94A3B8" fontSize="9" textAnchor="middle" fontFamily="monospace">
                        {pt.time}
                      </text>
                    );
                  })}
                </svg>

                {/* Floating Interactive Hover Tooltip */}
                {hoveredPoint && (
                  <div
                    className="absolute z-20 pointer-events-none p-3 rounded-xl bg-slate-900/95 border border-cyan-500/50 shadow-2xl text-white font-mono text-xs space-y-1 backdrop-blur-md transition-all duration-100"
                    style={{
                      left: `${Math.min(75, Math.max(10, (hoveredPoint.x / 800) * 100))}%`,
                      top: `${Math.min(65, Math.max(10, (hoveredPoint.y / 300) * 100))}%`
                    }}
                  >
                    <div className="flex items-center justify-between gap-4 border-b border-slate-800 pb-1">
                      <span className="text-cyan-400 font-bold">{hoveredPoint.time}</span>
                      <span className="text-[10px] text-slate-400">8h Settlement</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-400">Mark Price:</span>
                      <span className="font-bold text-amber-400">
                        ${hoveredPoint.price >= 1 ? hoveredPoint.price.toLocaleString() : hoveredPoint.price.toFixed(5)}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-400">8h Funding Rate:</span>
                      <span className={`font-black ${hoveredPoint.rate >= 0 ? "text-emerald-400" : "text-purple-400"}`}>
                        {hoveredPoint.rate >= 0 ? `+${(hoveredPoint.rate * 100).toFixed(3)}%` : `${(hoveredPoint.rate * 100).toFixed(3)}%`}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="text-slate-400">Cumulative Carry:</span>
                      <span className="font-bold text-cyan-300">+{hoveredPoint.cumulativeYield}%</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Cross-Exchange Divergence Heatmap Bar */}
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <BarChart3 className="w-4 h-4 text-cyan-500" />
                  Live Cross-Exchange Spread Delta for {selectedCoin.base}
                </span>
                <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-bold">
                  Max Spread: {((Math.max(selectedCoin.rateBinance, selectedCoin.rateOKX, selectedCoin.rateBybit) - Math.min(selectedCoin.rateBinance, selectedCoin.rateOKX, selectedCoin.rateBybit)) * 100).toFixed(3)}% / 8h
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { name: "Binance", rate: selectedCoin.rateBinance },
                  { name: "Bybit", rate: selectedCoin.rateBybit },
                  { name: "OKX", rate: selectedCoin.rateOKX },
                  { name: "dYdX", rate: selectedCoin.rateDYDX },
                  { name: "Deribit", rate: selectedCoin.rateDeribit },
                  { name: "Bitget", rate: selectedCoin.rateBitget }
                ].map((ex) => (
                  <div key={ex.name} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center font-mono">
                    <div className="text-[10px] text-slate-400 font-bold uppercase">{ex.name}</div>
                    <div className={`text-sm font-black mt-1 ${ex.rate >= 0 ? "text-emerald-500" : "text-purple-400"}`}>
                      {ex.rate >= 0 ? `+${ex.rate.toFixed(4)}%` : `${ex.rate.toFixed(4)}%`}
                    </div>
                    <div className="text-[9px] text-slate-500 mt-0.5">
                      ~{(ex.rate * 3 * 365).toFixed(1)}% APY
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB 3: DELTA-NEUTRAL BASIS CALCULATOR */}
      {activeTab === "ARBITRAGE" && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-black">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <span>Delta-Neutral Cash-and-Carry Basis Yield Engine</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                    Zero Market Drawdown Risk
                  </span>
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Simulate passive yield collected by simultaneously holding Spot and Shorting Perpetual Futures
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Inputs Controls */}
            <div className="lg:col-span-6 space-y-5 font-mono text-xs">
              <div className="space-y-1.5">
                <label className="text-slate-700 dark:text-slate-200 font-bold block">
                  Select Arbitrage Asset:
                </label>
                <select
                  value={selectedCoin.symbol}
                  onChange={(e) => {
                    const c = fundingData.find((item) => item.symbol === e.target.value);
                    if (c) setSelectedCoin(c);
                  }}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-xs focus:outline-none focus:border-cyan-500"
                >
                  {fundingData.map((c) => (
                    <option key={c.symbol} value={c.symbol}>
                      {c.name} ({c.base}) — Avg 8h: {(c.rateBinance).toFixed(4)}% (~{(c.rateBinance * 3 * 365).toFixed(1)}% APY)
                    </option>
                  ))}
                </select>
              </div>

              {/* Capital Slider */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-bold text-slate-700 dark:text-slate-200">
                  <span>Total Investment Capital (USDT):</span>
                  <span className="text-cyan-600 dark:text-cyan-400 font-black text-sm">${arbitrageCapital.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min={1000}
                  max={500000}
                  step={1000}
                  value={arbitrageCapital}
                  onChange={(e) => setArbitrageCapital(parseInt(e.target.value) || 10000)}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-400">
                  <span>$1,000</span>
                  <span>$100,000</span>
                  <span>$500,000</span>
                </div>
              </div>

              {/* Leverage Tier Selector */}
              <div className="space-y-1.5">
                <div className="flex justify-between font-bold text-slate-700 dark:text-slate-200">
                  <span>Short Perpetual Leverage:</span>
                  <span className="text-emerald-500 font-bold">{leverageTier}x (Delta-Neutral)</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 5].map((lev) => (
                    <button
                      key={lev}
                      onClick={() => setLeverageTier(lev)}
                      className={`py-2 rounded-xl text-xs font-bold transition ${
                        leverageTier === lev
                          ? "bg-cyan-500 text-slate-950 font-black shadow-sm"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                      }`}
                    >
                      {lev}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Maker Fee Input */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-slate-500 dark:text-slate-400 text-[10px] block font-bold">Maker Fee Rate (%):</label>
                  <input
                    type="number"
                    step="0.01"
                    value={makerFeePct}
                    onChange={(e) => setMakerFeePct(parseFloat(e.target.value) || 0.02)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-slate-500 dark:text-slate-400 text-[10px] block font-bold">Compounding Frequency:</label>
                  <select
                    value={compoundingFreq}
                    onChange={(e) => setCompoundingFreq(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold"
                  >
                    <option value="8H">Every 8h Epoch (3x/day)</option>
                    <option value="DAILY">Daily (1x/day)</option>
                    <option value="WEEKLY">Weekly</option>
                  </select>
                </div>
              </div>

              {/* Execution Blueprint Checklist */}
              <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 text-[11px] leading-relaxed text-cyan-950 dark:text-cyan-200 space-y-2">
                <div className="font-black text-xs flex items-center gap-1.5 text-cyan-700 dark:text-cyan-300">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Exact Institutional Execution Blueprint:</span>
                </div>
                <ul className="space-y-1 list-disc pl-4 text-slate-700 dark:text-slate-300">
                  <li>Buy <strong>${(arbitrageCapital / 2).toLocaleString()}</strong> Spot {selectedCoin.base} on Binance / Coinbase.</li>
                  <li>Deposit <strong>${(arbitrageCapital / 2).toLocaleString()}</strong> USDT as margin in Binance / OKX Perpetual Futures.</li>
                  <li>Open 1x Short {selectedCoin.symbol} Perpetual with notional size of <strong>${(arbitrageCapital / 2).toLocaleString()}</strong>.</li>
                  <li>Collect automatic funding payouts every 8 hours directly into your margin account.</li>
                </ul>
              </div>
            </div>

            {/* Right Returns Forecast Display */}
            <div className="lg:col-span-6 p-6 rounded-3xl bg-slate-950 text-white border border-cyan-500/30 space-y-6 font-mono shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-wider">Projected Yield Forecast</span>
                <span className="text-xs text-emerald-400 font-black bg-emerald-950/90 px-2.5 py-1 rounded-lg border border-emerald-800/80">
                  Compounded APY: {compoundedApy.toFixed(2)}%
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400">8-Hour Epoch Payout</div>
                  <div className="text-xl font-black text-emerald-400 mt-1">
                    +${(grossDailyYieldUsd / 3).toFixed(2)}
                  </div>
                  <div className="text-[9px] text-slate-500">Every 8 hours</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400">Daily Payout (24h)</div>
                  <div className="text-xl font-black text-cyan-400 mt-1">
                    +${grossDailyYieldUsd.toFixed(2)}
                  </div>
                  <div className="text-[9px] text-slate-500">3x Settlements</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400">30-Day Estimated Return</div>
                  <div className="text-xl font-black text-amber-400 mt-1">
                    +${netMonthlyYieldUsd.toFixed(2)}
                  </div>
                  <div className="text-[9px] text-slate-500">Net of simulated fees</div>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
                  <div className="text-[10px] text-slate-400">1-Year Net Total</div>
                  <div className="text-xl font-black text-emerald-400 mt-1">
                    +${netYearlyYieldUsd.toFixed(2)}
                  </div>
                  <div className="text-[9px] text-slate-500">Full Annual Yield</div>
                </div>
              </div>

              {/* Risk & Friction Breakdown */}
              <div className="space-y-2 pt-2 border-t border-slate-800 text-[11px]">
                <div className="flex justify-between text-slate-400">
                  <span>Estimated Roundtrip Fees:</span>
                  <span className="text-rose-400 font-bold">-${entryFeeTotal.toFixed(2)} USDT</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Break-Even Duration:</span>
                  <span className="text-cyan-300 font-bold">{(entryFeeTotal / (grossDailyYieldUsd || 1)).toFixed(1)} Days</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Portfolio Delta Risk:</span>
                  <span className="text-emerald-400 font-bold">0.0000 (100% Market Neutral)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. TAB 4: SHORT SQUEEZE & LONG CASCADE RADAR */}
      {activeTab === "SQUEEZE" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Short Squeeze Watchlist */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-purple-500" />
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Prime Short Squeeze Candidates
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30">
                  Negative Funding Discount
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Assets where aggressive retail shorting has driven funding negative. Shorts are paying longs, creating severe squeeze vulnerability if price breaks upward.
              </p>

              <div className="space-y-3 font-mono">
                {shortSqueezeCandidates.map((coin) => (
                  <div
                    key={coin.symbol}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-purple-500/20 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 font-bold flex items-center justify-center text-xs">
                          {coin.base}
                        </span>
                        <div>
                          <span className="font-bold text-xs text-slate-900 dark:text-white block">{coin.name}</span>
                          <span className="text-[10px] text-slate-400">${coin.price >= 1 ? coin.price.toLocaleString() : coin.price.toFixed(5)}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-black text-purple-400 block">{coin.rateBinance.toFixed(4)}% / 8h</span>
                        <span className="text-[10px] text-slate-400">Shorts Pay Longs</span>
                      </div>
                    </div>

                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>Squeeze Probability Index:</span>
                        <span className="text-purple-400 font-bold">{coin.squeezeProbability}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                          style={{ width: `${coin.squeezeProbability}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Overheated Long Flush Risks */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-amber-500" />
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Overheated Long Flush &amp; Cascade Risks
                  </h3>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-600 dark:text-amber-300 border border-amber-500/30">
                  Excessive Bull Leverage
                </span>
              </div>

              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Assets with excessively elevated positive funding (&gt; +0.015% / 8h). Longs are paying extreme carrying costs, creating extreme vulnerability to long wipeouts.
              </p>

              <div className="space-y-3 font-mono">
                {overheatedLongRisks.map((coin) => (
                  <div
                    key={coin.symbol}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-amber-500/20 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 font-bold flex items-center justify-center text-xs">
                          {coin.base}
                        </span>
                        <div>
                          <span className="font-bold text-xs text-slate-900 dark:text-white block">{coin.name}</span>
                          <span className="text-[10px] text-slate-400">${coin.price >= 1 ? coin.price.toLocaleString() : coin.price.toFixed(5)}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-xs font-black text-amber-400 block">+{coin.rateBinance.toFixed(4)}% / 8h</span>
                        <span className="text-[10px] text-slate-400">~{(coin.rateBinance * 3 * 365).toFixed(1)}% APY</span>
                      </div>
                    </div>

                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>Long Liquidation Cascade Risk:</span>
                        <span className="text-amber-400 font-bold">High Overheat</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-amber-400 to-rose-500"
                          style={{ width: `${Math.min(100, (coin.rateBinance / 0.03) * 100)}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 7. TAB 5: QUANTITATIVE MASTERCLASS & MATHEMATICS */}
      {activeTab === "MASTERCLASS" && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
          <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-cyan-500" />
              <span>Institutional Quantitative Masterclass: Perpetual Funding Mechanics</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              Mathematical foundations, market microstructure formulas, and hedge fund carry strategies
            </p>
          </div>

          {/* Section 1: The Core Formula */}
          <div className="space-y-4">
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-500" />
              <span>1. Mathematical Architecture &amp; TWAP Formulas</span>
            </h3>

            <div className="p-5 rounded-2xl bg-slate-950 text-cyan-300 font-mono text-xs sm:text-sm leading-relaxed border border-cyan-500/30 space-y-3">
              <div className="text-white font-bold">// 1. Perpetual Premium Index Calculation</div>
              <div>
                Premium Index (P) = [Max(0, Impact Bid Price - Spot Index) - Max(0, Spot Index - Impact Ask Price)] / Spot Index Price
              </div>
              <div className="text-white font-bold pt-2">// 2. Final 8-Hour Funding Rate Formulation</div>
              <div>
                Funding Rate (F) = Clamp(P_TWAP + Clamp(Interest_Rate - P_TWAP, -0.05%, +0.05%), -0.75%, +0.75%)
              </div>
              <div className="text-white font-bold pt-2">// 3. Cash-and-Carry Annualized APY Formula</div>
              <div>
                Annualized APY = [ (1 + Rate_8h / 100)^1095 - 1 ] × 100%
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Where <strong>Impact Bid Price</strong> and <strong>Impact Ask Price</strong> represent the average price executed for an institutional impact notional depth (typically $20,000 to $100,000 USDT on Binance and OKX). By utilizing a Time-Weighted Average Price (TWAP) over the 8-hour epoch, exchanges protect traders from single-tick manipulation and flash crashes.
            </p>
          </div>

          {/* Section 2: Three Institutional Playbooks */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-500" />
              <span>2. Three Quantitative Trading Playbooks</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="font-black text-sm text-cyan-600 dark:text-cyan-400">A. Delta-Neutral Carry</div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  Hold Spot + Short Perp 1x. Perfect 0 delta. Collect 8h funding continuously. Rebalance margin collateral when asset price shifts &gt;10%.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="font-black text-sm text-amber-600 dark:text-amber-400">B. Squeeze Front-Running</div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  Monitor negative funding (&lt; -0.01%) combined with rising Open Interest and L2 bid walls. Enter long setups targeting forced short liquidations.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                <div className="font-black text-sm text-emerald-600 dark:text-emerald-400">C. Cross-Exchange Arb</div>
                <p className="text-slate-600 dark:text-slate-300 text-[11px] leading-relaxed">
                  Short the highest funding exchange (e.g. Bybit at +0.025%) while Longing the lowest (e.g. dYdX at +0.007%). Net the +0.018% spread per epoch with zero spot inventory.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. STRATEGIC PLAYBOOK & FAQ ACCORDION */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-500" />
            <span>Perpetual Funding Rate Arbitrage FAQ &amp; Strategies</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Learn institutional quantitative techniques for extracting alpha from funding rate differentials
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-850/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-cyan-500" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 whitespace-pre-line">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
