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

    test('display row Block', () => {
      const rowContainer = screen.getByTestId('row-guess-container');
      expect(rowContainer).toBeInTheDocument();
    });

    test('check if row block has child element of guess block', () => {
      const rowContainer = screen.getByTestId('row-guess-container');
      const [guessElement] = screen.getAllByTestId('guess-container');
      expect(rowContainer).toContainElement(guessElement);
    });

    test('guess-container should 5 when the targetWord is "water"', () => {
      const rowContainer = screen.getByTestId('row-guess-container');
      const guessElements = within(rowContainer).getAllByTestId('guess-container');
      expect(guessElements.length).toBe(5);
    });
  });
});
