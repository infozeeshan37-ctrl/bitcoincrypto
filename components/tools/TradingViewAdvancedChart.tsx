"use client";

import React, { useEffect, useRef, useState, useMemo } from "react";
import {
  Maximize2,
  Minimize2,
  Sun,
  Moon,
  Activity,
  Check,
  Zap,
  Sliders,
  Compass,
  RefreshCw
} from "lucide-react";

export interface IndicatorOption {
  id: string;
  name: string;
  shortName: string;
  studyCode: string;
  category: "Oscillator" | "Trend" | "Volatility" | "Volume";
  description: string;
}

export const POPULAR_INDICATORS: IndicatorOption[] = [
  {
    id: "rsi",
    name: "Relative Strength Index (RSI)",
    shortName: "RSI",
    studyCode: "RSI@tv-basicstudies",
    category: "Oscillator",
    description: "Momentum oscillator measuring the speed and change of price movements (Overbought > 70, Oversold < 30)."
  },
  {
    id: "macd",
    name: "Moving Average Convergence Divergence",
    shortName: "MACD",
    studyCode: "MACD@tv-basicstudies",
    category: "Oscillator",
    description: "Trend-following momentum indicator showing the relationship between two exponential moving averages."
  },
  {
    id: "bb",
    name: "Bollinger Bands",
    shortName: "BB",
    studyCode: "BB@tv-basicstudies",
    category: "Volatility",
    description: "Volatility bands placed above and below a moving average to identify overbought/oversold and volatility squeezes."
  },
  {
    id: "ema",
    name: "Moving Average Exponential (EMA)",
    shortName: "EMA",
    studyCode: "MAExp@tv-basicstudies",
    category: "Trend",
    description: "Exponential moving average weighting recent price data more heavily for rapid trend detection."
  },
  {
    id: "sma",
    name: "Simple Moving Average (SMA)",
    shortName: "SMA",
    studyCode: "MASimple@tv-basicstudies",
    category: "Trend",
    description: "Calculates the average price over a specific number of periods to smooth out noise."
  },
  {
    id: "stoch_rsi",
    name: "Stochastic RSI",
    shortName: "Stoch RSI",
    studyCode: "StochasticRSI@tv-basicstudies",
    category: "Oscillator",
    description: "Applies the Stochastic oscillator formula to RSI values rather than standard price data."
  },
  {
    id: "volume",
    name: "Volume & Volume MA",
    shortName: "Volume",
    studyCode: "Volume@tv-basicstudies",
    category: "Volume",
    description: "Displays transaction volume bars with moving average smoothing to confirm breakouts."
  },
  {
    id: "supertrend",
    name: "SuperTrend Indicator",
    shortName: "SuperTrend",
    studyCode: "Supertrend@tv-basicstudies",
    category: "Trend",
    description: "ATR-based trend-following indicator providing clear buy/sell trailing stop boundaries."
  },
  {
    id: "ichimoku",
    name: "Ichimoku Cloud",
    shortName: "Ichimoku",
    studyCode: "IchimokuCloud@tv-basicstudies",
    category: "Trend",
    description: "Comprehensive indicator defining support/resistance, trend direction, momentum, and buy/sell signals."
  },
  {
    id: "atr",
    name: "Average True Range (ATR)",
    shortName: "ATR",
    studyCode: "AverageTrueRange@tv-basicstudies",
    category: "Volatility",
    description: "Market volatility indicator measuring the entire range of an asset price for the period."
  },
  {
    id: "psar",
    name: "Parabolic SAR",
    shortName: "PSAR",
    studyCode: "ParabolicSAR@tv-basicstudies",
    category: "Trend",
    description: "Price and time analysis indicator used to determine potential reversals in market direction."
  }
];

export const TIMEFRAME_OPTIONS = [
  { label: "1m", value: "1", desc: "Scalping" },
  { label: "5m", value: "5", desc: "Short Intraday" },
  { label: "15m", value: "15", desc: "Intraday" },
  { label: "1h", value: "60", desc: "Hourly Swing" },
  { label: "4h", value: "240", desc: "4-Hour Trend" },
  { label: "1D", value: "D", desc: "Daily Macro" },
  { label: "1W", value: "W", desc: "Weekly Cycle" },
];

export const CHART_STYLE_OPTIONS = [
  { id: "1", label: "Candlestick", icon: "🕯️" },
  { id: "8", label: "Heikin Ashi", icon: "📊" },
  { id: "2", label: "Line", icon: "📈" },
  { id: "3", label: "Area", icon: "🏔️" },
  { id: "9", label: "Hollow Candles", icon: "◽" },
  { id: "10", label: "Baseline", icon: "⚖️" },
];

