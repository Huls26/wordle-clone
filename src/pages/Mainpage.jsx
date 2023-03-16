import { useEffect, useState } from 'react';

export default function Mainpage() {
  const [word, setWord] = useState(() => '');

  useEffect(() => {
    async function fetchData() {
      const res = await fetch('https://random-word-api.herokuapp.com/word');
      const data = await res.json();
      setWord(() => data);
    }

    fetchData();
  }, []);

  return (
    <div>{ word }</div>
  );
}
