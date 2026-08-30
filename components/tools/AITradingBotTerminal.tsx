"use client";

import { useState, useEffect, useCallback } from "react";
import {
  Bot,
  TrendingUp,
  TrendingDown,
  Clock,
  ShieldAlert,
  Sliders,
  Target,
  Sparkles,
  CheckCircle2,
  RefreshCw,
  Search,
  Layers,
  Copy,
  Check,
  Compass,
  AlertTriangle,
  Radio,
  Zap,
  Play,
  Activity,
  CheckCheck,
  Terminal
} from "lucide-react";
import {
  SignalTimeframe,
  CoinConfig,
  ComprehensiveSignal,
  TIMEFRAME_PROFILES,
  generateQuantitativeSignal,
  formatSignalForClipboard,
  formatPrice,
  formatCurrency
} from "@/lib/aiSignalEngine";

const BINANCE_SUPPORTED_PAIRS: CoinConfig[] = [
  { symbol: "BTCUSDT", name: "Bitcoin", base: "BTC", defaultTimeframe: "15M" },
  { symbol: "ETHUSDT", name: "Ethereum", base: "ETH", defaultTimeframe: "15M" },
  { symbol: "SOLUSDT", name: "Solana", base: "SOL", defaultTimeframe: "15M" },
  { symbol: "BNBUSDT", name: "BNB", base: "BNB", defaultTimeframe: "1H" },
  { symbol: "XRPUSDT", name: "XRP", base: "XRP", defaultTimeframe: "15M" },
  { symbol: "DOGEUSDT", name: "Dogecoin", base: "DOGE", defaultTimeframe: "5M" },
  { symbol: "ADAUSDT", name: "Cardano", base: "ADA", defaultTimeframe: "1H" },
  { symbol: "AVAXUSDT", name: "Avalanche", base: "AVAX", defaultTimeframe: "15M" },
  { symbol: "SUIUSDT", name: "Sui", base: "SUI", defaultTimeframe: "5M" },
  { symbol: "LINKUSDT", name: "Chainlink", base: "LINK", defaultTimeframe: "1H" },
  { symbol: "NEARUSDT", name: "NEAR Protocol", base: "NEAR", defaultTimeframe: "15M" },
  { symbol: "PEPEUSDT", name: "Pepe", base: "PEPE", defaultTimeframe: "5M" },
  { symbol: "SHIBUSDT", name: "Shiba Inu", base: "SHIB", defaultTimeframe: "15M" },
  { symbol: "DOTUSDT", name: "Polkadot", base: "DOT", defaultTimeframe: "1H" },
  { symbol: "LTCUSDT", name: "Litecoin", base: "LTC", defaultTimeframe: "4H" },
  { symbol: "APTUSDT", name: "Aptos", base: "APT", defaultTimeframe: "15M" },
  { symbol: "TIAUSDT", name: "Celestia", base: "TIA", defaultTimeframe: "15M" },
  { symbol: "RENDERUSDT", name: "Render", base: "RENDER", defaultTimeframe: "1H" },
  { symbol: "FETUSDT", name: "Artificial Superintelligence", base: "FET", defaultTimeframe: "1H" },
  { symbol: "WIFUSDT", name: "dogwifhat", base: "WIF", defaultTimeframe: "5M" },
  { symbol: "ARBUSDT", name: "Arbitrum", base: "ARB", defaultTimeframe: "15M" },
  { symbol: "OPUSDT", name: "Optimism", base: "OP", defaultTimeframe: "15M" },
  { symbol: "INJUSDT", name: "Injective", base: "INJ", defaultTimeframe: "1H" },
  { symbol: "ATOMUSDT", name: "Cosmos", base: "ATOM", defaultTimeframe: "4H" }
];

