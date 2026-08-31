import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About BitcoinCrypto.tech | Institutional Security, Integrity & Research Protocol",
  description:
    "Learn about BitcoinCrypto.tech's non-custodial intelligence mission, institutional-grade security architecture, and transparent quantitative research standards.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About BitcoinCrypto.tech | Research & Security Protocol",
    description:
      "Our non-custodial analytics philosophy, institutional data feed integrity, and quantitative market research principles.",
    url: "https://www.bitcoincrypto.tech/about",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About BitcoinCrypto.tech | Research & Security Protocol",
    description:
      "Non-custodial intelligence mission, institutional security architecture, and mathematical market research.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
