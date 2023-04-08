import { PropTypes } from 'prop-types';

export default function GuessBlock({ guessLetter, color }) {
  return (
    <div className={`${color} flex justify-center items-center w-14 h-14 m-3 rounded`}>
      <h1 className="font-bold text-3xl text-[#ffff]">{ guessLetter }</h1>
    </div>
  );
}

GuessBlock.propTypes = {
  guessLetter: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};
