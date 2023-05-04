function enterGuess(
  newBlocks,
  dispatch,
) {
  // setBlocksTable(() => {
  //   const setNew = [...blocksTable];
  //   const setNewBlock = newBlocks;
  //   setNew.splice(row, 1, setNewBlock);

  //   return setNew;
  // });
  // setCurrentBlock(() => {
  //   const setNew = { ...currentBlock };
  //   setNew.row += 1;
  //   setNew.column = 0;

  //   return setNew;
  // });

  dispatch({ type: 'ENTER_GUESS_SET_BLOCKSTABLE', newBlocks });
}

export default enterGuess;
