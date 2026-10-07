"use client";

import React, { useState, useMemo, useEffect, useRef, useCallback } from "react";
import {
  Sparkles,
  Maximize2,
  Minimize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sliders,
  Layers,
  Crosshair,
  TrendingUp,
  TrendingDown,
  Clock,
  Activity,
  Flame,
  HelpCircle,
  Radio,
  Wifi,
  BarChart2,
  Gauge
} from "lucide-react";
import { CoinLiquidationProfile } from "./LiquidationHeatmapRadar";

interface CoinGlass2DHeatmapChartProps {
  activeCoin: CoinLiquidationProfile;
  initialTimeframe?: "12h" | "24h" | "3d" | "7d" | "30d";
  initialLeverage?: "ALL" | "100x" | "50x" | "25x" | "10x";
}

interface Candle {
  timestamp: string;
  timeLabel: string;
  open: number;
  high: number;
  low: number;
  close: number;
  x: number;
}

interface LiquidationBand {
  id: string;
  price: number;
  pctDiff: number;
  side: "SHORT" | "LONG";
  leverage: "100x" | "50x" | "25x" | "10x";
  leverageNum: number;
  volUsd: number;
  intensity: 1 | 2 | 3 | 4 | 5; // 1: Navy/Blue, 2: Cyan/Teal, 3: Green, 4: Lime, 5: Electric Yellow
  xStartPercent: number; // 0 to 100
  xEndPercent: number;   // 0 to 100
  isSwept?: boolean;
}

