/* eslint-disable @typescript-eslint/camelcase */
import React, { createContext, useCallback, useState, useContext } from 'react';
import { AxiosError } from 'axios';
import { useHistory } from 'react-router-dom';
import { uuid } from 'uuidv4';
import api from '../services/api';
import { useToast } from './toast';

export interface AxiosErrorResponse {
  status: 'error';
  message: string;
}

interface Questions {
  id: string;
  category: string;
  type: string;
  difficulty: string;
  questions: string;
  correct_answer: string;
  incorrect_answer: string[];
  answered_wrong: boolean;
  answered_correct: boolean;
}

interface AxiosResponse {
  results: Questions[];
}

interface QuestionContextData {
  questions: Questions[];
  correctAnswerCount: number;
  wrongAnswerCount: number;
  loading: boolean;
  error: boolean;
  finished: boolean;
  errorMessage?: string;
  actualQuestion?: Questions;
  loadQuestions(): Promise<Questions>;
  getNextQuestion(id: string): Promise<Questions | undefined>;
  updateQuestion(id: string, correct: boolean): Promise<void>;
  clearCache(): void;
}

const QuestionContext = createContext<QuestionContextData>(
  {} as QuestionContextData,
);

const AuthProvider: React.FC = ({ children }) => {
  const { addToast } = useToast();
  const history = useHistory();
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

  const loadQuestions = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);
      setErrorMessage(undefined);

      const { data } = await api.post<AxiosResponse>(
        'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean',
      );

      if (data.results.length <= 0) {
        setError(true);
        setErrorMessage(
          'No questions returned from api. It is not possible run the quiz.',
        );
        return;
      }

      const questionsFormatted = data.results.map(question => ({
        ...question,
        id: uuid(),
        answered_correct: false,
        answered_wrong: false,
      }));

      localStorage.setItem(
        '@G2I:questions',
        JSON.stringify(questionsFormatted),
      );

      localStorage.setItem(
        '@G2I:actualQuestion',
        JSON.stringify(questionsFormatted[0]),
      );

      setQuestions(questionsFormatted);
      setActualQuestion(questionsFormatted[0]);
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

  const signOut = useCallback(() => {
    localStorage.removeItem('@FarmFish:token');
    localStorage.removeItem('@FarmFish:user');

    api.defaults.headers.authorization = null;

    setData({} as AuthState);
  }, []);

  return (
    <QuestionContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </QuestionContext.Provider>
  );
};

function useAuth(): QuestionContextData {
  const context = useContext(QuestionContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
