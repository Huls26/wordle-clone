import { useEffect, useState } from 'react';
import fetchData from '@api/getRandomWord';

export default function Mainpage() {
  const [display, setDiplay] = useState(() => null);

  useEffect(() => {
    fetchData((res) => setDiplay(() => res));
  }, []);

  return (
    <section>
      { !display ? '...Loading' : (
        <div data-testid="output-data">
          { display }
          {' '}
        </div>
      )}
    </section>
  );
}
