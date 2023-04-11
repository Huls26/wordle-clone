import {
  describe, test, expect, beforeEach,
} from 'vitest';
import {
  render, screen, within, // logRoles,
} from '@utils/test-utils';
import BlockTable from '..';

describe('BlockTable', () => {
  describe('display row Block', () => {
    beforeEach(() => {
      render(<BlockTable guessWord="water" targetWord="water" />);
    });

    test('display row Block', async () => {
      const [rowContainer] = await screen.findAllByTestId('row-guess-container');
      expect(rowContainer).toBeInTheDocument();
    });

    test('check if row block has child element of guess block', async () => {
      const [rowContainer] = await screen.findAllByTestId('row-guess-container');
      const [guessElement] = within(rowContainer).getAllByTestId('guess-container');
      expect(rowContainer).toContainElement(guessElement);
    });

    test('guess-container should 5 when the targetWord is "water"', async () => {
      const [rowContainer] = await screen.findAllByTestId('row-guess-container');
      const guessElement = within(rowContainer).getAllByTestId('guess-container');
      expect(guessElement.length).toBe(5);
    });
  });
});
