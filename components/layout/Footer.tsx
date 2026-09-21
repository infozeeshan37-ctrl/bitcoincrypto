import Link from "next/link";
import { ShieldCheck, ExternalLink, Activity, Flame, Coins, Newspaper, Brain, Calculator, Compass, Layers, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 space-y-12">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center font-black text-xl shadow-md shadow-amber-500/20">
                ₿
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                BitcoinCrypto<span className="text-amber-400">.tech</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              An institutional cryptocurrency intelligence hub combining real-time CoinMarketCap metrics, Coinglass derivatives analytics, macroeconomic CPI releases, and verifiable AI price predictions with 98.6% confluence.
            </p>
            <div className="flex items-center gap-2 text-slate-400 text-xs pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Independent Real-Time Data & Algorithmic Models</span>
            </div>
          </div>

          {/* Markets & Intelligence */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Market Intelligence</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/predictions" className="hover:text-purple-400 transition flex items-center gap-1.5 text-purple-300 font-semibold">
                  <Brain className="w-3.5 h-3.5 text-purple-400" /> AI Price Prediction Engine
                </Link>
              </li>
              <li>
                <Link href="/markets" className="hover:text-amber-400 transition flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-amber-400" /> Spot Coin Rankings
                </Link>
              </li>
              <li>
                <Link href="/coinglass" className="hover:text-rose-400 transition flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-400" /> Coinglass Derivatives &amp; OI
                </Link>
              </li>
              <li>
                <Link href="/orderbook" className="hover:text-amber-400 transition flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-amber-400" /> L2 Order Book Terminal
                </Link>
              </li>
              <li>
                <Link href="/whale-orders" className="hover:text-indigo-400 transition flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5 text-indigo-400" /> Whale Orders &amp; Liquidity
                </Link>
              </li>
              <li>
                <Link href="/cpi" className="hover:text-amber-400 transition flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> US CPI AI Predictor
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-blue-400 transition flex items-center gap-1.5">
                  <Newspaper className="w-3.5 h-3.5 text-blue-400" /> Macro Economic News
                </Link>
              </li>
            </ul>
          </div>

          {/* Dedicated Tools */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Trading Tools</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/tools/trading-bot" className="hover:text-white transition">AI Trading Signals Copilot</Link></li>
              <li><Link href="/tools/chart-terminal" className="hover:text-white transition">TradingView Chart Terminal</Link></li>
              <li><Link href="/tools/dca-simulator" className="hover:text-white transition">DCA Multi-Asset Simulator</Link></li>
              <li><Link href="/tools/position-sizer" className="hover:text-white transition">Risk &amp; Position Sizer</Link></li>
              <li><Link href="/tools/crypto-converter" className="hover:text-white transition">Live Crypto &amp; Fiat Converter</Link></li>
              <li><Link href="/tools/liquidation-heatmap" className="hover:text-white transition">Liquidation Radar &amp; Heatmap</Link></li>
            </ul>
          </div>

          {/* Research & Education */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Research Desk</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/concepts" className="hover:text-white transition">Trading Concepts &amp; Models</Link></li>
              <li><Link href="/blog" className="hover:text-white transition">Research Desk &amp; Analysis</Link></li>
              <li><Link href="/about" className="hover:text-white transition">Architecture &amp; Methodology</Link></li>
              <li>
                <a
                  href="https://github.com/infozeeshan37-ctrl/bitcoincrypto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition flex items-center gap-1"
                >
                  GitHub Repository <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* SEO Cross-Linking Directory Section: Coin AI Predictions */}
        <div className="space-y-3 pt-4 border-b border-slate-800 pb-8">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5 text-purple-400" />
              Cryptocurrency AI Price Predictions &amp; Forecasts (24h / 7d / 30d):
            </span>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px]">
            {[
              { name: "Bitcoin (BTC)", slug: "bitcoin" },
              { name: "Ethereum (ETH)", slug: "ethereum" },
              { name: "Solana (SOL)", slug: "solana" },
              { name: "BNB", slug: "binancecoin" },
              { name: "XRP", slug: "ripple" },
              { name: "Dogecoin (DOGE)", slug: "dogecoin" },
              { name: "Cardano (ADA)", slug: "cardano" },
              { name: "Sui (SUI)", slug: "sui" },
              { name: "Avalanche (AVAX)", slug: "avalanche" },
              { name: "Chainlink (LINK)", slug: "chainlink" },
              { name: "Bittensor (TAO)", slug: "bittensor" },
              { name: "NEAR Protocol", slug: "near" },
              { name: "Render (RENDER)", slug: "render" },
              { name: "Aptos (APT)", slug: "aptos" },
              { name: "Polkadot (DOT)", slug: "polkadot" },
            ].map((c) => (
              <Link
                key={c.slug}
                href={`/predictions/${c.slug}`}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-purple-950/80 hover:text-purple-300 text-slate-400 border border-slate-700/60 transition font-mono"
              >
                {c.name} Prediction &rarr;
              </Link>
            ))}
          </div>
        </div>

        {/* SEO Cross-Linking Directory Section: Quantitative Concept Guides */}
        <div className="space-y-3 pb-8 border-b border-slate-800">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            Quantitative Market Structure Guides:
          </span>
          <div className="flex flex-wrap gap-2 text-[11px]">
            {[
              { name: "Order Book Microstructure", slug: "order-book-microstructure-and-depth" },
              { name: "Funding Rates & Basis Arbitrage", slug: "crypto-funding-rates-and-basis-trading" },
              { name: "DCA Mathematics & Models", slug: "dollar-cost-averaging-dca-math-and-models" },
              { name: "US CPI Inflation & Volatility", slug: "cpi-inflation-crypto-volatility-correlation" },
              { name: "MVRV Z-Score Cycle Tops", slug: "mvrv-z-score-onchain-cycle-tops-bottoms" },
              { name: "Liquidation Squeezes & Traps", slug: "liquidation-heatmaps-and-short-squeeze-mechanics" },
              { name: "Yield Curve Control & Bitcoin", slug: "yield-curve-control-and-bitcoin-liquidity" },
              { name: "Proof of Useful Inference AI", slug: "proof-of-useful-inference-decentralized-ai" },
            ].map((g) => (
              <Link
                key={g.slug}
                href={`/concepts/${g.slug}`}
                className="px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-amber-950/80 hover:text-amber-300 text-slate-400 border border-slate-700/60 transition"
              >
                {g.name} &rarr;
              </Link>
            ))}
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>&copy; {new Date().getFullYear()} <strong>BitcoinCrypto.tech</strong>. All rights reserved.</p>
          <p className="max-w-xl text-center md:text-right">
            <strong>Disclaimer:</strong> Real-time cryptocurrency metrics, derivatives open interest, CPI estimates, and algorithmic trading signals are published strictly for educational and analytical purposes and do not constitute financial advice.
          </p>
        </div>

      </div>
    </footer>
  );
}
