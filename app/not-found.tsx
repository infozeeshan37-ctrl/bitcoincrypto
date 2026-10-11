import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Compass,
  ArrowRight,
  TrendingUp,
  BarChart2,
  Flame,
  Layers,
  BookOpen,
  Home,
  Mail,
  Search
} from "lucide-react";

export const metadata: Metadata = {
  title: "404 - Page Not Found | BitcoinCrypto.tech",
  description: "The requested cryptocurrency intelligence page, tool, or research paper could not be found. Explore our trading tools, liquidation heatmaps, and market data.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  const quickLinks = [
    {
      title: "CoinGlass Liquidation Heatmap",
      desc: "Live Bitcoin & crypto liquidation maps and open interest.",
      href: "/coinglass",
      icon: Flame,
      color: "text-rose-500 bg-rose-50 dark:bg-rose-950/80 border-rose-200 dark:border-rose-900/60",
    },
    {
      title: "TradingView Chart Terminal",
      desc: "Sub-second technical analysis candlestick charts and oscillators.",
      href: "/tools/chart-terminal",
      icon: BarChart2,
      color: "text-amber-500 bg-amber-50 dark:bg-amber-950/80 border-amber-200 dark:border-amber-900/60",
    },
    {
      title: "AI Price Predictions",
      desc: "Binance 5-minute epochs and quantitative multi-factor forecasting.",
      href: "/predictions",
      icon: TrendingUp,
      color: "text-purple-500 bg-purple-50 dark:bg-purple-950/80 border-purple-200 dark:border-purple-900/60",
    },
    {
      title: "Trading Tools Hub",
      desc: "DCA simulators, position sizers, and funding rate screeners.",
      href: "/tools",
      icon: Layers,
      color: "text-blue-500 bg-blue-50 dark:bg-blue-950/80 border-blue-200 dark:border-blue-900/60",
    },
    {
      title: "Quantitative Research Papers",
      desc: "Institutional macro cycles, liquidity mechanics, and whitepapers.",
      href: "/blog",
      icon: BookOpen,
      color: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/80 border-emerald-200 dark:border-emerald-900/60",
    },
    {
      title: "Editorial Support & Contact",
      desc: "Get in touch with our quantitative research desk.",
      href: "/contact",
      icon: Mail,
      color: "text-cyan-500 bg-cyan-50 dark:bg-cyan-950/80 border-cyan-200 dark:border-cyan-900/60",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 flex flex-col justify-center transition-colors">
      <div className="max-w-4xl mx-auto w-full space-y-12 text-center">
        
        {/* Error Badge & Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-amber-100 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-700/80 text-amber-900 dark:text-amber-300 shadow-sm">
            <Compass className="w-4 h-4 text-amber-500" />
            <span>HTTP Status 404 • Resource Not Found</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-slate-900 dark:text-white tracking-tight">
            Page Not Found
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            The page you are looking for may have been moved, renamed, or is temporarily unavailable. Use the directory below or the quick command palette (<kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-xs">Ctrl+K</kbd>) to find what you need.
          </p>

          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-sm transition shadow-lg shadow-amber-400/20"
            >
              <Home className="w-4 h-4" />
              <span>Return to Homepage</span>
            </Link>
          </div>
        </div>

        {/* Directory of Active Tools & Sections */}
        <div className="space-y-4 text-left">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-amber-500" />
              <span>Explore Core Trading Suite Modules:</span>
            </h2>
            <span className="text-[11px] text-slate-400 font-mono">6 Recommended Destinations</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {quickLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-400/80 transition shadow-sm hover:shadow-md group flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center border ${item.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                  <div className="flex items-center text-xs font-bold text-amber-600 dark:text-amber-400 gap-1 pt-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Explore</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Legal & Regulatory Disclaimer (Zero Ads Policy on Error Pages) */}
        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-mono max-w-xl mx-auto pt-6 border-t border-slate-200 dark:border-slate-800">
          BitcoinCrypto.tech is an informational digital asset data software platform. Strictly for educational and analytical purposes.
        </p>

      </div>
    </main>
  );
}
