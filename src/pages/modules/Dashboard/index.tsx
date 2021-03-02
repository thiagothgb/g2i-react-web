import React from 'react';

import { Redirect } from 'react-router-dom';
import { Container, MainContent, BeginButton, Link } from './styles';
import { useQuestion } from '../../../hooks/quiz';

const Dashboard: React.FC = () => {
  const { questions, finished } = useQuestion();

  if (questions.length > 0) {
    return <Redirect to="/quiz" />;
  }

  if (finished) {
    return <Redirect to="/result" />;
  }

  return (
    <Container>
      <h1>Welcome to the Trivia Challenge</h1>
      <MainContent>
        <p>You will be presented with 10 True or False questions.</p>
        <p>Can you score 100%?</p>
      </MainContent>
      <Link to="/quiz">
        <BeginButton>
          <b>BEGIN</b>
        </BeginButton>
      </Link>
    </Container>
  );
};

export default Dashboard;
