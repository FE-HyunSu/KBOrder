import ChartBox from "@components/@common/Chart";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Main = () => {
  const testData = [
    { name: "테스트1", value: 20 },
    { name: "테스트2", value: 40 },
    { name: "테스트3", value: 25 },
    { name: "테스트4", value: 60 },
    { name: "테스트5", value: 30 },
  ];

  return (
    <>
      <MainBox>
        <div className="inner">
          <h1>🏅 인기김밥</h1>
          <BestList>
            {testData.map((item, idx) => (
              <li key={idx}>
                <ChartBox chartvalue={Number(item.value)} />
              </li>
            ))}
          </BestList>
        </div>
      </MainBox>
    </>
  );
};

export default Main;

const IntroBox = styled.section`
  h1 {
    display: block;
    padding: 2rem 0;
    font-weight: 700;
    font-size: 2.4rem;
    color: #1a1a1a;
    text-align: left;
    em {
      display: inline-block;
      padding-right: 0.5rem;
      font-size: 3rem;
    }
  }
`;

const MainBox = styled.section`
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
        display: inline-block;
        padding-right: 0.5rem;
        font-size: 3rem;
      }
    }
  }
`;

const BestList = styled.ul`
  li {
    display: inline-block;
    width: 20rem;
    padding: 1rem;
  }
`;
