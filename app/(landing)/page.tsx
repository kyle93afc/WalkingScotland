import HeroSection from "./hero-section";
import ValuePropStrip from "./value-prop-strip";
import FeaturedWalks from "./featured-walks";
import RegionShowcase from "./region-showcase";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <ValuePropStrip />
      <FeaturedWalks />
      <RegionShowcase />
    </main>
  );
}
