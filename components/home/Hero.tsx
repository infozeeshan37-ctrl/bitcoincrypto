import Link from "next/link";
import { ArrowRight, Sparkles, Bot, LineChart, Coins, Flame, Newspaper } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-16 pb-12 lg:pt-20 lg:pb-14 overflow-hidden bg-gradient-to-b from-amber-50/40 via-white to-white dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/80 border border-amber-200/80 dark:border-amber-700/80 text-amber-900 dark:text-amber-300 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Modern Cryptocurrency Intelligence & Tech Architecture</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            Clear Insights for the <br />
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Modern Crypto Economy
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Discover transparent macroeconomic research, order flow mechanics, and algorithmic fundamentals designed to simplify cryptocurrency technology and market structure.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Link
              href="#ai-signals-hub"
              className="px-6 py-3.5 rounded-xl text-sm font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow-sm hover:shadow transition flex items-center gap-2"
            >
              <span>Explore AI Trading Bots</span> <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/tools"
              className="px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm transition flex items-center gap-2"
            >
              <LineChart className="w-4 h-4 text-amber-500" />
              <span>Chart Studio</span>
            </Link>
          </div>

          {/* Quick Ecosystem Hub Links */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
            <span className="text-slate-400 dark:text-slate-500 font-semibold">Quick Jump:</span>
            <Link href="/markets" className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-amber-100 dark:hover:bg-amber-950/60 text-slate-700 dark:text-slate-300 hover:text-amber-900 dark:hover:text-amber-300 font-medium transition">
              Spot Rankings
            </Link>
            <Link href="/coinglass" className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-rose-100 dark:hover:bg-rose-950/60 text-slate-700 dark:text-slate-300 hover:text-rose-900 dark:hover:text-rose-300 font-medium transition">
              Coinglass Derivatives
            </Link>
            <Link href="/news" className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-blue-100 dark:hover:bg-blue-950/60 text-slate-700 dark:text-slate-300 hover:text-blue-900 dark:hover:text-blue-300 font-medium transition">
              CPI Inflation Tracker
            </Link>
            <Link href="/concepts" className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition">
              Trading Concepts & DCA
            </Link>
            <Link href="/blog" className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium transition">
              Research Desk
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
