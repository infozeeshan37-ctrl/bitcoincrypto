"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart2,
  Gauge,
  Layers,
  Sparkles,
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  RefreshCw,
  Search,
  ChevronRight,
  Clock,
  Compass
} from "lucide-react";
import TradingViewAdvancedChart from "../TradingViewAdvancedChart";
import TechnicalAnalysisPanel from "../TechnicalAnalysisPanel";
import ChartTerminalDetails from "./ChartTerminalDetails";

const POPULAR_PAIRS = [
  { label: "BTC/USDT", symbol: "BINANCE:BTCUSDT", base: "BTC", icon: "₿" },
  { label: "ETH/USDT", symbol: "BINANCE:ETHUSDT", base: "ETH", icon: "Ξ" },
  { label: "SOL/USDT", symbol: "BINANCE:SOLUSDT", base: "SOL", icon: "◎" },
  { label: "BNB/USDT", symbol: "BINANCE:BNBUSDT", base: "BNB", icon: "✦" },
  { label: "XRP/USDT", symbol: "BINANCE:XRPUSDT", base: "XRP", icon: "✕" },
  { label: "SUI/USDT", symbol: "BINANCE:SUIUSDT", base: "SUI", icon: "💧" },
  { label: "DOGE/USDT", symbol: "BINANCE:DOGEUSDT", base: "DOGE", icon: "Ð" },
  { label: "PEPE/USDT", symbol: "BINANCE:PEPEUSDT", base: "PEPE", icon: "🐸" }
];

