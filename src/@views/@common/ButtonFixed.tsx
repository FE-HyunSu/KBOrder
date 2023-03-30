import React from "react";
import styled from "@emotion/styled";
import { IntroMotion } from "@styles/keyframe";

interface ButtonFixedType {
  name: string;
  onClickFn: () => void;
}

const ButtonFixed = ({ name, onClickFn }: ButtonFixedType) => {
  return (
    <>
      <BtnOrderList type="button" onClick={() => onClickFn()}>
        {name}
      </BtnOrderList>
    </>
  );
};

export default ButtonFixed;

const BtnOrderList = styled.button`
  position: fixed;
  right: 0;
  bottom: 7rem;
  left: 0;
  width: 0;
  max-width: 16rem;
  height: 0.5rem;
  margin: auto;
  font-weight: 500;
  font-size: 1.4rem;
  color: #fff;
  background-color: #299438;
  border-radius: 6rem;
  overflow: hidden;
  animation: ${IntroMotion} 1s forwards;
  z-index: 2;
`;
