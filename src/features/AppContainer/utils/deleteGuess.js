export default function deleteGuess(
  column,
  dispatch,
) {
  const isValidRow = column > 0;
  if (isValidRow) {
    dispatch({ type: 'DELETE_BLOCKS_TABLE' });
    dispatch({ type: 'CURRENT_BLOCK_SET_POSITION', isValid: isValidRow, condition: 'DELETE' });
  }
}
