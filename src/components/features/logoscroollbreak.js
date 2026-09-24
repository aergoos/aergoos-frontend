"use client";
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
      <h1
        className={` font-JetBrain text-[38px] text-black flex flex-row justify-center items-center
        ${isScrolled ? "tracking-[-4] " : " tracking-wider  "} duration-300 ease-in-out`}
      >
        <span className="tilt" >A</span>
        <span>R</span>
        <span>G</span>
        <span
          className={` ${isScrolled ? "text-orange" : "text-black"} duration-300 `}
        >
          O
        </span>
        <span
          className={` ${isScrolled ? "-ml-3 text-orange" : "ml-0 text-black"} duration-300 ease-in-out `}
        >
          O
        </span>
        <span>S</span>
      </h1>
    </>
  );
}
