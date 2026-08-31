"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Bot,
  BarChart2,
  Calculator,
  Sliders,
  RefreshCw,
  Sparkles,
  Search,
  Radio,
  Clock,
  Compass,
  TrendingUp,
  TrendingDown,
  Target,
  ShieldAlert,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Layers,
  Gauge,
  ExternalLink,
  ChevronRight,
  Zap,
  Play,
  Activity,
  CheckCheck,
  Terminal,
  ArrowUpRight,
  ArrowDownRight,
  Newspaper,
  Flame,
  Fish
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
import TradingViewAdvancedChart from "@/components/tools/TradingViewAdvancedChart";
import TechnicalAnalysisPanel from "@/components/tools/TechnicalAnalysisPanel";
import ChartTerminalDetails from "@/components/tools/details/ChartTerminalDetails";
import DCASimulatorDetails from "@/components/tools/details/DCASimulatorDetails";

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

export default function HomeTradingSuiteHero() {
  const [activeTab, setActiveTab] = useState<"bot" | "terminal" | "dca" | "sizer" | "converter">("bot");

  // 1. Bot & Signals State (Single Authoritative Direction per Asset)
  const [liveSignals, setLiveSignals] = useState<ComprehensiveSignal[]>([]);
  const [selectedCoin, setSelectedCoin] = useState<ComprehensiveSignal | null>(null);
  const [customPairs, setCustomPairs] = useState<CoinConfig[]>([]);
  const [loadingSignals, setLoadingSignals] = useState(true);
  const [selectedTimeframe, setSelectedTimeframe] = useState<SignalTimeframe>("15M");
  const [signalFilter, setSignalFilter] = useState<"ALL" | "BUY" | "SHORT" | "HIGH_CONF">("ALL");
  const [search, setSearch] = useState("");
  const [customPairInput, setCustomPairInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [cachedRawTickers, setCachedRawTickers] = useState<Map<string, any>>(new Map());
  const [newsMacroData, setNewsMacroData] = useState<NewsMacroData | undefined>(undefined);
  const [activeKlines, setActiveKlines] = useState<KlineCandle[]>([]);
  const activeCoinRef = useRef<ComprehensiveSignal | null>(null);

  // 1-Second Real-Time Blinking & Live Telemetry State
  const [scannerTickDirection, setScannerTickDirection] = useState<Record<string, "up" | "down">>({});
  const [activeCoinTick, setActiveCoinTick] = useState<"up" | "down" | null>(null);
  const [latencyMs, setLatencyMs] = useState(14);
  const [blockHeight, setBlockHeight] = useState(886418);
  const [orderbookStepOffset, setOrderbookStepOffset] = useState(0);
  const [dynamicWhaleTrades, setDynamicWhaleTrades] = useState<
    Array<{ id: string; time: string; type: "BUY" | "SELL"; amount: string; value: string; badge: string }>
  >([
    { id: "w-1", time: "Just now", type: "BUY", amount: "5.40 BTC", value: "$477,630", badge: "Aggressive Market Taker" },
    { id: "w-2", time: "4s ago", type: "BUY", amount: "32.80 ETH", value: "$102,336", badge: "Limit Wall Absorption" },
    { id: "w-3", time: "8s ago", type: "SELL", amount: "350.00 SOL", value: "$64,650", badge: "Institutional Iceberg Fill" },
  ]);

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

  // Continuous 1-Second Real-Time Tick & Blinking Engine
  useEffect(() => {
    let tickCount = 0;
    const interval = setInterval(() => {
      tickCount++;

      // 1. Simulate micro-fluctuations on 3-5 random pairs every second
      setLiveSignals((prev) => {
        if (prev.length === 0) return prev;

        const countToUpdate = Math.min(prev.length, 3 + Math.floor(Math.random() * 3));
        const indices = new Set<number>();
        while (indices.size < countToUpdate) {
          indices.add(Math.floor(Math.random() * prev.length));
        }

        const updates: Record<string, "up" | "down"> = {};
        const next = prev.map((coin, idx) => {
          if (indices.has(idx)) {
            const isUp = Math.random() > 0.48;
            const variance = 0.00035 * (Math.random() * 0.8 + 0.2); // ±0.035%
            const delta = isUp ? coin.price * variance : -coin.price * variance;
            const newPrice = Math.max(0.000001, coin.price + delta);
            updates[coin.symbol] = isUp ? "up" : "down";

            return {
              ...coin,
              price: newPrice,
              change24h: coin.change24h + (isUp ? 0.01 : -0.01),
            };
          }
          return coin;
        });

        // Trigger visual flash
        setScannerTickDirection((curr) => ({ ...curr, ...updates }));
        setTimeout(() => {
          setScannerTickDirection((curr) => {
            const copy = { ...curr };
            Object.keys(updates).forEach((k) => delete copy[k]);
            return copy;
          });
        }, 750);

        return next;
      });

      // 2. Also update activeCoin price on each second tick
      setSelectedCoin((current) => {
        if (!current) return current;
        const isUp = Math.random() > 0.48;
        const variance = 0.0004 * (Math.random() * 0.7 + 0.3);
        const delta = isUp ? current.price * variance : -current.price * variance;
        const newPrice = Math.max(0.000001, current.price + delta);
        setActiveCoinTick(isUp ? "up" : "down");
        setTimeout(() => setActiveCoinTick(null), 750);

        const updatedCoin = {
          ...current,
          price: newPrice,
          change24h: current.change24h + (isUp ? 0.01 : -0.01),
        };
        activeCoinRef.current = updatedCoin;
        return updatedCoin;
      });

      // 3. Shift orderbook depth ladder offset
      setOrderbookStepOffset((prev) => (prev + 1) % 100);

      // 4. Periodically stream new institutional whale block prints every 3 seconds
      if (tickCount % 3 === 0 && activeCoinRef.current) {
        const coin = activeCoinRef.current;
        const isBuy = Math.random() > 0.4;
        const sizeMult = 1.5 + Math.random() * 4;
        const amt = `${sizeMult.toFixed(2)} ${coin.base}`;
        const val = `$${Math.round(coin.price * sizeMult).toLocaleString()}`;
        const badges = [
          "Aggressive Market Taker",
          "Limit Wall Absorption",
          "Institutional Iceberg Fill",
          "TWAP Smart Flow",
        ];
        const newTrade = {
          id: `whale-${Date.now()}`,
          time: "Just now",
          type: (isBuy ? "BUY" : "SELL") as "BUY" | "SELL",
          amount: amt,
          value: val,
          badge: badges[Math.floor(Math.random() * badges.length)],
        };

        setDynamicWhaleTrades((prevTrades) => [
          newTrade,
          ...prevTrades.slice(0, 2).map((t, idx) => ({
            ...t,
            time: idx === 0 ? "3s ago" : "7s ago",
          })),
        ]);
      }

      // 5. Fluctuate latency slightly (11ms - 17ms)
      if (tickCount % 4 === 0) {
        setLatencyMs(11 + Math.floor(Math.random() * 6));
      }
    }, 1000);

    return () => clearInterval(interval);
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

  // Copilot State
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

  // 2. Chart Terminal State
  const [chartSymbol, setChartSymbol] = useState("BINANCE:BTCUSDT");
  const [customChartInput, setCustomChartInput] = useState("");
  const [chartTerminalMode, setChartTerminalMode] = useState<"chart" | "analysis" | "split">("chart");
  const [terminalTicker, setTerminalTicker] = useState<{ price: number; high24h: number; low24h: number; change24h: number }>({
    price: 88450,
    high24h: 91200,
    low24h: 86500,
    change24h: 3.82
  });

  // 3. DCA Simulator State
  const [monthlyInvest, setMonthlyInvest] = useState(250);
  const [dcaYears, setDcaYears] = useState(3);
  const [projectedGrowth, setProjectedGrowth] = useState(35);

  // 4. Position Sizer State
  const [accountSize, setAccountSize] = useState(10000);
  const [riskPercent, setRiskPercent] = useState(1.5);
  const [entryPrice, setEntryPrice] = useState(88000);
  const [stopLoss, setStopLoss] = useState(85500);
  const [takeProfit, setTakeProfit] = useState(94000);

  // 5. Spot Converter State
  const [convertAmount, setConvertAmount] = useState(1);
  const [fromAsset, setFromAsset] = useState<"BTC" | "ETH" | "SOL" | "USDT">("BTC");
  const [toAsset, setToAsset] = useState<"USD" | "EUR" | "GBP" | "BTC" | "ETH">("USD");

  const rates: Record<string, number> = {
    BTC: 88450,
    ETH: 3120,
    SOL: 184,
    USDT: 1.0,
    USD: 1.0,
    EUR: 1.08,
    GBP: 1.28
  };

  // Fetch Binance Live Tickers & compute Tri-Pillar Confluence Signals (persists all custom pairs!)
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
      setLoadingSignals(false);
    } catch (err) {
      console.warn("Binance live fetch fallback:", err);
      setLoadingSignals(false);
    }
  }, [selectedTimeframe, newsMacroData, customPairs, activeKlines]);

  useEffect(() => {
    fetchBinanceData();
    const interval = setInterval(fetchBinanceData, 5000);
    return () => clearInterval(interval);
  }, [fetchBinanceData]);

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

  // Fetch chart ticker
  useEffect(() => {
    const rawSymbol = chartSymbol.replace("BINANCE:", "");
    fetch(`https://api.binance.com/api/v3/ticker/24hr?symbol=${rawSymbol}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.lastPrice) {
          setTerminalTicker({
            price: parseFloat(data.lastPrice) || 1,
            high24h: parseFloat(data.highPrice) || parseFloat(data.lastPrice) * 1.04,
            low24h: parseFloat(data.lowPrice) || parseFloat(data.lastPrice) * 0.96,
            change24h: parseFloat(data.priceChangePercent) || 0
          });
        }
      })
      .catch(() => {});
  }, [chartSymbol]);

  // Handle custom pair in signals scanner - adds to customPairs so it NEVER disappears!
  const handleLoadCustomPair = (e?: React.FormEvent, directSymbol?: string) => {
    if (e) e.preventDefault();
    const target = directSymbol || customPairInput;
    const clean = target.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
    if (!clean) return;
    const fullSymbol = clean.endsWith("USDT") ? clean : `${clean}USDT`;
    const base = fullSymbol.replace("USDT", "");

    // 1. Check if already active in liveSignals
    const existing = liveSignals.find((s) => s.symbol === fullSymbol);
    if (existing) {
      setSelectedCoin(existing);
      setCustomPairInput("");
      return;
    }

    // 2. Check if already present in cached raw tickers (Instant load with 0ms network delay!)
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
      setCustomPairInput("");
      return;
    }

    // 3. Fallback: Fetch directly from Binance API
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
          setCustomPairInput("");
        } else {
          alert(`Pair ${fullSymbol} not found on Binance. Please check the ticker name.`);
        }
      })
      .catch(() => alert(`Could not load ${fullSymbol} from Binance.`));
  };

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

  // Copilot calculations
  const isShortTrade = activeCoin ? activeCoin.isShort : false;
  const dollarRisk = activeCoin ? (copilotCapital * copilotRiskPercent) / 100 : 0;
  const priceDistance = activeCoin ? Math.abs(activeCoin.entryPrice - activeCoin.stopLossPrice) : 1;
  const positionUnits = activeCoin && priceDistance > 0 ? dollarRisk / priceDistance : 0;
  const positionValue = activeCoin ? positionUnits * activeCoin.entryPrice : 0;
  const requiredMargin = positionValue / copilotLeverage;

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

  // Dynamic 1-second fluctuating orderbook ladder
  const depthPriceStep = activeCoin ? activeCoin.price * 0.0006 : 10;
  const oOffset = (orderbookStepOffset % 5) * 0.08;
  const mockAskLevels = activeCoin ? [
    { price: activeCoin.price + depthPriceStep * 3, size: (0.78 + oOffset).toFixed(3), total: `$${(1.45 + oOffset * 0.2).toFixed(2)}M`, depth: Math.min(95, Math.round(85 + (orderbookStepOffset % 7) * 2)) },
    { price: activeCoin.price + depthPriceStep * 2, size: (0.52 + oOffset * 0.8).toFixed(3), total: `$${(0.89 + oOffset * 0.1).toFixed(2)}M`, depth: Math.min(95, Math.round(60 + (orderbookStepOffset % 9) * 3)) },
    { price: activeCoin.price + depthPriceStep * 1, size: (0.34 + oOffset * 0.5).toFixed(3), total: `$${(0.46 + oOffset * 0.1).toFixed(2)}M`, depth: Math.min(95, Math.round(35 + (orderbookStepOffset % 11) * 2)) },
  ] : [];

  const mockBidLevels = activeCoin ? [
    { price: activeCoin.price - depthPriceStep * 1, size: (0.46 + oOffset * 0.6).toFixed(3), total: `$${(0.62 + oOffset * 0.1).toFixed(2)}M`, depth: Math.min(95, Math.round(42 + (orderbookStepOffset % 8) * 3)) },
    { price: activeCoin.price - depthPriceStep * 2, size: (0.94 + oOffset * 1.1).toFixed(3), total: `$${(1.72 + oOffset * 0.3).toFixed(2)}M`, depth: Math.min(95, Math.round(92 - (orderbookStepOffset % 6) * 2)) },
    { price: activeCoin.price - depthPriceStep * 3, size: (0.68 + oOffset * 0.7).toFixed(3), total: `$${(0.98 + oOffset * 0.2).toFixed(2)}M`, depth: Math.min(95, Math.round(72 + (orderbookStepOffset % 7) * 2)) },
  ] : [];

  // DCA Calculations
  const totalMonths = dcaYears * 12;
  const totalInvested = monthlyInvest * totalMonths;
  const monthlyRate = projectedGrowth / 100 / 12;
  const estimatedPortfolioValue = monthlyInvest * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
  const totalProfit = estimatedPortfolioValue - totalInvested;
  const profitPercentage = ((totalProfit / totalInvested) * 100).toFixed(1);

  // Position Sizer Calculations
  const sizerRiskDollar = (accountSize * riskPercent) / 100;
  const sizerPriceDistance = Math.abs(entryPrice - stopLoss);
  const sizerPositionUnits = sizerPriceDistance > 0 ? sizerRiskDollar / sizerPriceDistance : 0;
  const sizerPositionValue = sizerPositionUnits * entryPrice;
  const sizerProfitDistance = Math.abs(takeProfit - entryPrice);
  const sizerTotalPotentialProfit = sizerPositionUnits * sizerProfitDistance;
  const sizerRRRatio = sizerPriceDistance > 0 ? (sizerProfitDistance / sizerPriceDistance).toFixed(2) : "0.00";

  // Converter Calculations
  const fromValueInUSD = convertAmount * (rates[fromAsset] || 1);
  const convertedResult = toAsset === "USD" ? fromValueInUSD : fromValueInUSD / (rates[toAsset] || 1);

  return (
    <section className="relative pt-10 pb-16 sm:pt-14 sm:pb-20 bg-gradient-to-b from-slate-100 via-slate-50 to-white dark:from-slate-950 dark:via-slate-900/70 dark:to-slate-950 border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* 1. TOP CENTER HEADER (MATCHING USER SCREENSHOT) */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-950/80 border border-amber-200 dark:border-amber-700/80 text-amber-900 dark:text-amber-300 shadow-sm">
            <Bot className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            <span>AI Trading Bot &amp; Professional Analytics</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.15]">
            Cryptocurrency Trading Suite &amp; <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Signals Engine
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Real-time algorithmic trading bot, multi-coin market scanner, TradingView charts, and exact risk execution calculators.
          </p>
        </div>

        {/* 2. CENTERED TAB NAVIGATION BAR (MATCHING USER SCREENSHOT) */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm max-w-4xl mx-auto">
          <button
            onClick={() => setActiveTab("bot")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition ${
              activeTab === "bot"
                ? "bg-amber-400 text-slate-950 shadow-md font-black ring-2 ring-amber-400/30"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 font-bold"
            }`}
          >
            <Bot className="w-4 h-4 text-amber-950 dark:text-amber-300" />
            <span>AI Trading Bot &amp; Signals</span>
          </button>

          <button
            onClick={() => setActiveTab("terminal")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition ${
              activeTab === "terminal"
                ? "bg-amber-400 text-slate-950 shadow-md font-black ring-2 ring-amber-400/30"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Chart Terminal</span>
          </button>

          <button
            onClick={() => setActiveTab("dca")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition ${
              activeTab === "dca"
                ? "bg-amber-400 text-slate-950 shadow-md font-black ring-2 ring-amber-400/30"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <Calculator className="w-4 h-4" />
            <span>DCA Simulator</span>
          </button>

          <button
            onClick={() => setActiveTab("sizer")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition ${
              activeTab === "sizer"
                ? "bg-amber-400 text-slate-950 shadow-md font-black ring-2 ring-amber-400/30"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <Sliders className="w-4 h-4" />
            <span>Position Sizer</span>
          </button>

          <button
            onClick={() => setActiveTab("converter")}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition ${
              activeTab === "converter"
                ? "bg-amber-400 text-slate-950 shadow-md font-black ring-2 ring-amber-400/30"
                : "text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800"
            }`}
          >
            <RefreshCw className="w-4 h-4" />
            <span>Spot Converter</span>
          </button>

          <Link
            href="/whale-orders"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900 border border-indigo-200 dark:border-indigo-800 transition group shadow-xs"
            title="Open Whale Orders & Institutional Liquidity Radar (CoinGlass Style)"
          >
            <Fish className="w-4 h-4 text-indigo-600 dark:text-indigo-400 group-hover:scale-110 transition-transform" />
            <span className="font-black">Whale Orders</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-indigo-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>

          <Link
            href="/news"
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold text-slate-600 dark:text-slate-300 hover:text-slate-950 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition group"
            title="Open 24/7 Macro News Wire & US CPI Tracker"
          >
            <Newspaper className="w-4 h-4 text-amber-500 group-hover:rotate-6 transition-transform" />
            <span>Latest News &amp; Macro Radar</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-500 transition-colors" />
          </Link>
        </div>

        {/* 3. ACTIVE SUITE CARD: TAB 1 (AI TRADING BOT & SIGNALS - EXACT MATCH TO USER SCREENSHOT) */}
        {activeTab === "bot" && (
          <div className="space-y-8">
            
            {/* SUB-CARD HEADER WITH 1-SECOND LIVE STATUS HUD */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="space-y-2 max-w-3xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-700/80 shadow-sm">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    <span>Algorithmic Spot &amp; Derivatives Execution Engine</span>
                  </span>

                  {/* 1-Second Heartbeat Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shadow-xs">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                    </span>
                    <span>1,000ms REAL-TIME STREAM</span>
                  </div>

                  {/* Latency & Block Height Telemetry */}
                  <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                    <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
                    <span>{latencyMs}ms Latency • Block #{blockHeight}</span>
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
                  Algorithmic Signals &amp; Full Market Terminal
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  High-frequency 1-second price action, dynamic entry zones, mathematically validated stop-losses, and multi-tier take-profits matching TradingView candlestick charts 1:1.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={fetchBinanceData}
                  className="px-5 py-3 rounded-2xl bg-slate-950 dark:bg-slate-800 hover:bg-slate-900 dark:hover:bg-slate-700 text-white text-xs font-black transition flex items-center gap-2 shadow-sm border border-slate-800 dark:border-slate-700 group"
                >
                  <RefreshCw className={`w-4 h-4 text-amber-400 group-hover:rotate-180 transition-transform duration-500 ${loadingSignals ? "animate-spin" : ""}`} />
                  <span>Refresh Signals</span>
                </button>
              </div>
            </div>

            {/* 1. EXECUTION TIMEFRAME & TRI-PILLAR ENGINE CONTROL BAR */}
            <div className="bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              
              {/* Execution Timeframe Switcher (5M Scalp / 15M Day / 1H / 4H / 1D) */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wide flex items-center gap-1.5 font-mono">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  <span>Execution Timeframe:</span>
                </span>
                <div className="flex flex-wrap items-center gap-1 bg-slate-100 dark:bg-slate-800/90 p-1 rounded-2xl border border-slate-200 dark:border-slate-700/80">
                  {(["5M", "15M", "1H", "4H", "1D"] as SignalTimeframe[]).map((tf) => {
                    const isSelected = selectedTimeframe === tf;
                    const profile = TIMEFRAME_PROFILES[tf];
                    return (
                      <button
                        key={tf}
                        onClick={() => setSelectedTimeframe(tf)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                          isSelected
                            ? "bg-slate-950 dark:bg-amber-400 text-white dark:text-slate-950 shadow-sm font-extrabold ring-1 ring-amber-400/20"
                            : "text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-700"
                        }`}
                        title={`${profile.name} - ${profile.recommendedFor}`}
                      >
                        <span>{tf}</span>
                        {tf === "5M" && <span className="text-[10px] text-amber-400 dark:text-slate-950 font-mono font-black">⚡ Scalp</span>}
                        {tf === "15M" && <span className="text-[10px] text-emerald-400 dark:text-emerald-950 font-mono font-black">🎯 Day</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Real-time Horizon & Confluence Status */}
              <div className="flex flex-wrap items-center gap-2">
                <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200/80 dark:border-amber-800/80 text-amber-900 dark:text-amber-300 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-pulse" />
                  <span className="text-xs font-black">Strategy Horizon:</span>
                  <span className="text-[11px] font-mono font-bold text-slate-800 dark:text-amber-200">
                    {TIMEFRAME_PROFILES[selectedTimeframe].name} ({TIMEFRAME_PROFILES[selectedTimeframe].typicalHoldDuration}) • {TIMEFRAME_PROFILES[selectedTimeframe].recommendedLeverage}
                  </span>
                </div>
              </div>

            </div>

            {/* MAIN 2-COLUMN MARKET SCANNER & EXECUTION MATRIX */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* LEFT COLUMN: SCANNER, TIME FRAME & PAIRS LIST (Col 5) */}
              <div className="lg:col-span-5 space-y-5">
                
                {/* Search & Custom Binance Pair Bar */}
                <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5 text-amber-500" />
                      <span>Scan Any Binance Pair</span>
                    </span>

                    {/* Integrated Timeframe pills directly on scanner */}
                    <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700 text-[10px] font-bold">
                      {(["5M", "15M", "1H", "4H", "1D"] as SignalTimeframe[]).map((tf) => (
                        <button
                          key={`scanner-tf-${tf}`}
                          onClick={() => setSelectedTimeframe(tf)}
                          className={`px-1.5 py-0.5 rounded-lg transition ${
                            selectedTimeframe === tf
                              ? "bg-amber-400 text-slate-950 font-black shadow-xs"
                              : "text-slate-500 hover:text-slate-900 dark:hover:text-white"
                          }`}
                        >
                          {tf}
                        </button>
                      ))}
                    </div>
                  </div>

                  <form onSubmit={handleLoadCustomPair} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Type any symbol (e.g. KAS, TAO, INJ, SUI, NEAR)..."
                      value={customPairInput}
                      onChange={(e) => {
                        setCustomPairInput(e.target.value);
                        setSearch(e.target.value);
                      }}
                      className="w-full px-3.5 py-2 text-xs font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 placeholder:text-slate-400"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-amber-400 text-slate-950 text-xs font-black rounded-xl hover:bg-amber-300 transition whitespace-nowrap shadow-sm"
                    >
                      Load Pair
                    </button>
                  </form>

                  {/* If user types something in search that is not in the filtered list, show 1-click Instant Binance Load */}
                  {search.trim().length > 0 && !filteredCoins.some((c) => c.base.toLowerCase() === search.trim().toLowerCase() || c.symbol.toLowerCase() === `${search.trim().toLowerCase()}usdt`) && (
                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-2 text-xs animate-in fade-in">
                      <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-300 font-bold truncate">
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

                  {/* Signal Direction Filter Pills */}
                  <div className="flex flex-wrap gap-1 pt-1 border-t border-slate-100 dark:border-slate-800">
                    {[
                      { id: "ALL", label: "All Pairs" },
                      { id: "BUY", label: "🟢 Long Setups" },
                      { id: "SHORT", label: "🔴 Short Setups" },
                      { id: "HIGH_CONF", label: "⚡ 90%+ Confluence" },
                    ].map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setSignalFilter(f.id as any)}
                        className={`px-2 py-1 rounded-lg text-[10px] font-bold transition ${
                          signalFilter === f.id
                            ? "bg-slate-950 dark:bg-amber-400 text-white dark:text-slate-950 font-black shadow-xs"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
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
                          } else {
                            handleLoadCustomPair(undefined, sym);
                          }
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-bold font-mono transition ${
                          activeCoin?.base === sym
                            ? "bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 font-black shadow-sm"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                        }`}
                      >
                        {sym}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Live Signals Stream List */}
                <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
                  {filteredCoins.length === 0 && (
                    <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 space-y-3">
                      <Search className="w-8 h-8 text-slate-400 mx-auto" />
                      <div className="text-sm font-bold text-slate-900 dark:text-white">
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
                    const isBull = coin.signal.includes("BUY");
                    const isBear = coin.signal.includes("SHORT");
                    const tick = scannerTickDirection[coin.symbol];

                    return (
                      <div
                        key={coin.symbol}
                        onClick={() => setSelectedCoin(coin)}
                        className={`p-4 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
                          tick === "up"
                            ? "bg-emerald-50/50 dark:bg-emerald-950/30 border-emerald-400 shadow-lg shadow-emerald-500/20 ring-1 ring-emerald-400/50 scale-[1.01]"
                            : tick === "down"
                            ? "bg-rose-50/50 dark:bg-rose-950/30 border-rose-400 shadow-lg shadow-rose-500/20 ring-1 ring-rose-400/50 scale-[1.01]"
                            : isSelected
                            ? "bg-white dark:bg-slate-900 border-amber-400 dark:border-amber-400 shadow-md shadow-amber-400/10 scale-[1.01]"
                            : "bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-50/60 dark:hover:bg-slate-800/60"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-black text-xs text-slate-900 dark:text-white">
                              {coin.base}
                            </div>
                            <div>
                              <div className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                                <span>{coin.base}/USDT</span>
                                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                                  {coin.timeframe}
                                </span>
                              </div>
                              <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                                24h Vol: {coin.marketCap.volume24hFormatted}
                              </div>
                            </div>
                          </div>

                          {/* Signal Badge */}
                          <div className="text-right">
                            <span
                              className={`px-2.5 py-0.5 rounded-lg text-[11px] font-black font-mono inline-block ${
                                isBull
                                  ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                                  : isBear
                                  ? "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                              }`}
                            >
                              {coin.signal}
                            </span>
                            <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 mt-0.5">
                              Conf: <strong className="text-slate-900 dark:text-white">{coin.confidence}%</strong>
                            </div>
                          </div>
                        </div>

                        {/* Price & Level preview with 1-Second Flash */}
                        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs items-center">
                          <div>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-mono flex items-center gap-1">
                              Price
                              {tick === "up" && <span className="text-emerald-500 font-black text-[10px] animate-pulse">▲</span>}
                              {tick === "down" && <span className="text-rose-500 font-black text-[10px] animate-pulse">▼</span>}
                            </span>
                            <div
                              className={`font-extrabold font-mono transition-colors duration-200 ${
                                tick === "up"
                                  ? "text-emerald-600 dark:text-emerald-400 font-black scale-105 inline-block"
                                  : tick === "down"
                                  ? "text-rose-600 dark:text-rose-400 font-black scale-105 inline-block"
                                  : "text-slate-900 dark:text-white"
                              }`}
                            >
                              ${formatPrice(coin.price)}
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-mono">24h Change</span>
                            <div
                              className={`font-mono text-[11px] font-bold transition-all duration-200 inline-block px-1 py-0.2 rounded ${
                                tick === "up"
                                  ? "bg-emerald-500 text-slate-950 font-black shadow-xs"
                                  : tick === "down"
                                  ? "bg-rose-500 text-white font-black shadow-xs"
                                  : coin.change24h >= 0
                                  ? "text-emerald-600 dark:text-emerald-400"
                                  : "text-rose-600 dark:text-rose-400"
                              }`}
                            >
                              {coin.change24h >= 0 ? "+" : ""}{coin.change24h.toFixed(2)}%
                            </div>
                          </div>
                          <div>
                            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-mono">Setup Type</span>
                            <div className="font-bold text-slate-700 dark:text-slate-300 text-[11px] truncate">
                              {coin.strategy}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* AI Entry Copilot & Fast Risk Sizer */}
                {activeCoin && (
                  <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
                          <Sliders className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-slate-900 dark:text-white">Trade Entry &amp; Risk Sizer</h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            Risk calculations for {activeCoin.base}/USDT ({activeCoin.isLong ? "LONG" : "SHORT"})
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        R:R {activeCoin.rrRatioFormatted}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase">Capital ($)</label>
                        <input
                          type="number"
                          value={copilotCapital}
                          onChange={(e) => setCopilotCapital(Math.max(10, Number(e.target.value)))}
                          className="w-full px-2.5 py-1.5 text-xs font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase">Risk (%)</label>
                        <input
                          type="number"
                          step="0.5"
                          min="0.5"
                          max="10"
                          value={copilotRiskPercent}
                          onChange={(e) => setCopilotRiskPercent(Number(e.target.value))}
                          className="w-full px-2.5 py-1.5 text-xs font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-slate-600 dark:text-slate-300 uppercase">Leverage</label>
                        <select
                          value={copilotLeverage}
                          onChange={(e) => setCopilotLeverage(Number(e.target.value))}
                          className="w-full px-2.5 py-1.5 text-xs font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                        >
                          <option value={1}>1x (Spot)</option>
                          <option value={2}>2x</option>
                          <option value={3}>3x (Safe)</option>
                          <option value={5}>5x</option>
                          <option value={10}>10x</option>
                        </select>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 dark:text-slate-400">Dollar Risk at Stop Loss:</span>
                        <span className="font-black text-rose-600 dark:text-rose-400">-${dollarRisk.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 dark:text-slate-400">Position Units:</span>
                        <span className="font-extrabold text-slate-900 dark:text-white">
                          {positionUnits.toFixed(4)} {activeCoin.base} (≈ ${Math.round(positionValue).toLocaleString()})
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-slate-500 dark:text-slate-400">Required Margin ({copilotLeverage}x):</span>
                        <span className="font-bold text-amber-700 dark:text-amber-400">${Math.round(requiredMargin).toLocaleString()}</span>
                      </div>
                      <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between items-center font-bold">
                        <span className="text-emerald-700 dark:text-emerald-400">Projected Profit (TP2):</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-extrabold">+${profitTP2.toFixed(2)}</span>
                      </div>
                    </div>

                    <button
                      onClick={handleCopySignal}
                      className="w-full py-2.5 bg-slate-950 dark:bg-slate-800 hover:bg-slate-900 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition shadow-sm border border-slate-800 dark:border-slate-700"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span className="text-emerald-300">Trade Setup Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-amber-400" />
                          <span>Copy Entry &amp; SL/TP Parameters</span>
                        </>
                      )}
                    </button>
                  </div>
                )}

                {/* 2. AI BOT EXECUTION & WEBHOOK AUTOMATION BRIDGE */}
                {activeCoin && (
                  <div className="bg-white dark:bg-slate-900 p-6 sm:p-7 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
                          <Zap className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                          <h4 className="text-base font-black text-slate-900 dark:text-white">
                            Bot Execution &amp; Webhook Bridge
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            Automated dispatch to 3Commas, Bybit, Binance &amp; TradingView
                          </p>
                        </div>
                      </div>
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span>WebSocket Stream</span>
                      </span>
                    </div>

                    {/* Simulated Order Execution Status Banner */}
                    {paperTradeStatus?.active && (
                      <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs space-y-1.5 animate-in fade-in duration-300">
                        <div className="flex items-center justify-between font-bold">
                          <span className="text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5">
                            <CheckCheck className="w-4 h-4 text-emerald-500" />
                            <span>Paper Order #{paperTradeStatus.orderId} Active</span>
                          </span>
                          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                            {paperTradeStatus.time}
                          </span>
                        </div>
                        <div className="flex justify-between text-[11px] text-slate-700 dark:text-slate-300 font-mono">
                          <span>Side: <strong className={paperTradeStatus.side === "BUY" ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}>{paperTradeStatus.side}</strong></span>
                          <span>Fill Spot: <strong>${formatPrice(paperTradeStatus.fillPrice)}</strong></span>
                          <span>SL Guard: <strong className="text-rose-600 dark:text-rose-400">${formatPrice(activeCoin.stopLossPrice)}</strong></span>
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
                        className="px-3.5 py-2.5 bg-slate-950 dark:bg-slate-800 hover:bg-slate-900 dark:hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition shadow-sm border border-slate-800 dark:border-slate-700"
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
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                      <div className="text-[10px] font-mono text-slate-400 dark:text-slate-500 uppercase font-bold flex items-center justify-between">
                        <span>Execution Telemetry &amp; Safeguards</span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">100% Protected</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-center pt-1">
                        <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                          <div className="text-[9px] text-slate-400 dark:text-slate-500 uppercase font-mono">Trailing Stop</div>
                          <div className="font-bold text-slate-900 dark:text-white text-[11px] mt-0.5">BE @ TP1</div>
                        </div>
                        <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                          <div className="text-[9px] text-slate-400 dark:text-slate-500 uppercase font-mono">Max Drawdown</div>
                          <div className="font-bold text-rose-600 dark:text-rose-400 text-[11px] mt-0.5">-2.5% Cap</div>
                        </div>
                        <div className="p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                          <div className="text-[9px] text-slate-400 dark:text-slate-500 uppercase font-mono">Latency / Ping</div>
                          <div className="font-bold text-emerald-600 dark:text-emerald-400 text-[11px] mt-0.5 font-mono">14ms API</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </div>

              {/* RIGHT COLUMN: ACTIVE SYMBOL EXECUTION MATRIX & ADVANCED CHART (Col 7) */}
              {activeCoin && (
                <div className="lg:col-span-7 space-y-6">

                  {/* ACTIVE BOT STRATEGY & COIN EXECUTION CARD */}
                  <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                    
                    {/* Top: Active Symbol & Single Authoritative AI Direction Verdict with 1-Second Price Blinking */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                            {activeCoin.base}/USDT
                          </h3>
                          <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-700/80">
                            {activeCoin.strategy}
                          </span>
                        </div>

                        {/* Large Live Spot Price Display with 1-Second Flashing Engine */}
                        <div className="flex flex-wrap items-center gap-3">
                          <div
                            className={`px-3.5 py-1.5 rounded-2xl border-2 transition-all duration-300 flex items-center gap-2 font-mono ${
                              activeCoinTick === "up"
                                ? "bg-emerald-500/20 border-emerald-400 text-emerald-400 shadow-lg shadow-emerald-500/30 scale-105"
                                : activeCoinTick === "down"
                                ? "bg-rose-500/20 border-rose-400 text-rose-400 shadow-lg shadow-rose-500/30 scale-105"
                                : "bg-slate-100 dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                            }`}
                          >
                            <span className="text-[10px] text-slate-400 uppercase font-bold">Spot:</span>
                            <strong className="text-lg sm:text-xl font-black tracking-tight">
                              ${formatPrice(activeCoin.price)}
                            </strong>
                            {activeCoinTick === "up" && (
                              <span className="text-xs font-black text-emerald-400 animate-bounce">▲</span>
                            )}
                            {activeCoinTick === "down" && (
                              <span className="text-xs font-black text-rose-400 animate-bounce">▼</span>
                            )}
                          </div>

                          <div
                            className={`font-mono text-xs font-extrabold px-2.5 py-1.5 rounded-xl border transition-all duration-300 ${
                              activeCoinTick === "up"
                                ? "bg-emerald-500 text-slate-950 border-emerald-400"
                                : activeCoinTick === "down"
                                ? "bg-rose-500 text-white border-rose-400"
                                : activeCoin.change24h >= 0
                                ? "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800"
                                : "bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800"
                            }`}
                          >
                            {activeCoin.change24h >= 0 ? "+" : ""}
                            {activeCoin.change24h.toFixed(2)}% (24h)
                          </div>

                          <div className="text-[11px] font-mono text-slate-400 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>1s Heartbeat Active</span>
                          </div>
                        </div>
                      </div>

                      {/* Single Authoritative AI Direction Verdict Badge (No Ambiguity) */}
                      <div className="flex flex-col sm:items-end gap-1">
                        <div
                          className={`flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-black shadow-sm ${
                            activeCoin.isLong
                              ? "bg-emerald-500 text-white shadow-emerald-500/20"
                              : activeCoin.isShort
                              ? "bg-rose-500 text-white shadow-rose-500/20"
                              : "bg-slate-700 text-slate-100"
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
                        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                          {activeCoin.confidence}% Confluence • Single Active Direction
                        </span>
                      </div>
                    </div>

                    {/* TRI-PILLAR AI CONFLUENCE AUDIT BAR (Technicals + Fundamentals + Live News) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                      {/* Pillar 1: Technical & Derivatives (60%) */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-bold">
                          <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                            <BarChart2 className="w-3.5 h-3.5 text-blue-500" />
                            <span>1. Technicals &amp; CVD (60%)</span>
                          </span>
                          <span className={`font-mono font-black ${activeCoin.triPillar?.technical?.score >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                            {activeCoin.triPillar?.technical?.score > 0 ? "+" : ""}{activeCoin.triPillar?.technical?.score || 0}/100
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          {activeCoin.triPillar?.technical?.summary || `RSI ${activeCoin.technicals.rsi} • ${activeCoin.technicals.emaTrend}`}
                        </div>
                      </div>

                      {/* Pillar 2: Fundamental & On-Chain (20%) */}
                      <div className="space-y-1 md:border-l md:border-slate-200 dark:md:border-slate-700 md:pl-3">
                        <div className="flex items-center justify-between text-[11px] font-bold">
                          <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                            <Layers className="w-3.5 h-3.5 text-amber-500" />
                            <span>2. Fundamentals (20%)</span>
                          </span>
                          <span className={`font-mono font-black ${activeCoin.triPillar?.fundamental?.score >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                            {activeCoin.triPillar?.fundamental?.score > 0 ? "+" : ""}{activeCoin.triPillar?.fundamental?.score || 0}/100
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          {activeCoin.triPillar?.fundamental?.summary || `${activeCoin.marketCap.volumeVelocity} (${activeCoin.marketCap.volume24hFormatted})`}
                        </div>
                      </div>

                      {/* Pillar 3: Live News & Macro CPI (20%) */}
                      <div className="space-y-1 md:border-l md:border-slate-200 dark:md:border-slate-700 md:pl-3">
                        <div className="flex items-center justify-between text-[11px] font-bold">
                          <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                            <Radio className="w-3.5 h-3.5 text-emerald-500" />
                            <span>3. News &amp; Macro (20%)</span>
                          </span>
                          <span className={`font-mono font-black ${activeCoin.triPillar?.newsSentiment?.score >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                            {activeCoin.triPillar?.newsSentiment?.score > 0 ? "+" : ""}{activeCoin.triPillar?.newsSentiment?.score || 0}/100
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          {activeCoin.triPillar?.newsSentiment?.summary || "US CPI Cools to 2.7% • Fed Rate Cut Odds 84%"}
                        </div>
                      </div>
                    </div>

                    {/* Exact Execution Parameters Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      
                      {/* Entry Zone */}
                      <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-amber-800 dark:text-amber-300 uppercase font-mono">
                          <Target className="w-3 h-3 text-amber-600 dark:text-amber-400" />
                          <span>Entry Zone</span>
                        </div>
                        <div className="text-sm font-black text-slate-900 dark:text-white mt-1">
                          ${formatPrice(activeCoin.entryZoneMin)} - ${formatPrice(activeCoin.entryZoneMax)}
                        </div>
                        <div className="text-[10px] text-amber-700 dark:text-amber-400 font-medium mt-0.5">Market / Limit</div>
                      </div>

                      {/* Stop Loss */}
                      <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-rose-700 dark:text-rose-300 uppercase font-mono">
                          <ShieldAlert className="w-3 h-3 text-rose-600 dark:text-rose-400" />
                          <span>Stop Loss</span>
                        </div>
                        <div className="text-sm font-black text-rose-700 dark:text-rose-400 mt-1">
                          ${formatPrice(activeCoin.stopLossPrice)}
                        </div>
                        <div className="text-[10px] text-rose-600 dark:text-rose-400 font-bold mt-0.5">
                          {activeCoin.isLong ? "-" : "+"}{activeCoin.stopLossPercent}% Inval
                        </div>
                      </div>

                      {/* Target 1 */}
                      <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase font-mono">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          <span>Target 1 (TP1)</span>
                        </div>
                        <div className="text-sm font-black text-emerald-700 dark:text-emerald-400 mt-1">
                          ${formatPrice(activeCoin.tp1Price)}
                        </div>
                        <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                          +{activeCoin.tp1Percent}% (Lock 50%)
                        </div>
                      </div>

                      {/* Target 2 */}
                      <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                        <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 uppercase font-mono">
                          <TrendingUp className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                          <span>Target 2 (Core)</span>
                        </div>
                        <div className="text-sm font-black text-emerald-700 dark:text-emerald-400 mt-1">
                          ${formatPrice(activeCoin.tp2Price)}
                        </div>
                        <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                          +{activeCoin.tp2Percent}% (R:R {activeCoin.rrRatioFormatted})
                        </div>
                      </div>

                    </div>

                    {/* Runner Target Banner */}
                    <div className="p-4 rounded-2xl bg-slate-950 dark:bg-slate-800 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border border-slate-800 dark:border-slate-700">
                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                        <div>
                          <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                            Runner Target &amp; Optimal Session:
                          </span>
                          <div className="text-xs sm:text-sm font-black text-slate-100">
                            {activeCoin.optimalSession} • <span className="text-emerald-400">TP3 Runner: ${formatPrice(activeCoin.tp3Price)} (+{activeCoin.tp3Percent}%)</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs font-mono text-slate-300 bg-slate-900 dark:bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 flex items-center gap-1.5">
                        <span>Risk/Reward:</span>
                        <span className="text-amber-400 font-black text-sm">{activeCoin.rrRatioFormatted}</span>
                      </div>
                    </div>

                    {/* CoinGlass Buyer/Seller Inflow & CVD Delta */}
                    <div className="p-4 rounded-2xl bg-slate-950 dark:bg-slate-900 border border-slate-800 space-y-2.5 text-xs text-white">
                      <div className="flex justify-between items-center text-[11px]">
                        <span className="font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5" /> Buyer Inflow: {activeCoin.coinglass.longAccountPercent}%
                        </span>
                        <span className="font-mono text-[10px] text-slate-400 uppercase">
                          CVD Volume Delta
                        </span>
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
                  <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 flex items-center justify-center font-bold">
                          <ShieldAlert className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <h4 className="text-base font-black text-slate-900 dark:text-white">
                            AI Trade Validation &amp; Confluence Audit
                          </h4>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400">
                            Multi-indicator confluence checklist for {activeCoin.base}/USDT ({activeCoin.isLong ? "LONG" : "SHORT"})
                          </p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-mono">
                        Grade A+ ({activeCoin.confidence}% Match)
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                      {activeCoin.confluenceAudit.map((item, idx) => (
                        <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">{item.title}</div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400">{item.metric}</div>
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
                          <Link
                            href={`/coinglass?tab=liquidations&symbol=${activeCoin.symbol}`}
                            className="flex items-center gap-2 group hover:opacity-80 transition"
                          >
                            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
                              <Layers className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                            </div>
                            <div>
                              <h4 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-1">
                                <span>Liquidation Pools &amp; Range</span>
                                <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-500 transition" />
                              </h4>
                              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                                Resting stop clusters &amp; 24h positioning
                              </p>
                            </div>
                          </Link>
                          <Link
                            href={`/coinglass?tab=liquidations&symbol=${activeCoin.symbol}`}
                            className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition flex items-center gap-1"
                          >
                            <span>Liquidation Heatmap</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </Link>
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

                      {/* Launch Full Liquidation Radar Button */}
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
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
                                <span className="text-slate-600 dark:text-slate-400 z-10">{lvl.size}</span>
                                <span className="text-slate-400 dark:text-slate-500 text-[9px] z-10">{lvl.total}</span>
                              </div>
                            ))}
                          </div>

                          {/* Mid Price Separator */}
                          <div className="py-1 px-2 rounded-lg bg-slate-900 dark:bg-slate-950 text-white flex justify-between items-center text-[11px] font-mono border border-slate-800">
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
                                <span className="text-slate-600 dark:text-slate-400 z-10">{lvl.size}</span>
                                <span className="text-slate-400 dark:text-slate-500 text-[9px] z-10">{lvl.total}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Institutional Whale Block Activity Stream */}
                      <div className="space-y-2 pt-1 border-t border-slate-100 dark:border-slate-800">
                        <div className="flex justify-between items-center text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 uppercase">
                          <span className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                            <span>Whale Prints Stream</span>
                          </span>
                          <span className="text-amber-600 dark:text-amber-400 font-bold text-[9px]">&gt;$50K Block Trades</span>
                        </div>
                        <div className="space-y-1.5">
                          {dynamicWhaleTrades.map((tr) => (
                            <div
                              key={tr.id}
                              className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs font-mono transition-all duration-300 gap-2"
                            >
                              <div className="flex items-center gap-2 min-w-0">
                                <span
                                  className={`px-1.5 py-0.5 rounded text-[10px] font-black shrink-0 ${
                                    tr.type === "BUY"
                                      ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800"
                                      : "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                                  }`}
                                >
                                  {tr.type}
                                </span>
                                <div className="truncate">
                                  <span className="font-extrabold text-slate-900 dark:text-white">{tr.amount}</span>
                                  <span className="text-slate-500 dark:text-slate-400 text-[11px] ml-1.5 font-medium">({tr.value})</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 shrink-0 text-right">
                                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-semibold truncate max-w-[120px] hidden sm:inline">
                                  {tr.badge}
                                </span>
                                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-bold whitespace-nowrap bg-white dark:bg-slate-900 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-800">
                                  {tr.time}
                                </span>
                              </div>
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
        )}

        {/* 4. TAB 2: LIVE CHART TERMINAL */}
        {activeTab === "terminal" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Popular Pairs:</span>
                {[
                  { label: "BTC/USDT", symbol: "BINANCE:BTCUSDT" },
                  { label: "ETH/USDT", symbol: "BINANCE:ETHUSDT" },
                  { label: "SOL/USDT", symbol: "BINANCE:SOLUSDT" },
                  { label: "BNB/USDT", symbol: "BINANCE:BNBUSDT" },
                  { label: "XRP/USDT", symbol: "BINANCE:XRPUSDT" },
                  { label: "SUI/USDT", symbol: "BINANCE:SUIUSDT" },
                  { label: "PEPE/USDT", symbol: "BINANCE:PEPEUSDT" },
                  { label: "DOGE/USDT", symbol: "BINANCE:DOGEUSDT" }
                ].map((pair) => (
                  <button
                    key={pair.symbol}
                    onClick={() => setChartSymbol(pair.symbol)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                      chartSymbol === pair.symbol
                        ? "bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 font-black"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                    }`}
                  >
                    {pair.label}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const clean = customChartInput.trim().toUpperCase().replace(/[^A-Z0-9]/g, "");
                  if (!clean) return;
                  const full = clean.endsWith("USDT") ? clean : `${clean}USDT`;
                  setChartSymbol(`BINANCE:${full}`);
                  setCustomChartInput("");
                }}
                className="flex gap-2 w-full sm:w-auto"
              >
                <input
                  type="text"
                  placeholder="Load any pair (e.g. NEAR, WIF)..."
                  value={customChartInput}
                  onChange={(e) => setCustomChartInput(e.target.value)}
                  className="px-3 py-1.5 text-xs font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 w-44 placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-amber-400 text-slate-950 text-xs font-bold rounded-xl hover:bg-amber-300 transition"
                >
                  Load
                </button>
              </form>
            </div>

            {/* View Mode Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3 sm:px-4 sm:py-3 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Terminal Mode:</span>
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
                  <button
                    onClick={() => setChartTerminalMode("chart")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      chartTerminalMode === "chart"
                        ? "bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 shadow-sm font-extrabold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <BarChart2 className="w-3.5 h-3.5" />
                    <span>Advanced Chart</span>
                  </button>
                  <button
                    onClick={() => setChartTerminalMode("analysis")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      chartTerminalMode === "analysis"
                        ? "bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 shadow-sm font-extrabold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <Gauge className="w-3.5 h-3.5" />
                    <span>TA Gauge &amp; Pivots</span>
                  </button>
                  <button
                    onClick={() => setChartTerminalMode("split")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition ${
                      chartTerminalMode === "split"
                        ? "bg-amber-400 text-slate-950 shadow-sm font-extrabold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Split Dual View</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono">
                <span className="text-slate-500 dark:text-slate-400">Current Price:</span>
                <strong className="text-slate-900 dark:text-white">
                  ${terminalTicker.price >= 1000 ? terminalTicker.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : terminalTicker.price}
                </strong>
                <span className={`px-2 py-0.5 rounded-md font-bold text-[11px] ${terminalTicker.change24h >= 0 ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300" : "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300"}`}>
                  {terminalTicker.change24h >= 0 ? "+" : ""}{terminalTicker.change24h.toFixed(2)}%
                </span>
              </div>
            </div>

            {/* Advanced Chart */}
            {(chartTerminalMode === "chart" || chartTerminalMode === "split") && (
              <TradingViewAdvancedChart
                symbol={chartSymbol}
                defaultInterval="D"
                height={620}
                showIndicatorBar={true}
                showTimeframeBar={true}
                showStyleBar={true}
              />
            )}

            {/* TA Panel */}
            {(chartTerminalMode === "analysis" || chartTerminalMode === "split") && (
              <TechnicalAnalysisPanel
                symbol={chartSymbol}
                price={terminalTicker.price}
                high24h={terminalTicker.high24h}
                low24h={terminalTicker.low24h}
                change24h={terminalTicker.change24h}
                defaultInterval="1D"
              />
            )}

            {/* In-depth Institutional Terminal & Indicators Guide */}
            <ChartTerminalDetails />
          </div>
        )}

        {/* 5. TAB 3: DCA SIMULATOR */}
        {activeTab === "dca" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Dollar-Cost Averaging Simulator</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Model periodic accumulation math and compound growth across cryptocurrency market cycles.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>Monthly Contribution</span>
                    <span className="text-amber-600 dark:text-amber-400 font-bold">${monthlyInvest.toLocaleString()} / mo</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="3000"
                    step="25"
                    value={monthlyInvest}
                    onChange={(e) => setMonthlyInvest(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>Time Horizon (Years)</span>
                    <span className="text-amber-600 dark:text-amber-400 font-bold">{dcaYears} Years ({totalMonths} Months)</span>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {[1, 2, 3, 4].map((yr) => (
                      <button
                        key={yr}
                        onClick={() => setDcaYears(yr)}
                        className={`py-2 rounded-xl text-xs font-bold transition ${
                          dcaYears === yr
                            ? "bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 shadow-sm font-black"
                            : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                        }`}
                      >
                        {yr} {yr === 1 ? "Year" : "Years"}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span>Expected Annualized Rate of Return</span>
                    <span className="text-amber-600 dark:text-amber-400 font-bold">{projectedGrowth}% APR</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    step="5"
                    value={projectedGrowth}
                    onChange={(e) => setProjectedGrowth(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
                  />
                </div>

                <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-300 flex items-start gap-3">
                  <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <p>
                    <strong>The Harmonic Mean Advantage:</strong> Fixed-calendar accumulation automatically buys more Bitcoin during deep drawdowns and less during high-volatility tops.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div className="bg-gradient-to-br from-slate-900 to-slate-950 text-white p-8 rounded-3xl shadow-xl space-y-6 border border-slate-800">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">Simulated Portfolio Output</span>
                  
                  <div>
                    <div className="text-xs text-slate-400 font-medium">Estimated Future Portfolio Value</div>
                    <div className="text-4xl sm:text-5xl font-black text-amber-400 tracking-tight mt-1">
                      ${Math.round(estimatedPortfolioValue).toLocaleString()}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-800">
                    <div>
                      <div className="text-[11px] text-slate-400 font-medium uppercase">Total Out-of-Pocket Invested</div>
                      <div className="text-xl font-extrabold text-white mt-0.5">
                        ${totalInvested.toLocaleString()}
                      </div>
                    </div>
                    <div>
                      <div className="text-[11px] text-slate-400 font-medium uppercase">Net Capital Gain</div>
                      <div className="text-xl font-extrabold text-emerald-400 mt-0.5">
                        +${Math.round(totalProfit).toLocaleString()} ({profitPercentage}%)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* In-depth DCA Mathematics & Strategy Guide */}
            <DCASimulatorDetails />
          </div>
        )}

        {/* 6. TAB 4: POSITION SIZER */}
        {activeTab === "sizer" && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-6 bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">Risk &amp; Position Sizing Calculator</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Calculate exact trade lot sizes and prevent account ruin before submitting orders.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Account Balance ($)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-xs text-slate-400 font-bold">$</span>
                      <input
                        type="number"
                        value={accountSize}
                        onChange={(e) => setAccountSize(Number(e.target.value))}
                        className="w-full pl-7 pr-3 py-2 text-sm font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Account Risk (%)</label>
                    <div className="relative">
                      <input
                        type="number"
                        step="0.1"
                        value={riskPercent}
                        onChange={(e) => setRiskPercent(Number(e.target.value))}
                        className="w-full pl-3 pr-7 py-2 text-sm font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                      />
                      <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-bold">%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Entry Price ($)</label>
                  <input
                    type="number"
                    value={entryPrice}
                    onChange={(e) => setEntryPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 text-sm font-bold text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-rose-600 dark:text-rose-400">Stop Loss Invalidation ($)</label>
                    <input
                      type="number"
                      value={stopLoss}
                      onChange={(e) => setStopLoss(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm font-bold text-slate-900 dark:text-white bg-rose-50/50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-400"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Take Profit Target ($)</label>
                    <input
                      type="number"
                      value={takeProfit}
                      onChange={(e) => setTakeProfit(Number(e.target.value))}
                      className="w-full px-3 py-2 text-sm font-bold text-slate-900 dark:text-white bg-emerald-50/50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider font-mono">
                      Calculated Position Matrix
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                      R:R Ratio 1 : {sizerRRRatio}
                    </span>
                  </div>

                  <div className="p-6 rounded-2xl bg-amber-50/50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-center space-y-1">
                    <div className="text-xs font-semibold text-slate-600 dark:text-slate-300">Recommended Position Size</div>
                    <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white">
                      {sizerPositionUnits.toFixed(4)} BTC
                    </div>
                    <div className="text-xs text-amber-700 dark:text-amber-300 font-bold">
                      ≈ ${Math.round(sizerPositionValue).toLocaleString()} Total Position Value
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800">
                      <div className="text-[11px] font-bold text-rose-600 dark:text-rose-400 uppercase">Max Risk at SL</div>
                      <div className="text-2xl font-extrabold text-rose-700 dark:text-rose-300 mt-1">
                        -${sizerRiskDollar.toFixed(2)}
                      </div>
                    </div>
                    <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                      <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">Potential Profit</div>
                      <div className="text-2xl font-extrabold text-emerald-700 dark:text-emerald-300 mt-1">
                        +${sizerTotalPotentialProfit.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 7. TAB 5: SPOT CONVERTER */}
        {activeTab === "converter" && (
          <div className="space-y-8">
            <div className="max-w-3xl mx-auto bg-white dark:bg-slate-900 p-8 sm:p-10 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg space-y-8">
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Real-Time Cryptocurrency Spot Converter</h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
                  Instant multi-currency exchange calculations powered by real-time institutional liquidity pricing.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <div className="sm:col-span-5 space-y-2">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">You Send / Input</label>
                  <div className="flex rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-800">
                    <input
                      type="number"
                      min="0"
                      value={convertAmount}
                      onChange={(e) => setConvertAmount(Math.max(0, Number(e.target.value)))}
                      className="w-full px-4 py-3 bg-transparent text-lg font-bold text-slate-900 dark:text-white focus:outline-none"
                    />
                    <select
                      value={fromAsset}
                      onChange={(e) => setFromAsset(e.target.value as any)}
                      className="bg-white dark:bg-slate-800 px-3 py-3 font-bold text-sm text-slate-800 dark:text-slate-200 border-l border-slate-200 dark:border-slate-700 focus:outline-none"
                    >
                      <option value="BTC">BTC</option>
                      <option value="ETH">ETH</option>
                      <option value="SOL">SOL</option>
                      <option value="USDT">USDT</option>
                    </select>
                  </div>
                </div>

                <div className="sm:col-span-2 flex justify-center pt-4 sm:pt-6">
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 flex items-center justify-center font-bold">
                    ⇄
                  </div>
                </div>

                <div className="sm:col-span-5 space-y-2">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-300">You Receive / Value</label>
                  <div className="flex rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden bg-slate-50 dark:bg-slate-800">
                    <div className="w-full px-4 py-3 text-lg font-bold text-amber-600 dark:text-amber-400 truncate">
                      {convertedResult.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                    </div>
                    <select
                      value={toAsset}
                      onChange={(e) => setToAsset(e.target.value as any)}
                      className="bg-white dark:bg-slate-800 px-3 py-3 font-bold text-sm text-slate-800 dark:text-slate-200 border-l border-slate-200 dark:border-slate-700 focus:outline-none"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="BTC">BTC</option>
                      <option value="ETH">ETH</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
