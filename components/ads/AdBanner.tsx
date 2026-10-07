"use client";

import React, { useEffect, useRef, useState } from "react";

interface AdBannerProps {
  slotId?: string;
  format?: "auto" | "fluid" | "rectangle" | "horizontal" | "vertical";
  responsive?: boolean;
  className?: string;
  label?: string;
}

declare global {
  interface Window {
    adsbygoogle?: any[];
  }
}

export default function AdBanner({
  slotId = process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID || "1234567890",
  format = "auto",
  responsive = true,
  className = "",
  label = "ADVERTISEMENT"
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-XXXXXXXXXXXXXXXX";

  useEffect(() => {
    try {
      if (typeof window !== "undefined" && adRef.current) {
        // Push ad request to Google AdSense queue
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        setAdLoaded(true);
      }
    } catch (err) {
      console.warn("AdSense push error or ad-blocker detected:", err);
    }
  }, []);

  return (
    <div className={`w-full my-6 text-center overflow-hidden flex flex-col items-center justify-center ${className}`}>
      {/* Google Publisher Policy Compliance Label */}
      <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1.5 block">
        {label}
      </span>

      <div className="w-full min-h-[90px] max-w-5xl rounded-2xl bg-slate-100/60 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800/80 p-2 flex items-center justify-center overflow-hidden transition-colors">
        <ins
          ref={adRef}
          className="adsbygoogle"
          style={{ display: "block", minWidth: "280px" }}
          data-ad-client={clientId}
          data-ad-slot={slotId}
          data-ad-format={format}
          data-full-width-responsive={responsive ? "true" : "false"}
        />
      </div>
    </div>
  );
}
