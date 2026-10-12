import type { Metadata } from "next";
import { Suspense } from "react";
import OrderbookTerminal from "@/components/orderbook/OrderbookTerminal";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ToolCitationWidget from "@/components/common/ToolCitationWidget";
import AuthoritativeCitations from "@/components/common/AuthoritativeCitations";
import AdBanner from "@/components/ads/AdBanner";

export const metadata: Metadata = {
  title: "Crypto Order Book Depth Live & L2 CVD Imbalance Scanner | BitcoinCrypto.tech",
  description:
    "Free Level-2 cryptocurrency order book depth scanner with dynamic stepped curves: real-time Cumulative Volume Delta (CVD) taker flow, bid/ask wall imbalance detector, whale tape, and slippage simulator across Binance, Coinbase, and OKX.",
  keywords: [
    "crypto order book depth",
    "bitcoin orderbook live",
    "level 2 market data crypto",
    "order book imbalance scanner",
    "cvd crypto live",
    "cumulative volume delta btc",
    "real time market depth visualizer",
    "stepped depth chart crypto",
    "whale order tape crypto",
    "crypto slippage simulator",
    "binance order book depth",
    "level 2 crypto data free"
  ],
  alternates: {
    canonical: "https://www.bitcoincrypto.tech/orderbook",
  },
  openGraph: {
    title: "Real-Time Crypto Order Book Depth & CVD Scanner | BitcoinCrypto.tech",
    description:
      "Analyze institutional liquidity walls, bid/ask depth imbalance ratios, and block taker sweeps in real time.",
    url: "https://www.bitcoincrypto.tech/orderbook",
  },
};

export default function OrderbookPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 sm:py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Order Book Depth Terminal", href: "/orderbook" }
          ]}
        />
        <Suspense
          fallback={
            <div className="min-h-[60vh] bg-white dark:bg-slate-900 rounded-3xl p-12 flex flex-col items-center justify-center space-y-4 border border-slate-200 dark:border-slate-800">
              <div className="w-10 h-10 border-4 border-amber-400 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm font-mono font-bold text-slate-600 dark:text-slate-400">
                Loading L2 Order Book &amp; Real-Time Depth...
              </p>
            </div>
          }
        >
          <OrderbookTerminal />
        </Suspense>

        {/* Primary Data Verification & Outbound Links */}
        <AuthoritativeCitations
          title="Official Level-2 Market Depth & Order Flow Standards"
          description="High-frequency order book snapshots and sub-second taker executions are benchmarked against official direct exchange WebSocket feeds and market microstructure standards."
          pageUrl="https://www.bitcoincrypto.tech/orderbook"
          pageTitle="Real-Time Level-2 Order Book Depth & CVD Terminal"
        />

        <ToolCitationWidget
          toolName="BitcoinCrypto L2 Order Book & CVD Scanner"
          toolUrl="https://www.bitcoincrypto.tech/orderbook"
          description="Real-time Level-2 order book depth visualization, bid/ask wall imbalance detector, and CVD taker flow tracker."
        />

        {/* Google AdSense Compliant Banner Slot */}
        <AdBanner format="auto" />
      </div>
    </main>
  );
}