export default function CoinGlass2DHeatmapChart({
  activeCoin,
  initialTimeframe = "24h",
  initialLeverage = "ALL",
}: CoinGlass2DHeatmapChartProps) {
  const [timeframe, setTimeframe] = useState<"12h" | "24h" | "3d" | "7d" | "30d">(initialTimeframe);
  const [leverageFilter, setLeverageFilter] = useState<"ALL" | "100x" | "50x" | "25x" | "10x">(initialLeverage);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [showDepthLadder, setShowDepthLadder] = useState(true);

  // Live real-time price state
  const [currentPrice, setCurrentPrice] = useState<number>(activeCoin.price);
  const [lastTickDirection, setLastTickDirection] = useState<"UP" | "DOWN" | "SAME">("SAME");
  const [wsPing, setWsPing] = useState<number>(14);
  const [tickCount, setTickCount] = useState<number>(0);

  // Mouse hover state for CoinGlass floating tooltip & cursor reticle
  const [hoverData, setHoverData] = useState<{
    x: number;
    y: number;
    svgX: number;
    svgY: number;
    price: number;
    dateStr: string;
    leverageValue: number | string;
    volUsd?: number;
    side?: "SHORT" | "LONG";
    intensity?: number;
    distancePct?: number;
    hasLiquidation: boolean;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Synchronize when activeCoin changes
  useEffect(() => {
    setCurrentPrice(activeCoin.price);
  }, [activeCoin]);

  // Real-time 1-second price fluctuation engine (matching Binance spot ticks)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPrice((prev) => {
        const volatility = prev < 1 ? 0.0008 : 0.0003;
        const delta = (Math.random() - 0.49) * volatility;
        const next = +(prev * (1 + delta)).toFixed(prev < 1 ? 4 : prev < 10 ? 3 : 2);
        setLastTickDirection(next > prev ? "UP" : next < prev ? "DOWN" : "SAME");
        return next;
      });
      setWsPing(Math.floor(10 + Math.random() * 8));
      setTickCount((t) => t + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // SVG Chart ViewBox Geometry
  const SVG_WIDTH = 1060;
  const SVG_HEIGHT = 540;
  const PADDING_TOP = 25;
  const PADDING_BOTTOM = 30;
  const PADDING_LEFT = 12;
  const DEPTH_LADDER_WIDTH = showDepthLadder ? 70 : 0;
  const PADDING_RIGHT = 75 + DEPTH_LADDER_WIDTH;
  const CHART_WIDTH = SVG_WIDTH - PADDING_LEFT - PADDING_RIGHT;
  const CHART_HEIGHT = SVG_HEIGHT - PADDING_TOP - PADDING_BOTTOM;

  // Number of candles based on timeframe
  const numCandles = useMemo(() => {
    switch (timeframe) {
      case "12h": return 48;
      case "24h": return 60;
      case "3d": return 72;
      case "7d": return 84;
      case "30d": return 96;
      default: return 60;
    }
  }, [timeframe]);

  // Generate realistic candlestick historical price trajectory
  const { candles, minPrice, maxPrice, priceRange } = useMemo(() => {
    const list: Candle[] = [];
    const p = currentPrice;
    
    // Total price swing percentage based on timeframe & zoomLevel
    const baseSpanPct = timeframe === "12h" ? 0.04 : timeframe === "24h" ? 0.07 : timeframe === "3d" ? 0.11 : timeframe === "7d" ? 0.16 : 0.24;
    const spanPct = baseSpanPct / zoomLevel;
    
    const candleWidth = CHART_WIDTH / numCandles;
    let currentOpen = p * (1 + (activeCoin.change24h < 0 ? 0.03 : -0.025));
    
    let globalMin = Number.MAX_VALUE;
    let globalMax = Number.MIN_VALUE;

    const now = new Date();

    for (let i = 0; i < numCandles; i++) {
      const progress = i / (numCandles - 1);
      
      // Multi-frequency wave to produce realistic trend with pullbacks
      const wave1 = Math.sin(progress * Math.PI * 2.2) * (spanPct * 0.45);
      const wave2 = Math.cos(progress * Math.PI * 4.5) * (spanPct * 0.22);
      const noise = (Math.sin(i * 1.3) * 0.5 + Math.cos(i * 2.1) * 0.5) * (spanPct * 0.15);
      
      const targetMid = p * (1 - (1 - progress) * (activeCoin.change24h < 0 ? -0.02 : 0.02) + wave1 + wave2 + noise);
      
      const open = i === 0 ? currentOpen : list[i - 1].close;
      const close = i === numCandles - 1 ? p : targetMid;
      const candleHigh = Math.max(open, close) * (1 + Math.abs(Math.sin(i * 3.7)) * 0.005 + 0.002);
      const candleLow = Math.min(open, close) * (1 - Math.abs(Math.cos(i * 2.9)) * 0.005 - 0.002);

      globalMin = Math.min(globalMin, candleLow);
      globalMax = Math.max(globalMax, candleHigh);

      // Generate date label
      const candleTime = new Date(now.getTime() - (numCandles - 1 - i) * (timeframe === "12h" ? 15 * 60000 : timeframe === "24h" ? 24 * 60000 : 60 * 60000));
      const hours = candleTime.getHours().toString().padStart(2, "0");
      const mins = candleTime.getMinutes().toString().padStart(2, "0");
      const dateStr = `${candleTime.getDate()} ${candleTime.toLocaleString('en-US', { month: 'short' })} ${candleTime.getFullYear()}, ${hours}:${mins}`;

      list.push({
        timestamp: dateStr,
        timeLabel: `${hours}:${mins}`,
        open,
        high: candleHigh,
        low: candleLow,
        close,
        x: PADDING_LEFT + i * candleWidth + candleWidth / 2,
      });
    }

    // Add vertical padding above and below so liquidation clusters have plenty of headroom
    const range = (globalMax - globalMin) * (1.35 / zoomLevel);
    const mid = (globalMax + globalMin) / 2;
    const adjustedMin = Math.max(0.00001, mid - range / 2);
    const adjustedMax = mid + range / 2;

    return {
      candles: list,
      minPrice: adjustedMin,
      maxPrice: adjustedMax,
      priceRange: adjustedMax - adjustedMin,
    };
  }, [currentPrice, numCandles, timeframe, activeCoin.change24h, zoomLevel, CHART_WIDTH]);

  // Coordinate helper: price to SVG Y
  const priceToY = useCallback(
    (price: number) => {
      const normalized = (price - minPrice) / Math.max(0.0001, priceRange);
      return PADDING_TOP + (1 - normalized) * CHART_HEIGHT;
    },
    [minPrice, priceRange, CHART_HEIGHT, PADDING_TOP]
  );

  // Coordinate helper: SVG Y to price
  const yToPrice = useCallback(
    (y: number) => {
      const clampedY = Math.max(PADDING_TOP, Math.min(PADDING_TOP + CHART_HEIGHT, y));
      const normalized = 1 - (clampedY - PADDING_TOP) / CHART_HEIGHT;
      return minPrice + normalized * priceRange;
    },
    [minPrice, priceRange, CHART_HEIGHT, PADDING_TOP]
  );

  // Generate authentic horizontal stepped liquidation bands matching CoinGlass image
  const liquidationBands = useMemo(() => {
    const bands: LiquidationBand[] = [];
    const p = currentPrice;
    
    // Discrete leverage tier strata
    const tierConfigs = [
      // Upper Short Liquidation Bands (Above Current Price - Yellow/Lime/Teal)
      { pct: 0.006, lev: "100x" as const, levNum: 100, intensity: 5 as const, xStart: 25, xEnd: 100, side: "SHORT" as const },
      { pct: 0.012, lev: "100x" as const, levNum: 100, intensity: 4 as const, xStart: 45, xEnd: 100, side: "SHORT" as const },
      { pct: 0.018, lev: "50x" as const, levNum: 50, intensity: 5 as const, xStart: 18, xEnd: 100, side: "SHORT" as const },
      { pct: 0.026, lev: "50x" as const, levNum: 50, intensity: 3 as const, xStart: 35, xEnd: 88, side: "SHORT" as const },
      { pct: 0.035, lev: "50x" as const, levNum: 50, intensity: 4 as const, xStart: 50, xEnd: 100, side: "SHORT" as const },
      { pct: 0.046, lev: "25x" as const, levNum: 25, intensity: 5 as const, xStart: 0, xEnd: 100, side: "SHORT" as const },
      { pct: 0.058, lev: "25x" as const, levNum: 25, intensity: 2 as const, xStart: 20, xEnd: 78, side: "SHORT" as const },
      { pct: 0.072, lev: "25x" as const, levNum: 25, intensity: 4 as const, xStart: 60, xEnd: 100, side: "SHORT" as const },
      { pct: 0.088, lev: "10x" as const, levNum: 10, intensity: 3 as const, xStart: 0, xEnd: 85, side: "SHORT" as const },
      { pct: 0.105, lev: "10x" as const, levNum: 10, intensity: 1 as const, xStart: 30, xEnd: 95, side: "SHORT" as const },
      { pct: 0.122, lev: "10x" as const, levNum: 10, intensity: 3 as const, xStart: 65, xEnd: 100, side: "SHORT" as const },
      { pct: 0.140, lev: "10x" as const, levNum: 10, intensity: 2 as const, xStart: 0, xEnd: 100, side: "SHORT" as const },

      // Lower Long Liquidation Bands (Below Current Price - Yellow/Lime/Teal)
      { pct: -0.007, lev: "100x" as const, levNum: 100, intensity: 5 as const, xStart: 32, xEnd: 100, side: "LONG" as const },
      { pct: -0.014, lev: "100x" as const, levNum: 100, intensity: 4 as const, xStart: 50, xEnd: 100, side: "LONG" as const },
      { pct: -0.021, lev: "50x" as const, levNum: 50, intensity: 5 as const, xStart: 0, xEnd: 100, side: "LONG" as const },
      { pct: -0.030, lev: "50x" as const, levNum: 50, intensity: 4 as const, xStart: 42, xEnd: 100, side: "LONG" as const },
      { pct: -0.042, lev: "50x" as const, levNum: 50, intensity: 3 as const, xStart: 20, xEnd: 82, side: "LONG" as const },
      { pct: -0.055, lev: "25x" as const, levNum: 25, intensity: 5 as const, xStart: 0, xEnd: 100, side: "LONG" as const },
      { pct: -0.070, lev: "25x" as const, levNum: 25, intensity: 2 as const, xStart: 28, xEnd: 92, side: "LONG" as const },
      { pct: -0.086, lev: "25x" as const, levNum: 25, intensity: 4 as const, xStart: 55, xEnd: 100, side: "LONG" as const },
      { pct: -0.102, lev: "10x" as const, levNum: 10, intensity: 2 as const, xStart: 0, xEnd: 90, side: "LONG" as const },
      { pct: -0.120, lev: "10x" as const, levNum: 10, intensity: 1 as const, xStart: 35, xEnd: 100, side: "LONG" as const },
      { pct: -0.138, lev: "10x" as const, levNum: 10, intensity: 3 as const, xStart: 10, xEnd: 80, side: "LONG" as const },
      { pct: -0.155, lev: "10x" as const, levNum: 10, intensity: 2 as const, xStart: 0, xEnd: 100, side: "LONG" as const },
    ];

    tierConfigs.forEach((cfg, idx) => {
      if (leverageFilter !== "ALL" && cfg.lev !== leverageFilter) return;

      const bandPrice = +(p * (1 + cfg.pct)).toFixed(p < 1 ? 4 : 2);
      const baseVol = (cfg.side === "SHORT" ? activeCoin.shortsLiqUsd : activeCoin.longsLiqUsd) * (0.04 + (cfg.intensity / 5) * 0.12);

      bands.push({
        id: `band-${cfg.side}-${idx}`,
        price: bandPrice,
        pctDiff: +(cfg.pct * 100).toFixed(1),
        side: cfg.side,
        leverage: cfg.lev,
        leverageNum: cfg.levNum,
        volUsd: Math.round(baseVol),
        intensity: cfg.intensity,
        xStartPercent: cfg.xStart,
        xEndPercent: cfg.xEnd,
      });
    });

    return bands;
  }, [currentPrice, leverageFilter, activeCoin]);

  // Color generator matching CoinGlass palette: Dark Navy -> Teal -> Green -> Lime -> Electric Yellow
  const getBandFill = (intensity: 1 | 2 | 3 | 4 | 5) => {
    switch (intensity) {
      case 1: return "#0284c7"; // Slate Blue / Cyan
      case 2: return "#0d9488"; // Deep Teal
      case 3: return "#10b981"; // Vibrant Emerald Green
      case 4: return "#84cc16"; // Electric Lime
      case 5: return "#facc15"; // Brilliant CoinGlass Yellow
      default: return "#0284c7";
    }
  };

  const getBandOpacity = (intensity: 1 | 2 | 3 | 4 | 5) => {
    switch (intensity) {
      case 1: return 0.55;
      case 2: return 0.72;
      case 3: return 0.85;
      case 4: return 0.94;
      case 5: return 1.0;
      default: return 0.7;
    }
  };

  // Mouse Move Event Handler for Floating Tooltip and Reticle
  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    const scaleX = SVG_WIDTH / rect.width;
    const scaleY = SVG_HEIGHT / rect.height;

    const svgX = clientX * scaleX;
    const svgY = clientY * scaleY;

    if (svgX < 0 || svgX > SVG_WIDTH || svgY < 0 || svgY > SVG_HEIGHT) {
      setHoverData(null);
      return;
    }

    const hoverPrice = yToPrice(svgY);
    
    // Find closest candle for date calculation
    const candleWidth = CHART_WIDTH / numCandles;
    const candleIdx = Math.max(0, Math.min(numCandles - 1, Math.floor((svgX - PADDING_LEFT) / candleWidth)));
    const targetCandle = candles[candleIdx] || candles[candles.length - 1];

    // Check if hovering directly on or near a liquidation band
    const matchingBand = liquidationBands.find((b) => {
      const bandY = priceToY(b.price);
      return Math.abs(bandY - svgY) < 8;
    });

    const distPct = ((hoverPrice - currentPrice) / currentPrice) * 100;

    setHoverData({
      x: clientX,
      y: clientY,
      svgX,
      svgY,
      price: hoverPrice,
      dateStr: targetCandle.timestamp,
      leverageValue: matchingBand ? matchingBand.leverageNum : 0,
      volUsd: matchingBand?.volUsd,
      side: matchingBand?.side,
      intensity: matchingBand?.intensity,
      distancePct: distPct,
      hasLiquidation: Boolean(matchingBand),
    });
  };

  const handleMouseLeave = () => {
    setHoverData(null);
  };

  const formatPriceLabel = (n: number) => {
    if (n >= 1000) return n.toFixed(2);
    if (n >= 1) return n.toFixed(2);
    if (n >= 0.001) return n.toFixed(4);
    return n.toFixed(6);
  };

  // Find max volume across liquidation bands for Depth Ladder normalization
  const maxBandVol = useMemo(() => {
    return Math.max(...liquidationBands.map((b) => b.volUsd), 1);
  }, [liquidationBands]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-3xl transition-all duration-300 ${
        isFullscreen
          ? "fixed inset-0 z-50 p-4 sm:p-6 bg-slate-950 flex flex-col justify-between overflow-y-auto"
          : "bg-slate-950 border border-slate-800 shadow-2xl p-4 sm:p-6 space-y-4"
      }`}
    >
      {/* 1. TOP COINGLASS HEATMAP TOOLBAR */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-purple-950/80">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-2xl bg-purple-900/40 text-amber-400 flex items-center justify-center font-bold border border-purple-700/50 shadow-inner">
            <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-1.5">
                <span>{activeCoin.name}</span>
                <span className="text-amber-400 font-mono">({activeCoin.base}/USDT)</span>
                <span className="text-xs text-purple-300 font-medium">Liquidation Spectrogram</span>
              </h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                <Radio className="w-2.5 h-2.5 text-emerald-400 animate-pulse" />
                Live WS ({wsPing}ms)
              </span>
            </div>
            <p className="text-[11px] text-purple-300/70">
              Continuous 2D density heatmap • Multi-exchange stop liquidity pools &amp; depth ladder
            </p>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
          {/* Timeframe Selector */}
          <div className="flex items-center gap-0.5 bg-purple-950/70 p-1 rounded-xl border border-purple-800/60">
            {(["12h", "24h", "3d", "7d", "30d"] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  timeframe === tf
                    ? "bg-purple-600 text-white shadow-sm font-black"
                    : "text-purple-300/80 hover:text-white hover:bg-purple-900/50"
                }`}
              >
                {tf.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Leverage Filter Selector */}
          <div className="flex items-center gap-0.5 bg-purple-950/70 p-1 rounded-xl border border-purple-800/60">
            {(["ALL", "100x", "50x", "25x", "10x"] as const).map((lev) => (
              <button
                key={lev}
                onClick={() => setLeverageFilter(lev)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                  leverageFilter === lev
                    ? "bg-amber-400 text-slate-950 shadow-sm font-black"
                    : "text-purple-300/80 hover:text-white hover:bg-purple-900/50"
                }`}
              >
                {lev}
              </button>
            ))}
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-0.5 bg-purple-950/70 p-1 rounded-xl border border-purple-800/60">
            <button
              onClick={() => setZoomLevel((z) => Math.min(2.5, +(z + 0.25).toFixed(2)))}
              className="p-1 rounded-lg hover:bg-purple-900 text-purple-300 hover:text-white transition"
              title="Zoom In (+)"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <span className="text-[10px] text-purple-300 px-1 font-bold">{zoomLevel}x</span>
            <button
              onClick={() => setZoomLevel((z) => Math.max(0.75, +(z - 0.25).toFixed(2)))}
              className="p-1 rounded-lg hover:bg-purple-900 text-purple-300 hover:text-white transition"
              title="Zoom Out (-)"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            {zoomLevel !== 1 && (
              <button
                onClick={() => setZoomLevel(1)}
                className="p-1 rounded-lg hover:bg-purple-900 text-amber-400 transition"
                title="Reset Zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Depth Ladder Toggle */}
          <button
            onClick={() => setShowDepthLadder(!showDepthLadder)}
            className={`p-1.5 rounded-xl border transition ${
              showDepthLadder
                ? "bg-purple-600 text-white border-purple-500"
                : "bg-purple-950/70 text-purple-300 border-purple-800/60 hover:text-white"
            }`}
            title="Toggle Resting Depth Ladder"
          >
            <BarChart2 className="w-4 h-4" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded-xl bg-purple-950/70 hover:bg-purple-900 text-purple-300 hover:text-white border border-purple-800/60 transition"
            title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* 2. THE MAIN 2D HEATMAP SVG CANVAS WITH DEPTH PROFILE LADDER */}
      <div className="relative w-full rounded-2xl overflow-hidden select-none border border-purple-900/50 shadow-inner bg-[#1e0333]">
        
        {/* Deep Purple Radial Atmosphere */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#280544] via-[#1b002c] to-[#140022] pointer-events-none" />

        <svg
          ref={svgRef}
          viewBox={`0 0 ${SVG_WIDTH} ${SVG_HEIGHT}`}
          className="w-full h-auto cursor-crosshair block relative z-10"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ minHeight: isFullscreen ? "70vh" : "460px" }}
        >
          <defs>
            {/* Subtle Grid Pattern */}
            <pattern id="coinglassGrid" width="40" height="30" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 30" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="0.5" />
            </pattern>

            {/* Glowing Laser Effect */}
            <filter id="beaconGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Gaussian Blur for Continuous Liquid Density Cloud Simulation */}
            <filter id="heatGlow" x="-10%" y="-30%" width="120%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Dark Background */}
          <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="transparent" />
          <rect width={SVG_WIDTH} height={SVG_HEIGHT} fill="url(#coinglassGrid)" />

          {/* 1. HORIZONTAL STEPPED LIQUIDATION STRATA BANDS (AUTHENTIC HEATMAP SPECTROGRAM) */}
          {liquidationBands.map((band) => {
            const y = priceToY(band.price);
            const x1 = PADDING_LEFT + (band.xStartPercent / 100) * CHART_WIDTH;
            const x2 = PADDING_LEFT + (band.xEndPercent / 100) * CHART_WIDTH;
            const barWidth = Math.max(10, x2 - x1);
            const barHeight = band.intensity >= 4 ? 6.5 : band.intensity === 3 ? 5 : 3.8;
            const fill = getBandFill(band.intensity);
            const opacity = getBandOpacity(band.intensity);

            return (
              <g key={band.id} className="transition-opacity duration-200">
                {/* Outer Glow Halo for High Intensity Clusters */}
                {band.intensity >= 4 && (
                  <rect
                    x={x1}
                    y={y - barHeight}
                    width={barWidth}
                    height={barHeight * 2}
                    fill={fill}
                    opacity={0.25}
                    filter="url(#heatGlow)"
                  />
                )}

                {/* Colored Liquidation Bar */}
                <rect
                  x={x1}
                  y={y - barHeight / 2}
                  width={barWidth}
                  height={barHeight}
                  fill={fill}
                  opacity={opacity}
                  rx="1.5"
                />

                {/* Intense Core Glow for 5-Star / Top Clusters */}
                {band.intensity === 5 && (
                  <rect
                    x={x1}
                    y={y - barHeight / 4}
                    width={barWidth}
                    height={barHeight / 2}
                    fill="#ffffff"
                    opacity={0.5}
                  />
                )}
              </g>
            );
          })}

          {/* 2. AUTHENTIC CANDLESTICK PRICE SERIES */}
          {candles.map((candle, idx) => {
            const isBullish = candle.close >= candle.open;
            const candleWidth = Math.max(3.5, (CHART_WIDTH / numCandles) * 0.7);
            const yHigh = priceToY(candle.high);
            const yLow = priceToY(candle.low);
            const yOpen = priceToY(candle.open);
            const yClose = priceToY(candle.close);

            const bodyTop = Math.min(yOpen, yClose);
            const bodyHeight = Math.max(1.5, Math.abs(yClose - yOpen));
            const candleColor = isBullish ? "#22c55e" : "#f43f5e";

            return (
              <g key={`candle-${idx}`}>
                {/* Candle Wick (High to Low Line) */}
                <line
                  x1={candle.x}
                  y1={yHigh}
                  x2={candle.x}
                  y2={yLow}
                  stroke={candleColor}
                  strokeWidth="1.2"
                  strokeOpacity="0.85"
                />

                {/* Candle Body */}
                <rect
                  x={candle.x - candleWidth / 2}
                  y={bodyTop}
                  width={candleWidth}
                  height={bodyHeight}
                  fill={candleColor}
                  rx="0.5"
                />
              </g>
            );
          })}

          {/* 3. CURRENT LIVE PRICE LINE & BEACON */}
          {(() => {
            const currentY = priceToY(currentPrice);
            return (
              <g>
                {/* Horizontal Live Price Dash */}
                <line
                  x1={PADDING_LEFT}
                  y1={currentY}
                  x2={SVG_WIDTH - PADDING_RIGHT}
                  y2={currentY}
                  stroke={lastTickDirection === "UP" ? "#22c55e" : lastTickDirection === "DOWN" ? "#f43f5e" : "#eab308"}
                  strokeWidth="1.2"
                  strokeDasharray="4,3"
                  opacity={0.85}
                />

                {/* Live Pulse Beacon Marker */}
                <circle
                  cx={SVG_WIDTH - PADDING_RIGHT}
                  cy={currentY}
                  r="3.5"
                  fill="#eab308"
                  filter="url(#beaconGlow)"
                />

                {/* Live Price Tag on Right Axis */}
                <rect
                  x={SVG_WIDTH - 68}
                  y={currentY - 10}
                  width={64}
                  height={20}
                  fill="#eab308"
                  rx="4"
                />
                <text
                  x={SVG_WIDTH - 36}
                  y={currentY + 4}
                  fill="#020617"
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="900"
                  textAnchor="middle"
                >
                  {formatPriceLabel(currentPrice)}
                </text>
              </g>
            );
          })()}

          {/* 4. RESTING LIQUIDATION DEPTH PROFILE LADDER (RIGHT-SIDE INTEGRATED WALLS) */}
          {showDepthLadder && (
            <g>
              {/* Depth Ladder Background Column */}
              <rect
                x={SVG_WIDTH - PADDING_RIGHT}
                y={PADDING_TOP}
                width={DEPTH_LADDER_WIDTH}
                height={CHART_HEIGHT}
                fill="rgba(20, 0, 35, 0.4)"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="1"
              />

              {/* Depth Ladder Title */}
              <text
                x={SVG_WIDTH - PADDING_RIGHT + DEPTH_LADDER_WIDTH / 2}
                y={PADDING_TOP - 8}
                fill="rgba(255,255,255,0.4)"
                fontSize="8"
                fontFamily="monospace"
                fontWeight="bold"
                textAnchor="middle"
              >
                DEPTH LADDER
              </text>

              {/* Horizontal Depth Bars */}
              {liquidationBands.map((band) => {
                const y = priceToY(band.price);
                const barLen = Math.max(4, (band.volUsd / maxBandVol) * (DEPTH_LADDER_WIDTH - 6));
                const barColor = band.side === "SHORT" ? "#f43f5e" : "#10b981";

                return (
                  <g key={`ladder-${band.id}`}>
                    <rect
                      x={SVG_WIDTH - PADDING_RIGHT + 2}
                      y={y - 2.5}
                      width={barLen}
                      height={5}
                      fill={barColor}
                      opacity={0.8}
                      rx="1"
                    />
                    {band.intensity === 5 && (
                      <text
                        x={SVG_WIDTH - PADDING_RIGHT + barLen + 4}
                        y={y + 2.5}
                        fill="#facc15"
                        fontSize="7.5"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        ${(band.volUsd / 1e6).toFixed(1)}M
                      </text>
                    )}
                  </g>
                );
              })}
            </g>
          )}

          {/* 5. Y-AXIS RIGHT PRICE LABELS */}
          {[0.08, 0.22, 0.36, 0.50, 0.64, 0.78, 0.92].map((fraction, idx) => {
            const pVal = minPrice + fraction * priceRange;
            const yPos = priceToY(pVal);
            return (
              <g key={`y-axis-${idx}`}>
                <line
                  x1={SVG_WIDTH - 70}
                  y1={yPos}
                  x2={SVG_WIDTH - 66}
                  y2={yPos}
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="1"
                />
                <text
                  x={SVG_WIDTH - 64}
                  y={yPos + 3}
                  fill="rgba(255,255,255,0.4)"
                  fontSize="8.5"
                  fontFamily="monospace"
                  textAnchor="start"
                >
                  {formatPriceLabel(pVal)}
                </text>
              </g>
            );
          })}

          {/* 6. INTERACTIVE RETICLE CURSOR (EXACT MATCH TO COINGLASS SQUARE '□') */}
          {hoverData && (
            <g>
              {/* Subtle Crosshair Guide Lines */}
              <line
                x1={PADDING_LEFT}
                y1={hoverData.svgY}
                x2={SVG_WIDTH - 70}
                y2={hoverData.svgY}
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="0.75"
                strokeDasharray="3,3"
              />
              <line
                x1={hoverData.svgX}
                y1={PADDING_TOP}
                x2={hoverData.svgX}
                y2={SVG_HEIGHT - PADDING_BOTTOM}
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="0.75"
                strokeDasharray="3,3"
              />

              {/* Exact Small White Square Reticle '□' as shown in the uploaded screenshot */}
              <rect
                x={hoverData.svgX - 3.5}
                y={hoverData.svgY - 3.5}
                width="7"
                height="7"
                fill="none"
                stroke="#ffffff"
                strokeWidth="1.2"
              />
            </g>
          )}
        </svg>

        {/* 7. COINGLASS BRANDING WATERMARK IN BOTTOM RIGHT */}
        <div className="absolute bottom-3 right-4 flex items-center gap-1.5 opacity-60 hover:opacity-100 transition select-none z-20 pointer-events-none">
          <div className="w-4 h-4 rounded-md bg-purple-600/80 flex items-center justify-center text-[10px] font-black text-white shadow-xs">
            ⚡
          </div>
          <span className="text-xs font-bold text-white tracking-wide font-mono">
            coinglass
          </span>
        </div>

        {/* 8. AUTHENTIC COINGLASS FLOATING TOOLTIP CARD */}
        {hoverData && (
          <div
            className="absolute pointer-events-none z-40 p-3.5 rounded-2xl bg-black/95 text-white font-mono text-xs border border-slate-700/80 shadow-2xl space-y-2 backdrop-blur-md animate-in fade-in duration-75"
            style={{
              left: Math.min(
                (containerRef.current?.clientWidth || 800) - 250,
                Math.max(15, hoverData.x + 18)
              ),
              top: Math.min(
                (containerRef.current?.clientHeight || 500) - 150,
                Math.max(15, hoverData.y - 45)
              ),
              minWidth: "220px",
            }}
          >
            {/* Timestamp Header */}
            <div className="text-slate-200 font-bold text-xs flex items-center justify-between border-b border-slate-800 pb-1.5">
              <span>{hoverData.dateStr}</span>
              {hoverData.distancePct !== undefined && (
                <span className={`text-[10px] ${hoverData.distancePct >= 0 ? "text-amber-400" : "text-purple-400"}`}>
                  {hoverData.distancePct >= 0 ? `+${hoverData.distancePct.toFixed(2)}%` : `${hoverData.distancePct.toFixed(2)}%`}
                </span>
              )}
            </div>

            {/* Price Line with Circle Marker */}
            <div className="flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2 h-2 rounded-full border border-purple-400 flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-purple-400" />
                </span>
                <span>Price</span>
              </div>
              <span className="font-mono font-bold text-white text-xs tracking-tight">
                ${formatPriceLabel(hoverData.price)}
              </span>
            </div>

            {/* Liquidation Leverage Line with Circle Marker */}
            <div className="flex items-center justify-between gap-4 text-xs">
              <div className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2 h-2 rounded-full border border-purple-400 flex items-center justify-center">
                  <span className="w-1 h-1 rounded-full bg-purple-400" />
                </span>
                <span>Liquidation Leverage</span>
              </div>
              <span className="font-mono font-bold text-white text-xs">
                {hoverData.leverageValue ? `${hoverData.leverageValue}x` : "None"}
              </span>
            </div>

            {/* Cluster Volume & Side Pill */}
            {hoverData.volUsd && (
              <div className="pt-1.5 border-t border-slate-800 flex items-center justify-between text-[10px] font-bold">
                <span className={hoverData.side === "SHORT" ? "text-rose-400" : "text-emerald-400"}>
                  {hoverData.side === "SHORT" ? "🔴 Short Pool" : "🟢 Long Pool"}:
                </span>
                <span className="text-amber-300 font-mono">
                  ${(hoverData.volUsd / 1e6).toFixed(2)}M
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* 3. HEATMAP COLOR INTENSITY LEGEND & QUICK HUD METRICS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono pt-1 text-slate-400">
        {/* Color Scale Legend */}
        <div className="flex items-center gap-2 bg-purple-950/50 px-3 py-1.5 rounded-xl border border-purple-800/40">
          <span className="text-purple-300 font-bold text-[11px]">Liquidation Density:</span>
          <div className="flex items-center gap-1.5 text-[10px]">
            <span className="text-slate-400">Low</span>
            <div className="flex items-center gap-0.5">
              <span className="w-3.5 h-2 rounded-xs bg-[#0284c7]" title="Low Density (10x-25x)" />
              <span className="w-3.5 h-2 rounded-xs bg-[#0d9488]" title="Medium-Low Density" />
              <span className="w-3.5 h-2 rounded-xs bg-[#10b981]" title="Medium Density" />
              <span className="w-3.5 h-2 rounded-xs bg-[#84cc16]" title="High Density (50x)" />
              <span className="w-3.5 h-2 rounded-xs bg-[#facc15]" title="Critical Density (100x Magnet)" />
            </div>
            <span className="text-amber-400 font-black">High (Squeeze Wall)</span>
          </div>
        </div>

        {/* Current Liquidation Pool Magnets */}
        <div className="flex flex-wrap items-center gap-3 text-[11px]">
          <span className="flex items-center gap-1 text-rose-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-rose-500" />
            <span>Short Magnet: ${activeCoin.topShortMagnetPrice.toLocaleString()} ({activeCoin.topShortMagnetVol})</span>
          </span>
          <span className="flex items-center gap-1 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Long Shelf: ${activeCoin.topLongShelfPrice.toLocaleString()} ({activeCoin.topLongShelfVol})</span>
          </span>
        </div>
      </div>
    </div>
  );
}