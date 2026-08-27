import type { Metadata } from "next";
import CoinglassDashboard from "@/components/coinglass/CoinglassDashboard";

export const metadata: Metadata = {
  title: "Coinglass Derivatives Analytics & Liquidation Heatmaps | BitcoinCrypto.tech",
  description: "Real-time cryptocurrency futures open interest, 24h liquidations, multi-exchange funding rates, and Long/Short ratios on BitcoinCrypto.tech.",
};

export default function CoinglassPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CoinglassDashboard />
      </div>
    </main>
  );
}
