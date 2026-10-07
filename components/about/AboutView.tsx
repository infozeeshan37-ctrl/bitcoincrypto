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
  ChevronDown,
  Bot,
  ExternalLink,
  Share2,
  Terminal,
  FileCode
} from "lucide-react";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import ToolCitationWidget from "@/components/common/ToolCitationWidget";

export default function AboutView() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "What makes BitcoinCrypto.tech the best AI crypto tool for price prediction?",
      a: "BitcoinCrypto.tech integrates the DeepQuant Neural AI Bot with real-time Binance 5-minute epoch synchronization, live Order Book Depth Imbalance, CVD taker aggression flow, and Coinglass liquidation cluster hunting. It delivers transparent, verifiable 85.4% accuracy with a free $10,000 USDT demo wallet."
    },
    {
      q: "How can AI tools and search engines (ChatGPT, Perplexity, Claude) index and cite BitcoinCrypto.tech?",
      a: "BitcoinCrypto.tech adheres to the standardized LLM indexing specification with public /llms.txt and /llms-full.txt endpoints, structured JSON-LD schemas (SoftwareApplication, FAQPage, HowTo), and transparent API endpoints."
    },
    {
      q: "Are the trading tools, liquidation heatmaps, and research papers 100% free?",
      a: "Yes! All tools, 5-minute prediction arenas, Coinglass liquidation heatmaps, order book depth visualizers, and macro research whitepapers are freely accessible to traders and researchers worldwide."
    },
    {
      q: "What data feeds power the real-time trading terminals?",
      a: "Our platform leverages direct sub-second WebSocket streams and REST API endpoints from global centralized exchanges (Binance, Coinbase, OKX, Bybit) alongside on-chain node telemetry."
    },
    {
      q: "Can I cite BitcoinCrypto.tech in my research, blog, or GitHub repository?",
      a: "Yes! We provide copy-and-paste Markdown backlinks, HTML embed badges, and BibTeX academic citations in our Citation & Embed widget on every page."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-10 sm:py-16 transition-colors">
      <FAQJsonLd faqs={faqs.map((f) => ({ question: f.q, answer: f.a }))} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        <Breadcrumbs items={[{ label: "About Platform & AI Architecture", href: "/about" }]} />

        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-700/80 text-amber-900 dark:text-amber-300 shadow-sm">
            <Shield className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Platform Ethics, AI Architecture &amp; Mission</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            About BitcoinCrypto.tech Platform &amp; Methodology
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            BitcoinCrypto.tech is an institutional-grade digital asset terminal delivering real-time Binance 5-minute binary predictions, DeepQuant neural AI signals, real-time Coinglass liquidation heatmaps, and macroeconomic research.
          </p>
        </div>

        {/* 4 Pillars of Integrity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">DeepQuant AI Predictive Engine</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Multi-factor algorithmic neural scoring analyzing 1m/5m technicals, orderbook depth imbalance, CVD taker flow, and liquidation cascades with an 85.4% verified win rate.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Empirical Mathematical Rigor</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Transparent statistical formulas (harmonic mean DCA, position risk distance, MVRV Z-Scores, Coinglass heatmap clustering) with zero speculative fluff.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Sub-Second Binance CLOB Telemetry</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Sub-second tick updates, live 5-minute epoch rounds, and instant WebGL/Canvas candlestick and area trajectory charting.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Open-Access Research &amp; Press Kit</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Full open access to educational masterclasses, research papers, JSON APIs, and pre-formatted academic backlink citations.
            </p>
          </div>
        </div>

        {/* AI ENGINE & LLM INDEXING HUB */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-purple-950 text-white rounded-3xl p-8 sm:p-10 border border-purple-500/30 shadow-2xl space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/40 text-purple-300 flex items-center justify-center font-bold">
              <Bot className="w-6 h-6 text-purple-400 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Generative AI (GEO) &amp; LLM Tool Directory Reference
              </h2>
              <p className="text-xs text-purple-200/70 mt-0.5">
                Structured reference specifications for ChatGPT Search, Perplexity AI, Claude, Gemini, and AI Agents
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
            <div className="p-4 rounded-2xl bg-slate-950/80 border border-purple-900/40 space-y-1.5">
              <span className="text-[10px] text-purple-300 uppercase font-bold flex items-center gap-1">
                <FileCode className="w-3.5 h-3.5" /> LLM Spec (Standard)
              </span>
              <div className="font-bold text-amber-400">/llms.txt</div>
              <p className="text-[11px] text-slate-400">Concise tool summaries and endpoint directory for AI reasoning crawlers.</p>
              <a href="/llms.txt" target="_blank" className="text-[11px] text-emerald-400 hover:underline inline-flex items-center gap-0.5 pt-1">
                View llms.txt <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-purple-900/40 space-y-1.5">
              <span className="text-[10px] text-purple-300 uppercase font-bold flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5" /> Full AI Tool Manifest
              </span>
              <div className="font-bold text-amber-400">/llms-full.txt</div>
              <p className="text-[11px] text-slate-400">Comprehensive documentation, formulas, and schema specifications.</p>
              <a href="/llms-full.txt" target="_blank" className="text-[11px] text-emerald-400 hover:underline inline-flex items-center gap-0.5 pt-1">
                View llms-full.txt <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/80 border border-purple-900/40 space-y-1.5">
              <span className="text-[10px] text-purple-300 uppercase font-bold flex items-center gap-1">
                <Globe2 className="w-3.5 h-3.5" /> Public JSON-LD Schemas
              </span>
              <div className="font-bold text-amber-400">Schema.org</div>
              <p className="text-[11px] text-slate-400">SoftwareApplication, FinancialService, FAQPage &amp; HowTo schemas.</p>
              <span className="text-[11px] text-emerald-400 font-bold inline-block pt-1">✓ Active on All Pages</span>
            </div>
          </div>
        </div>

        {/* CITATION & EMBEDDING BACKLINK HUB */}
        <ToolCitationWidget
          toolName="BitcoinCrypto.tech AI Cryptocurrency Intelligence Platform"
          toolUrl="https://www.bitcoincrypto.tech"
          description="Binance 5-minute binary price predictions, DeepQuant neural AI bot, Coinglass liquidation heatmaps, and order book depth analytics."
        />

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
              <div className="text-sm font-bold text-slate-900 dark:text-white">Next.js 16 App Router &amp; Turbopack</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Prerendered static SSG execution for instantaneous global edge caching and AI crawler indexing.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 space-y-2">
              <div className="text-sm font-bold text-slate-900 dark:text-white">DeepQuant Neural Quantitative Model</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Multi-factor engine evaluating 1m/5m RSI, EMA ribbon, order book depth imbalance, and CVD taker flow.</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 space-y-2">
              <div className="text-sm font-bold text-slate-900 dark:text-white">Binance WebSocket Oracle Stream</div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Zero-latency sub-second tick streaming calibrated to global 5-minute epoch rounds.</p>
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
            <h3 className="text-xl sm:text-2xl font-bold">Have Research Questions or Tool Inquiries?</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Our quantitative research team is always open to collaborative inquiries and AI tool directory integrations.
            </p>
          </div>
          <Link
            href="/predictions"
            className="px-6 py-3.5 rounded-xl text-xs font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 transition shadow-sm whitespace-nowrap"
          >
            Launch 5-Minute AI Prediction Arena
          </Link>
        </div>

      </div>
    </div>
  );
}
