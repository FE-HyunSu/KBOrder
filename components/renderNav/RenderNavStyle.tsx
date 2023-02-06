import styled from "styled-components";

export const NavBox = styled.nav`
  display: block;
  position: fixed;
  top: 5rem;
  left: 0;
  width: 100%;
  border-bottom: 0.1rem solid #eee;
  ul {
    display: flex;
    justify-content: center;
    background-color: #fff;
    li {
      border-right: 0.1rem solid #eee;
      &:first-child {
        border-left: 0.1rem solid #eee;
      }
      a {
        display: block;
        padding: 2rem 4rem;
        font-weight: 400;
        font-size: 1.4rem;
        color: #000;
        text-decoration: none;
      }
    }
  }
`;
