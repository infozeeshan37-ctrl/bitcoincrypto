"use client";

import React, { useState, useEffect, useRef, Suspense, useCallback } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function getFriendlyTaskLabel(pathname: string, search: string, anchor?: HTMLAnchorElement): string {
  const searchParams = new URLSearchParams(search);
  const tab = searchParams.get("tab");

  if (pathname === "/" && tab === "bot") return "AI Signals Terminal";
  if (pathname === "/" && tab === "screener") return "Live Crypto Screener";
  if (pathname === "/" && tab === "cpi") return "US Macro CPI Schedule";
  if (pathname === "/" && (!tab || tab === "all")) return "Markets & Terminal";

  if (pathname === "/predictions") return "AI Predictions Arena";
  if (pathname.startsWith("/predictions/")) {
    const coin = pathname.split("/predictions/")[1]?.replace(/\/$/, "");
    return `${coin.charAt(0).toUpperCase() + coin.slice(1)} AI Predictions`;
  }

  if (pathname === "/whale-orders") return "Whale Orders Radar";
  if (pathname === "/markets") return "Live Markets Hub";
  if (pathname === "/news") return "Crypto News & CPI Feed";
  if (pathname === "/orderbook") return "Order Book Microstructure";
  
  if (pathname === "/coinglass") {
    if (tab === "heatmap") return "Liquidation Heatmap";
    if (tab === "squeeze") return "Short Squeeze Scanner";
    if (tab === "longshort") return "Long / Short Ratio";
    if (tab === "funding") return "Funding Rates";
    return "CoinGlass Derivatives";
  }

  if (pathname === "/learn") return "Crypto Learn Hub";
  if (pathname === "/blog") return "Research Desk";
  if (pathname.startsWith("/blog/")) return "Research Analysis";
  if (pathname === "/tools") return "Quantitative Tools";
  if (pathname.startsWith("/tools/")) {
    const tool = pathname.split("/tools/")[1]?.replace(/\/$/, "");
    return `${tool.replace(/-/g, " ").toUpperCase()} Tool`;
  }

  if (pathname === "/cpi") return "US CPI Inflation Volatility";
  if (pathname === "/about") return "About Platform";
  if (pathname === "/disclaimer") return "Educational Disclaimer";
  if (pathname === "/terms") return "Terms of Service";
  if (pathname === "/privacy") return "Privacy Policy";

  // Fallback to anchor text if clean and readable
  if (anchor) {
    const text = anchor.textContent?.trim();
    if (text && text.length > 1 && text.length < 32 && !text.includes("\n")) {
      return text;
    }
  }

  return "Terminal View";
}

