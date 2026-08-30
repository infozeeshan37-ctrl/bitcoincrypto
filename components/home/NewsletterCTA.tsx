"use client";

import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";

export default function NewsletterCTA() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="py-20 bg-white dark:bg-slate-950 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-gradient-to-tr from-amber-500 to-amber-400 rounded-3xl p-8 sm:p-12 text-center text-slate-950 space-y-6 shadow-xl shadow-amber-500/10">
          
          <div className="w-12 h-12 rounded-2xl bg-white text-amber-600 flex items-center justify-center text-xl mx-auto shadow-sm">
            <Mail className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Stay Informed with Weekly Crypto Research
            </h2>
            <p className="text-sm text-amber-950 max-w-lg mx-auto font-medium">
              Join thousands of analysts receiving our weekly macroeconomic breakdowns, halving cycle metrics, and on-chain liquidity updates.
            </p>
          </div>

          {submitted ? (
            <div className="inline-flex items-center gap-2 bg-white px-5 py-3 rounded-xl text-xs font-bold text-emerald-700 shadow">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Thank you for subscribing! We have sent our latest market report to your inbox.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="max-w-md mx-auto flex flex-col sm:flex-row gap-2"
            >
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                className="flex-1 bg-white text-slate-900 border-0 rounded-xl px-4 py-3 text-xs placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900"
              />
              <button
                type="submit"
                className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-slate-950 hover:bg-slate-900 transition shadow"
              >
                Subscribe Free
              </button>
            </form>
          )}

          <p className="text-[11px] text-amber-950 font-medium">
            Zero spam. Unsubscribe with 1 click at any time.
          </p>

        </div>

      </div>
    </section>
  );
}
