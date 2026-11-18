import React from "react";
import Container from "../ui/container";
import Demo from "../ui/demo";
import TryFree from "../features/tryfree";
import Link from "next/link";

export default function Hero() {
  return (
    <section>
      <Demo
        height="80vh"
        frequency={1}
        speed={0.04}
        waveamplitude={0.5}
        wavescale={2}
        colors={["#d9521d", "#ffb27c", "#ffffe7", "#ffffe7"]}
      >
        <Container className="relative z-20 pt-36 sm:pt-40 pb-16 flex flex-col items-center justify-center text-center">
          <h1 className="font-Telma text-[86px] font-bold text-black tracking-tight leading-[1.08] max-w-4xl mx-auto flex flex-col justify-center items-center ">
            <span>Built to know,</span>
            <span className=" -mt-2 ">not to guess.</span>
          </h1>

          <p className="font-RedHatReg text-[22px] text-black/80 mt-6 leading-relaxed w-[50%] mx-auto">
            Aergoos lets you build and deploy an AI support agent trained on
            your own knowledge — no AI team or infrastructure required. It
            answers from your documents and live data, so responses stay
            accurate as your business changes.
          </p>

          <div className="flex flex-row items-center justify-center gap-3.5 mt-8">
            <TryFree href="/" />
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-black/14 text-black px-6 py-2.5 text-[15px] font-JetBrainReg font-medium backdrop-blur-sm "
            >
              Talk to Sales
            </Link>
          </div>
        </Container>
      </Demo>
    </section>
  );
}
