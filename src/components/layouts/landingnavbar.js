import Link from "next/link";
import List from "../features/list";
import ListItems from "../features/listitems";
import Container from "../ui/container";
import GetStartedBtn from "../features/getstartedbtn";

export default function LandingNavbar() {
  return (
    <nav className=" absolute top-0 left-0 h-16 flex justify-center items-center w-full z-50 select-none">
      <Container>
        <div className="flex flex-row justify-between items-center relative w-full ">
          {/* logo */}
          <Link
            href="/"
            className="flex flex-row justify-center items-center gap-1  "
          >
            <img src="/logo/aergoosicon.svg" className=" w-9 " />
            <h2 className=" text-[28px] text-black font-JetBrain tracking-tighter ">
              AERGOOS
            </h2>
          </Link>
          {/* logo */}
          {/* page btns */}
          <List className="flex flex-row justify-center items-center gap-8 absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] ">
            <Link href="/">
              <ListItems>Resources</ListItems>
            </Link>
            <Link href="/">
              <ListItems>Docs</ListItems>
            </Link>
            <Link href="/#pricing">
              <ListItems>Pricing</ListItems>
            </Link>
          </List>
          {/* page btns */}
          {/* get started */}
          <GetStartedBtn />
          {/* get started */}
        </div>
      </Container>
    </nav>
  );
}
