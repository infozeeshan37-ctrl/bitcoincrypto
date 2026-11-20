import React from "react";
import Link from "next/link";
import {
  Brain,
  Layers,
  Activity,
  ShieldCheck,
  TrendingUp,
  Clock,
  HelpCircle,
  ArrowRight,
  AlertTriangle,
  Scale,
  LineChart,
  Cpu,
  BarChart2,
  BookOpen
} from "lucide-react";

export default function PredictionEditorialGuide() {
  const faqs = [
    {
      q: "What is the mathematical methodology behind the 5-Minute and multi-horizon AI price models?",
      a: "Our models combine deterministic quantitative technical indicators with market microstructure signals. Specifically, the algorithms calculate real-time Level-2 Order Book Imbalance (the ratio of resting bid liquidity to ask liquidity within a 1%–2% depth band), Cumulative Volume Delta (CVD) to measure net market taker aggression, 14-period Wilder Smoothed RSI to detect momentum exhaustion, and 14-period Average True Range (ATR) to establish dynamic volatility corridors. These inputs are synthesized across 5-minute, 1-hour, 24-hour, and 7-day forecast horizons with zero lookahead bias."
    },
    {
      q: "Can any AI or algorithmic model guarantee cryptocurrency price movements?",
      a: "No. Anyone claiming guaranteed returns or infallible price forecasting in cryptocurrency is being dishonest. Cryptocurrency markets are inherently non-linear, stochastic, and subject to sudden exogenous shocks—such as regulatory announcements, centralized exchange outages, geopolitical escalations, or unexpected macroeconomic data releases. Our predictions represent probabilistic scenario models designed strictly for educational backtesting and simulated paper trading."
    },
    {
      q: "How does Order Book Imbalance (OBI) indicate directional pressure?",
      a: "Order Book Imbalance (OBI) quantifies the relative thickness between bids and asks: OBI = (Bid Volume - Ask Volume) / (Bid Volume + Ask Volume). When OBI is strongly positive (> +0.30), buyers have stacked deep resting limit orders, absorbing selling pressure and forcing aggressive buyers to push price higher into thin ask liquidity. Conversely, negative OBI signals heavy overhead resistance, increasing the probability of a downward correction."
    },
    {
      q: "How should beginners use these predictions for learning and paper trading?",
      a: "Beginners should never risk real capital based on algorithmic signals. Instead, use our built-in $10,000 USDT virtual demo wallet to paper-trade setups. Study how the predicted target price aligns with technical support/resistance levels, practice setting strict stop-loss orders at calculated invalidation points, and evaluate whether the trade setup maintains at least a 1:2 or 1:3 risk-to-reward ratio before simulating execution."
    },
    {
      q: "What is Walk-Forward Out-of-Sample (OOS) backtesting and why does it matter?",
      a: "Walk-forward optimization tests algorithmic models on unseen historical data that was not used during model training. Many commercial trading bots suffer from 'curve fitting' (optimizing parameters to past noise so they look great historically but fail in real-time). Our quantitative desk evaluates models across rolling 1,000-candle out-of-sample segments to verify that predictive edges persist in changing market regimes (trending, choppy, or high-volatility)."
    },
    {
      q: "Is BitcoinCrypto.tech affiliated with any exchange or financial brokerage?",
      a: "No. BitcoinCrypto.tech is 100% independent. We do not operate an exchange, broker, fund, or trading desk. We do not accept deposits, execute live real-money trades, custody crypto assets, or receive referral compensation for user losses. All platform data feeds are aggregated from publicly available WebSocket and REST APIs for educational and analytical purposes."
    }
  ];

  return (
    <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-12 transition-colors">
      
      {/* Header Banner */}
      <div className="space-y-4 border-b border-slate-100 dark:border-slate-800 pb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold bg-purple-100 dark:bg-purple-950/80 text-purple-900 dark:text-purple-300 border border-purple-200 dark:border-purple-800/80">
          <Brain className="w-3.5 h-3.5 text-purple-500" />
          <span>Quantitative Research &amp; Machine Learning Methodology</span>
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
          How Algorithmic Price Forecasting &amp; Microstructure Models Work
        </h2>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
          Unlike speculative social media commentary, our quantitative forecasting engine operates on deterministic mathematical principles. Below is an exhaustive breakdown of the technical indicators, order flow variables, statistical backtesting benchmarks, and risk-management principles that power our educational predictive suite.
        </p>
      </div>

      {/* 3 Pillars of Algorithmic Confluence */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Pillar 1: Market Microstructure */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-300 flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            1. Level-2 Order Book Imbalance (OBI)
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            By monitoring resting limit order queues in real time across Binance, Bybit, and OKX, the algorithm calculates depth asymmetry. When bid liquidity vastly outstrips ask liquidity within 2% of mark price, it signals institutional limit absorption, providing directional bias for the upcoming 5-minute to 1-hour epochs.
          </p>
        </div>

        {/* Pillar 2: CVD Taker Aggression */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-600 dark:text-amber-300 flex items-center justify-center font-bold">
            <Activity className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            2. Cumulative Volume Delta (CVD) Flow
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Standard price candlesticks obscure whether trades were initiated by buyers or sellers. CVD tracks the running cumulative net of aggressive market buy orders minus market sell orders. Divergences between price direction and CVD flow reveal impending exhaustion tops or accumulation bottoms.
          </p>
        </div>

        {/* Pillar 3: Dynamic Volatility Envelopes */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-300 flex items-center justify-center font-bold">
            <LineChart className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            3. ATR Volatility Corridors &amp; Invalidation
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Price targets and stop-loss levels are never arbitrary numbers. They are dynamically derived using 14-period Average True Range (ATR) multipliers. This ensures that profit targets (TP1, TP2, TP3) and risk invalidation thresholds expand during high-volatility expansions and contract during low-volatility consolidations.
          </p>
        </div>

      </div>

      {/* Step-by-Step Educational Blueprint */}
      <div className="space-y-6 bg-slate-50 dark:bg-slate-800/40 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/60">
            <BookOpen className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>Practical Learning Guide</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Step-by-Step: How to Analyze and Paper-Trade Predictions Responsibly
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Professional quantitative traders treat algorithmic signals as probabilistic hypotheses, not certainty. Follow this 4-step framework when studying prediction data:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
            <div className="w-7 h-7 rounded-full bg-purple-500 text-white font-mono font-black flex items-center justify-center text-xs">
              1
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              Confirm Macro Confluence
            </h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
              Check the broader macroeconomic regime. Is the US CPI release due today? Are CoinGlass liquidation clusters stacked near current price? Never evaluate a single 5-minute candle in isolation from higher timeframes.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
            <div className="w-7 h-7 rounded-full bg-blue-500 text-white font-mono font-black flex items-center justify-center text-xs">
              2
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              Identify Invalidation Level
            </h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
              Every trade idea must have a structural invalidation point. If the model predicts an upward move, locate the nearest support swing-low. If price crosses below that level, the thesis is proven false and position must close.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
            <div className="w-7 h-7 rounded-full bg-emerald-500 text-white font-mono font-black flex items-center justify-center text-xs">
              3
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              Calculate Position Size
            </h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
              Use our <Link href="/tools/position-sizer" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline">Position Sizing Calculator</Link>. Limit your simulated loss to no more than 1% to 1.5% of total virtual capital if your stop-loss is hit.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 shadow-xs">
            <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 font-mono font-black flex items-center justify-center text-xs">
              4
            </div>
            <h4 className="font-bold text-slate-900 dark:text-white text-sm">
              Stage Take-Profit Scaling
            </h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-[11px]">
              Rather than attempting to exit at the absolute peak, professional algorithms scale out in tiers: 50% at TP1 (1.5x risk), 30% at TP2 (2.5x risk), and trail the remaining 20% with a break-even stop to capture runaway trends.
            </p>
          </div>

        </div>
      </div>

      {/* Prominent Educational & Non-Financial Advice Disclaimer */}
      <div className="p-6 rounded-2xl bg-rose-50/80 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-rose-500 shrink-0" />
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
            Mandatory Regulatory &amp; Educational Disclosure (Not Financial Advice)
          </h4>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          The algorithmic models, price targets, directional signals, and indicators displayed on this page are generated solely for <strong>educational research, statistical analysis, and simulated paper-trading demonstrations</strong>. BitcoinCrypto.tech is not a licensed financial advisor, investment broker, or commodity trading advisor. Cryptocurrency assets are subject to extreme market volatility, execution slippage, and systemic risk. Past backtested performance is never indicative of future results. Never risk capital you cannot afford to lose.
        </p>
        <div className="flex flex-wrap items-center gap-3 text-[11px] font-mono text-slate-500 dark:text-slate-400 pt-1">
          <Link href="/disclaimer" className="text-rose-600 dark:text-rose-400 font-bold hover:underline flex items-center gap-1">
            Read Full Financial Risk Disclaimer <ArrowRight className="w-3 h-3" />
          </Link>
          <span>•</span>
          <Link href="/editorial-policy" className="text-slate-600 dark:text-slate-300 hover:underline">
            Editorial &amp; Verification Policy
          </Link>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-6 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="text-center space-y-2">
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Frequently Asked Questions About AI Price Models
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Transparent answers regarding our algorithms, backtesting methodology, and compliance standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-2"
            >
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-purple-500 shrink-0 mt-0.5" />
                <span>{faq.q}</span>
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pl-6">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
}
