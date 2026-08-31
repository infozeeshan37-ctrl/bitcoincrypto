"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Coins,
  Bot,
  Flame,
  Newspaper,
  BookOpen,
  Compass,
  Info,
  ArrowRight,
  Sparkles,
  Command,
  X,
  TrendingUp
} from "lucide-react";

interface SearchItem {
  id: string;
  title: string;
  subtitle: string;
  category: "Markets" | "AI Bots" | "Derivatives" | "Macro & CPI" | "Concepts" | "Research";
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const SEARCH_ITEMS: SearchItem[] = [
  // Markets
  { id: "btc-spot", title: "Bitcoin (BTC)", subtitle: "Spot price, volume & 24h market cap", category: "Markets", href: "/markets", icon: Coins, badge: "$90k+" },
  { id: "eth-spot", title: "Ethereum (ETH)", subtitle: "Smart contracts & DeFi settlement layer", category: "Markets", href: "/markets", icon: Coins, badge: "Top 2" },
  { id: "sol-spot", title: "Solana (SOL)", subtitle: "High throughput Layer 1 blockchain", category: "Markets", href: "/markets", icon: Coins, badge: "Top 5" },
  { id: "sui-spot", title: "Sui (SUI)", subtitle: "Move language parallel execution L1", category: "Markets", href: "/markets", icon: Coins },
  { id: "doge-spot", title: "Dogecoin (DOGE)", subtitle: "Decentralized peer-to-peer digital currency", category: "Markets", href: "/markets", icon: Coins },
  { id: "all-markets", title: "CoinMarketCap Spot Rankings", subtitle: "Full list of 50+ tracked cryptocurrencies", category: "Markets", href: "/markets", icon: Coins, badge: "50+ Coins" },

  // AI Bots
  { id: "bot-terminal", title: "AI Trading Bot Terminal", subtitle: "Real-time algorithmic signals & 1:1 execution", category: "AI Bots", href: "/tools", icon: Bot, badge: "SIGNALS" },
  { id: "bot-alphatrend", title: "AlphaTrend AI Momentum Bot", subtitle: "200 EMA slope & CVD trend continuation", category: "AI Bots", href: "/tools", icon: Bot, badge: "94.8% Rel" },
  { id: "bot-hyperscalp", title: "HyperScalp Volatility Breakout", subtitle: "Bollinger squeeze & fast intraday execution", category: "AI Bots", href: "/tools", icon: Bot, badge: "82.1% Win" },
  { id: "bot-liquidity", title: "Smart Liquidity & FVG Reversal", subtitle: "FVG fair value gap & stop pool sweeps", category: "AI Bots", href: "/tools", icon: Bot },
  { id: "bot-dca", title: "Grid DCA Cycle Accumulator", subtitle: "Automated geometric ladder accumulation", category: "AI Bots", href: "/tools", icon: Bot, badge: "96.2% Rel" },

  // Derivatives
  { id: "coinglass-hub", title: "Coinglass Derivatives Hub", subtitle: "Aggregate open interest & multi-exchange liquidation", category: "Derivatives", href: "/coinglass", icon: Flame, badge: "$68B+ OI" },
  { id: "liq-heatmaps", title: "Liquidation Heatmap Clusters", subtitle: "BTC and ETH resting stop shelf & cascade zones", category: "Derivatives", href: "/coinglass", icon: Flame },
  { id: "funding-rates", title: "8-Hour Funding Rates Matrix", subtitle: "Binance, Bybit, OKX, and dYdX funding spreads", category: "Derivatives", href: "/coinglass", icon: Flame },
  { id: "long-short-ratio", title: "Institutional Long/Short Ratios", subtitle: "Top trader sentiment & taker buy delta", category: "Derivatives", href: "/coinglass", icon: Flame },

  // Macro & CPI
  { id: "cpi-tracker", title: "US CPI Inflation Tracker", subtitle: "Official BLS release dates & Bitcoin reaction", category: "Macro & CPI", href: "/news", icon: Newspaper, badge: "BLS Data" },
  { id: "fomc-rates", title: "Fed Interest Rate Cut Odds", subtitle: "FOMC target rate & easing probability", category: "Macro & CPI", href: "/news", icon: Newspaper },
  { id: "crypto-news", title: "Real-Time Breaking News Wire", subtitle: "Curated institutional & crypto news updates", category: "Macro & CPI", href: "/news", icon: Newspaper },

  // Concepts
  { id: "concepts-academy", title: "Trading Concepts Academy", subtitle: "Structured masterclass curriculum & glossary", category: "Concepts", href: "/concepts", icon: Compass, badge: "Masterclass" },
  { id: "order-flow-clob", title: "Order Flow & CLOB Mechanics", subtitle: "Central Limit Order Books and resting delta", category: "Concepts", href: "/concepts", icon: Compass },
  { id: "dca-calculator", title: "DCA & Wealth Simulator", subtitle: "Interactive Dollar-Cost Averaging calculator", category: "Concepts", href: "/concepts", icon: Compass, badge: "Tool" },

  // Research
  { id: "research-desk", title: "Research Desk & Insights", subtitle: "Macroeconomic whitepapers and quant models", category: "Research", href: "/blog", icon: BookOpen },
  { id: "halving-paper", title: "Bitcoin Supply Shock Analysis", subtitle: "Post-halving exchange reserves & ETF flows", category: "Research", href: "/blog/bitcoin-post-halving-supply-shock", icon: BookOpen },
  { id: "mvrv-paper", title: "On-Chain Valuation & MVRV", subtitle: "Spent output profit ratio & realized cap", category: "Research", href: "/blog/on-chain-metrics-mvrv-sopr-explained", icon: BookOpen },
  { id: "about-platform", title: "About Architecture & Mission", subtitle: "Open-access data integrity & technical specs", category: "Research", href: "/about", icon: Info },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // Keyboard shortcut listener
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const filtered = SEARCH_ITEMS.filter((item) => {
    const q = query.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    );
  });

