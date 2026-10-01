import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import CoinGlassSubNav from "@/components/layout/CoinGlassSubNav";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import CommandPalette from "@/components/common/CommandPalette";
import ChatWidget from "@/components/chat/ChatWidget";
import CookieConsentBanner from "@/components/common/CookieConsentBanner";
import { WebSiteJsonLd, OrganizationJsonLd, SoftwareAppJsonLd } from "@/components/seo/JsonLd";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0B0F19" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "BitcoinCrypto.tech | AI Crypto Prediction Tools & Derivatives Market Intelligence",
    template: "%s | BitcoinCrypto.tech",
  },
  description: "Top-ranked cryptocurrency market intelligence platform & AI trading suite. Features Binance-synchronized 5-minute binary price predictions, DeepQuant neural AI signals, real-time Coinglass liquidation heatmaps, L2 order book depth, and DCA simulators.",
  keywords: [
    "ai crypto tools",
    "best ai crypto prediction tool",
    "binance 5 minute price prediction",
    "ai crypto trading bot",
    "coinglass liquidation heatmap",
    "crypto order book depth",
    "cvd crypto scanner",
    "deepquant neural bot",
    "bitcoin dca simulator ai",
    "crypto binary prediction demo wallet",
    "real time crypto market intelligence",
    "free crypto trading signals btc eth sol",
    "crypto market scanner live",
    "us cpi bitcoin correlation tracker",
    "bitcoin halving liquidity cycle",
  ],
  authors: [{ name: "BitcoinCrypto Quantitative Research Desk" }],
  creator: "BitcoinCrypto.tech",
  publisher: "BitcoinCrypto.tech",
  metadataBase: new URL("https://www.bitcoincrypto.tech"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "BitcoinCrypto.tech | Best AI Crypto Prediction & Market Intelligence Suite",
    description: "Institutional-grade digital asset terminal with Binance 5-minute price predictions, DeepQuant AI signals, Coinglass liquidation heatmaps, and order book depth.",
    url: "https://www.bitcoincrypto.tech",
    siteName: "BitcoinCrypto.tech",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BitcoinCrypto.tech | AI Crypto Market Intelligence & Prediction Tools",
    description: "Binance 5-minute binary price predictions, DeepQuant neural AI, Coinglass liquidation heatmaps, and L2 order book depth.",
    creator: "@bitcoincrypto",
  },
  verification: {
    google: "udO3ekn-GvP9ijsju7oeWcay_BGJN-TzI9V7Gt3IvtE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={plusJakarta.variable}>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>₿</text></svg>"
        />
        <link
          rel="alternate"
          type="application/rss+xml"
          title="BitcoinCrypto.tech RSS Feed"
          href="/feed.xml"
        />
        {/* Zero-Flash Theme Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=localStorage.getItem("btc_theme_mode")||"dark";var a=localStorage.getItem("btc_theme_accent")||"amber";var d=m==="dark"||(m==="system"&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(d){document.documentElement.classList.add("dark")}else{document.documentElement.classList.remove("dark")}document.documentElement.setAttribute("data-theme",d?"dark":"light");document.documentElement.setAttribute("data-accent",a)}catch(e){}})();`,
          }}
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 antialiased transition-colors duration-150 selection:bg-amber-500/30 selection:text-amber-300">
        <WebSiteJsonLd />
        <OrganizationJsonLd />
        <SoftwareAppJsonLd />
        <ThemeProvider>
          <Navbar />
          <CoinGlassSubNav />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <ChatWidget />
          <CookieConsentBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
