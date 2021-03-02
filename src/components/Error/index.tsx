import React from 'react';
import { BiError } from 'react-icons/bi';
import { Container } from './styles';

interface ErrorProps {
  message?: string;
}

const Error: React.FC<ErrorProps> = ({ message }) => {
  return (
    <Container>
      <BiError />
      <b>{message}</b>
    </Container>
  );
};

export default Error;
