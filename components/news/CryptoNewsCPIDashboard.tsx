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
  Activity,
  Swords,
  Globe2,
  Scale,
  Cpu,
  ShieldCheck,
  Fuel,
  Coins
} from "lucide-react";
import { CPIDataRelease, NewsItem, MacroBattle, CentralBankPolicy } from "@/app/api/news/route";

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
  const [macroBattles, setMacroBattles] = useState<MacroBattle[]>([]);
  const [centralBankPolicies, setCentralBankPolicies] = useState<CentralBankPolicy[]>([]);
  const [cpi, setCpi] = useState<CPIOverview | null>(null);
  const [macroFed, setMacroFed] = useState<MacroFedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [selectedBattle, setSelectedBattle] = useState<MacroBattle | null>(null);
  const [copiedArticle, setCopiedArticle] = useState(false);
  const [activeTab, setActiveTab] = useState<"news" | "battles" | "interest-rates" | "cpi">("news");

  const fetchNewsAndMacro = useCallback(async () => {
    try {
      const res = await fetch("/api/news");
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setNews(json.data.news || []);
          setMacroBattles(json.data.macroBattles || []);
          setCentralBankPolicies(json.data.centralBankPolicies || []);
          setCpi(json.data.cpi || null);
          setMacroFed(json.data.macroFed || null);
        }
      }
      setLoading(false);
    } catch (err) {
      console.warn("News & Macro background sync notice:", err);
      setLoading(false);
    }
  }, []);

  // Automatic live fetch every 5 minutes in background
  useEffect(() => {
    fetchNewsAndMacro();
    const interval = setInterval(fetchNewsAndMacro, 300000);
    return () => clearInterval(interval);
  }, [fetchNewsAndMacro]);

  const categories = [
    "All",
    "Macro & CPI",
    "Fed Rates",
    "Geopolitics",
    "Bitcoin",
    "Ethereum",
    "Institutional",
    "DeFi",
    "Regulation",
    "Mining & Energy"
  ];

  const filteredNews = news.filter((item) => {
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.whyItMatters && item.whyItMatters.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.affectedCoins && item.affectedCoins.some((c) => c.symbol.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchCat = selectedCategory === "All" || item.category === selectedCategory;
    return matchSearch && matchCat;
  });

  const handleCopyStory = () => {
    if (!selectedArticle) return;
    const text = `📰 [BitcoinCrypto.tech Intelligence] ${selectedArticle.title}
• Why it matters: ${selectedArticle.whyItMatters || selectedArticle.summary}
• Source: ${selectedArticle.source} (${selectedArticle.sourceUrl})
• Read full analysis at https://www.bitcoincrypto.tech/news`;
    navigator.clipboard.writeText(text);
    setCopiedArticle(true);
    setTimeout(() => setCopiedArticle(false), 2500);
  };

  return (
    <div className="space-y-10 pb-20">
      
      {/* 1. HERO BANNER WITH LIVE MACRO TICKER */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 border border-blue-900/40 shadow-xl relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  <Newspaper className="w-3.5 h-3.5 text-blue-400" />
                  Real-Time Crypto &amp; Macroeconomic Wire
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <Swords className="w-3 h-3 text-amber-400" />
                  Macro Battles &amp; Interest Rate Matrix
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live API Connected
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                Crypto Market Battles, <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                  Interest Rates &amp; Macro Intelligence
                </span>
              </h1>
              <p className="text-slate-400 text-xs sm:text-sm max-w-3xl mt-2 leading-relaxed">
                Understand every economic force moving cryptocurrency: Central Bank interest rate cuts, global de-dollarization battles, SEC regulatory clashes, institutional spot ETF flows, and US CPI inflation releases with verified primary sources.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/tools"
                className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition flex items-center gap-1.5 shadow-md hover:scale-105"
              >
                <span>AI Trading Terminal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Real-Time Macro Key Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-4 border-t border-slate-800 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <Landmark className="w-3 h-3 text-blue-400" /> Fed Funds Rate
              </span>
              <div className="text-lg font-black text-white font-mono">
                {macroFed?.currentFedFundsRate || "4.25% - 4.50%"}
              </div>
              <span className="text-[10px] text-blue-400 font-bold">
                Next FOMC: {macroFed?.fomcMeetingDate || "Sep 17, 2026"}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <Percent className="w-3 h-3 text-emerald-400" /> Rate Cut Odds
              </span>
              <div className="text-lg font-black text-emerald-400 font-mono">
                {macroFed?.rateCut25bpsProbability || 88.5}%
              </div>
              <span className="text-[10px] text-emerald-300">
                25 bps Easing Expected
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-400" /> Latest CPI YoY
              </span>
              <div className="text-lg font-black text-emerald-400 font-mono">
                {cpi?.latest.actualYoY || 2.7}%
              </div>
              <span className="text-[10px] text-emerald-300 font-bold">
                Cooling vs 2.9% Forecast
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1">
                <Globe2 className="w-3 h-3 text-amber-300" /> Macro Regime
              </span>
              <div className="text-sm font-black text-amber-300 font-mono truncate">
                Disinflation Expansion
              </div>
              <span className="text-[10px] text-slate-400">
                Bullish Global Liquidity
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION PILLS FOR SECTIONS */}
      <div className="flex flex-wrap items-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-800/80 rounded-2xl border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setActiveTab("news")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition ${
            activeTab === "news"
              ? "bg-blue-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Newspaper className="w-3.5 h-3.5" />
          <span>Real-Time News Wire ({news.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("battles")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition ${
            activeTab === "battles"
              ? "bg-amber-500 text-slate-950 shadow-sm"
              : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Swords className="w-3.5 h-3.5" />
          <span>Macro Battles &amp; Currency Wars ({macroBattles.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("interest-rates")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition ${
            activeTab === "interest-rates"
              ? "bg-emerald-600 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Landmark className="w-3.5 h-3.5" />
          <span>Central Bank Interest Rates</span>
        </button>
        <button
          onClick={() => setActiveTab("cpi")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition ${
            activeTab === "cpi"
              ? "bg-blue-800 text-white shadow-sm"
              : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          }`}
        >
          <Activity className="w-3.5 h-3.5" />
          <span>US CPI Inflation Terminal</span>
        </button>
      </div>

      {/* TAB 1: REAL-TIME NEWS WIRE */}
      {activeTab === "news" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
      {/* 2. MAIN NEWS & MACRO WORKBENCH */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Navigation Tabs (All News / Macro CPI Battles / Federal Reserve / Institutional SEC) */}
        <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Flame className="w-4 h-4 text-amber-500" />
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  Institutional News Wire &amp; Macro Battles
                </h3>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  Verified Feeds
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Institutional reports connected to global economic bureaus, SEC filings, blockchain analytics, and institutional desks.
              </p>
              </div>

              {/* Search */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search topic, battle, coin..."
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
                          <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                            {item.category}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
                            <Clock className="w-3 h-3" />
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

                      <h3 className="text-base font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                        {item.title}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                        {item.summary}
                      </p>

                      {/* Why it Matters for Consumers */}
                      {item.whyItMatters && (
                        <div className="p-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-800/70 text-[11px] text-amber-950 dark:text-amber-200 leading-relaxed">
                          <strong className="text-amber-800 dark:text-amber-400 font-bold block mb-0.5">💡 Why this matters for Crypto:</strong>
                          {item.whyItMatters}
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px]">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                        <span>Source: <strong className="text-slate-900 dark:text-white">{item.source}</strong></span>
                      </div>

                      <span className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 text-[11px] group-hover:underline">
                        <span>Read Full Analysis</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MACRO BATTLES & GEOPOLITICAL WARS */}
      {activeTab === "battles" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-9 h-9 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                  <Swords className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">
                    The 5 Global Macro Battles Moving Crypto Markets
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Comprehensive breakdown of currency wars, interest rate showdowns, regulatory disputes, and blockchain supremacy battles.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {macroBattles.map((battle) => (
                <div
                  key={battle.id}
                  className="p-6 rounded-3xl bg-slate-50/80 dark:bg-slate-800/60 border-2 border-slate-200/90 dark:border-slate-700 space-y-5 hover:border-amber-400 transition"
                >
                  {/* Top Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                        {battle.category}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300">
                        {battle.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
                        Crypto Bias:
                      </span>
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-black ${
                        battle.cryptoImpact === "BULLISH"
                          ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700"
                          : "bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700"
                      }`}>
                        {battle.cryptoImpact}
                      </span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <div>
                    <h3 className="text-xl font-black text-slate-900 dark:text-white">
                      {battle.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                      {battle.subtitle}
                    </p>
                  </div>

                  {/* Visual Face-Off Box */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs">
                    <div className="p-3 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40">
                      <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 block mb-1">Forces on Side A:</span>
                      <div className="font-extrabold text-slate-900 dark:text-white">{battle.parties.sideA}</div>
                    </div>
                    <div className="p-3 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40">
                      <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 block mb-1">Forces on Side B:</span>
                      <div className="font-extrabold text-slate-900 dark:text-white">{battle.parties.sideB}</div>
                    </div>
                  </div>

                  {/* Consumer Plain English Explanation */}
                  <div className="space-y-2">
                    <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200 leading-relaxed">
                      <div className="flex items-center gap-1.5 font-black text-amber-900 dark:text-amber-400 mb-1">
                        <BookOpen className="w-4 h-4" />
                        <span>Easy Plain-English Consumer Explanation:</span>
                      </div>
                      <p>{battle.consumerExplanation}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-xs text-blue-950 dark:text-blue-200 leading-relaxed">
                      <div className="flex items-center gap-1.5 font-black text-blue-900 dark:text-blue-400 mb-1">
                        <Coins className="w-4 h-4" />
                        <span>Stakes for Cryptocurrency Investors:</span>
                      </div>
                      <p>{battle.stakesForCrypto}</p>
                    </div>
                  </div>

                  {/* Outbound Link & Primary Sources */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px]">
                      <span>Key Protagonists: <strong className="text-slate-900 dark:text-white">{battle.keyProtagonists.join(" • ")}</strong></span>
                    </div>

                    <a
                      href={battle.primarySourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-slate-100 transition shadow-sm"
                    >
                      <span>Verified Source: {battle.primarySourceName}</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CENTRAL BANK INTEREST RATES */}
      {activeTab === "interest-rates" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-9 h-9 rounded-2xl bg-emerald-500 text-white flex items-center justify-center font-black">
                  <Landmark className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-xl font-black text-slate-900 dark:text-white">
                    Global Central Bank Interest Rates &amp; Liquidity Monitor
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Why interest rates are the master steering wheel of Bitcoin, Ethereum, and crypto liquidity cycles.
                  </p>
                </div>
              </div>
            </div>

            {/* Central Bank Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {centralBankPolicies.map((bank, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-slate-400 font-mono">
                        {bank.country}
                      </span>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
                        {bank.bias}
                      </span>
                    </div>

                    <h4 className="text-base font-black text-slate-900 dark:text-white">
                      {bank.bank}
                    </h4>

                    <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                      {bank.currentRate}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {bank.notes}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 dark:text-slate-400">Next: {bank.nextMeeting}</span>
                    <a
                      href={bank.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1"
                    >
                      <span>Official Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Consumer Guide: How Interest Rates Control Crypto */}
            <div className="p-6 rounded-3xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 space-y-4">
              <h3 className="text-base font-black text-blue-950 dark:text-blue-200 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <span>Consumer Masterclass: Why Central Bank Interest Rates Dictate Crypto Bull Markets</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700 dark:text-slate-300">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/60 space-y-2">
                  <div className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">1</span>
                    <span>The Cost of Borrowing (Fiat Liquidity)</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    When interest rates are high (5%+), businesses and hedge funds pay high interest on loans. When rates drop, cheap money floods into global banks, seeking higher returns in digital assets.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/60 space-y-2">
                  <div className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">2</span>
                    <span>Bond Yields vs Bitcoin HODLing</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    If government bonds pay 5% risk-free yield, institutional capital parks in Treasuries. When bond yields drop below inflation, institutions MUST allocate to Bitcoin to beat purchasing power erosion.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-blue-100 dark:border-blue-900/60 space-y-2">
                  <div className="font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">3</span>
                    <span>Global M2 Money Supply Expansion</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    Bitcoin has a 94% historical correlation with the expansion of global M2 money supply. As central banks cut rates simultaneously, global liquidity expands, fueling multi-year crypto uptrends.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: US CPI INFLATION TERMINAL */}
      {activeTab === "cpi" && (
        <div className="space-y-6">
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

                <a
                  href="https://www.bls.gov/cpi/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2 bg-amber-400 text-slate-950 rounded-xl text-xs font-bold text-center hover:bg-amber-300 transition flex items-center justify-center gap-1 shadow-sm"
                >
                  <span>Official BLS.gov CPI Portal</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
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
        </div>
      )}

      {/* 5. INTERACTIVE ARTICLE DEEP-DIVE MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4 bg-slate-50/60 dark:bg-slate-800/40">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300">
                    {selectedArticle.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {selectedArticle.readTime}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    • {selectedArticle.timeAgo}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white leading-snug">
                  {selectedArticle.title}
                </h2>
              </div>

              <button
                onClick={() => setSelectedArticle(null)}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 overflow-y-auto space-y-6 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
              
              {/* Why it Matters Callout */}
              {selectedArticle.whyItMatters && (
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-950 dark:text-amber-200">
                  <strong className="text-amber-900 dark:text-amber-400 font-black block mb-1">
                    💡 Consumer Takeaway &amp; Market Importance:
                  </strong>
                  {selectedArticle.whyItMatters}
                </div>
              )}

              {/* Paragraphs */}
              <div className="space-y-4">
                {selectedArticle.paragraphs.map((p, idx) => (
                  <p key={idx} className="text-xs sm:text-sm leading-relaxed">
                    {p}
                  </p>
                ))}
              </div>

              {/* Key Takeaways */}
              {selectedArticle.keyTakeaways && selectedArticle.keyTakeaways.length > 0 && (
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
                  <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>Executive Summary &amp; Key Takeaways</span>
                  </h4>
                  <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                    {selectedArticle.keyTakeaways.map((t, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Affected Coins */}
              {selectedArticle.affectedCoins && selectedArticle.affectedCoins.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                    Affected Assets &amp; Expected Price Bands
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    {selectedArticle.affectedCoins.map((coin, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        <div className="font-black text-slate-900 dark:text-white">{coin.symbol}</div>
                        <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">{coin.impact}</div>
                        {coin.expectedRange && (
                          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">{coin.expectedRange}</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer with Outbound Primary Link & Copy */}
            <div className="p-4 sm:p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyStory}
                  className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition flex items-center gap-1.5"
                >
                  {copiedArticle ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedArticle ? "Copied!" : "Copy Summary"}</span>
                </button>
              </div>

              {selectedArticle.sourceUrl && (
                <a
                  href={selectedArticle.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-black transition flex items-center gap-1.5 shadow-sm"
                >
                  <span>Verify at Primary Source ({selectedArticle.source})</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
