"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Newspaper,
  Calendar,
  TrendingUp,
  TrendingDown,
  RefreshCw,
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
  AlertTriangle
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
  const [lastSyncTime, setLastSyncTime] = useState("");
  const [countdown, setCountdown] = useState(15);

  const fetchNewsAndCpi = useCallback(async () => {
    try {
      const res = await fetch("/api/news");
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setNews(json.data.news || []);
          setCpi(json.data.cpi || null);
          setMacroFed(json.data.macroFed || null);
          setLastSyncTime(new Date().toLocaleTimeString());
        }
      }
      setLoading(false);
      setCountdown(15);
    } catch (err) {
      console.warn("News & CPI fetch warning:", err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNewsAndCpi();
    const interval = setInterval(fetchNewsAndCpi, 15000);
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 15));
    }, 1000);
    return () => {
      clearInterval(interval);
      clearInterval(timer);
    };
  }, [fetchNewsAndCpi]);

  const categories = ["All", "Macro & CPI", "Bitcoin", "Ethereum", "Institutional", "DeFi", "Regulation"];

  const filteredNews = news.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.toLowerCase().includes(searchQuery.toLowerCase());
    const matchCat = selectedCategory === "All" || item.category === selectedCategory;
    return matchSearch && matchCat;
  });

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
                  Live Crypto News & Macroeconomic Intelligence
                </span>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-800/60 flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Live Wire (Refreshes in {countdown}s)
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                US CPI Inflation Tracker & <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                  Macroeconomic Crypto News
                </span>
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm max-w-2xl mt-2 leading-relaxed">
                Stay ahead of Bitcoin and crypto market volatility with real-time US Consumer Price Index releases, Federal Reserve FOMC interest rate odds, and verified institutional breaking news.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={fetchNewsAndCpi}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center gap-2 border border-slate-700"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-blue-400 ${loading ? "animate-spin" : ""}`} />
                <span>Fetch Latest News</span>
              </button>
              <Link
                href="/markets"
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition flex items-center gap-1.5 shadow-md"
              >
                <span>Live Markets</span>
                <ArrowRight className="w-3.5 h-3.5" />
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
                {macroFed?.rateCut25bpsProbability || 84.5}%
              </div>
              <span className="text-[10px] text-emerald-300">
                25 bps Easing Expected
              </span>
            </div>

          </div>
        </div>
      </div>

      {/* 2. DEDICATED US CPI INFLATION TRACKER TERMINAL */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-black text-xs">
                CPI
              </div>
              <h2 className="text-lg font-black text-slate-900">
                US Consumer Price Index (CPI) Dashboard
              </h2>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Official Bureau of Labor Statistics inflation prints and historical correlation with Bitcoin price moves.
            </p>
          </div>

          <span className="text-xs font-mono font-bold px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
            Disinflation Regime Active
          </span>
        </div>

        {/* CPI Live Card Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* Latest Print Breakdown */}
          <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black text-slate-900 uppercase">Latest Print Breakdown</span>
              <span className="text-[10px] font-mono font-bold text-slate-500">{cpi?.latest.period}</span>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Headline CPI YoY:</span>
                <strong className="text-emerald-700 font-mono text-sm">{cpi?.latest.actualYoY}% (Beat)</strong>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Consensus Forecast:</span>
                <span className="font-mono text-slate-700">{cpi?.latest.forecastYoY}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600">Previous Period:</span>
                <span className="font-mono text-slate-700">{cpi?.latest.previousYoY}%</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-slate-200">
                <span className="text-slate-600">Core CPI (Ex-Food/Energy):</span>
                <strong className="text-slate-900 font-mono">{cpi?.latest.coreActualYoY}% (Exp: {cpi?.latest.coreForecastYoY}%)</strong>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 pt-1 leading-relaxed">
              {cpi?.latest.inflationStatusText}
            </p>
          </div>

          {/* Upcoming CPI Release Countdown */}
          <div className="p-5 rounded-2xl bg-blue-50/60 border border-blue-200 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-blue-950 uppercase flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-blue-600" /> Upcoming Release
                </span>
                <span className="text-[10px] font-mono font-bold bg-blue-200 text-blue-900 px-2 py-0.5 rounded">
                  High Volatility Alert
                </span>
              </div>

              <div className="text-base font-black text-slate-900">
                {cpi?.upcoming.event}
              </div>

              <div className="text-xs text-slate-600 space-y-1">
                <div>Release Date: <strong className="text-slate-900">{cpi?.upcoming.releaseDate}</strong></div>
                <div>Consensus Forecast: <strong className="text-blue-700 font-mono">{cpi?.upcoming.consensusForecastYoY}</strong></div>
                <div>Previous Print: <span className="font-mono text-slate-600">{cpi?.upcoming.previousYoY}</span></div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white border border-blue-200 text-[11px] text-blue-950 font-medium">
              💡 {cpi?.upcoming.impactOutlook}
            </div>
          </div>

          {/* Macro Impact on Bitcoin & Crypto */}
          <div className="p-5 rounded-2xl bg-amber-50/60 border border-amber-200 space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-xs font-black text-amber-950 uppercase flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-600" /> Why CPI Moves Bitcoin
              </span>
              <h4 className="text-xs font-bold text-slate-900 leading-snug">
                Liquidity Cycles & Real Interest Rates
              </h4>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                When CPI comes in lower than expectations, it gives the Federal Reserve room to cut interest rates. Lower rates expand global M2 money supply, creating tailwinds for digital assets like Bitcoin and Ethereum.
              </p>
            </div>

            <Link
              href="/concepts"
              className="w-full py-2 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-bold text-center transition flex items-center justify-center gap-1"
            >
              <span>Learn Macro Crypto Models</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

        </div>

        {/* Historical CPI Releases Table */}
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider">
            Historical CPI Releases & Bitcoin Price Reaction
          </h3>

          <div className="overflow-x-auto rounded-2xl border border-slate-200">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px]">
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
              <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                {cpi?.historicalReleases.map((rel) => {
                  const isBull = rel.marketReaction === "BULLISH";
                  const isBear = rel.marketReaction === "BEARISH";
                  return (
                    <tr key={rel.id} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 px-4 font-bold text-slate-900">{rel.period}</td>
                      <td className="py-3.5 px-4 text-slate-500">{rel.releaseDate}</td>
                      <td className="py-3.5 px-4 text-center font-mono font-extrabold text-slate-900">
                        {rel.actualYoY}%
                      </td>
                      <td className="py-3.5 px-4 text-center font-mono text-slate-500">{rel.forecastYoY}%</td>
                      <td className="py-3.5 px-4 text-center font-mono text-slate-500">{rel.previousYoY}%</td>
                      <td className={`py-3.5 px-4 text-right font-mono font-bold ${rel.btcImpact1h.startsWith("+") ? "text-emerald-600" : "text-rose-600"}`}>
                        {rel.btcImpact1h}
                      </td>
                      <td className={`py-3.5 px-4 text-right font-mono font-bold ${rel.btcImpact24h.startsWith("+") ? "text-emerald-600" : "text-rose-600"}`}>
                        {rel.btcImpact24h}
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`px-2.5 py-0.5 rounded-lg text-[10px] font-mono font-bold ${
                            isBull
                              ? "bg-emerald-100 text-emerald-800"
                              : isBear
                              ? "bg-rose-100 text-rose-800"
                              : "bg-slate-100 text-slate-700"
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
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-black text-slate-900 flex items-center gap-2">
              <Newspaper className="w-5 h-5 text-blue-500" />
              <span>Real-Time Breaking Crypto & Macro News Wire</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Curated and verified news from institutional and decentralized intelligence feeds.
            </p>
          </div>

          {/* Search */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search news & reports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-slate-400"
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
                  ? "bg-blue-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
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
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-slate-200/90 bg-white hover:border-blue-400 hover:shadow-md transition space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-800 border border-blue-100">
                        {item.category}
                      </span>
                      <span className="text-[11px] text-slate-400 font-mono">
                        {item.timeAgo}
                      </span>
                    </div>

                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-mono font-bold ${
                        isBull
                          ? "bg-emerald-100 text-emerald-800"
                          : isBear
                          ? "bg-rose-100 text-rose-800"
                          : "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {item.sentiment}
                    </span>
                  </div>

                  <h3 className="text-sm font-extrabold text-slate-900 leading-snug hover:text-blue-600 transition">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="font-semibold text-slate-700">{item.source}</span>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1"
                  >
                    <span>Read Source</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
}
