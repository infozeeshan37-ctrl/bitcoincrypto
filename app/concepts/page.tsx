import { Compass, BookOpen, Layers, BarChart2, CheckCircle2 } from "lucide-react";

export default function ConceptsPage() {
  const topics = [
    {
      title: "Order Flow & Market Depth",
      description: "How limit orders create support/resistance clusters and why market makers target liquidity pools during high-volatility sessions.",
      points: ["Bid-Ask imbalance analysis", "Aggressive taker vs passive maker volume", "Absorption dynamics at major levels"]
    },
    {
      title: "Perpetual Futures & Funding Rates",
      description: "The economic mechanism that tethers perpetual derivatives to spot index prices and what extreme rates signal about market bias.",
      points: ["8-hour settlement calculations", "Cash & carry arbitrage opportunities", "Long/Short positioning skew interpretation"]
    },
    {
      title: "Dollar-Cost Averaging (DCA) Math",
      description: "The mathematical advantage of disciplined programmatic accumulation over emotional lump-sum market timing.",
      points: ["Volatility dampening effects", "Lower average unit acquisition cost", "Stress-free multi-year horizon planning"]
    },
    {
      title: "Bitcoin Halving & Supply Elasticity",
      description: "How the fixed 21-million supply cap and periodic issuance cuts create structural macroeconomic supply shocks.",
      points: ["Stock-to-Flow dynamics", "Miner revenue breakeven economics", "Exchange liquid reserve drain rates"]
    }
  ];

  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <Compass className="w-3.5 h-3.5" /> Comprehensive Framework
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            Trading Concepts & Market Mechanics
          </h1>
          <p className="text-base text-slate-600 max-w-2xl">
            A structured breakdown of core quantitative and macroeconomic concepts used to analyze digital asset market behavior.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {topics.map((t, idx) => (
            <div key={idx} className="bg-slate-50 p-8 rounded-2xl border border-slate-200 space-y-4">
              <h3 className="text-lg font-bold text-slate-900">{t.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{t.description}</p>
              <div className="space-y-2 pt-2 border-t border-slate-200 text-xs text-slate-700">
                {t.points.map((p, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
