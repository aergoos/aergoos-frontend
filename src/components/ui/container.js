import React from "react";

export default function Container({ children, className }) {
  return (
    <div className={` w-full max-w-350 mx-auto px-6 md:px-10 lg:px-10 xl:px-10 2xl:px-0 ${className} `}>{children}</div>
  );
}
