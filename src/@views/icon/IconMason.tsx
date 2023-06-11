import React from 'react';
import styled from '@emotion/styled';
import { FaceEffect, EyeEffect, ViewUp, MouthEffect } from '@styles/keyframe';

interface iconSizeT {
  iconSize: string;
}

const IconMason = ({ iconSize }: iconSizeT) => {
  return (
    <Mason size={iconSize}>
      <dl>
        <dt>
          <IconHair />
          <IconEye />
          <IconMouth />
        </dt>
        <dd>
          <IconBody />
        </dd>
      </dl>
    </Mason>
  );
};

export default IconMason;

const Mason = styled.div<{ size: string }>`
  font-size: ${(props) => props.size};
  text-align: center;
  transition: 1s;
  opacity: 0;
  animation: ${ViewUp} 0.5s forwards;
  dt {
    display: inline-block;
    position: relative;
    width: 5em;
    height: 5em;
    margin: 0 auto;
    border-radius: 100%;
    background-color: #f9d0ba;
    transform: scale(0.95, 1);
    animation: ${FaceEffect} 1s infinite linear alternate;
    z-index: 2;
  }
  dd {
    position: relative;
    width: 8em;
    height: 2em;
    margin: -0.8em auto 0 auto;
    padding-top: 1em;
    overflow: hidden;
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      width: 1.5em;
      height: 1.5em;
      margin: 0 auto;
      border-bottom-left-radius: 1em;
      border-bottom-right-radius: 1em;
      background-color: #f9d0ba;
      z-index: 2;
    }
  }
`;

const IconHair = styled.span`
  display: inline-block;
  width: 100%;
  height: 1.5em;
  overflow: hidden;
  &::before {
    content: '';
    display: inline-block;
    width: 100%;
    height: 5em;
    border-radius: 100%;
    background-color: #222;
  }
`;

const IconEye = styled.span`
  display: inline-block;
  position: relative;
  width: 100%;
  height: 1em;
  animation: ${EyeEffect} 1s infinite linear alternate;
  &::before {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0.2em;
    left: 0.8em;
    width: 0.5em;
    height: 0.5em;
    border-radius: 100%;
    background-color: #080403;
  }
  &::after {
    content: '';
    display: inline-block;
    position: absolute;
    top: 0.2em;
    right: 0.8em;
    width: 0.5em;
    height: 0.5em;
    border-radius: 100%;
    background-color: #080403;
  }
`;

const IconMouth = styled.span`
  display: inline-block;
  position: relative;
  width: 1.5em;
  height: 1.5em;
  overflow: hidden;
  animation: ${MouthEffect} 1s infinite linear alternate;
  &::before {
    content: '';
    display: inline-block;
    position: absolute;
    top: -0.5em;
    left: 0;
    width: 100%;
    height: 1em;
    border-radius: 100%;
    background-color: #f19296;
  }
`;

const IconBody = styled.span`
  content: '';
  display: inline-block;
  position: relative;
  width: 100%;
  height: 3em;
  border-radius: 100%;
  background-color: #d2be89;
  overflow: hidden;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 2.5em;
    height: 100%;
    background-color: #446ab3;
  }
  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 2.5em;
    height: 100%;
    background-color: #446ab3;
  }
`;
