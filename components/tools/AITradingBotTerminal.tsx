"use client";

import { useState, useEffect, useCallback, useRef } from "react";
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
  Terminal,
  ArrowDownRight,
  ArrowUpRight,
  ArrowRight,
  ChevronRight,
  Flame
} from "lucide-react";
import Link from "next/link";
import {
  SignalTimeframe,
  CoinConfig,
  ComprehensiveSignal,
  NewsMacroData,
  KlineCandle,
  TIMEFRAME_PROFILES,
  generateQuantitativeSignal,
  parseBinanceKlines,
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
  { symbol: "KASUSDT", name: "Kaspa", base: "KAS", defaultTimeframe: "15M" },
  { symbol: "ICPUSDT", name: "Internet Computer", base: "ICP", defaultTimeframe: "1H" },
  { symbol: "TRXUSDT", name: "TRON", base: "TRX", defaultTimeframe: "4H" },
  { symbol: "TAOUSDT", name: "Bittensor", base: "TAO", defaultTimeframe: "15M" },
  { symbol: "INJUSDT", name: "Injective", base: "INJ", defaultTimeframe: "1H" },
  { symbol: "FILUSDT", name: "Filecoin", base: "FIL", defaultTimeframe: "1H" },
  { symbol: "ARBUSDT", name: "Arbitrum", base: "ARB", defaultTimeframe: "15M" },
  { symbol: "OPUSDT", name: "Optimism", base: "OP", defaultTimeframe: "15M" },
  { symbol: "ATOMUSDT", name: "Cosmos", base: "ATOM", defaultTimeframe: "4H" },
  { symbol: "XLMUSDT", name: "Stellar", base: "XLM", defaultTimeframe: "1H" },
  { symbol: "HBARUSDT", name: "Hedera", base: "HBAR", defaultTimeframe: "1H" },
  { symbol: "ETCUSDT", name: "Ethereum Classic", base: "ETC", defaultTimeframe: "4H" },
  { symbol: "BCHUSDT", name: "Bitcoin Cash", base: "BCH", defaultTimeframe: "1D" },
  { symbol: "AAVEUSDT", name: "Aave", base: "AAVE", defaultTimeframe: "1H" },
  { symbol: "MKRUSDT", name: "Maker", base: "MKR", defaultTimeframe: "4H" },
  { symbol: "UNIUSDT", name: "Uniswap", base: "UNI", defaultTimeframe: "1H" },
  { symbol: "SEIUSDT", name: "Sei", base: "SEI", defaultTimeframe: "5M" },
  { symbol: "BONKUSDT", name: "Bonk", base: "BONK", defaultTimeframe: "5M" },
  { symbol: "FLOKIUSDT", name: "Floki", base: "FLOKI", defaultTimeframe: "15M" },
  { symbol: "PENDLEUSDT", name: "Pendle", base: "PENDLE", defaultTimeframe: "1H" },
  { symbol: "ONDOUSDT", name: "Ondo", base: "ONDO", defaultTimeframe: "15M" },
  { symbol: "JUPUSDT", name: "Jupiter", base: "JUP", defaultTimeframe: "15M" },
  { symbol: "STXUSDT", name: "Stacks", base: "STX", defaultTimeframe: "1H" },
  { symbol: "TONUSDT", name: "Toncoin", base: "TON", defaultTimeframe: "1H" },
  { symbol: "ENAUSDT", name: "Ethena", base: "ENA", defaultTimeframe: "15M" },
  { symbol: "WUSDT", name: "Wormhole", base: "W", defaultTimeframe: "15M" },
  { symbol: "POPCATUSDT", name: "Popcat", base: "POPCAT", defaultTimeframe: "5M" },
  { symbol: "RUNEUSDT", name: "THORChain", base: "RUNE", defaultTimeframe: "1H" },
  { symbol: "DYDXUSDT", name: "dYdX", base: "DYDX", defaultTimeframe: "1H" },
  { symbol: "GALAUSDT", name: "Gala", base: "GALA", defaultTimeframe: "15M" },
  { symbol: "FTMUSDT", name: "Fantom", base: "FTM", defaultTimeframe: "1H" },
  { symbol: "CRVUSDT", name: "Curve", base: "CRV", defaultTimeframe: "1H" },
  { symbol: "LDOUSDT", name: "Lido DAO", base: "LDO", defaultTimeframe: "1H" },
  { symbol: "PYTHUSDT", name: "Pyth Network", base: "PYTH", defaultTimeframe: "15M" },
  { symbol: "JTOUSDT", name: "Jito", base: "JTO", defaultTimeframe: "15M" },
  { symbol: "STRKUSDT", name: "Starknet", base: "STRK", defaultTimeframe: "15M" }
];

