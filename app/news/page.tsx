import type { Metadata } from "next";
import CryptoNewsCPIDashboard from "@/components/news/CryptoNewsCPIDashboard";

export const metadata: Metadata = {
  title: "Latest Crypto News & US CPI Macroeconomic Tracker | BitcoinCrypto.tech",
  description: "Real-time cryptocurrency news wire, US Consumer Price Index (CPI) inflation reports, Federal Reserve interest rates, and macro liquidity analysis on BitcoinCrypto.tech.",
};

export default function NewsPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <CryptoNewsCPIDashboard />
      </div>
    </main>
  );
}
