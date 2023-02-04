import React from "react";
import Link from "next/link";
import { NavBox } from "./RenderNavStyle";

const RenderNav = () => {
  return (
    <>
      <NavBox>
        <ul>
          <li>
            <Link href={"/render/csr"}>CSR</Link>
          </li>
          <li>
            <Link href={"/render/ssr"}>SSR</Link>
          </li>
          <li>
            <Link href={"/render/ssg"}>SSG</Link>
          </li>
          <li>
            <Link href={"/render/isr"}>ISR</Link>
          </li>
        </ul>
      </NavBox>
    </>
  );
};

export default RenderNav;