  const handleSelect = (href: string) => {
    setIsOpen(false);
    router.push(href);
  };

  const handleKeyDownNav = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      handleSelect(filtered[selectedIndex].href);
    }
  };

  return (
    <>
      {/* Search trigger pill for desktop navbar */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700/80 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700/80 transition text-xs font-medium"
        title="Search platform (Ctrl+K / Cmd+K)"
      >
        <Search className="w-3.5 h-3.5" />
        <span>Search anything...</span>
        <kbd className="font-mono text-[10px] bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-slate-400">
          ⌘K
        </kbd>
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-150">
          <div
            className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Search Input Bar */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
              <Search className="w-5 h-5 text-amber-500 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                onKeyDown={handleKeyDownNav}
                placeholder="Search coins, AI bots, derivatives, CPI inflation, concepts, research..."
                className="w-full bg-transparent text-sm sm:text-base font-semibold text-slate-900 dark:text-white focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Results Stream */}
            <div className="overflow-y-auto p-2 space-y-1 flex-1">
              {filtered.length === 0 ? (
                <div className="p-8 text-center space-y-2">
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                    No results found for &ldquo;{query}&rdquo;
                  </p>
                  <p className="text-xs text-slate-400">
                    Try searching for &ldquo;BTC&rdquo;, &ldquo;AI Bots&rdquo;, &ldquo;Open Interest&rdquo;, &ldquo;CPI&rdquo;, or &ldquo;DCA&rdquo;.
                  </p>
                </div>
              ) : (
                filtered.map((item, index) => {
                  const isSelected = selectedIndex === index;
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.id}
                      onClick={() => handleSelect(item.href)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition ${
                        isSelected
                          ? "bg-amber-500/10 dark:bg-amber-500/15 border border-amber-400/40 text-slate-950 dark:text-white"
                          : "hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-300 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                            isSelected
                              ? "bg-amber-500 text-slate-950 font-black shadow-sm"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-xs sm:text-sm truncate text-slate-900 dark:text-white">
                              {item.title}
                            </span>
                            {item.badge && (
                              <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/60">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                            {item.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 ml-3">
                        <span className="text-[10px] font-mono font-semibold text-slate-400 dark:text-slate-500 hidden sm:inline">
                          {item.category}
                        </span>
                        <ArrowRight className={`w-3.5 h-3.5 transition-transform ${isSelected ? "translate-x-1 text-amber-500" : "text-slate-300 dark:text-slate-600"}`} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Navigation Shortcuts */}
            <div className="p-3 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[9px]">↑↓</kbd> Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[9px]">↵</kbd> Open
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-[9px]">ESC</kbd> Close
                </span>
              </div>
              <span className="font-mono text-[10px] text-amber-600 dark:text-amber-400 font-bold">
                BitcoinCrypto Intelligence
              </span>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
