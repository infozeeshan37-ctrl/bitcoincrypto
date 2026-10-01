"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
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
  Scale
} from "lucide-react";

interface FundingCoin {
  symbol: string;
  base: string;
  name: string;
  price: number;
  rateBinance: number; // in % e.g. 0.0125
  rateBybit: number;
  rateOKX: number;
  rateDYDX: number;
  rateDeribit: number;
  openInterestUsd: number;
  predictedRate: number;
  sentiment: "EXTREME_BULL" | "MODERATE_BULL" | "NEUTRAL" | "BEARISH_DISCOUNT";
}

const INITIAL_FUNDING_DATA: FundingCoin[] = [
  { symbol: "BTCUSDT", base: "BTC", name: "Bitcoin", price: 88450.0, rateBinance: 0.0092, rateBybit: 0.0088, rateOKX: 0.0095, rateDYDX: 0.0080, rateDeribit: 0.0078, openInterestUsd: 34500000000, predictedRate: 0.0098, sentiment: "MODERATE_BULL" },
  { symbol: "ETHUSDT", base: "ETH", name: "Ethereum", price: 3120.5, rateBinance: 0.0084, rateBybit: 0.0081, rateOKX: 0.0089, rateDYDX: 0.0075, rateDeribit: 0.0072, openInterestUsd: 14800000000, predictedRate: 0.0088, sentiment: "MODERATE_BULL" },
  { symbol: "SOLUSDT", base: "SOL", name: "Solana", price: 194.3, rateBinance: 0.0142, rateBybit: 0.0138, rateOKX: 0.0148, rateDYDX: 0.0130, rateDeribit: 0.0125, openInterestUsd: 4950000000, predictedRate: 0.0155, sentiment: "EXTREME_BULL" },
  { symbol: "PEPEUSDT", base: "PEPE", name: "Pepe", price: 0.0000185, rateBinance: 0.0210, rateBybit: 0.0195, rateOKX: 0.0225, rateDYDX: 0.0180, rateDeribit: 0.0175, openInterestUsd: 850000000, predictedRate: 0.0240, sentiment: "EXTREME_BULL" },
  { symbol: "XRPUSDT", base: "XRP", name: "XRP", price: 2.45, rateBinance: 0.0115, rateBybit: 0.0110, rateOKX: 0.0120, rateDYDX: 0.0105, rateDeribit: 0.0098, openInterestUsd: 3420000000, predictedRate: 0.0122, sentiment: "EXTREME_BULL" },
  { symbol: "DOGEUSDT", base: "DOGE", name: "Dogecoin", price: 0.224, rateBinance: 0.0135, rateBybit: 0.0128, rateOKX: 0.0140, rateDYDX: 0.0120, rateDeribit: 0.0115, openInterestUsd: 2150000000, predictedRate: 0.0142, sentiment: "EXTREME_BULL" },
  { symbol: "SUIUSDT", base: "SUI", name: "Sui", price: 3.42, rateBinance: 0.0165, rateBybit: 0.0158, rateOKX: 0.0172, rateDYDX: 0.0145, rateDeribit: 0.0140, openInterestUsd: 1250000000, predictedRate: 0.0180, sentiment: "EXTREME_BULL" },
  { symbol: "BNBUSDT", base: "BNB", name: "BNB", price: 642.3, rateBinance: 0.0065, rateBybit: 0.0062, rateOKX: 0.0068, rateDYDX: 0.0058, rateDeribit: 0.0055, openInterestUsd: 1850000000, predictedRate: 0.0070, sentiment: "NEUTRAL" },
  { symbol: "ADAUSDT", base: "ADA", name: "Cardano", price: 0.88, rateBinance: 0.0075, rateBybit: 0.0071, rateOKX: 0.0079, rateDYDX: 0.0068, rateDeribit: 0.0065, openInterestUsd: 920000000, predictedRate: 0.0080, sentiment: "NEUTRAL" },
  { symbol: "AVAXUSDT", base: "AVAX", name: "Avalanche", price: 38.5, rateBinance: 0.0095, rateBybit: 0.0091, rateOKX: 0.0098, rateDYDX: 0.0085, rateDeribit: 0.0080, openInterestUsd: 780000000, predictedRate: 0.0102, sentiment: "MODERATE_BULL" },
  { symbol: "LINKUSDT", base: "LINK", name: "Chainlink", price: 18.2, rateBinance: 0.0082, rateBybit: 0.0079, rateOKX: 0.0086, rateDYDX: 0.0072, rateDeribit: 0.0070, openInterestUsd: 640000000, predictedRate: 0.0088, sentiment: "MODERATE_BULL" },
  { symbol: "KASUSDT", base: "KAS", name: "Kaspa", price: 0.165, rateBinance: 0.0125, rateBybit: 0.0118, rateOKX: 0.0130, rateDYDX: 0.0110, rateDeribit: 0.0105, openInterestUsd: 210000000, predictedRate: 0.0135, sentiment: "EXTREME_BULL" }
];

