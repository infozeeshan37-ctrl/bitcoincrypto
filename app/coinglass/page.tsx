import type { Metadata } from "next";
import CoinglassDashboard from "@/components/coinglass/CoinglassDashboard";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "Coinglass Derivatives Analytics & Liquidation Heatmaps",
  description: "Real-time cryptocurrency futures open interest, 24h liquidations, multi-exchange funding rates, and Long/Short ratios on BitcoinCrypto.tech.",
  alternates: {
    canonical: "/coinglass",
  },
  openGraph: {
    title: "Coinglass Derivatives Analytics & Liquidation Heatmaps | BitcoinCrypto.tech",
    description: "Track $68B+ perpetual open interest, liquidation cascades, and institutional positioning.",
    url: "https://www.bitcoincrypto.tech/coinglass",
  },
};

export default function CoinglassPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 sm:py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Coinglass Derivatives Radar", href: "/coinglass" }]} />
        <CoinglassDashboard />
      </div>
    </main>
  );
}
