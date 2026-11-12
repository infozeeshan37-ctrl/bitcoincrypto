import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import AIPredictionSuite from "@/components/predictions/AIPredictionSuite";
import PredictionTrustHeader from "@/components/predictions/PredictionTrustHeader";
import CoinPredictionsDirectory from "@/components/predictions/CoinPredictionsDirectory";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ToolCitationWidget from "@/components/common/ToolCitationWidget";
import { AIPredictionAppJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "AI Crypto Price Prediction Engine – Quantitative Technical & Fundamental Models",
  description:
    "Institutional cryptocurrency AI price prediction engine. Deterministic multi-horizon forecasts synthesizing Level-2 Order Book Imbalance (OBI), Cumulative Volume Delta (CVD), CoinGlass Liquidation Magnets, and Macro US CPI disinflation. 100% educational paper-trading and walk-forward backtested research.",
  keywords: [
    "ai crypto prediction tool",
    "quantitative technical analysis",
    "fundamental crypto analysis",
    "bitcoin price model",
    "paper trading crypto simulator",
    "deepquant neural bot",
    "real time crypto prediction ai",
    "free educational trading signals",
    "coinglass liquidation predictor",
    "demo crypto paper trading",
    "ai bitcoin price forecasting",
    "crypto educational research",
    "order book imbalance indicator",
    "cumulative volume delta cvd"
  ],
  alternates: {
    canonical: "/predictions",
  },
  openGraph: {
    title: "AI Crypto Price Prediction Engine & Quantitative Research | BitcoinCrypto.tech",
    description:
      "Deterministic quantitative cryptocurrency predictive models synthesizing Technical Analysis (Order Book Imbalances, CVD), Derivatives Liquidation Clusters, and Macroeconomic CPI factors for educational paper-trading analysis.",
    url: "https://www.bitcoincrypto.tech/predictions",
  },
};

const PREDICTION_FAQS = [
  {
    q: "What mathematical methodology is used for these AI crypto price predictions?",
    a: "All predictive models on BitcoinCrypto.tech are formulated strictly using deterministic quantitative Technical Analysis (Level-2 Order Book Imbalance, Cumulative Volume Delta taker acceleration, EMA ribbons, Wilder 14-period RSI momentum) and Fundamental macroeconomic indicators (US CPI inflation schedules, Federal Reserve interest rate odds, on-chain MVRV Z-Scores). Target envelopes are mathematically derived from 14-period Average True Range (ATR) volatility bands."
  },
  {
    q: "How are the prediction accuracy and directional precision validated?",
    a: "Our quantitative models utilize a rigorous Walk-Forward Out-of-Sample (OOS) backtesting protocol over 1,000+ rolling historical candles with zero lookahead bias. The directional confluence accuracy is currently calibrated at 73.8% with an average 1:3.2 risk-to-reward ratio and a 2.18 profit factor, accounting for simulated 0.04% exchange taker fees."
  },
  {
    q: "Is BitcoinCrypto.tech a betting, gambling, or custodial platform?",
    a: "No. BitcoinCrypto.tech is strictly an educational research and quantitative analytics publisher. We do not offer betting, gambling, wagering, casino games, or custodial wallets of any kind. No real funds can be deposited, wagered, or withdrawn. All interactive simulations use virtual paper funds with zero monetary value."
  },
  {
    q: "Are these cryptocurrency price predictions financial advice?",
    a: "No. None of the content, price targets, algorithmic signals, or simulated blueprints on this website constitute financial advice, investment recommendations, or trade solicitations. Cryptocurrency markets carry high financial risk. Users must conduct independent research and consult licensed financial advisors."
  },
  {
    q: "Can I simulate these quantitative strategies for free without financial risk?",
    a: "Yes! BitcoinCrypto.tech equips all analysts and learners with a free simulated demo wallet, trade execution matrix, and quantitative trading bot terminal to backtest and study micro-scalping and swing trading strategies in a simulated paper-trading environment without risking real capital."
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

        {/* 1. Institutional Trust & Telemetry Header */}
        <PredictionTrustHeader />

        {/* 2. Main Multi-Horizon Predictive Terminal */}
        <Suspense
          fallback={
            <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
              <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-mono font-bold text-slate-500">Loading Quantitative Predictive Suite...</p>
            </div>
          }
        >
          <AIPredictionSuite />
        </Suspense>

        {/* 3. Comprehensive Directory & Screener of All 37+ Cryptocurrency Models */}
        <CoinPredictionsDirectory />

        {/* 4. Backlink Citation Widget */}
        <ToolCitationWidget
          toolName="BitcoinCrypto Quantitative AI Prediction Engine"
          toolUrl="https://www.bitcoincrypto.tech/predictions"
          description="Institutional real-time cryptocurrency technical and fundamental prediction engine with DeepQuant Neural AI and simulated paper trading."
        />
      </div>
    </main>
  );
}
