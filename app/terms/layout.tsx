import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service & Usage Agreement | BitcoinCrypto.tech",
  description:
    "Read the Terms of Service for BitcoinCrypto.tech governing access to our AI price prediction tools, market scanners, order book visualizers, and research content.",
  alternates: {
    canonical: "/terms",
  },
  openGraph: {
    title: "Terms of Service | BitcoinCrypto.tech",
    description:
      "Terms of Service governing the use of BitcoinCrypto.tech analytical software, simulation wallets, and educational cryptocurrency research.",
    url: "https://www.bitcoincrypto.tech/terms",
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
