import type { Metadata } from "next";
import CryptoLearnView from "@/components/learn/CryptoLearnView";
import { fundamentalChapters, learningTracks } from "@/lib/courseData";

export const metadata: Metadata = {
  title: "Fundamental Analysis Crypto Course: 40 Lessons on On-Chain Valuation, Macro Liquidity & Consensus | BitcoinCrypto.tech",
  description:
    "Master cryptocurrency fundamental analysis across 4 core chapters and 40 original human-written research lessons: Bitcoin Nakamoto consensus, Ethereum EVM & smart contracts, Federal Reserve macroeconomic liquidity & CPI inflation dynamics, and on-chain valuation cycle ratios (MVRV Z-Score, SOPR, NVT). Includes downloadable PDF textbook.",
  keywords: [
    "crypto fundamental analysis course",
    "fundamental analysis crypto",
    "learn bitcoin fundamentals",
    "ethereum evm smart contracts course",
    "crypto macro liquidity fed cpi",
    "on-chain valuation metrics course",
    "mvrv z score bitcoin analysis",
    "bitcoin halving cycle models",
    "sopr onchain bitcoin valuation",
    "crypto tokenomics fundamental analysis",
    "crypto fundamental analysis pdf download",
    "bitcoin whitepaper consensus guide"
  ],
  alternates: {
    canonical: "https://www.bitcoincrypto.tech/learn/fundamental",
  },
  openGraph: {
    title: "Fundamental Analysis Crypto Course: 40 Lessons on On-Chain Valuation & Macro Liquidity",
    description:
      "Institutional 4-chapter fundamental analysis curriculum: 40 human-written research articles on blockchain architecture, EVM smart contracts, Fed liquidity cycles, and on-chain valuation ratios.",
    url: "https://www.bitcoincrypto.tech/learn/fundamental",
    siteName: "BitcoinCrypto.tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fundamental Analysis Crypto Course: 40 Lessons on On-Chain Valuation & Macro Liquidity",
    description:
      "Master Bitcoin Nakamoto consensus, Ethereum EVM, Federal Reserve liquidity cycles, and on-chain MVRV Z-Score with our free 40-lesson course & downloadable PDF textbook.",
  },
};

export default function FundamentalLearnPage() {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Crypto Fundamental Analysis Track: Protocol Consensus, Macro Liquidity & On-Chain Cycles",
    "description":
      "Deep institutional grounding in the economic and structural foundations of crypto assets. Spanning 4 comprehensive chapters and 40 human-written research articles, master Bitcoin Nakamoto consensus, Ethereum EVM & smart contracts, Federal Reserve macroeconomic liquidity & CPI inflation dynamics, and on-chain valuation cycle ratios (MVRV Z-Score, SOPR, NVT).",
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
      "https://bitcoin.org/bitcoin.pdf",
      "https://ethereum.org/en/whitepaper/",
      "https://fred.stlouisfed.org/series/M2SL",
      "https://ccaf.io/cbeci/index",
      "https://insights.glassnode.com",
      "https://www.bls.gov/cpi/",
      "https://www.sec.gov"
    ],
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Online",
      "courseWorkload": "PT4H30M"
    },
    "coursePrerequisites": "None. Suitable for beginners to institutional analysts seeking rigorous protocol and on-chain fundamentals.",
    "educationalCredentialAwarded": "Certificate of Fundamental Valuation",
    "syllabusSections": fundamentalChapters.map((ch) => ({
      "@type": "Syllabus",
      "name": `Chapter ${ch.chapterNumber}: ${ch.title}`,
      "description": ch.overview,
      "timeRequired": ch.estimatedTime
    }))
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": fundamentalChapters.flatMap((ch) =>
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
      <CryptoLearnView initialTrack="fundamental" canonicalPath="/learn/fundamental" />
    </>
  );
}
