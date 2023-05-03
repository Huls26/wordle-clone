export const INITIAL_STATE = {
  correctGuesses: [false, false, false],
  wrongGuesses: [false, false, false],
  correctGuessed: false,
};

export function reducerMethod(state, action) {
  switch (action.type) {
    case 'CORRECT_GUESSED': {
      const setArray = state.correctGuesses;
      setArray.pop();
      setArray.unshift(true);

      return {
        ...INITIAL_STATE,
        correctGuesses: [...setArray],
        correctGuessed: true,
      };
    }
    case 'WRONG_GUESSED': {
      const setArray = state.wrongGuesses;
      setArray.pop();
      setArray.unshift(true);

      return {
        ...INITIAL_STATE,
        wrongGuesses: [...setArray],
      };
    }
    case 'DISPLAY_TIMEOUT': {
      const setKey = state.keyName;

      return {
        ...INITIAL_STATE,
        [setKey]: false,
      };
    }
    default:
      return state;
  }
}
