"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import {
  Mail,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Sparkles,
  ArrowRight,
  BookOpen,
  ShieldCheck,
  Check,
  Zap,
  Layers,
  Fish,
  Flame,
  Globe,
  Coins,
  Radio,
  Landmark,
  Percent,
  SlidersHorizontal,
  ChevronDown,
  Clock,
  Eye
} from "lucide-react";

export interface NewsletterTopic {
  id: string;
  name: string;
  shortLabel: string;
  badge: string;
  icon: any;
  category: "Macro" | "Derivatives" | "AI & Algos" | "Altcoins";
  description: string;
  automatedCadence: string;
  liveHeadline: string;
}

const NEWSLETTER_TOPICS: NewsletterTopic[] = [
  {
    id: "macro-cycles",
    name: "Macro Cycles & Halving Economics",
    shortLabel: "Macro & Halving",
    badge: "Fed & M2",
    icon: Globe,
    category: "Macro",
    description: "Federal Reserve interest rate projections, global M2 liquidity expansions, Bitcoin 4-year halving cycle models, and DXY dollar index impact.",
    automatedCadence: "Twice Weekly + Breaking FOMC",
    liveHeadline: "Stealth Yield Curve Control: Global Liquidity Injections Signal BTC Cycle Acceleration"
  },
  {
    id: "whale-alerts",
    name: "Whale Block & Dark Pool Alerts",
    shortLabel: "Whale Radar",
    badge: ">$1M Blocks",
    icon: Fish,
    category: "Derivatives",
    description: "Sub-second alerts on multi-million dollar ($1M+ to $10M+) spot and futures block trades across Binance, CME Institutional, and Coinbase Prime.",
    automatedCadence: "Real-Time Flash + Daily Summary",
    liveHeadline: "$14.8M BTC Coinbase Prime TWAP Sweep Detected at $88,200 Support Shelf"
  },
  {
    id: "ai-signals",
    name: "AI DeepQuant 5M Momentum Signals",
    shortLabel: "AI Signals",
    badge: "98.6% Confluence",
    icon: Zap,
    category: "AI & Algos",
    description: "Algorithmic momentum alerts, multi-timeframe order book confluence, trailing stop recommendations, and high-confidence buy/sell triggers.",
    automatedCadence: "Every 15m Scan + Daily Top 5",
    liveHeadline: "BTC & ETH Quad-Confluence Long Triggered: 88.4% Probability to $92,400"
  },
  {
    id: "coinglass-squeezes",
    name: "CoinGlass Liquidation Squeezes & OI",
    shortLabel: "Liquidation Squeezes",
    badge: "Squeeze Radar",
    icon: Flame,
    category: "Derivatives",
    description: "Heatmap density alerts where retail leverage is heavily clustered, high-probability short squeeze targets, and extreme Long/Short sentiment imbalances.",
    automatedCadence: "Every 8h Epoch + Cascade Alerts",
    liveHeadline: "$320M Short Liquidation Cluster Primed at $91,500 — Squeeze Risk High"
  },
  {
    id: "altcoin-breakouts",
    name: "Altcoin Breakouts & Layer-1 Rotation",
    shortLabel: "Altcoin Rotation",
    badge: "L1 / DeFi",
    icon: Coins,
    category: "Altcoins",
    description: "Capital rotation tracking from Bitcoin into Ethereum, Solana, Sui, BNB, Avalanche, and emerging Layer-1 momentum leaders.",
    automatedCadence: "Daily Close Scan",
    liveHeadline: "SOL/ETH Ratio Hits 6-Month High as Capital Rotates into High-Beta Layer-1s"
  },
  {
    id: "meme-velocity",
    name: "Meme Coins & High-Beta Momentum",
    shortLabel: "Meme Coins",
    badge: "High-Beta",
    icon: Radio,
    category: "Altcoins",
    description: "Order book imbalance alerts and social volume spikes on DOGE, PEPE, SHIB, WIF, and high-velocity speculative tokens.",
    automatedCadence: "Instant Alert on 3x Volume Spikes",
    liveHeadline: "PEPE/USDT 24h Volume Spikes +180% with Institutional Iceberg Bids"
  },
  {
    id: "cpi-fed",
    name: "US CPI & Federal Reserve Volatility",
    shortLabel: "US CPI & Fed",
    badge: "BLS CPI",
    icon: Landmark,
    category: "Macro",
    description: "Bureau of Labor Statistics (BLS) CPI inflation forecast models, Core CPI scenario playbooks, and instant FOMC rate cut odds.",
    automatedCadence: "Monthly Pre-CPI & Live Reaction",
    liveHeadline: "Core CPI Projected at 3.02% YoY — Fed 50bps Cut Odds Surge to 78%"
  },
  {
    id: "funding-arbitrage",
    name: "Funding Rate & Cash-and-Carry APY",
    shortLabel: "Funding & Yields",
    badge: "15%-45% APY",
    icon: Percent,
    category: "Derivatives",
    description: "Delta-neutral basis arbitrage rankings, annualized cash-and-carry yields, and negative funding short squeeze radars.",
    automatedCadence: "Daily 08:00 UTC Ranking",
    liveHeadline: "Cross-Exchange Basis Spread: Short Bybit at +0.025% vs Long dYdX at +0.007%"
  }
];

