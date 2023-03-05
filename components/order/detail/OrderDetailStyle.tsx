import styled, { keyframes } from "styled-components";
import { media } from "../../../styles/theme";

const BounceMotion = keyframes`
  0%{transform:scale(1,1) rotate(0deg);}
  30%{transform:scale(.9,1.1);}
  70%{transform:scale(1.1,.9);}
  100%{transform:scale(1,1) rotate(360deg);}
`;

const IntroMotion = keyframes`
  0%{
    width:0;
    height: .5rem;
    text-indent:-30rem;
  }
  20%{
    width:1rem;
    height: 4.5rem;
    text-indent:-30rem;
  }
  100%{
    width:80%;
    height: 4.5rem;
    text-indent:0;
  }
`;

export const OrderDetailUI = styled.section`
  display: block;
  width: 100%;
  min-height: calc(100vh - 10rem);
  padding-bottom: 10rem;
  box-sizing: border-box;
  .inner {
    max-width: 102.4rem;
    min-height: 20rem;
    margin: auto;
    padding: 1.6rem;
    background-color: eee;
    box-sizing: border-box;
    h1 {
      display: flex;
      align-items: center;
      position: relative;
      padding: 2rem 0 0.5rem;
      font-weight: 700;
      font-size: 1.6rem;
      color: #1a1a1a;
      text-align: left;
      span {
        display: inline-block;
        padding-bottom: 0.5rem;
        font-size: 2.4rem;
      }
      strong {
        display: inline-block;
        flex: 1 auto;
        padding-left: 0.5rem;
        em {
          color: #299438;
        }
      }
      a {
        display: inline-block;
        padding: 1rem;
        color: #fff;
        font-size: 1.2rem;
        font-weight: 400;
        text-decoration: none;
        background-color: #299438;
        border-radius: 4rem;
      }
    }
    .order-info {
      width: 100%;
      margin: 2rem auto;
      padding: 2rem;
      font-size: 1.4rem;
      text-align: left;
      border: 0.1rem solid #ddd;
      border-radius: 0.8rem;
      box-sizing: border-box;
      p {
        color: #777;
        strong {
          display: inline-block;
          line-height: 1.3;
          & + strong {
            padding-left: 0.4rem;
            &:before {
              content: "+ ";
            }
          }
        }
        span {
          font-weight: 700;
          color: #111;
        }
        em {
          font-weight: 700;
          color: #299438;
        }
        ${media.mobile} {
          text-align: center;
        }
      }
    }
    ul {
      li {
        border-bottom: 0.1rem solid #eee;
        &:first-child {
          border-top: 0.1rem solid #eee;
        }
        &.open {
          dd {
            color: #ff7111;
          }
        }
        &.closed {
          a {
            cursor: default;
          }
          dt,
          dd {
            color: #ccc;
          }
        }
        dl {
          display: flex;
          justify-content: center;
          align-items: center;
          dt {
            flex: 1 auto;
            position: relative;
            padding: 2rem 0 2rem 1.5rem;
            font-size: 1.6rem;
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
                left: 1rem;
                bottom: 0;
                width: 2rem;
                height: 2rem;
                margin: auto;
                background: url(../../images/img_logo.png) no-repeat 0 0 / 100%
                  auto;
                animation: ${BounceMotion} 1s infinite;
              }
            }
          }
          dd {
            em {
              display: inline-block;
              padding: 0.6rem;
              font-size: 1.4rem;
              color: #111;
            }
            strong {
              display: inline-block;
              margin: 0.2rem;
              padding: 0.6rem 1rem;
              font-size: 1.4rem;
              color: #fff;
              background-color: #299438;
              border-radius: 2rem;
            }
          }
        }
      }
    }
  }
`;

export const BtnOrderUI = styled.button`
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
  animation: ${IntroMotion} 2s forwards;
  z-index: 2;
`;

export const NoneOrderUI = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 40vh;
  font-size: 1.4rem;
  line-height: 1.3;
  text-align: center;
  strong {
    font-weight: 400;
    em {
      color: #299438;
    }
  }
`;

export const BtnDeleteUI = styled.button`
  position: relative;
  width: 1.8rem;
  height: 1.8rem;
  background-color: #ee2929;
  text-indent: -9999rem;
  border-radius: 100%;
  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 1rem;
    height: 0.1rem;
    margin: auto;
    background-color: #fff;
    transition: 0.2s;
  }
  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 1rem;
    height: 0.1rem;
    margin: auto;
    background-color: #fff;
    transition: 0.2s;
  }
  &:hover {
    &:before {
      transform: rotate(45deg);
    }
    &:after {
      transform: rotate(-45deg);
    }
  }
`;
