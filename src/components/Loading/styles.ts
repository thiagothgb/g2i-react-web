import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  align-content: center;

  svg {
    display: inline-block;
    animation: ${rotate} 2s linear infinite;
    padding: 5px;
    font-size: 6rem;
  }
`;
