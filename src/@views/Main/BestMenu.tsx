import ChartDoughnut from '@components/@common/ChartDoughnut';
import React, { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { MEDIA, COLOR } from '@styles/theme';
import { getData } from '@api/firestore';
import { MotionIntro } from '@styles/keyframe';

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

const BestMenu = () => {
  const [isLoading, setLoading] = useState<Boolean>(true);
  const [menuDataList, setMenuDataList] = useState<ChartItemType[]>([]);
  const [isTotalCount, setTotalCount] = useState<Number>(0);

  const getDataList = async () => {
    let resultData: OrderInfoType[] = [];
    let menuCountList: string[] = [];
    let userCountList: string[] = [];
    await getData('orderList').then((data) => {
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
    let menuResult: ChartItemType[] = [];
    dataList.forEach((item) => {
      if (item !== '오늘은 다른거 먹을래요') {
        menuResult.push({
          name: item,
          value: menuCountList.filter((subItem: string) => subItem === item).length,
        });
      }
    });
    menuResult.sort((a: ChartItemType, b: ChartItemType) => b.value - a.value);
    setMenuDataList(menuResult.slice(0, 3));
    setLoading(false);
  };

  useEffect(() => {
    getDataList();
  }, []);

  return (
    <BestMenuBox>
      <h1>
        🏅 인기김밥 Best3 <span>(2023.03.06 ~ )</span>
      </h1>
      {isLoading ? (
        <SkeletonUl>
          {Array(3)
            .fill('')
            .map((item, idx) => (
              <li key={idx}>
                <span></span>
              </li>
            ))}
        </SkeletonUl>
      ) : (
        <>
          <ul>
            {menuDataList &&
              menuDataList.map((item: ChartItemType, idx: number) => (
                <li key={idx}>
                  <ChartDoughnut
                    name={item.name}
                    value={item.value}
                    totalCount={Number(isTotalCount)}
                    delay={idx * 150}
                  />
                </li>
              ))}
          </ul>
        </>
      )}
    </BestMenuBox>
  );
};

export default BestMenu;

const SkeletonUl = styled.ul`
  text-align: left;
  li {
    display: inline-block;
    width: 14rem;
    height: 14rem;
    span {
      display: inline-block;
      width: 13rem;
      height: 13rem;
      margin: 1rem 0 0 0.5rem;
      border: 1.2rem solid ${COLOR.grayEE};
      border-radius: 100%;
      box-sizing: border-box;
      animation: ${MotionIntro} 0.5s both;
    }
    &:nth-of-type(2) {
      span {
        animation-delay: 0.1s;
      }
    }
    &:nth-of-type(3) {
      span {
        animation-delay: 0.2s;
      }
    }
  }
  ${MEDIA.mobile} {
    display: flex;
    overflow: auto;
  }
`;

const BestMenuBox = styled.div`
  display: block;
  position: relative;
  width: 100%;
  min-height: 24rem;
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
      color: ${COLOR.gray99};
    }
  }
  ul {
    text-align: left;
    li {
      display: inline-block;
      width: 14rem;
      padding: 1rem;
    }
    ${MEDIA.mobile} {
      display: flex;
      overflow: auto;
    }
  }
`;
