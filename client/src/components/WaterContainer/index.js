import React, { useEffect } from 'react';
import { transform, useMotionValue, useSpring } from 'framer-motion';
import {
  StyledWaterContainer,
  Water,
  Wave,
  WrapperHandle,
  Handle
} from './style';
import useHandle from './useHandle';

const WaterContainer = ({ waterLevel, socket }) => {
  const maxHandle = useHandle(0, 280);
  const minHandle = useHandle(0, -280);
  const waterLevelAnimation = useSpring('0%');

  console.log(waterLevel);
  useEffect(() => {
    waterLevelAnimation.set(`-${waterLevel}%`);
  }, [waterLevel]);

  useEffect(() => {
    socket.emit('maxValue', maxHandle.value);
    socket.emit('minValue', minHandle.value);
  });

  return (
    <StyledWaterContainer>
      <aside>
        <Water style={{ y: waterLevelAnimation, x: '-50%' }}>
          <Wave>
            <div></div>
            <div></div>
          </Wave>
        </Water>
      </aside>
      <Handle
        drag="y"
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 280 }}
        dragMomentum={false}
        style={{ y: maxHandle.y }}
      >
        <div>
          <p>Max</p>
          <p>{maxHandle.value}%</p>
        </div>
        <span></span>
      </Handle>
      <Handle
        drag="y"
        dragConstraints={{ left: 0, right: 0, top: -280, bottom: 0 }}
        style={{ y: minHandle.y }}
      >
        <div>
          <p>Min</p>
          <p>{minHandle.value}%</p>
        </div>
        <span></span>
      </Handle>
    </StyledWaterContainer>
  );
};

export default WaterContainer;
