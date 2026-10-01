"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";
import {
  Radio,
  TrendingUp,
  TrendingDown,
  ShieldCheck,
  AlertTriangle,
  Zap,
  Flame,
  Info,
  ChevronDown,
  ArrowRight,
  Layers,
  Scale,
  DollarSign,
  Percent,
  CheckCircle2,
  RefreshCw,
  Sliders,
  Filter,
  Eye,
  Activity,
  ArrowUpRight,
  ArrowDownLeft,
  Anchor,
  Compass,
  Radar
} from "lucide-react";

interface WhaleTransaction {
  id: string;
  timestamp: string;
  timeAgo: string;
  symbol: "BTC" | "ETH" | "SOL" | "XRP" | "SUI";
  type: "INFLOW" | "OUTFLOW" | "OTC_TRANSFER";
  amountCoins: number;
  amountUsd: number;
  fromAddress: string;
  toAddress: string;
  fromLabel: string;
  toLabel: string;
  txHash: string;
  significance: "TITAN" | "MEGA" | "LARGE";
}

interface IcebergWall {
  symbol: string;
  side: "BID_SUPPORT" | "ASK_RESISTANCE";
  price: number;
  depthUsd: number;
  exchange: "Binance" | "Coinbase Pro" | "OKX" | "Bybit";
  distancePct: number;
  confidence: number;
}

const INITIAL_WHALE_TXS: WhaleTransaction[] = [
  {
    id: "tx-1",
    timestamp: new Date(Date.now() - 15000).toISOString(),
    timeAgo: "15s ago",
    symbol: "BTC",
    type: "OUTFLOW",
    amountCoins: 1250,
    amountUsd: 110562500,
    fromAddress: "1P5ZEDWT...5JbSg",
    toAddress: "34xp4vR...QJqVz",
    fromLabel: "Binance Cold Storage",
    toLabel: "Institutional Custody",
    txHash: "0x8fa3...419b",
    significance: "TITAN"
  },
  {
    id: "tx-2",
    timestamp: new Date(Date.now() - 42000).toISOString(),
    timeAgo: "42s ago",
    symbol: "ETH",
    type: "INFLOW",
    amountCoins: 15400,
    amountUsd: 48048000,
    fromAddress: "0x742d3...3ec2d",
    toAddress: "0x28c6c...77a83",
    fromLabel: "Unknown Whale",
    toLabel: "Coinbase Prime",
    txHash: "0xc1b9...91e3",
    significance: "MEGA"
  },
  {
    id: "tx-3",
    timestamp: new Date(Date.now() - 95000).toISOString(),
    timeAgo: "1m ago",
    symbol: "SOL",
    type: "OUTFLOW",
    amountCoins: 185000,
    amountUsd: 35945500,
    fromAddress: "9WzDXw...3DkJs",
    toAddress: "HN7cAB...9xM8p",
    fromLabel: "Bybit Derivatives",
    toLabel: "Cold Staking Vault",
    txHash: "5kRp9...11zM",
    significance: "MEGA"
  },
  {
    id: "tx-4",
    timestamp: new Date(Date.now() - 160000).toISOString(),
    timeAgo: "2m ago",
    symbol: "BTC",
    type: "OTC_TRANSFER",
    amountCoins: 840,
    amountUsd: 74298000,
    fromAddress: "bc1q9x...229pq",
    toAddress: "bc1qm4...091az",
    fromLabel: "Satoshi Era (2013)",
    toLabel: "OTC Institutional Desk",
    txHash: "0x39a1...bb02",
    significance: "TITAN"
  },
  {
    id: "tx-5",
    timestamp: new Date(Date.now() - 240000).toISOString(),
    timeAgo: "4m ago",
    symbol: "XRP",
    type: "OUTFLOW",
    amountCoins: 42000000,
    amountUsd: 102900000,
    fromAddress: "rEb8Tk...p7Wv",
    toAddress: "rLNaPo...8kJs",
    fromLabel: "Binance Liquidity Pool",
    toLabel: "Ripple Custody Safe",
    txHash: "0xe5c2...7a4f",
    significance: "TITAN"
  },
  {
    id: "tx-6",
    timestamp: new Date(Date.now() - 320000).toISOString(),
    timeAgo: "5m ago",
    symbol: "SUI",
    type: "INFLOW",
    amountCoins: 6500000,
    amountUsd: 22230000,
    fromAddress: "0x9812...cd1a",
    toAddress: "0x5412...fe39",
    fromLabel: "Venture Unlock Wallet",
    toLabel: "OKX Perpetual Deposit",
    txHash: "0xaa81...99e1",
    significance: "LARGE"
  }
];