function BitcoinTransitionContent() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchString = searchParams.toString() ? `?${searchParams.toString()}` : "";

  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [targetLabel, setTargetLabel] = useState<string>("Terminal");

  const safetyTimerRef = useRef<NodeJS.Timeout | null>(null);
  const exitTimerRef = useRef<NodeJS.Timeout | null>(null);
  const currentPathRef = useRef<string>(pathname + searchString);

  // Update current path reference
  useEffect(() => {
    currentPathRef.current = pathname + searchString;
  }, [pathname, searchString]);

  const startTransition = useCallback((label: string) => {
    setTargetLabel(label);
    setIsExiting(false);
    setIsTransitioning(true);

    // Safety timeout: automatically dismiss after 1.2s max if navigation stalls
    if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
    safetyTimerRef.current = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        setIsTransitioning(false);
        setIsExiting(false);
      }, 250);
    }, 1200);
  }, []);

  // When pathname or searchParams change, the destination has loaded!
  useEffect(() => {
    if (isTransitioning) {
      if (safetyTimerRef.current) clearTimeout(safetyTimerRef.current);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);

      // Brief showcase display time (~280ms) then smooth fade-out exit (~260ms)
      exitTimerRef.current = setTimeout(() => {
        setIsExiting(true);
        setTimeout(() => {
          setIsTransitioning(false);
          setIsExiting(false);
        }, 260);
      }, 280);

      return () => {
        if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
      };
    }
  }, [pathname, searchString, isTransitioning]);

  // Intercept clicks on links across navigation bars and internal pages
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      // Don't trigger if modifier keys are pressed (new tab)
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const anchor = target.closest("a");
      if (!anchor) return;

      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const href = anchor.getAttribute("href");
      if (!href) return;
      if (
        href.startsWith("#") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("javascript:")
      ) {
        return;
      }

      try {
        const targetUrl = new URL(href, window.location.href);

        // Only transition internal same-origin links
        if (targetUrl.origin !== window.location.origin) return;

        const currentFull = window.location.pathname + window.location.search;
        const targetFull = targetUrl.pathname + targetUrl.search;

        // If clicking the current exact page, don't trigger
        if (targetFull === currentFull) return;

        const label = getFriendlyTaskLabel(targetUrl.pathname, targetUrl.search, anchor);
        startTransition(label);
      } catch {
        // Fallback for non-standard URLs
      }
    };

    // Listen on window for back/forward navigation
    const handlePopState = () => {
      startTransition("Navigating...");
    };

    // Escape key dismisses immediately
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsTransitioning(false);
        setIsExiting(false);
      }
    };

    // Custom event listener for manual trigger
    const handleCustomTrigger = (e: Event) => {
      const customEvent = e as CustomEvent<{ label?: string }>;
      startTransition(customEvent.detail?.label || "Terminal");
    };

    document.addEventListener("click", handleDocumentClick, true);
    window.addEventListener("popstate", handlePopState);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("btc-transition-start", handleCustomTrigger);

    return () => {
      document.removeEventListener("click", handleDocumentClick, true);
      window.removeEventListener("popstate", handlePopState);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("btc-transition-start", handleCustomTrigger);
    };
  }, [startTransition]);

  if (!isTransitioning) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading task transition"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center px-4 transition-all duration-300 ease-out select-none ${
        isExiting
          ? "opacity-0 scale-105 pointer-events-none"
          : "opacity-100 scale-100 backdrop-blur-xl bg-slate-950/80 dark:bg-black/85"
      }`}
      style={{ willChange: "opacity, transform" }}
    >
      {/* 1. Ambient Golden Radiance Halo */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-amber-500/20 blur-3xl pointer-events-none animate-pulse" />

      {/* 2. Concentric Golden Shockwave Rings */}
      <div className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full border border-amber-400/40 animate-btc-ring-1 pointer-events-none" />
      <div className="absolute w-44 h-44 sm:w-56 sm:h-56 rounded-full border border-yellow-300/30 animate-btc-ring-2 pointer-events-none" />

      {/* 3. Centerpiece "Big B" Bitcoin Logo Badge - Moving & Spinning in a Circle */}
      <div className="relative group flex items-center justify-center">
        {/* Orbital Circular Track & Fast Golden Comet Spinner */}
        <div className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-amber-400/20 pointer-events-none" />
        <div
          className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full border-2 border-transparent border-t-amber-400 border-r-yellow-300 pointer-events-none animate-spin"
          style={{ animationDuration: "1.2s" }}
        />

        {/* Circular Orbit Movement Container ("B Moves in a Circle") */}
        <div className="animate-btc-orbit flex items-center justify-center">
          {/* Continuous 360-Degree Circular Spin ("B Spins in a Circle") */}
          <div className="animate-btc-spin flex items-center justify-center">
            {/* Golden Circular Bitcoin Medallion Badge */}
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 text-slate-950 flex items-center justify-center shadow-[0_0_65px_rgba(245,158,11,0.7),0_20px_40px_rgba(0,0,0,0.55)] border-4 border-yellow-200/90 relative overflow-hidden select-none">
              {/* Diagonal Metallic Shimmer Reflection */}
              <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden rounded-full">
                <div className="absolute -inset-full bg-gradient-to-r from-transparent via-white/55 to-transparent transform -skew-x-12 animate-btc-shimmer" />
              </div>

              {/* Inner Embossed Concentric Coin Rings */}
              <div className="absolute inset-2 sm:inset-2.5 rounded-full border-2 border-amber-950/25 pointer-events-none" />
              <div className="absolute inset-3.5 sm:inset-4 rounded-full border border-dashed border-amber-950/20 pointer-events-none" />

              {/* The Big ₿ Symbol */}
              <span className="text-6xl sm:text-7xl font-black text-slate-950 tracking-tighter drop-shadow-md select-none">
                ₿
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Brand Title Underneath */}
      <div className="mt-7 flex items-center gap-2">
        <span className="text-base sm:text-lg font-black text-white tracking-tight drop-shadow-sm">
          BitcoinCrypto<span className="text-amber-400">.tech</span>
        </span>
        <span className="text-[10px] font-mono font-extrabold px-1.5 py-0.5 rounded-md bg-amber-400/20 text-amber-300 border border-amber-400/40 uppercase tracking-widest shadow-xs">
          TERMINAL
        </span>
      </div>

      {/* 5. Destination / Task Pill */}
      <div className="mt-2.5 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 dark:bg-slate-900/90 border border-amber-500/30 text-xs font-bold text-amber-300 shadow-lg shadow-amber-500/10">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        <span>Switching to {targetLabel}</span>
      </div>

      {/* 6. Dynamic Golden Progress Beam */}
      <div className="w-40 h-1 bg-slate-800/80 rounded-full overflow-hidden mt-3.5 border border-slate-700/50 relative">
        <div className="w-1/2 h-full bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-300 rounded-full animate-btc-progress" />
      </div>
    </div>
  );
}

export default function BitcoinPageTransition() {
  return (
    <Suspense fallback={null}>
      <BitcoinTransitionContent />
    </Suspense>
  );
}
