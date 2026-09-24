import React from "react";
import Container from "../ui/container";

export default function CoreArchitecture() {
  return (
    <section>
      <Container className=" max-w-300! py-30 px-10 relative">
        <h1 className=" text-[38px] font-JetBrain text-black  ">
          Core Architecture
        </h1>
        
        <div className=" grid grid-cols-2 grid-rows-2 gap-y-10 mt-10 ">
          <div>
            <h2 className=" font-JetBrain text-[24px] text-black mb-4 ">
              Ingestion & Indexing
            </h2>
            <p className=" font-JetBrainReg text-[18px] text-black w-[80%] ">
              Feed it PDFs, CMS content, or live REST endpoints. It parses,
              chunks, dedupes, and embeds everything automatically. No labeling,
              no schema mapping, no tagging.
            </p>
          </div>
          <div>
            <h2 className=" font-JetBrain text-[24px] text-black mb-4 ">
              Personas & Guardrails
            </h2>
            <p className=" font-JetBrainReg text-[18px] text-black w-[80%] ">
              Dial in temperature, thresholds, and scope at runtime. Pick a tone
              (Supportive, Technical, Executive) and it stays on-brand.
              Off-topic queries and prompt injections get shut down on the spot.
            </p>
          </div>
          <div>
            <h2 className=" font-JetBrain text-[24px] text-black mb-4 ">
              BYOK or Hosted
            </h2>
            <p className=" font-JetBrainReg text-[18px] text-black w-[80%] ">
              Bring your own OpenAI, Claude, or Gemini keys with zero markup, or
              use our managed compute. Swap models in one click without
              re-ingesting docs or touching your setup.
            </p>
          </div>
          <div>
            <h2 className=" font-JetBrain text-[24px] text-black mb-4 ">
              Citations & No-Guess Answers
            </h2>
            <p className=" font-JetBrainReg text-[18px] text-black w-[80%] ">
              Every answer is grounded in retrieved content and points to the
              exact page, timestamp, or record. If confidence is too low, the
              agent says so instead of making something up.
            </p>
          </div>
        </div>

        {/* dashed ;lines */}
        <div className=" w-0.5 h-full absolute left-0 top-0 border-l-2 border-black/40 border-dashed "></div>
        <div className=" w-0.5 h-full absolute right-0 top-0 border-r-2 border-black/40 border-dashed "></div>
        <div className=" w-full h-0.5 absolute left-0 top-16 border-t-2 border-black/40 border-dashed "></div>
        <div className=" w-full h-0.5 absolute right-0 bottom-16 border-b-2 border-black/40 border-dashed "></div>

        {/* corner box */}
        <div className=" w-4 h-4 bg-blue absolute -left-2 top-14 "></div>
        <div className=" w-4 h-4 bg-orange absolute -right-2 top-14 "></div>
        <div className=" w-4 h-4 bg-notlime absolute -left-2 bottom-14 "></div>
        <div className=" w-4 h-4 bg-black absolute -right-2 bottom-14 "></div>
      </Container>
    </section>
  );
}
