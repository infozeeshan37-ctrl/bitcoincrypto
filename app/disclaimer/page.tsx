"use client";

import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import { AlertTriangle, ShieldCheck, Flame, Scale, TrendingDown, HelpCircle, Mail, Ban, Brain, Coins, BookOpen, Landmark } from "lucide-react";

export default function DisclaimerPage() {
  const lastUpdated = "October 11, 2026";

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950 py-10 sm:py-16 transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Educational & Financial Disclaimer", href: "/disclaimer" },
          ]}
        />

        {/* Hero Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-amber-950/30 to-slate-900 text-white rounded-3xl p-6 sm:p-10 border border-amber-500/30 shadow-xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            <ShieldCheck className="w-4 h-4 text-amber-400" />
            <span>Strictly Educational Purpose • Zero Betting • No Investment Solicitation</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
            Educational, Risk &amp; Non-Betting Disclaimer
          </h1>
          <p className="text-slate-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
            Please read this comprehensive disclaimer carefully before using <strong>BitcoinCrypto.tech</strong>. This platform is exclusively designed for <strong>educational, analytical, and quantitative research purposes</strong>. All predictive models are strictly based on <strong>Technical and Fundamental Analysis</strong>.
          </p>
          <div className="text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
            <span><strong>Last Updated:</strong> {lastUpdated}</span>
            <span>Google AdSense &amp; Financial Compliance Standard</span>
          </div>
        </div>

        {/* Main Content Body */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">

          {/* Section 1: Strictly Educational Purpose */}
          <section className="space-y-3 p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-500" />
              <span>1. Strictly Educational &amp; Research Platform</span>
            </h2>
            <p className="font-bold text-slate-900 dark:text-white">
              BitcoinCrypto.tech is an independent software research and cryptocurrency analytics laboratory. The platform is operated solely for educational instruction, market microstructure research, and algorithmic demonstration.
            </p>
            <p>
              Nothing published on this website—including AI price predictions, simulated trading bots, Coinglass liquidation heatmaps, order book depth calculators, macroeconomic CPI scenario simulators, or research articles—constitutes financial advice, investment advice, trading recommendations, portfolio management, or a solicitation to buy or sell any asset.
            </p>
            <p>
              We are not registered financial advisors, broker-dealers, investment funds, commodity trading advisors (CTAs), or certified financial planners in any jurisdiction.
            </p>
          </section>

          {/* Section 2: Explicit Non-Betting / No Gambling Declaration */}
          <section className="space-y-3 p-5 rounded-2xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Ban className="w-5 h-5 text-rose-500" />
              <span>2. Zero Betting, Gambling, or Wagering Policy (Not a Betting Site)</span>
            </h2>
            <p className="font-bold text-slate-900 dark:text-white">
              BitcoinCrypto.tech is NOT a betting site, gambling platform, online casino, sportsbook, or binary options bookmaker.
            </p>
            <ul className="list-disc pl-5 space-y-2 text-slate-600 dark:text-slate-300">
              <li>
                <strong>No Real-Money Wagers:</strong> We do not accept bets, wagers, stakes, or financial gambles of any kind. No real-world monetary compensation, payout, or gambling winnings are distributed.
              </li>
              <li>
                <strong>No Real Money Deposits:</strong> We do not accept, collect, custody, or manage user deposits in fiat currencies (e.g., USD, EUR) or cryptocurrencies (e.g., BTC, USDT, ETH).
              </li>
              <li>
                <strong>Simulated Paper Trading Only:</strong> Any interactive simulation tools, next-candle forecasting modules, or demo balance displays are strictly virtual paper-trading exercises designed to teach algorithmic modeling. Virtual balances hold <strong>zero monetary value</strong> and cannot be redeemed, withdrawn, or exchanged.
              </li>
            </ul>
          </section>

          {/* Section 3: Technical & Fundamental Analysis Methodology */}
          <section className="space-y-3 p-5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/60">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Brain className="w-5 h-5 text-blue-500" />
              <span>3. Methodology: 100% Technical &amp; Fundamental Analysis</span>
            </h2>
            <p>
              All predictive models, volatility channels, and algorithmic indicators on BitcoinCrypto.tech are formulated strictly from empirical mathematical and economic disciplines:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-black text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                  <Scale className="w-4 h-4 text-blue-500" /> Technical Analysis Pillars
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  Level-2 Order Book Bid/Ask Imbalance, Cumulative Volume Delta (CVD), Relative Strength Index (RSI), Moving Average Convergence Divergence (MACD), Bollinger Bands, Exponential Moving Averages (EMA 9/21/50/200), and historical support/resistance levels.
                </p>
              </div>
              <div className="p-3.5 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="font-black text-slate-900 dark:text-white text-xs flex items-center gap-1.5">
                  <Landmark className="w-4 h-4 text-emerald-500" /> Fundamental Analysis Pillars
                </span>
                <p className="text-[11px] text-slate-600 dark:text-slate-300">
                  Official US Bureau of Labor Statistics (BLS) CPI inflation schedules, Federal Reserve FOMC interest rate probabilities, on-chain active addresses, network transaction fees, total value locked (TVL), and supply schedule tokenomics.
                </p>
              </div>
            </div>
            <p className="pt-2 text-[11px] text-slate-500 dark:text-slate-400">
              *While these quantitative methods model historical market behaviors, <strong>no mathematical model can guarantee future market price action</strong>. Unexpected macroeconomic surprises, regulatory announcements, and liquidity shocks can invalidate any projection instantaneously.
            </p>
          </section>

          {/* Section 4: No Investment Offering or Custody */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Coins className="w-5 h-5 text-purple-500" />
              <span>4. No Investment Offering, Brokerage, or Fund Management</span>
            </h2>
            <p>
              BitcoinCrypto.tech does not offer or sell investment products, managed accounts, staking pools, yield generation programs, or high-yield investment programs (HYIPs). We do not execute trades on behalf of users, nor do we partner with or endorse any unregulated brokerages.
            </p>
            <p>
              Users are solely responsible for their own trading decisions and any execution conducted on independent external exchanges.
            </p>
          </section>

          {/* Section 5: High-Risk Nature of Cryptocurrency */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-500" />
              <span>5. High-Risk Nature of Cryptocurrency &amp; Derivatives Markets</span>
            </h2>
            <p>
              Trading digital assets, perpetual futures, and leveraged tokens involves substantial financial risk and is not suitable for all investors. Prices are highly volatile and can fluctuate dramatically within minutes:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-300">
              <li>Never trade or risk capital that you cannot afford to lose entirely.</li>
              <li>Leveraged perpetual futures can lead to total liquidation and the total loss of all collateral.</li>
              <li>Past backtesting results, simulated accuracy scores, and historical price patterns do not guarantee future returns.</li>
            </ul>
          </section>

          {/* Section 6: Third-Party Market Data */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span>6. Data Latency &amp; Third-Party API Feeds</span>
            </h2>
            <p>
              BitcoinCrypto.tech aggregates public market data via WebSocket connections and REST APIs from primary venues including Binance, Coinbase, OKX, Bybit, Coinglass, and CoinMarketCap.
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600 dark:text-slate-300">
              <li>We do not warrant the absolute completeness, uptime, or error-free transmission of third-party exchange data.</li>
              <li>Network latency, API rate limits, or exchange maintenance may cause temporary variances in quotes or orderbook depth.</li>
              <li>Users must independently verify real-time price quotes directly on their execution exchange before making trades.</li>
            </ul>
          </section>

          {/* Section 7: User Sole Responsibility */}
          <section className="space-y-3">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-rose-500" />
              <span>7. User Responsibility &amp; Professional Advice</span>
            </h2>
            <p>
              You acknowledge and agree that any financial decisions made by you are solely your own responsibility. Before making any investment, you should consult an independent, qualified financial advisor, tax accountant, and legal counsel licensed in your jurisdiction.
            </p>
          </section>

          {/* Section 8: Contact */}
          <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-amber-500" />
              <span>8. Questions &amp; Inquiries</span>
            </h2>
            <p>
              If you have any questions regarding these educational disclaimers or compliance terms, please contact our team at <a href="mailto:infozeeshan37@gmail.com" className="text-amber-600 dark:text-amber-400 font-mono font-bold hover:underline">infozeeshan37@gmail.com</a> or via our <Link href="/contact" className="text-amber-600 dark:text-amber-400 font-bold hover:underline">Contact Page</Link>.
            </p>
          </section>

        </div>

      </div>
    </div>
  );
}
