import React, { useEffect } from "react";
import { HeaderUI } from "./HeaderStyle";
import Link from "next/link";
import Image from "next/image";
import ImgLogo from "../../../public/images/img_logo.png";
import { userAtom } from "../../../store/store";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";

const Header = () => {
  const [isStoreUserInfo, setStoreUserInfo] = useRecoilState(userAtom);
  const router = useRouter();
  const logout = () => {
    window.localStorage.removeItem("userUid");
    setStoreUserInfo({
      uid: "",
      name: "",
      email: "",
    });
    router.push("/");
  };
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
          {/* <Link href={"/render/csr"}>DEV(RenderType)</Link> */}
          {isStoreUserInfo && isStoreUserInfo.name !== `` ? (
            <>
              <em>{isStoreUserInfo.name}</em>님
              <button type="button" onClick={() => logout()}>
                로그아웃
              </button>
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
