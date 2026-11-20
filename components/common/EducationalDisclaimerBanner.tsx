import React from "react";
import Link from "next/link";
import { AlertTriangle, ShieldCheck, ArrowRight, BookOpen } from "lucide-react";

interface EducationalDisclaimerBannerProps {
  toolName?: string;
  className?: string;
}

export default function EducationalDisclaimerBanner({
  toolName = "quantitative research tools and predictive models",
  className = ""
}: EducationalDisclaimerBannerProps) {
  return (
    <div
      className={`rounded-2xl p-5 bg-amber-500/10 dark:bg-amber-950/20 border border-amber-500/30 text-slate-800 dark:text-slate-200 space-y-2 text-xs transition-colors ${className}`}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-300">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
          <span>Strictly Educational &amp; Research Simulation — Not Financial Advice</span>
        </div>
        <Link
          href="/disclaimer"
          className="text-[11px] font-mono font-bold text-amber-700 dark:text-amber-400 hover:underline shrink-0 hidden sm:inline-flex items-center gap-0.5"
        >
          <span>Full Disclaimer</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      <p className="text-[11.5px] leading-relaxed text-slate-600 dark:text-slate-300">
        All market telemetry, Level-2 order book depth, CoinGlass liquidation heatmaps, algorithmic momentum indicators, and {toolName} displayed on BitcoinCrypto.tech are provided solely for <strong>educational instruction, statistical study, and simulated paper-trading demonstrations</strong>. BitcoinCrypto.tech is not a registered investment advisor, broker, or commodity trading advisor. Cryptocurrency markets involve substantial risk of capital loss. Past backtested performance does not guarantee future results.
      </p>

      <div className="pt-1 flex flex-wrap items-center gap-3 text-[10.5px] font-mono text-slate-500 dark:text-slate-400">
        <span>✓ 100% Free Open Access</span>
        <span>•</span>
        <span>✓ Zero Real-Money Custody or Wagering</span>
        <span>•</span>
        <Link href="/editorial-policy" className="hover:text-amber-500 underline">
          Peer-Reviewed Editorial Policy
        </Link>
      </div>
    </div>
  );
}
