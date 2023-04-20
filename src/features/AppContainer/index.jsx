import { useEffect, useState } from 'react';
import useFetchData from '@hooks/useFetchData';
// mport useDictionaryThenRun from '@hooks/useDictionaryThenRun';

import BlockTable from '@features/BlockTable';
import KeyBoard from '@features/Keyboard';
import TitleBar from '@features/TitleBar';

import createBlockTable from './utils/createBlockTable';
import checkGuessWord from './utils/checkGuessWord';
import enterGuess from './utils/enterGuess';
import enterBlockLetter from './utils/enterBlockLetter';
import deleteGuess from './utils/deleteGuess';
import keySetIdentifier from './utils/keySetIdentifier';

export default function AppContainer() {
  const data = useFetchData();
  const len = data.length;
  const defaultKeyboardBg = { bgGrayDark: 'none', bgGreen: 'none', bgYellow: 'none' };
  const [blocksTable, setBlocksTable] = useState(() => '');
  const [currentBlock, setCurrentBlock] = useState(() => ({ row: 0, column: 0 }));
  const [isTooShort, setIsTooShort] = useState(() => false);
  const [keyboardLetterBg, setKeyboardLetterBg] = useState(() => defaultKeyboardBg);

  // setKeyboardLetterBg
  useEffect(() => {
    const array = createBlockTable(len);
    setBlocksTable(() => array);
  }, [len]);

  // const validWord = useDictionaryThenRun('hello', () => 'run something');

  // console.log(validWord);

  function RunKeyIndentifier(key, row, column, backspace) {
    keySetIdentifier(
      key,
      len,
      deleteGuess,
      enterGuess,
      setBlocksTable,
      setCurrentBlock,
      blocksTable,
      data,
      checkGuessWord,
      currentBlock,
      row,
      column,
      setIsTooShort,
      isTooShort,
      enterBlockLetter,
      backspace,
      setKeyboardLetterBg,
    );
  }
  function onKeyPress(key) {
    const { row, column } = currentBlock;
    const backspace = '&#x2B05';
    const notGameOver = row <= 5;

    if (notGameOver) {
      RunKeyIndentifier(key, row, column, backspace);
    }
  }

  function onKeyDown(event) {
    const { key } = event;
    const { row, column } = currentBlock;
    const backspace = 'Backspace';
    const gameOver = row <= 5;

    if (gameOver) {
      RunKeyIndentifier(key, row, column, backspace);
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <main
      className="
              flex flex-col items-center text-center
              mt-4
              outline-none
              relative
            "
      onKeyDown={(event) => onKeyDown(event)}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={-1}
    >
      <TitleBar />
      {isTooShort && (
        <section
          className="
          bg-orange px-20 py-8 opacity-90
          text-[#eceef2ee] text-3xl font-bold
            rounded-lg
            absolute z-50
            top-[6em]
            "
        >
          Too short
        </section>
      )}
      { len ? <BlockTable blocksTable={blocksTable} /> : null }
      <KeyBoard onKeyPress={(event) => onKeyPress(event)} keysBg={keyboardLetterBg} />
    </main>
  );
}
