import Link from "next/link";
import { ArrowRight, Compass, ShieldAlert, TrendingUp, RefreshCw } from "lucide-react";

export default function TradingConcepts() {
  const concepts = [
    {
      icon: TrendingUp,
      title: "Liquidity Pools & Stop-Loss Clustering",
      desc: "Price naturally gravity-wells toward dense clusters of resting orders. Learning to identify liquidity zones helps traders avoid entering during high-risk fakeout sweeps."
    },
    {
      icon: RefreshCw,
      title: "Funding Rate Cash & Carry Arbitrage",
      desc: "Institutional market participants lock in delta-neutral annualized yields by holding spot Bitcoin while taking an opposing position on high-funding perpetual contracts."
    },
    {
      icon: ShieldAlert,
      title: "Open Interest & Divergence Warning",
      desc: "When spot price rises while aggregate open interest rapidly contracts, the rally is fueled primarily by short-covering rather than organic spot accumulation."
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
              <Compass className="w-3.5 h-3.5" /> Educational Intelligence
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900">Modern Trading Concepts</h2>
            <p className="text-sm text-slate-600 mt-1">Core structural dynamics every digital asset analyst should master.</p>
          </div>
          <Link href="/concepts" className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 transition">
            View All Concept Guides <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {concepts.map((c, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <c.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">{c.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
