import Hero from "@/components/landing/hero";
import WorkVisual from "@/components/landing/workvisual";
import LandingLayout from "@/components/layouts/landingLayout";

export default function Home() {
  return (
    <>
      <LandingLayout>
        <main>
          <Hero />
          <WorkVisual />
        </main>
      </LandingLayout>
    </>
  );
}
