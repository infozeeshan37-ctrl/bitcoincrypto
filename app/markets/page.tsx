import type { Metadata } from "next";
import CoinMarketCapDashboard from "@/components/markets/CoinMarketCapDashboard";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "Crypto Markets & Coin Rankings | Spot Prices & Volume",
  description: "Real-time cryptocurrency market prices, market cap rankings, 24h trading volume, top gainers, and dominance indicators on BitcoinCrypto.tech.",
  alternates: {
    canonical: "/markets",
  },
  openGraph: {
    title: "Crypto Markets & Coin Rankings | BitcoinCrypto.tech",
    description: "Real-time prices, 24h trading volume, top gainers, and dominance indexes across global crypto assets.",
    url: "https://www.bitcoincrypto.tech/markets",
  },
};

export default function MarketsPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 sm:py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "Spot Markets", href: "/markets" }]} />
        <CoinMarketCapDashboard />
      </div>
    </main>
  );
}
