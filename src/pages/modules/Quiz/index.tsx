import React, { useState } from 'react';
import Loading from '../../../components/Loading';
import { Container, MainContent, ActionsContainer } from './styles';

const Quiz: React.FC = () => {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  return (
    <Container>
      <h1>Entertainment: Video Games</h1>
      <MainContent>
        <text>Unturned originally started as a Roblox game.</text>
      </MainContent>
      <div>1 of 10</div>
      <ActionsContainer>
        <button>TRUE</button>
        <button>FALSE</button>
      </ActionsContainer>
      <ActionsContainer>
        <button>Give Up</button>
        <button>Next</button>
      </ActionsContainer>
    </Container>
  );
};

export default Quiz;
