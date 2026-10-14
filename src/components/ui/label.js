import React from "react";

export default function Label({ children, className }) {
  return (
    <h2
      className={` font-JetBrain text-[26px] text-black tracking-tight ${className} `}
    >
      {children}
    </h2>
  );
}
