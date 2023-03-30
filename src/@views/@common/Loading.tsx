import React from "react";
import styled from "@emotion/styled";
import {
  LogoMotion,
  BounceMotion,
  TextMotion,
  TextAfter,
} from "@styles/keyframe";
import Image from "next/image";
import ImgLogo from "@images/img_logo.png";

const Loading = () => {
  return (
    <>
      <LoadingUI>
        <LoadingBox>
          <Image
            src={ImgLogo}
            alt="LOGO"
            placeholder="blur"
            className="img-logo"
          />
          <p>LOADING</p>
        </LoadingBox>
      </LoadingUI>
    </>
  );
};
export default Loading;

const LoadingUI = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
  @supports (-webkit-appearance: none) and (stroke-color: transparent) {
    height: -webkit-fill-available;
  }

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
  }
  .img-logo {
    display: block;
    width: 5rem;
    height: 5rem;
    margin: auto;
    animation: ${LogoMotion} 1s forwards, ${BounceMotion} 7s 1s infinite;
  }
  p {
    padding: 1rem 0rem 1rem 1rem;
    font-weight: 500;
    font-size: 1.6rem;
    color: #1a1a1a;
    text-align: center;
    animation: ${TextMotion} 0.6s forwards;
    opacity: 0;
    &:after {
      content: ".";
      display: inline-block;
      width: 2rem;
      text-align: left;
      animation: ${TextAfter} 2s linear infinite;
    }
  }
`;

const LoadingBox = styled.div`
  width: 15rem;
  height: 15rem;
  z-index: 2;
`;
