import { PropTypes } from 'prop-types';

import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import './styles/keyboard.css';

export default function KeyBoard({ onKeyPress, keysBg }) {
  const { bgGreen, bgGrayDark, bgYellow } = keysBg;

  return (
    <section className="w-[25em] md:w-[35em] lg:w-[40em] mb-6">
      <Keyboard
        onKeyPress={onKeyPress}
        theme="hg-theme-default hg-layout-default"
        layout={{
          default: [
            'Q W E R T Y U I O P',
            'A S D F G H J K L',
            '&#x2B05 Z X C V B N M Enter',
          ],
        }}
        buttonTheme={[
          {
            class: 'bg-green',
            buttons: bgGreen || 'none',
          },
          {
            class: 'bg-gray-dark',
            buttons: bgGrayDark || 'none',
          },
          {
            class: 'bg-yellow',
            buttons: bgYellow || 'none',
          },
          {
            class: 'button-active',
            buttons: 'none',
          },
        ]}
      />
    </section>
  );
}

KeyBoard.propTypes = {
  onKeyPress: PropTypes.func.isRequired,
  keysBg: PropTypes.shape({
    bgGreen: PropTypes.string,
    bgGrayDark: PropTypes.string,
    bgYellow: PropTypes.string,
  }).isRequired,
};
