import styled, { keyframes } from "styled-components";

const MotionIntro = keyframes`
  0%{transform:scale(.1,.1)}
  50%{transform:scale(1.05,1.05)}
  100%{transform:scale(1,1)}
`;

export const ModalTemplate = styled.div`
  display: flex;
  position: fixed;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 20;
`;

export const ModalBackground = styled.div`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: -1;
`;

export const ModalInner = styled.div`
  position: relative;
  width: 92%;
  max-width: 80rem;
  height: auto;
  max-height: 80%;
  background-color: #fff;
  border-radius: 1rem;
  transform: scale(0.1, 0.1);
  overflow: auto;
  animation: ${MotionIntro} 0.5s forwards;
`;
