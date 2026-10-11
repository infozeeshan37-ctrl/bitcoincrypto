import type { Metadata } from "next";
import CryptoLearnView from "@/components/learn/CryptoLearnView";
import { courseModules } from "@/lib/courseData";

export const metadata: Metadata = {
  title: "Crypto Learn: Complete Fundamental & Technical Analysis Course | BitcoinCrypto.tech",
  description:
    "Master cryptocurrency trading with our free 7-module masterclass. Comprehensive curriculum covering on-chain fundamentals, MVRV Z-Scores, market structure price action, Level-2 order book depth, CoinGlass liquidation heatmaps, and mathematical risk management.",
  keywords: [
    "crypto course free",
    "learn crypto trading",
    "cryptocurrency fundamental analysis",
    "technical analysis crypto course",
    "coinglass liquidation course",
    "order book depth trading guide",
    "mvrv z score bitcoin",
    "bitcoin halving mechanics",
    "crypto risk management course",
    "crypto price action trading"
  ],
  alternates: {
    canonical: "https://www.bitcoincrypto.tech/learn",
  },
  openGraph: {
    title: "Crypto Learn: Complete Fundamental & Technical Analysis Course",
    description:
      "Institutional-grade 7-module cryptocurrency masterclass: On-chain valuation, market structure price action, order flow depth, derivatives, and capital preservation.",
    url: "https://www.bitcoincrypto.tech/learn",
    siteName: "BitcoinCrypto.tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crypto Learn: Complete Fundamental & Technical Analysis Masterclass",
    description:
      "Free comprehensive 7-module course covering on-chain metrics, technical price action, CoinGlass liquidations, and risk management.",
  },
};

export default function LearnPage() {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Crypto Learn: Institutional Cryptocurrency Trading & Valuation Masterclass",
    "description":
      "Comprehensive digital asset educational course covering blockchain fundamentals, on-chain valuation ratios, market structure technical analysis, order flow, derivatives liquidations, and risk management.",
    "provider": {
      "@type": "Organization",
      "name": "BitcoinCrypto.tech",
      "sameAs": "https://www.bitcoincrypto.tech"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Online",
      "courseWorkload": "PT4H30M"
    },
    "coursePrerequisites": "None. Beginners through advanced quantitative traders.",
    "educationalCredentialAwarded": "Certificate of Completion",
    "syllabusSections": courseModules.map((m) => ({
      "@type": "Syllabus",
      "name": `Module ${m.moduleNumber}: ${m.title}`,
      "description": m.overview,
      "timeRequired": m.estimatedTime
    }))
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": courseModules.flatMap((m) =>
      m.quiz.map((q) => ({
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
      <CryptoLearnView />
    </>
  );
}
