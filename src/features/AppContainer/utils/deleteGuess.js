export default function deleteGuess(
  column,
  dispatch,
) {
  const isValidRow = column > 0;
  if (isValidRow) {
    // setBlocksTable(() => {
    //   const setNew = [...blocksTable];
    //   const rowB = [...setNew[row]];
    //   const setLetter = { letter: '', color: 'none' };
    //   rowB.splice(column - 1, 1, setLetter);
    //   setNew.splice(row, 1, rowB);

    //   return setNew;
    // });
    dispatch({ type: 'DELETE_BLOCKS_TABLE' });
    // setCurrentBlock(() => {
    //   const setNew = { ...currentBlock };

    //   setNew.column -= isValidRow ? 1 : 0;
    //   setNew.row = row;

    //   return setNew;
    // });
    dispatch({ type: 'CURRENT_BLOCK_SET_POSITION', isValid: isValidRow, condition: 'DELETE' });
  }
}