interface TradingViewAdvancedChartProps {
  symbol: string; // e.g. "BINANCE:BTCUSDT" or "BTCUSDT"
  defaultInterval?: string; // "15", "60", "240", "D", "W"
  height?: number | string;
  theme?: "light" | "dark";
  showIndicatorBar?: boolean;
  showTimeframeBar?: boolean;
  showStyleBar?: boolean;
  onTimeframeChange?: (tf: string) => void;
  className?: string;
}

declare global {
  interface Window {
    TradingView: any;
  }
}

// Timeframe mapping helper
function mapIntervalToTv(val: string) {
  if (val === "15M") return "15";
  if (val === "1H") return "60";
  if (val === "4H") return "240";
  if (val === "1D") return "D";
  if (val === "1W") return "W";
  return val || "60";
}

function TradingViewAdvancedChartComponent({
  symbol,
  defaultInterval = "60",
  height = 640,
  theme: initialTheme = "light",
  showIndicatorBar = true,
  showTimeframeBar = true,
  showStyleBar = true,
  onTimeframeChange,
  className = ""
}: TradingViewAdvancedChartProps) {
  // Normalize symbol (ensure BINANCE: prefix if missing crypto pair)
  const cleanSymbol = useMemo(() => {
    return symbol.includes(":") ? symbol : `BINANCE:${symbol.toUpperCase()}`;
  }, [symbol]);

  // STABLE container ID tied solely to cleanSymbol to avoid any re-render churn
  const containerId = useMemo(() => {
    const safe = cleanSymbol.replace(/[^a-zA-Z0-9]/g, "_");
    return `tv_chart_${safe}`;
  }, [cleanSymbol]);

  const containerRef = useRef<HTMLDivElement>(null);
  const currentIntervalRef = useRef<string>(mapIntervalToTv(defaultInterval));

  const [interval, setIntervalState] = useState<string>(mapIntervalToTv(defaultInterval));
  const [chartStyle, setChartStyle] = useState<string>("1"); // 1 = Candles
  const [theme, setTheme] = useState<"light" | "dark">(initialTheme);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [showIndicatorModal, setShowIndicatorModal] = useState<boolean>(false);

  // Active technical indicator studies
  const [activeIndicators, setActiveIndicators] = useState<string[]>([
    "RSI@tv-basicstudies",
    "MACD@tv-basicstudies",
    "BB@tv-basicstudies"
  ]);

  // Update interval state only when defaultInterval actually changes to a different value
  useEffect(() => {
    const mapped = mapIntervalToTv(defaultInterval);
    if (mapped !== currentIntervalRef.current) {
      currentIntervalRef.current = mapped;
      setIntervalState(mapped);
    }
  }, [defaultInterval]);

  // Toggle Indicator
  const toggleIndicator = (studyCode: string) => {
    setActiveIndicators((prev) => {
      if (prev.includes(studyCode)) {
        return prev.filter((s) => s !== studyCode);
      } else {
        return [...prev, studyCode];
      }
    });
  };

  // Quick Preset Packs
  const applyPreset = (preset: "momentum" | "trend" | "volatility" | "all") => {
    if (preset === "momentum") {
      setActiveIndicators(["RSI@tv-basicstudies", "MACD@tv-basicstudies", "StochasticRSI@tv-basicstudies"]);
    } else if (preset === "trend") {
      setActiveIndicators(["MAExp@tv-basicstudies", "MASimple@tv-basicstudies", "Supertrend@tv-basicstudies"]);
    } else if (preset === "volatility") {
      setActiveIndicators(["BB@tv-basicstudies", "AverageTrueRange@tv-basicstudies", "Volume@tv-basicstudies"]);
    } else if (preset === "all") {
      setActiveIndicators([
        "RSI@tv-basicstudies",
        "MACD@tv-basicstudies",
        "BB@tv-basicstudies",
        "MAExp@tv-basicstudies",
        "Volume@tv-basicstudies"
      ]);
    }
  };

  // Render TradingView Chart Widget - ONLY when cleanSymbol, interval, chartStyle, theme, or activeIndicators change
  useEffect(() => {
    let isMounted = true;

    const renderWidget = () => {
      if (!isMounted || !containerRef.current) return;

      containerRef.current.innerHTML = `<div id="${containerId}" style="height: 100%; width: 100%;"></div>`;

      if (window.TradingView) {
        try {
          new window.TradingView.widget({
            autosize: true,
            symbol: cleanSymbol,
            interval: interval,
            timezone: "Etc/UTC",
            theme: theme,
            style: chartStyle,
            locale: "en",
            toolbar_bg: theme === "dark" ? "#0f172a" : "#ffffff",
            enable_publishing: false,
            allow_symbol_change: true,
            container_id: containerId,
            hide_side_toolbar: false, // FULL DRAWING SUITE (Long/Short, Fib, Trendlines, etc.)
            withdateranges: true,
            save_image: true,
            details: false,
            hotlist: false,
            calendar: false,
            studies: activeIndicators,
            show_popup_button: true,
            popup_width: "1000",
            popup_height: "650",
            disabled_features: ["use_localstorage_for_settings"],
            enabled_features: [
              "study_templates",
              "header_indicators",
              "header_chart_type",
              "header_settings",
              "side_toolbar_in_fullscreen_mode"
            ]
          });
        } catch (e) {
          console.warn("TradingView widget init error:", e);
        }
      }
    };

    // Load tv.js script if not present
    let script = document.getElementById("tradingview-widget-script") as HTMLScriptElement;
    if (!script) {
      script = document.createElement("script");
      script.id = "tradingview-widget-script";
      script.src = "https://s3.tradingview.com/tv.js";
      script.type = "text/javascript";
      script.async = true;
      script.onload = renderWidget;
      document.head.appendChild(script);
    } else {
      if (window.TradingView) {
        renderWidget();
      } else {
        script.addEventListener("load", renderWidget);
      }
    }

    return () => {
      isMounted = false;
    };
  }, [cleanSymbol, interval, chartStyle, theme, activeIndicators, containerId]);

  return (
    <div
      className={`relative flex flex-col bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden transition-all ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none h-screen w-screen" : ""
      } ${className}`}
    >
      {/* TOP CONTROL BAR: Timeframes, Chart Styles, Indicators, Themes, Fullscreen */}
      <div className="bg-slate-900 text-white p-3 sm:px-4 sm:py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 select-none">
        
        {/* Left: Active Symbol & Timeframes */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-2 bg-slate-800/80 px-2.5 py-1 rounded-xl border border-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs font-black tracking-wide text-amber-400">
              {cleanSymbol}
            </span>
            <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-950/60 px-1.5 py-0.2 rounded border border-emerald-800/40">
              WebSocket Stream
            </span>
          </div>

          {/* Timeframe Selector */}
          {showTimeframeBar && (
            <div className="flex items-center gap-1 bg-slate-800/60 p-0.5 rounded-xl border border-slate-700/60">
              {TIMEFRAME_OPTIONS.map((tf) => {
                const isActive = interval === tf.value;
                return (
                  <button
                    key={tf.value}
                    onClick={() => {
                      currentIntervalRef.current = tf.value;
                      setIntervalState(tf.value);
                      if (onTimeframeChange) onTimeframeChange(tf.value);
                    }}
                    title={tf.desc}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition font-mono ${
                      isActive
                        ? "bg-amber-400 text-slate-950 shadow-sm font-extrabold"
                        : "text-slate-300 hover:text-white hover:bg-slate-700/50"
                    }`}
                  >
                    {tf.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Center: Chart Style Selector */}
        {showStyleBar && (
          <div className="hidden md:flex items-center gap-1 bg-slate-800/60 p-0.5 rounded-xl border border-slate-700/60">
            {CHART_STYLE_OPTIONS.slice(0, 4).map((st) => (
              <button
                key={st.id}
                onClick={() => setChartStyle(st.id)}
                className={`px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1 transition ${
                  chartStyle === st.id
                    ? "bg-slate-700 text-amber-300 shadow-sm"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <span>{st.icon}</span>
                <span className="hidden lg:inline text-[11px]">{st.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Right: Technical Indicators, Theme, Fullscreen */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Indicators Modal / Dropdown Toggle */}
          {showIndicatorBar && (
            <button
              onClick={() => setShowIndicatorModal(!showIndicatorModal)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition border ${
                activeIndicators.length > 0
                  ? "bg-amber-400 text-slate-950 border-amber-300 shadow-sm hover:bg-amber-300"
                  : "bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700"
              }`}
            >
              <Activity className="w-3.5 h-3.5" />
              <span>Indicators</span>
              <span className="w-4 h-4 rounded-full bg-slate-900/20 text-[10px] flex items-center justify-center font-mono">
                {activeIndicators.length}
              </span>
            </button>
          )}

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            title="Toggle Light/Dark Theme"
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700"
          >
            {theme === "light" ? <Moon className="w-3.5 h-3.5 text-amber-400" /> : <Sun className="w-3.5 h-3.5 text-amber-400" />}
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Analysis Mode"}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition border border-slate-700"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5 text-amber-400" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>

      </div>

      {/* QUICK INDICATOR CHIPS BAR */}
      {showIndicatorBar && (
        <div className="bg-slate-800/90 px-3 py-2 border-b border-slate-700 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1 flex items-center gap-1">
              <Zap className="w-3 h-3 text-amber-400" /> Quick TA Overlays:
            </span>
            {POPULAR_INDICATORS.slice(0, 6).map((ind) => {
              const isActive = activeIndicators.includes(ind.studyCode);
              return (
                <button
                  key={ind.id}
                  onClick={() => toggleIndicator(ind.studyCode)}
                  className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition flex items-center gap-1 ${
                    isActive
                      ? "bg-amber-400 text-slate-950 font-bold shadow-sm"
                      : "bg-slate-900/60 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60"
                  }`}
                >
                  {isActive && <Check className="w-3 h-3 text-slate-950" />}
                  <span>{ind.shortName}</span>
                </button>
              );
            })}
          </div>

          {/* Preset Strategy Buttons */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono text-slate-400">Presets:</span>
            <button
              onClick={() => applyPreset("momentum")}
              className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-200"
            >
              Momentum
            </button>
            <button
              onClick={() => applyPreset("trend")}
              className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-200"
            >
              Trend Follow
            </button>
            <button
              onClick={() => applyPreset("volatility")}
              className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-700 hover:bg-slate-600 text-slate-200"
            >
              Volatility
            </button>
          </div>
        </div>
      )}

      {/* FULL TECHNICAL INDICATOR MODAL / DRAWER */}
      {showIndicatorModal && (
        <div className="absolute top-24 right-4 z-40 w-96 max-w-[90vw] bg-white rounded-2xl shadow-2xl border border-slate-200 p-5 space-y-4 animate-in fade-in slide-in-from-top-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Sliders className="w-4 h-4 text-amber-500" />
              <h4 className="text-sm font-black text-slate-900">Technical Analysis Indicators</h4>
            </div>
            <button
              onClick={() => setShowIndicatorModal(false)}
              className="text-slate-400 hover:text-slate-600 font-bold text-xs"
            >
              ✕
            </button>
          </div>

          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            {POPULAR_INDICATORS.map((ind) => {
              const isSelected = activeIndicators.includes(ind.studyCode);
              return (
                <div
                  key={ind.id}
                  onClick={() => toggleIndicator(ind.studyCode)}
                  className={`p-2.5 rounded-xl border transition cursor-pointer flex items-start justify-between gap-2 ${
                    isSelected
                      ? "bg-amber-50 border-amber-300 text-slate-900"
                      : "bg-slate-50/70 border-slate-200/80 hover:border-slate-300 text-slate-700"
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-900">{ind.name}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-200 text-slate-700">
                        {ind.category}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-500 leading-tight">{ind.description}</p>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 border ${
                      isSelected
                        ? "bg-amber-400 border-amber-500 text-slate-950"
                        : "bg-white border-slate-300"
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5" />}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500 text-[11px]">
              {activeIndicators.length} indicators loaded
            </span>
            <button
              onClick={() => setActiveIndicators([])}
              className="text-rose-600 hover:text-rose-700 font-bold text-[11px]"
            >
              Clear All
            </button>
          </div>
        </div>
      )}

      {/* DRAWING SUITE NOTIFICATION / HELPER HINT */}
      <div className="bg-slate-50 px-4 py-1.5 border-b border-slate-200 flex items-center justify-between text-[11px] text-slate-500 font-medium">
        <div className="flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-amber-600" />
          <span>
            <strong>Drawing Tools Active:</strong> Use the left toolbar for Long/Short Position tools, Trendlines, Channels, and Fibonacci Retracements without interruption.
          </span>
        </div>
        <span className="hidden sm:inline font-mono text-[10px] text-slate-400">
          TradingView Professional Engine (Persistent)
        </span>
      </div>

      {/* CHART EMBED CONTAINER - Stably mounted */}
      <div
        ref={containerRef}
        style={{ height: isFullscreen ? "calc(100vh - 110px)" : typeof height === "number" ? `${height}px` : height }}
        className="w-full relative overflow-hidden bg-slate-900 min-h-[440px] sm:min-h-[520px] md:min-h-[580px]"
      >
        {/* Fallback placeholder while TradingView loads */}
        <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-xs bg-slate-900/40 pointer-events-none">
          <div className="flex items-center gap-2 font-mono">
            <RefreshCw className="w-4 h-4 animate-spin text-amber-400" />
            <span>Connecting TradingView WebSocket Engine...</span>
          </div>
        </div>
      </div>

    </div>
  );
}

// Wrap with React.memo to prevent parent state re-renders (like Binance ticker polling) from resetting chart & drawings
const TradingViewAdvancedChart = React.memo(
  TradingViewAdvancedChartComponent,
  (prevProps, nextProps) => {
    return (
      prevProps.symbol === nextProps.symbol &&
      prevProps.defaultInterval === nextProps.defaultInterval &&
      prevProps.height === nextProps.height &&
      prevProps.theme === nextProps.theme &&
      prevProps.showIndicatorBar === nextProps.showIndicatorBar &&
      prevProps.showTimeframeBar === nextProps.showTimeframeBar &&
      prevProps.showStyleBar === nextProps.showStyleBar
    );
  }
);

export default TradingViewAdvancedChart;
