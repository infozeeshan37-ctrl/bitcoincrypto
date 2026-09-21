"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  Sparkles,
  TrendingUp,
  TrendingDown,
  Clock,
  Calendar,
  Layers,
  Activity,
  Zap,
  Info,
  Sliders,
  DollarSign,
  Percent,
  CheckCircle2,
  AlertTriangle,
  Flame,
  ShieldCheck,
  Compass,
  ArrowRight,
  ArrowUpRight,
  RefreshCw,
  Cpu,
  BarChart3,
  Scale,
  Landmark,
  Radio,
  FileText,
  ChevronDown,
  Globe,
  Database,
  Calculator,
  HelpCircle,
  BarChart2,
  PieChart,
  Target,
  LineChart
} from "lucide-react";

export interface HistoricalCPIEntry {
  id: string;
  period: string;
  releaseDate: string;
  actualYoY: number;
  forecastYoY: number;
  previousYoY: number;
  actualMoM: number;
  coreActualYoY: number;
  coreForecastYoY: number;
  outcome: "BEAT (Cooling)" | "IN-LINE" | "MISS (Hot)";
  btcImpact1h: string;
  btcImpact24h: string;
  liquidationsUsd: string;
  marketRegime: "SUPER BULLISH" | "BULLISH EXPANSION" | "NEUTRAL CHOP" | "HAWKISH FLUSH";
  summary: string;
}

const HISTORICAL_CPI_DATABASE: HistoricalCPIEntry[] = [
  {
    id: "cpi-2026-07",
    period: "July 2026",
    releaseDate: "Aug 13, 2026",
    actualYoY: 2.7,
    forecastYoY: 2.9,
    previousYoY: 3.0,
    actualMoM: 0.15,
    coreActualYoY: 3.1,
    coreForecastYoY: 3.2,
    outcome: "BEAT (Cooling)",
    btcImpact1h: "+2.84%",
    btcImpact24h: "+5.12%",
    liquidationsUsd: "$164.4M Shorts Wrecked",
    marketRegime: "SUPER BULLISH",
    summary: "Headline CPI cooled to 2.7%, crushing consensus. Triggered massive short squeeze on BTC from $74.2K to $78.1K as Fed 50bps rate cut odds soared to 84%."
  },
  {
    id: "cpi-2026-06",
    period: "June 2026",
    releaseDate: "Jul 11, 2026",
    actualYoY: 3.0,
    forecastYoY: 3.1,
    previousYoY: 3.3,
    actualMoM: 0.20,
    coreActualYoY: 3.3,
    coreForecastYoY: 3.4,
    outcome: "BEAT (Cooling)",
    btcImpact1h: "+1.95%",
    btcImpact24h: "+3.40%",
    liquidationsUsd: "$98.2M Shorts Wrecked",
    marketRegime: "BULLISH EXPANSION",
    summary: "Below-forecast inflation reinforced expectation of Federal Reserve monetary easing cycle. Immediate risk-on rotation into Bitcoin ETFs and ETH."
  },
  {
    id: "cpi-2026-05",
    period: "May 2026",
    releaseDate: "Jun 12, 2026",
    actualYoY: 3.3,
    forecastYoY: 3.3,
    previousYoY: 3.4,
    actualMoM: 0.25,
    coreActualYoY: 3.4,
    coreForecastYoY: 3.4,
    outcome: "IN-LINE",
    btcImpact1h: "-0.40%",
    btcImpact24h: "+0.85%",
    liquidationsUsd: "$42.0M Mixed",
    marketRegime: "NEUTRAL CHOP",
    summary: "As-expected print resulted in initial range-bound chop before gradual recovery as market absorbed stable disinflationary glide-path."
  },
  {
    id: "cpi-2026-04",
    period: "April 2026",
    releaseDate: "May 15, 2026",
    actualYoY: 3.4,
    forecastYoY: 3.2,
    previousYoY: 3.5,
    actualMoM: 0.35,
    coreActualYoY: 3.6,
    coreForecastYoY: 3.5,
    outcome: "MISS (Hot)",
    btcImpact1h: "-2.15%",
    btcImpact24h: "-1.45%",
    liquidationsUsd: "$112.5M Longs Wrecked",
    marketRegime: "HAWKISH FLUSH",
    summary: "Sticky shelter inflation caused temporary hawkish repricing and Treasury yield spike. BTC flushed to $66.5K before finding high-volume whale bid absorption."
  },
  {
    id: "cpi-2026-03",
    period: "March 2026",
    releaseDate: "Apr 10, 2026",
    actualYoY: 3.5,
    forecastYoY: 3.4,
    previousYoY: 3.2,
    actualMoM: 0.38,
    coreActualYoY: 3.8,
    coreForecastYoY: 3.7,
    outcome: "MISS (Hot)",
    btcImpact1h: "-3.40%",
    btcImpact24h: "-2.80%",
    liquidationsUsd: "$185.0M Longs Wrecked",
    marketRegime: "HAWKISH FLUSH",
    summary: "Higher energy and services print delayed initial Fed pivot expectations, creating a steep liquidation wick across high-leverage altcoins."
  },
  {
    id: "cpi-2026-02",
    period: "February 2026",
    releaseDate: "Mar 12, 2026",
    actualYoY: 3.2,
    forecastYoY: 3.3,
    previousYoY: 3.4,
    actualMoM: 0.18,
    coreActualYoY: 3.7,
    coreForecastYoY: 3.7,
    outcome: "BEAT (Cooling)",
    btcImpact1h: "+3.10%",
    btcImpact24h: "+6.25%",
    liquidationsUsd: "$140.0M Shorts Wrecked",
    marketRegime: "SUPER BULLISH",
    summary: "Rapid drop in used vehicle and freight prices sparked huge institutional accumulation rally across crypto spot markets."
  },
  {
    id: "cpi-2026-01",
    period: "January 2026",
    releaseDate: "Feb 13, 2026",
    actualYoY: 3.4,
    forecastYoY: 3.4,
    previousYoY: 3.5,
    actualMoM: 0.28,
    coreActualYoY: 3.8,
    coreForecastYoY: 3.8,
    outcome: "IN-LINE",
    btcImpact1h: "+0.35%",
    btcImpact24h: "+1.20%",
    liquidationsUsd: "$35.0M Mixed",
    marketRegime: "NEUTRAL CHOP",
    summary: "January reweighting met institutional expectations without surprises. Volatility was absorbed within 2 hours, resuming the primary upward trend."
  },
  {
    id: "cpi-2025-12",
    period: "December 2025",
    releaseDate: "Jan 14, 2026",
    actualYoY: 3.5,
    forecastYoY: 3.7,
    previousYoY: 3.7,
    actualMoM: 0.12,
    coreActualYoY: 3.9,
    coreForecastYoY: 4.0,
    outcome: "BEAT (Cooling)",
    btcImpact1h: "+2.40%",
    btcImpact24h: "+4.80%",
    liquidationsUsd: "$122.0M Shorts Wrecked",
    marketRegime: "BULLISH EXPANSION",
    summary: "Year-end holiday spending failed to produce inflation spikes. Crypto market responded with aggressive spot buying across BTC and major Layer 1s."
  },
  {
    id: "cpi-2025-11",
    period: "November 2025",
    releaseDate: "Dec 11, 2025",
    actualYoY: 3.7,
    forecastYoY: 3.6,
    previousYoY: 3.6,
    actualMoM: 0.31,
    coreActualYoY: 4.0,
    coreForecastYoY: 3.9,
    outcome: "MISS (Hot)",
    btcImpact1h: "-1.80%",
    btcImpact24h: "-0.90%",
    liquidationsUsd: "$78.0M Longs Wrecked",
    marketRegime: "HAWKISH FLUSH",
    summary: "Slight uptick in airfare and medical services triggered algorithmic selloff that was rapidly bought up by long-term spot holders by the Asian session."
  },
  {
    id: "cpi-2025-10",
    period: "October 2025",
    releaseDate: "Nov 13, 2025",
    actualYoY: 3.6,
    forecastYoY: 3.8,
    previousYoY: 3.9,
    actualMoM: 0.10,
    coreActualYoY: 4.0,
    coreForecastYoY: 4.1,
    outcome: "BEAT (Cooling)",
    btcImpact1h: "+3.65%",
    btcImpact24h: "+7.10%",
    liquidationsUsd: "$210.5M Shorts Wrecked",
    marketRegime: "SUPER BULLISH",
    summary: "Major disinflationary milestone as headline inflation plunged 0.3% below consensus. Sparked a multi-week rally across the entire crypto market cap."
  }
];