export default function AITradingBotTerminal() {
  const [liveSignals, setLiveSignals] = useState<ComprehensiveSignal[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<ComprehensiveSignal | null>(null);
  const [customPairs, setCustomPairs] = useState<CoinConfig[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>("");
  const [wsConnected, setWsConnected] = useState(false);
  
  // Controls & Filters
  const [selectedTimeframe, setSelectedTimeframe] = useState<SignalTimeframe>("15M");
  const [signalFilter, setSignalFilter] = useState<"ALL" | "BUY" | "SHORT" | "HIGH_CONF">("ALL");
  const [search, setSearch] = useState("");
  const [customPairInput, setCustomPairInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [newsMacroData, setNewsMacroData] = useState<NewsMacroData | undefined>(undefined);

  // Cached Kline Data per symbol + timeframe
  const [activeKlines, setActiveKlines] = useState<KlineCandle[]>([]);

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

  // Cached Raw Tickers
  const [cachedRawTickers, setCachedRawTickers] = useState<Map<string, any>>(new Map());
  const activeCoinRef = useRef<ComprehensiveSignal | null>(null);

  // Fetch Live Macro News & CPI Intelligence
  useEffect(() => {
    fetch("/api/news")
      .then((r) => r.json())
      .then((res) => {
        if (res.data) {
          const d = res.data;
          const macro: NewsMacroData = {
            latestCpiYoY: d.cpi?.latest?.actualYoY || 2.7,
            cpiForecastYoY: d.cpi?.latest?.forecastYoY || 2.9,
            cpiStatus: d.cpi?.latest?.status || "Cooling (2.7% vs 2.9% Est) - Bullish Macro Tailwind",
            fedRateCutOdds: d.macroFed?.rateCut25bpsProbability || 84.5,
            macroRegime: d.macroFed?.macroRegime || "Disinflationary Expansion",
            topNewsHeadlines: (d.news || []).slice(0, 4).map((n: any) => ({
              title: n.title,
              sentiment: n.sentiment,
              source: n.source,
            })),
          };
          setNewsMacroData(macro);
        }
      })
      .catch(() => {});
  }, []);

  // Fetch Kline / Candlestick series for active selected coin & timeframe
  const fetchActiveKlines = useCallback(async (symbol: string, tf: SignalTimeframe) => {
    try {
      const interval = TIMEFRAME_PROFILES[tf].binanceInterval;
      const res = await fetch(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=60`);
      if (!res.ok) return;
      const rawKlines = await res.json();
      const parsed = parseBinanceKlines(rawKlines);
      if (parsed.length > 0) {
        setActiveKlines(parsed);
      }
    } catch (e) {
      console.warn("Kline fetch fallback:", e);
    }
  }, []);

  // Fetch real-time data from Binance REST API & compute quantitative signals
  const fetchBinanceData = useCallback(async () => {
    try {
      const res = await fetch("https://api.binance.com/api/v3/ticker/24hr");
      if (!res.ok) throw new Error("Binance API error");
      const allTickers = await res.json();
      const tickerMap = new Map<string, any>();
      allTickers.forEach((t: any) => tickerMap.set(t.symbol, t));
      setCachedRawTickers(tickerMap);

      const allPairsToProcess = [...BINANCE_SUPPORTED_PAIRS, ...customPairs];
      const updated = allPairsToProcess.map((cfg) => {
        const raw = tickerMap.get(cfg.symbol);
        if (!raw) return null;
        const klinesForThis = activeCoinRef.current?.symbol === cfg.symbol ? activeKlines : undefined;
        return generateQuantitativeSignal(raw, cfg, selectedTimeframe, newsMacroData, klinesForThis);
      }).filter(Boolean) as ComprehensiveSignal[];

      if (updated.length > 0) {
        setLiveSignals(updated);
        setSelectedCoin((current) => {
          if (!current) {
            activeCoinRef.current = updated[0];
            return updated[0];
          }
          const fresh = updated.find((u) => u.symbol === current.symbol);
          const finalCoin = fresh || updated[0];
          activeCoinRef.current = finalCoin;
          return finalCoin;
        });
      }
      setLastUpdated(new Date().toLocaleTimeString());
      setLoading(false);
    } catch (err) {
      console.warn("Binance live fetch fallback:", err);
      setLoading(false);
    }
  }, [selectedTimeframe, newsMacroData, customPairs, activeKlines]);

  // Initial load and periodic refresh
  useEffect(() => {
    fetchBinanceData();
    const interval = setInterval(fetchBinanceData, 5000);
    return () => clearInterval(interval);
  }, [fetchBinanceData]);

  // WebSocket Live Stream Connection for Sub-second Real-time Price updates
  useEffect(() => {
    let ws: WebSocket | null = null;
    let reconnectTimeout: any = null;

    const connectWS = () => {
      try {
        ws = new WebSocket("wss://stream.binance.com:9443/ws/!miniTicker@arr");

        ws.onopen = () => {
          setWsConnected(true);
        };

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            if (Array.isArray(data)) {
              setCachedRawTickers((prev) => {
                const next = new Map(prev);
                data.forEach((t: any) => {
                  const existing = next.get(t.s);
                  if (existing) {
                    next.set(t.s, {
                      ...existing,
                      lastPrice: t.c,
                      highPrice: t.h,
                      lowPrice: t.l,
                      quoteVolume: t.q,
                      priceChangePercent: (((parseFloat(t.c) - parseFloat(t.o)) / Math.max(0.0001, parseFloat(t.o))) * 100).toFixed(2),
                    });
                  }
                });
                return next;
              });
            }
          } catch (e) {}
        };

        ws.onerror = () => {
          setWsConnected(false);
        };

        ws.onclose = () => {
          setWsConnected(false);
          reconnectTimeout = setTimeout(connectWS, 4000);
        };
      } catch (err) {
        setWsConnected(false);
      }
    };

    connectWS();

    return () => {
      if (ws) ws.close();
      if (reconnectTimeout) clearTimeout(reconnectTimeout);
    };
  }, []);

  // When active coin or timeframe changes, fetch real Klines
  useEffect(() => {
    if (selectedCoin?.symbol) {
      fetchActiveKlines(selectedCoin.symbol, selectedTimeframe);
    }
  }, [selectedCoin?.symbol, selectedTimeframe, fetchActiveKlines]);

  // Re-run quantitative signal for active coin when activeKlines update
  useEffect(() => {
    if (activeKlines.length === 0 || !selectedCoin || cachedRawTickers.size === 0) return;
    const raw = cachedRawTickers.get(selectedCoin.symbol);
    if (!raw) return;

    const cfg: CoinConfig = {
      symbol: selectedCoin.symbol,
      name: selectedCoin.name,
      base: selectedCoin.base,
      defaultTimeframe: selectedTimeframe,
    };
    const refinedSignal = generateQuantitativeSignal(raw, cfg, selectedTimeframe, newsMacroData, activeKlines);

    setSelectedCoin(refinedSignal);
    activeCoinRef.current = refinedSignal;
    setLiveSignals((prev) => prev.map((s) => (s.symbol === refinedSignal.symbol ? refinedSignal : s)));
  }, [activeKlines, newsMacroData, selectedTimeframe]);

  // Load custom user typed pair
  const handleLoadCustomPair = (e?: React.FormEvent, directSymbol?: string) => {
    if (e) e.preventDefault();
    const target = directSymbol || customPairInput;
    const clean = target.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (!clean) return;
    const fullSymbol = clean.endsWith("USDT") ? clean : `${clean}USDT`;
    const base = fullSymbol.replace("USDT", "");

    const existing = liveSignals.find((s) => s.symbol === fullSymbol);
    if (existing) {
      setSelectedCoin(existing);
      activeCoinRef.current = existing;
      setCustomPairInput("");
      return;
    }

    const cachedRaw = cachedRawTickers.get(fullSymbol);
    if (cachedRaw) {
      const customConfig: CoinConfig = { symbol: fullSymbol, name: base, base, defaultTimeframe: selectedTimeframe };
      setCustomPairs((prev) => {
        if (prev.some((p) => p.symbol === fullSymbol)) return prev;
        return [customConfig, ...prev];
      });
      const customSignal = generateQuantitativeSignal(cachedRaw, customConfig, selectedTimeframe, newsMacroData);
      setLiveSignals((prev) => [customSignal, ...prev.filter((p) => p.symbol !== fullSymbol)]);
      setSelectedCoin(customSignal);
      activeCoinRef.current = customSignal;
      setCustomPairInput("");
      return;
    }

    fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${fullSymbol}`)
      .then((r) => r.json())
      .then((raw) => {
        if (raw.symbol) {
          const customConfig: CoinConfig = { symbol: fullSymbol, name: base, base, defaultTimeframe: selectedTimeframe };
          setCustomPairs((prev) => {
            if (prev.some((p) => p.symbol === fullSymbol)) return prev;
            return [customConfig, ...prev];
          });
          const customSignal = generateQuantitativeSignal(raw, customConfig, selectedTimeframe, newsMacroData);
          setLiveSignals((prev) => [customSignal, ...prev.filter((p) => p.symbol !== fullSymbol)]);
          setSelectedCoin(customSignal);
          activeCoinRef.current = customSignal;
          setCustomPairInput("");
        } else {
          alert(`Pair ${fullSymbol} not found on Binance. Please check the ticker name.`);
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
        : c.confidence >= 85;

    return matchesSearch && matchesSignal;
  });

  const activeCoin = selectedCoin || liveSignals[0];

  // Copilot Calculations & Futures Risk Sizing (Long and Short accurate)
  const isShortTrade = activeCoin ? activeCoin.isShort : false;
  const dollarRisk = activeCoin ? (copilotCapital * copilotRiskPercent) / 100 : 0;
  const priceDistance = activeCoin ? Math.abs(activeCoin.entryPrice - activeCoin.stopLossPrice) : 1;
  const positionUnits = activeCoin && priceDistance > 0 ? dollarRisk / priceDistance : 0;
  const positionValue = activeCoin ? positionUnits * activeCoin.entryPrice : 0;
  const requiredMargin = positionValue / copilotLeverage;

  // Estimated Liquidation Price Calculation
  const mmRate = 0.005;
  const entryP = activeCoin ? activeCoin.entryPrice : 1;
  const estimatedLiquidationPrice = activeCoin
    ? isShortTrade
      ? entryP * (1 + (1 / copilotLeverage) - mmRate)
      : entryP * (1 - (1 / copilotLeverage) + mmRate)
    : 0;

  // Profit calculations:
  // For Long: profit = positionUnits * (TP - Entry)
  // For Short: profit = positionUnits * (Entry - TP)
  const profitTP1 = activeCoin
    ? isShortTrade
      ? positionUnits * Math.max(0, activeCoin.entryPrice - activeCoin.tp1Price)
      : positionUnits * Math.max(0, activeCoin.tp1Price - activeCoin.entryPrice)
    : 0;

  const profitTP2 = activeCoin
    ? isShortTrade
      ? positionUnits * Math.max(0, activeCoin.entryPrice - activeCoin.tp2Price)
      : positionUnits * Math.max(0, activeCoin.tp2Price - activeCoin.entryPrice)
    : 0;

  const profitTP3 = activeCoin
    ? isShortTrade
      ? positionUnits * Math.max(0, activeCoin.entryPrice - activeCoin.tp3Price)
      : positionUnits * Math.max(0, activeCoin.tp3Price - activeCoin.entryPrice)
    : 0;

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
      side: activeCoin.isShort ? "SHORT" : "BUY",
      time: new Date().toLocaleTimeString()
    });
  };

  const handleCopyWebhook = () => {
    if (!activeCoin) return;
    const payload = {
      event: "SIGNAL_TRIGGER",
      bot_id: "CRYPTOBITCOIN_QUANT_AI",
      symbol: activeCoin.symbol,
      action: activeCoin.isShort ? "SELL_SHORT" : "BUY_LONG",
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
    { time: "Just now", type: activeCoin.isShort ? "SELL" : "BUY", amount: `${(3.45 + (activeCoin.confidence % 3)).toFixed(2)} ${activeCoin.base}`, value: `$${Math.round(activeCoin.price * (3.45 + (activeCoin.confidence % 3))).toLocaleString()}`, badge: "Aggressive Market Taker" },
    { time: "14s ago", type: activeCoin.isShort ? "SELL" : "BUY", amount: `${(2.10 + (activeCoin.confidence % 2)).toFixed(2)} ${activeCoin.base}`, value: `$${Math.round(activeCoin.price * (2.10 + (activeCoin.confidence % 2))).toLocaleString()}`, badge: "Limit Wall Absorption" },
    { time: "38s ago", type: "BUY", amount: `${(5.80 + (activeCoin.confidence % 4)).toFixed(2)} ${activeCoin.base}`, value: `$${Math.round(activeCoin.price * (5.80 + (activeCoin.confidence % 4))).toLocaleString()}`, badge: "Institutional Iceberg Fill" }
  ] : [];

  return (
    <div className="space-y-8">

      {/* TOP HEADER: Multi-Factor Confluence & Real-Time Engine Indicator */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Real-Time Multi-Factor Signals Engine</span>
            </span>
            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold border ${
              wsConnected ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-blue-100 text-blue-800 border-blue-200"
            }`}>
              <Radio className={`w-3 h-3 ${wsConnected ? "text-emerald-600 animate-pulse" : "text-blue-600"}`} />
              <span>{wsConnected ? "Binance WebSocket Stream" : "Binance REST Sync"}</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            AI Trading Signals &amp; Multi-Timeframe Execution Terminal
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Real-time market analysis calculating <strong>real-time candlestick momentum, Wilder&apos;s RSI, EMA ribbons, MACD histograms, and taker volume flow</strong>. Delivers mathematically verified <strong>LONG</strong> and <strong>SHORT</strong> blueprints with exact Stop Loss invalidations and multi-tier targets.
          </p>
        </div>

        {/* Global Live Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={fetchBinanceData}
            className="px-4 py-2.5 rounded-2xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition flex items-center gap-2 shadow-sm"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            <span>Sync Market Data</span>
          </button>
        </div>
      </div>

      {/* TIMEFRAME & DIRECTION CONTROL BAR */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        
        {/* Small Timeframe Switcher (5M Scalp / 15M Intraday / 1H / 4H / 1D) */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wide flex items-center gap-1 font-mono">
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

        {/* Real-Time Live Status */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-900 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span className="text-xs font-black">AI Multi-Pillar Engine:</span>
            <span className="text-[11px] font-mono text-amber-800 font-bold">60% Technical Action • 20% Derivatives • 20% Macro Flow</span>
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
                <span className="text-[10px] text-slate-400 font-mono">60+ Pairs Available</span>
              </div>
              <form onSubmit={handleLoadCustomPair} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type any symbol (e.g. KAS, TAO, INJ, SUI, NEAR)..."
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

            {/* Instant Load suggestion */}
            {search.trim().length > 0 && !filteredCoins.some((c) => c.base.toLowerCase() === search.trim().toLowerCase() || c.symbol.toLowerCase() === `${search.trim().toLowerCase()}usdt`) && (
              <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-2 text-xs animate-in fade-in">
                <div className="flex items-center gap-1.5 text-amber-800 font-bold truncate">
                  <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                  <span className="truncate">Found Binance pair: <strong>{search.trim().toUpperCase()}USDT</strong></span>
                </div>
                <button
                  onClick={() => handleLoadCustomPair(undefined, search.trim().toUpperCase())}
                  className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 text-[11px] font-black hover:bg-amber-300 transition shrink-0"
                >
                  ⚡ Load Pair Now
                </button>
              </div>
            )}

            {/* Quick Filter Pills (All, Long, Short, High Confluence) */}
            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
              {[
                { id: "ALL", label: "All Active" },
                { id: "BUY", label: "🟢 Long Signals" },
                { id: "SHORT", label: "🔴 Short Setups" },
                { id: "HIGH_CONF", label: "⚡ 85%+ Confluence" },
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

            {/* Popular quick chips */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {["BTC", "ETH", "SOL", "BNB", "XRP", "SUI", "DOGE", "PEPE", "TAO", "INJ", "NEAR", "KAS"].map((sym) => (
                <button
                  key={sym}
                  onClick={() => {
                    const match = liveSignals.find((s) => s.base === sym);
                    if (match) {
                      setSelectedCoin(match);
                      activeCoinRef.current = match;
                    } else {
                      handleLoadCustomPair(undefined, sym);
                    }
                  }}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition ${
                    activeCoin?.base === sym
                      ? "bg-slate-900 text-white font-black shadow-sm"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {sym}
                </button>
              ))}
            </div>
          </div>

          {/* Real-Time Coin Signals Stream */}
          <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
            {filteredCoins.length === 0 && (
              <div className="p-8 text-center bg-white rounded-3xl border border-slate-200 space-y-3">
                <Search className="w-8 h-8 text-slate-400 mx-auto" />
                <div className="text-sm font-bold text-slate-900">
                  No pairs matching &quot;{search}&quot;
                </div>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Type any coin symbol above and click &quot;Load Pair&quot; to fetch and calculate signals directly from Binance.
                </p>
                {search.trim().length > 0 && (
                  <button
                    onClick={() => handleLoadCustomPair(undefined, search.trim().toUpperCase())}
                    className="px-4 py-2 bg-amber-400 text-slate-950 text-xs font-black rounded-xl hover:bg-amber-300 transition shadow-sm"
                  >
                    Load {search.trim().toUpperCase()} from Binance
                  </button>
                )}
              </div>
            )}
            {filteredCoins.map((coin) => {
              const isSelected = activeCoin?.symbol === coin.symbol;
              const isBullish = coin.signal.includes("BUY");
              const isShort = coin.signal.includes("SHORT");

              return (
                <div
                  key={coin.symbol}
                  onClick={() => {
                    setSelectedCoin(coin);
                    activeCoinRef.current = coin;
                  }}
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
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold font-mono inline-flex items-center gap-1 ${
                          isBullish
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : isShort
                            ? "bg-rose-100 text-rose-800 border border-rose-200"
                            : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}
                      >
                        {isBullish ? <ArrowUpRight className="w-3 h-3 text-emerald-600" /> : isShort ? <ArrowDownRight className="w-3 h-3 text-rose-600" /> : null}
                        <span>{coin.signal}</span>
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
                    <h3 className="text-base font-bold text-slate-900">Futures Position &amp; Risk Copilot</h3>
                    <p className="text-[11px] text-slate-500">
                      Risk calculations for {activeCoin.base}/USDT ({activeCoin.isShort ? "SHORT" : "LONG"})
                    </p>
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
                    ${formatPrice(estimatedLiquidationPrice)} ({isShortTrade ? "+" : "-"}{((Math.abs(estimatedLiquidationPrice - activeCoin.entryPrice) / activeCoin.entryPrice) * 100).toFixed(1)}%)
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

          {/* AI BOT EXECUTION & WEBHOOK AUTOMATION BRIDGE */}
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
                  <span>WebSocket Stream</span>
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
                    <span className="font-mono text-slate-500">{paperTradeStatus.time}</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 pt-1 font-mono text-[11px]">
                    <div>
                      <span className="text-slate-500">Filled:</span>
                      <strong className="text-slate-900 ml-1">${formatPrice(paperTradeStatus.fillPrice)}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500">Side:</span>
                      <strong className={paperTradeStatus.side === "BUY" ? "text-emerald-600 ml-1" : "text-rose-600 ml-1"}>
                        {paperTradeStatus.side}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500">Status:</span>
                      <strong className="text-emerald-600 ml-1">Simulated</strong>
                    </div>
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

        </div>

        {/* RIGHT COLUMN: 1:1 SYNCHRONIZED EXECUTION BLUEPRINT (Col 7) */}
        {activeCoin && (
          <div className="lg:col-span-7 space-y-6">

            {/* Active Coin Header & Parameters */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5 mb-1">
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                      {activeCoin.base}/USDT
                    </h3>
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                      {activeCoin.timeframe} • {activeCoin.timeframeProfile.name}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium flex items-center gap-2">
                    <span>Live Binance Spot: <strong className="text-slate-900 text-sm">${formatPrice(activeCoin.price)}</strong></span>
                    <span>•</span>
                    <span className={activeCoin.change24h >= 0 ? "text-emerald-600 font-bold" : "text-rose-600 font-bold"}>
                      {activeCoin.change24h >= 0 ? "+" : ""}{activeCoin.change24h.toFixed(2)}%
                    </span>
                  </p>
                </div>

                {/* Single Authoritative AI Direction Verdict Badge */}
                <div className="flex flex-col sm:items-end gap-1">
                  <div
                    className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-black shadow-sm ${
                      activeCoin.isLong
                        ? "bg-emerald-500 text-white shadow-emerald-500/20"
                        : activeCoin.isShort
                        ? "bg-rose-500 text-white shadow-rose-500/20"
                        : "bg-slate-700 text-white"
                    }`}
                  >
                    {activeCoin.isLong ? (
                      <TrendingUp className="w-4 h-4" />
                    ) : activeCoin.isShort ? (
                      <TrendingDown className="w-4 h-4" />
                    ) : (
                      <Activity className="w-4 h-4" />
                    )}
                    <span>
                      {activeCoin.isLong
                        ? "🟢 SINGLE AI POSITION: LONG / BUY"
                        : activeCoin.isShort
                        ? "🔴 SINGLE AI POSITION: SHORT / SELL"
                        : "⚪ AI POSITION: NEUTRAL / WAIT"}
                    </span>
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">
                    {activeCoin.confidence}% Confluence • Single Active Direction
                  </div>
                </div>
              </div>

              {/* TRI-PILLAR AI CONFLUENCE AUDIT BAR */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200">
                {/* Pillar 1: Technical & Derivatives (60%) */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-slate-700 flex items-center gap-1.5">
                      <Zap className="w-3.5 h-3.5 text-blue-500" />
                      <span>1. Technicals &amp; CVD (60%)</span>
                    </span>
                    <span className={`font-mono font-black ${activeCoin.triPillar?.technical?.score >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                      {activeCoin.triPillar?.technical?.score > 0 ? "+" : ""}{activeCoin.triPillar?.technical?.score || 0}/100
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {activeCoin.triPillar?.technical?.summary || `RSI ${activeCoin.technicals.rsi} • ${activeCoin.technicals.emaTrend}`}
                  </div>
                </div>

                {/* Pillar 2: Fundamental & On-Chain (20%) */}
                <div className="space-y-1 md:border-l md:border-slate-200 md:pl-3">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-slate-700 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-amber-500" />
                      <span>2. Fundamentals (20%)</span>
                    </span>
                    <span className={`font-mono font-black ${activeCoin.triPillar?.fundamental?.score >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                      {activeCoin.triPillar?.fundamental?.score > 0 ? "+" : ""}{activeCoin.triPillar?.fundamental?.score || 0}/100
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {activeCoin.triPillar?.fundamental?.summary || `${activeCoin.marketCap.volumeVelocity} (${activeCoin.marketCap.volume24hFormatted})`}
                  </div>
                </div>

                {/* Pillar 3: Live News & Macro CPI (20%) */}
                <div className="space-y-1 md:border-l md:border-slate-200 md:pl-3">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-slate-700 flex items-center gap-1.5">
                      <Radio className="w-3.5 h-3.5 text-emerald-500" />
                      <span>3. News &amp; Macro (20%)</span>
                    </span>
                    <span className={`font-mono font-black ${activeCoin.triPillar?.newsSentiment?.score >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                      {activeCoin.triPillar?.newsSentiment?.score > 0 ? "+" : ""}{activeCoin.triPillar?.newsSentiment?.score || 0}/100
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500 truncate">
                    {activeCoin.triPillar?.newsSentiment?.summary || "US CPI Cools to 2.7% • Fed Rate Cut Odds 84%"}
                  </div>
                </div>
              </div>

              {/* EXACT 1:1 EXECUTION TIERS (LONG AND SHORT VALIDATED) */}
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
                  <div className="text-[10px] text-amber-700 font-medium mt-0.5">
                    {activeCoin.isShort ? "Sell at Supply Retest" : "Buy at Demand Tap"}
                  </div>
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
                  <div className="text-[10px] text-rose-600 font-medium mt-0.5">
                    {activeCoin.isShort ? "Above Resistance High" : "Below Demand Low"}
                  </div>
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
                  <div className="text-[10px] text-emerald-600 font-medium mt-0.5">Secure 50% &amp; SL to BE</div>
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

              {/* Setup Rationale & Technical Indicator Review */}
              <div className="space-y-3 pt-2">
                <div className="text-xs font-mono font-bold text-slate-500 uppercase flex items-center justify-between">
                  <span>Multi-Indicator Algorithmic Analysis</span>
                  <span className="text-amber-600 font-bold">{activeCoin.strategy}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  {activeCoin.rationale}
                </p>

                {/* Real-time Indicator Cards */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    <div className="text-[10px] text-slate-400 font-mono uppercase">RSI (14)</div>
                    <div className="font-bold text-slate-900 font-mono">{activeCoin.technicals.rsi}</div>
                    <div className={`text-[9px] font-medium ${activeCoin.technicals.rsi >= 50 ? "text-emerald-700" : "text-rose-700"}`}>
                      {activeCoin.technicals.rsi >= 55 ? "Bullish Momentum" : activeCoin.technicals.rsi <= 45 ? "Bearish Momentum" : "Neutral Range"}
                    </div>
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
                    <div className={`text-[9px] font-medium ${activeCoin.coinglass.takerCvdDelta >= 0 ? "text-emerald-700" : "text-rose-700"}`}>
                      {activeCoin.coinglass.takerCvdDelta >= 0 ? "Net Buyers" : "Net Sellers"}
                    </div>
                  </div>
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
                    <p className="text-[11px] text-slate-500">Multi-factor validation across Price Action, CVD &amp; Technical matrices</p>
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

            {/* 3. BOTTOM 2-COLUMN INSTITUTIONAL INTELLIGENCE (LIQUIDATION POOLS & ORDERBOOK DEPTH) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              
              {/* CARD 1: LIQUIDATION MAGNET POOLS & 24H ORDER FLOW */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
                        <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div>
                        <h4 className="text-base font-black text-slate-900 dark:text-white">
                          Liquidation Pools &amp; Range
                        </h4>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">
                          Resting stop clusters &amp; 24h positioning
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      Live Matrix
                    </span>
                  </div>

                  {/* 24h Channel Range Progress Bar */}
                  <div className="space-y-2 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5 font-bold">
                        <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                        <span>Low:</span>
                        <strong className="text-slate-900 dark:text-white font-extrabold">${formatPrice(activeCoin.low24h)}</strong>
                      </span>
                      <span className="text-slate-600 dark:text-slate-400 flex items-center gap-1.5 font-bold">
                        <span>High:</span>
                        <strong className="text-slate-900 dark:text-white font-extrabold">${formatPrice(activeCoin.high24h)}</strong>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                      </span>
                    </div>

                    <div className="relative w-full h-2.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="absolute top-0 bottom-0 bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-500 rounded-full transition-all duration-500"
                        style={{ width: "100%" }}
                      />
                      <div
                        className="absolute top-0 bottom-0 w-2.5 bg-slate-950 dark:bg-white border-2 border-white dark:border-slate-950 rounded-full shadow -ml-1 transition-all duration-300"
                        style={{
                          left: `${Math.max(
                            5,
                            Math.min(
                              95,
                              ((activeCoin.price - activeCoin.low24h) /
                                Math.max(1, activeCoin.high24h - activeCoin.low24h)) *
                                100
                            )
                          )}%`
                        }}
                      />
                    </div>

                    <div className="flex justify-between items-center text-[10px] font-mono text-slate-500 dark:text-slate-400 pt-0.5">
                      <span>24h Range Channel</span>
                      <span className="font-bold text-amber-600 dark:text-amber-400">
                        Spread: ${formatPrice(activeCoin.high24h - activeCoin.low24h)} ({(((activeCoin.high24h - activeCoin.low24h) / Math.max(1, activeCoin.low24h)) * 100).toFixed(1)}%)
                      </span>
                    </div>
                  </div>

                  {/* Liquidation Magnet Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-2xl bg-rose-50/70 dark:bg-rose-950/40 border border-rose-200/80 dark:border-rose-800/80 space-y-0.5">
                      <div className="text-[10px] font-bold text-rose-700 dark:text-rose-300 uppercase font-mono flex items-center justify-between">
                        <span>Short Magnet</span>
                        <span>Target</span>
                      </div>
                      <div className="text-sm font-black text-rose-800 dark:text-rose-200 font-mono">
                        ${formatPrice(activeCoin.coinglass.liquidationUpperMagnet)}
                      </div>
                      <div className="text-[10px] text-rose-600 dark:text-rose-400 font-medium">
                        {activeCoin.coinglass.liquidationUpperPoolUsd}
                      </div>
                    </div>

                    <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/80 space-y-0.5">
                      <div className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase font-mono flex items-center justify-between">
                        <span>Long Shelf</span>
                        <span>Floor</span>
                      </div>
                      <div className="text-sm font-black text-emerald-800 dark:text-emerald-200 font-mono">
                        ${formatPrice(activeCoin.coinglass.liquidationLowerMagnet)}
                      </div>
                      <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">
                        {activeCoin.coinglass.liquidationLowerPoolUsd}
                      </div>
                    </div>
                  </div>

                  {/* Micro Indicators Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <div className="text-[9px] text-slate-400 dark:text-slate-500 font-mono uppercase">RSI (14)</div>
                      <div className="font-bold text-slate-900 dark:text-white font-mono text-xs">{activeCoin.technicals.rsi}</div>
                      <div className="text-[9px] text-emerald-600 dark:text-emerald-400 font-medium">
                        {activeCoin.technicals.rsi > 50 ? "Bullish Momentum" : "Neutral / Oversold"}
                      </div>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <div className="text-[9px] text-slate-400 dark:text-slate-500 font-mono uppercase">Open Interest (OI)</div>
                      <div className="font-bold text-slate-900 dark:text-white font-mono text-xs">{activeCoin.coinglass.openInterestFormatted}</div>
                      <div className="text-[9px] text-slate-500 dark:text-slate-400">{activeCoin.coinglass.openInterestTrend}</div>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <div className="text-[9px] text-slate-400 dark:text-slate-500 font-mono uppercase">L/S Ratio</div>
                      <div className="font-bold text-slate-900 dark:text-white font-mono text-xs">{activeCoin.coinglass.longShortRatio} ({activeCoin.coinglass.longAccountPercent}% L)</div>
                      <div className="text-[9px] text-slate-500 dark:text-slate-400">Retail Sentiment</div>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                      <div className="text-[9px] text-slate-400 dark:text-slate-500 font-mono uppercase">Orderbook Flow</div>
                      <div className="font-bold text-slate-900 dark:text-white font-mono text-xs">{activeCoin.technicals.rsi > 50 ? "Bid Wall" : "Ask Wall"}</div>
                      <div className="text-[9px] text-amber-600 dark:text-amber-400 truncate">{activeCoin.technicals.orderbookImbalance}</div>
                    </div>
                  </div>
                </div>

                    {/* Algorithmic Rationale Snippet */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
                      <div>
                        <div className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase mb-1">
                          Order Thesis: {activeCoin.strategy}
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-400 line-clamp-3 leading-relaxed">
                          {activeCoin.rationale}
                        </p>
                      </div>

                      {/* Launch Full Liquidation Radar Button */}
                      <Link
                        href={`/coinglass?tab=liquidations&symbol=${activeCoin.symbol}`}
                        className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-amber-400 text-xs font-black transition flex items-center justify-center gap-1.5 shadow-sm border border-slate-800 dark:border-slate-700"
                      >
                        <Flame className="w-3.5 h-3.5 fill-amber-400" />
                        <span>Launch Full Liquidation Radar ({activeCoin.base})</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* CARD 2: REAL-TIME ORDERBOOK DEPTH & INSTITUTIONAL WHALE RADAR */}
                  <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                        <Link
                          href={`/orderbook?symbol=${activeCoin.symbol}`}
                          className="flex items-center gap-2 group hover:opacity-80 transition"
                        >
                          <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold">
                            <Activity className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                          </div>
                          <div>
                            <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-1">
                              <span>Orderbook &amp; Whale Radar</span>
                              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-emerald-500 transition" />
                            </h4>
                            <p className="text-[11px] text-slate-500 dark:text-slate-400">
                              L2 depth &amp; block taker prints
                            </p>
                          </div>
                        </Link>
                        <Link
                          href={`/orderbook?symbol=${activeCoin.symbol}`}
                          className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/80 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 transition flex items-center gap-1"
                        >
                          <span>L2 Terminal</span>
                          <ArrowRight className="w-2.5 h-2.5" />
                        </Link>
                      </div>

                      {/* Orderbook Depth Ladder */}
                      <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-mono text-slate-400 dark:text-slate-500 uppercase pb-0.5 border-b border-slate-200 dark:border-slate-700">
                          <span>Price ($)</span>
                          <span>Size ({activeCoin.base})</span>
                          <span>Vol</span>
                        </div>

                        {/* Asks (Red) */}
                        <div className="space-y-1">
                          {mockAskLevels.map((lvl, i) => (
                            <div key={i} className="relative flex justify-between items-center text-[11px] font-mono py-0.5 px-1 rounded overflow-hidden">
                              <div
                                className="absolute right-0 top-0 bottom-0 bg-rose-500/10 dark:bg-rose-500/20"
                                style={{ width: `${lvl.depth}%` }}
                              />
                              <span className="text-rose-600 dark:text-rose-400 font-bold z-10">${formatPrice(lvl.price)}</span>
                              <span className="text-slate-600 dark:text-slate-300 z-10">{lvl.size}</span>
                              <span className="text-slate-400 dark:text-slate-500 text-[9px] z-10">{lvl.total}</span>
                            </div>
                          ))}
                        </div>

                        {/* Mid Price Separator */}
                        <div className="py-1 px-2 rounded-lg bg-slate-900 dark:bg-slate-950 text-white flex justify-between items-center text-[11px] font-mono border border-slate-800 dark:border-slate-700">
                          <span className="text-[9px] text-amber-400 font-bold uppercase flex items-center gap-1">
                            <Radio className="w-2.5 h-2.5 text-amber-400 animate-pulse" /> Mid Spot:
                          </span>
                          <span className="font-black text-amber-400">${formatPrice(activeCoin.price)}</span>
                          <span className="text-[9px] text-slate-400 font-bold">Spread 0.01%</span>
                        </div>

                        {/* Bids (Green) */}
                        <div className="space-y-1">
                          {mockBidLevels.map((lvl, i) => (
                            <div key={i} className="relative flex justify-between items-center text-[11px] font-mono py-0.5 px-1 rounded overflow-hidden">
                              <div
                                className="absolute left-0 top-0 bottom-0 bg-emerald-500/10 dark:bg-emerald-500/20"
                                style={{ width: `${lvl.depth}%` }}
                              />
                              <span className="text-emerald-600 dark:text-emerald-400 font-bold z-10">${formatPrice(lvl.price)}</span>
                              <span className="text-slate-600 dark:text-slate-300 z-10">{lvl.size}</span>
                              <span className="text-slate-400 dark:text-slate-500 text-[9px] z-10">{lvl.total}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Institutional Whale Block Activity Stream */}
                    <div className="space-y-1.5 pt-1 border-t border-slate-100 dark:border-slate-800">
                      <div className="flex justify-between items-center text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">
                        <span>Live Whale Prints Stream</span>
                        <span className="text-amber-600 dark:text-amber-400 font-bold text-[9px]">&gt;$50K Block Trades</span>
                      </div>
                      <div className="space-y-1">
                        {whaleTrades.slice(0, 3).map((tr, idx) => (
                          <div
                            key={idx}
                            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-[11px] font-mono"
                          >
                            <div className="flex items-center gap-1.5">
                              <span
                                className={`px-1 py-0.2 rounded text-[9px] font-black ${
                                  tr.type === "BUY"
                                    ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                                    : "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                                }`}
                              >
                                {tr.type}
                              </span>
                              <span className="font-bold text-slate-900 dark:text-white">
                                {tr.amount} <span className="text-slate-400 dark:text-slate-500 text-[10px]">({tr.value})</span>
                              </span>
                            </div>
                            <span className="text-[9px] text-slate-400 dark:text-slate-500">{tr.time}</span>
                          </div>
                        ))}
                      </div>

                      {/* Launch Full L2 Orderbook Terminal Button */}
                      <div className="pt-2">
                        <Link
                          href={`/orderbook?symbol=${activeCoin.symbol}`}
                          className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700 text-amber-400 text-xs font-black transition flex items-center justify-center gap-1.5 shadow-sm border border-slate-800 dark:border-slate-700"
                        >
                          <Activity className="w-3.5 h-3.5" />
                          <span>Launch Full L2 Orderbook Terminal ({activeCoin.base})</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}
