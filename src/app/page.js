
import Hero from "@/components/landing/hero";
import HighlightStrip from "@/components/landing/highlightstrip";
import PricingDemo from "@/components/landing/pricingdemo";
import ValuePillars from "@/components/landing/valuepillars";
import Workflow from "@/components/landing/workflow";

export default function Home() {
  return (
    <main>
      <Hero />
      <Workflow />
      <HighlightStrip />
      <ValuePillars />
      <PricingDemo />
    </main>
  );
}
