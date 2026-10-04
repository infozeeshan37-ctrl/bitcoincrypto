"use client";

import React, { useState, useRef, useEffect, Suspense } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import {
  Search,
  ChevronDown,
  Sparkles,
  Flame,
  Activity,
  Coins,
  Brain,
  Layers,
  BarChart2,
  Sliders,
  RefreshCw,
  Gauge,
  Compass,
  BookOpen,
  Info,
  TrendingUp,
  Fish,
  Zap,
  Percent,
  LineChart,
  Radio,
  Calculator,
  ShieldCheck,
  X,
  ArrowRight,
  Target
} from "lucide-react";

function CoinGlassSubNavInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab");

  const [ecosystemOpen, setEcosystemOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const ecosystemRef = useRef<HTMLDivElement>(null);
  const moreRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click or Escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ecosystemRef.current && !ecosystemRef.current.contains(event.target as Node)) {
        setEcosystemOpen(false);
      }
      if (moreRef.current && !moreRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setEcosystemOpen(false);
        setMoreOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close dropdowns on route changes
  useEffect(() => {
    setEcosystemOpen(false);
    setMoreOpen(false);
  }, [pathname, activeTab]);

  const openSearch = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-command-palette"));
    }
  };

  const navLinks = [
    {
      label: "Open Interest",
      href: "/coinglass",
      isActive: pathname === "/coinglass" && !activeTab,
      icon: BarChart2,
      iconColor: "text-rose-400",
      activeColor: "from-rose-500/25 via-rose-500/15 to-transparent border-rose-500/60 text-rose-300"
    },
    {
      label: "Funding Rate",
      href: "/tools/funding-rate-screener",
      isActive: pathname === "/tools/funding-rate-screener" || (pathname === "/coinglass" && activeTab === "funding"),
      icon: Percent,
      iconColor: "text-cyan-400",
      activeColor: "from-cyan-500/25 via-cyan-500/15 to-transparent border-cyan-500/60 text-cyan-300"
    },
    {
      label: "Liquidation",
      href: "/tools/liquidation-heatmap",
      isActive: pathname === "/tools/liquidation-heatmap" || (pathname === "/coinglass" && activeTab === "liquidations"),
      icon: Flame,
      iconColor: "text-orange-400",
      activeColor: "from-orange-500/25 via-orange-500/15 to-transparent border-orange-500/60 text-orange-300"
    },
    {
      label: "Supercharts",
      href: "/tools/chart-terminal",
      isActive: pathname === "/tools/chart-terminal" || activeTab === "terminal",
      icon: LineChart,
      iconColor: "text-blue-400",
      activeColor: "from-blue-500/25 via-blue-500/15 to-transparent border-blue-500/60 text-blue-300"
    },
    {
      label: "US CPI",
      href: "/cpi",
      isActive: pathname === "/cpi",
      icon: Sparkles,
      iconColor: "text-amber-400",
      activeColor: "from-amber-500/25 via-amber-500/15 to-transparent border-amber-500/60 text-amber-300",
      badge: "BLS",
      badgeColor: "bg-amber-400/20 text-amber-300 border-amber-400/40"
    },
    {
      label: "Macro Battles",
      href: "/news",
      isActive: pathname === "/news",
      icon: Radio,
      iconColor: "text-sky-400",
      activeColor: "from-sky-500/25 via-sky-500/15 to-transparent border-sky-500/60 text-sky-300"
    },
    {
      label: "Masterclasses",
      href: "/concepts",
      isActive: pathname.startsWith("/concepts"),
      icon: Compass,
      iconColor: "text-emerald-400",
      activeColor: "from-emerald-500/25 via-emerald-500/15 to-transparent border-emerald-500/60 text-emerald-300"
    },
    {
      label: "DCA Models",
      href: "/tools/dca-simulator",
      isActive: pathname === "/tools/dca-simulator" || activeTab === "dca",
      icon: Sliders,
      iconColor: "text-yellow-400",
      activeColor: "from-yellow-500/25 via-yellow-500/15 to-transparent border-yellow-500/60 text-yellow-300"
    },
  ];

  const moreItems = [
    {
      label: "Risk & Position Sizer",
      href: "/tools/position-sizer",
      icon: Target,
      desc: "Kelly Criterion & ATR risk copilot",
      tag: "1.5% Risk"
    },
    {
      label: "Crypto & Fiat Converter",
      href: "/tools/crypto-converter",
      icon: RefreshCw,
      desc: "Zero-latency multi-currency pairs",
      tag: "50+ Fiats"
    },
    {
      label: "Fear & Greed Index Live",
      href: "/tools/fear-greed-index",
      icon: Gauge,
      desc: "6-factor market psychology gauge",
      tag: "Speedometer"
    },
    {
      label: "Profit & Leverage Calculator",
      href: "/tools/profit-calculator",
      icon: Calculator,
      desc: "1x-100x margin, fees & liquidation buffer",
      tag: "P&L Matrix"
    },
    {
      label: "Research Desk & Deep Dives",
      href: "/blog",
      icon: BookOpen,
      desc: "Institutional macro & cycle analysis",
      tag: "Articles"
    },
    {
      label: "About Architecture & Tech",
      href: "/about",
      icon: Info,
      desc: "Data pipelines, latency & methodology",
      tag: "Infrastructure"
    },
  ];

  return (
    <div className="relative bg-[#070A12]/98 backdrop-blur-2xl border-b border-slate-800/90 text-slate-200 select-none text-xs sticky top-20 z-40 shadow-xl shadow-black/40">
      
      {/* Dimmed backdrop when mega dropdown is open */}
      {(ecosystemOpen || moreOpen) && (
        <div
          className="fixed inset-0 top-[116px] bg-black/60 backdrop-blur-xs z-40 transition-opacity duration-200"
          onClick={() => {
            setEcosystemOpen(false);
            setMoreOpen(false);
          }}
        />
      )}

      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-13 flex items-center justify-between gap-2.5 relative z-50">
        
        {/* 1. LEFT: Bold & Functional 'Explore Ecosystem' Master Button */}
        <div className="shrink-0" ref={ecosystemRef}>
          <button
            type="button"
            onClick={() => {
              setEcosystemOpen(!ecosystemOpen);
              setMoreOpen(false);
            }}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all duration-200 flex items-center gap-2 text-[13px] font-black tracking-tight border cursor-pointer group ${
              ecosystemOpen
                ? "bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/30 scale-[1.02]"
                : "bg-slate-900/90 text-slate-100 hover:text-white hover:bg-slate-800 border-slate-700/90 hover:border-amber-400/80 shadow-sm"
            }`}
          >
            <Sparkles className={`w-4 h-4 transition-transform duration-200 group-hover:rotate-12 ${ecosystemOpen ? "text-slate-950" : "text-amber-400"}`} />
            <span>Explore Ecosystem</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${ecosystemOpen ? "rotate-180 text-slate-950" : "text-slate-400 group-hover:text-amber-300"}`} />
          </button>
        </div>

        {/* 2. CENTER: Bold Horizontal Scrollable Data Tabs */}
        <div className="flex-1 min-w-0 relative flex items-center">
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1.5 w-full">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 text-[12.5px] shrink-0 font-extrabold tracking-tight border cursor-pointer ${
                    item.isActive
                      ? `bg-gradient-to-r ${item.activeColor} shadow-md shadow-black/20 font-black ring-1 ring-amber-400/40`
                      : "bg-transparent text-slate-300 hover:text-white hover:bg-slate-800/80 border-transparent hover:border-slate-700/80"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${item.isActive ? "text-amber-300 scale-110" : item.iconColor} shrink-0 transition-transform`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9.5px] font-mono font-black px-1.5 py-0.2 rounded-md border ${item.badgeColor || "bg-amber-400/20 text-amber-300 border-amber-400/40"}`}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* 3. RIGHT: More Dropdown + High-Contrast Search Command Bar */}
        <div className="shrink-0 flex items-center gap-2">
          
          {/* More Options Dropdown */}
          <div className="relative shrink-0" ref={moreRef}>
            <button
              type="button"
              onClick={() => {
                setMoreOpen(!moreOpen);
                setEcosystemOpen(false);
              }}
              className={`px-3 py-2 rounded-xl whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 text-[12.5px] font-black tracking-tight border cursor-pointer ${
                moreOpen
                  ? "bg-slate-800 text-white border-amber-400/70 shadow-md ring-1 ring-amber-400/30"
                  : "bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border-slate-750 hover:border-slate-650"
              }`}
            >
              <span>More</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreOpen ? "rotate-180 text-amber-400" : "text-slate-400"}`} />
            </button>

            {/* More Menu Dropdown Popup */}
            {moreOpen && (
              <div className="absolute top-full right-0 mt-2 w-80 rounded-3xl bg-slate-900/98 backdrop-blur-2xl border border-slate-750 shadow-2xl p-3 z-50 space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-150 ring-1 ring-black/40">
                <div className="px-3 py-1.5 text-[10px] font-mono uppercase font-black text-slate-400 border-b border-slate-800 flex items-center justify-between">
                  <span>Additional Quant Tools</span>
                  <span className="text-amber-400 font-bold">10 Pro Utilities</span>
                </div>

                <div className="space-y-1 pt-1">
                  {moreItems.map((m) => (
                    <Link
                      key={m.label}
                      href={m.href}
                      onClick={() => setMoreOpen(false)}
                      className="flex items-center justify-between p-2.5 rounded-2xl text-slate-200 hover:text-white hover:bg-slate-800/90 border border-transparent hover:border-slate-700/80 transition group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-xl bg-slate-800/80 group-hover:bg-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 transition-colors">
                          <m.icon className="w-4 h-4" />
                        </div>
                        <div className="min-w-0">
                          <span className="font-black text-xs text-white group-hover:text-amber-300 transition block truncate">
                            {m.label}
                          </span>
                          <span className="text-[10px] text-slate-400 block truncate">
                            {m.desc}
                          </span>
                        </div>
                      </div>

                      <span className="text-[9.5px] font-mono font-bold px-2 py-0.5 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 shrink-0">
                        {m.tag}
                      </span>
                    </Link>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-800/80 px-2 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Need help?</span>
                  <Link
                    href="/contact"
                    onClick={() => setMoreOpen(false)}
                    className="text-amber-400 font-bold hover:underline"
                  >
                    Contact Desk &rarr;
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            type="button"
            onClick={openSearch}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-750 hover:border-amber-400/70 transition-all text-xs font-mono shadow-md shadow-black/30 group cursor-pointer"
            title="Search Cryptocurrencies, Tools, Concepts & Articles (Press /)"
          >
            <Search className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline font-sans text-[11.5px] font-extrabold text-slate-200">Search</span>
            <kbd className="px-1.5 py-0.5 rounded-md bg-slate-800 border border-slate-650 text-[10px] font-black text-amber-400 leading-none shadow-xs">
              /
            </kbd>
          </button>

        </div>

      </div>

      {/* 4. MEGA-MENU: 'Explore Ecosystem' Full Panel (Positioned cleanly at subnav root without overflow clipping) */}
      {ecosystemOpen && (
        <div className="absolute top-full left-0 right-0 max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 pt-2 z-50 pointer-events-auto">
          <div className="rounded-3xl bg-slate-900/98 backdrop-blur-2xl border border-slate-750 shadow-2xl p-5 sm:p-6 space-y-4 animate-in fade-in zoom-in-95 duration-150 ring-1 ring-black/50">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-400 text-slate-950 flex items-center justify-center font-black text-sm">
                  ₿
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">BitcoinCrypto Intelligence Ecosystem</h3>
                  <p className="text-[11px] text-slate-400">Institutional derivatives, AI prediction engines & algorithmic suites</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEcosystemOpen(false)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 border border-transparent hover:border-slate-700 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              
              {/* Column 1: Derivatives & Live Flow */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                <div className="flex items-center gap-1.5 px-1 pb-2 text-[11px] font-mono font-black uppercase tracking-wider text-rose-400 border-b border-slate-800/80">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Derivatives &amp; Tape</span>
                </div>

                <div className="space-y-1">
                  <Link
                    href="/coinglass"
                    onClick={() => setEcosystemOpen(false)}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/80 transition group"
                  >
                    <BarChart2 className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-xs text-white group-hover:text-rose-300 transition block">Open Interest Table</span>
                      <span className="text-[10px] text-slate-400 leading-snug block">Perpetual OI &amp; 24h token drift</span>
                    </div>
                  </Link>

                  <Link
                    href="/tools/funding-rate-screener"
                    onClick={() => setEcosystemOpen(false)}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/80 transition group"
                  >
                    <Percent className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-xs text-white group-hover:text-cyan-300 transition block">Funding Screener</span>
                      <span className="text-[10px] text-slate-400 leading-snug block">8h rates &amp; basis arbitrage APY</span>
                    </div>
                  </Link>

                  <Link
                    href="/tools/liquidation-heatmap"
                    onClick={() => setEcosystemOpen(false)}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/80 transition group"
                  >
                    <Flame className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-xs text-white group-hover:text-orange-300 transition block">Liquidation Heatmap</span>
                      <span className="text-[10px] text-slate-400 leading-snug block">Resting squeeze liquidity walls</span>
                    </div>
                  </Link>

                  <Link
                    href="/orderbook"
                    onClick={() => setEcosystemOpen(false)}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/80 transition group"
                  >
                    <Activity className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-xs text-white group-hover:text-amber-300 transition block">L2 Order Book</span>
                      <span className="text-[10px] text-slate-400 leading-snug block">Aggregated market depth &amp; walls</span>
                    </div>
                  </Link>

                  <Link
                    href="/whale-orders"
                    onClick={() => setEcosystemOpen(false)}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/80 transition group"
                  >
                    <Fish className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-xs text-white group-hover:text-indigo-300 transition block">Whale Radar</span>
                      <span className="text-[10px] text-slate-400 leading-snug block">Sub-second block tape (&gt;$10M)</span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Column 2: AI & Quantitative Intelligence */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                <div className="flex items-center gap-1.5 px-1 pb-2 text-[11px] font-mono font-black uppercase tracking-wider text-purple-400 border-b border-slate-800/80">
                  <Brain className="w-3.5 h-3.5" />
                  <span>AI &amp; Predictions</span>
                </div>

                <div className="space-y-1">
                  <Link
                    href="/predictions"
                    onClick={() => setEcosystemOpen(false)}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/80 transition group"
                  >
                    <Brain className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-xs text-white group-hover:text-purple-300 transition block">AI Price Predictions</span>
                      <span className="text-[10px] text-slate-400 leading-snug block">36 coins 5m/24h/7d forecast</span>
                    </div>
                  </Link>

                  <Link
                    href="/tools/trading-bot"
                    onClick={() => setEcosystemOpen(false)}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/80 transition group"
                  >
                    <Zap className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-xs text-white group-hover:text-amber-300 transition block">AI Signals Copilot</span>
                      <span className="text-[10px] text-slate-400 leading-snug block">Algorithmic execution signals</span>
                    </div>
                  </Link>

                  <Link
                    href="/cpi"
                    onClick={() => setEcosystemOpen(false)}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/80 transition group"
                  >
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-xs text-white group-hover:text-amber-300 transition block">US CPI Neural AI</span>
                      <span className="text-[10px] text-slate-400 leading-snug block">Inflation forecast &amp; Fed odds</span>
                    </div>
                  </Link>

                  <Link
                    href="/tools/dca-simulator"
                    onClick={() => setEcosystemOpen(false)}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/80 transition group"
                  >
                    <Sliders className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-xs text-white group-hover:text-yellow-300 transition block">DCA Cycle Simulator</span>
                      <span className="text-[10px] text-slate-400 leading-snug block">Multi-cycle backtest (2017-2026)</span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Column 3: Calculators & Risk Management */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                <div className="flex items-center gap-1.5 px-1 pb-2 text-[11px] font-mono font-black uppercase tracking-wider text-emerald-400 border-b border-slate-800/80">
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Calculators &amp; Risk</span>
                </div>

                <div className="space-y-1">
                  <Link
                    href="/tools/position-sizer"
                    onClick={() => setEcosystemOpen(false)}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/80 transition group"
                  >
                    <Target className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-xs text-white group-hover:text-emerald-300 transition block">Risk &amp; Position Sizer</span>
                      <span className="text-[10px] text-slate-400 leading-snug block">Kelly Criterion &amp; ATR stops</span>
                    </div>
                  </Link>

                  <Link
                    href="/tools/profit-calculator"
                    onClick={() => setEcosystemOpen(false)}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/80 transition group"
                  >
                    <Calculator className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-xs text-white group-hover:text-emerald-300 transition block">Profit &amp; Leverage ROI</span>
                      <span className="text-[10px] text-slate-400 leading-snug block">1x-100x P&amp;L &amp; liquidation math</span>
                    </div>
                  </Link>

                  <Link
                    href="/tools/fear-greed-index"
                    onClick={() => setEcosystemOpen(false)}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/80 transition group"
                  >
                    <Gauge className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-xs text-white group-hover:text-yellow-300 transition block">Fear &amp; Greed Radar</span>
                      <span className="text-[10px] text-slate-400 leading-snug block">Live 0-100 sentiment gauge</span>
                    </div>
                  </Link>

                  <Link
                    href="/tools/crypto-converter"
                    onClick={() => setEcosystemOpen(false)}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/80 transition group"
                  >
                    <RefreshCw className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-xs text-white group-hover:text-cyan-300 transition block">Crypto-Fiat Converter</span>
                      <span className="text-[10px] text-slate-400 leading-snug block">Real-time forex exchange rates</span>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Column 4: Masterclasses & Research */}
              <div className="space-y-2 p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800/80">
                <div className="flex items-center gap-1.5 px-1 pb-2 text-[11px] font-mono font-black uppercase tracking-wider text-sky-400 border-b border-slate-800/80">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Research &amp; Learn</span>
                </div>

                <div className="space-y-1">
                  <Link
                    href="/concepts"
                    onClick={() => setEcosystemOpen(false)}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/80 transition group"
                  >
                    <Compass className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-xs text-white group-hover:text-sky-300 transition block">12 Masterclasses</span>
                      <span className="text-[10px] text-slate-400 leading-snug block">Order book, CVD &amp; funding guides</span>
                    </div>
                  </Link>

                  <Link
                    href="/blog"
                    onClick={() => setEcosystemOpen(false)}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/80 transition group"
                  >
                    <LineChart className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-xs text-white group-hover:text-sky-300 transition block">Research Desk</span>
                      <span className="text-[10px] text-slate-400 leading-snug block">Quantitative macro analysis</span>
                    </div>
                  </Link>

                  <Link
                    href="/news"
                    onClick={() => setEcosystemOpen(false)}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/80 transition group"
                  >
                    <Radio className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-xs text-white group-hover:text-sky-300 transition block">Macro News Wire</span>
                      <span className="text-[10px] text-slate-400 leading-snug block">Fed rate odds &amp; market drivers</span>
                    </div>
                  </Link>

                  <Link
                    href="/markets"
                    onClick={() => setEcosystemOpen(false)}
                    className="flex items-start gap-2.5 p-2 rounded-xl hover:bg-slate-800/80 transition group"
                  >
                    <Coins className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-xs text-white group-hover:text-amber-300 transition block">Top 50+ Spot Markets</span>
                      <span className="text-[10px] text-slate-400 leading-snug block">Volume, dominance &amp; depth</span>
                    </div>
                  </Link>
                </div>
              </div>

            </div>

            {/* Bottom Footer Telemetry */}
            <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Sub-Second Telemetry Connected (Binance &amp; CoinGlass Nodes)</span>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href="/tools"
                  onClick={() => setEcosystemOpen(false)}
                  className="text-amber-400 font-bold hover:underline flex items-center gap-1"
                >
                  <span>Launch Pro Suite</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default function CoinGlassSubNav() {
  return (
    <Suspense fallback={
      <div className="bg-[#070A12] border-b border-slate-800 text-slate-300 text-xs h-13 flex items-center px-4 max-w-7xl mx-auto" />
    }>
      <CoinGlassSubNavInner />
    </Suspense>
  );
}
