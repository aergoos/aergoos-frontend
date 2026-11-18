import React from "react";

export default function ListItems({ children, className }) {
  return (
    <li
      className={` font-JetBrain text-[17px] text-black tracking-tighter 
    ${className} `}
    >
      {children}
    </li>
  );
}
