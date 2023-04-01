import { useState, useEffect } from 'react';
import fetchData from '@api/getRandomWord';

export default function useFetchData() {
  const [word, setWord] = useState(() => null);

  useEffect(() => {
    fetchData((data) => setWord(() => data));
  }, []);

  return word;
}
