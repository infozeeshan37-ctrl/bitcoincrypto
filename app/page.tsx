import Hero from "@/components/home/Hero";
import LiveEcosystemOverview from "@/components/home/LiveEcosystemOverview";
import HomeAISignalsBots from "@/components/home/HomeAISignalsBots";
import ValuePillars from "@/components/home/ValuePillars";
import PlatformOverview from "@/components/home/PlatformOverview";
import TradingConcepts from "@/components/home/TradingConcepts";
import ResearchHighlights from "@/components/home/ResearchHighlights";
import TrustSecurity from "@/components/home/TrustSecurity";
import NewsletterCTA from "@/components/home/NewsletterCTA";

export default function HomePage() {
  return (
    <div className="space-y-0">
      <Hero />
      <LiveEcosystemOverview />
      <HomeAISignalsBots />
      <ValuePillars />
      <PlatformOverview />
      <TradingConcepts />
      <ResearchHighlights />
      <TrustSecurity />
      <NewsletterCTA />
    </div>
  );
}
