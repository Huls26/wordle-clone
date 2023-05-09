import { PropTypes } from 'prop-types';
import Confetti from 'react-confetti';

export default function ConfettiComponent({ isComplete }) {
  return (
    <div id="confetti">
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        run={isComplete}
        numberOfPieces={544}
        wind={0}
        gravity={0.1}
        opacity={isComplete ? 1 : 0}
      />
    </div>
  );
}

ConfettiComponent.propTypes = {
  isComplete: PropTypes.bool.isRequired,
};
