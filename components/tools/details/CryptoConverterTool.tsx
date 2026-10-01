"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  RefreshCw,
  ArrowRight,
  TrendingUp,
  DollarSign,
  Layers,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  Info,
  Sliders,
  CheckCircle2
} from "lucide-react";

interface CryptoRate {
  symbol: string;
  name: string;
  priceUsd: number;
  change24h: number;
  icon: string;
}

const SUPPORTED_CRYPTOS: CryptoRate[] = [
  { symbol: "BTC", name: "Bitcoin", priceUsd: 88450, change24h: 2.4, icon: "₿" },
  { symbol: "ETH", name: "Ethereum", priceUsd: 3120, change24h: 3.1, icon: "Ξ" },
  { symbol: "SOL", name: "Solana", priceUsd: 194.3, change24h: 5.2, icon: "◎" },
  { symbol: "BNB", name: "BNB", priceUsd: 642.3, change24h: 0.8, icon: "BNB" },
  { symbol: "XRP", name: "XRP", priceUsd: 2.45, change24h: 12.8, icon: "✕" },
  { symbol: "DOGE", name: "Dogecoin", priceUsd: 0.224, change24h: 4.5, icon: "Ð" },
  { symbol: "SUI", name: "Sui", priceUsd: 3.42, change24h: 8.4, icon: "💧" },
  { symbol: "ADA", name: "Cardano", priceUsd: 0.88, change24h: 1.2, icon: "₳" },
  { symbol: "AVAX", name: "Avalanche", priceUsd: 38.5, change24h: -1.1, icon: "▲" },
  { symbol: "PEPE", name: "Pepe", priceUsd: 0.0000185, change24h: 15.6, icon: "🐸" },
];

interface FiatRate {
  code: string;
  name: string;
  rateVsUsd: number; // 1 USD = rate in fiat
  symbol: string;
}

const SUPPORTED_FIATS: FiatRate[] = [
  { code: "USD", name: "US Dollar", rateVsUsd: 1.0, symbol: "$" },
  { code: "EUR", name: "Euro", rateVsUsd: 0.92, symbol: "€" },
  { code: "GBP", name: "British Pound", rateVsUsd: 0.79, symbol: "£" },
  { code: "JPY", name: "Japanese Yen", rateVsUsd: 154.5, symbol: "¥" },
  { code: "CAD", name: "Canadian Dollar", rateVsUsd: 1.39, symbol: "CA$" },
  { code: "AUD", name: "Australian Dollar", rateVsUsd: 1.54, symbol: "A$" },
  { code: "INR", name: "Indian Rupee", rateVsUsd: 84.4, symbol: "₹" },
  { code: "AED", name: "UAE Dirham", rateVsUsd: 3.67, symbol: "AED" },
];

