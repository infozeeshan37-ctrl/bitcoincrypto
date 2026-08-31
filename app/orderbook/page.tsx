import type { Metadata } from "next";
import { Suspense } from "react";
import OrderbookTerminal from "@/components/orderbook/OrderbookTerminal";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "Live Cryptocurrency L2 Order Book & Market Depth Terminal | BitcoinCrypto.tech",
  description:
    "Real-time cryptocurrency Central Limit Order Book (CLOB) depth with tick aggregation (0.01 to 100), cumulative bid/ask visualizers, whale block trade tape, and execution slippage simulation on BitcoinCrypto.tech.",
  alternates: {
    canonical: "/orderbook",
  },
  openGraph: {
    title: "Live L2 Order Book & Market Depth Terminal | BitcoinCrypto.tech",
    description:
      "Analyze institutional liquidity walls, bid/ask depth imbalance ratios, and block taker sweeps in real time.",
    url: "https://www.bitcoincrypto.tech/orderbook",
  },
};

export default function OrderbookPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 sm:py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
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
      </div>
    </main>
  );
}
