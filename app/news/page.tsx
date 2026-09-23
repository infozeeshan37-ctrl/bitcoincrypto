import type { Metadata } from "next";
import CryptoNewsCPIDashboard from "@/components/news/CryptoNewsCPIDashboard";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "Latest Crypto News Live: Bitcoin $100K Breakout, ETF Inflows, Fed Rate Cuts & Whale Alerts",
  description:
    "Real-time cryptocurrency news wire. Breaking Bitcoin ETF net inflows, Federal Reserve FOMC interest rate cuts, US CPI inflation prints, Ethereum Pectra upgrade, Solana DEX volumes, Ripple XRP SEC settlement, and whale wallet movements.",
  keywords: [
    "crypto news live",
    "bitcoin news today",
    "bitcoin etf inflows",
    "fed rate cuts crypto",
    "us cpi inflation crypto",
    "crypto whale alert",
    "ethereum pectra upgrade",
    "solana firedancer news",
    "xrp sec settlement update",
    "altcoin season index",
    "strategic bitcoin reserve bill",
    "tether usdt minting",
    "defi tvl news",
    "cryptocurrency market analysis"
  ],
  alternates: {
    canonical: "https://www.bitcoincrypto.tech/news",
  },
  openGraph: {
    title: "Latest Crypto News Live: Bitcoin ETF Inflows, Fed Rate Cuts & Whale Alerts",
    description:
      "Real-time cryptocurrency news wire and macroeconomic tracker. Breaking headlines on Bitcoin, Ethereum, Solana, Fed FOMC interest rates, and US CPI inflation releases.",
    url: "https://www.bitcoincrypto.tech/news",
    type: "website",
    siteName: "BitcoinCrypto.tech",
    images: [
      {
        url: "https://www.bitcoincrypto.tech/images/social-preview.png",
        width: 1200,
        height: 630,
        alt: "BitcoinCrypto.tech Real-Time Crypto News Wire",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Latest Crypto News Live: Bitcoin ETF Inflows, Fed Rate Cuts & Whale Alerts",
    description:
      "Real-time cryptocurrency news wire. Breaking Bitcoin, Ethereum, Solana, Fed rate cuts, and US CPI inflation releases.",
    creator: "@bitcoincrypto",
  },
};

export default function NewsPage() {
  const jsonLdSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "NewsMediaOrganization",
        "name": "BitcoinCrypto.tech News Wire",
        "url": "https://www.bitcoincrypto.tech/news",
        "logo": "https://www.bitcoincrypto.tech/images/social-preview.png",
        "sameAs": [
          "https://twitter.com/bitcoincrypto",
          "https://github.com/infozeeshan37-ctrl/bitcoincrypto"
        ],
        "description": "Real-time cryptocurrency news wire, macroeconomic inflation tracker, and institutional derivatives market intelligence."
      },
      {
        "@type": "ItemList",
        "name": "Breaking Cryptocurrency News Headlines",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Bitcoin $100K Breakout: Spot ETF Daily Inflows Top $850M as Supply Squeeze Escalates",
            "url": "https://www.bitcoincrypto.tech/news"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Federal Reserve Confirms Rate Cut Cycle: Why Crypto Historically Surges After FOMC Easing",
            "url": "https://www.bitcoincrypto.tech/news"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "US CPI Inflation Drops to Multi-Year Low: How Macro Liquidity Drives Bitcoin Bull Markets",
            "url": "https://www.bitcoincrypto.tech/news"
          },
          {
            "@type": "ListItem",
            "position": 4,
            "name": "Ethereum Pectra Upgrade Countdown: Vitalik Reveals Major Gas Fee Cuts and Staking Enhancements",
            "url": "https://www.bitcoincrypto.tech/news"
          },
          {
            "@type": "ListItem",
            "position": 5,
            "name": "Solana Flips Ethereum in 24h DEX Volume as Firedancer Validator Testnet Surpasses 1M TPS",
            "url": "https://www.bitcoincrypto.tech/news"
          }
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do Federal Reserve interest rate cuts affect Bitcoin and cryptocurrency prices?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "When the Federal Reserve cuts interest rates, the yield on risk-free cash equivalents declines, incentivizing investors to allocate capital into scarce digital assets like Bitcoin and Ethereum. Lower interest rates also expand global M2 money supply, which historically exhibits an 85%+ positive correlation with crypto bull markets."
            }
          },
          {
            "@type": "Question",
            "name": "Why does US CPI inflation data cause instant volatility in crypto markets?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "US CPI inflation data directly shapes Federal Reserve monetary policy. A cooling CPI print signals disinflation, paving the way for lower interest rates and higher crypto liquidity, while hotter inflation raises fears of restrictive policy, creating temporary volatility."
            }
          },
          {
            "@type": "Question",
            "name": "What are Bitcoin Spot ETF inflows and why do they cause supply squeezes?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Spot Bitcoin ETFs require authorized participants to purchase physical Bitcoin on spot markets. Following the halving, daily miner production is just 450 BTC; when institutional ETF inflows demand thousands of BTC daily, structural supply deficits push spot orderbooks into rapid price discovery."
            }
          }
        ]
      }
    ]
  };

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 sm:py-12 transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Crypto News & Macroeconomic Wire", href: "/news" }]} />
        <CryptoNewsCPIDashboard />
      </div>
    </main>
  );
}
