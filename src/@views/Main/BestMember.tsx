import React, { useState, useEffect } from "react";
import Loading from "@components/@common/Loading";
import styled from "styled-components";
import { getData } from "@api/firestore";
import MotionCount from "@components/@common/MotionCount";
import ChartHam from "@components/@common/ChartHam";

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

const BestMember = () => {
  const [isLoading, setLoading] = useState<Boolean>(true);
  const [userDataList, setUserDataList] = useState<ChartItemType[]>([]);

  const getDataList = async () => {
    let resultData: OrderInfoType[] = [];
    let userCountList: string[] = [];
    await getData("orderList").then((data) => {
      resultData = data.docs.map((item: any) => {
        return { ...item.data() };
      });
    });
    resultData.forEach((item: OrderInfoType) => {
      userCountList.push(item.userName);
    });
    const userList = new Set(userCountList);
    let userResult: ChartItemType[] = [];
    userList.forEach((item) => {
      userResult.push({
        name: item,
        value: userCountList.filter((subItem: string) => subItem === item)
          .length,
      });
    });
    userResult.sort((a: ChartItemType, b: ChartItemType) => b.value - a.value);
    setUserDataList(userResult.slice(0, 5));
    setLoading(false);
  };

  useEffect(() => {
    getDataList();
  }, []);
  return (
    <>
      <BestMemberBox>
        <h1>🍜 프로 김밥러 5인</h1>
        {isLoading && isLoading ? (
          <SkeletonUl>
            {Array(5)
              .fill("")
              .map((item, idx) => (
                <li key={idx}>
                  <span></span>
                  <em></em>
                </li>
              ))}
          </SkeletonUl>
        ) : (
          <>
            <ul>
              {userDataList &&
                userDataList.map((item: ChartItemType, idx: number) => (
                  <li key={idx}>
                    <ChartHam count={item.value} />
                    <span>
                      <em>{idx + 1}위</em>
                      {idx === 0 ? (
                        <span>🥇</span>
                      ) : idx === 1 ? (
                        <span>🥈</span>
                      ) : idx === 2 ? (
                        <span>🥉</span>
                      ) : (
                        ``
                      )}
                      {item.name}(
                      <MotionCount count={item.value} />
                      줄)
                    </span>
                  </li>
                ))}
            </ul>
          </>
        )}
      </BestMemberBox>
    </>
  );
};

export default BestMember;

const SkeletonUl = styled.ul`
  li {
    display: flex;
    align-items: center;
    height: 5rem;
    span {
      display: inline-block;
      width: 2rem;
      height: 2rem;
      background-color: #eee;
    }
    em {
      display: inline-block;
      width: 10rem;
      height: 2rem;
      margin-left: 1rem;
      background-color: #eee;
    }
  }
`;

const BestMemberBox = styled.div`
  display: block;
  position: relative;
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
        span {
          font-size: 2rem;
        }
        em {
          font-size: 3rem;
        }
      }
    }
    span {
      font-size: 1.4rem;
      color: #3a3a3a;
      span {
        font-size: 2rem;
      }
      em {
        font-weight: bold;
        font-size: 2rem;
        color: #ca5734;
      }
    }
  }
`;
