import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BitcoinCrypto.tech | Cryptocurrency Market Intelligence & Trading Tech",
  description: "Modern, transparent cryptocurrency market intelligence, order flow mechanics, DCA models, and macroeconomic analysis on bitcoincrypto.tech.",
  keywords: ["bitcoin", "crypto trading concepts", "market structure", "dca calculator", "bitcoin halving", "order flow"],
  authors: [{ name: "BitcoinCrypto Tech" }],
  metadataBase: new URL("https://www.bitcoincrypto.tech"),
  openGraph: {
    title: "BitcoinCrypto.tech | Cryptocurrency Intelligence Platform",
    description: "Data-driven research, order flow mechanics, and financial models for modern digital asset traders.",
    url: "https://www.bitcoincrypto.tech",
    siteName: "BitcoinCrypto.tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BitcoinCrypto.tech | Crypto Market Intelligence",
    description: "Transparent market structure and digital asset research.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>₿</text></svg>"
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col bg-white text-slate-900">
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
