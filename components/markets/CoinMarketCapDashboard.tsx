"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Coins,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Search,
  Flame,
  ArrowUpRight,
  Sparkles,
  BarChart2,
  DollarSign,
  Layers,
  Fuel,
  Activity,
  ChevronRight,
  Filter
} from "lucide-react";

interface CryptoCoin {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change1h: number;
  change24h: number;
  change7d: number;
  volume24h: number;
  marketCap: number;
  circulatingSupply: number;
  totalSupply: number;
  rank: number;
  category: string;
  high24h: number;
  low24h: number;
  sparkline: number[];
}

interface GlobalData {
  totalMarketCapFormatted: string;
  totalVolume24hFormatted: string;
  btcDominance: string;
  ethDominance: string;
  solDominance: string;
  fearAndGreed: { value: string; classification: string };
  gasGwei: number;
  marketCapChange24h: number;
  lastUpdated: string;
}

export default function CoinMarketCapDashboard() {
  const [coins, setCoins] = useState<CryptoCoin[]>([]);
  const [global, setGlobal] = useState<GlobalData | null>(null);
  const [topGainers, setTopGainers] = useState<CryptoCoin[]>([]);
  const [topLosers, setTopLosers] = useState<CryptoCoin[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState<"rank" | "price" | "change24h" | "volume24h" | "marketCap">("rank");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [lastSyncTime, setLastSyncTime] = useState("");
  const [countdown, setCountdown] = useState(10);

  // Fetch live market data from /api/markets
  const fetchMarketData = useCallback(async () => {
    try {
      const res = await fetch("/api/markets");
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setCoins(json.data.coins || []);
          setGlobal(json.data.global || null);
          setTopGainers(json.data.topGainers || []);
          setTopLosers(json.data.topLosers || []);
          setLastSyncTime(new Date().toLocaleTimeString());
        }
      }
      setLoading(false);
      setCountdown(10);
    } catch (err) {
      console.warn("Market fetch error:", err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 10000);
    const countTimer = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 10));
    }, 1000);
    return () => {
      clearInterval(interval);
      clearInterval(countTimer);
    };
  }, [fetchMarketData]);

  // Categories
  const categories = ["All", "Layer 1", "DeFi", "AI & Big Data", "Memes", "Exchange", "Payment"];

  // Filter & Sort
  const filteredCoins = coins
    .filter((coin) => {
      const matchSearch =
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = selectedCategory === "All" || coin.category === selectedCategory;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];
      if (sortOrder === "asc") {
        return valA > valB ? 1 : -1;
      } else {
        return valA < valB ? 1 : -1;
      }
    });

  const handleSort = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder(field === "rank" ? "asc" : "desc");
    }
  };

  const fmtPrice = (n: number) => {
    if (n >= 1000) return `$${n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    if (n >= 1) return `$${n.toFixed(2)}`;
    if (n >= 0.01) return `$${n.toFixed(4)}`;
    return `$${n.toFixed(8)}`;
  };

  const fmtCurrency = (n: number) => {
    if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
    if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
    if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
    return `$${n.toLocaleString()}`;
  };

  // Render SVG mini sparkline
  const renderSparkline = (points: number[] | undefined, isBull: boolean) => {
    if (!points || points.length < 2) return null;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const width = 110;
    const height = 32;

    const coords = points
      .map((p, i) => {
        const x = (i / (points.length - 1)) * width;
        const y = height - ((p - min) / range) * (height - 6) - 3;
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");

    return (
      <svg width={width} height={height} className="overflow-visible">
        <polyline
          fill="none"
          stroke={isBull ? "#10b981" : "#f43f5e"}
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={coords}
        />
      </svg>
    );
  };

  return (
    <div className="space-y-10 pb-20">
      
      {/* 1. HERO & GLOBAL MARKET BANNER */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl relative overflow-hidden">
        {/* Background glow accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  <Coins className="w-3.5 h-3.5 text-amber-400" />
                  CoinMarketCap Intelligence
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                Cryptocurrency Prices, <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                  Market Cap & Volume Rankings
                </span>
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mt-2 leading-relaxed">
                Real-time market valuation, 24h spot volume, dominance indexes, and algorithmic momentum indicators across global crypto assets.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={fetchMarketData}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center gap-2 border border-slate-700"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-amber-400 ${loading ? "animate-spin" : ""}`} />
                <span>Sync Now</span>
              </button>
              <Link
                href="/coinglass"
                className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold transition flex items-center gap-1.5 shadow-md shadow-rose-600/20"
              >
                <Flame className="w-3.5 h-3.5" />
                <span>Coinglass Derivatives</span>
              </Link>
            </div>
          </div>

          {/* Global Statistics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 pt-4 border-t border-slate-800/80 text-xs">
            
            <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Total Market Cap</span>
              <div className="text-base font-extrabold text-white font-mono">
                {global?.totalMarketCapFormatted || "$2.68T"}
              </div>
              <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3" /> +{global?.marketCapChange24h || 3.4}% 24h
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">24h Total Volume</span>
              <div className="text-base font-extrabold text-white font-mono">
                {global?.totalVolume24hFormatted || "$98.4B"}
              </div>
              <span className="text-[10px] text-slate-400">Global Spot & Perp</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">BTC Dominance</span>
              <div className="text-base font-extrabold text-amber-400 font-mono">
                {global?.btcDominance || "56.4%"}
              </div>
              <span className="text-[10px] text-slate-400">ETH: {global?.ethDominance || "13.8%"}</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Fear & Greed</span>
              <div className="text-base font-extrabold text-emerald-400 font-mono">
                {global?.fearAndGreed?.value || "74"} / 100
              </div>
              <span className="text-[10px] text-emerald-400 font-bold">
                {global?.fearAndGreed?.classification || "Greed"}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">ETH Gas Fee</span>
              <div className="text-base font-extrabold text-blue-400 font-mono">
                {global?.gasGwei || 14} Gwei
              </div>
              <span className="text-[10px] text-slate-400">≈ $0.45 Standard</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/50 border border-slate-700/60 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Next CPI Release</span>
              <div className="text-base font-extrabold text-amber-300 font-mono">
                Sep 11, 2026
              </div>
              <Link href="/news" className="text-[10px] text-amber-400 hover:underline flex items-center gap-0.5">
                View Forecast <ChevronRight className="w-3 h-3" />
              </Link>
            </div>

          </div>
        </div>
      </div>

      {/* 2. TOP GAINERS & LOSERS SUMMARY CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Top Gainers */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-500" />
              <span>Top 24h Gainers</span>
            </h3>
            <span className="text-[10px] font-mono font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/80 px-2 py-0.5 rounded">
              High Momentum
            </span>
          </div>

          <div className="space-y-2.5">
            {topGainers.map((coin) => (
              <div
                key={coin.symbol}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 font-black text-[11px] flex items-center justify-center">
                    {coin.symbol}
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-900 dark:text-white">{coin.name}</div>
                    <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{fmtPrice(coin.price)}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    +{coin.change24h.toFixed(2)}%
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">{fmtCurrency(coin.volume24h)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Losers / Dips */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-rose-500" />
              <span>Top 24h Pullbacks</span>
            </h3>
            <span className="text-[10px] font-mono font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/80 px-2 py-0.5 rounded">
              Dip Watch
            </span>
          </div>

          <div className="space-y-2.5">
            {topLosers.map((coin) => (
              <div
                key={coin.symbol}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300 font-black text-[11px] flex items-center justify-center">
                    {coin.symbol}
                  </div>
                  <div>
                    <div className="text-xs font-extrabold text-slate-900 dark:text-white">{coin.name}</div>
                    <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">{fmtPrice(coin.price)}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-black text-rose-600 dark:text-rose-400 font-mono">
                    {coin.change24h >= 0 ? "+" : ""}{coin.change24h.toFixed(2)}%
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">{fmtCurrency(coin.volume24h)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Bot Quick Launcher Promo */}
        <div className="bg-gradient-to-br from-amber-500 to-yellow-400 text-slate-950 p-5 rounded-3xl shadow-sm space-y-3 flex flex-col justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-950 font-black text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" /> AI Bot Auto Execution
            </div>
            <h4 className="text-lg font-black leading-tight">
              Automate Market Signals with Vetted AI Bots
            </h4>
            <p className="text-xs text-slate-900 font-medium leading-relaxed">
              Plug these live prices directly into 5 algorithmic strategies with automated position sizing and exact Risk-to-Reward targets.
            </p>
          </div>

          <Link
            href="/tools"
            className="w-full py-2.5 bg-slate-950 text-white rounded-xl text-xs font-black text-center hover:bg-slate-900 transition flex items-center justify-center gap-1.5 shadow-md"
          >
            <span>Launch Bot Terminal</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
          </Link>
        </div>

      </div>

      {/* 3. CONTROLS: CATEGORIES & SEARCH BAR */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 shadow-sm font-black"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search crypto (e.g. BTC, Solana)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-slate-400"
            />
          </div>

        </div>
      </div>

      {/* 4. MAIN COINMARKETCAP LIVE TABLE */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-wider select-none">
              <tr>
                <th
                  onClick={() => handleSort("rank")}
                  className="py-3.5 px-4 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                >
                  # {sortBy === "rank" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
                <th className="py-3.5 px-4">Name</th>
                <th
                  onClick={() => handleSort("price")}
                  className="py-3.5 px-4 text-right cursor-pointer hover:text-slate-900 dark:hover:text-white"
                >
                  Price {sortBy === "price" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
                <th className="py-3.5 px-4 text-right">1h %</th>
                <th
                  onClick={() => handleSort("change24h")}
                  className="py-3.5 px-4 text-right cursor-pointer hover:text-slate-900 dark:hover:text-white"
                >
                  24h % {sortBy === "change24h" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
                <th className="py-3.5 px-4 text-right">7d %</th>
                <th
                  onClick={() => handleSort("volume24h")}
                  className="py-3.5 px-4 text-right cursor-pointer hover:text-slate-900 dark:hover:text-white hidden sm:table-cell"
                >
                  24h Volume {sortBy === "volume24h" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
                <th
                  onClick={() => handleSort("marketCap")}
                  className="py-3.5 px-4 text-right cursor-pointer hover:text-slate-900 dark:hover:text-white hidden md:table-cell"
                >
                  Market Cap {sortBy === "marketCap" ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                </th>
                <th className="py-3.5 px-4 text-center hidden lg:table-cell">Last 7 Days</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-300">
              {filteredCoins.map((coin) => {
                const isBull24h = coin.change24h >= 0;
                const isBull1h = coin.change1h >= 0;
                const isBull7d = coin.change7d >= 0;

                return (
                  <tr
                    key={coin.id}
                    className="hover:bg-amber-50/40 dark:hover:bg-slate-800/50 transition group"
                  >
                    {/* Rank */}
                    <td className="py-4 px-4 font-mono font-bold text-slate-400 dark:text-slate-500 text-xs">
                      {coin.rank}
                    </td>

                    {/* Name & Icon */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-black text-xs text-slate-900 dark:text-white group-hover:scale-105 transition">
                          {coin.symbol}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-extrabold text-slate-900 dark:text-white text-sm group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                              {coin.name}
                            </span>
                            <span className="font-mono font-bold text-[11px] text-slate-400 dark:text-slate-500 uppercase">
                              {coin.symbol}
                            </span>
                          </div>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                            {coin.category}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4 text-right font-mono font-extrabold text-slate-900 dark:text-white text-sm">
                      {fmtPrice(coin.price)}
                    </td>

                    {/* 1h % */}
                    <td className={`py-4 px-4 text-right font-mono font-bold ${isBull1h ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                      {isBull1h ? "+" : ""}{coin.change1h.toFixed(2)}%
                    </td>

                    {/* 24h % */}
                    <td className="py-4 px-4 text-right">
                      <span
                        className={`inline-flex items-center gap-0.5 px-2 py-0.5 rounded-lg font-mono font-black text-xs ${
                          isBull24h
                            ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300"
                            : "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300"
                        }`}
                      >
                        {isBull24h ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {isBull24h ? "+" : ""}{coin.change24h.toFixed(2)}%
                      </span>
                    </td>

                    {/* 7d % */}
                    <td className={`py-4 px-4 text-right font-mono font-bold ${isBull7d ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                      {isBull7d ? "+" : ""}{coin.change7d.toFixed(2)}%
                    </td>

                    {/* 24h Volume */}
                    <td className="py-4 px-4 text-right font-mono text-slate-700 dark:text-slate-300 hidden sm:table-cell">
                      {fmtCurrency(coin.volume24h)}
                    </td>

                    {/* Market Cap */}
                    <td className="py-4 px-4 text-right font-mono font-bold text-slate-900 dark:text-white hidden md:table-cell">
                      {fmtCurrency(coin.marketCap)}
                    </td>

                    {/* Mini Sparkline */}
                    <td className="py-4 px-4 text-center hidden lg:table-cell">
                      <div className="flex justify-center">
                        {renderSparkline(coin.sparkline, isBull7d)}
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-4 px-4 text-right">
                      <Link
                        href={`/tools`}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-400 hover:text-slate-950 dark:hover:bg-amber-400 dark:hover:text-slate-950 text-slate-700 dark:text-slate-300 text-xs font-bold transition inline-flex items-center gap-1"
                      >
                        <span>Trade / Bot</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer info in table */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <div>
            Showing <strong>{filteredCoins.length}</strong> top cryptocurrencies
          </div>
          <div className="font-mono text-[11px]">
            Last Updated: <strong className="text-slate-800 dark:text-slate-200">{lastSyncTime || "Just now"}</strong>
          </div>
        </div>
      </div>

    </div>
  );
}
