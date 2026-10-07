"use client";

import React, { useState } from "react";
import {
  ExternalLink,
  ShieldCheck,
  Share2,
  Copy,
  Check,
  Send,
  MessageSquare,
  Globe,
  Landmark,
  Database,
  BookOpen,
  Award,
  Sparkles
} from "lucide-react";

export interface CitationSource {
  name: string;
  url: string;
  description: string;
  category: "Government / Regulatory" | "Exchange / WebSocket Feed" | "Academic / Protocol Spec" | "Analytics / Index Provider";
}

export const PRIMARY_AUTHORITATIVE_SOURCES: CitationSource[] = [
  {
    name: "US Bureau of Labor Statistics (BLS.gov)",
    url: "https://www.bls.gov/cpi/",
    description: "Official United States Consumer Price Index (CPI), Core CPI, and macroeconomic inflation schedule.",
    category: "Government / Regulatory"
  },
  {
    name: "Federal Reserve Economic Data (FRED - St. Louis Fed)",
    url: "https://fred.stlouisfed.org/",
    description: "Federal Funds Effective Rate, M2 Money Supply, and Federal Reserve balance sheet metrics.",
    category: "Government / Regulatory"
  },
  {
    name: "US Securities and Exchange Commission (SEC.gov)",
    url: "https://www.sec.gov/edgar/searchedgar/companysearch",
    description: "Spot Bitcoin & Ethereum ETF S-1 and 19b-4 filings, regulatory disclosures, and official orders.",
    category: "Government / Regulatory"
  },
  {
    name: "Federal Reserve FOMC Calendar & Statements",
    url: "https://www.federalreserve.gov/monetarypolicy/fomccalendars.htm",
    description: "Official Federal Open Market Committee meeting dates, rate decisions, and dot-plot projections.",
    category: "Government / Regulatory"
  },
  {
    name: "Binance Developer API & WebSocket Documentation",
    url: "https://developers.binance.com/docs/derivatives/usds-margined-futures/websocket-market-streams",
    description: "Real-time sub-second Level 2 order book depth, trades, aggregated ticker feeds, and mark prices.",
    category: "Exchange / WebSocket Feed"
  },
  {
    name: "TradingView Advanced Charting Engine",
    url: "https://www.tradingview.com/HTML5-stock-forex-bitcoin-charting-library/",
    description: "Multi-timeframe technical indicator overlays, Volume Profile, and interactive candlestick engines.",
    category: "Exchange / WebSocket Feed"
  },
  {
    name: "CoinGlass Perpetual Derivatives Portal",
    url: "https://www.coinglass.com/",
    description: "Global aggregated liquidation volumes, 8-hour perpetual funding rates, and open interest.",
    category: "Analytics / Index Provider"
  },
  {
    name: "CoinMarketCap Spot Market Directory",
    url: "https://coinmarketcap.com/",
    description: "Circulating token supplies, 24h market volume rankings, and global cryptocurrency market cap.",
    category: "Analytics / Index Provider"
  },
  {
    name: "CoinGecko Crypto API & Research",
    url: "https://www.coingecko.com/",
    description: "Independent multi-exchange liquidity depth, token metadata, and historical market statistics.",
    category: "Analytics / Index Provider"
  },
  {
    name: "DefiLlama Total Value Locked (TVL)",
    url: "https://defillama.com/",
    description: "Open-source decentralized finance TVL, stablecoin market capitalization, and protocol fees.",
    category: "Analytics / Index Provider"
  },
  {
    name: "Bitcoin: A Peer-to-Peer Electronic Cash System (Satoshi Nakamoto)",
    url: "https://bitcoin.org/bitcoin.pdf",
    description: "The foundational 2008 Bitcoin whitepaper defining Proof-of-Work, UTXO architecture, and monetary policy.",
    category: "Academic / Protocol Spec"
  },
  {
    name: "Ethereum Foundation Technical Specs (Ethereum.org)",
    url: "https://ethereum.org/en/developers/docs/",
    description: "Ethereum Virtual Machine (EVM), Proof-of-Stake consensus, and Ethereum Improvement Proposals (EIPs).",
    category: "Academic / Protocol Spec"
  }
];

interface AuthoritativeCitationsProps {
  title?: string;
  description?: string;
  sources?: CitationSource[];
  pageUrl?: string;
  pageTitle?: string;
}

