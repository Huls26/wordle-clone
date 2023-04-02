import {
  describe, test, expect, beforeEach, // vi,
} from 'vitest';
import {
  render, screen, waitFor, // logRoles,
} from '@utils/test-utils';

import server from '@mocks/server';
import { rest } from 'msw';

import Mainpage from '../Mainpage';

describe('mainPage', () => {
  describe('Mainpage fetch data', () => {
    beforeEach(async () => {
      render(<Mainpage />);
      await waitFor(() => screen.getByTestId('output-data'), { timeout: 3000 });
    });

    test('Display some value', () => {
      const outputElement = screen.getByTestId('output-data');
      // logRoles(outputElement);
      expect(outputElement.textContent.length).toBeGreaterThan(1);
    });

    test('waitfor display data', () => {
      // expect(await screen.findByTestId('output-data')).toBeInTheDocument();
      expect(screen.getByTestId('output-data')).toBeInTheDocument();
    });

    test('use wait for to sync', async () => {
      // await waitFor(() => screen.getByTestId('output-data'));
      expect(screen.getByTestId('output-data')).toBeInTheDocument();
    });

    test('return value string', () => {
      const displayElement = screen.getByTestId('output-data');
      expect(typeof displayElement.textContent).toBe('string');
    });

    describe('fetch data', () => {
      test('Return mock value', () => {
        const displayElement = screen.getByTestId('output-data');
        expect(typeof displayElement.textContent).toBe('string');
      });

      test('return Value "Testing"', () => {
        const displayElement = screen.getByTestId('output-data');
        expect(displayElement).toHaveTextContent('Testing');
      });
    });
  });
});

describe('error handling', async () => {
  test('Handle error return value "Something went wrong"', async () => {
    server.use(
      rest.get(
        'https://random-word-api.herokuapp.com/word',
        (req, res, ctx) => res(ctx.status(500)),
      ),
    );
    render(<Mainpage />);
    const displayElement = await screen.findByTestId('output-data');
    // console.log(screen.debug(displayElement));
    expect(displayElement).toHaveTextContent('Something went wrong');
  });
});
