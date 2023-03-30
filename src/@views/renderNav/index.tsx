import React from "react";
import Link from "next/link";
import styled from "@emotion/styled";

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

export const NavBox = styled.nav`
  display: block;
  position: fixed;
  top: 5rem;
  left: 0;
  width: 100%;
  border-bottom: 0.1rem solid #eee;
  ul {
    display: flex;
    justify-content: center;
    background-color: #fff;
    li {
      border-right: 0.1rem solid #eee;
      &:first-of-type {
        border-left: 0.1rem solid #eee;
      }
      a {
        display: block;
        padding: 2rem 4rem;
        font-weight: 400;
        font-size: 1.4rem;
        color: #000;
        text-decoration: none;
      }
    }
  }
`;
