import Link from "next/link";
import {
  ShieldCheck,
  ExternalLink,
  Activity,
  Flame,
  Coins,
  Newspaper,
  Brain,
  Calculator,
  Compass,
  Layers,
  Sparkles,
  Lock,
  FileText,
  AlertTriangle,
  Cookie,
  Mail,
  Info
} from "lucide-react";
import { coinPredictions } from "@/lib/coinPredictionsData";
import { conceptGuides } from "@/lib/conceptsData";

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 space-y-12">
        
        {/* Main Grid (5 Columns) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-850">
          
          {/* Col 1: Brand Info */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center font-black text-xl shadow-md shadow-amber-500/20">
                ₿
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">
                BitcoinCrypto<span className="text-amber-400">.tech</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              An institutional cryptocurrency intelligence hub combining real-time CoinMarketCap metrics, Coinglass derivatives analytics, macroeconomic CPI releases, and verifiable AI price predictions.
            </p>
            <div className="flex items-center gap-2 text-slate-400 text-xs pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Independent Real-Time Data &amp; Neural Models</span>
            </div>
          </div>

          {/* Col 2: Market Intelligence */}
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
                <Link href="/coinglass" className="hover:text-rose-400 transition flex items-center gap-1.5 text-rose-300 font-semibold">
                  <Flame className="w-3.5 h-3.5 text-rose-400" /> CoinGlass Liquidation Heatmap
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

          {/* Col 3: Dedicated Trading Tools */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Trading Tools</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/tools/trading-bot" className="hover:text-white transition">AI Trading Signals Copilot</Link></li>
              <li><Link href="/tools/liquidation-heatmap" className="hover:text-rose-300 transition text-rose-300/90 font-medium">CoinGlass Liquidation Radar</Link></li>
              <li><Link href="/tools/funding-rate-screener" className="hover:text-cyan-300 transition text-cyan-300/90 font-medium">CoinGlass Funding Rates</Link></li>
              <li><Link href="/tools/chart-terminal" className="hover:text-white transition">TradingView Chart Terminal</Link></li>
              <li><Link href="/tools/dca-simulator" className="hover:text-white transition">DCA Multi-Asset Simulator</Link></li>
              <li><Link href="/tools/position-sizer" className="hover:text-white transition">Risk &amp; Position Sizer</Link></li>
              <li><Link href="/tools/crypto-converter" className="hover:text-white transition">Live Crypto &amp; Fiat Converter</Link></li>
              <li><Link href="/tools/fear-greed-index" className="hover:text-white transition">Crypto Fear &amp; Greed Index</Link></li>
              <li><Link href="/tools/profit-calculator" className="hover:text-white transition">Profit &amp; ROI Calculator</Link></li>
              <li><Link href="/tools/whale-tracker" className="hover:text-white transition">Whale Orders Radar</Link></li>
            </ul>
          </div>

          {/* Col 4: Research & Education */}
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

          {/* Col 5: Legal & Compliance (AdSense Required) */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Legal &amp; Trust</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/privacy" className="hover:text-amber-400 transition flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-amber-400" /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-400" /> Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-rose-400 transition flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" /> Financial Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/cookie-policy" className="hover:text-white transition flex items-center gap-1.5">
                  <Cookie className="w-3.5 h-3.5 text-slate-400" /> Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" /> Contact &amp; Support
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-400 transition flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5 text-blue-400" /> About Us
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* SEO Cross-Linking Directory Section: CoinGlass Liquidation & Derivatives */}
        <div className="space-y-3 pt-2 border-b border-slate-800 pb-8">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              CoinGlass Liquidation Heatmaps &amp; Derivatives Hub:
            </span>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px]">
            {[
              { label: "CoinGlass BTC Liquidation Heatmap", href: "/coinglass?coin=BTC" },
              { label: "CoinGlass ETH Liquidation Map", href: "/coinglass?coin=ETH" },
              { label: "CoinGlass SOL Liquidation Radar", href: "/coinglass?coin=SOL" },
              { label: "CoinGlass Perpetual Open Interest", href: "/coinglass?tab=oi" },
              { label: "CoinGlass 24h Liquidations & Cascades", href: "/coinglass?tab=liquidations" },
              { label: "CoinGlass Funding Rate Screener", href: "/tools/funding-rate-screener" },
              { label: "CoinGlass Long/Short Ratio", href: "/coinglass?tab=longshort" },
              { label: "CoinGlass Liquidation Calculator", href: "/tools/liquidation-heatmap#calculator" },
              { label: "CoinGlass Squeeze Simulator", href: "/tools/liquidation-heatmap#simulator" },
              { label: "Free CoinGlass Alternative", href: "/coinglass" },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-rose-950/80 hover:text-rose-300 text-slate-400 border border-slate-800 transition font-mono"
              >
                {link.label} &rarr;
              </Link>
            ))}
          </div>
        </div>

        {/* SEO Cross-Linking Directory Section: Coin AI Predictions */}
        <div className="space-y-3 pt-2 border-b border-slate-800 pb-8">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
              <Brain className="w-3.5 h-3.5 text-purple-400" />
              Cryptocurrency AI Price Predictions &amp; Forecasts (24h / 7d / 30d):
            </span>
          </div>
          <div className="flex flex-wrap gap-2 text-[11px]">
            {coinPredictions.map((c) => (
              <Link
                key={c.slug}
                href={`/predictions/${c.slug}`}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-purple-950/80 hover:text-purple-300 text-slate-400 border border-slate-800 transition font-mono"
              >
                {c.name} ({c.symbol}) &rarr;
              </Link>
            ))}
          </div>
        </div>

        {/* SEO Cross-Linking Directory Section: Quantitative Concept Guides */}
        <div className="space-y-3 pb-8 border-b border-slate-800">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            Quantitative Market Structure &amp; Trading Guides:
          </span>
          <div className="flex flex-wrap gap-2 text-[11px]">
            {conceptGuides.map((g) => (
              <Link
                key={g.slug}
                href={`/concepts/${g.slug}`}
                className="px-2.5 py-1 rounded-lg bg-slate-900 hover:bg-amber-950/80 hover:text-amber-300 text-slate-400 border border-slate-800 transition"
              >
                {g.title.split(":")[0]} &rarr;
              </Link>
            ))}
          </div>
        </div>

        {/* Legal Links Bar & Copyright & YMYL Disclaimer */}
        <div className="space-y-4 pt-2 text-[11px] text-slate-500 font-mono">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-850 pb-4">
            <div className="flex flex-wrap gap-4 text-slate-400">
              <Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link>
              <span>•</span>
              <Link href="/terms" className="hover:text-white transition">Terms of Service</Link>
              <span>•</span>
              <Link href="/disclaimer" className="hover:text-white transition">Financial Disclaimer</Link>
              <span>•</span>
              <Link href="/cookie-policy" className="hover:text-white transition">Cookie Policy</Link>
              <span>•</span>
              <Link href="/contact" className="hover:text-white transition">Contact Us</Link>
              <span>•</span>
              <Link href="/about" className="hover:text-white transition">About Us</Link>
            </div>
            <div>
              &copy; {new Date().getFullYear()} <strong>BitcoinCrypto.tech</strong>. All rights reserved.
            </div>
          </div>

          <p className="text-slate-500 leading-relaxed text-[10px]">
            <strong>Regulatory &amp; Financial Disclaimer:</strong> BitcoinCrypto.tech is an informational, educational, and mathematical modeling software platform. Real-time cryptocurrency metrics, derivatives open interest, CPI predictive estimates, and algorithmic trading signals are published strictly for educational and analytical purposes and do not constitute financial, investment, trading, or tax advice. Cryptocurrency trading carries substantial risk of loss.
          </p>
        </div>

      </div>
    </footer>
  );
}
