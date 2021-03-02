import React from 'react';
import { VscLoading } from 'react-icons/vsc';
import { Container } from './styles';

const Loading: React.FC = () => {
  return (
    <Container data-testid="loading-component">
      <VscLoading />
    </Container>
  );
};

export default Loading;
