'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Newspaper,
  Flame,
  Globe2,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  ExternalLink,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Percent,
  Landmark,
  Radio,
  Layers,
  Search,
  CheckCircle2,
  Share2,
  Copy,
  Check,
  ChevronRight,
  BarChart3,
  Zap,
  Activity,
  Maximize2,
  BookOpen
} from 'lucide-react';
import { NewsItem, AffectedCoin, NewsAuthor } from '@/app/api/news/route';

const CATEGORY_COLORS: Record<string, { badge: string; text: string; border: string; bg: string }> = {
  'Macro & CPI': {
    badge: 'bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-500/30',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-500/40',
    bg: 'bg-purple-50 dark:bg-purple-950/30',
  },
  'Fed Rates': {
    badge: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border-emerald-500/30',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-500/40',
    bg: 'bg-emerald-50 dark:bg-emerald-950/30',
  },
  'Geopolitics': {
    badge: 'bg-rose-500/15 text-rose-600 dark:text-rose-300 border-rose-500/30',
    text: 'text-rose-600 dark:text-rose-400',
    border: 'border-rose-500/40',
    bg: 'bg-rose-50 dark:bg-rose-950/30',
  },
  'Bitcoin': {
    badge: 'bg-amber-500/15 text-amber-600 dark:text-amber-300 border-amber-500/30',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-500/40',
    bg: 'bg-amber-50 dark:bg-amber-950/30',
  },
  'Ethereum': {
    badge: 'bg-blue-500/15 text-blue-600 dark:text-blue-300 border-blue-500/30',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-500/40',
    bg: 'bg-blue-50 dark:bg-blue-950/30',
  },
  'Derivatives': {
    badge: 'bg-orange-500/15 text-orange-600 dark:text-orange-300 border-orange-500/30',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-500/40',
    bg: 'bg-orange-50 dark:bg-orange-950/30',
  },
  'Institutional': {
    badge: 'bg-indigo-500/15 text-indigo-600 dark:text-indigo-300 border-indigo-500/30',
    text: 'text-indigo-600 dark:text-indigo-400',
    border: 'border-indigo-500/40',
    bg: 'bg-indigo-50 dark:bg-indigo-950/30',
  },
  'Regulation': {
    badge: 'bg-cyan-500/15 text-cyan-600 dark:text-cyan-300 border-cyan-500/30',
    text: 'text-cyan-600 dark:text-cyan-400',
    border: 'border-cyan-500/40',
    bg: 'bg-cyan-50 dark:bg-cyan-950/30',
  },
  'DeFi': {
    badge: 'bg-teal-500/15 text-teal-600 dark:text-teal-300 border-teal-500/30',
    text: 'text-teal-600 dark:text-teal-400',
    border: 'border-teal-500/40',
    bg: 'bg-teal-50 dark:bg-teal-950/30',
  },
};

