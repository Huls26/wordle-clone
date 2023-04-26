import { PropTypes } from 'prop-types';

export default function GameOver({ playAgain, text, isDisplay }) {
  function display() {
    const components = (
      <article className="
         bg-purple px-3 py-3
          md:px-[2em] md:py-4
          lg:px-20 lg:py-8
         text-[#eceef2ee] text-sm font-bold
          md:text-2xl
          lg:text-3xl
          rounded-lg
          absolute z-50
          top-[6em]
          md:top-[5em]
    "
      >
        <h1 className="mb-3 md:mb-6 drop-shadow-lg cursor-pointer ">
          { text }
        </h1>
        <button
          className="
          text-[.8em]
          lg:text-lg
          bg-blue
          px-2
          md:px-4
          md:py-1
          rounded-md
          hover:bg-sky-500
          transition duration-150 ease-in-out
          active:scale-110
          active:-translate-y-1
        "
          type="button"
          onClick={playAgain}
        >
          <span className="drop-shadow-2xl">Play again</span>
        </button>
      </article>
    );

    return isDisplay ? components : null;
  }

  return display();
}

GameOver.propTypes = {
  playAgain: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  isDisplay: PropTypes.bool.isRequired,
};
