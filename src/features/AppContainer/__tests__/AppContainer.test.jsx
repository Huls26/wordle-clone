import {
  describe, test, expect, // beforeEach,
} from 'vitest';
import {
  render, userEvent, screen, // within, // logRoles,
} from '@utils/test-utils';

import AppContainer from '..';

describe('AppContainer', () => {
  describe('BlockTable', () => {
    test('Check length of blocksRow, the length should be 7 the mock value is "Testing"', async () => {
      render(<AppContainer />);
      const [rowBlocksElement] = await screen.findAllByTestId('row-guess-container');
      expect(rowBlocksElement.children.length).toBe(7);
    });

    describe('userEvent BlockTable and keyboard', () => {
      test('when keyboard is click "Q" then display Q in the displayBlocks', async () => {
        const { container, getByRole } = render(<AppContainer />);
        const keyElement = container.querySelector('[data-skbtn="Q"]');
        await userEvent.click(keyElement);

        const displayBlocksElement = getByRole('heading', { name: 'Q' });
        expect(displayBlocksElement).toBeInTheDocument();
      });

      test('when keyboard is click "Q" and "W" then display "Q" and "W" in the displayBlocks', async () => {
        const { container, getAllByRole } = render(<AppContainer />);
        const keyElementQ = container.querySelector('[data-skbtn="Q"]');
        const keyElementW = container.querySelector('[data-skbtn="W"]');
        await userEvent.click(keyElementQ);
        await userEvent.click(keyElementW);

        const [displayBlocksElementQ] = getAllByRole('heading', { name: 'Q' });
        const [displayBlocksElementW] = getAllByRole('heading', { name: 'W' });
        expect(displayBlocksElementQ).toBeInTheDocument();
        expect(displayBlocksElementW).toBeInTheDocument();
      });

      test('when keyboard', async () => {
        const { container, getAllByRole } = render(<AppContainer />);
        const keyElementQ = container.querySelector('[data-skbtn="Q"]');
        const keyElementW = container.querySelector('[data-skbtn="W"]');
        await userEvent.click(keyElementQ);
        await userEvent.click(keyElementW);

        const [displayBlocksElementQ] = getAllByRole('heading', { name: 'Q' });
        const [displayBlocksElementW] = getAllByRole('heading', { name: 'W' });
        expect(displayBlocksElementQ).toBeInTheDocument();
        expect(displayBlocksElementW).toBeInTheDocument();
      });
    });
  });
});
