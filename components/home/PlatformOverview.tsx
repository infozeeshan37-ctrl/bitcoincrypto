import Link from "next/link";
import { Terminal, Calculator, Flame, Newspaper, ArrowRight, Bot, Coins } from "lucide-react";

export default function PlatformOverview() {
  const sections = [
    {
      icon: Terminal,
      badge: "Real-Time Terminal",
      title: "TradingView Institutional Charts & TA",
      desc: "Full multi-timeframe candlestick terminal equipped with 100+ technical indicators (RSI, MACD, Bollinger Bands, 200 EMA) and complete drawing suites.",
      link: "/tools",
      ctaText: "Launch Chart Terminal"
    },
    {
      icon: Coins,
      badge: "Market Intelligence",
      title: "CoinMarketCap Spot Rankings & Stats",
      desc: "Live prices, 24h trading volume, top gainers, losers, and dominance indicators across top 50+ cryptocurrencies.",
      link: "/markets",
      ctaText: "Explore Spot Markets"
    },
    {
      icon: Flame,
      badge: "Derivatives Radar",
      title: "Coinglass Liquidation & Derivatives Hub",
      desc: "Deep visual insight into perpetual futures positioning, long/short ratio skew, and open interest divergences across major exchanges.",
      link: "/coinglass",
      ctaText: "View Coinglass Analytics"
    },
    {
      icon: Calculator,
      badge: "Financial Models",
      title: "Algorithmic DCA & Risk Sizing Calculators",
      desc: "Simulate recurring accumulation strategies across multi-year cycles and calculate exact position risk-to-reward ratios before placing orders.",
      link: "/concepts",
      ctaText: "Open Financial Calculators"
    },
    {
      icon: Newspaper,
      badge: "Macro Economics",
      title: "US CPI Tracker & Macroeconomic News",
      desc: "Instant updates on US headline/core inflation reports, FOMC rate hike probabilities, and major global economic market catalysts.",
      link: "/news",
      ctaText: "Check CPI & Macro News"
    },
    {
      icon: Bot,
      badge: "Educational Architecture",
      title: "Research Desk & Trading Concepts",
      desc: "In-depth breakdowns of Bitcoin halving supply schedules, Lightning Network velocity, institutional ETF flows, and order flow dynamics.",
      link: "/blog",
      ctaText: "Read Research Articles"
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">Ecosystem Architecture</span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">What BitcoinCrypto.tech Offers</h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            A comprehensive suite of modules designed to support your crypto research journey from fundamental to technical analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((sec, idx) => (
            <div key={idx} className="bg-slate-50/70 dark:bg-slate-900/80 rounded-3xl p-7 border border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-400/50 hover:bg-white dark:hover:bg-slate-900 transition group flex flex-col justify-between shadow-xs hover:shadow-md">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 shadow-sm border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:scale-105 group-hover:bg-amber-500 group-hover:text-slate-950 transition">
                    <sec.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold font-mono text-amber-800 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-200/60 dark:border-amber-700/60">
                    {sec.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                  {sec.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {sec.desc}
                </p>
              </div>

              <div className="pt-5 mt-5 border-t border-slate-200/80 dark:border-slate-800">
                <Link href={sec.link} className="text-xs font-bold text-slate-900 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 inline-flex items-center gap-1.5 transition">
                  <span>{sec.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