export default function AuthoritativeCitations({
  title = "Official Primary Sources & Authoritative References",
  description = "To ensure maximum empirical precision and adherence to Google E-E-A-T standards, this platform benchmarks data against official government releases, direct exchange WebSocket streams, and foundational academic specifications.",
  sources = PRIMARY_AUTHORITATIVE_SOURCES,
  pageUrl = "https://www.bitcoincrypto.tech",
  pageTitle = "BitcoinCrypto.tech - AI Crypto Market Intelligence"
}: AuthoritativeCitationsProps) {
  const [copied, setCopied] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  const categories = ["All", "Government / Regulatory", "Exchange / WebSocket Feed", "Analytics / Index Provider", "Academic / Protocol Spec"];

  const filteredSources = activeCategory === "All"
    ? sources
    : sources.filter((s) => s.category === activeCategory);

  const handleShareCopy = () => {
    navigator.clipboard.writeText(`${pageTitle} — Verified Primary Sources & Data: ${pageUrl}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareText = encodeURIComponent(`${pageTitle}: ${pageUrl}`);
  const twitterUrl = `https://twitter.com/intent/tweet?text=${shareText}&hashtags=Bitcoin,Crypto,DataVerification`;
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(pageUrl)}&text=${encodeURIComponent(pageTitle)}`;
  const redditUrl = `https://reddit.com/submit?url=${encodeURIComponent(pageUrl)}&title=${encodeURIComponent(pageTitle)}`;
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(pageUrl)}`;

  return (
    <section className="p-6 sm:p-8 rounded-3xl bg-slate-900/90 dark:bg-slate-950/90 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white shadow-xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-base sm:text-lg font-black tracking-tight text-white">
              {title}
            </h3>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              E-E-A-T Verified
            </span>
          </div>
          <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>

        {/* 1-Click Social Sharing & Reach Buttons */}
        <div className="flex items-center gap-1.5 shrink-0 font-mono text-xs">
          <span className="text-slate-400 text-[10px] uppercase font-bold mr-1 hidden sm:inline">Share Data:</span>
          
          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition flex items-center gap-1 font-bold text-xs"
            title="Share on 𝕏 (Twitter)"
          >
            <span>𝕏</span>
          </a>

          <a
            href={telegramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 rounded-xl bg-sky-950/80 hover:bg-sky-900 text-sky-300 border border-sky-800/60 transition flex items-center gap-1 font-bold text-xs"
            title="Share on Telegram"
          >
            <Send className="w-3 h-3" />
          </a>

          <a
            href={redditUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 rounded-xl bg-orange-950/80 hover:bg-orange-900 text-orange-300 border border-orange-800/60 transition flex items-center gap-1 font-bold text-xs"
            title="Share on Reddit"
          >
            <MessageSquare className="w-3 h-3" />
          </a>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 rounded-xl bg-blue-950/80 hover:bg-blue-900 text-blue-300 border border-blue-800/60 transition flex items-center gap-1 font-bold text-xs"
            title="Share on LinkedIn"
          >
            <span>in</span>
          </a>

          <button
            onClick={handleShareCopy}
            className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 transition flex items-center gap-1 font-black text-xs shadow-xs"
            title="Copy Page Link"
          >
            {copied ? <Check className="w-3 h-3 text-slate-950" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? "COPIED" : "LINK"}</span>
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1 rounded-xl font-bold whitespace-nowrap transition ${
              activeCategory === cat
                ? "bg-amber-400 text-slate-950 font-black shadow-xs"
                : "bg-slate-800/80 text-slate-400 hover:text-white hover:bg-slate-800"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Citations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {filteredSources.map((source, idx) => (
          <a
            key={idx}
            href={source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-amber-400/60 transition group flex flex-col justify-between space-y-2.5 shadow-sm"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                  {source.category}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <h4 className="font-bold text-xs text-white group-hover:text-amber-300 transition line-clamp-1">
                {source.name}
              </h4>
              <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                {source.description}
              </p>
            </div>

            <div className="text-[10px] font-mono text-slate-500 group-hover:text-slate-300 truncate">
              {source.url.replace("https://", "").replace("www.", "").split("/")[0]} &rarr;
            </div>
          </a>
        ))}
      </div>

      {/* Trust Disclosure */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400 font-mono">
        <span className="flex items-center gap-1.5">
          <Database className="w-3.5 h-3.5 text-cyan-400" />
          <span>Real-time feeds refreshed continuously via official endpoints.</span>
        </span>
        <span className="text-slate-500">
          Strict adherence to W3C provenance &amp; Google Search Quality Rater Guidelines.
        </span>
      </div>

    </section>
  );
}
