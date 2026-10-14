"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ScrollScaleVideo() {
  const containerRef = useRef(null);
  const videoRef = useRef(null);

  useGSAP(
    () => {
      gsap.fromTo(
        videoRef.current,
        { width: "57%" },
        {
          width: "100%",
          ease: "none",
          borderRadius: 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom bottom-=450",
            scrub: true,
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef}>
      <video
        ref={videoRef}
        className=" mx-auto rounded-xl select-none"
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        <source src="/videos/banner.MOV" type="video/mp4" />
      </video>
    </div>
  );
}
