import React from 'react';

import { Redirect } from 'react-router-dom';
import { Container, MainContent, BeginButton, Link } from './styles';
import { useQuestion } from '../../../hooks/quiz';

const Dashboard: React.FC = () => {
  const { questions, finished } = useQuestion();

  if (questions && questions.length > 0) {
    return <Redirect to="/quiz" />;
  }

  if (finished) {
    return <Redirect to="/result" />;
  }

  return (
    <Container role="main">
      <h1 lang="en" aria-label="Welcome to the Trivia Challenge">
        Welcome to the Trivia Challenge
      </h1>
      <MainContent>
        <p
          lang="en"
          aria-label="You will be presented with 10 True or False questions."
        >
          You will be presented with 10 True or False questions.
        </p>
        <p lang="en" aria-label="Can you score 100%?">
          Can you score 100%?
        </p>
      </MainContent>
      <Link
        to="/quiz"
        lang="en"
        aria-label="Begin"
        aria-labelledby="Start the quiz"
        data-testid="start-quiz"
      >
        <BeginButton>
          <b>BEGIN</b>
        </BeginButton>
      </Link>
    </Container>
  );
};

export default Dashboard;
