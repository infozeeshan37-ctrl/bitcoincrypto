"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Layers,
  Flame,
  Shield,
  Zap,
  Info
} from "lucide-react";

interface DiagramProps {
  type:
    | "halving"
    | "mvrv"
    | "market-structure"
    | "rsi-divergence"
    | "orderbook"
    | "liquidation-cascade"
    | "drawdown-matrix";
  className?: string;
}

export default function CourseDiagrams({ type, className = "" }: DiagramProps) {
  const [activeStep, setActiveStep] = useState<number>(0);

  return (
    <div className={`w-full rounded-3xl bg-slate-900 border border-slate-800 p-5 sm:p-7 text-white overflow-hidden shadow-xl ${className}`}>
      {type === "halving" && <HalvingDiagram activeStep={activeStep} setActiveStep={setActiveStep} />}
      {type === "mvrv" && <MvrvDiagram activeStep={activeStep} setActiveStep={setActiveStep} />}
      {type === "market-structure" && <MarketStructureDiagram activeStep={activeStep} setActiveStep={setActiveStep} />}
      {type === "rsi-divergence" && <RsiDivergenceDiagram activeStep={activeStep} setActiveStep={setActiveStep} />}
      {type === "orderbook" && <OrderBookDiagram activeStep={activeStep} setActiveStep={setActiveStep} />}
      {type === "liquidation-cascade" && <LiquidationCascadeDiagram activeStep={activeStep} setActiveStep={setActiveStep} />}
      {type === "drawdown-matrix" && <DrawdownMatrixDiagram activeStep={activeStep} setActiveStep={setActiveStep} />}
    </div>
  );
}

