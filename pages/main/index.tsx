import ChartBox from "@components/@common/Chart";
import Loading from "@components/@common/Loading/Loading";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getData } from "@api/firestore";
import { IntroMotion } from "@styles/keyframe";
import { useRouter } from "next/router";
import Image from "next/image";
import ImgStore from "@images/store.jpg";

interface ChartItemType {
  name: string;
  value: number;
}

interface OrderInfoType {
  menuName: string;
  price: number;
  seq: string;
  userEmail: string;
  userName: string;
}

const Main = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState<Boolean>(true);
  const [dataList, setDataList] = useState<ChartItemType[]>([]);
  const [isTotalCount, setTotalCount] = useState<Number>(0);
  const orderListMove = () => {
    router.push("/list");
  };

  const getDataList = async () => {
    let resultData: OrderInfoType[] = [];
    let menuCountList: string[] = [];
    await getData("orderList").then((data) => {
      resultData = data.docs.map((item: any) => {
        return { ...item.data() };
      });
    });
    resultData.forEach((item: OrderInfoType) =>
      menuCountList.push(item.menuName)
    );
    setTotalCount(resultData.length);
    const dataList = new Set(menuCountList);
    let countCheck = 0;
    let result: ChartItemType[] = [];
    dataList.forEach((item) => {
      countCheck = 0;
      result.push({
        name: item,
        value: menuCountList.filter((subItem: string) => subItem === item)
          .length,
      });
    });
    result.sort((a: ChartItemType, b: ChartItemType) => b.value - a.value);
    setDataList(result.slice(0, 3));
    setLoading(false);
  };

  useEffect(() => {
    getDataList();
  }, []);

  return (
    <>
      {isLoading && isLoading ? (
        <Loading />
      ) : (
        <MainBox>
          <div className="inner">
            <Intro>
              <h1>🍱 소개</h1>
              <p>안녕하세요.</p>
              <p>
                삼성동 이레 김밥주문 페이지 <em>KB-Order</em> 입니다.
              </p>
              <p>
                오늘 점심 김밥을 드실 분들은 <em>주문을 신청</em>해 주세요.
              </p>
              <p>
                <em>12:00</em> 까지 신청된 주문건에 한해서 일괄 전화 주문
                들어갑니다.
              </p>
              <p></p>
              <p>- Mason(김현수) -</p>
            </Intro>
            <BestKBBox>
              <h1>
                🏅 인기김밥 Best3 <span>(2023.03.06 ~ )</span>
              </h1>
              <BestList>
                {dataList &&
                  dataList.map((item: ChartItemType, idx: number) => (
                    <li key={idx}>
                      <ChartBox
                        name={item.name}
                        value={item.value}
                        totalCount={Number(isTotalCount)}
                        delay={idx * 100}
                      />
                    </li>
                  ))}
              </BestList>
            </BestKBBox>
            <BestMemberBox>
              <h1>🍜 프로 김밥러 3인</h1>
            </BestMemberBox>
            <BtnOrderList type="button" onClick={() => orderListMove()}>
              주문목록보기
            </BtnOrderList>
          </div>
        </MainBox>
      )}
    </>
  );
};

export default Main;

const Intro = styled.div`
  display: block;
  width: 100%;
  padding-bottom: 4rem;
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
  p {
    padding: 0.3rem 0;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 1.4;
    em {
      color: #299438;
    }
  }
`;

const BestKBBox = styled.div`
  display: block;
  width: 100%;
  padding-bottom: 4rem;
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
    span {
      font-size: 1.4rem;
      font-weight: 300;
      color: #999;
    }
  }
`;

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

const BestList = styled.ul`
  text-align: left;
  li {
    display: inline-block;
    width: 14rem;
    padding: 1rem;
  }
`;

const BtnOrderList = styled.button`
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
  animation: ${IntroMotion} 1s forwards;
  z-index: 2;
`;

const BestMemberBox = styled.div`
  display: block;
  width: 100%;
  padding-bottom: 4rem;
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
    span {
      font-size: 1.4rem;
      font-weight: 300;
      color: #999;
    }
  }
`;
