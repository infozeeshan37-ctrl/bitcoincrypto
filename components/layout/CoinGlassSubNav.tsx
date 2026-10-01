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
  Radio
} from "lucide-react";

function CoinGlassSubNavInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get("tab");

  const [moreOpen, setMoreOpen] = useState(false);
  const moreDropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(event.target as Node)) {
        setMoreOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const openSearch = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-command-palette"));
    }
  };

  const navLinks = [
    {
      label: "Market",
      href: "/markets",
      isActive: pathname === "/markets",
      icon: Coins,
      iconColor: "text-emerald-400"
    },
    {
      label: "Signals",
      href: "/?tab=bot",
      isActive: pathname === "/" && (!activeTab || activeTab === "bot"),
      icon: Activity,
      iconColor: "text-amber-400",
      isLive: true
    },
    {
      label: "Predictions",
      href: "/predictions",
      isActive: pathname.startsWith("/predictions"),
      icon: Brain,
      iconColor: "text-purple-400",
      badge: "AI 98%"
    },
    {
      label: "Open Interest",
      href: "/coinglass",
      isActive: pathname === "/coinglass" && !activeTab,
      icon: BarChart2,
      iconColor: "text-rose-400"
    },
    {
      label: "Funding Rate",
      href: "/tools/funding-rate-screener",
      isActive: pathname === "/tools/funding-rate-screener",
      icon: Percent,
      iconColor: "text-cyan-400"
    },
    {
      label: "Liquidation",
      href: "/tools/liquidation-heatmap",
      isActive: pathname === "/tools/liquidation-heatmap" || (pathname === "/coinglass" && activeTab === "liquidations"),
      icon: Flame,
      iconColor: "text-orange-400"
    },
    {
      label: "Order Book",
      href: "/orderbook",
      isActive: pathname === "/orderbook",
      icon: Layers,
      iconColor: "text-amber-400"
    },
    {
      label: "Whale Orders",
      href: "/whale-orders",
      isActive: pathname === "/whale-orders",
      icon: Fish,
      iconColor: "text-indigo-400"
    },
    {
      label: "Supercharts",
      href: "/tools/chart-terminal",
      isActive: pathname === "/tools/chart-terminal" || activeTab === "terminal",
      icon: LineChart,
      iconColor: "text-blue-400"
    },
    {
      label: "US CPI",
      href: "/cpi",
      isActive: pathname === "/cpi",
      icon: Sparkles,
      iconColor: "text-amber-400",
      badge: "BLS"
    },
    {
      label: "DCA Models",
      href: "/tools/dca-simulator",
      isActive: pathname === "/tools/dca-simulator" || activeTab === "dca",
      icon: Sliders,
      iconColor: "text-emerald-400"
    },
    {
      label: "News",
      href: "/news",
      isActive: pathname === "/news",
      icon: Radio,
      iconColor: "text-sky-400"
    },
  ];

  const moreItems = [
    { label: "Risk & Position Sizer", href: "/tools/position-sizer", icon: Sliders },
    { label: "Crypto & Fiat Converter", href: "/tools/crypto-converter", icon: RefreshCw },
    { label: "Crypto Fear & Greed Index", href: "/tools/fear-greed-index", icon: Gauge },
    { label: "Profit & ROI Calculator", href: "/tools/profit-calculator", icon: TrendingUp },
    { label: "Trading Concepts Academy", href: "/concepts", icon: Compass },
    { label: "Research Desk & Blog", href: "/blog", icon: BookOpen },
    { label: "About Architecture & Team", href: "/about", icon: Info },
  ];

  return (
    <div className="bg-[#0B0F19]/95 backdrop-blur-xl border-b border-slate-800 text-slate-200 select-none text-xs sticky top-20 z-40 shadow-lg shadow-black/30">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 h-13 flex items-center justify-between gap-2 sm:gap-3">
        
        {/* Left Side: Bold & Stylish Category Tabs (Full Width Space) */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto no-scrollbar py-1.5 flex-1 min-w-0">
          
          {/* Bold & Stylish Navigation Tabs */}
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 text-[12.5px] shrink-0 font-extrabold tracking-tight ${
                  item.isActive
                    ? "bg-gradient-to-r from-amber-500/20 via-amber-400/25 to-yellow-500/20 text-amber-300 border border-amber-400/60 shadow-sm shadow-amber-500/20 font-black ring-1 ring-amber-400/30"
                    : "text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-700/80 font-bold"
                }`}
              >
                {item.isLive && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400/60" />
                )}
                <Icon className={`w-3.5 h-3.5 ${item.isActive ? "text-amber-400" : item.iconColor} shrink-0`} />
                <span>{item.label}</span>
                {item.badge && (
                  <span className={`text-[9px] font-mono font-black px-1.5 py-0.2 rounded-md ${
                    item.badge.includes("AI")
                      ? "bg-purple-500/30 text-purple-300 border border-purple-400/40"
                      : "bg-amber-400/20 text-amber-300 border border-amber-400/40"
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}

          {/* More Dropdown (Bold & Stylish) */}
          <div className="relative shrink-0" ref={moreDropdownRef}>
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className={`px-3 py-1.5 rounded-xl whitespace-nowrap transition-all flex items-center gap-1.5 text-[12.5px] font-extrabold tracking-tight cursor-pointer ${
                moreOpen
                  ? "bg-slate-800 text-white border border-slate-700 shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-700/80 font-bold"
              }`}
            >
              <span>More</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreOpen ? "rotate-180 text-amber-400" : "text-slate-400"}`} />
            </button>

            {moreOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-slate-900/98 backdrop-blur-xl border border-slate-800 shadow-2xl p-2 z-50 space-y-1 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-2.5 py-1 text-[10px] font-mono uppercase font-black text-slate-400 border-b border-slate-800/80 mb-1 flex items-center justify-between">
                  <span>Additional Tools</span>
                  <span className="text-amber-400 font-mono">v4.5</span>
                </div>
                {moreItems.map((m) => (
                  <Link
                    key={m.label}
                    href={m.href}
                    onClick={() => setMoreOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition text-xs font-bold"
                  >
                    <m.icon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{m.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Side: Bold & Stylish CoinGlass Search Button */}
        <div className="shrink-0 flex items-center">
          <button
            onClick={openSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/95 hover:bg-slate-850 text-slate-300 hover:text-white border border-slate-750 hover:border-amber-400/60 transition-all text-xs font-mono shadow-md shadow-black/30 group cursor-pointer"
            title="Search Cryptocurrencies, Tools, Concepts & Articles"
          >
            <Search className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline font-sans text-[11px] font-bold text-slate-300">Search</span>
            <kbd className="px-1.5 py-0.5 rounded-md bg-slate-800 border border-slate-650 text-[10px] font-black text-amber-400 leading-none shadow-xs">
              /
            </kbd>
          </button>
        </div>

      </div>
    </div>
  );
}

export default function CoinGlassSubNav() {
  return (
    <Suspense fallback={
      <div className="bg-[#0B0F19] border-b border-slate-800 text-slate-300 text-xs h-13 flex items-center px-4 max-w-7xl mx-auto" />
    }>
      <CoinGlassSubNavInner />
    </Suspense>
  );
}
