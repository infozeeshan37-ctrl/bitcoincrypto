import type { Metadata } from "next";
import { Suspense } from "react";
import CPIMacroAIPredictor from "@/components/macro/CPIMacroAIPredictor";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "US CPI Inflation Intelligence & AI Crypto Price Predictor | BitcoinCrypto.tech",
  description:
    "Examine real-time macroeconomic indicators, historical CPI release history vs Bitcoin price impact, and AI predictive scenario modeling for upcoming US Bureau of Labor Statistics (BLS) inflation prints.",
  alternates: {
    canonical: "/cpi",
  },
  openGraph: {
    title: "US CPI Inflation Intelligence & AI Crypto Price Predictor | BitcoinCrypto.tech",
    description:
      "Predict upcoming CPI prints and examine historical crypto market reactions, Fed rate cut probabilities, and Bitcoin price scenarios.",
    url: "https://www.bitcoincrypto.tech/cpi",
  },
};

export default function CPIPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 sm:py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Macro & CPI AI Predictor", href: "/cpi" }
          ]}
        />
        <Suspense
          fallback={
            <div className="min-h-[50vh] flex flex-col items-center justify-center space-y-4">
              <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-xs font-mono font-bold text-slate-500">Loading CPI Macro AI Predictor...</p>
            </div>
          }
        >
          <CPIMacroAIPredictor />
        </Suspense>
      </div>
    </main>
  );
}
