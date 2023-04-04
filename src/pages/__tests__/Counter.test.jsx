import {
  describe, test, expect, beforeEach,
} from 'vitest';
import {
  render, screen, userEvent, // logRoles,
} from '@utils/test-utils';
import Counter from '../Counter';

describe.skip('counter', () => {
  describe('counter display', () => {
    beforeEach(() => {
      render(<Counter />);
    });

    test('first render counter should be "Counter 0"', () => {
      const counterElement = screen.getByRole('heading', { name: /counter 0/i });
      expect(counterElement).toBeInTheDocument();
    });

    test('button increment display', () => {
      expect(screen.getByRole('button', { name: '+' })).toBeInTheDocument();
    });

    test('The value of heading should be "Counter 1" when increment button is click', async () => {
      const incrementBtn = screen.getByRole('button', { name: '+' });
      const counterElement = screen.getByRole('heading', { name: /counter 0/i });

      await userEvent.click(incrementBtn);

      expect(counterElement).toHaveTextContent('Counter 1');
    });

    test('decrement btn when click the counter will be "counter -1"', async () => {
      const decrementBtn = screen.getByRole('button', { name: '-' });
      const counterElement = screen.getByRole('heading', { name: /counter 0/i });

      await userEvent.click(decrementBtn);

      expect(counterElement).toHaveTextContent('Counter -1');
    });

    test('counter value is 2 when increment btn is click double', async () => {
      const incrementBtn = screen.getByRole('button', { name: '+' });
      const counterElement = screen.getByRole('heading', { name: /counter 0/i });

      await userEvent.dblClick(incrementBtn);

      expect(counterElement).toHaveTextContent(/counter 2/i);
    });
  });

  describe('input counter', () => {
    beforeEach(() => {
      render(<Counter />);
    });

    test('input text', () => {
      const inputElement = screen.getByPlaceholderText('Set number');
      expect(inputElement).toBeInTheDocument();
    });

    test('when first render "counter 0" input value should be null', () => {
      const inputElement = screen.getByPlaceholderText('Set number');
      // logRoles(inputElement);
      expect(inputElement.value).toHaveLength(0);
      expect(inputElement.value).toBeFalsy();
    });

    test('input set value', async () => {
      const inputElement = screen.getByPlaceholderText('Set number');
      const counterElement = screen.getByRole('heading', { name: /counter 0/i });

      await userEvent.type(inputElement, '12');

      // logRoles(inputElement);
      // screen.debug(counterElement);
      expect(inputElement).toHaveValue(12);
      expect(counterElement.textContent).toBe('Counter 12');
    });

    test('when the value is set to 10 and click increment button the counter text content is "Counter 11"', async () => {
      const inputElement = screen.getByPlaceholderText('Set number');
      const counterElement = screen.getByRole('heading', { name: /counter 0/i });
      const incrementBtn = screen.getByRole('button', { name: '+' });

      await userEvent.type(inputElement, '10');
      await userEvent.click(incrementBtn);

      screen.debug(inputElement);
      expect(counterElement.textContent).toBe('Counter 11');
    });

    test('when input type "123{backspace}{backspace}{backspace}" the counter textcontent should be "Counter 0"', async () => {
      const inputElement = screen.getByPlaceholderText('Set number');
      const counterElement = screen.getByRole('heading', { name: /counter 0/i });

      await userEvent.type(inputElement, '123{backspace}{backspace}{backspace}');

      expect(counterElement.textContent).toBe('Counter 0');
    });

    test('Maximun value to set is 100', async () => {
      const inputElement = screen.getByPlaceholderText('Set number');
      const counterElement = screen.getByRole('heading', { name: /counter 0/i });
      const incrementBtn = screen.getByRole('button', { name: '+' });

      await userEvent.type(inputElement, '101');
      expect(counterElement.textContent).toBe('Counter 100');

      await userEvent.click(incrementBtn);
      expect(counterElement.textContent).toBe('Counter 100');
    });

    test('Minimum value -100', async () => {
      const inputElement = screen.getByPlaceholderText('Set number');
      const counterElement = screen.getByRole('heading', { name: /counter 0/i });
      const decrementBtn = screen.getByRole('button', { name: '-' });

      await userEvent.type(inputElement, '-101');
      expect(counterElement.textContent).toBe('Counter -100');

      await userEvent.click(decrementBtn);
      expect(counterElement.textContent).toBe('Counter -100');
    });
  });

  describe('incrementor', () => {
    beforeEach(() => {
      render(<Counter />);
    });

    test('display input for incrementor', () => {
      expect(screen.getByPlaceholderText('Enter Incrementor')).toBeInTheDocument();
    });

    test('incrementor is set to "5" when increment is click display counter is "Counter 5"', async () => {
      const incrementorElement = screen.getByPlaceholderText('Enter Incrementor');
      const counterElement = screen.getByRole('heading', { name: /counter 0/i });
      const incrementBtn = screen.getByRole('button', { name: '+' });

      await userEvent.type(incrementorElement, '5');
      await userEvent.click(incrementBtn);

      expect(counterElement.textContent).toBe('Counter 5');
    });

    test('input number is set to "55" and incrementor is set to 10 then click decrement btn counter "Counter 45"', async () => {
      const inputElement = screen.getByPlaceholderText('Set number');
      const incrementorElement = screen.getByPlaceholderText('Enter Incrementor');
      const counterElement = screen.getByRole('heading', { name: /counter 0/i });
      const decrementBtn = screen.getByRole('button', { name: '-' });

      await userEvent.type(inputElement, '55');
      await userEvent.type(incrementorElement, '10');
      await userEvent.click(decrementBtn);

      expect(counterElement).toHaveTextContent('45');
    });

    test('Counter should not greater than 100', async () => {
      const inputElement = screen.getByPlaceholderText('Set number');
      const incrementorElement = screen.getByPlaceholderText('Enter Incrementor');
      const counterElement = screen.getByRole('heading', { name: /counter 0/i });
      const incrementBtn = screen.getByRole('button', { name: '+' });

      await userEvent.type(inputElement, '96');
      await userEvent.type(incrementorElement, '10');
      await userEvent.click(incrementBtn);

      expect(counterElement.textContent).toBe('Counter 100');
    });

    test('incrementor when set a value "123{backspace}{backspace}{backspace}" counter display should be 0 when click increment btn', async () => {
      const incrementorElement = screen.getByPlaceholderText('Enter Incrementor');
      const counterElement = screen.getByRole('heading', { name: /counter 0/i });
      const incrementBtn = screen.getByRole('button', { name: '+' });

      await userEvent.type(incrementorElement, '123{backspace}{backspace}{backspace}');
      await userEvent.click(incrementBtn);

      expect(counterElement.textContent).toBe('Counter 1');
    });
  });
});

// create fetch random user
// https://randomuser.me/api/?results=5000
// setTimeout => 500ms when mock data
