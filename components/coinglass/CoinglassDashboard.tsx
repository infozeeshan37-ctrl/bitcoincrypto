"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import LiquidationHeatmapRadar from "./LiquidationHeatmapRadar";
import {
  Flame,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Zap,
  Activity,
  Layers,
  BarChart3,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Gauge,
  Percent,
  Clock,
  Skull,
  Coins
} from "lucide-react";

interface OpenInterestData {
  symbol: string;
  base: string;
  name: string;
  price: number;
  openInterestUsd: number;
  openInterestTokens: number;
  change24h: number;
  volume24hUsd: number;
}

interface FundingRateItem {
  symbol: string;
  base: string;
  rate: number;
  ratePercent: string;
  predictedRate: string;
  nextFundingIn: string;
  exchanges: {
    binance: string;
    bybit: string;
    okx: string;
    dydx: string;
  };
}

interface LiquidationSummary {
  total24hUsd: number;
  longsTotalUsd: number;
  shortsTotalUsd: number;
  longsPercent: number;
  shortsPercent: number;
  totalTradersLiquidated: number;
  largestSingleLiquidation: {
    symbol: string;
    exchange: string;
    valueUsd: number;
    type: "LONG" | "SHORT";
  };
  recentEvents: Array<{
    id: string;
    symbol: string;
    exchange: string;
    side: "LONG" | "SHORT";
    amountUsd: number;
    price: number;
    timeAgo: string;
  }>;
}

interface LongShortRatioData {
  symbol: string;
  base: string;
  longRatio: number;
  shortRatio: number;
  ratio: number;
  topTradersLong: number;
  topTradersShort: number;
  takerBuyVolPercent: number;
  takerSellVolPercent: number;
}

