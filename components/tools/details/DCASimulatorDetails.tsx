"use client";

import React from "react";
import {
  Calculator,
  TrendingUp,
  Sparkles,
  DollarSign,
  Calendar,
  Layers,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Zap,
  HelpCircle,
  Clock,
  PieChart,
  Scale,
  Lock
} from "lucide-react";
import Link from "next/link";

export default function DCASimulatorDetails() {
  const comparisonRows = [
    {
      factor: "Market Timing Stress",
      dca: "Zero timing anxiety; orders execute mechanically regardless of price swings.",
      lumpSum: "Extremely high stress; catastrophic risk if buying at cycle top."
    },
    {
      factor: "Average Cost Basis",
      dca: "Harmonic mean pricing guarantees more units purchased at market bottoms.",
      lumpSum: "Locked at a single discrete entry price point for the entire position."
    },
    {
      factor: "Bear Market Resilience",
      dca: "Deep drawdowns (e.g. -70%) accelerate accumulation speed and lower cost basis.",
      lumpSum: "Suffers full capital drawdown with zero dry powder to accumulate dips."
    },
    {
      factor: "Capital Flexibility",
      dca: "Accumulates progressively from active monthly income / cash flow.",
      lumpSum: "Requires full upfront capital deployment immediately."
    },
    {
      factor: "Psychological Discipline",
      dca: "Completely eliminates FOMO (Fear of Missing Out) and panic selling.",
      lumpSum: "High risk of panic-selling at local bottoms during 30%+ corrections."
    }
  ];

  const strategies = [
    {
      name: "Fixed-Interval Calendar DCA",
      badge: "Baseline Accumulator",
      desc: "Allocating a set dollar amount (e.g., $250 every Monday or 1st of the month) regardless of market volatility. Completely automated and emotionless.",
      benefit: "Maximizes compound consistency over 3 to 5-year multi-halving cycles."
    },
    {
      name: "Dynamic Value-Averaged DCA",
      badge: "Quant Optimized",
      desc: "Adjusting periodic allocations based on the Fear & Greed Index or distance below the 200-week SMA. E.g., allocate 1.5x during Extreme Fear (< 20) and 0.5x during Extreme Greed (> 80).",
      benefit: "Enhances long-term net IRR by an estimated 18% - 32% compared to static DCA."
    },
    {
      name: "Reverse DCA (Exit Laddering)",
      badge: "Profit Realization",
      desc: "Systematically selling fixed percentages of your accumulated holdings into stablecoins or USD as Bitcoin reaches historical cycle extension milestones (e.g., MVRV Z-Score > 5).",
      benefit: "Locks in generational gains without trying to guess the exact cycle blow-off top."
    }
  ];

  const faqs = [
    {
      q: "Why is the Harmonic Mean average lower than the Arithmetic Mean?",
      a: "Because you invest a fixed dollar amount each period, you mathematically purchase significantly more units when price is low, and fewer units when price is high. This weights your volume towards market lows, pulling your effective cost basis below the simple average of historical prices."
    },
    {
      q: "How does Bitcoin's 4-year halving cycle affect DCA returns?",
      a: "Historically, Bitcoin experiences a 4-year rhythm: halving supply cut, parabolic bull run, 70-80% bear market correction, and multi-year recovery. Running a 3-to-4 year DCA strategy guarantees that your accumulation phase spans the deep discount bear market, resulting in massive asymmetric compounding during the subsequent bull expansion."
    },
    {
      q: "How should I manage exchange transaction fees while DCAing?",
      a: "Use limit orders or recurring investment features on low-fee liquid exchanges (e.g. Binance, Kraken Pro). Accumulate in your exchange wallet until you reach a threshold (e.g. $1,000 or 0.01 BTC), then execute a batch UTXO sweep to your cold storage hardware wallet to minimize on-chain transaction fees."
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-10 transition-colors">
      
      {/* 1. Header & Overview */}
      <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-700/80">
          <Calculator className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>Dollar-Cost Averaging Masterclass</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          The Mathematics &amp; Strategy of Dollar-Cost Averaging (DCA)
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
          Dollar-Cost Averaging (DCA) is an institutional capital accumulation strategy where an investor divides total capital across periodic purchases of a target asset to reduce the impact of volatility. Discover the mathematical formulas, harmonic mean cost reductions, and multi-year compounding models powering long-term wealth creation.
        </p>
      </div>

      {/* 2. The Harmonic Mean Advantage: Mathematical Proof */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-700 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                The Harmonic Mean Advantage: Mathematical Proof
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Why periodic fixed-dollar investing beats simple arithmetic average pricing
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto">
            P_avg = n / Σ(1 / P_i)
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              When an investor buys a fixed dollar amount (e.g. <strong>$1,000</strong>) at three different price levels: <strong>$80,000</strong>, <strong>$50,000</strong>, and <strong>$30,000</strong>:
            </p>
            <ul className="space-y-1.5 pl-4 list-disc text-slate-600 dark:text-slate-300">
              <li><strong>Buy 1 ($80k):</strong> $1,000 buys <strong>0.0125 BTC</strong></li>
              <li><strong>Buy 2 ($50k):</strong> $1,000 buys <strong>0.0200 BTC</strong></li>
              <li><strong>Buy 3 ($30k):</strong> $1,000 buys <strong>0.0333 BTC</strong></li>
            </ul>
            <p>
              <strong>Total Invested:</strong> $3,000 | <strong>Total Coins Acquired:</strong> 0.0658 BTC.
            </p>
            <p className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 font-bold">
              Your Effective DCA Cost Basis: $3,000 / 0.0658 = <span className="text-emerald-700 dark:text-emerald-400 font-black text-sm">$45,592</span>.
              <br />
              Simple Arithmetic Average: ($80k + $50k + $30k) / 3 = <span className="text-rose-600 dark:text-rose-400 font-black text-sm">$53,333</span>.
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              <strong>Quant Conclusion:</strong> DCA reduced the investor's average acquisition cost by <strong>$7,741 per coin (14.5% cheaper)</strong> compared to the average price of the asset over the period.
            </p>
          </div>

          <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 font-mono text-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Formula Breakdown</span>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-center text-sm font-black">
              P_dca = Total Dollars / Total Units
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-center text-sm font-black">
              FV = PMT × [((1 + r)^n - 1) / r]
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-normal space-y-1">
              <div>• <strong>FV:</strong> Future Value of Accumulated Portfolio</div>
              <div>• <strong>PMT:</strong> Periodic Contribution Amount</div>
              <div>• <strong>r:</strong> Periodic Rate of Compounding Return</div>
              <div>• <strong>n:</strong> Total Number of Periodic Compounding Cycles</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. DCA vs. Lump-Sum Strategic Comparison Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <PieChart className="w-4 h-4 text-amber-500" />
            <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              DCA vs. Lump-Sum Investing: Strategic Comparison
            </h4>
          </div>
          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">Risk vs Reward Profile</span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-200 uppercase font-mono text-[10px] font-bold">
              <tr>
                <th className="p-3.5">Evaluation Parameter</th>
                <th className="p-3.5 text-amber-700 dark:text-amber-300">Dollar-Cost Averaging (DCA)</th>
                <th className="p-3.5 text-slate-500 dark:text-slate-400">Lump-Sum Single Entry</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/80 dark:divide-slate-800 bg-white dark:bg-slate-900">
              {comparisonRows.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition">
                  <td className="p-3.5 font-bold text-slate-900 dark:text-white font-mono">{row.factor}</td>
                  <td className="p-3.5 text-slate-700 dark:text-slate-300 font-medium">{row.dca}</td>
                  <td className="p-3.5 text-slate-500 dark:text-slate-400">{row.lumpSum}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Strategic Accumulation Frameworks */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-500" />
            <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              Institutional DCA Execution Frameworks
            </h4>
          </div>
          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">Cycle Playbooks</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {strategies.map((st, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300">
                    {st.badge}
                  </span>
                </div>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white">{st.name}</h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{st.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{st.benefit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. DCA FAQs & Self-Custody Protocols */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-500" />
            <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              Frequently Asked Questions &amp; Security Protocols
            </h4>
          </div>
          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">DCA Best Practices</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {faqs.map((f, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-2"
            >
              <h5 className="text-xs font-bold text-slate-900 dark:text-white flex items-start gap-1.5">
                <span className="text-amber-500 font-black">Q:</span>
                <span>{f.q}</span>
              </h5>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-4">
                {f.a}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Cold Storage Sweep Callout */}
      <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-3 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0">
            <Lock className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <h5 className="text-sm font-bold text-white">The Golden Rule of DCA: Batch Self-Custody Sweeps</h5>
            <p className="text-xs text-slate-300 max-w-2xl">
              Never leave accumulated multi-year DCA funds on centralized exchanges. Schedule periodic batch transfers to a hardware cold storage wallet to secure sovereign ownership.
            </p>
          </div>
        </div>
        <Link
          href="/blog"
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 border border-slate-700"
        >
          <span>Read Custody Guide</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
}
