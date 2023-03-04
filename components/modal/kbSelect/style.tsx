import styled from "styled-components";

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
    margin-bottom: 1.5rem;
    padding-bottom: 1.5rem;
    font-weight: 400;
    font-size: 1.6rem;
    color: #1a1a1a;
    border-bottom: 0.1rem solid #eee;
  }

  dl {
    dt {
      padding: 1.8rem 0 1rem;
      font-weight: 400;
      font-size: 1.4rem;
      color: #3a3a3a;
      &:before {
        content: "*";
        color: #ff3333;
      }
    }
    dd {
      input {
        width: 100%;
        padding: 1.4rem;
        border: 0.1rem solid #ddd;
        box-sizing: border-box;
        &::placeholder {
          color: #999;
        }
      }
      p {
        padding-top: 0.4rem;
        min-height: 1.5rem;
        font-weight: 400;
        font-size: 1.1rem;
        color: #ff4444;
        box-sizing: border-box;
      }
      .select-box {
        select {
          width: 100%;
          padding: 1.4rem;
          font-size: 1.4rem;
          color: #1a1a1a;
          background-color: #fff;
          border: 0;
          outline: 0;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }
        position: relative;
        width: 100%;
        border: 0.1rem solid #ddd;
        box-sizing: border-box;
        &:after {
          content: "";
          position: absolute;
          top: 0;
          right: 1.5rem;
          bottom: 0.5rem;
          width: 0.8rem;
          height: 0.8rem;
          margin: auto;
          border-right: 0.1rem solid #3a3a3a;
          border-bottom: 0.1rem solid #3a3a3a;
          transform: rotate(45deg);
        }
      }
    }
  }
`;
