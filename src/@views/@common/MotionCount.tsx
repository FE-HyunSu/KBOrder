import React, { useRef, useEffect } from 'react';

interface CountType {
  count: number;
  sec?: number;
}

const unitWon = (num: number) => {
  return Math.round(num)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const MotionCount = ({ count, sec }: CountType) => {
  const countRef = useRef<HTMLElement>(null);
  const timeSec = !!sec ? sec : 2000;

  let resultNumber = 0;
  const requestCount = () => {
    if (resultNumber >= count && countRef.current) {
      countRef.current.innerText = unitWon(count);
    } else if (countRef.current) {
      countRef.current.innerText = unitWon(Math.round((resultNumber += count / ((timeSec / 1000) * 40))));
      requestAnimationFrame(requestCount);
    }
  };

  useEffect(() => {
    requestAnimationFrame(requestCount);
  }, []);
  return <i ref={countRef} />;
};

export default MotionCount;
