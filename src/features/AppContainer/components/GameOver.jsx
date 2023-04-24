import { PropTypes } from 'prop-types';

export default function GameOver({ playAgain, text }) {
  return (
    <article className="
    bg-purple px-20 py-8 opacity-90
    text-[#eceef2ee] text-3xl font-bold
    rounded-lg
    absolute z-50
    top-[6em]
    "
    >
      <h1 className="mb-6 drop-shadow-lg cursor-pointer ">
        { text }
      </h1>
      <button
        className="
          text-lg
          bg-blue
          px-4
          py-1
          rounded-md
          hover:bg-sky-500
        "
        type="button"
        onClick={playAgain}
      >
        <span className="drop-shadow-2xl">Play again</span>
      </button>
    </article>
  );
}

GameOver.propTypes = {
  playAgain: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
