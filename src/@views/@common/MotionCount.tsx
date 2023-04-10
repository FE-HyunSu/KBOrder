import React, { useRef, useEffect } from 'react';

interface CountType {
  count: number;
}

const MotionCount = ({ count }: CountType) => {
  const countRef = useRef<HTMLElement>(null);
  const unitWon = (num: number) => {
    return Math.round(num)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  useEffect(() => {
    let resultNumber = 0;
    let countInterval = setInterval(() => {
      try {
        if (resultNumber >= count && countRef.current) {
          clearInterval(countInterval);
          countRef.current.innerHTML = unitWon(count);
        } else if (countRef.current) {
          countRef.current.innerHTML = unitWon(Math.round((resultNumber += count / (2000 / 60))));
        }
      } catch {
        clearInterval(countInterval);
      }
    }, 25);

    return () => {
      clearInterval(countInterval);
    };
  }, []);
  return <i ref={countRef}></i>;
};
export default MotionCount;
