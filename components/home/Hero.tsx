import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative pt-16 pb-12 lg:pt-20 lg:pb-14 overflow-hidden bg-gradient-to-b from-amber-50/40 via-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-amber-100 border border-amber-200/80 text-amber-900 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Modern Cryptocurrency Intelligence & Tech Architecture</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15]">
            Clear Insights for the <br />
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-700 bg-clip-text text-transparent">
              Modern Crypto Economy
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Discover transparent macroeconomic research, order flow mechanics, and algorithmic fundamentals designed to simplify cryptocurrency technology and market structure.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            <Link
              href="/concepts"
              className="px-6 py-3.5 rounded-xl text-sm font-bold text-slate-900 bg-amber-400 hover:bg-amber-300 shadow-sm hover:shadow transition flex items-center gap-2"
            >
              Explore Trading Concepts <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/blog"
              className="px-6 py-3.5 rounded-xl text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 shadow-sm transition"
            >
              Read Research Desk
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}
