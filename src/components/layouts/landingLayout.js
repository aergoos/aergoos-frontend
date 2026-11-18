import React from "react";
import LandingNavbar from "./landingnavbar";
import Footer from "./footer";
import CustomScrollBar from "../features/customscrollbar";

export default function LandingLayout({ children }) {
  return (
    <>
      <LandingNavbar />
      {children}
      <CustomScrollBar className="  hidden lg:block " />
      <Footer />
    </>
  );
}
