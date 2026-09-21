import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Coinglass Liquidation Heatmap, AI Trading Signals & DCA Simulator | BitcoinCrypto.tech",
  description:
    "Real-time Coinglass liquidation heatmaps, multi-exchange crypto liquidation tracker, AI algorithmic trading signals, TradingView charts, and DCA compound profit simulators on BitcoinCrypto.tech.",
  keywords: [
    "coinglass",
    "coinglass liquidation",
    "coinglass liquidation heatmap",
    "coinglass crypto liquidation tracker",
    "coinglass bitcoin liquidation map",
    "coinglass open interest",
    "coinglass long short ratio",
    "coinglass funding rates",
    "crypto liquidation calculator",
    "binance liquidation heatmap",
    "bybit liquidation map",
    "short squeeze tracker",
    "ai crypto trading bot",
    "dca simulator"
  ],
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: "Coinglass Liquidation Heatmap & AI Trading Suite | BitcoinCrypto.tech",
    description:
      "Track real-time Coinglass liquidation heatmaps, $68B+ derivatives open interest, algorithmic AI signals, and exact bankruptcy price calculations.",
    url: "https://www.bitcoincrypto.tech/tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coinglass Liquidation Heatmap & Crypto Trading Suite | BitcoinCrypto.tech",
    description:
      "Live Coinglass crypto liquidation tracker, 2D heatmaps, algorithmic trading signals, and position sizing tools.",
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
