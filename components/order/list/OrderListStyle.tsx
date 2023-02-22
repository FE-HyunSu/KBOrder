import styled from "styled-components";

export const OrderListUI = styled.section`
  display: block;
  width: 100%;
  min-height: calc(100vh - 10rem);
  .inner {
    max-width: 102.4rem;
    min-height: 20rem;
    margin: auto;
    padding: 1.6rem;
    background-color: eee;
    box-sizing: border-box;
    h1 {
      display: block;
      padding: 2rem 0;
      font-weight: 700;
      font-size: 2.4rem;
      color: #1a1a1a;
      text-align: left;
      em {
        font-size: 4rem;
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
        a {
          display: block;
          padding: 2rem 1rem;
          font-size: 1.4rem;
          color: #111;
          text-decoration: none;
          box-sizing: border-box;
          dl {
            display: flex;
            justify-content: center;
            align-items: center;
            dt {
              flex: 1 auto;
            }
            dd {
            }
          }
        }
      }
    }
  }
`;

export const BtnCreateOrder = styled.button`
  display: block;
  position: fixed;
  right: 3rem;
  bottom: 5rem;
  width: 5rem;
  height: 5rem;
  font-size: 1.4rem;
  color: #fff;
  text-indent: -9999rem;
  background-color: #ccc;
  border-radius: 100%;
  transition: 0.2s;
  transform-origin: 50% 50%;
  &:hover {
    text-indent: 0;
    right: 2rem;
    bottom: 4rem;
    width: 7rem;
    height: 7rem;
    &:before {
      bottom: 3.5rem;
      left: 3.5rem;
      width: 0.2rem;
      height: 0.2rem;
      border-radius: 100%;
      opacity: 0;
    }
    &:after {
      top: 3.5rem;
      right: 3.5rem;
      width: 0.2rem;
      height: 0.2rem;
      border-radius: 100%;
      opacity: 0;
    }
  }
  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 0.8rem;
    height: 2.2rem;
    margin: auto;
    transition: 0.2s;
    background-color: #fff;
    transform: rotate(45deg);
  }
  &:after {
    content: "";
    position: absolute;
    top: 1.6rem;
    right: 1.6rem;
    bottom: 0;
    left: 0;
    width: 0.5rem;
    height: 0.5rem;
    margin: auto;
    background-color: #fff;
    transition: 0.2s;
  }
`;
