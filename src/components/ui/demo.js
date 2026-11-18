"use client";

import * as React from "react";
import DitherBackground, {
  ShaderBackground,
} from "@/components/ui/ditherbackground";

export { ShaderBackground };

export default function Demo({
  children,
  className = "",
  height,
  waveamplitude,
  wavescale,
  ...props
}) {
  return (
    <DitherBackground
      className={className}
      height={height}
      {...props}
      wavescale={wavescale}
      waveamplitude={waveamplitude}
    >
      {children}
    </DitherBackground>
  );
}
