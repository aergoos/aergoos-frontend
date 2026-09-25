import React from "react";
import Container from "../ui/container";

export default function ValuePillars() {
  return (
    <section>
      <Container className=" max-w-277.75! border-y-2 border-black py-10 px-4 relative">
        <h1 className=" font-JetBrain text-[26px] text-black tracking-tight mb-10 ">
          <span className=" text-blue ">&#123;</span>One agent, every source of
          truth<span className=" text-blue">&#125;</span>
        </h1>
        <div className=" grid grid-cols-3 items-start gap-4 ">
          <div className=" ">
            <p className=" text-black font-JetBrain text-[20px] ">01</p>
            <h1 className=" mt-0.5 font-JetBrainReg text-[18px] text-black ">
              Documents and live data, together
            </h1>
            <p className=" font-Karma text-[16px] text-black mt-2 w-full max-w-[80%] ">
              Static policies and real-time records answer from the same agent —
              most tools handle only one.
            </p>
          </div>

          <div className=" ">
            <p className=" text-black font-JetBrain text-[20px] ">02</p>
            <h1 className=" mt-0.5 font-JetBrainReg text-[18px] text-black ">
              Switch models freely
            </h1>
            <p className=" font-Karma text-[16px] text-black mt-2 w-full max-w-[80%] ">
              Move between providers or hosting modes without rebuilding your
              knowledge base.
            </p>
          </div>

          <div className=" ">
            <p className=" text-black font-JetBrain text-[20px] ">03</p>
            <h1 className=" mt-0.5 font-JetBrainReg text-[18px] text-black ">
              No confident guessing
            </h1>
            <p className=" font-Karma text-[16px] text-black mt-2 w-full max-w-[80%] ">
              When the agent isn't sure, it says so or hands off — never invents
              an answer.
            </p>
          </div>
        </div>

        <div className=" w-[1.5px] h-120 bg-black/50 absolute left-0 -top-20.5 "></div>
        <div className=" w-[1.5px] h-120 bg-black/50 absolute right-0 -top-20.5 "></div>
      </Container>
    </section>
  );
}
