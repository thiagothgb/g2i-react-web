import React from 'react';
import { VscLoading } from 'react-icons/vsc';
import { Container } from './styles';

const Loading: React.FC = () => {
  return (
    <Container>
      <VscLoading />
    </Container>
  );
};

export default Loading;
