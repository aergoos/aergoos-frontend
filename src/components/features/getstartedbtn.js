import Link from "next/link";
import React from "react";

export default function GetStartedBtn() {
  return (
    <Link href="/signin">
      <button className=" text-[17px] tracking-tight cursor-pointer bg-black/14 text-black px-6 py-2.5 rounded-full font-JetBrain backdrop-blur-sm ">
        Sign in
      </button>
    </Link>
  );
}
