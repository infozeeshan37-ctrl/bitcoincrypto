"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Coins,
  BookOpen,
  Compass,
  Info,
  Menu,
  X,
  ArrowUpRight,
  Bot,
  Flame,
  Newspaper,
  BarChart3,
  TrendingUp,
  Activity,
  Layers
} from "lucide-react";
import LiveTickerBar from "./LiveTickerBar";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-sm">
      {/* 1. Real-time Live Ticker Bar at the very top */}
      <LiveTickerBar />

      {/* 2. Main Navbar Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-400 text-slate-950 flex items-center justify-center shadow-md shadow-amber-500/20 font-black text-xl group-hover:scale-105 transition">
            ₿
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">BitcoinCrypto</span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                .TECH
              </span>
            </div>
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Live Market & Intelligence Hub</p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-600">
          
          {/* Markets (CoinMarketCap) */}
          <Link
            href="/markets"
            className="hover:text-amber-600 transition flex items-center gap-1.5 font-semibold text-slate-800 group"
          >
            <Coins className="w-4 h-4 text-amber-500 group-hover:scale-110 transition" />
            <span>Markets</span>
            <span className="text-[9px] font-mono font-extrabold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
              CMC
            </span>
          </Link>

          {/* Coinglass Derivatives */}
          <Link
            href="/coinglass"
            className="hover:text-amber-600 transition flex items-center gap-1.5 font-semibold text-slate-800 group"
          >
            <Flame className="w-4 h-4 text-rose-500 group-hover:scale-110 transition" />
            <span>Coinglass</span>
            <span className="text-[9px] font-mono font-extrabold px-1.5 py-0.2 rounded bg-rose-100 text-rose-800">
              DERIVATIVES
            </span>
          </Link>

          {/* News & CPI Macro */}
          <Link
            href="/news"
            className="hover:text-amber-600 transition flex items-center gap-1.5 font-semibold text-slate-800 group"
          >
            <Newspaper className="w-4 h-4 text-blue-500 group-hover:scale-110 transition" />
            <span>News & CPI</span>
            <span className="text-[9px] font-mono font-extrabold px-1.5 py-0.2 rounded bg-blue-100 text-blue-800">
              MACRO
            </span>
          </Link>

          {/* AI Trading Bot Signals */}
          <Link
            href="/tools"
            className="hover:text-amber-600 transition flex items-center gap-1.5 font-bold text-slate-900 group"
          >
            <Bot className="w-4 h-4 text-amber-500 group-hover:scale-110 transition" />
            <span>AI Signals</span>
            <span className="text-[9px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-400 text-slate-950 animate-pulse">
              LIVE
            </span>
          </Link>

          {/* Concepts */}
          <Link href="/concepts" className="hover:text-amber-600 transition flex items-center gap-1.5 text-slate-600">
            <Compass className="w-4 h-4 text-slate-500" />
            <span>Concepts</span>
          </Link>

          {/* Research Blog */}
          <Link href="/blog" className="hover:text-amber-600 transition flex items-center gap-1.5 text-slate-600">
            <BookOpen className="w-4 h-4 text-slate-500" />
            <span>Research</span>
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/markets"
            className="px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition border border-slate-200"
          >
            Live Feed
          </Link>
          <Link
            href="/tools"
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-sm hover:shadow transition flex items-center gap-1.5"
          >
            Launch AI Signals <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 bg-slate-100 border border-slate-200"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 text-sm font-medium text-slate-700 animate-in fade-in slide-in-from-top duration-200">
          <Link href="/" onClick={() => setIsOpen(false)} className="block hover:text-amber-600 font-semibold">
            Home Overview
          </Link>

          <Link
            href="/markets"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between py-2 border-b border-slate-100 hover:text-amber-600"
          >
            <div className="flex items-center gap-2">
              <Coins className="w-4 h-4 text-amber-500" />
              <span className="font-bold text-slate-900">CoinMarketCap Live Markets</span>
            </div>
            <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">TOP 50+</span>
          </Link>

          <Link
            href="/coinglass"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between py-2 border-b border-slate-100 hover:text-amber-600"
          >
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-rose-500" />
              <span className="font-bold text-slate-900">Coinglass Derivatives & Liquidations</span>
            </div>
            <span className="text-[10px] bg-rose-100 text-rose-800 font-bold px-2 py-0.5 rounded">OI & LIQ</span>
          </Link>

          <Link
            href="/news"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between py-2 border-b border-slate-100 hover:text-amber-600"
          >
            <div className="flex items-center gap-2">
              <Newspaper className="w-4 h-4 text-blue-500" />
              <span className="font-bold text-slate-900">Latest Crypto News & CPI Data</span>
            </div>
            <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded">MACRO CPI</span>
          </Link>

          <Link
            href="/tools"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-between py-2 border-b border-slate-100 hover:text-amber-600"
          >
            <div className="flex items-center gap-2">
              <Bot className="w-4 h-4 text-amber-500" />
              <span className="font-bold text-slate-900">AI Trading Bot Terminal</span>
            </div>
            <span className="text-[10px] bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded">LIVE</span>
          </Link>

          <Link href="/concepts" onClick={() => setIsOpen(false)} className="block hover:text-amber-600">
            Trading Concepts & Masterclasses
          </Link>
          <Link href="/blog" onClick={() => setIsOpen(false)} className="block hover:text-amber-600">
            Research Desk & Market Blog
          </Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="block hover:text-amber-600">
            About BitcoinCrypto.tech
          </Link>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <Link
              href="/tools"
              onClick={() => setIsOpen(false)}
              className="block text-center py-3 rounded-xl text-xs font-bold text-slate-950 bg-amber-400"
            >
              Launch AI Trading Bot Terminal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
