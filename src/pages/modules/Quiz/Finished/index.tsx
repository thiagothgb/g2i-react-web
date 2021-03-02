import React, { useMemo, useCallback } from 'react';
import { BsCheckBox } from 'react-icons/bs';
import { VscError } from 'react-icons/vsc';
import { TiArrowBack } from 'react-icons/ti';
import { Redirect } from 'react-router-dom';
import { useQuestion } from '../../../../hooks/quiz';
import { Container, List, ListItem, PlayAgainButton } from './styles';

const Finished: React.FC = () => {
  const { clearCache, correctAnswerCount, finished, questions } = useQuestion();

  const handleOnNewPlay = useCallback(() => {
    clearCache();
  }, [clearCache]);

  const total = useMemo(() => {
    return questions.length;
  }, [questions.length]);

  if (!finished) {
    return <Redirect to={questions.length <= 0 ? '/' : 'quiz'} />;
  }

  return (
    <Container>
      <h1>You scored</h1>
      <h1>{`${correctAnswerCount}/${total}`}</h1>

      <List>
        {questions.map(question => {
          return (
            <ListItem key={question.id} correct={question.answered_correct}>
              {question.answered_correct ? <BsCheckBox /> : <VscError />}
              <b>{question.question}</b>
            </ListItem>
          );
        })}
      </List>
      <PlayAgainButton to="/" onClick={handleOnNewPlay}>
        <TiArrowBack />
        PLAY AGAIN?
      </PlayAgainButton>
    </Container>
  );
};

export default Finished;
