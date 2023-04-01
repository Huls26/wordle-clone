// import { useEffect, useState } from 'react';
// import fetchData from '@api/getRandomWord';
import useFetchData from '../hooks/useFetchData';

export default function Mainpage() {
  // const [display, setDiplay] = useState(() => null);
  const value = useFetchData();

  return (
    <section>
      { !value ? '...Loading' : (
        <div data-testid="output-data">
          { value }
          {' '}
        </div>
      )}
    </section>
  );
}
