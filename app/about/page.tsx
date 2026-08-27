import { Shield, Sparkles, BookOpen, Cpu } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="py-16 sm:py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Platform Mission</span>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
            About BitcoinCrypto.tech
          </h1>
          <p className="text-base text-slate-600 leading-relaxed">
            BitcoinCrypto.tech was founded with a singular objective: to bring institutional-grade analytical clarity and unbiased educational research to the global cryptocurrency community.
          </p>
        </div>

        <div className="prose prose-slate max-w-none space-y-6 text-sm text-slate-600 leading-relaxed">
          <p>
            The digital asset market operates 24 hours a day, 365 days a year across hundreds of decentralized protocols and centralized exchanges. For both emerging and experienced analysts, extracting true market signal from emotional noise can be challenging.
          </p>
          <p>
            We focus on structural fundamentals—such as perpetual funding rate yields, order flow liquidity clustering, long-term coin dormancy, and on-chain supply distribution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="font-bold text-slate-900 text-base mb-2">Our Vision</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Empowering digital asset participants with transparent mathematical models, zero-lag Edge architecture, and accessible educational material.
            </p>
          </div>
          <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
            <h3 className="font-bold text-slate-900 text-base mb-2">Our Commitment</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Strict neutrality. No token shilling, no predatory subscription traps, and complete transparency in our research outputs.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
