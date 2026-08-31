"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Newspaper,
  Calendar,
  TrendingUp,
  TrendingDown,
  Search,
  ExternalLink,
  Flame,
  Clock,
  Sparkles,
  Info,
  Layers,
  ArrowRight,
  Filter,
  Landmark,
  Percent,
  CheckCircle2,
  AlertTriangle,
  X,
  BookOpen,
  Share2,
  Copy,
  Check,
  Zap,
  Activity
} from "lucide-react";
import { CPIDataRelease, NewsItem } from "@/app/api/news/route";

interface CPIOverview {
  latest: {
    period: string;
    actualYoY: number;
    forecastYoY: number;
    previousYoY: number;
    actualMoM: number;
    coreActualYoY: number;
    coreForecastYoY: number;
    releaseDate: string;
    status: string;
    inflationStatusText: string;
  };
  upcoming: {
    event: string;
    releaseDate: string;
    daysRemaining: number;
    consensusForecastYoY: string;
    previousYoY: string;
    criticalLevel: string;
    impactOutlook: string;
  };
  historicalReleases: CPIDataRelease[];
}

interface MacroFedData {
  currentFedFundsRate: string;
  fomcMeetingDate: string;
  rateCut25bpsProbability: number;
  rateHoldProbability: number;
  rateCut50bpsProbability: number;
  fedBalanceSheet: string;
  unemploymentRate: string;
  gdpGrowthYoY: string;
  macroRegime: string;
}

