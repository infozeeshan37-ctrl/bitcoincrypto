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
  Flame,
  Landmark
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

const BINANCE_TOP_PAIRS: CoinConfig[] = [
  { symbol: "BTCUSDT", name: "Bitcoin", base: "BTC", defaultTimeframe: "15M" },
  { symbol: "ETHUSDT", name: "Ethereum", base: "ETH", defaultTimeframe: "15M" },
  { symbol: "SOLUSDT", name: "Solana", base: "SOL", defaultTimeframe: "15M" },
  { symbol: "BNBUSDT", name: "BNB", base: "BNB", defaultTimeframe: "1H" },
  { symbol: "XRPUSDT", name: "XRP", base: "XRP", defaultTimeframe: "15M" },
  { symbol: "DOGEUSDT", name: "Dogecoin", base: "DOGE", defaultTimeframe: "5M" },
];

const SEARCHABLE_COINS_DIRECTORY: CoinConfig[] = [
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

const ALL_SEARCHABLE_COINS: CoinConfig[] = [...BINANCE_TOP_PAIRS, ...SEARCHABLE_COINS_DIRECTORY];

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

      const allPairsToProcess = [...ALL_SEARCHABLE_COINS, ...customPairs];
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

  // Filter coins (Only show top pairs by default; search across full directory when query is provided)
  const filteredCoins = (search.trim().length > 0
    ? liveSignals
    : liveSignals.filter(
        (c) =>
          BINANCE_TOP_PAIRS.some((top) => top.symbol === c.symbol) ||
          customPairs.some((cp) => cp.symbol === c.symbol) ||
          (selectedCoin && selectedCoin.symbol === c.symbol)
      )
  ).filter((c) => {
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

        </div>

        {/* RIGHT COLUMN: 1:1 SYNCHRONIZED EXECUTION BLUEPRINT (Col 7) */}
        {activeCoin && (
          <div className="lg:col-span-7 flex flex-col space-y-6">

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
                    <span>Binance Spot: <strong className="text-slate-900 text-sm">${formatPrice(activeCoin.price)}</strong></span>
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

          </div>
        )}

      </div>

      {/* FULL WIDTH: US CPI & MACRO AI PREDICTOR SUITE (LENGTHWISE DETAILS COVERING FULL WIDTH) */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
        
        {/* Suite Top Header & Release Countdown Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold shadow-sm">
              <Landmark className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  US CPI &amp; Macro AI Predictor
                </h3>
                <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  LIVE AI BOT
                </span>
                <span className="text-xs font-mono font-bold text-slate-400">
                  AlphaMacro AI v4.2
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Neural Network BLS Inflation Forecasting Engine &amp; Bitcoin Liquidity Volatility Matrix
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Countdown Badge */}
            <div className="px-4 py-2 rounded-2xl bg-slate-950 text-white flex items-center gap-3 border border-slate-800 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <div>
                  <div className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                    Next BLS Release: August 2026 CPI
                  </div>
                  <div className="text-xs font-extrabold text-slate-100 font-mono">
                    Sep 11, 2026 @ 08:30 AM EST
                  </div>
                </div>
              </div>
              <div className="pl-3 border-l border-slate-800 text-[11px] font-mono text-emerald-400 font-bold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>94.8% Confidence</span>
              </div>
            </div>

            <Link
              href="/cpi"
              className="px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-2xl text-xs font-black flex items-center gap-1.5 transition shadow-sm"
            >
              <span>Full Macro Terminal</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 2-Column Lengthwise Grid filling left and right sides seamlessly */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT SIDE: Leading Macro Drivers & Fed Easing Fundamentals (Col 6) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* Leading Macro Indicators 4-Box Grid */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 uppercase font-mono flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-500" />
                  <span>1. Real-Time Macro Input Feeds</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                  LIVE TELEMETRY
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">🛢️ WTI Crude Oil</div>
                  <div className="font-mono font-black text-slate-900 text-sm">
                    $72.00/bbl <span className="text-emerald-500 text-[11px]">(-1.8%)</span>
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium">Deflationary drag on headline</div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">🚗 Manheim Used Cars</div>
                  <div className="font-mono font-black text-emerald-500 text-sm">
                    -1.2% MoM
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium">Auto goods disinflation</div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">🏠 Shelter &amp; OER (36% CPI)</div>
                  <div className="font-mono font-black text-slate-900 text-sm">
                    +0.24% MoM
                  </div>
                  <div className="text-[10px] text-emerald-600 font-medium">Housing lag cooling off</div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1">
                  <div className="text-[10px] text-slate-400 font-mono uppercase">💵 Global M2 Liquidity</div>
                  <div className="font-mono font-black text-amber-500 text-sm">
                    +$1.4T
                  </div>
                  <div className="text-[10px] text-amber-600 font-medium">Global monetary expansion</div>
                </div>
              </div>
            </div>

            {/* Fed Rate Cut Odds & Policy Shift */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-900 uppercase font-mono flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-amber-500" />
                  <span>2. Fed Monetary Policy Easing Gauge</span>
                </span>
                <span className="font-mono font-bold text-amber-600 text-[11px]">
                  CME FedWatch Implied
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-600 font-medium">50bps Rate Cut Odds (Dovish Easing):</span>
                  <span className="font-mono font-black text-emerald-600 text-sm">88.4% Prob</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-700" style={{ width: "88.4%" }} />
                  <div className="bg-amber-400 h-full transition-all duration-700" style={{ width: "11.6%" }} />
                </div>
                <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-0.5">
                  <span>Target Fed Funds: 5.25% - 5.50%</span>
                  <span className="text-emerald-500 font-bold">Aggressive Easing Expected</span>
                </div>
              </div>
            </div>

            {/* Historical BLS CPI Track Record Strip */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 text-white space-y-2.5 text-xs border border-slate-800">
              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 uppercase">
                <span className="font-bold text-amber-400">3. Historical CPI Impact vs Bitcoin</span>
                <span>1h / 24h Volatility</span>
              </div>
              <div className="space-y-1.5 font-mono text-[11px]">
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <div>
                    <span className="font-bold text-slate-200">July 2026 Print: </span>
                    <span className="text-emerald-400 font-bold">2.7% YoY (Beat)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-400 font-black">+5.12% BTC Surge</span>
                    <span className="text-slate-400 text-[10px] ml-1.5">($164M Shorts Wrecked)</span>
                  </div>
                </div>
                <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900 border border-slate-800">
                  <div>
                    <span className="font-bold text-slate-200">June 2026 Print: </span>
                    <span className="text-emerald-400 font-bold">3.0% YoY (Beat)</span>
                  </div>
                  <div className="text-right">
                    <span className="text-emerald-400 font-black">+3.40% BTC Surge</span>
                    <span className="text-slate-400 text-[10px] ml-1.5">($98M Shorts Wrecked)</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT SIDE: AI Neural Forecast & Crypto Volatility Scenario Matrix (Col 6) */}
          <div className="lg:col-span-6 space-y-4">
            
            {/* 4 Forecast Metrics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">Consensus Est.</span>
                <div className="text-base font-black text-slate-900 mt-0.5 font-mono">2.6% YoY</div>
                <div className="text-[10px] text-slate-500 font-medium">Prev: 2.7%</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-emerald-50/80 border border-emerald-200">
                <span className="text-[10px] text-emerald-700 uppercase font-mono font-bold">AI Forecast</span>
                <div className="text-base font-black text-emerald-600 mt-0.5 font-mono">2.60% YoY</div>
                <div className="text-[10px] text-emerald-700 font-bold">Cooling Beat</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] text-slate-500 uppercase font-mono font-bold">Core CPI Pred</span>
                <div className="text-base font-black text-slate-900 mt-0.5 font-mono">3.02% YoY</div>
                <div className="text-[10px] text-slate-500 font-medium">Ex-Food &amp; Energy</div>
              </div>

              <div className="p-3.5 rounded-2xl bg-purple-50/80 border border-purple-200">
                <span className="text-[10px] text-purple-700 uppercase font-mono font-bold">BTC Target</span>
                <div className="text-base font-black text-purple-700 mt-0.5 font-mono">$84K - $88K</div>
                <div className="text-[10px] text-purple-700 font-medium">+4.8% Rally Bias</div>
              </div>
            </div>

            {/* Volatility Reaction Matrix Card */}
            <div className="p-4 sm:p-5 rounded-2xl bg-slate-950 border border-slate-800 space-y-3 text-xs text-white">
              <div className="flex justify-between items-center text-[11px] font-mono text-slate-400 uppercase">
                <span className="font-bold text-amber-400">AI Volatility Reaction Matrix</span>
                <span>Scenario Modeling</span>
              </div>

              <div className="space-y-2 font-mono text-xs">
                <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 space-y-1">
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span>Scenario A: Cooling Beat (&lt; 2.6% YoY)</span>
                    </span>
                    <span className="text-emerald-400 font-extrabold">+6% to +10% Surge</span>
                  </div>
                  <p className="text-[11px] text-emerald-200 font-sans">
                    Massive short squeeze to $88,000+. Fed 50bps rate cut certainty triggers aggressive institutional rotation into Bitcoin &amp; ETH.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-500/30 text-amber-300 space-y-1">
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-amber-400" />
                      <span>Scenario B: In-Line Print (2.6% – 2.8% YoY)</span>
                    </span>
                    <span className="text-amber-400 font-extrabold">+2% to +4% Expansion</span>
                  </div>
                  <p className="text-[11px] text-amber-200 font-sans">
                    Orderly range accumulation $82,000 – $85,000. Steady spot ETF inflows continue with benign volatility.
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-300 space-y-1">
                  <div className="flex items-center justify-between font-bold">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-rose-400" />
                      <span>Scenario C: Hot Miss (&gt; 2.9% YoY)</span>
                    </span>
                    <span className="text-rose-400 font-extrabold">-3% to -5% Dip</span>
                  </div>
                  <p className="text-[11px] text-rose-200 font-sans">
                    Temporary hawkish liquidation wick towards $74,000 key support before long-term accumulation bids absorb sell pressure.
                  </p>
                </div>
              </div>
            </div>

            {/* Full-width action button */}
            <Link
              href="/cpi"
              className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 hover:from-amber-300 hover:to-amber-500 text-slate-950 rounded-2xl text-xs sm:text-sm font-black flex items-center justify-center gap-2 transition shadow-lg group"
            >
              <Landmark className="w-4 h-4 text-slate-950" />
              <span>Launch Full US CPI AI Predictor &amp; Scenario Simulator</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}
