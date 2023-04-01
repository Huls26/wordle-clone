import {
  describe, test, vi, expect, //  beforeEach,
} from 'vitest';
// import {
//   render, screen, waitFor, logRoles,
// } from '@utils/test-utils';
import getRandomWord from '../getRandomWord';

describe('getRandomWord', () => {
  describe('fetch', () => {
    test.skip('called one time', () => {
      const fetch = {
        json: () => 'Testing',
      };
      const spy = vi.spyOn(fetch, 'json');
      getRandomWord();
      // expect(spy).toHaveBeenCalled(1);
      expect(spy).toHaveReturnedWith('Testing');
    });
  });
});
