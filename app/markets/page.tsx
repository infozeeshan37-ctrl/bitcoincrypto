import type { Metadata } from "next";
import CoinMarketCapDashboard from "@/components/markets/CoinMarketCapDashboard";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import ToolCitationWidget from "@/components/common/ToolCitationWidget";
import AuthoritativeCitations from "@/components/common/AuthoritativeCitations";
import AdBanner from "@/components/ads/AdBanner";

export const metadata: Metadata = {
  title: "Crypto Markets & Coin Rankings Live | Spot Prices, Volume & Market Cap — BitcoinCrypto.tech",
  description: "Real-time cryptocurrency market cap rankings, 24h spot trading volume, top gainers/losers, interactive 7d sparklines, and Bitcoin dominance metrics on BitcoinCrypto.tech.",
  keywords: [
    "cryptocurrency market cap rankings",
    "live crypto prices",
    "top crypto gainers volume",
    "coinmarketcap alternative",
    "bitcoin market dominance live",
    "24h crypto volume rankings",
    "spot crypto markets terminal",
    "crypto price tracker live",
    "altcoin market cap live",
    "ethereum solana btc price today"
  ],
  alternates: {
    canonical: "https://www.bitcoincrypto.tech/markets",
  },
  openGraph: {
    title: "Crypto Markets & Coin Rankings | BitcoinCrypto.tech",
    description: "Real-time prices, 24h trading volume, top gainers, and dominance indexes across global crypto assets.",
    url: "https://www.bitcoincrypto.tech/markets",
  },
};

export default function MarketsPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 sm:py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <Breadcrumbs items={[{ label: "Spot Markets", href: "/markets" }]} />
        <CoinMarketCapDashboard />
        
        {/* Institutional Spot Market Microstructure & Valuation Guide */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm space-y-8">
          <div className="space-y-2 border-b border-slate-100 dark:border-slate-800 pb-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-700/80">
              <span>Quantitative Market Masterclass</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              Cryptocurrency Spot Market Architecture &amp; Valuation Analytics
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-4xl">
              An authoritative institutional guide to interpreting live token rankings, liquidity efficiency ratios, fully diluted valuations, and cross-exchange price discovery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            {/* Module 1: Market Cap vs FDV */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-mono font-bold flex items-center justify-center text-xs">1</span>
                <span>Market Capitalization vs. Fully Diluted Valuation (FDV)</span>
              </h3>
              <p>
                <strong>Circulating Market Cap</strong> equals the current spot price multiplied exclusively by freely tradable tokens (<code className="font-mono text-slate-900 dark:text-white">Price × Circulating Supply</code>). However, institutional investors evaluate <strong>Fully Diluted Valuation (FDV)</strong> (<code className="font-mono text-slate-900 dark:text-white">Price × Max Supply</code>).
              </p>
              <p>
                When a token exhibits a low circulating supply relative to its maximum supply (e.g., only 15% circulating), aggressive future token unlock schedules from early venture investors create severe structural sell pressure. Tokens with high circulating ratios (&gt;80%) possess superior supply stability and carry significantly lower inflation dilution risk.
              </p>
            </div>

            {/* Module 2: Volume-to-Market Cap Ratio */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-mono font-bold flex items-center justify-center text-xs">2</span>
                <span>24h Volume-to-Market Cap (Liquidity Efficiency Ratio)</span>
              </h3>
              <p>
                The <strong>Volume-to-Market Cap (V/MC) ratio</strong> measures how rapidly an asset&apos;s total capital turns over during a 24-hour cycle. Healthy, highly liquid benchmark assets such as Bitcoin and Ethereum generally maintain turnover ratios between <strong>3% and 12%</strong>.
              </p>
              <p>
                A sudden spike above <strong>30%</strong> indicates extreme speculative mania or major news volatility. Conversely, a ratio below <strong>1%</strong> warns of illiquid &quot;ghost-town&quot; order books where even moderate block sales will suffer catastrophic price slippage.
              </p>
            </div>

            {/* Module 3: Cross-Exchange Price Discovery */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-mono font-bold flex items-center justify-center text-xs">3</span>
                <span>Cross-Exchange Price Discovery &amp; Triangular Arbitrage</span>
              </h3>
              <p>
                Spot prices are not dictated by a single central entity. Instead, prices emerge dynamically across fragmented order books (Binance, Coinbase, OKX, Kraken, Uniswap). Algorithmic high-frequency market makers execute sub-second <strong>triangular arbitrage</strong> and cross-exchange spreads, buying where price is momentarily lower and selling where it is higher.
              </p>
              <p>
                This continuous capital rebalancing keeps global spot prices synchronized within basis points, tethering fragmented decentralized liquidity into a unified global benchmark.
              </p>
            </div>

            {/* Module 4: Altcoin Market Cycles & BTC Dominance */}
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-3">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-mono font-bold flex items-center justify-center text-xs">4</span>
                <span>Bitcoin Dominance (BTC.D) &amp; Capital Rotation Waves</span>
              </h3>
              <p>
                Capital flow within digital assets follows a predictable institutional lifecycle: fiat inflows first enter <strong>Bitcoin (Store of Value)</strong>, compressing BTC dominance upward. Once Bitcoin enters a consolidation regime at cyclical all-time highs, risk tolerance expands.
              </p>
              <p>
                Profits systematically rotate down the risk curve: first into large-cap Layer-1s (Ethereum, Solana), then into decentralized finance (DeFi), real-world assets (RWA), and finally speculative micro-caps. Tracking BTC.D allows traders to position before macro sector rotations materialize.
              </p>
            </div>
          </div>

          {/* Spot Market FAQs */}
          <div className="space-y-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              Frequently Asked Questions — Crypto Spot Markets
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                <span className="font-bold text-xs text-slate-900 dark:text-white block">
                  How frequently are live prices refreshed?
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Prices and order book depth synchronize every 10 seconds via direct multi-exchange REST and WebSocket endpoints from tier-1 liquidity venues.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                <span className="font-bold text-xs text-slate-900 dark:text-white block">
                  What do the 7-day sparkline charts show?
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Sparklines display high-resolution 168-hour trailing price trajectories. Hovering any coordinate displays historical time offset, exact USD price, and period delta.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                <span className="font-bold text-xs text-slate-900 dark:text-white block">
                  How is cryptocurrency market rank determined?
                </span>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Assets are ranked strictly by verified circulating market capitalization, excluding unvested project treasury allocations, locked staking rewards, and team reserves.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Verified Primary Data Sources */}
        <AuthoritativeCitations
          title="Official Spot Market & Exchange Data Providers"
          description="Spot price aggregation, 24h liquidity depth, and token market caps are sourced directly from verified primary exchange feeds and global index providers."
          pageUrl="https://www.bitcoincrypto.tech/markets"
          pageTitle="Live Cryptocurrency Spot Markets & Volume Directory"
        />

        <ToolCitationWidget
          toolName="BitcoinCrypto Spot Market Rankings & Volume Radar"
          toolUrl="https://www.bitcoincrypto.tech/markets"
          description="Real-time cryptocurrency market cap valuations, 24h spot volume, dominance indexes, and momentum screeners."
        />

        {/* Google AdSense Compliant Banner Slot */}
        <AdBanner format="auto" />
      </div>
    </main>
  );
}
