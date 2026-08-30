import HomeTradingSuiteHero from "@/components/home/HomeTradingSuiteHero";
import LiveEcosystemOverview from "@/components/home/LiveEcosystemOverview";
import TrustSecurity from "@/components/home/TrustSecurity";
import NewsletterCTA from "@/components/home/NewsletterCTA";

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* 1. Cryptocurrency Trading Suite & Signals Engine Hero */}
      <HomeTradingSuiteHero />

      {/* 2. Real-Time Crypto Ecosystem & Derivatives Intelligence */}
      <LiveEcosystemOverview />

      {/* 3. Institutional Trust & Security Protocol */}
      <TrustSecurity />

      {/* 4. Intelligence Newsletter Subscription */}
      <NewsletterCTA />
    </div>
  );
}
