import Link from "next/link";
import { ShieldCheck, ExternalLink, Activity, Flame, Coins, Newspaper } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        
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
              An institutional cryptocurrency intelligence hub combining real-time CoinMarketCap metrics, Coinglass derivatives analytics, macroeconomic CPI releases, and verifiable AI trading signals.
            </p>
            <div className="flex items-center gap-2 text-slate-400 text-xs pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Independent Real-Time Data & Algorithmic Models</span>
            </div>
          </div>

          {/* Live Markets & Intelligence */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Live Analytics</h4>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="/markets" className="hover:text-amber-400 transition flex items-center gap-1.5">
                  <Coins className="w-3.5 h-3.5 text-amber-400" /> CoinMarketCap Live
                </Link>
              </li>
              <li>
                <Link href="/coinglass" className="hover:text-rose-400 transition flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5 text-rose-400" /> Coinglass Derivatives & OI
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-blue-400 transition flex items-center gap-1.5">
                  <Newspaper className="w-3.5 h-3.5 text-blue-400" /> Latest News & US CPI
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-amber-400 transition flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-emerald-400" /> AI Trading Bot Terminal
                </Link>
              </li>
            </ul>
          </div>

          {/* Research & Education */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Education & Tech</h4>
            <ul className="space-y-2 text-slate-400">
              <li><Link href="/concepts" className="hover:text-white transition">Trading Concepts & DCA</Link></li>
              <li><Link href="/blog" className="hover:text-white transition">Research Desk & Analysis</Link></li>
              <li><Link href="/about" className="hover:text-white transition">About Our Architecture</Link></li>
            </ul>
          </div>

          {/* Legal & Source */}
          <div className="space-y-3">
            <h4 className="font-bold text-white uppercase text-[11px] tracking-wider">Data Transparency</h4>
            <ul className="space-y-2 text-slate-400">
              <li><span className="text-slate-400">Connected to Binance & BLS Feeds</span></li>
              <li>
                <a
                  href="https://github.com/infozeeshan37-ctrl/bitcoincrypto"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition flex items-center gap-1"
                >
                  Open GitHub Repository <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li><span className="text-slate-500">Non-Custodial & Non-Financial Advice</span></li>
            </ul>
          </div>

        </div>

        {/* Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>&copy; {new Date().getFullYear()} <strong>BitcoinCrypto.tech</strong>. All rights reserved.</p>
          <p className="max-w-xl text-center md:text-right">
            <strong>Disclaimer:</strong> Real-time cryptocurrency metrics, derivatives open interest, CPI estimates, and algorithmic trading bot signals are published strictly for educational and analytical purposes and do not constitute financial advice.
          </p>
        </div>

      </div>
    </footer>
  );
}
