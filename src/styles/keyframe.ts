import { keyframes } from '@emotion/react';

export const MotionTextView = keyframes`
  0%{transform:translateX(-2rem) scale(1, .1); opacity:0;}
  100%{transform:translateX(0) scale(1, 1); opacity:1;}
`;

export const MotionIntro = keyframes`
  0%{transform:scale(.1,.1)}
  50%{transform:scale(1.05,1.05)}
  100%{transform:scale(1,1)}
`;

export const IntroMotion = keyframes`
  0%{width:0; height: .5rem; text-indent:-30rem;}
  20%{width:1rem; height: 4.5rem; text-indent:-30rem;}
  100%{width:80%; height: 4.5rem; text-indent:0;}
`;

export const TextMotion = keyframes`
  0%{transform:scale(1,.1); opacity:0;}
  100%{transform:scale(1,1); opacity:1;}
`;

export const BounceMotion = keyframes`
  0%{transform:scale(1,1);}
  85%{transform:scale(1,1);}
  90%{transform:scale(.9,1.1);}
  95%{transform:scale(1.1,.9);}
  100%{transform:scale(1,1);}
`;

export const BounceTurnMotion = keyframes`
  0%{transform:scale(1,1) rotate(0deg);}
  30%{transform:scale(.9,1.1);}
  70%{transform:scale(1.1,.9);}
  100%{transform:scale(1,1) rotate(360deg);}
`;

export const TextAfter = keyframes`
  0%{content:'.'}
  50%{content:'..'}
  100%{content:'...'}
`;

export const LogoMotion = keyframes`
  0%{transform:scale(.5,.5);}
  30%{transform:scale(.8,1.2);}
  60%{transform:scale(1.2,.8);}
  100%{transform:scale(1,1);}
`;

export const viewEffect = keyframes`
  0%{transform: translateX(-10rem); opacity:0;}
  40%{transform: translateX(.5rem); opacity:1;}
  100%{transform: translateX(0rem); opacity:1;}
`;

export const ViewUp = keyframes`
  0% {transform:translateY(2rem); opacity: 0;}
  100% {transform:translateY(0); opacity: 1;}
`;

export const FaceEffect = keyframes`
  0% {transform:translateY(0);}
  20% {transform:translateY(.2rem);}
  40% {transform:translateY(0);}
  100% {transform:translateY(0);}
`;

export const EyeEffect = keyframes`
  0% {transform: scale(1, 1); opacity: 1;}
  10% {transform: scale(1, 0.2); opacity: 0.3;}
  20% {transform: scale(1, 1); opacity: 1;}
  30% {transform: scale(1, 0.2); opacity: 0.3;}
  40% {transform: scale(1, 1); opacity: 1;}
  100% {transform: scale(1, 1); opacity: 1;}
`;

export const MouthEffect = keyframes`
  0% {width: 1.5em;}
  25% {width: 2em;}
  50% {width: 1.5em;}
  100% {width: 1.5em;}
`;

export const MotionBounceTop = keyframes`
  0% {margin-top: 0; background-color: rgba(0,0,0,.1);}
  100% {margin-top: 0.5rem; background-color: rgba(0,0,0,.2);}
`;