const PERSONA_PRESETS = [
  {
    id: "all",
    label: "👑 All-in-One Pro",
    desc: "All 8 automated research streams",
    topics: ["macro-cycles", "whale-alerts", "ai-signals", "coinglass-squeezes", "altcoin-breakouts", "meme-velocity", "cpi-fed", "funding-arbitrage"]
  },
  {
    id: "daytrader",
    label: "⚡ Day & Scalp Trader",
    desc: "AI signals, Whale blocks & Squeezes",
    topics: ["ai-signals", "whale-alerts", "coinglass-squeezes", "meme-velocity"]
  },
  {
    id: "institutional",
    label: "🏦 Macro & Institutional",
    desc: "Fed policy, CPI, Whales & Yields",
    topics: ["macro-cycles", "cpi-fed", "whale-alerts", "funding-arbitrage"]
  },
  {
    id: "altcoins",
    label: "🚀 Altcoin Hunter",
    desc: "L1 rotations, Squeezes & Memes",
    topics: ["altcoin-breakouts", "coinglass-squeezes", "ai-signals", "meme-velocity"]
  }
];

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    "macro-cycles",
    "whale-alerts",
    "ai-signals",
    "coinglass-squeezes"
  ]);
  const [frequency, setFrequency] = useState<"INSTANT" | "DAILY_DIGEST" | "WEEKLY_ROUNDUP">("INSTANT");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [responseDetails, setResponseDetails] = useState<any>(null);
  const [showTopicDrawer, setShowTopicDrawer] = useState(false);
  const [previewTopic, setPreviewTopic] = useState<NewsletterTopic | null>(null);

  // Sync / Load saved preferences from localStorage on mount
  useEffect(() => {
    try {
      const savedSub = localStorage.getItem("bitcoincrypto_newsletter_sub");
      if (savedSub) {
        const parsed = JSON.parse(savedSub);
        if (parsed && parsed.email) {
          setEmail(parsed.email);
          if (Array.isArray(parsed.topics) && parsed.topics.length > 0) {
            setSelectedTopics(parsed.topics);
          }
          if (parsed.frequency) {
            setFrequency(parsed.frequency);
          }
          setStatus("success");
          setResponseDetails({
            isExisting: true,
            subscriber: parsed,
            latestIssue: {
              title: "Stealth Yield Curve Control & Institutional Cycle Dynamics 2026",
              readTime: "8 min read",
              edition: "Issue #142 (Current Edition)"
            }
          });
        }
      }
    } catch (e) {
      // ignore
    }
  }, []);

  const toggleTopic = (tId: string) => {
    setSelectedTopics((prev) => {
      const next = prev.includes(tId)
        ? prev.length > 1
          ? prev.filter((t) => t !== tId)
          : prev
        : [...prev, tId];

      // If already subscribed, automatically sync preferences in the background
      if (status === "success" && email) {
        syncUpdatedTopics(email, next, frequency);
      }
      return next;
    });
  };

  const applyPreset = (presetTopics: string[]) => {
    setSelectedTopics(presetTopics);
    if (status === "success" && email) {
      syncUpdatedTopics(email, presetTopics, frequency);
    }
  };

  const syncUpdatedTopics = async (targetEmail: string, topics: string[], freq: string) => {
    try {
      await fetch("/api/newsletter", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: targetEmail, topics, frequency: freq }),
      });
      localStorage.setItem(
        "bitcoincrypto_newsletter_sub",
        JSON.stringify({
          email: targetEmail,
          topics,
          frequency: freq,
          updatedAt: new Date().toISOString()
        })
      );
    } catch (e) {
      // quiet background sync
    }
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          topics: selectedTopics,
          frequency,
          source: "homepage_newsletter_cta"
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setStatus("error");
        setErrorMessage(data.error || "Failed to subscribe. Please try again.");
        return;
      }

      setStatus("success");
      setResponseDetails(data);

      try {
        localStorage.setItem(
          "bitcoincrypto_newsletter_sub",
          JSON.stringify({
            email,
            topics: selectedTopics,
            frequency,
            id: data.subscriber?.id,
            subscribedAt: new Date().toISOString()
          })
        );
      } catch (err) {
        // storage quota
      }
    } catch (err: any) {
      setStatus("error");
      setErrorMessage("Network error. Please check your internet connection and try again.");
    }
  };

  const resetForm = () => {
    try {
      localStorage.removeItem("bitcoincrypto_newsletter_sub");
    } catch (e) {}
    setEmail("");
    setStatus("idle");
    setResponseDetails(null);
    setErrorMessage("");
  };

  return (
    <section className="py-16 sm:py-20 bg-white dark:bg-slate-950 transition-colors font-sans">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* MAIN GOLD / AMBER GRADIENT NEWSLETTER CARD */}
        <div className="bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-400 rounded-3xl p-6 sm:p-10 lg:p-12 text-center text-slate-950 space-y-6 shadow-2xl shadow-amber-500/20 relative overflow-hidden border border-amber-300">
          
          {/* Subtle Ambient Decorative Sparkles */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-600/20 rounded-full blur-3xl pointer-events-none" />

          {/* Mail Icon Badge */}
          <div className="w-14 h-14 rounded-2xl bg-white text-amber-600 flex items-center justify-center text-xl mx-auto shadow-md shadow-amber-950/10">
            <Mail className="w-7 h-7" />
          </div>

          {/* Main Title & Subtitle */}
          <div className="space-y-2 relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-950">
              Stay Informed with Weekly Crypto Research
            </h2>
            <p className="text-xs sm:text-sm text-amber-950 max-w-2xl mx-auto font-bold leading-relaxed">
              Join thousands of institutional analysts receiving our automated macroeconomic breakdowns, halving cycle metrics, whale orderflow alerts, and AI quantitative trading signals.
            </p>
          </div>

          {/* QUICK PERSONA PRESETS */}
          <div className="relative z-10 max-w-2xl mx-auto space-y-2">
            <div className="text-[11px] font-mono font-black uppercase text-amber-950/80 tracking-wider">
              1. Choose Your Trading Persona or Customize Topics:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {PERSONA_PRESETS.map((p) => {
                const isMatching =
                  p.topics.length === selectedTopics.length &&
                  p.topics.every((t) => selectedTopics.includes(t));

                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => applyPreset(p.topics)}
                    className={`p-2 rounded-xl text-left text-xs font-bold transition border cursor-pointer ${
                      isMatching
                        ? "bg-slate-950 text-white border-slate-950 shadow-md scale-[1.02]"
                        : "bg-white/80 hover:bg-white text-slate-900 border-amber-300/80"
                    }`}
                  >
                    <div className="font-extrabold text-[11px] sm:text-xs truncate">{p.label}</div>
                    <div className="text-[9.5px] opacity-75 font-normal truncate mt-0.5">{p.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 8 DIVERSE AUTOMATED TOPICS GRID (CHECKBOX PILLS) */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-mono font-black uppercase text-amber-950/80 px-1">
              <span>Selected Streams ({selectedTopics.length}/8 Active):</span>
              <button
                type="button"
                onClick={() =>
                  setSelectedTopics(
                    selectedTopics.length === NEWSLETTER_TOPICS.length
                      ? ["macro-cycles", "whale-alerts"]
                      : NEWSLETTER_TOPICS.map((t) => t.id)
                  )
                }
                className="underline hover:text-slate-950 cursor-pointer font-bold"
              >
                {selectedTopics.length === NEWSLETTER_TOPICS.length ? "Deselect All" : "Select All 8"}
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {NEWSLETTER_TOPICS.map((topic) => {
                const Icon = topic.icon;
                const isSelected = selectedTopics.includes(topic.id);

                return (
                  <div
                    key={topic.id}
                    onClick={() => toggleTopic(topic.id)}
                    className={`p-2.5 rounded-2xl text-left border transition-all cursor-pointer select-none flex flex-col justify-between space-y-1.5 shadow-xs ${
                      isSelected
                        ? "bg-slate-950 text-white border-slate-950 ring-1 ring-white/20 shadow-md scale-[1.01]"
                        : "bg-white/85 text-slate-800 border-amber-300/80 hover:bg-white"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-1">
                      <div className="w-6 h-6 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div
                        className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] font-black border shrink-0 ${
                          isSelected
                            ? "bg-amber-400 border-amber-400 text-slate-950"
                            : "bg-white border-slate-300"
                        }`}
                      >
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>

                    <div>
                      <div className="font-extrabold text-[11px] sm:text-xs leading-tight line-clamp-1">
                        {topic.name}
                      </div>
                      <div className="flex items-center justify-between text-[9px] font-mono opacity-80 mt-1">
                        <span className="truncate">{topic.badge}</span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPreviewTopic(topic);
                          }}
                          className="text-amber-500 hover:text-amber-400 font-bold underline shrink-0 ml-1"
                          title="Preview latest live dispatch"
                        >
                          Preview
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SUCCESS STATE */}
          {status === "success" && (
            <div className="max-w-xl mx-auto bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-xl space-y-4 text-left border border-white animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-base font-black text-slate-900">
                      {responseDetails?.isExisting ? "Subscription Active & Updated!" : "You're Officially Subscribed!"}
                    </h4>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                      {selectedTopics.length} Streams Active
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    Automated dispatches for <strong className="text-slate-900 font-mono">{email}</strong> are synchronized with real-time market data. Toggle any topic pill above to update your feeds automatically.
                  </p>
                </div>
              </div>

              {/* Latest Research Edition Download / Read Card */}
              {responseDetails?.latestIssue && (
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs space-y-2">
                  <div className="flex items-center justify-between font-bold text-[11px] text-amber-900">
                    <span className="flex items-center gap-1 font-mono uppercase font-black">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      {responseDetails.latestIssue.edition}
                    </span>
                    <span className="text-slate-500 font-mono">{responseDetails.latestIssue.readTime}</span>
                  </div>
                  <div className="font-black text-slate-900 text-sm">
                    {responseDetails.latestIssue.title}
                  </div>
                  <div className="pt-1 flex items-center justify-between">
                    <Link
                      href="/blog/stealth-yield-curve-control-macro-mechanics-crypto"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-black text-xs transition shadow-sm"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                      <span>Read Macro Whitepaper &rarr;</span>
                    </Link>
                    <span className="text-[10px] font-mono text-emerald-700 font-bold flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" /> Instant Delivery
                    </span>
                  </div>
                </div>
              )}

              {/* Reset button */}
              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 border-t border-slate-100">
                <span className="flex items-center gap-1 text-slate-600 font-semibold font-mono text-[10px]">
                  <span>Frequency:</span>
                  <strong className="text-slate-900">{frequency}</strong>
                </span>
                <button
                  onClick={resetForm}
                  className="text-slate-600 hover:text-slate-900 underline font-semibold"
                >
                  Subscribe another email
                </button>
              </div>
            </div>
          )}

          {/* ACTIVE SUBSCRIPTION FORM */}
          {status !== "success" && (
            <div className="space-y-4 relative z-10 max-w-xl mx-auto">
              
              {/* Frequency Selector */}
              <div className="flex items-center justify-center gap-2 text-xs font-mono font-bold">
                <span className="text-amber-950 font-black">Cadence:</span>
                {[
                  { id: "INSTANT", label: "⚡ Instant Alerts", desc: "Live event triggers" },
                  { id: "DAILY_DIGEST", label: "📅 Daily Digest", desc: "16:00 UTC summary" },
                  { id: "WEEKLY_ROUNDUP", label: "🗓️ Weekly Report", desc: "Tues & Fri roundup" }
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFrequency(f.id as any)}
                    className={`px-2.5 py-1 rounded-xl transition text-[11px] cursor-pointer ${
                      frequency === f.id
                        ? "bg-slate-950 text-white font-black shadow-sm"
                        : "bg-white/80 hover:bg-white text-slate-800"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* Form Input + Button */}
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  disabled={status === "loading"}
                  className="flex-1 bg-white text-slate-900 border-0 rounded-2xl px-4 py-3.5 text-xs sm:text-sm font-medium placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-950 shadow-md"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-black text-white bg-slate-950 hover:bg-slate-900 transition shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0 disabled:opacity-75 hover:scale-[1.02]"
                >
                  {status === "loading" ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe ({selectedTopics.length} Topics)</span>
                      <ArrowRight className="w-4 h-4 text-amber-400" />
                    </>
                  )}
                </button>
              </form>

              {/* Error Message */}
              {status === "error" && (
                <div className="inline-flex items-center gap-1.5 bg-rose-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errorMessage}</span>
                </div>
              )}
            </div>
          )}

          {/* Footer Guarantee */}
          <p className="text-[11px] text-amber-950 font-semibold relative z-10">
            Zero spam. Unsubscribe with 1 click at any time. Direct WebSocket &amp; on-chain pipeline integration.
          </p>

        </div>

        {/* MODAL / DRAWER FOR TOPIC PREVIEW */}
        {previewTopic && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 max-w-lg w-full space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                    <previewTopic.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-black text-sm">{previewTopic.name}</h3>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">{previewTopic.category} • {previewTopic.automatedCadence}</span>
                  </div>
                </div>
                <button
                  onClick={() => setPreviewTopic(null)}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-white font-mono text-xs px-2 py-1 rounded-lg bg-slate-100 dark:bg-slate-800"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs">
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {previewTopic.description}
                </p>

                <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-1">
                  <span className="text-[10px] font-mono uppercase font-black text-amber-800 dark:text-amber-300 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Latest Automated Dispatch Headline:
                  </span>
                  <p className="font-bold text-slate-900 dark:text-white leading-snug">
                    &quot;{previewTopic.liveHeadline}&quot;
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    if (!selectedTopics.includes(previewTopic.id)) {
                      toggleTopic(previewTopic.id);
                    }
                    setPreviewTopic(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-amber-400 text-slate-950 font-black text-xs hover:bg-amber-300 transition"
                >
                  {selectedTopics.includes(previewTopic.id) ? "✓ Stream Selected" : "+ Add Stream"}
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewTopic(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
