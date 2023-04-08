import BlockTable from '@features/BlockTable';
import KeyBoard from '@features/Keyboard';
import TitleBar from '@features/TitleBar';

export default function AppContainer() {
  return (
    <main className="
              flex flex-col items-center text-center
              mt-4
    "
    >
      <TitleBar />
      <BlockTable />
      <KeyBoard />
    </main>
  );
}
