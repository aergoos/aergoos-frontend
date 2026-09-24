import React from "react";
import Container from "../ui/container";

export default function Proof() {
  return (
    <section className=" w-full max-w-350 mx-auto select-none ">
      <Container className=" max-w-300! py-40 px-10 relative">
        <h1 className=" text-[38px] font-JetBrain text-black ">
          Engineered for Scale
        </h1>

        <div className=" grid grid-cols-3 gap-4 mt-10 ">
          <div className=" flex flex-col justify-center ">
            <div className=" flex flex-row justify-start items-center gap-4 mb-3 ">
              <img src="/icons/autonomous.svg" className="w-10 " />
              <h2 className=" font-JetBrain text-[24px] text-black ">
                Autonomous
              </h2>
            </div>
            <p className=" font-JetBrainReg text-[18px] text-black w-[80%] ">
              84% of queries resolved without human handoff
            </p>
          </div>

          <div className=" flex flex-col justify-center ">
            <div className=" flex flex-row justify-start items-center gap-4 mb-3 ">
              <img src="/icons/fast.svg" className="w-10" />
              <h2 className=" font-JetBrain text-[24px] text-black ">fast</h2>
            </div>

            <p className=" font-JetBrainReg text-[18px] text-black w-[80%] ">
              &lt;450ms median retrieval latency
            </p>
          </div>

          <div className=" flex flex-col justify-center ">
            <div className=" flex flex-row justify-start items-center gap-4 mb-3 ">
              <img src="/icons/sync.svg" className="w-10" />
              <h2 className=" font-JetBrain text-[24px] text-black ">Synced</h2>
            </div>

            <p className=" font-JetBrainReg text-[18px] text-black w-[80%] ">
              Zero downtime live sync across 50k+ vector chunks
            </p>
          </div>
        </div>

        {/* dashed ;lines */}
        <div className=" w-0.5 h-full absolute left-0 top-0 border-l-2 border-black/40 border-dashed "></div>
        <div className=" w-0.5 h-full absolute right-0 top-0 border-r-2 border-black/40 border-dashed "></div>
        <div className=" w-full h-0.5 absolute left-0 top-16 border-t-2 border-black/40 border-dashed "></div>
        <div className=" w-full h-0.5 absolute right-0 bottom-16 border-b-2 border-black/40 border-dashed "></div>

        {/* corner box */}
        <div className=" w-4 h-4 bg-orange absolute -left-2 top-14 "></div>
        <div className=" w-4 h-4 bg-blue absolute -right-2 top-14 "></div>
        <div className=" w-4 h-4 bg-notlime absolute -left-2 bottom-14 "></div>
        <div className=" w-4 h-4 bg-black absolute -right-2 bottom-14 "></div>
      </Container>
    </section>
  );
}
