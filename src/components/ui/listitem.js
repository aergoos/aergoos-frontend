import Link from "next/link";
import React from "react";

export default function ListItem({ children, className, href }) {
  return (
    <li className={` font-Karma text-[18px] text-cream/60 ${className} `}>
      <Link href={href}>{children}</Link>
    </li>
  );
}
