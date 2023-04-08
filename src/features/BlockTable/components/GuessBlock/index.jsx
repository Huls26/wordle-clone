import { PropTypes } from 'prop-types';

export default function GuessBlock({ guessLetter, color }) {
  const isGuess = guessLetter.length ? '' : 'border-4';
  return (
    <div className={
                    `${color} flex justify-center items-center 
                      w-14 h-14 rounded
                      ${isGuess} border-gray-light
                      `
                  }
    >
      <h1 className="font-bold text-3xl text-[#ffff] uppercase">{ guessLetter }</h1>
    </div>
  );
}

GuessBlock.propTypes = {
  guessLetter: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
