import React from "react";
import Container from "../ui/container";
import ScrollScaleVideo from "../features/scrollscalevideo";

export default function Hero() {
  return (
    <section>
      <Container >
        {/* grid */}
        <div className=" grid grid-cols-2 ">
          {/* left grid */}
          <div className=" pt-34">
            <h1 className=" font-JetBrain text-[56px] leading-tight">
              AI Support Agent Platform
            </h1>
            <p className=" font-Karma text-[22px] text-black mt-2 leading-10 w-[95%] ">
              Aergoos lets you build and deploy an AI support agent trained on
              your own knowledge — no AI team or infrastructure required. It
              answers from your documents and live data, so responses stay
              accurate as your business changes.
            </p>
          </div>

          {/* right grid */}
          <div className=" pt-30 select-none ">
            <img src="/images/macwindowsec.svg" className=" w-150 ml-auto drop-shadow-xl drop-shadow-black/60 " />
          </div>
        </div>
      </Container>

      <div className=" mt-24 w-full">
        <ScrollScaleVideo />
      </div>
    </section>
  );
}
