import { PropTypes } from 'prop-types';

export default function GuessBlock({ guessLetter, color }) {
  const len = guessLetter.length;
  const isGuess = len ? '' : 'border-4';
  const isValidGuess = len <= 1 ? guessLetter : '';

  return (
    <div
      className={
                    `${color} flex justify-center items-center 
                      w-14 h-14 rounded
                      ${isGuess} border-gray-light
                      `
                  }
      data-testid="guess-container"
    >
      <h1 className="font-bold text-3xl text-[#ffff] uppercase">{ isValidGuess }</h1>
    </div>
  );
}

GuessBlock.propTypes = {
  guessLetter: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
