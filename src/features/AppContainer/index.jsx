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
import keySetIdentifier from './utils/keySetIdentifier';

import reducerMethod, { INITIAL_STATE } from './utils/levelReducer';

export default function AppContainer() {
  const defaultKeyboardBg = { bgGrayDark: 'none', bgGreen: 'none', bgYellow: 'none' };
  const [blocksTable, setBlocksTable] = useState(() => '');
  const [currentBlock, setCurrentBlock] = useState(() => ({ row: 0, column: 0 }));
  const [isTooShort, setIsTooShort] = useState(() => false);
  const [keyboardLetterBg, setKeyboardLetterBg] = useState(() => defaultKeyboardBg);
  const [is, setIs] = useState(() => ({ validWord: true, gameOver: false, text: '' }));
  const [state, dispatch] = useReducer(reducerMethod, INITIAL_STATE);
  const data = useFetchData(state.level, 0);
  console.log(data);
  const len = data.length;

  console.log(state.level);
  useEffect(() => {
    const array = createBlockTable(len);
    setBlocksTable(() => array);
  }, [len]);

  function RunKeyIndentifier(key, row, column, backspace) {
    keySetIdentifier(
      key,
      len,
      setBlocksTable,
      setCurrentBlock,
      blocksTable,
      data,
      currentBlock,
      row,
      column,
      setIsTooShort,
      isTooShort,
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
      <DisplayWarning bg="bg-purple" text="Guess the Word" isDisplay={Boolean(!len)} />
      <DisplayWarning bg="bg-purple" text="You guessed the word keep it up!!" isDisplay={state.correctGuessed} />
      <DisplayWarning bg="bg-orange" text={`Your guess is wrong. The word is "${data.toUpperCase()}"`} isDisplay={state.wrongGuessed} />
      <GameOver playAgain={() => playAgainBtn()} text={is.text} isDisplay={Boolean(is.gameOver)} />
      <DisplayWarning bg="bg-orange" text="Too short" isDisplay={Boolean(isTooShort)} />
      <DisplayWarning bg="bg-orange" text="Invalid word" isDisplay={Boolean(!is.validWord)} />

      <TitleBar />
      <NavLevel
        correctGuesses={state.correctGuesses}
        wrongGuesses={state.wrongGuesses}
        level={state.level}
      />
      { len ? <BlockTable blocksTable={blocksTable} /> : <SkeletonTailwind /> }
      <KeyBoard onKeyPress={(event) => onKeyPress(event)} keysBg={keyboardLetterBg} />

      <DisplayWarning bg="bg-red" text="SORRY, SOMETHING WENT WRONG TRY AGAIN LATER" isDisplay={state.errorHandling} />
    </main>
  );
}
