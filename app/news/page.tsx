import type { Metadata } from "next";
import CryptoNewsCPIDashboard from "@/components/news/CryptoNewsCPIDashboard";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "Latest Crypto News & US CPI Macroeconomic Tracker",
  description: "Real-time cryptocurrency news wire, US Consumer Price Index (CPI) inflation reports, Federal Reserve interest rates, and macro liquidity analysis on BitcoinCrypto.tech.",
  alternates: {
    canonical: "/news",
  },
  openGraph: {
    title: "Latest Crypto News & US CPI Macroeconomic Tracker | BitcoinCrypto.tech",
    description: "Track inflation releases, Fed rate cut odds, and breaking crypto headlines in real-time.",
    url: "https://www.bitcoincrypto.tech/news",
  },
};

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 sm:py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={[{ label: "News & US CPI Tracker", href: "/news" }]} />
        <CryptoNewsCPIDashboard />
      </div>
    </main>
  );
}
