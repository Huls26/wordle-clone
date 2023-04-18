import { useEffect, useState } from 'react';
import useFetchData from '@hooks/useFetchData';

import BlockTable from '@features/BlockTable';
import KeyBoard from '@features/Keyboard';
import TitleBar from '@features/TitleBar';

import createBlockTable from './utils/createBlockTable';
import checkGuessWord from './utils/checkGuessWord';
import enterGuess from './utils/enterGuess';
import enterBlockLetter from './utils/enterBlockLetter';
import deleteGuess from './utils/deleteGuess';

export default function AppContainer() {
  const data = useFetchData();
  const len = data.length;
  const [blocksTable, setBlocksTable] = useState(() => '');
  const [currentBlock, setCurrentBlock] = useState(() => ({ row: 0, column: 0 }));
  const [isTooShort, setIsTooShort] = useState(() => false);

  useEffect(() => {
    const array = createBlockTable(len);
    setBlocksTable(() => array);
  }, [len]);

  // console.log(data);

  function checkLength(Table, row) {
    const block = Table[row];

    return block.reduce((guessL, { letter }) => (letter ? [...guessL, letter] : [...guessL]), [])
      .length;
  }

  function onKeyPress(key) {
    const { row, column } = currentBlock;
    const isValidLen = column < len;
    const backspace = '&#x2B05';

    if (key === backspace) {
      deleteGuess(setBlocksTable, setCurrentBlock, blocksTable, currentBlock, row, column);
    } else if (key === 'Enter') {
      checkLength(blocksTable, row);
      // console.log(l === len);
      if (!isValidLen) {
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
        setIsTooShort((prev) => !prev);
      }
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
    const { key } = event;
    const { row, column } = currentBlock;
    const isValidLen = column < len;
    const backspace = 'Backspace';

    if (key === backspace) {
      deleteGuess(setBlocksTable, setCurrentBlock, blocksTable, currentBlock, row, column);
    } else if (key === 'Enter') {
      if (!isValidLen) {
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
        console.log('fix this you handsome');
      }
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
      {isTooShort && <section>Too short</section>}
      { len ? <BlockTable blocksTable={blocksTable} /> : null }
      <KeyBoard onKeyPress={(event) => onKeyPress(event)} />
    </main>
  );
}
