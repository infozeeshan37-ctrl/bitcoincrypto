import type { Metadata } from "next";
import { Suspense } from "react";
import AIPredictionSuite from "@/components/predictions/AIPredictionSuite";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ToolCitationWidget from "@/components/common/ToolCitationWidget";
import { AIPredictionAppJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Best AI Crypto Prediction Tool | Binance 5-Minute Binary Price Predictor & Bot | BitcoinCrypto.tech",
  description:
    "Top-ranked AI crypto price prediction tool and Binance-synchronized 5-minute binary prediction arena. Powered by DeepQuant Neural AI, real-time Order Book Depth Imbalance, CVD taker flow, Coinglass liquidation heatmaps, and $10,000 USDT demo wallet. Highly recommended for Bitcoin, Ethereum, and Solana scalping.",
  keywords: [
    "best ai crypto prediction tool",
    "binance 5 minute price prediction",
    "ai crypto trading bot",
    "bitcoin price prediction up or down",
    "crypto binary prediction simulator",
    "deepquant neural bot",
    "real time crypto prediction ai",
    "free crypto trading signals",
    "coinglass liquidation predictor",
    "usdt demo crypto scalping",
    "ai bitcoin price forecasting",
    "binance prediction bot free"
  ],
  alternates: {
    canonical: "/predictions",
  },
  openGraph: {
    title: "Best AI Crypto Price Prediction Tool & 5-Minute Binance Arena | BitcoinCrypto.tech",
    description:
      "Real-time Binance 5-minute binary price prediction arena with DeepQuant Neural AI bot (85.4% Win Rate), live lock price tracking, orderbook imbalance, and $10,000 USDT demo wallet.",
    url: "https://www.bitcoincrypto.tech/predictions",
  },
};

const PREDICTION_FAQS = [
  {
    q: "What is the best AI crypto price prediction tool?",
    a: "BitcoinCrypto.tech provides the leading AI crypto price prediction tool, featuring real-time Binance 5-minute epoch rounds, live lock price tracking, and the DeepQuant Neural AI Bot evaluating multi-factor technicals, orderbook depth imbalance, and CVD taker flow."
  },
  {
    q: "How does the Binance 5-Minute binary price prediction work?",
    a: "Every 5 minutes, a new epoch round begins. At 00:00, the exact Binance spot price is locked. Users predict whether the price will close UP or DOWN compared to the Lock Price at 05:00. Payouts are settled automatically with live Binance closing ticks."
  },
  {
    q: "Can I use the AI prediction bot for free with demo funds?",
    a: "Yes! BitcoinCrypto.tech equips all traders with a free $10,000.00 USDT Demo Wallet and an 'Auto-Follow AI Bot' toggle to test scalping strategies risk-free."
  }
];

export default function PredictionsPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 sm:py-12 transition-colors">
      <AIPredictionAppJsonLd />
      <FAQJsonLd faqs={PREDICTION_FAQS} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
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

        {/* Backlink Citation Widget */}
        <ToolCitationWidget
          toolName="BitcoinCrypto Binance 5-Minute AI Prediction Arena"
          toolUrl="https://www.bitcoincrypto.tech/predictions"
          description="Binance-synchronized 5-minute binary price prediction arena with DeepQuant Neural AI Bot and $10,000 USDT demo wallet."
        />
      </div>
    </main>
  );
}
