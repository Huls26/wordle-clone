import { useState, useEffect } from 'react';
import fetchData from '@api/getRandomWord';

export default function useFetchData(level, numItem = 0) {
  const [word, setWord] = useState(() => '');

  useEffect(() => {
    fetchData((data) => setWord(() => data), level);
  }, [level]);

  return word ? word[numItem] : word;
}
