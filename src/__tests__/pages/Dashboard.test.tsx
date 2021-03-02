import React from 'react';
import { LocalStorageMock } from '@react-mock/localstorage';
import { render, act, fireEvent, screen } from '@testing-library/react';
import AxiosMock from 'axios-mock-adapter';
import api from '../../services/api';
import App from '../../App';

const apiMock = new AxiosMock(api);

describe('Dashboard', () => {
  beforeEach(() => {
    apiMock.reset();
  });

  afterAll(() => {
    apiMock.restore();
  });

  it('should be able to go to the quiz page', async () => {
    const { getByTestId } = render(
      <LocalStorageMock>
        <App />
      </LocalStorageMock>,
    );

    expect(getByTestId('start-quiz')).toBeTruthy();

    apiMock
      .onGet(
        'https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean',
      )
      .reply(200, {
        results: [
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
        ],
      });

    await act(async () => {
      const leftClick = { button: 0 };
      fireEvent.click(getByTestId('start-quiz', leftClick));
    });

    expect(global.window.location.pathname).toEqual('/quiz');
    expect(screen.getByTestId('quiz-header-main')).toBeTruthy();
  });
});
