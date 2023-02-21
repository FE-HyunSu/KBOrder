import React, { useState, useEffect } from "react";
import { HeaderUI } from "./HeaderStyle";
import Link from "next/link";
import Image from "next/image";
import ImgLogo from "../../../public/images/img_logo.png";
import { userAtom } from "../../../store/store";
import { useRecoilState, useRecoilValue } from "recoil";
import { useRouter } from "next/router";

const Header = () => {
  const [isAtomUserInfo, setAtomUserInfo] = useRecoilState(userAtom);
  const storeUserInfo = useRecoilValue(userAtom);
  const [isUserUid, setUserUid] = useState<string | undefined | null>(null);
  const router = useRouter();
  const logout = () => {
    window.localStorage.removeItem("userUid");
    setAtomUserInfo({
      uid: "",
      name: "",
      email: "",
    });
    router.push("/");
  };

  useEffect(() => {
    setUserUid(window.localStorage.getItem("userUid"));
  }, [isUserUid]);

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
          {isUserUid !== null || storeUserInfo.uid !== "" ? (
            <>
              <em>{isAtomUserInfo.name}</em>님
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
