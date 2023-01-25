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
        <dl>
          <dt className="hide">이메일</dt>
          <dd>
            <input
              type="text"
              placeholder="이메일을 입력해 주세요"
              ref={nameRef}
            />
          </dd>
          <dt className="hide">패스워드</dt>
          <dd>
            <input
              type="password"
              placeholder="패스워드를 입력해 주세요"
              ref={nameRef}
            />
          </dd>
        </dl>
        <button type="button" onClick={() => loginCheck()}>
          로그인
        </button>
        <p className="text-links">
          <a href="/list">비회원 로그인</a>
          <a href="/join">회원가입</a>
        </p>
      </IntroUI>
    </>
  );
};
export default Intro;
