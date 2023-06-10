import React, { useRef } from 'react';
import styled from '@emotion/styled';
import { MotionTextView } from '@styles/keyframe';
import { COLOR } from '@styles/theme';
import useIntersectionObserver from '@hooks/useIntersectionObserver';

const Notice = () => {
  const itemRef = useRef<HTMLDivElement>(null);
  const viewCheck = useIntersectionObserver(itemRef, {});
  const isVisible = !!viewCheck?.isIntersecting;
  const introContents = [
    <>
      안녕하세요 <em>Mason</em> 입니다.
    </>,
    <>
      저는 <em>2023년 5월 31일</em> 부로 삼성동을 떠나게 되었습니다.
    </>,
    <>
      <em>메뉴 수정</em>, <em>비밀번호 초기화</em>, <em>기타 문의 및 요청사항</em>이 있으신분은
    </>,
    <>
      <a href="mailto:mason.dev@kakaocorp.com">mason.dev@kakaocorp.com</a> 메일로 연락 바랍니다.
    </>,
    '감사합니다.',
    ' ',
    '- Mason(김현수) -',
  ];
  return (
    <>
      <NoticeUI className={isVisible ? `active` : ``}>
        <h1 ref={itemRef}>🏂 공지사항</h1>
        {introContents.map((item, idx) => (
          <p key={idx} style={{ animationDelay: idx * 0.2 + `s` }}>
            {item}
          </p>
        ))}
      </NoticeUI>
    </>
  );
};

export default Notice;

const NoticeUI = styled.div`
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
    a {
      color: ${COLOR.blue};
      text-decoration: none;
    }
  }
`;
