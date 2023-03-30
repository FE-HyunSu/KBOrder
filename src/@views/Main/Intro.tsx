import React from "react";
import styled from "@emotion/styled";
import { MotionTextView } from "@styles/keyframe";

const Intro = () => {
  const introContents = [
    "안녕하세요.",
    <>
      삼성동 이레 김밥주문 페이지 <em>KB-Order</em> 입니다.
    </>,
    <>
      오늘 점심 김밥을 드실 분들은 <em>주문을 신청</em>해 주세요.
    </>,
    <>
      <em>12:00</em> 까지 신청된 주문건에 한해서 일괄 전화 주문 들어갑니다.
    </>,
    "",
    "- Mason(김현수) -",
  ];
  return (
    <>
      <IntroUI>
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
    animation: ${MotionTextView} 0.8s both;
    em {
      color: #299438;
    }
  }
`;
