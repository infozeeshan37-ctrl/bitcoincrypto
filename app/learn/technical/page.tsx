import type { Metadata } from "next";
import CryptoLearnView from "@/components/learn/CryptoLearnView";
import { technicalChapters, learningTracks } from "@/lib/courseData";

export const metadata: Metadata = {
  title: "Technical Analysis Crypto Course: 60 Lessons on Price Action, Order Flow & Liquidations | BitcoinCrypto.tech",
  description:
    "Master quantitative cryptocurrency technical analysis across 6 core chapters and 60 original human-written research lessons: candlestick auction theory, Level-2 order book depth, Cumulative Volume Delta (CVD), CoinGlass liquidation cascades, indicator confluence, and Kelly Criterion risk management. Includes downloadable PDF textbook.",
  keywords: [
    "crypto technical analysis course",
    "technical analysis crypto",
    "learn price action crypto",
    "order book depth trading course",
    "cvd cumulative volume delta crypto",
    "coinglass liquidation trading course",
    "technical indicators crypto masterclass",
    "market microstructure crypto",
    "perpetual futures trading course",
    "crypto risk management kelly criterion",
    "crypto technical analysis pdf download",
    "wyckoff crypto trading guide"
  ],
  alternates: {
    canonical: "https://www.bitcoincrypto.tech/learn/technical",
  },
  openGraph: {
    title: "Technical Analysis Crypto Course: 60 Lessons on Price Action, Order Flow & Liquidations",
    description:
      "Quantitative 6-chapter technical analysis curriculum: 60 human-written research articles on candlestick auction theory, order book depth, CVD, CoinGlass liquidations, and capital preservation.",
    url: "https://www.bitcoincrypto.tech/learn/technical",
    siteName: "BitcoinCrypto.tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical Analysis Crypto Course: 60 Lessons on Price Action & Order Flow",
    description:
      "Master quantitative cryptocurrency technical analysis, order book depth, CVD, and liquidation cascades with our free 60-lesson course & downloadable PDF textbook.",
  },
};

export default function TechnicalLearnPage() {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Crypto Technical Analysis Track: Quantitative Price Action, Order Flow & Liquidations",
    "description":
      "Professional quantitative trading and execution methodology. Spanning 6 advanced chapters and 60 human-written research articles, master candlestick price action & Wyckoff auction theory, Level-2 order book depth & CVD order flow, technical indicator confluence, HFT exchange microstructure, CoinGlass liquidation cascades, and Kelly Criterion risk management.",
    "provider": {
      "@type": "Organization",
      "name": "BitcoinCrypto.tech",
      "url": "https://www.bitcoincrypto.tech",
      "sameAs": [
        "https://www.bitcoincrypto.tech",
        "https://twitter.com/bitcoincrypto",
        "https://github.com/infozeeshan37-ctrl/bitcoincrypto"
      ]
    },
    "citation": [
      "https://www.tradingview.com",
      "https://www.coinglass.com",
      "https://developers.binance.com",
      "https://www.cmegroup.com",
      "https://www.deribit.com",
      "https://archive.org/details/bstj35-4-917"
    ],
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Online",
      "courseWorkload": "PT6H30M"
    },
    "coursePrerequisites": "Basic understanding of cryptocurrency markets. Suitable for intermediate to quantitative algorithmic traders.",
    "educationalCredentialAwarded": "Certificate of Technical Proficiency",
    "syllabusSections": technicalChapters.map((ch) => ({
      "@type": "Syllabus",
      "name": `Chapter ${ch.chapterNumber}: ${ch.title}`,
      "description": ch.overview,
      "timeRequired": ch.estimatedTime
    }))
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": technicalChapters.flatMap((ch) =>
      ch.quiz.map((q) => ({
        "@type": "Question",
        "name": q.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": q.explanation
        }
      }))
    )
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <CryptoLearnView initialTrack="technical" canonicalPath="/learn/technical" />
    </>
  );
}
