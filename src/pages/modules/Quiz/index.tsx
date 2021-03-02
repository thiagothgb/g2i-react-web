import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import { FiThumbsUp, FiThumbsDown } from 'react-icons/fi';
import { CgCloseR } from 'react-icons/cg';
import Loading from '../../../components/Loading';
import Error from '../../../components/Error';
import { useQuestion } from '../../../hooks/quiz';
import { useToast } from '../../../hooks/toast';
import {
  Container,
  MainContent,
  ActionsContainer,
  ActionButton,
} from './styles';

const Quiz: React.FC = () => {
  const history = useHistory();
  const { addToast } = useToast();
  const {
    errorMessage,
    loading,
    error,
    finished,
    questions,
    actualQuestion,
    updateQuestion,
    loadQuestions,
    clearCache,
    getNextQuestion,
  } = useQuestion();

  const [answer, setAnswer] = useState<boolean | undefined>();

  useEffect(() => {
    if (!actualQuestion) {
      loadQuestions();
    }
  }, [actualQuestion, loadQuestions]);

  const handleOnSelectAnswer = useCallback((value: boolean) => {
    setAnswer(current => {
      if (current === value) {
        return undefined;
      }
      return value;
    });
  }, []);

  const handleGiveUp = useCallback(() => {
    clearCache();
    history.push('/');
  }, [clearCache, history]);

  const handleNextQuestion = useCallback(() => {
    if (answer === undefined) {
      addToast({
        title: 'Select on question before go next.',
        type: 'error',
      });
    } else if (actualQuestion) {
      updateQuestion(
        actualQuestion.id,
        String(actualQuestion.correct_answer.toLowerCase()) === String(answer),
      );
      getNextQuestion(actualQuestion.id);
      setAnswer(undefined);
    }
  }, [actualQuestion, addToast, answer, getNextQuestion, updateQuestion]);

  const total = useMemo(() => {
    return questions.length;
  }, [questions.length]);

  const actual = useMemo(() => {
    if (actualQuestion) {
      const index = questions.findIndex(
        question => question.id === actualQuestion.id,
      );

      return index + 1;
    }

    return 0;
  }, [actualQuestion, questions]);

  if (loading) {
    return (
      <Container>
        <Loading />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Error message={errorMessage} />
      </Container>
    );
  }

  if (finished) {
    return <Redirect to="/result" />;
  }

  return (
    <Container data-testid="quiz-header">
      <header>
        <button
          lang="en"
          type="button"
          aria-label="Give up"
          onClick={handleGiveUp}
        >
          <CgCloseR />
        </button>
      </header>
      <h1 lang="en">{actualQuestion?.category}</h1>
      <MainContent data-testid="quiz-main-container">
        <p lang="en">{actualQuestion?.question}</p>
      </MainContent>
      <div lang="en">{`${actual} of ${total}`}</div>
      <ActionsContainer>
        <ActionButton
          selected={answer === true}
          data-testid="quiz-true-button"
          onClick={() => handleOnSelectAnswer(true)}
        >
          <FiThumbsUp />

          <b lang="en">TRUE</b>
        </ActionButton>
        <ActionButton
          data-testid="quiz-false-button"
          selected={answer === false}
          onClick={() => handleOnSelectAnswer(false)}
        >
          <FiThumbsDown />
          <b lang="en">FALSE</b>
        </ActionButton>
      </ActionsContainer>

      <button
        lang="en"
        aria-labelledby="Go to the next question"
        type="button"
        data-testid="quiz-next-button"
        onClick={handleNextQuestion}
      >
        Next
      </button>
    </Container>
  );
};

export default Quiz;
