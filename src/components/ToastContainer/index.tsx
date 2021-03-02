import React from 'react';
import { useTransition } from 'react-spring';
import { ToastMessage } from '../../hooks/toast';
import Toast from './Toast';
import { Container } from './styles';

interface ToastMessageProps {
  messages: ToastMessage[];
}

const ToastContainer: React.FC<ToastMessageProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    message => message.id,
    {
      from: {
        right: '-120%',
        opacity: 0,
      },
      enter: {
        right: '0%',
        opacity: 1,
      },
      leave: {
        right: '-120%',
        opacity: 0,
      },
    },
  );

  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }, index) => {
        return (
          <React.Fragment key={`${key}-${String(index)}`}>
            <Toast
              key={`${key}-${String(index)}`}
              message={item}
              style={props}
            />
          </React.Fragment>
        );
      })}
    </Container>
  );
};

export default ToastContainer;
