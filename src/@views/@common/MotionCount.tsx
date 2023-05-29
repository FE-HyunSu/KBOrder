import React, { useRef, useEffect } from 'react';
import { unitWon } from '@utils/returnData';

interface CountType {
  count: number;
  sec?: number;
}

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
