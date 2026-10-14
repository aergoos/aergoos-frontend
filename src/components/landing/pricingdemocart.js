import React from "react";

export default function PricingDemoCart() {
  return (
    <div className=" grid grid-cols-3 justify-between items-end gap-12 ">
      {/* first */}
      <div className=" border-2 border-black/50 p-6 bg-cream rounded-md h-65 flex flex-col justify-end items-start ">
        <h2 className=" font-JetBrainReg text-[18px] text-black tracking-tight ">
          Starter
        </h2>
        <h3 className=" font-JetBrain text-[38px] text-black mt-2 ">Free</h3>
        <p className=" font-Karma text-[16px] text-black/80 mt-1 mb-4 ">
          1 agent, bring your own key, limited document storage.
        </p>
        <button
          className=" w-full bg-cream border-2 border-black/50 rounded-sm py-2 font-JetBrain text-[18px] text-black
          select-none cursor-pointer "
        >
          Start Free
        </button>
      </div>

      {/* second */}
      <div className=" border-2 border-orange p-6 bg-cream rounded-md h-70 flex flex-col justify-end items-start ">
        <h2 className=" font-JetBrainReg text-[18px] text-black tracking-tight ">
          Pro
        </h2>
        <h3 className=" font-JetBrain text-[38px] black mt-2 ">
          From $49<span className="text-black/60 text-[16px] -ml-1.5 ">/mo</span>
        </h3>
        <p className=" font-Karma text-[16px] text-black/80 mt-2 mb-4 ">
          Multiple agents, managed tokens, faster sync, priority support.
        </p>
        <button
          className=" w-full bg-orange border-2 border-orange rounded-sm py-2 font-JetBrain text-[18px] text-black
          select-none cursor-pointer "
        >
          Start Free
        </button>
      </div>

      {/* third */}
      <div className=" border-2 border-black/50 p-6 bg-cream rounded-md h-65 flex flex-col justify-end items-start ">
        <h2 className=" font-JetBrainReg text-[18px] text-black ">
          Enterprise
        </h2>
        <h3 className=" font-JetBrain text-[38px] text-black mt-2 ">Custom</h3>
        <p className=" font-Karma text-[16px] text-black/80 mt-2 mb-4 ">
          Dedicated support, custom limits, and security review.
        </p>
        <button
          className=" w-full bg-cream border-2 border-black/50 rounded-sm py-2 font-JetBrain text-[18px] text-black
          select-none cursor-pointer "
        >
          Talk to us
        </button>
      </div>
    </div>
  );
}
