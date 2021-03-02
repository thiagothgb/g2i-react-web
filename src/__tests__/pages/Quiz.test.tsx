import React from 'react';

import { act, render, screen, fireEvent } from '@testing-library/react';
import AxiosMock from 'axios-mock-adapter';
import { QuestionContext, QuestionContextData } from '../../hooks/quiz';
import Quiz from '../../pages/modules/Quiz';
import api from '../../services/api';
import { ToastContext, ToastContextData } from '../../hooks/toast';

const apiMock = new AxiosMock(api);

describe('Quiz', () => {
  beforeEach(() => {
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn(() => null),
        setItem: jest.fn(() => null),
      },
      writable: true,
    });
  });

  it('should be able to quiz', async () => {
    const providerProps: QuestionContextData = {
      clearCache: jest.fn(),
      correctAnswerCount: 0,
      error: false,
      finished: false,
      getNextQuestion: jest.fn(),
      loadQuestions: jest.fn(),
      loading: false,
      questions: [],
      updateQuestion: jest.fn(),
      wrongAnswerCount: 0,
      actualQuestion: undefined,
      errorMessage: undefined,
    };

    const toastProps: ToastContextData = {
      addToast: jest.fn(),
      removeToast: jest.fn(),
    };

    const quizList = [
      {
        category: 'Vehicles',
        type: 'boolean',
        difficulty: 'hard',
        question:
          'In 1993 Swedish car manufacturer Saab experimented with replacing the steering wheel with a joystick in a Saab 9000.',
        correct_answer: 'True',
        incorrect_answers: ['False'],
      },
      {
        category: 'Entertainment: Video Games',
        type: 'boolean',
        difficulty: 'hard',
        question:
          "In Undertale, having a 'Fun Value' set to 56-57 will play the 'Wrong Number Song Call'.",
        correct_answer: 'False',
        incorrect_answers: ['True'],
      },
    ];

    apiMock
      .onGet(
        'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean',
      )
      .reply(200, quizList);

    render(
      <ToastContext.Provider value={toastProps}>
        <QuestionContext.Provider value={providerProps}>
          <Quiz />
        </QuestionContext.Provider>
      </ToastContext.Provider>,
    );

    expect(screen.getByTestId('quiz-header')).toBeTruthy();
    expect(screen.findByText(quizList[0].question)).toBeTruthy();
    expect(screen.getByTestId('quiz-next-button')).toBeTruthy();
    expect(screen.getByTestId('quiz-true-button')).toBeTruthy();
    expect(screen.getByTestId('quiz-false-button')).toBeTruthy();

    act(() => {
      fireEvent.click(screen.getByTestId('quiz-next-button'));
    });

    expect(
      screen.findByText('Select on question before go next.'),
    ).toBeTruthy();

    act(() => {
      fireEvent.click(screen.getByTestId('quiz-true-button'));
    });

    expect(screen.findByText(quizList[1].question)).toBeTruthy();
  });
});
