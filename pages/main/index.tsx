import ChartBox from "@components/@common/Chart";
import Loading from "@components/@common/Loading";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { getData } from "@api/firestore";
import { IntroMotion } from "@styles/keyframe";
import { useRouter } from "next/router";
import Image from "next/image";
import ImgStore from "@images/store.jpg";
import MotionCount from "@components/@common/MotionCount";

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
  const [menuDataList, setMenuDataList] = useState<ChartItemType[]>([]);
  const [userDataList, setUserDataList] = useState<ChartItemType[]>([]);
  const [isTotalCount, setTotalCount] = useState<Number>(0);
  const orderListMove = () => {
    router.push("/list");
  };

  const getDataList = async () => {
    let resultData: OrderInfoType[] = [];
    let menuCountList: string[] = [];
    let userCountList: string[] = [];
    await getData("orderList").then((data) => {
      resultData = data.docs.map((item: any) => {
        return { ...item.data() };
      });
    });
    resultData.forEach((item: OrderInfoType) => {
      menuCountList.push(item.menuName);
      userCountList.push(item.userName);
    });
    setTotalCount(resultData.length);
    const dataList = new Set(menuCountList);
    const userList = new Set(userCountList);
    let menuResult: ChartItemType[] = [];
    let userResult: ChartItemType[] = [];
    dataList.forEach((item) => {
      menuResult.push({
        name: item,
        value: menuCountList.filter((subItem: string) => subItem === item)
          .length,
      });
    });
    userList.forEach((item) => {
      userResult.push({
        name: item,
        value: userCountList.filter((subItem: string) => subItem === item)
          .length,
      });
    });
    menuResult.sort((a: ChartItemType, b: ChartItemType) => b.value - a.value);
    userResult.sort((a: ChartItemType, b: ChartItemType) => b.value - a.value);
    setMenuDataList(menuResult.slice(0, 3));
    setUserDataList(userResult.slice(0, 5));
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
                {menuDataList &&
                  menuDataList.map((item: ChartItemType, idx: number) => (
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
              <h1>🍜 프로 김밥러 5인</h1>
              <ul>
                {userDataList &&
                  userDataList.map((item: ChartItemType, idx: number) => (
                    <li key={idx}>
                      <strong
                        style={{
                          width: item.value + `rem`,
                        }}
                      ></strong>
                      <span>
                        <em>{idx + 1}위</em> {item.name}(
                        <MotionCount count={item.value} />
                        줄)
                      </span>
                    </li>
                  ))}
              </ul>
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
  padding-bottom: 6rem;
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
  padding-bottom: 6rem;
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
  padding-bottom: 6rem;
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
  li {
    display: flex;
    align-items: center;
    height: 5rem;
    &:first-child {
      span {
        font-size: 1.8rem;
        color: #1a1a1a;
        em {
          font-size: 3rem;
        }
      }
    }
    strong {
      display: inline-block;
      position: relative;
      width: 0;
      max-width: calc(100% - 15rem);
      height: 2rem;
      margin-right: 1.5rem;
      background-color: #f46b21;
      border-top-left-radius: 1rem;
      border-bottom-left-radius: 1rem;
      &:before {
        content: "";
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 1rem;
        background-color: #d75b18;
        border-bottom-left-radius: 1rem;
      }
      &:after {
        content: "";
        position: absolute;
        top: 0;
        right: -0.7rem;
        bottom: 0;
        width: 0;
        height: 0;
        width: 1.414rem;
        height: 1.414rem;
        margin: auto;
        background-color: #fb947a;
        transform: rotate(45deg);
        border-top-right-radius: 0.6rem;
        border-bottom-left-radius: 0.4rem;
      }
    }
    span {
      font-size: 1.4rem;
      color: #3a3a3a;
      em {
        font-weight: bold;
        font-size: 2rem;
        color: #ca5734;
      }
    }
  }
`;
