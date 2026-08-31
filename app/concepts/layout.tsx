import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cryptocurrency Financial Concepts, Market Microstructure & Masterclasses | BitcoinCrypto.tech",
  description:
    "Institutional education masterclasses on Bitcoin market structure, order flow mechanics, derivatives funding rates, volatility regimes, and on-chain valuation models.",
  alternates: {
    canonical: "/concepts",
  },
  openGraph: {
    title: "Crypto Financial Concepts & Market Masterclasses | BitcoinCrypto.tech",
    description:
      "Master institutional crypto trading: order flow mechanics, derivatives funding rates, on-chain valuation models, and risk architecture.",
    url: "https://www.bitcoincrypto.tech/concepts",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crypto Financial Concepts & Masterclasses | BitcoinCrypto.tech",
    description:
      "In-depth institutional education on market microstructure, derivatives funding rates, and on-chain analytics.",
  },
};

export default function ConceptsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
