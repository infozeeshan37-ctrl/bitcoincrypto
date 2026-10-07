import React from "react";
import Script from "next/script";

interface AdSenseScriptProps {
  clientId?: string;
}

export default function AdSenseScript({
  clientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "ca-pub-XXXXXXXXXXXXXXXX"
}: AdSenseScriptProps) {
  // If the placeholder is present or clientId is set, render the AdSense script tag and account verification meta tag
  return (
    <>
      {/* Google AdSense Site Verification Meta Tag */}
      <meta name="google-adsense-account" content={clientId} />

      {/* Google AdSense Async Core Library Script */}
      <Script
        id="google-adsense"
        async
        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${clientId}`}
        crossOrigin="anonymous"
        strategy="afterInteractive"
      />
    </>
  );
}
