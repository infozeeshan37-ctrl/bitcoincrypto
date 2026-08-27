"use client";

import { useState } from "react";
import {
  Compass,
  BookOpen,
  Layers,
  BarChart2,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Cpu,
  Shield,
  Activity,
  Award,
  Zap
} from "lucide-react";
import Link from "next/link";

export default function ConceptsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const masterclassTracks = [
    {
      trackNumber: "01",
      title: "Bitcoin Market Structure & Macro Economics",
      level: "Foundation Track",
      lessons: "8 Comprehensive Lessons",
      readTime: "2.5 Hours",
      category: "macro",
      description: "Understand the macroeconomic drivers of digital asset pricing, halving supply dynamics, and exchange reserve liquidity drain.",
      syllabus: [
        "The 21-Million Hard Cap & Issuance Schedule",
        "Exchange Liquidity Reserves & Cold Custody Outflows",
        "Spot ETF Institutional Capital Flow Mechanics",
        "Stock-to-Flow vs Modern Demand Velocity Models"
      ]
    },
    {
      trackNumber: "02",
      title: "Order Flow Dynamics & Liquidity Profiling",
      level: "Intermediate Track",
      lessons: "12 Practical Modules",
      readTime: "3.5 Hours",
      category: "orderflow",
      description: "Master Central Limit Order Books (CLOB), liquidity pools, stop-loss cluster hunting, and footprint delta absorption.",
      syllabus: [
        "Limit Orders vs Aggressive Market Takers",
        "Identifying Resting Liquidity Sweeps & Traps",
        "Cumulative Volume Delta (CVD) Divergences",
        "Volume Point of Control (VPOC) Value Zones"
      ]
    },
    {
      trackNumber: "03",
      title: "Derivatives & Perpetual Funding Rate Mechanics",
      level: "Advanced Track",
      lessons: "10 Quantitative Modules",
      readTime: "3.0 Hours",
      category: "derivatives",
      description: "Decode 8-hour funding settlements, open interest imbalances, liquidation heatmaps, and delta-neutral cash & carry arbitrage.",
      syllabus: [
        "The 8-Hour Funding Settlement Equilibrium",
        "Open Interest to Market Cap Ratio Analysis",
        "Predicting Cascade Long & Short Squeezes",
        "Institutional Basis Cash-and-Carry Trades"
      ]
    },
    {
      trackNumber: "04",
      title: "Quantitative Risk Management & DCA Mathematics",
      level: "Core Discipline Track",
      lessons: "6 Mathematical Units",
      readTime: "2.0 Hours",
      category: "risk",
      description: "Construct asymmetric trade portfolios, calculate non-linear drawdown recovery curves, and execute disciplined DCA accumulation.",
      syllabus: [
        "The Harmonic Mean Advantage in Dollar-Cost Averaging",
        "Mathematical Position Sizing from Invalidation Points",
        "The Exponential Math of Account Drawdown Recovery",
        "Positive Mathematical Expectancy & R:R Ratios"
      ]
    }
  ];

  const glossaryTerms = [
    { term: "Central Limit Order Book (CLOB)", def: "The real-time database where buy and sell limit orders are matched with aggressive taker market orders." },
    { term: "Cumulative Volume Delta (CVD)", def: "The continuous cumulative difference between buying volume and selling volume over a specified session." },
    { term: "Perpetual Funding Rate", def: "Periodic peer-to-peer payments between longs and shorts that keep perpetual futures anchored to index spot prices." },
    { term: "Liquidity Sweep", def: "A deliberate market movement through a support or resistance level to trigger resting stop-loss orders and fill large institutional orders." },
    { term: "MVRV Z-Score", def: "An on-chain metric comparing market capitalization to realized capitalization to identify generational cycle tops and bottoms." },
    { term: "Realized Capitalization", def: "The aggregate value of all Bitcoin based on the price when each UTXO was last moved on the blockchain." }
  ];

  const filteredTracks = activeFilter === "all"
    ? masterclassTracks
    : masterclassTracks.filter((t) => t.category === activeFilter);

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-100 border border-amber-200 text-amber-900 shadow-sm">
            <Compass className="w-3.5 h-3.5 text-amber-600" />
            <span>Structured Educational Academy</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
            Trading Concepts & Masterclasses
          </h1>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Free, institutional-grade masterclasses and technical frameworks designed to teach you how market structure, order flow, and derivatives truly operate.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {[
            { id: "all", label: "All Curriculum Tracks" },
            { id: "macro", label: "Macro & Supply Dynamics" },
            { id: "orderflow", label: "Order Flow & Liquidity" },
            { id: "derivatives", label: "Derivatives & Funding" },
            { id: "risk", label: "Risk Management & Math" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveFilter(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                activeFilter === cat.id
                  ? "bg-amber-400 text-slate-950 shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masterclass Tracks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredTracks.map((track) => (
            <div
              key={track.trackNumber}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-amber-700 bg-amber-100 font-bold px-2.5 py-1 rounded-lg">
                    TRACK {track.trackNumber}
                  </span>
                  <span className="text-slate-500 font-semibold">{track.level}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 group-hover:text-amber-600 transition">
                  {track.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {track.description}
                </p>

                {/* Syllabus List */}
                <div className="space-y-2.5 pt-4 border-t border-slate-100">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 font-mono">
                    Curriculum Modules Included:
                  </span>
                  {track.syllabus.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-slate-500 font-mono">
                  <span>{track.lessons}</span>
                  <span>•</span>
                  <span>{track.readTime}</span>
                </div>
                <Link
                  href="/blog"
                  className="font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1.5"
                >
                  Start Track Free <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Interactive Trading Glossary */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 mb-2">
              <BookOpen className="w-3.5 h-3.5" /> Reference Index
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900">
              Cryptocurrency & Derivatives Glossary
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Essential definitions and mathematical terminology used across institutional desks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {glossaryTerms.map((g, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                <h4 className="text-sm font-bold text-slate-900">{g.term}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{g.def}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
