"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { TrendingUp, TrendingDown, Flame, Fuel, Activity, Calendar, ShieldCheck, Sparkles } from "lucide-react";

interface TickerPrice {
  symbol: string;
  base: string;
  price: number;
  change24h: number;
}

export default function LiveTickerBar() {
  const [tickers, setTickers] = useState<TickerPrice[]>([
    { symbol: "BTCUSDT", base: "BTC", price: 88450.20, change24h: 3.82 },
    { symbol: "ETHUSDT", base: "ETH", price: 3120.50, change24h: 2.65 },
    { symbol: "SOLUSDT", base: "SOL", price: 184.75, change24h: 6.42 },
    { symbol: "BNBUSDT", base: "BNB", price: 642.30, change24h: 1.45 },
    { symbol: "XRPUSDT", base: "XRP", price: 2.45, change24h: 4.15 },
  ]);

  const [globalStats, setGlobalStats] = useState({
    mcap: "$2.68T",
    vol24h: "$98.4B",
    btcDom: "56.4%",
    fng: "74 Greed",
    gas: "14 Gwei",
    nextCpiDays: "15d",
  });

  const [isLive, setIsLive] = useState(true);

  // Poll live market API for real-time tickers
  useEffect(() => {
    const fetchLiveStats = async () => {
      try {
        const res = await fetch("/api/markets");
        if (res.ok) {
          const json = await res.json();
          if (json.success && json.data) {
            const coins = json.data.coins || [];
            const btc = coins.find((c: any) => c.symbol === "BTC");
            const eth = coins.find((c: any) => c.symbol === "ETH");
            const sol = coins.find((c: any) => c.symbol === "SOL");
            const bnb = coins.find((c: any) => c.symbol === "BNB");
            const xrp = coins.find((c: any) => c.symbol === "XRP");

            const updated: TickerPrice[] = [];
            if (btc) updated.push({ symbol: "BTCUSDT", base: "BTC", price: btc.price, change24h: btc.change24h });
            if (eth) updated.push({ symbol: "ETHUSDT", base: "ETH", price: eth.price, change24h: eth.change24h });
            if (sol) updated.push({ symbol: "SOLUSDT", base: "SOL", price: sol.price, change24h: sol.change24h });
            if (bnb) updated.push({ symbol: "BNBUSDT", base: "BNB", price: bnb.price, change24h: bnb.change24h });
            if (xrp) updated.push({ symbol: "XRPUSDT", base: "XRP", price: xrp.price, change24h: xrp.change24h });

            if (updated.length > 0) setTickers(updated);

            if (json.data.global) {
              const g = json.data.global;
              setGlobalStats({
                mcap: g.totalMarketCapFormatted || "$2.68T",
                vol24h: g.totalVolume24hFormatted || "$98.4B",
                btcDom: g.btcDominance || "56.4%",
                fng: `${g.fearAndGreed?.value || 74} ${g.fearAndGreed?.classification || "Greed"}`,
                gas: `${g.gasGwei || 14} Gwei`,
                nextCpiDays: "15d",
              });
            }
            setIsLive(true);
          }
        }
      } catch (err) {
        console.warn("Ticker fetch warning:", err);
      }
    };

    fetchLiveStats();
    const interval = setInterval(fetchLiveStats, 8000);
    return () => clearInterval(interval);
  }, []);

  const fmt = (n: number) => {
    if (n >= 1000) return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (n >= 1) return n.toFixed(2);
    return n.toFixed(4);
  };

  return (
    <div className="bg-slate-950 text-slate-300 text-[11px] border-b border-slate-800/80 select-none overflow-x-auto no-scrollbar">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-9 flex items-center justify-between gap-6 whitespace-nowrap">
        
        {/* Left: Global Metrics Quick Bar */}
        <div className="flex items-center gap-4 text-slate-400 font-medium">
          <div className="flex items-center gap-1.5 text-slate-300 font-bold">
            <Sparkles className="w-3 h-3 text-amber-400" />
            <span className="text-[10px] tracking-wider uppercase font-extrabold text-slate-200">Markets</span>
          </div>

          <span className="text-slate-700 hidden sm:inline">|</span>

          <Link href="/markets" className="hover:text-amber-400 transition hidden md:flex items-center gap-1">
            <span>Market Cap:</span>
            <strong className="text-white font-mono">{globalStats.mcap}</strong>
          </Link>

          <Link href="/markets" className="hover:text-amber-400 transition hidden lg:flex items-center gap-1">
            <span>24h Vol:</span>
            <strong className="text-white font-mono">{globalStats.vol24h}</strong>
          </Link>

          <Link href="/markets" className="hover:text-amber-400 transition hidden sm:flex items-center gap-1">
            <span>BTC Dom:</span>
            <strong className="text-amber-400 font-mono font-bold">{globalStats.btcDom}</strong>
          </Link>

          <Link href="/coinglass" className="hover:text-emerald-400 transition hidden xl:flex items-center gap-1">
            <Flame className="w-3 h-3 text-amber-500" />
            <span>Fear & Greed:</span>
            <strong className="text-emerald-400 font-mono">{globalStats.fng}</strong>
          </Link>

          <Link href="/news" className="hover:text-amber-300 transition flex items-center gap-1 text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
            <Calendar className="w-3 h-3 text-amber-400" />
            <span>Next CPI Release:</span>
            <strong className="font-mono text-white">Sep 11 (2.6% Est)</strong>
          </Link>
        </div>

        {/* Right: Live Crypto Tickers Stream */}
        <div className="flex items-center gap-4">
          {tickers.map((t) => {
            const isBull = t.change24h >= 0;
            return (
              <Link
                key={t.symbol}
                href="/markets"
                className="flex items-center gap-1.5 hover:text-white transition group py-0.5"
              >
                <span className="font-bold text-white group-hover:text-amber-400 transition">{t.base}</span>
                <span className="font-mono text-slate-200">${fmt(t.price)}</span>
                <span className={`font-mono text-[10px] font-bold flex items-center ${isBull ? "text-emerald-400" : "text-rose-400"}`}>
                  {isBull ? "+" : ""}{t.change24h.toFixed(2)}%
                </span>
              </Link>
            );
          })}
        </div>

      </div>
    </div>
  );
}
