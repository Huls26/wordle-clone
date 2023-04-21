import {
  describe, test, expect, // beforeEach,
} from 'vitest';
import { rest } from 'msw';
import server from '@mocks/server';

import collectLetterBg from '../collectLetterBg';
import fetchDictionaryThenRun from '../fetchDictionaryThenRun';

describe('test collectLetterBg func', () => {
  test('set blocks letter and background color', () => {
    const data = [
      { letter: 'W', color: 'bg-gray-dark' },
      { letter: 'E', color: 'bg-green' },
      { letter: 'R', color: 'bg-yellow' },
      { letter: 'A', color: 'bg-green' },
      { letter: 'T', color: 'bg-gray-dark' },
      { letter: 'Y', color: 'bg-gray-dark' },
      { letter: 'Y', color: 'bg-green' },
      { letter: 'U', color: 'bg-yellow' },
      { letter: 'U', color: 'bg-green' },
    ];
    const output = collectLetterBg(data);
    expect(output).toStrictEqual({ bgGrayDark: 'W T Y', bgGreen: 'E A', bgYellow: 'R U' });
  });

  test('set blocks letter and background color without bg-green output', () => {
    const data = [
      { letter: 'W', color: 'bg-gray-dark' },
      { letter: 'W', color: 'bg-green' },
      { letter: 'R', color: 'bg-yellow' },
      { letter: 'R', color: 'bg-green' },
      { letter: 'T', color: 'bg-gray-dark' },
      { letter: 'Y', color: 'bg-gray-dark' },
    ];
    const output = collectLetterBg(data);
    expect(output).toStrictEqual({ bgGrayDark: 'W T Y', bgGreen: 'none', bgYellow: 'R' });
  });

  test('Multiple same input output should be only single letter', () => {
    const data = [
      { letter: 'W', color: 'bg-gray-dark' },
      { letter: 'W', color: 'bg-green' },
      { letter: 'W', color: 'bg-yellow' },
      { letter: 'W', color: 'bg-green' },
    ];
    const output = collectLetterBg(data);
    expect(output).toStrictEqual({ bgGrayDark: 'W', bgGreen: 'none', bgYellow: 'W' });
  });
});

describe.skip('fectDictionaryThenRun.js', () => {
  test('error handling', async () => {
    const fetchWord = 'https://api.dictionaryapi.dev/api/v2/entries/en/toBeError';
    server.use(
      rest.get(
        fetchWord,
        (req, res, ctx) => res(ctx.status(500)),
      ),
    );

    const fetchDic = await fetchDictionaryThenRun('toBeError');
    expect(fetchDic).toThrowError();
  });
});