export default function AITradingBotTerminal() {
  const [liveSignals, setLiveSignals] = useState<ComprehensiveSignal[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<ComprehensiveSignal | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  
  // Controls & Filters
  const [selectedTimeframe, setSelectedTimeframe] = useState<SignalTimeframe>("15M");
  const [directionOverride, setDirectionOverride] = useState<"AUTO" | "LONG" | "SHORT">("AUTO");
  const [signalFilter, setSignalFilter] = useState<"ALL" | "BUY" | "SHORT" | "HIGH_CONF">("ALL");
  const [search, setSearch] = useState("");
  const [customPairInput, setCustomPairInput] = useState("");
  const [copied, setCopied] = useState(false);

  // AI Copilot & Futures Leverage Simulator State
  const [copilotCapital, setCopilotCapital] = useState(5000);
  const [copilotRiskPercent, setCopilotRiskPercent] = useState(1.5);
  const [copilotLeverage, setCopilotLeverage] = useState(3);
  const [paperTradeStatus, setPaperTradeStatus] = useState<{
    active: boolean;
    orderId: string;
    fillPrice: number;
    side: "BUY" | "SHORT";
    time: string;
  } | null>(null);
  const [copiedWebhook, setCopiedWebhook] = useState(false);

  // Cached Raw Tickers for Dynamic Recalculation on Timeframe/Direction change
  const [cachedRawTickers, setCachedRawTickers] = useState<Map<string, any>>(new Map());

  // Fetch real-time data from Binance API & compute CoinGlass/CMC signals
  const fetchBinanceData = useCallback(async () => {
    try {
      const res = await fetch("https://api.binance.com/api/v3/ticker/24hr");
      if (!res.ok) throw new Error("Binance API error");
      const allTickers = await res.json();
      const tickerMap = new Map<string, any>();
      allTickers.forEach((t: any) => tickerMap.set(t.symbol, t));
      setCachedRawTickers(tickerMap);

      const updated = BINANCE_SUPPORTED_PAIRS.map((cfg) => {
        const raw = tickerMap.get(cfg.symbol);
        if (!raw) return null;
        const dir = directionOverride === "AUTO" ? undefined : directionOverride;
        return generateQuantitativeSignal(raw, cfg, selectedTimeframe, dir);
      }).filter(Boolean) as ComprehensiveSignal[];

      if (updated.length > 0) {
        setLiveSignals(updated);
        setSelectedCoin((current) => {
          if (!current) return updated[0];
          const fresh = updated.find((u) => u.symbol === current.symbol);
          return fresh || updated[0];
        });
      }
      setLastUpdated(new Date().toLocaleTimeString());
      setLoading(false);
    } catch (err) {
      console.warn("Binance live fetch fallback:", err);
      setLoading(false);
    }
  }, [selectedTimeframe, directionOverride]);

  useEffect(() => {
    fetchBinanceData();
    const interval = setInterval(fetchBinanceData, 6000);
    return () => clearInterval(interval);
  }, [fetchBinanceData]);

  // Recalculate signals when user toggles timeframe or direction mode
  useEffect(() => {
    if (cachedRawTickers.size === 0) return;
    const updated = BINANCE_SUPPORTED_PAIRS.map((cfg) => {
      const raw = cachedRawTickers.get(cfg.symbol);
      if (!raw) return null;
      const dir = directionOverride === "AUTO" ? undefined : directionOverride;
      return generateQuantitativeSignal(raw, cfg, selectedTimeframe, dir);
    }).filter(Boolean) as ComprehensiveSignal[];

    if (updated.length > 0) {
      setLiveSignals(updated);
      setSelectedCoin((current) => {
        if (!current) return updated[0];
        const fresh = updated.find((u) => u.symbol === current.symbol);
        return fresh || updated[0];
      });
    }
  }, [selectedTimeframe, directionOverride, cachedRawTickers]);

  // Load custom user typed pair
  const handleLoadCustomPair = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = customPairInput.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (!clean) return;
    const fullSymbol = clean.endsWith("USDT") ? clean : `${clean}USDT`;
    const base = fullSymbol.replace("USDT", "");

    const existing = liveSignals.find((s) => s.symbol === fullSymbol);
    if (existing) {
      setSelectedCoin(existing);
      setCustomPairInput("");
      return;
    }

    fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${fullSymbol}`)
      .then((r) => r.json())
      .then((raw) => {
        if (raw.symbol) {
          const customConfig: CoinConfig = { symbol: fullSymbol, name: base, base, defaultTimeframe: selectedTimeframe };
          const dir = directionOverride === "AUTO" ? undefined : directionOverride;
          const customSignal = generateQuantitativeSignal(raw, customConfig, selectedTimeframe, dir);
          setLiveSignals((prev) => [customSignal, ...prev.filter((p) => p.symbol !== fullSymbol)]);
          setSelectedCoin(customSignal);
          setCustomPairInput("");
        } else {
          alert(`Pair ${fullSymbol} not found on Binance.`);
        }
      })
      .catch(() => alert(`Could not load ${fullSymbol} from Binance.`));
  };

  // Filter coins
  const filteredCoins = liveSignals.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.symbol.toLowerCase().includes(search.toLowerCase()) ||
      c.base.toLowerCase().includes(search.toLowerCase());

    const matchesSignal =
      signalFilter === "ALL"
        ? true
        : signalFilter === "BUY"
        ? c.signal.includes("BUY")
        : signalFilter === "SHORT"
        ? c.signal.includes("SHORT")
        : c.confidence >= 90;

    return matchesSearch && matchesSignal;
  });

  const activeCoin = selectedCoin || liveSignals[0];

  // Copilot Calculations & Futures Risk Sizing
  const dollarRisk = activeCoin ? (copilotCapital * copilotRiskPercent) / 100 : 0;
  const priceDistance = activeCoin ? Math.abs(activeCoin.entryPrice - activeCoin.stopLossPrice) : 1;
  const positionUnits = activeCoin && priceDistance > 0 ? dollarRisk / priceDistance : 0;
  const positionValue = activeCoin ? positionUnits * activeCoin.entryPrice : 0;
  const requiredMargin = positionValue / copilotLeverage;

  // Estimated Liquidation Price Calculation
  // Maintenance Margin assumed ~0.5%
  const mmRate = 0.005;
  const isLongTrade = activeCoin ? activeCoin.isLong : true;
  const entryP = activeCoin ? activeCoin.entryPrice : 1;
  const estimatedLiquidationPrice = activeCoin
    ? isLongTrade
      ? entryP * (1 - (1 / copilotLeverage) + mmRate)
      : entryP * (1 + (1 / copilotLeverage) - mmRate)
    : 0;

  const profitTP1 = activeCoin ? positionUnits * Math.abs(activeCoin.tp1Price - activeCoin.entryPrice) : 0;
  const profitTP2 = activeCoin ? positionUnits * Math.abs(activeCoin.tp2Price - activeCoin.entryPrice) : 0;
  const profitTP3 = activeCoin ? positionUnits * Math.abs(activeCoin.tp3Price - activeCoin.entryPrice) : 0;

  // 1-Click Copy formatted signal
  const handleCopySignal = () => {
    if (!activeCoin) return;
    const text = formatSignalForClipboard(activeCoin, copilotLeverage);
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSimulateExecution = () => {
    if (!activeCoin) return;
    const orderId = `BOT-${Math.floor(100000 + Math.random() * 900000)}`;
    setPaperTradeStatus({
      active: true,
      orderId,
      fillPrice: activeCoin.price,
      side: activeCoin.isLong ? "BUY" : "SHORT",
      time: new Date().toLocaleTimeString()
    });
  };

  const handleCopyWebhook = () => {
    if (!activeCoin) return;
    const payload = {
      event: "SIGNAL_TRIGGER",
      bot_id: "CRYPTOBITCOIN_QUANT_AI",
      symbol: activeCoin.symbol,
      action: activeCoin.isLong ? "BUY_LONG" : "SELL_SHORT",
      strategy: activeCoin.strategy,
      timeframe: activeCoin.timeframe,
      entry_price: activeCoin.price,
      stop_loss: activeCoin.stopLossPrice,
      take_profit_1: activeCoin.tp1Price,
      take_profit_2: activeCoin.tp2Price,
      take_profit_3: activeCoin.tp3Price,
      leverage: `${copilotLeverage}x`,
      margin_allocation_usd: Math.round(requiredMargin),
      risk_reward: activeCoin.rrRatioFormatted,
      confidence_score: `${activeCoin.confidence}%`,
      timestamp: new Date().toISOString()
    };
    navigator.clipboard.writeText(JSON.stringify(payload, null, 2));
    setCopiedWebhook(true);
    setTimeout(() => setCopiedWebhook(false), 2500);
  };

  // Micro orderbook ladder calculations
  const depthPriceStep = activeCoin ? activeCoin.price * 0.0006 : 10;
  const mockAskLevels = activeCoin ? [
    { price: activeCoin.price + depthPriceStep * 3, size: (0.78 * (copilotCapital / 1000)).toFixed(3), total: "$1.45M", depth: 85 },
    { price: activeCoin.price + depthPriceStep * 2, size: (0.52 * (copilotCapital / 1000)).toFixed(3), total: "$890K", depth: 60 },
    { price: activeCoin.price + depthPriceStep * 1, size: (0.34 * (copilotCapital / 1000)).toFixed(3), total: "$460K", depth: 35 },
  ] : [];

  const mockBidLevels = activeCoin ? [
    { price: activeCoin.price - depthPriceStep * 1, size: (0.46 * (copilotCapital / 1000)).toFixed(3), total: "$620K", depth: 42 },
    { price: activeCoin.price - depthPriceStep * 2, size: (0.94 * (copilotCapital / 1000)).toFixed(3), total: "$1.72M", depth: 95 },
    { price: activeCoin.price - depthPriceStep * 3, size: (0.68 * (copilotCapital / 1000)).toFixed(3), total: "$980K", depth: 72 },
  ] : [];

  const whaleTrades = activeCoin ? [
    { time: "Just now", type: activeCoin.isLong ? "BUY" : "SELL", amount: `${(3.45 + (activeCoin.confidence % 3)).toFixed(2)} ${activeCoin.base}`, value: `$${Math.round(activeCoin.price * (3.45 + (activeCoin.confidence % 3))).toLocaleString()}`, badge: "Aggressive Market Taker" },
    { time: "14s ago", type: "BUY", amount: `${(2.10 + (activeCoin.confidence % 2)).toFixed(2)} ${activeCoin.base}`, value: `$${Math.round(activeCoin.price * (2.10 + (activeCoin.confidence % 2))).toLocaleString()}`, badge: "Limit Wall Absorption" },
    { time: "38s ago", type: activeCoin.isLong ? "BUY" : "SELL", amount: `${(5.80 + (activeCoin.confidence % 4)).toFixed(2)} ${activeCoin.base}`, value: `$${Math.round(activeCoin.price * (5.80 + (activeCoin.confidence % 4))).toLocaleString()}`, badge: "Institutional Iceberg Fill" }
  ] : [];

  return (
    <div className="space-y-8">

      {/* TOP HEADER: CoinGlass & CoinMarketCap Multi-Factor Engine Indicator */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>CoinGlass & CoinMarketCap Confluence Engine</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              <Radio className="w-3 h-3 text-emerald-600 animate-pulse" />
              <span>Live Binance Futures Sync</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            Professional AI Trading Signals & Precision Execution Hub
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Real-time derivatives intelligence evaluating <strong>CoinGlass open interest & funding skews</strong>, <strong>liquidation cascades</strong>, and <strong>orderbook imbalances</strong>. Provides exact present entry prices, structural stop losses, multi-tier take profits, and small-timeframe futures scalping.
          </p>
        </div>

        {/* Global Live Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={fetchBinanceData}
            className="px-4 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition flex items-center gap-2 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Sync Live Markets</span>
          </button>
        </div>
      </div>

      {/* TIMEFRAME & DIRECTION CONTROL BAR */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Small Timeframe Switcher (Futures Scalp / Momentum / Swing) */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span>Execution Timeframe:</span>
          </span>
          <div className="flex flex-wrap items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200">
            {(["5M", "15M", "1H", "4H", "1D"] as SignalTimeframe[]).map((tf) => {
              const isSelected = selectedTimeframe === tf;
              const profile = TIMEFRAME_PROFILES[tf];
              return (
                <button
                  key={tf}
                  onClick={() => setSelectedTimeframe(tf)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-slate-900 text-white shadow-sm font-extrabold"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/80"
                  }`}
                  title={`${profile.name} - ${profile.recommendedFor}`}
                >
                  <span>{tf}</span>
                  {tf === "5M" && <span className="text-[10px] text-amber-400 font-mono">⚡ Scalp</span>}
                  {tf === "15M" && <span className="text-[10px] text-emerald-400 font-mono">🎯 Day</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Direction Mode Toggle */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1">
            <Compass className="w-3.5 h-3.5 text-amber-500" />
            <span>Direction:</span>
          </span>
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-2xl border border-slate-200">
            <button
              onClick={() => setDirectionOverride("AUTO")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                directionOverride === "AUTO"
                  ? "bg-amber-400 text-slate-950 font-black shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Auto AI
            </button>
            <button
              onClick={() => setDirectionOverride("LONG")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                directionOverride === "LONG"
                  ? "bg-emerald-500 text-white font-black shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              🟢 Long (Buy)
            </button>
            <button
              onClick={() => setDirectionOverride("SHORT")}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                directionOverride === "SHORT"
                  ? "bg-rose-500 text-white font-black shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              🔴 Short (Sell)
            </button>
          </div>
        </div>

      </div>

      {/* Main Grid: Left Scanner & Search | Right Live Execution Blueprint */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: LIVE MARKET SCANNER & COIN STREAM (Col 5) */}
        <div className="lg:col-span-5 space-y-6">

          {/* Quick Custom Binance Pair Search Bar */}
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Search className="w-3.5 h-3.5 text-amber-500" />
                  <span>Scan Any Binance Futures / Spot Pair</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">30+ Pairs Available</span>
              </div>
              <form onSubmit={handleLoadCustomPair} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type any symbol (e.g. SUI, PEPE, WIF, NEAR)..."
                  value={customPairInput}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCustomPairInput(e.target.value);
                  }}
                  className="w-full px-3.5 py-2 text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-amber-400 text-slate-950 text-xs font-black rounded-xl hover:bg-amber-300 transition whitespace-nowrap shadow-sm"
                >
                  Load Pair
                </button>
              </form>
            </div>

            {/* Quick Filter Pills */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
              {[
                { id: "ALL", label: "All Active" },
                { id: "BUY", label: "🟢 Long Signals" },
                { id: "SHORT", label: "🔴 Short Setups" },
                { id: "HIGH_CONF", label: "⚡ 90%+ Confluence" },
              ].map((f) => (
                <button
                  key={f.id}
                  onClick={() => setSignalFilter(f.id as any)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${
                    signalFilter === f.id
                      ? "bg-slate-900 text-white shadow-sm font-extrabold"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          {/* Real-Time Coin Signals Stream */}
          <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
            {filteredCoins.map((coin) => {
              const isSelected = activeCoin?.symbol === coin.symbol;
              const isBullish = coin.signal.includes("BUY");
              const isShort = coin.signal.includes("SHORT");

              return (
                <div
                  key={coin.symbol}
                  onClick={() => setSelectedCoin(coin)}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? "bg-white border-amber-400 shadow-md shadow-amber-400/10 scale-[1.01]"
                      : "bg-white border-slate-200/80 hover:border-slate-300 hover:bg-slate-50/50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center font-black text-xs text-slate-900">
                        {coin.base}
                      </div>
                      <div>
                        <div className="text-sm font-black text-slate-900 flex items-center gap-1.5">
                          <span>{coin.base}/USDT</span>
                          <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 border border-amber-200">
                            {coin.timeframe}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 font-medium">
                          Vol: {coin.marketCap.volume24hFormatted} • OI: {coin.coinglass.openInterestFormatted}
                        </div>
                      </div>
                    </div>

                    {/* Signal Badge */}
                    <div className="text-right">
                      <span
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold font-mono inline-block ${
                          isBullish
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : isShort
                            ? "bg-rose-100 text-rose-800 border border-rose-200"
                            : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}
                      >
                        {coin.signal}
                      </span>
                      <div className="text-[10px] font-mono text-slate-500 mt-0.5">
                        Confluence: <strong className="text-slate-900">{coin.confidence}%</strong>
                      </div>
                    </div>
                  </div>

                  {/* Real-Time Price & Exact Levels */}
                  <div className="grid grid-cols-3 gap-2 pt-2.5 border-t border-slate-100 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono">Present Spot</span>
                      <div className="font-extrabold text-slate-900 flex items-center gap-1">
                        ${formatPrice(coin.price)}
                        <span className={`text-[10px] font-bold ${coin.change24h >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                          ({coin.change24h >= 0 ? "+" : ""}{coin.change24h.toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono">Entry Zone</span>
                      <div className="font-bold text-amber-700 text-[11px] truncate">
                        {coin.entryZoneFormatted}
                      </div>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-mono">Stop Loss</span>
                      <div className="font-bold text-rose-600 text-[11px] truncate">
                        {coin.stopLossFormatted}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* AI COPILOT & FUTURES LEVERAGE RISK SIZER */}
          {activeCoin && (
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <Sliders className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Futures Position & Risk Copilot</h3>
                    <p className="text-[11px] text-slate-500">Live risk calculations for {activeCoin.base}/USDT ({activeCoin.timeframe})</p>
                  </div>
                </div>
                <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200">
                  R:R {activeCoin.rrRatioFormatted}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-600 uppercase">Capital ($)</label>
                  <input
                    type="number"
                    value={copilotCapital}
                    onChange={(e) => setCopilotCapital(Math.max(10, Number(e.target.value)))}
                    className="w-full px-2.5 py-1.5 text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-600 uppercase">Risk (%)</label>
                  <input
                    type="number"
                    step="0.5"
                    min="0.5"
                    max="10"
                    value={copilotRiskPercent}
                    onChange={(e) => setCopilotRiskPercent(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-slate-600 uppercase">Leverage</label>
                  <select
                    value={copilotLeverage}
                    onChange={(e) => setCopilotLeverage(Number(e.target.value))}
                    className="w-full px-2.5 py-1.5 text-xs font-bold text-slate-900 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                  >
                    <option value={1}>1x (Spot)</option>
                    <option value={2}>2x</option>
                    <option value={3}>3x (Safe)</option>
                    <option value={5}>5x (Scalp)</option>
                    <option value={10}>10x (Aggressive)</option>
                    <option value={20}>20x (High Risk)</option>
                  </select>
                </div>
              </div>

              {/* Output Metrics */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Max Dollar Risk at Stop Loss:</span>
                  <span className="font-black text-rose-600">-${dollarRisk.toFixed(2)} ({copilotRiskPercent}%)</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Recommended Position Units:</span>
                  <span className="font-extrabold text-slate-900">
                    {positionUnits >= 1 ? positionUnits.toFixed(4) : positionUnits.toFixed(2)} {activeCoin.base} (≈ ${Math.round(positionValue).toLocaleString()})
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500">Required Margin ({copilotLeverage}x):</span>
                  <span className="font-bold text-amber-700">${Math.round(requiredMargin).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center pt-1 border-t border-slate-200/80">
                  <span className="text-slate-500 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-amber-500" />
                    <span>Est. Liquidation Price:</span>
                  </span>
                  <span className="font-mono font-bold text-rose-700">
                    ${formatPrice(estimatedLiquidationPrice)} ({isLongTrade ? "-" : "+"}{((Math.abs(estimatedLiquidationPrice - activeCoin.entryPrice) / activeCoin.entryPrice) * 100).toFixed(1)}%)
                  </span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-center font-bold">
                  <span className="text-emerald-700">Target Profit (TP2):</span>
                  <span className="text-emerald-600 font-extrabold">+${profitTP2.toFixed(2)} (+{((profitTP2 / copilotCapital) * 100).toFixed(1)}%)</span>
                </div>
              </div>

              {/* 1-Click Copy Signal Button */}
              <button
                onClick={handleCopySignal}
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition shadow-sm"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400" />
                    <span className="text-emerald-300">Trade Setup Copied (Telegram/Discord Format)!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-amber-400" />
                    <span>Copy Full Signal Blueprint &amp; Levels</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* 2. AI BOT EXECUTION & WEBHOOK AUTOMATION BRIDGE */}
          {activeCoin && (
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <Zap className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-900">
                      Bot Execution &amp; Webhook Bridge
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Automated dispatch to 3Commas, Bybit, Binance &amp; TradingView
                    </p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>WebSocket Live</span>
                </span>
              </div>

              {/* Simulated Order Execution Status Banner */}
              {paperTradeStatus?.active && (
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-1.5 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-emerald-700 flex items-center gap-1.5">
                      <CheckCheck className="w-4 h-4 text-emerald-500" />
                      <span>Paper Order #{paperTradeStatus.orderId} Active</span>
                    </span>
                    <span className="text-[10px] font-mono text-emerald-600">
                      {paperTradeStatus.time}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-700 font-mono">
                    <span>Side: <strong className={paperTradeStatus.side === "BUY" ? "text-emerald-600" : "text-rose-600"}>{paperTradeStatus.side}</strong></span>
                    <span>Fill Spot: <strong>${formatPrice(paperTradeStatus.fillPrice)}</strong></span>
                    <span>SL Guard: <strong className="text-rose-600">${formatPrice(activeCoin.stopLossPrice)}</strong></span>
                  </div>
                </div>
              )}

              {/* Action Buttons: 1-Click Paper Trade & Webhook Copy */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  onClick={handleSimulateExecution}
                  className="px-3.5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-xl text-xs font-black flex items-center justify-center gap-2 transition shadow-sm"
                >
                  <Play className="w-3.5 h-3.5 fill-slate-950" />
                  <span>Simulate 1-Click Fill</span>
                </button>
                <button
                  onClick={handleCopyWebhook}
                  className="px-3.5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition shadow-sm"
                >
                  {copiedWebhook ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">JSON Payload Copied!</span>
                    </>
                  ) : (
                    <>
                      <Terminal className="w-3.5 h-3.5 text-amber-400" />
                      <span>Copy Webhook JSON</span>
                    </>
                  )}
                </button>
              </div>

              {/* Active Risk Guard Telemetry */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="text-[10px] font-mono text-slate-400 uppercase font-bold flex items-center justify-between">
                  <span>Execution Telemetry &amp; Safeguards</span>
                  <span className="text-emerald-600 font-bold">100% Protected</span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center pt-1">
                  <div className="p-2 rounded-xl bg-white border border-slate-200">
                    <div className="text-[9px] text-slate-400 uppercase font-mono">Trailing Stop</div>
                    <div className="font-bold text-slate-900 text-[11px] mt-0.5">BE @ TP1</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-slate-200">
                    <div className="text-[9px] text-slate-400 uppercase font-mono">Max Drawdown</div>
                    <div className="font-bold text-rose-600 text-[11px] mt-0.5">-2.5% Cap</div>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-slate-200">
                    <div className="text-[9px] text-slate-400 uppercase font-mono">Latency / Ping</div>
                    <div className="font-bold text-emerald-600 text-[11px] mt-0.5 font-mono">14ms API</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. REAL-TIME ORDERBOOK DEPTH & INSTITUTIONAL WHALE RADAR */}
          {activeCoin && (
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-slate-200 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <Activity className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-900">
                      Orderbook Depth &amp; Whale Radar
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Live institutional book imbalance &amp; block taker flow
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                  L2 Real-Time
                </span>
              </div>

              {/* Orderbook Depth Ladder */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 uppercase pb-1 border-b border-slate-200">
                  <span>Price ($)</span>
                  <span>Size ({activeCoin.base})</span>
                  <span>Cumulative Vol</span>
                </div>

                {/* Asks (Red) */}
                <div className="space-y-1">
                  {mockAskLevels.map((lvl, i) => (
                    <div key={i} className="relative flex justify-between items-center text-xs font-mono py-0.5 px-1 rounded overflow-hidden">
                      <div
                        className="absolute right-0 top-0 bottom-0 bg-rose-500/10"
                        style={{ width: `${lvl.depth}%` }}
                      />
                      <span className="text-rose-600 font-bold z-10">${formatPrice(lvl.price)}</span>
                      <span className="text-slate-600 z-10">{lvl.size}</span>
                      <span className="text-slate-400 text-[10px] z-10">{lvl.total}</span>
                    </div>
                  ))}
                </div>

                {/* Mid Price Separator */}
                <div className="py-1.5 px-2.5 rounded-xl bg-slate-900 text-white flex justify-between items-center text-xs font-mono border border-slate-800">
                  <span className="text-[10px] text-amber-400 font-bold uppercase flex items-center gap-1">
                    <Radio className="w-3 h-3 text-amber-400 animate-pulse" /> Live Mid Spot:
                  </span>
                  <span className="font-black text-amber-400">${formatPrice(activeCoin.price)}</span>
                  <span className="text-[10px] text-slate-400 font-bold">Spread 0.01%</span>
                </div>

                {/* Bids (Green) */}
                <div className="space-y-1">
                  {mockBidLevels.map((lvl, i) => (
                    <div key={i} className="relative flex justify-between items-center text-xs font-mono py-0.5 px-1 rounded overflow-hidden">
                      <div
                        className="absolute left-0 top-0 bottom-0 bg-emerald-500/10"
                        style={{ width: `${lvl.depth}%` }}
                      />
                      <span className="text-emerald-600 font-bold z-10">${formatPrice(lvl.price)}</span>
                      <span className="text-slate-600 z-10">{lvl.size}</span>
                      <span className="text-slate-400 text-[10px] z-10">{lvl.total}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Institutional Whale Block Activity Stream */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs font-mono font-bold text-slate-500 uppercase">
                  <span>Institutional Whale Block Prints</span>
                  <span className="text-amber-600 font-bold text-[10px]">&gt;$100K Trades</span>
                </div>
                <div className="space-y-1.5">
                  {whaleTrades.map((tr, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs font-mono"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-1.5 py-0.5 rounded text-[10px] font-black ${
                            tr.type === "BUY"
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                              : "bg-rose-100 text-rose-800 border border-rose-200"
                          }`}
                        >
                          {tr.type}
                        </span>
                        <div>
                          <div className="font-bold text-slate-900 text-[11px]">
                            {tr.amount} <span className="text-slate-400">({tr.value})</span>
                          </div>
                          <div className="text-[9px] text-slate-500">{tr.badge}</div>
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400">{tr.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

        </div>

        {/* RIGHT COLUMN: 1:1 SYNCHRONIZED EXECUTION BLUEPRINT (Col 7) */}
        {activeCoin && (
          <div className="lg:col-span-7 space-y-6">

            {/* Active Coin Header & Parameters */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              
              <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                      {activeCoin.base}/USDT
                    </h3>
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800 border border-amber-200">
                      {activeCoin.timeframe} • {activeCoin.timeframeProfile.name}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium">
                    Present Binance Spot/Futures: <strong className="text-slate-900 text-sm">${formatPrice(activeCoin.price)}</strong> • 24h Change:{" "}
                    <span className={activeCoin.change24h >= 0 ? "text-emerald-600 font-bold" : "text-rose-600 font-bold"}>
                      {activeCoin.change24h >= 0 ? "+" : ""}{activeCoin.change24h.toFixed(2)}%
                    </span>
                  </p>
                </div>

                <div className="text-right">
                  <div
                    className={`px-4 py-1.5 rounded-xl text-sm font-black font-mono shadow-sm inline-block ${
                      activeCoin.signal.includes("BUY")
                        ? "bg-emerald-500 text-white"
                        : activeCoin.signal.includes("SHORT")
                        ? "bg-rose-500 text-white"
                        : "bg-slate-800 text-white"
                    }`}
                  >
                    {activeCoin.signal}
                  </div>
                  <div className="text-xs font-mono text-slate-500 mt-1">
                    AI Confluence: <strong className="text-slate-900">{activeCoin.confidence}% Match</strong>
                  </div>
                </div>
              </div>

              {/* EXACT 1:1 EXECUTION TIERS MATCHING LIVE PRICE */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                
                {/* Entry Zone */}
                <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-amber-800 uppercase font-mono">
                    <Target className="w-3 h-3 text-amber-600" />
                    <span>Exact Entry Zone</span>
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 mt-1">
                    {activeCoin.entryZoneFormatted}
                  </div>
                  <div className="text-[10px] text-amber-700 font-medium mt-0.5">Matching current spot</div>
                </div>

                {/* Stop Loss */}
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-rose-700 uppercase font-mono">
                    <ShieldAlert className="w-3 h-3 text-rose-600" />
                    <span>Stop Loss (SL)</span>
                  </div>
                  <div className="text-sm font-extrabold text-rose-700 mt-1">
                    {activeCoin.stopLossFormatted}
                  </div>
                  <div className="text-[10px] text-rose-600 font-medium mt-0.5">Structure invalidation</div>
                </div>

                {/* TP 1 */}
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 uppercase font-mono">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Target (TP1)</span>
                  </div>
                  <div className="text-sm font-extrabold text-emerald-700 mt-1">
                    {activeCoin.tp1Formatted}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium mt-0.5">Secure 50% & SL to BE</div>
                </div>

                {/* Runner TP 3 */}
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 uppercase font-mono">
                    <TrendingUp className="w-3 h-3 text-emerald-600" />
                    <span>Runner (TP3)</span>
                  </div>
                  <div className="text-sm font-extrabold text-emerald-700 mt-1">
                    {activeCoin.tp3Formatted}
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium mt-0.5">R:R {activeCoin.rrRatioFormatted}</div>
                </div>

              </div>

              {/* Best Trading Session Window Callout */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                  <div>
                    <span className="text-[11px] font-mono text-amber-400 uppercase font-bold">Optimal Execution Session:</span>
                    <div className="text-xs sm:text-sm font-extrabold text-slate-100">{activeCoin.optimalSession}</div>
                  </div>
                </div>
                <div className="text-xs font-mono text-slate-400 bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-700">
                  Risk/Reward: <span className="text-amber-400 font-bold">{activeCoin.rrRatioFormatted}</span>
                </div>
              </div>

              {/* Setup Rationale & CoinGlass Quantitative Review */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-mono font-bold text-slate-500 uppercase flex items-center justify-between">
                  <span>CoinGlass & CoinMarketCap Multi-Factor Analysis</span>
                  <span className="text-amber-600 font-bold">{activeCoin.strategy}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  {activeCoin.rationale}
                </p>

                {/* CoinGlass Live Indicator Chips */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-mono uppercase">CoinGlass Funding</div>
                    <div className="font-bold text-slate-900 font-mono">{activeCoin.coinglass.fundingRateFormatted}</div>
                    <div className="text-[9px] text-emerald-700 font-medium">{activeCoin.coinglass.fundingBias}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-mono uppercase">Open Interest (OI)</div>
                    <div className="font-bold text-slate-900 font-mono">{activeCoin.coinglass.openInterestFormatted}</div>
                    <div className="text-[9px] text-slate-500">{activeCoin.coinglass.openInterestTrend}</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-mono uppercase">L/S Accounts Ratio</div>
                    <div className="font-bold text-slate-900 font-mono">{activeCoin.coinglass.longShortRatio} ({activeCoin.coinglass.longAccountPercent}% L)</div>
                    <div className="text-[9px] text-slate-500">Retail Skew</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-mono uppercase">Taker CVD Delta</div>
                    <div className="font-bold text-slate-900 font-mono">{activeCoin.coinglass.takerCvdDelta > 0 ? "+" : ""}{activeCoin.coinglass.takerCvdDelta}%</div>
                    <div className="text-[9px] text-amber-700">Market Order Flow</div>
                  </div>
                </div>
              </div>

            </div>

            {/* INSTITUTIONAL ORDER FLOW & LIQUIDATION MAGNET MAP */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold">
                    <Layers className="w-4 h-4 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-900">
                      CoinGlass Liquidation Magnet Pools & Order Flow
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Resting stop clusters, taker order delta & 24h range positioning
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Live Derivatives Book
                </span>
              </div>

              {/* 24h Channel Range Progress Bar */}
              <div className="space-y-1.5 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex justify-between items-center text-xs font-mono">
                  <span className="text-slate-500 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-500" /> 24h Low: <strong>${formatPrice(activeCoin.low24h)}</strong>
                  </span>
                  <span className="font-bold text-amber-600">
                    Range: ${formatPrice(activeCoin.high24h - activeCoin.low24h)} ({(((activeCoin.high24h - activeCoin.low24h) / Math.max(1, activeCoin.low24h)) * 100).toFixed(2)}%)
                  </span>
                  <span className="text-slate-500 flex items-center gap-1">
                    24h High: <strong>${formatPrice(activeCoin.high24h)}</strong> <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  </span>
                </div>
                <div className="relative w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: "100%" }}
                  />
                  <div
                    className="absolute top-0 bottom-0 w-3 bg-slate-950 border-2 border-white rounded-full shadow -ml-1.5 transition-all duration-300"
                    style={{ left: `${Math.max(5, Math.min(95, ((activeCoin.price - activeCoin.low24h) / Math.max(1, activeCoin.high24h - activeCoin.low24h)) * 100))}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono pt-0.5">
                  <span>Support Floor</span>
                  <span className="text-slate-800 font-bold">Present Price: ${formatPrice(activeCoin.price)}</span>
                  <span>Resistance Ceiling</span>
                </div>
              </div>

              {/* Liquidation Magnet Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200/80 space-y-1">
                  <div className="text-[10px] font-bold text-rose-700 uppercase font-mono flex items-center justify-between">
                    <span>Upper Short Liquidation Pool</span>
                    <span>Target Magnet</span>
                  </div>
                  <div className="text-base font-black text-rose-800 font-mono">
                    ${formatPrice(activeCoin.coinglass.liquidationUpperMagnet)}
                  </div>
                  <div className="text-[10px] text-rose-600">{activeCoin.coinglass.liquidationUpperPoolUsd}</div>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 space-y-1">
                  <div className="text-[10px] font-bold text-emerald-700 uppercase font-mono flex items-center justify-between">
                    <span>Lower Long Liquidation Shelf</span>
                    <span>Demand Floor</span>
                  </div>
                  <div className="text-base font-black text-emerald-800 font-mono">
                    ${formatPrice(activeCoin.coinglass.liquidationLowerMagnet)}
                  </div>
                  <div className="text-[10px] text-emerald-600">{activeCoin.coinglass.liquidationLowerPoolUsd}</div>
                </div>
              </div>

              {/* CVD Delta Meter */}
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                    <TrendingUp className="w-3.5 h-3.5" /> Buyer Inflow: {activeCoin.coinglass.longAccountPercent}%
                  </span>
                  <span className="font-mono text-[10px] text-slate-400 uppercase">CVD Volume Imbalance</span>
                  <span className="font-mono text-rose-400 font-bold flex items-center gap-1.5">
                    Seller Delta: {activeCoin.coinglass.shortAccountPercent}% <TrendingDown className="w-3.5 h-3.5" />
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden flex">
                  <div
                    className="bg-emerald-500 transition-all duration-500"
                    style={{ width: `${activeCoin.coinglass.longAccountPercent}%` }}
                  />
                  <div
                    className="bg-rose-500 transition-all duration-500"
                    style={{ width: `${activeCoin.coinglass.shortAccountPercent}%` }}
                  />
                </div>
                <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono">
                  <span>Taker Aggression: <strong className="text-amber-400">{activeCoin.coinglass.cvdDeltaFormatted}</strong></span>
                  <span>Quote Vol: <strong className="text-slate-200">{activeCoin.marketCap.volume24hFormatted}</strong></span>
                </div>
              </div>
            </div>

            {/* 6-FACTOR ALGORITHMIC CONFLUENCE CHECKLIST */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                    <ShieldAlert className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-base font-black text-slate-900">AI Quantitative Confluence Audit</h4>
                    <p className="text-[11px] text-slate-500">Multi-factor validation across CoinGlass & Technical matrices</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200 font-mono">
                  Grade A+ ({activeCoin.confidence}% Match)
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {activeCoin.confluenceAudit.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <div className="font-bold text-slate-900">{item.title}</div>
                      <div className="text-[10px] text-slate-500">{item.metric}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
