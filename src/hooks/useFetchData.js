import { useEffect, useReducer } from 'react';
import fetchData from '@api/getRandomWord';

export default function useFetchData() {
  const INITIAL_STATE = {
    words: [''],
    level: 1,
  };

  function fetchMethod(state, action) {
    switch (action.type) {
      case 'RESET_FETCH_DATA': {
        return {
          ...INITIAL_STATE,
        };
      }
      case 'SET_UP_DATA': {
        return {
          ...state,
          words: action.setData,
        };
      }
      case 'SET_LEVEL_UP': {
        return {
          ...state,
          level: action.setLevel,
        };
      }
      default:
        return 'ERROR_Handling';
    }
  }

  // const [words, setWord] = useState(() => ['']);
  // const [level, setLevel] = useState(() => 1);
  const [state, dispatch] = useReducer(fetchMethod, INITIAL_STATE);

  useEffect(() => {
    fetchData((data) => dispatch({ type: 'SET_UP_DATA', setData: data }), state.level);
  }, [state.level, state.words.length]);

  return [state.words, dispatch];
}
