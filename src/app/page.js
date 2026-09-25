import Hero from "@/components/landing/hero";
import HighlightStrip from "@/components/landing/highlightstrip";
import ValuePillars from "@/components/landing/valuepillars";
import Workflow from "@/components/landing/workflow";

export default function Home() {
  return (
    <main className=" pb-100 ">
      <Hero />
      <Workflow />
      <HighlightStrip />
      <ValuePillars />
    </main>
  );
}
