import React, { useRef, useEffect } from 'react';

interface CountType {
  count: number;
  motionTime?: number;
}

const unitWon = (num: number) => {
  return Math.round(num)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const useMotionCount = ({ count, motionTime }: CountType) => {
  const countRef = useRef<HTMLElement>(null);
  const timeSec = !!motionTime ? motionTime : 2000; // 초기값 설정.
  let requestCount: () => void;

  useEffect(() => {
    let resultNumber = 0;
    requestCount = () => {
      if (resultNumber >= count && countRef.current) {
        countRef.current.innerText = unitWon(count);
      } else if (countRef.current) {
        countRef.current.innerText = unitWon(Math.round((resultNumber += count / ((timeSec / 1000) * 40))));
        requestAnimationFrame(requestCount);
      }
    };
    let rafRequestCount = requestAnimationFrame(requestCount);
    return () => {
      cancelAnimationFrame(rafRequestCount);
    };
  }, []);

  return { countRef };
};

export default useMotionCount;
