function enterGuess(
  setBlocksTable,
  setCurrentBlock,
  blocksTable,
  target,
  row,
  currentBlock,
  newBlocks,
) {
  setBlocksTable(() => {
    const setNew = [...blocksTable];
    const setNewBlock = newBlocks;
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
