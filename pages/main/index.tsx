import React from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
import Intro from "@components/Main/Intro";
import ButtonFixed from "@components/@common/ButtonFixed";
import BestMember from "@components/Main/BestMember";
import BestMenu from "@components/Main/BestMenu";
import TotalSales from "@components/Main/TotalSales";

const Main = () => {
  const router = useRouter();
  const orderListMove = () => {
    router.push("/list");
  };

  return (
    <>
      <MainBox>
        <div className="inner">
          <Intro />
          <BestMenu />
          <BestMember />
          <ButtonFixed name={`주문목록보기`} onClickFn={orderListMove} />
          <TotalSales />
        </div>
      </MainBox>
    </>
  );
};

export default Main;

const MainBox = styled.section`
  display: block;
  width: 100%;
  padding-bottom: 8rem;
  .inner {
    max-width: 102.4rem;
    min-height: calc(100vh - 10rem);
    margin: auto;
    padding: 1.6rem;
    box-sizing: border-box;
  }
`;
