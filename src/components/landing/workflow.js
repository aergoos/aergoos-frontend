import React from "react";
import Container from "../ui/container";
import Label from "../ui/label";
import { DotIcon, Flame, ShieldCheck, Signature, UserCog } from "lucide-react";

export default function Workflow() {
  return (
    <section className=" mt-20 mb-10 ">
      <Container className=" max-w-277.75! ">
        <Label>From documents to deployed agent</Label>

        <div>
          {/* workflow image */}

          <div className=" grid grid-cols-2 grid-rows-2 items-start gap-4 ml-auto my-10 ">
            <p className=" font-Karma text-[18px] text-black flex flex-row justify-start items-center gap-2 ">
              <Signature className=" text-orange " size="26" /> Upload documents
              or link a live source.
            </p>
            <p className=" font-Karma text-[18px] text-black flex flex-row justify-start items-center gap-2 ">
              <UserCog className=" text-orange " size="26" /> Set its name,
              tone, and boundaries.
            </p>
            <p className=" font-Karma text-[18px] text-black flex flex-row justify-start items-center gap-2 ">
              <ShieldCheck className=" text-orange " size="26" />
              Test real questions before launch.
            </p>
            <p className=" font-Karma text-[18px] text-black flex flex-row justify-start items-center gap-2 ">
              <Flame className=" text-orange " size="26" />
              Embed on your site in one line.
            </p>
          </div>
          <img
            src="/images/heroworkflow.svg"
            className=" col-span-2 select-none pt-10 "
          />
        </div>
      </Container>
    </section>
  );
}
