import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crypto Research Desk: Liquidation Heatmaps, Funding Rates & Macro Analysis | BitcoinCrypto.tech",
  description:
    "Institutional cryptocurrency research papers: CoinGlass liquidation heatmap guides, perpetual funding rate basis arbitrage, Level-2 order book depth, Bitcoin DCA cycle math, and AI quantitative models.",
  keywords: [
    "crypto research desk",
    "coinglass liquidation heatmap guide",
    "crypto funding rates analysis",
    "order book depth microstructure",
    "bitcoin dca math halving cycles",
    "ai crypto prediction models",
    "macro liquidity crypto",
    "yield curve control bitcoin",
    "crypto derivatives research"
  ],
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Institutional Research Desk & Macro Analysis | BitcoinCrypto.tech",
    description:
      "In-depth research papers on macro liquidity, Bitcoin targets, Ethereum coiled spring dynamics, and decentralized AI agent economics.",
    url: "https://www.bitcoincrypto.tech/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Institutional Research Desk | BitcoinCrypto.tech",
    description:
      "Comprehensive research papers on macro liquidity, Bitcoin cycle models, and crypto market microstructure.",
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
