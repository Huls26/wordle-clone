import { PropTypes } from 'prop-types';
import GuessBlock from './components/GuessBlock';

export default function BlockTable({ guessWord, targetWord }) {
  const newArray = guessWord.split('');
  // eslint-disable-next-line react/no-array-index-key
  const rowBlock = newArray.map((letter, idx) => <GuessBlock key={idx} color="bg-green" guessLetter={letter} />);
  // eslint-disable-next-line react/no-array-index-key
  const guessTarget = targetWord.split('').map((letter, idx) => <GuessBlock key={idx} color="none" guessLetter="" />);

  return (
    <section className="mb-6">
      <div className="flex space-x-2 mb-2">
        {rowBlock}
      </div>

      <div className="flex space-x-2 mb-2">
        {guessTarget }
      </div>

      <div className="flex space-x-2 mb-2">
        {guessTarget }
      </div>

      <div className="flex space-x-2 mb-2">
        {guessTarget }
      </div>

      <div className="flex space-x-2 mb-2">
        {guessTarget }
      </div>

      <div className="flex space-x-2 mb-2">
        {guessTarget }
      </div>
    </section>
  );
}

BlockTable.propTypes = {
  guessWord: PropTypes.string.isRequired,
  targetWord: PropTypes.string.isRequired,
};
