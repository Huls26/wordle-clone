import { useEffect, useReducer } from 'react';
import useFetchData from '@hooks/useFetchData';

import BlockTable from '@features/BlockTable';
import KeyBoard from '@features/Keyboard';
import TitleBar from '@features/TitleBar';

import DisplayWarning from './components/DisplayWarning';
// import GameOver from './components/GameOver';
import SkeletonTailwind from './components/SkeletonTailwind';
import NavLevel from './components/NavLevel';
import Confetti from './components/Confetti';
import DisplayComponents from './components/DisplayComponents';

import createBlockTable from './utils/createBlockTable';
import keySetIdentifier from './utils/keySetIdentifier';

import reducerMethod, { INITIAL_STATE } from './utils/levelReducer';

export default function AppContainer() {
  const [state, dispatch] = useReducer(reducerMethod, INITIAL_STATE);
  const [data, dispatchFetch] = useFetchData();
  const shouldRun = state.currentWord < data.length;
  const wordData = shouldRun ? data[state.currentWord] : '';
  const len = wordData ? wordData.length : false;

  useEffect(() => {
    const array = createBlockTable(wordData.length);
    dispatch({ type: 'SET_BLOCKS_TABLE', setNewBlocksTable: array });
  }, [wordData]);

  useEffect(() => {
    const isGameOver = state.wrongGuesses.every((isWrong) => isWrong);
    const listOfGameOverM = ["GAME OVER That's pretty much it!", 'Sad to say, but Game over!', 'What are you doing, my friend? try again.', "I'm out of words to say. Better luck next time.", 'GAME OVER!!!', 'GAME OVER TRY AGAIN!', "Don't worry; even I can't finish this f****** game.", 'My hopes are high. Do your best next time.'];
    const GAMEOVERMESSAGE = "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover. - Horace Jackson Brown Jr.";

    const randomIdx = Math.floor(Math.random() * listOfGameOverM.length);
    const randomMsg = listOfGameOverM[randomIdx];

    if (isGameOver && state.level === 3) {
      setTimeout(
        () => {
          dispatch({ type: 'GAMEOVER_MY_FRIEND', setText: GAMEOVERMESSAGE });
          dispatch({ type: 'RELEASE_CONFETTI' });
        },
        5000,
      );
    } else if (isGameOver) {
      setTimeout(() => dispatch({ type: 'GAMEOVER_MY_FRIEND', setText: randomMsg }), 5000);
    }
  }, [state.level, state.wrongGuesses]);

  useEffect(() => {
    const isGameOverFinishTheGame = state.correctGuesses.every((isCorrect) => isCorrect);
    const GAMEOVERMESSAGE = "Twenty years from now you will be more disappointed by the things that you didn't do than by the ones you did do. So throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover. - Horace Jackson Brown Jr.";

    // Gameove display when level 4 and 3 same gameover lines
    if (isGameOverFinishTheGame && state.level === 4) {
      setTimeout(
        () => {
          dispatch({ type: 'GAMEOVER_MY_FRIEND', setText: GAMEOVERMESSAGE });
          dispatch({ type: 'RELEASE_CONFETTI' });
        },
        3000,
      );
    } else if (isGameOverFinishTheGame) {
      setTimeout(() => {
        dispatchFetch({ type: 'RESET_FETCH_DATA' });
        dispatch({ type: 'INCREASE_LEVEL' });
        dispatchFetch({ type: 'SET_LEVEL_UP', setLevel: state.level + 1 });
      }, 3000);
    }
  }, [dispatchFetch, state.correctGuesses, state.level]);

  function RunKeyIndentifier(key, backspace) {
    keySetIdentifier(
      key,
      len,
      wordData,
      backspace,
      state,
      dispatch,
      data,
    );
  }

  function onKeyPress(key) {
    const { row } = state.currentBlock;
    const backspace = '&#x2B05';
    const notGameOver = row <= 5;

    if (
      notGameOver
        && !state.isTooShort
        && state.validWord
        && !state.correctGuessed
    ) {
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

    if (
      notGameOver
        && !state.isTooShort
        && state.validWord
        && !state.correctGuessed
    ) {
      RunKeyIndentifier(newKey, backspace);
    }
  }

  function playAgainBtn() {
    dispatch({ type: 'RESET_GAME' });
    dispatchFetch({ type: 'RESET_FETCH_DATA' });
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
      <DisplayComponents
        len={len}
        shouldRun={shouldRun}
        state={state}
        wordData={wordData}
        playAgainBtn={() => playAgainBtn()}
      />

      {state.forConfetti && <Confetti isComplete={state.forConfetti} />}

      <TitleBar />
      <NavLevel
        correctGuesses={state.correctGuesses}
        wrongGuesses={state.wrongGuesses}
        level={state.level}
      />
      {
        len
          ? <BlockTable blocksTable={state.blocksTable} isLoading={state.isLoading} />
          : <SkeletonTailwind />
      }
      <KeyBoard onKeyPress={(event) => onKeyPress(event)} keysBg={state.keyboardLetterBG} />

      <DisplayWarning bg="bg-red" text="SORRY, SOMETHING WENT WRONG TRY AGAIN LATER" isDisplay={state.errorHandling || !shouldRun} />

    </main>
  );
}
