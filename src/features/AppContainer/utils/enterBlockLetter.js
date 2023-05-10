export default function enterBlockLetter(
  isValidLen,
  key,
  dispatch,
) {
  const upKey = key.toUpperCase().charCodeAt(0) - 64;
  const validKeys = upKey >= 1 && upKey <= 26;
  console.log(validKeys);

  if (validKeys && isValidLen) {
    dispatch({ type: 'SET_BLOCK_LETTER', keyInput: key });
    dispatch({ type: 'CURRENT_BLOCK_SET_POSITION', isValid: isValidLen });
  }
}
