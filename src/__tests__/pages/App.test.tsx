import React from 'react';
import { LocalStorageMock } from '@react-mock/localstorage';
import { act, render, screen, fireEvent } from '@testing-library/react';
import AxiosMock from 'axios-mock-adapter';
import api from '../../services/api';

import App from '../../App';

const apiMock = new AxiosMock(api);

describe('Quiz', () => {
  beforeEach(() => {
    apiMock.reset();
  });

  afterAll(() => {
    apiMock.restore();
  });

  it('should be able run all path quiz', async () => {
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
    apiMock.onGet('api.php?amount=10&difficulty=hard&type=boolean').reply(200, {
      results: quizList,
    });

    render(
      <LocalStorageMock>
        <App />
      </LocalStorageMock>,
    );

    expect(screen.getByTestId('start-quiz')).toBeTruthy();

    await act(async () => {
      const leftClick = { button: 0 };
      fireEvent.click(screen.getByTestId('start-quiz', leftClick));
    });

    expect(screen.getByTestId('quiz-header-main')).toBeTruthy();

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

    act(() => {
      fireEvent.click(screen.getByTestId('quiz-next-button'));
    });

    expect(screen.findByText(quizList[1].question)).toBeTruthy();

    act(() => {
      fireEvent.click(screen.getByTestId('quiz-true-button'));
    });

    act(() => {
      fireEvent.click(screen.getByTestId('quiz-next-button'));
    });

    expect(screen.getByTestId('finish-main-container')).toBeTruthy();
    expect(screen.getByTestId('finish-answered').textContent).toBe(`1 of 2`);

    expect(screen.findByText('PLAY AGAIN?')).toBeTruthy();
  });
});
