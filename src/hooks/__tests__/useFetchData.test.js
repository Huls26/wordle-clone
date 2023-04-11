import {
  describe, test, expect, // beforeEach, vi,
} from 'vitest';
import {
  renderHook, act,
} from '@utils/test-utils';
import useFetchData from '../useFetchData';

describe('useFetchData', () => {
  describe('fetch data', () => {
    test('first render expect to be null', () => {
      const { result } = renderHook(() => useFetchData());
      expect(result.current).toBe('');
    });

    test.skip('return value', async () => {
      const { result, rerender } = renderHook(() => useFetchData());
      act(async () => {
        console.log(result.current);
        await rerender();
      });

      expect(typeof result.current).toBe('string');
    });
  });
});
