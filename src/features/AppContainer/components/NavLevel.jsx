import { useId } from 'react';

import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { RxCrossCircled } from 'react-icons/rx';
import { ImCross } from 'react-icons/im';
import { PropTypes } from 'prop-types';

export default function NavLevel({ correctGuesses, wrongGuesses, level }) {
  const keyId = useId();

  const displayCorrectGuessed = correctGuesses.map((isGuessed, idx) => (isGuessed ? <AiFillStar className="text-green" key={keyId + idx} /> : <AiOutlineStar key={keyId + idx} />));

  const displayWrongGuessed = wrongGuesses.map((isGuessed, idx) => (isGuessed ? <ImCross className="text-red text-lg" key={keyId + idx} /> : <RxCrossCircled key={keyId + idx} />));

  return (
    <section className="flex w-[20em] justify-between mb-2 items-center">
      <div className="flex space-x-1 text-2xl text-yellow">
        { displayCorrectGuessed }
      </div>

      <h1 className="text-blue text-2xl font-bold drop-shadow-lg">
        Level
        {' '}
        {level}
      </h1>

      <div className="flex space-x-1 text-2xl text-gray items-center">
        { displayWrongGuessed }
      </div>
    </section>
  );
}

NavLevel.propTypes = {
  correctGuesses: PropTypes.arrayOf(PropTypes.bool).isRequired,
  wrongGuesses: PropTypes.arrayOf(PropTypes.bool).isRequired,
  level: PropTypes.number.isRequired,
};
