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
  // const [blocksTable, setBlocksTable] = useState(() => '');
  // const [currentBlock, setCurrentBlock] = useState(() => ({ row: 0, column: 0 }));
  const [isTooShort, setIsTooShort] = useState(() => false);
  const [keyboardLetterBg, setKeyboardLetterBg] = useState(() => defaultKeyboardBg);
  const [is, setIs] = useState(() => ({ validWord: true, gameOver: false, text: '' }));
  const [state, dispatch] = useReducer(reducerMethod, INITIAL_STATE);
  const data = useFetchData(state.level);
  const wordData = data[state.currentWord];
  const len = wordData.length;

  useEffect(() => {
    const array = createBlockTable(wordData.length);
    // setBlocksTable(() => array);
    dispatch({ type: 'SET_BLOCKS_TABLE', setNewBlocksTable: array });
  }, [wordData]);

  // useEffect(() => {
  //   const isGameOver = state.wrongGuesses.every((isWrong) => isWrong);

  //   console.log(isGameOver);
  // }, [state]);

  console.log(wordData);
  console.log(state.blocksTable);
  function RunKeyIndentifier(key, backspace) {
    keySetIdentifier(
      key,
      len,
      wordData,
      setIsTooShort,
      isTooShort,
      backspace,
      setKeyboardLetterBg,
      setIs,
      is,
      state,
      dispatch,
    );
  }

  function onKeyPress(key) {
    const { row } = state.currentBlock;
    const backspace = '&#x2B05';
    const notGameOver = row <= 5;

    if (notGameOver && !isTooShort && is.validWord) {
      RunKeyIndentifier(key, backspace);
    }
  }

  function onKeyDown(event) {
    const { key } = event;
    const { row } = state.currentBlock;
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
      RunKeyIndentifier(newKey, backspace);
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
      <DisplayWarning bg="bg-orange" text={`Your guess is wrong. The word is "${wordData.toUpperCase()}"`} isDisplay={state.wrongGuessed} />
      <GameOver
        playAgain={() => playAgainBtn()}
        text={state.gameOverText}
        isDisplay={state.gameOver}
      />
      <DisplayWarning bg="bg-orange" text="Too short" isDisplay={Boolean(isTooShort)} />
      <DisplayWarning bg="bg-orange" text="Invalid word" isDisplay={Boolean(!is.validWord)} />

      <TitleBar />
      <NavLevel
        correctGuesses={state.correctGuesses}
        wrongGuesses={state.wrongGuesses}
        level={state.level}
      />
      { len ? <BlockTable blocksTable={state.blocksTable} /> : <SkeletonTailwind /> }
      <KeyBoard onKeyPress={(event) => onKeyPress(event)} keysBg={keyboardLetterBg} />

      <DisplayWarning bg="bg-red" text="SORRY, SOMETHING WENT WRONG TRY AGAIN LATER" isDisplay={state.errorHandling} />
    </main>
  );
}
