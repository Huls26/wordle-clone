import {
  describe, test, expect, // beforeEach,
} from 'vitest';
import {
  render, userEvent, screen, waitFor, // within, // logRoles,
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

        const displayBlocksElement = getByRole('heading', { name: /q/i });
        expect(displayBlocksElement).toBeInTheDocument();
      });

      test('when keyboard is click "Q" and "W" then display "Q" and "W" in the displayBlocks', async () => {
        const { container, findAllByRole } = render(<AppContainer />);
        const keyElementQ = container.querySelector('[data-skbtn="Q"]');
        const keyElementW = container.querySelector('[data-skbtn="W"]');
        await userEvent.click(keyElementQ);
        await userEvent.click(keyElementW);

        const [displayBlocksElementQ] = await findAllByRole('heading', { name: 'Q' });
        const [displayBlocksElementW] = await findAllByRole('heading', { name: 'W' });
        expect(displayBlocksElementQ).toBeInTheDocument();
        expect(displayBlocksElementW).toBeInTheDocument();
      });

      test('guess value is "WATER" the bg-color of the keyboard should much the rowBlocks', async () => {
        const { container, findAllByRole } = render(<AppContainer />);
        const keyElementW = container.querySelector('[data-skbtn="W"]');
        const keyElementA = container.querySelector('[data-skbtn="A"]');
        const keyElementT = container.querySelector('[data-skbtn="T"]');
        const keyElementE = container.querySelector('[data-skbtn="E"]');
        const keyElementR = container.querySelector('[data-skbtn="R"]');

        await userEvent.click(keyElementW);
        await userEvent.click(keyElementA);
        await userEvent.click(keyElementT);
        await userEvent.click(keyElementE);
        await userEvent.click(keyElementR);

        const [displayBlocksElementW] = await findAllByRole('heading', { name: 'W' });
        const [displayBlocksElementA] = await findAllByRole('heading', { name: 'A' });
        const [displayBlocksElementT] = await findAllByRole('heading', { name: 'T' });
        const [displayBlocksElementE] = await findAllByRole('heading', { name: 'E' });
        const [displayBlocksElementR] = await findAllByRole('heading', { name: 'R' });

        expect(displayBlocksElementW).toBeInTheDocument();
        expect(displayBlocksElementA).toBeInTheDocument();
        expect(displayBlocksElementT).toBeInTheDocument();
        expect(displayBlocksElementE).toBeInTheDocument();
        expect(displayBlocksElementR).toBeInTheDocument();

        waitFor(
          () => expect(container.querySelector('[data-skbtn="W"]')).toHaveClass('bg-gray-dark'),
          { timeout: 5000 },
        );
      });
    });

    describe('check guessRow length', () => {
      test('when enter with valid guess length too short should not display', async () => {
        const { container, queryByText } = render(<AppContainer />);
        const keyElementT = container.querySelector('[data-skbtn="T"]');
        const keyElementE = container.querySelector('[data-skbtn="E"]');
        const keyElementS = container.querySelector('[data-skbtn="S"]');
        // const keyElementT2 = container.querySelector('[data-skbtn="T"]');
        const keyElementI = container.querySelector('[data-skbtn="I"]');
        const keyElementN = container.querySelector('[data-skbtn="N"]');
        const keyElementG = container.querySelector('[data-skbtn="G"]');
        const keyElementEnter = container.querySelector('[data-skbtn="Enter"]');
        const tooShortElement = queryByText('Too short');

        await userEvent.click(keyElementT);
        await userEvent.click(keyElementE);
        await userEvent.click(keyElementS);
        await userEvent.click(keyElementT);
        await userEvent.click(keyElementI);
        await userEvent.click(keyElementN);
        await userEvent.click(keyElementG);

        await userEvent.click(keyElementEnter);

        expect(tooShortElement).not.toBeInTheDocument();
      });

      test('length should be equal to the target word of the guessEntry block', async () => {
        // fix test mock values to Q
        const { container, getByText } = render(<AppContainer />);
        const keyElementT = container.querySelector('[data-skbtn="T"]');
        const keyElementE = container.querySelector('[data-skbtn="E"]');
        const keyElementS = container.querySelector('[data-skbtn="S"]');
        // const keyElementT2 = container.querySelector('[data-skbtn="T"]');
        const keyElementI = container.querySelector('[data-skbtn="I"]');
        const keyElementN = container.querySelector('[data-skbtn="N"]');
        const keyElementEnter = container.querySelector('[data-skbtn="Enter"]');

        await userEvent.click(keyElementT);
        await userEvent.click(keyElementE);
        await userEvent.click(keyElementS);
        await userEvent.click(keyElementT);
        await userEvent.click(keyElementI);
        await userEvent.click(keyElementN);
        await userEvent.click(keyElementEnter);

        const tooShortElement = getByText('Too short');

        expect(tooShortElement).toBeInTheDocument();
      });

      test('After 5 seconds modal "Too short" should be gone, when the length of the guess is not valid', async () => {
        const { container, getByText } = render(<AppContainer />);
        // fix test mock values to Q
        const keyElementQ = container.querySelector('[data-skbtn="Q"]');
        const keyElementEnter = container.querySelector('[data-skbtn="Enter"]');

        await userEvent.click(keyElementQ);
        await userEvent.click(keyElementEnter);
        const tooShortElement = getByText(/too short/i);

        waitFor(
          () => expect(tooShortElement).not.toBeInTheDocument(),
          { timeout: 5000 },
        );
      });
    });
  });
});
