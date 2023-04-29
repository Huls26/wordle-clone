import { useEffect, useState } from 'react';
import useFetchData from '@hooks/useFetchData';

import BlockTable from '@features/BlockTable';
import KeyBoard from '@features/Keyboard';
import TitleBar from '@features/TitleBar';

import DisplayWarning from './components/DisplayWarning';
import GameOver from './components/GameOver';
import SkeletonTailwind from './components/SkeletonTailwind';

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
  const [is, setIs] = useState(() => ({ validWord: true, gameOver: false, text: '' }));

  useEffect(() => {
    const array = createBlockTable(len);
    setBlocksTable(() => array);
  }, [len]);

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
      setIs,
      is,
    );
  }

  function onKeyPress(key) {
    const { row, column } = currentBlock;
    const backspace = '&#x2B05';
    const notGameOver = row <= 5;

    if (notGameOver && !isTooShort && is.validWord) {
      RunKeyIndentifier(key, row, column, backspace);
    }
  }

  function onKeyDown(event) {
    const { key } = event;
    const { row, column } = currentBlock;
    const backspace = 'Backspace';
    const notGameOver = row <= 5;
    let newKey = '';

    if (key === 'Enter') {
      newKey = 'Enter';
    } else if (key === backspace) {
      newKey = backspace;
    } else {
      newKey = key.toUpperCase();
    }

    if (notGameOver && !isTooShort && is.validWord) {
      RunKeyIndentifier(newKey, row, column, backspace);
    }
  }

  function playAgainBtn() {
    window.location.reload(false);
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <main
      className="
              flex flex-col items-center text-center
              mt-4
              outline-none
              relative
              min-w-[260px]
            "
      onKeyDown={(event) => onKeyDown(event)}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={-1}
    >
      <TitleBar />
      <DisplayWarning bg="bg-purple" text="Guess the Word" isDisplay={Boolean(!len)} />
      <GameOver playAgain={() => playAgainBtn()} text={is.text} isDisplay={Boolean(is.gameOver)} />
      <DisplayWarning bg="bg-orange" text="Too short" isDisplay={Boolean(isTooShort)} />
      <DisplayWarning bg="bg-orange" text="Invalid word" isDisplay={Boolean(!is.validWord)} />
      { len ? <BlockTable blocksTable={blocksTable} /> : <SkeletonTailwind /> }
      <KeyBoard onKeyPress={(event) => onKeyPress(event)} keysBg={keyboardLetterBg} />
    </main>
  );
}