export default function ChartTerminalTool() {
  const [selectedPair, setSelectedPair] = useState("BINANCE:BTCUSDT");
  const [viewMode, setViewMode] = useState<"suite" | "chart" | "analysis">("suite");
  const [customInput, setCustomInput] = useState("");

  const [tickerData, setTickerData] = useState<{
    price: number;
    high24h: number;
    low24h: number;
    change24h: number;
    volumeUsd: number;
    priceTick: "up" | "down" | "same";
    tickKey: number;
  }>({
    price: 88450,
    high24h: 90200,
    low24h: 86400,
    change24h: 2.4,
    volumeUsd: 42500000000,
    priceTick: "same",
    tickKey: 0
  });

  const activePairObj =
    POPULAR_PAIRS.find((p) => p.symbol === selectedPair) || {
      label: selectedPair.replace("BINANCE:", ""),
      symbol: selectedPair,
      base: selectedPair.replace("BINANCE:", "").replace("USDT", ""),
      icon: "💎"
    };

  // Fetch live ticker data & WebSocket stream from Binance
  useEffect(() => {
    const rawSym = selectedPair.replace("BINANCE:", "");

    // 1. REST initial fetch
    fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${rawSym}`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.lastPrice) {
          setTickerData((prev) => ({
            ...prev,
            price: parseFloat(data.lastPrice),
            high24h: parseFloat(data.highPrice),
            low24h: parseFloat(data.lowPrice),
            change24h: parseFloat(data.priceChangePercent),
            volumeUsd: parseFloat(data.quoteVolume)
          }));
        }
      })
      .catch((e) => console.warn("Binance ticker fetch notice:", e));

    // 2. Real-time WebSocket connection for live tick blinking
    let ws: WebSocket | null = null;
    try {
      ws = new WebSocket(`wss://stream.binance.com:9443/ws/${rawSym.toLowerCase()}@ticker`);
      ws.onmessage = (event) => {
        try {
          const stream = JSON.parse(event.data);
          if (stream && stream.c) {
            const p = parseFloat(stream.c);
            const chg = parseFloat(stream.P);
            const h = parseFloat(stream.h);
            const l = parseFloat(stream.l);
            const v = parseFloat(stream.q);

            if (!isNaN(p)) {
              setTickerData((prev) => {
                const tick = p > prev.price ? "up" : p < prev.price ? "down" : prev.priceTick;
                return {
                  price: p,
                  high24h: isNaN(h) ? prev.high24h : h,
                  low24h: isNaN(l) ? prev.low24h : l,
                  change24h: isNaN(chg) ? prev.change24h : chg,
                  volumeUsd: isNaN(v) ? prev.volumeUsd : v,
                  priceTick: tick,
                  tickKey: prev.tickKey + 1
                };
              });
            }
          }
        } catch (err) {
          // ignore
        }
      };
    } catch (e) {
      // ignore
    }

    return () => {
      if (ws) ws.close();
    };
  }, [selectedPair]);

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = customInput.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (!clean) return;
    const full = clean.endsWith("USDT") ? clean : `${clean}USDT`;
    setSelectedPair(`BINANCE:${full}`);
    setCustomInput("");
  };

  const formatPrice = (p: number) => {
    if (p >= 1000) return p.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    if (p >= 1) return p.toFixed(2);
    if (p >= 0.01) return p.toFixed(4);
    return p.toFixed(6);
  };

  const formatUsd = (n: number) => {
    if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
    if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
    return `$${n.toLocaleString()}`;
  };

  return (
    <div className="space-y-6">

      {/* 1. TOP MARKET SELECTOR & LIVE TICKER CONTROLS BAR */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-4">
        
        {/* Left: Popular Pairs Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 xl:pb-0 no-scrollbar">
          <span className="text-xs font-bold text-slate-400 uppercase font-mono mr-1 shrink-0">
            Markets:
          </span>
          {POPULAR_PAIRS.map((p) => {
            const isSelected = selectedPair === p.symbol;
            return (
              <button
                key={p.symbol}
                onClick={() => setSelectedPair(p.symbol)}
                className={`px-3 py-2 rounded-2xl text-xs font-black transition flex items-center gap-1.5 shrink-0 ${
                  isSelected
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 shadow-md scale-105"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                <span className="text-amber-500 font-bold">{p.icon}</span>
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>

        {/* Right: Custom Pair Loader Form + Live Blinking Price */}
        <div className="flex flex-wrap items-center gap-4 pt-3 xl:pt-0 border-t xl:border-t-0 xl:border-l border-slate-200 dark:border-slate-800 xl:pl-4">
          <form onSubmit={handleCustomSubmit} className="flex gap-1.5">
            <input
              type="text"
              placeholder="Search pair (e.g. NEAR)..."
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              className="px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:border-amber-400 w-44 placeholder:text-slate-400"
            />
            <button
              type="submit"
              className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black rounded-xl transition"
            >
              Load
            </button>
          </form>

          {/* Live Price Pill with Blink Feedback */}
          <div className="flex items-center gap-3 font-mono">
            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${tickerData.priceTick === "up" ? "bg-emerald-400 animate-ping" : tickerData.priceTick === "down" ? "bg-rose-400 animate-ping" : "bg-emerald-400"}`} />
                <span>Spot Price</span>
              </div>
              <div
                key={`ticker-p-${tickerData.tickKey}`}
                className={`text-base font-black transition-colors ${
                  tickerData.priceTick === "up"
                    ? "text-emerald-500 flash-up"
                    : tickerData.priceTick === "down"
                    ? "text-rose-500 flash-down"
                    : "text-slate-900 dark:text-white"
                }`}
              >
                ${formatPrice(tickerData.price)}
              </div>
            </div>

            <div>
              <div className="text-[10px] text-slate-400 uppercase font-bold">24h Change</div>
              <div className={`text-xs font-black ${tickerData.change24h >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                {tickerData.change24h >= 0 ? "+" : ""}{tickerData.change24h.toFixed(2)}%
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* 2. TERMINAL VIEW MODE SWITCHER */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 px-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase font-mono">Terminal Layout:</span>
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setViewMode("suite")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === "suite"
                  ? "bg-amber-400 text-slate-950 font-black shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Full Integrated Suite</span>
            </button>
            <button
              onClick={() => setViewMode("chart")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === "chart"
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>TradingView Chart Only</span>
            </button>
            <button
              onClick={() => setViewMode("analysis")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                viewMode === "analysis"
                  ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <Gauge className="w-3.5 h-3.5" />
              <span>TA Gauge &amp; Mathematical Pivots</span>
            </button>
          </div>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <span>24h High: <strong className="text-slate-900 dark:text-white">${formatPrice(tickerData.high24h)}</strong></span>
          <span>•</span>
          <span>24h Low: <strong className="text-slate-900 dark:text-white">${formatPrice(tickerData.low24h)}</strong></span>
          <span>•</span>
          <span>24h Vol: <strong className="text-amber-500">{formatUsd(tickerData.volumeUsd)}</strong></span>
        </div>
      </div>

      {/* 3. FULL-WIDTH TRADINGVIEW ADVANCED CHART (NO AWKWARD SIDE-BY-SIDE VOID) */}
      {(viewMode === "suite" || viewMode === "chart") && (
        <div className="w-full">
          <TradingViewAdvancedChart
            symbol={selectedPair}
            defaultInterval="60"
            height={viewMode === "chart" ? 760 : 680}
            showIndicatorBar={true}
            showTimeframeBar={true}
            showStyleBar={true}
          />
        </div>
      )}

      {/* 4. FULL-WIDTH TECHNICAL ANALYSIS & PIVOT MATRIX SUITE */}
      {(viewMode === "suite" || viewMode === "analysis") && (
        <div className="w-full">
          <TechnicalAnalysisPanel
            symbol={selectedPair}
            price={tickerData.price}
            high24h={tickerData.high24h}
            low24h={tickerData.low24h}
            change24h={tickerData.change24h}
            defaultInterval="1h"
          />
        </div>
      )}

      {/* 5. INSTITUTIONAL TECHNICAL ANALYSIS & MARKET STRUCTURE MASTERCLASS */}
      <ChartTerminalDetails />

    </div>
  );
}
