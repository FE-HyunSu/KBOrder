import React from "react";
import { HeaderUI } from "./HeaderStyle";
import Link from "next/link";
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
          <Link href={"/"}>
            <Image src={ImgLogo} alt="LOGO" placeholder="blur" />
            KBOrder
          </Link>
        </h1>
        <p>
          <Link href={"/render/csr"}>DEV(RenderType)</Link>
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
