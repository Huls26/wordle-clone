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
  blocksTable: false,
  isTooShort: false,
  keyboardLetterBG: { bgGrayDark: 'none', bgGreen: 'none', bgYellow: 'none' },
  validWord: true,
  isLoading: false,
};

export default function reducerMethod(state, action) {
  switch (action.type) {
    case 'INCREASE_LEVEL': {
      return {
        ...INITIAL_STATE,
        level: state.level + 1,
      };
    }
    case 'LOADING_GAME': {
      return {
        ...state,
        isLoading: action.setLoading,
      };
    }
    case 'RESET_GAME': {
      return {
        ...INITIAL_STATE,
        // // patch #####################################
        // in case a bug
        // correctGuesses: [false, false, false],
        // wrongGuesses: [false, false, false],
      };
    }
    case 'GAMEOVER_MY_FRIEND': {
      return {
        ...state,
        gameOver: true,
        gameOverText: action.setText,
      };
    }
    case 'SET_VALID_WORD': {
      return {
        ...state,
        validWord: action.setCondition,
      };
    }
    case 'SET_BG_KEYBOARD_LETTER': {
      return {
        ...state,
        keyboardLetterBG: { ...action.setBG },
      };
    }
    case 'SET_TOO_SHORT': {
      return {
        ...state,
        isTooShort: action.setCondition,
      };
    }
    case 'ENTER_GUESS_SET_BLOCKSTABLE': {
      // blocks table
      const { row } = state.currentBlock;
      const setNew = [...state.blocksTable];
      const setNewBlock = [...action.newBlocks];
      setNew.splice(row, 1, setNewBlock);

      // currentBlock
      const setNewPositionBlock = { ...state.currentBlock };
      setNewPositionBlock.row += 1;
      setNewPositionBlock.column = 0;

      return {
        ...state,
        blocksTable: [...setNew],
        currentBlock: { ...setNewPositionBlock },
      };
    }
    case 'SET_BLOCK_LETTER': {
      const key = action.keyInput;
      const { row, column } = state.currentBlock;
      const setNew = [...state.blocksTable];
      const rowB = [...setNew[row]];
      const setLetter = { letter: key, color: 'none' };

      rowB.splice(column, 1, setLetter);
      setNew.splice(row, 1, rowB);

      return {
        ...state,
        blocksTable: setNew,
      };
    }
    case 'SET_BLOCKS_TABLE': {
      return {
        ...state,
        blocksTable: [...action.setNewBlocksTable],
      };
    }
    case 'DELETE_BLOCKS_TABLE': {
      const { row, column } = state.currentBlock;
      const setNew = [...state.blocksTable];
      const rowB = [...setNew[row]];
      const setLetter = { letter: '', color: 'none' };
      rowB.splice(column - 1, 1, setLetter);
      setNew.splice(row, 1, rowB);

      return {
        ...state,
        blocksTable: setNew,
      };
    }
    case 'CURRENT_BLOCK_RESET_POSITION': {
      return {
        ...state,
        currentBlock: { row: 0, column: 0 },
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
      const setArray = [...state.correctGuesses];
      setArray.pop();
      setArray.unshift(true);

      return {
        ...state,
        correctGuesses: [...setArray],
        correctGuessed: true,
      };
    }
    case 'WRONG_GUESSED': {
      const setArray = [...state.wrongGuesses];
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
      return {
        ...INITIAL_STATE,
        errorHandling: true,
      };
  }
}