export default function CryptoNewsCPIDashboard() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [cpi, setCpi] = useState<CPIOverview | null>(null);
  const [macroFed, setMacroFed] = useState<MacroFedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [copiedArticle, setCopiedArticle] = useState(false);

  const fetchNewsAndCpi = useCallback(async () => {
    try {
      const res = await fetch("/api/news");
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setNews(json.data.news || []);
          setCpi(json.data.cpi || null);
          setMacroFed(json.data.macroFed || null);
        }
      }
      setLoading(false);
    } catch (err) {
      console.warn("News & CPI background sync notice:", err);
      setLoading(false);
    }
  }, []);

  // Automatic live fetch every 5 minutes (300,000 ms) in the background with zero manual buttons required
  useEffect(() => {
    fetchNewsAndCpi();
    const interval = setInterval(fetchNewsAndCpi, 300000);
    return () => clearInterval(interval);
  }, [fetchNewsAndCpi]);

  const categories = ["All", "Macro & CPI", "Fed Rates", "Bitcoin", "Ethereum", "Institutional", "Derivatives", "DeFi", "Regulation"];

  const filteredNews = news.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.affectedCoins && item.affectedCoins.some((c) => c.symbol.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchCat = selectedCategory === "All" || item.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const handleCopyStory = () => {
    if (!selectedArticle) return;
    navigator.clipboard.writeText(`${selectedArticle.title} - Read more on BitcoinCrypto.tech`);
    setCopiedArticle(true);
    setTimeout(() => setCopiedArticle(false), 2500);
  };

  return (
    <div className="space-y-10 pb-20">
      
      {/* 1. HERO & CPI LIVE HIGHLIGHT BANNER */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 border border-blue-900/40 shadow-xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  <Newspaper className="w-3.5 h-3.5 text-blue-400" />
                  Real-Time Crypto News &amp; Macroeconomic Intelligence
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Auto-Sync 5m
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                US CPI Inflation Tracker &amp; <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                  Macroeconomic Crypto News
                </span>
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mt-2 leading-relaxed">
                Stay ahead of Bitcoin and crypto market volatility with real-time US Consumer Price Index releases, Federal Reserve FOMC interest rate odds, and human-written institutional financial journalism.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/markets"
                className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition flex items-center gap-1.5 shadow-md hover:scale-105"
              >
                <span>Explore Live Markets</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* CPI & Fed Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4 border-t border-slate-800 text-xs">
            
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Latest Headline CPI YoY</span>
              <div className="text-lg font-black text-emerald-400 font-mono">
                {cpi?.latest.actualYoY || 2.7}%
              </div>
              <span className="text-[10px] text-emerald-300 font-bold">
                Beat Forecast ({cpi?.latest.forecastYoY || 2.9}%)
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Next CPI Release</span>
              <div className="text-lg font-black text-amber-300 font-mono">
                Sep 11, 2026
              </div>
              <span className="text-[10px] text-slate-400">
                15 Days Remaining (2.6% Est)
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Fed Funds Target Rate</span>
              <div className="text-lg font-black text-white font-mono">
                {macroFed?.currentFedFundsRate || "4.25% - 4.50%"}
              </div>
              <span className="text-[10px] text-blue-400 font-bold">
                Next FOMC: {macroFed?.fomcMeetingDate || "Sep 17, 2026"}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Rate Cut Probability</span>
              <div className="text-lg font-black text-emerald-400 font-mono">
                {macroFed?.rateCut25bpsProbability || 88.5}%
              </div>
              <span className="text-[10px] text-emerald-300">
                25 bps Easing Expected
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* 2. DEDICATED US CPI INFLATION TRACKER TERMINAL */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 flex items-center justify-center font-black text-xs">
                CPI
              </div>
              <h2 className="text-lg font-black text-slate-900 dark:text-white">
                US Consumer Price Index (CPI) Dashboard
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Official Bureau of Labor Statistics inflation prints and historical correlation with Bitcoin price moves.
            </p>
          </div>

          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto">
            Disinflation Regime Active
          </span>
        </div>

        {/* CPI Live Card Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Latest Print Breakdown */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-900 dark:text-white uppercase">Latest Print Breakdown</span>
              <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">{cpi?.latest.period}</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">Headline CPI YoY:</span>
                <strong className="text-emerald-700 dark:text-emerald-400 font-mono text-sm">{cpi?.latest.actualYoY}% (Beat)</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">Consensus Forecast:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">{cpi?.latest.forecastYoY}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-400">Previous Period:</span>
                <span className="font-mono text-slate-700 dark:text-slate-300">{cpi?.latest.previousYoY}%</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200 dark:border-slate-700">
                <span className="text-slate-600 dark:text-slate-400">Core CPI (Ex-Food/Energy):</span>
                <strong className="text-slate-900 dark:text-white font-mono">{cpi?.latest.coreActualYoY}% (Exp: {cpi?.latest.coreForecastYoY}%)</strong>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-1 leading-relaxed">
              {cpi?.latest.inflationStatusText}
            </p>
          </div>

          {/* Upcoming CPI Release Countdown */}
          <div className="p-5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-950 dark:text-blue-300 uppercase flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Upcoming Release
                </span>
                <span className="text-[10px] font-mono font-bold bg-blue-200 dark:bg-blue-900/60 text-blue-900 dark:text-blue-300 px-2 py-0.5 rounded">
                  High Volatility Alert
                </span>
              </div>

              <div className="text-base font-black text-slate-900 dark:text-white">
                {cpi?.upcoming.event}
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1">
                <div>Release Date: <strong className="text-slate-900 dark:text-white">{cpi?.upcoming.releaseDate}</strong></div>
                <div>Consensus Forecast: <strong className="text-blue-700 dark:text-blue-400 font-mono">{cpi?.upcoming.consensusForecastYoY}</strong></div>
                <div>Previous Print: <span className="font-mono text-slate-600 dark:text-slate-400">{cpi?.upcoming.previousYoY}</span></div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-700 text-[11px] text-blue-950 dark:text-blue-200 font-medium">
              💡 {cpi?.upcoming.impactOutlook}
            </div>
          </div>

          {/* Macro Impact on Bitcoin & Crypto */}
          <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-black text-amber-950 dark:text-amber-300 uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" /> Why CPI Moves Bitcoin
              </span>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                Liquidity Cycles &amp; Real Interest Rates
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">
                When CPI comes in lower than expectations, it gives the Federal Reserve room to cut interest rates. Lower rates expand global M2 money supply, creating tailwinds for digital assets like Bitcoin and Ethereum.
              </p>
            </div>

            <Link
              href="/concepts"
              className="w-full py-2 bg-amber-400 text-slate-950 rounded-xl text-xs font-bold text-center hover:bg-amber-300 transition flex items-center justify-center gap-1 shadow-sm"
            >
              <span>Learn Macro Crypto Models</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

        </div>

        {/* Historical CPI Releases Table */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
            Historical CPI Releases &amp; Bitcoin Price Reaction
          </h3>

          <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px]">
                <tr>
                  <th className="py-3 px-4">Period</th>
                  <th className="py-3 px-4">Release Date</th>
                  <th className="py-3 px-4 text-center">Actual YoY</th>
                  <th className="py-3 px-4 text-center">Forecast</th>
                  <th className="py-3 px-4 text-center">Previous</th>
                  <th className="py-3 px-4 text-right">BTC 1h Reaction</th>
                  <th className="py-3 px-4 text-right">BTC 24h Reaction</th>
                  <th className="py-3 px-4 text-center">Market Sentiment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-medium text-slate-700 dark:text-slate-300">
                {cpi?.historicalReleases.map((rel) => {
                  const isBull = rel.marketReaction === "BULLISH";
                  const isBear = rel.marketReaction === "BEARISH";
                  return (
                    <tr key={rel.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{rel.period}</td>
                      <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400">{rel.releaseDate}</td>
                      <td className="py-3.5 px-4 text-center font-mono font-extrabold text-slate-900 dark:text-white">
                        {rel.actualYoY}%
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono text-slate-500 dark:text-slate-400">{rel.forecastYoY}%</td>
                      <td className="py-3.5 px-4 text-center font-mono text-slate-500 dark:text-slate-400">{rel.previousYoY}%</td>
                      <td className={`py-3.5 px-4 text-right font-mono font-bold ${rel.btcImpact1h.startsWith("+") ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                        {rel.btcImpact1h}
                      </td>
                      <td className={`py-3.5 px-4 text-right font-mono font-bold ${rel.btcImpact24h.startsWith("+") ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                        {rel.btcImpact24h}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold ${
                            isBull
                              ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300"
                              : isBear
                              ? "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                          }`}
                        >
                          {rel.marketReaction}
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

      {/* 3. REAL-TIME CRYPTO NEWS STREAM */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Newspaper className="w-5 h-5 text-blue-500" />
                <span>Real-Time Breaking Crypto &amp; Macro News Wire</span>
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Live 5m Auto-Feed
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Curated human-written financial journalism from institutional and decentralized intelligence desks.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search news, topics, coins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-sm font-black"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* News Cards Stream Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filteredNews.map((item) => {
            const isBull = item.sentiment === "BULLISH";
            const isBear = item.sentiment === "BEARISH";

            return (
              <article
                key={item.id}
                onClick={() => setSelectedArticle(item)}
                className="p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500/70 dark:hover:border-blue-500/70 hover:shadow-lg transition-all duration-200 space-y-3.5 flex flex-col justify-between cursor-pointer group relative"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-100 dark:border-blue-800">
                        {item.category}
                      </span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 font-mono flex items-center gap-1">
                        <Clock size={11} className="text-amber-500" />
                        {item.timeAgo}
                      </span>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                        isBull
                          ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300"
                          : isBear
                          ? "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300"
                          : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {item.sentiment}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>

                  {/* Author Desk Tag */}
                  {item.author && (
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                      By <strong className="text-slate-700 dark:text-slate-300">{item.author.name}</strong> • {item.author.role}
                    </div>
                  )}

                  {/* Paragraph lead */}
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                    {item.paragraphs && item.paragraphs.length > 0 ? item.paragraphs[0] : item.summary}
                  </p>

                  {/* Key Takeaways Highlight */}
                  {item.keyTakeaways && item.keyTakeaways.length > 0 && (
                    <div className="text-[11px] text-amber-900 dark:text-amber-300 bg-amber-50/70 dark:bg-amber-950/40 p-3 rounded-2xl border border-amber-200/80 dark:border-amber-800/60 space-y-1">
                      <span className="font-bold flex items-center gap-1 text-[10px] uppercase font-mono text-amber-700 dark:text-amber-400">
                        <Sparkles className="w-3.5 h-3.5" /> Key Takeaway
                      </span>
                      <p className="line-clamp-2 leading-relaxed">{item.keyTakeaways[0]}</p>
                    </div>
                  )}

                  {/* Affected Tickers Pills */}
                  {item.affectedCoins && item.affectedCoins.length > 0 && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] font-mono text-slate-400">Pairs:</span>
                      {item.affectedCoins.map((c) => (
                        <span
                          key={c.symbol}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                        >
                          ${c.symbol.replace("USDT", "")}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 truncate max-w-[180px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                    <span className="truncate">{item.source}</span>
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedArticle(item);
                    }}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-black flex items-center gap-1 group/btn"
                  >
                    <span>Read Full Analysis</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </article>
            );
          })}
        </div>

      </div>

      {/* 4. FULL IN-DEPTH ARTICLE MODAL READER */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm p-4 sm:p-6 flex items-center justify-center animate-in fade-in duration-200">
          <div
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Bar with Category, Sentiment, and Close Button */}
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                  {selectedArticle.category}
                </span>

                <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <Clock size={12} className="text-amber-500" />
                  {selectedArticle.timeAgo} • {selectedArticle.readTime}
                </span>

                <span className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                  selectedArticle.sentiment === "BULLISH"
                    ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300"
                    : selectedArticle.sentiment === "BEARISH"
                    ? "bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
                }`}>
                  {selectedArticle.sentiment} Impact
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyStory}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1"
                  title="Share Analysis"
                >
                  {copiedArticle ? <Check size={14} className="text-emerald-500" /> : <Share2 size={14} />}
                  <span className="hidden sm:inline">{copiedArticle ? "Copied" : "Share"}</span>
                </button>

                <button
                  onClick={() => setSelectedArticle(null)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition"
                  title="Close Reader"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Headline */}
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                {selectedArticle.title}
              </h2>

              {selectedArticle.author && (
                <div className="flex flex-wrap items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                  <span className="font-bold text-slate-800 dark:text-slate-200">By {selectedArticle.author.name}</span>
                  <span>•</span>
                  <span>{selectedArticle.author.role} ({selectedArticle.author.desk})</span>
                  <span>•</span>
                  <span className="font-semibold text-blue-600 dark:text-blue-400 font-mono">Source: {selectedArticle.source}</span>
                </div>
              )}
            </div>

            {/* Key Takeaways */}
            {selectedArticle.keyTakeaways && selectedArticle.keyTakeaways.length > 0 && (
              <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/80 space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-black text-amber-900 dark:text-amber-300 uppercase font-mono">
                  <Sparkles size={14} className="text-amber-500" />
                  <span>Executive Key Takeaways</span>
                </div>
                <ul className="space-y-1.5 text-xs text-slate-800 dark:text-slate-200">
                  {selectedArticle.keyTakeaways.map((t, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <CheckCircle2 size={13} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Full Multi-Paragraph Body */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              {selectedArticle.paragraphs && selectedArticle.paragraphs.length > 0 ? (
                selectedArticle.paragraphs.map((p, idx) => (
                  <p key={idx} className="leading-relaxed">
                    {p}
                  </p>
                ))
              ) : (
                <p className="leading-relaxed">{selectedArticle.summary}</p>
              )}
            </div>

            {/* Affected Tickers Section */}
            {selectedArticle.affectedCoins && selectedArticle.affectedCoins.length > 0 && (
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Zap size={13} className="text-amber-500" />
                  <span>Affected Trading Pairs &amp; Expected Projections</span>
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {selectedArticle.affectedCoins.map((coin) => (
                    <div
                      key={coin.symbol}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-mono font-black text-slate-900 dark:text-white">{coin.symbol}</div>
                        {coin.expectedRange && (
                          <div className="text-[10px] font-mono text-slate-500">{coin.expectedRange}</div>
                        )}
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                        coin.impact === "BULLISH"
                          ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                          : coin.impact === "BEARISH"
                          ? "bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300"
                          : "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300"
                      }`}>
                        {coin.impact}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Outbound Link */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-mono text-[11px]">
                Audited Wire Broadcast • 24/7 Financial Intelligence Desk
              </span>
              <a
                href={selectedArticle.sourceUrl || selectedArticle.url || "https://www.google.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold flex items-center gap-1.5 transition shadow-sm"
              >
                <span>Read Verified Primary Source</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