export default function HomeLatestNewsRadar() {
  const [newsList, setNewsList] = useState<NewsItem[]>([]);
  const [activeItem, setActiveItem] = useState<NewsItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>('Just now');
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);
  const [autoRefreshCountdown, setAutoRefreshCountdown] = useState<number>(60);

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/news', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.data?.news && Array.isArray(json.data.news) && json.data.news.length > 0) {
          setNewsList(json.data.news);
          setActiveItem((prev) => {
            if (!prev) return json.data.news[0];
            const updated = json.data.news.find((n: NewsItem) => n.id === prev.id);
            return updated || json.data.news[0];
          });
          setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }
      }
    } catch (e) {
      console.warn('Failed to refresh latest news wire:', e);
    } finally {
      setIsLoading(false);
      setAutoRefreshCountdown(60);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 60000);
    const ticker = setInterval(() => {
      setAutoRefreshCountdown((prev) => (prev > 1 ? prev - 1 : 60));
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(ticker);
    };
  }, []);

  const filteredNews = useMemo(() => {
    return newsList.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.source.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.affectedCoins && item.affectedCoins.some((c) => c.symbol.toLowerCase().includes(searchQuery.toLowerCase())));

      if (!matchesSearch) return false;
      if (activeFilter === 'ALL') return true;
      if (activeFilter === 'MACRO') return item.category === 'Macro & CPI' || item.category === 'Fed Rates';
      if (activeFilter === 'CRYPTO') return item.category === 'Bitcoin' || item.category === 'Ethereum' || item.category === 'DeFi';
      if (activeFilter === 'DERIVATIVES') return item.category === 'Derivatives' || item.category === 'Institutional';
      if (activeFilter === 'REGULATION') return item.category === 'Regulation' || item.category === 'Geopolitics';
      return item.category === activeFilter;
    });
  }, [newsList, searchQuery, activeFilter]);

  const handleCopyStory = () => {
    if (!activeItem) return;
    navigator.clipboard.writeText(`${activeItem.title} - Read more on BitcoinCrypto.tech`);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  const currentCategoryStyle = activeItem
    ? CATEGORY_COLORS[activeItem.category] || CATEGORY_COLORS['Bitcoin']
    : CATEGORY_COLORS['Bitcoin'];

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-colors">
      
      {/* 1. TOP HEADER & HUD BAR */}
      <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800/80 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/60 dark:bg-slate-900/60">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 p-0.5 shadow-sm flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
              <Newspaper size={19} className="text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                Live Macro &amp; Crypto News Terminal
              </h2>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 shadow-xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                LIVE WIRE
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Real-time financial journalism, US CPI inflation prints, FOMC rate analysis, and crypto derivatives flow.
            </p>
          </div>
        </div>

        {/* Action HUD: Search, Refresh, & Direct Link */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Quick Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search news, topics, coins..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 text-slate-900 dark:text-white placeholder:text-slate-400 w-44 sm:w-56 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Refresh Button with Countdown */}
          <button
            onClick={fetchNews}
            disabled={isLoading}
            className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 shadow-xs disabled:opacity-50"
            title="Refresh news stream"
          >
            <RefreshCw size={13} className={`text-amber-500 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Sync ({autoRefreshCountdown}s)</span>
          </button>

          <Link
            href="/news"
            className="px-3.5 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black transition flex items-center gap-1 shadow-sm"
          >
            <span>CPI Hub</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* 2. CATEGORY FILTER TABS BAR */}
      <div className="px-5 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar bg-slate-50/40 dark:bg-slate-900/40">
        {[
          { id: 'ALL', label: '🔥 All News Wire' },
          { id: 'MACRO', label: '📊 CPI & US Inflation' },
          { id: 'Fed Rates', label: '🏛️ Fed & FOMC Policy' },
          { id: 'CRYPTO', label: '⚡ BTC & Layer-1s' },
          { id: 'DERIVATIVES', label: '📈 Derivatives & Liquidations' },
          { id: 'REGULATION', label: '⚖️ Regulation & Geopolitics' },
          { id: 'DeFi', label: '💎 DeFi & TVL Velocity' },
        ].map((tab) => {
          const isSelected = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1 ${
                isSelected
                  ? 'bg-slate-950 dark:bg-amber-400 text-white dark:text-slate-950 shadow-sm font-black ring-1 ring-amber-400/30'
                  : 'bg-white dark:bg-slate-800/90 text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white border border-slate-200/80 dark:border-slate-700/80'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 3. MAIN DUAL-PANEL LAYOUT (LEFT: LIVE WIRE STREAM | RIGHT: FULL IN-DEPTH ARTICLE READER) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px] lg:min-h-[640px]">
        
        {/* LEFT COLUMN: LIVE NEWS WIRE FEED (COL 5 ON DESKTOP) */}
        <div className="lg:col-span-5 border-b lg:border-b-0 lg:border-r border-slate-200/80 dark:border-slate-800 flex flex-col bg-slate-50/30 dark:bg-slate-950/20">
          
          {/* Stream Status Header */}
          <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 font-mono">
            <span className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
              <Activity size={12} className="text-emerald-500 animate-pulse" />
              <span>{filteredNews.length} Stories In Feed</span>
            </span>
            <span>Sync: {lastRefreshed}</span>
          </div>

          {/* Scrollable Story Cards Container */}
          <div className="overflow-y-auto max-h-[520px] lg:max-h-[640px] p-3 sm:p-4 space-y-2.5 custom-scrollbar">
            {filteredNews.length === 0 ? (
              <div className="p-8 text-center space-y-2 text-slate-400">
                <Newspaper className="w-8 h-8 mx-auto text-slate-300 dark:text-slate-700" />
                <p className="text-xs font-bold text-slate-600 dark:text-slate-300">No news found matching your query.</p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveFilter('ALL');
                  }}
                  className="text-xs text-amber-600 dark:text-amber-400 font-bold hover:underline"
                >
                  Reset filters
                </button>
              </div>
            ) : (
              filteredNews.map((item) => {
                const isSelected = activeItem?.id === item.id;
                const style = CATEGORY_COLORS[item.category] || CATEGORY_COLORS['Bitcoin'];

                return (
                  <article
                    key={item.id}
                    onClick={() => setActiveItem(item)}
                    className={`p-3.5 rounded-2xl cursor-pointer transition-all duration-200 border text-left relative group ${
                      isSelected
                        ? 'bg-amber-50/80 dark:bg-slate-800 border-amber-400/80 dark:border-amber-400/80 shadow-sm ring-1 ring-amber-400/20'
                        : 'bg-white dark:bg-slate-900/90 border-slate-200/80 dark:border-slate-800/80 hover:border-amber-400/40 dark:hover:border-amber-400/40 hover:bg-slate-50/80 dark:hover:bg-slate-850'
                    }`}
                  >
                    {/* Top Row: Category + Sentiment + Timestamp */}
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider border ${style.badge}`}
                      >
                        {item.category}
                      </span>

                      <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                        <span className="flex items-center gap-1">
                          <Clock size={10} className="text-amber-500" />
                          {item.timeAgo}
                        </span>

                        {item.sentiment === 'BULLISH' && (
                          <span className="text-emerald-600 dark:text-emerald-400 font-extrabold flex items-center gap-0.5">
                            <TrendingUp size={10} />
                            Bullish
                          </span>
                        )}
                        {item.sentiment === 'BEARISH' && (
                          <span className="text-rose-600 dark:text-rose-400 font-extrabold flex items-center gap-0.5">
                            <TrendingDown size={10} />
                            Bearish
                          </span>
                        )}
                        {item.sentiment === 'NEUTRAL' && (
                          <span className="text-slate-400 font-bold">Neutral</span>
                        )}
                      </div>
                    </div>

                    {/* Headline */}
                    <h3
                      className={`text-xs font-bold leading-snug line-clamp-2 transition-colors ${
                        isSelected
                          ? 'text-slate-950 dark:text-amber-300 font-black'
                          : 'text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400'
                      }`}
                    >
                      {item.title}
                    </h3>

                    {/* Short Summary Snippet */}
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {item.summary}
                    </p>

                    {/* Footer: Source + Read Time + Affected Tickers */}
                    <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[10px]">
                      <span className="font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate max-w-[150px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                        <span className="truncate">{item.source}</span>
                      </span>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {item.affectedCoins && item.affectedCoins.length > 0 && (
                          <span className="font-mono font-extrabold text-[9px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            {item.affectedCoins[0].symbol.replace('USDT', '')}
                          </span>
                        )}
                        <span className="text-slate-400 font-mono">{item.readTime}</span>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: FULL IN-DEPTH ARTICLE READER (COL 7 ON DESKTOP) */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between bg-white dark:bg-slate-900 space-y-6">
          {activeItem ? (
            <div className="space-y-6 animate-in fade-in">
              
              {/* Article Meta Bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider border ${currentCategoryStyle.badge}`}>
                    {activeItem.category}
                  </span>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    <Clock size={12} className="text-amber-500" />
                    {activeItem.timeAgo} • {activeItem.readTime}
                  </span>

                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold ${
                    activeItem.sentiment === 'BULLISH'
                      ? 'bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                      : activeItem.sentiment === 'BEARISH'
                      ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                  }`}>
                    {activeItem.sentiment === 'BULLISH' && <TrendingUp size={13} className="text-emerald-500" />}
                    {activeItem.sentiment === 'BEARISH' && <TrendingDown size={13} className="text-rose-500" />}
                    <span>{activeItem.sentiment} Market Bias</span>
                  </span>
                </div>

                {/* Share / Copy buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyStory}
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1.5 border border-slate-200 dark:border-slate-700"
                    title="Copy story headline and link"
                  >
                    {copiedUrl ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                    <span className="hidden sm:inline">{copiedUrl ? 'Copied' : 'Share'}</span>
                  </button>

                  <a
                    href={activeItem.sourceUrl || activeItem.url || "https://www.google.com"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold transition flex items-center gap-1 border border-slate-200 dark:border-slate-700 group"
                    title="Open verified primary source"
                  >
                    <span>Source</span>
                    <ExternalLink size={12} className="group-hover:translate-x-0.5 transition-transform text-amber-500" />
                  </a>
                </div>
              </div>

              {/* Main Headline */}
              <div className="space-y-2">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-snug">
                  {activeItem.title}
                </h1>

                {/* Author Byline */}
                {activeItem.author && (
                  <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 pt-1">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      By {activeItem.author.name}
                    </span>
                    <span>•</span>
                    <span className="font-medium text-slate-600 dark:text-slate-400">
                      {activeItem.author.role} ({activeItem.author.desk})
                    </span>
                    <span>•</span>
                    <span className="font-semibold text-amber-600 dark:text-amber-400 font-mono">
                      Via {activeItem.source}
                    </span>
                  </div>
                )}
              </div>

              {/* Key Takeaways Callout Box */}
              {activeItem.keyTakeaways && activeItem.keyTakeaways.length > 0 && (
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/80 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-black text-amber-900 dark:text-amber-300 uppercase tracking-wide">
                    <Sparkles size={14} className="text-amber-600 dark:text-amber-400 animate-pulse" />
                    <span>Executive Key Takeaways for Traders</span>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-800 dark:text-slate-200">
                    {activeItem.keyTakeaways.map((takeaway, idx) => (
                      <li key={idx} className="flex items-start gap-2 leading-relaxed">
                        <CheckCircle2 size={13} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Full Multi-Paragraph Article Body */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                {activeItem.paragraphs && activeItem.paragraphs.length > 0 ? (
                  activeItem.paragraphs.map((p, idx) => (
                    <p key={idx} className="leading-relaxed">
                      {p}
                    </p>
                  ))
                ) : (
                  <p className="leading-relaxed">{activeItem.summary}</p>
                )}
              </div>

              {/* Affected Tickers & Impacted Assets Grid */}
              {activeItem.affectedCoins && activeItem.affectedCoins.length > 0 && (
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Zap size={13} className="text-amber-500" />
                      <span>Affected Trading Pairs &amp; Projections</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">TradingView Sync</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {activeItem.affectedCoins.map((coin) => (
                      <div
                        key={coin.symbol}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-mono font-extrabold text-slate-900 dark:text-white">
                            {coin.symbol}
                          </div>
                          {coin.expectedRange && (
                            <div className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                              {coin.expectedRange}
                            </div>
                          )}
                        </div>

                        <span
                          className={`font-mono text-[10px] font-extrabold px-2 py-0.5 rounded ${
                            coin.impact === 'BULLISH'
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300'
                              : coin.impact === 'BEARISH'
                              ? 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300'
                              : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                          }`}
                        >
                          {coin.impact}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 space-y-3 my-auto">
              <BookOpen className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-700" />
              <div className="text-sm font-bold text-slate-700 dark:text-slate-300">Select any news item on the left to read full article</div>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Real-time human-quality analysis with technical trader notes, FOMC macro drivers, and affected crypto price ranges.
              </p>
            </div>
          )}

          {/* Bottom Article Footer Navigation */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="text-slate-500 dark:text-slate-400 font-mono text-[11px] flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Financial Wire Protocol 1.0 • 24/7 Macro Feeds Active</span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                href="/news"
                className="text-amber-600 dark:text-amber-400 hover:text-amber-500 font-bold flex items-center gap-1 text-xs group transition"
              >
                <span>Open Full CPI &amp; Macro Tracker</span>
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

