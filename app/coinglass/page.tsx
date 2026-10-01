import type { Metadata } from "next";
import { Suspense } from "react";
import CoinglassDashboard from "@/components/coinglass/CoinglassDashboard";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ToolCitationWidget from "@/components/common/ToolCitationWidget";

export const metadata: Metadata = {
  title: "Coinglass Liquidation Heatmap & Crypto Derivatives Tracker | BitcoinCrypto.tech",
  description:
    "Free real-time Coinglass liquidation heatmap tracker, perpetual futures open interest, 24-hour long/short liquidations, multi-exchange funding rates (Binance, OKX, Bybit), and market maker squeeze levels on BitcoinCrypto.tech.",
  keywords: [
    "coinglass liquidation heatmap",
    "coinglass crypto",
    "crypto liquidation tracker",
    "bitcoin liquidation levels",
    "binance open interest coinglass",
    "crypto funding rates live",
    "long short ratio coinglass",
    "perpetual futures liquidations",
    "derivatives heatmap tool"
  ],
  alternates: {
    canonical: "/coinglass",
  },
  openGraph: {
    title: "Coinglass Liquidation Heatmap & Crypto Derivatives Tracker | BitcoinCrypto.tech",
    description: "Track $75B+ in crypto derivatives open interest, real-time liquidation clusters, and multi-exchange funding rates.",
    url: "https://www.bitcoincrypto.tech/coinglass",
  },
};

export default function CoinglassPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 sm:py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Coinglass Derivatives Radar", href: "/coinglass" }]} />
        <Suspense fallback={<div className="min-h-[50vh] flex items-center justify-center font-bold text-slate-400">Loading Coinglass Derivatives Radar...</div>}>
          <CoinglassDashboard />
        </Suspense>

        <ToolCitationWidget
          toolName="BitcoinCrypto Coinglass Liquidation & Derivatives Heatmap"
          toolUrl="https://www.bitcoincrypto.tech/coinglass"
          description="Real-time multi-exchange crypto liquidation heatmap, futures open interest, and funding rate tracker."
        />
      </div>
    </main>
  );
}
