import type { Metadata } from "next";
import { Suspense } from "react";
import CoinglassDashboard from "@/components/coinglass/CoinglassDashboard";
import CoinGlassLiquidationTool from "@/components/tools/details/CoinGlassLiquidationTool";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ToolCitationWidget from "@/components/common/ToolCitationWidget";
import { CoinglassPageJsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "CoinGlass Liquidation Heatmap & Crypto Derivatives Tracker | Free Live Heatmap — BitcoinCrypto.tech",
  description:
    "Free real-time CoinGlass liquidation heatmap tracker: Live Bitcoin & crypto liquidation maps, perpetual futures open interest ($75B+), 24h long/short liquidation cascades, multi-exchange funding rates (Binance, Bybit, OKX), and short squeeze price levels.",
  keywords: [
    "coinglass liquidation heatmap",
    "coinglass",
    "coinglass crypto",
    "coinglass bitcoin",
    "coinglass liquidation map",
    "free coinglass alternative",
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
    title: "CoinGlass Liquidation Heatmap & Crypto Derivatives Tracker | Free Live Heatmap",
    description: "Free real-time CoinGlass liquidation heatmap tracker, live Bitcoin liquidation map, perpetual futures open interest, and multi-exchange funding rates.",
    url: "https://www.bitcoincrypto.tech/coinglass",
    siteName: "BitcoinCrypto.tech",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CoinGlass Liquidation Heatmap & Crypto Derivatives Tracker | BitcoinCrypto.tech",
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

        <ToolCitationWidget
          toolName="BitcoinCrypto CoinGlass Liquidation & Derivatives Heatmap"
          toolUrl="https://www.bitcoincrypto.tech/coinglass"
          description="Free real-time CoinGlass liquidation heatmap, multi-exchange futures open interest, and funding rate tracker."
        />
      </div>
    </main>
  );
}
