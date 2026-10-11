import type { Metadata } from "next";
import { Suspense } from "react";
import AIPredictionSuite from "@/components/predictions/AIPredictionSuite";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ToolCitationWidget from "@/components/common/ToolCitationWidget";
import { AIPredictionAppJsonLd, FAQJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "AI Crypto Price Prediction Engine | Quantitative Technical & Fundamental Models | BitcoinCrypto.tech",
  description:
    "Educational AI cryptocurrency price prediction models and real-time paper-trading analytics. Formulated using quantitative Technical Analysis (Order Book Imbalance, CVD Taker Flow) and Fundamental macroeconomic data (US CPI). Educational research tool only.",
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
    "crypto educational research"
  ],
  alternates: {
    canonical: "/predictions",
  },
  openGraph: {
    title: "AI Crypto Price Prediction Engine & Quantitative Research | BitcoinCrypto.tech",
    description:
      "Quantitative cryptocurrency predictive models synthesizing Technical Analysis (Order Book Imbalances, CVD) and Fundamental macroeconomic factors for educational paper-trading analysis.",
    url: "https://www.bitcoincrypto.tech/predictions",
  },
};

const PREDICTION_FAQS = [
  {
    q: "What methodology is used for these AI crypto price predictions?",
    a: "All predictive models on BitcoinCrypto.tech are formulated strictly using quantitative Technical Analysis (Level-2 Order Book Imbalance, Cumulative Volume Delta, EMA ribbons, RSI momentum) and Fundamental macroeconomic indicators (US CPI inflation, Fed interest rate probabilities, on-chain transaction volumes). They are mathematical hypotheses for educational study."
  },
  {
    q: "Is BitcoinCrypto.tech a betting or gambling platform?",
    a: "No. BitcoinCrypto.tech is strictly an educational research and quantitative analytics platform. We do not offer betting, gambling, wagering, or real-money gaming of any kind. No real funds can be deposited or won. All interactive simulations use virtual paper funds with zero monetary value."
  },
  {
    q: "Are these predictions financial or investment advice?",
    a: "No. None of the content, price targets, or algorithmic signals on this website constitute financial advice, investment recommendations, or trade solicitations. Cryptocurrency markets carry high financial risk. Users must conduct independent research and consult licensed financial advisors."
  },
  {
    q: "Can I use the AI prediction model for free with paper demo funds?",
    a: "Yes! BitcoinCrypto.tech equips all analysts and learners with a free simulated demo wallet and an 'Auto-Follow AI Bot' toggle to backtest and study quantitative scalping and swing trading strategies completely risk-free."
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

        {/* Prominent Educational & Non-Investment Header Notice */}
        <div className="p-4 sm:p-5 rounded-3xl bg-amber-500/10 border border-amber-500/25 text-slate-800 dark:text-slate-200 text-xs sm:text-sm flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
          <div className="space-y-1">
            <div className="flex items-center gap-2 font-black text-slate-900 dark:text-white text-sm">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
              <span>Educational &amp; Quantitative Research Notice</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
              All price models, algorithmic signals, and forecast channels on this platform are formulated strictly using <strong>quantitative Technical Analysis</strong> (Order Book depth, CVD, momentum) and <strong>Fundamental macroeconomic metrics</strong> (US CPI). <strong>This is NOT a betting or gambling site.</strong> Zero real-money deposits, wagers, or payouts exist. Not financial advice.
            </p>
          </div>
          <Link
            href="/disclaimer"
            className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition self-start md:self-center shrink-0 shadow-sm"
          >
            Review Full Disclaimer &rarr;
          </Link>
        </div>

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
          toolName="BitcoinCrypto Quantitative AI Prediction Engine"
          toolUrl="https://www.bitcoincrypto.tech/predictions"
          description="Institutional real-time cryptocurrency technical and fundamental prediction engine with DeepQuant Neural AI and simulated paper trading."
        />
      </div>
    </main>
  );
}
