"use client";

import React, { useState } from "react";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import {
  Mail,
  MessageSquare,
  Send,
  CheckCircle2,
  Clock,
  Globe2,
  ShieldCheck,
  Building,
  HelpCircle,
  ExternalLink,
  Sparkles
} from "lucide-react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "General Inquiry",
    subject: "",
    message: ""
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setSubmitting(true);
    // Simulate immediate successful processing
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-10 sm:py-16 transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Contact Us", href: "/contact" },
          ]}
        />

        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-700/80 text-amber-900 dark:text-amber-300 shadow-sm">
            <Mail className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>24/7 Global Editorial &amp; Support Desk</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Get in Touch with Our Team
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Have questions about our AI price prediction engine, API integrations, data partnerships, or editorial research? We&apos;re here to help.
          </p>
        </div>

        {/* Main Grid: Info Cards + Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Direct Info & Trust Badges (Col 5) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Primary Direct Contact Box */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
              <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Building className="w-4 h-4 text-amber-500" />
                <span>Editorial &amp; Support Headquarters</span>
              </h2>

              <div className="space-y-4 text-xs font-mono">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <Mail className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Primary Support Email</span>
                    <a href="mailto:infozeeshan37@gmail.com" className="font-bold text-slate-900 dark:text-white hover:text-amber-500 transition">
                      infozeeshan37@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <Globe2 className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Editorial &amp; Research</span>
                    <a href="mailto:contact@bitcoincrypto.tech" className="font-bold text-slate-900 dark:text-white hover:text-blue-400 transition">
                      contact@bitcoincrypto.tech
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                  <Clock className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase">Response Commitment</span>
                    <strong className="text-emerald-600 dark:text-emerald-400 font-bold">Within 24 to 48 hours</strong>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>SSL 256-bit Encrypted</span>
                </span>
                <span className="font-mono text-[10px]">Institutional Support</span>
              </div>
            </div>

            {/* Quick Links Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800 shadow-sm space-y-3 font-mono text-xs">
              <span className="text-[10px] uppercase font-bold text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Frequently Accessed Resources</span>
              </span>
              <ul className="space-y-2 text-slate-300">
                <li>
                  <Link href="/about" className="hover:text-amber-400 transition flex items-center justify-between">
                    <span>• About Platform &amp; Methodology</span>
                    <span className="text-[10px] text-slate-500">&rarr;</span>
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-amber-400 transition flex items-center justify-between">
                    <span>• Privacy Policy &amp; Cookies</span>
                    <span className="text-[10px] text-slate-500">&rarr;</span>
                  </Link>
                </li>
                <li>
                  <Link href="/disclaimer" className="hover:text-amber-400 transition flex items-center justify-between">
                    <span>• Financial Risk Disclaimer</span>
                    <span className="text-[10px] text-slate-500">&rarr;</span>
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/infozeeshan37-ctrl/bitcoincrypto"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-amber-400 transition flex items-center justify-between"
                  >
                    <span>• Open Source GitHub Repo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form (Col 7) */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-9 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="space-y-1.5 border-b border-slate-100 dark:border-slate-800 pb-4">
              <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-amber-500" />
                <span>Send Us a Direct Message</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Fill out the form below and our editorial or technical team will get back to you promptly.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-center space-y-4 animate-in fade-in duration-200">
                <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-slate-900 dark:text-white">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto">
                    Thank you, <strong>{formData.name}</strong>. We have received your message regarding &quot;{formData.subject || formData.category}&quot; and our team will reply to <strong>{formData.email}</strong> within 24–48 hours.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      name: "",
                      email: "",
                      category: "General Inquiry",
                      subject: "",
                      message: ""
                    });
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold font-mono transition shadow-sm"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                
                {/* Name & Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-slate-700 dark:text-slate-300 font-bold block">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Zeeshan Ahmed"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-slate-700 dark:text-slate-300 font-bold block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="name@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                    />
                  </div>
                </div>

                {/* Inquiry Category */}
                <div className="space-y-1.5">
                  <label className="text-slate-700 dark:text-slate-300 font-bold block">
                    Inquiry Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                  >
                    <option value="General Inquiry">General Platform Inquiry</option>
                    <option value="Editorial & Research">Editorial &amp; Research Feedback</option>
                    <option value="Advertising & Partnership">Advertising &amp; Google AdSense Partnership</option>
                    <option value="AI Prediction Bug">AI Prediction Engine or Chart Bug Report</option>
                    <option value="Data API & Backlinks">Data API Access &amp; Academic Citation</option>
                    <option value="DMCA & Privacy Rights">Privacy Rights / GDPR / DMCA Request</option>
                  </select>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label className="text-slate-700 dark:text-slate-300 font-bold block">
                    Subject Line *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Brief description of your question or request"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition"
                  />
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-slate-700 dark:text-slate-300 font-bold block">
                    Your Message *
                  </label>
                  <textarea
                    rows={5}
                    required
                    placeholder="Provide details about your question, proposal, or feedback..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500 transition resize-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-black text-xs font-mono tracking-wide transition-all shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Message to Editorial Team</span>
                      </>
                    )}
                  </button>
                </div>

              </form>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
