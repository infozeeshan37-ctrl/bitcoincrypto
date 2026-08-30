"use client";

import React from "react";
import {
  RefreshCw,
  Coins,
  DollarSign,
  TrendingUp,
  ShieldCheck,
  Zap,
  Globe2,
  Layers,
  ArrowRight,
  Sparkles,
  Info,
  CheckCircle2,
  Lock,
  Scale
} from "lucide-react";
import Link from "next/link";

export default function SpotConverterDetails() {
  const conversionModels = [
    {
      name: "Central Limit Order Book (CLOB)",
      badge: "Institutional Exchanges",
      desc: "Matches real-time buyer bids and seller asks on major liquid order books (Binance, Coinbase, Kraken). Offers tightest spreads for large block trades.",
      bestFor: "High-volume spot trading with sub-0.1% fees"
    },
    {
      name: "Automated Market Maker (AMM)",
      badge: "Decentralized On-Chain",
      desc: "Executes token swaps directly against on-chain liquidity pools via deterministic constant product formulas (x × y = k).",
      bestFor: "Permissionless, non-custodial Web3 swaps"
    },
    {
      name: "Instant Spot OTC Convert Desks",
      badge: "Zero-Slippage Fixed Quote",
      desc: "Aggregates institutional liquidity pools into a single guaranteed conversion rate with zero slippage during fast market spikes.",
      bestFor: "Immediate retail conversions without orderbook depth risk"
    }
  ];

  const feeFactors = [
    {
      factor: "Bid-Ask Spread",
      desc: "The difference between the highest price a buyer is willing to pay and the lowest price a seller is willing to accept. High liquidity assets (BTC, ETH) have spreads under 0.01%."
    },
    {
      factor: "Execution Slippage",
      desc: "The price movement occurring between order submission and execution when filling large orders that exceed immediate top-of-book liquidity."
    },
    {
      factor: "Network Gas Fees",
      desc: "On-chain blockchain transaction fees (e.g. Bitcoin Sat/vB, Ethereum Gwei, Solana fractions of a cent) paid directly to validators for block inclusion."
    },
    {
      factor: "Exchange Taker / Maker Fees",
      desc: "Standard platform trading fees charged by exchanges, typically ranging from 0.02% (maker) to 0.10% (taker) on liquid spot pairs."
    }
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-10 transition-colors">
      
      {/* 1. Header & Overview */}
      <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-700/80">
          <RefreshCw className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          <span>Real-Time Spot Liquidity &amp; Conversion Hub</span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
          Cryptocurrency Spot Conversion &amp; Liquidity Mechanics
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-4xl">
          The BitcoinCrypto.tech Real-Time Spot Converter performs multi-currency exchange calculations powered by live institutional liquidity pricing. Explore the cross-rate mathematical models, bid-ask spread mechanics, and fiat-to-crypto liquidity pathways used across global trading desks.
        </p>
      </div>

      {/* 2. Mathematical Cross-Rate Triangulation */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/80 dark:border-slate-700 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                Cross-Rate Triangulation &amp; Conversion Formula
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Mathematical routing between multi-asset base currencies and target fiat/crypto quotes
              </p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto">
            Zero-Slippage Math
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-3 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              When converting non-paired currencies (e.g. <strong>ETH to GBP</strong> or <strong>SOL to EUR</strong>), institutional liquidity engines utilize <strong>USD/USDT intermediate cross-rate triangulation</strong>:
            </p>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5 font-mono text-xs">
              <div className="text-amber-600 dark:text-amber-400 font-black">
                Step 1: Source in USD = Source Amount × Price(Source/USD)
              </div>
              <div className="text-emerald-600 dark:text-emerald-400 font-black">
                Step 2: Target Units = Source in USD / Price(Target/USD)
              </div>
            </div>
            <p>
              This ensures that conversions maintain <strong>1:1 mathematical parity</strong> with the underlying global spot order book mid-prices without hidden arbitrary spreads.
            </p>
          </div>

          <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 text-xs">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider font-mono">Supported Asset Classes</span>
            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong className="text-slate-900 dark:text-white">Crypto Majors:</strong>
                <div className="text-slate-500 dark:text-slate-400 mt-0.5">BTC, ETH, SOL, USDT, BNB, XRP</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <strong className="text-slate-900 dark:text-white">Global Fiat:</strong>
                <div className="text-slate-500 dark:text-slate-400 mt-0.5">USD ($), EUR (€), GBP (£)</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Spot Conversion Venues Compared */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-amber-500" />
            <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              Conversion Venues &amp; Execution Mechanics
            </h4>
          </div>
          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">Liquidity Routing Types</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {conversionModels.map((m, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300">
                    {m.badge}
                  </span>
                </div>
                <h5 className="text-sm font-bold text-slate-900 dark:text-white">{m.name}</h5>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{m.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60 text-[11px] text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{m.bestFor}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Understanding Spreads, Slippage & Gas Fees */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Coins className="w-4 h-4 text-amber-500" />
            <h4 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
              Understanding Spreads, Slippage &amp; Transaction Costs
            </h4>
          </div>
          <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">Friction Reduction</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {feeFactors.map((f, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 space-y-1.5"
            >
              <h5 className="text-sm font-bold text-slate-900 dark:text-white">{f.factor}</h5>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Institutional Portfolio Rebalancing Tip */}
      <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-3 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <h5 className="text-sm font-bold text-white">Periodic Spot Portfolio Rebalancing</h5>
            <p className="text-xs text-slate-300 max-w-2xl">
              Use spot conversions to rebalance portfolio allocation ratios during major market expansions, rotating high-beta altcoin gains into stablecoins or Bitcoin cold storage.
            </p>
          </div>
        </div>
        <Link
          href="/markets"
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shrink-0 border border-slate-700"
        >
          <span>Explore Live Markets</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
}
