import BlockTable from '@features/BlockTable';
import KeyBoard from '@features/Keyboard';
import TitleBar from '@features/TitleBar';

export default function AppContainer() {
  return (
    <main>
      <TitleBar />
      <BlockTable />
      <KeyBoard />
    </main>
  );
}
