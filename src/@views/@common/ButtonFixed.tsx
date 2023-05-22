import React from 'react';
import styled from '@emotion/styled';
import { IntroMotion } from '@styles/keyframe';
import { COLOR } from '@styles/theme';

interface ButtonFixedType {
  name: string;
  onClickFn: () => void;
}

const ButtonFixed = ({ name, onClickFn }: ButtonFixedType) => {
  return (
    <BtnBottomFixed type="button" onClick={() => onClickFn()}>
      {name}
    </BtnBottomFixed>
  );
};

export default ButtonFixed;

const BtnBottomFixed = styled.button`
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
  color: ${COLOR.white};
  background-color: ${COLOR.green};
  border-radius: 6rem;
  overflow: hidden;
  animation: ${IntroMotion} 1s forwards;
  z-index: 2;
`;
