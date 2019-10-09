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

export const Water = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 300px;
`;

export const Wave = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  > div {
    position: absolute;
    width: 200%;
    height: 200%;
    top: 0;
    left: 50%;
    transform: translate(-50%, -75%);
  }

  > div:first-of-type {
    background: rgba(255, 255, 255, 1);
    border-radius: 45%;
    animation: animate 7s linear infinite;
  }

  > div:last-of-type {
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

export const Handle = styled(motion.div)`
  cursor: grab;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:first-of-type {
    width: 60px;
    right: 100%;
    margin-right: -5px;
    top: 0;
  }

  &:last-of-type {
    width: 60px;
    right: 100%;
    margin-right: -5px;
    bottom: 0px;
  }

  > div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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

export const WaterArea = styled(motion.div)`
  background: transparent;
  width: 65px;
  height: 100px;
  align-self: flex-end;
  z-index: 999999;
  margin-right: -60%;
  position: relative;
`;
