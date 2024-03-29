import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { MotionTextView } from '@styles/keyframe';
import { COLOR } from '@styles/theme';
import useIntersectionObserver from '@hooks/useIntersectionObserver';

const Intro = () => {
  const itemRef = useRef<HTMLDivElement>(null);
  const viewCheck = useIntersectionObserver(itemRef, {});
  const isVisible = !!viewCheck?.isIntersecting;
  const introContents = [
    '안녕하세요.',
    <>
      삼성동 이레 김밥주문 페이지 <em>KB-Order</em> 입니다.
    </>,
    <>
      오늘 점심 김밥을 드실 분들은 <em>주문을 신청</em>해 주세요.
    </>,
    <>
      <em>12:00</em> 까지 신청된 주문건에 한해서 일괄 전화 주문 들어갑니다.
    </>,
    ' ',
    '- Mason(김현수) -',
  ];
  return (
    <>
      <IntroUI ref={itemRef} className={isVisible ? `active` : ``}>
        <h1>🍱 소개</h1>
        {introContents.map((item, idx) => (
          <p key={idx} style={{ animationDelay: idx * 0.2 + `s` }}>
            {item}
          </p>
        ))}
      </IntroUI>
    </>
  );
};

export default Intro;

const IntroUI = styled.div`
  display: block;
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
  }
  &.active {
    p {
      animation: ${MotionTextView} 0.8s both;
    }
  }
  p {
    padding: 0.3rem 0;
    font-weight: 400;
    font-size: 1.5rem;
    line-height: 1.4;
    opacity: 0;
    em {
      color: ${COLOR.green};
    }
  }
`;
