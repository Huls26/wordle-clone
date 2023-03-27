import {
  describe, test, expect, beforeEach, // vi,
} from 'vitest';
import {
  render, screen, waitFor, logRoles,
} from '@utils/test-utils';
import Mainpage from '../Mainpage';

describe('mainPage', () => {
  describe.only('Mainpage fetch data', () => {
    beforeEach(async () => {
      render(<Mainpage />);
      await waitFor(() => screen.getByTestId('output-data'), { timeout: 3000 });
    });

    test('Display some value', () => {
      const outputElement = screen.getByTestId('output-data');
      logRoles(outputElement);
      expect(outputElement.textContent.length).toBeGreaterThan(1);
    });

    test('waitfor display data', () => {
      // expect(await screen.findByTestId('output-data')).toBeInTheDocument();
      expect(screen.getByTestId('output-data')).toBeInTheDocument();
    });

    test('use wait for to sync', async () => {
      await waitFor(() => screen.getByTestId('output-data'));
      expect(screen.getByTestId('output-data')).toBeInTheDocument();
    });
  });
});