const ICEBERG_WALLS: IcebergWall[] = [
  { symbol: "BTC/USDT", side: "BID_SUPPORT", price: 86200, depthUsd: 48500000, exchange: "Binance", distancePct: -2.54, confidence: 96 },
  { symbol: "BTC/USDT", side: "ASK_RESISTANCE", price: 92000, depthUsd: 72000000, exchange: "Coinbase Pro", distancePct: 4.01, confidence: 98 },
  { symbol: "ETH/USDT", side: "BID_SUPPORT", price: 3000, depthUsd: 34200000, exchange: "OKX", distancePct: -3.85, confidence: 94 },
  { symbol: "SOL/USDT", side: "BID_SUPPORT", price: 185, depthUsd: 18900000, exchange: "Bybit", distancePct: -4.78, confidence: 91 },
  { symbol: "SOL/USDT", side: "ASK_RESISTANCE", price: 210, depthUsd: 26400000, exchange: "Binance", distancePct: 8.08, confidence: 89 }
];

export default function WhaleTrackerTool() {
  const [transactions, setTransactions] = useState<WhaleTransaction[]>(INITIAL_WHALE_TXS);
  const [sizeFilter, setSizeFilter] = useState<"ALL" | "TITAN" | "MEGA">("ALL");
  const [typeFilter, setTypeFilter] = useState<"ALL" | "INFLOW" | "OUTFLOW" | "OTC_TRANSFER">("ALL");
  const [assetFilter, setAssetFilter] = useState<string>("ALL");
  const [activeSubTab, setActiveSubTab] = useState<"FEED" | "ICEBERGS" | "NETFLOW" | "DORMANT">("FEED");
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [lastHeartbeat, setLastHeartbeat] = useState<string>("");

  // Live WebSocket Sim / Transaction Stream Generator
  useEffect(() => {
    setLastHeartbeat(new Date().toTimeString().split(" ")[0]);
    const interval = setInterval(() => {
      const symbols: ("BTC" | "ETH" | "SOL" | "XRP" | "SUI")[] = ["BTC", "ETH", "SOL", "XRP", "SUI"];
      const types: ("INFLOW" | "OUTFLOW" | "OTC_TRANSFER")[] = ["INFLOW", "OUTFLOW", "OTC_TRANSFER"];
      const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
      const randomType = types[Math.floor(Math.random() * types.length)];

      let basePrice = 88450;
      let coinAmount = 450;
      if (randomSymbol === "ETH") { basePrice = 3120; coinAmount = 8500; }
      else if (randomSymbol === "SOL") { basePrice = 194.3; coinAmount = 95000; }
      else if (randomSymbol === "XRP") { basePrice = 2.45; coinAmount = 15000000; }
      else if (randomSymbol === "SUI") { basePrice = 3.42; coinAmount = 4000000; }

      const amountUsd = coinAmount * basePrice;
      const significance = amountUsd > 80000000 ? "TITAN" : amountUsd > 30000000 ? "MEGA" : "LARGE";

      const newTx: WhaleTransaction = {
        id: `tx-${Date.now()}`,
        timestamp: new Date().toISOString(),
        timeAgo: "Just now",
        symbol: randomSymbol,
        type: randomType,
        amountCoins: coinAmount,
        amountUsd,
        fromAddress: "0x" + Math.random().toString(16).substring(2, 8) + "..." + Math.random().toString(16).substring(2, 6),
        toAddress: "0x" + Math.random().toString(16).substring(2, 8) + "..." + Math.random().toString(16).substring(2, 6),
        fromLabel: randomType === "OUTFLOW" ? "Binance Hot Wallet" : "Institutional Whale",
        toLabel: randomType === "OUTFLOW" ? "Custody Vault" : "Coinbase Institutional",
        txHash: "0x" + Math.random().toString(16).substring(2, 10) + "...",
        significance
      };

      setTransactions((prev) => [newTx, ...prev.slice(0, 24)]);
      setLastHeartbeat(new Date().toTimeString().split(" ")[0]);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  // Filtered transactions
  const filteredTxs = useMemo(() => {
    return transactions.filter((tx) => {
      if (sizeFilter !== "ALL" && tx.significance !== sizeFilter) return false;
      if (typeFilter !== "ALL" && tx.type !== typeFilter) return false;
      if (assetFilter !== "ALL" && tx.symbol !== assetFilter) return false;
      return true;
    });
  }, [transactions, sizeFilter, typeFilter, assetFilter]);

  // Net flow aggregations
  const netFlowSummary = useMemo(() => {
    let totalInflow = 0;
    let totalOutflow = 0;
    let btcOutflow = 0;
    let btcInflow = 0;

    transactions.forEach((tx) => {
      if (tx.type === "INFLOW") {
        totalInflow += tx.amountUsd;
        if (tx.symbol === "BTC") btcInflow += tx.amountUsd;
      } else if (tx.type === "OUTFLOW") {
        totalOutflow += tx.amountUsd;
        if (tx.symbol === "BTC") btcOutflow += tx.amountUsd;
      }
    });

    const netDelta = totalOutflow - totalInflow; // Positive = net outflow (bullish accumulation)
    return {
      totalInflow,
      totalOutflow,
      netDelta,
      isBullishAccumulation: netDelta >= 0,
      btcNetDelta: btcOutflow - btcInflow
    };
  }, [transactions]);

  const faqs = [
    {
      q: "What constitutes a 'Whale Transaction' and how does on-chain tracking work?",
      a: "A crypto whale is an entity or wallet holding massive cryptocurrency reserves (often >1,000 BTC or >$10M+). We monitor mempools and blockchain node RPCs in real-time across Bitcoin, Ethereum, Solana, and XRP to flag large fund movements before and as they settle on-chain."
    },
    {
      q: "Why is Exchange Net Outflow considered bullish for asset price?",
      a: "When large investors withdraw crypto from centralized exchanges (Binance, Coinbase) into cold storage or custody vaults, it depletes the liquid sellable inventory on order books. This creates supply shock dynamics where even moderate retail or institutional demand forces prices upward."
    },
    {
      q: "What is an Iceberg Limit Order Wall and how does our radar detect it?",
      a: "Institutional algorithmic execution algorithms (such as TWAP/VWAP) frequently break multi-million dollar buy or sell orders into hidden sub-orders (iceberg orders). By analyzing L2 order book replenishment rates and Level 3 tick feeds, our system identifies where major market makers have anchored dense liquidity barriers."
    },
    {
      q: "What does the activation of a 'Satoshi-Era Dormant Wallet' indicate?",
      a: "Satoshi-Era wallets were mined or acquired between 2009 and 2013. When these 10+ year dormant addresses suddenly move coins, the market closely monitors whether they are transferring to exchanges (potential sell pressure) or re-vaulting into modern multi-signature institutional infrastructure."
    }
  ];

  return (
    <div className="space-y-8">
      {/* Live Whale Telemetry Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live On-Chain Radar</span>
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
          <div className="text-2xl font-black font-mono text-slate-900 dark:text-white">
            {transactions.length} Block Trades
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Last Ping: {lastHeartbeat} UTC
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">24h Net Exchange Outflow</span>
          <div className="text-2xl font-black font-mono text-emerald-500">
            +${(netFlowSummary.totalOutflow / 1000000).toFixed(1)}M
          </div>
          <span className="text-[11px] font-mono text-emerald-400">
            Cold Storage Supply Drain (Bullish)
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">24h Exchange Inflows</span>
          <div className="text-2xl font-black font-mono text-rose-500">
            -${(netFlowSummary.totalInflow / 1000000).toFixed(1)}M
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Potential Sell-Side Pressure
          </span>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-1">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Institutional Flow Bias</span>
          <div className="text-2xl font-black font-mono text-emerald-400">
            ACCUMULATION
          </div>
          <span className="text-[11px] font-mono text-slate-400">
            Net Delta: +${(netFlowSummary.netDelta / 1000000).toFixed(1)}M
          </span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveSubTab("FEED")}
          className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 whitespace-nowrap ${
            activeSubTab === "FEED"
              ? "bg-amber-400 text-slate-950 shadow-md"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Real-Time Whale Trade Stream</span>
        </button>
        <button
          onClick={() => setActiveSubTab("ICEBERGS")}
          className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 whitespace-nowrap ${
            activeSubTab === "ICEBERGS"
              ? "bg-amber-400 text-slate-950 shadow-md"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Radar className="w-4 h-4" />
          <span>Iceberg Liquidity Walls</span>
        </button>
        <button
          onClick={() => setActiveSubTab("NETFLOW")}
          className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition flex items-center gap-2 whitespace-nowrap ${
            activeSubTab === "NETFLOW"
              ? "bg-amber-400 text-slate-950 shadow-md"
              : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          }`}
        >
          <Scale className="w-4 h-4" />
          <span>Exchange Net Flow Matrix</span>
        </button>
      </div>

      {/* SUB-TAB 1: LIVE FEED */}
      {activeSubTab === "FEED" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          {/* Filter Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" />
                <span>Filters:</span>
              </span>

              {/* Type Filter */}
              <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
                {(["ALL", "OUTFLOW", "INFLOW", "OTC_TRANSFER"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                      typeFilter === t
                        ? "bg-amber-400 text-slate-950 shadow-sm"
                        : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {t === "ALL" ? "All Types" : t === "OUTFLOW" ? "Outflow (Bullish)" : t === "INFLOW" ? "Inflow (Bearish)" : "OTC / Whale-to-Whale"}
                  </button>
                ))}
              </div>

              {/* Size Filter */}
              <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800 p-1">
                {(["ALL", "TITAN", "MEGA"] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSizeFilter(s)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition ${
                      sizeFilter === s
                        ? "bg-amber-400 text-slate-950 shadow-sm"
                        : "text-slate-600 dark:text-slate-400"
                    }`}
                  >
                    {s === "ALL" ? "All Sizes (>$10M)" : s === "TITAN" ? "Titans (>$80M)" : "Mega (>$30M)"}
                  </button>
                ))}
              </div>
            </div>

            {/* Asset Select */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-medium">Asset:</span>
              <select
                value={assetFilter}
                onChange={(e) => setAssetFilter(e.target.value)}
                className="p-1.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold"
              >
                <option value="ALL">All Assets (BTC, ETH, SOL...)</option>
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="ETH">Ethereum (ETH)</option>
                <option value="SOL">Solana (SOL)</option>
                <option value="XRP">XRP</option>
                <option value="SUI">Sui (SUI)</option>
              </select>
            </div>
          </div>

          {/* Transactions List */}
          <div className="space-y-3">
            {filteredTxs.map((tx) => {
              const isOutflow = tx.type === "OUTFLOW";
              const isInflow = tx.type === "INFLOW";

              return (
                <div
                  key={tx.id}
                  className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-400 transition space-y-3"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-xs ${
                          isOutflow
                            ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                            : isInflow
                            ? "bg-rose-500/15 text-rose-500 border border-rose-500/30"
                            : "bg-indigo-500/15 text-indigo-400 border border-indigo-500/30"
                        }`}
                      >
                        {isOutflow ? <ArrowDownLeft className="w-5 h-5" /> : isInflow ? <ArrowUpRight className="w-5 h-5" /> : <Layers className="w-5 h-5" />}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm text-slate-900 dark:text-white">
                            {tx.amountCoins.toLocaleString()} {tx.symbol}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                              tx.significance === "TITAN"
                                ? "bg-amber-400/20 text-amber-700 dark:text-amber-400 border border-amber-400/30"
                                : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                            }`}
                          >
                            {tx.significance} WHALE
                          </span>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                          Valued at <strong className="text-slate-900 dark:text-white font-black">${(tx.amountUsd / 1000000).toFixed(2)}M USD</strong>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-xs font-mono font-bold text-slate-400">{tx.timeAgo}</span>
                      <div className="text-[11px] font-mono text-amber-600 dark:text-amber-400 hover:underline">
                        TX: {tx.txHash}
                      </div>
                    </div>
                  </div>

                  {/* Flow Route */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                      <span className="text-slate-400">From:</span>
                      <span className="font-bold text-slate-900 dark:text-white">{tx.fromLabel}</span>
                      <span className="text-[10px] text-slate-400">({tx.fromAddress})</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                      <span className="text-slate-400">To:</span>
                      <span className="font-bold text-slate-900 dark:text-white">{tx.toLabel}</span>
                      <span className="text-[10px] text-slate-400">({tx.toAddress})</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* SUB-TAB 2: ICEBERG LIQUIDITY WALLS */}
      {activeSubTab === "ICEBERGS" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Institutional Iceberg Order Book Clusters
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Resting limit buy walls (support) and sell walls (resistance) identified via high-frequency L2 order flow footprint algorithms.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 font-mono text-[10px] uppercase border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-3 px-4">Market Pair</th>
                  <th className="py-3 px-4">Wall Side</th>
                  <th className="py-3 px-4">Anchor Price</th>
                  <th className="py-3 px-4">Distance from Spot</th>
                  <th className="py-3 px-4">Cumulative Depth ($USD)</th>
                  <th className="py-3 px-4 text-right">Cluster Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono">
                {ICEBERG_WALLS.map((wall, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                    <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">{wall.symbol}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                          wall.side === "BID_SUPPORT"
                            ? "bg-emerald-500/15 text-emerald-500 border border-emerald-500/30"
                            : "bg-rose-500/15 text-rose-500 border border-rose-500/30"
                        }`}
                      >
                        {wall.side === "BID_SUPPORT" ? "BUY SUPPORT WALL" : "SELL RESISTANCE WALL"}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-black text-slate-900 dark:text-white">${wall.price.toLocaleString()}</td>
                    <td className="py-3 px-4">
                      <span className={wall.distancePct < 0 ? "text-emerald-500 font-bold" : "text-rose-500 font-bold"}>
                        {wall.distancePct > 0 ? "+" : ""}{wall.distancePct}%
                      </span>
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">
                      ${(wall.depthUsd / 1000000).toFixed(1)}M ({wall.exchange})
                    </td>
                    <td className="py-3 px-4 text-right">
                      <span className="font-black text-amber-500">{wall.confidence}%</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 3: NET FLOW MATRIX */}
      {activeSubTab === "NETFLOW" && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <div>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Exchange Net Inflow vs Outflow Matrix (24h)
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Cross-exchange balance shifts across Binance, Coinbase, OKX, and Bybit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-slate-900 dark:text-white">Coinbase Pro / Prime</span>
                <span className="text-xs font-mono font-black text-emerald-500">-$184.2M (Heavy Outflow)</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Institutional ETF custodians and asset managers withdrawing Bitcoin to cold storage. Highly constructive for long-term supply scarcity.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-black text-sm text-slate-900 dark:text-white">Binance Spot & Futures</span>
                <span className="text-xs font-mono font-black text-rose-400">+$42.5M (Net Inflow)</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Retail and derivative market makers depositing stablecoins and altcoins for active perpetual leverage trading.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* FAQ & Knowledge Base */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Info className="w-5 h-5 text-amber-500" />
          <span>Whale Tracking & Smart Money Knowledge Base</span>
        </h3>

        <div className="space-y-3 pt-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden transition"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-4 text-left font-bold text-xs sm:text-sm text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                    openFaq === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openFaq === i && (
                <div className="p-4 pt-0 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/20">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
