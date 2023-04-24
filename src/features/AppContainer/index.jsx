import { useEffect, useState } from 'react';
import useFetchData from '@hooks/useFetchData';

import BlockTable from '@features/BlockTable';
import KeyBoard from '@features/Keyboard';
import TitleBar from '@features/TitleBar';

import DisplayWarning from './components/DisplayWarning';
import GameOver from './components/GameOver';

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

  // console.log(currentBlock.row > 5);
  // setKeyboardLetterBg
  useEffect(() => {
    const array = createBlockTable(len);
    setBlocksTable(() => array);
  }, [len]);

  // console.log(data);
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

    if (notGameOver) {
      RunKeyIndentifier(key, row, column, backspace);
    }
  }

  function onKeyDown(event) {
    const { key } = event;
    const { row, column } = currentBlock;
    const backspace = 'Backspace';
    const gameOver = row <= 5;
    let newKey = '';

    if (key === 'Enter') {
      newKey = 'Enter';
    } else if (key === backspace) {
      newKey = backspace;
    } else {
      newKey = key.toUpperCase();
    }

    if (gameOver) {
      RunKeyIndentifier(newKey, row, column, backspace);
    }
  }

  function playAgainBtn() {
    window.location.reload(false);
  }

  console.log(data);
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
      { is.gameOver && <GameOver playAgain={() => playAgainBtn()} text={is.text} /> }
      { isTooShort && <DisplayWarning bg="bg-orange" text="Too short" /> }
      { !is.validWord && <DisplayWarning bg="bg-orange" text="Invalid word" />}
      { len ? <BlockTable blocksTable={blocksTable} /> : null }
      <KeyBoard onKeyPress={(event) => onKeyPress(event)} keysBg={keyboardLetterBg} />
    </main>
  );
}
