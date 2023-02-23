import React from "react";
import { LoadingUI, LoadingBox } from "./LoadingStyle";
import Image from "next/image";
import ImgLogo from "./images/img_logo.png";

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