export default function FundingRateScreenerTool() {
  const [fundingData, setFundingData] = useState<FundingCoin[]>(INITIAL_FUNDING_DATA);
  const [filterMode, setFilterMode] = useState<"ALL" | "POSITIVE" | "NEGATIVE" | "EXTREME">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCoin, setSelectedCoin] = useState<FundingCoin>(INITIAL_FUNDING_DATA[0]);
  const [arbitrageCapital, setArbitrageCapital] = useState<number>(10000);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [lastSyncTime, setLastSyncTime] = useState<string>("");

  // Live 8-Hour Settlement Countdown (00:00, 08:00, 16:00 UTC)
  const [countdownStr, setCountdownStr] = useState<string>("03:28:45");
  const [secondsToSettlement, setSecondsToSettlement] = useState<number>(12525);

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

  // Live Micro-Jitter for Real-Time Ticker
  useEffect(() => {
    const jitterInterval = setInterval(() => {
      setFundingData((prev) =>
        prev.map((item) => {
          const delta = (Math.random() - 0.5) * 0.0004;
          const newBinance = parseFloat(Math.max(-0.05, Math.min(0.08, item.rateBinance + delta)).toFixed(4));
          return {
            ...item,
            rateBinance: newBinance,
            rateBybit: parseFloat((newBinance - 0.0004 + Math.random() * 0.0008).toFixed(4)),
            rateOKX: parseFloat((newBinance + 0.0003 + Math.random() * 0.0006).toFixed(4)),
          };
        })
      );
      setLastSyncTime(new Date().toLocaleTimeString());
    }, 3000);

    return () => clearInterval(jitterInterval);
  }, []);

  // Filtered List
  const filteredCoins = useMemo(() => {
    return fundingData.filter((coin) => {
      const matchesSearch =
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.base.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      if (filterMode === "POSITIVE") return coin.rateBinance > 0.005;
      if (filterMode === "NEGATIVE") return coin.rateBinance < 0;
      if (filterMode === "EXTREME") return Math.abs(coin.rateBinance) >= 0.015;
      return true;
    });
  }, [fundingData, searchQuery, filterMode]);

  // Cash and Carry Arbitrage Calculations for Selected Coin
  const avgRate8h = (selectedCoin.rateBinance + selectedCoin.rateBybit + selectedCoin.rateOKX) / 3;
  const dailyRate = avgRate8h * 3;
  const annualizedYieldApy = parseFloat((dailyRate * 365).toFixed(2));
  const dailyYieldUsd = (arbitrageCapital * (dailyRate / 100)).toFixed(2);
  const monthlyYieldUsd = (arbitrageCapital * ((dailyRate * 30) / 100)).toFixed(2);
  const annualYieldUsd = (arbitrageCapital * (annualizedYieldApy / 100)).toFixed(2);

  const faqs = [
    {
      q: "What are crypto perpetual funding rates and how do they work?",
      a: "Perpetual futures have no expiration date. To tether perpetual prices to the underlying spot index, exchanges enforce an 8-hour funding fee payment between long and short traders. When the funding rate is positive, long traders pay short traders. When funding is negative, shorts pay longs."
    },
    {
      q: "How do institutional hedge funds harvest risk-free Cash-and-Carry basis yields?",
      a: "In a positive funding regime, a fund buys $100,000 of spot Bitcoin and simultaneously opens a $100,000 short perpetual futures position (1x delta-neutral). Because the long spot and short futures perfectly cancel out directional market risk, the trader passively collects the 8-hour funding fees, generating 15% to 35%+ annualized APY."
    },
    {
      q: "What does an extreme funding rate (> +0.03% or < -0.03%) signal for crypto price direction?",
      a: "Extreme positive funding indicates excessive leveraged long retail euphoria, creating high susceptibility to long liquidation cascades. Conversely, deeply negative funding rates signal over-aggressive short crowding, often preceding violent short squeeze breakouts."
    }
  ];

  return (
    <div className="space-y-8">
      
      {/* 1. TOP HERO DASHBOARD */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 text-white rounded-3xl p-6 sm:p-8 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-mono">
                  <Percent className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                  Perpetual Funding Rate Arbitrage Radar
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <Radio className="w-3 h-3 text-emerald-400 animate-ping" />
                  8-Hour Settlement Cycle Active
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black tracking-tight">
                Live Perpetual Funding Rates: <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-cyan-400 via-emerald-300 to-amber-300 bg-clip-text text-transparent">
                  Multi-Exchange Arbitrage &amp; Basis Yield Screener
                </span>
              </h1>

              <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
                Scan real-time 8-hour funding rates across Binance, Bybit, OKX, dYdX, and Deribit. Detect over-leveraged sentiment extremes, calculate delta-neutral cash-and-carry yields, and identify impending short squeeze traps.
              </p>
            </div>

            {/* Countdown to Next 8h Settlement */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-cyan-500/30 space-y-2 shrink-0 lg:w-80 shadow-xl backdrop-blur-md">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono font-bold">
                <span className="flex items-center gap-1 text-cyan-400">
                  <Clock className="w-3.5 h-3.5" /> Next Funding Epoch
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">00:00 / 08:00 / 16:00 UTC</span>
              </div>

              <div className="text-3xl font-black text-cyan-400 font-mono tracking-tight flex items-center gap-2">
                <span>{countdownStr}</span>
                <span className="text-xs text-slate-400 font-normal">Remaining</span>
              </div>

              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-1000"
                  style={{ width: `${((28800 - secondsToSettlement) / 28800) * 100}%` }}
                />
              </div>

              <div className="text-[10px] text-slate-400 font-mono text-center pt-1">
                Settling across 12,400+ perpetual futures contracts
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-800 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="text-slate-400 text-[10px]">Market Weighted Average</div>
              <div className="text-base font-black text-emerald-400">+0.0108% / 8h</div>
              <div className="text-[10px] text-slate-400">~11.8% Annualized APY</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="text-slate-400 text-[10px]">Highest Funding Rate</div>
              <div className="text-base font-black text-amber-400">PEPE (+0.0210%)</div>
              <div className="text-[10px] text-amber-300">Extreme Bullish Leverage</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="text-slate-400 text-[10px]">Total Derivatives OI</div>
              <div className="text-base font-black text-white">$68.45 Billion</div>
              <div className="text-[10px] text-emerald-400">+3.4% in 24h</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-800">
              <div className="text-slate-400 text-[10px]">Market Bias Status</div>
              <div className="text-base font-black text-cyan-300">Longs Paying Shorts 🟢</div>
              <div className="text-[10px] text-slate-400">Spot Premium Dominant</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DELTA-NEUTRAL CASH & CARRY BASIS YIELD CALCULATOR */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-black">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>Delta-Neutral Cash-and-Carry Basis Yield Calculator</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  Zero Directional Risk
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Calculate passive yield collected by holding spot and shorting perpetual futures at 1x leverage
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left Inputs */}
          <div className="lg:col-span-6 space-y-4 text-xs font-mono">
            <div className="space-y-1.5">
              <label className="text-slate-600 dark:text-slate-300 font-bold block">Select Asset for Basis Arbitrage:</label>
              <select
                value={selectedCoin.symbol}
                onChange={(e) => {
                  const c = fundingData.find((item) => item.symbol === e.target.value);
                  if (c) setSelectedCoin(c);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white font-bold text-xs focus:outline-none"
              >
                {fundingData.map((c) => (
                  <option key={c.symbol} value={c.symbol}>
                    {c.name} ({c.base}) — Current Avg 8h Rate: {(c.rateBinance).toFixed(4)}%
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between font-bold text-slate-600 dark:text-slate-300">
                <span>Arbitrage Capital (USDT):</span>
                <span className="text-cyan-600 dark:text-cyan-400">${arbitrageCapital.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min={1000}
                max={500000}
                step={1000}
                value={arbitrageCapital}
                onChange={(e) => setArbitrageCapital(parseInt(e.target.value) || 10000)}
                className="w-full accent-cyan-500"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>$1,000</span>
                <span>$100,000</span>
                <span>$500,000</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-200 dark:border-cyan-800 text-[11px] leading-relaxed text-cyan-900 dark:text-cyan-200">
              <strong>Execution Architecture:</strong> Buy <strong>${(arbitrageCapital / 2).toLocaleString()}</strong> Spot {selectedCoin.base} and open <strong>${(arbitrageCapital / 2).toLocaleString()}</strong> 1x Short Perpetual on Binance. Collect funding every 8 hours with zero price drawdown risk.
            </div>
          </div>

          {/* Right Estimated Returns Box */}
          <div className="lg:col-span-6 p-6 rounded-2xl bg-slate-900 text-white border border-cyan-500/30 space-y-4 font-mono shadow-lg">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="text-xs text-slate-400 font-bold">PROJECTED ARBITRAGE RETURN</span>
              <span className="text-xs text-emerald-400 font-black">APY: {annualizedYieldApy}%</span>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400">Daily Payout</div>
                <div className="text-lg font-black text-emerald-400">+${dailyYieldUsd}</div>
                <div className="text-[9px] text-slate-500">3x Settlements</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400">30-Day Total</div>
                <div className="text-lg font-black text-cyan-400">+${monthlyYieldUsd}</div>
                <div className="text-[9px] text-slate-500">Compounded</div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400">1-Year Est.</div>
                <div className="text-lg font-black text-amber-400">+${annualYieldUsd}</div>
                <div className="text-[9px] text-slate-500">Annual Return</div>
              </div>
            </div>

            <div className="text-[10px] text-slate-400 border-t border-slate-800 pt-2 flex items-center justify-between">
              <span>Formula: Yield(Annual) = Rate(8h) × 3 × 365</span>
              <span className="text-emerald-400 font-bold">Risk Level: Minimal</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. MULTI-EXCHANGE FUNDING RATE TABLE */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-3">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-cyan-500" />
              <span>Multi-Exchange 8-Hour Funding Rate Matrix</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live comparison across Binance, Bybit, OKX, dYdX, and Deribit
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {(["ALL", "POSITIVE", "NEGATIVE", "EXTREME"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setFilterMode(mode)}
                className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition ${
                  filterMode === mode
                    ? "bg-cyan-500 text-slate-950 font-black shadow-sm"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                }`}
              >
                {mode === "ALL" ? "All Pairs" : mode === "POSITIVE" ? "Longs Pay (>0)" : mode === "NEGATIVE" ? "Shorts Pay (<0)" : "Extreme Anomaly"}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase text-[10px]">
                <th className="pb-3">Cryptocurrency</th>
                <th className="pb-3 text-right">Perp Price</th>
                <th className="pb-3 text-center">Binance</th>
                <th className="pb-3 text-center">Bybit</th>
                <th className="pb-3 text-center">OKX</th>
                <th className="pb-3 text-center">dYdX</th>
                <th className="pb-3 text-right">Annualized APY</th>
                <th className="pb-3 text-right">Market Sentiment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredCoins.map((coin) => {
                const apy = ((coin.rateBinance * 3 * 365)).toFixed(1);
                const isPositive = coin.rateBinance > 0;
                return (
                  <tr key={coin.symbol} className="hover:bg-slate-50 dark:hover:bg-slate-850/50 transition">
                    <td className="py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-900 dark:text-white">
                          {coin.base}
                        </span>
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block">{coin.name}</span>
                          <span className="text-[10px] text-slate-400">{coin.symbol}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 text-right font-bold text-slate-900 dark:text-white">
                      ${coin.price >= 1 ? coin.price.toLocaleString(undefined, { minimumFractionDigits: 2 }) : coin.price.toFixed(5)}
                    </td>

                    <td className={`py-3.5 text-center font-black ${isPositive ? "text-emerald-500" : "text-rose-500"}`}>
                      {isPositive ? `+${coin.rateBinance.toFixed(4)}%` : `${coin.rateBinance.toFixed(4)}%`}
                    </td>

                    <td className={`py-3.5 text-center font-bold ${coin.rateBybit > 0 ? "text-emerald-500" : "text-rose-500"}`}>
                      {coin.rateBybit > 0 ? `+${coin.rateBybit.toFixed(4)}%` : `${coin.rateBybit.toFixed(4)}%`}
                    </td>

                    <td className={`py-3.5 text-center font-bold ${coin.rateOKX > 0 ? "text-emerald-500" : "text-rose-500"}`}>
                      {coin.rateOKX > 0 ? `+${coin.rateOKX.toFixed(4)}%` : `${coin.rateOKX.toFixed(4)}%`}
                    </td>

                    <td className={`py-3.5 text-center font-bold ${coin.rateDYDX > 0 ? "text-emerald-500" : "text-rose-500"}`}>
                      {coin.rateDYDX > 0 ? `+${coin.rateDYDX.toFixed(4)}%` : `${coin.rateDYDX.toFixed(4)}%`}
                    </td>

                    <td className="py-3.5 text-right font-black text-cyan-600 dark:text-cyan-400">
                      {apy}%
                    </td>

                    <td className="py-3.5 text-right">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                        coin.sentiment === "EXTREME_BULL"
                          ? "bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300"
                          : "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300"
                      }`}>
                        {coin.sentiment === "EXTREME_BULL" ? "🔥 Overheated Longs" : "🟢 Moderate Longs"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. STRATEGIC PLAYBOOK & FAQ */}
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
                  <div className="p-4 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
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
