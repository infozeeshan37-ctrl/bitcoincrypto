import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { authors } from "@/lib/authorsData";
import { articles } from "@/lib/blogData";
import { 
  Users, 
  Award, 
  ShieldCheck, 
  BookOpen, 
  ArrowRight, 
  ExternalLink, 
  CheckCircle2,
  Mail,
  Github,
  Twitter
} from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "Authors & Quantitative Research Board | BitcoinCrypto.tech",
  description: "Meet the quantitative developers, macroeconomic analysts, and digital asset researchers behind BitcoinCrypto.tech's institutional market intelligence.",
  alternates: {
    canonical: "/authors",
  },
  openGraph: {
    title: "Editorial Board & Author Directory | BitcoinCrypto.tech",
    description: "Meet our quantitative research team, macro analysts, and systems engineers.",
    url: "https://www.bitcoincrypto.tech/authors",
    type: "website",
  },
};

export default function AuthorsPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Editorial Board & Author Directory",
    url: "https://www.bitcoincrypto.tech/authors",
    description: "Directory of quantitative researchers, developers, and analysts at BitcoinCrypto.tech.",
    publisher: {
      "@type": "Organization",
      name: "BitcoinCrypto.tech",
      url: "https://www.bitcoincrypto.tech",
    },
  };

  return (
    <div className="py-10 sm:py-16 bg-white dark:bg-slate-950 transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Authors & Research Board" },
          ]}
        />

        {/* Hero Section */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300">
            <Users className="w-3.5 h-3.5" />
            Editorial Leadership &amp; Quantitative Board
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Meet the Researchers Behind BitcoinCrypto.tech
          </h1>
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
            Our editorial desk unites distributed systems engineers, monetary economists, and quantitative derivatives analysts dedicated to delivering empirical, transparent, and non-speculative digital asset market intelligence.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 pt-2">
            <Link href="/editorial-policy" className="text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Read our Editorial &amp; Verification Policy →
            </Link>
          </div>
        </div>

        {/* Authors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {authors.map((author) => {
            const authorArticles = articles.filter((a) => a.authorSlug === author.slug);

            return (
              <div
                key={author.slug}
                className="rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 sm:p-8 flex flex-col justify-between space-y-6 hover:border-amber-400/50 dark:hover:border-amber-500/50 transition shadow-sm"
              >
                <div className="space-y-5">
                  {/* Top Header */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-700 dark:text-amber-400 font-black text-2xl flex items-center justify-center border border-amber-500/20 shadow-inner">
                        {author.name.charAt(0)}
                      </div>
                      <div>
                        <Link
                          href={`/authors/${author.slug}`}
                          className="text-xl font-extrabold text-slate-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition"
                        >
                          {author.name}
                        </Link>
                        <div className="text-xs font-semibold text-amber-700 dark:text-amber-400">
                          {author.role}
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                          {author.title}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {author.bio}
                  </p>

                  {/* Credentials Badges */}
                  <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
                    <div className="text-[11px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-500" /> Verifiable Credentials
                    </div>
                    <ul className="space-y-1">
                      {author.credentials.slice(0, 3).map((c, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{c}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Areas of Expertise */}
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono uppercase font-bold text-slate-500 dark:text-slate-400">
                      Core Research Disciplines
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {author.areasOfExpertise.map((exp, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-mono bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                        >
                          {exp}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Bar */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                  <div className="text-slate-500 dark:text-slate-400 font-mono">
                    <strong className="text-slate-900 dark:text-white">{authorArticles.length}</strong> Research Publications
                  </div>

                  <Link
                    href={`/authors/${author.slug}`}
                    className="inline-flex items-center gap-1.5 font-bold text-amber-600 dark:text-amber-400 hover:text-amber-500 transition group"
                  >
                    View Full Profile &amp; Articles
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Editorial Standards Card */}
        <div className="p-8 rounded-3xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">Our Editorial Independence Guarantee</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Zero Sponsored Token Promotions or Paid Reviews</p>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            Every author on BitcoinCrypto.tech operates with strict editorial independence. None of our analysts accept compensation from token projects, venture capital syndicates, or exchanges to write positive reviews or fabricate price targets. All model code and research papers are audited for educational integrity under our published{" "}
            <Link href="/editorial-policy" className="text-amber-600 dark:text-amber-400 font-semibold underline">
              Editorial Policy
            </Link>.
          </p>
        </div>

      </div>
    </div>
  );
}
