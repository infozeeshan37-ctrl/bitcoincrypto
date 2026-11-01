import type { Metadata } from "next";
import { Suspense } from "react";
import CoinglassDashboard from "@/components/coinglass/CoinglassDashboard";
import CoinGlassLiquidationTool from "@/components/tools/details/CoinGlassLiquidationTool";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ToolCitationWidget from "@/components/common/ToolCitationWidget";
import AuthoritativeCitations from "@/components/common/AuthoritativeCitations";
import { CoinglassPageJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "CoinGlass Liquidation Heatmap Live [Free] | BitcoinCrypto.tech",
  description:
    "Free live CoinGlass crypto liquidation heatmap. Track real-time Bitcoin & SOL liquidation levels, Binance & Bybit open interest, funding rates & short squeezes.",
  keywords: [
    "coinglass liquidation heatmap",
    "coinglass",
    "coinglass crypto",
    "coinglass liquidation",
    "coinglass liquidations",
    "liquidation levels coinglass",
    "sol liquidation heatmap coinglass",
    "coinglass whale orders today live",
    "bitcoin mvrv z-score coinglass",
    "coinglass btc heatmap",
    "crypto liquidation heatmap",
    "binance open interest coinglass",
    "crypto funding rates coinglass",
    "coinglass long short ratio",
    "bitcoin liquidation levels",
    "perpetual futures liquidations",
    "coinglass live tracker",
    "short squeeze heatmap",
    "bybit liquidation heatmap",
    "okx open interest coinglass"
  ],
  alternates: {
    canonical: "https://www.bitcoincrypto.tech/coinglass",
  },
  openGraph: {
    title: "CoinGlass Liquidation Heatmap Live [Free] | BitcoinCrypto.tech",
    description: "Free real-time CoinGlass crypto liquidation heatmap, live Bitcoin liquidation levels, futures open interest, and funding rates.",
    url: "https://www.bitcoincrypto.tech/coinglass",
    siteName: "BitcoinCrypto.tech",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CoinGlass Liquidation Heatmap Live [Free] | BitcoinCrypto.tech",
    description: "Free real-time CoinGlass liquidation heatmap, futures open interest, and short squeeze price levels.",
  },
};

export default function CoinglassPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 sm:py-12 transition-colors">
      <CoinglassPageJsonLd />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "CoinGlass Liquidation Heatmap", href: "/coinglass" }]} />
        
        <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center font-bold text-slate-400">Loading CoinGlass Derivatives Radar...</div>}>
          <CoinglassDashboard />
        </Suspense>

        {/* COMPREHENSIVE COINGLASS LIQUIDATION INTELLIGENCE SUITE (SPECTROGRAM, CASCADE SIMULATOR, CALCULATOR, STRATEGIES, FAQ) */}
        <section className="pt-6 border-t border-slate-200 dark:border-slate-800">
          <CoinGlassLiquidationTool />
        </section>

        {/* Verified Primary Sources & Authority Citation Grid */}
        <AuthoritativeCitations
          title="Official Derivatives & Liquidation Primary Data Sources"
          description="Aggregated multi-exchange liquidation pools, 8-hour funding rates, and resting open interest contracts are synchronized via official WebSocket endpoints."
          pageUrl="https://www.bitcoincrypto.tech/coinglass"
          pageTitle="CoinGlass Liquidation Heatmap & Multi-Exchange Derivatives Radar"
        />

        <ToolCitationWidget
          toolName="BitcoinCrypto CoinGlass Liquidation & Derivatives Heatmap"
          toolUrl="https://www.bitcoincrypto.tech/coinglass"
          description="Free real-time CoinGlass liquidation heatmap, multi-exchange futures open interest, and funding rate tracker."
        />
      </div>
    </main>
  );
}
