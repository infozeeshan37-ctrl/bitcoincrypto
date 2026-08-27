import { Shield, Lock, FileCheck, CheckCircle2 } from "lucide-react";

export default function TrustSecurity() {
  return (
    <section className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <Shield className="w-3.5 h-3.5" /> Data Integrity & Standards
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                Built on Transparent Methodologies
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                In an ecosystem often plagued by opaque signals and unverified claims, BitcoinCrypto.tech is committed to providing open, verifiable, and mathematically grounded educational resources.
              </p>
              <div className="space-y-2 pt-2 text-xs text-slate-700 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Zero hidden algorithmic formulas or proprietary black boxes.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Direct public API data feeds from reputable global aggregators.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Hosted globally on high-availability serverless Edge nodes.</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center space-y-1">
                <div className="text-2xl font-extrabold text-slate-900 font-mono">100%</div>
                <div className="text-xs text-slate-600 font-semibold">Open & Accessible</div>
                <p className="text-[11px] text-slate-500">Free educational tooling</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center space-y-1">
                <div className="text-2xl font-extrabold text-amber-600 font-mono">24/7</div>
                <div className="text-xs text-slate-600 font-semibold">Global CDN Uptime</div>
                <p className="text-[11px] text-slate-500">Powered by Vercel</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center space-y-1">
                <div className="text-2xl font-extrabold text-emerald-600 font-mono">&lt;50ms</div>
                <div className="text-xs text-slate-600 font-semibold">Edge Response Time</div>
                <p className="text-[11px] text-slate-500">Next.js SSR & Static caching</p>
              </div>
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center space-y-1">
                <div className="text-2xl font-extrabold text-blue-600 font-mono">0</div>
                <div className="text-xs text-slate-600 font-semibold">Sponsored Token Bias</div>
                <p className="text-[11px] text-slate-500">Pure analytical focus</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
