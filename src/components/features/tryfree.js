import Link from "next/link";
import React from "react";

export default function TryFree({ href, className }) {
  return (
    <Link href={href}>
      <button
        className={` ${className} text-[15px] text-cream font-JetBrainReg tracking-tighter px-6 py-2.5 bg-black rounded-full cursor-pointer  `}
      >
        Try free
      </button>
    </Link>
  );
}
