import { PropTypes } from 'prop-types';
import GuessBlock from './components/GuessBlock';
import RowContainer from './components/RowContainer';

export default function BlockTable({ guessWord, targetWord }) {
  const newArray = guessWord.split('');
  const len = targetWord.length;
  const setRow = Array(len).fill({ letter: '', color: 'none' });
  const setTableBlocks = Array(6).fill(setRow);

  console.log(newArray);
  console.log(targetWord);
  function row(array) {
    return array.map((guess, idx) => {
      const { letter, color } = guess;
      return <GuessBlock key={idx} color={color} guessLetter={letter} />;
    });
  }

  const tableBlocks = setTableBlocks.map((rowBlock, idx) => (
    <RowContainer rowBlock={row(rowBlock)} key={idx} />
  ));

  return (
    <section className="mb-6">
      { tableBlocks }
    </section>
  );
}

BlockTable.propTypes = {
  guessWord: PropTypes.string.isRequired,
  targetWord: PropTypes.string.isRequired,
};
