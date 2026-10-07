"use client";

import { useEffect, useRef, useState, useId } from "react";
import {
  Activity,
  Gauge,
  Sliders,
  TrendingUp,
  TrendingDown,
  Layers,
  Sparkles,
  Zap,
  Target,
  ShieldCheck,
  Percent,
  Compass,
  ArrowUpRight,
  ArrowDownRight,
  Info
} from "lucide-react";

export interface TechnicalAnalysisPanelProps {
  symbol: string; // e.g. "BINANCE:BTCUSDT" or "BTCUSDT"
  price: number;
  high24h: number;
  low24h: number;
  change24h?: number;
  defaultInterval?: string; // "1m", "5m", "15m", "1h", "4h", "1D", "1W", "1M"
  theme?: "light" | "dark";
}

export default function TechnicalAnalysisPanel({
  symbol,
  price,
  high24h,
  low24h,
  change24h = 0,
  defaultInterval = "1h",
  theme = "dark"
}: TechnicalAnalysisPanelProps) {
  const cleanSymbol = symbol.includes(":") ? symbol : `BINANCE:${symbol.toUpperCase()}`;
  const [taInterval, setTaInterval] = useState<string>(defaultInterval);
  const [pivotMethod, setPivotMethod] = useState<"CLASSIC" | "FIBONACCI" | "CAMARILLA" | "WOODIE">("FIBONACCI");
  const widgetContainerRef = useRef<HTMLDivElement>(null);

  // Render TradingView official Technical Analysis Gauge Widget
  useEffect(() => {
    if (!widgetContainerRef.current) return;
    widgetContainerRef.current.innerHTML = "";

    const widgetHolder = document.createElement("div");
    widgetHolder.className = "tradingview-widget-container__widget";
    widgetHolder.style.height = "100%";
    widgetHolder.style.width = "100%";

    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js";
    script.async = true;
    script.innerHTML = JSON.stringify({
      interval: taInterval,
      width: "100%",
      isTransparent: true,
      height: 440,
      symbol: cleanSymbol,
      showIntervalTabs: true,
      displayMode: "single",
      locale: "en",
      colorTheme: theme
    });

    const wrapper = document.createElement("div");
    wrapper.className = "tradingview-widget-container";
    wrapper.style.height = "100%";
    wrapper.style.width = "100%";
    wrapper.appendChild(widgetHolder);
    wrapper.appendChild(script);

    widgetContainerRef.current.appendChild(wrapper);

    return () => {
      if (widgetContainerRef.current) {
        widgetContainerRef.current.innerHTML = "";
      }
    };
  }, [cleanSymbol, taInterval, theme]);

  // Dynamic Mathematical Calculations
  const high = high24h || price * 1.03;
  const low = low24h || price * 0.97;
  const close = price;
  const range = high - low;

  // Format Helper
  const fmt = (n: number) => {
    if (n >= 1000) return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (n >= 1) return n.toFixed(2);
    if (n >= 0.01) return n.toFixed(4);
    return n.toFixed(6);
  };

  // 1. Classic Pivot Points
  const classicP = (high + low + close) / 3;
  const classicR1 = 2 * classicP - low;
  const classicS1 = 2 * classicP - high;
  const classicR2 = classicP + range;
  const classicS2 = classicP - range;
  const classicR3 = high + 2 * (classicP - low);
  const classicS3 = low - 2 * (high - classicP);

  // 2. Fibonacci Pivot Points
  const fibP = (high + low + close) / 3;
  const fibR1 = fibP + 0.382 * range;
  const fibS1 = fibP - 0.382 * range;
  const fibR2 = fibP + 0.618 * range;
  const fibS2 = fibP - 0.618 * range;
  const fibR3 = fibP + 1.0 * range;
  const fibS3 = fibP - 1.0 * range;

  // 3. Camarilla Pivot Points
  const camP = close;
  const camR1 = close + range * (1.1 / 12);
  const camS1 = close - range * (1.1 / 12);
  const camR2 = close + range * (1.1 / 6);
  const camS2 = close - range * (1.1 / 6);
  const camR3 = close + range * (1.1 / 4);
  const camS3 = close - range * (1.1 / 4);
  const camR4 = close + range * (1.1 / 2);
  const camS4 = close - range * (1.1 / 2);

  // 4. Woodie Pivot Points
  const woodieP = (high + low + 2 * close) / 4;
  const woodieR1 = 2 * woodieP - low;
  const woodieS1 = 2 * woodieP - high;
  const woodieR2 = woodieP + range;
  const woodieS2 = woodieP - range;

  // Selected Pivot Set
  const activePivots =
    pivotMethod === "CLASSIC"
      ? { p: classicP, r1: classicR1, r2: classicR2, r3: classicR3, s1: classicS1, s2: classicS2, s3: classicS3 }
      : pivotMethod === "FIBONACCI"
      ? { p: fibP, r1: fibR1, r2: fibR2, r3: fibR3, s1: fibS1, s2: fibS2, s3: fibS3 }
      : pivotMethod === "CAMARILLA"
      ? { p: camP, r1: camR1, r2: camR2, r3: camR3, r4: camR4, s1: camS1, s2: camS2, s3: camS3, s4: camS4 }
      : { p: woodieP, r1: woodieR1, r2: woodieR2, r3: woodieR2 * 1.02, s1: woodieS1, s2: woodieS2, s3: woodieS2 * 0.98 };

  // Fibonacci Retracement Levels from 24h High to 24h Low
  const fibLevels = [
    { ratio: "0.0%", name: "Swing High (Resistance)", price: high, color: "text-rose-600 dark:text-rose-400 bg-rose-50/80 dark:bg-rose-950/30 border-rose-200/80 dark:border-rose-900/40" },
    { ratio: "23.6%", name: "Shallow Pullback Level", price: high - 0.236 * range, color: "text-amber-700 dark:text-amber-400 bg-amber-50/80 dark:bg-amber-950/30 border-amber-200/80 dark:border-amber-900/40" },
    { ratio: "38.2%", name: "First Defense Support", price: high - 0.382 * range, color: "text-amber-700 dark:text-amber-400 bg-amber-50/80 dark:bg-amber-950/30 border-amber-200/80 dark:border-amber-900/40" },
    { ratio: "50.0%", name: "Equilibrium Mean Point", price: high - 0.5 * range, color: "text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700 font-bold" },
    { ratio: "61.8%", name: "Golden Pocket Zone", price: high - 0.618 * range, color: "text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 font-extrabold border-2 border-emerald-400 dark:border-emerald-600 shadow-sm" },
    { ratio: "78.6%", name: "Deep Value Retracement", price: high - 0.786 * range, color: "text-emerald-700 dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-200/80 dark:border-emerald-900/40" },
    { ratio: "100.0%", name: "Swing Low (Invalidation)", price: low, color: "text-slate-900 dark:text-slate-100 bg-slate-100 dark:bg-slate-800/80 border-slate-300 dark:border-slate-700" },
    { ratio: "161.8%", name: "Golden Target Extension", price: high + 0.618 * range, color: "text-blue-700 dark:text-blue-400 bg-blue-50/80 dark:bg-blue-950/30 border-blue-200/80 dark:border-blue-900/40" }
  ];

  return (
    <div className="space-y-6">

      {/* Top Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 transition-colors">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              <Gauge className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Institutional Technical Analysis: {cleanSymbol}
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Multi-timeframe oscillator meters, mathematical pivot point support/resistance, and algorithmic Fibonacci confluence.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono">
          <span className="text-xs text-slate-500 dark:text-slate-400">Current Price:</span>
          <span className="text-base font-black text-slate-900 dark:text-white">${fmt(price)}</span>
          <span className={`text-xs font-bold px-2 py-0.5 rounded-lg ${change24h >= 0 ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800" : "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800"}`}>
            {change24h >= 0 ? "+" : ""}{change24h.toFixed(2)}%
          </span>
        </div>
      </div>

      {/* Main Grid: Left Official TradingView Meter Widget | Right Mathematical Pivot & Fibonacci Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Official TradingView Real-Time Technical Analysis Meter */}
        <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-500" />
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                TradingView Real-Time Technical Meter
              </h4>
            </div>
            <span className="text-[10px] font-mono text-slate-400">Real-Time Aggregation</span>
          </div>

          <div ref={widgetContainerRef} className="w-full min-h-[440px] rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-950 flex items-center justify-center" />
        </div>

        {/* RIGHT COLUMN: Real-Time Pivot Points & Fibonacci Confluence Engine */}
        <div className="lg:col-span-6 space-y-6">

          {/* Pivot Points Matrix */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-amber-500" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Calculated Pivot Point Levels
                </h4>
              </div>

              {/* Method Switcher */}
              <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl text-[11px] font-bold">
                {(["FIBONACCI", "CLASSIC", "CAMARILLA", "WOODIE"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setPivotMethod(m)}
                    className={`px-2 py-1 rounded-lg transition ${
                      pivotMethod === m
                        ? "bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 shadow-sm font-extrabold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Pivot Ladder */}
            <div className="space-y-2 text-xs">
              {/* Resistance Levels */}
              {"r4" in activePivots && (
                <div className="flex justify-between items-center p-2 rounded-xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40">
                  <span className="font-bold text-rose-700 dark:text-rose-400 font-mono">Resistance 4 (R4) - Major Breakout</span>
                  <span className="font-black text-rose-700 dark:text-rose-400 font-mono">${fmt((activePivots as any).r4)}</span>
                </div>
              )}
              <div className="flex justify-between items-center p-2 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50">
                <span className="font-bold text-rose-700 dark:text-rose-400 font-mono">Resistance 3 (R3) - Extreme Target</span>
                <span className="font-black text-rose-700 dark:text-rose-400 font-mono">${fmt(activePivots.r3)}</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-xl bg-rose-50/80 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40">
                <span className="font-bold text-rose-600 dark:text-rose-400 font-mono">Resistance 2 (R2) - Secondary Rejection</span>
                <span className="font-extrabold text-rose-600 dark:text-rose-400 font-mono">${fmt(activePivots.r2)}</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40">
                <span className="font-bold text-amber-800 dark:text-amber-300 font-mono">Resistance 1 (R1) - Immediate Resistance</span>
                <span className="font-extrabold text-amber-800 dark:text-amber-300 font-mono">${fmt(activePivots.r1)}</span>
              </div>

              {/* Central Pivot */}
              <div className="flex justify-between items-center p-2.5 rounded-xl bg-slate-900 dark:bg-slate-950 text-white shadow-sm my-1 border border-slate-800">
                <span className="font-bold text-amber-400 font-mono flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Central Pivot Point (P)
                </span>
                <span className="font-black text-amber-400 font-mono text-sm">${fmt(activePivots.p)}</span>
              </div>

              {/* Support Levels */}
              <div className="flex justify-between items-center p-2 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40">
                <span className="font-bold text-emerald-800 dark:text-emerald-300 font-mono">Support 1 (S1) - Immediate Demand</span>
                <span className="font-extrabold text-emerald-800 dark:text-emerald-300 font-mono">${fmt(activePivots.s1)}</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                <span className="font-bold text-emerald-700 dark:text-emerald-400 font-mono">Support 2 (S2) - Key Liquidity Floor</span>
                <span className="font-extrabold text-emerald-700 dark:text-emerald-400 font-mono">${fmt(activePivots.s2)}</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/50">
                <span className="font-bold text-emerald-700 dark:text-emerald-400 font-mono">Support 3 (S3) - Invalidation Floor</span>
                <span className="font-black text-emerald-700 dark:text-emerald-400 font-mono">${fmt(activePivots.s3)}</span>
              </div>
              {"s4" in activePivots && (
                <div className="flex justify-between items-center p-2 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 font-mono">Support 4 (S4) - Capitulation Liquidation</span>
                  <span className="font-black text-emerald-700 dark:text-emerald-400 font-mono">${fmt((activePivots as any).s4)}</span>
                </div>
              )}
            </div>
          </div>

          {/* Fibonacci Retracement Engine */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Percent className="w-4 h-4 text-amber-500" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  24h Fibonacci Retracement Ladder
                </h4>
              </div>
              <span className="text-[10px] font-mono text-slate-400">High: ${fmt(high)} | Low: ${fmt(low)}</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {fibLevels.map((lvl) => {
                const isNearCurrentPrice = Math.abs(lvl.price - price) / price < 0.007;
                return (
                  <div
                    key={lvl.ratio}
                    className={`p-2.5 rounded-xl border flex items-center justify-between transition-all ${lvl.color} ${
                      isNearCurrentPrice ? "ring-2 ring-amber-400 shadow-sm scale-[1.01]" : ""
                    }`}
                  >
                    <div>
                      <div className="font-mono font-bold text-[11px] flex items-center gap-1">
                        <span>{lvl.ratio}</span>
                        {isNearCurrentPrice && (
                          <span className="text-[9px] px-1 py-0.2 bg-amber-400 text-slate-950 font-black rounded uppercase">
                            At Price
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">{lvl.name}</div>
                    </div>
                    <div className="font-mono font-extrabold text-xs text-slate-900 dark:text-white">
                      ${fmt(lvl.price)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
