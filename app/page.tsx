import Hero from "@/components/home/Hero";
import HomeAISignalsBots from "@/components/home/HomeAISignalsBots";
import LiveEcosystemOverview from "@/components/home/LiveEcosystemOverview";
import PlatformOverview from "@/components/home/PlatformOverview";
import ValuePillars from "@/components/home/ValuePillars";
import TradingConcepts from "@/components/home/TradingConcepts";
import ResearchHighlights from "@/components/home/ResearchHighlights";
import TrustSecurity from "@/components/home/TrustSecurity";
import NewsletterCTA from "@/components/home/NewsletterCTA";

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* 1. Clean, AdSense-Friendly Hero Header with Feature Badges */}
      <Hero />

      {/* 2. Compact AI Trading Signals & Algorithmic Bots Summary Hub */}
      <HomeAISignalsBots />

      {/* 2. Real-Time Crypto Ecosystem & Derivatives Intelligence */}
      <LiveEcosystemOverview />

      {/* 3. Platform Architecture & Data Integrity */}
      <PlatformOverview />

      {/* 4. Value Pillars & Core Advantages */}
      <ValuePillars />

      {/* 5. Modern Trading Concepts Academy */}
      <TradingConcepts />

      {/* 6. Institutional Research Highlights */}
      <ResearchHighlights />

      {/* 7. Institutional Trust & Security Protocol */}
      <TrustSecurity />

      {/* 8. Intelligence Newsletter Subscription */}
      <NewsletterCTA />
    </div>
  );
}
