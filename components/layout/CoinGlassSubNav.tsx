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
  Fish
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
    { label: "Market", href: "/markets", isActive: pathname === "/markets" },
    { label: "Signals", href: "/?tab=bot", isActive: pathname === "/" && (!activeTab || activeTab === "bot") },
    { label: "Predictions", href: "/predictions", isActive: pathname.startsWith("/predictions"), isBadge: "🔮" },
    { label: "Open Interest", href: "/coinglass", isActive: pathname === "/coinglass" && !activeTab },
    { label: "Funding Rate", href: "/tools/funding-rate-screener", isActive: pathname === "/tools/funding-rate-screener" },
    { label: "Liquidation", href: "/tools/liquidation-heatmap", isActive: pathname === "/tools/liquidation-heatmap" || (pathname === "/coinglass" && activeTab === "liquidations") },
    { label: "Order Book", href: "/orderbook", isActive: pathname === "/orderbook" },
    { label: "Whale Orders", href: "/whale-orders", isActive: pathname === "/whale-orders" },
    { label: "Supercharts", href: "/tools/chart-terminal", isActive: pathname === "/tools/chart-terminal" || activeTab === "terminal" },
    { label: "US CPI", href: "/cpi", isActive: pathname === "/cpi" },
    { label: "DCA Models", href: "/tools/dca-simulator", isActive: pathname === "/tools/dca-simulator" || activeTab === "dca" },
    { label: "News", href: "/news", isActive: pathname === "/news" },
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
    <div className="bg-[#0B0F19] border-b border-slate-800 text-slate-300 select-none text-xs font-medium sticky top-20 z-40 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-12 flex items-center justify-between gap-3">
        
        {/* Left Side: Brand Text + Horizontal Categories (CoinGlass Style) */}
        <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto no-scrollbar py-1">
          
          {/* Brand Wordmark (matching 'coinglass' in screenshot) */}
          <Link
            href="/"
            className="flex items-center gap-1.5 pr-2 sm:pr-3 mr-1 border-r border-slate-800 shrink-0 group"
          >
            <div className="w-5 h-5 rounded-md bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs shadow-xs">
              ₿
            </div>
            <span className="font-extrabold text-sm tracking-tight text-white group-hover:text-amber-400 transition">
              bitcoincrypto
            </span>
          </Link>

          {/* Navigation Items (Single horizontal line, compact & clean) */}
          {navLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 text-[12px] shrink-0 font-semibold ${
                item.isActive
                  ? "text-amber-400 font-bold bg-slate-900"
                  : "text-slate-300 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              {item.isBadge && <span className="text-[11px]">{item.isBadge}</span>}
              <span>{item.label}</span>
            </Link>
          ))}

          {/* More Dropdown */}
          <div className="relative shrink-0" ref={moreDropdownRef}>
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className={`px-2.5 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 text-[12px] font-semibold ${
                moreOpen ? "text-white bg-slate-900" : "text-slate-300 hover:text-white hover:bg-slate-900/60"
              }`}
            >
              <span>More</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${moreOpen ? "rotate-180 text-amber-400" : "text-slate-400"}`} />
            </button>

            {moreOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl bg-slate-900/98 backdrop-blur-xl border border-slate-800 shadow-2xl p-2 z-50 space-y-0.5 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-2.5 py-1 text-[10px] font-mono uppercase font-bold text-slate-500 border-b border-slate-800/80 mb-1">
                  Additional Tools &amp; Desk
                </div>
                {moreItems.map((m) => (
                  <Link
                    key={m.label}
                    href={m.href}
                    onClick={() => setMoreOpen(false)}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 transition text-xs font-semibold"
                  >
                    <m.icon className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span className="truncate">{m.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Right Side: CoinGlass-Style Search Input Trigger with '/' badge */}
        <div className="shrink-0 flex items-center">
          <button
            onClick={openSearch}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 hover:bg-slate-850 text-slate-400 hover:text-slate-200 border border-slate-800 transition text-xs font-mono shadow-inner group"
            title="Search Cryptocurrencies, Tools, Concepts & Articles"
          >
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 transition-colors" />
            <span className="hidden sm:inline font-sans text-[11px] text-slate-400">Search</span>
            <kbd className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-[10px] font-bold text-slate-300 leading-none shadow-xs">
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
      <div className="bg-[#0B0F19] border-b border-slate-800 text-slate-300 text-xs h-12 flex items-center px-4 max-w-7xl mx-auto">
        <span className="font-extrabold text-sm text-white">bitcoincrypto</span>
      </div>
    }>
      <CoinGlassSubNavInner />
    </Suspense>
  );
}