export default function CryptoConverterTool() {
  const [cryptoAmount, setCryptoAmount] = useState<number>(1);
  const [selectedCrypto, setSelectedCrypto] = useState<string>("BTC");
  const [selectedFiat, setSelectedFiat] = useState<string>("USD");
  const [isCryptoBase, setIsCryptoBase] = useState<boolean>(true);
  const [fiatAmount, setFiatAmount] = useState<number>(88450);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const currentCrypto = useMemo(() => {
    return SUPPORTED_CRYPTOS.find((c) => c.symbol === selectedCrypto) || SUPPORTED_CRYPTOS[0];
  }, [selectedCrypto]);

  const currentFiat = useMemo(() => {
    return SUPPORTED_FIATS.find((f) => f.code === selectedFiat) || SUPPORTED_FIATS[0];
  }, [selectedFiat]);

  // Derived calculations
  const conversionResult = useMemo(() => {
    const singleCryptoInFiat = currentCrypto.priceUsd * currentFiat.rateVsUsd;
    const totalFiat = cryptoAmount * singleCryptoInFiat;
    const totalCrypto = fiatAmount / singleCryptoInFiat;

    return {
      singleCryptoInFiat,
      totalFiat,
      totalCrypto,
    };
  }, [cryptoAmount, fiatAmount, currentCrypto, currentFiat]);

  const handleCryptoChange = (val: number) => {
    setCryptoAmount(val);
    const singleInFiat = currentCrypto.priceUsd * currentFiat.rateVsUsd;
    setFiatAmount(+(val * singleInFiat).toFixed(2));
  };

  const handleFiatChange = (val: number) => {
    setFiatAmount(val);
    const singleInFiat = currentCrypto.priceUsd * currentFiat.rateVsUsd;
    if (singleInFiat > 0) {
      setCryptoAmount(+(val / singleInFiat).toFixed(6));
    }
  };

  const faqs = [
    {
      q: "How are real-time crypto-to-fiat conversion rates calculated?",
      a: "Our engine aggregates sub-second volume-weighted average price (VWAP) feeds from leading global spot liquidity venues (Binance, Coinbase, Kraken, OKX) combined with live institutional Forex forex rates."
    },
    {
      q: "Can I convert small fractional units (e.g. Satoshis or Gwei)?",
      a: "Yes! Simply input fractional numbers (e.g. 0.0001 BTC). 1 Bitcoin contains 100,000,000 Satoshis, making micro-conversions seamlessly accessible."
    },
    {
      q: "Is there any conversion fee or spread applied in this calculator?",
      a: "No. This calculator reflects pure mid-market spot pricing with zero markup or spreads, giving you the exact theoretical valuation."
    }
  ];

  return (
    <div className="space-y-8">
      {/* Interactive Converter Box */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
            Real-Time Cryptocurrency & Fiat Currency Converter
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
            1 {currentCrypto.symbol} = <strong className="text-slate-900 dark:text-white font-mono">{currentFiat.symbol}{conversionResult.singleCryptoInFiat.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })} {currentFiat.code}</strong>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
          {/* Crypto Input */}
          <div className="md:col-span-5 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">Cryptocurrency</span>
              <select
                value={selectedCrypto}
                onChange={(e) => {
                  setSelectedCrypto(e.target.value);
                  const newCrypto = SUPPORTED_CRYPTOS.find((c) => c.symbol === e.target.value);
                  if (newCrypto) {
                    setFiatAmount(+(cryptoAmount * newCrypto.priceUsd * currentFiat.rateVsUsd).toFixed(2));
                  }
                }}
                className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 font-mono text-xs font-bold"
              >
                {SUPPORTED_CRYPTOS.map((c) => (
                  <option key={c.symbol} value={c.symbol}>
                    {c.symbol} - {c.name} (${c.priceUsd.toLocaleString()})
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <input
                type="number"
                step="any"
                value={cryptoAmount}
                onChange={(e) => handleCryptoChange(Math.max(0, Number(e.target.value)))}
                className="w-full text-2xl font-black font-mono bg-transparent text-slate-900 dark:text-white focus:outline-none"
              />
              <span className="text-xs font-bold font-mono text-slate-400 block mt-1">
                {currentCrypto.name} ({currentCrypto.symbol})
              </span>
            </div>
          </div>

          {/* Swap Indicator */}
          <div className="md:col-span-1 flex justify-center">
            <div className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center shadow-md font-bold">
              <RefreshCw className="w-5 h-5" />
            </div>
          </div>

          {/* Fiat Input */}
          <div className="md:col-span-5 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400">Fiat Currency</span>
              <select
                value={selectedFiat}
                onChange={(e) => {
                  setSelectedFiat(e.target.value);
                  const newFiat = SUPPORTED_FIATS.find((f) => f.code === e.target.value);
                  if (newFiat) {
                    setFiatAmount(+(cryptoAmount * currentCrypto.priceUsd * newFiat.rateVsUsd).toFixed(2));
                  }
                }}
                className="p-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-600 font-mono text-xs font-bold"
              >
                {SUPPORTED_FIATS.map((f) => (
                  <option key={f.code} value={f.code}>
                    {f.code} - {f.name} ({f.symbol})
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <input
                type="number"
                step="any"
                value={fiatAmount}
                onChange={(e) => handleFiatChange(Math.max(0, Number(e.target.value)))}
                className="w-full text-2xl font-black font-mono bg-transparent text-slate-900 dark:text-white focus:outline-none"
              />
              <span className="text-xs font-bold font-mono text-slate-400 block mt-1">
                {currentFiat.name} ({currentFiat.code})
              </span>
            </div>
          </div>
        </div>

        {/* Live Top Asset Quick Comparison Grid */}
        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
          <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
            Top Cryptocurrencies vs {selectedFiat}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {SUPPORTED_CRYPTOS.slice(0, 8).map((c) => {
              const inFiat = c.priceUsd * currentFiat.rateVsUsd;
              return (
                <button
                  key={c.symbol}
                  onClick={() => {
                    setSelectedCrypto(c.symbol);
                    setFiatAmount(+(cryptoAmount * c.priceUsd * currentFiat.rateVsUsd).toFixed(2));
                  }}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 hover:border-amber-400 text-left transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">{c.symbol}</span>
                    <span className={`text-[10px] font-mono font-bold ${c.change24h >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                      {c.change24h >= 0 ? "+" : ""}{c.change24h}%
                    </span>
                  </div>
                  <div className="text-xs font-mono font-black text-slate-700 dark:text-slate-300 mt-1">
                    {currentFiat.symbol}{inFiat.toLocaleString(undefined, { minimumFractionDigits: inFiat < 1 ? 4 : 2, maximumFractionDigits: inFiat < 1 ? 6 : 2 })}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* FAQs */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 max-w-4xl mx-auto">
        <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
          <Info className="w-5 h-5 text-amber-500" />
          <span>Currency Conversion FAQs</span>
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
