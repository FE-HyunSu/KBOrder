import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import MotionCount from "@components/@common/MotionCount";
import useIntersectionObserver from "@hooks/useIntersectionObserver";
import { getData } from "@api/firestore";
import Image from "next/image";
import ImgLogo from "@images/img_logo.png";
import { BounceTurnMotion } from "@styles/keyframe";

const TotalSales = () => {
  const itemRef = useRef<HTMLDivElement>(null);
  const viewCheck = useIntersectionObserver(itemRef, {});
  const isVisible = !!viewCheck?.isIntersecting;
  const [isTotalCount, setTotalCount] = useState<number>(0);

  const getResultData = async () => {
    let resultData = [];
    await getData("orderList").then((data) => {
      let totalPrice = 0;
      resultData = data.docs.map((item: any) => {
        return { ...item.data() };
      });
      console.log(resultData);
      resultData.forEach((item) => {
        totalPrice += item.price;
      });
      setTotalCount(totalPrice);
    });
  };

  useEffect(() => {
    getResultData();
  }, []);

  return (
    <>
      <SalesUI ref={itemRef}>
        <h1>
          📈 누적 매출 <span>(2023.03.06 ~ )</span>
        </h1>
        <p>
          <span className={isVisible ? `active` : ``}>
            <Image src={ImgLogo} alt="LOGO" placeholder="blur" />{" "}
            {isVisible ? <MotionCount count={isTotalCount} /> : 0}원
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
  min-height: 24rem;
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
      color: #999;
    }
  }
  p {
    img {
      width: 8rem;
      height: 8rem;
      margin: auto;
      animation: ${BounceTurnMotion} 1s infinite;
    }
    span {
      display: inline-block;
      position: relative;
      font-weight: 200;
      font-size: 10rem;
      color: #000;
      &:before {
        content: "";
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
        content: "";
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
  }
`;
