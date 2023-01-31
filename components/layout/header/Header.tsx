import React from "react";
import { HeaderUI } from "./HeaderStyle";
import Image from "next/image";
import ImgLogo from "../../../public/images/img_logo.png";
import { userAtom } from "../../../store/store";
import { useRecoilValue } from "recoil";

const Header = () => {
  const userInfo = useRecoilValue(userAtom);
  return (
    <>
      <HeaderUI>
        <h1>
          <a href="/">
            <Image src={ImgLogo} alt="LOGO" placeholder="blur" />
            KBOrder
          </a>
        </h1>
        <nav>
          <ul>
            <li>{userInfo && userInfo.name}</li>
          </ul>
        </nav>
      </HeaderUI>
    </>
  );
};
export default Header;
