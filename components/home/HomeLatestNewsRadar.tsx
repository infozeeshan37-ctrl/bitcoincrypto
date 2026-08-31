'use client';

import React, { useState, useEffect } from 'react';
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
} from 'lucide-react';

export interface NewsRadarItem {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: string;
  timeAgo: string;
  category: 'Macro & CPI' | 'Geopolitics' | 'Bitcoin' | 'Ethereum' | 'Fed Rates' | 'Regulation';
  sentiment: 'BULLISH' | 'BEARISH' | 'NEUTRAL';
  hotScore?: number;
  readTime?: string;
}

const CATEGORY_COLORS: Record<string, { badge: string; text: string; border: string }> = {
  'Macro & CPI': {
    badge: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    text: 'text-purple-400',
    border: 'border-purple-500/40',
  },
  'Fed Rates': {
    badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    text: 'text-emerald-400',
    border: 'border-emerald-500/40',
  },
  'Geopolitics': {
    badge: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    text: 'text-rose-400',
    border: 'border-rose-500/40',
  },
  'Bitcoin': {
    badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    text: 'text-amber-400',
    border: 'border-amber-500/40',
  },
  'Ethereum': {
    badge: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    text: 'text-blue-400',
    border: 'border-blue-500/40',
  },
  'Regulation': {
    badge: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
    text: 'text-cyan-400',
    border: 'border-cyan-500/40',
  },
};

const DEFAULT_RADAR_NEWS: NewsRadarItem[] = [
  {
    id: 'news-1',
    title: 'US Headline CPI Cools to 2.7%, Igniting Institutional Bitcoin ETF Inflows',
    summary: 'The latest Consumer Price Index print came in lower than consensus estimates (2.7% vs 2.9%), fueling expectations for Federal Reserve interest rate cuts.',
    source: 'Bloomberg Macro / BLS',
    url: 'https://www.bls.gov/cpi/',
    publishedAt: new Date(Date.now() - 15 * 60000).toISOString(),
    timeAgo: '15m ago',
    category: 'Macro & CPI',
    sentiment: 'BULLISH',
    hotScore: 98,
    readTime: '3 min read',
  },
  {
    id: 'news-2',
    title: 'Federal Reserve FOMC Minutes Signal Slower QT and Potential 25bps Rate Cut',
    summary: 'Fed officials noted cooling services inflation and labor softening, strengthening expectations for monetary easing in the upcoming policy meeting.',
    source: 'Federal Reserve Board',
    url: 'https://www.federalreserve.gov',
    publishedAt: new Date(Date.now() - 42 * 60000).toISOString(),
    timeAgo: '42m ago',
    category: 'Fed Rates',
    sentiment: 'BULLISH',
    hotScore: 94,
    readTime: '4 min read',
  },
  {
    id: 'news-3',
    title: 'Geopolitical Tensions Drive Safe-Haven Bids into Bitcoin and Gold Liquidity',
    summary: 'Global macro uncertainties in the Middle East and commodity trade corridors accelerate capital rotation into non-sovereign digital settlement assets.',
    source: 'Reuters Macro',
    url: 'https://www.reuters.com',
    publishedAt: new Date(Date.now() - 85 * 60000).toISOString(),
    timeAgo: '1h ago',
    category: 'Geopolitics',
    sentiment: 'NEUTRAL',
    hotScore: 91,
    readTime: '4 min read',
  },
  {
    id: 'news-4',
    title: 'Spot Bitcoin ETF Net Daily Inflows Exceed $580 Million Across Wall Street Desks',
    summary: 'BlackRock IBIT and Fidelity FBTC record aggressive accumulation as institutional hedge funds increase digital asset allocations.',
    source: 'Farside Investors',
    url: 'https://farside.co.uk',
    publishedAt: new Date(Date.now() - 150 * 60000).toISOString(),
    timeAgo: '2h ago',
    category: 'Bitcoin',
    sentiment: 'BULLISH',
    hotScore: 89,
    readTime: '3 min read',
  },
  {
    id: 'news-5',
    title: 'European Regulators Issue Unified Framework for Cross-Border Crypto Liquidity',
    summary: 'New MiCA guidelines clarify institutional custodian licensing and cold-storage segregated vault mandates for digital asset exchanges.',
    source: 'Financial Times / ESMA',
    url: 'https://www.ft.com',
    publishedAt: new Date(Date.now() - 240 * 60000).toISOString(),
    timeAgo: '4h ago',
    category: 'Regulation',
    sentiment: 'NEUTRAL',
    hotScore: 82,
    readTime: '5 min read',
  },
];

