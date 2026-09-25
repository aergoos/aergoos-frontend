import React from "react";
import Container from "../ui/container";

export default function Workflow() {
  return (
    <section className=" my-20 ">
      <Container className=" max-w-[1111px]! " >
        <h1 className=" font-JetBrain text-[26px] text-black tracking-tight mb-10 ">
          - From documents to deployed agent
        </h1>
      </Container>{" "}
      <Container>
        <div className=" grid grid-cols-3 items-center gap-4 ">
          <img src="/images/heroworkflow.svg" className=" col-span-2 " />
          <div className=" flex flex-col justify-start gap-4 ml-auto ">
            <p className=" font-JetBrainLig text-[18px] text-black ">
              - Upload documents or link a live source.
            </p>
            <p className=" font-JetBrainLig text-[18px] text-black ">
              - Set its name, tone, and boundaries.
            </p>
            <p className=" font-JetBrainLig text-[18px] text-black ">
              - Test real questions before launch.
            </p>
            <p className=" font-JetBrainLig text-[18px] text-black ">
              - Embed on your site in one line.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
