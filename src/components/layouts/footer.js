import React from "react";
import Container from "../ui/container";
import Label from "../ui/label";
import List from "../features/list";
import ListItem from "../ui/listitem";

export default function Footer() {
  return (
    <footer className=" border-t-2 border-black/50 ">
      <Container className=" grid grid-cols-4 gap-20 pt-10 pb-20 ">
        {/* title and tags */}
        <div>
          <div className=" flex flex-row justify-start items-center gap-2 ">
            <h1 className="font-JetBrain text-[38px] text-black tracking-[-4] ">
              <span className=" text-orange ">O</span>
              <span className=" -ml-3 text-orange ">O</span>
            </h1>
            <h2 className=" font-JetBrain text-[26px] text-black ">AERGOOS</h2>
          </div>

          <div className=" flex flex-col justify-start gap-1 pt-60 ">
            <p className=" font-JetBrainLig text-black/50 text-[18px] ">
              © 2026 Aergoos
            </p>
            <div className=" flex flex-row justify-start items-center gap-2 ">
              <a href="#" className=" select-none cursor-pointer ">
                <img src="/icons/x.svg" className=" w-5 " />
              </a>
              <a href="#" className=" select-none cursor-pointer ">
                <img
                  src="/icons/instagram.svg"
                  className=" w-5 grayscale-100 "
                />
              </a>
            </div>
          </div>
        </div>

        <div>
          <Label className=" mb-2 ">Product</Label>
          <List>
            <ListItem href="/">Pricing</ListItem>
            <ListItem href="/">Docs</ListItem>
            <ListItem href="/">Resources</ListItem>
          </List>
        </div>

        <div>
          <Label className=" mb-2 ">Company</Label>
          <List>
            <ListItem href="/">About</ListItem>
            <ListItem href="/">Contact</ListItem>
          </List>
        </div>

        <div>
          <Label className=" mb-2 ">Legal</Label>
          <List>
            <ListItem href="/">Privacy</ListItem>
            <ListItem href="/">Terms</ListItem>
            <ListItem href="/">Security</ListItem>
          </List>
        </div>
      </Container>
    </footer>
  );
}
