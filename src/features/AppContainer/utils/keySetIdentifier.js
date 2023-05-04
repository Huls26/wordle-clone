import collectLetterBg from './collectLetterBg';
import fetchDictionaryThenRun from './fetchDictionaryThenRun';
import deleteGuess from './deleteGuess';
// import enterGuess from './enterGuess';
import checkGuessWord from './checkGuessWord';
import enterBlockLetter from './enterBlockLetter';

export default function keySetIdentifier(
  key,
  len,
  setBlocksTable,
  setCurrentBlock,
  blocksTable,
  data,
  currentBlock,
  setIsTooShort,
  isTooShort,
  backspaceFor,
  setKeyboardLetterBg,
  setIs,
  is,
  state,
  dispatch,
) {
  const { row, column } = state.currentBlock;
  const isValidLen = column < len;
  const backspace = backspaceFor;

  if (key === backspace && is.validWord) {
    deleteGuess(column, dispatch);
  } else if (key === 'Enter' && !is.gameOver) {
    if (!isValidLen) {
      const mapBlocks = checkGuessWord(data, state.blocksTable[row]);
      const mapWord = mapBlocks.map(({ letter }) => letter).join('');
      const isGuessed = data === mapWord.toLowerCase();
      // const upperCase = data.toUpperCase();

      if (isGuessed) {
        // fix display when correct guessed and when wrong !!!
        dispatch({ type: 'CORRECT_GUESSED' });
        setTimeout(
          () => {
            dispatch({ type: 'CHANGE_CURRENT_WORD' });
            dispatch({ type: 'DISPLAY_TIMEOUT', keyName: 'correctGuessed' });
            dispatch({ type: 'CURRENT_BLOCK_RESET_POSITION' });
          },
          3000,
        );
      }

      fetchDictionaryThenRun(
        mapWord,
        () => {
          // enterGuess(
          //   mapBlocks,
          //   dispatch,
          // );
          dispatch({ type: 'ENTER_GUESS_SET_BLOCKSTABLE', newBlocks: mapBlocks });
          setKeyboardLetterBg(() => collectLetterBg(mapBlocks));
        },
        () => dispatch({ type: 'ERROR_HANDLING' }),
      )
        .then((isValid) => {
          if (!isValid) {
            setIs((prevValue) => ({
              ...prevValue,
              validWord: isValid,
            }));
            setTimeout(() => setIs((prevValue) => ({
              ...prevValue,
              validWord: !prevValue.validWord,
            })), 3000);
          } else if (row >= 5 && !isGuessed) {
            // setIs((prevValue) => ({
            //   ...prevValue,
            //   text: `GAME OVER The word is "${upperCase}"`,
            // }));
            dispatch({ type: 'WRONG_GUESSED' });
            setTimeout(
              () => {
                dispatch({ type: 'DISPLAY_TIMEOUT', keyName: 'wrongGuessed' });
                dispatch({ type: 'CHANGE_CURRENT_WORD' });
              },
              5000,
            );
          }
        });
    } else {
      setIsTooShort((prev) => !prev);
      setTimeout(() => setIsTooShort((prev) => !prev), 5000);
    }
  } else if (!isTooShort && !is.gameOver) {
    enterBlockLetter(
      isValidLen,
      key,
      dispatch,
    );
  }
}