"use client";

import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { FileText, ShieldAlert, Scale, CheckCircle2, Lock, Terminal, HelpCircle, Mail } from "lucide-react";

export default function TermsOfServicePage() {
  const lastUpdated = "October 1, 2026";

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-10 sm:py-16 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Terms of Service", href: "/terms" },
          ]}
        />

        {/* Hero Section */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            <span>Legal Agreement &amp; User Conduct</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Terms of Service
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Welcome to <strong>BitcoinCrypto.tech</strong>. These Terms of Service (&quot;Terms&quot;) govern your access to and use of the website, software widgets, AI price prediction tools, and quantitative research published on BitcoinCrypto.tech.
          </p>
          <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
            <strong>Last Revised:</strong> {lastUpdated} • Binding on all users worldwide.
          </div>
        </div>

        {/* Main Content Body */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              <span>1. Agreement to Terms</span>
            </h2>
            <p>
              By accessing, browsing, or using BitcoinCrypto.tech, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service, our <Link href="/privacy" className="text-amber-600 dark:text-amber-400 hover:underline">Privacy Policy</Link>, and our <Link href="/disclaimer" className="text-amber-600 dark:text-amber-400 hover:underline">Financial Disclaimer</Link>. If you do not agree to these Terms, you are prohibited from using or accessing this site.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              <span>2. Informational &amp; Analytical Purpose Only</span>
            </h2>
            <p>
              All software tools, AI price predictions, Coinglass liquidation charts, orderbook imbalance metrics, macroeconomic CPI forecasts, and educational articles provided on BitcoinCrypto.tech are for <strong>general informational and analytical purposes only</strong>.
            </p>
            <p>
              Nothing on this website constitutes professional financial advice, investment advice, trading recommendations, tax advice, or legal counsel. For detailed disclosures, please review our <Link href="/disclaimer" className="text-amber-600 dark:text-amber-400 font-bold hover:underline">Financial Disclaimer</Link>.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-blue-500" />
              <span>3. Simulated Paper Wallets &amp; Virtual Gamification</span>
            </h2>
            <p>
              BitcoinCrypto.tech provides virtual paper trading simulation tools (including a simulated $10,000 USDT demo wallet) and binary 5-minute prediction arenas.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-300">
              <li><strong>Zero Real-World Fiat/Crypto Deposits:</strong> We do not accept, hold, custody, or transmit real fiat currency or cryptocurrency tokens. All demo wallet balances are purely virtual simulations stored locally on your device.</li>
              <li><strong>No Real-World Monetary Value:</strong> Virtual demo balances cannot be withdrawn, redeemed, exchanged, or converted into any real-world asset or currency.</li>
              <li><strong>Educational Practice:</strong> Simulated results do not reflect real market conditions such as slippage, exchange counterparty risk, and liquidity constraints.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-5 h-5 text-purple-500" />
              <span>4. Intellectual Property Rights</span>
            </h2>
            <p>
              Unless otherwise indicated, the website, source code, UI designs, quantitative algorithms, branding, logos, and written research papers on BitcoinCrypto.tech are our proprietary property and are protected by copyright and trademark laws.
            </p>
            <p>
              You are granted a limited license to access and make personal, non-commercial use of the platform. You may cite and link to our research and tools provided that appropriate attribution and a canonical backlink to <code className="font-mono text-slate-900 dark:text-white">https://www.bitcoincrypto.tech</code> is included.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-cyan-500" />
              <span>5. Prohibited User Activities</span>
            </h2>
            <p>You agree not to engage in any of the following prohibited activities:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-300">
              <li>Attempting to interfere with, compromise the system integrity, or decipher any transmissions to or from the servers running the website.</li>
              <li>Using automated scraping, bots, or rate-abusive tools that impair the accessibility of our real-time WebSocket feeds for other users (with the exception of compliant search engine and LLM indexers adhering to <code className="font-mono">/llms.txt</code> and <code className="font-mono">/robots.txt</code>).</li>
              <li>Using the platform for any illegal purpose or in violation of any local, state, national, or international law.</li>
            </ul>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-rose-500" />
              <span>6. Limitation of Liability</span>
            </h2>
            <p>
              To the maximum extent permitted by applicable law, in no event shall BitcoinCrypto.tech, its operators, creators, affiliates, or contributors be liable for any indirect, punitive, incidental, special, consequential, or exemplary damages, including without limitation damages for loss of profits, goodwill, use, data, or other intangible losses arising out of or relating to the use of, or inability to use, this service.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-amber-500" />
              <span>7. Contact Information</span>
            </h2>
            <p>
              For any questions regarding these Terms of Service, please contact our legal desk:
            </p>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-mono text-xs space-y-1">
              <div><strong>Email:</strong> <a href="mailto:infozeeshan37@gmail.com" className="text-amber-600 dark:text-amber-400 hover:underline">infozeeshan37@gmail.com</a></div>
              <div><strong>Website:</strong> <Link href="/" className="text-amber-600 dark:text-amber-400 hover:underline">https://www.bitcoincrypto.tech</Link></div>
              <div><strong>Support Desk:</strong> <Link href="/contact" className="text-amber-600 dark:text-amber-400 hover:underline">https://www.bitcoincrypto.tech/contact</Link></div>
            </div>
          </section>

        </div>

      </div>
    </div>
  );
}
