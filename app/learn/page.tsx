import type { Metadata } from "next";
import CryptoLearnView from "@/components/learn/CryptoLearnView";
import { courseChapters } from "@/lib/courseData";

export const metadata: Metadata = {
  title: "Crypto Learn: 100-Article Masterclass & Downloadable Chapter PDF eBooks | BitcoinCrypto.tech",
  description:
    "Master digital asset trading with our comprehensive 10-chapter masterclass spanning 100 original, human-written research articles and downloadable chapter PDF books. Master on-chain valuation, MVRV Z-Scores, market structure price action, Level-2 order book depth, CoinGlass liquidation squeeze cascades, and mathematical risk management.",
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
    "crypto price action trading",
    "crypto book pdf download",
    "bitcoin trading masterclass"
  ],
  alternates: {
    canonical: "https://www.bitcoincrypto.tech/learn",
  },
  openGraph: {
    title: "Crypto Learn: 100-Article Masterclass & Downloadable Chapter PDF eBooks",
    description:
      "Institutional-grade 10-chapter cryptocurrency masterclass: 100 human-written articles on on-chain valuation, market structure price action, order flow depth, derivatives, and capital preservation.",
    url: "https://www.bitcoincrypto.tech/learn",
    siteName: "BitcoinCrypto.tech",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crypto Learn: 100-Article Masterclass & Downloadable Chapter eBooks",
    description:
      "Free comprehensive 10-chapter, 100-article masterclass covering on-chain metrics, technical price action, CoinGlass liquidations, and risk management.",
  },
};

export default function LearnPage() {
  const courseSchema = {
    "@context": "https://schema.org",
    "@type": "Course",
    "name": "Crypto Learn: Institutional Cryptocurrency Trading & Valuation Masterclass",
    "description":
      "Comprehensive digital asset educational course covering 10 chapters and 100 articles on blockchain fundamentals, on-chain valuation ratios, market structure technical analysis, order flow, derivatives liquidations, and risk management.",
    "provider": {
      "@type": "Organization",
      "name": "BitcoinCrypto.tech",
      "sameAs": "https://www.bitcoincrypto.tech"
    },
    "hasCourseInstance": {
      "@type": "CourseInstance",
      "courseMode": "Online",
      "courseWorkload": "PT8H00M"
    },
    "coursePrerequisites": "None. Suitable for beginners through institutional quantitative traders.",
    "educationalCredentialAwarded": "Certificate of Completion",
    "syllabusSections": courseChapters.map((ch) => ({
      "@type": "Syllabus",
      "name": `Chapter ${ch.chapterNumber}: ${ch.title}`,
      "description": ch.overview,
      "timeRequired": ch.estimatedTime
    }))
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": courseChapters.flatMap((ch) =>
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
      <CryptoLearnView />
    </>
  );
}
