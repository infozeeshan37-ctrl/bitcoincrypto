import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Institutional Research Desk, Macroeconomic Papers & Crypto Analysis | BitcoinCrypto.tech",
  description:
    "Comprehensive research papers on Yield Curve Control, monetary debasement, Bitcoin cycle trajectories, Ethereum Layer-1 economics, Ethena basis dynamics, and decentralized AI compute.",
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