export default function CoinglassDashboard() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const [openInterestList, setOpenInterestList] = useState<OpenInterestData[]>([]);
  const [totalOiFormatted, setTotalOiFormatted] = useState("$68.20B");
  const [fundingRates, setFundingRates] = useState<FundingRateItem[]>([]);
  const [liquidations, setLiquidations] = useState<LiquidationSummary | null>(null);
  const [longShortRatios, setLongShortRatios] = useState<LongShortRatioData[]>([]);
  const [heatmapLevels, setHeatmapLevels] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lastSyncTime, setLastSyncTime] = useState("");
  const [countdown, setCountdown] = useState(10);
  const [selectedTab, setSelectedTab] = useState<"oi" | "liquidations" | "funding" | "longshort">(
    tabParam === "liquidations" || tabParam === "funding" || tabParam === "longshort" ? tabParam : "oi"
  );

  useEffect(() => {
    if (tabParam && ["oi", "liquidations", "funding", "longshort"].includes(tabParam)) {
      setSelectedTab(tabParam as any);
    }
  }, [tabParam]);

  const fetchCoinglassData = useCallback(async () => {
    try {
      const res = await fetch("/api/coinglass");
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setOpenInterestList(json.data.openInterestList || []);
          setTotalOiFormatted(json.data.totalOpenInterestFormatted || "$68.20B");
          setFundingRates(json.data.fundingRates || []);
          setLiquidations(json.data.liquidations || null);
          setLongShortRatios(json.data.longShortRatios || []);
          setHeatmapLevels(json.data.heatmapLevels || null);
          setLastSyncTime(new Date().toLocaleTimeString());
        }
      }
      setLoading(false);
      setCountdown(10);
    } catch (err) {
      console.warn("Coinglass fetch error:", err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoinglassData();
    const interval = setInterval(fetchCoinglassData, 10000);
    const countTimer = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 10));
    }, 1000);
    return () => {
      clearInterval(interval);
      clearInterval(countTimer);
    };
  }, [fetchCoinglassData]);

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

  const btcRatio = longShortRatios.find((r) => r.base === "BTC") || {
    longRatio: 53.4,
    shortRatio: 46.6,
    ratio: 1.15,
    topTradersLong: 58.2,
    topTradersShort: 41.8,
  };

  return (
    <div className="space-y-10 pb-20">
      
      {/* 1. HERO BANNER */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 text-white rounded-3xl p-6 sm:p-8 border border-rose-900/40 shadow-xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-rose-500/20 text-rose-300 border border-rose-500/30">
                  <Flame className="w-3.5 h-3.5 text-rose-400" />
                  Coinglass Derivatives Analytics
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                Futures Open Interest, <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-rose-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                  Liquidations & Funding Rates
                </span>
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mt-2 leading-relaxed">
                Track real-time perpetual futures open interest, exchange liquidation cascades, multi-platform funding rates, and institutional Long/Short ratios across Binance, Bybit, OKX, and CME.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={fetchCoinglassData}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center gap-2 border border-slate-700"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-rose-400 ${loading ? "animate-spin" : ""}`} />
                <span>Force Refresh</span>
              </button>
              <Link
                href="/tools"
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition flex items-center gap-1.5 shadow-md"
              >
                <span>AI Trade Copilot</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Core Coinglass KPI Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4 border-t border-slate-800 text-xs">
            
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Open Interest</span>
              <div className="text-lg font-black text-amber-400 font-mono">
                {totalOiFormatted}
              </div>
              <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +4.85% 24h OI Drift
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">24h Liquidations</span>
              <div className="text-lg font-black text-rose-400 font-mono">
                {liquidations ? fmtCurrency(liquidations.total24hUsd) : "$248.60M"}
              </div>
              <span className="text-[10px] text-rose-300">
                {liquidations?.totalTradersLiquidated.toLocaleString() || "89,450"} Traders Wrecked
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">BTC Long / Short Ratio</span>
              <div className="text-lg font-black text-white font-mono">
                {btcRatio.longRatio}% / {btcRatio.shortRatio}%
              </div>
              <span className="text-[10px] text-emerald-400 font-bold">
                Top Traders: {btcRatio.topTradersLong}% Long
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Largest Liquidation</span>
              <div className="text-lg font-black text-white font-mono">
                {liquidations ? fmtCurrency(liquidations.largestSingleLiquidation.valueUsd) : "$4.85M"}
              </div>
              <span className="text-[10px] text-rose-400 font-bold">
                {liquidations?.largestSingleLiquidation.symbol} ({liquidations?.largestSingleLiquidation.type})
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* 2. NAVIGATION TABS */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setSelectedTab("oi")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            selectedTab === "oi"
              ? "bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 shadow-sm font-black"
              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-amber-500" />
          <span>Open Interest Table</span>
        </button>

        <button
          onClick={() => setSelectedTab("liquidations")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            selectedTab === "liquidations"
              ? "bg-slate-900 dark:bg-rose-500 text-white shadow-sm font-black"
              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
          }`}
        >
          <Skull className="w-3.5 h-3.5 text-rose-500" />
          <span>24h Liquidations & Heatmaps</span>
        </button>

        <button
          onClick={() => setSelectedTab("funding")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            selectedTab === "funding"
              ? "bg-slate-900 dark:bg-blue-500 text-white shadow-sm font-black"
              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
          }`}
        >
          <Percent className="w-3.5 h-3.5 text-blue-500" />
          <span>Exchange Funding Rates</span>
        </button>

        <button
          onClick={() => setSelectedTab("longshort")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap ${
            selectedTab === "longshort"
              ? "bg-slate-900 dark:bg-emerald-500 text-white shadow-sm font-black"
              : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800"
          }`}
        >
          <Gauge className="w-3.5 h-3.5 text-emerald-500" />
          <span>Long / Short Ratios</span>
        </button>
      </div>

      {/* 3. TAB 1: OPEN INTEREST TABLE */}
      {selectedTab === "oi" && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden space-y-4">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-amber-500" />
                <span>Futures Open Interest by Cryptocurrency</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Total outstanding unsettled derivative contracts across major exchanges.
              </p>
            </div>
            <div className="text-xs font-mono font-bold text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/80 px-3 py-1 rounded-xl border border-amber-200 dark:border-amber-800">
              Aggregated OI: {totalOiFormatted}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Cryptocurrency</th>
                  <th className="py-3 px-4 text-right">Perp Price</th>
                  <th className="py-3 px-4 text-right">Open Interest (USD)</th>
                  <th className="py-3 px-4 text-right">OI (Tokens)</th>
                  <th className="py-3 px-4 text-right">24h OI Drift</th>
                  <th className="py-3 px-4 text-right">24h Futures Volume</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-300">
                {openInterestList.map((item) => {
                  const isBull = item.change24h >= 0;
                  return (
                    <tr key={item.symbol} className="hover:bg-amber-50/40 dark:hover:bg-slate-800/50 transition">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-black text-xs text-slate-900 dark:text-white">
                            {item.base}
                          </div>
                          <div>
                            <div className="font-extrabold text-slate-900 dark:text-white text-sm">
                              {item.name}
                            </div>
                            <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500">{item.symbol}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-right font-mono font-extrabold text-slate-900 dark:text-white">
                        {fmtPrice(item.price)}
                      </td>

                      <td className="py-4 px-4 text-right font-mono font-black text-amber-600 dark:text-amber-400 text-sm">
                        {fmtCurrency(item.openInterestUsd)}
                      </td>

                      <td className="py-4 px-4 text-right font-mono text-slate-600 dark:text-slate-300">
                        {item.openInterestTokens.toLocaleString()} {item.base}
                      </td>

                      <td className="py-4 px-4 text-right font-mono font-bold">
                        <span className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-lg text-xs ${isBull ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300" : "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300"}`}>
                          {isBull ? "+" : ""}{item.change24h.toFixed(2)}%
                        </span>
                      </td>

                      <td className="py-4 px-4 text-right font-mono text-slate-700 dark:text-slate-300">
                        {fmtCurrency(item.volume24hUsd)}
                      </td>

                      <td className="py-4 px-4 text-right">
                        <Link
                          href="/tools"
                          className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-400 hover:text-slate-950 dark:hover:bg-amber-400 dark:hover:text-slate-950 text-slate-700 dark:text-slate-300 text-xs font-bold transition inline-flex items-center gap-1"
                        >
                          <span>Analyze</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. TAB 2: LIQUIDATIONS & HEATMAP */}
      {selectedTab === "liquidations" && (
        <div className="space-y-8">
          {/* Main Comprehensive Liquidation Heatmap Radar Component */}
          <LiquidationHeatmapRadar initialSymbol={searchParams.get("symbol") || "BTCUSDT"} />
        </div>
      )}

      {/* 5. TAB 3: FUNDING RATES MATRIX */}
      {selectedTab === "funding" && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden space-y-4">
          <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Percent className="w-4 h-4 text-blue-500" />
                <span>Multi-Exchange Perpetual Funding Rates</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Periodic payments exchanged between long and short traders to anchor perp contracts to spot index prices.
              </p>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <Clock className="w-3.5 h-3.5 text-amber-500" />
              <span>Next Settlement in: <strong className="text-slate-900 dark:text-white">03:42:15</strong></span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Symbol</th>
                  <th className="py-3 px-4 text-center">Binance</th>
                  <th className="py-3 px-4 text-center">Bybit</th>
                  <th className="py-3 px-4 text-center">OKX</th>
                  <th className="py-3 px-4 text-center">dYdX</th>
                  <th className="py-3 px-4 text-right">Predicted Next Rate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-300">
                {fundingRates.map((f) => (
                  <tr key={f.symbol} className="hover:bg-blue-50/40 dark:hover:bg-slate-800/50 transition">
                    <td className="py-4 px-4 font-extrabold text-slate-900 dark:text-white text-sm">
                      {f.base}/USDT
                    </td>

                    <td className="py-4 px-4 text-center font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {f.exchanges.binance}
                    </td>

                    <td className="py-4 px-4 text-center font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {f.exchanges.bybit}
                    </td>

                    <td className="py-4 px-4 text-center font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {f.exchanges.okx}
                    </td>

                    <td className="py-4 px-4 text-center font-mono font-bold text-emerald-600 dark:text-emerald-400">
                      {f.exchanges.dydx}
                    </td>

                    <td className="py-4 px-4 text-right font-mono font-black text-amber-600 dark:text-amber-400">
                      {f.predictedRate}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. TAB 4: LONG / SHORT RATIOS */}
      {selectedTab === "longshort" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {longShortRatios.map((item) => (
            <div
              key={item.symbol}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-black text-xs text-slate-900 dark:text-white">
                    {item.base}
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 dark:text-white text-sm">{item.base}/USDT Position Ratio</h4>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">Binance Futures Global Accounts</span>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
                  Ratio: {item.ratio}
                </span>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-emerald-600 dark:text-emerald-400">Longs {item.longRatio}%</span>
                  <span className="text-rose-600 dark:text-rose-400">Shorts {item.shortRatio}%</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden flex">
                  <div style={{ width: `${item.longRatio}%` }} className="bg-emerald-500" />
                  <div style={{ width: `${item.shortRatio}%` }} className="bg-rose-500" />
                </div>
              </div>

              {/* Top Traders Ratio & Taker Volume */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Top Trader Accounts</span>
                  <div className="font-extrabold text-slate-900 dark:text-white font-mono">
                    {item.topTradersLong}% Long / {item.topTradersShort}% Short
                  </div>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500">Taker Buy Volume</span>
                  <div className="font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                    {item.takerBuyVolPercent}% Net Buyers
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
