function enterGuess(
  setBlocksTable,
  setCurrentBlock,
  blocksTable,
  target,
  checkGuessWord,
  row,
  currentBlock,
) {
  setBlocksTable(() => {
    const setNew = [...blocksTable];
    const blocksTableRow = blocksTable[row];
    const setNewBlock = checkGuessWord(target, blocksTableRow);
    setNew.splice(row, 1, setNewBlock);

    return setNew;
  });
  setCurrentBlock(() => {
    const setNew = { ...currentBlock };
    setNew.row += 1;
    setNew.column = 0;

    return setNew;
  });
}

export default enterGuess;
