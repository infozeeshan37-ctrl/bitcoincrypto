import React from "react";
import Link from "next/link";
import {
  Bot,
  Brain,
  Activity,
  ShieldCheck,
  TrendingUp,
  AlertTriangle,
  HelpCircle,
  ArrowRight,
  Layers,
  Cpu,
  BarChart2,
  Scale,
  Zap,
  Target
} from "lucide-react";

export default function AITradingBotEducationalGuide() {
  const faqs = [
    {
      q: "How does the DeepQuant Tri-Pillar AI Signal Engine generate trade setups?",
      a: "The DeepQuant engine requires three independent analytical pillars to reach mathematical confluence before issuing a signal: (1) Technical Momentum (analyzing 1-minute and 5-minute exponential moving average ribbons, 14-period Wilder RSI, and Bollinger Band band-width), (2) Order Book Microstructure (Level-2 bid/ask depth imbalance and Cumulative Volume Delta taker flow to verify aggressive absorption), and (3) Macro Sentiment (real-time US CPI inflation prints, FOMC rate expectations, and institutional ETF net inflows). Only when all three pillars agree does the algorithm generate a directional setup."
    },
    {
      q: "Can this AI Trading Bot guarantee profitable trades?",
      a: "No. Absolutely no algorithm, neural network, or artificial intelligence model can guarantee trading profits. Financial markets are fundamentally stochastic, non-linear systems susceptible to unexpected black-swan events, regulatory announcements, exchange technical failures, and sudden geopolitical shocks. Our AI bot is designed strictly as an educational learning terminal to demonstrate algorithmic confluence and paper-trading principles."
    },
    {
      q: "How should beginners use this tool for learning and paper trading?",
      a: "Beginners should never risk real funds based on automated signals. Instead, use our built-in $10,000 USDT virtual paper-trading demo wallet. When the bot triggers a signal, observe the entry price, study the invalidation stop-loss distance, and monitor how price interacts with the tiered take-profit targets (TP1 at 1.5x risk, TP2 at 2.5x risk, TP3 runner). Record your observations in a trading journal to understand market structure."
    },
    {
      q: "What is the difference between a market order and a limit order in automated trading?",
      a: "Limit orders provide liquidity by resting in the order book at a specified price and paying lower maker fees. Market orders cross the bid/ask spread to execute instantly, consuming liquidity and paying higher taker fees. Our simulated execution engine models realistic 0.04% exchange taker fees and execution slippage to ensure paper-trading backtests remain statistically honest."
    },
    {
      q: "Why are tiered Take-Profit levels (TP1, TP2, TP3) mathematically superior to all-or-nothing exits?",
      a: "Scaling out of positions progressively locks in realized gains while eliminating psychological anxiety. Taking 50% profit at TP1 and moving your stop-loss to break-even ensures that the trade can no longer produce a net loss. This allows the remaining 50% of the position to run risk-free, capturing asymmetric explosive trends if the market breaks out."
    }
  ];

  return (
    <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-10 transition-colors">
      
      {/* Section Header */}
      <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-700/80">
          <Bot className="w-3.5 h-3.5 text-amber-500" />
          <span>Algorithmic Architecture &amp; Educational Methodology</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          How Algorithmic AI Trading Signals Work: An Educational Guide
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
          Learn how institutional algorithmic models process sub-second market data, filter out noise, calculate dynamic risk-to-reward ratios, and execute systematic paper-trading strategies without emotional bias.
        </p>
      </div>

      {/* 3 Pillars of Algorithmic Confluence */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <Activity className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            1. Technical Momentum &amp; Trend Regimes
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            The algorithm evaluates multi-timeframe Exponential Moving Averages (EMA 9, 21, 50, 200) to classify market regime into trending, consolidating, or mean-reverting. A 14-period Wilder Smoothed RSI detects momentum exhaustion before false breakouts occur.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            2. Order Book CVD &amp; Absorption
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Price action alone is insufficient. The engine reads Level-2 Central Limit Order Book (CLOB) depth imbalance and Cumulative Volume Delta (CVD) to confirm that institutional limit walls are absorbing aggressive market selling before signaling a long entry.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center font-bold">
            <Brain className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            3. Dynamic ATR Volatility Corridors
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            Stop-loss and take-profit targets are calculated strictly using 14-period Average True Range (ATR) multipliers. This ensures stop invalidation distances expand naturally during turbulent macro sessions and contract during quiet consolidation phases.
          </p>
        </div>

      </div>

      {/* 4-Step Practical Learning Framework */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700 space-y-6">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            How to Use This AI Terminal for Educational Paper Trading
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Follow this structured 4-step workflow to master algorithmic trading concepts safely:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-mono font-black flex items-center justify-center text-xs">1</span>
            <h4 className="font-bold text-slate-900 dark:text-white text-xs">Inspect Confluence Score</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Verify that the Confluence Score is above 75%. High scores indicate that all technical, order book, and momentum indicators are strictly aligned.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="w-6 h-6 rounded-full bg-blue-500 text-white font-mono font-black flex items-center justify-center text-xs">2</span>
            <h4 className="font-bold text-slate-900 dark:text-white text-xs">Note Invalidation Level</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Locate the Stop-Loss price. Understand why the algorithm placed it beneath structural support. If price breaches that level, the mathematical thesis is invalid.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="w-6 h-6 rounded-full bg-purple-500 text-white font-mono font-black flex items-center justify-center text-xs">3</span>
            <h4 className="font-bold text-slate-900 dark:text-white text-xs">Calculate Position Size</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Use our <Link href="/tools/position-sizer" className="text-purple-600 dark:text-purple-400 font-bold hover:underline">Position Sizer</Link> to ensure that if the simulated stop-loss is hit, the loss never exceeds 1% of your virtual account balance.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
            <span className="w-6 h-6 rounded-full bg-emerald-500 text-white font-mono font-black flex items-center justify-center text-xs">4</span>
            <h4 className="font-bold text-slate-900 dark:text-white text-xs">Track Simulated Scaling</h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Watch how the simulated position executes tiered take-profit scaling: taking partial gains at TP1 and TP2 while trailing the remaining balance to breakeven.
            </p>
          </div>
        </div>
      </div>

      {/* Prominent Educational Disclaimer Notice */}
      <div className="p-5 rounded-2xl bg-rose-50/80 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-2 text-xs">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <AlertTriangle className="w-4 h-4 text-rose-500 shrink-0" />
          <span>Strictly Educational Paper-Trading Simulation • Not Financial Advice</span>
        </div>
        <p className="text-[11.5px] leading-relaxed text-slate-600 dark:text-slate-300">
          All algorithmic signals, backtested win rates, risk-reward ratios, and target levels rendered in this terminal are generated solely for <strong>educational study, statistical modeling, and simulated paper-trading demonstrations</strong>. BitcoinCrypto.tech is not a broker, registered investment advisor, or hedge fund. We do not manage real money, accept deposits, or execute live exchange transactions. Never risk capital you cannot afford to lose.
        </p>
        <div className="flex flex-wrap items-center gap-3 text-[10.5px] font-mono text-slate-500 dark:text-slate-400 pt-1">
          <Link href="/disclaimer" className="text-rose-600 dark:text-rose-400 font-bold hover:underline">
            Read Full Financial Risk Disclaimer →
          </Link>
          <span>•</span>
          <Link href="/editorial-policy" className="hover:text-amber-500 underline">
            Peer-Reviewed Editorial Standards
          </Link>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <div className="space-y-1">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Frequently Asked Questions: AI Trading Signals &amp; Algorithmic Models
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Answers regarding model calibration, backtesting integrity, and paper-trading guidelines.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/80 space-y-2"
            >
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-start gap-2">
                <HelpCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
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
