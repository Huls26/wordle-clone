import { useEffect, useState } from 'react';
import useFetchData from '@hooks/useFetchData';

import BlockTable from '@features/BlockTable';
import KeyBoard from '@features/Keyboard';
import TitleBar from '@features/TitleBar';

import createBlockTable from './utils/createBlockTable';

export default function AppContainer() {
  const data = useFetchData();
  const len = data.length;
  const [blocksTable, setBlocksTable] = useState(() => '');
  const [currentBlock, setCurrentBlock] = useState(() => ({ row: 0, column: 0 }));

  useEffect(() => {
    const array = createBlockTable(len);
    setBlocksTable(() => array);
  }, [len]);

  function onKeyPress(key) {
    const { row, column } = currentBlock;
    setBlocksTable(() => {
      const isValidLen = column < len;
      if (isValidLen) {
        const setNew = [...blocksTable];
        const rowB = [...setNew[row]];
        const setLetter = { letter: key, color: 'bg-green' };
        rowB.splice(column, 1, setLetter);
        setNew.splice(row, 1, rowB);

        return setNew;
      }

      return blocksTable;
    });
    setCurrentBlock(() => {
      const setNew = { ...currentBlock };
      if (key === 'Enter') {
        setNew.row += 1;
        setNew.column = 0;
      } else {
        setNew.column += 1;
        setNew.row = row;
      }

      return setNew;
    });
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
