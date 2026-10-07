import type { Metadata } from "next";
import AboutView from "@/components/about/AboutView";

export const metadata: Metadata = {
  title: "About BitcoinCrypto.tech | Platform Architecture, Methodology & Research Desk",
  description:
    "Learn about BitcoinCrypto.tech - Institutional digital asset intelligence platform delivering real-time AI trading signals, Binance 5-minute price predictions, Coinglass liquidation heatmaps, and quantitative research.",
  alternates: {
    canonical: "https://www.bitcoincrypto.tech/about",
  },
  openGraph: {
    title: "About BitcoinCrypto.tech | Platform Architecture & Research Team",
    description:
      "Learn about BitcoinCrypto.tech - Institutional digital asset intelligence platform delivering real-time AI trading signals, Binance 5-minute price predictions, and liquidation heatmaps.",
    url: "https://www.bitcoincrypto.tech/about",
    siteName: "BitcoinCrypto.tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "About BitcoinCrypto.tech | Platform Architecture & Research Team",
    description: "Institutional cryptocurrency market intelligence & AI trading suite methodology.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return <AboutView />;
}
