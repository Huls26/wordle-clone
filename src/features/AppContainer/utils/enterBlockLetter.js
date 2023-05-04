export default function enterBlockLetter(
  isValidLen,
  key,
  dispatch,
) {
  const upKey = key.toUpperCase().charCodeAt(0) - 64;
  const validKeys = upKey >= 1 && upKey <= 26;

  if (validKeys && isValidLen) {
    // setBlocksTable(() => {
    //   if (isValidLen) {
    //     const setNew = [...blocksTable];
    //     const rowB = [...setNew[row]];
    //     const setLetter = { letter: key, color: 'none' };
    //     rowB.splice(column, 1, setLetter);
    //     setNew.splice(row, 1, rowB);

    //     return setNew;
    //   }

    //   return blocksTable;
    // });
    dispatch({ type: 'SET_BLOCK_LETTER', keyInput: key });
    // setCurrentBlock(() => {
    //   const setNew = { ...currentBlock };

    //   setNew.column += isValidLen ? 1 : 0;
    //   setNew.row = row;

    //   return setNew;
    // });
    dispatch({ type: 'CURRENT_BLOCK_SET_POSITION', isValid: isValidLen });
  }
}
