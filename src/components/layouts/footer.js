"use client";

import * as React from "react";
import DitherFooter from "../ui/ditherfooter";

export default function Footer(props) {
  return (
    <DitherFooter
      headingFont="font-JetBrain"
      headingTracking="tracking-tighter"
      linkFont="font-RedHatReg"
      taglineFont="font-RedHatReg"
      headingSize="18px"
      linkSize="14px"
      taglineSize="16px"
      logo="/logo/aergoosicon.svg"
      logoFont="font-JetBrain"
      logoSize="26px"
      copyrightFont="RedHatReg"
      {...props}
    />
  );
}
