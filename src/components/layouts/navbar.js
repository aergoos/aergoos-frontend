import Link from "next/link";
import List from "../features/list";
import ListItems from "../features/listitems";
import LogoScroollBreak from "../features/logoscroollbreak";
import Container from "../ui/container";
import GetStartedBtn from "../features/getstartedbtn";

export default function Navbar() {
  return (
    <nav className="w-full max-w-full bg-cream h-18 pt-1.5 fixed top-0 left-[50%] translate-x-[-50%] mb-20 select-none ">
      <Container>
        <div className=" flex flex-row justify-between items-center relative">
          {/* logo */}
          <LogoScroollBreak />
          {/* logo */}

          {/* page btns */}
          <List className=" flex flex-row justify-center items-center gap-8 absolute left-[50%] translate-x-[-50%] top-[50%] translate-y-[-50%] ">
            <Link href="/">
              <ListItems>Pricing</ListItems>
            </Link>
            <Link href="/">
              <ListItems>Resource</ListItems>
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
