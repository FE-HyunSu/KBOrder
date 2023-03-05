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

export const LoginUI = styled.div`
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
    animation: ${TextMotion} 0.6s forwards;
    opacity: 0;
    & + p {
      padding-top: 0;
      padding-bottom: 1rem;
      animation: ${TextMotion} 0.6s 0.5s forwards;
    }
    span {
      font-weight: 300;
      font-size: 1.4rem;
      color: #3a3a3a;
    }
    em {
      display: inline-block;
      height: 1.2rem;
      font-weight: 500;
      font-size: 1.2rem;
      color: #ff3333;
      letter-spacing: -0.05rem;
    }
  }
  dl {
    dt {
      padding: 0.5rem 0;
      font-weight: 500;
      font-size: 1.2rem;
      color: #aaa;
      animation: ${TextMotion} 0.6s 0.7s both;
    }
    dd {
      padding-bottom: 0.2rem;
      animation: ${TextMotion} 0.6s 0.8s both;
    }
  }
  input {
    width: 30rem;
    padding: 1.2rem;
    font-size: 1.6rem;
    border-radius: 0.4rem;
    box-sizing: border-box;
    border: 1px solid #999;
    outline: none;
    &:active,
    &:hover {
      border: 1px solid #999;
    }
  }
  button {
    display: block;
    min-width: 30rem;
    height: 4.6rem;
    margin: 0.8rem auto 0;
    padding: 0 1.3rem;
    border-radius: 0.5rem;
    background-color: #1a1a1a;
    font-weight: 500;
    font-size: 1.4rem;
    color: #fff;
    animation: ${TextMotion} 0.6s 1.2s both;
    transition: 0.2s;
    &:disabled {
      background-color: #bbb;
    }
    &:hover {
      font-size: 1.6rem;
      background-color: #000;
      &:disabled {
        font-size: 1.4rem;
        background-color: #bbb;
      }
    }
  }
  .text-links {
    padding: 0;
    text-align: right;
    a {
      display: inline-block;
      position: relative;
      padding: 0.8rem 0.2rem;
      font-weight: 500;
      font-size: 1.2rem;
      color: #3a3a3a;
      text-decoration: none;
      animation: ${TextMotion} 0.6s 1.5s both;
      & + a {
        margin-left: 0.8rem;
        &:before {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          left: -0.5rem;
          width: 0.1rem;
          height: 0.8rem;
          margin: auto;
          border-right: 0.1rem solid #999;
        }
      }
    }
  }
`;
