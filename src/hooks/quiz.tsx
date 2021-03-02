/* eslint-disable @typescript-eslint/camelcase */
import React, { createContext, useCallback, useState, useContext } from 'react';
import { AxiosError } from 'axios';
import { uuid } from 'uuidv4';
import _ from 'lodash';
import api from '../services/api';

export interface AxiosErrorResponse {
  status: 'error';
  message: string;
}

export interface Questions {
  id: string;
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  finished: false;
  incorrect_answer: string[];
  answered_wrong: boolean;
  answered_correct: boolean;
}

interface AxiosResponse {
  results: Questions[];
}

export interface QuestionContextData {
  questions: Questions[];
  correctAnswerCount: number;
  wrongAnswerCount: number;
  loading: boolean;
  error: boolean;
  finished: boolean;
  errorMessage?: string;
  actualQuestion?: Questions;
  loadQuestions(): Promise<void>;
  getNextQuestion(id: string): void;
  updateQuestion(id: string, correct: boolean): void;
  clearCache(): void;
}

export const QuestionContext = createContext<QuestionContextData>(
  {} as QuestionContextData,
);

const QuestionProvider: React.FC = ({ children }) => {
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [wrongAnswerCount, setWrongAnswerCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [finished, setFinished] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [actualQuestion, setActualQuestion] = useState<Questions | undefined>();
  const [questions, setQuestions] = useState<Questions[]>(() => {
    const storagedQuestions = localStorage.getItem('@G2I:questions');

    if (storagedQuestions) {
      const storagedQuestionsParsed = JSON.parse(
        storagedQuestions,
      ) as Questions[];

      return storagedQuestionsParsed;
    }

    return [];
  });

  const loadQuestions = useCallback(async (): Promise<void> => {
    try {
      setLoading(true);
      setError(false);
      setErrorMessage(undefined);

      const { data } = await api.get<AxiosResponse>(
        'api.php?amount=10&difficulty=hard&type=boolean',
      );

      if (data.results && data.results.length <= 0) {
        setError(true);
        setErrorMessage(
          'No questions returned from api. It is not possible run the quiz.',
        );
        return;
      }

      const questionsFormatted = data.results
        ? data.results.map(question => ({
            ...question,
            id: uuid(),
            question: _.unescape(question.question),
            answered_correct: false,
            answered_wrong: false,
          }))
        : [];

      localStorage.setItem(
        '@G2I:questions',
        JSON.stringify(questionsFormatted),
      );

      localStorage.setItem(
        '@G2I:actualQuestion',
        JSON.stringify(questionsFormatted[0] || ''),
      );

      setQuestions(questionsFormatted);
      setActualQuestion(questionsFormatted[0]);
      setFinished(false);
    } catch (err) {
      if ((err as AxiosError).isAxiosError) {
        if (!err.message) {
          setError(true);
          setErrorMessage('Something wrong happens. Try later.');
        } else if ([400, 401].includes(err.response?.status || 0)) {
          setError(true);
          setErrorMessage('Problems with the api permissions. Try later.');
        }
      }

      setError(true);
      setErrorMessage('Something wrong happens. Try later.');
    } finally {
      setLoading(false);
    }
  }, []);

  const getNextQuestion = useCallback(
    (id: string): void => {
      const actualIndex = questions.findIndex(question => question.id === id);

      if (actualIndex < 0) {
        setError(true);
        setErrorMessage('Question is not more available. Refresh the test.');
      } else if (actualIndex + 1 > questions.length - 1) {
        setFinished(true);
      } else {
        setActualQuestion(questions[actualIndex + 1]);

        localStorage.setItem(
          '@G2I:actualQuestion',
          JSON.stringify(questions[actualIndex + 1]),
        );
      }
    },
    [questions],
  );

  const updateQuestion = useCallback(
    (id: string, correct: boolean): void => {
      const actualIndex = questions.findIndex(question => question.id === id);

      if (actualIndex < 0) {
        setError(true);
        setErrorMessage('Question is not more available. Refresh the test.');
      } else if (correct) {
        setCorrectAnswerCount(current => current + 1);
        const updatedQuestions = questions.map(question => {
          if (question.id === id) {
            return {
              ...question,
              answered_correct: true,
              answered_wrong: false,
            };
          }

          return question;
        });
        setQuestions(updatedQuestions);
        localStorage.setItem(
          '@G2I:questions',
          JSON.stringify(updatedQuestions),
        );
      } else {
        setWrongAnswerCount(current => current - 1);
        const updatedQuestions = questions.map(question => {
          if (question.id === id) {
            return {
              ...question,
              answered_correct: false,
              answered_wrong: true,
            };
          }

          return question;
        });
        setQuestions(updatedQuestions);
        localStorage.setItem(
          '@G2I:questions',
          JSON.stringify(updatedQuestions),
        );
      }
    },
    [questions],
  );

  const clearCache = useCallback(() => {
    localStorage.removeItem('@G2I:questions');
    localStorage.removeItem('@G2I:actualQuestion');

    setQuestions([]);
    setActualQuestion(undefined);
    setFinished(false);
  }, []);

  return (
    <QuestionContext.Provider
      value={{
        questions,
        finished,
        correctAnswerCount,
        wrongAnswerCount,
        loading,
        error,
        errorMessage,
        actualQuestion,
        loadQuestions,
        getNextQuestion,
        updateQuestion,
        clearCache,
      }}
    >
      {children}
    </QuestionContext.Provider>
  );
};

function useQuestion(): QuestionContextData {
  const context = useContext(QuestionContext);

  if (!context) {
    throw new Error('useQuestion must be used within an QuestionProvider');
  }

  return context;
}

export { QuestionProvider, useQuestion };
