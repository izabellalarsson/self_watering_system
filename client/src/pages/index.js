import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Plant from '../../src/components/Plant';
import WaterContainer from '../../src/components/WaterContainer';
import WateringCan from '../../src/components/WateringCan';
const Header = styled.h1`
  font-size: 72px;
  letter-spacing: 0.1em;
  color: #fffd98;
`;

const StyledIndex = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 100vh;

  > section {
    display: flex;
    width: 100%;
    justify-content: space-evenly;
    align-items: flex-end;
  }
`;

const Index = ({ socket }) => {
  const [waterLevel, setWaterLevel] = useState(10);
  const [isDraggingCan, updateIsDraggingCan] = useState(false);
  const [isWatering, setIsWatering] = useState(false);

  useEffect(() => {
    socket.on('percent', data => {
      setWaterLevel(data);
    });
  }, []);

  useEffect(() => {
    if(isWatering) {
      socket.emit('startWatering');
    } else {
      socket.emit('stopWatering');
    }
  }, [isWatering]);

  return (
    <StyledIndex>
      <Header>Time to water your plant?</Header>
      <section>
        <Plant />
        <WaterContainer
          waterLevel={waterLevel}
          socket={socket}
          isDraggingCan={isDraggingCan}
          setIsWatering={setIsWatering}
        />
        <WateringCan
          updateIsDraggingCan={updateIsDraggingCan}
          isWatering={isWatering}
          setIsWatering={setIsWatering}
        />
      </section>
    </StyledIndex>
  );
};

export default Index;
