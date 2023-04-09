import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import './styles/keyboard.css';

export default function KeyBoard() {
  return (
    <section className="w-[40em] mb-6">
      <Keyboard
        onChange=""
        onKeyPress=""
        theme="hg-theme-default hg-layout-default"
        layout={{
          default: [
            'Q W E R T Y U I O P',
            'A S D F G H J K L',
            '&#x2B05 Z X C V B N M Enter',
          ],
        }}
      />
    </section>
  );
}
