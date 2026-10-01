import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial & Investment Risk Disclaimer | BitcoinCrypto.tech",
  description:
    "Official Financial & Cryptocurrency Risk Disclaimer for BitcoinCrypto.tech. Understand market risks, algorithmic AI modeling limitations, and educational purpose disclaimers.",
  alternates: {
    canonical: "/disclaimer",
  },
  openGraph: {
    title: "Financial & Risk Disclaimer | BitcoinCrypto.tech",
    description:
      "Full disclosure regarding high-risk digital asset volatility, AI predictive modeling, and educational non-financial advice terms.",
    url: "https://www.bitcoincrypto.tech/disclaimer",
  },
};

export default function DisclaimerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
