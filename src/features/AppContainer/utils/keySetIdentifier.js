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
) {
  const isValidLen = column < len;
  const backspace = backspaceFor;

  if (key === backspace) {
    deleteGuess(setBlocksTable, setCurrentBlock, blocksTable, currentBlock, row, column);
  } else if (key === 'Enter') {
    if (!isValidLen) {
      const mapBlocks = checkGuessWord(data, blocksTable[row]);
      const mapWord = mapBlocks.map(({ letter }) => letter).join('');

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
          }
        });
    } else {
      setIsTooShort((prev) => !prev);
      setTimeout(() => setIsTooShort((prev) => !prev), 5000);
    }
  } else if (!isTooShort) {
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
