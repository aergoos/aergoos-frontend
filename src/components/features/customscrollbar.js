"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { useLenis } from "lenis/react";

export default function CustomScrollBar({
  trackHeight = 200,
  thumbHeight = 20,
  trackWidth = 4,
  className = "",
}) {
  const trackRef = useRef(null);
  const thumbRef = useRef(null);
  const isDragging = useRef(false);
  const dragStartY = useRef(0);
  const dragStartScroll = useRef(0);
  const maxTravel = trackHeight - thumbHeight;

  const updateThumb = useCallback(
    (progress) => {
      if (!thumbRef.current) return;
      const y = Math.max(0, Math.min(1, progress)) * maxTravel;
      thumbRef.current.style.transform = `translate3d(0, ${y}px, 0)`;
    },
    [maxTravel],
  );

  const lenis = useLenis((l) => {
    if (!isDragging.current) updateThumb(l.progress);
  });

  useEffect(() => {
    if (lenis) return;
    const onScroll = () => {
      if (isDragging.current) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0) updateThumb(window.scrollY / max);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lenis, updateThumb]);

  const handleTrackClick = (e) => {
    if (isDragging.current || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const targetProgress = Math.max(
      0,
      Math.min(1, (e.clientY - rect.top - thumbHeight / 2) / maxTravel),
    );
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const targetScroll = targetProgress * maxScroll;

    if (lenis) {
      lenis.scrollTo(targetScroll, {
        duration: 0.8,
        easing: (t) => 1 - Math.pow(1 - t, 3),
      });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  };

  const handlePointerDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    isDragging.current = true;
    dragStartY.current = e.clientY;
    dragStartScroll.current = lenis ? lenis.scroll : window.scrollY;
  };

  const handlePointerMove = (e) => {
    if (!isDragging.current) return;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    const deltaY = e.clientY - dragStartY.current;
    const targetScroll = Math.max(
      0,
      Math.min(
        maxScroll,
        dragStartScroll.current + (deltaY / maxTravel) * maxScroll,
      ),
    );
    updateThumb(maxScroll > 0 ? targetScroll / maxScroll : 0);
    if (lenis) lenis.scrollTo(targetScroll, { immediate: true });
    else window.scrollTo(0, targetScroll);
  };

  const handlePointerUp = (e) => {
    if (isDragging.current) {
      isDragging.current = false;
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  return (
    <div
      className={`fixed right-6 top-1/2 -translate-y-1/2 z-50 flex items-center justify-center select-none py-2 px-2 cursor-pointer ${className}`}
      style={{ touchAction: "none" }}
      onClick={handleTrackClick}
      aria-label="Scroll position indicator"
      role="scrollbar"
    >
      <div
        ref={trackRef}
        className="relative rounded-full"
        style={{
          width: `${trackWidth}px`,
          height: `${trackHeight}px`,
          backgroundColor: "#cbc6ba",
        }}
      >
        <div
          ref={thumbRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="absolute left-0 top-0 rounded-full cursor-grab active:cursor-grabbing will-change-transform"
          style={{
            width: `${trackWidth}px`,
            height: `${thumbHeight}px`,
            backgroundColor: "#d9521d",
            transform: "translate3d(0, 0, 0)",
          }}
        />
      </div>
    </div>
  );
}
