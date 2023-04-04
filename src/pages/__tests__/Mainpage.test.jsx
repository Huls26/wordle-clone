import {
  describe, test, expect, beforeEach, // vi,
} from 'vitest';
import {
  render, screen, // waitFor, // logRoles,
} from '@utils/test-utils';

import server from '@mocks/server';
import { rest } from 'msw';

import Mainpage from '../Mainpage';

describe('mainPage', () => {
  describe('Mainpage fetch data', () => {
    beforeEach(async () => {
      render(<Mainpage />);
    });

    test('Display some value', async () => {
      const displayElement = await screen.findByTestId('output-data');
      // logRoles(outputElement);
      expect(displayElement.textContent.length).toBeGreaterThan(1);
    });

    test('waitfor display data', async () => {
      // expect(await screen.findByTestId('output-data')).toBeInTheDocument();
      expect(await screen.findByTestId('output-data')).toBeInTheDocument();
    });

    test('use wait for to sync', async () => {
      // await waitFor(() => screen.getByTestId('output-data'));
      expect(await screen.findByTestId('output-data')).toBeInTheDocument();
    });

    test('return value string', async () => {
      const displayElement = await screen.findByTestId('output-data');
      expect(typeof displayElement.textContent).toBe('string');
    });
  });

  describe('fetch data', () => {
    beforeEach(() => {
      render(<Mainpage />);
    });

    test('Return mock value', async () => {
      const displayElement = await screen.findByTestId('output-data');
      screen.debug(displayElement);
      expect(typeof displayElement.textContent).toBe('string');
    });

    test('return Value "Testing"', async () => {
      const displayElement = await screen.findByTestId('output-data');
      expect(displayElement).toHaveTextContent('Testing');
    });

    test('return length value should be greater than 5', async () => {
      const displayElement = await screen.findByTestId('output-data');
      expect(displayElement.textContent.length).toBeGreaterThanOrEqual(5);
    });
  });
});

describe('Set new mock value', () => {
  // skip this test because it will call forever
  // write a better test
  describe.skip('rerender/fetch again', () => {
    test('when length value in less than 5 fetch new data', async () => {
      server.use(
        rest.get(
          'https://random-word-api.herokuapp.com/word',
          (req, res, ctx) => res(ctx.json(['123'])),
        ),
      );
      render(<Mainpage />);
      const displayElement = await screen.findByTestId('output-data');
      expect(displayElement.textContent.length).toBeLessThan(5);
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
});
