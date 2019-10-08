import React from 'react';
import styled from 'styled-components';
import Plant from '../../src/components/Plant';
import WaterContainer from '../../src/components/WaterContainer';

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

const Index = () => {
  return (
    <StyledIndex>
      <Header>Time to water your plant?</Header>
      <section>
        <Plant />
        <WaterContainer />
      </section>
    </StyledIndex>
  );
};

export default Index;
