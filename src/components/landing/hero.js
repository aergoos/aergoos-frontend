import React from "react";
import Container from "../ui/container";
import ScrollScaleVideo from "../features/scrollscalevideo";

export default function Hero() {
  return (
    <section>
      <Container>
        {/* grid */}
        <div className=" grid grid-cols-2 ">
          {/* left grid */}
          <div className=" pt-34">
            <h1 className=" font-JetBrain text-[56px] leading-tight">
              Aergoos, Built From What You Know
            </h1>
            <p className=" font-Karma text-[24px] text-black mt-2 leading-11 ">
              Trained on your truth, fluent in the language of your product —
              one agent that{" "}
              <b className=" px-3 py-1 bg-orange rounded-xl select-none cursor-help ">
                reads your documents,
              </b>{" "}
              listens to your{" "}
              <b className=" px-3 py-1 bg-notlime rounded-xl select-none cursor-help ">
                live data,
              </b>{" "}
              and{" "}
              <b className=" px-3 py-1 bg-blue rounded-xl select-none cursor-help ">
                speaks for your business
              </b>{" "}
              without missing a beat. A more literal alternative, if you want
              something closer to plain-spoken
            </p>
          </div>

          {/* right grid */}
          <div className=" pt-40 ">
            <img src="/images/heroworkflow.svg" />
          </div>
        </div>
      </Container>

      <div className=" mt-24 w-full">
        <ScrollScaleVideo />
      </div>
    </section>
  );
}
