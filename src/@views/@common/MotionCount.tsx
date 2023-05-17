import React, { useRef, useEffect } from 'react';

interface CountType {
  count: number;
  sec?: number;
}

const MotionCount = ({ count, sec }: CountType) => {
  const countRef = useRef<HTMLElement>(null);
  const timeSec = !!sec ? sec : 2000;
  const unitWon = (num: number) => {
    return Math.round(num)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  let resultNumber = 0;
  const requestCount = () => {
    try {
      if (resultNumber >= count && countRef.current) {
        countRef.current.innerHTML = unitWon(count);
      } else if (countRef.current) {
        countRef.current.innerHTML = unitWon(Math.round((resultNumber += count / ((timeSec / 1000) * 60))));
        requestAnimationFrame(requestCount);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    requestAnimationFrame(requestCount);
  }, []);
  return <i ref={countRef}></i>;
};
export default MotionCount;
