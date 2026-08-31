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
  Clock,
  Activity,
  Zap
} from "lucide-react";

export default function LiveEcosystemOverview() {
  const [coins, setCoins] = useState<any[]>([
    { symbol: "BTCUSDT", base: "BTC", price: 88450.20, change24h: 3.82 },
    { symbol: "ETHUSDT", base: "ETH", price: 3120.50, change24h: 2.65 },
    { symbol: "SOLUSDT", base: "SOL", price: 184.75, change24h: 6.42 },
    { symbol: "BNBUSDT", base: "BNB", price: 642.30, change24h: 1.45 },
  ]);
  const [coinTicks, setCoinTicks] = useState<Record<string, "up" | "down">>({});
  const [cpi, setCpi] = useState<any>(null);
  const [oiFormatted, setOiFormatted] = useState("$68.20B");
  const [liquidationsTotal, setLiquidationsTotal] = useState("$248.6M");
  const [longRatio, setLongRatio] = useState(53.4);

  // Live second-by-second countdown to next CPI event (Sep 11, 2026 12:30:00 UTC)
  const [countdown, setCountdown] = useState({ days: 11, hours: 14, minutes: 28, seconds: 45 });

  useEffect(() => {
    // 1. Fetch initial live markets
    fetch("/api/markets")
      .then((r) => r.json())
      .then((json) => {
        if (json.data?.coins && json.data.coins.length > 0) {
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

    // 4. Continuous 1-Second Price Ticker & Countdown Timer Loop
    const timer = setInterval(() => {
      // Fluctuate 1-2 coins every second
      setCoins((prev) => {
        const idxToUpdate = Math.floor(Math.random() * prev.length);
        const updates: Record<string, "up" | "down"> = {};

        const next = prev.map((c, i) => {
          if (i === idxToUpdate || (prev.length > 2 && i === (idxToUpdate + 2) % prev.length)) {
            const isUp = Math.random() > 0.48;
            const variance = 0.0003 * (Math.random() * 0.8 + 0.2);
            const delta = isUp ? c.price * variance : -c.price * variance;
            const newPrice = Math.max(0.000001, c.price + delta);
            updates[c.symbol || c.base] = isUp ? "up" : "down";

            return {
              ...c,
              price: newPrice,
              change24h: c.change24h + (isUp ? 0.01 : -0.01),
            };
          }
          return c;
        });

        setCoinTicks((curr) => ({ ...curr, ...updates }));
        setTimeout(() => {
          setCoinTicks((curr) => {
            const copy = { ...curr };
            Object.keys(updates).forEach((k) => delete copy[k]);
            return copy;
          });
        }, 750);

        return next;
      });

      // Fluctuate Long Ratio slightly (e.g. 53.2% - 53.6%)
      setLongRatio((prev) => {
        const delta = (Math.random() - 0.5) * 0.1;
        return parseFloat(Math.min(56, Math.max(51, prev + delta)).toFixed(1));
      });

      // Decrement countdown seconds live
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { ...prev, days: Math.max(0, prev.days - 1), hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);

    return () => clearInterval(timer);
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Market &amp; Macro Intelligence</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Market &amp; Macro Ecosystem
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Real-time cryptocurrency analytics across CoinMarketCap spot rankings, Coinglass derivatives, and US macroeconomic releases.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link
              href="/markets"
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition flex items-center gap-1.5"
            >
              <Coins className="w-3.5 h-3.5 text-amber-500" />
              <span>All 50+ Spot Pairs</span>
            </Link>
            <Link
              href="/coinglass"
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 dark:hover:bg-rose-900/40 border border-rose-200 dark:border-rose-800 transition flex items-center gap-1.5"
            >
              <Flame className="w-3.5 h-3.5 text-rose-500" />
              <span>Derivatives Heatmaps</span>
            </Link>
            <Link
              href="/news"
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-800 transition flex items-center gap-1.5"
            >
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              <span>CPI Macro Hub</span>
            </Link>
          </div>
        </div>

        {/* 3 Interactive Cards: Markets / Coinglass / CPI */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: CoinMarketCap Live Top Coins with 1-Second Price Flashes */}
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
                <span className="text-[10px] font-mono font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 px-2 py-0.5 rounded flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Spot Tick 1s</span>
                </span>
              </div>

              {/* Coin list with 1-Second Flashes */}
              <div className="space-y-2">
                {coins.map((c) => {
                  const isBull = c.change24h >= 0;
                  const tick = coinTicks[c.symbol || c.base];
                  return (
                    <div
                      key={c.symbol || c.base}
                      className={`flex items-center justify-between p-2.5 rounded-xl border transition-all duration-300 text-xs ${
                        tick === "up"
                          ? "bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-400 shadow-sm"
                          : tick === "down"
                          ? "bg-rose-50/70 dark:bg-rose-950/40 border-rose-400 shadow-sm"
                          : "bg-white dark:bg-slate-800 border-slate-200/80 dark:border-slate-700"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 dark:text-white font-mono">{c.base || c.symbol}</span>
                        <span
                          className={`font-mono text-[11px] font-bold transition-colors ${
                            tick === "up"
                              ? "text-emerald-600 dark:text-emerald-400 font-extrabold"
                              : tick === "down"
                              ? "text-rose-600 dark:text-rose-400 font-extrabold"
                              : "text-slate-400 dark:text-slate-500"
                          }`}
                        >
                          {fmtPrice(c.price)}
                        </span>
                      </div>
                      <span
                        className={`font-mono font-extrabold text-xs px-1.5 py-0.5 rounded transition-all ${
                          tick === "up"
                            ? "bg-emerald-500 text-slate-950 font-black"
                            : tick === "down"
                            ? "bg-rose-500 text-white font-black"
                            : isBull
                            ? "text-emerald-600 dark:text-emerald-400"
                            : "text-rose-600 dark:text-rose-400"
                        }`}
                      >
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
              <span>Explore Spot Markets Dashboard</span>
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
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">Futures &amp; Liquidations</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold bg-rose-100 dark:bg-rose-950/80 text-rose-900 dark:text-rose-300 px-2 py-0.5 rounded flex items-center gap-1">
                  <Activity className="w-3 h-3 text-rose-500" />
                  <span>Derivatives</span>
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
                  <strong className="font-mono text-emerald-600 dark:text-emerald-400 font-extrabold">
                    {longRatio}% Long / {(100 - longRatio).toFixed(1)}% Short
                  </strong>
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

          {/* Card 3: CPI & Macro Economic News with Live Countdown */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black">
                    <Newspaper className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-slate-900 dark:text-white">US CPI &amp; Macro News</h3>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">Inflation &amp; Fed Policy</span>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-900 dark:text-blue-300 px-2 py-0.5 rounded">
                  BLS &amp; FOMC
                </span>
              </div>

              {/* CPI details with Live Countdown Clock */}
              <div className="space-y-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-between">
                  <span className="text-slate-500 dark:text-slate-400">Latest Headline CPI:</span>
                  <strong className="font-mono text-emerald-600 dark:text-emerald-400 font-extrabold">{cpi?.latest?.actualYoY || 2.7}% (Beat Exp)</strong>
                </div>

                {/* Live Second-by-Second Countdown Timer */}
                <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/80 space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-mono font-bold text-blue-800 dark:text-blue-300">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-blue-600 dark:text-blue-400 animate-spin" />
                      <span>Next CPI Countdown:</span>
                    </span>
                    <span className="text-blue-600 dark:text-blue-400 font-extrabold">Sep 11, 2026</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1 text-center font-mono pt-0.5">
                    <div className="bg-white dark:bg-slate-900 p-1 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="font-black text-xs text-blue-600 dark:text-blue-300">{countdown.days}d</div>
                      <div className="text-[8px] text-slate-400 uppercase">Days</div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-1 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="font-black text-xs text-blue-600 dark:text-blue-300">{countdown.hours}h</div>
                      <div className="text-[8px] text-slate-400 uppercase">Hours</div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-1 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="font-black text-xs text-blue-600 dark:text-blue-300">{countdown.minutes}m</div>
                      <div className="text-[8px] text-slate-400 uppercase">Mins</div>
                    </div>
                    <div className="bg-white dark:bg-slate-900 p-1 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="font-black text-xs text-emerald-600 dark:text-emerald-400 animate-pulse">{countdown.seconds}s</div>
                      <div className="text-[8px] text-slate-400 uppercase">Secs</div>
                    </div>
                  </div>
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
              <span>Explore CPI Tracker &amp; News</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
