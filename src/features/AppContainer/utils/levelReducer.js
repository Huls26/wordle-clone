export const INITIAL_STATE = {
  correctGuesses: [false, false, false],
  wrongGuesses: [false, false, false],
  correctGuessed: false,
  wrongGuessed: false,
  errorHandling: false,
  level: 1,
  currentWord: 0,
  gameOver: false,
  gameOverText: '',
  currentBlock: { row: 0, column: 0 },
};

export default function reducerMethod(state, action) {
  switch (action.type) {
    case 'CURRENT_BLOCK_RESET_POSITION': {
      return {
        ...state,
        currentBlock: INITIAL_STATE.currentBlock,
      };
    }
    case 'CURRENT_BLOCK_SET_POSITION': {
      const blockPosition = state.currentBlock;
      const setNew = { ...blockPosition };

      if (action.condition === 'DELETE') {
        setNew.column -= action.isValid ? 1 : 0;
      } else {
        setNew.column += action.isValid ? 1 : 0;
      }

      setNew.row = blockPosition.row;

      return {
        ...state,
        currentBlock: setNew,
      };
    }
    case 'CORRECT_GUESSED': {
      const setArray = state.correctGuesses;
      setArray.pop();
      setArray.unshift(true);

      return {
        ...state,
        correctGuesses: [...setArray],
        correctGuessed: true,
      };
    }
    case 'WRONG_GUESSED': {
      const setArray = state.wrongGuesses;
      setArray.pop();
      setArray.unshift(true);

      return {
        ...state,
        wrongGuesses: [...setArray],
        wrongGuessed: true,
      };
    }
    case 'DISPLAY_TIMEOUT': {
      const setKey = action.keyName;

      return {
        ...state,
        [setKey]: false,
      };
    }
    case 'ERROR_HANDLING': {
      return {
        ...state,
        errorHandling: true,
      };
    }
    case 'CHANGE_CURRENT_WORD': {
      const updateIdx = state.currentWord + 1;
      return {
        ...state,
        currentWord: updateIdx,
      };
    }
    case 'GAME_OVER': {
      return {
        ...state,
        gameOver: true,
        gameOverText: 'GAME OVER MY FRIEND BETTER LUCK NEXT TIME &#128557;',
      };
    }
    default:
      return state;
  }
}
