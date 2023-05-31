import React from 'react';
import useMotionCount from '@hooks/useMotionCount';

interface MotionCountT {
  endCount: number;
}

const MotionCount = ({ endCount }: MotionCountT) => {
  const returnCount = useMotionCount({ endCount: endCount, sec: 2000 });

  return <React.Fragment>{Math.round(Number(returnCount))}</React.Fragment>;
};

export default MotionCount;
