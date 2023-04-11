import {
  describe, test, expect,
} from 'vitest';
import {
  render, screen, within, // logRoles,
} from '@utils/test-utils';

import RowContainer from '..';
import GuessBlock from '../../GuessBlock';

describe('RowContainer', () => {
  describe('Render RowContainer', () => {
    test('Row container should display guessblocks', async () => {
      const rowBlocks = [
        <GuessBlock color="bg-green" guessLetter="W" key={1} />,
        <GuessBlock color="bg-green" guessLetter="i" key={2} />,
        <GuessBlock color="bg-green" guessLetter="n" key={3} />,
      ];
      render(<RowContainer rowBlock={rowBlocks} />);
      const rowContainerElement = await screen.findByTestId('row-guess-container');
      const childElement = within(rowContainerElement).getAllByTestId('guess-container');
      expect(childElement.length).toBe(3);
    });
  });
});
