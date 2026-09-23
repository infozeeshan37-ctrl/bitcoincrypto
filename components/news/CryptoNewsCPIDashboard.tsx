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
  Coins,
  RefreshCw,
  ChevronDown,
  HelpCircle,
  Hash,
  Eye,
  Award
} from "lucide-react";
import { CPIDataRelease, NewsItem, MacroBattle, CentralBankPolicy } from "@/app/api/news/route";
import CPIMacroAIPredictor from "@/components/macro/CPIMacroAIPredictor";

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

const TRENDING_KEYWORDS = [
  { tag: "#BitcoinETF", query: "Bitcoin ETF" },
  { tag: "#FedRateCut", query: "Fed" },
  { tag: "#CPIInflation", query: "CPI" },
  { tag: "#SolanaBreakout", query: "Solana" },
  { tag: "#XRPSettlement", query: "XRP" },
  { tag: "#WhaleAlert", query: "Whale" },
  { tag: "#EthereumPectra", query: "Ethereum" },
  { tag: "#StrategicBTCReserve", query: "Strategic Bitcoin Reserve" },
  { tag: "#USDTMinting", query: "Tether" },
  { tag: "#AltcoinSeason", query: "Altcoin Season" },
  { tag: "#DeFiRWA", query: "DeFi" },
  { tag: "#ProofOfReserves", query: "Proof of Reserves" }
];

const SEO_NEWS_FAQS = [
  {
    q: "How do Federal Reserve interest rate cuts affect Bitcoin and cryptocurrency prices?",
    a: "When the Federal Reserve cuts interest rates, the yield on risk-free cash equivalents (like US Treasury bills and money market funds) declines. This incentivizes institutional hedge funds and retail investors to seek higher returns in scarce, asymmetric assets like Bitcoin, Ethereum, and decentralized finance protocols. Lower interest rates also increase global M2 money supply, which historically exhibits an 85%+ positive correlation with cryptocurrency bull market expansions."
  },
  {
    q: "Why does US CPI inflation data cause instant volatility in crypto markets?",
    a: "The US Consumer Price Index (CPI) is the primary metric used by the Federal Reserve to calibrate monetary policy. A cooling CPI print (lower than expected inflation) gives the Fed leeway to cut interest rates and inject liquidity, triggering sharp upside rallies in crypto derivatives. Conversely, a hotter-than-expected CPI print raises fears of restrictive monetary policy, strengthening the US Dollar Index (DXY) and putting temporary downward pressure on risk assets."
  },
  {
    q: "What are Bitcoin Spot ETF inflows and why do they cause supply squeezes?",
    a: "Spot Bitcoin ETFs (such as BlackRock's IBIT and Fidelity's FBTC) are backed by physical Bitcoin held in institutional custody. When institutional investors buy ETF shares, the fund's authorized participants must purchase actual Bitcoin from spot markets and OTC trading desks. Following the 2024 halving, miners only produce 450 BTC per day; when daily ETF inflows exceed 4,000 to 8,000 BTC, the resulting structural supply deficit forces spot orderbooks into parabolic price discovery."
  },
  {
    q: "How do crypto traders track large whale transactions before market moves?",
    a: "Traders monitor on-chain blockchain telemetry for large transfers between private cold storage wallets and centralized exchange hot wallets. When whales transfer thousands of Bitcoin or stablecoins (like USDT) onto exchanges, it signals imminent spot buying power or potential sell-side liquidity. Tracking UTXO age bands, dormant Satoshi-era wallet awakenings, and miner wallet outflows provides essential early signals."
  },
  {
    q: "What is Altcoin Season and when does capital rotate from Bitcoin to altcoins?",
    a: "Altcoin Season occurs when 75% or more of the top 50 cryptocurrencies outperform Bitcoin over a rolling 90-day window. It typically begins after Bitcoin completes an aggressive price discovery rally and consolidates near all-time highs. Profits generated from Bitcoin trades then rotate into large-cap Layer-1s (Ethereum, Solana), Layer-2 rollups, and high-beta decentralized finance tokens, causing rapid market-wide rallies."
  },
  {
    q: "What is the Bitcoin Halving supply shock cycle?",
    a: "Every 210,000 blocks (roughly every 4 years), Bitcoin's algorithmic block reward is cut in half, reducing the rate of new coin issuance by 50%. Historically, the market takes approximately 180 to 500 days to fully price in the structural supply reduction. As existing liquid inventories on exchanges are exhausted by steady demand, prices experience exponential post-halving bull market expansions."
  }
];

