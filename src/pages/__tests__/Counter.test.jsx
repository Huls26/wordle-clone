import {
  describe, test, expect,
} from 'vitest';
import {
  render, screen, userEvent,
} from '@utils/test-utils';
import Counter from '../Counter';

describe('counter', () => {
  describe('counter display', () => {
    test('first render counter should be "Counter 0"', () => {
      render(<Counter />);
      const counterElement = screen.getByRole('heading', { name: /counter 0/i });
      expect(counterElement).toBeInTheDocument();
    });

    test('button increment display', () => {
      render(<Counter />);
      expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
    });

    test('The value of heading should be "Counter 1" when increment button is click', async () => {
      render(<Counter />);
      const incrementBtn = screen.getByRole('button', { name: '+' });
      const counterElement = screen.getByRole('heading', { name: /counter 0/i });

      await userEvent.click(incrementBtn);

      expect(counterElement).toHaveTextContent('Counter 1');
    });

    test('decrement btn when click the counter will be "counter -1"', async () => {
      render(<Counter />);

      const decrementBtn = screen.getByRole('button', { name: '-' });
      const counterElement = screen.getByRole('heading', { name: /counter 0/i });

      await userEvent.click(decrementBtn);

      expect(counterElement).toHaveTextContent('Counter -1');
    });

    test('counter value is 2 when increment btn is click double', async () => {
      render(<Counter />);
      const incrementBtn = screen.getByRole('button', { name: '+' });
      const counterElement = screen.getByRole('heading', { name: /counter 0/i });

      await userEvent.dblClick(incrementBtn);

      expect(counterElement).toHaveTextContent(/counter 2/i);
    });
  });

  describe('input counter', () => {
    test('input text', () => {
      render(<Counter />);
      const inputElement = screen.getByPlaceholderText('Set number');
      expect(inputElement).toBeInTheDocument();
    });

    test('when first render "counter 0" input value should be null', () => {
      render(<Counter />);
      const inputElement = screen.getByPlaceholderText('Set number');
      // logRoles(inputElement);
      expect(inputElement.value).toHaveLength(0);
      expect(inputElement.value).toBeFalsy();
    });

    test.skip('input set value', async () => {
      render(<Counter />);
      const inputElement = screen.getByPlaceholderText('Set number');
      const counterElement = screen.getByRole('heading', { name: /counter 0/i });

      await userEvent.type(inputElement, '1');

      expect(counterElement).toHaveTextContent('1');
    });
  });
});
