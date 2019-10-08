import styled from 'styled-components';
import { motion } from 'framer-motion';

export const StyledWaterContainer = styled.div`
  width: 110px;
  height: 300px;
  position: relative;
  background-color: #9cfffa;
  border-radius: 2px;

  aside {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
`;

export const Water = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -100%);
  width: 300px;
  height: 300px;
`;

export const Wave = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  &:before,
  &:after {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    top: 0;
    left: 50%;
    transform: translate(-50%, -75%);
  }

  &:before {
    background: rgba(255, 255, 255, 1);
    border-radius: 45%;
    animation: animate 7s linear infinite;
  }

  &:after {
    background: rgba(255, 255, 255, 0.5);
    border-radius: 40%;
    animation: animate 15s linear infinite;
  }

  @keyframes animate {
    0% {
      transform: translate(-50%, -75%) rotate(0deg);
    }
    100% {
      transform: translate(-50%, -75%) rotate(360deg);
    }
  }
`;

export const WrapperHandle = styled.div`
  div:first-of-type {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 150px;
    left: 0;
    top: 0;
  }

  div:last-of-type {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 40px;
    left: -27%;
    bottom: 0px;
  }
`;

export const Handle = styled(motion.div)`
  cursor: grab;

  > div {
    display: flex;
    flex-direction: column;
    > p {
      letter-spacing: 0.2em;
    }
  }
  > span {
    width: 10px;
    height: 1px;
    background: #000;
  }
`;
