import React from 'react';
import { Link } from 'react-router-dom';
import { Container, MainContent } from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <h1>Welcome to the Trivia Challenge</h1>
      <MainContent>
        <p>You will be presented with 10 True or False questions.</p>
        <p>Can you score 100%?</p>
      </MainContent>
      <Link to="quiz">BEGIN</Link>
    </Container>
  );
};

export default Dashboard;
