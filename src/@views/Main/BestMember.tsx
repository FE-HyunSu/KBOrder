import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { getData } from '@api/firestore';
import MotionCount from '@components/@common/MotionCount';
import ChartHam from '@components/@common/ChartHam';
import { COLOR } from '@styles/theme';

interface ChartItemType {
  name: string;
  value: number;
  rank?: number;
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
  const [totalCount, setTotalCount] = useState<number>(0);

  const getDataList = async () => {
    let resultData: OrderInfoType[] = [];
    let userCountList: string[] = [];
    await getData('orderList').then((data) => {
      resultData = data.docs.map((item: any) => {
        return { ...item.data() };
      });
    });
    resultData.forEach((item: OrderInfoType) => {
      if (item.menuName !== '오늘은 다른거 먹을래요') userCountList.push(item.userName);
    });
    setTotalCount(userCountList.length);
    const userList = new Set(userCountList);
    let userResult: ChartItemType[] = [];
    let userRank: number = 1;
    userList.forEach((item) => {
      userResult.push({
        name: item,
        value: userCountList.filter((subItem: string) => subItem === item).length,
      });
    });
    userResult.sort((a: ChartItemType, b: ChartItemType) => b.value - a.value);
    userResult.forEach((item, idx) => {
      if (idx === 0) {
        item.rank = idx + 1;
      } else if (item.value === userResult[idx - 1].value) {
        item.rank = Number(userRank) + 1;
      } else {
        item.rank = idx + 1;
        userRank = idx;
      }
    });
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
        {isLoading ? (
          <SkeletonUl>
            {Array(5)
              .fill('')
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
                    <ChartHam count={item.value} totalCount={totalCount} />
                    <span>
                      <em>{item.rank}위</em>
                      {item.rank === 1 ? (
                        <span>🥇</span>
                      ) : item.rank === 2 ? (
                        <span>🥈</span>
                      ) : item.rank === 3 ? (
                        <span>🥉</span>
                      ) : (
                        ` `
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
      background-color: ${COLOR.grayEE};
    }
    em {
      display: inline-block;
      width: 10rem;
      height: 2rem;
      margin-left: 1rem;
      background-color: ${COLOR.grayEE};
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
    color: ${COLOR.black};
    text-align: left;
    em {
      display: inline-block;
      padding-right: 0.5rem;
      font-size: 3rem;
    }
    span {
      font-size: 1.4rem;
      font-weight: 300;
      color: ${COLOR.gray99};
    }
  }
  li {
    display: flex;
    align-items: center;
    height: 5rem;
    &:first-of-type {
      span {
        font-size: 1.8rem;
        color: ${COLOR.black};
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
