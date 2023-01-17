import styled, { keyframes } from "styled-components";

const effectBg = keyframes`
  0%{left:-20%}
  100%{left:120%}
`;

export const SkeletonUi = styled.span`
  display: inline-block;
  position: relative;
  min-width: 5rem;
  min-height: 1rem;
  border-radius: 0.2rem;
  background-color: #eee;
  overflow: hidden;
  &:before {
    content: "";
    position: absolute;
    top: -100%;
    left: -20%;
    width: 30%;
    height: 300%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0)
    );
    transform: rotate(25deg);
    animation: ${effectBg} 2s infinite;
  }
`;
