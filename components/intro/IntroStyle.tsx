import styled, { keyframes } from "styled-components";

const LogoMotion = keyframes`
  0%{transform:scale(.5,.5);}
  30%{transform:scale(.8,1.2);}
  60%{transform:scale(1.2,.8);}
  100%{transform:scale(1,1);}
`;

export const IntroUI = styled.div`
  display: block;
  padding: 5rem 0;
  box-sizing: border-box;
  .img-logo {
    display: block;
    width: 8rem;
    height: 8rem;
    margin: auto;
    animation: ${LogoMotion} 1s forwards;
  }
  p {
    padding-top: 1rem;
    font-weight: 500;
    font-size: 2.4rem;
    color: #1a1a1a;
    text-align: center;
    span {
      font-weight: 300;
      font-size: 1.4rem;
      color: #3a3a3a;
    }
  }
`;
