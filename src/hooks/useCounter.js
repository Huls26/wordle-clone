import { useCallback, useState } from 'react';

// eslint-disable-next-line import/prefer-default-export
export const useCounter = () => {
  const [count, setCount] = useState(0);
  const increment = useCallback(() => setCount((x) => x + 1), []);
  return { count, increment };
};
