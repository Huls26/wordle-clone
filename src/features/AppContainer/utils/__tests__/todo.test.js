import {
  describe, test, expect, // beforeEach,
} from 'vitest';

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

describe('fectDictionaryThenRun.js', () => {
  test('this should accept the answer: should be truthy', async () => {
    fetchDictionaryThenRun('SEVEN', () => 'run something', () => 'ERROR HANDLING', ['tests', 'seven']).then((isvalid) => expect(isvalid).toBeTruthy());
  });

  test('this should accept the answer: should be falsy', async () => {
    fetchDictionaryThenRun('SEVEN', () => 'run something', () => 'ERROR HANDLING', ['tests', 'first']).then((isvalid) => expect(isvalid).toBeFalsy());
  });
});
