import { useState, useEffect } from 'react';
import fetchData from '@api/getRandomWord';

export default function useFetchData(level) {
  const [words, setWord] = useState(() => ['']);

  useEffect(() => {
    fetchData((data) => setWord(() => data), level);
  }, [level]);

  return words;
}
