import { useState, useEffect } from 'react';

interface useMotionCountT {
  endCount: number;
  sec: number;
}

const useMotionCount = ({ endCount, sec }: useMotionCountT) => {
  const [count, setCount] = useState<number>(0);
  const intervalCount = (endCount / sec) * 40; // 40은 주사율. 쓰로틀 로직 업뎃 필요.
  let returnCount = 0;
  useEffect(() => {
    const countCalcFn = () => {
      if (returnCount >= endCount) {
        returnCount = endCount;
        setCount(returnCount);
      } else {
        returnCount += intervalCount;
        setCount(returnCount);
        requestAnimationFrame(countCalcFn);
      }
    };
    requestAnimationFrame(countCalcFn);
  }, [endCount]);
  return [count];
};

export default useMotionCount;
