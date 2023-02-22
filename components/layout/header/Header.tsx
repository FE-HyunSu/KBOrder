import React, { useState, useEffect } from "react";
import { HeaderUI } from "./HeaderStyle";
import Link from "next/link";
import Image from "next/image";
import ImgLogo from "../../../public/images/img_logo.png";
import { userAtom } from "../../../store/store";
import { useRecoilState, useRecoilValue } from "recoil";
import { useRouter } from "next/router";

interface userDataType {
  uid: string;
  name: string;
  email: string;
}

const Header = () => {
  const [isAtomUserInfo, setAtomUserInfo] = useRecoilState(userAtom);
  const storeUserInfo = useRecoilValue(userAtom);
  const [isUserData, setUserData] = useState<userDataType>();
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
    setUserData(storeUserInfo);
  }, [storeUserInfo]);

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
          {isUserData && isUserData.uid !== "" ? (
            <>
              <em>{isUserData.name}</em>님
              <button type="button" onClick={() => logout()}>
                로그아웃
              </button>
            </>
          ) : (
            ""
          )}
        </p>
      </HeaderUI>
    </>
  );
};

export default Header;
