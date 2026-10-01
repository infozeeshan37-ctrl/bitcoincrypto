"use client";

import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { Cookie, Shield, CheckCircle2, Settings, ExternalLink, HelpCircle, Mail, ArrowRight } from "lucide-react";

export default function CookiePolicyPage() {
  const lastUpdated = "October 1, 2026";

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-10 sm:py-16 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Cookie Policy", href: "/cookie-policy" },
          ]}
        />

        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
            <Cookie className="w-3.5 h-3.5 text-amber-400" />
            <span>EU ePrivacy &amp; GDPR Cookie Standards</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Cookie Policy
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            This Cookie Policy explains what cookies and tracking technologies are, how <strong>BitcoinCrypto.tech</strong> uses them, how third parties (including <strong>Google AdSense</strong>) use them, and how you can manage your preferences.
          </p>
          <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
            <strong>Last Revised:</strong> {lastUpdated} • Read in conjunction with our <Link href="/privacy" className="text-amber-400 hover:underline">Privacy Policy</Link>.
          </div>
        </div>

        {/* Main Content Body */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>1. What Are Cookies?</span>
            </h2>
            <p>
              Cookies are small text files that are stored on your computer or mobile device when you visit a website. They are widely used to make websites work efficiently, enhance user experience, remember preferences, and provide analytical or advertising information to website operators.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Settings className="w-5 h-5 text-amber-500" />
              <span>2. Categories of Cookies We Use</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <strong className="text-slate-900 dark:text-white text-xs font-bold block">1. Strictly Necessary Cookies</strong>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Essential for browsing the website and using its features, such as navigating between trading tools and remembering session tokens.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <strong className="text-slate-900 dark:text-white text-xs font-bold block">2. Functional &amp; Preference Cookies</strong>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Remembers choices you make (such as Dark/Light theme mode, UI accent colors, favorite trading pairs, and demo wallet settings).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <strong className="text-slate-900 dark:text-white text-xs font-bold block">3. Analytics &amp; Performance Cookies</strong>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Collects anonymous data on how visitors interact with the site (e.g., most visited tools, page load times, error diagnostics).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <strong className="text-slate-900 dark:text-white text-xs font-bold block">4. Advertising &amp; Google AdSense Cookies</strong>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Used by Google and third-party advertising partners to serve relevant advertisements to users based on prior browsing history across the web.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Cookie className="w-5 h-5 text-amber-500" />
              <span>3. Google AdSense &amp; DART Advertising Cookies</span>
            </h2>
            <p>
              We use <strong>Google AdSense</strong> to display advertisements on BitcoinCrypto.tech. Google&apos;s use of the DoubleClick DART cookie enables it and its partners to serve targeted ads based on your visit to this site and other websites:
            </p>
            <p>
              You may opt out of personalized advertising by visiting the <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-amber-600 dark:text-amber-400 font-bold hover:underline inline-flex items-center gap-1">Google Ads Settings portal <ArrowRight className="w-3 h-3" /></a> or by using the <a href="https://optout.networkadvertising.org" target="_blank" rel="noopener noreferrer" className="text-amber-600 dark:text-amber-400 font-bold hover:underline inline-flex items-center gap-1">NAI Consumer Opt-Out <ArrowRight className="w-3 h-3" /></a>.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Shield className="w-5 h-5 text-blue-500" />
              <span>4. How to Control and Delete Cookies in Your Browser</span>
            </h2>
            <p>
              Most web browsers allow you to manage or block cookies through their settings. You can set your browser to refuse all cookies or alert you when a cookie is being sent:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-300">
              <li><strong>Google Chrome:</strong> Settings &rarr; Privacy and security &rarr; Cookies and other site data.</li>
              <li><strong>Mozilla Firefox:</strong> Options &rarr; Privacy &amp; Security &rarr; Enhanced Tracking Protection.</li>
              <li><strong>Apple Safari:</strong> Preferences &rarr; Privacy &rarr; Prevent cross-site tracking.</li>
              <li><strong>Microsoft Edge:</strong> Settings &rarr; Privacy, search, and services &rarr; Tracking prevention.</li>
            </ul>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              <em>Note: Disabling necessary cookies may affect the functioning of certain visual themes or custom simulator preferences on our website.</em>
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-amber-500" />
              <span>5. Contact Our Privacy Desk</span>
            </h2>
            <p>
              If you have any questions regarding our use of cookies, please contact us at <a href="mailto:infozeeshan37@gmail.com" className="text-amber-600 dark:text-amber-400 font-mono font-bold hover:underline">infozeeshan37@gmail.com</a> or visit our <Link href="/contact" className="text-amber-600 dark:text-amber-400 font-bold hover:underline">Contact Page</Link>.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
