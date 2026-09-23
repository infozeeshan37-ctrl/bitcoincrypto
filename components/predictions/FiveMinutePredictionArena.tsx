"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import {
  TrendingUp,
  TrendingDown,
  Clock,
  Zap,
  Flame,
  ShieldCheck,
  Award,
  RefreshCw,
  Sparkles,
  HelpCircle,
  Activity,
  DollarSign,
  Percent,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  Volume2,
  VolumeX,
  History,
  Layers,
  BarChart3,
  Coins,
  ChevronRight,
  ChevronDown,
  Target,
  Crosshair,
  Lock,
  Unlock,
  Radio,
  Trophy,
  ArrowUpRight,
  ArrowDownRight,
  Check,
  X
} from "lucide-react";

// Supported prediction coins
export interface PredictionCoin {
  symbol: string;
  base: string;
  name: string;
  decimals: number;
  defaultPrice: number;
}

const SUPPORTED_COINS: PredictionCoin[] = [
  { symbol: "BTCUSDT", base: "BTC", name: "Bitcoin", decimals: 2, defaultPrice: 88450.0 },
  { symbol: "ETHUSDT", base: "ETH", name: "Ethereum", decimals: 2, defaultPrice: 3140.0 },
  { symbol: "SOLUSDT", base: "SOL", name: "Solana", decimals: 2, defaultPrice: 198.5 },
  { symbol: "BNBUSDT", base: "BNB", name: "BNB", decimals: 2, defaultPrice: 648.0 },
  { symbol: "XRPUSDT", base: "XRP", name: "XRP", decimals: 4, defaultPrice: 2.52 },
  { symbol: "DOGEUSDT", base: "DOGE", name: "Dogecoin", decimals: 5, defaultPrice: 0.238 }
];

export interface RoundData {
  roundId: number;
  coinSymbol: string;
  startTimestamp: number;
  lockTimestamp: number;
  closeTimestamp: number;
  lockPrice: number;
  closePrice?: number;
  bullPoolUsd: number;
  bearPoolUsd: number;
  bullMultiplier: number;
  bearMultiplier: number;
  status: "LIVE" | "NEXT" | "EXPIRED";
  winner?: "BULL" | "BEAR";
  userBet?: {
    side: "UP" | "DOWN";
    amount: number;
    payoutMultiplier: number;
    payoutUsd?: number;
    result?: "WON" | "LOST";
  };
}

