import { PropTypes } from 'prop-types';

import DisplayWarning from './DisplayWarning';
import GameOver from './GameOver';

export default function DisplayComponents({
  len, shouldRun, state, wordData, playAgainBtn,
}) {
  return (
    <>
      <DisplayWarning bg="bg-purple" text="Guess the Word" isDisplay={Boolean(!len) && shouldRun} />
      <DisplayWarning bg="bg-purple" text="You guessed the word keep it up!!" isDisplay={state.correctGuessed} />
      <DisplayWarning bg="bg-orange" text={`Your guess is wrong. The word is "${wordData.toUpperCase()}"`} isDisplay={state.wrongGuessed} />
      <GameOver
        playAgain={() => playAgainBtn()}
        text={state.gameOverText}
        isDisplay={state.gameOver}
      />
      <DisplayWarning bg="bg-orange" text="Too short" isDisplay={state.isTooShort} />
      <DisplayWarning bg="bg-orange" text="Invalid word" isDisplay={!state.validWord} />
    </>
  );
}

DisplayComponents.propTypes = {
  len: PropTypes.number.isRequired,
  shouldRun: PropTypes.bool.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  state: PropTypes.array.isRequired,
  wordData: PropTypes.string.isRequired,
  playAgainBtn: PropTypes.func.isRequired,
};
