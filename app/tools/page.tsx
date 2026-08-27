import { Cpu, Terminal, Calculator, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ToolsPage() {
  const tools = [
    {
      title: "TradingView Institutional Terminal",
      status: "Available via Desktop & Mobile",
      desc: "Full-feature candlestick chart engine with multi-timeframe analysis, drawing toolkits, and over 100 technical indicators.",
      category: "Charting & Analytics"
    },
    {
      title: "Dollar-Cost Averaging (DCA) Simulator",
      status: "Mathematical Tool",
      desc: "Backtest recurring Bitcoin accumulation strategies against previous halving cycles to measure historical drawdown and compound gain.",
      category: "Portfolio Planning"
    },
    {
      title: "Position Size & Risk / Reward Calculator",
      status: "Risk Management",
      desc: "Calculate precise trade entry sizes, stop-loss invalidation levels, and leverage parameters before executing market orders.",
      category: "Execution"
    },
    {
      title: "Multi-Currency Spot Converter",
      status: "Instant Quotes",
      desc: "Real-time spot rate conversion across Bitcoin (BTC), Ethereum (ETH), Solana (SOL), USD, EUR, and Tether (USDT).",
      category: "Utility"
    }
  ];

  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <Cpu className="w-3.5 h-3.5" /> Platform Tools Catalog
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Financial Tools & Calculators
          </h1>
          <p className="text-base text-slate-600 max-w-2xl">
            Explore our curated catalog of analytical instruments, simulators, and risk calculation engines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {tools.map((t, idx) => (
            <div key={idx} className="bg-slate-50 p-8 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-bold">
                    {t.category}
                  </span>
                  <span className="text-[10px] text-slate-500">{t.status}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{t.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mt-2">{t.desc}</p>
              </div>
              <div className="pt-4 border-t border-slate-200">
                <Link href="/concepts" className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1">
                  Read tool documentation <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
