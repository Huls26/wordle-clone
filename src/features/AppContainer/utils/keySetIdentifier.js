import collectLetterBg from './collectLetterBg';
import fetchDictionaryThenRun from './fetchDictionaryThenRun';

export default function keySetIdentifier(
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
  backspaceFor,
  setKeyboardLetterBg,
  setIs,
  is,
) {
  const isValidLen = column < len;
  const backspace = backspaceFor;

  if (key === backspace) {
    deleteGuess(setBlocksTable, setCurrentBlock, blocksTable, currentBlock, row, column);
  } else if (key === 'Enter' && !is.gameOver) {
    if (!isValidLen) {
      const mapBlocks = checkGuessWord(data, blocksTable[row]);
      const mapWord = mapBlocks.map(({ letter }) => letter).join('');
      const isGuessed = data === mapWord.toLowerCase();
      const upperCase = data.toUpperCase();

      if (isGuessed) {
        setIs((prevValue) => ({
          ...prevValue,
          gameOver: true,
          text: 'Congratulations you guessed the word!',
        }));
      }

      fetchDictionaryThenRun(mapWord, () => {
        enterGuess(
          setBlocksTable,
          setCurrentBlock,
          blocksTable,
          data,
          row,
          currentBlock,
          mapBlocks,
        );
        setKeyboardLetterBg(() => collectLetterBg(mapBlocks));
      })
        .then((isValid) => {
          if (!isValid) {
            setIs((prevValue) => ({
              ...prevValue,
              validWord: isValid,
            }));
            setTimeout(() => setIs((prevValue) => ({
              ...prevValue,
              validWord: !prevValue.validWord,
            })), 5000);
          } else if (row >= 5 && !isGuessed) {
            setIs((prevValue) => ({
              ...prevValue,
              gameOver: true,
              text: `GAME OVER The word is "${upperCase}"`,
            }));
          }
        });
    } else {
      setIsTooShort((prev) => !prev);
      setTimeout(() => setIsTooShort((prev) => !prev), 5000);
    }
  } else if (!isTooShort && !is.gameOver) {
    enterBlockLetter(
      setBlocksTable,
      setCurrentBlock,
      isValidLen,
      blocksTable,
      currentBlock,
      row,
      column,
      key,
    );
  }
}
