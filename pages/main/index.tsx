import ChartBox from "@components/@common/Chart";
import Loading from "@components/@common/Loading/Loading";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getData } from "@api/firestore";
import Link from "next/link";

interface ChartItemType {
  name: string;
  value: number;
}
const Main = () => {
  const [isLoading, setLoading] = useState<Boolean>(true);
  const testData = [
    { name: "테스트1", value: 20 },
    { name: "테스트2", value: 40 },
    { name: "테스트3", value: 25 },
    { name: "테스트4", value: 60 },
    { name: "테스트5", value: 30 },
  ];

  const getDataList = async () => {
    let resultData;
    await getData("orderList").then((data) => {
      resultData = data.docs.map((item: any) => {
        return { ...item.data(), id: item.id };
      });
    });
    console.log(resultData);
    setLoading(false);
  };

  useEffect(() => {
    getDataList();
  }, []);

  return (
    <>
      <MainBox>
        <div className="inner">
          <h1>🏅 인기김밥(작업중)</h1>
          {isLoading && isLoading ? (
            <Loading />
          ) : (
            <BestList>
              {testData.map((item: ChartItemType, idx: number) => (
                <li key={idx}>
                  <ChartBox
                    name={item.name}
                    value={item.value}
                    delay={idx * 100}
                  />
                </li>
              ))}
            </BestList>
          )}
          <Link href={"/list"}>주문목록</Link>
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
  text-align: center;
  li {
    display: inline-block;
    width: 14rem;
    padding: 1rem;
  }
`;
