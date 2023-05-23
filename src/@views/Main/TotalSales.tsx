import React, { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import MotionCount from '@components/@common/MotionCount';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { getData } from '@api/firestore';
import { IMAGES } from '@constants/images';
import { BounceTurnMotion } from '@styles/keyframe';
import { MEDIA, COLOR } from '@styles/theme';

const TotalSales = () => {
  const itemRef = useRef<HTMLDivElement>(null);
  const viewCheck = useIntersectionObserver(itemRef, {});
  const isVisible = !!viewCheck?.isIntersecting;
  const [isTotalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setLoading] = useState<boolean>(true);

  const getResultData = async () => {
    let resultData = [];
    await getData('orderList').then((data) => {
      let totalPrice = 0;
      resultData = data.docs.map((item: any) => {
        return { ...item.data() };
      });
      resultData.forEach((item) => {
        totalPrice += item.price;
      });
      setTotalCount(totalPrice);
      setLoading(false);
    });
  };

  useEffect(() => {
    getResultData();
  }, []);

  return (
    <>
      <SalesUI>
        <h1>
          📈 누적 매출 <span>(2023.03.06 ~ )</span>
        </h1>
        <p ref={itemRef}>
          <span className={isVisible && !isLoading ? `active` : ``}>
            <img src={IMAGES.LOGO} className="img-logo" alt="logo" />{' '}
            {isVisible && !isLoading ? <MotionCount count={isTotalCount} sec={2500} /> : 0}원
          </span>
        </p>
      </SalesUI>
    </>
  );
};

export default TotalSales;

const SalesUI = styled.div`
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
    span {
      font-size: 1.4rem;
      font-weight: 300;
      color: ${COLOR.gray99};
    }
  }
  p {
    img {
      width: 8rem;
      height: 8rem;
      margin: 0 auto -1rem;
      animation: ${BounceTurnMotion} 1s infinite;
    }
    span {
      display: inline-block;
      position: relative;
      font-weight: 200;
      font-size: 8rem;
      color: ${COLOR.realBlack};
      &:before {
        content: '';
        position: absolute;
        bottom: -1rem;
        left: 0;
        width: 0;
        height: 0rem;
        background-color: #fff900;
        transition: 1s;
        z-index: -1;
      }
      &:after {
        content: '';
        position: absolute;
        bottom: -1rem;
        left: 0;
        width: 0;
        height: 0rem;
        background-color: #fff000;
        transition: 1s;
        z-index: -1;
      }
      &.active {
        &:before {
          width: 100%;
          height: 3rem;
        }
        &:after {
          width: 100%;
          height: 1rem;
        }
      }
    }

    ${MEDIA.mobile} {
      img {
        width: 5rem;
        height: 5rem;
        margin-bottom: -0.5rem;
      }
      span {
        font-size: 5rem;
      }
    }
  }
`;
