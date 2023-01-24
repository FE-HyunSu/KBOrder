import React from "react";
import { HeaderUI } from "./HeaderStyle";
import Image from "next/image";
import ImgLogo from "../../../public/images/img_logo.png";

const Header = () => {
  return (
    <>
      <HeaderUI>
        <h1>
          <a href="/">
            <Image src={ImgLogo} alt="LOGO" placeholder="blur" />
            KBOrder
          </a>
        </h1>
        <nav></nav>
      </HeaderUI>
    </>
  );
};
export default Header;
