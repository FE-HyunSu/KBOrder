import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";
import ImgLogo from "@images/img_logo.png";
import { userAtom } from "../../store/store";
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
            KBOrder<span>(Beta)</span>
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

export const HeaderUI = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  padding: 0 1.4rem;
  background-color: #fff;
  border: 0.1rem solid #eee;
  box-sizing: border-box;
  z-index: 10;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    font-style: normal;
    text-decoration: none;
    font-weight: 500;
    font-size: 1.4rem;
    color: #1a1a1a;
    img {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      margin-right: 0.5rem;
    }
    span {
      font-weight: 300;
      color: #aaa;
    }
  }
  p {
    display: flex;
    flex: 1 auto;
    justify-content: flex-end;
    align-items: center;
    font-size: 1.3rem;
    em {
      display: inline-block;
      padding: 0 0.3rem;
      color: #299438;
    }
    button {
      display: inline-block;
      margin-left: 0.8rem;
      padding: 0.5rem;
      font-size: 1.2rem;
      color: #fff;
      background-color: #3a3a3a;
      border-radius: 0.4rem;
    }
  }
  & + main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: calc(100vh - 10rem);
    padding-top: 5rem;
    overflow: hidden;
    @supports (-webkit-appearance: none) and (stroke-color: transparent) {
      min-height: calc(100vh - 10rem);
    }
  }
`;
