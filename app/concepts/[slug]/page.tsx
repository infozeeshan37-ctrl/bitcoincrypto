import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Compass,
  BookOpen,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  ChevronRight,
  Clock,
  Sparkles,
  Layers,
  ShieldCheck,
  TrendingUp,
  Calculator
} from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { conceptGuides, ConceptGuide } from "@/lib/conceptsData";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return conceptGuides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = conceptGuides.find((g) => g.slug === slug);

  if (!guide) {
    return {
      title: "Trading Concept Not Found",
      description: "Cryptocurrency trading concept and quantitative model not found.",
    };
  }

  const title = `${guide.title} | BitcoinCrypto.tech Research`;
  const canonicalUrl = `https://www.bitcoincrypto.tech/concepts/${guide.slug}`;

  return {
    title,
    description: guide.summary,
    keywords: [
      guide.category.toLowerCase(),
      "crypto market structure",
      "algorithmic trading concepts",
      "crypto mathematical models",
      "on-chain analysis guide",
      "derivatives liquidity tutorial",
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description: guide.summary,
      url: canonicalUrl,
      type: "article",
      siteName: "BitcoinCrypto.tech",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: guide.summary,
      creator: "@bitcoincrypto",
    },
  };
}

export default async function ConceptDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = conceptGuides.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  const otherGuides = conceptGuides.filter((g) => g.slug !== guide.slug).slice(0, 4);

  // Generate Article JSON-LD Schema
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": guide.title,
    "description": guide.summary,
    "author": {
      "@type": "Organization",
      "name": "BitcoinCrypto.tech Quantitative Research Desk",
      "url": "https://www.bitcoincrypto.tech",
    },
    "publisher": {
      "@type": "Organization",
      "name": "BitcoinCrypto.tech",
      "url": "https://www.bitcoincrypto.tech",
    },
    "datePublished": "2026-08-01T08:00:00+00:00",
    "dateModified": "2026-09-21T08:00:00+00:00",
    "mainEntityOfPage": `https://www.bitcoincrypto.tech/concepts/${guide.slug}`,
  };

  // Generate FAQ JSON-LD Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": guide.faq.map((f) => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.bitcoincrypto.tech",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Trading Concepts",
        "item": "https://www.bitcoincrypto.tech/concepts",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": guide.category,
        "item": `https://www.bitcoincrypto.tech/concepts/${guide.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Navigation Breadcrumb Bar */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md sticky top-20 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Concepts & Models", href: "/concepts" },
              { label: guide.category },
            ]}
          />
          <Link
            href="/concepts"
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>All Concepts</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {/* Header Hero */}
        <header className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
            <span>{guide.category}</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-normal">
              <Clock className="w-3.5 h-3.5" /> {guide.readTime}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            {guide.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {guide.summary}
          </p>

          <div className="flex items-center gap-4 text-xs text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-800 font-medium">
            <span>By <strong>Quantitative Research Desk</strong></span>
            <span>•</span>
            <span>Updated <strong>{guide.lastUpdated}</strong></span>
            <span>•</span>
            <span>Peer-Reviewed Institutional Model</span>
          </div>
        </header>

        {/* Key Takeaways Box */}
        <section className="p-6 sm:p-8 rounded-3xl bg-amber-500/10 dark:bg-amber-950/20 border border-amber-500/30 space-y-4">
          <h2 className="text-base font-black text-amber-950 dark:text-amber-300 uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            <span>Executive Quantitative Takeaways</span>
          </h2>
          <ul className="space-y-2.5">
            {guide.keyTakeaways.map((takeaway, idx) => (
              <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Mathematical Formula Section (if applicable) */}
        {guide.formula && (
          <section className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-amber-400 tracking-wider">
                {guide.formula.name}
              </span>
              <Calculator className="w-4 h-4 text-slate-400" />
            </div>
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-center text-sm sm:text-base text-amber-300 overflow-x-auto py-4">
              {guide.formula.equation}
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>Formula Note:</strong> {guide.formula.explanation}
            </p>
          </section>
        )}

        {/* Core Content Sections */}
        <section className="space-y-8 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed">
          {guide.sections.map((sec, idx) => (
            <div key={idx} className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                {sec.heading}
              </h2>
              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
              {sec.callout && (
                <div className="p-5 rounded-2xl bg-slate-100 dark:bg-slate-900 border-l-4 border-amber-500 space-y-1">
                  <div className="font-bold text-xs uppercase tracking-wider text-amber-700 dark:text-amber-400 font-mono">
                    {sec.callout.title}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-medium italic">
                    "{sec.callout.text}"
                  </p>
                </div>
              )}
            </div>
          ))}
        </section>

        {/* Related Interactive Tools */}
        <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span>Interactive Tools Related to this Model</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {guide.relatedTools.map((tool, idx) => (
              <Link
                key={idx}
                href={tool.href}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 hover:border-amber-400 transition group flex flex-col justify-between space-y-2"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                      {tool.name}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-0.5 transition" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {tool.description}
                  </p>
                </div>
                <span className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-300">
                  Launch Interactive Tool &rarr;
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* FAQ Section for Google Rich Snippets */}
        <section className="space-y-4 pt-6 border-t border-slate-200 dark:border-slate-800">
          <h3 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            <span>Frequently Asked Questions — {guide.category}</span>
          </h3>

          <div className="space-y-3">
            {guide.faq.map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2"
              >
                <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 flex items-center justify-center text-xs font-mono font-bold">
                    Q
                  </span>
                  <span>{item.question}</span>
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 pl-7 leading-relaxed">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Explore More Concepts */}
        <section className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              Explore More Quantitative Guides
            </h3>
            <Link
              href="/concepts"
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>View All 8 Guides</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {otherGuides.map((og) => (
              <Link
                key={og.slug}
                href={`/concepts/${og.slug}`}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 transition group flex flex-col justify-between"
              >
                <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-400 mb-1">
                  <span>{og.category}</span>
                  <span>{og.readTime}</span>
                </div>
                <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition line-clamp-2">
                  {og.title}
                </h4>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}