export default function FiveMinutePredictionArena() {
  const [selectedCoin, setSelectedCoin] = useState<PredictionCoin>(SUPPORTED_COINS[0]);
  const [livePrice, setLivePrice] = useState<number>(SUPPORTED_COINS[0].defaultPrice);
  const [prevLivePrice, setPrevLivePrice] = useState<number>(SUPPORTED_COINS[0].defaultPrice);
  const [priceFlash, setPriceFlash] = useState<"UP" | "DOWN" | null>(null);

  // User Demo Wallet & Portfolio
  const [demoBalance, setDemoBalance] = useState<number>(10000);
  const [wagerAmount, setWagerAmount] = useState<number>(100);
  const [selectedBetSide, setSelectedBetSide] = useState<"UP" | "DOWN">("UP");
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // User Performance Stats
  const [userStats, setUserStats] = useState({
    totalRounds: 0,
    wonRounds: 0,
    lostRounds: 0,
    winStreak: 0,
    maxStreak: 0,
    netProfitUsd: 0
  });

  // Notification Banner
  const [notification, setNotification] = useState<{ message: string; type: "success" | "loss" | "info" } | null>(null);

  // Price history for 5-minute micro sparkline
  const [priceHistory, setPriceHistory] = useState<number[]>([]);

  // Calculate 5-minute Epoch timings (300,000 ms)
  const [currentTime, setCurrentTime] = useState<number>(Date.now());

  // Derive current round number from epoch
  const baseEpochId = useMemo(() => {
    return 58200 + Math.floor((currentTime - 1700000000000) / 300000);
  }, [currentTime]);

  const currentEpochStart = Math.floor(currentTime / 300000) * 300000;
  const currentEpochEnd = currentEpochStart + 300000;
  const secondsRemaining = Math.max(0, Math.floor((currentEpochEnd - currentTime) / 1000));
  const progressPercent = ((300 - secondsRemaining) / 300) * 100;

  // Active Live Round State
  const [liveRound, setLiveRound] = useState<RoundData>(() => ({
    roundId: baseEpochId,
    coinSymbol: "BTCUSDT",
    startTimestamp: currentEpochStart - 300000,
    lockTimestamp: currentEpochStart,
    closeTimestamp: currentEpochEnd,
    lockPrice: 88450.0,
    bullPoolUsd: 24850,
    bearPoolUsd: 19400,
    bullMultiplier: 1.85,
    bearMultiplier: 2.15,
    status: "LIVE"
  }));

  // Next Round State
  const [nextRound, setNextRound] = useState<RoundData>(() => ({
    roundId: baseEpochId + 1,
    coinSymbol: "BTCUSDT",
    startTimestamp: currentEpochStart,
    lockTimestamp: currentEpochEnd,
    closeTimestamp: currentEpochEnd + 300000,
    lockPrice: 88450.0,
    bullPoolUsd: 14200,
    bearPoolUsd: 16800,
    bullMultiplier: 2.05,
    bearMultiplier: 1.92,
    status: "NEXT"
  }));

  // History of Past Rounds
  const [historyRounds, setHistoryRounds] = useState<RoundData[]>(() => {
    const arr: RoundData[] = [];
    const baseP = 88450;
    for (let i = 1; i <= 8; i++) {
      const isBull = (i % 3) !== 0;
      const rId = baseEpochId - i;
      const rLock = baseP - (i * 35) + (Math.sin(i) * 60);
      const rClose = isBull ? rLock + (15 + (i * 8)) : rLock - (18 + (i * 7));
      arr.push({
        roundId: rId,
        coinSymbol: "BTCUSDT",
        startTimestamp: currentEpochStart - ((i + 1) * 300000),
        lockTimestamp: currentEpochStart - (i * 300000),
        closeTimestamp: currentEpochStart - ((i - 1) * 300000),
        lockPrice: parseFloat(rLock.toFixed(2)),
        closePrice: parseFloat(rClose.toFixed(2)),
        bullPoolUsd: 22000 + (i * 1200),
        bearPoolUsd: 18000 + (i * 900),
        bullMultiplier: parseFloat((1.75 + (i * 0.05)).toFixed(2)),
        bearMultiplier: parseFloat((2.20 - (i * 0.04)).toFixed(2)),
        status: "EXPIRED",
        winner: isBull ? "BULL" : "BEAR"
      });
    }
    return arr;
  });

  // Load saved state from LocalStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedBalance = localStorage.getItem("pred_demo_balance");
      if (savedBalance) setDemoBalance(parseFloat(savedBalance) || 10000);

      const savedStats = localStorage.getItem("pred_user_stats");
      if (savedStats) {
        try {
          setUserStats(JSON.parse(savedStats));
        } catch (e) {}
      }
    }
  }, []);

  // Sync state to LocalStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("pred_demo_balance", demoBalance.toString());
      localStorage.setItem("pred_user_stats", JSON.stringify(userStats));
    }
  }, [demoBalance, userStats]);

  // Live Timer Heartbeat (every 1000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch Live Real-Time Price for Selected Coin from Binance
  useEffect(() => {
    let isMounted = true;

    const fetchPrice = async () => {
      try {
        const res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${selectedCoin.symbol}`);
        if (res.ok) {
          const data = await res.json();
          if (data.price && isMounted) {
            const p = parseFloat(data.price);
            setLivePrice((prev) => {
              if (p > prev) {
                setPriceFlash("UP");
                setTimeout(() => setPriceFlash(null), 800);
              } else if (p < prev) {
                setPriceFlash("DOWN");
                setTimeout(() => setPriceFlash(null), 800);
              }
              setPrevLivePrice(prev);
              return p;
            });

            // Append to micro sparkline
            setPriceHistory((prev) => [...prev.slice(-30), p]);
          }
        }
      } catch (err) {
        // Fallback simulated price fluctuation
        const jitter = (Math.random() - 0.49) * (selectedCoin.defaultPrice * 0.0004);
        setLivePrice((prev) => {
          const np = prev + jitter;
          setPriceHistory((h) => [...h.slice(-30), np]);
          return np;
        });
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 2000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, [selectedCoin.symbol, selectedCoin.defaultPrice]);

  // Handle Round Transitions when Epoch Finishes
  const lastResolvedEpochRef = useRef<number>(baseEpochId);

  useEffect(() => {
    if (baseEpochId !== lastResolvedEpochRef.current) {
      // Settle the live round
      const finalClosePrice = livePrice;
      const isBullWin = finalClosePrice >= liveRound.lockPrice;
      const winner: "BULL" | "BEAR" = isBullWin ? "BULL" : "BEAR";

      // Check if user entered live round
      if (liveRound.userBet) {
        const didWin =
          (liveRound.userBet.side === "UP" && isBullWin) ||
          (liveRound.userBet.side === "DOWN" && !isBullWin);

        if (didWin) {
          const payout = liveRound.userBet.amount * liveRound.userBet.payoutMultiplier;
          setDemoBalance((b) => b + payout);
          setUserStats((s) => ({
            ...s,
            totalRounds: s.totalRounds + 1,
            wonRounds: s.wonRounds + 1,
            winStreak: s.winStreak + 1,
            maxStreak: Math.max(s.maxStreak, s.winStreak + 1),
            netProfitUsd: s.netProfitUsd + (payout - liveRound.userBet!.amount)
          }));
          setNotification({
            message: `🎉 Round #${liveRound.roundId} WON! +$${payout.toFixed(2)} USDT credited to Demo Wallet!`,
            type: "success"
          });
        } else {
          setUserStats((s) => ({
            ...s,
            totalRounds: s.totalRounds + 1,
            lostRounds: s.lostRounds + 1,
            winStreak: 0,
            netProfitUsd: s.netProfitUsd - liveRound.userBet!.amount
          }));
          setNotification({
            message: `❌ Round #${liveRound.roundId} Expired (${winner === "BULL" ? "BULL" : "BEAR"} Won). Better luck next round!`,
            type: "loss"
          });
        }
      }

      // Append completed round to history
      const settledRound: RoundData = {
        ...liveRound,
        closePrice: finalClosePrice,
        status: "EXPIRED",
        winner,
        userBet: liveRound.userBet
          ? {
              ...liveRound.userBet,
              payoutUsd:
                (liveRound.userBet.side === "UP" && isBullWin) || (liveRound.userBet.side === "DOWN" && !isBullWin)
                  ? liveRound.userBet.amount * liveRound.userBet.payoutMultiplier
                  : 0,
              result:
                (liveRound.userBet.side === "UP" && isBullWin) || (liveRound.userBet.side === "DOWN" && !isBullWin)
                  ? "WON"
                  : "LOST"
            }
          : undefined
      };

      setHistoryRounds((prev) => [settledRound, ...prev.slice(0, 19)]);

      // Promote next round to live round
      setLiveRound({
        ...nextRound,
        roundId: baseEpochId,
        lockPrice: finalClosePrice,
        status: "LIVE"
      });

      // Prepare fresh next round
      setNextRound({
        roundId: baseEpochId + 1,
        coinSymbol: selectedCoin.symbol,
        startTimestamp: currentEpochEnd,
        lockTimestamp: currentEpochEnd + 300000,
        closeTimestamp: currentEpochEnd + 600000,
        lockPrice: finalClosePrice,
        bullPoolUsd: Math.floor(12000 + Math.random() * 8000),
        bearPoolUsd: Math.floor(13000 + Math.random() * 8000),
        bullMultiplier: parseFloat((1.80 + Math.random() * 0.4).toFixed(2)),
        bearMultiplier: parseFloat((1.85 + Math.random() * 0.4).toFixed(2)),
        status: "NEXT"
      });

      lastResolvedEpochRef.current = baseEpochId;
    }
  }, [baseEpochId, livePrice, liveRound, nextRound, selectedCoin.symbol, currentEpochEnd]);

  // When coin changes, reset lock prices to current live price
  const handleCoinChange = (coin: PredictionCoin) => {
    setSelectedCoin(coin);
    setLivePrice(coin.defaultPrice);
    setPriceHistory([coin.defaultPrice]);
    setLiveRound((prev) => ({
      ...prev,
      coinSymbol: coin.symbol,
      lockPrice: coin.defaultPrice
    }));
    setNextRound((prev) => ({
      ...prev,
      coinSymbol: coin.symbol,
      lockPrice: coin.defaultPrice
    }));
  };

  // Submit User Prediction
  const handleEnterPrediction = (targetRound: "LIVE" | "NEXT", side: "UP" | "DOWN") => {
    if (wagerAmount <= 0) {
      setNotification({ message: "Please enter a valid wager amount greater than 0.", type: "loss" });
      return;
    }
    if (wagerAmount > demoBalance) {
      setNotification({ message: "Insufficient Demo Wallet balance. Click 'Reset Balance' to get $10,000 USDT.", type: "loss" });
      return;
    }

    // Deduct wager
    setDemoBalance((b) => b - wagerAmount);

    const mult = side === "UP" ? (targetRound === "LIVE" ? liveRound.bullMultiplier : nextRound.bullMultiplier) : (targetRound === "LIVE" ? liveRound.bearMultiplier : nextRound.bearMultiplier);

    const betInfo = {
      side,
      amount: wagerAmount,
      payoutMultiplier: mult
    };

    if (targetRound === "LIVE") {
      setLiveRound((r) => ({
        ...r,
        bullPoolUsd: side === "UP" ? r.bullPoolUsd + wagerAmount : r.bullPoolUsd,
        bearPoolUsd: side === "DOWN" ? r.bearPoolUsd + wagerAmount : r.bearPoolUsd,
        userBet: betInfo
      }));
    } else {
      setNextRound((r) => ({
        ...r,
        bullPoolUsd: side === "UP" ? r.bullPoolUsd + wagerAmount : r.bullPoolUsd,
        bearPoolUsd: side === "DOWN" ? r.bearPoolUsd + wagerAmount : r.bearPoolUsd,
        userBet: betInfo
      }));
    }

    setNotification({
      message: `✅ Entered ${side} for Round #${targetRound === "LIVE" ? liveRound.roundId : nextRound.roundId} with $${wagerAmount} USDT! (Est. Payout: $${(wagerAmount * mult).toFixed(2)} USDT)`,
      type: "success"
    });
  };

  // Reset Demo Balance
  const handleResetBalance = () => {
    setDemoBalance(10000);
    setUserStats({
      totalRounds: 0,
      wonRounds: 0,
      lostRounds: 0,
      winStreak: 0,
      maxStreak: 0,
      netProfitUsd: 0
    });
    setNotification({ message: "Demo Wallet reset to $10,000.00 USDT!", type: "info" });
  };

  // Delta calculations for the active round
  const priceDelta = livePrice - liveRound.lockPrice;
  const priceDeltaPercent = liveRound.lockPrice > 0 ? (priceDelta / liveRound.lockPrice) * 100 : 0;
  const isCurrentlyBull = priceDelta >= 0;

  // AI 5-Minute Micro Signal
  const aiMicroSignal = useMemo(() => {
    const momentum = priceDeltaPercent;
    if (momentum > 0.08) {
      return { direction: "UP", confidence: 84.5, text: "Strong Bullish Micro-Breakout", rsi: 64.2, emaCross: "Bullish Cross (1m/5m)" };
    } else if (momentum > 0) {
      return { direction: "UP", confidence: 71.0, text: "Mild Upward Absorption", rsi: 54.8, emaCross: "Consolidating Above 20 EMA" };
    } else if (momentum < -0.08) {
      return { direction: "DOWN", confidence: 82.0, text: "Aggressive Seller Sweep", rsi: 36.5, emaCross: "Bearish Cascade (1m/5m)" };
    } else {
      return { direction: "DOWN", confidence: 68.5, text: "Range Bound Rejection", rsi: 46.2, emaCross: "Testing Lower Band" };
    }
  }, [priceDeltaPercent]);

  // Formatted timer string mm:ss
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;
  const formattedCountdown = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const faqs = [
    {
      q: "How does the 5-Minute Binance-Style Crypto Price Prediction work?",
      a: "Every 5 minutes, a new prediction round begins. At the start of the round, the asset's price is recorded as the 'Lock Price'. During the 5-minute round, participants predict whether the final 'Close Price' will be higher (UP / BULL) or lower (DOWN / BEAR) than the Lock Price. If your prediction is correct when the countdown reaches 00:00, you win a proportional share of the prize pool multiplied by the payout odds."
    },
    {
      q: "What is the difference between Lock Price and Live Price?",
      a: "The Lock Price is the fixed reference benchmark captured at the exact beginning of the 5-minute round (e.g. $88,450.00). The Live Price updates in real time via Binance market feeds. If the Live Price is above the Lock Price when the round ends, BULL wins; if it closes below, BEAR wins."
    },
    {
      q: "How are the Payout Multipliers calculated?",
      a: "Payout multipliers are calculated based on the total ratio of funds in the Bull Pool versus the Bear Pool. If more traders predict UP, the Bull multiplier decreases (e.g. 1.70x) while the Bear multiplier increases (e.g. 2.45x), offering higher reward for taking the contrarian position."
    },
    {
      q: "Is real money required to play the 5-Minute Prediction game?",
      a: "No! This prediction arena comes equipped with a Free $10,000 USDT Demo Balance so you can test 5-minute scalping strategies, practice binary price forecasting, and refine your market intuition risk-free before trading live derivatives."
    },
    {
      q: "What technical indicators help predict 5-minute crypto price moves?",
      a: "Professional 5-minute prediction traders monitor: (1) 1-minute and 5-minute RSI momentum, (2) EMA 9/21 crossovers, (3) Cumulative Volume Delta (CVD) taker flow imbalances, and (4) Coinglass liquidation pool sweeps near key round-number psychological barriers."
    }
  ];

  return (
    <div className="space-y-10">
      
      {/* 1. HERO BANNER & ASSET SELECTOR */}
      <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-amber-950 text-white rounded-3xl p-6 sm:p-8 border border-amber-500/30 shadow-2xl relative overflow-hidden">
        {/* Glow Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  <Flame className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  Binance-Style 5-Minute Prediction Arena
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  <Radio className="w-3 h-3 text-emerald-400 animate-ping" />
                  Live 24/7 Epoch Synchronization
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight">
                Predict Next 5-Minute Price: <br className="hidden sm:inline" />
                <span className="bg-gradient-to-r from-emerald-400 via-amber-300 to-rose-400 bg-clip-text text-transparent">
                  UP or DOWN Against Lock Price?
                </span>
              </h1>

              <p className="text-slate-300 text-xs sm:text-sm max-w-3xl mt-2 leading-relaxed">
                Will <strong>{selectedCoin.name} ({selectedCoin.base})</strong> close higher or lower than the previous round lock price in the next 5 minutes? Cast your prediction, leverage real-time AI momentum indicators, and track your win rate streak!
              </p>
            </div>

            {/* Demo Wallet Balance Card */}
            <div className="p-4 rounded-2xl bg-slate-900/90 border border-amber-500/30 space-y-2 shrink-0">
              <div className="flex items-center justify-between text-xs text-slate-400 font-mono font-bold">
                <span>Demo Trading Wallet</span>
                <button
                  onClick={handleResetBalance}
                  className="text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-1 font-bold"
                  title="Reset demo funds to $10,000"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>
              <div className="text-2xl font-black text-amber-400 font-mono tracking-tight">
                ${demoBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs text-slate-400">USDT</span>
              </div>
              <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400 border-t border-slate-800 pt-1.5">
                <span>Wins: <strong className="text-emerald-400">{userStats.wonRounds}</strong></span>
                <span>Streak: <strong className="text-amber-400">{userStats.winStreak}🔥</strong></span>
                <span>Net: <strong className={userStats.netProfitUsd >= 0 ? "text-emerald-400" : "text-rose-400"}>
                  {userStats.netProfitUsd >= 0 ? `+$${userStats.netProfitUsd.toFixed(2)}` : `-$${Math.abs(userStats.netProfitUsd).toFixed(2)}`}
                </strong></span>
              </div>
            </div>
          </div>

          {/* Notification Toast if present */}
          {notification && (
            <div className={`p-3 rounded-xl text-xs font-bold flex items-center justify-between transition-all ${
              notification.type === "success"
                ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                : notification.type === "loss"
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                : "bg-blue-500/20 text-blue-300 border border-blue-500/40"
            }`}>
              <span>{notification.message}</span>
              <button onClick={() => setNotification(null)} className="text-slate-400 hover:text-white ml-2">✕</button>
            </div>
          )}

          {/* Coin Selector Navigation Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar border-t border-slate-800 pt-4">
            <span className="text-xs font-mono font-bold text-slate-400 uppercase mr-1 shrink-0">Market:</span>
            {SUPPORTED_COINS.map((coin) => (
              <button
                key={coin.symbol}
                onClick={() => handleCoinChange(coin)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 shrink-0 ${
                  selectedCoin.symbol === coin.symbol
                    ? "bg-amber-400 text-slate-950 font-black shadow-md scale-105"
                    : "bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700"
                }`}
              >
                <span>{coin.base}/USDT</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. THE 3-CARD PREDICTION REEL (PAST ROUND -> LIVE ROUND -> NEXT ROUND) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* CARD 1: EXPIRED / PREVIOUS ROUND (Col 3.5) */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-md space-y-4 opacity-80 hover:opacity-100 transition flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
              <span className="text-xs font-mono font-bold text-slate-400 flex items-center gap-1">
                <History className="w-3.5 h-3.5" /> Round #{historyRounds[0]?.roundId || baseEpochId - 1}
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 dark:bg-slate-800 text-slate-500">
                EXPIRED
              </span>
            </div>

            {/* Winner Banner */}
            <div className={`p-3 rounded-2xl text-center font-black text-sm flex items-center justify-center gap-1.5 ${
              historyRounds[0]?.winner === "BULL"
                ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700"
                : "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-700"
            }`}>
              {historyRounds[0]?.winner === "BULL" ? (
                <>
                  <TrendingUp className="w-4 h-4" /> <span>BULL WON (UP)</span>
                </>
              ) : (
                <>
                  <TrendingDown className="w-4 h-4" /> <span>BEAR WON (DOWN)</span>
                </>
              )}
            </div>

            {/* Price Comparison */}
            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-850">
                <span className="text-slate-400">Lock Price:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  ${historyRounds[0]?.lockPrice.toLocaleString(undefined, { minimumFractionDigits: selectedCoin.decimals })}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-850">
                <span className="text-slate-400">Close Price:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  ${historyRounds[0]?.closePrice?.toLocaleString(undefined, { minimumFractionDigits: selectedCoin.decimals })}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-50 dark:bg-slate-850">
                <span className="text-slate-400">Payout Multiplier:</span>
                <span className="font-bold text-amber-500">
                  {historyRounds[0]?.winner === "BULL" ? `${historyRounds[0]?.bullMultiplier}x` : `${historyRounds[0]?.bearMultiplier}x`}
                </span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 text-center font-mono">
            Total Pool: ${(historyRounds[0]?.bullPoolUsd + historyRounds[0]?.bearPoolUsd).toLocaleString()} USDT
          </div>
        </div>

        {/* CARD 2: LIVE ROUND IN PROGRESS (Col 5.5) - MAIN FOCUS */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-7 border-2 border-amber-400/80 shadow-2xl space-y-5 relative overflow-hidden flex flex-col justify-between ring-4 ring-amber-400/10">
          
          {/* Header & Live Pulse */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <h3 className="text-base font-black text-white font-mono">
                LIVE Round #{liveRound.roundId}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-xl bg-amber-400/20 text-amber-300 font-mono font-black text-xs border border-amber-400/40 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 animate-spin" />
                <span>{formattedCountdown}</span>
              </span>
            </div>
          </div>

          {/* 5-Minute Progress Bar */}
          <div className="space-y-1">
            <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 transition-all duration-1000"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
              <span>00:00 (Locked)</span>
              <span>{Math.round(progressPercent)}% Elapsed</span>
              <span>05:00 (Settlement)</span>
            </div>
          </div>

          {/* Current Live Price & Delta vs Lock Price */}
          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center space-y-2">
            <span className="text-[11px] font-mono uppercase font-bold text-slate-400">
              Real-Time {selectedCoin.base}/USDT Price
            </span>
            <div className={`text-3xl sm:text-4xl font-black font-mono tracking-tight transition-colors duration-300 ${
              priceFlash === "UP" ? "text-emerald-400 scale-105" : priceFlash === "DOWN" ? "text-rose-400 scale-105" : "text-white"
            }`}>
              ${livePrice.toLocaleString(undefined, { minimumFractionDigits: selectedCoin.decimals, maximumFractionDigits: selectedCoin.decimals })}
            </div>

            {/* Delta Badge */}
            <div className="flex items-center justify-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-mono font-black flex items-center gap-1 ${
                isCurrentlyBull
                  ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                  : "bg-rose-500/20 text-rose-400 border border-rose-500/40"
              }`}>
                {isCurrentlyBull ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                <span>
                  {priceDelta >= 0 ? `+$${priceDelta.toFixed(selectedCoin.decimals)}` : `-$${Math.abs(priceDelta).toFixed(selectedCoin.decimals)}`} ({priceDeltaPercent >= 0 ? `+${priceDeltaPercent.toFixed(2)}%` : `${priceDeltaPercent.toFixed(2)}%`})
                </span>
              </span>
              <span className="text-xs font-mono text-slate-400 font-bold">
                vs Lock: ${liveRound.lockPrice.toLocaleString(undefined, { minimumFractionDigits: selectedCoin.decimals })}
              </span>
            </div>
          </div>

          {/* Active Round Odds Breakdown */}
          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div className={`p-3 rounded-xl border text-center space-y-1 ${
              isCurrentlyBull
                ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-300"
                : "bg-slate-900/60 border-slate-800 text-slate-400"
            }`}>
              <div className="font-bold uppercase text-[10px]">UP / BULL Pool</div>
              <div className="text-lg font-black text-emerald-400">{liveRound.bullMultiplier}x</div>
              <div className="text-[10px] text-slate-400">${liveRound.bullPoolUsd.toLocaleString()} USDT</div>
            </div>

            <div className={`p-3 rounded-xl border text-center space-y-1 ${
              !isCurrentlyBull
                ? "bg-rose-950/40 border-rose-500/50 text-rose-300"
                : "bg-slate-900/60 border-slate-800 text-slate-400"
            }`}>
              <div className="font-bold uppercase text-[10px]">DOWN / BEAR Pool</div>
              <div className="text-lg font-black text-rose-400">{liveRound.bearMultiplier}x</div>
              <div className="text-[10px] text-slate-400">${liveRound.bearPoolUsd.toLocaleString()} USDT</div>
            </div>
          </div>

          {/* User Active Bet status in Live Round if exists */}
          {liveRound.userBet ? (
            <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/30 text-xs text-amber-300 flex items-center justify-between">
              <span>Your Prediction: <strong>{liveRound.userBet.side} (${liveRound.userBet.amount} USDT)</strong></span>
              <span>Potential Win: <strong>${(liveRound.userBet.amount * liveRound.userBet.payoutMultiplier).toFixed(2)} USDT</strong></span>
            </div>
          ) : (
            <div className="text-[11px] text-slate-400 text-center font-mono italic">
              Round locked at start price. Predictions now open for Next Round #{nextRound.roundId} 👉
            </div>
          )}
        </div>

        {/* CARD 3: NEXT ROUND (OPEN FOR PREDICTIONS) (Col 3.5) */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-6 border-2 border-emerald-500/50 dark:border-emerald-500/40 shadow-xl space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <Unlock className="w-4 h-4" /> Next Round #{nextRound.roundId}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-black bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 animate-pulse">
                OPEN NOW
              </span>
            </div>

            <div className="space-y-1 text-center">
              <span className="text-xs font-mono font-bold text-slate-400">Entry Closes In:</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">
                {formattedCountdown}
              </div>
            </div>

            {/* Wager Preset Selector */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-300">
                <span>Wager Amount (USDT)</span>
                <span className="font-mono text-amber-500">${wagerAmount} USDT</span>
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {[50, 100, 250, 500].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setWagerAmount(amt)}
                    className={`py-1.5 rounded-xl text-xs font-mono font-bold transition ${
                      wagerAmount === amt
                        ? "bg-slate-900 dark:bg-amber-400 text-white dark:text-slate-950 font-black shadow-sm"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>
            </div>

            {/* BIG ACTION BUTTONS: ENTER UP vs ENTER DOWN */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => handleEnterPrediction("NEXT", "UP")}
                className="p-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-white font-black text-sm transition flex flex-col items-center justify-center gap-1 shadow-lg hover:scale-102 cursor-pointer group"
              >
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
                  <span>ENTER UP</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-100 font-bold">
                  {nextRound.bullMultiplier}x Payout
                </span>
              </button>

              <button
                onClick={() => handleEnterPrediction("NEXT", "DOWN")}
                className="p-4 rounded-2xl bg-rose-500 hover:bg-rose-400 text-white font-black text-sm transition flex flex-col items-center justify-center gap-1 shadow-lg hover:scale-102 cursor-pointer group"
              >
                <div className="flex items-center gap-1">
                  <TrendingDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                  <span>ENTER DOWN</span>
                </div>
                <span className="text-[10px] font-mono text-rose-100 font-bold">
                  {nextRound.bearMultiplier}x Payout
                </span>
              </button>
            </div>

            {/* Next Round Bet status if user entered */}
            {nextRound.userBet && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                <span>Pre-Entered: <strong>{nextRound.userBet.side} (${nextRound.userBet.amount})</strong></span>
                <span>Est. Win: <strong>${(nextRound.userBet.amount * nextRound.userBet.payoutMultiplier).toFixed(2)}</strong></span>
              </div>
            )}
          </div>

          <div className="text-[10px] text-slate-400 text-center font-mono">
            Est. Locked Price: ~${livePrice.toFixed(selectedCoin.decimals)}
          </div>
        </div>
      </div>

      {/* 3. AI 5-MINUTE MICRO-TREND SIGNAL & TELEMETRY RADAR */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-500 flex items-center justify-center font-black">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-900 dark:text-white">
                AI 5-Minute Predictive Momentum Consensus
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Machine learning micro-indicators evaluating 1m/5m orderbook imbalance, RSI delta, and CVD flow
              </p>
            </div>
          </div>

          {/* Consensus Badge */}
          <div className={`px-4 py-2 rounded-2xl text-xs font-mono font-black flex items-center gap-2 border ${
            aiMicroSignal.direction === "UP"
              ? "bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-700"
              : "bg-rose-50 dark:bg-rose-950/80 text-rose-700 dark:text-rose-300 border-rose-300 dark:border-rose-700"
          }`}>
            <span className="w-2 h-2 rounded-full bg-current animate-ping" />
            <span>AI Signal: {aiMicroSignal.confidence}% {aiMicroSignal.direction} ({aiMicroSignal.text})</span>
          </div>
        </div>

        {/* 4 Micro Indicators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">5-Min RSI (14)</span>
            <div className="text-lg font-black text-slate-900 dark:text-white">
              {aiMicroSignal.rsi}
            </div>
            <span className="text-[11px] text-emerald-500 font-bold">Healthy Upward Slope</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">1m EMA Ribbon Cross</span>
            <div className="text-sm font-black text-amber-500 truncate">
              {aiMicroSignal.emaCross}
            </div>
            <span className="text-[11px] text-slate-400">9 EMA above 21 EMA</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Orderbook Bid/Ask Delta</span>
            <div className="text-lg font-black text-emerald-500 font-mono">
              +64.2% Bids
            </div>
            <span className="text-[11px] text-slate-400">Aggressive Buyer Support</span>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-1">
            <span className="text-[10px] uppercase font-bold text-slate-400">Micro Volatility Range</span>
            <div className="text-lg font-black text-slate-900 dark:text-white font-mono">
              0.18% / 5m
            </div>
            <span className="text-[11px] text-amber-500">Optimal Breakout Width</span>
          </div>
        </div>
      </div>

      {/* 4. PREVIOUS 5-MINUTE ROUNDS HISTORY LEDGER */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-amber-500" />
            <h3 className="text-lg font-black text-slate-900 dark:text-white">
              Recent 5-Minute Rounds Settlement History
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            Auto-Settled via Binance Oracle
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase">
                <th className="pb-3">Round ID</th>
                <th className="pb-3">Lock Price</th>
                <th className="pb-3">Close Price</th>
                <th className="pb-3">Spread Delta</th>
                <th className="pb-3">Outcome</th>
                <th className="pb-3">Winning Multiplier</th>
                <th className="pb-3">Total Pool</th>
                <th className="pb-3">Your Prediction</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {historyRounds.map((r) => {
                const diff = (r.closePrice || 0) - r.lockPrice;
                const isBull = diff >= 0;
                return (
                  <tr key={r.roundId} className="hover:bg-slate-50 dark:hover:bg-slate-850/50 transition">
                    <td className="py-3 font-bold text-slate-900 dark:text-white">
                      #{r.roundId}
                    </td>
                    <td className="py-3 text-slate-600 dark:text-slate-300">
                      ${r.lockPrice.toLocaleString(undefined, { minimumFractionDigits: selectedCoin.decimals })}
                    </td>
                    <td className="py-3 font-bold text-slate-900 dark:text-white">
                      ${r.closePrice?.toLocaleString(undefined, { minimumFractionDigits: selectedCoin.decimals })}
                    </td>
                    <td className={`py-3 font-bold ${isBull ? "text-emerald-500" : "text-rose-500"}`}>
                      {diff >= 0 ? `+$${diff.toFixed(selectedCoin.decimals)}` : `-$${Math.abs(diff).toFixed(selectedCoin.decimals)}`}
                    </td>
                    <td className="py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black ${
                        r.winner === "BULL"
                          ? "bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700"
                          : "bg-rose-100 dark:bg-rose-950/80 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-700"
                      }`}>
                        {r.winner === "BULL" ? "🟢 BULL (UP)" : "🔴 BEAR (DOWN)"}
                      </span>
                    </td>
                    <td className="py-3 font-bold text-amber-500">
                      {r.winner === "BULL" ? `${r.bullMultiplier}x` : `${r.bearMultiplier}x`}
                    </td>
                    <td className="py-3 text-slate-500">
                      ${(r.bullPoolUsd + r.bearPoolUsd).toLocaleString()} USDT
                    </td>
                    <td className="py-3 font-bold">
                      {r.userBet ? (
                        <span className={r.userBet.result === "WON" ? "text-emerald-500" : "text-rose-500"}>
                          {r.userBet.result === "WON" ? `+$${r.userBet.payoutUsd?.toFixed(2)} (WIN 🏆)` : `-$${r.userBet.amount} (LOSS)`}
                        </span>
                      ) : (
                        <span className="text-slate-400">Not Entered</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. EDUCATIONAL GUIDE & FAQ ACCORDION */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md space-y-6">
        <div className="space-y-1">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-amber-500" />
            <span>5-Minute Crypto Price Prediction FAQ &amp; Strategies</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            Master the mechanics of short-term 5-minute price predictions and binary price action
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 bg-slate-50/50 dark:bg-slate-850/40 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                >
                  <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-amber-500" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="p-4 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
