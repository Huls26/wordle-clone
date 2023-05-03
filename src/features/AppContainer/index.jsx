import { useEffect, useState, useReducer } from 'react';
import useFetchData from '@hooks/useFetchData';

import BlockTable from '@features/BlockTable';
import KeyBoard from '@features/Keyboard';
import TitleBar from '@features/TitleBar';

import DisplayWarning from './components/DisplayWarning';
import GameOver from './components/GameOver';
import SkeletonTailwind from './components/SkeletonTailwind';
import NavLevel from './components/NavLevel';

import createBlockTable from './utils/createBlockTable';
import checkGuessWord from './utils/checkGuessWord';
import enterGuess from './utils/enterGuess';
import enterBlockLetter from './utils/enterBlockLetter';
import deleteGuess from './utils/deleteGuess';
import keySetIdentifier from './utils/keySetIdentifier';
import { reducerMethod, INITIAL_STATE } from './utils/levelReducer';

export default function AppContainer() {
  const data = useFetchData();
  const len = data.length;
  const defaultKeyboardBg = { bgGrayDark: 'none', bgGreen: 'none', bgYellow: 'none' };
  const [blocksTable, setBlocksTable] = useState(() => '');
  const [currentBlock, setCurrentBlock] = useState(() => ({ row: 0, column: 0 }));
  const [isTooShort, setIsTooShort] = useState(() => false);
  const [keyboardLetterBg, setKeyboardLetterBg] = useState(() => defaultKeyboardBg);
  const [is, setIs] = useState(() => ({ validWord: true, gameOver: false, text: '' }));
  const [state, dispatch] = useReducer(reducerMethod, INITIAL_STATE);

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
      dispatch,
    );
  }

  console.log(data);
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
      <DisplayWarning bg="bg-purple" text="You guessed the word keep it up!!" isDisplay={state.correctGuessed} />
      <GameOver playAgain={() => playAgainBtn()} text={is.text} isDisplay={Boolean(is.gameOver)} />
      <DisplayWarning bg="bg-orange" text="Too short" isDisplay={Boolean(isTooShort)} />
      <DisplayWarning bg="bg-orange" text="Invalid word" isDisplay={Boolean(!is.validWord)} />
      <NavLevel correctGuesses={state.correctGuesses} wrongGuesses={state.wrongGuesses} />
      { len ? <BlockTable blocksTable={blocksTable} /> : <SkeletonTailwind /> }
      <KeyBoard onKeyPress={(event) => onKeyPress(event)} keysBg={keyboardLetterBg} />
    </main>
  );
}
