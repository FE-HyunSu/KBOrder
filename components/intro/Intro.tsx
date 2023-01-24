import React, { useRef } from "react";
import { IntroUI } from "./IntroStyle";
import Image from "next/image";
import ImgLogo from "../../public/images/img_logo.png";
import { authJoin } from "../../api/firestore";

const Intro = () => {
  const nameRef: any = useRef();
  const loginInfoRef: any = useRef();
  const keyupEvent = () => {
    const keyValue = nameRef.current.value;
    console.log(keyValue);
  };
  const loginInfo = (comment: string) => {
    loginInfoRef.current.innerHTML = comment;
  };
  const loginCheck = () => {
    const inputItem = nameRef.current;
    if (inputItem.value.length < 3) {
      loginInfo("이름을 2자 이상 입력해 주세요.");
      inputItem.focus();
    }
  };
  return (
    <>
      <IntroUI>
        <Image
          src={ImgLogo}
          alt="LOGO"
          placeholder="blur"
          className="img-logo"
        />
        <p>KB Order</p>
        <p>
          <span>오늘 김밥 드실분?</span>
        </p>
        <p>
          <em ref={loginInfoRef}></em>
        </p>
        <input type="text" placeholder="이름을 입력해 주세요" ref={nameRef} />
        <button type="button" onClick={() => loginCheck()}>
          주문하기
        </button>
        <a href="/join">회원가입</a>
      </IntroUI>
    </>
  );
};
export default Intro;
