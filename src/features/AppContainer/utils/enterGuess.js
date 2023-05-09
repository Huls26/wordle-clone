function enterGuess(
  newBlocks,
  dispatch,
) {
  dispatch({ type: 'ENTER_GUESS_SET_BLOCKSTABLE', newBlocks });
}

export default enterGuess;