// -------------------------------------------------------------
// 1. Halving Rhythm & Supply Shock Diagram
// -------------------------------------------------------------
function HalvingDiagram({ activeStep, setActiveStep }: { activeStep: number; setActiveStep: (n: number) => void }) {
  const epochs = [
    { year: "2012 (Epoch 1)", subsidy: "25 BTC", inflation: "12.5%", color: "text-amber-400", x: 120, y: 70 },
    { year: "2016 (Epoch 2)", subsidy: "12.5 BTC", inflation: "4.2%", color: "text-blue-400", x: 280, y: 130 },
    { year: "2020 (Epoch 3)", subsidy: "6.25 BTC", inflation: "1.8%", color: "text-purple-400", x: 440, y: 180 },
    { year: "2024 (Epoch 4)", subsidy: "3.125 BTC", inflation: "0.83%", color: "text-emerald-400", x: 600, y: 220 },
    { year: "2028 (Epoch 5)", subsidy: "1.5625 BTC", inflation: "0.41%", color: "text-cyan-400", x: 740, y: 250 },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xs">
            ₿
          </div>
          <div>
            <h4 className="text-sm font-black text-white">Bitcoin 4-Year Halving Supply Inflation Decay Curve</h4>
            <span className="text-[11px] text-slate-400 font-mono">Block Subsidy cuts by 50% every 210,000 blocks</span>
          </div>
        </div>
        <span className="text-[11px] font-mono text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
          Terminal Supply: 21,000,000 BTC
        </span>
      </div>

      <div className="relative w-full overflow-x-auto">
        <svg viewBox="0 0 840 320" className="w-full min-w-[680px] h-auto font-mono text-xs">
          <defs>
            <linearGradient id="halvingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="goldComparison" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#d97706" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="60" y1="50" x2="800" y2="50" stroke="#1e293b" strokeDasharray="3 3" />
          <line x1="60" y1="120" x2="800" y2="120" stroke="#1e293b" strokeDasharray="3 3" />
          <line x1="60" y1="190" x2="800" y2="190" stroke="#1e293b" strokeDasharray="3 3" />
          <line x1="60" y1="260" x2="800" y2="260" stroke="#334155" />

          {/* Physical Gold Inflation Comparison Reference */}
          <line x1="60" y1="200" x2="800" y2="200" stroke="#eab308" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />
          <text x="68" y="195" fill="#facc15" fontSize="10" fontWeight="bold">Physical Gold Annual Inflation (~1.6%)</text>

          {/* Decay Area */}
          <path
            d="M 60,50 Q 200,100 360,160 T 600,225 T 800,260 L 800,260 L 60,260 Z"
            fill="url(#halvingGrad)"
          />

          {/* Decay Curve Line */}
          <path
            d="M 60,50 Q 200,100 360,160 T 600,225 T 800,260"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Epoch Nodes */}
          {epochs.map((ep, idx) => (
            <g key={ep.year} className="cursor-pointer" onClick={() => setActiveStep(idx)}>
              <circle
                cx={ep.x}
                cy={ep.y}
                r={activeStep === idx ? 8 : 6}
                fill={activeStep === idx ? "#fbbf24" : "#020617"}
                stroke="#f59e0b"
                strokeWidth={activeStep === idx ? "3" : "2"}
              />
              <text x={ep.x} y={ep.y - 14} textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="bold">
                {ep.subsidy}
              </text>
              <text x={ep.x} y={ep.y + 24} textAnchor="middle" fill="#94a3b8" fontSize="9">
                {ep.year}
              </text>
              <text x={ep.x} y={ep.y + 36} textAnchor="middle" fill="#38bdf8" fontSize="8.5" fontWeight="bold">
                Inf: {ep.inflation}
              </text>
            </g>
          ))}

          {/* Post-2024 Hard Money Crossover Label */}
          <rect x="520" y="70" width="260" height="52" rx="10" fill="#0f172a" stroke="#10b981" strokeWidth="1" opacity="0.9" />
          <text x="532" y="90" fill="#34d399" fontSize="10" fontWeight="bold">★ Post-2024 Crossover:</text>
          <text x="532" y="108" fill="#cbd5e1" fontSize="9">Bitcoin (0.83%) is now 2x scarcer than Gold.</text>
        </svg>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
        <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
          <span className="text-slate-400 block text-[10px] uppercase font-bold">1. Programmatic Deficit</span>
          <p className="text-slate-200 text-[11px] mt-0.5">Miners sell 450 BTC/day instead of 900 BTC/day, removing $1.5B+ in annual structural sell pressure.</p>
        </div>
        <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
          <span className="text-emerald-400 block text-[10px] uppercase font-bold">2. Stock-to-Flow Jump</span>
          <p className="text-slate-200 text-[11px] mt-0.5">Bitcoin's SF ratio surged above 115, making it the highest stock-to-flow monetary good on Earth.</p>
        </div>
        <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800">
          <span className="text-amber-400 block text-[10px] uppercase font-bold">3. 12-Month Expansion</span>
          <p className="text-slate-200 text-[11px] mt-0.5">Historical bull expansions peak 12 to 18 months after halving day due to cumulative supply drying up.</p>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 2. MVRV Z-Score Cycle Valuation Chart
// -------------------------------------------------------------
function MvrvDiagram({ activeStep, setActiveStep }: { activeStep: number; setActiveStep: (n: number) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
            Z
          </div>
          <div>
            <h4 className="text-sm font-black text-white">MVRV Z-Score Multi-Cycle Valuation Channel</h4>
            <span className="text-[11px] text-slate-400 font-mono">Market Cap vs Realized On-Chain Acquisition Cost Basis</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono">
          <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">Top Mania: &gt; 6.0</span>
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">Bottom Bargain: &lt; 0.1</span>
        </div>
      </div>

      <div className="relative w-full overflow-x-auto">
        <svg viewBox="0 0 840 300" className="w-full min-w-[680px] h-auto font-mono text-xs">
          {/* Overbought Red Band (Z-Score > 6.0) */}
          <rect x="60" y="30" width="740" height="45" fill="#ef4444" opacity="0.15" />
          <line x1="60" y1="75" x2="800" y2="75" stroke="#ef4444" strokeWidth="1" strokeDasharray="4 4" />
          <text x="70" y="55" fill="#f87171" fontSize="10" fontWeight="bold">EXTREME EUPHORIA (Z &gt; 6.0) • Systematic Distribution Zone</text>

          {/* Neutral Fair Value (Z-Score 1.5 - 3.5) */}
          <line x1="60" y1="150" x2="800" y2="150" stroke="#334155" strokeDasharray="2 2" />
          <text x="70" y="145" fill="#64748b" fontSize="9">Equilibrium Fair Value (Z = 2.0)</text>

          {/* Undervalued Green Band (Z-Score < 0.15) */}
          <rect x="60" y="210" width="740" height="50" fill="#10b981" opacity="0.15" />
          <line x1="60" y1="210" x2="800" y2="210" stroke="#10b981" strokeWidth="1" strokeDasharray="4 4" />
          <text x="70" y="240" fill="#34d399" fontSize="10" fontWeight="bold">HISTORICAL BARGAIN (Z &lt; 0.15) • Generational Accumulation Zone</text>

          {/* Historical MVRV Waveform Curve */}
          <path
            d="M 60,230 Q 110,40 160,50 T 260,235 T 380,45 T 480,240 T 600,60 T 700,235 T 790,140"
            fill="none"
            stroke="#38bdf8"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Highlight Points */}
          <circle cx="160" cy="50" r="5" fill="#ef4444" />
          <text x="160" y="35" textAnchor="middle" fill="#fca5a5" fontSize="8.5" fontWeight="bold">2013 Peak ($1.1K)</text>

          <circle cx="260" cy="235" r="5" fill="#10b981" />
          <text x="260" y="260" textAnchor="middle" fill="#86efac" fontSize="8.5" fontWeight="bold">2015 Low ($180)</text>

          <circle cx="380" cy="45" r="5" fill="#ef4444" />
          <text x="380" y="30" textAnchor="middle" fill="#fca5a5" fontSize="8.5" fontWeight="bold">2017 Peak ($19.8K)</text>

          <circle cx="480" cy="240" r="5" fill="#10b981" />
          <text x="480" y="260" textAnchor="middle" fill="#86efac" fontSize="8.5" fontWeight="bold">2018 Low ($3.2K)</text>

          <circle cx="600" cy="60" r="5" fill="#ef4444" />
          <text x="600" y="45" textAnchor="middle" fill="#fca5a5" fontSize="8.5" fontWeight="bold">2021 Peak ($69K)</text>

          <circle cx="700" cy="235" r="5" fill="#10b981" />
          <text x="700" y="260" textAnchor="middle" fill="#86efac" fontSize="8.5" fontWeight="bold">2022 Low ($16K)</text>

          <circle cx="790" cy="140" r="6" fill="#fbbf24" stroke="#fff" strokeWidth="2" />
          <text x="790" y="125" textAnchor="middle" fill="#fbbf24" fontSize="9" fontWeight="bold">Current Epoch</text>
        </svg>
      </div>

      <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 text-xs flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Info className="w-4 h-4 text-blue-400 shrink-0" />
          <span className="text-slate-300">
            <strong>Key Quantitative Takeaway:</strong> Whenever MVRV enters the green zone, price is below aggregate investor cost basis, meaning 90%+ of short-term traders are in pain. Every historical occurrence proved to be the exact bottom of the bear market.
          </span>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 3. Technical Analysis Market Structure Diagram (BOS vs CHoCH)
// -------------------------------------------------------------
function MarketStructureDiagram({ activeStep, setActiveStep }: { activeStep: number; setActiveStep: (n: number) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
            TA
          </div>
          <div>
            <h4 className="text-sm font-black text-white">Market Structure Anatomy: Higher Highs, BOS &amp; CHoCH</h4>
            <span className="text-[11px] text-slate-400 font-mono">Institutional trend continuation vs trend invalidation</span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-mono">
          <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">BOS: Continuation</span>
          <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">CHoCH: Reversal</span>
        </div>
      </div>

      <div className="relative w-full overflow-x-auto">
        <svg viewBox="0 0 840 320" className="w-full min-w-[680px] h-auto font-mono text-xs">
          {/* Trendline grid */}
          <line x1="40" y1="280" x2="800" y2="280" stroke="#1e293b" />
          
          {/* Bullish Phase: Higher Low (HL1), Higher High (HH1), HL2, HH2 */}
          <polyline
            points="60,250 160,150 220,200 340,90 410,160 520,60"
            fill="none"
            stroke="#10b981"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* BOS 1 Line */}
          <line x1="160" y1="150" x2="340" y2="150" stroke="#34d399" strokeWidth="1.5" strokeDasharray="4 3" />
          <rect x="220" y="138" width="60" height="20" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
          <text x="250" y="152" textAnchor="middle" fill="#6ee7b7" fontSize="9" fontWeight="bold">BOS #1</text>

          {/* BOS 2 Line */}
          <line x1="340" y1="90" x2="520" y2="90" stroke="#34d399" strokeWidth="1.5" strokeDasharray="4 3" />
          <rect x="400" y="78" width="60" height="20" rx="6" fill="#064e3b" stroke="#10b981" strokeWidth="1" />
          <text x="430" y="92" textAnchor="middle" fill="#6ee7b7" fontSize="9" fontWeight="bold">BOS #2</text>

          {/* Protected Swing Low Line */}
          <line x1="410" y1="160" x2="720" y2="160" stroke="#f43f5e" strokeWidth="1.5" strokeDasharray="4 3" />
          <text x="590" y="150" fill="#fb7185" fontSize="9.5" fontWeight="bold">Protected Swing Low</text>

          {/* Bearish Reversal Phase (CHoCH): Lower High, then break through Protected Low */}
          <polyline
            points="520,60 580,130 640,100 740,240 800,210"
            fill="none"
            stroke="#f43f5e"
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* CHoCH Breakdown Marker */}
          <circle cx="690" cy="160" r="7" fill="#e11d48" stroke="#fff" strokeWidth="2" />
          <rect x="660" y="172" width="60" height="20" rx="6" fill="#881337" stroke="#f43f5e" strokeWidth="1" />
          <text x="690" y="186" textAnchor="middle" fill="#fecdd3" fontSize="9" fontWeight="bold">CHoCH !</text>

          {/* Labels for Swing Points */}
          <text x="160" y="135" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">HH 1</text>
          <text x="220" y="220" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">HL 1</text>
          <text x="340" y="75" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">HH 2</text>
          <text x="410" y="180" textAnchor="middle" fill="#34d399" fontSize="10" fontWeight="bold">HL 2 (Protected)</text>
          <text x="520" y="45" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">HH 3 (Top)</text>
          <text x="640" y="88" textAnchor="middle" fill="#f43f5e" fontSize="10" fontWeight="bold">LH (Failure)</text>
          <text x="740" y="260" textAnchor="middle" fill="#f43f5e" fontSize="10" fontWeight="bold">LL (New Downtrend)</text>
        </svg>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-800/60">
          <span className="text-emerald-400 font-bold block mb-1">✓ Bullish Trend Continuation Rule:</span>
          <p className="text-slate-300 text-[11px]">As long as price closes above prior highs (BOS) and respects prior Higher Lows, trend continuation is intact. Trailing stops belong just below Higher Lows.</p>
        </div>
        <div className="p-3 rounded-2xl bg-rose-950/40 border border-rose-800/60">
          <span className="text-rose-400 font-bold block mb-1">⚠️ Change of Character (CHoCH) Invalidation:</span>
          <p className="text-slate-300 text-[11px]">When price fails to make a higher high and instead breaks through the protected Higher Low with a full candle body close, the uptrend is officially broken.</p>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 4. RSI Bullish & Bearish Divergence Waveform Diagram
// -------------------------------------------------------------
function RsiDivergenceDiagram({ activeStep, setActiveStep }: { activeStep: number; setActiveStep: (n: number) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center font-bold text-xs">
            RSI
          </div>
          <div>
            <h4 className="text-sm font-black text-white">Relative Strength Index (RSI 14) Divergence Mechanics</h4>
            <span className="text-[11px] text-slate-400 font-mono">Price Action vs Internal Momentum Velocity</span>
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-x-auto">
        <svg viewBox="0 0 840 330" className="w-full min-w-[680px] h-auto font-mono text-xs">
          {/* PANEL 1: PRICE ACTION (TOP) */}
          <rect x="50" y="20" width="750" height="130" fill="#0f172a" rx="12" stroke="#1e293b" />
          <text x="65" y="40" fill="#94a3b8" fontSize="10" fontWeight="bold">PANEL 1: SPOT PRICE ($BTC)</text>

          {/* Bearish Div Price Trend (Higher High) */}
          <path d="M 80,100 Q 150,50 220,70 T 360,40" fill="none" stroke="#e2e8f0" strokeWidth="2.5" />
          <circle cx="220" cy="70" r="5" fill="#38bdf8" />
          <circle cx="360" cy="40" r="5" fill="#f43f5e" />
          <line x1="220" y1="70" x2="360" y2="40" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 3" />
          <text x="290" y="45" fill="#f87171" fontSize="9.5" fontWeight="bold">Price Higher High &uarr;</text>

          {/* Bullish Div Price Trend (Lower Low) */}
          <path d="M 480,50 Q 550,110 620,90 T 760,125" fill="none" stroke="#e2e8f0" strokeWidth="2.5" />
          <circle cx="620" cy="90" r="5" fill="#38bdf8" />
          <circle cx="760" cy="125" r="5" fill="#10b981" />
          <line x1="620" y1="90" x2="760" y2="125" stroke="#10b981" strokeWidth="2" strokeDasharray="4 3" />
          <text x="690" y="115" fill="#34d399" fontSize="9.5" fontWeight="bold">Price Lower Low &darr;</text>

          {/* PANEL 2: RSI 14 (BOTTOM) */}
          <rect x="50" y="170" width="750" height="130" fill="#0b0f19" rx="12" stroke="#1e293b" />
          <text x="65" y="190" fill="#c084fc" fontSize="10" fontWeight="bold">PANEL 2: RELATIVE STRENGTH INDEX (RSI 14)</text>

          <line x1="65" y1="205" x2="785" y2="205" stroke="#ef4444" strokeDasharray="3 3" opacity="0.4" />
          <text x="750" y="200" fill="#ef4444" fontSize="8.5">70 Overbought</text>

          <line x1="65" y1="265" x2="785" y2="265" stroke="#10b981" strokeDasharray="3 3" opacity="0.4" />
          <text x="750" y="280" fill="#10b981" fontSize="8.5">30 Oversold</text>

          {/* Bearish Div RSI line (Lower High!) */}
          <path d="M 80,240 Q 150,190 220,195 T 360,230" fill="none" stroke="#c084fc" strokeWidth="2.5" />
          <circle cx="220" cy="195" r="5" fill="#c084fc" />
          <circle cx="360" cy="230" r="5" fill="#f43f5e" />
          <line x1="220" y1="195" x2="360" y2="230" stroke="#f43f5e" strokeWidth="2" strokeDasharray="4 3" />
          <text x="290" y="222" fill="#f87171" fontSize="9.5" fontWeight="bold">RSI Lower High &darr; (BEARISH DIV)</text>

          {/* Bullish Div RSI line (Higher Low!) */}
          <path d="M 480,210 Q 550,275 620,270 T 760,235" fill="none" stroke="#c084fc" strokeWidth="2.5" />
          <circle cx="620" cy="270" r="5" fill="#c084fc" />
          <circle cx="760" cy="235" r="5" fill="#10b981" />
          <line x1="620" y1="270" x2="760" y2="235" stroke="#10b981" strokeWidth="2" strokeDasharray="4 3" />
          <text x="690" y="260" fill="#34d399" fontSize="9.5" fontWeight="bold">RSI Higher Low &uarr; (BULLISH DIV)</text>
        </svg>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="p-3 rounded-2xl bg-rose-950/30 border border-rose-800/50">
          <strong className="text-rose-400 block mb-0.5">Bearish Divergence (Left):</strong>
          <span className="text-slate-300 text-[11px]">Even though price printed a higher nominal high, the buying force inside the candle sequence slowed down significantly. Signals trend exhaustion and impending selloff.</span>
        </div>
        <div className="p-3 rounded-2xl bg-emerald-950/30 border border-emerald-800/50">
          <strong className="text-emerald-400 block mb-0.5">Bullish Divergence (Right):</strong>
          <span className="text-slate-300 text-[11px]">Sellers pushed price to a lower nominal low, but selling momentum was weaker than the prior low. Signals seller exhaustion and an imminent mean-reversion bounce.</span>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 5. Level-2 Order Book Depth & Bid/Ask Wall Diagram
// -------------------------------------------------------------
function OrderBookDiagram({ activeStep, setActiveStep }: { activeStep: number; setActiveStep: (n: number) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold text-xs">
            L2
          </div>
          <div>
            <h4 className="text-sm font-black text-white">Central Limit Order Book (CLOB) Market Depth Architecture</h4>
            <span className="text-[11px] text-slate-400 font-mono">Resting Limit Bids vs Asks &amp; The Mid-Price Spread</span>
          </div>
        </div>
        <span className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
          OBI: +68% Buy Imbalance
        </span>
      </div>

      <div className="relative w-full overflow-x-auto">
        <svg viewBox="0 0 840 280" className="w-full min-w-[680px] h-auto font-mono text-xs">
          {/* Background and Midline */}
          <rect x="50" y="20" width="740" height="230" fill="#090d16" rx="16" stroke="#1e293b" />
          <line x1="420" y1="20" x2="420" y2="250" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
          <text x="420" y="40" textAnchor="middle" fill="#fbbf24" fontSize="10" fontWeight="bold">Mid-Price: $94,500</text>
          <text x="420" y="55" textAnchor="middle" fill="#64748b" fontSize="8.5">Spread: $0.05</text>

          {/* BIDS SIDE (LEFT - GREEN ACCUMULATION DEPTH) */}
          <text x="230" y="45" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">BIDS (Resting Buy Limits)</text>
          
          {/* Depth Tiers - Bars from mid to left */}
          <rect x="350" y="80" width="60" height="18" fill="#10b981" opacity="0.9" rx="3" />
          <text x="340" y="93" textAnchor="end" fill="#f8fafc" fontSize="9">45 BTC @ $94,499</text>

          <rect x="290" y="105" width="120" height="18" fill="#10b981" opacity="0.8" rx="3" />
          <text x="280" y="118" textAnchor="end" fill="#f8fafc" fontSize="9">95 BTC @ $94,480</text>

          <rect x="210" y="130" width="200" height="18" fill="#10b981" opacity="0.7" rx="3" />
          <text x="200" y="143" textAnchor="end" fill="#f8fafc" fontSize="9">180 BTC @ $94,450</text>

          <rect x="110" y="155" width="300" height="22" fill="#10b981" opacity="1" rx="4" />
          <text x="100" y="170" textAnchor="end" fill="#34d399" fontSize="10" fontWeight="bold">WHALE WALL: 450 BTC @ $94,400</text>

          <rect x="70" y="185" width="340" height="18" fill="#10b981" opacity="0.5" rx="3" />
          <text x="60" y="198" textAnchor="end" fill="#94a3b8" fontSize="8.5">Cumulative: 1,240 BTC</text>

          {/* ASKS SIDE (RIGHT - RED SELL LIMITS) */}
          <text x="610" y="45" textAnchor="middle" fill="#f43f5e" fontSize="11" fontWeight="bold">ASKS (Resting Sell Offers)</text>

          <rect x="430" y="80" width="40" height="18" fill="#f43f5e" opacity="0.9" rx="3" />
          <text x="480" y="93" textAnchor="start" fill="#f8fafc" fontSize="9">30 BTC @ $94,501</text>

          <rect x="430" y="105" width="70" height="18" fill="#f43f5e" opacity="0.8" rx="3" />
          <text x="510" y="118" textAnchor="start" fill="#f8fafc" fontSize="9">55 BTC @ $94,520</text>

          <rect x="430" y="130" width="110" height="18" fill="#f43f5e" opacity="0.7" rx="3" />
          <text x="550" y="143" textAnchor="start" fill="#f8fafc" fontSize="9">85 BTC @ $94,550</text>

          <rect x="430" y="155" width="160" height="18" fill="#f43f5e" opacity="0.6" rx="3" />
          <text x="600" y="170" textAnchor="start" fill="#f8fafc" fontSize="9">120 BTC @ $94,600</text>

          <rect x="430" y="185" width="220" height="18" fill="#f43f5e" opacity="0.5" rx="3" />
          <text x="660" y="198" textAnchor="start" fill="#94a3b8" fontSize="8.5">Cumulative: 410 BTC</text>

          {/* Aggressor Taker Arrow */}
          <path d="M 450,225 L 490,225" stroke="#f59e0b" strokeWidth="2.5" markerEnd="url(#arrow)" />
          <text x="420" y="235" textAnchor="middle" fill="#fbbf24" fontSize="9.5" fontWeight="bold">
            Aggressive Market Taker Buys consume resting asks &rarr; Price lifts upward
          </text>
        </svg>
      </div>

      <div className="p-3.5 rounded-2xl bg-slate-950/80 border border-slate-800 text-xs flex items-center justify-between">
        <span className="text-slate-300">
          <strong>Order Flow Law:</strong> Limit orders do NOT move prices; only aggressive market orders (takers) move prices by consuming all resting limit depth. A large resting bid wall protects price because aggressive sellers must expend 450+ BTC of capital to push price lower.
        </span>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 6. CoinGlass Liquidation Cascade Waterfall
// -------------------------------------------------------------
function LiquidationCascadeDiagram({ activeStep, setActiveStep }: { activeStep: number; setActiveStep: (n: number) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xs">
            <Flame className="w-4 h-4 text-rose-400" />
          </div>
          <div>
            <h4 className="text-sm font-black text-white">CoinGlass Liquidation Squeeze Waterfall Dynamics</h4>
            <span className="text-[11px] text-slate-400 font-mono">Forced exchange liquidation market orders triggering cascades</span>
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-x-auto">
        <svg viewBox="0 0 840 280" className="w-full min-w-[680px] h-auto font-mono text-xs">
          {/* Steps */}
          {/* Tier 1: 100x */}
          <g>
            <rect x="60" y="30" width="160" height="60" rx="12" fill="#881337" stroke="#f43f5e" strokeWidth="1.5" />
            <text x="140" y="52" textAnchor="middle" fill="#fecdd3" fontSize="11" fontWeight="bold">1. 100x Margin Tier</text>
            <text x="140" y="70" textAnchor="middle" fill="#fda4af" fontSize="9">Liq Dist: -0.8% ($25M)</text>
          </g>

          {/* Waterfall Arrow 1 */}
          <path d="M 220,60 L 260,60 L 260,110 L 280,110" fill="none" stroke="#f59e0b" strokeWidth="2.5" />

          {/* Tier 2: 50x */}
          <g>
            <rect x="290" y="80" width="160" height="60" rx="12" fill="#701a75" stroke="#d946ef" strokeWidth="1.5" />
            <text x="370" y="102" textAnchor="middle" fill="#f5d0fe" fontSize="11" fontWeight="bold">2. 50x Margin Tier</text>
            <text x="370" y="120" textAnchor="middle" fill="#e879f9" fontSize="9">Liq Dist: -1.8% ($65M)</text>
          </g>

          {/* Waterfall Arrow 2 */}
          <path d="M 450,110 L 490,110 L 490,160 L 510,160" fill="none" stroke="#f59e0b" strokeWidth="2.5" />

          {/* Tier 3: 25x */}
          <g>
            <rect x="520" y="130" width="160" height="60" rx="12" fill="#1e1b4b" stroke="#6366f1" strokeWidth="1.5" />
            <text x="600" y="152" textAnchor="middle" fill="#c7d2fe" fontSize="11" fontWeight="bold">3. 25x Margin Tier</text>
            <text x="600" y="170" textAnchor="middle" fill="#a5b4fc" fontSize="9">Liq Dist: -3.6% ($180M)</text>
          </g>

          {/* Terminal Absorption Pool */}
          <g>
            <rect x="180" y="215" width="480" height="50" rx="14" fill="#064e3b" stroke="#10b981" strokeWidth="2" />
            <text x="420" y="238" textAnchor="middle" fill="#a7f3d0" fontSize="11" fontWeight="bold">
              ★ INSTITUTIONAL ABSORPTION POOL ($300M+ Resting Limit Bids)
            </text>
            <text x="420" y="254" textAnchor="middle" fill="#6ee7b7" fontSize="9">
              Cascade exhausts &rarr; Massive Mean Reversion V-Shape Reversal Triggered
            </text>
          </g>
        </svg>
      </div>

      <div className="bg-slate-950/80 p-3.5 rounded-2xl border border-slate-800 text-xs">
        <span className="text-slate-300">
          <strong>CoinGlass Playbook:</strong> Do not buy during Tier 1 or Tier 2. Wait for the cascade to flush all the way through Tier 3 into the high-density green absorption pool. When total liquidation volume spikes above $200M/hr and CVD flattens, enter the reversal.
        </span>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// 7. Exponential Drawdown Recovery & Risk Matrix
// -------------------------------------------------------------
function DrawdownMatrixDiagram({ activeStep, setActiveStep }: { activeStep: number; setActiveStep: (n: number) => void }) {
  const drawdowns = [
    { loss: "10%", gain: "11.1%", severity: "Normal Noise", color: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
    { loss: "20%", gain: "25.0%", severity: "Manageable", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
    { loss: "30%", gain: "42.9%", severity: "Severe Drag", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/20" },
    { loss: "50%", gain: "100.0%", severity: "Critical (2x Needed)", color: "text-orange-400", bg: "bg-orange-500/10 border-orange-500/20" },
    { loss: "75%", gain: "300.0%", severity: "Extreme Danger", color: "text-rose-400", bg: "bg-rose-500/10 border-rose-500/20" },
    { loss: "90%", gain: "900.0%", severity: "Account Ruin (10x Needed)", color: "text-red-500", bg: "bg-red-500/20 border-red-500/40" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs">
            %
          </div>
          <div>
            <h4 className="text-sm font-black text-white">The Asymmetric Mathematics of Account Drawdown Recovery</h4>
            <span className="text-[11px] text-slate-400 font-mono">Why an 80% loss requires a 400% gain to break even</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        {drawdowns.map((d) => (
          <div key={d.loss} className={`p-3.5 rounded-2xl border ${d.bg} flex flex-col justify-between space-y-2`}>
            <div>
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Account Loss:</span>
              <span className="text-xl font-black text-white font-mono">{d.loss}</span>
            </div>
            <div className="pt-2 border-t border-white/10">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Required Gain:</span>
              <span className={`text-base font-black font-mono ${d.color}`}>+{d.gain}</span>
              <span className="text-[9px] block text-slate-400 mt-0.5">{d.severity}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-2xl bg-slate-950/90 border border-slate-800 text-xs space-y-2">
        <div className="flex items-center gap-2 text-amber-400 font-bold">
          <Shield className="w-4 h-4" />
          <span>The Quantitative Edge of the 1% Capital Risk Rule:</span>
        </div>
        <p className="text-slate-300 text-[11px] leading-relaxed">
          If you risk only 1% per trade, a devastating losing streak of 10 consecutive losses only reduces your capital by ~9.5% (leaving you with $9,043 on a $10,000 account), requiring just a 10.5% gain to recover. If you risk 10% per trade, 10 consecutive losses wipes out 65% of your capital, requiring a near-impossible 186% gain just to break even.
        </p>
      </div>
    </div>
  );
}
