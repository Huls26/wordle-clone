import useFetchData from '@hooks/useFetchData';

import BlockTable from '@features/BlockTable';
import KeyBoard from '@features/Keyboard';
import TitleBar from '@features/TitleBar';

import createBlockTable from './utils/createBlockTable';

export default function AppContainer() {
  const data = useFetchData();
  const len = data.length;
  const array = createBlockTable(len);

  console.log(len);
  console.log(array);

  return (
    <main className="
              flex flex-col items-center text-center
              mt-4
            "
    >
      <TitleBar />
      { len ? <BlockTable blocksTable={array} /> : null }
      <KeyBoard />
    </main>
  );
}
