import styled, { keyframes } from "styled-components";

const LogoMotion = keyframes`
  0%{transform:scale(.5,.5);}
  30%{transform:scale(.8,1.2);}
  60%{transform:scale(1.2,.8);}
  100%{transform:scale(1,1);}
`;

const BounceMotion = keyframes`
  0%{transform:scale(1,1);}
  85%{transform:scale(1,1);}
  90%{transform:scale(.9,1.1);}
  95%{transform:scale(1.1,.9);}
  100%{transform:scale(1,1);}
`;

const TextMotion = keyframes`
  0%{transform:scale(1,.1); opacity:0;}
  100%{transform:scale(1,1); opacity:1;}
`;

const TextAfter = keyframes`
  0%{content:'.'}
  50%{content:'..'}
  100%{content:'...'}
`;

export const LoadingUI = styled.div`
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

export const LoadingBox = styled.div`
  width: 15rem;
  height: 15rem;
  z-index: 2;
`;
