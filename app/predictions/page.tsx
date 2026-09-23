import type { Metadata } from "next";
import { Suspense } from "react";
import AIPredictionSuite from "@/components/predictions/AIPredictionSuite";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "5-Minute Bitcoin & Crypto Price Prediction (UP or DOWN) | BitcoinCrypto.tech",
  description:
    "Real-time 5-minute Binance-style crypto price prediction arena. Predict whether Bitcoin (BTC), Ethereum (ETH), and Solana (SOL) will close UP or DOWN against the previous round lock price. Featuring live 24/7 countdowns, AI micro-momentum signals, payout multipliers, and multi-horizon price forecasting.",
  keywords: [
    "5 minute bitcoin prediction",
    "binance prediction btc",
    "crypto price prediction up or down",
    "pancakeswap crypto prediction",
    "5 min btc price forecast",
    "binary crypto prediction game",
    "real time bitcoin prediction",
    "ai crypto price predictor",
    "bitcoin up down next 5 minutes"
  ],
  alternates: {
    canonical: "/predictions",
  },
  openGraph: {
    title: "5-Minute Bitcoin & Crypto Price Prediction (UP or DOWN) | Real-Time Rounds",
    description:
      "Predict whether Bitcoin will close UP or DOWN in the next 5 minutes against the lock price. Live rounds, real-time Binance feeds, AI momentum indicators, and demo wallet.",
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
