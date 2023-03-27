import { useEffect, useState } from 'react';
// import fetchData from '@api/getRandomWord';

export default function Mainpage() {
  const [isLoading, setIsLoading] = useState(() => true);
  // const [display] = useState(() => 'for sample');

  useEffect(() => {
    setTimeout(() => setIsLoading((() => false)), 1000);
  }, []);

  return (
    <section>
      { isLoading ? '...Loading' : <div data-testid="output-data">for sample</div>}
    </section>
  );
}
