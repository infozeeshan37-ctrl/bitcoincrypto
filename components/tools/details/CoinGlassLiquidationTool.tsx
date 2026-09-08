"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Flame,
  TrendingUp,
  TrendingDown,
  Skull,
  Activity,
  Layers,
  BarChart3,
  ShieldAlert,
  Zap,
  Radio,
  ArrowRight,
  Info,
  Sliders,
  DollarSign,
  Percent,
  CheckCircle2,
  RefreshCw,
  Compass,
  Clock,
  Sparkles,
  AlertTriangle,
  ChevronDown,
  Calculator,
  ShieldCheck,
  Scale,
  Gauge,
  HelpCircle,
  Maximize2,
  Lock,
  PieChart
} from "lucide-react";
import LiquidationHeatmapRadar from "@/components/coinglass/LiquidationHeatmapRadar";

export default function CoinGlassLiquidationTool() {
  // Liquidation Calculator State
  const [calcSide, setCalcSide] = useState<"LONG" | "SHORT">("LONG");
  const [calcEntryPrice, setCalcEntryPrice] = useState<number>(78500);
  const [calcLeverage, setCalcLeverage] = useState<number>(20);
  const [calcPositionSize, setCalcPositionSize] = useState<number>(1.5); // in BTC / base units
  const [calcMaintenanceRate, setCalcMaintenanceRate] = useState<number>(0.4); // 0.4% default MMR

  // Computed Liquidation Metrics
  const {
    notionalValue,
    initialMargin,
    maintenanceMargin,
    liquidationPrice,
    bankruptcyPrice,
    distanceDollar,
    distancePercent,
    riskLevel,
    riskColor
  } = useMemo(() => {
    const notional = calcEntryPrice * calcPositionSize;
    const initMargin = calcLeverage > 0 ? notional / calcLeverage : notional;
    const maintMargin = (notional * calcMaintenanceRate) / 100;

    let liqPrice = 0;
    let bkpPrice = 0;

    if (calcSide === "LONG") {
      // Long Liquidation = Entry Price * (1 - 1/Leverage + MaintenanceMarginRate)
      liqPrice = calcEntryPrice * (1 - (1 / calcLeverage) + (calcMaintenanceRate / 100));
      bkpPrice = calcEntryPrice * (1 - (1 / calcLeverage));
    } else {
      // Short Liquidation = Entry Price * (1 + 1/Leverage - MaintenanceMarginRate)
      liqPrice = calcEntryPrice * (1 + (1 / calcLeverage) - (calcMaintenanceRate / 100));
      bkpPrice = calcEntryPrice * (1 + (1 / calcLeverage));
    }

    const distDol = Math.abs(calcEntryPrice - liqPrice);
    const distPct = (distDol / calcEntryPrice) * 100;

    let rLevel = "Safe / Low Risk";
    let rCol = "text-emerald-500";
    if (distPct <= 2.5) {
      rLevel = "Extreme Flash Liquidation Danger";
      rCol = "text-rose-500 font-black animate-pulse";
    } else if (distPct <= 5) {
      rLevel = "High Squeeze Sensitivity";
      rCol = "text-rose-400 font-bold";
    } else if (distPct <= 10) {
      rLevel = "Moderate Market Volatility Risk";
      rCol = "text-amber-400 font-bold";
    }

    return {
      notionalValue: notional,
      initialMargin: initMargin,
      maintenanceMargin: maintMargin,
      liquidationPrice: Math.max(0, liqPrice),
      bankruptcyPrice: Math.max(0, bkpPrice),
      distanceDollar: distDol,
      distancePercent: distPct,
      riskLevel: rLevel,
      riskColor: rCol,
    };
  }, [calcSide, calcEntryPrice, calcLeverage, calcPositionSize, calcMaintenanceRate]);

  // Open/Close FAQ Accordion
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const liquidationFundamentals = [
    {
      title: "Orderbook Mechanics & Liquidity Magnetism",
      badge: "Market Microstructure",
      icon: Layers,
      desc: "Stop-losses and liquidation orders placed by leveraged retail traders act as non-discretionary market orders upon triggering. Market makers, proprietary trading desks, and high-frequency algorithms (HFTs) treat these dense stop clusters as high-liquidity execution zones to fill multi-million dollar positions with minimal slippage.",
      takeaways: [
        "Resting stops above resistance create upward short-squeeze vacuum zones.",
        "Resting stops below support create cascading long-flush downward avalanches.",
        "Price moves toward high-density liquidation pools due to natural orderbook magnetism."
      ]
    },
    {
      title: "Funding Rate Disparity & Squeeze Dynamics",
      badge: "Perpetual Derivatives",
      icon: Zap,
      desc: "Funding rates represent the periodic cash transfer between perpetual contract holders and spot index prices. Extreme positive funding (>0.05% per 8h) reflects overcrowded long speculation ripe for a sharp downward flush, while deeply negative funding (<-0.03% per 8h) signals aggressive short crowding susceptible to violent upside short squeezes.",
      takeaways: [
        "Negative funding rates force short sellers to pay longs every 8 hours.",
        "A sudden spot bid triggers short liquidations, creating buy orders that rapidly push price higher.",
        "Perpetual basis divergence provides early warning before major cascade events."
      ]
    },
    {
      title: "Open Interest (OI) vs Volume Divergence",
      badge: "Macro Flow Analysis",
      icon: Activity,
      desc: "Open Interest (OI) tracks the total nominal dollar value of all open, unsettled futures contracts. When OI reaches all-time highs while spot spot trading volume declines, the market structure becomes hyper-fragile. Even a minor 1-2% spot movement can trigger a multi-hundred million dollar liquidation waterfall.",
      takeaways: [
        "Rising OI + Rising Price = Strong trend fueled by active institutional capital.",
        "Rising OI + Stagnant Price = Massive leveraged buildup awaiting volatility expansion.",
        "Crashing OI + Price Spike = Pure liquidation cascade and stop-loss exhaustion."
      ]
    },
    {
      title: "Exchange Liquidation Engines & Risk Protocols",
      badge: "Institutional Execution",
      icon: ShieldCheck,
      desc: "Top derivatives exchanges employ distinct risk management engines. Binance uses an automated Smart Liquidation engine backed by a multi-billion dollar SAFU insurance fund; Bybit utilizes dual-price mark pricing to prevent flash wick liquidations; OKX implements tiered partial margin reductions to minimize full account wipeouts.",
      takeaways: [
        "Mark Price (Index-weighted) triggers liquidations, not the Last Traded Price (LTP).",
        "Exchange Insurance Funds absorb bankrupt position deficits to prevent Auto-Deleveraging (ADL).",
        "Tiered Maintenance Margin requirements scale upward as position sizes increase."
      ]
    }
  ];

  const exchangeProtocols = [
    {
      exchange: "Binance Futures",
      engine: "Smart Liquidation & Index Mark Price",
      insuranceFund: "$1.8B+ SAFU Buffer",
      adlRisk: "Extremely Low",
      maintenanceMargin: "0.40% - 2.50% Tiered",
      notes: "Uses real-time composite index weighted across 5 major spot exchanges to protect traders from artificial wick manipulation."
    },
    {
      exchange: "Bybit Derivatives",
      engine: "Dual-Price Mechanism & Partial Fill",
      insuranceFund: "$750M+ Dedicated Pool",
      adlRisk: "Low",
      maintenanceMargin: "0.50% - 2.00% Tiered",
      notes: "Liquidation triggers strictly on Mark Price while orders execute against the live Orderbook Last Price."
    },
    {
      exchange: "OKX Perpetual",
      engine: "Stepwise Auto-Deleveraging & Tier Slicing",
      insuranceFund: "$500M+ Collateral Fund",
      adlRisk: "Low / Controlled",
      maintenanceMargin: "0.40% - 3.00% Tiered",
      notes: "Executes partial position reductions to bring maintenance margin back into compliance before enforcing total bankruptcy."
    },
    {
      exchange: "Deribit Options & Perps",
      engine: "Incremental Portfolio Margin Engine",
      insuranceFund: "$250M+ Dedicated BTC/ETH",
      adlRisk: "Moderate on Ultra High Vol",
      maintenanceMargin: "Portfolio Risk Model (SPAN)",
      notes: "Institutional-grade incremental liquidation designed for cross-collateralized options and perpetual contracts."
    }
  ];

  const faqs = [
    {
      q: "What is a Liquidation Heatmap and how do institutional desks read it?",
      a: "A Liquidation Heatmap is an algorithmic spectrogram that maps the predicted liquidation price levels of all resting leveraged perpetual positions. Dark purple regions represent zero or low liquidation volume, while bright lime green and brilliant yellow bands indicate massive clusters of resting stop-losses. Institutional desks use these clusters as target liquidity magnets to execute large block buy/sell orders."
    },
    {
      q: "What is the difference between Bankruptcy Price and Liquidation Price?",
      a: "Your Bankruptcy Price is the exact price point where your position's losses equal your initial margin (loss = 100%). However, exchanges must close your position *before* you hit bankruptcy to prevent negative account balances. Therefore, your Liquidation Price triggers earlier at the Maintenance Margin threshold, leaving a small buffer that funds the exchange's insurance reserve."
    },
    {
      q: "How does a Short Squeeze differ from a Long Squeeze Cascade?",
      a: "In a Short Squeeze, rising prices hit short sellers' stop-losses. Because closing a short requires submitting a BUY market order, each liquidation adds immediate buy pressure, accelerating the rally into higher stop clusters. Conversely, a Long Squeeze occurs when declining prices force long liquidations (submitting SELL market orders), causing a rapid cascade downward into lower liquidity shelves."
    },
    {
      q: "Why does the exchange use Mark Price instead of Last Traded Price for liquidations?",
      a: "Exchanges use Mark Price (a calculated composite price derived from global spot orderbooks across Binance, Coinbase, Kraken, and OKX) rather than the local Last Traded Price. This prevents malicious actors from dumping a large market order on a single illiquid exchange to artificially trigger retail liquidations ('wick hunting')."
    },
    {
      q: "What is the best risk management rule when trading near high-density liquidation clusters?",
      a: "Professional quantitative traders avoid placing manual stop-losses directly at obvious support/resistance levels where retail clusters are concentrated. Instead, place stops outside the high-density yellow/lime liquidation bands, or wait for the liquidation sweep to occur first and enter in the opposite direction once the resting liquidity has been exhausted."
    }
  ];

  return (
    <div className="space-y-12">
      
      {/* 1. EMBEDDED COINGLASS LIQUIDATION RADAR & 2D HEATMAP SPECTROGRAM */}
      <LiquidationHeatmapRadar />

      {/* 2. INTERACTIVE LIVE LEVERAGE & LIQUIDATION PRICE CALCULATOR */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-black border border-amber-500/30">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Institutional Liquidation &amp; Bankruptcy Calculator
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                Calculate precise liquidation price, maintenance margin buffer, and distance-to-wipeout
              </p>
            </div>
          </div>

          {/* Long / Short Toggle */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setCalcSide("LONG")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                calcSide === "LONG"
                  ? "bg-emerald-500 text-white shadow-md"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" />
              <span>LONG POSITION</span>
            </button>
            <button
              onClick={() => setCalcSide("SHORT")}
              className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                calcSide === "SHORT"
                  ? "bg-rose-500 text-white shadow-md"
                  : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <TrendingDown className="w-3.5 h-3.5" />
              <span>SHORT POSITION</span>
            </button>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Column (Col 6) */}
          <div className="lg:col-span-6 space-y-5">
            {/* Entry Price Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center justify-between">
                <span>Entry Price (USD)</span>
                <span className="text-[11px] font-mono text-slate-400">Asset Spot / Mark Price</span>
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400">$</span>
                <input
                  type="number"
                  value={calcEntryPrice}
                  onChange={(e) => setCalcEntryPrice(Math.max(0.0001, parseFloat(e.target.value) || 0))}
                  className="w-full pl-8 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm transition"
                />
              </div>
            </div>

            {/* Position Size Input */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center justify-between">
                <span>Position Size (Base Units)</span>
                <span className="text-[11px] font-mono text-slate-400">Quantity (e.g. 1.5 BTC)</span>
              </label>
              <input
                type="number"
                step="0.1"
                value={calcPositionSize}
                onChange={(e) => setCalcPositionSize(Math.max(0.001, parseFloat(e.target.value) || 0))}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 font-mono font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm transition"
              />
            </div>

            {/* Leverage Slider & Presets */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-300">
                  Leverage Multiplier ({calcLeverage}x)
                </label>
                <span className="text-xs font-mono font-black text-amber-500">{calcLeverage}x Isolated</span>
              </div>
              <input
                type="range"
                min="1"
                max="125"
                value={calcLeverage}
                onChange={(e) => setCalcLeverage(parseInt(e.target.value) || 1)}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                {[2, 5, 10, 20, 50, 100, 125].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setCalcLeverage(preset)}
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-bold transition shrink-0 ${
                      calcLeverage === preset
                        ? "bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 font-black"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    {preset}x
                  </button>
                ))}
              </div>
            </div>

            {/* Maintenance Margin Rate Slider */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-600 dark:text-slate-300">Maintenance Margin Rate (MMR)</span>
                <span className="font-mono font-bold text-slate-400">{calcMaintenanceRate}%</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="2.5"
                step="0.1"
                value={calcMaintenanceRate}
                onChange={(e) => setCalcMaintenanceRate(parseFloat(e.target.value) || 0.4)}
                className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
            </div>
          </div>

          {/* Results Output Column (Col 6) */}
          <div className="lg:col-span-6 bg-slate-950 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Skull className="w-4 h-4 text-rose-500" />
                <span className="text-xs uppercase font-bold text-slate-400 font-mono">Computed Liquidation Threshold</span>
              </div>
              <span className={`text-xs font-mono font-bold ${riskColor}`}>
                {riskLevel}
              </span>
            </div>

            {/* Primary Liquidation Price Display */}
            <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center space-y-1">
              <span className="text-xs text-slate-400 uppercase font-mono font-bold">Estimated Liquidation Price</span>
              <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono tracking-tight">
                ${liquidationPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-slate-400 font-medium">
                Distance to liquidation: <strong className="text-rose-400 font-mono">${distanceDollar.toLocaleString(undefined, { maximumFractionDigits: 2 })} ({distancePercent.toFixed(2)}%)</strong>
              </div>
            </div>

            {/* 4 Detailed Breakdown Metric Tiles */}
            <div className="grid grid-cols-2 gap-3 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Total Notional Value</span>
                <div className="font-bold text-white text-sm">
                  ${notionalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Initial Required Margin</span>
                <div className="font-bold text-emerald-400 text-sm">
                  ${initialMargin.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Bankruptcy Price (0 Margin)</span>
                <div className="font-bold text-rose-400 text-sm">
                  ${bankruptcyPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 space-y-1">
                <span className="text-[10px] uppercase font-bold text-slate-400">Maintenance Buffer</span>
                <div className="font-bold text-purple-400 text-sm">
                  ${maintenanceMargin.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            {/* Risk Tip Alert */}
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs flex items-start gap-2.5">
              <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                <strong>Quantitative Pro Tip:</strong> To avoid catastrophic market maker stop-runs, keep leverage below <strong>10x</strong> and place your stop-loss order at least <strong>1.5% before</strong> your liquidation price.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. TECHNICAL & FUNDAMENTAL LIQUIDATION KNOWLEDGE SUITE */}
      <div className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-purple-500/20 text-purple-600 dark:text-purple-300 border border-purple-500/30">
            <Sparkles className="w-3.5 h-3.5 text-purple-500" />
            <span>Quantitative Derivatives Mechanics</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Technical &amp; Fundamental Liquidation Intelligence
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
            Master the structural dynamics governing market sweeps, squeeze cascades, and institutional orderbook flow
          </p>
        </div>

        {/* 4 Fundamentals Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {liquidationFundamentals.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 hover:border-amber-400/40 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.desc}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                    Key Takeaways:
                  </span>
                  <ul className="space-y-1.5">
                    {item.takeaways.map((takeaway, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2 text-slate-600 dark:text-slate-400">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. CROSS-EXCHANGE LIQUIDATION PROTOCOLS COMPARISON TABLE */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Scale className="w-5 h-5 text-amber-500" />
            <span>Cross-Exchange Liquidation Protocol Matrix</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Comparing margin engine mechanics, insurance fund guarantees, and Auto-Deleveraging (ADL) policies
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400">
                <th className="pb-3 font-black uppercase">Exchange</th>
                <th className="pb-3 font-black uppercase">Liquidation Engine</th>
                <th className="pb-3 font-black uppercase">Insurance Reserve</th>
                <th className="pb-3 font-black uppercase">ADL Risk</th>
                <th className="pb-3 font-black uppercase">MMR Tiers</th>
                <th className="pb-3 font-black uppercase">Protection Mechanism</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {exchangeProtocols.map((ex, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-850/50 transition">
                  <td className="py-3.5 font-bold text-slate-900 dark:text-white font-sans text-sm">
                    {ex.exchange}
                  </td>
                  <td className="py-3.5 text-slate-700 dark:text-slate-300">
                    {ex.engine}
                  </td>
                  <td className="py-3.5 text-emerald-600 dark:text-emerald-400 font-bold">
                    {ex.insuranceFund}
                  </td>
                  <td className="py-3.5">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                      {ex.adlRisk}
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-700 dark:text-slate-300">
                    {ex.maintenanceMargin}
                  </td>
                  <td className="py-3.5 text-slate-500 dark:text-slate-400 font-sans text-xs max-w-xs">
                    {ex.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. INTERACTIVE FREQUENTLY ASKED QUESTIONS ACCORDION */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-purple-500" />
            <span>Liquidation Heatmap &amp; Risk FAQ</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Clear, authoritative answers to critical leverage and orderbook liquidation questions
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-850/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-amber-500" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
