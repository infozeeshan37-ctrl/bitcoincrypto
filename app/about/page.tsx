"use client";

import { useState } from "react";
import {
  Shield,
  Sparkles,
  BookOpen,
  Cpu,
  Layers,
  Award,
  CheckCircle2,
  Lock,
  Zap,
  Globe2,
  Mail,
  ChevronDown
} from "lucide-react";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What makes BitcoinCrypto.tech different from standard crypto portals?",
      a: "We emphasize pure mathematical clarity, macroeconomic fundamentals, and zero-latency terminal utilities rather than speculative hype, paid token promotions, or predatory trading schemes."
    },
    {
      q: "Are the educational masterclasses and research papers really 100% free?",
      a: "Yes. All educational courses, analytical frameworks, and research desk insights are openly accessible to empower independent traders worldwide."
    },
    {
      q: "What data feeds power the trading terminal and tools?",
      a: "Our platform leverages direct real-time WebSocket feeds and REST endpoints from global liquid centralized exchanges (Binance, Coinbase, Kraken) alongside on-chain node telemetry."
    },
    {
      q: "Can I connect my API keys or execute trades directly?",
      a: "Currently, our platform is an analytics and intelligence hub. We do not hold user funds, manage custodial wallets, or execute broker order routing."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-10 sm:py-16 transition-colors">
      <FAQJsonLd faqs={faqs.map(f => ({ question: f.q, answer: f.a }))} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        <Breadcrumbs items={[{ label: "About Platform & Architecture", href: "/about" }]} />

        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-700/80 text-amber-900 dark:text-amber-300 shadow-sm">
            <Shield className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Platform Ethics & Mission</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Empowering the World with Transparent Crypto Intelligence
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            BitcoinCrypto.tech was engineered to cut through noise, delivering verifiable macroeconomic research, order flow mechanics, and mathematical risk toolkits.
          </p>
        </div>

        {/* 4 Pillars of Integrity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Absolute Neutrality</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              We strictly reject paid token promotions, sponsored shilling, or biased exchange rankings. All intelligence is rooted in raw market data.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Empirical Mathematical Rigor</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Our tools utilize transparent statistical formulas (harmonic mean DCA, position risk distance, MVRV Z-Scores) rather than vague subjective speculation.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Zero-Latency Light Architecture</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Built on Next.js 16 with instant client-side calculations and sub-second CDN response times globally.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Open-Access Education</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Comprehensive trading masterclasses, glossaries, and research desk whitepapers accessible freely to all market participants.
            </p>
          </div>
        </div>

        {/* Technology Architecture Breakdown */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-3 py-1 rounded-lg uppercase">
            Platform Infrastructure
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            How BitcoinCrypto.tech is Engineered
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 space-y-2">
              <div className="text-sm font-bold text-slate-900 dark:text-white">Next.js 16 App Router</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Prerendered static execution for instantaneous page loads and SEO indexation.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 space-y-2">
              <div className="text-sm font-bold text-slate-900 dark:text-white">Three.js WebGL Engine</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">60 FPS interactive 3D hardware and token visualizations running directly on GPU.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 space-y-2">
              <div className="text-sm font-bold text-slate-900 dark:text-white">TradingView Direct Feed</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Multi-timeframe candlestick data directly integrated with global crypto exchanges.</p>
            </div>
          </div>
        </div>

        {/* Interactive FAQ Accordion */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Media Desk CTA */}
        <div className="bg-gradient-to-r from-slate-900 to-slate-950 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">Have Research Questions or Feedback?</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Our quantitative research team is always open to collaborative macroeconomic inquiries.
            </p>
          </div>
          <Link
            href="/tools"
            className="px-6 py-3.5 rounded-xl text-xs font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 transition shadow-sm whitespace-nowrap"
          >
            Launch Platform Suite
          </Link>
        </div>

      </div>
    </div>
  );
}
