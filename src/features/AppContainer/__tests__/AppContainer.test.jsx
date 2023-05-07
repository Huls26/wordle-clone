import {
  describe, test, expect, // beforeEach,
} from 'vitest';
import {
  render, userEvent, screen, waitFor, // within, // logRoles,
} from '@utils/test-utils';

import AppContainer from '..';

describe('AppContainer', () => {
  describe('BlockTable', () => {
    test('Check length of blocksRow, the length should be 5 for level 1 the mock value is "tests"', async () => {
      render(<AppContainer />);
      const [rowBlocksElement] = await screen.findAllByTestId('row-guess-container');
      expect(rowBlocksElement.children.length).toBe(5);
    });

    describe('userEvent BlockTable and keyboard', () => {
      test('when keyboard is click "Q" then display Q in the displayBlocks', async () => {
        const { container, getAllByRole } = render(<AppContainer />);
        const keyElement = container.querySelector('[data-skbtn="Q"]');
        await userEvent.click(keyElement);

        const [displayBlocksElement] = getAllByRole('heading', { name: /q/i });
        expect(displayBlocksElement).toBeInTheDocument();
      });

      test('when keyboard is click "Q" and "W" then display "Q" and "W" in the displayBlocks', async () => {
        const { container } = render(<AppContainer />);
        const keyElementQ = container.querySelector('[data-skbtn="Q"]');
        const keyElementW = container.querySelector('[data-skbtn="W"]');

        await userEvent.click(keyElementQ);
        await userEvent.click(keyElementW);

        // const parentElement = screen.getByTestId('row-guess-container');
        // const displayBlocksElementQ = within(parentElement).getByRole('heading', { name: /q/i });
        // const displayBlocksElementW = within(parentElement).getByRole('heading', { name: /w/i });
        // expect(displayBlocksElementQ).toBeInTheDocument();
        // expect(displayBlocksElementW).toBeInTheDocument();

        const [displayBlocksElementQ] = screen.getAllByRole('heading', { name: 'Q' });
        const [displayBlocksElementW] = screen.getAllByRole('heading', { name: 'W' });
        expect(displayBlocksElementQ).toBeInTheDocument();
        expect(displayBlocksElementW).toBeInTheDocument();
      });

      test('guess value is "WATER" the bg-color of the keyboard should match the rowBlocks', async () => {
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
          { timeout: 10000 },
        );
      });
    });

    describe('check guessRow length', () => {
      test('when enter with valid guess length too short should not display', async () => {
        const { container, queryByText } = render(<AppContainer />);
        const keyElementT = container.querySelector('[data-skbtn="T"]');
        const keyElementE = container.querySelector('[data-skbtn="E"]');
        const keyElementS = container.querySelector('[data-skbtn="S"]');
        const keyElementEnter = container.querySelector('[data-skbtn="Enter"]');

        await userEvent.click(keyElementT);
        await userEvent.click(keyElementE);
        await userEvent.click(keyElementS);
        await userEvent.click(keyElementT);

        await userEvent.click(keyElementEnter);

        const tooShortElement = queryByText('Too short');
        expect(tooShortElement).toBeInTheDocument();
      });

      test('length should be equal to the target word of the guessEntry block', async () => {
        // fix test mock values to Q
        const { container, queryByText } = render(<AppContainer />);
        const keyElementT = container.querySelector('[data-skbtn="T"]');
        const keyElementE = container.querySelector('[data-skbtn="E"]');
        const keyElementS = container.querySelector('[data-skbtn="S"]');
        // const keyElementT2 = container.querySelector('[data-skbtn="T"]');
        const keyElementEnter = container.querySelector('[data-skbtn="Enter"]');

        await userEvent.click(keyElementT);
        await userEvent.click(keyElementE);
        await userEvent.click(keyElementS);
        await userEvent.click(keyElementT);
        await userEvent.click(keyElementS);
        await userEvent.click(keyElementEnter);

        waitFor(
          () => {
            const tooShortElement = queryByText('Too short');
            expect(tooShortElement).not.toBeInTheDocument();
          },
          { timeout: 5000 },
        );
      });

      test('After 3 seconds modal "Too short" should be gone, when the length of the guess is not valid', async () => {
        const { container, findByText } = render(<AppContainer />);
        const keyElementQ = container.querySelector('[data-skbtn="Q"]');
        const keyElementEnter = container.querySelector('[data-skbtn="Enter"]');

        await userEvent.click(keyElementQ);
        await userEvent.click(keyElementEnter);

        const tooShortElement = await findByText(/too short/i);

        waitFor(
          () => {
            // const tooShortElement = queryByText(/too short/i);
            expect(tooShortElement).not.toBeInTheDocument();
          },
          { timeout: 4000 },
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
        const keyElementN = container.querySelector('[data-skbtn="N"]');
        // const keyElementF = container.querySelector('[data-skbtn="F"]');
        // const keyElementZ = container.querySelector('[data-skbtn="Z"]');

        const keyElementEnter = container.querySelector('[data-skbtn="Enter"]');

        await userEvent.click(keyElementH);
        await userEvent.click(keyElementI);
        await userEvent.click(keyElementX);
        await userEvent.click(keyElementJ);
        await userEvent.click(keyElementN);
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
        const { container } = render(<AppContainer />);
        const keyElementH = container.querySelector('[data-skbtn="H"]');
        const keyElementI = container.querySelector('[data-skbtn="I"]');
        const keyElementX = container.querySelector('[data-skbtn="X"]');
        const keyElementJ = container.querySelector('[data-skbtn="J"]');
        const keyElementZ = container.querySelector('[data-skbtn="Z"]');

        const keyElementEnter = container.querySelector('[data-skbtn="Enter"]');
        const invalidElement = screen.queryByTestId('display-warning');

        await userEvent.click(keyElementH);
        await userEvent.click(keyElementI);
        await userEvent.click(keyElementX);
        await userEvent.click(keyElementJ);
        await userEvent.click(keyElementZ);
        await userEvent.click(keyElementEnter);

        waitFor(
          () => {
            expect(invalidElement).not.toBeInTheDocument();
          },
          { timeout: 5000 },
        );
      });
    });

    describe('Enter Guessed', () => {
      test('correct guess will display correct message something like that', async () => {
        const { container, getByText } = render(<AppContainer />);
        const keyElementT = container.querySelector('[data-skbtn="T"]');
        const keyElementE = container.querySelector('[data-skbtn="E"]');
        const keyElementS = container.querySelector('[data-skbtn="S"]');
        const keyElementEnter = container.querySelector('[data-skbtn="Enter"]');
        // const correctElement = queryByText('You guessed the word keep it up!!');

        await userEvent.click(keyElementT);
        await userEvent.click(keyElementE);
        await userEvent.click(keyElementS);
        await userEvent.click(keyElementT);
        await userEvent.click(keyElementS);
        await userEvent.click(keyElementEnter);

        waitFor(() => {
          const correctElement = getByText('You guessed the word keep it up!!');
          expect(correctElement).toBeInTheDocument();
        }, { timeout: 5000 });
      });

      test('Display wrong guess', async () => {
        const { container } = render(<AppContainer />);
        const keyElementJ = container.querySelector('[data-skbtn="J"]');
        const keyElementX = container.querySelector('[data-skbtn="X"]');
        const keyElementO = container.querySelector('[data-skbtn="O"]');
        const keyElementS = container.querySelector('[data-skbtn="S"]');
        const keyElementA = container.querySelector('[data-skbtn="A"]');

        const keyElementEnter = container.querySelector('[data-skbtn="Enter"]');

        // first row
        await userEvent.click(keyElementJ);
        await userEvent.click(keyElementX);
        await userEvent.click(keyElementO);
        await userEvent.click(keyElementS);
        await userEvent.click(keyElementA);
        await userEvent.click(keyElementEnter);

        // second row
        await userEvent.click(keyElementJ);
        await userEvent.click(keyElementX);
        await userEvent.click(keyElementO);
        await userEvent.click(keyElementS);
        await userEvent.click(keyElementA);
        await userEvent.click(keyElementEnter);

        // third row
        await userEvent.click(keyElementJ);
        await userEvent.click(keyElementX);
        await userEvent.click(keyElementO);
        await userEvent.click(keyElementS);
        await userEvent.click(keyElementA);
        await userEvent.click(keyElementEnter);

        // forth row
        await userEvent.click(keyElementJ);
        await userEvent.click(keyElementX);
        await userEvent.click(keyElementO);
        await userEvent.click(keyElementS);
        await userEvent.click(keyElementA);
        await userEvent.click(keyElementEnter);

        // fifth row
        await userEvent.click(keyElementJ);
        await userEvent.click(keyElementX);
        await userEvent.click(keyElementO);
        await userEvent.click(keyElementS);
        await userEvent.click(keyElementA);
        await userEvent.click(keyElementEnter);

        // sixth row
        await userEvent.click(keyElementJ);
        await userEvent.click(keyElementX);
        await userEvent.click(keyElementO);
        await userEvent.click(keyElementS);
        await userEvent.click(keyElementA);
        await userEvent.click(keyElementEnter);
        // const gameOverElement =
        // await screen.findByText('Your guess is wrong. The word is "TESTS"');

        waitFor(() => {
          const gameOverElement = screen.getByText('Your guess is wrong. The word is "TESTS"');
          expect(gameOverElement).toBeInTheDocument();
        }, { timeout: 5000 });
      });
    });

    describe('level, correct, and wrong guess display', () => {
      test('displays stars, cross, and level', () => {
        const { container } = <AppContainer />;

        waitFor(() => {
          const correctElement = container.querySelector('#root > main > section:nth-child(2) > div:nth-child(1) > svg:nth-child(1)');

          expect(correctElement).toBeVisible();
        }, { timeout: 5000 });
      });

      test('correct guess will display correct message something like that and earn a star', async () => {
        const { container, queryByText } = render(<AppContainer />);
        const keyElementT = container.querySelector('[data-skbtn="T"]');
        const keyElementE = container.querySelector('[data-skbtn="E"]');
        const keyElementS = container.querySelector('[data-skbtn="S"]');
        const keyElementEnter = container.querySelector('[data-skbtn="Enter"]');
        const correctElement = queryByText('You guessed the word keep it up!!');
        const starElement = container.querySelector('#root > main > section:nth-child(2) > div:nth-child(1) > svg:nth-child(1)');

        await userEvent.click(keyElementT);
        await userEvent.click(keyElementE);
        await userEvent.click(keyElementS);
        await userEvent.click(keyElementT);
        await userEvent.click(keyElementS);
        await userEvent.click(keyElementEnter);

        waitFor(() => {
          // const gameOverElement = getByText('You guessed the word keep it up!!');
          expect(correctElement).toBeInTheDocument();
          expect(starElement).toHaveClass('text-green');
        }, { timeout: 5000 });
      });

      test('Display wrong guess and X mark will add', async () => {
        const { container } = render(<AppContainer />);
        const keyElementJ = container.querySelector('[data-skbtn="J"]');
        const keyElementX = container.querySelector('[data-skbtn="X"]');
        const keyElementO = container.querySelector('[data-skbtn="O"]');
        const keyElementS = container.querySelector('[data-skbtn="S"]');
        const keyElementA = container.querySelector('[data-skbtn="A"]');

        const keyElementEnter = container.querySelector('[data-skbtn="Enter"]');
        const wrongMarkElement = container.querySelector('#root > main > section:nth-child(2) > div:nth-child(3) > svg:nth-child(1)');

        // first row
        await userEvent.click(keyElementJ);
        await userEvent.click(keyElementX);
        await userEvent.click(keyElementO);
        await userEvent.click(keyElementS);
        await userEvent.click(keyElementA);
        await userEvent.click(keyElementEnter);

        // second row
        await userEvent.click(keyElementJ);
        await userEvent.click(keyElementX);
        await userEvent.click(keyElementO);
        await userEvent.click(keyElementS);
        await userEvent.click(keyElementA);
        await userEvent.click(keyElementEnter);

        // third row
        await userEvent.click(keyElementJ);
        await userEvent.click(keyElementX);
        await userEvent.click(keyElementO);
        await userEvent.click(keyElementS);
        await userEvent.click(keyElementA);
        await userEvent.click(keyElementEnter);

        // forth row
        await userEvent.click(keyElementJ);
        await userEvent.click(keyElementX);
        await userEvent.click(keyElementO);
        await userEvent.click(keyElementS);
        await userEvent.click(keyElementA);
        await userEvent.click(keyElementEnter);

        // fifth row
        await userEvent.click(keyElementJ);
        await userEvent.click(keyElementX);
        await userEvent.click(keyElementO);
        await userEvent.click(keyElementS);
        await userEvent.click(keyElementA);
        await userEvent.click(keyElementEnter);

        // sixth row
        await userEvent.click(keyElementJ);
        await userEvent.click(keyElementX);
        await userEvent.click(keyElementO);
        await userEvent.click(keyElementS);
        await userEvent.click(keyElementA);
        await userEvent.click(keyElementEnter);
        const gameOverElement = await screen.findByText('Your guess is wrong. The word is "TESTS"');

        waitFor(() => {
          // const gameOverElement = screen.getByText('Your guess is wrong. The word is "TESTS"');
          expect(gameOverElement).toBeInTheDocument();
          expect(wrongMarkElement).toHaveClass('text-red');
        }, { timeout: 5000 });
      });
    });
  });
});
