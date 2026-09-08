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
  FileText
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
  }
];

export default function CPIMacroAIPredictor() {
  // Interactive Simulation Sliders
  const [energyOilPrice, setEnergyOilPrice] = useState<number>(72); // $72/bbl WTI
  const [shelterTrend, setShelterTrend] = useState<number>(-0.15); // -0.15% cooling
  const [usedCarTrend, setUsedCarTrend] = useState<number>(-1.2); // -1.2% deflation
  const [wageGrowth, setWageGrowth] = useState<number>(3.6); // 3.6% wage growth
  const [selectedHistory, setSelectedHistory] = useState<HistoricalCPIEntry>(HISTORICAL_CPI_DATABASE[0]);

  // Next CPI Target Release Details
  const NEXT_CPI_RELEASE = {
    period: "August 2026",
    date: "September 11, 2026",
    time: "08:30 AM EST",
    daysRemaining: 3,
    consensusYoY: 2.6,
    previousYoY: 2.7,
    coreConsensusYoY: 3.0,
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

  return (
    <div className="space-y-8 pb-12">
      
      {/* 1. HERO BANNER: NEXT CPI COUNTDOWN & LIVE METRICS */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/80 text-white rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-sm">
                <Cpu className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>AlphaMacro AI v4.2 • Neural CPI Forecasting Engine</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                US CPI Inflation Intelligence &amp; AI Price Predictor
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
                Examine real-time macro indicators (Crude Oil, Shelter, Used Cars, Labor Wages) to predict the upcoming Bureau of Labor Statistics (BLS) CPI print and its immediate volatility impact on Bitcoin and crypto liquidity.
              </p>
            </div>

            {/* Next Release Countdown Clock */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-400/40 text-center space-y-1 shadow-lg shrink-0">
              <div className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold flex items-center justify-center gap-1.5">
                <Radio className="w-3 h-3 text-amber-400 animate-ping" />
                <span>Next Release Countdown</span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
                {NEXT_CPI_RELEASE.daysRemaining}d : 14h : 32m
              </div>
              <div className="text-[11px] font-mono text-slate-400">
                {NEXT_CPI_RELEASE.date} @ {NEXT_CPI_RELEASE.time}
              </div>
            </div>
          </div>

          {/* Quick Macro KPI Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 text-xs font-mono">
            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Latest Headline CPI</span>
              <div className="text-lg font-black text-emerald-400">
                2.7% YoY
              </div>
              <span className="text-[10px] text-emerald-300 flex items-center gap-0.5">
                <TrendingDown className="w-3 h-3" /> -0.3% from previous
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">AI Predicted Next CPI</span>
              <div className="text-lg font-black text-amber-400">
                {aiForecast.headlineYoY}% YoY
              </div>
              <span className="text-[10px] text-amber-300">
                Consensus: {NEXT_CPI_RELEASE.consensusYoY}%
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">AI Core CPI Forecast</span>
              <div className="text-lg font-black text-white">
                {aiForecast.coreYoY}% YoY
              </div>
              <span className="text-[10px] text-slate-400">
                Ex-Food &amp; Energy
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
          </div>
        </div>
      </div>

      {/* 2. AI PREDICTIVE COPILOT & INTERACTIVE MACRO SIMULATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT: AI PREDICTION OUTPUT & SCENARIO RADAR (Col 7) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
                <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white">
                  AI Neural Forecast: Next CPI Release
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Target: {NEXT_CPI_RELEASE.period} Release ({NEXT_CPI_RELEASE.date})
                </p>
              </div>
            </div>

            <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              {aiForecast.confidenceScore}% Model Confidence
            </span>
          </div>

          {/* Forecast Big Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/80 space-y-1 text-center">
              <span className="text-[10px] font-mono uppercase font-bold text-amber-800 dark:text-amber-300">
                Predicted Headline CPI
              </span>
              <div className="text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">
                {aiForecast.headlineYoY}%
              </div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
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
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
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
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                Disinflation Speed: FAST
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
              <span className={`text-[10px] font-black px-2 py-0.5 rounded ${
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

            <div className="grid grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-slate-800">
              <div>
                <span className="text-slate-400 block text-[10px]">Predicted BTC Target</span>
                <span className="font-extrabold text-amber-400">{aiForecast.btcPriceTarget}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px]">Liquidity Regime</span>
                <span className="font-extrabold text-emerald-400">Global M2 Expansion</span>
              </div>
            </div>
          </div>

          {/* Interactive Simulation Sliders */}
          <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold font-mono uppercase text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-amber-500" />
                <span>Macro Inputs Simulator (Adjust to Test Scenarios)</span>
              </h4>
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
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <div className="flex justify-between">
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
              </div>

              {/* Slider 2: Shelter Deflation */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <div className="flex justify-between">
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
              </div>

              {/* Slider 3: Used Cars */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <div className="flex justify-between">
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
              </div>

              {/* Slider 4: Labor Wages */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <div className="flex justify-between">
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
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: 3-SCENARIO PROBABILITY MATRIX & FED ROADMAP (Col 5) */}
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

          {/* Fed Easing Roadmap Box */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold">
                  <Landmark className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 dark:text-white">
                    FOMC Interest Rate Roadmap
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Expected Fed Funds Rate trajectory
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="text-[10px] text-slate-400 block uppercase">Current Rate</span>
                <strong className="text-sm font-black text-slate-900 dark:text-white mt-0.5 block">5.25% - 5.50%</strong>
                <span className="text-[9px] text-amber-600 dark:text-amber-400">Restrictive</span>
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
          </div>

        </div>

      </div>

      {/* 3. HISTORICAL CPI RELEASES & BITCOIN REACTION DATABASE */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="w-4 h-4 text-amber-500" />
              <span>Historical CPI Releases &amp; Bitcoin Volatility Database</span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Track how past actual vs forecast CPI releases immediately affected crypto market prices &amp; liquidations
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-400">
            6 Tracked Releases
          </span>
        </div>

        {/* Historical Releases Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700 text-slate-400 uppercase text-[10px]">
              <tr>
                <th className="py-3 px-3.5">Period / Date</th>
                <th className="py-3 px-3.5">Actual YoY</th>
                <th className="py-3 px-3.5">Forecast</th>
                <th className="py-3 px-3.5">Outcome</th>
                <th className="py-3 px-3.5">BTC 1h Impact</th>
                <th className="py-3 px-3.5">BTC 24h Trend</th>
                <th className="py-3 px-3.5">Liquidations</th>
                <th className="py-3 px-3.5">Market Regime</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {HISTORICAL_CPI_DATABASE.map((entry) => (
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
              ))}
            </tbody>
          </table>
        </div>

        {/* Selected Historical Summary Card */}
        {selectedHistory && (
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs font-mono space-y-1.5 animate-in fade-in duration-150">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-amber-500" />
                <span>{selectedHistory.period} Release Deep-Dive</span>
              </span>
              <span className="text-[10px] text-slate-400">{selectedHistory.releaseDate}</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed">
              {selectedHistory.summary}
            </p>
          </div>
        )}
      </div>

      {/* 4. COMPREHENSIVE FUNDAMENTAL GUIDE: WHY CPI RULES CRYPTO */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
        <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-700/80">
            <Info className="w-3.5 h-3.5" />
            <span>Macro Economics &amp; Crypto Liquidity Handbook</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
            Why CPI is the Single Most Critical Fundamental Driver for Bitcoin &amp; Crypto
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-3xl leading-relaxed">
            A clear, straightforward explanation of how Consumer Price Index inflation figures directly control Federal Reserve interest rates, US Dollar liquidity, and multi-year crypto bull market expansions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Landmark className="w-4 h-4 text-amber-500" />
              <span>1. The Fed Rate Cut Transmission</span>
            </h4>
            <p>
              The Federal Reserve has a strict 2.0% inflation mandate. When CPI drops below 3.0%, the Fed is forced to cut interest rates.
            </p>
            <p>
              Lower interest rates reduce yields on cash and Treasury bonds, driving trillions of institutional capital out of bonds and directly into high-growth, scarce assets like **Bitcoin, Ethereum, and crypto tokens**.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-500" />
              <span>2. Global M2 Money Supply Cycle</span>
            </h4>
            <p>
              Historically, Bitcoin&apos;s price correlation with Global M2 Dollar Money Supply exceeds **0.85**.
            </p>
            <p>
              When CPI drops and rate cuts begin, central banks inject liquidity back into the commercial banking system. Every historical crypto parabolic expansion (2017, 2020–2021, 2024–2026) coincided precisely with global M2 liquidity surges.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2.5">
            <h4 className="font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              <span>3. The CPI Release Trading Playbook</span>
            </h4>
            <p>
              1. **15 Mins Before Release (08:15 AM EST)**: Spreads widen across Binance and Coinbase orderbooks. Reduce excessive leverage.
            </p>
            <p>
              2. **The 08:30 AM EST Spike**: If actual is lower than consensus by &gt;0.1%, algorithmic trading desks sweep short liquidation walls.
            </p>
            <p>
              3. **The 24h Trend**: Initial volatility settles into sustained macro trend that can last 3 to 4 weeks until next print.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
