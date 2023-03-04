import styled, { keyframes } from "styled-components";

const BounceMotion = keyframes`
  0%{transform:scale(1,1) rotate(0deg);}
  30%{transform:scale(.9,1.1);}
  70%{transform:scale(1.1,.9);}
  100%{transform:scale(1,1) rotate(360deg);}
`;

export const BtnClose = styled.button`
  position: absolute;
  top: 1.5rem;
  right: 2rem;
  width: 4rem;
  height: 4rem;
  text-indent: -999rem;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 0.1rem;
    height: 2rem;
    margin: auto;
    background-color: #1a1a1a;
    transform: rotate(45deg);
  }
  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 2rem;
    height: 0.1rem;
    margin: auto;
    background-color: #1a1a1a;
    transform: rotate(45deg);
  }
`;

export const ModalOrderUI = styled.div`
  padding: 3rem;
  h1 {
    padding-bottom: 1.5rem;
    font-weight: 400;
    font-size: 1.6rem;
    color: #1a1a1a;
    border-bottom: 0.1rem solid #eee;
  }
  ul {
    position: relative;
    min-height: 20rem;
    li {
      border-bottom: 0.1rem solid #eee;
      label {
        display: flex;
        align-items: center;
        position: relative;
        padding: 2rem 0;
        input {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          &:checked + span {
            font-weight: 700;
            color: #299438;
            &:before {
              opacity: 0;
            }
            &:after {
              content: "";
              position: absolute;
              top: 0;
              left: 0.6rem;
              bottom: 0.6rem;
              width: 1.2rem;
              height: 0.7rem;
              margin: auto;
              border-left: 0.2rem solid #299438;
              border-bottom: 0.2rem solid #299438;
              background: none;
              animation: none;
              transform: rotate(-45deg);
            }
            & + em {
              font-weight: 700;
              color: #299438;
            }
          }
        }
        span {
          display: inline-block;
          flex: 1 auto;
          padding-left: 2rem;
          font-size: 1.4rem;
          transition: 0.3s;
          &:before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            width: 2rem;
            height: 2rem;
            margin: auto;
            background: url(../../images/img_logo.png) no-repeat 0 0 / 100% auto;
            animation: ${BounceMotion} 1s infinite;
          }
        }
        em {
          font-size: 1.4rem;
        }
      }
    }
  }
`;
