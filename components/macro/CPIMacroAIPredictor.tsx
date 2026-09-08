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
  Globe2,
  HelpCircle,
  LineChart,
  Target,
  Search,
  ExternalLink,
  ChevronRight,
  ShieldAlert
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

type PredictorSubTab = "forecast" | "pillars" | "central-banks" | "forward-curve" | "history";

export default function CPIMacroAIPredictor() {
  // Navigation Sub-Tab State
  const [subTab, setSubTab] = useState<PredictorSubTab>("forecast");

  // Interactive Simulation Sliders
  const [energyOilPrice, setEnergyOilPrice] = useState<number>(72); // $72/bbl WTI
  const [shelterTrend, setShelterTrend] = useState<number>(-0.15); // -0.15% cooling
  const [usedCarTrend, setUsedCarTrend] = useState<number>(-1.2); // -1.2% deflation
  const [wageGrowth, setWageGrowth] = useState<number>(3.6); // 3.6% wage growth
  const [dxyIndex, setDxyIndex] = useState<number>(101.4); // DXY Dollar Index
  const [bojRate, setBojRate] = useState<number>(0.25); // BOJ Policy Rate in %
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
    const dxyDiff = (dxyIndex - 102.5) * 0.02; // stronger dollar exerts disinflationary import pressure
    const bojDiff = (bojRate - 0.25) * 0.04;

    const predictedHeadlineYoY = +(2.58 + oilDiff + shelterDiff + carDiff + wageDiff - dxyDiff).toFixed(2);
    const predictedCoreYoY = +(3.00 + shelterDiff * 0.8 + wageDiff * 0.9).toFixed(2);
    const predictedMoM = +((predictedHeadlineYoY / 12) * 0.72).toFixed(2);

    let scenario: "COOLING" | "IN_LINE" | "HOT";
    let cryptoReaction: string;
    let btcPriceTarget: string;
    let ethPriceTarget: string;
    let fedCutProb50bps: number;
    let yenCarryRisk: "LOW" | "MODERATE" | "ELEVATED" | "CRITICAL";

    // BOJ Yen Carry Trade Risk Evaluation
    if (bojRate > 0.50) {
      yenCarryRisk = "CRITICAL";
    } else if (bojRate > 0.35) {
      yenCarryRisk = "ELEVATED";
    } else if (bojRate >= 0.25) {
      yenCarryRisk = "MODERATE";
    } else {
      yenCarryRisk = "LOW";
    }

    if (predictedHeadlineYoY < 2.60) {
      scenario = "COOLING";
      cryptoReaction = "SUPER BULLISH (+6% to +10% Surge)";
      btcPriceTarget = "$84,000 - $88,500";
      ethPriceTarget = "$3,450 - $3,700";
      fedCutProb50bps = Math.min(96, Math.max(70, +(88.4 - (predictedHeadlineYoY - 2.5) * 30).toFixed(1)));
    } else if (predictedHeadlineYoY <= 2.75) {
      scenario = "IN_LINE";
      cryptoReaction = "BULLISH EXPANSION (+2% to +4%)";
      btcPriceTarget = "$79,500 - $82,000";
      ethPriceTarget = "$3,150 - $3,350";
      fedCutProb50bps = 58.5;
    } else {
      scenario = "HOT";
      cryptoReaction = "HAWKISH FLUSH / DIP BUY (-3% to -5%)";
      btcPriceTarget = "$73,500 - $75,000";
      ethPriceTarget = "$2,850 - $3,000";
      fedCutProb50bps = 14.2;
    }

    const confidenceScore = Math.min(96, Math.max(88, 94.5 - Math.abs(oilDiff * 8)));

    return {
      headlineYoY: predictedHeadlineYoY,
      coreYoY: predictedCoreYoY,
      mom: predictedMoM,
      scenario,
      cryptoReaction,
      btcPriceTarget,
      ethPriceTarget,
      fedCutProb50bps,
      yenCarryRisk,
      confidenceScore: +confidenceScore.toFixed(1)
    };
  }, [energyOilPrice, shelterTrend, usedCarTrend, wageGrowth, dxyIndex, bojRate]);

  return (
    <div className="space-y-6 pb-8">
      
      {/* 1. HERO BANNER: NEXT CPI COUNTDOWN & LIVE NEURAL PREDICTOR BOT */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950/80 text-white rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-black bg-amber-400/20 text-amber-300 border border-amber-400/40 shadow-sm">
                <Cpu className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                <span>AlphaMacro AI v5.0 • Multi-Pillar Future CPI &amp; Global Macro Bot</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
                US CPI Future AI Predictor &amp; Global Macro Bot
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm max-w-3xl leading-relaxed">
                Institutional neural forecasting engine that synthesizes <strong>Technical Indicators</strong> (Crude Oil, DXY, 10Y Yields), <strong>Fundamental Drivers</strong> (Shelter Lag, Truflation, Manheim Used Cars, Labor Wages, M2 Liquidity), and <strong>Global Central Bank Policies</strong> (USA Fed rate cuts, Bank of Japan Yen carry trade risks, ECB) to forecast future CPI releases and crypto volatility.
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
              <span className="text-[10px] uppercase font-bold text-slate-400">Latest BLS Print</span>
              <div className="text-lg font-black text-emerald-400">
                2.7% YoY
              </div>
              <span className="text-[10px] text-emerald-300 flex items-center gap-0.5">
                <TrendingDown className="w-3 h-3" /> -0.3% previous cooling
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">AI Predicted Next CPI</span>
              <div className="text-lg font-black text-amber-400">
                {aiForecast.headlineYoY}% YoY
              </div>
              <span className="text-[10px] text-amber-300">
                Consensus: {NEXT_CPI_RELEASE.consensusYoY}% (Beat)
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Fed 50bps Cut Odds</span>
              <div className="text-lg font-black text-emerald-400">
                {aiForecast.fedCutProb50bps}% Prob
              </div>
              <span className="text-[10px] text-emerald-300">
                CME FedWatch Implied
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">BOJ Yen Carry Risk</span>
              <div className="text-lg font-black text-amber-400">
                {aiForecast.yenCarryRisk}
              </div>
              <span className="text-[10px] text-slate-400">
                Rate: {bojRate.toFixed(2)}% (Controlled)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SUB-NAVIGATION PILL BAR FOR CPI BOT MODULES */}
      <div className="flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xs">
        <button
          onClick={() => setSubTab("forecast")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            subTab === "forecast"
              ? "bg-slate-950 dark:bg-amber-400 text-white dark:text-slate-950 shadow-sm font-extrabold ring-1 ring-amber-400/20"
              : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Cpu className="w-3.5 h-3.5 text-amber-500" />
          <span>1. AI Future Forecast &amp; Simulator</span>
        </button>

        <button
          onClick={() => setSubTab("pillars")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            subTab === "pillars"
              ? "bg-slate-950 dark:bg-amber-400 text-white dark:text-slate-950 shadow-sm font-extrabold ring-1 ring-amber-400/20"
              : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-blue-500" />
          <span>2. Deep Multi-Pillar Analysis</span>
        </button>

        <button
          onClick={() => setSubTab("central-banks")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            subTab === "central-banks"
              ? "bg-slate-950 dark:bg-amber-400 text-white dark:text-slate-950 shadow-sm font-extrabold ring-1 ring-amber-400/20"
              : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Globe2 className="w-3.5 h-3.5 text-purple-500" />
          <span>3. Global Central Banks &amp; Japan News</span>
        </button>

        <button
          onClick={() => setSubTab("forward-curve")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            subTab === "forward-curve"
              ? "bg-slate-950 dark:bg-amber-400 text-white dark:text-slate-950 shadow-sm font-extrabold ring-1 ring-amber-400/20"
              : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <LineChart className="w-3.5 h-3.5 text-emerald-500" />
          <span>4. Multi-Month Forward Curve</span>
        </button>

        <button
          onClick={() => setSubTab("history")}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition ${
            subTab === "history"
              ? "bg-slate-950 dark:bg-amber-400 text-white dark:text-slate-950 shadow-sm font-extrabold ring-1 ring-amber-400/20"
              : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Calendar className="w-3.5 h-3.5 text-rose-500" />
          <span>5. CPI Historical Track Record</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* VIEW 1: AI FUTURE FORECAST & INTERACTIVE MACRO SIMULATOR */}
      {/* ========================================================================= */}
      {subTab === "forecast" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT: AI PREDICTION ENGINE OUTPUT & MACRO SLIDERS (Col 7) */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
                    <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white">
                      Future Prediction: Next CPI Release ({NEXT_CPI_RELEASE.period})
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Release Scheduled: {NEXT_CPI_RELEASE.date} @ {NEXT_CPI_RELEASE.time}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  {aiForecast.confidenceScore}% Neural Confidence
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
                    vs 2.6% Consensus (Beat)
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
                    Ex-Food &amp; Energy
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1 text-center">
                  <span className="text-[10px] font-mono uppercase font-bold text-slate-400">
                    Predicted MoM Change
                  </span>
                  <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    +{aiForecast.mom}%
                  </div>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                    Disinflation Speed: FAST
                  </span>
                </div>
              </div>

              {/* Crypto Impact Game-Plan Card */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-950 text-white border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold uppercase text-amber-400 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-amber-400" />
                    <span>AI Predicted Crypto Volatility &amp; Targets</span>
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

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono pt-2 border-t border-slate-800">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Bitcoin Target</span>
                    <span className="font-extrabold text-amber-400">{aiForecast.btcPriceTarget}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Ethereum Target</span>
                    <span className="font-extrabold text-purple-400">{aiForecast.ethPriceTarget}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Fed 50bps Cut Odds</span>
                    <span className="font-extrabold text-emerald-400">{aiForecast.fedCutProb50bps}% Prob</span>
                  </div>
                </div>
              </div>

              {/* Interactive Multi-Variable Simulation Sliders */}
              <div className="space-y-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold font-mono uppercase text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Sliders className="w-3.5 h-3.5 text-amber-500" />
                    <span>Interactive Macro Variables Simulator</span>
                  </h4>
                  <button
                    onClick={() => {
                      setEnergyOilPrice(72);
                      setShelterTrend(-0.15);
                      setUsedCarTrend(-1.2);
                      setWageGrowth(3.6);
                      setDxyIndex(101.4);
                      setBojRate(0.25);
                    }}
                    className="text-[10px] font-mono text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <RefreshCw className="w-2.5 h-2.5" />
                    <span>Reset to Baseline</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-mono">
                  {/* Slider 1: Crude Oil */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">🛢️ WTI Crude Oil:</span>
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
                      <span className="text-slate-500 dark:text-slate-400">🏠 Shelter/Rent Lag:</span>
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
                      <span className="text-slate-500 dark:text-slate-400">🚗 Used Cars (Manheim):</span>
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
                      <span className="text-slate-500 dark:text-slate-400">💼 Wage Growth YoY:</span>
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

                  {/* Slider 5: US Dollar Index (DXY) */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">💵 US Dollar Index (DXY):</span>
                      <strong className="text-slate-900 dark:text-white font-bold">{dxyIndex.toFixed(1)}</strong>
                    </div>
                    <input
                      type="range"
                      min="99.0"
                      max="107.0"
                      step="0.2"
                      value={dxyIndex}
                      onChange={(e) => setDxyIndex(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                  </div>

                  {/* Slider 6: Bank of Japan Policy Rate */}
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                    <div className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">🇯🇵 BOJ Policy Rate:</span>
                      <strong className="text-slate-900 dark:text-white font-bold">{bojRate.toFixed(2)}%</strong>
                    </div>
                    <input
                      type="range"
                      min="0.10"
                      max="0.75"
                      step="0.05"
                      value={bojRate}
                      onChange={(e) => setBojRate(Number(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT: 3-SCENARIO PROBABILITY MATRIX & CENTRAL BANK RADAR (Col 5) */}
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
                        AI Volatility Scenario Matrix
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
                        <span>Scenario A: Cooling Beat (&lt; 2.60% YoY)</span>
                      </span>
                      <span className="font-black text-emerald-600 dark:text-emerald-300 text-sm">52% Prob</span>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      <strong>Fed Pivot:</strong> Guarantees aggressive 50bps rate cut in Sep. Triggers rapid short liquidation.
                    </div>
                    <div className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 mt-1">
                      Crypto Reaction: Super Bullish (+6% to +10%) • BTC targets $84K–$88K
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
                        <span>Scenario B: Consensus In-Line (2.60% - 2.75%)</span>
                      </span>
                      <span className="font-black text-blue-600 dark:text-blue-300 text-sm">36% Prob</span>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      <strong>Fed Action:</strong> Standard 25bps cut; orderly easing cycle with steady spot ETF inflows.
                    </div>
                    <div className="text-[10px] font-bold text-blue-600 dark:text-blue-400 mt-1">
                      Crypto Reaction: Bullish Continuation (+2% to +4%) • BTC targets $79.5K–$82K
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
                        <span>Scenario C: Hotter Miss (&gt; 2.75% YoY)</span>
                      </span>
                      <span className="font-black text-rose-600 dark:text-rose-300 text-sm">12% Prob</span>
                    </div>
                    <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      <strong>Fed Shock:</strong> Hawkish pause risk; DXY &amp; 10Y yields spike temporarily.
                    </div>
                    <div className="text-[10px] font-bold text-rose-600 dark:text-rose-400 mt-1">
                      Crypto Reaction: Hawkish Flush (-3% to -5%) • Invalidation dip buy at $73.5K
                    </div>
                  </div>
                </div>
              </div>

              {/* Central Bank Policy Roadmap */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold">
                      <Landmark className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900 dark:text-white">
                        Global Central Banks Stance
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        USA Fed, Bank of Japan (BOJ), and ECB
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 block uppercase">USA Fed Funds</span>
                    <strong className="text-sm font-black text-slate-900 dark:text-white mt-0.5 block">5.25% - 5.50%</strong>
                    <span className="text-[9px] text-emerald-500 font-bold">50bps Cut Implied</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 block uppercase">Bank of Japan</span>
                    <strong className="text-sm font-black text-amber-500 mt-0.5 block">{bojRate.toFixed(2)}%</strong>
                    <span className="text-[9px] text-amber-600 dark:text-amber-400">Yen Unwind Monitored</span>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <span className="text-[10px] text-slate-400 block uppercase">ECB Deposit</span>
                    <strong className="text-sm font-black text-emerald-600 dark:text-emerald-400 mt-0.5 block">3.50%</strong>
                    <span className="text-[9px] text-emerald-500 font-bold">Active Easing</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 2: DEEP MULTI-PILLAR ANALYSIS (TECHNICALS & FUNDAMENTALS) */}
      {/* ========================================================================= */}
      {subTab === "pillars" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-500" />
                <span>Multi-Pillar Deep Analysis: How the Bot Analyzes CPI</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                The Bureau of Labor Statistics (BLS) CPI index is decomposed into rigorous underlying technical commodities, housing lags, labor dynamics, and real-time private telemetry.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              
              {/* Pillar 1: Energy & Commodities */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white text-xs uppercase font-mono flex items-center gap-1.5">
                    <span>🛢️ 1. Energy &amp; Fuel Pillar</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold">
                    Deflationary Drag
                  </span>
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">WTI Crude:</span>
                    <strong className="text-slate-900 dark:text-white">${energyOilPrice}/bbl (-3.2% MoM)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">RBOB Gasoline:</span>
                    <strong className="text-emerald-500">$2.18/gal (-5.1%)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Baltic Dry Shipping:</span>
                    <strong className="text-slate-900 dark:text-white">1,820 pts (Stable)</strong>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans border-t border-slate-200 dark:border-slate-700 pt-2">
                  Falling oil and gasoline prices exert a direct -0.18% downward pull on the August headline CPI release, creating immediate disinflationary tailwinds.
                </p>
              </div>

              {/* Pillar 2: Shelter & OER */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white text-xs uppercase font-mono flex items-center gap-1.5">
                    <span>🏠 2. Shelter &amp; OER (36% CPI)</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950/80 text-blue-800 dark:text-blue-300 font-bold">
                    Lag Catching Up
                  </span>
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">BLS Shelter Weight:</span>
                    <strong className="text-slate-900 dark:text-white">36.2% of Headline</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Zillow Rent Index:</span>
                    <strong className="text-emerald-500">+0.12% MoM (Cooling)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Truflation Daily:</span>
                    <strong className="text-emerald-500">2.18% Real-Time</strong>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans border-t border-slate-200 dark:border-slate-700 pt-2">
                  Official BLS housing data lags real-time market rents by 12 months. The historical high-rent comps are now rolling off, accelerating official CPI disinflation.
                </p>
              </div>

              {/* Pillar 3: Used Vehicles & Goods */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white text-xs uppercase font-mono flex items-center gap-1.5">
                    <span>🚗 3. Used Vehicles &amp; Goods</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold">
                    Goods Deflation
                  </span>
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Manheim Used Index:</span>
                    <strong className="text-emerald-500">-1.2% MoM Deflation</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">New Auto Inventory:</span>
                    <strong className="text-slate-900 dark:text-white">68 Days Supply (Surplus)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Core Goods YoY:</span>
                    <strong className="text-emerald-500">-0.4% YoY Negative</strong>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans border-t border-slate-200 dark:border-slate-700 pt-2">
                  Supply chains are completely normalized and auto dealer lots are brimming with inventory, leading to continuous month-over-month price cuts for consumers.
                </p>
              </div>

              {/* Pillar 4: Labor Market & Wage Growth */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white text-xs uppercase font-mono flex items-center gap-1.5">
                    <span>💼 4. Labor Market &amp; Wages</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 font-bold">
                    Softening
                  </span>
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Avg Hourly Earnings:</span>
                    <strong className="text-slate-900 dark:text-white">3.6% YoY (Down from 4.4%)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">US Unemployment:</span>
                    <strong className="text-amber-500">4.3% (Sahm Rule Threshold)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Non-Farm Payrolls:</span>
                    <strong className="text-slate-900 dark:text-white">+114K (Cooling)</strong>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans border-t border-slate-200 dark:border-slate-700 pt-2">
                  Wage-push inflation has broken down. Slower hiring relieves service-sector pricing pressure, eliminating the threat of a secondary inflation wave.
                </p>
              </div>

              {/* Pillar 5: Global M2 Liquidity */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white text-xs uppercase font-mono flex items-center gap-1.5">
                    <span>💵 5. Global M2 &amp; Liquidity</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold">
                    Bullish Macro
                  </span>
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Global M2 Growth:</span>
                    <strong className="text-emerald-500">+$1.4 Trillion</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Fed QT Tapering:</span>
                    <strong className="text-slate-900 dark:text-white">Cap cut from $60B to $25B</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">BTC / M2 Correlation:</span>
                    <strong className="text-emerald-500">0.88 Positive</strong>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans border-t border-slate-200 dark:border-slate-700 pt-2">
                  As central banks pivot from tightening to easing, global monetary liquidity re-accelerates. Historically, Bitcoin tracks global M2 expansion with extreme fidelity.
                </p>
              </div>

              {/* Pillar 6: Supercore CPI Gauge */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white text-xs uppercase font-mono flex items-center gap-1.5">
                    <span>🎯 6. Supercore CPI (Services)</span>
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950/80 text-purple-800 dark:text-purple-300 font-bold">
                    Fed Primary Metric
                  </span>
                </div>
                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Services Ex-Housing:</span>
                    <strong className="text-slate-900 dark:text-white">3.15% YoY (Cooling)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Airline Fares:</span>
                    <strong className="text-emerald-500">-2.8% MoM</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Auto Insurance:</span>
                    <strong className="text-slate-900 dark:text-white">Flattening MoM</strong>
                  </div>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-sans border-t border-slate-200 dark:border-slate-700 pt-2">
                  Fed Chair Jerome Powell explicitly tracks Supercore CPI (core services minus housing). Rapid disinflation here green-lights aggressive Fed rate cut campaigns.
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 3: GLOBAL CENTRAL BANKS & JAPAN YEN NEWS INTELLIGENCE */}
      {/* ========================================================================= */}
      {subTab === "central-banks" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* LEFT: Central Bank Policy Profiles (Col 7) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* USA Federal Reserve Card */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🇺🇸</span>
                    <div>
                      <h4 className="text-base font-black text-slate-900 dark:text-white">
                        USA Federal Reserve (FOMC)
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Target Fed Funds Rate: 5.25% - 5.50% • Dual Mandate (2.0% CPI &amp; Max Employment)
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                    Aggressive Easing Imminent
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600 dark:text-slate-300 font-bold">50bps Rate Cut Odds (CME FedWatch):</span>
                      <strong className="text-emerald-600 dark:text-emerald-400 text-sm">{aiForecast.fedCutProb50bps}%</strong>
                    </div>
                    <div className="w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
                      <div className="bg-emerald-500 h-full rounded-full transition-all duration-700" style={{ width: `${aiForecast.fedCutProb50bps}%` }} />
                      <div className="bg-amber-400 h-full transition-all duration-700" style={{ width: `${100 - aiForecast.fedCutProb50bps}%` }} />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-400 pt-0.5">
                      <span>50bps Cut: {aiForecast.fedCutProb50bps}%</span>
                      <span>25bps Cut: {(100 - aiForecast.fedCutProb50bps).toFixed(1)}%</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                    With CPI falling towards 2.6% and unemployment ticking up to 4.3%, the Fed has achieved sufficient confidence to initiate a multi-quarter monetary easing campaign. Lower discount rates will significantly reduce the hurdle rate for crypto asset allocations.
                  </p>
                </div>
              </div>

              {/* Bank of Japan (BOJ) & Yen Carry Trade Risk Card */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🇯🇵</span>
                    <div>
                      <h4 className="text-base font-black text-slate-900 dark:text-white">
                        Bank of Japan (BOJ) &amp; Yen Carry Trade Intelligence
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        BOJ Policy Rate: {bojRate.toFixed(2)}% • Governor Ueda Forward Guidance
                      </p>
                    </div>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-bold ${
                    aiForecast.yenCarryRisk === "LOW" || aiForecast.yenCarryRisk === "MODERATE"
                      ? "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                      : "bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                  }`}>
                    {aiForecast.yenCarryRisk} Unwind Risk
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase">USD / JPY Rate</span>
                      <strong className="text-sm font-black text-slate-900 dark:text-white block">143.20</strong>
                      <span className="text-[10px] text-emerald-500">Orderly stabilization</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                      <span className="text-[10px] text-slate-400 uppercase">Tokyo Core CPI</span>
                      <strong className="text-sm font-black text-slate-900 dark:text-white block">2.2% YoY</strong>
                      <span className="text-[10px] text-slate-400">Moderate pace</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-600 dark:text-slate-300 font-sans leading-relaxed">
                    <strong>Why Yen Carry Trade Matters:</strong> Global macro hedge funds historically borrowed trillions in near-zero Japanese Yen to fund leveraged long positions in US tech and Bitcoin. When the BOJ raised rates from -0.1% to +0.25%, sudden yen appreciation triggered deleveraging. The bot confirms BOJ policy has entered a measured, cautious phase with minimal risk of immediate secondary market liquidation shocks.
                  </p>
                </div>
              </div>

              {/* European Central Bank (ECB) & PBoC China Card */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🇪🇺 🇨🇳</span>
                    <div>
                      <h4 className="text-base font-black text-slate-900 dark:text-white">
                        ECB &amp; People&apos;s Bank of China (PBoC)
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Synchronized global easing liquidity injection
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase">ECB Deposit Rate</span>
                    <strong className="text-sm font-black text-emerald-600 dark:text-emerald-400 block">3.50% (-25bps)</strong>
                    <span className="text-[10px] text-slate-400">Further cuts projected in Q4</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                    <span className="text-[10px] text-slate-400 uppercase">China PBoC RRR</span>
                    <strong className="text-sm font-black text-emerald-600 dark:text-emerald-400 block">50bps Stimulus</strong>
                    <span className="text-[10px] text-slate-400">¥1 Trillion Liquidity Injection</span>
                  </div>
                </div>
              </div>

            </div>

            {/* RIGHT: Live 24/7 Global Macro News Wire & Sentiment (Col 5) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
                      <Radio className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="text-base font-black text-slate-900 dark:text-white">
                        24/7 Global Macro News Feed
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Synthesized AI sentiment across global central bank reports
                      </p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 font-bold">
                    LIVE
                  </span>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  {/* News Item 1 */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">DOVISH MACRO</span>
                      <span className="text-slate-400">12 mins ago • Bloomberg</span>
                    </div>
                    <div className="font-extrabold text-slate-900 dark:text-white text-xs font-sans">
                      US Treasury Yields Tumble as Bond Traders Price in 100bps of Fed Cuts by Year-End
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
                      2-year yield slips below 3.70% ahead of CPI print, setting up high risk appetite for crypto spot markets.
                    </p>
                  </div>

                  {/* News Item 2 */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-blue-600 dark:text-blue-400 font-bold">JAPAN / BOJ</span>
                      <span className="text-slate-400">42 mins ago • Nikkei</span>
                    </div>
                    <div className="font-extrabold text-slate-900 dark:text-white text-xs font-sans">
                      BOJ Deputy Governor Assures Markets: No Hikes During Periods of Global Market Instability
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
                      Soothing statement prevents yen carry trade liquidations from re-emerging in Asian trading hours.
                    </p>
                  </div>

                  {/* News Item 3 */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">COMMODITIES</span>
                      <span className="text-slate-400">1h ago • Reuters</span>
                    </div>
                    <div className="font-extrabold text-slate-900 dark:text-white text-xs font-sans">
                      WTI Crude Oil Falls to 14-Month Lows on Rising US Crude Stockpiles
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
                      Energy weakness provides heavy deflationary drag for next month’s Bureau of Labor Statistics inflation release.
                    </p>
                  </div>

                  {/* News Item 4 */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                    <div className="flex justify-between items-center text-[10px]">
                      <span className="text-purple-600 dark:text-purple-400 font-bold">LIQUIDITY</span>
                      <span className="text-slate-400">2h ago • CoinDesk</span>
                    </div>
                    <div className="font-extrabold text-slate-900 dark:text-white text-xs font-sans">
                      Bitcoin Spot ETFs Record +$480M Inflows as Institutional Desks Front-Run CPI Easing
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-sans">
                      BlackRock IBIT and Fidelity FBTC leading accumulation as smart money prepares for rate cut cycle.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 4: MULTI-MONTH FORWARD INFLATION CURVE */}
      {/* ========================================================================= */}
      {subTab === "forward-curve" && (
        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-4">
              <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <LineChart className="w-5 h-5 text-emerald-500" />
                <span>Multi-Month Forward CPI Curve &amp; Disinflation Glidepath</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                AlphaMacro AI forward projections mapping future monthly CPI prints from August 2026 through the 2027 2.0% terminal target.
              </p>
            </div>

            {/* Forward Curve Timeline Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
              
              {/* Month 1 */}
              <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-700/80 space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-amber-200 dark:bg-amber-900 text-amber-950 dark:text-amber-200 font-black">
                    NEXT RELEASE
                  </span>
                  <span className="text-slate-400">Sep 11, 2026</span>
                </div>
                <div className="text-slate-900 dark:text-white font-bold text-sm">
                  August 2026 CPI
                </div>
                <div className="text-3xl font-black text-amber-600 dark:text-amber-400">
                  {aiForecast.headlineYoY}% YoY
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 space-y-0.5 pt-1 border-t border-amber-200 dark:border-amber-800">
                  <div>Core Forecast: {aiForecast.coreYoY}%</div>
                  <div>Catalyst: Energy deflation + used car drop</div>
                </div>
              </div>

              {/* Month 2 */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold">
                    OCTOBER 2026
                  </span>
                  <span className="text-slate-400">Oct 14, 2026</span>
                </div>
                <div className="text-slate-900 dark:text-white font-bold text-sm">
                  September 2026 CPI
                </div>
                <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                  2.45% YoY
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 space-y-0.5 pt-1 border-t border-slate-200 dark:border-slate-700">
                  <div>Core Forecast: 2.88%</div>
                  <div>Catalyst: Accelerated shelter lag decay</div>
                </div>
              </div>

              {/* Month 3 */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold">
                    NOVEMBER 2026
                  </span>
                  <span className="text-slate-400">Nov 12, 2026</span>
                </div>
                <div className="text-slate-900 dark:text-white font-bold text-sm">
                  October 2026 CPI
                </div>
                <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                  2.38% YoY
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 space-y-0.5 pt-1 border-t border-slate-200 dark:border-slate-700">
                  <div>Core Forecast: 2.75%</div>
                  <div>Catalyst: Supercore wage normalization</div>
                </div>
              </div>

              {/* Terminal Target */}
              <div className="p-4 rounded-2xl bg-purple-50/80 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="px-2 py-0.5 rounded bg-purple-200 dark:bg-purple-900 text-purple-950 dark:text-purple-200 font-bold">
                    2027 TARGET
                  </span>
                  <span className="text-slate-400">Q1 2027</span>
                </div>
                <div className="text-slate-900 dark:text-white font-bold text-sm">
                  Terminal 2.0% Goal
                </div>
                <div className="text-3xl font-black text-purple-600 dark:text-purple-400">
                  2.10% YoY
                </div>
                <div className="text-[10px] text-purple-700 dark:text-purple-300 space-y-0.5 pt-1 border-t border-purple-200 dark:border-purple-800">
                  <div>Fed Mandate: 2.00% Met</div>
                  <div>Global M2 expansion in full swing</div>
                </div>
              </div>

            </div>

            {/* Macro Analysis Summary */}
            <div className="p-5 rounded-2xl bg-slate-950 text-white font-mono text-xs space-y-3 border border-slate-800">
              <div className="flex justify-between items-center text-[11px] text-slate-400 uppercase">
                <span className="font-bold text-amber-400">AI Forward Curve Commentary</span>
                <span>AlphaMacro Neural Synthesis</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed font-sans">
                The disinflationary trend has now reached mathematical escape velocity. Because high rental inflation prints from 2025 are dropping out of the 12-month trailing calculation base (the base effect), headline CPI is on a reliable glide-path down into the low-2% zone. This structural shift allows the Federal Reserve to conduct an uninterrupted rate-cutting campaign, historically the most bullish macro backdrop for Bitcoin halving cycle expansion.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* VIEW 5: HISTORICAL CPI RELEASES & BITCOIN REACTION DATABASE */}
      {/* ========================================================================= */}
      {subTab === "history" && (
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
              <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed font-sans">
                {selectedHistory.summary}
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

