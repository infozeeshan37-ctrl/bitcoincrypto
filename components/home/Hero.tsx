import Link from "next/link";
import { ArrowRight, Sparkles, Shield, Cpu, BookOpen, Layers } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden bg-gradient-to-b from-amber-50/40 via-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-100 border border-amber-200/80 text-amber-900 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Modern Cryptocurrency Intelligence & Tech Architecture</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Clear Insights for the <br />
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
              Modern Crypto Economy
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Discover transparent macroeconomic research, order flow mechanics, and algorithmic fundamentals designed to simplify cryptocurrency technology and market structure.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Link
              href="/concepts"
              className="px-6 py-3.5 rounded-xl text-sm font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 shadow-sm hover:shadow transition flex items-center gap-2"
            >
              Explore Trading Concepts <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/blog"
              className="px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition"
            >
              Read Research Desk
            </Link>
          </div>

        </div>

        {/* 3 Core Highlights (Informational Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 max-w-5xl mx-auto">
          
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">Algorithmic Precision</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Transparent mathematical formulas for Dollar Cost Averaging, position risk sizing, and market cycle simulations.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">Order Flow Mechanics</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Understand liquidity clusters, funding rate arbitrage, and perpetual open interest dynamics without confusion.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 mb-1.5">Unbiased Research</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              In-depth commentary on Bitcoin halving supply dynamics, Layer-2 rollups, and global institutional ETF inflows.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
