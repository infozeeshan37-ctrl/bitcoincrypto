import Link from "next/link";
import { ShieldCheck, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-50 border-t border-slate-200/80 pt-16 pb-12 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-200">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-amber-500 text-white flex items-center justify-center font-bold text-lg">
                ₿
              </div>
              <span className="text-lg font-extrabold text-slate-900 tracking-tight">
                BitcoinCrypto<span className="text-amber-600">.tech</span>
              </span>
            </div>
            <p className="text-slate-500 text-xs leading-relaxed max-w-sm">
              An educational and analytical cryptocurrency intelligence platform dedicated to transparent market structure, macroeconomic research, and decentralized technology.
            </p>
            <div className="flex items-center gap-2 text-slate-500 text-xs pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Independent Research & Data Methodology</span>
            </div>
          </div>

          {/* Core Links */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">Ecosystem</h4>
            <ul className="space-y-2 text-slate-500">
              <li><Link href="/concepts" className="hover:text-slate-900 transition">Trading Concepts & Tech</Link></li>
              <li><Link href="/tools" className="hover:text-slate-900 transition">Tools & Calculators Overview</Link></li>
              <li><Link href="/blog" className="hover:text-slate-900 transition">Research & Analysis Blog</Link></li>
              <li><Link href="/about" className="hover:text-slate-900 transition">About Our Platform</Link></li>
            </ul>
          </div>

          {/* Legal & Info */}
          <div className="space-y-3">
            <h4 className="font-bold text-slate-900 uppercase text-[11px] tracking-wider">Legal & Transparency</h4>
            <ul className="space-y-2 text-slate-500">
              <li><span className="text-slate-500">Hosted via Vercel Edge</span></li>
              <li><a href="https://github.com/infozeeshan37-ctrl/bitcoincrypto" target="_blank" rel="noopener noreferrer" className="hover:text-slate-900 transition flex items-center gap-1">Open GitHub Repo <ExternalLink className="w-3 h-3" /></a></li>
              <li><span className="text-slate-500">Educational & Non-Financial Advice</span></li>
            </ul>
          </div>

        </div>

        {/* Disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>&copy; {new Date().getFullYear()} <strong>BitcoinCrypto.tech</strong>. All rights reserved.</p>
          <p className="max-w-xl text-center md:text-right">
            <strong>Disclaimer:</strong> Content and data published on BitcoinCrypto.tech are provided strictly for educational and informational purposes and do not constitute investment, financial, or trading advice.
          </p>
        </div>

      </div>
    </footer>
  );
}
