import { FeatureGrid } from "@/features/marketing/ui/feature-grid";
import { HeroSection } from "@/features/marketing/ui/hero-section";

export default function Home() {
  return (
    <main className="page-shell">
      <HeroSection />
      <FeatureGrid />
    </main>
  );
}
