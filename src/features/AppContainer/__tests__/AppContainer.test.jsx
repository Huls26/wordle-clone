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

    describe('invalid word enter', () => {
      test('display "Invalid word" when enter random and gibberish word', async () => {
        const { container, getByText } = render(<AppContainer />);
        const keyElementH = container.querySelector('[data-skbtn="H"]');
        const keyElementI = container.querySelector('[data-skbtn="I"]');
        const keyElementX = container.querySelector('[data-skbtn="X"]');
        const keyElementJ = container.querySelector('[data-skbtn="J"]');
        const keyElementO = container.querySelector('[data-skbtn="O"]');
        const keyElementF = container.querySelector('[data-skbtn="F"]');
        const keyElementZ = container.querySelector('[data-skbtn="Z"]');

        const keyElementEnter = container.querySelector('[data-skbtn="Enter"]');

        await userEvent.click(keyElementH);
        await userEvent.click(keyElementI);
        await userEvent.click(keyElementX);
        await userEvent.click(keyElementJ);
        await userEvent.click(keyElementO);
        await userEvent.click(keyElementF);
        await userEvent.click(keyElementZ);
        await userEvent.click(keyElementEnter);

        waitFor(
          () => {
            const invalidElement = getByText('Invalid word');
            expect(invalidElement).toBeInTheDocument();
          },
          { timeout: 5000 },
        );
      });

      test('after 5 seconds "Invalid word" remove', async () => {
        const { container, getByText } = render(<AppContainer />);
        const keyElementH = container.querySelector('[data-skbtn="H"]');
        const keyElementI = container.querySelector('[data-skbtn="I"]');
        const keyElementX = container.querySelector('[data-skbtn="X"]');
        const keyElementJ = container.querySelector('[data-skbtn="J"]');
        const keyElementO = container.querySelector('[data-skbtn="O"]');
        const keyElementF = container.querySelector('[data-skbtn="F"]');
        const keyElementZ = container.querySelector('[data-skbtn="Z"]');

        const keyElementEnter = container.querySelector('[data-skbtn="Enter"]');

        await userEvent.click(keyElementH);
        await userEvent.click(keyElementI);
        await userEvent.click(keyElementX);
        await userEvent.click(keyElementJ);
        await userEvent.click(keyElementO);
        await userEvent.click(keyElementF);
        await userEvent.click(keyElementZ);
        await userEvent.click(keyElementEnter);

        waitFor(
          () => {
            const invalidElement = getByText(/invalid word/i);
            expect(invalidElement).not.toBeInTheDocument();
          },
          { timeout: 5000 },
        );
      });
    });

    describe('GameOver', () => {
      test('when you guess the word "Congratulation and play again should display"', async () => {
        const { container, getByRole } = render(<AppContainer />);
        const keyElementT = container.querySelector('[data-skbtn="T"]');
        const keyElementE = container.querySelector('[data-skbtn="E"]');
        const keyElementS = container.querySelector('[data-skbtn="S"]');
        const keyElementI = container.querySelector('[data-skbtn="I"]');
        const keyElementN = container.querySelector('[data-skbtn="N"]');
        const keyElementG = container.querySelector('[data-skbtn="G"]');
        const keyElementEnter = container.querySelector('[data-skbtn="Enter"]');

        await userEvent.click(keyElementT);
        await userEvent.click(keyElementE);
        await userEvent.click(keyElementS);
        await userEvent.click(keyElementT);
        await userEvent.click(keyElementI);
        await userEvent.click(keyElementN);
        await userEvent.click(keyElementG);
        await userEvent.click(keyElementEnter);

        waitFor(() => {
          const gameOverElement = getByRole('article');
          expect(gameOverElement).toBeInTheDocument();
        }, { timeout: 5000 });
      });

      test.skip('Display Game Over', async () => {
        const { container, getByRole } = render(<AppContainer />);
        const keyElementJ = container.querySelector('[data-skbtn="J"]');
        const keyElementX = container.querySelector('[data-skbtn="X"]');
        const keyElementO = container.querySelector('[data-skbtn="O"]');
        const keyElementS = container.querySelector('[data-skbtn="S"]');
        const keyElementA = container.querySelector('[data-skbtn="A"]');
        const keyElementK = container.querySelector('[data-skbtn="K"]');
        const keyElementN = container.querySelector('[data-skbtn="N"]');

        const keyElementEnter = container.querySelector('[data-skbtn="Enter"]');

        // first row
        await userEvent.click(keyElementJ);
        await userEvent.click(keyElementX);
        await userEvent.click(keyElementO);
        await userEvent.click(keyElementS);
        await userEvent.click(keyElementA);
        await userEvent.click(keyElementK);
        await userEvent.click(keyElementN);
        await userEvent.click(keyElementEnter);

        // second row
        await userEvent.click(keyElementJ);
        await userEvent.click(keyElementX);
        await userEvent.click(keyElementO);
        await userEvent.click(keyElementS);
        await userEvent.click(keyElementA);
        await userEvent.click(keyElementK);
        await userEvent.click(keyElementN);
        await userEvent.click(keyElementEnter);

        // third row
        await userEvent.click(keyElementJ);
        await userEvent.click(keyElementX);
        await userEvent.click(keyElementO);
        await userEvent.click(keyElementS);
        await userEvent.click(keyElementA);
        await userEvent.click(keyElementK);
        await userEvent.click(keyElementN);
        await userEvent.click(keyElementEnter);

        // forth row
        await userEvent.click(keyElementJ);
        await userEvent.click(keyElementX);
        await userEvent.click(keyElementO);
        await userEvent.click(keyElementS);
        await userEvent.click(keyElementA);
        await userEvent.click(keyElementK);
        await userEvent.click(keyElementN);
        await userEvent.click(keyElementEnter);

        // fifth row
        await userEvent.click(keyElementJ);
        await userEvent.click(keyElementX);
        await userEvent.click(keyElementO);
        await userEvent.click(keyElementS);
        await userEvent.click(keyElementA);
        await userEvent.click(keyElementK);
        await userEvent.click(keyElementN);
        await userEvent.click(keyElementEnter);

        // sixth row
        await userEvent.click(keyElementJ);
        await userEvent.click(keyElementX);
        await userEvent.click(keyElementO);
        await userEvent.click(keyElementS);
        await userEvent.click(keyElementA);
        await userEvent.click(keyElementK);
        await userEvent.click(keyElementN);
        await userEvent.click(keyElementEnter);

        waitFor(() => {
          const gameOverElement = getByRole('heading', { name: /game over the word is testing/i });
          expect(gameOverElement).toBeInTheDocument();
        }, { timeout: 5000 });
      });
    });
  });
});
