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
  Activity,
  Search,
  Fish,
  Brain,
  TrendingUp,
  Mail
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

        {/* Center: Desktop Navigation - Consolidated in One Unified Master Tab */}
        <div className="hidden lg:flex items-center gap-2 xl:gap-3 text-sm font-medium">
          
          {/* Master Unified Dropdown: Explore Ecosystem */}
          <div
            className="relative"
            onMouseEnter={() => handleMouseEnter("ecosystem")}
            onMouseLeave={handleMouseLeave}
          >
            <button
              onClick={() => toggleDropdown("ecosystem")}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-slate-800 dark:text-slate-100 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/90 dark:hover:bg-slate-800/90 transition font-black tracking-tight border border-slate-200/80 dark:border-slate-800 shadow-xs ${
                activeDropdown === "ecosystem"
                  ? "bg-slate-100 dark:bg-slate-800 text-slate-950 dark:text-white ring-2 ring-amber-400/40"
                  : "bg-white/80 dark:bg-slate-900/80"
              }`}
              aria-expanded={activeDropdown === "ecosystem"}
            >
              <div className="w-5 h-5 rounded-lg bg-amber-400/20 text-amber-500 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <span className="text-xs sm:text-sm font-black">Explore Ecosystem</span>
              <ChevronDown
                className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                  activeDropdown === "ecosystem" ? "rotate-180 text-amber-500" : ""
                }`}
              />
            </button>

            {/* Comprehensive 3-Column Mega Menu Flyout */}
            {activeDropdown === "ecosystem" && (
              <div className="absolute top-full left-0 xl:-left-20 mt-2.5 w-[840px] xl:w-[880px] rounded-3xl bg-white/98 dark:bg-slate-900/98 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 shadow-2xl shadow-slate-900/20 dark:shadow-slate-950/80 p-5 space-y-4 z-50 animate-in fade-in zoom-in-95 duration-150">
                
                {/* 3 Structured Pillars */}
                <div className="grid grid-cols-3 gap-4">
                  
                  {/* Column 1: Markets & Real-Time Liquidity */}
                  <div className="space-y-1.5 p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono font-black uppercase tracking-wider text-amber-700 dark:text-amber-400 border-b border-slate-200/60 dark:border-slate-800/80 pb-2">
                      <Coins className="w-3.5 h-3.5" />
                      <span>Markets &amp; Liquidity</span>
                    </div>

                    <Link
                      href="/markets"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-amber-50/80 dark:hover:bg-amber-950/30 transition group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-amber-500 group-hover:text-slate-950 transition">
                        <Coins className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition">
                            Spot Rankings
                          </span>
                          <span className="text-[8px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300">
                            Top 50+
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                          Prices, volumes &amp; caps
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="/coinglass"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-rose-50/80 dark:hover:bg-rose-950/30 transition group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-rose-500 group-hover:text-white transition">
                        <Flame className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-300 transition">
                            Coinglass Radar
                          </span>
                          <span className="text-[8px] font-mono font-bold px-1.5 py-0.2 rounded bg-rose-100 dark:bg-rose-900/40 text-rose-800 dark:text-rose-300">
                            OI &amp; Liq
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                          Futures &amp; liquidations
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="/orderbook"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-amber-50/80 dark:hover:bg-amber-950/30 transition group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-amber-500 group-hover:text-slate-950 transition">
                        <Activity className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition">
                            L2 Order Book
                          </span>
                          <span className="text-[8px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-400 text-slate-950">
                            DEPTH
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                          CLOB depth &amp; resting walls
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="/whale-orders"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-indigo-50/80 dark:hover:bg-indigo-950/30 transition group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-indigo-600 group-hover:text-white transition">
                        <Fish className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition">
                            Whale Orders
                          </span>
                          <span className="text-[8px] font-mono font-bold px-1.5 py-0.2 rounded bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
                            WHALES
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                          Block tape &amp; heatmaps
                        </p>
                      </div>
                    </Link>
                  </div>

                  {/* Column 2: AI Intelligence & Quantitative Tools */}
                  <div className="space-y-1.5 p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono font-black uppercase tracking-wider text-purple-700 dark:text-purple-400 border-b border-slate-200/60 dark:border-slate-800/80 pb-2">
                      <Zap className="w-3.5 h-3.5" />
                      <span>AI &amp; Quantitative</span>
                    </div>

                    <Link
                      href="/predictions"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-purple-50/80 dark:hover:bg-purple-950/30 transition group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-purple-500 group-hover:text-white transition">
                        <Brain className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition">
                            AI Price Predictions
                          </span>
                          <span className="text-[8px] font-mono font-bold px-1.5 py-0.2 rounded bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300">
                            98.6%
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                          Multi-horizon forecasts
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="/tools"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-amber-50/80 dark:hover:bg-amber-950/30 transition group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-900 dark:text-amber-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-amber-500 group-hover:text-slate-950 transition">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition">
                            AI Signals &amp; Bots
                          </span>
                          <span className="text-[8px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-400 text-slate-950">
                            BOTS
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                          Algorithmic execution copilot
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="/cpi"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-amber-50/80 dark:hover:bg-amber-950/30 transition group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-amber-500 group-hover:text-slate-950 transition">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition">
                            US CPI Predictor
                          </span>
                          <span className="text-[8px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300">
                            NEURAL
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                          Inflation volatility model
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="/news"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-blue-50/80 dark:hover:bg-blue-950/30 transition group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-blue-500 group-hover:text-white transition">
                        <Newspaper className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition">
                            Macro &amp; Rate Battles
                          </span>
                          <span className="text-[8px] font-mono font-bold px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300">
                            MACRO
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                          Fed rates &amp; global battles
                        </p>
                      </div>
                    </Link>
                  </div>

                  {/* Column 3: Research, Masterclasses & Desk */}
                  <div className="space-y-1.5 p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-950/50 border border-slate-100 dark:border-slate-800/80">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono font-black uppercase tracking-wider text-emerald-700 dark:text-emerald-400 border-b border-slate-200/60 dark:border-slate-800/80 pb-2">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Research &amp; Learn</span>
                    </div>

                    <Link
                      href="/blog"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-slate-900 dark:group-hover:bg-amber-400 dark:group-hover:text-slate-950 group-hover:text-white transition">
                        <LineChart className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition block">
                          Research Desk &amp; Blog
                        </span>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                          Institutional deep dives
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="/concepts"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-slate-900 dark:group-hover:bg-amber-400 dark:group-hover:text-slate-950 group-hover:text-white transition">
                        <Compass className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition block">
                          Trading Masterclasses
                        </span>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                          Market microstructure &amp; DCA
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="/about"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-slate-900 dark:group-hover:bg-amber-400 dark:group-hover:text-slate-950 group-hover:text-white transition">
                        <Info className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition block">
                          About Platform
                        </span>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                          Methodology &amp; sources
                        </p>
                      </div>
                    </Link>

                    <Link
                      href="/contact"
                      onClick={() => setActiveDropdown(null)}
                      className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center flex-shrink-0 group-hover:scale-105 group-hover:bg-slate-900 dark:group-hover:bg-amber-400 dark:group-hover:text-slate-950 group-hover:text-white transition">
                        <Mail className="w-3.5 h-3.5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition block">
                          Contact Support
                        </span>
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight mt-0.5">
                          Inquiries &amp; assistance
                        </p>
                      </div>
                    </Link>
                  </div>

                </div>

                {/* Bottom Flyout HUD Telemetry */}
                <div className="pt-3 border-t border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    <span className="font-mono text-[11px]">Live WebSocket Stream • Institutional CLOB Depth • AI Neural Copilot</span>
                  </div>
                  <Link
                    href="/tools"
                    onClick={() => setActiveDropdown(null)}
                    className="font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span>Launch AI Terminal</span>
                    <span>→</span>
                  </Link>
                </div>

              </div>
            )}
          </div>

          {/* Quick Direct Shortcuts */}
          <Link
            href="/tools"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition font-bold text-xs"
          >
            <Bot className="w-4 h-4 text-amber-500" />
            <span>AI Signals</span>
          </Link>

          <Link
            href="/whale-orders"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-slate-700 dark:text-slate-200 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100/80 dark:hover:bg-slate-800/80 transition font-bold text-xs"
          >
            <Fish className="w-4 h-4 text-indigo-500" />
            <span>Whale Orders</span>
          </Link>
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
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Real-time prices, volume, dominance</span>
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

            <Link
              href="/orderbook"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-50/70 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-700/60 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 flex items-center justify-center">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block text-xs">L2 Order Book Terminal</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Aggregated depth &amp; resting walls</span>
                </div>
              </div>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-950">
                DEPTH
              </span>
            </Link>

            <Link
              href="/whale-orders"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50/70 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-700/60 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 flex items-center justify-center">
                  <Fish className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block text-xs">Whale Orders &amp; Liquidity</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Institutional blocks, walls &amp; heatmap</span>
                </div>
              </div>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300">
                WHALES
              </span>
            </Link>
          </div>

          {/* Section 2: Tools & Macro Intelligence */}
          <div className="space-y-1 pt-2">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 px-3 pb-1">
              Intelligence & Macro
            </div>

            <Link
              href="/predictions"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-purple-50/70 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-700/60 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300 flex items-center justify-center">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block text-xs">AI Price Prediction Engine</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">BTC, ETH & Altcoins 24h/7d/30d Forecast</span>
                </div>
              </div>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-900/40 text-purple-800 dark:text-purple-300">
                98.6% CONF
              </span>
            </Link>

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
              href="/cpi"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 hover:bg-amber-50/70 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-700/60 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-900 dark:text-amber-300 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block text-xs">US CPI AI Predictor</span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Neural inflation & crypto volatility model</span>
                </div>
              </div>
              <span className="text-[9px] font-mono font-bold px-2 py-0.5 rounded bg-amber-400 text-slate-950">
                AI CPI
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
              <span>About Platform &amp; Methodology</span>
            </Link>

            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold transition text-xs"
            >
              <Mail className="w-4 h-4 text-emerald-500" />
              <span>Contact Us &amp; Support Desk</span>
            </Link>
          </div>

        </div>
      )}
    </header>
  );
}
