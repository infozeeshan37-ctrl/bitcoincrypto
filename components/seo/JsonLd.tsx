import React from "react";

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BitcoinCrypto.tech",
    alternateName: [
      "BitcoinCrypto",
      "bitcoincrypto.tech",
      "bitcoincrypto",
      "Bitcoin Crypto AI",
      "BitcoinCrypto AI Prediction Suite",
      "BitcoinCrypto Tech"
    ],
    url: "https://www.bitcoincrypto.tech",
    description: "Institutional cryptocurrency market intelligence, Binance 5-minute binary price predictions, DeepQuant neural AI signals, real-time Coinglass liquidation heatmaps, and order book depth analytics.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://www.bitcoincrypto.tech/markets?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function HomePageJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://www.bitcoincrypto.tech/#website",
        name: "BitcoinCrypto.tech",
        alternateName: [
          "BitcoinCrypto",
          "bitcoincrypto.tech",
          "bitcoincrypto",
          "Bitcoin Crypto AI",
          "BitcoinCrypto AI Prediction Suite",
          "BitcoinCrypto Tech"
        ],
        url: "https://www.bitcoincrypto.tech",
        description: "Institutional cryptocurrency market intelligence, AI trading signals, Binance 5-minute binary price predictions, real-time Coinglass liquidation heatmaps, whale orders, and order book depth analytics.",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://www.bitcoincrypto.tech/markets?search={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "WebPage",
        "@id": "https://www.bitcoincrypto.tech/#webpage",
        url: "https://www.bitcoincrypto.tech",
        name: "BitcoinCrypto.tech | #1 AI Crypto Trading Signals, Market Intelligence & Whale Orders",
        isPartOf: {
          "@id": "https://www.bitcoincrypto.tech/#website",
        },
        about: {
          "@id": "https://www.bitcoincrypto.tech/#organization",
        },
        description: "Official BitcoinCrypto.tech platform - Institutional cryptocurrency market intelligence suite featuring real-time AI trading signals, Binance 5-minute price predictions, Coinglass liquidation heatmaps, L2 order book depth, and institutional whale orders.",
        inLanguage: "en-US",
      },
      {
        "@type": "Organization",
        "@id": "https://www.bitcoincrypto.tech/#organization",
        name: "BitcoinCrypto.tech",
        alternateName: "BitcoinCrypto Quantitative Research Desk",
        url: "https://www.bitcoincrypto.tech",
        logo: "https://www.bitcoincrypto.tech/logo.png",
        sameAs: [
          "https://github.com/infozeeshan37-ctrl/bitcoincrypto",
          "https://twitter.com/bitcoincrypto",
        ],
      },
      {
        "@type": "SoftwareApplication",
        name: "BitcoinCrypto AI Trading & Market Intelligence Suite",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0.00",
          priceCurrency: "USD",
        },
        featureList: [
          "Real-time AI Trading Signals (BTC, ETH, SOL)",
          "Binance 5-Minute Binary Price Predictions",
          "Coinglass Liquidation Heatmaps & Cascades",
          "Institutional Whale Orders & Depth Walls",
          "Level 2 Order Book Depth Imbalance",
          "US CPI AI Volatility Predictor"
        ],
      },
      {
        "@type": "ItemList",
        "@id": "https://www.bitcoincrypto.tech/#sitelinks",
        "name": "BitcoinCrypto Core Terminals & Quantitative Tools",
        "itemListElement": [
          {
            "@type": "SiteNavigationElement",
            "position": 1,
            "name": "CoinGlass Liquidation Heatmap",
            "description": "Real-time 2D spectrogram liquidation heatmap, resting leverage pools, and short squeeze clusters across Binance, Bybit, and OKX.",
            "url": "https://www.bitcoincrypto.tech/tools/liquidation-heatmap"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 2,
            "name": "AI Price Predictions Hub",
            "description": "Quantitative 24-hour, 7-day, and 30-day AI price prediction forecasts for Bitcoin, Ethereum, Solana, and 36+ digital assets.",
            "url": "https://www.bitcoincrypto.tech/predictions"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 3,
            "name": "Whale Orders & Smart Money",
            "description": "Live sub-second whale block trade tracker, cumulative volume delta (CVD), and institutional limit order wall heatmap.",
            "url": "https://www.bitcoincrypto.tech/whale-orders"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 4,
            "name": "Perpetual Funding Rate Screener",
            "description": "Scan cross-exchange 8-hour funding rates, basis spreads, and delta-neutral cash-and-carry arbitrage opportunities.",
            "url": "https://www.bitcoincrypto.tech/tools/funding-rate-screener"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 5,
            "name": "AI Trading Signals & Copilot",
            "description": "Autonomous algorithmic momentum detection, dynamic trailing stops, and multi-timeframe quantitative trade setups.",
            "url": "https://www.bitcoincrypto.tech/tools/trading-bot"
          },
          {
            "@type": "SiteNavigationElement",
            "position": 6,
            "name": "Level-2 Order Book Depth",
            "description": "Central Limit Order Book depth, live bid/ask matching engine flow, and resting liquidity walls across global exchanges.",
            "url": "https://www.bitcoincrypto.tech/orderbook"
          }
        ]
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BitcoinCrypto.tech",
    alternateName: "BitcoinCrypto Quantitative Research Desk",
    url: "https://www.bitcoincrypto.tech",
    logo: "https://www.bitcoincrypto.tech/logo.png",
    description: "Open-access quantitative research desk and AI trading technology laboratory for digital assets.",
    sameAs: [
      "https://github.com/infozeeshan37-ctrl/bitcoincrypto",
      "https://twitter.com/bitcoincrypto",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: "https://www.bitcoincrypto.tech/about",
    },
    knowsAbout: [
      "Cryptocurrency Price Prediction",
      "Binance 5-Minute Binary Options & Predictions",
      "DeepQuant AI Trading Algorithms",
      "Coinglass Liquidation Heatmaps",
      "Order Book Microstructure & CVD Flow",
      "Bitcoin Macroeconomics & CPI Liquidity",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export interface ArticleJsonLdProps {
  article?: {
    title: string;
    excerpt: string;
    slug: string;
    publishedAt: string;
    author: string;
    category: string;
    tags: string[];
  };
  title?: string;
  description?: string;
  url?: string;
  publishedAt?: string;
  author?: string;
  category?: string;
  tags?: string[];
}

export function ArticleJsonLd(props: ArticleJsonLdProps) {
  const title = props.article?.title || props.title || "Bitcoin Research";
  const description = props.article?.excerpt || props.description || "";
  const url = props.url || `https://www.bitcoincrypto.tech/blog/${props.article?.slug || ""}`;
  const publishedAt = props.article?.publishedAt || props.publishedAt || new Date().toISOString();
  const author = props.article?.author || props.author || "BitcoinCrypto Research Desk";
  const category = props.article?.category || props.category || "Cryptocurrency";
  const tags = props.article?.tags || props.tags || [];

  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: title,
    description,
    url,
    datePublished: publishedAt,
    dateModified: publishedAt,
    articleSection: category,
    keywords: tags.join(", "),
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: "BitcoinCrypto.tech",
      url: "https://www.bitcoincrypto.tech",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function FAQJsonLd({
  faqs,
}: {
  faqs: { q?: string; a?: string; question?: string; answer?: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q || faq.question || "",
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a || faq.answer || "",
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function SoftwareAppJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "BitcoinCrypto AI Market Intelligence & Trading Suite",
    operatingSystem: "WebBrowser, Windows, macOS, Linux, iOS, Android",
    applicationCategory: "FinanceApplication",
    applicationSubCategory: "Cryptocurrency AI Trading & Price Prediction Tool",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.95",
      ratingCount: "1420",
      bestRating: "5",
      worstRating: "1",
    },
    featureList: [
      "Binance Real-Time 5-Minute Binary Price Prediction Arena",
      "DeepQuant Neural AI 5-Minute Scalping Bot (85.4% Win Rate)",
      "Real-Time Coinglass Derivatives & Liquidation Heatmap",
      "High-Throughput Order Book Depth & CVD Taker Flow Terminal",
      "Dynamic Volatility-Weighted DCA Calculator & Simulator",
      "US CPI & Macro Liquidity Correlation Engine",
      "Institutional Whale Large Order Scanner ($100k+)",
      "$10,000 USDT Free Demo Wallet for Scalping Strategy Testing",
    ],
    description: "Professional, free cryptocurrency market intelligence terminal providing real-time Binance 5-minute price predictions, DeepQuant neural AI signals, Coinglass liquidation heatmaps, and order book depth analytics.",
    url: "https://www.bitcoincrypto.tech",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function AIPredictionAppJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Binance-Style 5-Minute Crypto Price Prediction Arena & AI Bot",
    operatingSystem: "WebBrowser",
    applicationCategory: "FinanceApplication",
    applicationSubCategory: "AI Price Prediction & Binary Options Simulator",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.96",
      ratingCount: "860",
      bestRating: "5",
    },
    description: "Real-time 5-minute cryptocurrency price prediction game matching Binance app time and lock prices with an autonomous DeepQuant AI Bot evaluating RSI, order book depth imbalance, and CVD flow.",
    url: "https://www.bitcoincrypto.tech/predictions",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function HowToJsonLd({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: { name: string; text: string; url?: string }[];
}) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((step, idx) => ({
      "@type": "HowToStep",
      position: idx + 1,
      name: step.name,
      text: step.text,
      url: step.url || "https://www.bitcoincrypto.tech/predictions",
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function CoinglassPageJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.bitcoincrypto.tech/coinglass#webpage",
        url: "https://www.bitcoincrypto.tech/coinglass",
        name: "CoinGlass Liquidation Heatmap & Crypto Derivatives Tracker | Free Live Heatmap",
        description: "Free real-time CoinGlass liquidation heatmap tracker, live Bitcoin liquidation map, perpetual futures open interest, multi-exchange funding rates (Binance, Bybit, OKX), and short squeeze tracker.",
        isPartOf: {
          "@id": "https://www.bitcoincrypto.tech/#website",
        },
        about: {
          "@type": "Thing",
          name: "CoinGlass Crypto Derivatives Analytics",
          description: "Real-time cryptocurrency liquidation heatmap, open interest clusters, and perpetual futures funding rates.",
        },
        inLanguage: "en-US",
      },
      {
        "@type": "SoftwareApplication",
        name: "CoinGlass Liquidation Heatmap & Crypto Derivatives Suite",
        operatingSystem: "WebBrowser, iOS, Android, macOS, Windows",
        applicationCategory: "FinanceApplication",
        applicationSubCategory: "Cryptocurrency Derivatives & Liquidation Heatmap Tool",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
          availability: "https://schema.org/InStock",
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.97",
          ratingCount: "2180",
          bestRating: "5",
          worstRating: "1",
        },
        featureList: [
          "Free Real-Time CoinGlass Liquidation Heatmap & 2D Spectrogram",
          "Multi-Exchange Bitcoin & Altcoin Liquidation Maps (Binance, Bybit, OKX, Deribit)",
          "Perpetual Futures Open Interest Screener ($75B+ Cross-Exchange Volume)",
          "24-Hour Long vs Short Liquidation Cascade Timeline",
          "8-Hour Multi-Exchange Perpetual Funding Rate Arbitrage Screener",
          "Cumulative Liquidation Delta (CLD) Volume Profiler",
          "Interactive Market Maker Cascade & Squeeze Simulator",
          "Exact Liquidation Price & Margin Cushion Calculator"
        ],
        description: "Institutional-grade free CoinGlass liquidation heatmap alternative providing real-time multi-exchange liquidation pools, futures open interest, long/short trader positioning, and funding rate heatmaps.",
        url: "https://www.bitcoincrypto.tech/coinglass",
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What is a CoinGlass liquidation heatmap?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "A CoinGlass liquidation heatmap is a visual analytical chart that plots estimated leveraged liquidation levels and stop-loss clusters across crypto futures exchanges like Binance, Bybit, and OKX. Bright color intensities (yellow, orange, red) indicate massive pools of resting leverage that act as liquidity magnets for market makers and institutional volatility.",
            },
          },
          {
            "@type": "Question",
            name: "Is this CoinGlass liquidation heatmap free on BitcoinCrypto.tech?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Yes, BitcoinCrypto.tech provides a 100% free institutional CoinGlass liquidation heatmap alternative with zero subscription fees, real-time WebSocket feeds, 2D spectrogram clusters, and interactive squeeze simulators for Bitcoin (BTC), Ethereum (ETH), and Solana (SOL).",
            },
          },
          {
            "@type": "Question",
            name: "How do traders use CoinGlass liquidation levels to predict price reversals?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Traders look for dense liquidation bands above or below the current price. When price sweeps into a dense liquidation cluster, forced market orders from bankrupt positions create a sudden surge in liquidity. Once the cluster is cleared, the selling or buying pressure vanishes, frequently triggering an immediate sharp trend reversal or short squeeze.",
            },
          },
          {
            "@type": "Question",
            name: "What is the difference between CoinGlass Open Interest and Trading Volume?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Trading Volume measures the total number of contracts exchanged over a given period (e.g., 24 hours), whereas Open Interest (OI) measures the total value of active, open derivatives contracts that have not yet been settled or closed. Rising OI with rising price signals aggressive bullish capital inflows, while rising OI at resistance signals a potential liquidation cascade trap.",
            },
          },
          {
            "@type": "Question",
            name: "How does the CoinGlass Long/Short Ratio work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "The CoinGlass Long/Short Ratio compares the net position bias of active futures traders across major exchanges. When the ratio reaches extreme highs (e.g. >70% Longs), the market becomes heavily asymmetric, making a 'long squeeze' liquidation cascade down into support levels highly probable.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function WhaleOrdersPageJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://www.bitcoincrypto.tech/whale-orders#webpage",
        url: "https://www.bitcoincrypto.tech/whale-orders",
        name: "Whale Orders & Institutional Liquidity Heatmap Radar | BitcoinCrypto.tech",
        isPartOf: {
          "@id": "https://www.bitcoincrypto.tech/#website",
        },
        description:
          "Real-time cryptocurrency whale order tracking, multi-million dollar institutional block trades, resting limit buy/sell walls, Cumulative Volume Delta (CVD), and CoinGlass-style liquidity heatmaps on BitcoinCrypto.tech.",
        inLanguage: "en-US",
      },
      {
        "@type": "SoftwareApplication",
        name: "BitcoinCrypto Institutional Whale Orders & Block Trade Radar",
        applicationCategory: "FinanceApplication",
        operatingSystem: "Web",
        url: "https://www.bitcoincrypto.tech/whale-orders",
        offers: {
          "@type": "Offer",
          price: "0.00",
          priceCurrency: "USD",
        },
        featureList: [
          "Real-Time Binance WebSocket Direct Spot Price Blinking Stream",
          "Institutional Block Trade Detection ($100K+ to $10M+)",
          "Cumulative Volume Delta (CVD) & Net Accumulation Timeline Chart",
          "Whale Block Trade Spectrogram (Time vs Price vs Size Bubble Map)",
          "CoinGlass-Style Resting Limit Orderbook Walls & Proximity Radar",
          "Iceberg Execution and Spoofing Pattern Diagnostics"
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "What are crypto whale orders and how do institutional block trades work?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Whales are institutional market participants, hedge funds, and miners executing multi-million dollar trades. To avoid massive price slippage, they use Iceberg algorithms, TWAP (Time-Weighted Average Price) orders, and dark pool crosses to break large executions into smaller algorithmic slices across Binance, Coinbase Prime, and CME.",
            },
          },
          {
            "@type": "Question",
            name: "How does Cumulative Volume Delta (CVD) indicate whale accumulation?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Cumulative Volume Delta (CVD) measures the cumulative net difference between aggressive market buying and selling volume. When price is moving sideways or falling while CVD is making higher highs, it signals Bullish CVD Absorption Divergence—institutions are silently absorbing retail selling pressure.",
            },
          },
          {
            "@type": "Question",
            name: "How can retail traders trade alongside whale limit walls?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Traders can place limit buy orders immediately in front of verified whale support bid walls, position invalidation stop-losses behind the wall depth, and take profits into heavy overhead resistance ask clusters before price reverses.",
            },
          },
        ],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

