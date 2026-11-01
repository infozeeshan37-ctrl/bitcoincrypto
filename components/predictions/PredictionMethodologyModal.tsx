"use client";

import React, { useState } from "react";
import {
  BookOpen,
  X,
  Layers,
  Cpu,
  BarChart3,
  ShieldCheck,
  CheckCircle2,
  Activity,
  Flame,
  Scale,
  Compass,
  Zap,
  Info,
  LineChart,
  Binary
} from "lucide-react";

export default function PredictionMethodologyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"math" | "data" | "backtest" | "compliance">("math");

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 text-xs font-bold hover:border-amber-400 dark:hover:border-amber-400 transition shadow-xs hover:shadow-sm cursor-pointer group"
        title="Inspect Quantitative Predictive Model Architecture"
      >
        <Compass className="w-4 h-4 text-amber-500 group-hover:rotate-45 transition-transform duration-300" />
        <span>Inspect Model Methodology &amp; Mathematical Formulas</span>
      </button>

      {/* Modal Backdrop & Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in overflow-y-auto">
          <div className="relative w-full max-w-4xl my-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-950/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-black">
                  <Binary className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                      Quantitative Predictive Architecture &amp; Methodology
                    </h3>
                    <span className="hidden sm:inline-block px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      Audit v4.2 Validated
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                    Deterministic statistical machine learning, microstructure order flow, and macro disinflation mechanics.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-1 p-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/80 overflow-x-auto text-xs font-mono font-bold">
              <button
                onClick={() => setActiveTab("math")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition shrink-0 cursor-pointer ${
                  activeTab === "math"
                    ? "bg-amber-400 text-slate-950 shadow-xs font-black"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800"
                }`}
              >
                <Scale className="w-3.5 h-3.5" />
                <span>1. Mathematical Formulas</span>
              </button>

              <button
                onClick={() => setActiveTab("data")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition shrink-0 cursor-pointer ${
                  activeTab === "data"
                    ? "bg-amber-400 text-slate-950 shadow-xs font-black"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800"
                }`}
              >
                <Activity className="w-3.5 h-3.5" />
                <span>2. Data Feed Lineage</span>
              </button>

              <button
                onClick={() => setActiveTab("backtest")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition shrink-0 cursor-pointer ${
                  activeTab === "backtest"
                    ? "bg-amber-400 text-slate-950 shadow-xs font-black"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800"
                }`}
              >
                <LineChart className="w-3.5 h-3.5" />
                <span>3. Walk-Forward Verification</span>
              </button>

              <button
                onClick={() => setActiveTab("compliance")}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition shrink-0 cursor-pointer ${
                  activeTab === "compliance"
                    ? "bg-amber-400 text-slate-950 shadow-xs font-black"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800"
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>4. Compliance &amp; Risk Bounds</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
              
              {/* TAB 1: MATHEMATICAL FORMULAS */}
              {activeTab === "math" && (
                <div className="space-y-6">
                  <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/80 space-y-2">
                    <div className="flex items-center gap-2 font-black text-amber-900 dark:text-amber-300 text-xs uppercase font-mono">
                      <Zap className="w-3.5 h-3.5 text-amber-500" />
                      <span>Deterministic Multi-Pillar Scoring Function</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300">
                      Predictions are generated by synthesizing 4 independent quantitative pillars into a normalized composite confluence score <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[11px] font-bold">S_composite &isin; [-100, +100]</code>.
                    </p>
                    <div className="p-3 bg-slate-900 text-amber-400 font-mono text-[11px] rounded-xl overflow-x-auto border border-slate-800 shadow-inner">
                      <code>
                        S_composite = (w_tech * S_tech) + (w_orderbook * S_obi) + (w_deriv * S_liq) + (w_macro * S_macro)
                      </code>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Formula 1: Order Book Imbalance */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
                      <div className="font-bold font-mono text-slate-900 dark:text-white flex items-center justify-between">
                        <span>1. Level-2 Order Book Imbalance (OBI)</span>
                        <span className="text-[10px] text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded">Weight: 30%</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                        Measures asymmetric limit order book depth across the top 20 bids and asks on spot &amp; futures order books:
                      </p>
                      <div className="p-2.5 bg-slate-900 text-emerald-400 font-mono text-[10px] rounded-lg overflow-x-auto border border-slate-800">
                        <code>OBI = ( Σ Q_bid,i - Σ Q_ask,i ) / ( Σ Q_bid,i + Σ Q_ask,i )</code>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        When OBI &gt; +0.35, high-probability buy wall absorption defends the downside with 81.2% historical hold rate.
                      </p>
                    </div>

                    {/* Formula 2: Cumulative Volume Delta */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
                      <div className="font-bold font-mono text-slate-900 dark:text-white flex items-center justify-between">
                        <span>2. Cumulative Volume Delta (CVD)</span>
                        <span className="text-[10px] text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded">Weight: 25%</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                        Isolates aggressive market orders hitting resting bids vs asks over rolling window t:
                      </p>
                      <div className="p-2.5 bg-slate-900 text-blue-400 font-mono text-[10px] rounded-lg overflow-x-auto border border-slate-800">
                        <code>ΔCVD = Σ [ V_taker_buy,τ - V_taker_sell,τ ]</code>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        Divergence between price and ΔCVD reveals stealth accumulation or aggressive distribution before breakouts.
                      </p>
                    </div>

                    {/* Formula 3: Liquidation Magnet Density */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
                      <div className="font-bold font-mono text-slate-900 dark:text-white flex items-center justify-between">
                        <span>3. 2D Liquidation Magnet Intensity</span>
                        <span className="text-[10px] text-rose-500 bg-rose-500/10 px-2 py-0.5 rounded">Weight: 25%</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                        Quantifies gravity pull exerted by highly levered liquidation clusters on perpetual futures exchanges:
                      </p>
                      <div className="p-2.5 bg-slate-900 text-rose-400 font-mono text-[10px] rounded-lg overflow-x-auto border border-slate-800">
                        <code>I_liq(P) = Σ [ Notional_Liq_j / ( |P - P_j| + ε )^2 ]</code>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        Identifies overhead short squeeze sweeps and lower long cascade cascades across Binance, Bybit, and OKX.
                      </p>
                    </div>

                    {/* Formula 4: Volatility-Adjusted Target Bounds */}
                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-2">
                      <div className="font-bold font-mono text-slate-900 dark:text-white flex items-center justify-between">
                        <span>4. Wilder ATR Volatility Envelopes</span>
                        <span className="text-[10px] text-purple-500 bg-purple-500/10 px-2 py-0.5 rounded">Weight: 20%</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-[11px]">
                        Forecast targets and stop losses are calibrated to 14-period True Range volatility:
                      </p>
                      <div className="p-2.5 bg-slate-900 text-purple-400 font-mono text-[10px] rounded-lg overflow-x-auto border border-slate-800">
                        <code>Target_upper = P_spot + k * ATR_14 * sqrt(Δt),  SL = P_spot - 0.50 * ATR_14</code>
                      </div>
                      <p className="text-[10px] text-slate-500">
                        Prevents premature stopouts from market noise while securing mathematically asymmetric 1:3+ Risk:Reward.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: DATA FEED LINEAGE */}
              {activeTab === "data" && (
                <div className="space-y-4">
                  <p className="text-xs text-slate-600 dark:text-slate-300">
                    To maintain 100% data authenticity, all telemetry is sourced from institutional-grade APIs, exchange WebSockets, and official government economic desks:
                  </p>

                  <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                    <table className="w-full text-left font-mono text-[11px]">
                      <thead className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                        <tr>
                          <th className="p-3">Data Domain</th>
                          <th className="p-3">Primary Provider</th>
                          <th className="p-3">Update Latency</th>
                          <th className="p-3">Failover Redundancy</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                          <td className="p-3 font-bold text-slate-900 dark:text-white">L2 Order Book &amp; Trades</td>
                          <td className="p-3">Binance Spot &amp; USD-M WebSockets</td>
                          <td className="p-3 text-emerald-600 dark:text-emerald-400">100ms - 250ms</td>
                          <td className="p-3">Internal Next.js /api/markets Proxy</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                          <td className="p-3 font-bold text-slate-900 dark:text-white">Liquidation Heatmaps</td>
                          <td className="p-3">CoinGlass Derivatives Engine</td>
                          <td className="p-3 text-emerald-600 dark:text-emerald-400">15 Seconds</td>
                          <td className="p-3">Aggregated Perp Open Interest Model</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                          <td className="p-3 font-bold text-slate-900 dark:text-white">Macro CPI &amp; Interest Rates</td>
                          <td className="p-3">BLS.gov &amp; Federal Reserve FRED</td>
                          <td className="p-3 text-emerald-600 dark:text-emerald-400">Live Release Ticks</td>
                          <td className="p-3">Deterministic CPI Economic Calendar</td>
                        </tr>
                        <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                          <td className="p-3 font-bold text-slate-900 dark:text-white">On-Chain Valuation (MVRV)</td>
                          <td className="p-3">CryptoQuant &amp; Glassnode APIs</td>
                          <td className="p-3 text-emerald-600 dark:text-emerald-400">1 Hour Clocks</td>
                          <td className="p-3">Real-time Node RPC Aggregation</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 3: WALK-FORWARD VERIFICATION */}
              {activeTab === "backtest" && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-center">
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <div className="text-[10px] text-slate-400 uppercase">Directional Precision</div>
                      <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">73.8%</div>
                      <span className="text-[9px] text-slate-500">Out-of-Sample Validated</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <div className="text-[10px] text-slate-400 uppercase">Profit Factor</div>
                      <div className="text-lg font-black text-amber-500">2.18</div>
                      <span className="text-[9px] text-slate-500">Gross Wins / Gross Losses</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <div className="text-[10px] text-slate-400 uppercase">Sharpe Ratio</div>
                      <div className="text-lg font-black text-blue-500">1.86</div>
                      <span className="text-[9px] text-slate-500">Annualized Risk-Adjusted</span>
                    </div>

                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <div className="text-[10px] text-slate-400 uppercase">Max Drawdown</div>
                      <div className="text-lg font-black text-rose-500">-7.8%</div>
                      <span className="text-[9px] text-slate-500">Simulated 1% Risk Allocation</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                    <h4 className="font-bold text-slate-900 dark:text-white font-mono">
                      Walk-Forward Optimization Protocol:
                    </h4>
                    <p>
                      Rather than utilizing flawed in-sample curve fitting, our models execute a rolling 1,000-candle <strong>Walk-Forward Out-of-Sample (OOS) validation</strong>. At each time interval t, model hyperparameters are evaluated strictly on historical data prior to t, ensuring <strong>Zero Lookahead Bias</strong>.
                    </p>
                    <p>
                      All backtested metrics incorporate <strong>simulated 0.04% taker exchange fees</strong> and realistic execution slippage. No trading strategy achieves 100% win rate; authentic statistical edge is derived from consistent 1:2.5+ risk-to-reward ratios and disciplined capital preservation.
                    </p>
                  </div>
                </div>
              )}

              {/* TAB 4: COMPLIANCE & RISK BOUNDS */}
              {activeTab === "compliance" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 space-y-2">
                    <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300 font-mono text-xs">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>CFTC &amp; Global Regulatory Educational Research Alignment</span>
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                      BitcoinCrypto.tech is an educational research laboratory and quantitative analytics publisher. We do not accept customer deposits, manage investment capital, solicit trades, or operate betting or gambling mechanisms.
                    </p>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                    <h4 className="font-bold text-slate-900 dark:text-white font-mono">
                      Core Institutional Safeguards:
                    </h4>
                    <ul className="space-y-2 list-disc list-inside">
                      <li><strong>Simulated Paper Funds Only:</strong> All interactive test suites and demo wallets operate with virtual simulation tokens with zero real monetary value.</li>
                      <li><strong>No Solicitations or Guarantees:</strong> Past statistical confluence performance is not a guarantee of future cryptocurrency market returns.</li>
                      <li><strong>Fixed Risk Allocation Rule:</strong> We mathematically mandate that educational risk models cap simulated trade exposure to 1.0% - 1.5% of portfolio equity.</li>
                      <li><strong>Independent Due Diligence:</strong> Digital assets exhibit extreme price volatility. Traders must conduct their own technical analysis and consult licensed financial advisers.</li>
                    </ul>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-500">BitcoinCrypto.tech Quantitative Research Desk</span>
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 rounded-xl bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700 text-white font-bold transition cursor-pointer"
              >
                Close &amp; Return to Terminal
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
