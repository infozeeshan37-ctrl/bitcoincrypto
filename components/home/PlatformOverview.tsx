import Link from "next/link";
import { Terminal, Calculator, Flame, Newspaper, ArrowRight } from "lucide-react";

export default function PlatformOverview() {
  const sections = [
    {
      icon: Terminal,
      badge: "Real-Time Terminal",
      title: "TradingView Institutional Charts",
      desc: "Full multi-timeframe candlestick terminal equipped with 100+ technical indicators (RSI, MACD, Bollinger Bands) and drawing suites.",
      link: "/tools"
    },
    {
      icon: Calculator,
      badge: "Financial Models",
      title: "Algorithmic DCA & Risk Calculators",
      desc: "Simulate recurring accumulation strategies across multi-year cycles and calculate exact position risk-to-reward ratios.",
      link: "/tools"
    },
    {
      icon: Flame,
      badge: "Derivatives Radar",
      title: "Liquidation & Funding Rate Heatmaps",
      desc: "Deep visual insight into perpetual futures positioning, long/short skew, and open interest divergences across exchanges.",
      link: "/concepts"
    },
    {
      icon: Newspaper,
      badge: "Market Research",
      title: "Macroeconomic & On-Chain Blog",
      desc: "In-depth breakdowns of Bitcoin halving supply schedules, Lightning Network velocity, and institutional ETF flow trends.",
      link: "/blog"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Ecosystem Architecture</span>
          <h2 className="text-3xl font-extrabold text-slate-900">What BitcoinCrypto.tech Offers</h2>
          <p className="text-sm text-slate-600">
            A comprehensive suite of modules designed to support your crypto research journey from fundamental to technical analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sections.map((sec, idx) => (
            <div key={idx} className="bg-slate-50/70 rounded-2xl p-8 border border-slate-200 hover:border-amber-300 transition group flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-white text-amber-600 shadow-sm border border-slate-200 flex items-center justify-center">
                    <sec.icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-semibold font-mono text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full">
                    {sec.badge}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-700 transition">
                  {sec.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {sec.desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/80">
                <Link href={sec.link} className="text-xs font-bold text-amber-600 hover:text-amber-700 inline-flex items-center gap-1.5 transition">
                  Learn more about this module <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
