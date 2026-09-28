import type { Metadata } from "next";
import { Suspense } from "react";
import AIPredictionSuite from "@/components/predictions/AIPredictionSuite";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "AI Crypto Trading Bot & Institutional Price Prediction Engine | BitcoinCrypto.tech",
  description:
    "100% authentic, high-conviction AI crypto trading signals and multi-horizon price prediction engine. Powered by real-time Order Book Depth & CVD analysis, technical momentum (EMA, RSI, MACD), Coinglass liquidation clusters, and macroeconomic Fed & CPI intelligence. Simplified trade blueprints with exact entry zones, take-profits, and strict capital-preservation stop losses.",
  keywords: [
    "ai crypto trading bot",
    "bitcoin price prediction",
    "crypto trading signals",
    "orderbook depth analysis",
    "btc liquidation heatmap",
    "crypto technical analysis",
    "ai trading signals btc eth sol",
    "coinglass liquidation bot",
    "crypto stop loss calculator",
    "authentic bitcoin price prediction"
  ],
  alternates: {
    canonical: "/predictions",
  },
  openGraph: {
    title: "AI Crypto Trading Bot & Institutional Price Prediction Engine | Real-Time Confluence",
    description:
      "Authentic, high-probability AI crypto trading blueprints backed by Level-2 Order Book Depth, Technicals, Coinglass Liquidations, and Macro Analysis. Precise entry zones, targets, and risk calculators.",
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
