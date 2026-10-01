"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, ShieldCheck, X, Settings } from "lucide-react";

export default function CookieConsentBanner() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    const consent = localStorage.getItem("btc_cookie_consent");
    if (!consent) {
      // Delay appearance slightly for smooth UX
      const timer = setTimeout(() => {
        setVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem("btc_cookie_consent", "all");
    localStorage.setItem("btc_cookie_consent_date", new Date().toISOString());
    setVisible(false);
  };

  const handleDeclineOptional = () => {
    localStorage.setItem("btc_cookie_consent", "essential_only");
    localStorage.setItem("btc_cookie_consent_date", new Date().toISOString());
    setVisible(false);
  };

  if (!mounted || !visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-md z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-xl text-white p-5 rounded-3xl border border-slate-800 shadow-2xl shadow-black/40 space-y-4 font-mono text-xs">
        
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-bold shrink-0">
              <Cookie className="w-4 h-4" />
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-white font-sans tracking-tight">
                Cookie &amp; Privacy Choices
              </h4>
              <span className="text-[10px] text-amber-400 font-bold uppercase">
                GDPR &amp; Google AdSense Compliant
              </span>
            </div>
          </div>
          <button
            onClick={handleDeclineOptional}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition"
            aria-label="Close cookie banner"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-slate-300 text-[11px] leading-relaxed">
          We use cookies and third-party advertising partners (including <strong>Google AdSense</strong>) to deliver personalized content, analyze website traffic, and store your demo simulator settings. Learn more in our{" "}
          <Link href="/privacy" className="text-amber-400 hover:underline font-bold">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/cookie-policy" className="text-amber-400 hover:underline font-bold">
            Cookie Policy
          </Link>.
        </p>

        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <button
            onClick={handleAcceptAll}
            className="flex-1 py-2 px-3.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition shadow-md shadow-amber-400/20 text-center"
          >
            Accept All Cookies
          </button>
          <button
            onClick={handleDeclineOptional}
            className="py-2 px-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs transition text-center border border-slate-700"
          >
            Essential Only
          </button>
        </div>

      </div>
    </div>
  );
}
