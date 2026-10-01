"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Calculator,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  AlertTriangle,
  Zap,
  Flame,
  Info,
  ChevronDown,
  ArrowRight,
  Layers,
  Scale,
  DollarSign,
  Percent,
  CheckCircle2,
  RefreshCw,
  Sliders
} from "lucide-react";

interface AssetPreset {
  symbol: string;
  name: string;
  price: number;
  defaultLeverage: number;
}

const PRESET_ASSETS: AssetPreset[] = [
  { symbol: "BTC", name: "Bitcoin", price: 88450, defaultLeverage: 10 },
  { symbol: "ETH", name: "Ethereum", price: 3120, defaultLeverage: 10 },
  { symbol: "SOL", name: "Solana", price: 194.3, defaultLeverage: 5 },
  { symbol: "XRP", name: "XRP", price: 2.45, defaultLeverage: 5 },
  { symbol: "SUI", name: "Sui", price: 3.42, defaultLeverage: 5 },
  { symbol: "DOGE", name: "Dogecoin", price: 0.224, defaultLeverage: 5 },
];

export default function ProfitLossCalculatorTool() {
  const [direction, setDirection] = useState<"LONG" | "SHORT">("LONG");
  const [selectedAsset, setSelectedAsset] = useState<string>("BTC");
  const [entryPrice, setEntryPrice] = useState<number>(88450);
  const [exitPrice, setExitPrice] = useState<number>(95000);
  const [stopLossPrice, setStopLossPrice] = useState<number>(84000);
  const [marginUsd, setMarginUsd] = useState<number>(1000);
  const [leverage, setLeverage] = useState<number>(10);
  const [makerFeePct, setMakerFeePct] = useState<number>(0.02); // 0.02%
  const [takerFeePct, setTakerFeePct] = useState<number>(0.05); // 0.05%
  const [orderType, setOrderType] = useState<"TAKER" | "MAKER">("TAKER");
  const [fundingHours, setFundingHours] = useState<number>(24);
  const [estFundingRate8h, setEstFundingRate8h] = useState<number>(0.01); // 0.01% per 8h
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Asset preset selector handler
  const handleAssetSelect = (preset: AssetPreset) => {
    setSelectedAsset(preset.symbol);
    setEntryPrice(preset.price);
    if (direction === "LONG") {
      setExitPrice(+(preset.price * 1.08).toFixed(2));
      setStopLossPrice(+(preset.price * 0.95).toFixed(2));
    } else {
      setExitPrice(+(preset.price * 0.92).toFixed(2));
      setStopLossPrice(+(preset.price * 1.05).toFixed(2));
    }
  };

  // Quantitative calculations
  const calculations = useMemo(() => {
    const totalPositionNotional = marginUsd * leverage;
    const coinQuantity = entryPrice > 0 ? totalPositionNotional / entryPrice : 0;

    // Price delta in % and $
    let priceDiff = exitPrice - entryPrice;
    if (direction === "SHORT") {
      priceDiff = entryPrice - exitPrice;
    }

    const priceChangePct = entryPrice > 0 ? (priceDiff / entryPrice) * 100 : 0;
    const grossPnl = coinQuantity * priceDiff;
    const grossRoiPct = marginUsd > 0 ? (grossPnl / marginUsd) * 100 : 0;

    // Fee calculations
    const feeRate = (orderType === "MAKER" ? makerFeePct : takerFeePct) / 100;
    const openFee = totalPositionNotional * feeRate;
    const exitNotional = coinQuantity * exitPrice;
    const closeFee = exitNotional * feeRate;

    // Funding fee (number of 8h intervals)
    const fundingIntervals = Math.max(0, fundingHours / 8);
    const fundingFee = totalPositionNotional * (estFundingRate8h / 100) * fundingIntervals * (direction === "LONG" ? 1 : -1);

    const totalFees = openFee + closeFee + Math.max(0, fundingFee);
    const netPnl = grossPnl - totalFees;
    const netRoiPct = marginUsd > 0 ? (netPnl / marginUsd) * 100 : 0;

    // Liquidation Price calculation (Approximate Maintenance Margin ~ 0.5%)
    const mmr = 0.005; // 0.5% maintenance margin
    let liquidationPrice = 0;
    if (direction === "LONG") {
      liquidationPrice = entryPrice * (1 - 1 / leverage + mmr);
    } else {
      liquidationPrice = entryPrice * (1 + 1 / leverage - mmr);
    }
    liquidationPrice = Math.max(0, liquidationPrice);

    const liqDistancePct = entryPrice > 0 ? Math.abs((liquidationPrice - entryPrice) / entryPrice) * 100 : 0;
    const liqDistanceUsd = Math.abs(liquidationPrice - entryPrice);

    // Risk-to-Reward Ratio against Stop Loss
    let slDiff = entryPrice - stopLossPrice;
    if (direction === "SHORT") {
      slDiff = stopLossPrice - entryPrice;
    }
    const slLossGross = coinQuantity * Math.abs(slDiff);
    const riskRewardRatio = slLossGross > 0 ? (grossPnl / slLossGross).toFixed(2) : "N/A";

    return {
      totalPositionNotional,
      coinQuantity,
      priceChangePct,
      grossPnl,
      grossRoiPct,
      openFee,
      closeFee,
      fundingFee,
      totalFees,
      netPnl,
      netRoiPct,
      liquidationPrice,
      liqDistancePct,
      liqDistanceUsd,
      riskRewardRatio,
      slLossGross
    };
  }, [direction, entryPrice, exitPrice, stopLossPrice, marginUsd, leverage, makerFeePct, takerFeePct, orderType, fundingHours, estFundingRate8h]);

  // Target profit ladder (+5%, +10%, +25%, +50%, +100%, +200% ROI)
  const targetLadder = useMemo(() => {
    const roiSteps = [10, 25, 50, 100, 200];
    return roiSteps.map((roi) => {
      const requiredPriceDeltaPct = (roi / leverage) / 100;
      let targetP = direction === "LONG"
        ? entryPrice * (1 + requiredPriceDeltaPct)
        : entryPrice * (1 - requiredPriceDeltaPct);
      targetP = Math.max(0, targetP);
      const grossProfit = marginUsd * (roi / 100);
      return {
        roi,
        targetPrice: targetP,
        grossProfit
      };
    });
  }, [entryPrice, leverage, marginUsd, direction]);

  const faqs = [
    {
      q: "How does leverage amplify both crypto profits and liquidation risks?",
      a: "Leverage borrows capital against your initial collateral (margin). With 10x leverage, a 5% favorable price move yields a 50% return on equity (+50% ROI). Conversely, an adverse 10% price move depletes 100% of your collateral, triggering an automatic liquidation by the exchange matching engine."
    },
    {
      q: "What is the difference between Maker and Taker fees in futures trading?",
      a: "Maker orders (e.g. limit orders resting on the order book) provide liquidity and incur lower fees (typically 0.02%). Taker orders (market orders or immediate execution limit orders) consume liquidity and incur higher fees (typically 0.05%). On large levered positions, taker fees can consume a significant portion of net gains."
    },
    {
      q: "How is the Perpetual Futures Liquidation Price mathematically calculated?",
      a: "For an Isolated Long position, Liquidation Price = Entry Price × [1 - (1 / Leverage) + Maintenance Margin Rate]. For a Short position, Liquidation Price = Entry Price × [1 + (1 / Leverage) - Maintenance Margin Rate]. For example, 20x leverage gives only a ~4.5% adverse buffer before total margin wipeout."
    },
    {
      q: "How does 8-hour funding rate impact long-duration swing trades?",
      a: "Perpetual futures do not expire; instead, longs pay shorts (or shorts pay longs) every 8 hours based on the funding rate. If the funding rate is +0.02% per 8 hours and you hold a $50,000 notional long for 30 days (90 intervals), you will pay $900 in cumulative funding fees."
    }
  ];

  return (
    <div className="space-y-8">
      {/* Quick Asset Selector Header */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider whitespace-nowrap">
          Quick Preset:
        </span>
        {PRESET_ASSETS.map((asset) => (
          <button
            key={asset.symbol}
            onClick={() => handleAssetSelect(asset)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition flex items-center gap-1.5 ${
              selectedAsset === asset.symbol
                ? "bg-amber-400 text-slate-950 shadow-sm"
                : "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-amber-400"
            }`}
          >
            <span>{asset.symbol}</span>
            <span className="opacity-70 text-[11px]">${asset.price.toLocaleString()}</span>
          </button>
        ))}
      </div>

      {/* Main Grid: Inputs vs Results */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Side: Trade Parameters Form */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
            <h3 className="font-black text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-amber-500" />
              <span>Trade Parameters</span>
            </h3>

            {/* Long / Short Toggle */}
            <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1 border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setDirection("LONG")}
                className={`px-4 py-1 rounded-lg text-xs font-black transition flex items-center gap-1 ${
                  direction === "LONG"
                    ? "bg-emerald-500 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>LONG</span>
              </button>
              <button
                onClick={() => setDirection("SHORT")}
                className={`px-4 py-1 rounded-lg text-xs font-black transition flex items-center gap-1 ${
                  direction === "SHORT"
                    ? "bg-rose-500 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                <TrendingDown className="w-3.5 h-3.5" />
                <span>SHORT</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Margin Collateral & Leverage */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Initial Margin ($USD)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-slate-400 text-sm">$</span>
                  <input
                    type="number"
                    value={marginUsd}
                    onChange={(e) => setMarginUsd(Math.max(1, Number(e.target.value)))}
                    className="w-full pl-7 pr-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Leverage Multiplier
                  </label>
                  <span className={`text-xs font-black font-mono px-2 py-0.5 rounded-md ${
                    leverage >= 25 ? "bg-rose-500/20 text-rose-500" : "bg-amber-400/20 text-amber-700 dark:text-amber-400"
                  }`}>
                    {leverage}x
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={leverage}
                  onChange={(e) => setLeverage(Number(e.target.value))}
                  className="w-full accent-amber-400"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>1x (Spot)</span>
                  <span>10x</span>
                  <span>50x</span>
                  <span>100x (Max)</span>
                </div>
              </div>
            </div>

            {/* Entry, Exit, and Stop-Loss Prices */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Entry Price ($)
                </label>
                <input
                  type="number"
                  step="any"
                  value={entryPrice}
                  onChange={(e) => setEntryPrice(Math.max(0.000001, Number(e.target.value)))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-emerald-500 dark:text-emerald-400">
                  Target Exit Price ($)
                </label>
                <input
                  type="number"
                  step="any"
                  value={exitPrice}
                  onChange={(e) => setExitPrice(Math.max(0.000001, Number(e.target.value)))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-emerald-500/30 font-mono text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-rose-500 dark:text-rose-400">
                  Stop-Loss Price ($)
                </label>
                <input
                  type="number"
                  step="any"
                  value={stopLossPrice}
                  onChange={(e) => setStopLossPrice(Math.max(0.000001, Number(e.target.value)))}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-rose-500/30 font-mono text-sm font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-400"
                />
              </div>
            </div>

            {/* Fee Modeling Accordion / Sub-panel */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                <span>Fee Deduction Simulation</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType("TAKER")}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                      orderType === "TAKER" ? "bg-amber-400 text-slate-950 font-bold" : "text-slate-400"
                    }`}
                  >
                    Taker (0.05%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType("MAKER")}
                    className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                      orderType === "MAKER" ? "bg-amber-400 text-slate-950 font-bold" : "text-slate-400"
                    }`}
                  >
                    Maker (0.02%)
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Holding Period</span>
                  <select
                    value={fundingHours}
                    onChange={(e) => setFundingHours(Number(e.target.value))}
                    className="mt-1 w-full p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs"
                  >
                    <option value={8}>8 Hours (1 Interval)</option>
                    <option value={24}>24 Hours (3 Intervals)</option>
                    <option value={72}>3 Days (9 Intervals)</option>
                    <option value={168}>7 Days (21 Intervals)</option>
                    <option value={720}>30 Days (90 Intervals)</option>
                  </select>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Est. 8h Funding Rate</span>
                  <input
                    type="number"
                    step="0.005"
                    value={estFundingRate8h}
                    onChange={(e) => setEstFundingRate8h(Number(e.target.value))}
                    className="mt-1 w-full p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-mono text-xs font-bold"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Institutional Quantitative Results */}
        <div className="lg:col-span-6 space-y-6">
          {/* Main P&L Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-xl space-y-6 relative overflow-hidden">
            {/* Ambient Accent Glow */}
            <div
              className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl opacity-20 pointer-events-none ${
                calculations.netPnl >= 0 ? "bg-emerald-500" : "bg-rose-500"
              }`}
            />

            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  Net Expected Return
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span
                    className={`text-3xl sm:text-4xl font-black font-mono tracking-tight ${
                      calculations.netPnl >= 0 ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    {calculations.netPnl >= 0 ? "+" : ""}${calculations.netPnl.toFixed(2)}
                  </span>
                  <span
                    className={`text-sm sm:text-base font-bold font-mono ${
                      calculations.netRoiPct >= 0 ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    ({calculations.netRoiPct >= 0 ? "+" : ""}{calculations.netRoiPct.toFixed(2)}% ROI)
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Total Notional Size
                </span>
                <span className="text-lg font-black font-mono text-white mt-0.5 block">
                  ${calculations.totalPositionNotional.toLocaleString()}
                </span>
                <span className="text-[11px] font-mono text-slate-400 block">
                  {calculations.coinQuantity.toFixed(4)} {selectedAsset}
                </span>
              </div>
            </div>

            {/* Liquidation Radar Metric */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Estimated Liquidation Price</span>
                </div>
                <span className="text-sm font-black font-mono text-rose-400">
                  ${calculations.liquidationPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              {/* Liquidation Buffer Bar */}
              <div className="space-y-1">
                <div className="h-2 w-full rounded-full bg-slate-700 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      calculations.liqDistancePct < 10 ? "bg-rose-500" : calculations.liqDistancePct < 25 ? "bg-amber-400" : "bg-emerald-400"
                    }`}
                    style={{ width: `${Math.min(100, calculations.liqDistancePct * 2)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span>Liquidation Buffer: <strong className="text-white">{calculations.liqDistancePct.toFixed(2)}%</strong></span>
                  <span>Distance: <strong className="text-white">${calculations.liqDistanceUsd.toFixed(2)}</strong></span>
                </div>
              </div>
            </div>

            {/* Breakdown Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <span className="text-slate-400 block text-[10px]">Gross P&L</span>
                <span className="font-mono font-bold text-white mt-0.5 block">
                  {calculations.grossPnl >= 0 ? "+" : ""}${calculations.grossPnl.toFixed(2)}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <span className="text-slate-400 block text-[10px]">Exchange Fees</span>
                <span className="font-mono font-bold text-rose-400 mt-0.5 block">
                  -${(calculations.openFee + calculations.closeFee).toFixed(2)}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <span className="text-slate-400 block text-[10px]">Est. Funding</span>
                <span className="font-mono font-bold text-amber-400 mt-0.5 block">
                  -${Math.abs(calculations.fundingFee).toFixed(2)}
                </span>
              </div>
              <div className="p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                <span className="text-slate-400 block text-[10px]">Risk/Reward Ratio</span>
                <span className="font-mono font-bold text-emerald-400 mt-0.5 block">
                  1:{calculations.riskRewardRatio}
                </span>
              </div>
            </div>
          </div>

          {/* Take Profit Target Ladder Table */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h4 className="font-black text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-500" />
              <span>Take-Profit Target Ladder Matrix</span>
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 text-[10px] uppercase border-b border-slate-200 dark:border-slate-700">
                  <tr>
                    <th className="py-2 px-3">Target ROI</th>
                    <th className="py-2 px-3">Target Price</th>
                    <th className="py-2 px-3 text-right">Net Dollar Profit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {targetLadder.map((t, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30">
                      <td className="py-2.5 px-3 font-bold text-emerald-500">+{t.roi}% ROI</td>
                      <td className="py-2.5 px-3 text-slate-800 dark:text-slate-200">${t.targetPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                      <td className="py-2.5 px-3 text-right font-black text-emerald-400">+${t.grossProfit.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ & Knowledge Base */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Info className="w-5 h-5 text-amber-500" />
          <span>Frequently Asked Questions & Margin Math Guide</span>
        </h3>

        <div className="space-y-3 pt-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === i && (
                <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
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