export default function CryptoNewsCPIDashboard() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [macroBattles, setMacroBattles] = useState<MacroBattle[]>([]);
  const [centralBankPolicies, setCentralBankPolicies] = useState<CentralBankPolicy[]>([]);
  const [cpi, setCpi] = useState<CPIOverview | null>(null);
  const [macroFed, setMacroFed] = useState<MacroFedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTimeframe, setSelectedTimeframe] = useState<"all" | "live" | "week" | "month" | "historical">("all");
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [selectedArticle, setSelectedArticle] = useState<NewsItem | null>(null);
  const [selectedBattle, setSelectedBattle] = useState<MacroBattle | null>(null);
  const [copiedArticle, setCopiedArticle] = useState(false);
  const [activeTab, setActiveTab] = useState<"news" | "battles" | "interest-rates" | "cpi">("news");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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

  // Automatic live fetch every 60 seconds in background
  useEffect(() => {
    fetchNewsAndMacro();
    const interval = setInterval(fetchNewsAndMacro, 60000);
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

    const itemAgeMs = Date.now() - new Date(item.publishedAt).getTime();
    let matchTime = true;
    if (selectedTimeframe === "live") {
      matchTime = !item.isHistorical || itemAgeMs <= 48 * 60 * 60 * 1000;
    } else if (selectedTimeframe === "week") {
      matchTime = itemAgeMs <= 7 * 24 * 60 * 60 * 1000;
    } else if (selectedTimeframe === "month") {
      matchTime = itemAgeMs <= 30 * 24 * 60 * 60 * 1000;
    } else if (selectedTimeframe === "historical") {
      matchTime = item.isHistorical === true || itemAgeMs > 7 * 24 * 60 * 60 * 1000;
    }

    return matchSearch && matchCat && matchTime;
  });

  const featuredStory = filteredNews.length > 0 ? filteredNews[0] : null;
  const displayedNews = filteredNews.slice(0, visibleCount);

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
      
      {/* 1. REAL-TIME BREAKING NEWS TICKER / MARQUEE BAR */}
      <div className="bg-slate-900 text-white rounded-2xl p-3 border border-slate-800 shadow-md flex items-center gap-3 overflow-hidden">
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-rose-500/20 text-rose-400 font-mono font-black text-xs shrink-0 border border-rose-500/30">
          <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
          <span>BREAKING WIRE</span>
        </div>
        <div className="overflow-x-auto no-scrollbar flex items-center gap-6 text-xs whitespace-nowrap">
          {news.slice(0, 6).map((nItem, nIdx) => (
            <button
              key={nIdx}
              onClick={() => setSelectedArticle(nItem)}
              className="flex items-center gap-2 hover:text-amber-400 transition cursor-pointer text-slate-300"
            >
              <span className="font-mono text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-amber-400">
                {nItem.category}
              </span>
              <span className="font-semibold">{nItem.title}</span>
              <span className="text-[10px] text-slate-400">• {nItem.timeAgo}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 2. HERO BANNER WITH LIVE MACRO KEY STATS */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 border border-blue-900/40 shadow-2xl relative overflow-hidden">
        {/* Glow Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  <Newspaper className="w-3.5 h-3.5 text-blue-400" />
                  Real-Time Crypto News &amp; Macro Intelligence
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <Swords className="w-3 h-3 text-amber-400" />
                  Live FOMC Rate Cuts &amp; CPI Tracker
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                Breaking Crypto News, <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-blue-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">
                  Bitcoin ETF Flows &amp; Macro Intelligence
                </span>
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm max-w-3xl mt-2 leading-relaxed">
                Track real-time breaking cryptocurrency news, Federal Reserve FOMC rate cuts, US CPI inflation releases, institutional Spot ETF capital flows, whale wallet transactions, and sovereign Bitcoin reserve legislation with verified primary sources.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/predictions"
                className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition flex items-center gap-1.5 shadow-md hover:scale-105"
              >
                <span>AI Price Predictions</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/coinglass?tab=liquidations"
                className="px-5 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition flex items-center gap-1.5 border border-slate-700"
              >
                <span>Liquidation Heatmap</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Real-Time Macro Key Stats Bar */}
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

      {/* 3. TRENDING SEO TOPICS & HIGH-SEARCH-INTENT KEYWORD CLOUD */}
      <div className="bg-white dark:bg-slate-900 p-4 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Hash className="w-4 h-4 text-amber-500" />
            <span>Trending Crypto Search Topics (1-Click Filter):</span>
          </span>
          <span className="text-[10px] font-mono font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md">
            HIGH SEARCH VOLUME
          </span>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
          {TRENDING_KEYWORDS.map((item, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSearchQuery(item.query);
                setSelectedCategory("All");
                setSelectedTimeframe("all");
                setVisibleCount(12);
              }}
              className={`px-3 py-1.5 rounded-xl font-bold whitespace-nowrap transition border ${
                searchQuery === item.query
                  ? "bg-amber-400 text-slate-950 border-amber-400 font-black shadow-sm"
                  : "bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-750"
              }`}
            >
              {item.tag}
            </button>
          ))}
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("");
                setVisibleCount(12);
              }}
              className="px-3 py-1.5 rounded-xl font-bold text-rose-500 bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 whitespace-nowrap"
            >
              ✕ Clear Search
            </button>
          )}
        </div>
      </div>

      {/* 4. NAVIGATION TABS FOR SECTIONS */}
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

      {/* TAB 1: REAL-TIME NEWS WIRE & HISTORICAL ARCHIVE */}
      {activeTab === "news" && (
        <div className="space-y-6">
          
          {/* FEATURED BREAKING STORY / HERO CARD (if available) */}
          {featuredStory && !searchQuery && selectedCategory === "All" && selectedTimeframe === "all" && (
            <div
              onClick={() => setSelectedArticle(featuredStory)}
              className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 border border-indigo-500/30 shadow-xl cursor-pointer group hover:border-amber-400/60 transition"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-400 text-slate-950 flex items-center gap-1.5 shadow-sm">
                    <Award className="w-3.5 h-3.5" />
                    🔥 TOP TRENDING STORY #1
                  </span>
                  <span className="text-xs font-mono font-bold text-purple-300 bg-purple-500/20 px-2.5 py-0.5 rounded-full border border-purple-500/30">
                    {featuredStory.category}
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400">{featuredStory.timeAgo}</span>
              </div>

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white group-hover:text-amber-300 transition-colors leading-tight">
                {featuredStory.title}
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm mt-3 leading-relaxed max-w-4xl line-clamp-2">
                {featuredStory.summary}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 mt-4 border-t border-slate-800 text-xs">
                <div className="flex items-center gap-3">
                  <span className="text-slate-400">Source: <strong className="text-white">{featuredStory.source}</strong></span>
                  <span className="text-emerald-400 font-mono font-bold">Market Impact: HIGH</span>
                </div>
                <span className="text-amber-400 font-bold flex items-center gap-1 group-hover:underline">
                  <span>Read Full In-Depth Analysis</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          )}

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6">
            {/* Header & Controls */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Live Crypto News Wire &amp; Market Intelligence ({filteredNews.length} Stories Indexed)
                  </h3>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    LIVE 24/7 STREAM
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  High-velocity cryptocurrency news wire, macroeconomic inflation data, regulatory developments, and on-chain whale activity.
                </p>
              </div>

              {/* Search & Sync Actions */}
              <div className="flex items-center gap-2.5 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search Bitcoin, ETF, CPI, Fed, Whale..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setVisibleCount(12);
                    }}
                    className="w-full pl-9 pr-4 py-2 text-xs font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:text-slate-400"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setVisibleCount(12);
                      }}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <button
                  onClick={() => {
                    setLoading(true);
                    fetchNewsAndMacro();
                  }}
                  disabled={loading}
                  className="px-3.5 py-2 rounded-xl text-xs font-black bg-blue-600 hover:bg-blue-500 text-white transition flex items-center gap-1.5 shrink-0 shadow-sm disabled:opacity-50"
                  title="Force re-sync with all live crypto news wires"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
                  <span>{loading ? "Syncing..." : "Sync Live News"}</span>
                </button>
              </div>
            </div>

            {/* Timeframe Filter Navigation Bar */}
            <div className="flex flex-wrap items-center gap-2 p-2 bg-slate-50 dark:bg-slate-850/50 rounded-2xl border border-slate-200/80 dark:border-slate-700/80">
              <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase px-2">Timeline:</span>
              {[
                { id: "all", label: `🔥 All Indexed Stories (${news.length})` },
                { id: "live", label: "⚡ Live Stream (Last 24h)" },
                { id: "week", label: "🗓️ Past 7 Days" },
                { id: "month", label: "📅 Past 30 Days" },
                { id: "historical", label: "🏛️ Permanent Archive" },
              ].map((tf) => (
                <button
                  key={tf.id}
                  onClick={() => {
                    setSelectedTimeframe(tf.id as any);
                    setVisibleCount(12);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1 ${
                    selectedTimeframe === tf.id
                      ? "bg-slate-900 dark:bg-blue-600 text-white shadow-sm font-black"
                      : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/60 dark:border-slate-700"
                  }`}
                >
                  {tf.label}
                </button>
              ))}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setVisibleCount(12);
                  }}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayedNews.map((item) => {
                const isBull = item.sentiment === "BULLISH";
                const isBear = item.sentiment === "BEARISH";

                return (
                  <article
                    key={item.id}
                    onClick={() => setSelectedArticle(item)}
                    className="p-5 rounded-3xl border border-slate-200/90 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500/70 dark:hover:border-blue-500/70 hover:shadow-lg transition-all duration-200 space-y-3.5 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
                  >
                    <div className="space-y-3">
                      {/* Featured News Thumbnail if available */}
                      {item.imageUrl && (
                        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-slate-100 dark:border-slate-800">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                          />
                        </div>
                      )}

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

                        <div className="flex items-center gap-1.5">
                          {item.isHistorical && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-black bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300/40">
                              ARCHIVE
                            </span>
                          )}
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
                      </div>

                      <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug line-clamp-3">
                        {item.title}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                        {item.summary}
                      </p>

                      {/* Why it Matters for Consumers */}
                      {item.whyItMatters && (
                        <div className="p-2.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200/70 dark:border-amber-800/70 text-[11px] text-amber-950 dark:text-amber-200 leading-relaxed">
                          <strong className="text-amber-800 dark:text-amber-400 font-bold block mb-0.5">💡 Why this matters for Crypto:</strong>
                          <span className="line-clamp-2">{item.whyItMatters}</span>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px] truncate max-w-[150px]">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span className="truncate">Source: <strong className="text-slate-900 dark:text-white">{item.source}</strong></span>
                      </div>

                      <span className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 text-[11px] group-hover:underline shrink-0">
                        <span>Read Full Analysis</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Load More Pagination & Counter */}
            {filteredNews.length > visibleCount && (
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono font-medium">
                  Showing <strong className="text-slate-900 dark:text-white">{displayedNews.length}</strong> of <strong className="text-slate-900 dark:text-white">{filteredNews.length}</strong> stories ({selectedTimeframe === "all" ? "Live & Historical Archive" : selectedTimeframe} filter)
                </div>

                <button
                  onClick={() => setVisibleCount((prev) => prev + 12)}
                  className="px-6 py-3 rounded-2xl bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white text-xs font-black transition flex items-center gap-2 shadow-md"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Load More News &amp; Past Stories (+12)</span>
                </button>
              </div>
            )}
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
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 font-mono text-[10px] font-black uppercase">
                        {battle.category}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        Status: <strong className="text-slate-900 dark:text-white">{battle.status}</strong>
                      </span>
                    </div>

                    <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-xs font-mono font-bold">
                      Impact: {battle.cryptoImpact}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                      {battle.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {battle.subtitle}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-1">
                      <span className="font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider text-[10px]">Opposing Side A:</span>
                      <p className="text-slate-800 dark:text-slate-200 font-bold">{battle.parties.sideA}</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 space-y-1">
                      <span className="font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider text-[10px]">Opposing Side B:</span>
                      <p className="text-slate-800 dark:text-slate-200 font-bold">{battle.parties.sideB}</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs text-slate-700 dark:text-slate-300 space-y-1 leading-relaxed">
                    <strong className="text-amber-600 dark:text-amber-400 font-black block">💡 Simplified Macro Explanation:</strong>
                    <p>{battle.consumerExplanation}</p>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono text-[11px]">Primary Source: {battle.primarySourceName}</span>
                    <a
                      href={battle.primarySourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 font-bold flex items-center gap-1 hover:underline"
                    >
                      <span>Verify Government / Macro Records</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: CENTRAL BANK INTEREST RATES MATRIX */}
      {activeTab === "interest-rates" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-8 space-y-6">
            <div className="space-y-1 border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Landmark className="w-5 h-5 text-emerald-500" />
                <span>Global Central Bank Policy &amp; Benchmark Rates Matrix</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Tracking monetary policies across the Federal Reserve, ECB, Bank of Japan, and People&apos;s Bank of China
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                    <th className="pb-3 font-black uppercase">Central Bank</th>
                    <th className="pb-3 font-black uppercase">Country / Zone</th>
                    <th className="pb-3 font-black uppercase">Benchmark Rate</th>
                    <th className="pb-3 font-black uppercase">Monetary Bias</th>
                    <th className="pb-3 font-black uppercase">Crypto Impact</th>
                    <th className="pb-3 font-black uppercase">Policy Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {centralBankPolicies.map((cb, idx) => (
                    <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-850/50 transition">
                      <td className="py-4 font-bold text-slate-900 dark:text-white font-sans text-sm">{cb.bank}</td>
                      <td className="py-4 text-slate-600 dark:text-slate-300">{cb.country}</td>
                      <td className="py-4 text-emerald-600 dark:text-emerald-400 font-bold text-sm">{cb.currentRate}</td>
                      <td className="py-4">
                        <span className="px-2 py-0.5 rounded-md bg-blue-500/15 text-blue-600 dark:text-blue-400 font-bold">
                          {cb.bias}
                        </span>
                      </td>
                      <td className="py-4">
                        <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold">
                          {cb.impactOnCrypto}
                        </span>
                      </td>
                      <td className="py-4 text-slate-500 dark:text-slate-400 font-sans max-w-xs">{cb.notes}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: US CPI INFLATION TERMINAL */}
      {activeTab === "cpi" && (
        <div className="space-y-6">
          <CPIMacroAIPredictor />
        </div>
      )}

      {/* 5. SEO RICH KNOWLEDGE BASE & FREQUENTLY ASKED QUESTIONS */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-500" />
            <span>Cryptocurrency News, Macro Liquidity &amp; Inflation FAQ</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Clear, authoritative answers to the most common search queries regarding crypto news catalysts, ETF flows, and macroeconomic trends
          </p>
        </div>

        <div className="space-y-3">
          {SEO_NEWS_FAQS.map((faq, idx) => {
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
                      isOpen ? "rotate-180 text-blue-500" : ""
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

      {/* 6. INTERACTIVE ARTICLE DEEP-DIVE MODAL */}
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
              
              {/* Featured Cover Image if available */}
              {selectedArticle.imageUrl && (
                <div className="relative w-full aspect-video sm:aspect-[21/9] rounded-2xl overflow-hidden bg-slate-950 border border-slate-200 dark:border-slate-800 shadow-md">
                  <img
                    src={selectedArticle.imageUrl}
                    alt={selectedArticle.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

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
