import { PropTypes } from 'prop-types';

export default function GuessBlock({ guessLetter, color }) {
  const len = guessLetter.length;
  const isColor = color === 'none';
  const isGuess = isColor ? 'border-4' : '';
  const isValidGuess = len <= 1 ? guessLetter : '';
  const textColor = isColor ? 'text-gray-dark' : 'text-[#ffff]';

  return (
    <div
      className={
                    `${color} flex justify-center items-center 
                      rounded
                      ${isGuess} border-gray-light
                      w-11 h-11
                      lg:w-14 lg:h-14
                      `
                  }
      data-testid="guess-container"
    >
      <h1 className={`font-bold text-2xl lg:text-3xl ${textColor} uppercase`}>{ isValidGuess }</h1>
    </div>
  );
}

GuessBlock.propTypes = {
  guessLetter: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
