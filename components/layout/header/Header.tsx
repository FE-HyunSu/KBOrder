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
        <p>
          {userInfo && userInfo.name !== `` ? (
            <>
              <em>{userInfo.name}</em>님<button type="button">로그아웃</button>
            </>
          ) : (
            ``
          )}
        </p>
      </HeaderUI>
    </>
  );
};
export default Header;
