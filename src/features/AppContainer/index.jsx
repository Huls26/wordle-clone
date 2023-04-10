import BlockTable from '@features/BlockTable';
import KeyBoard from '@features/Keyboard';
import TitleBar from '@features/TitleBar';

import useFetchData from '@hooks/useFetchData';
import { useEffect, useState } from 'react';

export default function AppContainer() {
  const data = useFetchData();
  const [target, setTarget] = useState(() => '');

  useEffect(() => {
    if (data) {
      setTarget(() => data);
    }
  }, [data]);

  return (
    <main className="
              flex flex-col items-center text-center
              mt-4
            "
    >
      <TitleBar />
      <BlockTable guessWord="a" targetWord={target} />
      <KeyBoard />
    </main>
  );
}
