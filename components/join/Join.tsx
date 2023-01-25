import React, { useRef } from "react";
import { JoinUI } from "./JoinStyle";
import Image from "next/image";
import ImgLogo from "../../public/images/img_logo.png";
import { authJoin } from "../../api/firestore";

const Intro = () => {
  const nameRef: any = useRef();
  const emailRef: any = useRef();
  const passwordRef: any = useRef();
  const keyupEvent = () => {
    const keyValue = nameRef.current.value;
    console.log(keyValue);
  };
  const joinGo = async () => {
    try {
      authJoin(emailRef.current.value, passwordRef.current.value).then(
        (data) => {
          console.log(data);
        }
      );
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <>
      <JoinUI>
        <Image
          src={ImgLogo}
          alt="LOGO"
          placeholder="blur"
          className="img-logo"
        />
        <p>JOIN</p>
        <p>
          <span>회원가입</span>
        </p>
        <dl>
          <dt>이름</dt>
          <dd>
            <input
              type="text"
              placeholder="이름을 입력해 주세요"
              ref={nameRef}
              onKeyUp={() => keyupEvent()}
            />
          </dd>
          <dt>이메일</dt>
          <dd>
            <input
              type="text"
              placeholder="이메일을 입력해 주세요"
              ref={emailRef}
            />
          </dd>
          <dt>패스워드</dt>
          <dd>
            <input
              type="password"
              placeholder="패스워드 입력해 주세요"
              ref={passwordRef}
            />
          </dd>
          <dt>패스워드 확인</dt>
          <dd>
            <input
              type="password"
              placeholder="패스워드를 확인해 주세요"
              ref={passwordRef}
            />
          </dd>
        </dl>

        <button type="button" onClick={() => joinGo()}>
          회원가입 완료
        </button>
        <p className="text-links">
          <a href="/">로그인</a>
        </p>
      </JoinUI>
    </>
  );
};
export default Intro;
