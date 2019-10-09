import React, { useEffect, useState } from 'react';
import { useSpring } from 'framer-motion';
import { StyledWaterContainer, Water, Wave, Handle, WaterArea } from './style';
import useHandle from './useHandle';

const WaterContainer = ({
  waterLevel,
  socket,
  isDraggingCan,
  setIsWatering
}) => {
  const [defaultMinValue, setDefaultMinValue] = useState(0);
  const [defaultMaxValue, setDefaultMaxValue] = useState(0);

  useEffect(() => {
    socket.on('defaultMinValue', data => {
      setDefaultMinValue(data);
    });
    socket.on('defaultMaxValue', data => {
      setDefaultMaxValue(data);
    });

    return () => {
      socket.removeAllListeners();
    };
  }, []);

  const maxHandle = useHandle(0, 280, defaultMaxValue);
  const minHandle = useHandle(0, -280, defaultMinValue);
  const waterLevelAnimation = useSpring('0%');

  useEffect(() => {
    waterLevelAnimation.set(`-${waterLevel}%`);
  }, [waterLevel]);

  useEffect(() => {
    socket.emit('maxValue', maxHandle.value);
    socket.emit('minValue', minHandle.value);
  });

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <WaterArea
          onHoverStart={() => {
            isDraggingCan && setIsWatering(true);
          }}
          onHoverEnd={() => setIsWatering(false)}
        />
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
            onDrag={e => {
              if (maxHandle.rawValue > minHandle.rawValue + 230) {
                maxHandle.y.set(minHandle.rawValue + 230);
              }
            }}
            dragConstraints={{
              left: 0,
              right: 0,
              top: 0,
              bottom: 280
            }}
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
            onDrag={e => {
              if (minHandle.rawValue < maxHandle.rawValue - 230) {
                minHandle.y.set(maxHandle.rawValue - 230);
              }
            }}
            dragConstraints={{
              left: 0,
              right: 0,
              top: -280,
              bottom: 0
            }}
            dragMomentum={false}
            style={{ y: minHandle.y }}
          >
            <div>
              <p>Min</p>
              <p>{minHandle.value}%</p>
            </div>
            <span></span>
          </Handle>
        </StyledWaterContainer>
      </div>
    </>
  );
};

export default WaterContainer;
