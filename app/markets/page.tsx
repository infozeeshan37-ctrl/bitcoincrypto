import type { Metadata } from "next";
import CoinMarketCapDashboard from "@/components/markets/CoinMarketCapDashboard";

export const metadata: Metadata = {
  title: "Live Crypto Markets & Coin Rankings | BitcoinCrypto.tech",
  description: "Live cryptocurrency market prices, market cap rankings, 24h trading volume, top gainers, and dominance indicators on BitcoinCrypto.tech.",
};

export default function MarketsPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CoinMarketCapDashboard />
      </div>
    </main>
  );
}
