"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import {
  Coins,
  BookOpen,
  Compass,
  Info,
  Menu,
  X,
  Bot,
  Flame,
  Newspaper,
  ChevronDown,
  Sparkles,
  Zap,
  LineChart,
  Search
} from "lucide-react";
import LiveTickerBar from "./LiveTickerBar";
import ThemeToggle from "@/components/theme/ThemeToggle";
import CommandPalette from "@/components/common/CommandPalette";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMouseEnter = (menuKey: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(menuKey);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const toggleDropdown = (menuKey: string) => {
    setActiveDropdown((prev) => (prev === menuKey ? null : menuKey));
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-950/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 shadow-sm transition-colors duration-150">
      {/* 1. Real-time Live Ticker Bar at the very top */}
      <LiveTickerBar />

      {/* 2. Main Navbar Navigation */}
      <nav ref={navRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Left: Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-400 text-slate-950 flex items-center justify-center shadow-md shadow-amber-500/25 font-black text-xl group-hover:scale-105 group-hover:shadow-amber-500/40 transition duration-300">
            ₿
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                BitcoinCrypto
              </span>
              <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded-md bg-amber-100/90 dark:bg-amber-950/90 text-amber-900 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/60 shadow-xs">
                .TECH
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold tracking-wide uppercase">
              Crypto Market Intelligence
            </p>
          </div>
        </Link>

        {/* Center: Desktop Navigation with Dropdowns */}
        <div className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium">
          
          {/* Dropdown 1: Markets & Derivatives */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("markets")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => toggleDropdown("markets")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition font-semibold ${
                activeDropdown === "markets" ? "bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white" : ""
              }`}
              aria-expanded={activeDropdown === "markets"}
            >
              <Coins className="w-4 h-4 text-amber-500" />
              <span>Markets</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                  activeDropdown === "markets" ? "rotate-180 text-amber-600" : ""
                }`}
              />
            </button>

            {/* Dropdown Flyout */}
            {activeDropdown === "markets" && (
              <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/10 dark:shadow-slate-950/50 p-3 space-y-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800">
                  Market Rankings & Derivatives
                </div>
                
                <Link
                  href="/markets"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-amber-50/80 dark:hover:bg-amber-950/30 transition group"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-amber-500 group-hover:text-slate-950 transition">
                    <Coins className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition">
                        Spot Coin Rankings
                      </span>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300">
                        Top 50+
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                      Prices, 24h volumes, market cap, and gainers/losers.
                    </p>
                  </div>
                </Link>

                <Link
                  href="/coinglass"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-rose-50/80 dark:hover:bg-rose-950/30 transition group"
                >
                  <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-rose-500 group-hover:text-white transition">
                    <Flame className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-300 transition">
                        Coinglass Derivatives
                      </span>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300">
                        OI & Liq
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                      Perpetual open interest, liquidations, and long/short ratio.
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Dropdown 2: Intelligence & Tools */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("tools")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => toggleDropdown("tools")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition font-semibold ${
                activeDropdown === "tools" ? "bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white" : ""
              }`}
              aria-expanded={activeDropdown === "tools"}
            >
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Intelligence</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                  activeDropdown === "tools" ? "rotate-180 text-amber-600" : ""
                }`}
              />
            </button>

            {/* Dropdown Flyout */}
            {activeDropdown === "tools" && (
              <div className="absolute top-full left-0 mt-2 w-84 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/10 dark:shadow-slate-950/50 p-3 space-y-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800">
                  Signals & Macro Analytics
                </div>
                
                <Link
                  href="/tools"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-amber-50/80 dark:hover:bg-amber-950/30 transition group"
                >
                  <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-amber-500 group-hover:text-slate-950 transition">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition">
                        AI Trading Signals
                      </span>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-400 text-slate-950">
                        BOTS
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                      Algorithmic signals, risk-to-reward copilot, and charts.
                    </p>
                  </div>
                </Link>

                <Link
                  href="/news"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50/80 dark:hover:bg-blue-950/30 transition group"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-blue-500 group-hover:text-white transition">
                    <Newspaper className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition">
                        US CPI & Macro News
                      </span>
                      <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
                        MACRO
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                      Inflation indicators, Fed FOMC odds, and market news.
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Dropdown 3: Research & Education */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("research")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => toggleDropdown("research")}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition font-semibold ${
                activeDropdown === "research" ? "bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white" : ""
              }`}
              aria-expanded={activeDropdown === "research"}
            >
              <BookOpen className="w-4 h-4 text-amber-500" />
              <span>Research & Learn</span>
              <ChevronDown
                className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                  activeDropdown === "research" ? "rotate-180 text-amber-600" : ""
                }`}
              />
            </button>

            {/* Dropdown Flyout */}
            {activeDropdown === "research" && (
              <div className="absolute top-full left-0 mt-2 w-80 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-900/10 dark:shadow-slate-950/50 p-3 space-y-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800">
                  Knowledge & Architecture
                </div>
                
                <Link
                  href="/concepts"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition group"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-slate-900 dark:group-hover:bg-amber-400 dark:group-hover:text-slate-950 group-hover:text-white transition">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition block">
                      Trading Concepts & DCA
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                      Order books, funding mechanisms, DCA models.
                    </p>
                  </div>
                </Link>

                <Link
                  href="/blog"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition group"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-slate-900 dark:group-hover:bg-amber-400 dark:group-hover:text-slate-950 group-hover:text-white transition">
                    <LineChart className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition block">
                      Research Desk & Insights
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                      Crypto market deep dives and analytical articles.
                    </p>
                  </div>
                </Link>

                <Link
                  href="/about"
                  onClick={() => setActiveDropdown(null)}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition group"
                >
                  <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-slate-900 dark:group-hover:bg-amber-400 dark:group-hover:text-slate-950 group-hover:text-white transition">
                    <Info className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition block">
                      About Architecture
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 leading-tight">
                      Methodology, data sources, and platform mission.
                    </p>
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Command Palette Trigger */}
          <CommandPalette />

        </div>

        {/* Right: Desktop Theme Switcher */}
        <div className="hidden sm:flex items-center gap-3 flex-shrink-0">
          <ThemeToggle />
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle variant="dropdown" />
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile / Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/98 dark:bg-slate-900/98 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800 px-5 py-6 space-y-5 text-sm font-medium text-slate-700 dark:text-slate-200 animate-in fade-in slide-in-from-top-2 duration-200 max-h-[85vh] overflow-y-auto">
          
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-2 pb-2">
            <Link
              href="/tools"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-amber-400 text-slate-950 font-black text-xs shadow-sm hover:bg-amber-300 transition text-center"
            >
              <Bot className="w-4 h-4" />
              <span>AI Signals Terminal</span>
            </Link>
            <Link
              href="/markets"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-slate-900 dark:bg-slate-800 text-white font-bold text-xs hover:bg-slate-800 dark:hover:bg-slate-700 transition text-center"
            >
              <Coins className="w-4 h-4 text-amber-400" />
              <span>Spot Markets</span>
            </Link>
          </div>

          {/* Section 1: Markets & Analytics */}
          <div className="space-y-1 pt-2">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 pb-1">
              Markets & Analytics
            </div>

            <Link
              href="/markets"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-50/70 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-700/60 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 flex items-center justify-center">
                  <Coins className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block text-xs">CoinMarketCap Spot Rankings</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Live prices, volume, dominance</span>
                </div>
              </div>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300">
                Top 50+
              </span>
            </Link>

            <Link
              href="/coinglass"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-rose-50/70 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-700/60 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 flex items-center justify-center">
                  <Flame className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block text-xs">Coinglass Derivatives</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Open interest, liquidations & ratios</span>
                </div>
              </div>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300">
                OI & Liq
              </span>
            </Link>
          </div>

          {/* Section 2: Tools & Macro Intelligence */}
          <div className="space-y-1 pt-2">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 pb-1">
              Intelligence & Macro
            </div>

            <Link
              href="/tools"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-50/70 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-700/60 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-900 dark:text-amber-300 flex items-center justify-center">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block text-xs">AI Trading Signals Terminal</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Algorithmic setups & risk copilot</span>
                </div>
              </div>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-950">
                SIGNALS
              </span>
            </Link>

            <Link
              href="/news"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-blue-50/70 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-700/60 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center">
                  <Newspaper className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block text-xs">US CPI & Macro News</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Inflation releases & Fed rate odds</span>
                </div>
              </div>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
                MACRO
              </span>
            </Link>
          </div>

          {/* Section 3: Research & Education */}
          <div className="space-y-1 pt-2 border-t border-slate-100 dark:border-slate-800">
            <Link
              href="/concepts"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold transition text-xs"
            >
              <Compass className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>Trading Concepts & DCA Models</span>
            </Link>

            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold transition text-xs"
            >
              <BookOpen className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>Research Desk & Market Articles</span>
            </Link>

            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold transition text-xs"
            >
              <Info className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              <span>About Platform & Architecture</span>
            </Link>
          </div>

        </div>
      )}
    </header>
  );
}
