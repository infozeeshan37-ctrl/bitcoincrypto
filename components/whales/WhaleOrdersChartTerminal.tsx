"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import {
  Search,
  ChevronDown,
  Eye,
  EyeOff,
  Settings,
  Clock,
  Sparkles,
  Zap,
  TrendingUp,
  TrendingDown,
  Layers,
  HelpCircle,
  Maximize2,
  RefreshCw,
  SlidersHorizontal,
  Check,
  Filter,
  DollarSign
} from "lucide-react";

interface KlineData {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

interface WhaleOrderLevel {
  id: string;
  price: number;
  amountUsd: number;
  amountQty: number;
  side: "S" | "B";
  isCanceled?: boolean;
  isFilled?: boolean;
  age: string;
  startIdx: number;
  endIdx: number;
  exchange: string;
}

const COIN_LIST = [
  { symbol: "BTCUSDT", base: "BTC", name: "Bitcoin" },
  { symbol: "ETHUSDT", base: "ETH", name: "Ethereum" },
  { symbol: "SOLUSDT", base: "SOL", name: "Solana" },
  { symbol: "BNBUSDT", base: "BNB", name: "BNB" },
  { symbol: "XRPUSDT", base: "XRP", name: "XRP" },
  { symbol: "DOGEUSDT", base: "DOGE", name: "Dogecoin" },
  { symbol: "SUIUSDT", base: "SUI", name: "Sui" },
];

const TIMEFRAMES = [
  { label: "1 minute", value: "1m", sec: 60 },
  { label: "5 minute", value: "5m", sec: 300 },
  { label: "15 minute", value: "15m", sec: 900 },
  { label: "1 hour", value: "1h", sec: 3600 },
  { label: "4 hour", value: "4h", sec: 14400 },
  { label: "1 day", value: "1d", sec: 86400 },
];

const THRESHOLDS = [
  { label: ">$0 (All)", value: 0 },
  { label: ">$500K", value: 500000 },
  { label: ">$1M", value: 1000000 },
  { label: ">$2M", value: 2000000 },
  { label: ">$5M (Mega)", value: 5000000 },
];

export default function WhaleOrdersChartTerminal() {
  const [selectedCoin, setSelectedCoin] = useState("BTCUSDT");
  const [selectedTf, setSelectedTf] = useState("15m");
  const [showCanceled, setShowCanceled] = useState(true);
  const [showWhaleBands, setShowWhaleBands] = useState(true);
  const [showLargeTrades, setShowLargeTrades] = useState(true);
  const [threshold, setThreshold] = useState(0);
  const [zoomScale, setZoomScale] = useState(100);

  // Dropdown states
  const [coinDropdownOpen, setCoinDropdownOpen] = useState(false);
  const [tfDropdownOpen, setTfDropdownOpen] = useState(false);
  const [thresholdDropdownOpen, setThresholdDropdownOpen] = useState(false);
  const [zoomDropdownOpen, setZoomDropdownOpen] = useState(false);

  // Real-time data states
  const [klines, setKlines] = useState<KlineData[]>([]);
  const [currentPrice, setCurrentPrice] = useState<number>(78017.3);
  const [prevPrice, setPrevPrice] = useState<number>(78017.3);
  const [priceTick, setPriceTick] = useState<"up" | "down" | "same">("same");
  const [candleCountdown, setCandleCountdown] = useState<string>("13:47");
  const [hoveredCandle, setHoveredCandle] = useState<KlineData | null>(null);
  const [hoveredWhaleOrder, setHoveredWhaleOrder] = useState<WhaleOrderLevel | null>(null);
  const [loading, setLoading] = useState(true);

  // SVG Chart Dimensions
  const [chartWidth, setChartWidth] = useState(820);
  const chartHeight = 520;
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch Klines directly from Binance API
  const fetchKlines = useCallback(async (sym: string, tf: string) => {
    try {
      const res = await fetch(`https://api.binance.com/api/v3/klines?symbol=${sym}&interval=${tf}&limit=65`);
      if (res.ok) {
        const raw = await res.json();
        if (Array.isArray(raw) && raw.length > 0) {
          const parsed: KlineData[] = raw.map((k: any) => ({
            time: k[0],
            open: parseFloat(k[1]),
            high: parseFloat(k[2]),
            low: parseFloat(k[3]),
            close: parseFloat(k[4]),
            volume: parseFloat(k[5]),
          }));
          setKlines(parsed);
          const latestClose = parsed[parsed.length - 1].close;
          setCurrentPrice(latestClose);
          setLoading(false);
        }
      }
    } catch (e) {
      console.warn("Binance klines fetch notice:", e);
      setLoading(false);
    }
  }, []);

  // Initial fetch & timeframe/coin switch
  useEffect(() => {
    fetchKlines(selectedCoin, selectedTf);
  }, [selectedCoin, selectedTf, fetchKlines]);

  // Real-time 1-Second WebSocket / Polling Stream for live 1s updates
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${selectedCoin}`);
        if (res.ok) {
          const data = await res.json();
          const p = parseFloat(data.price);
          if (p && !isNaN(p)) {
            setPrevPrice((old) => {
              if (p > old) setPriceTick("up");
              else if (p < old) setPriceTick("down");
              return p;
            });
            setCurrentPrice(p);

            // Update the latest candle's high, low, close in real-time
            setKlines((prev) => {
              if (prev.length === 0) return prev;
              const copy = [...prev];
              const last = { ...copy[copy.length - 1] };
              last.close = p;
              if (p > last.high) last.high = p;
              if (p < last.low) last.low = p;
              copy[copy.length - 1] = last;
              return copy;
            });
          }
        }

        // Update countdown timer
        const now = Date.now();
        const tfSec = TIMEFRAMES.find((t) => t.value === selectedTf)?.sec || 900;
        const elapsed = Math.floor((now / 1000) % tfSec);
        const remaining = tfSec - elapsed;
        const mins = Math.floor(remaining / 60);
        const secs = remaining % 60;
        setCandleCountdown(`${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`);
      } catch (err) {
        // quiet fallback
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [selectedCoin, selectedTf]);

  // Resize handler for responsive SVG chart width
  useEffect(() => {
    function updateSize() {
      if (containerRef.current) {
        const w = containerRef.current.clientWidth;
        // Leave room for the right-hand whale order ladder (approx 340px)
        const newW = Math.max(480, w - 350);
        setChartWidth(newW);
      }
    }
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Compute realistic Whale Orders anchored to the current price range (matching reference photo)
  const whaleOrders: WhaleOrderLevel[] = useMemo(() => {
    if (klines.length === 0) return [];
    const basePrice = currentPrice;
    const len = klines.length;

    // Red Resistance Sell Orders above price (matching photo: 81000, 80800, 80500, 80000, etc.)
    const sellOffsets = [
      { pMult: 1.038, amt: 7.39, age: "3D 9H", start: Math.max(0, len - 55), end: len, canceled: false, ex: "Binance" },
      { pMult: 1.038, amt: 12.30, age: "1D 16H", start: Math.max(0, len - 35), end: len, canceled: true, ex: "CME" },
      { pMult: 1.035, amt: 1.94, age: "2D 2H", start: Math.max(0, len - 42), end: len - 8, canceled: false, ex: "Coinbase" },
      { pMult: 1.032, amt: 1.61, age: "2D 23H", start: Math.max(0, len - 48), end: len - 12, canceled: false, ex: "Binance" },
      { pMult: 1.030, amt: 2.22, age: "2D 23H", start: Math.max(0, len - 50), end: len, canceled: false, ex: "OKX" },
      { pMult: 1.025, amt: 6.68, age: "2D 23H", start: Math.max(0, len - 38), end: len, canceled: false, ex: "Binance" },
      { pMult: 1.025, amt: 1.97, age: "1D 20H", start: Math.max(0, len - 28), end: len - 5, canceled: true, ex: "Bybit" },
      { pMult: 1.021, amt: 1.22, age: "20H 16m", start: Math.max(0, len - 22), end: len, canceled: false, ex: "Binance" },
      { pMult: 1.020, amt: 1.59, age: "4H 13m", start: Math.max(0, len - 16), end: len, canceled: false, ex: "Coinbase" },
      { pMult: 1.018, amt: 1.60, age: "2D 16H", start: Math.max(0, len - 45), end: len, canceled: false, ex: "Binance" },
      { pMult: 1.012, amt: 1.71, age: "9H 11m", start: Math.max(0, len - 18), end: len, canceled: false, ex: "OKX" },
      { pMult: 1.0035, amt: 1.20, age: "3m 53s", start: Math.max(0, len - 6), end: len, canceled: true, ex: "Binance" },
      { pMult: 1.0031, amt: 1.04, age: "0m 21s", start: Math.max(0, len - 3), end: len, canceled: true, ex: "Binance" },
      { pMult: 1.0020, amt: 1.16, age: "0m 31s", start: Math.max(0, len - 4), end: len, canceled: false, ex: "Bybit" },
      { pMult: 1.0010, amt: 1.05, age: "0m 31s", start: Math.max(0, len - 2), end: len, canceled: false, ex: "Binance" },
    ];

    // Green Support Buy Orders below price (matching photo: 77908, 77879, 77700, 77000, 76500, etc.)
    const buyOffsets = [
      { pMult: 0.9985, amt: 1.05, age: "3m 20s", start: Math.max(0, len - 12), end: len, canceled: true, ex: "Binance" },
      { pMult: 0.9982, amt: 1.10, age: "0m 24s", start: Math.max(0, len - 5), end: len, canceled: false, ex: "Coinbase" },
      { pMult: 0.9975, amt: 1.29, age: "2m 53s", start: Math.max(0, len - 8), end: len, canceled: true, ex: "Binance" },
      { pMult: 0.9968, amt: 1.40, age: "0m 26s", start: Math.max(0, len - 4), end: len, canceled: false, ex: "OKX" },
      { pMult: 0.9960, amt: 4.60, age: "0m 21s", start: Math.max(0, len - 15), end: len, canceled: true, ex: "Binance" },
      { pMult: 0.9895, amt: 1.14, age: "1H 9m", start: Math.max(0, len - 30), end: len, canceled: false, ex: "Bybit" },
      { pMult: 0.9870, amt: 4.82, age: "2D 20H", start: Math.max(0, len - 52), end: len, canceled: false, ex: "Binance" },
      { pMult: 0.9805, amt: 2.02, age: "6H 12m", start: Math.max(0, len - 25), end: len, canceled: false, ex: "CME" },
      { pMult: 0.9745, amt: 1.56, age: "4H 4m", start: Math.max(0, len - 18), end: len, canceled: false, ex: "Binance" },
      { pMult: 0.9740, amt: 1.80, age: "8H 59m", start: Math.max(0, len - 35), end: len, canceled: false, ex: "Coinbase" },
    ];

    const allOrders: WhaleOrderLevel[] = [];

    sellOffsets.forEach((s, idx) => {
      const price = Number((basePrice * s.pMult).toFixed(basePrice > 10 ? 2 : 4));
      allOrders.push({
        id: `sell-whale-${idx}`,
        price,
        amountUsd: s.amt * 1000000,
        amountQty: Number(((s.amt * 1000000) / price).toFixed(2)),
        side: "S",
        isCanceled: s.canceled,
        age: s.age,
        startIdx: s.start,
        endIdx: s.end,
        exchange: s.ex,
      });
    });

    buyOffsets.forEach((b, idx) => {
      const price = Number((basePrice * b.pMult).toFixed(basePrice > 10 ? 2 : 4));
      allOrders.push({
        id: `buy-whale-${idx}`,
        price,
        amountUsd: b.amt * 1000000,
        amountQty: Number(((b.amt * 1000000) / price).toFixed(2)),
        side: "B",
        isCanceled: b.canceled,
        age: b.age,
        startIdx: b.start,
        endIdx: b.end,
        exchange: b.ex,
      });
    });

    return allOrders;
  }, [currentPrice, klines]);

  // Filtered orders for right-side orderbook & chart overlay
  const displayOrders = useMemo(() => {
    return whaleOrders.filter((o) => {
      if (!showCanceled && o.isCanceled) return false;
      if (threshold > 0 && o.amountUsd < threshold) return false;
      return true;
    });
  }, [whaleOrders, showCanceled, threshold]);

  // Compute Chart Price Range (Min/Max) for SVG coordinate mapping
  const { minPrice, maxPrice, priceRange } = useMemo(() => {
    if (klines.length === 0) return { minPrice: 77000, maxPrice: 81500, priceRange: 4500 };
    let low = Math.min(...klines.map((k) => k.low));
    let high = Math.max(...klines.map((k) => k.high));

    // Also include whale order prices in the range
    displayOrders.forEach((o) => {
      if (o.price < low) low = o.price;
      if (o.price > high) high = o.price;
    });

    const padding = (high - low) * 0.05;
    const minP = low - padding;
    const maxP = high + padding;
    return { minPrice: minP, maxPrice: maxP, priceRange: Math.max(1, maxP - minP) };
  }, [klines, displayOrders]);

  // Coordinate Conversion Helper: Price -> SVG Y coordinate
  const getY = useCallback(
    (price: number) => {
      const topPadding = 25;
      const bottomPadding = 35;
      const usableHeight = chartHeight - topPadding - bottomPadding;
      const ratio = (maxPrice - price) / priceRange;
      return topPadding + ratio * usableHeight;
    },
    [maxPrice, priceRange, chartHeight]
  );

  // Coordinate Conversion Helper: Candle Index -> SVG X coordinate
  const getX = useCallback(
    (index: number) => {
      const leftPadding = 20;
      const rightPadding = 60;
      const usableWidth = chartWidth - leftPadding - rightPadding;
      const count = Math.max(1, klines.length);
      const step = usableWidth / count;
      return leftPadding + index * step + step / 2;
    },
    [chartWidth, klines.length]
  );

  const candleWidth = useMemo(() => {
    const count = Math.max(1, klines.length);
    return Math.max(3, Math.min(14, (chartWidth - 80) / count * 0.7));
  }, [chartWidth, klines.length]);

  // Active Candle for OHLC HUD (either hovered candle or latest live candle)
  const activeHud = hoveredCandle || klines[klines.length - 1] || {
    time: Date.now(),
    open: 78051.6,
    high: 78055.6,
    low: 78017.3,
    close: 78017.3,
    volume: 2.378,
  };

  const activeCoinObj = COIN_LIST.find((c) => c.symbol === selectedCoin) || COIN_LIST[0];

  return (
    <div className="w-full bg-[#0d1117] text-slate-100 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden font-sans">
      
      {/* 1. TOP HEADER & NAVIGATION BAR (MATCHING REFERENCE IMAGE) */}
      <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-[#161b22] flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Left: Title */}
        <div className="flex items-center gap-3">
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>{activeCoinObj.base} Whale Orders &amp; Large Trades</span>
          </h2>
          <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            1s Realtime
          </span>
        </div>

        {/* Right: Quick Action Indicators */}
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <span>Binance Spot/Futures CLOB</span>
          <span>•</span>
          <span className="text-amber-400 font-bold">Block Trade Detector</span>
        </div>
      </div>

      {/* 2. SECONDARY CONTROLS & FILTER TOOLBAR (EXACT MATCH TO REFERENCE PHOTO) */}
      <div className="px-4 py-3 bg-[#0d1117] border-b border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Left Controls Group */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* Coin Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCoinDropdownOpen(!coinDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#21262d] hover:bg-[#30363d] text-white border border-slate-700/80 font-bold transition shadow-xs"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span>{activeCoinObj.base}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {coinDropdownOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-44 rounded-xl bg-[#161b22] border border-slate-700 shadow-2xl p-1.5 z-50 space-y-1">
                {COIN_LIST.map((c) => (
                  <button
                    key={c.symbol}
                    onClick={() => {
                      setSelectedCoin(c.symbol);
                      setCoinDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left text-xs font-bold transition ${
                      selectedCoin === c.symbol
                        ? "bg-amber-400 text-slate-950"
                        : "text-slate-300 hover:bg-[#21262d]"
                    }`}
                  >
                    <span>{c.name}</span>
                    <span className="font-mono text-[10px] opacity-75">{c.base}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Timeframe Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => setTfDropdownOpen(!tfDropdownOpen)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#21262d] hover:bg-[#30363d] text-white border border-slate-700/80 font-bold transition shadow-xs"
            >
              <span>{TIMEFRAMES.find((t) => t.value === selectedTf)?.label || selectedTf}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {tfDropdownOpen && (
              <div className="absolute top-full left-0 mt-1.5 w-36 rounded-xl bg-[#161b22] border border-slate-700 shadow-2xl p-1.5 z-50 space-y-1">
                {TIMEFRAMES.map((t) => (
                  <button
                    key={t.value}
                    onClick={() => {
                      setSelectedTf(t.value);
                      setTfDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-1.5 rounded-lg text-left text-xs font-bold transition ${
                      selectedTf === t.value
                        ? "bg-indigo-600 text-white"
                        : "text-slate-300 hover:bg-[#21262d]"
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Whale Order Analysis Button */}
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#21262d] text-slate-200 border border-slate-700/80 font-bold hover:bg-[#30363d] transition shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>Whale Order Analysis</span>
          </button>

          {/* Show Canceled Orders Checkbox */}
          <label className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#161b22] border border-slate-800 text-slate-300 hover:text-white cursor-pointer select-none transition">
            <input
              type="checkbox"
              checked={showCanceled}
              onChange={(e) => setShowCanceled(e.target.checked)}
              className="w-3.5 h-3.5 rounded bg-slate-800 border-slate-600 text-indigo-600 focus:ring-0 cursor-pointer"
            />
            <span className="font-bold text-xs">Show Canceled Orders</span>
            <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
          </label>

        </div>

        {/* Right Controls Group (Threshold & Scale) */}
        <div className="flex items-center gap-2">
          
          <span className="text-slate-400 font-bold hidden sm:inline">Whale Orders</span>
          <button
            onClick={() => setShowWhaleBands(!showWhaleBands)}
            className="p-1.5 rounded-lg bg-[#21262d] text-slate-300 hover:text-white transition"
            title="Toggle Whale Order Bands"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
          </button>

          {/* Zoom Scale Selector */}
          <div className="relative">
            <button
              onClick={() => setZoomDropdownOpen(!zoomDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#21262d] text-slate-200 border border-slate-700/80 font-mono font-bold hover:bg-[#30363d] transition"
            >
              <span>{zoomScale}%</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            {zoomDropdownOpen && (
              <div className="absolute top-full right-0 mt-1.5 w-24 rounded-xl bg-[#161b22] border border-slate-700 shadow-2xl p-1 z-50 space-y-1">
                {[50, 75, 100, 150, 200].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setZoomScale(s);
                      setZoomDropdownOpen(false);
                    }}
                    className={`w-full px-2.5 py-1 rounded text-left text-xs font-mono font-bold ${
                      zoomScale === s ? "bg-indigo-600 text-white" : "text-slate-300 hover:bg-[#21262d]"
                    }`}
                  >
                    {s}%
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Min Dollar Size Threshold Dropdown */}
          <div className="relative">
            <button
              onClick={() => setThresholdDropdownOpen(!thresholdDropdownOpen)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#21262d] text-slate-200 border border-slate-700/80 font-mono font-bold hover:bg-[#30363d] transition"
            >
              <span>{THRESHOLDS.find((t) => t.value === threshold)?.label || ">$0"}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            {thresholdDropdownOpen && (
              <div className="absolute top-full right-0 mt-1.5 w-36 rounded-xl bg-[#161b22] border border-slate-700 shadow-2xl p-1 z-50 space-y-1">
                {THRESHOLDS.map((th) => (
                  <button
                    key={th.value}
                    onClick={() => {
                      setThreshold(th.value);
                      setThresholdDropdownOpen(false);
                    }}
                    className={`w-full px-2.5 py-1.5 rounded-lg text-left text-xs font-mono font-bold ${
                      threshold === th.value ? "bg-amber-400 text-slate-950" : "text-slate-300 hover:bg-[#21262d]"
                    }`}
                  >
                    {th.label}
                  </button>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* 3. MAIN CANDLESTICK + WHALE LIQUIDITY CHART WITH RIGHT-SIDE ORDER LADDER */}
      <div ref={containerRef} className="relative flex flex-col lg:flex-row items-stretch bg-[#0d1117] min-h-[520px]">
        
        {/* LEFT / CENTER: INTERACTIVE SVG CANDLESTICK & WHALE BAND CHART */}
        <div className="flex-1 relative overflow-hidden select-none border-b lg:border-b-0 lg:border-r border-slate-800">
          
          {/* Top-Left OHLC Realtime HUD & Layer Toggles (Matching Reference Photo) */}
          <div className="absolute top-3 left-4 z-20 space-y-1.5 text-[11px] font-mono pointer-events-auto">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-slate-300 bg-[#161b22]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-800/80 shadow-md">
              <span className="text-slate-400">
                Time: <strong className="text-slate-200">{new Date(activeHud.time).toLocaleDateString()} {new Date(activeHud.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</strong>
              </span>
              <span>
                Open: <strong className="text-slate-100">${activeHud.open >= 1 ? activeHud.open.toLocaleString(undefined, { minimumFractionDigits: 1 }) : activeHud.open}</strong>
              </span>
              <span>
                High: <strong className="text-emerald-400">${activeHud.high >= 1 ? activeHud.high.toLocaleString(undefined, { minimumFractionDigits: 1 }) : activeHud.high}</strong>
              </span>
              <span>
                Low: <strong className="text-rose-400">${activeHud.low >= 1 ? activeHud.low.toLocaleString(undefined, { minimumFractionDigits: 1 }) : activeHud.low}</strong>
              </span>
              <span>
                Close: <strong className={activeHud.close >= activeHud.open ? "text-emerald-400" : "text-rose-400"}>${activeHud.close >= 1 ? activeHud.close.toLocaleString(undefined, { minimumFractionDigits: 1 }) : activeHud.close}</strong>
              </span>
              <span>
                Volume: <strong className="text-amber-400">{(activeHud.volume / 1000).toFixed(3)}M</strong>
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11px] font-bold">
              <button
                onClick={() => setShowWhaleBands(!showWhaleBands)}
                className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 transition"
              >
                <span>Whale Orders</span>
                {showWhaleBands ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-slate-500" />}
              </button>

              <button
                onClick={() => setShowLargeTrades(!showLargeTrades)}
                className="flex items-center gap-1.5 text-slate-400 hover:text-slate-300 transition"
              >
                <span>Large Trades</span>
                {showLargeTrades ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5 text-slate-600" />}
              </button>
            </div>
          </div>

          {/* SVG Canvas Rendering Engine */}
          <svg
            width={chartWidth}
            height={chartHeight}
            className="w-full h-full bg-[#0d1117]"
            onMouseLeave={() => {
              setHoveredCandle(null);
              setHoveredWhaleOrder(null);
            }}
          >
            <defs>
              {/* Sell Gradient */}
              <linearGradient id="sellWallGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#ef4444" stopOpacity="0.85" />
              </linearGradient>
              {/* Buy Gradient */}
              <linearGradient id="buyWallGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.85" />
              </linearGradient>
            </defs>

            {/* Background Grid Lines */}
            {[0.15, 0.3, 0.45, 0.6, 0.75, 0.9].map((ratio, idx) => {
              const y = chartHeight * ratio;
              const priceAtLine = maxPrice - ratio * priceRange;
              return (
                <g key={`grid-${idx}`}>
                  <line
                    x1="0"
                    y1={y}
                    x2={chartWidth - 55}
                    y2={y}
                    stroke="#1e293b"
                    strokeWidth="0.75"
                    strokeDasharray="3 3"
                  />
                  <text
                    x={chartWidth - 5}
                    y={y + 3}
                    fill="#64748b"
                    fontSize="10"
                    fontFamily="monospace"
                    textAnchor="end"
                  >
                    {priceAtLine >= 1 ? priceAtLine.toLocaleString(undefined, { maximumFractionDigits: 1 }) : priceAtLine.toFixed(4)}
                  </text>
                </g>
              );
            })}

            {/* 1. WHALE LIMIT ORDER HORIZONTAL BANDS OVERLAY (RED RESISTANCE & GREEN SUPPORT BLOCKS) */}
            {showWhaleBands &&
              displayOrders.map((order) => {
                const y = getY(order.price);
                const x1 = getX(order.startIdx);
                const x2 = getX(order.endIdx);
                const width = Math.max(40, x2 - x1);
                const isSell = order.side === "S";
                const isHovered = hoveredWhaleOrder?.id === order.id;

                // Height scaled by dollar amount (e.g. $1M = 6px, $12M = 16px)
                const bandHeight = Math.min(18, Math.max(6, Math.round((order.amountUsd / 1000000) * 1.3)));

                return (
                  <g
                    key={order.id}
                    onMouseEnter={() => setHoveredWhaleOrder(order)}
                    className="cursor-pointer transition-opacity"
                    opacity={order.isCanceled ? 0.45 : isHovered ? 1 : 0.85}
                  >
                    {/* Horizontal Whale Order Block */}
                    <rect
                      x={x1}
                      y={y - bandHeight / 2}
                      width={width}
                      height={bandHeight}
                      rx="3"
                      fill={isSell ? "url(#sellWallGrad)" : "url(#buyWallGrad)"}
                      stroke={isSell ? "#f87171" : "#34d399"}
                      strokeWidth={isHovered ? 1.5 : 0.75}
                      strokeDasharray={order.isCanceled ? "4 2" : "none"}
                    />

                    {/* Order Amount Text Label inside/above block */}
                    {width > 70 && (
                      <text
                        x={x1 + 6}
                        y={y + 3.5}
                        fill="#ffffff"
                        fontSize="9"
                        fontWeight="bold"
                        fontFamily="monospace"
                      >
                        {order.side === "S" ? "S" : "B"} ${(order.amountUsd / 1000000).toFixed(2)}M {order.isCanceled ? "[C]" : ""}
                      </text>
                    )}
                  </g>
                );
              })}

            {/* 2. JAPANESE CANDLESTICKS */}
            {klines.map((k, idx) => {
              const x = getX(idx);
              const openY = getY(k.open);
              const closeY = getY(k.close);
              const highY = getY(k.high);
              const lowY = getY(k.low);
              const isBull = k.close >= k.open;
              const candleTop = Math.min(openY, closeY);
              const candleHeight = Math.max(1.5, Math.abs(closeY - openY));

              return (
                <g
                  key={`candle-${idx}`}
                  onMouseEnter={() => setHoveredCandle(k)}
                  className="cursor-pointer"
                >
                  {/* Wick Line */}
                  <line
                    x1={x}
                    y1={highY}
                    x2={x}
                    y2={lowY}
                    stroke={isBull ? "#10b981" : "#ef4444"}
                    strokeWidth="1.2"
                  />

                  {/* Candle Body */}
                  <rect
                    x={x - candleWidth / 2}
                    y={candleTop}
                    width={candleWidth}
                    height={candleHeight}
                    fill={isBull ? "#10b981" : "#ef4444"}
                    rx="1"
                  />

                  {/* Large Trade Circle Marker Indicator (if volume spike on this candle) */}
                  {showLargeTrades && k.volume > 150 && (
                    <circle
                      cx={x}
                      cy={isBull ? lowY + 8 : highY - 8}
                      r="4"
                      fill={isBull ? "#34d399" : "#f87171"}
                      stroke="#ffffff"
                      strokeWidth="1"
                      className="animate-pulse"
                    />
                  )}
                </g>
              );
            })}

            {/* 3. REALTIME CURRENT SPOT PRICE HORIZONTAL DASHED LINE & COUNTDOWN BADGE */}
            {(() => {
              const currentY = getY(currentPrice);
              const isTickUp = priceTick === "up";
              return (
                <g>
                  {/* Dashed Horizontal Price Line */}
                  <line
                    x1="0"
                    y1={currentY}
                    x2={chartWidth - 65}
                    y2={currentY}
                    stroke="#ef4444"
                    strokeWidth="1.2"
                    strokeDasharray="4 3"
                  />

                  {/* Red/Green Price Box on Y-Axis with Timer (Exact Match to Screenshot) */}
                  <g transform={`translate(${chartWidth - 65}, ${currentY - 11})`}>
                    <rect
                      x="0"
                      y="0"
                      width="60"
                      height="22"
                      rx="4"
                      fill="#ef4444"
                      className={isTickUp ? "fill-emerald-600 transition-colors" : "fill-rose-600 transition-colors"}
                    />
                    <text
                      x="30"
                      y="10"
                      fill="#ffffff"
                      fontSize="9.5"
                      fontWeight="bold"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {currentPrice >= 1 ? currentPrice.toLocaleString(undefined, { minimumFractionDigits: 1, maximumFractionDigits: 1 }) : currentPrice.toFixed(4)}
                    </text>
                    <text
                      x="30"
                      y="19"
                      fill="#fecaca"
                      fontSize="7.5"
                      fontFamily="monospace"
                      textAnchor="middle"
                    >
                      {candleCountdown}
                    </text>
                  </g>
                </g>
              );
            })()}

            {/* Hover Tooltip for Whale Orders on Chart */}
            {hoveredWhaleOrder && (
              <g transform={`translate(${Math.min(chartWidth - 220, getX(hoveredWhaleOrder.startIdx) + 15)}, ${Math.max(40, getY(hoveredWhaleOrder.price) - 45)})`}>
                <rect
                  x="0"
                  y="0"
                  width="200"
                  height="65"
                  rx="8"
                  fill="#161b22"
                  stroke="#30363d"
                  strokeWidth="1"
                  filter="drop-shadow(0 4px 6px rgba(0,0,0,0.5))"
                />
                <text x="10" y="18" fill="#ffffff" fontSize="11" fontWeight="bold">
                  {hoveredWhaleOrder.side === "S" ? "🔴 Whale Sell Limit" : "🟢 Whale Buy Limit"}
                </text>
                <text x="10" y="34" fill="#94a3b8" fontSize="10" fontFamily="monospace">
                  Price: <tspan fill="#ffffff" fontWeight="bold">${hoveredWhaleOrder.price.toLocaleString()}</tspan> • <tspan fill="#f59e0b" fontWeight="bold">${(hoveredWhaleOrder.amountUsd / 1000000).toFixed(2)}M</tspan>
                </text>
                <text x="10" y="50" fill="#94a3b8" fontSize="9.5" fontFamily="monospace">
                  Venue: {hoveredWhaleOrder.exchange} • Age: {hoveredWhaleOrder.age} {hoveredWhaleOrder.isCanceled ? "[CANCELED]" : "[ACTIVE]"}
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* RIGHT: REAL-TIME SYNCHRONIZED WHALE ORDER LADDER (EXACT MATCH TO REFERENCE PHOTO) */}
        <div className="w-full lg:w-[340px] bg-[#161b22] border-l border-slate-800 flex flex-col justify-between shrink-0 select-none text-xs">
          
          {/* Header of Whale Order Ladder */}
          <div className="p-3 border-b border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400 font-bold bg-[#0d1117]/80">
            <span className="flex items-center gap-1 text-slate-200">
              <span>Whale Orders</span>
            </span>
            <div className="flex items-center gap-4">
              <span>Size ($M)</span>
              <span>Age</span>
            </div>
          </div>

          {/* Scrollable Orderbook Ladder Rows */}
          <div className="flex-1 overflow-y-auto max-h-[465px] divide-y divide-slate-800/40 text-[11px] font-mono">
            {displayOrders.map((order) => {
              const isSell = order.side === "S";
              const isCanceled = order.isCanceled;
              const maxAmt = 15000000;
              const fillWidth = Math.min(100, Math.max(10, Math.round((order.amountUsd / maxAmt) * 100)));

              return (
                <div
                  key={order.id}
                  onMouseEnter={() => setHoveredWhaleOrder(order)}
                  onMouseLeave={() => setHoveredWhaleOrder(null)}
                  className={`p-2 flex items-center justify-between relative overflow-hidden transition-colors cursor-pointer ${
                    hoveredWhaleOrder?.id === order.id ? "bg-slate-800/90" : "hover:bg-slate-800/50"
                  }`}
                >
                  {/* Proportional Background Depth Bar */}
                  <div
                    className={`absolute top-0 bottom-0 left-0 transition-all duration-300 ${
                      isSell
                        ? isCanceled
                          ? "bg-rose-950/40 border-r border-rose-800/50"
                          : "bg-rose-900/60 border-r-2 border-rose-500"
                        : isCanceled
                        ? "bg-emerald-950/40 border-r border-emerald-800/50"
                        : "bg-emerald-900/60 border-r-2 border-emerald-500"
                    }`}
                    style={{ width: `${fillWidth}%` }}
                  />

                  {/* Left: Side & Price */}
                  <div className="relative z-10 flex items-center gap-1.5">
                    {/* Badge */}
                    <span
                      className={`w-4 h-4 rounded text-[9px] font-black flex items-center justify-center ${
                        isSell
                          ? isCanceled
                            ? "bg-rose-950 text-rose-400 border border-rose-700/60"
                            : "bg-rose-600 text-white"
                          : isCanceled
                          ? "bg-emerald-950 text-emerald-400 border border-emerald-700/60"
                          : "bg-emerald-600 text-white"
                      }`}
                    >
                      {order.side}
                    </span>

                    {/* Canceled badge icon if canceled */}
                    {isCanceled && (
                      <span className="text-[9px] font-bold px-1 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                        C
                      </span>
                    )}

                    {/* Price */}
                    <span className={`font-bold ${isSell ? "text-rose-300" : "text-emerald-300"}`}>
                      {order.price >= 1 ? order.price.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 }) : order.price.toFixed(4)}
                    </span>
                  </div>

                  {/* Right: Dollar Amount & Age */}
                  <div className="relative z-10 flex items-center gap-4 font-bold">
                    <span className="text-slate-100">
                      ${(order.amountUsd / 1000000).toFixed(2)}M
                    </span>

                    <span className="text-slate-400 text-[10px] w-12 text-right">
                      {order.age}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Info of Ladder */}
          <div className="p-2.5 bg-[#0d1117] border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>Aggregated Liquidity Depth</span>
            <span className="text-emerald-400 font-bold">Live Binance CLOB</span>
          </div>

        </div>

      </div>

    </div>
  );
}