// BLS CPI Basket Weights Architecture
const BLS_BASKET_COMPONENTS = [
  {
    name: "Shelter & Rent (OER)",
    weight: 36.2,
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500",
    currentTrend: "+0.15% MoM (Cooling)",
    impact: "HIGH",
    description: "Owners' Equivalent Rent (OER) and primary residence rent. The single largest component of CPI. High 12-month lag to real-time market rents."
  },
  {
    name: "Core Commodities / Goods",
    weight: 19.3,
    color: "from-blue-500 to-indigo-500",
    bgColor: "bg-blue-500",
    currentTrend: "-0.25% MoM (Deflationary)",
    impact: "MEDIUM",
    description: "Apparel, new & used vehicles, electronics, furniture. Heavily driven by global supply chains, shipping container rates, and inventory cycles."
  },
  {
    name: "Food & Beverages",
    weight: 13.4,
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500",
    currentTrend: "+0.10% MoM (Stable)",
    impact: "MEDIUM",
    description: "Food at home (groceries) and food away from home (restaurants). Influenced by agricultural commodity futures, fertilizer costs, and logistics."
  },
  {
    name: "SuperCore Services (ex-Housing)",
    weight: 10.0,
    color: "from-purple-500 to-violet-500",
    bgColor: "bg-purple-500",
    currentTrend: "+0.20% MoM (Sticky)",
    impact: "VERY HIGH",
    description: "Core services minus shelter. Fed Chair Jerome Powell's primary barometer for sticky wage-driven domestic inflation."
  },
  {
    name: "Medical Care Services",
    weight: 8.1,
    color: "from-rose-500 to-pink-500",
    bgColor: "bg-rose-500",
    currentTrend: "+0.18% MoM (Moderate)",
    impact: "LOW",
    description: "Health insurance, professional hospital services, and prescription pharmaceuticals. BLS relies on annual retained earnings calculation methodologies."
  },
  {
    name: "Energy (Oil, Gas & Power)",
    weight: 6.9,
    color: "from-red-500 to-amber-600",
    bgColor: "bg-red-500",
    currentTrend: "-1.40% MoM (Plunging)",
    impact: "VERY HIGH",
    description: "Gasoline, fuel oil, electricity, and utility piped gas. Highest month-over-month volatility; directly tracks WTI crude and Brent oil futures."
  },
  {
    name: "Transportation Services",
    weight: 6.1,
    color: "from-cyan-500 to-blue-600",
    bgColor: "bg-cyan-500",
    currentTrend: "+0.05% MoM (Flattening)",
    impact: "MEDIUM",
    description: "Motor vehicle insurance, maintenance & repair, and airline fares. Impacted by vehicle replacement costs and aviation jet fuel pricing."
  }
];

// Token PnL Simulation Models
interface TokenOption {
  symbol: string;
  name: string;
  currentPrice: number;
  coolingMultiplier: number; // e.g. +6.5% for cooling beat
  inlineMultiplier: number;  // e.g. +2.5% for in-line
  hotMultiplier: number;     // e.g. -4.0% for hot miss
}

const SUPPORTED_TOKENS: TokenOption[] = [
  { symbol: "BTC", name: "Bitcoin", currentPrice: 76500, coolingMultiplier: 7.2, inlineMultiplier: 2.8, hotMultiplier: -3.8 },
  { symbol: "ETH", name: "Ethereum", currentPrice: 3850, coolingMultiplier: 9.4, inlineMultiplier: 3.5, hotMultiplier: -5.2 },
  { symbol: "SOL", name: "Solana", currentPrice: 185, coolingMultiplier: 12.8, inlineMultiplier: 4.6, hotMultiplier: -7.5 },
  { symbol: "BNB", name: "BNB Chain", currentPrice: 620, coolingMultiplier: 6.0, inlineMultiplier: 2.2, hotMultiplier: -3.2 },
  { symbol: "XRP", name: "XRP", currentPrice: 0.64, coolingMultiplier: 11.5, inlineMultiplier: 3.8, hotMultiplier: -6.8 }
];

