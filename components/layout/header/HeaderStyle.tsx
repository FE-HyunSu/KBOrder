import styled from "styled-components";

export const HeaderUI = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 5rem;
  padding: 0 1.4rem;
  background-color: #fff;
  border: 0.1rem solid #eee;
  box-sizing: border-box;
  z-index: 10;
  a {
    display: flex;
    justify-content: center;
    align-items: center;
    font-style: normal;
    text-decoration: none;
    font-weight: 500;
    font-size: 1.4rem;
    color: #1a1a1a;
    img {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      margin-right: 0.5rem;
    }
  }
  p {
    display: flex;
    flex: 1 auto;
    justify-content: flex-end;
    align-items: center;
    font-size: 1.3rem;
    em {
      display: inlin-block;
      padding: 0 0.3rem;
      color: #299438;
    }
    button {
      display: inline-block;
      margin-left: 0.8rem;
      padding: 0.5rem;
      font-size: 1.2rem;
      color: #fff;
      background-color: #3a3a3a;
      border-radius: 0.4rem;
    }
  }
  & + main {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    min-height: calc(100vh - 10rem);
    padding-top: 5rem;
    overflow: hidden;
    @supports (-webkit-appearance: none) and (stroke-color: transparent) {
      min-height: calc(100vh - 10rem);
    }
  }
`;
