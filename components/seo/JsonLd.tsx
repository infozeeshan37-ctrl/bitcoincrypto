import React from "react";

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BitcoinCrypto.tech",
    alternateName: ["BitcoinCrypto", "Bitcoin Crypto AI", "BitcoinCrypto AI Prediction Suite"],
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
