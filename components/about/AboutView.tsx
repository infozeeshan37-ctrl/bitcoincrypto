"use client";

import { useState } from "react";
import Image from "next/image";
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
  FileCode,
  ArrowRight,
  TrendingUp,
  Activity,
  BarChart2,
  Flame,
  HelpCircle
} from "lucide-react";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { FAQJsonLd } from "@/components/seo/JsonLd";
import ToolCitationWidget from "@/components/common/ToolCitationWidget";
import { authors } from "@/lib/authorsData";

export default function AboutView() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const faqs = [
    {
      q: "Why was BitcoinCrypto.tech founded and what is its core mission?",
      a: "BitcoinCrypto.tech was founded by Zeeshan Ahmed with a single core mission: to provide an open-access, mathematically rigorous cryptocurrency research laboratory for retail traders and academic learners worldwide. Frustrated by the pervasive culture of paid VIP signal channels, opaque black-box trading bots, and speculative crypto hype, our desk set out to democratize institutional-grade market microstructure telemetry—such as Level-2 order book depth, CoinGlass liquidation heatmaps, and macro liquidity metrics—completely free of charge."
    },
    {
      q: "What makes BitcoinCrypto.tech different from standard crypto tracking sites?",
      a: "Most commercial crypto websites focus strictly on spot prices, influencer news, and promotional token listings. In contrast, BitcoinCrypto.tech approaches the market through the lens of quantitative microstructure and monetary economics. We analyze the interaction between resting passive limit liquidity and aggressive market taker orders (CVD), perpetual futures funding rate disparities, cross-exchange liquidation cascades, and macroeconomic inflation metrics (US CPI). Every tool is anchored in verifiable mathematical formulas."
    },
    {
      q: "Are the trading tools, liquidation heatmaps, and educational articles 100% free?",
      a: "Yes. All interactive analytics, 5-minute prediction models, CoinGlass liquidation heatmaps, Level-2 order book depth visualizers, and the 100-article cryptocurrency masterclass are 100% freely accessible without paywalls, subscriptions, or credit card requirements."
    },
    {
      q: "Does BitcoinCrypto.tech accept deposits or provide investment advice?",
      a: "No. BitcoinCrypto.tech is strictly an educational research and market intelligence publisher. We do not accept real-money deposits, manage funds, execute live brokerage trades, or custody cryptocurrency assets. Our interactive trading bots, DCA simulators, and position calculators operate exclusively with virtual demo balances ($10,000 USDT) stored locally in your browser. Nothing on this website constitutes financial or investment advice."
    },
    {
      q: "What data feeds and methodologies power the real-time terminals?",
      a: "Our platform ingests sub-second WebSocket streams and REST API feeds directly from Tier-1 cryptocurrency centralized exchanges (Binance, Bybit, OKX, Coinbase, Deribit) and decentralized protocol nodes. Macroeconomic metrics are benchmarked against official releases from the US Bureau of Labor Statistics (BLS) and Federal Reserve Economic Data (FRED)."
    },
    {
      q: "Can researchers, journalists, and students cite BitcoinCrypto.tech?",
      a: "Yes. We actively support academic and press citations. Every research deep-dive and tool page provides pre-formatted BibTeX, APA, and Markdown citations along with embeddable HTML badges via our Tool Citation Widget."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-10 sm:py-16 transition-colors">
      <FAQJsonLd faqs={faqs.map((f) => ({ question: f.q, answer: f.a }))} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        <Breadcrumbs items={[{ label: "About Platform & Research Desk", href: "/about" }]} />

        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-700/80 text-amber-900 dark:text-amber-300 shadow-sm">
            <Shield className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Empirical Research • Quantitative Telemetry • Zero Paywalls</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            About BitcoinCrypto.tech Platform &amp; Methodology
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            BitcoinCrypto.tech is an independent educational cryptocurrency research and market intelligence terminal. We deliver empirical Technical Analysis models, Fundamental macroeconomic indicators (US CPI), real-time derivatives telemetry, and simulated paper-trading tools. <strong>Strictly educational, zero betting or gambling, and non-financial advice.</strong>
          </p>
        </div>

        {/* Our Origin Story & Public Mission */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-5">
            <span className="text-xs font-mono font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-3 py-1 rounded-lg uppercase">
              The Genesis
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              Why BitcoinCrypto.tech Exists: Overcoming the Retail Noise
            </h2>
          </div>
          
          <div className="space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              In 2024, quantitative developer <strong>Zeeshan Ahmed</strong> recognized a profound divide in the digital asset space. While institutional market makers, proprietary trading desks, and hedge funds operated with sub-second order book depth, cross-exchange liquidation heatmaps, and macroeconomic inflation regressions, retail participants were largely relegated to speculative social media feeds, paid Telegram &quot;VIP signal&quot; groups, and black-box indicators selling false promises of guaranteed overnight riches.
            </p>
            <p>
              Over 90% of retail crypto traders lose capital not because markets are unpredictable, but because they trade without understanding <strong>market microstructure</strong>—how passive limit orders absorb aggressive market takers, how high-leverage positions trigger cascading liquidation squeezes, and how central bank liquidity (Global M2 and US CPI) dictates multi-year market regimes.
            </p>
            <p>
              BitcoinCrypto.tech was engineered to eliminate this asymmetry. We built a comprehensive, completely free, and open-access research terminal where every predictive model, liquidation spectrogram, order book scanner, and educational masterclass is rooted in verifiable mathematics, peer-reviewed computer science, and transparent paper-trading simulations.
            </p>
          </div>
        </div>

        {/* 4 Pillars of Integrity */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Bot className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">DeepQuant Predictive Engine</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Multi-factor algorithmic neural scoring analyzing 1m/5m technicals, order book depth imbalance, CVD taker flow, and liquidation cascades with calibrated backtest performance models (educational simulation).
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Empirical Mathematical Rigor</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Transparent statistical formulas (harmonic mean DCA, position risk distance, MVRV Z-Scores, CoinGlass heatmap clustering) with zero speculative promotional shilling.
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Sub-Second Binance CLOB Telemetry</h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Sub-second tick updates, live 5-minute epoch rounds, and instant WebGL/Canvas candlestick and area trajectory charting across spot and perpetual futures.
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

        {/* 4-Stage Quantitative Research Pipeline */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-700/80">
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              <span>Institutional Engineering Architecture</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              The 4-Stage Quantitative Research Pipeline
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              How raw blockchain data and central limit order book transactions are processed into verified educational telemetry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-mono font-black flex items-center justify-center text-xs">
                1
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Data Ingestion</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                Low-latency WebSocket connections capture sub-second Level-2 order book depth, individual trade ticks, and perpetual futures funding rates from Binance, Coinbase, Bybit, OKX, and Deribit.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="w-7 h-7 rounded-full bg-blue-500 text-white font-mono font-black flex items-center justify-center text-xs">
                2
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Microstructure Extraction</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                Raw trades are segregated into aggressive maker vs taker orders to compute Cumulative Volume Delta (CVD) and calculate bid/ask Order Book Imbalance (OBI) within top 2% depth bands.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="w-7 h-7 rounded-full bg-purple-500 text-white font-mono font-black flex items-center justify-center text-xs">
                3
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Macro Triangulation</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                Microstructure metrics are cross-referenced against US Bureau of Labor Statistics (BLS) CPI inflation prints, Federal Reserve balance sheet changes, and CoinGlass liquidation cluster maps.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <div className="w-7 h-7 rounded-full bg-emerald-500 text-white font-mono font-black flex items-center justify-center text-xs">
                4
              </div>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm">Educational Synthesis</h4>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
                Synthesized insights are published as open-access masterclasses, interactive backtesters, and risk-management simulations for student and analyst education with zero real-money wagering.
              </p>
            </div>
          </div>
        </div>

        {/* Generative AI (GEO) & LLM Tool Directory Reference */}
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
          description="Binance 5-minute next-candle algorithmic price models, DeepQuant neural AI bot, CoinGlass liquidation heatmaps, and order book depth analytics."
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

        {/* Editorial Board & Team Leadership Showcase */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300">
                <Award className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>Verified Editorial &amp; Quantitative Leadership</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                Meet Our Quantitative Researchers &amp; Architects
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                All algorithmic models, research papers, and market intelligence published on BitcoinCrypto.tech are engineered, audited, and backtested by our dedicated human research desk.
              </p>
            </div>
            <div className="flex gap-2.5 shrink-0">
              <Link
                href="/authors"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 transition shadow-xs"
              >
                Full Author Directory →
              </Link>
              <Link
                href="/editorial-policy"
                className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 transition border border-slate-200 dark:border-slate-700"
              >
                Editorial Standards
              </Link>
            </div>
          </div>

          {/* Team Cards Grid - 4 Full Cards with Avatars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {authors.filter((a) => a.slug !== "research-desk").map((author) => (
              <div
                key={author.slug}
                className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/80 space-y-4 flex flex-col justify-between hover:border-amber-400/50 transition"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-700 shrink-0 border border-slate-300 dark:border-slate-600 shadow-inner">
                      <Image
                        src={author.avatarUrl}
                        alt={`${author.name} - ${author.role}`}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>{author.name}</span>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      </h3>
                      <p className="text-xs font-mono font-semibold text-amber-600 dark:text-amber-400">
                        {author.role}
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono">
                        {author.title}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {author.bio}
                  </p>

                  <div className="space-y-1 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
                      Core Credentials:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {author.credentials.slice(0, 2).map((c, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[10.5px]"
                        >
                          ✓ {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
                  <Link
                    href={`/authors/${author.slug}`}
                    className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <span>View Author Profile &amp; Research</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive FAQ Accordion */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Frequently Asked Questions About BitcoinCrypto.tech
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Transparent answers regarding our research ethics, compliance, and open-access models.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
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

        {/* Contact & Inquiries CTA */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">Have Research Questions or Institutional Inquiries?</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Our quantitative desk welcomes inquiries from academic researchers, financial journalists, and software developers. Reach out to our team directly.
            </p>
          </div>
          <Link
            href="/contact"
            className="px-6 py-3.5 rounded-xl text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 transition shadow-sm whitespace-nowrap"
          >
            Contact Research Desk →
          </Link>
        </div>

      </div>
    </div>
  );
}
