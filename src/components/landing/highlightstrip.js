import React from "react";
import Container from "../ui/container";
import Link from "next/link";

export default function HighlightStrip() {
  return (
    <section>
      <div className=" mt-20 py-6 border-y-2 border-black/50 ">
        <Container className=" py-3 ">
          <div className="w-fit mx-auto flex flex-row justify-center items-center gap-10 relative">
            <p className=" font-JetBrainLig text-[16px] text-black tracking-tight ">
              <b className=" text-orange ">Early access</b> · onboarding first
              teams
            </p>
            <p className=" font-JetBrainLig text-[16px] text-black tracking-tight ">
              Works with ·{" "}
              <b className=" text-orange ">OpenAI, Gemini, Claude</b>
            </p>
            <p className=" font-JetBrainLig text-[16px] text-black tracking-tight ">
              Grounded, cited answers —{" "}
              <b className=" text-orange ">no guessing</b>
            </p>

            <div className=" w-[1.5px] h-45 border-l-2 border-black/50 absolute -left-3.5 -top-9 "></div>
            <div className=" w-[1.5px] h-45 border-r-2 border-black/50 absolute -right-3.5 -top-9 "></div>
          </div>
        </Container>
      </div>

      <div className=" my-20  ">
        <Container className=" grid grid-cols-2 items-center border-2 border-black/50 p-10 ">
          <div>
            <h1 className=" font-JetBrainReg text-[26px] text-black tracking-tight w-full max-w-[60%] ">
              <Link
                href="/"
                className=" underline text-orange hover:text-blue duration-300 ease-out "
              >
                Support
              </Link>{" "}
              that keeps up with your business
            </h1>
            <p className=" font-JetBrainLig text-[14px] text-orange mt-2 ">
              {" "}
              -24/7
            </p>
          </div>
          <div>
            <p className=" font-Karma text-[18px] text-black ">
              Manuals go stale, prices change, inventory shifts by the hour.
              Most support agents can't keep up — Aergoos agents read your
              documents and your live data, so answers stay accurate as your
              business does. Connect a knowledge source once. Every answer after
              that reflects what's actually true today.
            </p>
          </div>
        </Container>
      </div>
    </section>
  );
}
