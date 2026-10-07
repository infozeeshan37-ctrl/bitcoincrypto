"use client";

import { useState, useEffect } from "react";
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
  Fish
} from "lucide-react";

const AVAILABLE_TOPICS = [
  { id: "Macro Research", label: "Macro & Halving Cycles", icon: Layers },
  { id: "Whale Alerts", label: "Whale Block Alerts", icon: Fish },
  { id: "AI Signals", label: "AI Signal Digest", icon: Zap },
];

export default function NewsletterCTA() {
  const [email, setEmail] = useState("");
  const [selectedTopics, setSelectedTopics] = useState<string[]>([
    "Macro Research",
    "Whale Alerts",
    "AI Signals"
  ]);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [responseDetails, setResponseDetails] = useState<any>(null);

  // Check if user already subscribed in localStorage
  useEffect(() => {
    try {
      const savedSub = localStorage.getItem("bitcoincrypto_newsletter_sub");
      if (savedSub) {
        const parsed = JSON.parse(savedSub);
        if (parsed && parsed.email) {
          setEmail(parsed.email);
          if (Array.isArray(parsed.topics)) {
            setSelectedTopics(parsed.topics);
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
    setSelectedTopics((prev) =>
      prev.includes(tId) ? (prev.length > 1 ? prev.filter((t) => t !== tId) : prev) : [...prev, tId]
    );
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
    <section className="py-16 sm:py-20 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-400 rounded-3xl p-8 sm:p-12 text-center text-slate-950 space-y-6 shadow-2xl shadow-amber-500/20 relative overflow-hidden border border-amber-300">
          
          {/* Subtle Ambient Decorative Sparkles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-600/15 rounded-full blur-2xl pointer-events-none" />

          {/* Mail Icon Badge */}
          <div className="w-14 h-14 rounded-2xl bg-white text-amber-600 flex items-center justify-center text-xl mx-auto shadow-md shadow-amber-950/10">
            <Mail className="w-7 h-7" />
          </div>

          {/* Main Title & Subtitle */}
          <div className="space-y-2 relative z-10">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-slate-950">
              Stay Informed with Weekly Crypto Research
            </h2>
            <p className="text-xs sm:text-sm text-amber-950 max-w-lg mx-auto font-semibold leading-relaxed">
              Join thousands of institutional analysts receiving our weekly macroeconomic breakdowns, halving cycle metrics, and on-chain liquidity updates.
            </p>
          </div>

          {/* SUCCESS STATE */}
          {status === "success" && (
            <div className="max-w-lg mx-auto bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-lg space-y-4 text-left border border-white animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h4 className="text-sm font-black text-slate-900">
                    {responseDetails?.isExisting ? "Subscription Active!" : "You're Officially Subscribed!"}
                  </h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    We have registered <strong className="text-slate-900 font-mono">{email}</strong> to our VIP distribution list.
                  </p>
                </div>
              </div>

              {/* Latest Research Edition Download / Read Card */}
              {responseDetails?.latestIssue && (
                <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs space-y-1.5">
                  <div className="flex items-center justify-between font-bold text-[11px] text-amber-900">
                    <span className="flex items-center gap-1 font-mono uppercase font-black">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      {responseDetails.latestIssue.edition}
                    </span>
                    <span className="text-slate-500 font-mono">{responseDetails.latestIssue.readTime}</span>
                  </div>
                  <div className="font-extrabold text-slate-900 text-xs sm:text-sm">
                    {responseDetails.latestIssue.title}
                  </div>
                  <div className="pt-1">
                    <Link
                      href="/blog/stealth-yield-curve-control-macro-mechanics-crypto"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950 text-white font-bold text-xs hover:bg-slate-800 transition shadow-sm"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Read Full Whitepaper &rarr;</span>
                    </Link>
                  </div>
                </div>
              )}

              {/* Reset button */}
              <div className="flex items-center justify-between pt-1 text-[11px] text-slate-500 border-t border-slate-100">
                <span className="flex items-center gap-1 text-emerald-700 font-semibold font-mono text-[10px]">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified Zero Spam
                </span>
                <button
                  onClick={resetForm}
                  className="text-slate-500 hover:text-slate-900 underline font-medium"
                >
                  Use another email
                </button>
              </div>
            </div>
          )}

          {/* ACTIVE SUBSCRIPTION FORM */}
          {status !== "success" && (
            <div className="space-y-4 relative z-10 max-w-lg mx-auto">
              {/* Optional Topic Pills */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {AVAILABLE_TOPICS.map((topic) => {
                  const Icon = topic.icon;
                  const isChecked = selectedTopics.includes(topic.id);
                  return (
                    <button
                      key={topic.id}
                      type="button"
                      onClick={() => toggleTopic(topic.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs ${
                        isChecked
                          ? "bg-slate-950 text-white font-extrabold"
                          : "bg-white/80 text-slate-800 hover:bg-white"
                      }`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${isChecked ? "text-amber-400" : "text-slate-600"}`} />
                      <span>{topic.label}</span>
                      {isChecked && <Check className="w-3 h-3 text-amber-400" />}
                    </button>
                  );
                })}
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
                  className="px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-black text-white bg-slate-950 hover:bg-slate-900 transition shadow-md flex items-center justify-center gap-2 cursor-pointer shrink-0 disabled:opacity-75"
                >
                  {status === "loading" ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
                      <span>Subscribing...</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe Free</span>
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
            Zero spam. Unsubscribe with 1 click at any time. Delivery every Tuesday &amp; Friday at 08:00 UTC.
          </p>

        </div>

      </div>
    </section>
  );
}
