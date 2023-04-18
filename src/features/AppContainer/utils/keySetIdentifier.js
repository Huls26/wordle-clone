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
  backspaceFor = '&#x2B05',
) {
  const isValidLen = column < len;
  const backspace = backspaceFor;

  function checkBgLetter() {
    console.log(blocksTable);
  }

  if (key === backspace) {
    deleteGuess(setBlocksTable, setCurrentBlock, blocksTable, currentBlock, row, column);
  } else if (key === 'Enter') {
    if (!isValidLen) {
      checkBgLetter();
      enterGuess(
        setBlocksTable,
        setCurrentBlock,
        blocksTable,
        data,
        checkGuessWord,
        row,
        currentBlock,
      );
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
