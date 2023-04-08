import {
  describe, test, expect,
} from 'vitest';
import {
  render, screen, // logRoles,
} from '@utils/test-utils';
import GuessBlock from '..';

describe('GuessBlock', () => {
  describe('display block', () => {
    test('display "W" when guess letter is "W"', () => {
      render(<GuessBlock color="" guessLetter="w" />);
      const guessElement = screen.getByRole('heading', { Name: 'w' });
      expect(guessElement).toBeInTheDocument();
      expect(guessElement.textContent).toBe('w');
    });

    test('classname should be equal to bg-yellow', () => {
      render(<GuessBlock color="bg-yellow" guessLetter="w" />);
      const guessElement = screen.getByTestId('guess-container');
      expect(guessElement).toHaveClass('bg-yellow');
    });

    test('when guessLetter length is greater than 1 return nothing', () => {
      render(<GuessBlock color="bg-yellow" guessLetter="wa" />);
      const guessElement = screen.getByRole('heading', { Name: 'wa' });
      expect(guessElement.textContent).toBe('');
    });
  });
});
