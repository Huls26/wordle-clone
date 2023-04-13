import { useEffect, useState } from 'react';
import useFetchData from '@hooks/useFetchData';

import BlockTable from '@features/BlockTable';
import KeyBoard from '@features/Keyboard';
import TitleBar from '@features/TitleBar';

import createBlockTable from './utils/createBlockTable';
import checkGuessWord from './utils/checkGuessWord';
import enterGuess from './utils/enterGuess';
import enterBlockLetter from './utils/enterBlockLetter';

export default function AppContainer() {
  const data = useFetchData();
  const len = data.length;
  const [blocksTable, setBlocksTable] = useState(() => '');
  const [currentBlock, setCurrentBlock] = useState(() => ({ row: 0, column: 0 }));

  useEffect(() => {
    const array = createBlockTable(len);
    setBlocksTable(() => array);
  }, [len]);

  console.log(data);

  function onKeyPress(key) {
    const { row, column } = currentBlock;
    const isValidLen = column < len;

    if (key === 'Enter') {
      enterGuess(
        setBlocksTable,
        setCurrentBlock,
        blocksTable,
        data,
        checkGuessWord,
        row,
        currentBlock,
      );
    } else {
      enterBlockLetter(
        setBlocksTable,
        setCurrentBlock,
        isValidLen,
        blocksTable,
        currentBlock,
        row,
        column,
        key,
      );
    }
  }

  function onKeyDown(event) {
    console.log(event.key);
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <main
      className="
              flex flex-col items-center text-center
              mt-4
              outline-none
            "
      onKeyDown={(event) => onKeyDown(event)}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={-1}
    >
      <TitleBar />
      { len ? <BlockTable blocksTable={blocksTable} /> : null }
      <KeyBoard onKeyPress={(event) => onKeyPress(event)} />
    </main>
  );
}
