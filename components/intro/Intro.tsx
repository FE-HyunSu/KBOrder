import React, { ElementRef, useRef } from "react";
import { IntroUI } from "./IntroStyle";
import Image from "next/image";
import ImgLogo from "../../public/images/img_logo.png";

const Intro = () => {
  const nameRef: any = useRef();
  const keyupEvent = () => {
    console.log(nameRef.current.value);
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
        <input
          type="text"
          placeholder="이름을 입력해 주세요"
          ref={nameRef}
          onKeyUp={() => keyupEvent()}
        />
        <button type="button">주문하기</button>
      </IntroUI>
    </>
  );
};
export default Intro;
