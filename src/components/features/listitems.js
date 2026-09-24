import React from "react";

export default function ListItems({ children, className }) {
  return (
    <li
      className={` font-JetBrain text-[20px] text-black tracking-tight hover:text-orange duration-300 ease-in-out
    after:content-[''] after:w-2 after:h-2 after:bg-orange after:rounded-full after:absolute after:-left-3 after:top-[50%] after:translate-y-[-50%] after:scale-0 hover:after:scale-100 hover:after:duration-300 hover:after:ease-in-out 
    ${className} relative`}
    >
      {children}
    </li>
  );
}
