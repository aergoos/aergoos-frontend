import React from "react";
import Container from "../ui/container";
import PricingDemoCart from "./pricingdemocart";
import { ChartSpline } from "lucide-react";
import Label from "../ui/label";

export default function PricingDemo() {
  return (
    <section>
      <Container className=" my-20 p-10 border-2 border-black/50 relative">
        <Label className=" text-orange! tracking-tight mb-16 flex flex-row justify-start items-center gap-2 ">
          Simple pricing, as you grow
          <ChartSpline size="30px" />
        </Label>
        <div>
          <PricingDemoCart />
        </div>
        <div className=" h-20 w-2 border-l-2 border-black/50 absolute -left-0.5 -bottom-20.5 "></div>
        <div className=" h-20 w-2 border-l-2 border-black/50 absolute -right-2 -bottom-20.5 "></div>
      </Container>
    </section>
  );
}
