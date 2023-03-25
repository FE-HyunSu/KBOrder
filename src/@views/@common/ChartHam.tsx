import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import useIntersectionObserver from "@hooks/useIntersectionObserver";

interface ChartHamType {
  count: number;
}

const ChartHam = ({ count }: ChartHamType) => {
  const itemRef = useRef<HTMLLIElement>(null);
  const viewCheck = useIntersectionObserver(itemRef, {});
  const isVisible = !!viewCheck?.isIntersecting;
  const [hamWidth, setHamWidth] = useState<Number>(0);

  useEffect(() => {
    if (isVisible) {
      setTimeout(() => {
        setHamWidth(count);
      }, 0);
    }
  }, [hamWidth, isVisible]);

  return (
    <>
      <ChartHamUI
        style={{ width: hamWidth + `rem` }}
        ref={itemRef}
      ></ChartHamUI>
    </>
  );
};

export default ChartHam;

const ChartHamUI = styled.strong`
  display: inline-block;
  position: relative;
  width: 0;
  max-width: calc(100% - 15rem);
  height: 2rem;
  margin-right: 1.5rem;
  background-color: #f46b21;
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;
  transition: 2s;
  &:before {
    content: "";
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 1rem;
    background-color: #d75b18;
    border-bottom-left-radius: 1rem;
  }
  &:after {
    content: "";
    position: absolute;
    top: 0;
    right: -0.7rem;
    bottom: 0;
    width: 0;
    height: 0;
    width: 1.414rem;
    height: 1.414rem;
    margin: auto;
    background-color: #fb947a;
    transform: rotate(45deg);
    border-top-right-radius: 0.6rem;
    border-bottom-left-radius: 0.4rem;
  }
`;