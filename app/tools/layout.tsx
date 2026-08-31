import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Crypto Trading Bot, Live Chart Terminal & DCA Simulator | BitcoinCrypto.tech",
  description:
    "Institutional algorithmic trading suite: real-time AI signal scanner, TradingView advanced chart terminal, DCA compound return simulator, and exact position size risk calculator.",
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: "AI Crypto Trading Bot & Terminal Suite | BitcoinCrypto.tech",
    description:
      "Algorithmic crypto trading signals, live TradingView charts, DCA simulators, and exact position sizing calculators.",
    url: "https://www.bitcoincrypto.tech/tools",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cryptocurrency AI Signals & Trading Suite | BitcoinCrypto.tech",
    description:
      "Real-time algorithmic trading bot, live TradingView charting, DCA simulators, and risk execution tools.",
  },
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
