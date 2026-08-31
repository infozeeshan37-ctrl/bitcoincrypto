import type { Metadata } from "next";
import { Suspense } from "react";
import WhaleOrdersTerminal from "@/components/whales/WhaleOrdersTerminal";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "Whale Orders & Institutional Liquidity Heatmap Radar | BitcoinCrypto.tech",
  description:
    "Real-time cryptocurrency whale order tracking, multi-million dollar institutional block trades, resting limit buy/sell walls, and CoinGlass-style liquidity heatmaps on BitcoinCrypto.tech.",
  alternates: {
    canonical: "/whale-orders",
  },
  openGraph: {
    title: "Whale Orders & Institutional Liquidity Radar | BitcoinCrypto.tech",
    description:
      "Track where crypto whales order: live large block trades, iceberg executions, and resting limit walls across Binance, Coinbase Prime, and CME.",
    url: "https://www.bitcoincrypto.tech/whale-orders",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Whale Orders & Liquidity Heatmap Radar | BitcoinCrypto.tech",
    description:
      "Real-time institutional whale block executions, resting liquidity walls, and plain-English trading masterclasses.",
  },
};

export default function WhaleOrdersPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 sm:py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Whale Orders & Liquidity Radar", href: "/whale-orders" }
          ]}
        />
        <Suspense
          fallback={
            <div className="min-h-[60vh] bg-white dark:bg-slate-900 rounded-3xl p-12 flex flex-col items-center justify-center space-y-4 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-mono font-bold text-slate-600 dark:text-slate-400">
                Loading Whale Orders &amp; Institutional Liquidity Radar...
              </p>
            </div>
          }
        >
          <WhaleOrdersTerminal />
        </Suspense>
      </div>
    </main>
  );
}
