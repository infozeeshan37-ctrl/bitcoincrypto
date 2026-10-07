"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import {
  Zap,
  Activity,
  Filter,
  DollarSign,
  Clock,
  ExternalLink,
  Sparkles,
  Info,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { WhaleOrder } from "@/app/api/whale-orders/route";

interface WhaleScatterBubbleMapProps {
  symbol: string;
  base: string;
  currentPrice: number;
  whaleOrders: WhaleOrder[];
}

export default function WhaleScatterBubbleMap({
  symbol,
  base,
  currentPrice,
  whaleOrders,
}: WhaleScatterBubbleMapProps) {
  const [minThreshold, setMinThreshold] = useState<number>(100000);
  const [selectedSide, setSelectedSide] = useState<"ALL" | "BUY" | "SELL">("ALL");
  const [hoveredOrder, setHoveredOrder] = useState<WhaleOrder | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<WhaleOrder | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(720);
  const chartHeight = 280;

  useEffect(() => {
    function handleResize() {
      if (containerRef.current) {
        setChartWidth(containerRef.current.clientWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredOrders = useMemo(() => {
    return whaleOrders.filter((o) => {
      const matchMin = o.usdValue >= minThreshold;
      const matchSide = selectedSide === "ALL" || o.side === selectedSide;
      return matchMin && matchSide;
    });
  }, [whaleOrders, minThreshold, selectedSide]);

  // Scaler math
  const { minPrice, maxPrice, priceRange, minTime, maxTime, timeRange } = useMemo(() => {
    if (filteredOrders.length === 0) {
      const p = currentPrice || 80000;
      return {
        minPrice: p * 0.98,
        maxPrice: p * 1.02,
        priceRange: p * 0.04,
        minTime: Date.now() - 3600000,
        maxTime: Date.now(),
        timeRange: 3600000,
      };
    }

    const prices = filteredOrders.map((o) => o.price);
    const times = filteredOrders.map((o) => o.timestamp);

    let lowP = Math.min(...prices, currentPrice);
    let highP = Math.max(...prices, currentPrice);
    const padP = (highP - lowP) * 0.12 || currentPrice * 0.01;

    let lowT = Math.min(...times);
    let highT = Math.max(...times);
    if (highT - lowT < 60000) lowT = highT - 3600000; // at least 1h window

    return {
      minPrice: lowP - padP,
      maxPrice: highP + padP,
      priceRange: Math.max(1, highP + padP - (lowP - padP)),
      minTime: lowT,
      maxTime: highT,
      timeRange: Math.max(60000, highT - lowT),
    };
  }, [filteredOrders, currentPrice]);

  const leftPad = 20;
  const rightPad = 70;
  const topPad = 25;
  const botPad = 35;
  const usableW = Math.max(200, chartWidth - leftPad - rightPad);
  const usableH = Math.max(120, chartHeight - topPad - botPad);

  const getX = (t: number) => {
    const ratio = (t - minTime) / timeRange;
    return leftPad + ratio * usableW;
  };

  const getY = (p: number) => {
    const ratio = (maxPrice - p) / priceRange;
    return topPad + ratio * usableH;
  };

  const getRadius = (usd: number) => {
    if (usd >= 5000000) return 16;
    if (usd >= 2000000) return 12;
    if (usd >= 1000000) return 9;
    if (usd >= 500000) return 6.5;
    return 4.5;
  };

  const formatUsd = (n: number) => {
    if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
    if (n >= 1e3) return `$${(n / 1e3).toFixed(1)}K`;
    return `$${n.toLocaleString()}`;
  };

  const currentY = getY(currentPrice);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <span>Whale Block Trade Spectrogram (Bubble Scatter Map)</span>
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Visual distribution of institutional orders. Bubble radius represents order USD capital.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto">
          {/* Min Size filter */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl text-xs font-mono font-bold">
            {[100000, 500000, 1000000, 5000000].map((thr) => (
              <button
                key={thr}
                onClick={() => setMinThreshold(thr)}
                className={`px-2.5 py-1 rounded-lg transition ${
                  minThreshold === thr
                    ? "bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black shadow-xs"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
                }`}
              >
                {thr >= 1e6 ? `$${thr / 1e6}M+` : `$${thr / 1e3}K+`}
              </button>
            ))}
          </div>

          {/* Side filter */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl text-xs font-bold">
            {(["ALL", "BUY", "SELL"] as const).map((side) => (
              <button
                key={side}
                onClick={() => setSelectedSide(side)}
                className={`px-2.5 py-1 rounded-lg transition ${
                  selectedSide === side
                    ? side === "BUY"
                      ? "bg-emerald-500 text-white font-black"
                      : side === "SELL"
                      ? "bg-rose-500 text-white font-black"
                      : "bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black"
                    : "text-slate-600 dark:text-slate-400"
                }`}
              >
                {side === "ALL" ? "All" : side === "BUY" ? "🟢 Buy" : "🔴 Sell"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Spectrogram Canvas */}
      <div ref={containerRef} className="relative w-full h-[280px] bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden select-none">
        <svg width={chartWidth} height={chartHeight} className="w-full h-full">
          {/* Horizontal Price Grid Lines */}
          {[0.2, 0.4, 0.6, 0.8].map((ratio, idx) => {
            const y = topPad + ratio * usableH;
            const p = maxPrice - ratio * priceRange;
            return (
              <g key={`grid-p-${idx}`}>
                <line
                  x1={leftPad}
                  y1={y}
                  x2={chartWidth - rightPad}
                  y2={y}
                  stroke="#1e293b"
                  strokeWidth="0.75"
                  strokeDasharray="3 3"
                />
                <text
                  x={chartWidth - 5}
                  y={y + 3}
                  fill="#64748b"
                  fontSize="9.5"
                  fontFamily="monospace"
                  textAnchor="end"
                >
                  ${p >= 1 ? p.toLocaleString(undefined, { maximumFractionDigits: 1 }) : p.toFixed(4)}
                </text>
              </g>
            );
          })}

          {/* Current Benchmark Price Line */}
          <line
            x1={leftPad}
            y1={currentY}
            x2={chartWidth - rightPad}
            y2={currentY}
            stroke="#f59e0b"
            strokeWidth="1.2"
            strokeDasharray="4 3"
          />
          <g transform={`translate(${chartWidth - rightPad + 5}, ${currentY - 8})`}>
            <rect x="0" y="0" width="60" height="16" rx="3" fill="#f59e0b" />
            <text x="30" y="11" fill="#020617" fontSize="8.5" fontWeight="bold" fontFamily="monospace" textAnchor="middle">
              ${currentPrice >= 1 ? currentPrice.toLocaleString(undefined, { maximumFractionDigits: 1 }) : currentPrice.toFixed(4)}
            </text>
          </g>

          {/* Time axis ticks */}
          {[0.1, 0.35, 0.65, 0.9].map((ratio, idx) => {
            const x = leftPad + ratio * usableW;
            const t = minTime + ratio * timeRange;
            const tStr = new Date(t).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
            return (
              <text key={`time-tick-${idx}`} x={x} y={chartHeight - 12} fill="#64748b" fontSize="9" fontFamily="monospace" textAnchor="middle">
                {tStr}
              </text>
            );
          })}

          {/* Whale Order Bubbles */}
          {filteredOrders.map((order) => {
            const x = getX(order.timestamp);
            const y = getY(order.price);
            const r = getRadius(order.usdValue);
            const isBuy = order.side === "BUY";
            const isHovered = hoveredOrder?.id === order.id;
            const isSelected = selectedOrder?.id === order.id;

            return (
              <g
                key={order.id}
                onMouseEnter={() => setHoveredOrder(order)}
                onMouseLeave={() => setHoveredOrder(null)}
                onClick={() => setSelectedOrder(order)}
                className="cursor-pointer transition-all"
              >
                {/* Glow ring for mega orders */}
                {order.usdValue >= 2000000 && (
                  <circle
                    cx={x}
                    cy={y}
                    r={r + 4}
                    fill={isBuy ? "rgba(16, 185, 129, 0.25)" : "rgba(239, 68, 68, 0.25)"}
                    className="animate-pulse"
                  />
                )}

                {/* Main Bubble */}
                <circle
                  cx={x}
                  cy={y}
                  r={r}
                  fill={isBuy ? "rgba(16, 185, 129, 0.75)" : "rgba(239, 68, 68, 0.75)"}
                  stroke={isSelected ? "#f59e0b" : isBuy ? "#34d399" : "#f87171"}
                  strokeWidth={isSelected ? 3 : isHovered ? 2 : 1}
                  opacity={isHovered || isSelected ? 1 : 0.85}
                />

                {/* Amount text for large bubbles */}
                {r >= 10 && (
                  <text
                    x={x}
                    y={y + 3}
                    fill="#ffffff"
                    fontSize="8"
                    fontWeight="bold"
                    fontFamily="monospace"
                    textAnchor="middle"
                    className="pointer-events-none select-none"
                  >
                    {formatUsd(order.usdValue).replace("$", "")}
                  </text>
                )}
              </g>
            );
          })}

          {/* Hover / Selected Order Tooltip Box */}
          {(hoveredOrder || selectedOrder) && (
            (() => {
              const active = hoveredOrder || selectedOrder!;
              const x = Math.min(chartWidth - 230, Math.max(leftPad, getX(active.timestamp) + 12));
              const y = Math.max(topPad, getY(active.price) - 55);
              const isBuy = active.side === "BUY";

              return (
                <g transform={`translate(${x}, ${y})`} className="pointer-events-none">
                  <rect
                    x="0"
                    y="0"
                    width="210"
                    height="68"
                    rx="8"
                    fill="#0f172a"
                    stroke="#334155"
                    strokeWidth="1.2"
                    filter="drop-shadow(0 4px 10px rgba(0,0,0,0.6))"
                  />
                  <text x="10" y="18" fill={isBuy ? "#34d399" : "#f87171"} fontSize="11" fontWeight="bold">
                    {isBuy ? "🟢 Whale Buy Sweep" : "🔴 Whale Sell Dump"} ({formatUsd(active.usdValue)})
                  </text>
                  <text x="10" y="34" fill="#cbd5e1" fontSize="10" fontFamily="monospace">
                    Price: <tspan fill="#ffffff" fontWeight="bold">${active.price.toLocaleString()}</tspan> • {active.quantity.toLocaleString()} {active.base}
                  </text>
                  <text x="10" y="50" fill="#94a3b8" fontSize="9.5" fontFamily="monospace">
                    Venue: <tspan fill="#f59e0b">{active.exchange}</tspan> • {active.timeFormatted}
                  </text>
                  <text x="10" y="62" fill="#64748b" fontSize="8.5" fontFamily="monospace">
                    Algo: {active.orderType}
                  </text>
                </g>
              );
            })()
          )}
        </svg>
      </div>

      {/* Legend & Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono pt-1">
        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Whale Buys</span>
            <strong className="text-emerald-500 font-black">
              {filteredOrders.filter((o) => o.side === "BUY").length} Block Orders
            </strong>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-rose-500 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Whale Sells</span>
            <strong className="text-rose-500 font-black">
              {filteredOrders.filter((o) => o.side === "SELL").length} Block Orders
            </strong>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <div className="w-3.5 h-3.5 rounded-full bg-amber-400 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Avg Size</span>
            <strong className="text-slate-900 dark:text-white font-black">
              {filteredOrders.length > 0
                ? formatUsd(
                    Math.round(
                      filteredOrders.reduce((acc, o) => acc + o.usdValue, 0) / filteredOrders.length
                    )
                  )
                : "$0"}
            </strong>
          </div>
        </div>

        <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <div>
            <span className="text-[10px] text-slate-400 block uppercase">Mega Blocks</span>
            <strong className="text-indigo-400 font-black">
              {filteredOrders.filter((o) => o.usdValue >= 2000000).length} (&gt;$2M)
            </strong>
          </div>
        </div>
      </div>
    </div>
  );
}
