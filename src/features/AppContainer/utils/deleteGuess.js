export default function deleteGuess(
  setBlocksTable,
  setCurrentBlock,
  blocksTable,
  currentBlock,
  row,
  column,
) {
  const isValidRow = column > 0;
  if (isValidRow) {
    setBlocksTable(() => {
      const setNew = [...blocksTable];
      const rowB = [...setNew[row]];
      const setLetter = { letter: '', color: 'none' };
      rowB.splice(column - 1, 1, setLetter);
      setNew.splice(row, 1, rowB);

      return setNew;
    });
    setCurrentBlock(() => {
      const setNew = { ...currentBlock };

      setNew.column -= isValidRow ? 1 : 0;
      setNew.row = row;

      return setNew;
    });
  }
}
