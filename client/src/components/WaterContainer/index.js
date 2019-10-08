import React, { useEffect } from 'react';
import { transform, useMotionValue } from 'framer-motion';
import {
  StyledWaterContainer,
  Water,
  Wave,
  WrapperHandle,
  Handle
} from './style';
import useHandle from './useHandle';

const WaterContainer = props => {
  const maxHandle = useHandle(0, 280);
  const minHandle = useHandle(0, -280);

  useEffect(() => {
    console.log(minHandle.value);
  }, [minHandle.value]);

  return (
    <StyledWaterContainer>
      <aside>
        <Water>
          <Wave></Wave>
        </Water>
      </aside>
      <WrapperHandle>
        <Handle
          drag="y"
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 280 }}
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
      </WrapperHandle>
    </StyledWaterContainer>
  );
};

export default WaterContainer;
