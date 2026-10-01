import type { Metadata } from "next";
import { Suspense } from "react";
import OrderbookTerminal from "@/components/orderbook/OrderbookTerminal";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ToolCitationWidget from "@/components/common/ToolCitationWidget";

export const metadata: Metadata = {
  title: "Real-Time Crypto Order Book Depth & CVD Scanner | BitcoinCrypto.tech",
  description:
    "Free Level-2 cryptocurrency Order Book depth scanner, real-time Cumulative Volume Delta (CVD) taker flow, bid/ask wall imbalance detector, and whale block trade tape on BitcoinCrypto.tech.",
  keywords: [
    "crypto order book depth",
    "bitcoin orderbook live",
    "order book imbalance scanner",
    "cvd crypto live",
    "cumulative volume delta btc",
    "real time market depth visualizer",
    "whale order tape crypto",
    "level 2 crypto data free"
  ],
  alternates: {
    canonical: "/orderbook",
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

        <ToolCitationWidget
          toolName="BitcoinCrypto L2 Order Book & CVD Scanner"
          toolUrl="https://www.bitcoincrypto.tech/orderbook"
          description="Real-time Level-2 order book depth visualization, bid/ask wall imbalance detector, and CVD taker flow tracker."
        />
      </div>
    </main>
  );
}
