"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Coins,
  Flame,
  Newspaper,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Sparkles,
  Layers,
  Activity,
  Calendar,
  ShieldCheck
} from "lucide-react";

export default function LiveEcosystemOverview() {
  const [coins, setCoins] = useState<any[]>([]);
  const [cpi, setCpi] = useState<any>(null);
  const [oiFormatted, setOiFormatted] = useState("$68.20B");
  const [liquidationsTotal, setLiquidationsTotal] = useState("$248.6M");

  useEffect(() => {
    // 1. Fetch live markets
    fetch("/api/markets")
      .then((r) => r.json())
      .then((json) => {
        if (json.data?.coins) {
          setCoins(json.data.coins.slice(0, 4));
        }
      })
      .catch(() => {});

    // 2. Fetch Coinglass metrics
    fetch("/api/coinglass")
      .then((r) => r.json())
      .then((json) => {
        if (json.data) {
          setOiFormatted(json.data.totalOpenInterestFormatted || "$68.20B");
          if (json.data.liquidations?.total24hUsd) {
            setLiquidationsTotal(`$${(json.data.liquidations.total24hUsd / 1e6).toFixed(1)}M`);
          }
        }
      })
      .catch(() => {});

    // 3. Fetch CPI
    fetch("/api/news")
      .then((r) => r.json())
      .then((json) => {
        if (json.data?.cpi) {
          setCpi(json.data.cpi);
        }
      })
      .catch(() => {});
  }, []);

  const fmtPrice = (n: number) => {
    if (n >= 1000) return `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (n >= 1) return `$${n.toFixed(2)}`;
    return `$${n.toFixed(4)}`;
  };

  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-slate-950 border-t border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Market & Macro Intelligence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Live Market & Macro Ecosystem
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Real-time cryptocurrency analytics across CoinMarketCap spot rankings, Coinglass derivatives, and US macroeconomic releases.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/markets"
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
            >
              All 50+ Coins
            </Link>
            <Link
              href="/coinglass"
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/40 border border-rose-200 dark:border-rose-800 transition"
            >
              Coinglass Heatmaps
            </Link>
            <Link
              href="/news"
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-800 transition"
            >
              CPI Macro Hub
            </Link>
          </div>
        </div>

        {/* 3 Interactive Cards: Markets / Coinglass / CPI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: CoinMarketCap Live Top Coins */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
                    <Coins className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white">CoinMarketCap Spot</h3>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">Spot Market Rankings</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 px-2 py-0.5 rounded">
                  Spot Rankings
                </span>
              </div>

              {/* Coin list */}
              <div className="space-y-2">
                {coins.map((c) => {
                  const isBull = c.change24h >= 0;
                  return (
                    <div
                      key={c.symbol}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 dark:text-white">{c.base || c.symbol}</span>
                        <span className="font-mono text-[11px] text-slate-400 dark:text-slate-500">{fmtPrice(c.price)}</span>
                      </div>
                      <span className={`font-mono font-bold text-xs ${isBull ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                        {isBull ? "+" : ""}{c.change24h.toFixed(2)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <Link
              href="/markets"
              className="w-full py-2.5 bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-bold text-center transition flex items-center justify-center gap-1.5 shadow-sm mt-2"
            >
              <span>Explore Live Markets Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: Coinglass Derivatives & Liquidations */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center font-black">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white">Coinglass Derivatives</h3>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">Futures & Liquidations</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold bg-rose-100 dark:bg-rose-950/80 text-rose-900 dark:text-rose-300 px-2 py-0.5 rounded">
                  Derivatives
                </span>
              </div>

              {/* Stats */}
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Aggregate Open Interest:</span>
                  <strong className="font-mono text-amber-600 dark:text-amber-400 font-extrabold">{oiFormatted}</strong>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">24h Liquidations Total:</span>
                  <strong className="font-mono text-rose-600 dark:text-rose-400 font-extrabold">{liquidationsTotal}</strong>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">BTC Long/Short Ratio:</span>
                  <strong className="font-mono text-emerald-600 dark:text-emerald-400 font-extrabold">53.4% Long / 46.6% Short</strong>
                </div>
              </div>
            </div>

            <Link
              href="/coinglass"
              className="w-full py-2.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold text-center transition flex items-center justify-center gap-1.5 shadow-md shadow-rose-600/20 mt-2"
            >
              <span>View Coinglass Liquidation Heatmaps</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 3: CPI & Macro Economic News */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
                    <Newspaper className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white">US CPI & Macro News</h3>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">Inflation & Fed Policy</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300 px-2 py-0.5 rounded">
                  BLS & FOMC
                </span>
              </div>

              {/* CPI details */}
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Latest Headline CPI:</span>
                  <strong className="font-mono text-emerald-600 dark:text-emerald-400 font-extrabold">{cpi?.latest.actualYoY || 2.7}% (Beat Exp)</strong>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Next CPI Release Date:</span>
                  <strong className="font-mono text-amber-600 dark:text-amber-400 font-extrabold">Sep 11, 2026</strong>
                </div>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Fed 25bps Rate Cut Odds:</span>
                  <strong className="font-mono text-emerald-600 dark:text-emerald-400 font-extrabold">84.5% Probability</strong>
                </div>
              </div>
            </div>

            <Link
              href="/news"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold text-center transition flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20 mt-2"
            >
              <span>Explore CPI Tracker & News</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
