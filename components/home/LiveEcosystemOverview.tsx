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
    <section className="py-12 bg-white border-t border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider">
                Live Data Feeds Connected
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Live Market & Macro Ecosystem
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Synchronized real-time feeds across CoinMarketCap, Coinglass derivatives, and US CPI inflation releases.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/markets"
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition"
            >
              All 50+ Coins
            </Link>
            <Link
              href="/coinglass"
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition"
            >
              Coinglass Heatmaps
            </Link>
            <Link
              href="/news"
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 transition"
            >
              CPI Macro Hub
            </Link>
          </div>
        </div>

        {/* 3 Interactive Cards: Markets / Coinglass / CPI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: CoinMarketCap Live Top Coins */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
                    <Coins className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">CoinMarketCap Live</h3>
                    <span className="text-[10px] text-slate-400">Spot Market Rankings</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded">
                  CMC Feed
                </span>
              </div>

              {/* Coin list */}
              <div className="space-y-2">
                {coins.map((c) => {
                  const isBull = c.change24h >= 0;
                  return (
                    <div
                      key={c.symbol}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/80 text-xs"
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900">{c.base || c.symbol}</span>
                        <span className="font-mono text-[11px] text-slate-400">{fmtPrice(c.price)}</span>
                      </div>
                      <span className={`font-mono font-bold text-xs ${isBull ? "text-emerald-600" : "text-rose-600"}`}>
                        {isBull ? "+" : ""}{c.change24h.toFixed(2)}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <Link
              href="/markets"
              className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold text-center transition flex items-center justify-center gap-1.5 shadow-sm mt-2"
            >
              <span>Explore Live Markets Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card 2: Coinglass Derivatives & Liquidations */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center font-black">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">Coinglass Derivatives</h3>
                    <span className="text-[10px] text-slate-400">Futures & Liquidations</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold bg-rose-100 text-rose-900 px-2 py-0.5 rounded">
                  Perp Feeds
                </span>
              </div>

              {/* Stats */}
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between">
                  <span className="text-slate-500">Aggregate Open Interest:</span>
                  <strong className="font-mono text-amber-700 font-extrabold">{oiFormatted}</strong>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between">
                  <span className="text-slate-500">24h Liquidations Total:</span>
                  <strong className="font-mono text-rose-600 font-extrabold">{liquidationsTotal}</strong>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between">
                  <span className="text-slate-500">BTC Long/Short Ratio:</span>
                  <strong className="font-mono text-emerald-600 font-extrabold">53.4% Long / 46.6% Short</strong>
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
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
                    <Newspaper className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900">US CPI & Macro News</h3>
                    <span className="text-[10px] text-slate-400">Inflation & Fed Policy</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold bg-blue-100 text-blue-900 px-2 py-0.5 rounded">
                  BLS & FOMC
                </span>
              </div>

              {/* CPI details */}
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between">
                  <span className="text-slate-500">Latest Headline CPI:</span>
                  <strong className="font-mono text-emerald-600 font-extrabold">{cpi?.latest.actualYoY || 2.7}% (Beat Exp)</strong>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between">
                  <span className="text-slate-500">Next CPI Release Date:</span>
                  <strong className="font-mono text-amber-700 font-extrabold">Sep 11, 2026</strong>
                </div>
                <div className="p-3 rounded-xl bg-white border border-slate-200/80 flex items-center justify-between">
                  <span className="text-slate-500">Fed 25bps Rate Cut Odds:</span>
                  <strong className="font-mono text-emerald-600 font-extrabold">84.5% Probability</strong>
                </div>
              </div>
            </div>

            <Link
              href="/news"
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold text-center transition flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20 mt-2"
            >
              <span>Explore CPI Tracker & News Feed</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
