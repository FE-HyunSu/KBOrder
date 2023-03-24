import React, { useRef, useState, useEffect } from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import dayjs from "dayjs";
import { returnDate } from "@utils/returnData";
import { BounceTurnMotion } from "@styles/keyframe";
import useIntersectionObserver from "@hooks/useIntersectionObserver";

interface dateListType {
  seq: string;
  liIndex: number;
}

const OrderItem = ({ seq, liIndex }: dateListType) => {
  const itemRef = useRef<HTMLLIElement>(null);
  const viewCheck = useIntersectionObserver(itemRef, {});
  const isVisible = !!viewCheck?.isIntersecting;
  const [isDelay, setDelay] = useState<Number>(liIndex);
  useEffect(() => {
    setTimeout(() => {
      setDelay(0);
    }, 1000);
  }, []);
  return (
    <>
      <OrderItemLi
        className={
          dayjs(new Date(returnDate(seq))).format("YYYY/MM/DD") ===
          dayjs(new Date()).format("YYYY/MM/DD")
            ? `open`
            : `closed`
        }
        ref={itemRef}
      >
        <Link
          href={!!seq ? `/list/` + seq : ``}
          className={isVisible ? `active` : ``}
          style={{ animationDelay: Number(isDelay) * 0.05 + `s` }}
        >
          <dl>
            <dt>
              <span></span>
              {dayjs(new Date(returnDate(seq))).format("M월D일(ddd)")} 김밥주문
            </dt>
            <dd>
              {dayjs(new Date(returnDate(seq))).format("YYYY/MM/DD") ===
              dayjs(new Date()).format("YYYY/MM/DD")
                ? `모집중`
                : `마감`}
            </dd>
          </dl>
        </Link>
      </OrderItemLi>
    </>
  );
};

export default OrderItem;

const viewEffect = keyframes`
  0%{transform: translateX(-10rem); opacity:0;}
  40%{transform: translateX(.5rem); opacity:1;}
  100%{transform: translateX(0rem); opacity:1;}
`;

const OrderItemLi = styled.li`
  animation: ${viewEffect} 1s forwards;
  border-bottom: 0.1rem solid #eee;
  &:first-child {
    border-top: 0.1rem solid #eee;
  }
  &.open {
    dd {
      color: #ff7111;
    }
  }
  &.closed {
    a {
      cursor: default;
    }
    dt,
    dd {
      color: #ccc;
    }
  }
  a {
    display: block;
    position: relative;
    padding: 2rem 1rem 2rem 1.6rem;
    font-size: 1.4rem;
    color: #111;
    text-decoration: none;
    box-sizing: border-box;
    transform: translateX(-10rem);
    opacity: 0;
    &.active {
      animation: ${viewEffect} 1s forwards;
    }
    dl {
      display: flex;
      justify-content: center;
      align-items: center;
      dt {
        flex: 1 auto;
        span {
          display: inline-block;
          flex: 1 auto;
          padding-left: 2rem;
          font-size: 1.4rem;
          transition: 0.3s;
          &:before {
            content: "";
            position: absolute;
            top: 0;
            left: 1rem;
            bottom: 0;
            width: 2rem;
            height: 2rem;
            margin: auto;
            background: url(/images/img_logo.png) no-repeat 0 0 / 100% auto;
            animation: ${BounceTurnMotion} 1s infinite;
          }
        }
      }
    }
  }
`;
