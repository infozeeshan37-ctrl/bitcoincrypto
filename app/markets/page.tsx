import type { Metadata } from "next";
import CoinMarketCapDashboard from "@/components/markets/CoinMarketCapDashboard";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ToolCitationWidget from "@/components/common/ToolCitationWidget";
import AuthoritativeCitations from "@/components/common/AuthoritativeCitations";
import AdBanner from "@/components/ads/AdBanner";

export const metadata: Metadata = {
  title: "Crypto Markets & Coin Rankings | Spot Prices & Volume",
  description: "Real-time cryptocurrency market prices, market cap rankings, 24h trading volume, top gainers, and dominance indicators on BitcoinCrypto.tech.",
  alternates: {
    canonical: "https://www.bitcoincrypto.tech/markets",
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: "Spot Markets", href: "/markets" }]} />
        <CoinMarketCapDashboard />
        
        {/* Verified Primary Data Sources */}
        <AuthoritativeCitations
          title="Official Spot Market & Exchange Data Providers"
          description="Spot price aggregation, 24h liquidity depth, and token market caps are sourced directly from verified primary exchange feeds and global index providers."
          pageUrl="https://www.bitcoincrypto.tech/markets"
          pageTitle="Live Cryptocurrency Spot Markets & Volume Directory"
        />

        <ToolCitationWidget
          toolName="BitcoinCrypto Spot Market Rankings & Volume Radar"
          toolUrl="https://www.bitcoincrypto.tech/markets"
          description="Real-time cryptocurrency market cap valuations, 24h spot volume, dominance indexes, and momentum screeners."
        />

        {/* Google AdSense Compliant Banner Slot */}
        <AdBanner format="auto" />
      </div>
    </main>
  );
}
