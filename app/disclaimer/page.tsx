"use client";

import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { AlertTriangle, ShieldCheck, Flame, Scale, TrendingDown, HelpCircle, Mail } from "lucide-react";

export default function DisclaimerPage() {
  const lastUpdated = "October 1, 2026";

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-10 sm:py-16 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Financial Disclaimer", href: "/disclaimer" },
          ]}
        />

        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-rose-950/40 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-rose-500/30 shadow-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
            <span>Important Risk &amp; Financial Disclosures</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Financial &amp; Investment Disclaimer
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Please read this Financial &amp; Risk Disclaimer carefully before using any tools, AI price predictions, liquidation heatmaps, or market analysis on <strong>BitcoinCrypto.tech</strong>.
          </p>
          <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800">
            <strong>Last Updated:</strong> {lastUpdated} • Compliance Standard for YMYL &amp; Financial Content.
          </div>
        </div>

        {/* Main Content Body */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">

          {/* Section 1 */}
          <section className="space-y-3 p-5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-rose-500" />
              <span>1. Not Financial, Investment, or Trading Advice</span>
            </h2>
            <p className="font-bold text-slate-900 dark:text-white">
              BitcoinCrypto.tech is an independent quantitative research, mathematical modeling, and cryptocurrency data analytics software platform.
            </p>
            <p>
              The content published on this website—including but not limited to AI neural price predictions, 5-minute binary arena signals, Coinglass derivatives open interest charts, order book bid/ask depth calculations, macroeconomic CPI scenario simulators, and research articles—is provided solely for <strong>educational, analytical, and informational purposes</strong>.
            </p>
            <p>
              No information on this site should be construed as an offer, recommendation, solicitation, or endorsement to buy, sell, or hold any cryptocurrency, token, digital asset, security, derivative contract, or financial instrument. We are not registered financial advisors, broker-dealers, investment managers, or commodity trading advisors (CTAs) in any jurisdiction.
            </p>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500" />
              <span>2. High-Risk Nature of Cryptocurrency &amp; Derivatives Markets</span>
            </h2>
            <p>
              Trading digital assets, perpetual futures contracts, leveraged tokens, and cryptocurrencies carries an extremely high level of financial risk. Prices of cryptocurrencies are highly volatile and can fluctuate dramatically within seconds due to market sentiment, macroeconomic surprises, regulatory developments, and liquidity shifts:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-300">
              <li>You should never trade or invest money that you cannot afford to lose entirely.</li>
              <li>Leveraged derivatives (such as 5x, 10x, 20x perpetual contracts) can lead to the total liquidation and loss of your entire margin capital in a matter of seconds.</li>
              <li>Past performance, historical backtesting results, and AI accuracy metrics are <strong>not indicative of future results</strong>.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-blue-500" />
              <span>3. AI Machine Learning &amp; Algorithmic Modeling Disclosures</span>
            </h2>
            <p>
              Our DeepQuant AI neural engine and price prediction models utilize statistical probabilities, technical momentum indicators (RSI, MACD, Bollinger Bands), cumulative volume delta (CVD), and order book imbalance algorithms.
            </p>
            <p>
              While our algorithms are calibrated against historical exchange order flows, <strong>no automated algorithm or mathematical model can guarantee future market direction</strong>. Black swan events, unexpected regulatory actions, and sudden exchange de-peggings can invalidate any quantitative forecast instantaneously.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span>4. Data Latency &amp; Third-Party API Feeds</span>
            </h2>
            <p>
              BitcoinCrypto.tech aggregates data from various public and third-party WebSocket feeds and REST APIs (including Binance, Coinbase, OKX, Bybit, Coinglass, and CoinMarketCap). While we strive for maximum precision and sub-second updates:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-300">
              <li>We do not warrant the absolute accuracy, completeness, timeliness, or reliability of third-party exchange data.</li>
              <li>Network latency, API rate limits, or exchange downtime may cause momentary delays in orderbook depth and price quotes.</li>
              <li>Users must independently verify all pricing, orderbook depths, and funding rates directly on their chosen execution venue before placing any real trades.</li>
            </ul>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-purple-500" />
              <span>5. User Sole Responsibility &amp; Professional Advice</span>
            </h2>
            <p>
              You acknowledge and agree that any investment or trading decisions made by you are solely your own responsibility. Before making any financial commitments, you should seek independent advice from a certified financial planner, tax advisor, or legal professional licensed in your jurisdiction.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-amber-500" />
              <span>6. Questions &amp; Support</span>
            </h2>
            <p>
              If you have any questions regarding these risk disclosures, please reach out to our team at <a href="mailto:infozeeshan37@gmail.com" className="text-amber-600 dark:text-amber-400 font-mono font-bold hover:underline">infozeeshan37@gmail.com</a> or via our <Link href="/contact" className="text-amber-600 dark:text-amber-400 font-bold hover:underline">Contact Page</Link>.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
