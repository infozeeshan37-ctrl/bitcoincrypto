import HomeTradingSuiteHero from "@/components/home/HomeTradingSuiteHero";
import LiveEcosystemOverview from "@/components/home/LiveEcosystemOverview";
import PlatformOverview from "@/components/home/PlatformOverview";
import TrustSecurity from "@/components/home/TrustSecurity";
import NewsletterCTA from "@/components/home/NewsletterCTA";

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* 1. Cryptocurrency Trading Suite & Signals Engine Hero */}
      <HomeTradingSuiteHero />

      {/* 2. Real-Time Crypto Ecosystem & Derivatives Intelligence */}
      <LiveEcosystemOverview />

      {/* 3. Platform Architecture & Data Integrity */}
      <PlatformOverview />

      {/* 4. Institutional Trust & Security Protocol */}
      <TrustSecurity />

      {/* 5. Intelligence Newsletter Subscription */}
      <NewsletterCTA />
    </div>
  );
}