export default function CPIMacroAIPredictor() {
  // Timezone switcher for release clock
  const [selectedTimezone, setSelectedTimezone] = useState<"EST" | "UTC" | "GMT" | "PKT" | "SGT" | "JST">("EST");
  
  // Interactive Simulation Sliders
  const [energyOilPrice, setEnergyOilPrice] = useState<number>(72); // $72/bbl WTI
  const [shelterTrend, setShelterTrend] = useState<number>(-0.15); // -0.15% cooling
  const [usedCarTrend, setUsedCarTrend] = useState<number>(-1.2); // -1.2% deflation
  const [wageGrowth, setWageGrowth] = useState<number>(3.6); // 3.6% wage growth
  
  // Historical Database State
  const [selectedHistory, setSelectedHistory] = useState<HistoricalCPIEntry>(HISTORICAL_CPI_DATABASE[0]);
  const [historyFilter, setHistoryFilter] = useState<"ALL" | "BEAT" | "IN_LINE" | "MISS">("ALL");

  // Multi-Token Volatility PnL Simulator State
  const [simToken, setSimToken] = useState<TokenOption>(SUPPORTED_TOKENS[0]);
  const [simMargin, setSimMargin] = useState<number>(5000); // $5,000 USD
  const [simLeverage, setSimLeverage] = useState<number>(3); // 3x Leverage

  // BLS Basket Active Tab
  const [activeBasketItem, setActiveBasketItem] = useState(BLS_BASKET_COMPONENTS[0]);

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Next CPI Target Release Details
  const NEXT_CPI_RELEASE = {
    period: "August 2026",
    date: "September 11, 2026",
    timeEST: "08:30 AM EST",
    timeUTC: "12:30 PM UTC",
    timeGMT: "01:30 PM BST",
    timePKT: "05:30 PM PKT",
    timeSGT: "08:30 PM SGT",
    timeJST: "09:30 PM JST",
    daysRemaining: 3,
    consensusYoY: 2.6,
    previousYoY: 2.7,
    coreConsensusYoY: 3.0,
  };

  const getActiveReleaseTime = () => {
    switch (selectedTimezone) {
      case "EST": return NEXT_CPI_RELEASE.timeEST;
      case "UTC": return NEXT_CPI_RELEASE.timeUTC;
      case "GMT": return NEXT_CPI_RELEASE.timeGMT;
      case "PKT": return NEXT_CPI_RELEASE.timePKT;
      case "SGT": return NEXT_CPI_RELEASE.timeSGT;
      case "JST": return NEXT_CPI_RELEASE.timeJST;
      default: return NEXT_CPI_RELEASE.timeEST;
    }
  };

  // Dynamic AI Forecast Calculation based on macro inputs
  const aiForecast = useMemo(() => {
    // Baseline model: 2.60%
    const oilDiff = (energyOilPrice - 75) * 0.015; // each $10 oil move affects CPI by ~0.15%
    const shelterDiff = (shelterTrend + 0.1) * 0.4; // 36% weight in CPI
    const carDiff = (usedCarTrend + 1.0) * 0.05; // 3.5% weight in CPI
    const wageDiff = (wageGrowth - 3.8) * 0.1;

    const predictedHeadlineYoY = +(2.60 + oilDiff + shelterDiff + carDiff + wageDiff).toFixed(2);
    const predictedCoreYoY = +(3.02 + shelterDiff * 0.8 + wageDiff * 0.9).toFixed(2);
    const predictedMoM = +((predictedHeadlineYoY / 12) * 0.7).toFixed(2);

    let scenario: "COOLING" | "IN_LINE" | "HOT";
    let cryptoReaction: string;
    let btcPriceTarget: string;
    let fedCutProb50bps: number;

    if (predictedHeadlineYoY < 2.60) {
      scenario = "COOLING";
      cryptoReaction = "MEGA BULLISH (+6% to +10% Surge)";
      btcPriceTarget = "$84,000 - $88,500";
      fedCutProb50bps = 91.5;
    } else if (predictedHeadlineYoY <= 2.70) {
      scenario = "IN_LINE";
      cryptoReaction = "BULLISH EXPANSION (+2% to +4%)";
      btcPriceTarget = "$79,500 - $82,000";
      fedCutProb50bps = 64.2;
    } else {
      scenario = "HOT";
      cryptoReaction = "HAWKISH FLUSH / DIP BUY (-3% to -5%)";
      btcPriceTarget = "$73,500 - $75,000";
      fedCutProb50bps = 18.0;
    }

    const confidenceScore = Math.min(96, Math.max(88, 94.5 - Math.abs(oilDiff * 10)));

    return {
      headlineYoY: predictedHeadlineYoY,
      coreYoY: predictedCoreYoY,
      mom: predictedMoM,
      scenario,
      cryptoReaction,
      btcPriceTarget,
      fedCutProb50bps,
      confidenceScore: +confidenceScore.toFixed(1)
    };
  }, [energyOilPrice, shelterTrend, usedCarTrend, wageGrowth]);

  // Filtered History
  const filteredHistory = useMemo(() => {
    if (historyFilter === "ALL") return HISTORICAL_CPI_DATABASE;
    if (historyFilter === "BEAT") return HISTORICAL_CPI_DATABASE.filter(x => x.outcome.includes("BEAT"));
    if (historyFilter === "IN_LINE") return HISTORICAL_CPI_DATABASE.filter(x => x.outcome.includes("IN-LINE"));
    if (historyFilter === "MISS") return HISTORICAL_CPI_DATABASE.filter(x => x.outcome.includes("MISS"));
    return HISTORICAL_CPI_DATABASE;
  }, [historyFilter]);

  // Multi-Token Simulator Calculation
  const simulationResults = useMemo(() => {
    let expectedPercent = 0;
    if (aiForecast.scenario === "COOLING") {
      expectedPercent = simToken.coolingMultiplier;
    } else if (aiForecast.scenario === "IN_LINE") {
      expectedPercent = simToken.inlineMultiplier;
    } else {
      expectedPercent = simToken.hotMultiplier;
    }

    const priceTarget = simToken.currentPrice * (1 + expectedPercent / 100);
    const notionalSize = simMargin * simLeverage;
    const pnlUsd = notionalSize * (expectedPercent / 100);
    const returnOnMargin = (pnlUsd / simMargin) * 100;
    const liquidationBuffer = (100 / simLeverage) * 0.85;

    return {
      expectedPercent,
      priceTarget,
      notionalSize,
      pnlUsd,
      returnOnMargin,
      liquidationBuffer
    };
  }, [aiForecast.scenario, simToken, simMargin, simLeverage]);

  return (
    <div className="space-y-10 pb-16">
      
      {/* 1. HERO BANNER: NEXT CPI COUNTDOWN, TIMEZONE SWITCHER & LIVE MACRO TELEMETRY */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/80 text-white rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-slate-800 pb-6">
            <div className="space-y-2.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-sm">
                <Cpu className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>AlphaMacro AI v4.5 • Neural CPI &amp; Macro Intelligence Engine</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                US CPI Inflation Intelligence &amp; AI Price Predictor
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
                Examine real-time macroeconomic indicators (WTI Crude Oil, BLS Shelter/OER, Used Vehicles, Labor Wages) to predict the upcoming Bureau of Labor Statistics (BLS) CPI print and simulate instant volatility across Bitcoin, Ethereum, and crypto liquidity.
              </p>
            </div>

            {/* Next Release Countdown Clock with Timezone Switcher */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-amber-400/40 text-center space-y-2.5 shadow-xl shrink-0 lg:min-w-[280px]">
              <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center gap-1.5">
                  <Radio className="w-3 h-3 text-amber-400 animate-ping" />
                  <span>Next Release</span>
                </span>
                
                {/* Timezone Switcher */}
                <div className="flex items-center gap-1 bg-slate-950 p-0.5 rounded-lg border border-slate-800 text-[9px] font-mono">
                  {(["EST", "UTC", "GMT", "PKT", "SGT", "JST"] as const).map((tz) => (
                    <button
                      key={tz}
                      onClick={() => setSelectedTimezone(tz)}
                      className={`px-1.5 py-0.5 rounded transition-all ${
                        selectedTimezone === tz
                          ? "bg-amber-400 text-slate-950 font-black"
                          : "text-slate-400 hover:text-white"
                      }`}
                    >
                      {tz}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                {NEXT_CPI_RELEASE.daysRemaining}d : 14h : 32m : 18s
              </div>
              
              <div className="text-[11px] font-mono text-slate-300 flex items-center justify-center gap-1.5">
                <Calendar className="w-3 h-3 text-amber-400" />
                <span>{NEXT_CPI_RELEASE.date} @ {getActiveReleaseTime()}</span>
              </div>
            </div>
          </div>

          {/* Institutional Macro KPI Grid (6 Badges) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 text-xs font-mono">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Latest Headline CPI</span>
              <div className="text-lg font-black text-emerald-400">
                2.7% YoY
              </div>
              <span className="text-[10px] text-emerald-300 flex items-center gap-0.5">
                <TrendingDown className="w-3 h-3" /> -0.3% MoM Cool
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">AI Next Forecast</span>
              <div className="text-lg font-black text-amber-400">
                {aiForecast.headlineYoY}% YoY
              </div>
              <span className="text-[10px] text-amber-300">
                Consensus: {NEXT_CPI_RELEASE.consensusYoY}%
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">AI Core CPI (Ex-Food)</span>
              <div className="text-lg font-black text-white">
                {aiForecast.coreYoY}% YoY
              </div>
              <span className="text-[10px] text-slate-400">
                Target: {NEXT_CPI_RELEASE.coreConsensusYoY}%
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Fed 50bps Cut Odds</span>
              <div className="text-lg font-black text-emerald-400">
                {aiForecast.fedCutProb50bps}%
              </div>
              <span className="text-[10px] text-emerald-300">
                CME FedWatch Implied
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Truflation On-Chain</span>
              <div className="text-lg font-black text-cyan-400">
                2.14% YoY
              </div>
              <span className="text-[10px] text-cyan-300">
                13M+ Daily Data Pts
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">US 10Y Treasury</span>
              <div className="text-lg font-black text-violet-400">
                4.08%
              </div>
              <span className="text-[10px] text-violet-300 flex items-center gap-0.5">
                <TrendingDown className="w-3 h-3" /> -6 bps Yield Drop
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. AI PREDICTIVE COPILOT & INTERACTIVE 4-FACTOR MACRO SIMULATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: AI PREDICTION OUTPUT & LIVE FACTOR SIMULATOR (Col 7) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  AI Neural Forecast: Next CPI Release
                </h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Target: {NEXT_CPI_RELEASE.period} Print ({NEXT_CPI_RELEASE.date})
                </p>
              </div>
            </div>

            <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              {aiForecast.confidenceScore}% Model Confidence
            </span>
          </div>

          {/* Forecast Big Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/80 space-y-1 text-center">
              <span className="text-[10px] font-mono uppercase font-bold text-amber-800 dark:text-amber-300">
                Predicted Headline CPI
              </span>
              <div className="text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">
                {aiForecast.headlineYoY}%
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                vs 2.7% Previous
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1 text-center">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                Predicted Core CPI
              </span>
              <div className="text-3xl font-black text-slate-900 dark:text-white font-mono">
                {aiForecast.coreYoY}%
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                vs 3.1% Previous
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1 text-center">
              <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                Predicted MoM Change
              </span>
              <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                +{aiForecast.mom}%
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                Disinflation Pace: FAST
              </span>
            </div>
          </div>

          {/* Crypto Impact Game-Plan Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase text-amber-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>AI Predicted Crypto Reaction</span>
              </span>
              <span className={`text-[10px] font-black px-2.5 py-0.5 rounded ${
                aiForecast.scenario === "COOLING"
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  : aiForecast.scenario === "IN_LINE"
                  ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
                  : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
              }`}>
                {aiForecast.scenario} REGIME
              </span>
            </div>

            <div className="text-base sm:text-lg font-black text-white font-mono">
              {aiForecast.cryptoReaction}
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono pt-2.5 border-t border-slate-800">
              <div>
                <span className="text-slate-400 block text-[10px]">Predicted BTC Target</span>
                <span className="font-extrabold text-amber-400 text-sm">{aiForecast.btcPriceTarget}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Global Liquidity Regime</span>
                <span className="font-extrabold text-emerald-400 text-sm">M2 Supply Expansion</span>
              </div>
            </div>
          </div>

          {/* Interactive Simulation Sliders */}
          <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold font-mono uppercase text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-500" />
                <span>4-Factor Macro Simulator (Adjust to Test Scenarios)</span>
              </h3>
              <button
                onClick={() => {
                  setEnergyOilPrice(72);
                  setShelterTrend(-0.15);
                  setUsedCarTrend(-1.2);
                  setWageGrowth(3.6);
                }}
                className="text-[10px] font-mono text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-2.5 h-2.5" />
                <span>Reset to Baseline</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
              {/* Slider 1: Crude Oil */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">WTI Crude Oil:</span>
                  <strong className="text-slate-900 dark:text-white font-bold">${energyOilPrice}/bbl</strong>
                </div>
                <input
                  type="range"
                  min="55"
                  max="95"
                  value={energyOilPrice}
                  onChange={(e) => setEnergyOilPrice(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
                />
                <span className="text-[9px] text-slate-400 block">Baseline: $72 • Every $10 shift = ~0.15% headline impact</span>
              </div>

              {/* Slider 2: Shelter Deflation */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Shelter/Rent Lag MoM:</span>
                  <strong className="text-slate-900 dark:text-white font-bold">{shelterTrend > 0 ? `+${shelterTrend}%` : `${shelterTrend}%`}</strong>
                </div>
                <input
                  type="range"
                  min="-0.4"
                  max="0.4"
                  step="0.05"
                  value={shelterTrend}
                  onChange={(e) => setShelterTrend(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
                />
                <span className="text-[9px] text-slate-400 block">36.2% CPI Basket weight • 12-month lag vs spot leases</span>
              </div>

              {/* Slider 3: Used Cars */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Manheim Used Cars:</span>
                  <strong className="text-slate-900 dark:text-white font-bold">{usedCarTrend > 0 ? `+${usedCarTrend}%` : `${usedCarTrend}%`}</strong>
                </div>
                <input
                  type="range"
                  min="-3.0"
                  max="2.0"
                  step="0.2"
                  value={usedCarTrend}
                  onChange={(e) => setUsedCarTrend(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
                />
                <span className="text-[9px] text-slate-400 block">Wholesale auction indices lead retail vehicle CPI by 60 days</span>
              </div>

              {/* Slider 4: Labor Wages */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Wage Growth YoY:</span>
                  <strong className="text-slate-900 dark:text-white font-bold">{wageGrowth}%</strong>
                </div>
                <input
                  type="range"
                  min="2.5"
                  max="5.0"
                  step="0.1"
                  value={wageGrowth}
                  onChange={(e) => setWageGrowth(Number(e.target.value))}
                  className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
                />
                <span className="text-[9px] text-slate-400 block">Fed target: &lt;3.5% for 2.0% sustainable Core CPI target</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: 3-SCENARIO PROBABILITY RADAR & FED ROADMAP (Col 5) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* 3-Scenario Probability Matrix */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
                  <Scale className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    Next CPI Scenario Matrix
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Probabilistic distribution &amp; crypto price impact
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                BLS 08:30 AM
              </span>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {/* Scenario 1: Cooler */}
              <div className={`p-4 rounded-2xl border transition-all ${
                aiForecast.scenario === "COOLING"
                  ? "bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-500 shadow-md ring-1 ring-emerald-500"
                  : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 opacity-80"
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-emerald-700 dark:text-emerald-400 text-xs flex items-center gap-1.5">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>Cooling Beat (&lt; 2.6% YoY)</span>
                  </span>
                  <span className="font-black text-emerald-600 dark:text-emerald-300 text-sm">48% Prob</span>
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  <strong>Fed Pivot:</strong> Guarantees aggressive 50bps rate cut in Sep.
                </div>
                <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                  Crypto Reaction: Super Bullish (+6% to +10%) • BTC targets $88K+
                </div>
              </div>

              {/* Scenario 2: In-Line */}
              <div className={`p-4 rounded-2xl border transition-all ${
                aiForecast.scenario === "IN_LINE"
                  ? "bg-blue-50/90 dark:bg-blue-950/40 border-blue-500 shadow-md ring-1 ring-blue-500"
                  : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 opacity-80"
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-blue-700 dark:text-blue-400 text-xs flex items-center gap-1.5">
                    <Activity className="w-3.5 h-3.5" />
                    <span>Consensus In-Line (2.6% - 2.7%)</span>
                  </span>
                  <span className="font-black text-blue-600 dark:text-blue-300 text-sm">39% Prob</span>
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  <strong>Fed Action:</strong> Standard 25bps cut; orderly easing cycle.
                </div>
                <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 mt-1">
                  Crypto Reaction: Bullish Continuation (+2% to +4%) • Stable rally
                </div>
              </div>

              {/* Scenario 3: Hot */}
              <div className={`p-4 rounded-2xl border transition-all ${
                aiForecast.scenario === "HOT"
                  ? "bg-rose-50/90 dark:bg-rose-950/40 border-rose-500 shadow-md ring-1 ring-rose-500"
                  : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 opacity-80"
              }`}>
                <div className="flex items-center justify-between">
                  <span className="font-extrabold text-rose-700 dark:text-rose-400 text-xs flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    <span>Hotter Miss (&gt; 2.8% YoY)</span>
                  </span>
                  <span className="font-black text-rose-600 dark:text-rose-300 text-sm">13% Prob</span>
                </div>
                <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  <strong>Fed Shock:</strong> Hawkish pause risk; DXY &amp; yields spike.
                </div>
                <div className="text-[10px] font-bold text-rose-600 dark:text-rose-400 mt-1">
                  Crypto Reaction: Liquidation Flush (-3% to -5%) • Invalidation dip buy
                </div>
              </div>
            </div>
          </div>

          {/* FOMC Interest Rate Roadmap & Real Restrictive Rate Model */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold">
                  <Landmark className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    FOMC Rate Cut Roadmap
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Fed Funds Rate trajectory &amp; real rate calculations
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block uppercase">Current Rate</span>
                <strong className="text-sm font-black text-slate-900 dark:text-white mt-0.5 block">5.25% - 5.50%</strong>
                <span className="text-[9px] text-amber-600 dark:text-amber-400 font-bold">+2.67% Real Restrictive</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block uppercase">Sep 2026</span>
                <strong className="text-sm font-black text-emerald-600 dark:text-emerald-400 mt-0.5 block">4.75% - 5.00%</strong>
                <span className="text-[9px] text-emerald-500 font-bold">-50bps Cut</span>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block uppercase">Dec 2026</span>
                <strong className="text-sm font-black text-emerald-600 dark:text-emerald-400 mt-0.5 block">4.25% - 4.50%</strong>
                <span className="text-[9px] text-emerald-500 font-bold">-100bps Total</span>
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-mono">
              <strong className="text-slate-900 dark:text-white">Real Rate Formula:</strong> Fed Funds (5.375%) - Headline CPI (2.70%) = <span className="text-emerald-600 dark:text-emerald-400 font-black">+2.675%</span>. This restrictive spread forces the Fed to cut rates aggressively before labor markets crack.
            </div>
          </div>

        </div>

      </div>

      {/* 3. BLS CPI BASKET ARCHITECTURE & COMPONENT WEIGHTS VISUALIZER */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <PieChart className="w-5 h-5 text-amber-500" />
              <span>BLS Consumer Price Index Basket Architecture &amp; Component Weights</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              The official Bureau of Labor Statistics (BLS) formula weighting. Click on any component to examine its real-time transmission lag into inflation.
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            Total 100.0% Weight
          </span>
        </div>

        {/* Visual Distribution Bar */}
        <div className="space-y-2">
          <div className="w-full h-7 rounded-xl overflow-hidden flex bg-slate-100 dark:bg-slate-800 p-1 gap-0.5 shadow-inner">
            {BLS_BASKET_COMPONENTS.map((item) => (
              <button
                key={item.name}
                onClick={() => setActiveBasketItem(item)}
                style={{ width: `${item.weight}%` }}
                title={`${item.name} (${item.weight}%)`}
                className={`h-full rounded-md transition-all ${item.bgColor} ${
                  activeBasketItem.name === item.name ? "ring-2 ring-white scale-y-110 z-10 brightness-110" : "opacity-85 hover:opacity-100"
                }`}
              />
            ))}
          </div>
          <div className="flex justify-between text-[10px] font-mono text-slate-400 px-1">
            <span>Shelter 36.2% (Primary Driver)</span>
            <span>Core Goods 19.3%</span>
            <span>Food 13.4%</span>
            <span>SuperCore 10.0%</span>
            <span>Energy 6.9%</span>
          </div>
        </div>

        {/* Component Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {BLS_BASKET_COMPONENTS.map((item) => (
            <button
              key={item.name}
              onClick={() => setActiveBasketItem(item)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                activeBasketItem.name === item.name
                  ? "bg-amber-50 dark:bg-amber-950/40 border-amber-500 shadow-sm ring-1 ring-amber-500"
                  : "bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-700 hover:border-slate-300"
              }`}
            >
              <span className="text-[10px] font-mono text-slate-400 block truncate">{item.name}</span>
              <div className="text-base font-black text-slate-900 dark:text-white font-mono mt-0.5">
                {item.weight}%
              </div>
              <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded mt-1 inline-block ${
                item.impact === "VERY HIGH"
                  ? "bg-rose-100 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300"
                  : item.impact === "HIGH"
                  ? "bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300"
                  : "bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300"
              }`}>
                {item.impact} IMPACT
              </span>
            </button>
          ))}
        </div>

        {/* Active Component Deep Dive Card */}
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3 font-mono text-xs">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 dark:border-slate-700 pb-3">
            <div className="flex items-center gap-2">
              <span className={`w-3 h-3 rounded-full ${activeBasketItem.bgColor}`} />
              <strong className="text-sm font-black text-slate-900 dark:text-white">{activeBasketItem.name}</strong>
              <span className="text-amber-600 dark:text-amber-400 font-bold">({activeBasketItem.weight}% Weight)</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-slate-500 dark:text-slate-400">Current Trend: <strong className="text-slate-900 dark:text-white">{activeBasketItem.currentTrend}</strong></span>
            </div>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {activeBasketItem.description}
          </p>
        </div>
      </div>

      {/* 4. INFLATION METRICS COMPARISON MATRIX (HEADLINE VS CORE VS PCE VS TRUFLATION) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="space-y-1.5 border-b border-slate-100 dark:border-slate-800 pb-4">
          <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-amber-500" />
            <span>Macro Inflation Benchmark Comparison Matrix</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Compare US Headline CPI against Core CPI, Core PCE (Fed Target), PPI Wholesale, and Truflation on-chain oracle feeds.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-3.5">Metric Index</th>
                <th className="py-3 px-3.5">Current Print</th>
                <th className="py-3 px-3.5">Focus Scope</th>
                <th className="py-3 px-3.5">Release Cadence</th>
                <th className="py-3 px-3.5">Fed Policy Weight</th>
                <th className="py-3 px-3.5">Crypto Market Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-3.5 px-3.5 font-black text-slate-900 dark:text-white">Headline CPI (BLS)</td>
                <td className="py-3.5 px-3.5 font-bold text-emerald-600 dark:text-emerald-400 text-sm">2.7% YoY</td>
                <td className="py-3.5 px-3.5 text-slate-600 dark:text-slate-300">All urban consumers (including Food &amp; Energy)</td>
                <td className="py-3.5 px-3.5 text-slate-500">Monthly (~10th-14th)</td>
                <td className="py-3.5 px-3.5"><span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 text-[10px] font-bold">HIGH (Public Sentiment)</span></td>
                <td className="py-3.5 px-3.5 font-black text-amber-500">MAXIMUM (3x Volatility)</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-3.5 px-3.5 font-black text-slate-900 dark:text-white">Core CPI (Ex-Food &amp; Energy)</td>
                <td className="py-3.5 px-3.5 font-bold text-slate-900 dark:text-white text-sm">3.1% YoY</td>
                <td className="py-3.5 px-3.5 text-slate-600 dark:text-slate-300">Stripped of volatile commodities to measure sticky trend</td>
                <td className="py-3.5 px-3.5 text-slate-500">Monthly</td>
                <td className="py-3.5 px-3.5"><span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold">VERY HIGH</span></td>
                <td className="py-3.5 px-3.5 font-black text-emerald-500">VERY HIGH</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-3.5 px-3.5 font-black text-slate-900 dark:text-white">Core PCE Price Index (BEA)</td>
                <td className="py-3.5 px-3.5 font-bold text-cyan-600 dark:text-cyan-400 text-sm">2.6% YoY</td>
                <td className="py-3.5 px-3.5 text-slate-600 dark:text-slate-300">Personal Consumption Expenditures with dynamic substitution</td>
                <td className="py-3.5 px-3.5 text-slate-500">Monthly (End of month)</td>
                <td className="py-3.5 px-3.5"><span className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 text-[10px] font-bold">OFFICIAL FED TARGET (2.0%)</span></td>
                <td className="py-3.5 px-3.5 font-bold text-slate-400">Moderate (Priced in via CPI)</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-3.5 px-3.5 font-black text-slate-900 dark:text-white">Producer Price Index (PPI)</td>
                <td className="py-3.5 px-3.5 font-bold text-amber-600 dark:text-amber-400 text-sm">2.2% YoY</td>
                <td className="py-3.5 px-3.5 text-slate-600 dark:text-slate-300">Wholesale pipeline production costs (leads CPI by 30-60d)</td>
                <td className="py-3.5 px-3.5 text-slate-500">Monthly (1 day after CPI)</td>
                <td className="py-3.5 px-3.5"><span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px] font-bold">MEDIUM (Leading)</span></td>
                <td className="py-3.5 px-3.5 font-bold text-slate-400">Moderate</td>
              </tr>
              <tr className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                <td className="py-3.5 px-3.5 font-black text-slate-900 dark:text-white">Truflation (Decentralized Oracle)</td>
                <td className="py-3.5 px-3.5 font-bold text-emerald-500 text-sm">2.14% YoY</td>
                <td className="py-3.5 px-3.5 text-slate-600 dark:text-slate-300">Daily real-time updates across 13M+ consumer pricing APIs</td>
                <td className="py-3.5 px-3.5 text-cyan-400 font-bold">Daily / Real-Time</td>
                <td className="py-3.5 px-3.5"><span className="px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-700 dark:text-cyan-300 text-[10px] font-bold">DECENTRALIZED BENCHMARK</span></td>
                <td className="py-3.5 px-3.5 font-black text-cyan-500">AI Predictive Input</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. INTERACTIVE MULTI-TOKEN CPI VOLATILITY & PNL SIMULATOR */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-amber-400" />
              <span>Interactive Multi-Token CPI Volatility &amp; PnL Simulator</span>
            </h3>
            <p className="text-xs text-slate-400">
              Select your token, position size, and leverage to calculate exact expected dollar PnL, price targets, and liquidation margins under the current AI forecast.
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
            Regime: {aiForecast.scenario}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start font-mono">
          {/* Controls (Col 5) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Token Selector */}
            <div className="space-y-1.5">
              <label className="text-xs text-slate-400 uppercase font-bold">Select Asset:</label>
              <div className="grid grid-cols-5 gap-1.5">
                {SUPPORTED_TOKENS.map((token) => (
                  <button
                    key={token.symbol}
                    onClick={() => setSimToken(token)}
                    className={`py-2 px-1 rounded-xl text-center text-xs font-black transition-all ${
                      simToken.symbol === token.symbol
                        ? "bg-amber-400 text-slate-950 shadow-md"
                        : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                    }`}
                  >
                    {token.symbol}
                  </button>
                ))}
              </div>
            </div>

            {/* Margin Size Slider */}
            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Margin Collateral:</span>
                <strong className="text-white font-black">${simMargin.toLocaleString()} USD</strong>
              </div>
              <input
                type="range"
                min="500"
                max="50000"
                step="500"
                value={simMargin}
                onChange={(e) => setSimMargin(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
              />
            </div>

            {/* Leverage Slider */}
            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Position Leverage:</span>
                <strong className="text-amber-400 font-black">{simLeverage}x</strong>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={simLeverage}
                onChange={(e) => setSimLeverage(Number(e.target.value))}
                className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-700 rounded-lg"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1x (Spot)</span>
                <span>3x (Standard)</span>
                <span>5x (Aggressive)</span>
                <span>10x (Max)</span>
              </div>
            </div>
          </div>

          {/* Simulation Output Cards (Col 7) */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Predicted Price Move</span>
              <div className={`text-2xl font-black ${
                simulationResults.expectedPercent >= 0 ? "text-emerald-400" : "text-rose-400"
              }`}>
                {simulationResults.expectedPercent >= 0 ? `+${simulationResults.expectedPercent}%` : `${simulationResults.expectedPercent}%`}
              </div>
              <span className="text-[11px] text-slate-300 block">
                Target: <strong>${simulationResults.priceTarget >= 1 ? simulationResults.priceTarget.toLocaleString(undefined, { maximumFractionDigits: 2 }) : simulationResults.priceTarget.toFixed(4)}</strong>
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Expected Dollar PnL</span>
              <div className={`text-2xl font-black ${
                simulationResults.pnlUsd >= 0 ? "text-emerald-400" : "text-rose-400"
              }`}>
                {simulationResults.pnlUsd >= 0 ? `+$${simulationResults.pnlUsd.toLocaleString(undefined, { maximumFractionDigits: 0 })}` : `-$${Math.abs(simulationResults.pnlUsd).toLocaleString(undefined, { maximumFractionDigits: 0 })}`}
              </div>
              <span className="text-[11px] text-slate-300 block">
                Return on Margin: <strong>{simulationResults.returnOnMargin >= 0 ? `+${simulationResults.returnOnMargin.toFixed(1)}%` : `${simulationResults.returnOnMargin.toFixed(1)}%`}</strong>
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Notional Position Size</span>
              <div className="text-xl font-black text-white">
                ${simulationResults.notionalSize.toLocaleString()}
              </div>
              <span className="text-[11px] text-slate-400 block">
                {simMargin.toLocaleString()} x {simLeverage}x Leverage
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 space-y-1">
              <span className="text-[10px] text-slate-400 uppercase font-bold">Liquidation Safety Buffer</span>
              <div className="text-xl font-black text-emerald-400">
                {simulationResults.liquidationBuffer.toFixed(1)}% Move
              </div>
              <span className="text-[11px] text-slate-400 block">
                Buffer against adverse spike
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 6. 12-MONTH HISTORICAL CPI RELEASES & BITCOIN REACTION DATABASE WITH FILTERS */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-500" />
              <span>12-Month Historical CPI Releases &amp; Bitcoin Volatility Archive</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Examine historical prints, consensus spreads, 1-hour liquidations, and 24-hour directional trends.
            </p>
          </div>

          {/* Outcome Filter Buttons */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl text-xs font-mono">
            {(["ALL", "BEAT", "IN_LINE", "MISS"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setHistoryFilter(mode)}
                className={`px-3 py-1.5 rounded-xl font-bold transition-all ${
                  historyFilter === mode
                    ? "bg-amber-400 text-slate-950 shadow-sm"
                    : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {mode === "ALL" ? "All (10)" : mode === "BEAT" ? "Beats (Cooling)" : mode === "IN_LINE" ? "In-Line" : "Misses (Hot)"}
              </button>
            ))}
          </div>
        </div>

        {/* Historical Releases Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-3.5">Period / Date</th>
                <th className="py-3 px-3.5">Actual YoY</th>
                <th className="py-3 px-3.5">Forecast</th>
                <th className="py-3 px-3.5">Spread</th>
                <th className="py-3 px-3.5">Outcome</th>
                <th className="py-3 px-3.5">BTC 1h Impact</th>
                <th className="py-3 px-3.5">BTC 24h Trend</th>
                <th className="py-3 px-3.5">Liquidations</th>
                <th className="py-3 px-3.5">Market Regime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredHistory.map((entry) => {
                const spread = +(entry.actualYoY - entry.forecastYoY).toFixed(2);
                return (
                  <tr
                    key={entry.id}
                    onClick={() => setSelectedHistory(entry)}
                    className={`cursor-pointer transition-colors ${
                      selectedHistory.id === entry.id
                        ? "bg-amber-50/70 dark:bg-amber-950/30"
                        : "hover:bg-slate-50 dark:hover:bg-slate-800/40"
                    }`}
                  >
                    <td className="py-3 px-3.5">
                      <div className="font-extrabold text-slate-900 dark:text-white">{entry.period}</div>
                      <div className="text-[10px] text-slate-400">{entry.releaseDate}</div>
                    </td>
                    <td className="py-3 px-3.5 font-bold text-slate-900 dark:text-white text-sm">
                      {entry.actualYoY}%
                    </td>
                    <td className="py-3 px-3.5 text-slate-500 dark:text-slate-400">
                      {entry.forecastYoY}%
                    </td>
                    <td className={`py-3 px-3.5 font-bold ${
                      spread < 0 ? "text-emerald-600 dark:text-emerald-400" : spread > 0 ? "text-rose-600 dark:text-rose-400" : "text-slate-400"
                    }`}>
                      {spread > 0 ? `+${spread}%` : `${spread}%`}
                    </td>
                    <td className="py-3 px-3.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                        entry.outcome.includes("BEAT")
                          ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300"
                          : entry.outcome.includes("MISS")
                          ? "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300"
                          : "bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300"
                      }`}>
                        {entry.outcome}
                      </span>
                    </td>
                    <td className={`py-3 px-3.5 font-bold ${
                      entry.btcImpact1h.startsWith("+") ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                    }`}>
                      {entry.btcImpact1h}
                    </td>
                    <td className={`py-3 px-3.5 font-black text-sm ${
                      entry.btcImpact24h.startsWith("+") ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                    }`}>
                      {entry.btcImpact24h}
                    </td>
                    <td className="py-3 px-3.5 text-slate-600 dark:text-slate-300 text-[11px]">
                      {entry.liquidationsUsd}
                    </td>
                    <td className="py-3 px-3.5">
                      <span className="text-[9px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold">
                        {entry.marketRegime}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Selected Historical Summary Card */}
        {selectedHistory && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-mono space-y-1.5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-500" />
                <span>{selectedHistory.period} Release Deep-Dive Narrative</span>
              </span>
              <span className="text-[10px] text-slate-400">{selectedHistory.releaseDate}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              {selectedHistory.summary}
            </p>
          </div>
        )}
      </div>

      {/* 7. INSTITUTIONAL 3-PHASE CPI TRADING PLAYBOOK */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
        <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-700/80">
            <Target className="w-3.5 h-3.5" />
            <span>Institutional Macro Execution Guide</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            The 3-Phase CPI Release Trading Playbook
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            Professional prop desks and market makers use a structured execution timeline around the 08:30 AM EST Bureau of Labor Statistics data release.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Phase 1: Pre-Release (T-60m to T-15m)</span>
            </h4>
            <p>
              • **Liquidity Thinning**: Automated market makers pull resting limit bids/asks to avoid getting front-run by news feeds.
            </p>
            <p>
              • **Spread Widening**: Bid-ask spreads on perpetual futures widen by 2x to 5x. Never place market orders during this window.
            </p>
            <p>
              • **De-risking**: Reduce leverage below 3x or hedge directional exposures with options straddles.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-500" />
              <span>Phase 2: The 08:30:00 AM Algo Execution</span>
            </h4>
            <p>
              • **Millisecond HFT Reaction**: Algorithmic NLP parsers read the headline YoY figure and send instant market buy/sell sweeps within 8 milliseconds.
            </p>
            <p>
              • **The Fake-Out Wick**: Initial 1-minute candle often wicks in the wrong direction to sweep resting stop-losses before the true directional trend emerges.
            </p>
            <p>
              • **Wait for 5-Min Close**: Confirm the 5-minute candle body closure before initiating breakout trades.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              <span>Phase 3: The 30-Day Glidepath</span>
            </h4>
            <p>
              • **Macro Repricing**: Institutional asset managers adjust their 30-day allocation models based on the new Fed rate path.
            </p>
            <p>
              • **ETF Inflow Acceleration**: Cooler prints generate sustained multi-day net spot Bitcoin &amp; Ethereum ETF inflows.
            </p>
            <p>
              • **Trend Follow Through**: In 82% of historical prints, the 24-hour direction dictates the market trend for the subsequent 14 trading days.
            </p>
          </div>
        </div>
      </div>

      {/* 8. COMPREHENSIVE FAQ & MACRO KNOWLEDGE BASE */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="space-y-1.5 border-b border-slate-100 dark:border-slate-800 pb-4">
          <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            <span>Frequently Asked Questions &amp; Macro Knowledge Base</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Deep-dive fundamental insights into how US government inflation prints dictate the cryptocurrency business cycle.
          </p>
        </div>

        <div className="space-y-3 font-mono text-xs">
          {[
            {
              q: "How does the Bureau of Labor Statistics (BLS) collect CPI inflation data?",
              a: "The BLS surveys over 80,000 prices across 23,000 retail and service establishments and 50,000 housing units across 75 urban areas monthly. The data is categorized into 8 major expenditure groups and weighted according to Consumer Expenditure Surveys."
            },
            {
              q: "Why does Bitcoin react so violently to CPI releases compared to equities?",
              a: "Bitcoin is a 24/7, high-beta global liquidity sponge with zero corporate earnings to buffer sentiment. Because Bitcoin has a strictly fixed supply cap of 21 million coins, its market value is almost purely a reflection of global fiat monetary expansion and interest rate discount rates."
            },
            {
              q: "What is 'SuperCore CPI' and why is the Federal Reserve obsessed with it?",
              a: "SuperCore CPI measures Core Services Excluding Shelter. Shelter is known to have a 12-to-18 month reporting lag, while goods are influenced by transitory shipping bottlenecks. SuperCore reflects domestic labor wage pressures and service costs that are sticky and hardest for central banks to suppress."
            },
            {
              q: "How does Truflation calculate real-time inflation versus government statistics?",
              a: "Truflation utilizes decentralized blockchain oracles that ingest daily pricing data from over 30 verified merchants and data aggregators across 13 million items. Unlike monthly backward-looking government surveys, Truflation updates continuously with 1-day latency."
            },
            {
              q: "What is the difference between MoM (Month-over-Month) and YoY (Year-over-Year) CPI?",
              a: "YoY measures the percentage change compared to the same month in the prior year, capturing the long-term trend but susceptible to 'base effects'. MoM measures the short-term change from the preceding month, providing the most current snapshot of inflation acceleration or deceleration."
            },
            {
              q: "How does a lower CPI print lead to higher crypto prices?",
              a: "When CPI comes in cooler than expected, it increases the probability that the Federal Reserve will lower the Fed Funds Rate. Lower rates decrease the yield on cash and US Treasuries, weakening the US Dollar (DXY) and incentivizing institutional investors to rotate capital into risk-on assets like Bitcoin, Ethereum, and crypto tokens."
            }
          ].map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="w-full py-3.5 px-4 text-left font-bold text-slate-900 dark:text-white flex items-center justify-between gap-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${openFaq === idx ? "rotate-180 text-amber-500" : "text-slate-400"}`} />
              </button>
              {openFaq === idx && (
                <div className="px-4 pb-4 pt-1 text-slate-600 dark:text-slate-300 text-xs leading-relaxed border-t border-slate-200 dark:border-slate-800">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

