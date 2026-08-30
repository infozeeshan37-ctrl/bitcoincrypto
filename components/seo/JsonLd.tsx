import React from "react";

export function WebSiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BitcoinCrypto.tech",
    url: "https://www.bitcoincrypto.tech",
    description: "Modern, transparent cryptocurrency market intelligence, order flow mechanics, Coinglass derivatives, DCA models, and macroeconomic analysis.",
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
    url: "https://www.bitcoincrypto.tech",
    logo: "https://www.bitcoincrypto.tech/logo.png",
    sameAs: [
      "https://github.com/infozeeshan37-ctrl/bitcoincrypto",
      "https://twitter.com/bitcoincrypto",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: "https://www.bitcoincrypto.tech/about",
    },
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
    name: "BitcoinCrypto AI Signals Terminal & Analytics Hub",
    operatingSystem: "Web",
    applicationCategory: "FinanceApplication",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: "Real-time cryptocurrency AI trading signals, risk-to-reward calculation, Coinglass derivative heatmaps, and TradingView charts.",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
