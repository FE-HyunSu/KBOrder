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

export const JoinUI = styled.div`
  display: block;
  padding: 5rem 0 10rem;
  box-sizing: border-box;
  .img-logo {
    display: block;
    width: 8rem;
    height: 8rem;
    margin: auto;
    animation: ${LogoMotion} 1s forwards, ${BounceMotion} 7s 1s infinite;
  }
  p {
    padding-top: 1rem;
    font-weight: 500;
    font-size: 2.4rem;
    color: #1a1a1a;
    text-align: center;
    animation: ${TextMotion} 1s forwards;
    opacity: 0;
    & + p {
      padding-top: 0;
      padding-bottom: 1rem;
      animation: ${TextMotion} 1s 0.5s forwards;
    }
    span {
      font-weight: 300;
      font-size: 1.4rem;
      color: #3a3a3a;
    }
  }
  input {
    width: 20rem;
    padding: 1.2rem;
    border-radius: 0.4rem;
    box-sizing: border-box;
    border: 1px solid #999;
    outline: none;
    animation: ${TextMotion} 1s 0.8s both;
    &:active,
    &:hover {
      border: 1px solid #999;
    }
  }
  button {
    display: block;
    min-width: 20rem;
    height: 4.6rem;
    margin: 0.8rem auto 0;
    padding: 0 1.3rem;
    border-radius: 0.5rem;
    background-color: #1a1a1a;
    font-weight: 500;
    font-size: 1.4rem;
    color: #fff;
    animation: ${TextMotion} 1s 1.2s both;
    transition: 0.2s;
    &:hover {
      font-size: 1.6rem;
      background-color: #000;
    }
  }
`;
