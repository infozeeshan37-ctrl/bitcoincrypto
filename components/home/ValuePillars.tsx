import { Zap, ShieldCheck, BarChart3, Database } from "lucide-react";

export default function ValuePillars() {
  const pillars = [
    {
      icon: Zap,
      title: "Zero-Latency Architecture",
      desc: "Built with Next.js and deployed on Vercel's global Edge network to provide instantaneous page loads and optimal SEO performance."
    },
    {
      icon: Database,
      title: "Data-Driven Transparency",
      desc: "Every concept, formula, and market indicator is fully documented with clear mathematical logic rather than black-box hype."
    },
    {
      icon: BarChart3,
      title: "Institutional Standards",
      desc: "We bring Wall Street and quantitative fund methodologies into an intuitive, accessible layout for individual analysts."
    },
    {
      icon: ShieldCheck,
      title: "Educational Integrity",
      desc: "Zero paid token promotions or hidden sponsorships. Pure data, on-chain evidence, and structural market analysis."
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Platform Philosophy</span>
          <h2 className="text-3xl font-extrabold text-slate-900">Why BitcoinCrypto.tech?</h2>
          <p className="text-sm text-slate-600">
            Engineered for clarity, speed, and analytical depth in an otherwise crowded and noisy crypto space.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((p, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
                <p.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{p.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
