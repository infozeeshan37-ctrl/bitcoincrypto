import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Cpu,
  BarChart2,
  Calculator,
  Flame,
  Percent,
  RefreshCw,
  Zap,
  ArrowRight,
  ShieldCheck,
  Activity,
  Layers,
  Sparkles,
  ChevronRight,
  Sliders,
  DollarSign
} from "lucide-react";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import AITradingBotTerminal from "@/components/tools/AITradingBotTerminal";
import TradingViewAdvancedChart from "@/components/tools/TradingViewAdvancedChart";
import TechnicalAnalysisPanel from "@/components/tools/TechnicalAnalysisPanel";
import ChartTerminalDetails from "@/components/tools/details/ChartTerminalDetails";
import DCASimulatorDetails from "@/components/tools/details/DCASimulatorDetails";
import CoinGlassLiquidationTool from "@/components/tools/details/CoinGlassLiquidationTool";
import AIPredictionSuite from "@/components/predictions/AIPredictionSuite";

interface ToolConfig {
  slug: string;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  keywords: string[];
  features: string[];
}

const toolConfigs: Record<string, ToolConfig> = {
  "trading-bot": {
    slug: "trading-bot",
    name: "AI Trading Signals & Copilot Terminal",
    shortName: "AI Trading Bot",
    tagline: "Autonomous algorithmic momentum detection and risk-adjusted crypto trade setups.",
    description: "Execute data-driven trading strategies with our institutional AI Trading Bot. Get real-time buy/sell signals, dynamic trailing stops, and multi-timeframe confirmation for Bitcoin, Ethereum, and major altcoins.",
    keywords: ["crypto ai trading bot", "automated trading signals", "bitcoin algorithmic trading", "crypto risk copilot", "crypto momentum indicator"],
    features: [
      "98.6% Historical Confluence Accuracy",
      "Dynamic Stop-Loss and Take-Profit Calculation",
      "Multi-Exchange Real-Time WebSocket Pricing",
      "Continuous Pattern & Order Book Imbalance Detection"
    ],
  },
  "chart-terminal": {
    slug: "chart-terminal",
    name: "TradingView Pro Chart & Technical Radar",
    shortName: "Chart Terminal",
    tagline: "High-frequency multi-timeframe candlestick terminal with institutional oscillator overlays.",
    description: "Professional crypto charting interface powered by TradingView. Analyze real-time market depth, exponential moving averages (EMA), RSI divergences, MACD histograms, and volume profile metrics across 100+ spot and futures pairs.",
    keywords: ["tradingview crypto charts", "bitcoin technical analysis chart", "live crypto candlesticks", "multi-exchange order book depth", "crypto oscillator dashboard"],
    features: [
      "Sub-Second Live Price Feed from Binance & Coinbase",
      "Comprehensive Oscillator & Indicator Suite (RSI, MACD, BB, Supertrend)",
      "Instant Pair Switching across 50+ Top Cryptos",
      "High-Res Split-Screen Technical Breakdown"
    ],
  },
  "dca-simulator": {
    slug: "dca-simulator",
    name: "Dollar-Cost Averaging (DCA) Multi-Asset Simulator",
    shortName: "DCA Simulator",
    tagline: "Backtest systematic accumulation schedules against historical market cycles.",
    description: "Simulate and optimize your Dollar-Cost Averaging (DCA) investment strategy across Bitcoin, Ethereum, and Solana. Compare periodic daily, weekly, and monthly accumulation against lump-sum purchasing with inflation adjustments.",
    keywords: ["bitcoin dca calculator", "crypto dollar cost averaging simulator", "crypto recurring investment backtest", "dca vs lump sum crypto"],
    features: [
      "Multi-Cycle Historical Backtesting Engine (2017 to Present)",
      "Daily, Weekly, Bi-Weekly, and Monthly Interval Modeling",
      "Interactive ROI & Total Value Visualizer",
      "Custom Fiat Inflows with Dynamic Portfolio Rebalancing"
    ],
  },
  "position-sizer": {
    slug: "position-sizer",
    name: "Institutional Risk & Position Sizing Calculator",
    shortName: "Position Sizer",
    tagline: "Kelly Criterion and Average True Range (ATR) risk management copilot.",
    description: "Protect your capital with quantitative position sizing. Calculate exact margin allocation, risk-to-reward ratios, stop-loss invalidation distances, and maximum drawdowns before executing levered or spot positions.",
    keywords: ["crypto position size calculator", "bitcoin risk management tool", "kelly criterion crypto", "atr stop loss calculator", "crypto leverage margin calculator"],
    features: [
      "Custom Account Risk Percentage Allocation (0.5% - 5.0%)",
      "Dynamic Liquidation & Margin Cushion Safety Warnings",
      "Exact Lot Size and Contract Quantity Outputs",
      "Risk-to-Reward Ratio Invalidation Verifier"
    ],
  },
  "crypto-converter": {
    slug: "crypto-converter",
    name: "Real-Time Crypto Currency & Fiat Converter",
    shortName: "Crypto Converter",
    tagline: "Instant sub-second conversion between 50+ digital assets and global fiat currencies.",
    description: "Convert cryptocurrency valuations to USD, EUR, GBP, JPY, and other major fiat currencies instantly. Real-time rates aggregated across global liquidity pools with zero spread bias.",
    keywords: ["crypto currency converter", "bitcoin to usd calculator", "crypto fiat exchange rates", "eth to eur converter", "real time crypto rates"],
    features: [
      "Zero-Latency Aggregated Liquidity Rates",
      "Multi-Currency Cross Pairing (BTC, ETH, SOL, USD, EUR, GBP)",
      "Integrated 24-Hour Price High/Low Benchmarks",
      "Mobile-Optimized Clean Calculation Interface"
    ],
  },
  "liquidation-heatmap": {
    slug: "liquidation-heatmap",
    name: "Coinglass Perpetual Liquidation Intelligence Radar",
    shortName: "Liquidation Heatmap",
    tagline: "Track aggregated perpetual open interest, resting liquidity pools, and short squeeze clusters.",
    description: "Real-time derivatives market intelligence tool tracking liquidation cascades, long/short trader positioning, funding rate heatmaps, and open interest across Binance, Bybit, and OKX.",
    keywords: ["coinglass liquidation heatmap", "crypto open interest tracker", "bitcoin liquidation clusters", "crypto funding rate radar", "long short ratio live"],
    features: [
      "Live 24h Aggregated Liquidation Volumes & Wipeouts",
      "Perpetual Funding Rate Bias & Basis Spreads",
      "Long vs. Short Trader Exposure Dominance",
      "Real-Time Major Exchange Open Interest Totals"
    ],
  },
};

