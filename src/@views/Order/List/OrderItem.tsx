import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import dayjs from 'dayjs';
import { returnDate } from '@utils/returnData';
import { BounceTurnMotion } from '@styles/keyframe';
import useIntersectionObserver from '@hooks/useIntersectionObserver';
import { viewEffect } from '@styles/keyframe';
import { IMAGES } from '@constants/images';
import { ROUTES } from '@constants/routers';
import { COLOR } from '@styles/theme';

interface dateListType {
  seq: string;
  liIndex: number;
  orderClose: boolean;
}

const OrderItem = ({ seq, liIndex, orderClose }: dateListType) => {
  const itemRef = useRef<HTMLLIElement>(null);
  const viewCheck = useIntersectionObserver(itemRef, {});
  const isVisible = !!viewCheck?.isIntersecting;
  const dateNumber = seq.split('_')[0];
  const madeUser = seq.split('_')[1];
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
          dayjs(new Date(returnDate(dateNumber)))
            .format('YYYY/MM/DD')
            .includes(dayjs(new Date()).format('YYYY/MM/DD'))
            ? `open`
            : `closed`
        }
        ref={itemRef}>
        <Link
          href={!!seq ? ROUTES.LIST + `/` + seq : ``}
          className={isVisible ? `active` : ``}
          style={{ animationDelay: Number(isDelay) * 0.05 + `s` }}>
          <dl>
            <dt>
              <span></span>
              {dayjs(new Date(returnDate(dateNumber))).format('M월D일(ddd)')} 김밥주문{' '}
              {!!madeUser ? `(` + madeUser + `)` : ``}
            </dt>
            <dd>
              {dayjs(new Date(returnDate(dateNumber))).format('YYYY/MM/DD') !== dayjs(new Date()).format('YYYY/MM/DD')
                ? `마감`
                : orderClose
                ? `주문마감`
                : `모집중`}
            </dd>
          </dl>
        </Link>
      </OrderItemLi>
    </>
  );
};

export default OrderItem;

const OrderItemLi = styled.li`
  animation: ${viewEffect} 1s forwards;
  border-bottom: 0.1rem solid ${COLOR.grayEE};
  &:first-of-type {
    border-top: 0.1rem solid ${COLOR.grayEE};
  }
  &.open {
    dd {
      color: ${COLOR.orangeL};
    }
  }
  &.closed {
    a {
      cursor: default;
    }
    dt,
    dd {
      color: ${COLOR.grayCC};
    }
  }
  a {
    display: block;
    position: relative;
    padding: 2rem 1rem 2rem 1.6rem;
    font-size: 1.4rem;
    color: ${COLOR.black};
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
            content: '';
            position: absolute;
            top: 0;
            left: 1rem;
            bottom: 0;
            width: 2rem;
            height: 2rem;
            margin: auto;
            background: url(${IMAGES.LOGO}) no-repeat 0 0 / 100% auto;
            animation: ${BounceTurnMotion} 1s infinite;
          }
        }
      }
    }
  }
`;
