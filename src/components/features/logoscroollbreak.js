"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function LogoScroollBreak() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Link
        href="/"
        className={` font-JetBrainReg text-[32px] text-black flex flex-row justify-center items-center
        ${isScrolled ? "tracking-[-3] " : " tracking-wider "} duration-300 ease-in-out`}
      >
        <span className="tilt">A</span>
        <span>E</span>
        <span>R</span>
        <span>G</span>
        <span
          className={` ${isScrolled ? "text-orange" : "text-black"} duration-300 ease-in-out `}
        >
          O
        </span>
        <span
          className={` ${isScrolled ? "-ml-2.75 text-orange" : "ml-0 text-black"} duration-300 ease-in-out `}
        >
          O
        </span>
        <span>S</span>
      </Link>
    </>
  );
}