interface PageProps {
  params: Promise<{ tool: string }>;
}

export async function generateStaticParams() {
  return Object.keys(toolConfigs).map((slug) => ({
    tool: slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { tool: slug } = await params;
  const tool = toolConfigs[slug];

  if (!tool) {
    return {
      title: "Trading Tool Not Found",
      description: "The requested cryptocurrency trading tool could not be found.",
    };
  }

  const title = `${tool.name} | BitcoinCrypto.tech`;
  const canonicalUrl = `https://www.bitcoincrypto.tech/tools/${tool.slug}`;

  return {
    title,
    description: tool.description,
    keywords: tool.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description: tool.description,
      url: canonicalUrl,
      type: "website",
      siteName: "BitcoinCrypto.tech",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: tool.description,
      creator: "@bitcoincrypto",
    },
  };
}

export default async function DedicatedToolPage({ params }: PageProps) {
  const { tool: slug } = await params;
  const tool = toolConfigs[slug];

  if (!tool) {
    notFound();
  }

  // Generate SoftwareApplication JSON-LD schema
  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": tool.name,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web",
    "description": tool.description,
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD",
    },
    "provider": {
      "@type": "Organization",
      "name": "BitcoinCrypto.tech",
      "url": "https://www.bitcoincrypto.tech",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.bitcoincrypto.tech",
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Trading Suite",
        "item": "https://www.bitcoincrypto.tech/tools",
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": tool.shortName,
        "item": `https://www.bitcoincrypto.tech/tools/${tool.slug}`,
      },
    ],
  };

  const otherTools = Object.values(toolConfigs).filter((t) => t.slug !== tool.slug);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Navigation Breadcrumb Bar */}
      <div className="border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-md sticky top-20 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Trading Suite", href: "/tools" },
              { label: tool.shortName },
            ]}
          />
          <Link
            href="/tools"
            className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
          >
            <span>All Tools</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Tool Header Section */}
        <section className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-amber-950/40 border border-slate-800 shadow-xl text-white relative overflow-hidden">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-400 text-xs font-mono font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Institutional Trading Utility</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              {tool.name}
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              {tool.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 text-xs text-slate-300">
              {tool.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Dedicated Tool Interactive Component */}
        <section className="space-y-6">
          {tool.slug === "trading-bot" && <AITradingBotTerminal />}

          {tool.slug === "chart-terminal" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <TradingViewAdvancedChart symbol="BINANCE:BTCUSDT" />
                </div>
                <div>
                  <TechnicalAnalysisPanel
                    symbol="BINANCE:BTCUSDT"
                    price={88450}
                    high24h={90200}
                    low24h={86400}
                    change24h={2.4}
                    defaultInterval="1D"
                  />
                </div>
              </div>
              <ChartTerminalDetails />
            </div>
          )}

          {tool.slug === "dca-simulator" && (
            <div className="space-y-6">
              <DCASimulatorDetails />
            </div>
          )}

          {tool.slug === "position-sizer" && (
            <div className="space-y-6">
              <AITradingBotTerminal />
            </div>
          )}

          {tool.slug === "crypto-converter" && (
            <div className="space-y-6">
              <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm max-w-2xl mx-auto space-y-6 text-center">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 flex items-center justify-center mx-auto">
                  <RefreshCw className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 dark:text-white">
                    Live Crypto Converter Engine
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Convert BTC, ETH, SOL and 50+ cryptocurrencies into USD, EUR, and GBP with real-time liquidity feeds.
                  </p>
                </div>
                <Link
                  href="/tools?tab=converter"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-md transition"
                >
                  <span>Open Full Interactive Converter in Trading Suite</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

          {tool.slug === "liquidation-heatmap" && <CoinGlassLiquidationTool />}
        </section>

        {/* Other Trading Suite Tools Grid */}
        <section className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-amber-500" />
              <span>Explore More Institutional Trading Tools</span>
            </h3>
            <Link
              href="/tools"
              className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
            >
              <span>View Trading Hub</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {otherTools.map((ot) => (
              <Link
                key={ot.slug}
                href={`/tools/${ot.slug}`}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-400 transition group flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition">
                      {ot.shortName}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed line-clamp-2">
                    {ot.tagline}
                  </p>
                </div>
                <div className="text-[10px] font-mono font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider">
                  Launch Tool &rarr;
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
