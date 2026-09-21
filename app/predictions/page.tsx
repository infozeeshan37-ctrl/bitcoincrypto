import type { Metadata } from "next";
import { Suspense } from "react";
import AIPredictionSuite from "@/components/predictions/AIPredictionSuite";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "AI Bitcoin & Crypto Price Prediction Engine (24h, 7d, 30d) | BitcoinCrypto.tech",
  description:
    "Institutional AI crypto price prediction engine for Bitcoin (BTC), Ethereum (ETH), Solana (SOL), and top altcoins. Multi-horizon 24-hour, 7-day, and 30-day forecast targets with 98.6% quantitative confluence across technicals, on-chain valuation, derivatives liquidity, and Fed macro monetary cycle.",
  alternates: {
    canonical: "/predictions",
  },
  openGraph: {
    title: "AI Bitcoin & Crypto Price Prediction Engine | 98.6% Confluence",
    description:
      "Predict upcoming Bitcoin and Ethereum price moves using quantitative multi-pillar machine learning models, on-chain MVRV, derivatives liquidity heatmaps, and macro inflation cycle forecasting.",
    url: "https://www.bitcoincrypto.tech/predictions",
  },
};

export default function PredictionsPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 sm:py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "AI Price Prediction Engine", href: "/predictions" }
          ]}
        />
        <Suspense
          fallback={
            <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
              <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-mono font-bold text-slate-500">Loading AI Multi-Horizon Price Predictor...</p>
            </div>
          }
        >
          <AIPredictionSuite />
        </Suspense>
      </div>
    </main>
  );
}
