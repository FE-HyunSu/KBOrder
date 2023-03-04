import styled, { keyframes } from "styled-components";
import { media } from "../../../styles/theme";

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
      display: block;
      padding: 2rem 0 0.5rem;
      font-weight: 700;
      font-size: 1.8rem;
      color: #1a1a1a;
      text-align: left;
      em {
        font-size: 4rem;
      }
      strong {
        display: inline-block;
        padding-left: 1rem;
        color: #299438;
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
            padding: 2rem 0;
            font-size: 1.6rem;
            em {
              display: inline-block;
              padding: 0.6rem;
              font-size: 1.4rem;
              color: #299438;
            }
          }
          dd {
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
