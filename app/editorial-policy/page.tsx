import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { 
  ShieldCheck, 
  FileText, 
  Scale, 
  CheckCircle2, 
  AlertTriangle, 
  Layers, 
  ExternalLink, 
  Users, 
  Cpu, 
  ArrowRight,
  BookOpen,
  Award
} from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";

export const metadata: Metadata = {
  title: "Editorial Policy & Mathematical Verification Standards | BitcoinCrypto.tech",
  description: "Learn about BitcoinCrypto.tech's editorial standards, mathematical verification protocols, primary source mandates, and commitment to institutional E-E-A-T digital asset research.",
  alternates: {
    canonical: "/editorial-policy",
  },
  openGraph: {
    title: "Editorial Policy & Mathematical Standards | BitcoinCrypto.tech",
    description: "Our empirical methodology, fact-checking workflow, primary source mandates, and commitment to objective quantitative digital asset intelligence.",
    url: "https://www.bitcoincrypto.tech/editorial-policy",
    type: "website",
  },
};

export default function EditorialPolicyPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Editorial Policy & Verification Standards",
    url: "https://www.bitcoincrypto.tech/editorial-policy",
    description: "Editorial standards, mathematical peer review protocols, and research methodology for BitcoinCrypto.tech.",
    publisher: {
      "@type": "Organization",
      name: "BitcoinCrypto.tech",
      url: "https://www.bitcoincrypto.tech",
      logo: "https://www.bitcoincrypto.tech/favicon.ico",
    },
  };

  return (
    <div className="py-10 sm:py-16 bg-white dark:bg-slate-950 transition-colors">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Editorial Policy" },
          ]}
        />

        {/* Header Section */}
        <div className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300">
            <ShieldCheck className="w-3.5 h-3.5" />
            Institutional E-E-A-T Editorial Standard
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
            Editorial Policy &amp; Mathematical Verification Standards
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            At BitcoinCrypto.tech, every research article, interactive algorithmic model, and market microstructure analysis is governed by strict editorial independence, empirical mathematical verification, and verifiable primary source attribution.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 dark:text-slate-400 pt-2">
            <span>Last Updated: November 2026</span>
            <span>•</span>
            <span>Editorial Board: Quantitative Research &amp; Market Microstructure Desk</span>
            <span>•</span>
            <Link href="/authors" className="text-amber-600 dark:text-amber-400 hover:underline">
              Meet Our Authors &amp; Analysts →
            </Link>
          </div>
        </div>

        {/* Core Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Empirical Objectivity</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              We never publish speculative gossip, influencer hype, or promotional token shilling. All theses must be corroborated by raw blockchain transactions, Central Limit Order Book data, or macroeconomic central bank balance sheets.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Mathematical Rigor</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Formulas presented on BitcoinCrypto.tech—from Kelly Criterion position sizing to GARCH volatility clustering—are mathematically validated against historical walk-forward datasets to eliminate survivorship and overfitting bias.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Transparent Authorship</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every publication is signed by verified quantitative analysts, monetary economists, or systems engineers with public credential records, areas of expertise, and direct contact channels.
            </p>
          </div>
        </div>

        {/* Section 1: Research & Verification Process */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-mono uppercase font-bold text-amber-600 dark:text-amber-400">
            <FileText className="w-4 h-4" /> Section 1
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            The 4-Stage Peer-Review &amp; Fact-Checking Workflow
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Before any article or interactive calculation engine is made public on BitcoinCrypto.tech, it must successfully navigate four mandatory editorial gates:
          </p>

          <div className="space-y-4 pt-2">
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex gap-4">
              <span className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">1</span>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Hypothesis &amp; Ledger Data Collection</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  The author extracts verifiable on-chain data (UTXO distribution, realized cap, active entities) via RPC nodes, or exchange order book telemetry via low-latency WebSocket APIs.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex gap-4">
              <span className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">2</span>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Quantitative Mathematical Audit</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Our quantitative engineering desk independently tests the underlying mathematical formulations (e.g. ATR bands, liquidation price mechanics, delta-neutral basis calculations) against Python and TypeScript simulation environments.
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex gap-4">
              <span className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">3</span>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Primary Source Verification</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Every external claim regarding monetary policy, inflation prints, regulatory actions, or institutional ETF inflows must link directly to official primary repositories (e.g. Federal Reserve FRED, SEC Edgar, BIS, or academic SSRN/ArXiv papers).
                </p>
              </div>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex gap-4">
              <span className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-black text-sm flex items-center justify-center shrink-0">4</span>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Editorial Board Approval &amp; Schema Validation</h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  The article is reviewed by our Lead Quantitative Developer (Zeeshan Ahmed) and Chief Macroeconomic Lead (Elena Rostova) for compliance with educational guidelines, accessibility, and structured schema markup.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Primary Sources Mandate */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-mono uppercase font-bold text-amber-600 dark:text-amber-400">
            <Layers className="w-4 h-4" /> Section 2
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Mandate for Primary Sources &amp; Institutional Repositories
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            We adhere to a strict hierarchy of citations. We disallow citations to anonymous social media accounts, rumor blogs, or unverified press releases. Authors are required to reference:
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-medium text-slate-700 dark:text-slate-300">
            <li className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Federal Reserve Bank of St. Louis (FRED)</span>
            </li>
            <li className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>US Securities and Exchange Commission (SEC EDGAR)</span>
            </li>
            <li className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Bank for International Settlements (BIS)</span>
            </li>
            <li className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>US Commodity Futures Trading Commission (CFTC)</span>
            </li>
            <li className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Glassnode Studio &amp; Bitcoin Core Public Ledgers</span>
            </li>
            <li className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Peer-reviewed academic papers (SSRN, ArXiv, NBER)</span>
            </li>
          </ul>
        </section>

        {/* Section 3: Corrections & Retractions Policy */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-mono uppercase font-bold text-amber-600 dark:text-amber-400">
            <AlertTriangle className="w-4 h-4" /> Section 3
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Corrections &amp; Model Audit Policy
          </h2>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Integrity requires complete transparency when errors occur. In the event of a factual mistake, mathematical typographical error, or updated macroeconomic release:
          </p>
          <div className="p-5 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 text-xs sm:text-sm text-slate-700 dark:text-slate-300 space-y-2">
            <p>
              • <strong>Immediate Revision:</strong> The error is corrected in the live article or calculation tool within 24 hours of notification.
            </p>
            <p>
              • <strong>Transparent Correction Log:</strong> A timestamped note is appended to the bottom of the article specifying what was amended, why, and the date of the audit.
            </p>
            <p>
              • <strong>Community Feedback:</strong> Readers, academic researchers, and market participants who identify inaccuracies are encouraged to contact our editorial desk directly at <code className="font-mono text-amber-700 dark:text-amber-300">infozeeshan37@gmail.com</code>.
            </p>
          </div>
        </section>

        {/* Section 4: Non-Financial Advice & Educational Scope */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 text-sm font-mono uppercase font-bold text-amber-600 dark:text-amber-400">
            <BookOpen className="w-4 h-4" /> Section 4
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Strict Educational Mandate &amp; Non-Financial Advice Disclaimer
          </h2>
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              BitcoinCrypto.tech is an educational technology and market research platform. Nothing published on this domain—including but not limited to AI predictive models, 5-minute price channels, liquidation heatmaps, position sizing calculators, or blog analyses—constitutes investment advice, financial planning, legal counsel, or a recommendation to buy or sell any digital asset.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Cryptocurrency markets involve substantial risk of loss and extreme price volatility. Past performance of algorithmic models or quantitative indicators is not indicative of future results. All interactive tools provide simulated paper-trading functionality designed solely for educational risk modeling.
            </p>
          </div>
        </section>

        {/* Editorial Board CTA */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300/40 dark:border-amber-700/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Explore Our Editorial Board &amp; Team</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
              Review individual author biographies, credentials, published research, and areas of expertise.
            </p>
          </div>
          <Link
            href="/authors"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 hover:bg-amber-400 transition shrink-0 shadow-sm"
          >
            <Users className="w-4 h-4" /> View Author Directory <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
}
