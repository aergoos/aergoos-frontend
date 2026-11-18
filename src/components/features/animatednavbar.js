"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function AnimatedNavbar({ children, className = "" }) {
  const navRef = useRef(null);
  const isScrolledRef = useRef(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const nav = navRef.current;
    if (!nav) return;

    // Hardware acceleration hints to prevent reflow jitter
    gsap.set(nav, {
      force3D: true,
      willChange: "height, box-shadow",
    });

    const ctx = gsap.context(() => {
      const updateNav = (scrolled, immediate = false) => {
        if (scrolled === isScrolledRef.current && !immediate) return;
        isScrolledRef.current = scrolled;

        if (typeof children === "function") {
          setIsScrolled(scrolled);
        }

        gsap.to(nav, {
          background: scrolled ? "#ffffe7" : "transparent",
          boxShadow: scrolled
            ? "0 4px 20px -2px rgba(10, 10, 10, 0.06)"
            : "0 0 0 0 rgba(0, 0, 0, 0)",
          duration: immediate ? 0 : 0.5,
          ease: "expoScale",
          overwrite: "auto",
        });
      };

      // Set initial state without animation on page load
      const initialScroll = typeof window !== "undefined" ? window.scrollY : 0;
      updateNav(initialScroll > 50, true);

      ScrollTrigger.create({
        start: 50,
        onUpdate: (self) => {
          updateNav(self.scroll() > 50);
        },
      });
    }, navRef);

    return () => ctx.revert();
  }, [children]);

  return (
    <nav
      ref={navRef}
      className={`w-full max-w-full fixed top-0 left-0 right-0 select-none z-50 flex items-center bg-cream h-16 ${className}`}
      style={{
        transform: "translateZ(0)",
        backfaceVisibility: "hidden",
      }}
    >
      {typeof children === "function" ? children({ isScrolled }) : children}
    </nav>
  );
}
