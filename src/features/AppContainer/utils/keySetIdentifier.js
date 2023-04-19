import collectLetterBg from './collectLetterBg';

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
) {
  const isValidLen = column < len;
  const backspace = backspaceFor;

  if (key === backspace) {
    deleteGuess(setBlocksTable, setCurrentBlock, blocksTable, currentBlock, row, column);
  } else if (key === 'Enter') {
    if (!isValidLen) {
      const mapBlocks = checkGuessWord(data, blocksTable[row]);
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