export default function HomeLatestNewsRadar() {
  const [news, setNews] = useState<NewsRadarItem[]>(DEFAULT_RADAR_NEWS);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'MACRO' | 'GEOPOLITICS' | 'CRYPTO'>('ALL');
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefreshed, setLastRefreshed] = useState<string>('Just now');

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/news', { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        if (json.data?.news && Array.isArray(json.data.news) && json.data.news.length > 0) {
          setNews(json.data.news);
          setLastRefreshed(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
        }
      }
    } catch (e) {
      console.warn('Failed to refresh latest news wire:', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const interval = setInterval(fetchNews, 60000); // 1-minute auto refresh
    return () => clearInterval(interval);
  }, []);

  // Filter items based on active tab
  const filteredNews = news.filter((item) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'MACRO') return item.category === 'Macro & CPI' || item.category === 'Fed Rates';
    if (activeFilter === 'GEOPOLITICS') return item.category === 'Geopolitics' || item.category === 'Regulation';
    if (activeFilter === 'CRYPTO') return item.category === 'Bitcoin' || item.category === 'Ethereum';
    return true;
  });

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-6 shadow-sm flex flex-col justify-between space-y-4">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800/80 pb-3.5">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 p-0.5 shadow-sm flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
              <Newspaper size={17} className="text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-black text-slate-900 dark:text-white tracking-tight">
                Latest News &amp; Macro Radar
              </h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                LIVE
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Crypto, US Inflation, Fed Rates &amp; Geopolitics
            </p>
          </div>
        </div>

        {/* Refresh button */}
        <button
          onClick={fetchNews}
          disabled={isLoading}
          className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition shadow-xs active:scale-95 disabled:opacity-50"
          title="Refresh live news feed"
        >
          <RefreshCw size={14} className={isLoading ? 'animate-spin text-amber-500' : ''} />
        </button>
      </div>

      {/* Filter Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-1">
        {[
          { id: 'ALL', label: '🔥 All News' },
          { id: 'MACRO', label: '📊 Inflation & Rates' },
          { id: 'GEOPOLITICS', label: '🌐 Geopolitics' },
          { id: 'CRYPTO', label: '⚡ BTC & ETFs' },
        ].map((tab) => {
          const isSelected = activeFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id as any)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-bold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-amber-400 text-slate-950 shadow-sm ring-1 ring-amber-400/40'
                  : 'bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* News List Container */}
      <div className="space-y-3 overflow-y-auto max-h-[380px] custom-scrollbar pr-1">
        {filteredNews.slice(0, 5).map((item) => {
          const style = CATEGORY_COLORS[item.category] || {
            badge: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
            text: 'text-amber-400',
            border: 'border-amber-500/40',
          };

          return (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200/80 dark:border-slate-800/80 hover:border-amber-500/40 dark:hover:border-amber-500/40 transition-all duration-200 group relative"
            >
              {/* Category & Timestamp Top Row */}
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <span
                  className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${style.badge}`}
                >
                  {item.category}
                </span>

                <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono">
                  <span className="flex items-center gap-1">
                    <Clock size={10} className="text-amber-500" />
                    {item.timeAgo}
                  </span>
                  {item.sentiment === 'BULLISH' && (
                    <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                      <TrendingUp size={10} />
                      Bullish
                    </span>
                  )}
                  {item.sentiment === 'BEARISH' && (
                    <span className="text-rose-400 font-bold flex items-center gap-0.5">
                      <TrendingDown size={10} />
                      Bearish
                    </span>
                  )}
                </div>
              </div>

              {/* Title with link out */}
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 leading-snug transition-colors line-clamp-2"
              >
                {item.title}
              </a>

              {/* Short Summary */}
              <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 leading-relaxed line-clamp-2">
                {item.summary}
              </p>

              {/* Source Attribution & Link */}
              <div className="mt-2.5 pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-[10px]">
                <span className="font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
                  Source: <strong>{item.source}</strong>
                </span>

                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-amber-600 dark:text-amber-400 font-bold hover:underline inline-flex items-center gap-1 group/link"
                >
                  <span>Read Source</span>
                  <ExternalLink size={10} className="transition-transform group-hover/link:translate-x-0.5" />
                </a>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Navigation Link */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
        <span className="text-[11px] text-slate-400 font-mono">
          Updated: <strong className="text-slate-300">{lastRefreshed}</strong>
        </span>
        <Link
          href="/news"
          className="text-amber-600 dark:text-amber-400 hover:text-amber-500 font-bold flex items-center gap-1 text-[11px] group transition"
        >
          <span>View All 24/7 News &amp; CPI Calendar</span>
          <ArrowRight size={12} className="transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
