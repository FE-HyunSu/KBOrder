import React from "react";
import { HeaderBox } from "./style";

const Header = () => {
  return (
    <>
      <HeaderBox>
        <h1>KBOrder</h1>
        <nav>
          <ul>
            <li>map</li>
            <li>주문하기</li>
          </ul>
        </nav>
      </HeaderBox>
    </>
  );
};
export default Header;
