import collectLetterBg from './collectLetterBg';
import fetchDictionaryThenRun from './fetchDictionaryThenRun';
import deleteGuess from './deleteGuess';
// import enterGuess from './enterGuess';
import checkGuessWord from './checkGuessWord';
import enterBlockLetter from './enterBlockLetter';

export default function keySetIdentifier(
  key,
  len,
  data,
  backspaceFor,
  state,
  dispatch,
  wordBank,
) {
  const { row, column } = state.currentBlock;
  const isValidLen = column < len;
  const backspace = backspaceFor;

  if (key === backspace && state.validWord) {
    deleteGuess(column, dispatch);
  } else if (key === 'Enter' && !state.gameOver) {
    if (!isValidLen) {
      const mapBlocks = checkGuessWord(data, state.blocksTable[row]);
      const mapWord = mapBlocks.map(({ letter }) => letter).join('');
      const isGuessed = data === mapWord.toLowerCase();

      if (isGuessed) {
        dispatch({ type: 'CORRECT_GUESSED' });

        setTimeout(
          () => {
            dispatch({ type: 'CHANGE_CURRENT_WORD' });
            dispatch({ type: 'DISPLAY_TIMEOUT', keyName: 'correctGuessed' });
            dispatch({ type: 'CURRENT_BLOCK_RESET_POSITION' });
          },
          3000,
        );
      } else {
        // set Loading component
        dispatch({ type: 'LOADING_GAME', setLoading: true });
      }

      fetchDictionaryThenRun(
        mapWord,
        () => {
          dispatch({ type: 'ENTER_GUESS_SET_BLOCKSTABLE', newBlocks: mapBlocks });
          dispatch({ type: 'LOADING_GAME', setLoading: false });
          const setBG = collectLetterBg(mapBlocks);
          dispatch({ type: 'SET_BG_KEYBOARD_LETTER', setBG });
        },
        () => dispatch({ type: 'ERROR_HANDLING' }),
        wordBank,
      )
        .then((isValid) => {
          if (!isValid) {
            dispatch({ type: 'SET_VALID_WORD', setCondition: false });
            dispatch({ type: 'LOADING_GAME', setLoading: false });
            setTimeout(() => dispatch({ type: 'SET_VALID_WORD', setCondition: true }), 3000);
          } else if (row >= 5 && !isGuessed && !state.gameOver) {
            dispatch({ type: 'WRONG_GUESSED' });
            dispatch({ type: 'LOADING_GAME', setLoading: false });
            setTimeout(
              () => {
                dispatch({ type: 'DISPLAY_TIMEOUT', keyName: 'wrongGuessed' });
                dispatch({ type: 'CHANGE_CURRENT_WORD' });
                dispatch({ type: 'CURRENT_BLOCK_RESET_POSITION' });
              },
              5000,
            );
          }
        });
    } else {
      dispatch({ type: 'SET_TOO_SHORT', setCondition: true });
      setTimeout(() => dispatch({ type: 'SET_TOO_SHORT', setCondition: false }), 3000);
    }
  } else if (!state.isTooShort && !state.gameOver) {
    enterBlockLetter(
      isValidLen,
      key,
      dispatch,
    );
  }
}
