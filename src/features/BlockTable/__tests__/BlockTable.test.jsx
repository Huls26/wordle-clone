import {
  describe, test, expect, beforeEach,
} from 'vitest';
import {
  render, screen, within, // logRoles,
} from '@utils/test-utils';
import createBlockTable from '@features/AppContainer/utils/createBlockTable';
import BlockTable from '..';

describe('BlockTable', () => {
  describe('display row Block', () => {
    beforeEach(() => {
      const len = 'water'.length;
      const array = createBlockTable(len);
      render(<BlockTable blocksTable={array} />);
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

    test('rowBlock component should always be 6', async () => {
      const rowContainer = await screen.findAllByTestId('row-guess-container');
      expect(rowContainer.length).toBe(6);
    });
  });
});
