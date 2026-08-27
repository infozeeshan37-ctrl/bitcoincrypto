"use client";

import Link from "next/link";
import { useState } from "react";
import { Coins, BookOpen, Compass, Info, Menu, X, ArrowUpRight, Cpu } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 text-white flex items-center justify-center shadow-md shadow-amber-500/20 font-bold text-xl group-hover:scale-105 transition">
            ₿
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-extrabold text-slate-900 tracking-tight">BitcoinCrypto</span>
              <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                .TECH
              </span>
            </div>
            <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-wider">Market Intelligence Hub</p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <Link href="/concepts" className="hover:text-amber-600 transition flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-amber-500" /> Concepts & Tech
          </Link>
          <Link href="/tools" className="hover:text-amber-600 transition flex items-center gap-1.5">
            <Cpu className="w-4 h-4 text-slate-500" /> Platform Tools
          </Link>
          <Link href="/blog" className="hover:text-amber-600 transition flex items-center gap-1.5">
            <BookOpen className="w-4 h-4 text-slate-500" /> Research & Blog
          </Link>
          <Link href="/about" className="hover:text-amber-600 transition flex items-center gap-1.5">
            <Info className="w-4 h-4 text-slate-500" /> About Platform
          </Link>
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3">
          <Link
            href="/concepts"
            className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 shadow-sm hover:shadow transition flex items-center gap-1.5"
          >
            Explore Intelligence <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 bg-slate-100 border border-slate-200"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-6 py-6 space-y-4 text-sm font-medium text-slate-700 animate-in fade-in slide-in-from-top duration-200">
          <Link href="/" onClick={() => setIsOpen(false)} className="block hover:text-amber-600">Home</Link>
          <Link href="/concepts" onClick={() => setIsOpen(false)} className="block hover:text-amber-600">Trading Concepts & Tech</Link>
          <Link href="/tools" onClick={() => setIsOpen(false)} className="block hover:text-amber-600">Platform Tools Directory</Link>
          <Link href="/blog" onClick={() => setIsOpen(false)} className="block hover:text-amber-600">Research & Market Blog</Link>
          <Link href="/about" onClick={() => setIsOpen(false)} className="block hover:text-amber-600">About BitcoinCrypto.tech</Link>
          <div className="pt-4 border-t border-slate-100">
            <Link
              href="/concepts"
              onClick={() => setIsOpen(false)}
              className="block text-center py-2.5 rounded-xl text-xs font-bold text-slate-900 bg-amber-400"
            >
              Explore Intelligence
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
