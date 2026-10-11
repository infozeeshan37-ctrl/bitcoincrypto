import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Educational Purpose, Risk & Non-Betting Disclaimer | BitcoinCrypto.tech",
  description:
    "Official Educational & Risk Disclaimer for BitcoinCrypto.tech. Strictly educational quantitative research platform. Zero betting or gambling. All predictions based on Technical and Fundamental Analysis. No investment advice.",
  alternates: {
    canonical: "/disclaimer",
  },
  openGraph: {
    title: "Educational Purpose & Non-Betting Disclaimer | BitcoinCrypto.tech",
    description:
      "Full disclosure regarding strictly educational research purpose, zero betting/gambling policy, technical and fundamental methodology, and non-financial advice terms.",
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
