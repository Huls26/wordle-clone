export const INITIAL_STATE = {
  correctGuesses: [false, false, false],
  wrongGuesses: [false, false, false],
  correctGuessed: false,
  wrongGuessed: false,
  errorHandling: false,
  level: 1,
};

export default function reducerMethod(state, action) {
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
        wrongGuessed: true,
      };
    }
    case 'DISPLAY_TIMEOUT': {
      const setKey = state.keyName;

      return {
        ...INITIAL_STATE,
        [setKey]: false,
      };
    }
    case 'ERROR_HANDLING': {
      return {
        ...INITIAL_STATE,
        errorHandling: true,
      };
    }
    default:
      return state;
  }
}
